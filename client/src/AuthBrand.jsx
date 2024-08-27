import { useState, useContext, useEffect } from "react";
import { useNavigate, Outlet } from 'react-router-dom'
import { BrandContext } from "./utils/BrandContext"
const AuthBrand = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [brandContext, setBrandContext] = useContext(BrandContext)
  const [call,updateCall] = useState(false)

  useEffect(() => {  
    // if(userContext!=null)
    //   {updateCall(true)
    //     console.log("here",userContext)
    //   }
    // else
    fetch(apiUrl+"/api/brand/auth/isloggedin",{
      credentials: "include"})
            .then((res) => res.json())
            .then((json) => {
              console.log('user from auth',json.user)
              setBrandContext(oldValues => {
                console.log("old ",oldValues)
                updateCall(true)
                return { ...oldValues, brand: json.user }
                })
            }) 
          }          , [])            
            
return (
    !call ? <h1>Loading</h1> : brandContext.brand!=null ? <Outlet/> :  navigate("/brand/login")
  )
}
export default AuthBrand;