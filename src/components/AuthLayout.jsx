import React from 'react'

function AuthLayout({children, authentication=true}) {
  return (
    <div>
      {children}
    </div>
  )
}

export default AuthLayout
