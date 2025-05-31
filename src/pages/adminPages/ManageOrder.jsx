import axios from "axios";
import useAuth from "../../hooks/useAuth";
// import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { MdOutlineLocalShipping  } from "react-icons/md";
import { FiActivity } from "react-icons/fi"
import { PiKeyReturnBold } from "react-icons/pi";
import {useQuery, useMutation} from '@tanstack/react-query'
import toast from "react-hot-toast";


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
                                           
                                           Product(Quantity)
           
                                              
                                           
                                       </th>
           
                                       {/* <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Product Image</th> */}
                                       {/* <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Brand</th> */}
           
                                       <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Phone Number</th>
                                       <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Address</th>
                                       {/* <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Method</th> */}
                                       <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Total</th>
                                       <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                           <button className="flex items-center gap-x-2">
                                               <span>Status</span>
           
                                               <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                   <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                   <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                   <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                                               </svg>
                                           </button>
                                       </th>
           
                                       <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                           Action
                                       </th>
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
                                       
                                       <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{order.products.map(p=>(<li key={p.id}>{p.name} ({p.quantity})</li>))}</td>
                                       
                                       {/* <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{order.products.map(p=>(<li key={p.id}>{p.brand}</li>))}</td> */}
                                       <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{order.customerInfo.phone}</td>
                                       <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{order.customerInfo.address}</td>
                                       {/* <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{order.orderDetails.method}</td> */}
                                       <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{order.orderDetails.total} BDT</td>
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
                                       
                                       <td className="px-4 py-4 text-sm whitespace-nowrap">
                                           <div className="flex items-center gap-x-6">
                                             <button onClick={()=> handleStatus(order._id,order.orderDetails.status, 'Processing')}
                                               disabled={order.orderDetails.status ==='Processing'}
                                                className="text-gray-500 transition-colors duration-200 dark:hover:text-green-500 dark:text-gray-300 hover:text-green-500 focus:outline-none">
                                               <FiActivity  className="text-2xl " />
                                               </button>
                                           <button onClick={()=> handleStatus(order._id,order.orderDetails.status, 'Shipped')}
                                               disabled={order.orderDetails.status ==='Shipped'}
                                                className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                               <MdOutlineLocalShipping  className="text-2xl"  />
                                               </button>
                                               <button onClick={()=> handleStatus(order._id,order.orderDetails.status, 'Delivered')}
                                               disabled={order.orderDetails.status ==='Delivered'}
                                                className="text-gray-500 transition-colors duration-200 dark:hover:text-green-500 dark:text-gray-300 hover:text-green-500 focus:outline-none">
                                               <TiTick className="text-2xl" />
                                               </button>
                                                <button onClick={()=> handleStatus(order._id,order.orderDetails.status, 'Return')}
                                               disabled={order.orderDetails.status ==='Return'}
                                                className="text-gray-500 transition-colors duration-200 dark:hover:text-green-500 dark:text-gray-300 hover:text-green-500 focus:outline-none">
                                               <PiKeyReturnBold className="text-2xl" />
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
                         </div>
                   )
                  }
           
                    
            
        </div>
    );
};

export default ManageOrder;