import axios from "axios";
import useAuth from "../../hooks/useAuth";
// import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { MdDelete, MdOutlineLocalShipping  } from "react-icons/md";
import { FiActivity } from "react-icons/fi"
import { PiKeyReturnBold } from "react-icons/pi";
import {useQuery, useMutation} from '@tanstack/react-query'
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import { GoEye } from "react-icons/go";
import { FaRegFileAlt } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import { Link } from "react-router";


const ManageOrder = () => {
    const{user}=useAuth()
    //  tanstack query for get data
     const {data: orders=[],
         isLoading,
         refetch,
         isError,
         error}=useQuery({
        queryFn:()=>getData(),
        queryKey:['orders', user?.email],
     })
     console.log(orders)
     console.log(isLoading);
    // const [orders, setOrders]=useState([])
    //  useEffect(()=>{
    //         getData()
    //     },[user])
        const getData = async ()=>{
            const{data}= await axios(`${import.meta.env.VITE_API_URL}/orderAdmin/${user?.email}`,
            )
            console.log(data); 
            // setOrders(data)
            return data
        }
        // console.log(orders);

        // tanstack query for update or patch
        const {mutateAsync}=useMutation({
            mutationFn: async({id, status})=>{
                const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/order/${id}`,{status})
                console.log(data);
            },
            onSuccess:()=>{
                console.log('data updated');
                toast.success('updated')
                // refresh ui after update
                refetch()

            }
        })

        const handleStatus = async (id, prevStatus, status)=>{
            console.log(id, prevStatus, status)
           await mutateAsync({id, status})


        }



        if(isLoading) return <p>Data is still loading....</p>
        if(isError || error) {
            console.log(isError,error);
        }

    return (
        <div>
        
          
           {
                   orders.length===0?(<p className="text-yellow-600 capitalize text-center text-2xl font-bold mt-20">There is no order request</p>):(
                         <div>
                           <h2 className="text-yellow-600 text-center capitalize text-2xl font-bold mt-10 underline">Manage Orders</h2>
                        <section className="container px-4 mx-auto">
           
           <div className="flex flex-col mt-6">
               <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                   <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                       <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                               <thead className="bg-gray-50 dark:bg-gray-800">
                                   <tr>
                                       <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                           <div className="flex items-center gap-x-3">
                                               
                                               <span>Customer</span>
                                           </div>
                                       </th>
           
                                       
           
                                       <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                           
                                           Status Select
           
                                              
                                           
                                       </th>
           
                                    
           
                                       <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Action</th>
                                       <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status</th>
                                       <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Remove</th>
                                       
                                   </tr>
                               </thead>
                               <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                   {
                                       orders.map(order=>(
                                           <tr key={order._id}>
                                       <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                           <div className="inline-flex items-center gap-x-3">
                                               
           
                                               <div className="flex items-center gap-x-2">
                                                   {/* <img className="object-cover w-10 h-10 rounded-full" src={order.customerInfo.image} alt=""/> */}
                                                   <div>
                                                       <h2 className="font-medium text-gray-800 dark:text-white ">{order.customerInfo.name}</h2>
                                                       <p className="text-sm font-normal text-gray-600 dark:text-gray-400">{order.customerInfo.email}</p>
                                                   </div>
                                               </div>
                                           </div>
                                       </td>
                                       
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap flex items-center gap-x-2">
                                            <button onClick={()=> handleStatus(order._id,order.orderDetails.status, 'Processing')}  className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-rose-500 focus:outline-none btn" >
                                                      Processing
                                                       
                                                    </button>
                                                    <button onClick={()=> handleStatus(order._id,order.orderDetails.status, 'Shipped')}  className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-blue-500 focus:outline-none btn" >
                                                      Shipped
                                                       
                                                    </button>
                                            <button onClick={()=> handleStatus(order._id,order.orderDetails.status, 'Delivered')}  className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-green-500 focus:outline-none btn" >
                                                      Delivered
                                                       
                                                    </button>
                                                     <button onClick={()=> handleStatus(order._id,order.orderDetails.status, 'Return')}  className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-800 focus:outline-none btn" >
                                                      Return
                                                       
                                                    </button>
                                                
                                            </td>
                                       
<td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-x-6">
                                                    <button onClick={''}  className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none" data-tooltip-id="my-tooltip" data-tooltip-content="View User"
>
                                                        <GoEye className="text-2xl"  />
                                                        <Tooltip 
                                                         id="my-tooltip" 
                                                         place="top"
                                                         effect="solid"
                                                         className="!bg-gray-800 !text-xs"
                                                       />
                                                       </button>
            
                                                    <Link to={``}><button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none" data-tooltip-id="my-tooltip" data-tooltip-content="Order Receipt">
                                                        <FaRegFileAlt className="text-xl" />
                                                        <Tooltip 
                                                         id="my-tooltip" 
                                                         place="top"
                                                         effect="solid"
                                                         className="!bg-gray-800 !text-xs"
                                                       />
                                                    </button></Link>
                                                    <button onClick={''}  className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none" data-tooltip-id="my-tooltip" data-tooltip-content="Order Summary">
                                                       <CgDetailsMore className="text-2xl"/>
                                                       <Tooltip 
                                                         id="my-tooltip" 
                                                         place="top"
                                                         effect="solid"
                                                         className="!bg-gray-800 !text-xs"
                                                       />
                                                    </button>
                                                    
                                                </div>
                                            </td>
                                      
                                       <td className="px-12 py-4 text-md  whitespace-nowrap">
                                           <div className="flex items-center   gap-x-2 ">
                                              <p className={`px-3 py-1 font-bold ${
                                               order.orderDetails.status === 'Pending' && 'text-yellow-600 '
                                              } ${
                                               order.orderDetails.status === 'Processing' && 'text-red-400 '}
                                               ${
                                               order.orderDetails.status === 'Shipped' && 'text-blue-600 '}
                                              ${
                                               order.orderDetails.status === 'Delivered' && 'text-green-600 '           
                                              }  ${
                                               order.orderDetails.status === 'Return' && 'text-red-600 '
           
                                              } ` }>
                                           {order.orderDetails.status}
                                              </p>
                                           </div>
                                       </td>
                                       
                                       <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                        <button disabled={order.orderDetails.status !== 'Delivered'} className="disabled:bg-slate-200 disabled:text-slate-500 hover:text-red-600">
                                            <MdDelete className="text-2xl"/>
                                        </button>
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
                         </div>
                   )
                  }
           
                    
            
        </div>
    );
};

export default ManageOrder;