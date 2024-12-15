import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'


const PlaceOrder = () => {

  const { navigate,backendUrl,cartItems,setCartItems,token,getCartAmount,delivery_fee,products} = useContext(ShopContext)
  const [method, setMethod] = useState('cod');
  const [formData, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",

  })

  const onChangeHandler =async(e)=>{
    const name = e.target.name;
    const value= e.target.value;

    setFormdata((data)=>({...data,[name]:value}))
    console.log(formData);
    

  }

  const onSubmitHandler=async(e)=>{
    e.preventDefault()

    try {
      let orderItems = []
      for (const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find((product)=>product._id===items))
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity =cartItems[items][item];
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address:formData,
        items:orderItems,
        amount:getCartAmount()+delivery_fee,
      }

      console.log(orderData);
      console.log(method);
      
      

      switch(method){
        // api calls for cod
        case 'cod':
          console.log("inside case");
          
          const response = await axios.post(backendUrl+"/api/order/place",orderData,{headers:{token}})
          console.log(response);
          
          
          
          if(response.data.success){
            setCartItems({})
            navigate("/orders")
          }else{
            toast.error(response.data.message)
          }
          break;

          case "stripe":
            const responseStripe = await axios .post(backendUrl+"/api/order/stripe",orderData,{headers:{token}})
            if(responseStripe.data.success){
              const {session_url}=responseStripe.data;
              window.location.replace(session_url)
            }else{
              toast.error(responseStripe.data.message)
            }
            break;



        default:
          break;
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }
  

  return (
    <form className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t' onSubmit={onSubmitHandler}>
      {/* Left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input type="text" placeholder='First Name'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required onChange={onChangeHandler} name="firstName" value={formData.firstName}
          />
          <input type="text" placeholder='Last Name'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required onChange={onChangeHandler} name="lastName" value={formData.lastName}
          />

        </div>
        <input type="email" placeholder='Email Address'
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full
          ' required onChange={onChangeHandler} name="email" value={formData.email}
        />
        <input type="text" placeholder='Street'
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          required onChange={onChangeHandler} name="street" value={formData.street}
        
        />
        <div className='flex gap-3'>
          <input type="text" placeholder='City'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required onChange={onChangeHandler} name="city" value={formData.city}
          />
          <input type="text" placeholder='State'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required onChange={onChangeHandler} name="state" value={formData.state}
          />

        </div>
        <div className='flex gap-3'>
          <input type="number" placeholder='Zipcode'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required onChange={onChangeHandler} name="zipcode" value={formData.zipcode}
          />
          <input type="text" placeholder='Country'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required onChange={onChangeHandler} name="country" value={formData.country}
          />

        </div>

        <input type="number" placeholder='Phone No.'
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          required onChange={onChangeHandler} name="phone" value={formData.phone}
        />





      </div>
      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-90'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHODS"} />
          {/* Payment Method Selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod("stripe")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ""}`}></p>
              <img src={assets.stripe_logo} alt="" className='h-5 mx-4' />
            </div>

            <div onClick={() => setMethod("razorpay")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ""}`}></p>
              <img src={assets.razorpay_logo} alt="" className='h-5 mx-4' />
            </div>

            <div onClick={() => setMethod("cod")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ""}`}> </p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>

            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button className=' cursor-pointer bg-black text-white px-16 py-3 text-sm' type='submit'>PLACE ORDER</button>
          </div>

        </div>
      </div>
    </form>
  )
}

export default PlaceOrder