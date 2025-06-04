
import { useEffect, useState } from "react";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router";
// import star from '../../../public/star.png'





const Shop = () => {
    const{user}=useAuth()
    const[items,setItems]=useState([])
    const [isLoading, setIsLoading]= useState([]);
   
    
    useEffect(()=>{
      setIsLoading(true)
            getData()
        },[user])
        const getData = async()=>{
            const {data}= await axios(`${import.meta.env.VITE_API_URL}/addItem`)
            setItems(data)
             setIsLoading(false)
        }
        console.log(items);

        const handleCart = async (itemId) => {
        // 1. Get the product directly (no validation)
        const product = items.find(item => item._id === itemId);
        if (user?.email === product.adminEmail) return toast.error('Not Applicable For Admin!')
             if (!user) return toast.error('Please Sign In')
      
        // 2. Prepare cart data
        const addedData = {
            cartProductId: product._id,
            customerEmail: user?.email,
          owner: product.adminEmail,
          addedProduct: product.title,
          productPrice: product.mainPrice,
          uiPrice: product.fakePrice,
          productImage: product.imageUrl,
          
        };
      
        // 3. Send to backend
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/cart`, addedData);
            console.log(data);
            toast.success('Add in cart!');
           
          } catch (err) {
            console.error('failed:', err);
            toast.error(err.response?.data || 'Failed');
          }
      };

      const handleWish = async (productId) => {
        // 1. Get the product directly (no validation)
        const product = items.find(item => item._id === productId);
        if (!user) return toast.error('Please Sign In')
        if (user?.email === product.adminEmail) return toast.error('Not Applicable For Admin!')
      
        // 2. Prepare cart data
        const listedData = {
            listedProductId: product._id,
            listerEmail: user?.email,
          productOwner: product.adminEmail,
          listedProduct: product.title,
          productPrice: product.mainPrice,
          faked: product.fakePrice,
          productImage: product.imageUrl,
          
        };
      
        // 3. Send to backend
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/wish`, listedData);
            console.log(data);
            toast.success('Wish listed!');
           
          } catch (err) {
            console.error('failed:', err);
            toast.error(err.response?.data || 'Failed');
          }
      };
   

    return (
        <div>
           
          {isLoading ? (
    <div className="flex justify-center item-center mt-20">
      <span className="loading loading-spinner text-yellow-600  loading-lg"></span>
    </div>
  ) :items.length === 0 ? (
    <p className="text-yellow-600 capitalize text-center text-2xl font-bold mt-20">
      Empty Shop, Please Add Data
    </p>
  ):(
            <div>
             
               <p className="text-yellow-600 text-center uppercase text-2xl font-bold my-10 underline">All Pithas</p>
             <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-center items-center">
               {
                items.map(item=>(
                     <div key={item._id} className="card bg-yellow-100 hover:bg-amber-200 shadow-lg ">
  <figure className="relative">
    <img
      src={item.imageUrl}
      alt=""
      className="rounded-t-xl w-full h-[40vh]  " />
      
      <p className=" font-bold absolute -top-2 -left-3 bg-amber-300 p-4 rounded-full text-red-600 text-center "><span className="text-xl">{item.totalDiscount}%</span> <br />discount</p>
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{item.title}</h2>
    <p><span className="text-xl text-red-600">{item.fakePrice}</span> টাকার পণ্য এখন মাত্র <span className="text-xl text-red-600" >{item.mainPrice}</span> টাকায়, <span className="text-xl text-red-600">{item.customerSave}</span> টাকা সাশ্রয়</p>
    <FaHeart onClick={() => handleWish(item._id)} className="text-2xl text-yellow-600 hover:text-yellow-800 cursor-pointer" />
    
    <div className="card-actions">
      <button onClick={() => handleCart(item._id)} className="btn bg-yellow-600 capitalize text-white hover:bg-yellow-800">Add to cart</button>
      <Link to={`/itemDetails/${item._id}`}><button className="btn bg-yellow-600 capitalize text-white hover:bg-yellow-800" ><FaArrowRight /></button> </Link>
    </div>
  </div>

</div>
                ))
               }
             </div>
            </div>
          )}
            
        </div>
    );
};

export default Shop;