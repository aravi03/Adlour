import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext, useEffect } from "react";
import { useNavigate, Outlet } from 'react-router-dom'
import Navbar from './NavbarLogin'
import './Login.css'
import GoogleLogo from '/web_light_rd_SI.svg'
const LoginPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [isAuth,setisAuth] = useState(false)
  const [call,updateCall] = useState(false)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error, setError] = useState('');

    // Handle email input change
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    // Handle password input change
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };


  useEffect(() => {
    fetch(apiUrl+"/api/user/auth/isloggedin",{
      credentials: "include"})
            .then((res) => res.json())
            .then((json) => {
              if(json.user) setisAuth(true)
              updateCall(true)                         
            })           
          }, [])  
          
   // Handle form submission
   const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const formData = { email, password };
    try {
      const response = await fetch(apiUrl+'/api/user/auth/login', {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      // Check if the response contains user data or an error message
      if (result.user) {
        navigate("/creator/profile");
      } else {
        // Handle specific error messages from the server
        handleServerError(result.message);
      }
    } catch (err) {
      // Handle network errors or other unexpected errors
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    }
  };

  const handleServerError = (message) => {
    if (message.includes('Username')) {
      setError('Username does not exist.');
    } else if (message.includes('Password')) {
      setError('Password is incorrect.');
    } else {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleClickGoogle = () => {
    console.log("here")
    window.open(apiUrl+"/api/user/auth/google", "_self");
}
  
const handleClickLogin = () => {
  fetch(apiUrl+"/api/user/auth/login",{
    credentials: "include"})
    .then((res) => res.json())
            .then((json) => {
              if(json.user) setisAuth(true)
              updateCall(true)                         
            })     
}

  return (
    !call ? <h1>Loading</h1> : isAuth ? navigate("/creator/profile") :
    <div className="container-fluid mt-5">
      <Navbar/>
    
<section class="">
  <div class="px-4 py-5 px-md-5 text-center text-lg-start" style={{backgroundColor: 'hsl(0, 0%, 96%)'}}>
  <div class="container" style={{height:'100%'}}>      
  <div class="d-flex align-items-center" style={{height:'70%'}}>
      <div class="row gx-lg-5 align-items-center">
        <div class="col-lg-6 mb-5 mb-lg-0">
          
          <h1 class="adlour-logo-login display-3 fw-bold ls-tight  d-flex align-items-center me-auto me-xl-0">
            {/* The best offer <br /> */}
            <h1>Adlour</h1>
            {/* <span>.</span> */}
            <p className=' mx-3 mt-4 brand-tagline-login'>For Creators</p>
          </h1>
          <p style={{color: 'hsl(217, 10%, 50.8%)'}}>
          Log in to connect with leading brands eager to collaborate with influencers like you. At Adlour, your creativity meets opportunity. Whether you're looking to partner with brands that align with your values or expand your influence, we provide the tools to manage your campaigns and track your impact. Let’s create meaningful content and grow together.

</p>
        </div>
        <div class="col-lg-6 mt-lg-5 mb-5 mb-lg-0">
          <div class="card">
            <div class="card-body py-5 px-md-5">          
              <form onSubmit={handleSubmit}>                
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="email"  value={email}
          onChange={handleEmailChange} required
          
                  id="form3Example3" class="form-control" />
                  <label class="form-label" for="form3Example3">Email address</label>
                </div>
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="password" required  value={password}
          onChange={handlePasswordChange}
                  id="form3Example4" class="form-control" />
                  <label class="form-label" for="form3Example4">Password</label>
                </div>           
               

                <div class="text-center">
                {error && <p>{error}</p>} {/* Display error message */}        

                <button style={{backgroundColor:'var(--accent-color)',color:'white'}} type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-block mb-4">
                  Login
                </button>
                <br></br>
                or you can
                <br></br>
                <button onClick={handleClickGoogle}  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
              <img src={GoogleLogo}></img>
              </button>
              <br></br>             
             Don't have an account? You can <a href='/register'>Register</a>              
                </div>

               
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

  </div>
</section>
              
      
        </div>     
  );
};

export default LoginPage;
