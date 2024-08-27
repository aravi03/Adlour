import React from "react";
import './Chat.css'
import Navbar from './Navbar'
import ChatPeople from './ChatPeople'
import ChatMessages from './ChatMessage'
import { ChatContext } from "../utils/ChatContext"
import { UserContext } from "../utils/UserContext"
import { useState, useContext, useEffect } from "react";

export default function Chat() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [chatContext, setChatContext] = useContext(ChatContext)
  const [userContext, setUserContext] = useContext(UserContext)
  const [messages,setMessages]= useState([])
  const [textmessage, setTextmessage] = useState('');

  const handleSubmit=()=>{
    const formData = {fromID:userContext.user._id,toID:chatContext.id,toName:chatContext.name,message:textmessage}
     const url=apiUrl+'/api/user/chat'
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
               window.location.reload()
             })   
   }

   useEffect(() => {
    // Function to trigger when context value changes
    const handleContextChange = () => {
      console.log('Context value changed:', chatContext)      
      const formData = { user1ID:userContext.user._id,user2ID:chatContext.id};
      const url=apiUrl+'/api/user/chatmessages'
      console.log('context before fetch is ',chatContext)
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
                console.log(json.messages)  
                setMessages(json.messages)   
              })    
    };

    handleContextChange()
  }, [chatContext]) // Dependency array with context value
 
  return (
    <section>
      <Navbar/>
  <div class="container my-5">

    <div class="row my-5">

      <div class=" col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 my-5">

        <div class="card scrollable-div">
          <div class="card-body">
          <ChatPeople chatPeople={userContext.user.conversations}/>
          </div>
        </div>

      </div>

      <div class="col-md-6 col-lg-7 col-xl-8 my-5">
      {chatContext.id?
      <div style={{backgroundColor:'white'}} className="row p-4 justify-content-center">
      <div className="d-flex align-items-center mt-2">
      <img src={chatContext.profilePic} alt="avatar"
        onError={(e) => e.target.src = "/profilePic.jpg"}      class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="40"/>
        <h5 className="text-center">{chatContext.name}</h5>
      </div>
      </div>
      :<></>}
      <div className="scrollable-div-message row">
      <ChatMessages messages={messages}/>
        {/* <ul class="list-unstyled mt-3">
        <li class="d-flex justify-content-between mb-4">
        
        <div class="card message-card">
              <div class="card-body">
                <p class="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua.
                </p>
                <p className="text-end text-muted">
                12th August, 2024
              </p>
              </div>            
        </div>
       
        </li>

        <li class="d-flex justify-content-end mb-4">
        <div class="card message-card-received">
              <div class="card-body">
                <p class="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua.
                </p>
                <p className="text-end text-muted">
                12th August, 2024
              </p>
              </div>            
        </div>
       
        </li>

        <li class="d-flex justify-content-between mb-4">
        <div class="card message-card">
              <div class="card-body">
                <p class="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua.
                </p>
                <p className="text-end text-muted">
                12th August, 2024
              </p>
              </div>            
        </div>
       
        </li>


        <li class="d-flex justify-content-between mb-4">
        <div class="card message-card">
              <div class="card-body">
                <p class="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua.
                </p>
                <p className="text-end text-muted">
                12th August, 2024
              </p>
              </div>            
        </div>
       
        </li>




          <li class="d-flex justify-content-between mb-4">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" alt="avatar"
              class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60"/>
            
            <div class="card">
              <div class="card-header d-flex justify-content-between p-3">
                <p class="fw-bold mb-0">Brad Pitt</p>
                <p class="text-muted small mb-0"><i class="far fa-clock"></i> 12 mins ago</p>
              </div>
              <div class="card-body">
                <p class="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </li>
          <li class="d-flex justify-content-between mb-4">
            <div class="card w-100">
              <div class="card-header d-flex justify-content-between p-3">
                <p class="fw-bold mb-0">Lara Croft</p>
                <p class="text-muted small mb-0"><i class="far fa-clock"></i> 13 mins ago</p>
              </div>
              <div class="card-body">
                <p class="mb-0">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                  laudantium.
                </p>
              </div>
            </div>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp" alt="avatar"
              class="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60"/>
          </li>
          <li class="d-flex justify-content-between mb-4">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" alt="avatar"
              class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60"/>
            <div class="card">
              <div class="card-header d-flex justify-content-between p-3">
                <p class="fw-bold mb-0">Brad Pitt</p>
                <p class="text-muted small mb-0"><i class="far fa-clock"></i> 10 mins ago</p>
              </div>
              <div class="card-body">
                <p class="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </li>
         
        </ul> */}
        </div>
        {chatContext.id?
        <>
        <div className="row">
        <ul class="list-unstyled">
        <li class="bg-white mb-3">
            <div data-mdb-input-init class="form-outline">
              <textarea value={textmessage} onChange={(e) => setTextmessage(e.target.value)} class="form-control bg-body-tertiary" id="textAreaExample2" rows="3"></textarea>
            </div>
          </li>
          </ul>
          </div>
          <button onClick={handleSubmit} style={{backgroundColor:'var(--accent-color)',color:'white'}}  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-info btn-rounded float-end">Send</button>
          </>:<></>}
      </div>

    </div>

  </div>
</section>
  );
}
