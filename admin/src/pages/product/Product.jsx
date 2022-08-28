import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {getStorage, uploadBytesResumable, getDownloadURL, ref} from "firebase/storage"
import app from "../../firebase";
import {updateProduct} from "../../Redux/apiCalls"
import { useMemo } from "react";
import { useState } from "react";
import { userRequest } from "../../requestMethods";
import { useEffect } from "react";

export default function Product() {
    const MONTHS = useMemo(()=>[
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      [])
      
    const [pState, setPState] = useState([])
    const location = useLocation()
    const productId = location.pathname.split("/")[2];

    const product = useSelector(state => state.product.products.find(product=> product._id === productId))

    const [inputs, setInputs] = useState({}) 
    const [file, setFile] = useState(null)
    const [cat, setCat] = useState([])

    const handleChange = (e)=>{
        setInputs((prev)=>{
          return{...prev, [e.target.name]:e.target.value}
        })
      }
    
      const handleCat = (e)=>{
        setCat(e.target.value.split(","))
      }
    
      const dispatch = useDispatch()
    
    useEffect(() => {
      const getStats = async () =>{
        try{
            const res = await userRequest.get("orders/income?pid=" + productId)
            const list = res.data.sort((a,b)=>{
                return a._id - b._id
            })
            list.map((item)=>
                setPState((prev)=>[
                    ...prev,
                    {name:MONTHS[item._id - 1], Sales:item.total},
                ])
            )
        }catch(err){
            console.error(err)
        }
      }
    
      getStats();
    }, [productId, MONTHS])

    const handleUpdate = (e)=>{
        e.preventDefault()
        //todo
        const fileName = new Date().getTime() + file?.name;
        const storage = getStorage(app)
        const StorageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(StorageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        file && uploadTask.on(
        "state_changed",
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
            case "paused":
                console.log("Upload is paused");
                break;
            case "running":
                console.log("Upload is running");
                break;
            default:
            }
        },
        (error) => {
            // Handle unsuccessful uploads
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const product = { ...inputs, ...{img: downloadURL}, ...{categories: cat} };
            console.log("pic ", fileName)
            updateProduct(productId, product, dispatch);
            });
        }
        );
    }
    
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={pState} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img} alt="" className="productInfoImg" />
                  <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                  </div>
                  
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{product.inStock}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input name={"title"} type="text" placeholder={product.title} onChange={handleChange} />
                  <label>Product Description</label>
                  <input name={"desc"} type="text" placeholder={product.desc} onChange={handleChange} />
                  <label>Product Price</label>
                  <input name={"inStock"} type="number" placeholder={product.price} onChange={handleChange} />
                  <label>In Stock</label>
                  <select name="inStock" id="idStock" onChange={handleChange}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>
                  
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={product.img} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])} />
                  </div>
                  <button className="productButton" onClick={handleUpdate}>Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
