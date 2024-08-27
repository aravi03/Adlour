import React, { useState } from "react"

const ChatContext = React.createContext([{}, () => {}])

let initialState = {}

const ChatProvider = props => {
  const [state, setState] = useState(initialState)

  return (
    <ChatContext.Provider value={[state, setState]}>
      {props.children}
    </ChatContext.Provider>
  )
}

export { ChatContext, ChatProvider }
