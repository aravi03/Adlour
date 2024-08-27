import { useState, useContext, useEffect } from "react";
import Navbar from './Navbar'
import ListBrandCampaigns from "./ListBrandCampaigns";
import Apparel from '/public/apparel.png';
import Eligibility from '/person_check.png';
import Cover from '/shoes_cover.jpg';
import YoutubeIcon from '/youtube.png'
import { UserContext } from "../utils/UserContext"
import { Modal, Button,Form } from 'react-bootstrap';

const UserProfile = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userContext, setUserContext] = useContext(UserContext)
    const [campaigns,updateCampaigns] = useState([])
    const [name, setName] = useState(userContext.user.name || '');
    const [channelLink, setChannelLink] = useState(userContext.user.channelLink || '');
    const [category, setCategory] = useState(userContext.user.category || '');
    const [location, setLocation] = useState(userContext.user.location || '');
    const [language, setLanguage] = useState(userContext.user.location || '');
    const [description, setDescription] = useState(userContext.user.description || '');
    const [profilePic, setProfilePic] = useState(userContext.user.profilePic || '');
    const [showModal, setShowModal] = useState(false);
    const categories = [
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
    const countries = [
      'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
      'France', 'Japan', 'India', 'Brazil', 'South Africa'
    ];
    const languages = [
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
    const handleShowModal = () => {
      setShowModal(true);
    };
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("here in submit")
      const formData = { name,category,location,channelLink,description,language,profilePic};
      const url=apiUrl+'/api/user/update/'+userContext.user._id
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
                console.log(json.user)     
                window.location.reload()           
              })  

    };

    const handleClick = (e) => {
      e.preventDefault()
        fetch(apiUrl+'/api/user/user/searchbrand', {credentials: "include"})
                  .then((res) => res.json())
                  .then((json) => {
                    console.log(json.campaigns)
                    updateCampaigns(json.campaigns)
                  })
    }
    useEffect(() => {
      const url=apiUrl+'/api/user/appliedcampaigns/'+userContext.user._id
      console.log("url is ",url)  
      fetch(url,{credentials: "include"})
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
                <img className="rounded-circle" style={{height:'100px',width:'100px',backgroundColor:'white'}} src={userContext.user.profilePic}
              onError={(e) => e.target.src = "/profilePic.jpg"} alt={'Name'} />
                <div className="flex-grow-1">
    <h5 className="card-title text-center mb-0" style={{position: 'relative', left: '-50px'}}>
      <a href='' style={{textDecoration: 'none', color: 'black'}}>{userContext.user.name}</a>
    </h5>
  </div>               
                </div> 
                <div className="d-flex align-items-center mt-5">
                <img src={YoutubeIcon} style={{width:'20px'}}>
                </img>
                <a className="ms-3" style={{color:'var(--accent-color)'}} href={userContext.user.channelLink}>
                  {userContext.user.channelLink?'View Channel':"Channel not linked"}
                </a>
                </div>            
                
                
                <div className="d-flex align-items-center mt-4">                  
                  {/* <img className='' style={{width:'20px'}} src={Apparel}></img> */}
                  {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Categories</Tooltip>}> */}
                    <i style={{color:'#e84545'}} className="bi bi-tags-fill me-2 bs-tooltip"></i>
                  {/* </OverlayTrigger> */}
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>Category: </p>
                  <p className="mb-0">{userContext.user.category}</p>
                </div>
                <div className="d-flex align-items-center mt-4">                  
                  {/* <img className='' style={{width:'20px'}} src={Apparel}></img> */}
                  {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Categories</Tooltip>}> */}
                    <i style={{color:'#e84545'}} className="bi bi-geo-alt me-2 bs-tooltip"></i>
                  {/* </OverlayTrigger> */}
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>Location: </p>
                  <p className="mb-0">{userContext.user.location}</p>
                </div>
                <div className="d-flex align-items-center mt-4">                  
                  {/* <img className='' style={{width:'20px'}} src={Apparel}></img> */}
                  {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Categories</Tooltip>}> */}
                    <i style={{color:'#e84545'}} className="bi bi-translate me-2 bs-tooltip"></i>
                  {/* </OverlayTrigger> */}
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>Content Language: </p>
                  <p className="mb-0">{userContext.user.language}</p>
                </div>
                
                <hr></hr>
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>About: </p>
                <p>
                {userContext.user.description}
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
        <div className='col'>
        
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
                            required
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPic">
                        <Form.Label>Enter your profile pic link</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            placeholder="www.example.com/myImage.jpg"
                            value={profilePic}
                            onChange={(e) => setProfilePic(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formChannelLink" className="mt-3">
                        <Form.Label>Channel Link</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            placeholder="Enter your channel link"
                            value={channelLink}
                            onChange={(e) => setChannelLink(e.target.value)}
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
        <option value="">Select your category</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat.toLowerCase().replace(/ /g, '-')}>{cat}</option>
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
        {countries.map((country, index) => (
          <option key={index} value={country.toLowerCase().replace(/ /g, '-')}>{country}</option>
        ))}
      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formLanguage" className="mt-3">
                        <Form.Label>Language</Form.Label>
                        <Form.Control
        as="select"
        value={language}
        required
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="">Select your content language</option>
        {languages.map((lang, index) => (
          <option key={index} value={lang.toLowerCase().replace(/ /g, '-')}>{lang}</option>
        ))}
      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formDescription" className="mt-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            required
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
    
  </div>       
        
    </div>
    )

}
export default UserProfile;
