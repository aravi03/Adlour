import { useState, useContext, useEffect } from "react";
import './Chat.css'
import Navbar from './Navbar'
import ChatPeople from './ChatPeople'
import ChatMessages from './ChatMessage'
import { BrandChatContext } from "../utils/BrandChatContext"
import { BrandContext } from "../utils/BrandContext"

export default function Chat() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [brandchatContext, setBrandChatContext] = useContext(BrandChatContext)
  const [brandContext, setBrandContext] = useContext(BrandContext)
  const [messages,setMessages]= useState([])
  const [textmessage, setTextmessage] = useState('');

  const handleSubmit=()=>{
    const formData = {fromID:brandContext.brand._id,toID:brandchatContext.id,toName:brandchatContext.name,toPic:brandchatContext.profilePic,message:textmessage}
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
               window.location.reload()
             })   
   }
  useEffect(() => {
    // Function to trigger when context value changes
    const handleContextChange = () => {
      console.log('Context value changed:', brandchatContext)
      
      const formData = { user1ID:brandContext.brand._id,user2ID:brandchatContext.id};
      const url=apiUrl+'/api/brand/chatmessages'
      console.log('context before fetch is ',brandchatContext)
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
  }, [brandchatContext]) // Dependency array with context value
   
  
  return (
    <section>
      <Navbar/>
  <div class="container my-5">

    <div class="row my-5">

      <div class=" col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 my-5">

        <div class="card scrollable-div">
          <div class="card-body">
          <ChatPeople chatPeople={brandContext.brand.conversations}/>
          </div>
        </div>

      </div>

      <div class="col-md-6 col-lg-7 col-xl-8 my-5">
      {brandchatContext.id?
        <div style={{backgroundColor:'white'}} className="row p-4 justify-content-center">
      <div className="d-flex align-items-center mt-2">
      <img src={brandchatContext.profilePic} alt="avatar"
            onError={(e) => e.target.src = "/profilePic.jpg"}  class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="40"/>
        <h5 className="text-center">{brandchatContext.name}</h5>
      </div>
      </div>
       :
      <></>
      } 
      <div className="scrollable-div-message row">
      <ChatMessages messages={messages}/>        
        </div>
        {brandchatContext.id?
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
          </>
          : (<></>)}  
      </div>

    </div>

  </div>
</section>
  );
}
