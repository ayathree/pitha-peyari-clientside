import { Navigate, useLocation } from "react-router";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";


const AdminRouter = ({ children }) => {
   const {  loading, user } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading ) {
        return <p className="text-yellow-700">Loading....</p>;
    }

    // Check both user and admin status
    if ( user && isAdmin) {
        return children;
    }

    // Redirect if not admin or not logged in
    return <Navigate to="/shop" state={{ from: location }} replace />;
};

export default AdminRouter;