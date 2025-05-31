import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import QuantityButton from "../../components/QuantityButton";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaExternalLinkAlt } from "react-icons/fa";


const MyCart = () => {
    const{user}=useAuth()
    const navigate = useNavigate();
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        getData();
    }, [user]);

    const getData = async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/cart/${user?.email}`);
        setCarts(data.map(item => ({
            ...item,
            localQuantity: item.quantity || 1 // Initialize with stored quantity or 1
        })))
    };
    console.log(carts);

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
                   await axios.delete(`${import.meta.env.VITE_API_URL}/cartData/${id}`);
                   
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

    const updateQuantity = async (id, newQuantity) => {
            try {
                // Update local state immediately for responsive UI
                setCarts(prev => prev.map(item => 
                    item._id === id ? { ...item, localQuantity: newQuantity } : item
                ));
                
                // Update in database
                await axios.patch(`${import.meta.env.VITE_API_URL}/cartData/${id}`, {
                    quantity: newQuantity
                });
            } catch (error) {
                console.error('Failed to update quantity:', error);
                toast.error('Failed to update quantity');
                // Revert local state if update fails
                getData();
            }
        };

    const handleCheckoutAll = async () => {
        try {
            // First verify all quantities are saved
            await Promise.all(
                carts.map(cart => 
                    axios.patch(`${import.meta.env.VITE_API_URL}/cartData/${cart._id}`, {
                        quantity: cart.localQuantity
                    })
                )
            );
            
            // Then navigate to checkout with user email
            navigate(`/checkOut/${user?.email}`);
            
        } catch (error) {
            console.error('Checkout preparation failed:', error);
            toast.error('Failed to prepare checkout');
        }
    };    


    
    return (
        <div>
            {carts.length===0?(<p className="text-yellow-600 capitalize text-center text-2xl font-bold mt-20">Hey, Your Cart List Empty Till Now.</p>):(
                <section className="container px-4 mx-auto">
        <p className="text-yellow-600 text-center capitalize text-2xl font-bold mt-10 underline">Cart Items</p>
        <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-x-3">
                                            
                                            <span>Name</span>
                                        </div>
                                    </th>
        
                                    
        
                                    
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Image</th>
                                    
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Price</th>
                                     <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Select Quantity</th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Quantity</th>
        
        
                                  
                                    
        
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                {
                                    carts.map(cart=>(
                                        <tr key={cart._id}>
                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                        <div className="inline-flex items-center gap-x-3">
                                            
        
                                            <div className="flex items-center gap-x-2">  
                                                <div>
                                                    <h2 className="font-medium text-gray-800 dark:text-white ">{cart.addedProduct}</h2> 
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                        <div className="inline-flex items-center gap-x-3">
                                            
        
                                            <div className="flex items-center gap-x-2">
                                                <img className="object-cover w-10 h-10 rounded-full" src={cart.productImage} alt=""/>
                                                
                                            </div>
                                        </div>
                                    </td>
                                    
                                   
                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{cart.productPrice} BDT</td>
                                    <td>
                                        <QuantityButton
                                                        initialQuantity={cart.localQuantity}
                                                        min={1}
                                                        max={10}
                                                        onQuantityChange={(newQty) => updateQuantity(cart._id, newQty)}
                                                        className="mt-2"
                                                    />
                                    </td>
                                    <td className="px-4 py-4 text-lg text-gray-500 dark:text-gray-300 whitespace-nowrap"> {cart.localQuantity}</td>
                                    
        
                                    
                                    
                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        <div className="flex items-center gap-x-6">
                                            <button onClick={() => handleDelete(cart._id)}   className="text-gray-500 transition-colors disabled:bg-slate-400 duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
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
       <div className="flex justify-center items-center mt-20">
        <button onClick={handleCheckoutAll}  className="text-black transition-colors hover:bg-yellow-800 bg-yellow-500 rounded-lg px-4 py-2 disabled:bg-slate-400 duration-200 dark:hover:text-white dark:text-gray-300 hover:text-white focus:outline-none flex gap-2">
                                            Checkout<FaExternalLinkAlt />
                                            </button>
        </div>

        
        
        </section>
           
            )}
            
        </div>
    );
};

export default MyCart;