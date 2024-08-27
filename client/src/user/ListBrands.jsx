import React from 'react';
import Apparel from '/apparel.png'
import { useNavigate } from 'react-router-dom';

function ListBrands({ brands }) {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };
  try{
    if(brands.length>0)
  return (
    <div className="container-fluid mt-5">
      <div className="row mt-5">
        {brands.map((brand, index) => {
          // Define your constants inside the map function
          const url = '/brand/' + brand._id;

          return (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div style={{cursor:'pointer'}} className="card p-2"onClick={() => {
                const url='/creator/search/brand/'+brand._id
                navigateTo(url)
                }}>
              <img src={brand.profilePic} className="card-img-top d-block mx-auto rounded-circle" 
              onError={(e) => e.target.src = "/profilePic.jpg"} alt={brand.name} style={{ width: '75px', height: '75px',border: '2px solid white' }} />
                <div className="card-body">
                <h5 className="card-title text-center">{brand.name}</h5>
                <p className='text-center'>
                <a href='' class="text-muted fw-medium mb-2" style={{textDecoration:'none',}}>{brand.website}</a>
                </p>
                <div className="d-flex align-items-center">
                  <i style={{color:'#e84545'}} className="bi bi-building me-2"></i>
                  <p className="mb-0">{brand.location}</p>
                  <i style={{color:'#e84545'}} className="bi bi-tags-fill ms-4 me-2 bs-tooltip"></i>
                  <p className="mb-0">{brand.category}</p>
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
  return(<h5 className='my-5'>No campaigns yet</h5>)
}
catch(error){
  return <div></div>
}
}

export default ListBrands;
