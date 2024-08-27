import React, { useState,useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Apparel from '/apparel.png';
import Eligibility from '/person_check.png';
import Cover from '/shoes_cover.jpg';
import './HomeCampaign.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { UserContext } from "../utils/UserContext"
function ListHomeCampaigns({ campaigns }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userContext, setUserContext] = useContext(UserContext)
  console.log('context is',userContext)
  const handleShowModal = (campaign) => {
    setSelectedCampaign(campaign);
    setShowModal(true);
  };

  const applyCampaign=()=>{
    const url=apiUrl+'/api/user/campaigns/apply/'+selectedCampaign._id
    const userID=userContext.user._id
    const name=userContext.user.name
    console.log("userid and name ",userID,name)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify({userID,name}),
      credentials: 'include', // Important for sending cookies with the request
    })
                  .then((res) => res.json())
                  .then((json) => {
                    console.log(json)
                    alert("Your application has been successfully submitted! The brand will review your profile and reach out if they believe you're a good fit for their campaign. Stay tuned!")                    
                    window.location.reload()
                  })
  }

  const handleCloseModal = () => setShowModal(false);

 try{
if(campaigns.length>0)
  return (
    <div className="container-fluid mt-5">
      <div className="row mt-5">
        {campaigns.map((campaign, index) => {

const date = new Date(campaign.deadline);
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
          var applied=false
          var cardcolor='white'
          const applicant=campaign.applicants.find(applicant => applicant.userID === userContext.user._id)
          if (applicant) {
            console.log(`Applicant found: ${applicant.name}, Status: ${applicant.status}`);
            applied=true
            cardcolor='#f4f4f4'
          }
          return (
            <div className="col-md-10 col-lg-6 mb-4" key={index}>
              <div className="card" style={{position:'relative',cursor: 'pointer',backgroundColor:cardcolor}} onClick={() => handleShowModal(campaign)}>
              {/* <img style={{width:'100%', height:'100%'}} src={campaign.coverPic} class="card-img-top" alt="Cover Photo"/>
              <img src={campaign.profilePic} className="rounded-circle profile-img" 
              alt={campaign.name} /> */}
              <img src={campaign.profilePic} className="card-img-top d-block mx-auto rounded-circle" 
              onError={(e) => e.target.src = "/profilePic.jpg"} alt={campaign.name} style={{ width: '75px', height: '75px',border: '2px solid white' }} />
                <div className="card-body">
                <h5 className="card-title text-center mt-4">
    <a style={{ textDecoration: 'none', color: 'black' }}>{campaign.name}</a>
    {applied && (
        <span style={{ color: 'green', marginLeft: '10px', fontSize: 'small' }}>
            Applied
        </span>
    )}
</h5>


                <div className="d-flex align-items-center mt-4">                  
                  {/* <img className='' style={{width:'20px'}} src={Apparel}></img> */}
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Target Category</Tooltip>}>
                    <i style={{color:'#e84545'}} className="bi bi-tags-fill me-2 bs-tooltip"></i>
                  </OverlayTrigger>
                  <p className="mb-0">{campaign.category}</p>
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Deadline</Tooltip>}>
                  <i style={{color:'#e84545'}} className="bi bi-calendar-week ms-3 me-2"></i>
                  </OverlayTrigger>
                  <p className="mb-0">{campaign.deadline}</p>
                </div>
                <div className="d-flex align-items-center mt-2">
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Target Location</Tooltip>}>
                <i style={{color:'#e84545'}} className="bi bi-geo-alt-fill me-2"></i>
                </OverlayTrigger>
                  <p className="mb-0">{campaign.location}</p>
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Target Language</Tooltip>}>
                  <i style={{color:'#e84545'}} className="bi bi-translate ms-4 me-2"></i>
                  </OverlayTrigger>
                  <p className="mb-0">{campaign.language}</p>
                  {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Minimum Subscribers</Tooltip>}>
                  <img className='ms-4' style={{width:'20px'}} src={Eligibility}></img>
                  </OverlayTrigger>
                  <p className="mb-0 ms-2">5000+ subs</p>               */}
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

      {/* React Bootstrap Modal */}
      {selectedCampaign && (
        <Modal show={showModal} onHide={handleCloseModal}>
          {/* <Modal.Header closeButton>
          <img className="ms-5 " style={{border: '3px solid var(--accent-color)', height:'100px',width:'100px',backgroundColor:'white'}} src={'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg'}
              alt={'Name'} />
            <Modal.Title>Nike- {selectedCampaign.name}</Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            {/* <img style={{width:'100%', height:'100%'}} src={selectedCampaign.coverPic} className="card-img-top" alt="Cover Photo"/> */}
            
            {/* <div className="d-flex align-items-center">
                <img className="rounded-circle" style={{border: '3px solid var(--accent-color)', height:'100px',width:'100px',backgroundColor:'white'}} src={'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg'}
              alt={'Name'} />
                <div className="flex-grow-1">
    <h5 className="card-title text-center mb-0" style={{position: 'relative', left: '-50px'}}>
      <a href='' style={{textDecoration: 'none', color: 'black'}}>Nike</a>
    </h5>
  </div>
                </div>  */}
            
            {/* <img src={selectedCampaign.url} className="rounded-circle profile-img-modal" alt={selectedCampaign.name} /> */}
            <div className="card-body">
              
            <div className="d-flex align-items-center">
            <img className="rounded-circle" style={{border: '3px solid var(--accent-color)', height:'100px',width:'100px',backgroundColor:'white'}} src={selectedCampaign.profilePic}
              onError={(e) => e.target.src = "/profilePic.jpg"} alt={'Name'} />
              <div className="flex-grow-1">
              <h5 className='ms-4'><a href='' style={{textDecoration: 'none', color: 'var(--accent-color)'}}>{selectedCampaign.name}</a>
              </h5>
    {/* <h5 className="card-title text-center mb-0" style={{position: 'relative', left: '50px'}}> */}
      {/* <a href='' style={{textDecoration: 'none', color: 'black'}}>Nike</a> */}
    {/* </h5> */}
  </div>
            </div>
              {/* <h5 className="card-title text-center mt-4">
                <a href='' style={{textDecoration:'none',color:'black'}}>Nike- {selectedCampaign.name}</a>
              </h5>                 */}
              <div className="d-flex align-items-center mt-4">                  
                  {/* <img className='' style={{width:'20px'}} src={Apparel}></img> */}
                    <i style={{color:'#e84545'}} className="bi bi-tags-fill me-2 bs-tooltip"></i>
                    <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>Target Category: </p>
                  <p className="mb-0">{selectedCampaign.category}</p>
                </div>
                <div className="d-flex align-items-center mt-2">
                <i style={{color:'#e84545'}} className="bi bi-geo-alt-fill me-2"></i>
                <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>Target Area: </p>
                  <p className="mb-0">{selectedCampaign.location}</p>
                  </div>
                  <div className="d-flex align-items-center mt-2">
                  <i style={{color:'#e84545'}} className="bi bi-translate me-2"></i>
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>Target Language: </p>
                  <p className="mb-0">{selectedCampaign.language}</p>
                  </div>
                  {/* <div className="d-flex align-items-center mt-2">
                  <img style={{width:'20px'}} src={Eligibility}></img>
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>Minimum followers: </p>
                  <p className="mb-0 ms-2">5000+ followers</p>              
                </div> */}

                {/* <div className="d-flex align-items-center mt-2">
                <i style={{color:'#e84545'}} className="bi bi-cash-coin me-2"></i>
                <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>Compensation Type: </p>
                  <p className="mb-0">Monetary, Product, Affiliate</p>
                  </div> */}
                  <div className="d-flex align-items-center mt-2">
                  <i style={{color:'#e84545'}} className="bi bi-calendar-week me-2"></i>
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>Deadline: </p>
                  <p className="mb-0">{selectedCampaign.deadline}</p>
                </div>
                <hr></hr>
                <p>
                  <h6 className='my-3' style={{color:'#e84545'}}>Description:</h6>
                  {selectedCampaign.description}
                </p>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
    {(() => {
        const applicant = selectedCampaign.applicants.find(applicant => applicant.id === userContext._id);
        if (!applicant) {
            return (
                <Button 
                    onClick={applyCampaign} 
                    variant="dark" 
                    style={{ backgroundColor: 'var(--accent-color)' }}
                >
                    Apply
                </Button>
            );
        } else {
            return <p>Applied</p>;
        }
    })()}
</Modal.Footer>

        </Modal>
      )}
    </div>
  );
  else
  return(<h5 className='my-5'>No campaigns yet</h5>)
}
catch(error){
  return <div></div>

}
}

export default ListHomeCampaigns;
