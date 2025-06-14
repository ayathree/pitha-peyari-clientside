import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
// import axios from "axios";
import { BsCart } from "react-icons/bs";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const WishList = () => {
    const{user}=useAuth()
    const axiosSecure=useAxiosSecure()
     const[wishes, setWishes]=useState([])
      const [isLoading, setIsLoading]= useState([]);

      useEffect(() => {
        setIsLoading(true)
            getData();
        }, [user]);
    
        const getData = async () => {
            const { data } = await axiosSecure(`/wish/${user?.email}`);
            setWishes(data);
             setIsLoading(false)
        };

        const handleDelete = (id) => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!"
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        try {
                          await axiosSecure.delete(`/wishData/${id}`);
                          
                          await Swal.fire({
                            title: "Deleted!",
                            text: "Your product has been deleted.",
                            icon: "success"
                          });
                          
                          getData();
                        } catch (err) {
                          await Swal.fire({
                            title: "Error!",
                            text: err.response?.data?.message || "Failed to delete product",
                            icon: "error"
                          });
                        }
                      }
                    });
                  };

        const handleAddToCart = async (productId) => {
            // 1. Get the product directly (no validation)
            const product = wishes.find(item => item._id === productId);
          
            // 2. Prepare cart data
            const cartData = {
              cartProductId: product._id,
              customerEmail: user?.email,
              owner: product.productOwner,
              addedProduct: product.listedProduct,
            //   savedBrand: product.listedBrand,
              productPrice: product.productPrice,
              uiPrice: product.faked,
              productImage: product.productImage,
              
            };
          
            // 3. Send to backend
            try {
                const { data } = await axiosSecure.post(`/wishData`, cartData);
                console.log(data);
                toast.success('Add in cart!');
                // navigate('/myCart');
              } catch (err) {
                console.error('failed:', err);
                toast.error(err.response?.data?.message || 'Failed to place order');
              }
          };          
    return (
        <div>
            {isLoading ? (
    <div className="flex justify-center item-center mt-20">
      <span className="loading loading-spinner text-yellow-600  loading-lg"></span>
    </div>
  ) :wishes.length === 0 ? (
    <p className="text-yellow-600 capitalize text-center text-2xl font-bold mt-20">
     Hey {user?.displayName}, Your Wish List Empty Till Now.
    </p>
  ):(

                <section className="container px-4 mx-auto">
                        <p className="text-yellow-600 text-center capitalize text-2xl font-bold my-10 underline">Wish lists</p>
            
            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-x-3">
                                                
                                                <span>Product Name</span>
                                            </div>
                                        </th>
            
                                        
            
                                        
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Product Image</th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Price</th>
            
            
                                        
                                        
            
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {
                                        wishes.map(list=>(
                                            <tr key={list._id}>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3">
                                                
            
                                                <div className="flex items-center gap-x-2">  
                                                    <div>
                                                        <h2  className="font-medium text-gray-800 dark:text-white  ">{list.listedProduct}</h2> 
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3">
                                                
            
                                                <div className="flex items-center gap-x-2">
                                                    <img className="object-cover w-10 h-10 rounded-full" src={list.productImage} alt=""/>
                                                    
                                                </div>
                                            </div>
                                        </td>
                                        
                                      
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{list.productPrice} BDT</td>
                                        
            
                                        
                                        
                                        <td className="px-4 py-4 text-sm whitespace-nowrap flex items-center gap-4">
                                            <div className="flex items-center gap-x-6">
                                                <button onClick={() => handleDelete(list._id)}   className="text-gray-500 transition-colors disabled:bg-slate-400 duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
            
                                                
                                            </div>
                                            <div className="flex items-center gap-x-6">
                                                <button onClick={() => handleAddToCart(list._id)}   className="text-gray-500 transition-colors disabled:bg-slate-400 duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none text-lg">
                                                <BsCart />
                                                </button>
            
                                                
                                            </div>
                                        </td>
                                       
                                    </tr>
                                        ))
                                    }
            
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
           
            
           
            </section>
            )}
            
        </div>
    );
};

export default WishList;