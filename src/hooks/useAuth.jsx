import { useContext } from "react";
import { AuthContext } from "../pages/authenticationPages/providers/AuthProvider";


const useAuth = () => {
   const auth = useContext(AuthContext)
    return auth
};

export default useAuth;