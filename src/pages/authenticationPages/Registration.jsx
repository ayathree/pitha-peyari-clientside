import { useContext, useState, } from "react";
import { Link, useNavigate , useLocation } from "react-router";
import { AuthContext } from "./providers/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import { IoEye, IoEyeOff } from "react-icons/io5";
// import useAdmin from "../../hooks/useAdmin";


const Registration = () => {
    const{ createUser,updateUser, user, setUser}= useContext(AuthContext)
        const navigate = useNavigate()
         const location = useLocation()
        const[registerError, setRegisterError]= useState('');
    const[success, setSuccess] = useState('');
    const[showPass, setShowPass]=useState(false);
        // const [isAdmin] = useAdmin();
        const from = location.state?.from || '/' 

//          useEffect(() => {
//   if (user) {
//     // Define your actual admin route patterns
//     const adminRoutes = [
//       '/addProduct',
//       '/allProduct/:email',
//       '/updateItem/:id',
//       '/manageOrder',
//       '/viewUser/:id',
//       '/orderReceipt/:id',
      
     
//     ];

//     const isRequestingAdminRoute = adminRoutes.some(route => 
//       from.startsWith(route)
//     );

//     // Check if trying to access admin route without admin privileges
//     if (isRequestingAdminRoute && !isAdmin) {
//       navigate('/', { replace: true });
//     }
//     // Check if admin is trying to access non-admin routes
//     else if (!isRequestingAdminRoute && isAdmin && from !== '/') {
//       navigate('/', { replace: true }); 
//     }
//     // Otherwise go to requested page
//     else {
//       navigate(from, { replace: true });
//     }
//   }
// }, [user, isAdmin, navigate, from]);
        const handleRegister =async e=>{
            e.preventDefault();
            const form = e.target
            const name = form.name.value
            const email=form.email.value
            const password = form.password.value
            const newRegister =(name,email, password)
            console.log(newRegister)
            setRegisterError('');
        setSuccess('');
         if (password.length < 6) {
            setRegisterError('Password should be in 6 characters or longer')
         }
        
        
            try{
               
              const result = await createUser(email,password)
              console.log(result)
             
              form.reset();
              await updateUser(name)

              // 3. Save to MongoDB
                      const userInfo = { name, email, role: 'user' };
                      const { data } = await axios.post(
                          `${import.meta.env.VITE_API_URL}/allUsers`, 
                          userInfo
                      );
                      console.log('User saved to DB:', data);
                      
                      
                      setUser({ ...result?.user, displayName:name })
                      await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            { email: user?.email },
            { withCredentials: true }
        );
                 navigate(from,{replace:true})
                toast.success('Sign In successfully')
                setSuccess('Registered Successfully')
        
        
            }
            catch(err){
              console.log(err)
               setRegisterError(err.message)
                if (err.message ==='Firebase: Error (auth/email-already-in-use).') {
            setRegisterError('This Email Already In Use, Try Another')
         }
        
            }
        
          }
    return (
        <div>
           <section className="bg-white dark:bg-gray-900">
    <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form onSubmit={handleRegister} className="w-full max-w-md">
           

            <div className="relative flex items-center mt-8">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </span>

                <input name="name" type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username"/>
            </div>

            

            <div className="relative flex items-center mt-6">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </span>

                <input name="email" type="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address"/>
            </div>
            <div class="flex items-center justify-between mt-4">
            

            <a href="#" class="text-xs text-center text-green-600 font-bold capitalize dark:text-gray-400 hover:underline">Your password should be 1-6 characters in length.</a>

            
        </div>

            <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input name="password" type={showPass?"text":'password'} className="relative block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password"/>
            <span className="absolute top-3 right-10 text-2xl" onClick={()=>setShowPass(!showPass)}>{showPass?<IoEye />:<IoEyeOff />}</span>
            </div>
            {
            registerError && <p className="text-red-600 font-bold">{registerError}</p>
        }
        {
            success && <p className="text-green-600 font-bold">{success}</p>

        }

            {/* <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password"/>
            </div> */}
            
            

            <div className="mt-6">
                <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-yellow-600 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Sign Up
                </button>

                <div className="mt-6 text-center ">
                    <Link to={'/login'}><button className="text-sm text-yellow-600 hover:underline dark:text-yellow-400">
                        Already have an account?
                    </button>
                    </Link>
                </div>
            </div>
        </form>
    </div>
</section>
           
        </div>
    );
};

export default Registration;