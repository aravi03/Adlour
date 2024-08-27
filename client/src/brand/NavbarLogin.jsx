import './Navbar.css';

function Navbar() {
    return (
  <nav className="navbar bg-white navbar-expand-lg p-2 fixed-top">
  <div className="container-fluid nav-menu">
    <a className="navbar-brand d-flex align-items-center me-auto me-xl-0" href="#">
    <h1 className='adlour-brand-name'>Adlour</h1>
    <span>.</span>
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-login navbar-nav ms-auto me-5 mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" href="/creator/login">Adlour for creators</a>
        </li>
        <li className="nav-item mx-5">
          <a className="nav-link active" aria-current="page" href="/brand/login">Adlour for brands</a>
        </li>          
      </ul>    
    </div>
  </div>
</nav>
    )
}
export default Navbar;
