import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice';

const AuthContext = createContext();
 
export const AuthProvider=({chiildren})=>{
    const baseUrl = useSelector((state) => state.baseUrl.baseUrl); // Get the base URL from Redux
    const { currentUser, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [user,setUser] = useState(null);
    const [loading,setLoading]= useState(true);

    const logOut = async()=>{
        dispatch(signInStart());
        const res = await fetch()
    }

    useEffect(()=>{
       const logOut = async()=>{
        try {
            dispatch(signOutUserStart)
            const res = await axios.get(`${baseUrl}/auth/logout`);
            const data = await res.json();
            if(data.success === false){
                signOutUserFailure(data.message);
                return;
            }
            dispatch(signOutUserSuccess(data));
        } catch (error) {
            dispatch(signOutUserFailure(error.message));
        }
       }
    })
  return (
    <AuthContext.Provider value={{user,login,logOut,loading}} >
    {chiildren}
    </AuthContext.Provider>
  )
}
