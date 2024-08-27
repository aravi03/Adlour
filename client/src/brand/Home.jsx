import React from 'react';
import { useState, useContext, useEffect } from "react";
import ListCreators from './ListCreators'
import Navbar from './Navbar'
const Home = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [creators,updateCreators] = useState([])
  const [query, setQuery] = useState('')


    useEffect(() => {
        fetch(apiUrl+"/api/brand/auth/isloggedin",{
          credentials: "include"})
                .then((res) => res.json())
                .then((json) => {
                  if(json.user) setisAuth(true)
                  updateCall(true)                         
                })   
                
                fetch(apiUrl+'/api/brand/searchcreators', {
                  method: 'POST',
                  credentials: 'include',
                  headers: {
                    'Content-Type': 'application/json', // Specify the content type
                  },
                  body: JSON.stringify({ query }), // Send the query as JSON in the request body
                })
                        .then((res) => res.json())
                        .then((json) => {
                          console.log(json.creators)
                          updateCreators(json.creators)
                        })  

              }, [])  

              const handleClick = (e) => {
                e.preventDefault()
                  fetch(apiUrl+'/api/brand/searchcreators', {
                      method: 'POST',
                      credentials: 'include',
                      headers: {
                        'Content-Type': 'application/json', // Specify the content type
                      },
                      body: JSON.stringify({ query }), // Send the query as JSON in the request body
                    })
                            .then((res) => res.json())
                            .then((json) => {
                              console.log(json.creators)
                              updateCreators(json.creators)
                            })
              }

    return(
       <div>
        <Navbar/>
    <div class="container-fluid mt-5">
    <div className="row">
        <div className="col-md-3 p-4">
          <div className='row'>

        <form className="d-flex mt-5" role="search">
        <input className="form-control" type="search" placeholder="Search" aria-label="Search"  value={query}
          onChange={(e) => setQuery(e.target.value)}>
        </input>       

        <button className="btn mx-1 search-btn" type="submit" onClick={handleClick}>
        <i class="bi bi-search"></i>
        </button>
      </form>
      </div>
      <div className='row'>
        {/* Location Dropdown */}
        {/* <div className="form-group mt-3">
              <select 
                className="form-select" 
                id="locationFilter"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="" >All locations</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
            </div> */}

            {/* Category Dropdown */}
            {/* <div className="form-group mt-3">
              <select 
                className="form-select" 
                id="categoryFilter"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
            </div> */}
      </div>
        </div>
        <div className='col'>
        {/* <div class="container">
  <div class="row"> */}
  <ListCreators creators={creators}/>
  {/* </div>
</div> */}

        </div>
    </div>
    {/* <div class="row justify-content-center">
      <div class="col-lg-6 mt-5 align-items-center">
      <form className="d-flex mt-5" role="search">
        <input className="form-control" type="search" placeholder="Search" aria-label="Search"  value={query}
          onChange={(e) => setQuery(e.target.value)}>
        </input>
        <button className="btn mx-1 search-btn" type="submit" onClick={handleClick}>
        <i class="bi bi-search"></i>
        </button>
      </form>
      </div>
      <ListBrands brands={brands}/>
    </div> */}
  </div>       
        
    </div>
    )
}
export default Home;
