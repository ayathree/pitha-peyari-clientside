// import axios from "axios";
import useAuth from "./useAuth";
import {useQuery} from '@tanstack/react-query'
import useAxiosSecure from "./useAxiosSecure";



const useAdmin = () => {
   const { user, loading } = useAuth();
   const axiosSecure = useAxiosSecure()
    
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !!user?.email && !loading, // Only run if user email exists and not loading
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/allUsers/admin/${user?.email}`);
                console.log(res.data);
                return res.data?.admin || false;

            } catch (error) {
                console.error("Admin check failed:", error);
                return false;
            }
        }
    });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;