import { useState, useContext, useEffect } from "react";
import { useNavigate, Outlet } from 'react-router-dom'
import { UserContext } from "./utils/UserContext"
const Auth = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [userContext, setUserContext] = useContext(UserContext)
  const [call,updateCall] = useState(false)

  useEffect(() => {  
    // if(userContext!=null)
    //   {updateCall(true)
    //     console.log("here",userContext)
    //   }
    // else
    fetch(apiUrl+"/api/user/auth/isloggedin",{
      credentials: "include"})
            .then((res) => res.json())
            .then((json) => {
              console.log('user from auth',json.user)
              setUserContext(oldValues => {
                console.log("old ",oldValues)
                updateCall(true)
                return { ...oldValues, user: json.user }
                })
            }) 
          }          , [])            
            
return (
    !call ? <h1>Loading</h1> : userContext.user!=null ? <Outlet/> :  navigate("/creator/login")
  )
}
export default Auth;