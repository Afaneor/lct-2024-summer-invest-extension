import React, { useEffect } from 'react'
import { Button, Input, Upload, Row, Col, Form } from 'antd'
import { SendOutlined, PaperClipOutlined } from '@ant-design/icons'
import IconAsButton from '../IconAsButton/IconAsButton'
import { FCC } from 'src/types'
const { TextArea } = Input

interface InputMessageContainerProps {
  onSend: (message: string) => void
  onUpload?: (file: any) => void
  isDisabled?: boolean
}
export const InputMessageContainer: FCC<InputMessageContainerProps> = ({
  onSend,
  isDisabled,
}) => {
  const [form] = Form.useForm()
  const inputRef = React.useRef<any>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus() // Устанавливаем фокус на поле ввода
    }
  }, [isDisabled])

  const handleSendClick = () => {
    form.validateFields().then((values) => {
      console.log('Message sent:', values.message)
      onSend(values.message)
      form.resetFields()
    })
  }

  const handleUpload = (info: any) => {
    // Здесь вы можете обработать загрузку файла
    console.log('File uploaded:', info.file)
  }

  return (
    <Form
      form={form}
      layout={'horizontal'}
      disabled={isDisabled}
      onFinish={handleSendClick}
    >
      <Row
        gutter={10}
        justify={'space-between'}
        align={'middle'}
        style={{ marginTop: 8 }}
      >
        <Col span={2}>
          <Form.Item name='file'>
            <Upload beforeUpload={handleUpload} showUploadList={false}>
              <IconAsButton icon={PaperClipOutlined} />
            </Upload>
          </Form.Item>
        </Col>
        <Col span={19}>
          <Form.Item name='message' required>
            <TextArea
              ref={inputRef}
              autoSize={{ minRows: 1, maxRows: 3 }}
              autoFocus
              placeholder='Введите сообщение'
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.metaKey) {
                  // Если нажата клавиша Enter с Cmd
                  e.preventDefault() // Предотвращаем отправку формы
                  const { value, selectionStart, selectionEnd } =
                    e.target as HTMLTextAreaElement
                  const newValue =
                    value.substring(0, selectionStart) +
                    '\n' +
                    value.substring(selectionEnd)
                  form.setFieldsValue({ message: newValue }) // Устанавливаем новое значение с символом новой строки
                  setTimeout(() => {
                    ;(e.target as HTMLTextAreaElement).selectionStart =
                      selectionStart + 1 // Перемещаем курсор на новую строку
                    ;(e.target as HTMLTextAreaElement).selectionEnd =
                      selectionStart + 1
                  }, 0)
                } else if (e.key === 'Enter' && !e.metaKey) {
                  // Если нажата клавиша Enter без Cmd
                  e.preventDefault() // Предотвращаем переход на новую строку
                  handleSendClick() // Отправляем сообщение
                }
              }}
            />
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                disabled={!form.getFieldValue('message')}
                htmlType='submit'
                icon={<SendOutlined />}
              />
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default InputMessageContainer
