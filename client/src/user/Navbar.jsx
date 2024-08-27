import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  const apiUrl = import.meta.env.VITE_API_URL;
  return (
    <nav className="navbar bg-white navbar-expand-lg p-2 fixed-top mb-5">
      <div className="container-fluid nav-menu">
        <NavLink className="navbar-brand d-flex align-items-center me-auto me-xl-0" to="/">
          <h1 className='adlour-brand-name'>Adlour</h1>
          <span>.</span>
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/creator/home" activeClassName="active">View Campaigns</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/creator/search" activeClassName="active">Search Brands</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/creator/chat" activeClassName="active">Chat</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/creator/profile" activeClassName="active">Profile</NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link mt-1 dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-person-fill"></i>
              </NavLink>
              <ul className="dropdown-menu mx-2">
  {/* <li><NavLink className="dropdown-item" to="/myprofile">Profile</NavLink></li> */}
  <li><a className="dropdown-item" style={{color:'black'}} href={apiUrl+'/api/user/auth/logout'}>Logout</a></li>
</ul>

            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
