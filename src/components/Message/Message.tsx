import React from 'react'
import { Col, Row, Space, Spin } from 'antd'
import styles from './style.module.scss'
import { FCC } from 'src/types'
import clsx from 'clsx'
import { useDateTimePrettyStr } from 'src/hooks/useDateTimePrettyStr'
import { Markdown } from 'src/components'

interface MessageProps {
  id: number | string
  text: string
  datetime?: string
  type: string
  isLoading?: boolean
}

const colWidth = 16

const who: Record<string, string> = {
  assistant: 'Ассистент',
  user: 'Вы',
}

export const Message: FCC<MessageProps> = ({
  text,
  datetime,
  type,
  isLoading,
}) => {
  const { dateFormatter } = useDateTimePrettyStr()

  return (
    <Row justify={type === 'user' ? 'end' : 'start'} className={styles.row}>
      <Col span={colWidth}>
        <Row>
          <Col
            span={24}
            className={clsx(styles.container, {
              [styles.user]: type === 'user',
              [styles.assistant]: type === 'assistant',
            })}
          >
            <Space direction={'horizontal'} align={'baseline'}>
              {isLoading ? <Spin size='small' /> : null}
              <Markdown content={text} />
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={colWidth}>
        <Row justify={type === 'user' ? 'end' : 'start'}>
          <Col>
            <h5 className={styles.whoAndDate}>
              {who[type]}
              {datetime ? `, ${dateFormatter({ date: datetime })}` : null}
            </h5>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

Message.displayName = 'Message'

export default Message
