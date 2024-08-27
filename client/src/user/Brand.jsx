import { useState, useContext, useEffect } from "react";
import Navbar from './Navbar'
import ListBrandCampaigns from "./ListBrandCampaigns";
import Apparel from '../../public/apparel.png';
import Eligibility from '../../public/person_check.png';
import Cover from '../../public/shoes_cover.jpg';
import { useParams } from 'react-router-dom';

const Home = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams(); // Access the id from the URL
    const [query, setQuery] = useState('')
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [brand,updateBrand] = useState([])
    const [campaigns,updateCampaigns] = useState([])
    const countries = [
      'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
      'France', 'Japan', 'India', 'Brazil', 'South Africa'
    ];
    
    const categories = [
      'Fashion', 'Tech', 'Food', 'Health', 'Travel',
      'Sports', 'Education', 'Finance', 'Entertainment', 'Automotive'
    ];
    
    useEffect(() => {
        const brandID=id
        const url=apiUrl+'/api/user/user/viewbrand/'+id
         fetch(url,{credentials:'include'})
         .then((res) => res.json())
                  .then((json) => {
                    console.log(json.brand)
                    updateBrand(json.brand)
                  })           



        fetch(apiUrl+'/api/user/user/viewcampaigns', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json', // Specify the content type
            },
            body: JSON.stringify({brandID}), // Send the query as JSON in the request body
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
        <div className="col-md-4 mt-5">
        <div className="card" style={{position:'relative',backgroundColor:'white',borderColor: '#f4f4f4'}} >
              {/* <img style={{width:'100%', height:'100%'}} src={Cover} class="card-img-top" alt="Cover Photo"/> */}
                <div className="card-body">
                <div className="d-flex align-items-center">
                <img className="rounded-circle" style={{border: '3px solid var(--accent-color)',height:'100px',width:'100px',backgroundColor:'white'}} src={brand.profilePic}
              onError={(e) => e.target.src = "/profilePic.jpg"} alt={'Name'} />
                <div className="flex-grow-1">
    <h5 className="card-title text-center mb-0" style={{position: 'relative', left: '-50px'}}>
      <a href='' style={{textDecoration: 'none', color: 'black'}}>{brand.name}</a>
    </h5>
  </div>
                </div>             

                <p className="text-center">
                <a href="" style={{textDecoration:'none'}} class="text-muted fw-medium">{brand.website}</a>
                </p>
                <div className="d-flex align-items-center mt-4">                  
                  {/* <img className='' style={{width:'20px'}} src={Apparel}></img> */}
                  {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Categories</Tooltip>}> */}
                    <i style={{color:'#e84545'}} className="bi bi-tags-fill me-2 bs-tooltip"></i>
                  {/* </OverlayTrigger> */}
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>Category: </p>
                  <p className="mb-0">{brand.category}</p>
                </div>
                <div className="d-flex align-items-center mt-4">                  
                  {/* <img className='' style={{width:'20px'}} src={Apparel}></img> */}
                  {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Categories</Tooltip>}> */}
                    <i style={{color:'#e84545'}} className="bi bi-building me-2 bs-tooltip"></i>
                  {/* </OverlayTrigger> */}
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>Business Area: </p>
                  <p className="mb-0">{brand.location}</p>
                </div>
                <hr></hr>
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>About: </p>
                  {brand.description}
                </div>
                </div>
        </div>
        <div className='col'>
  <ListBrandCampaigns campaigns={campaigns}/>


        </div>
    </div>
    
  </div>       
        
    </div>
    )

}
export default Home;
