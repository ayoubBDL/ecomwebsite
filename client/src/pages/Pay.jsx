import React, {useState, useEffect} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'

const KEY = process.env.REACT_APP_STRIPE

const Pay = () => {

  const [stripeToken, setStripeToken] = useState(null)

  const onToken = (token) => {
    setStripeToken(token)
  }
 
  useEffect(()=>{
    const makeRequest = async () =>{
      try{
        const res = await axios.post(
          "http://localhost:5000/api/checkout/payment",{
            tokenId:stripeToken.id,
            amount:2000
          }
          )
      }catch(err){
        console.log(err)
      }
    }
    stripeToken && makeRequest()
  },[stripeToken])
 
  
    return (
      
      <div
      style={{
        height:"100vh",
        dispay:'flex',
        alignItems:'center',
        justifyContent:'center',
      }}
      >
        
        <StripeCheckout
            name='Youfabes'
            image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
            billingAddress
            shippingAddress
            description='Your Total is $20'
            token={onToken}
            stripeKey={KEY}
        >
          <button
          
        >Pay Now</button>
        </StripeCheckout>
      </div>
    )
  
}

export default Pay