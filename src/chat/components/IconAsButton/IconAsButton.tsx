import React from 'react'
import styles from './style.module.scss'
import { FCC } from '../../types'

interface IconAsButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: any
}
export const IconAsButton: FCC<IconAsButtonProps> = ({
  icon: Icon,
  ...rest
}) => {
  return <Icon className={styles.icon} {...rest} />
}

IconAsButton.displayName = 'IconAsButton'

export default IconAsButton
