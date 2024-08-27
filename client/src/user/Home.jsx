import { useState, useContext, useEffect } from "react";
import Navbar from './Navbar'
import ListHomeCampaigns from "./ListHomeCampaigns";

const Home = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [query, setQuery] = useState('')
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [campaigns,updateCampaigns] = useState([])
    const countries = [
      'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
      'France', 'Japan', 'India', 'Brazil', 'South Africa'
    ];
    
    const categories = [
      'Fashion', 'Tech', 'Food', 'Health', 'Travel',
      'Sports', 'Education', 'Finance', 'Entertainment', 'Automotive'
    ];
    const handleClick = (e) => {
      e.preventDefault()
        fetch(apiUrl+'/api/user/user/searchcampaign',
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json', // Specify the content type
            },
            body: JSON.stringify({ query }), // Send the query as JSON in the request body
          })
                  .then((res) => res.json())
                  .then((json) => {
                    console.log(json.campaigns)
                    updateCampaigns(json.campaigns)
                  })
    }
    useEffect(() => {
      fetch(apiUrl+'/api/user/user/searchcampaign',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json', // Specify the content type
          },
          body: JSON.stringify({query}), // Send the query as JSON in the request body
        })
                .then((res) => res.json())
                .then((json) => {
                  console.log(json.campaigns)
                  updateCampaigns(json.campaigns)
                })         
              }, [])  
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
        <div className="form-group mt-3">
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
            </div>

            {/* Category Dropdown */}
            <div className="form-group mt-3">
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
            </div>
      </div>
        </div>
        <div className='col'>
        
  <ListHomeCampaigns campaigns={campaigns}/>


        </div>
    </div>
    
  </div>       
        
    </div>
    )

}
export default Home;
