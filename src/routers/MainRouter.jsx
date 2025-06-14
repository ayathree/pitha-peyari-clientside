import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../pages/Root';
import Home from '../pages/Home';
import Shop from '../pages/publicPages/Shop';
import AboutUs from '../pages/publicPages/AboutUs';
import ContactUs from '../pages/publicPages/ContactUs';
import LogIn from '../pages/authenticationPages/LogIn';
import Registration from '../pages/authenticationPages/Registration';
import Error from '../pages/Error';
import AddProducts from '../pages/adminPages/AddProducts';
import AllItems from '../pages/adminPages/AllItems';
import UpdateItems from '../pages/adminPages/UpdateItems';
import MyCart from '../pages/userPages/MyCart';
import MyOrder from '../pages/userPages/MyOrder';
import WishList from '../pages/userPages/WishList';
import Checkout from '../pages/userPages/Checkout';
import UpdateUserOrder from '../pages/userPages/UpdateUserOrder';
import ItemDetails from '../pages/publicPages/ItemDetails';
import ManageOrder from '../pages/adminPages/ManageOrder';
import ManageUser from '../pages/adminPages/ManageUser';
import ViewUser from '../pages/adminPages/ViewUser';
import OrderReceipt from '../pages/adminPages/OrderReceipt';
import AdminRouter from './AdminRouter';
import PrivateRouter from './PrivateRouter';
import Category from '../pages/publicPages/Category';

const MainRouter = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        errorElement:<Error></Error>,
        children:[
            {
                index: true,
                element:<Home></Home>
            },
            {
                path:'/shop',
                element:<Shop></Shop>
            },
            {
                path:'/about',
                element:<AboutUs></AboutUs>
            },
            {
                path:'/contact',
                element:<ContactUs></ContactUs>
            },
            {
                path:'/login',
                element:<LogIn></LogIn>
            },
            {
                path:'/registration',
                element:<Registration></Registration>
            },
            {
                path:'/addProduct',
                element:<AdminRouter><AddProducts></AddProducts></AdminRouter>
            },
            {
                path:'/allProduct/:email',
                element:<AdminRouter><AllItems></AllItems></AdminRouter>
            },
            {
                path:'/updateItem/:id',
                element:<AdminRouter><UpdateItems></UpdateItems></AdminRouter>,
                loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/items/${params.id}`,{credentials:"include"})
            },
            {
                path:'/manageOrder',
                element:<AdminRouter><ManageOrder></ManageOrder></AdminRouter>
            },
            {
                path:'/viewUser/:id',
                element:<AdminRouter><ViewUser></ViewUser></AdminRouter>,
                loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/orderData/${params.id}`, {credentials:"include"})
            },
            {
                path:'/orderReceipt/:id',
                element:<AdminRouter><OrderReceipt></OrderReceipt></AdminRouter>,
                loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/orderData/${params.id}`, {credentials:"include"})
            },
            {
                path:'/manageUser',
                element:<ManageUser></ManageUser>
            },
            {
                path:'/myCart',
                element:<PrivateRouter><MyCart></MyCart></PrivateRouter>
            },
            {
                path:'/myOrder',
                element:<PrivateRouter><MyOrder></MyOrder></PrivateRouter>
            },
            {
                path:'/wishList',
                element:<PrivateRouter><WishList></WishList></PrivateRouter>
            },
            // {
            //     path:'/Checkout/:email',
            //     element:<PrivateRouter><Checkout></Checkout></PrivateRouter>
            // },
            {
                path:'/updateUserOrder/:id',
                element:<PrivateRouter><UpdateUserOrder></UpdateUserOrder></PrivateRouter>,
                loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/orderData/${params.id}`,{credentials:"include"})
            },
            {
                path:'/itemDetails/:id',
                element:<ItemDetails></ItemDetails>,
                loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/items/${params.id}`,{credentials:"include"})
            },
            {
                path:'/categories/:category',
                element:<Category></Category>,
                loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/itemCategory/${params.category}`,{credentials:"include"})
            }
        ]

    }
])

export default MainRouter;