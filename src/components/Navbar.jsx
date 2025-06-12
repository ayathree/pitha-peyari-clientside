import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../pages/authenticationPages/providers/AuthProvider";
import { BsCartFill } from "react-icons/bs";
import { IoNotifications } from 'react-icons/io5';
import axios from "axios";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";


const Navbar = () => {
  const{user}=useAuth()
   const [isAdmin]=useAdmin()

   const { logOut } = useContext(AuthContext); 
     const [carts, setCarts] = useState([]);
       const [order,setOrder]=useState([])

  useEffect(() => {
    const controller = new AbortController(); // Create abort controller
  
    const getData = async () => {
      if (!user?.email || isAdmin === undefined) return;
      try {
        if (isAdmin) {
          const { data } = await axios(`${import.meta.env.VITE_API_URL}/orderAdmin/${user.email}`, {
            signal: controller.signal // Attach abort signal
          });
          setOrder(data);
        } else {
          const { data } = await axios(`${import.meta.env.VITE_API_URL}/cart/${user.email}`, {
            signal: controller.signal // Attach abort signal
          });
          setCarts(data);
          getData()
        }
      } catch (err) {
        // Check if error was from abort
        if (err.name === 'CanceledError' || err.message === 'canceled') return;
        
        if (err.response?.status === 401) {
          console.log('Session expired - please login again');
        }
      }
    };
  
    getData();
  
    // Cleanup function
    return () => {
      controller.abort(); // Cancel pending request on unmount/logout
    };
  }, [user, isAdmin]);





    return (
        <div className="navbar bg-base-100 ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        
           <NavLink className={({isActive})=>isActive?'text-yellow-600 font-bold ':''} to={'/'}><li>Home</li></NavLink>
           <NavLink className={({isActive})=>isActive?'text-yellow-600 font-bold ':''} to={'/shop'}><li>Shop</li></NavLink>
            <NavLink className={({isActive})=>isActive?'text-yellow-600 font-bold hidden ':'hidden'} to={'/about'}><li>About Us</li></NavLink>
              <NavLink className={({isActive})=>isActive?'text-yellow-600 font-bold ':''} to={'/contact'}><li>Contact Us</li></NavLink>
              
              {
                !user && !isAdmin && <Link to={'/login'}> <button className="font-bold ">Login</button></Link>
              }
         
        
        
      </ul>
    </div>
    <a class="text-3xl font-bold uppercase text-yellow-600">পিঠা পেয়ারি</a> 
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 flex justify-center items-center gap-3 text-xm">
     <NavLink className={({isActive})=>isActive?'text-yellow-600 font-bold ':''} to={'/'}><li>Home</li></NavLink>
           <NavLink className={({isActive})=>isActive?'text-yellow-600 font-bold ':''} to={'/shop'}><li>Shop</li></NavLink>
            <NavLink className={({isActive})=>isActive?'text-yellow-600 font-bold hidden ':'hidden'} to={'/about'}><li>About Us</li></NavLink>
              <NavLink className={({isActive})=>isActive?'text-yellow-600 font-bold ':''} to={'/contact'}><li>Contact Us</li></NavLink>
              {
                !user && !isAdmin && <Link to={'/login'}> <button className="font-bold ">Login</button></Link>
              }
               {/* {!user?(<></>):( <Link to={'/addProduct'}><li>Add items</li></Link>)} */}
    </ul>
  </div>
  <div className="navbar-end flex justify-end items-center gap-8">

    
     {user && !isAdmin &&  (
     <div className="flex justify-center items-center gap-7">
       <div className="relative inline-block group">
        {carts.length !== 0 && (
  <div className="absolute -top-2 left-3 badge badge-sm badge-neutral">
    <p className='text-white'>{carts.length}</p>
  </div>
)}
  <BsCartFill  className="text-xl text-yellow-600" />
  {/* <div className="invisible group-hover:visible fixed top-4 right-4 bg-gray-800 text-white text-sm px-3 py-2 rounded z-50 w-48 shadow-lg">
    {cart.length} 
  </div> */}
</div>
                        <div className="dropdown dropdown-end">
                            <button 
                                tabIndex={0} 
                                role="button" 
                                aria-label="User menu" 
                                className="font-bold text-yellow-600">
                                <div className="w-10 rounded-full">
                                    <p>{user?.displayName}</p>
                                </div>
                            </button>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1000] mt-3 w-52 p-2 shadow">
                                <NavLink className={({isActive})=>isActive?'text-yellow-600 font-bold ':''} to={'/myOrder'}><li className="justify-between">MyOrder</li></NavLink>
                                <NavLink className={({isActive})=>isActive?'text-yellow-600 font-bold ':''} to={'/wishList'}><li className="justify-between">WishList</li></NavLink>
                                <NavLink className={({isActive})=>isActive?'text-yellow-600 font-bold ':''} to={'/myCart'}><li className="justify-between">MyCart</li></NavLink>
                               
                                
                               
                                <li className="cursor-pointer" onClick={logOut}>Logout</li>
                            </ul>
                        </div>
     </div>
                    )}


      {user && isAdmin &&  (
       <div className="flex justify-center items-center gap-2">
         <div className="relative inline-block group">
        {order.length !== 0 && (
  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
)}
  <IoNotifications className="text-xl text-yellow-600" />
  <div className="invisible group-hover:visible fixed top-4 right-4 bg-gray-800 text-white text-sm px-3 py-2 rounded z-50 w-48 shadow-lg">
    {order.length} order notifications
  </div>
</div>
                        <div className="dropdown dropdown-end">
                            <button 
                                tabIndex={0} 
                                role="button" 
                                aria-label="User menu" 
                                className="font-bold text-yellow-600">
                                <div className="w-10 rounded-full">
                                    <p>{user?.displayName}</p>
                                </div>
                            </button>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1000] mt-3 w-52 p-2 shadow">
                                
                                <NavLink className={({isActive})=>isActive?'text-yellow-600 font-bold ':''} to={'/addProduct'}><li className="justify-between">Add Product</li></NavLink>
                                <NavLink className={({isActive})=>isActive?'text-yellow-600 font-bold ':''} to={'/manageOrder'}><li className="justify-between">Manage Order</li></NavLink>
                                 
                                
                                
                               
                                <li className="cursor-pointer" onClick={logOut}>Logout</li>
                            </ul>
                        </div>
       </div>
                    )}              
  </div>
</div>
    );
};

export default Navbar;