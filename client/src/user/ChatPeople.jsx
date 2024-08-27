import React from "react";
import { ChatContext } from "../utils/ChatContext"
import { useState, useContext, useEffect } from "react";

export default function Chat({chatPeople}) {
    const [chatContext, setChatContext] = useContext(ChatContext)
    const handleClick = (id,name,profilePic) => {
        console.log('ID is ' ,id)
        setChatContext({id,name,profilePic})
        // Add your custom logic here
      };
      try{
    return (
        <ul class="list-unstyled mb-0">
            {chatPeople.map((people, index) => {

              const date = new Date(people.lastMessageTimestamp);
              if (date instanceof Date && !isNaN(date.getTime())) {
                  const options = { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                  };
                  people.lastMessageTimestamp= date.toLocaleDateString('en-US', options);
              }
            return(
            <li  key={people.withUserID} onClick={() => handleClick(people.withUserID,people.withUserName,people.withUserPic)} class="p-2 border-bottom bg-body-tertiary">
                <a class="d-flex justify-content-between">
                  <div class="d-flex flex-row">
                    <img src={people.withUserPic} alt="avatar"
                     onError={(e) => e.target.src = "/profilePic.jpg"} class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60"/>
                    <div class="pt-1">
                      <p style={{color:'var(--accent-color)'}} class="fw-bold mb-0">{people.withUserName}</p>
                      <p class="small text-muted">{people.lastMessage}</p>
                    </div>
                  </div>
                  <div class="pt-1">
                    <p class="small text-muted mb-1">{people.lastMessageTimestamp}</p>
                    {/* <span class="badge bg-danger float-end">20</span> */}
                  </div>
                </a>
              </li>
            )
        })}
        </ul>
    )
  }
  catch(error){
    return(<p></p>)
  }
}