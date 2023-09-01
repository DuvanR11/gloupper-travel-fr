'use client'

import React, { FC, ReactNode, useEffect, useState } from 'react'

interface ClientOnlyProps {
    children: ReactNode
}

const ClientOnly: FC<ClientOnlyProps> = ({ children }) => {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])
    
    if (!hasMounted) {
        return null
    }

  return (
    <>
        { children }
    </>
  )
}

export default ClientOnly