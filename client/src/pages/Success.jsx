import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import { clearCart } from "../redux/CartRedux";

const Success = () => {
    const dispatch = useDispatch()
    
    const location = useLocation()
    const data = location.state.stripeData;
    const cart = location.state.cart;
    const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState(null);

    const navigate = useNavigate()

    const handleClick = ()=>{
        
        dispatch(
          clearCart()
        )
        navigate("/")
      }

    useEffect(() => {
        const createOrder = async () => {
          try {
            const res = await userRequest.post("orders", {
              userId: currentUser._id,
              products: cart.products.map((item) => ({
                productId: item._id,
                quantity: item._quantity,
              })),
              amount: cart.total,
              address: data.billing_details.address,
            });
            setOrderId(res.data._id);
            console.log("createOrder ", res)
          } catch(err) {
            console.error(err)
          }
        };
        console.log("useEffect")
        data && createOrder();
      }, [cart, data, currentUser]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {orderId
                ? `Order has been created successfully. Your order number is ${orderId}`
                : `Successfull. Your order is being prepared...`}
            <button onClick={handleClick} style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
            
        </div>
    );
};

export default Success;
