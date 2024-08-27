import React, { useState,useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Apparel from '/apparel.png';
import Eligibility from '/person_check.png';
import Cover from '/shoes_cover.jpg';
import './HomeCampaign.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { BrandContext } from "../utils/BrandContext"
import { useNavigate } from 'react-router-dom';

function ListBrandCampaigns({ campaigns }) {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [brandContext, setBrandContext] = useContext(BrandContext)
  console.log('context is',brandContext)
  console.log('campaigns in lb are',campaigns)
  const handleShowModal = (campaign) => {
    setSelectedCampaign(campaign);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  try{
    if(campaigns.length>0)
  return (
    <div className="container-fluid mt-5">
      <div className="row mt-5">
        {campaigns.map((campaign, index) => {
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
                    const url = '/campaign/' + campaign.name;
                    
          return (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card" style={{position:'relative',cursor: 'pointer'}}
              onClick={() => {
                const url = '/brand/viewcampaign/' + campaign._id
                navigateTo(url)
                }}>
              {/* <img style={{width:'100%', height:'100%'}} src={campaign.coverPic} class="card-img-top" alt="Cover Photo"/> */}
              {/* <img src={campaign.profilePic} className="rounded-circle profile-img-brand" 
              alt={campaign.name} /> */}
              <img src={campaign.profilePic} className="card-img-top d-block mx-auto rounded-circle" 
              onError={(e) => e.target.src = "/profilePic.jpg"} alt={campaign.name} style={{ width: '75px', height: '75px',border: '2px solid white' }} />
                <div className="card-body">
                <h5 className="card-title text-center mt-4">
    <a style={{ textDecoration: 'none', color: 'black' }}>{campaign.name}</a>
</h5>                
                <div className="d-flex align-items-center mt-4">                  
                  {/* <img className='' style={{width:'20px'}} src={Apparel}></img> */}
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Categories</Tooltip>}>
                    <i style={{color:'#e84545'}} className="bi bi-tags-fill me-2 bs-tooltip"></i>
                  </OverlayTrigger>
                  <p className="mb-0">{campaign.category}</p>
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Deadline</Tooltip>}>
                  <i style={{color:'#e84545'}} className="bi bi-calendar-week ms-3 me-2"></i>
                  </OverlayTrigger>
                  <p className="mb-0">{campaign.deadline}</p>
                </div>
                <div className="d-flex align-items-center mt-2">
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Location</Tooltip>}>
                <i style={{color:'#e84545'}} className="bi bi-geo-alt-fill me-2"></i>
                </OverlayTrigger>
                  <p className="mb-0">{campaign.location}</p>
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Language</Tooltip>}>
                  <i style={{color:'#e84545'}} className="bi bi-translate ms-4 me-2"></i>
                  </OverlayTrigger>
                  <p className="mb-0">{campaign.language}</p>
                  {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Minimum Subscribers</Tooltip>}>
                  <img className='ms-4' style={{width:'20px'}} src={Eligibility}></img>
                  </OverlayTrigger>
                  <p className="mb-0 ms-2">5000+</p>               */}
                </div>

                <div className="d-flex align-items-center mt-2">
                {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Compensation Type</Tooltip>}>
                <i style={{color:'#e84545'}} className="bi bi-cash-coin me-2"></i>
                </OverlayTrigger>
                  <p className="mb-0">Monetary, Product, Affiliate</p> */}
                  
                </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  )
  else
  return(<h5 className='my-5'>You haven't created any campaigns yet</h5>)
}
catch(error){
  return <div></div>

}
}

export default ListBrandCampaigns;
