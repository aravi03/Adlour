import { useState, useContext, useEffect } from "react";
import Navbar from './Navbar'
import Apparel from '../../public/apparel.png';
import Eligibility from '../../public/person_check.png';
import Cover from '../../public/shoes_cover.jpg';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BrandContext } from "../utils/BrandContext"
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import YoutubeIcon from '/youtube.png'

const User = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams(); // Access the id from the URL
    const [query, setQuery] = useState('')
    const [brandContext, setBrandContext] = useContext(BrandContext)
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [creator,updateCreator] = useState([])
    const [campaigns,updateCampaigns] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => {
      setShowModal(true);
    };
    const navigate = useNavigate()
    const navigateTo = (path) => {
      navigate(path);
    };  
    const handleSubmit=()=>{
     const formData = {fromID:brandContext.brand._id,toID:id,toName:creator.name,message:message}
      const url=apiUrl+'/api/brand/chat'
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
                console.log(json)  
                navigateTo('/brand/chat')
                window.location.reload();
              })   
    }

    const countries = [
      'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
      'France', 'Japan', 'India', 'Brazil', 'South Africa'
    ];
    
    const categories = [
      'Fashion', 'Tech', 'Food', 'Health', 'Travel',
      'Sports', 'Education', 'Finance', 'Entertainment', 'Automotive'
    ];
    
    useEffect(() => {
        const creatorID=id
        const url=apiUrl+'/api/brand/viewcreator/'+id
         fetch(url,{credentials:'include'})
         .then((res) => res.json())
                  .then((json) => {
                    console.log(json.user)
                    updateCreator(json.user)
                  })           



        // fetch('http://localhost:5000/api/user/user/viewcreator', {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: {
        //       'Content-Type': 'application/json', // Specify the content type
        //     },
        //     body: JSON.stringify({creatorID}), // Send the query as JSON in the request body
        //   })
        //           .then((res) => res.json())
        //           .then((json) => {
        //             console.log(json.campaigns)
        //             updateCampaigns(json.campaigns)
        //           })           
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
                <img className="rounded-circle" style={{border: '3px solid var(--accent-color)',height:'100px',width:'100px',backgroundColor:'white'}} src={creator.profilePic}
              onError={(e) => e.target.src = "/profilePic.jpg"} alt={'Name'} />
                <div className="flex-grow-1">
    <h5 className="card-title text-center mb-0" style={{position: 'relative', left: '-50px'}}>
      <a href='' style={{textDecoration: 'none', color: 'black'}}>{creator.name}</a>
    </h5>
  </div>
                </div>   

                <div className="d-flex align-items-center mt-5">
                <img src={YoutubeIcon} style={{width:'20px'}}>
                </img>
                <a className="ms-3" style={{color:'var(--accent-color)'}} href={creator.channelLink}>
                  {creator.channelLink?'View Channel':"Channel not linked"}
                </a>
                </div> 
               
                <div className="d-flex align-items-center mt-4">                  
                  {/* <img className='' style={{width:'20px'}} src={Apparel}></img> */}
                  {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Categories</Tooltip>}> */}
                    <i style={{color:'#e84545'}} className="bi bi-tags-fill me-2 bs-tooltip"></i>
                  {/* </OverlayTrigger> */}
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>Category: </p>
                  <p className="mb-0">{creator.category}</p>
                </div>
                <div className="d-flex align-items-center mt-4">                  
                  {/* <img className='' style={{width:'20px'}} src={Apparel}></img> */}
                  {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Categories</Tooltip>}> */}
                    <i style={{color:'#e84545'}} className="bi bi-geo-alt me-2 bs-tooltip"></i>
                  {/* </OverlayTrigger> */}
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>Location: </p>
                  <p className="mb-0">{creator.location}</p>
                </div>
                <div className="d-flex align-items-center mt-4">                  
                  {/* <img className='' style={{width:'20px'}} src={Apparel}></img> */}
                  {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-top">Categories</Tooltip>}> */}
                    <i style={{color:'#e84545'}} className="bi bi-translate me-2 bs-tooltip"></i>
                  {/* </OverlayTrigger> */}
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>Content language: </p>
                  <p className="mb-0">{creator.language}</p>
                </div>
                <hr></hr>
                  <p className="mb-0 me-2" style={{color:'var(--accent-color)'}}>About: </p>
                  {creator.description}                  
                </div>
                <Button 
                    onClick={handleShowModal} 
                    variant="dark" 
                    style={{ backgroundColor: 'var(--accent-color)' }}
                >
                   Start Chat
                </Button>
                </div>
        </div>
        {/* <div className='col'>
  <ListBrandCampaigns campaigns={campaigns}/>


        </div> */}
    </div>
    <Modal show={showModal} onHide={handleCloseModal}>  
    <Modal.Header closeButton>
                <Modal.Title>Start Chat</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>                  
                    <Form.Group controlId="formDescription" className="mt-3">
                        <Form.Label>Start chat</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Start chat"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button style={{backgroundColor:'var(--accent-color)'}} variant="dark" type="submit" onClick={handleSubmit}>
                    Send
                </Button>
            </Modal.Footer>
          </Modal>
    
  </div>       
        
    </div>
    )

}
export default User;
