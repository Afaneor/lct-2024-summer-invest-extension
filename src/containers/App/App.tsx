import React, { Suspense, useState } from 'react'
import { MainChatBtn, SmartChatContainer } from 'src/components'

export const App: React.FC = () => {
  // const { currentUserInfo, isLoading } = useContext(CurrentUserContext)
  const [show, setShow] = useState(true)
  return (
    <div>
      <SmartChatContainer isOpen={show} />
      <Suspense fallback={null}>
        <MainChatBtn isActive={show} onClick={() => setShow(!show)} />
      </Suspense>
    </div>
  )
}

App.displayName = 'App'

export default App
