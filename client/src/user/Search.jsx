import Navbar from './Navbar'
import { useState, useContext, useEffect } from "react";
import ListBrands from './ListBrands'
import './Search.css'
function Search() {

  const apiUrl = import.meta.env.VITE_API_URL;
    const [query, setQuery] = useState('')
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [brands,updateBrands] = useState([])
    const countries = [
      'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
      'France', 'Japan', 'India', 'Brazil', 'South Africa'
    ];
    
    const categories = [
      'Fashion', 'Tech', 'Food', 'Health', 'Travel',
      'Sports', 'Education', 'Finance', 'Entertainment', 'Automotive'
    ];

    useEffect(() => {
      fetch(apiUrl+'/api/user/user/searchbrand', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify({ query }), // Send the query as JSON in the request body
      })
              .then((res) => res.json())
              .then((json) => {
                console.log(json.brands)
                updateBrands(json.brands)
              })         
            }, [])  

    const handleClick = (e) => {
      e.preventDefault()
        fetch(apiUrl+'/api/user/user/searchbrand', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json', // Specify the content type
            },
            body: JSON.stringify({ query }), // Send the query as JSON in the request body
          })
                  .then((res) => res.json())
                  .then((json) => {
                    console.log(json.brands)
                    updateBrands(json.brands)
                  })
    }
    
    return (        
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
  <ListBrands brands={brands}/>
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
  // <div className="container-fluid">
  //     <div className="row">
  //       {/* Left Sidebar */}
  //       <div className="col-md-3 bg-light p-4">
  //         <h4>Filters</h4>
  //         <form onSubmit={handleSearch}>
  //           {/* Search Bar */}
  //           <div className="form-group">
  //             <label htmlFor="searchBar">Search</label>
  //             <input 
  //               type="text" 
  //               className="form-control" 
  //               id="searchBar" 
  //               placeholder="Search..." 
  //               value={searchTerm}
  //               onChange={(e) => setSearchTerm(e.target.value)}
  //             />
  //           </div>

  //           {/* Location Filter */}
  //           <div className="form-group mt-3">
  //             <label htmlFor="locationFilter">Location</label>
  //             <input 
  //               type="text" 
  //               className="form-control" 
  //               id="locationFilter" 
  //               placeholder="Location..." 
  //               value={location}
  //               onChange={(e) => setLocation(e.target.value)}
  //             />
  //           </div>

  //           {/* Category Filter */}
  //           <div className="form-group mt-3">
  //             <label htmlFor="categoryFilter">Category</label>
  //             <select 
  //               className="form-control" 
  //               id="categoryFilter"
  //               value={category}
  //               onChange={(e) => setCategory(e.target.value)}
  //             >
  //               <option value="">Select Category</option>
  //               <option value="Category 1">Category 1</option>
  //               <option value="Category 2">Category 2</option>
  //               <option value="Category 3">Category 3</option>
  //             </select>
  //           </div>

  //           <button type="submit" className="btn btn-primary mt-3">
  //             Search
  //           </button>
  //         </form>
  //       </div>

  //       {/* Results Area */}
  //       <div className="col-md-9 p-4">
  //         <h4>Results</h4>
  //         <div className="row">
  //           {results.length > 0 ? (
  //             results.map((result) => (
  //               <div className="col-md-6 col-lg-4 mb-4" key={result.id}>
  //                 <div className="card">
  //                   <div className="card-body">
  //                     <h5 className="card-title">{result.title}</h5>
  //                     <p className="card-text">{result.description}</p>
  //                   </div>
  //                 </div>
  //               </div>
  //             ))
  //           ) : (
  //             <p>No results found</p>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
     
    )
}
export default Search;
