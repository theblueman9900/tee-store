'use client'

import { createContext, ReactNode, SetStateAction, useContext, useState } from 'react'

interface IContextType {
  varient: any
  setVarient: React.Dispatch<SetStateAction<any>>
}

export const INITIAL_VARIENT = {
  varient: {},
  setVarient: () => {},
}

const VarientContext = createContext<IContextType>(INITIAL_VARIENT)

export const VarientProvider = ({ children }: { children: React.ReactNode }) => {
  const [varient, setVarient] = useState({})

  return (
    <VarientContext.Provider
      value={{
        varient,
        setVarient,
      }}
    >
      {children}
    </VarientContext.Provider>
  )
}

export const useVarient = () => useContext(VarientContext)
