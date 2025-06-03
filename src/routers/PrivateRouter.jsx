// import { useContext } from "react";
// import { AuthContext } from "../pages/authenticationPages/providers/AuthProvider";
// import useAdmin from "../hooks/useAdmin";
import { Navigate, useLocation } from "react-router";
import useAdmin from "../hooks/useAdmin";
// import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import { AuthContext } from "../pages/authenticationPages/providers/AuthProvider";


const PrivateRouter = ({children}) => {
   const { user, loading } = useContext(AuthContext);
   const[isAdmin,isAdminLoading]=useAdmin()
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <p className="text-yellow-700">Loading....</p>;
    }
    // Only check for user existence, not admin status
    if (user && isAdmin === false) {
        return children;
    }


    // Redirect if not logged in
    return <Navigate to="/shop" state={{ from: location }} replace />;
};

export default PrivateRouter;