import React, { useState } from "react"

const BrandChatContext = React.createContext([{}, () => {}])

let initialState = {}

const BrandChatProvider = props => {
  const [state, setState] = useState(initialState)

  return (
    <BrandChatContext.Provider value={[state, setState]}>
      {props.children}
    </BrandChatContext.Provider>
  )
}

export { BrandChatContext, BrandChatProvider }
