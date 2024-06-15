import React from 'react'
import { SmartChat } from 'src/chat/SmartChat'

export const App: React.FC = () => {
  return (
    <div
      style={{
        height: '100vh',
        padding: '5px',
      }}
    >
      <SmartChat />
    </div>
  )
}

App.displayName = 'App'

export default App
