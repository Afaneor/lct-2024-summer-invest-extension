import React from 'react'
import styles from './style.module.scss'
import { FCC } from 'src/types'
import { Button } from 'antd'
import { CloseOutlined, MessageOutlined } from '@ant-design/icons'

interface MainChatBtnProps {
  isActive?: boolean
  onClick: () => void
}
export const MainChatBtn: FCC<MainChatBtnProps> = ({ isActive, onClick }) => {
  return (
    <Button
      type={'primary'}
      className={styles.btnContainer}
      size={'large'}
      shape={'circle'}
      icon={!isActive ? <MessageOutlined /> : <CloseOutlined />}
      onClick={onClick}
    />
  )
}

MainChatBtn.displayName = 'MainChatBtn'

export default MainChatBtn
