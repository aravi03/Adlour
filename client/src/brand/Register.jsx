import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext, useEffect } from "react";
import { useNavigate, Outlet } from 'react-router-dom'
import Navbar from './NavbarLogin'
import './Login.css'
import GoogleLogo from '/web_light_rd_SI.svg'
import { Form, Button, Alert } from 'react-bootstrap';

const RegisterPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [isAuth,setisAuth] = useState(false)
  const [call,updateCall] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
    // Handle email input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Basic client-side validation
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
                }    
        try {
          const response = await fetch(apiUrl+'/api/brand/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });          
          const result = await response.json();
          console.log(result)
          if (response.ok) {
            setSuccess('Registration successful! Please check your email for verification.');
            setFormData({
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
            });
            setError('');
            navigate("/login");
          } else {
            setError(result.message || 'Registration failed.Please try again');
            setSuccess('');
          }
        } catch (error) {
          console.error('Error:', error);
         setError('Something went wrong. Please try again.');
          setSuccess('');
        }
      };


  useEffect(() => {
    fetch(apiUrl+"/api/brand/auth/isloggedin",{
      credentials: "include"})
            .then((res) => res.json())
            .then((json) => {
              if(json.user) setisAuth(true)
              updateCall(true)                         
            })           
          }, [])  
          
   // Handle form submission
//    const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent the default form submission behavior

//     const formData = { email, password };

//     // try {
//       // Send a POST request to your backend (replace with your API endpoint)
//       fetch('http://localhost:5000/api/user/auth/login', {
//         method: 'POST',
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json"        },
//         body: JSON.stringify(formData),
//         credentials: 'include', // Important for sending cookies with the request
//       }).then((res)=>res.json()).then((myres)=>{
//         console.log(myres)
//                 navigate("/home");

//       })
//     //   const result = await response.json();
//     //   console.log(result)
//     //   if (response.ok) {
//     //     // Handle success (e.g., redirect, display a success message)
//     //     console.log('Login successful:', result);
//     //     // navigate("/home");

//     //   } else {
//     //     // Handle error (e.g., display error message)
//     //     console.error('Login failed:', result);
//     //   }
//     // } catch (error) {
//     //   console.error('Error during form submission:', error);
//     // }
//   };

  const handleClickGoogle = () => {
    console.log("here")
    window.open(apiUrl+"/api/brand/auth/google", "_self");
}
  


  return (
    !call ? <h1>Loading</h1> : isAuth ? navigate("/brand/profile") :
    <div className="container-fluid mt-5">
      <Navbar/>
    {/* <div className='row justify-content-center'>
    <div className='col-3 my-5'>
    <h1 className="text-center mb-4">Login Page</h1>     
    
    <button className="btn btn-dark"
    onClick={handleClick}> 
    Google Login
    </button>
    </div>
    </div> */}
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
            <p className=' mx-3 mt-4 brand-tagline-login'>For Brands</p>
          </h1>
          <p style={{color: 'hsl(217, 10%, 50.8%)'}}>
          Register to access a curated network of content creators ready to bring your brand's vision to life. Whether you're launching a new product or amplifying your brand's reach, Adlour connects you with creators who resonate with your target audience. Discover authentic collaborations, track campaign performance, and manage partnerships all in one place. Let's build something great together.
          </p>
        </div>
        <div style={{marginTop:'120px'}} class="col-lg-6">
          <div class="card mt-lg-5">
            <div class="card-body py-5 px-md-5">          
            <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Brand Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your Name"
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword" className="mt-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </Form.Group>
      
        <div class="text-center">
        {error && <p>{error}</p>} {/* Display error message */}        

        <Button style={{backgroundColor:'var(--accent-color)',color:'white'}} variant="dark" type="submit" className="mt-4">
          Register
        </Button>                
                <br></br>
                or you can
                <br></br>
                <button onClick={handleClickGoogle}  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
              <img src={GoogleLogo}></img>
              </button>  
              <br></br>
              Already have an account? You can <a href='/login'>Login</a>              
                </div>
      </Form>
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

export default RegisterPage;
