import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { GoEye } from "react-icons/go";
import { FaRegFileAlt } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import { Tooltip } from "react-tooltip";
import useAuth from "../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import useUserRole from "../../hooks/useUserRole";
// import useAuth from "../../hooks/useAuth";


const ManageUser = () => {
    const {user} =useAuth()
    const[items,setItems]=useState([])

    useEffect(()=>{
            fetchData()
        },[])
        const fetchData = async()=>{
            const {data}= await axios(`${import.meta.env.VITE_API_URL}/allUsers/user`)
            setItems(data)
        }
        console.log(items);
        

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

      const getData = async ()=>{
            const{data}= await axios(`${import.meta.env.VITE_API_URL}/orderAdmin/${user?.email}`,
            )
            console.log(data); 
            // setOrders(data)
            return data
        }

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
           {items.length===0?(<p className="text-yellow-600 capitalize text-center text-2xl font-bold mt-20">There Are No Data To Show</p>):(
                <div>
                <p className="text-yellow-600 text-center capitalize text-2xl font-bold mt-10 underline">All Users</p>
             <section className="container px-4 mx-auto">
                
                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            
            
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Customer
                                            </th>
                                           
            
            
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Email</th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status Select</th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Action</th>
            
                                            
                                            
            
                                            
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {
                                            items.map(item=>(
                                                <tr key={item._id}>
                                            
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.name}</td>
                                            
                                            
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.email}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                <select className="w-full px-2 py-1 border border-gray-200 rounded-xl  outline-none transition-all duration-300 bg-white text-gray-800 hover:border-gray-300 cursor-pointer shadow-sm hover:shadow-md font-medium" name="status" id="">
                                                    <option value=""></option>
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipping">Shipping</option>
                                                </select>
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
                                                    <button onClick={''}  className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none btn" >
                                                      Delivered
                                                       
                                                    </button>
                                                </div>
                                            </td>
                                             <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                {
                                                    orders.map(order=>(<p key={order._id}>{order.orderDetails.status}</p>))
                                                }
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
            )}
           
        </div>
    );
};

export default ManageUser;