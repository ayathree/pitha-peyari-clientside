import {   Link, useLoaderData, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
import {Rating} from 'react-simple-star-rating'
import { FaStar } from "react-icons/fa";
import QuantityButton from "../../components/QuantityButton";

const ItemDetails = () => {
    const itemData = useLoaderData()
    // console.log(itemData);
    const {
        _id, title, description,imageUrl, adminEmail,fakePrice,mainPrice,totalDiscount,customerSave

    }=itemData || {}

    const{user}=useAuth()
    const navigate=useNavigate()
    const[products,setProducts]=useState([])
    const [showText, setShowText] = useState(false);
    const [rating, setRating] = useState(0);
    const[reviews,setReviews]=useState([]);
    const [quantity, setQuantity] = useState({ localQuantity: 1 });
    const [isLoading, setIsLoading]= useState([]);

     
    const handleCart = async e =>{
        e.preventDefault()
        if (user?.email === adminEmail) return toast.error('Action not permitted!')
           if (!user) return toast.error('Please Sign In')
        // const form = e.target
        const cartProductId = _id; 
        const customerEmail = user?.email;
        const owner = adminEmail;
        const addedProduct = title;
       const itemQuantity = quantity.localQuantity;
        // const savedBrand = brand;
        const productPrice = mainPrice;
        const uiPrice = fakePrice;
        const discount = totalDiscount;
        const savings = customerSave;
        const productImage = imageUrl;
        const savedData = {
            cartProductId,customerEmail,owner, addedProduct,productImage, itemQuantity, productPrice,uiPrice,discount,savings
        }

        console.table(savedData)

        try{
            const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/cart`, savedData)

            console.log(data)
            setQuantity({
                    ...data, // Spread the item data
                    localQuantity: data.quantity || 1 // Initialize with stored quantity (or default to 1)
});
            toast.success('added in cart')
           
            navigate('/myCart')

        }catch(err){
            console.log(err)
            toast.error(err.response?.data)
            
        }

    }

    useEffect(() => {
      setIsLoading(true)
            getData();
          }, [user]);
          
          const getData = async () => {
            try {
              const { data } = await axios(`${import.meta.env.VITE_API_URL}/addItem`);
              
              // Assume you already have the current product's brand
              const currentPrice = itemData?.price;
          
              // Filter products of the same brand, excluding the current product
              const similarProducts = data
                .filter(p => p.price === currentPrice && p._id !== itemData._id)
                .slice(0, 4); // Take only 3 similar products
          
              setProducts(similarProducts);
              setIsLoading(false)
            } catch (err) {
              console.error("Failed to fetch similar products:", err);
            }
          };

          // review
      

  const handleClick = () => {
    setShowText(!showText); // Toggles the state between true/false
  };
  
  // rating
 const handleRating = (rate) => {
    setRating(rate);
    console.log("Selected Rating:", rate);
    // You can send this to your backend here if needed
  };


    // post review
 const handleReview=async e=>{
        e.preventDefault()
         if (user?.email === adminEmail) return toast.error('Action not permitted!')
          if (!user) return toast.error('Please Sign In')
        const form = e.target
        const title = form.title.value
        const ratings = Number(rating)
        const review = form.review.value
        const  reviewerEmail = user?.email
        const productAdmin = adminEmail
        const  reviewedProductId = _id


        const productData = {title,ratings,review,reviewerEmail,reviewedProductId,productAdmin}
        console.table(productData)

        try{
            const {data} = await axios.post(
                `${import.meta.env.VITE_API_URL}/review`, productData
            )
            console.log(data)
            toast.success('Review Submitted successfully')
            e.target.reset()
            
        }catch(err){
            console.log(err)
            toast.error(err.response?.data)
            e.target.reset()
        }
    }   

    // show the review
        useEffect(()=>{
          setIsLoading(true)
            fetchData()
        },[user])
        const fetchData = async()=>{
            const {data}= await axios(`${import.meta.env.VITE_API_URL}/products/${_id}/reviews`)
            setReviews(data)
            fetchData()
            setIsLoading(false)
        }

    return (
        <div className="mt-20">
           {/* product detail */}
           <div className="flex flex-row justify-center items-center">
       {
          isLoading? <span className="loading text-yellow-600 loading-spinner loading-lg "></span>:null
        }
       </div>
         
           
            <div className="flex md:flex-row flex-col justify-around items-center gap-4">
              {/* div 1 */}
               <div >
                 <img className="h-[70vh] w-[400px]" src={imageUrl} alt="" />
               </div>
                {/* div 2 */}
                <div  >
                <div className="space-y-3">
                 <div className="flex  gap-2">
                   <p>Original Price : </p>
                 <div className="flex justify-center items-center gap-2 bg-yellow-600 text-white px-2 w-16 ">
                     <p className="">{fakePrice} </p>
                     <p>BDT</p>
                 </div>
                 </div>
                 <div className="flex  gap-2">
                   <p>Offer Price : </p>
                 <div className="flex justify-center items-center gap-2 bg-yellow-600 text-white px-2 w-16 ">
                     <p className="">{mainPrice} </p>
                     <p>BDT</p>
                 </div>
                 </div>
                 <div className="flex  gap-6 mb-6">
                   <p>Save Money: </p>
                 <div className="flex justify-center items-center gap-2 bg-red-400 text-white px-2 ">
                     <p className="">{fakePrice} </p>
                     <p>BDT</p>
                     <p>-</p>
                     <p>{mainPrice}</p>
                     <p>BDT</p>
                     <p>=</p>
                     <p>{customerSave}</p>
                     <p>BDT</p>
                 </div>
                 </div>
                 <div className="flex items-center gap-3">
                   <p className="text-3xl capitalize font-bold ">{title}</p>
                  <p><span className="text-5xl capitalize font-bold text-red-600">{totalDiscount}%</span> Discount</p>
                 </div>
                <p className="text-lg capitalize font-bold text-yellow-600">{description}</p>
                 <p className="text-3xl capitalize font-bold mt-3">Quantity:</p>
               <div className="flex justify-start items-center gap-4">
                 <QuantityButton 
    initialQuantity={quantity.localQuantity || 1}
    onQuantityChange={(newQuantity) => {
      setQuantity(prev => ({ ...prev, localQuantity: newQuantity }));
    }}
    min={1}
    max={10}
    className="mt-2"
  />
  <p>Piece</p>
               </div>
                
                
                
                <div>
             <button  onClick={handleCart} className="mt-3 capitalize bg-yellow-600 text-white px-4 w-full py-2 text-xl font-semibold hover:bg-yellow-300">Add to cart</button>
           
           </div>
                </div>
           <hr  className="border-yellow-600 border-b-1 w-full mt-6 "/>
          <div className="mt-6">
             {/* <p className=" capitalize"><span className="font-bold text-xl">Brand:</span> {brand}</p> */}
                {/* <p className=" capitalize  "><span className="font-bold text-xl" >Category:</span> {category}</p> */}
          </div>
          
                </div>
            </div>
            <hr className="border-yellow-600 border-b-1 w-full mt-6 "/>
            {/* similar product */}
        <div>
          <div className="flex flex-row justify-center items-center">
       {
          isLoading? <span className="loading text-yellow-600 loading-spinner loading-lg "></span>:null
        }
       </div>
            <p className={products.length === 0 ? 'hidden' : 'text-4xl font-bold m-10 text-center mt-20 underline underline-2 text-yellow-600'}>You may also like</p>
         <div className="grid grid-cols-3 gap-7 justify-center items-center py-6">
           {
            products.slice(0,4).map(item=> <Link to={`/itemDetails/${item._id}`} key={item._id}>
            <div  >
                    <div className="">
                   <div className="relative">
                     <img className="lg:h-[300px] h-[20vh] md:h-[40vh]   border-2 shadow-md" src={item.imageUrl} alt="" />
                       <div className="lg:flex justify-between items-center hidden ">
                <p className="md:font-bold  absolute top-2 left-4 bg-yellow-600 md:px-2 text-white ">{item.price} BDT</p>
                            
                       </div>
                        
                   </div>
                    </div>
                     <h1 title={item.title} className="mt-3 font-bold text-center capitalize hover:underline text-xl">{item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title}</h1>
                    {/* <p className="font-bold text-center capitalize">{item.price}</p> */}
                    {/* <p><span className="font-bold">Category :{category}</span> </p> */}
                   
                   
                    
                </div></Link>)
          }
         </div>
      
        </div>
       {/* review of customer */}
               <div className="hidden">
               <p className="text-4xl font-bold m-20 text-center underline underline-2 text-yellow-600 ">Write a Review</p>
               <div className="flex justify-center items-center">
                 <button 
               onClick={handleClick}
               className="px-4 py-2 bg-yellow-600 text-white "
             >
               {showText ? 'Done' : 'Write'}
             </button>
               </div>
              {showText && (
               <section className="max-w-4xl p-6 mx-auto bg-white rounded-md  dark:bg-gray-800">
           
       
           <form onSubmit={handleReview}>
               <div className="grid grid-cols-1 justify-center items-center">
       
                 <div>
                   <label className="text-yellow-600 text-lg font-semibold dark:text-gray-200">Rating</label>
                  
                  <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <Rating
        onClick={handleRating}
        ratingValue={rating} 
        size={24}
       
        fillColor="#FAC411"
        emptyColor="#ccc"
        allowHalfIcon={false}
      />
      </div>
      <p className="font-semibold">
        Your rating: 
        <span className="text-yellow-600">{rating}</span> 
        <span className="text-yellow-600">
          {rating === 1 ? ' star' : ' stars'}
        </span>
      </p>
    </div>
         
                 </div>
       
                   <div>
                       <label className="text-yellow-600 text-lg font-semibold dark:text-gray-200">Review Title</label>
                       <input name="title" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                   </div>
                   <div>
                       <label className="text-yellow-600 text-lg font-semibold dark:text-gray-200" >Review</label>
                       <textarea name="review"  type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                   </div>
                  
       
       
       
                  
               </div>
       
               <div className="flex justify-end mt-6">
                   <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-yellow-600 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Submit Review</button>
               </div>
           </form>
       </section>
             )}
               </div>

        {/* show the review */}
                <div className="hidden">
                  <div className="flex flex-row justify-center items-center">
       {
          isLoading? <span className="loading text-yellow-600 loading-spinner loading-lg "></span>:null
        }
       </div>
                   <p className={reviews.length === 0 ? 'hidden' : 'text-4xl font-bold m-10 text-center mt-20 underline underline-2 text-yellow-600'}>Customers Review</p>
                  {
                    reviews.map(review=>(
                       <div key={review._id}>
                    <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                
        
                <section className="grid grid-cols-1 gap-5 mt-8 xl:mt-5 lg:grid-cols-2 xl:grid-cols-3">
                    
                 
                        
        
                        <div className="flex items-center mt-3 -mx-2">
                          
                            <div className="mx-2">
                               <div className="flex justify-center items-center gap-5">
                                 <h1 className="font-semibold text-gray-800 dark:text-white">{review.title} </h1>
                                <div className="flex justify-center items-center gap-2">
                                  <p>Ratings : {review.ratings}</p>
                                <div className="flex">
                                  {[...Array(5)].map((_, index) => (
                                    <FaStar 
                                      key={index} 
                                      className={index < review.ratings ? "text-yellow-400" : "text-gray-300"} 
                                    />
                                  ))}
                                </div>
                                </div>
                               </div>
                                 <span className="text-sm text-gray-500 dark:text-gray-400">{review.reviewerEmail}</span>
                              
                            </div>
                            
                        </div>
                   
                </section>
                        <p className="mt-4">{review.review}</p>
            </div>
        </section>
        <hr className="border-yellow-600"/>
                   </div>
                    ))
                  }
        
                </div>       
        
        </div>
    );
};

export default ItemDetails;