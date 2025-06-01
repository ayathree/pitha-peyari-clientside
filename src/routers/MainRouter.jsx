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
                element:<AddProducts></AddProducts>
            },
            {
                path:'/allProduct/:email',
                element:<AllItems></AllItems>
            },
            {
                path:'/updateItem/:id',
                element:<UpdateItems></UpdateItems>,
                loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/items/${params.id}`)
            },
            {
                path:'/manageOrder',
                element:<ManageOrder></ManageOrder>
            },
            {
                path:'/viewUser/:id',
                element:<ViewUser></ViewUser>,
                loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/orderData/${params.id}`)
            },
            {
                path:'/orderReceipt/:id',
                element:<OrderReceipt></OrderReceipt>,
                loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/orderData/${params.id}`)
            },
            {
                path:'/manageUser',
                element:<ManageUser></ManageUser>
            },
            {
                path:'/myCart',
                element:<MyCart></MyCart>
            },
            {
                path:'/myOrder',
                element:<MyOrder></MyOrder>
            },
            {
                path:'/wishList',
                element:<WishList></WishList>
            },
            {
                path:'/Checkout/:email',
                element:<Checkout></Checkout>
            },
            {
                path:'/updateUserOrder/:id',
                element:<UpdateUserOrder></UpdateUserOrder>,
                loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/orderData/${params.id}`)
            },
            {
                path:'/itemDetails/:id',
                element:<ItemDetails></ItemDetails>,
                loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/items/${params.id}`)
            }
        ]

    }
])

export default MainRouter;