import { useState, useContext, useEffect } from "react";
import Navbar from './Navbar'
import ListApplicants from "./ListApplicants";
import Apparel from '../../public/apparel.png';
import Eligibility from '../../public/person_check.png';
import Cover from '../../public/shoes_cover.jpg';
import { useParams } from 'react-router-dom';

const Campaign = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams(); // Access the id from the URL
    const [query, setQuery] = useState('')
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [applicants,updateApplicants] = useState([])
    const [campaign,updateCampaign] = useState([])
    const countries = [
      'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
      'France', 'Japan', 'India', 'Brazil', 'South Africa'
    ];
    
    const categories = [
      'Fashion', 'Tech', 'Food', 'Health', 'Travel',
      'Sports', 'Education', 'Finance', 'Entertainment', 'Automotive'
    ];
    
    useEffect(() => {
        const url=apiUrl+'/api/brand/viewcampaign/'+id
         fetch(url,{credentials:'include'})
         .then((res) => res.json())
                  .then((json) => {
                    console.log(json.campaign)
                    updateCampaign(json.campaign)
                  })                     
              }, [])  

          const date = new Date(campaign.deadline);
          console.log('campaign is ',campaign)
          if (date instanceof Date && !isNaN(date.getTime())) {
              const options = { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
              };
              console.log("date conversion")
              campaign.deadline= date.toLocaleDateString('en-US', options);
            }
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
                <img className="rounded-circle" style={{border: '3px solid var(--accent-color)',height:'100px',width:'100px',backgroundColor:'white'}} src={campaign.profilePic}
              onError={(e) => e.target.src = "/profilePic.jpg"} alt={'Name'} />
                <div className="flex-grow-1">
    <h5 className="card-title text-center mb-0" style={{position: 'relative', left: '-50px'}}>
      <a href='' style={{textDecoration: 'none', color: 'black'}}>{campaign.name}</a>
    </h5>
  </div>
                </div>             

               
                <div className="d-flex align-items-center mt-4">                  
                  {/* <img className='' style={{width:'20px'}} src={Apparel}></img> */}
                  {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Categories</Tooltip>}> */}
                    <i style={{color:'#e84545'}} className="bi bi-tags-fill me-2 bs-tooltip"></i>
                  {/* </OverlayTrigger> */}
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>Category: </p>
                  <p className="mb-0">{campaign.category}</p>
                </div>
                <div className="d-flex align-items-center mt-4">                  
                  {/* <img className='' style={{width:'20px'}} src={Apparel}></img> */}
                  {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Categories</Tooltip>}> */}
                    <i style={{color:'#e84545'}} className="bi bi-geo-alt me-2 bs-tooltip"></i>
                  {/* </OverlayTrigger> */}
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>Target Location: </p>
                  <p className="mb-0">{campaign.location}</p>
                </div>
                <div className="d-flex align-items-center mt-4">                  
                  {/* <img className='' style={{width:'20px'}} src={Apparel}></img> */}
                  {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Categories</Tooltip>}> */}
                    <i style={{color:'#e84545'}} className="bi bi-translate me-2 bs-tooltip"></i>
                  {/* </OverlayTrigger> */}
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>Target Language: </p>
                  <p className="mb-0">{campaign.language}</p>
                </div>
                <div className="d-flex align-items-center mt-4">                  
                  {/* <img className='' style={{width:'20px'}} src={Apparel}></img> */}
                  {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Categories</Tooltip>}> */}
                    <i style={{color:'#e84545'}} className="bi bi-calendar-week me-2 bs-tooltip"></i>
                  {/* </OverlayTrigger> */}
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>Deadline: </p>
                  <p className="mb-0">{campaign.deadline}</p>
                </div>

                <hr></hr>
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>About: </p>
                  {campaign.description}
                </div>
                </div>
        </div>
        <div className='col'>
            <h1 className="my-5">Applicants</h1>
  <ListApplicants creators={campaign.applicants}/>


        </div>
    </div>
    
  </div>       
        
    </div>
    )

}
export default Campaign;
