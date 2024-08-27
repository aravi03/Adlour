import React from 'react';
import Apparel from '/apparel.png'
import { useNavigate } from 'react-router-dom';
import { Modal, Button,Form } from 'react-bootstrap';

function ListCreators({ creators }) {

  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };
  try{
  return (
    <div className="container-fluid mt-5">
      <div className="row mt-5">
        {creators.map((creator, index) => {
          // Define your constants inside the map function
          return (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div style={{cursor:'pointer'}} className="card p-2"onClick={() => {
                const url = '/brand/search/creator/' + creator._id
                navigateTo(url)
                }}>
              <img src={creator.profilePic} className="card-img-top d-block mx-auto rounded-circle" 
              onError={(e) => e.target.src = "/profilePic.jpg"} alt={creator.name} style={{ width: '75px', height: '75px',border: '2px solid white' }} />
                <div className="card-body">
                <h5 className="card-title text-center">{creator.name}</h5>
                
                <div className="d-flex align-items-center">
                  <i style={{color:'#e84545'}} className="bi bi-geo-alt me-2"></i>
                  <p className="mb-0">{creator.location}</p>
                  <i style={{color:'#e84545'}} className="bi bi-tags-fill ms-4 me-2 bs-tooltip"></i>
                  <p className="mb-0">{creator.category}</p>
                </div>                
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}
catch(error){
  return(<></>)
}
}

export default ListCreators;
