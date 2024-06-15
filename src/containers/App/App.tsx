import React from 'react'
import { SmartChatContainer } from 'src/components'

export const App: React.FC = () => {
  return (
    <div
      style={{
        height: '100vh',
        padding: '5px',
      }}
    >
      <SmartChatContainer />
    </div>
  )
}

App.displayName = 'App'

export default App
