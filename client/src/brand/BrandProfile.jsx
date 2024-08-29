import { useState, useContext, useEffect } from "react";
import Navbar from './Navbar'
import ListBrandCampaigns from "./ListBrandCampaigns";
import Apparel from '/public/apparel.png';
import Eligibility from '/person_check.png';
import Cover from '/shoes_cover.jpg';
import YoutubeIcon from '/youtube.png'
import { BrandContext } from "../utils/BrandContext"
import { Modal, Button,Form } from 'react-bootstrap';
import ProfilePicUploader from './ProfilePicUploader'; // Import ProfilePicUploader

const BrandProfile = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [brandContext, setBrandContext] = useContext(BrandContext)
    const [campaigns,updateCampaigns] = useState([])
    const [name, setName] = useState(brandContext.brand.name || '');
    const [website, setWebsite] = useState(brandContext.brand.website || '');
    const [category, setCategory] = useState(brandContext.brand.category || '');
    const [location, setLocation] = useState(brandContext.brand.location || '');
    const [description, setDescription] = useState(brandContext.brand.description || '');
    const [profilePic, setProfilePic] = useState(brandContext.brand.profilePic || '');
    const [showModal, setShowModal] = useState(false);
    const [showCampaignModal, setShowCampaignModal] = useState(false);
    const [CampaignName, setCampaignName] = useState('');
    const [CampaignDescription, setCampaignDescription] = useState('');
    const [CampaignDeadline, setCampaignDeadline] = useState('');
    const [CampaignLocation, setCampaignLocation] = useState('');
    const [CampaignCategory, setCampaignCategory] = useState('');
    const [CampaignLanguage, setCampaignLanguage] = useState('');

    const handleProfilePicChange = (newProfilePic) => {
      setProfilePic(newProfilePic);
      window.location.reload()
    };

    const countries = [
      "All countries",'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
      'France', 'Japan', 'India', 'Brazil', 'South Africa'
    ];
    const languages = [
      "Any language",
      "English",
      "Spanish",
      "French",
      "Arabic",
      "Hindi",
      "Tamil",
      "Telugu",
      "Kannada",
      "Malayalam",
      "Bengali",
      "Urdu"
    ];
    const categories = [
      "Any category",
      "Fashion",
      "Education",
      "Gaming",
      "Technology",
      "Health and Fitness",
      "Cooking and Food",
      "Travel",
      "Entertainment",
      "Lifestyle",
      "Parenting",
      "Finance and Investing",
      "Arts and Crafts",
      "Sports",
      "Science and Technology"
    ];
    const businesscategories = [
      "Technology",
      "Finance",
      "Healthcare",
      "Retail",
      "Real Estate",
      "Manufacturing",
      "Education",
      "Construction",
      "Transportation",
      "Entertainment",
      "Hospitality",
      "Telecommunications",
      "Energy",
      "Agriculture",
      "Automotive",
      "Pharmaceuticals",
      "Insurance",
      "Consumer Goods",
      "Utilities",
      "Aerospace"
    ];
    
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => {
      setShowModal(true);
    };
    const handleCloseCampaignModal = () => setShowCampaignModal(false);

    const handleShowCampaignModal = () => {
      setShowCampaignModal(true);
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("here in submit")
      const formData = { name,category,location,website,description};
      const url= apiUrl+'/api/brand/update/'+brandContext.brand._id
      fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify(formData), // Send the query as JSON in the request body
      })
              .then((res) => res.json())
              .then((json) => {
                console.log(json.brand)     
                window.location.reload()           
              })  

    };

    const handleCampaignSubmit = (e) => {
      e.preventDefault();
      console.log("here in submit")       
      const formData = { name:CampaignName,location:CampaignLocation,description:CampaignDescription,deadline:CampaignDeadline,category:CampaignCategory,language:CampaignLanguage};
      const url=apiUrl+'/api/brand/createcampaign/'+brandContext.brand._id
      fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify(formData), // Send the query as JSON in the request body
      })
              .then((res) => res.json())
              .then((json) => {
                console.log(json.campaign)     
                window.location.reload()           
              })  

    };

    useEffect(() => {
      const url=apiUrl+'/api/brand/mycampaigns/'+brandContext.brand._id
      console.log("url is ",url)  
      fetch(url,{credentials: "include"})
                  .then((res) => res.json())
                  .then((json) => {
                    console.log('campaigns',json.campaigns)
                    updateCampaigns(json.campaigns)
                  })           
              }, [])      
    return(
        <div>
        <Navbar/>
    <div class="container-fluid mt-5">
    <div className="row mt-5">
        <div className="col-md-4 mt-5">
        <div className="card" style={{position:'relative',backgroundColor:'white',borderColor: '#f4f4f4'}} >
              {/* <img style={{width:'100%', height:'100%'}} src={Cover} class="card-img-top" alt="Cover Photo"/> */}
                <div className="card-body">
                <div className="d-flex align-items-center">
                
                
                {/* <img className="rounded-circle" style={{height:'100px',width:'100px',backgroundColor:'white'}} src={brandContext.brand.profilePic}
              onError={(e) => e.target.src = "/profilePic.jpg"} alt={'Name'} />
                 */}
                
                  <ProfilePicUploader currentProfilePic={profilePic} onProfilePicChange={handleProfilePicChange} />

                
                <div className="flex-grow-1">
    <h5 className="card-title text-center mb-0" style={{position: 'relative', left: '-50px'}}>
      <a href='' style={{textDecoration: 'none', color: 'black'}}>{brandContext.brand.name}</a>
    </h5>
  </div>               
                </div> 
                <div className="d-flex align-items-center mt-5">
                <i style={{color:'#e84545'}} className="bi bi-globe me-2 bs-tooltip"></i>
                <a className="ms-3" style={{color:'var(--accent-color)'}} href={brandContext.brand.website}>
                  {brandContext.brand.website}
                </a>
                </div>            
                
                
                <div className="d-flex align-items-center mt-4">                  
                  {/* <img className='' style={{width:'20px'}} src={Apparel}></img> */}
                  {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Categories</Tooltip>}> */}
                    <i style={{color:'#e84545'}} className="bi bi-tags-fill me-2 bs-tooltip"></i>
                  {/* </OverlayTrigger> */}
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>Category: </p>
                  <p className="mb-0">{brandContext.brand.category}</p>
                </div>
                <div className="d-flex align-items-center mt-4">                  
                  {/* <img className='' style={{width:'20px'}} src={Apparel}></img> */}
                  {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Categories</Tooltip>}> */}
                    <i style={{color:'#e84545'}} className="bi bi-building me-2 bs-tooltip"></i>
                  {/* </OverlayTrigger> */}
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>Business Area: </p>
                  <p className="mb-0">{brandContext.brand.location}</p>
                </div>
                <hr></hr>
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>About: </p>
                <p>
                {brandContext.brand.description}
                </p>
                </div>
                <Button 
                    onClick={handleShowModal} 
                    variant="dark" 
                    style={{ backgroundColor: 'var(--accent-color)' }}
                >
                    Edit Profile
                </Button>
                </div>
        </div>
        <div className='col my-5'>
        <Button 
                    onClick={handleShowCampaignModal} 
                    variant="dark" 
                    style={{ backgroundColor: 'var(--accent-color)' }}
                >
                    Create Campaign
                </Button>
  <ListBrandCampaigns campaigns={campaigns}/>


        </div>
    </div>
    <Modal show={showModal} onHide={handleCloseModal}>
         
    <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>                    

                    <Form.Group controlId="formWebsite" className="mt-3">
                        <Form.Label>Website</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your website"
                            value={website}
                            required
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formCategory" className="mt-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
        as="select"
        value={category}
        required
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select your business category</option>
        {businesscategories.map((lang, index) => (
          <option key={index} value={lang}>{lang}</option>
        ))}
      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formLocation" className="mt-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
        as="select"
        value={location}
        required
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="">Select your location</option>
        {countries.map((lang, index) => (
          <option key={index} value={lang}>{lang}</option>
        ))}
      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formDescription" className="mt-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            required
                            rows={3}
                            placeholder="Enter a brief description about yourself"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button style={{backgroundColor:'var(--accent-color)'}} variant="dark" type="submit" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
          </Modal>


          <Modal show={showCampaignModal} onHide={handleCloseCampaignModal}>      
    <Modal.Header closeButton>
                <Modal.Title>Create Campaign</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleCampaignSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Campaign Name</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            placeholder="Enter your campaign name"
                            value={CampaignName}
                            onChange={(e) => setCampaignName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formChannelLink" className="mt-3">
                        <Form.Label>Campaign Deadline</Form.Label>
                        <Form.Control
                            type="date"
                            required
                            placeholder="Enter the deadline to apply"
                            value={CampaignDeadline}
                            onChange={(e) => setCampaignDeadline(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formCategory" className="mt-3">
                        <Form.Label>Campaign Category</Form.Label>
                        <Form.Control
        as="select"
        required
        value={CampaignCategory}
        onChange={(e) => setCampaignCategory(e.target.value)}
      >
        <option value="">Select your target category</option>
        {categories.map((lang, index) => (
          <option key={index} value={lang}>{lang}</option>
        ))}
      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formLocation" className="mt-3">
                        <Form.Label>Campaign Location</Form.Label>
                        <Form.Control
        as="select"
        required
        value={CampaignLocation}
        onChange={(e) => setCampaignLocation(e.target.value)}
      >
        <option value="">Select your target location</option>
        {countries.map((lang, index) => (
          <option key={index} value={lang}>{lang}</option>
        ))}
      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formLocation" className="mt-3">
                        <Form.Label>Campaign Language</Form.Label>
                        <Form.Control
        as="select"
        value={CampaignLanguage}
        onChange={(e) => setCampaignLanguage(e.target.value)}
      >
        <option value="">Select your target language</option>
        {languages.map((lang, index) => (
          <option key={index} value={lang}>{lang}</option>
        ))}
      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formDescription" className="mt-3">
                        <Form.Label>Campaign Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            required
                            placeholder="Enter your requirements"
                            value={CampaignDescription}
                            onChange={(e) => setCampaignDescription(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseCampaignModal}>
                    Close
                </Button>
                <Button style={{backgroundColor:'var(--accent-color)'}} variant="dark" type="submit" onClick={handleCampaignSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
          </Modal>
    
  </div>       
        
    </div>
    )

}
export default BrandProfile;
