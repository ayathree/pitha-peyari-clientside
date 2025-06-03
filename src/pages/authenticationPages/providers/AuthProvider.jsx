import { createContext, useEffect, useState } from "react";
import auth from "../../../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
        const[loading, setLoading] = useState(true)
    
        const createUser = (email, password)=>{
            setLoading(true)
            return createUserWithEmailAndPassword(auth, email, password)
        }
    
        const signIn = (email, password)=>{
            setLoading(true)
            return signInWithEmailAndPassword(auth, email, password)
        }
        const google = ()=>{
            setLoading(true)
            return signInWithPopup(auth, googleProvider)
        }
        const updateUser=(name,photo)=>{
            return updateProfile(auth.currentUser,{
                displayName: name,
                photoURL: photo
            })
        }
    
    
       
    
        const logOut = ()=>{
            setUser(null)
            setLoading(false)
            return signOut(auth)
        }
    
        useEffect(()=>{
            const unsubscribe= onAuthStateChanged(auth, user=>{
                 setUser(user);
                 console.log('current user', user)
                 setLoading(false)
             });
             return()=>{
                 return unsubscribe();
             }
         },[])
    
        const allInfo ={user, createUser, signIn, logOut, loading, google, updateUser, setUser}
        return (
            <AuthContext.Provider value={allInfo} >
                {children}
    
            </AuthContext.Provider>
        );
};

export default AuthProvider;