import React, { useState } from "react"

const BrandContext = React.createContext([{}, () => {}])

let initialState = null

const BrandProvider = props => {
  const [state, setState] = useState(initialState)

  return (
    <BrandContext.Provider value={[state, setState]}>
      {props.children}
    </BrandContext.Provider>
  )
}

export { BrandContext, BrandProvider }
