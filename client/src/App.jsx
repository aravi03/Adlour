import logo from './logo.svg';
import './App.css';
import UserLogin from './user/Login';
import BrandLogin from './brand/Login';
import UserRegister from './user/Register';
import BrandRegister from './brand/Register';
import Home from './user/Home';
import BrandHome from './brand/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './Auth';
import AuthBrand from './AuthBrand';
// import Adlour from './Adlour';
import Search from './user/Search';
import Brand from './user/Brand';
import UserProfile from './user/UserProfile'
import BrandProfile from './brand/BrandProfile'
import User from './brand/User'
import Chat from './user/Chat'
import BrandChat from './brand/Chat'
import Campaign from './brand/Campaign'
import { ChatProvider } from './utils/ChatContext';
import { BrandChatProvider } from './utils/BrandChatContext';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      {/* <Route index element={<Home />} /> */}
      <Route path="/creator/login" element={<UserLogin/>} />
      <Route path="/creator/register" element={<UserRegister/>} />
      <Route element={<Auth/>}>
      <Route path="/creator/home" element={<Home/>} />
      <Route path="/creator/search" element={<Search/>} />
      <Route path="/creator/search/brand/:id" element={<Brand/>} />
      <Route path="/creator/profile" element={<UserProfile/>} />
      <Route path="/creator/chat" element={
      <ChatProvider><Chat/></ChatProvider>  
        } />
      </Route>
      <Route path="/brand/login" element={<BrandLogin/>} />
      <Route path="/brand/register" element={<BrandRegister/>} />
      <Route element={<AuthBrand/>}>
      <Route path="/brand/home" element={<BrandHome/>} />
      <Route path="/brand/profile" element={<BrandProfile/>} />
      <Route path="/brand/search/creator/:id" element={<User/>} />
      <Route path="/brand/viewcampaign/:id" element={<Campaign/>} />
      <Route path="/brand/chat" element={
      <BrandChatProvider><BrandChat/></BrandChatProvider>  
        } />
      </Route>
      {/* <Route path="/" element={<Adlour/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
