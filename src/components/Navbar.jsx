import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../pages/authenticationPages/providers/AuthProvider";
import { BsCartFill } from "react-icons/bs";
import axios from "axios";


const Navbar = () => {
   const { user, logOut } = useContext(AuthContext); 
     const [carts, setCarts] = useState([]);
    useEffect(() => {
    if (user?.email) {  // Only run when user.email exists
        getData();
    }
}, [user?.email]);  // Dependency on user.email only

const getData = async () => {
    try {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/cart/${user.email}`);
        setCarts(data);
    } catch (error) {
        console.error("Failed to fetch cart:", error);
    }
};

// To see updated carts, use another useEffect
useEffect(() => {
    console.log("Cart items updated:", carts.length);
}, [carts]);  // Runs whenever carts changes
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
        
            <li>Home</li>
            <li>Shop</li>
             <li>About Us</li>
              <li>Contact Us</li>
         
        
        
      </ul>
    </div>
    <a class="text-3xl font-bold uppercase text-yellow-600">pitha peyari</a> 
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 flex justify-center items-center gap-3">
      <Link to={'/'}> <li>Home</li></Link>
           <Link to={'/shop'}> <li>Shop</li></Link>
            <Link to={'/about'}> <li>About Us</li></Link>
              <Link to={'/contact'}><li>Contact Us</li></Link>
               {/* {!user?(<></>):( <Link to={'/addProduct'}><li>Add items</li></Link>)} */}
    </ul>
  </div>
  <div className="navbar-end flex justify-end items-center gap-8">

    <div className="relative">
      <Link to={''}><a className="cursor-pointer text-3xl text-yellow-600"><BsCartFill/></a></Link>
      <div className=" absolute bottom-4 left-4 bg-black text-white rounded-full px-2 ">{carts.length}</div>
    </div>
     {!user ? (
                       <Link to={'/login'}> <button className="font-bold text-yellow-600">Login</button></Link>
                    ) : (
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
                                <Link to={'/myOrder'}><li className="justify-between">MyOrder</li></Link>
                                <Link to={'/wishList'}><li className="justify-between">WishList</li></Link>
                                <Link to={'/myCart'}><li className="justify-between">MyCart</li></Link>
                                <Link to={'/addProduct'}><li className="justify-between">Add Product</li></Link>
                                <Link to={'/manageOrder'}><li className="justify-between">Manage Order</li></Link>
                                 <Link to={'/manageUser'}><li className="justify-between">Manage User</li></Link>
                                
                               
                                <li className="cursor-pointer" onClick={logOut}>Logout</li>
                            </ul>
                        </div>
                    )}
  </div>
</div>
    );
};

export default Navbar;