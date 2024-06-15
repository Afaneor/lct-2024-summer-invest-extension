import React, { useMemo } from 'react'
import styles from './style.module.scss'
import { FCC } from 'src/types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { isSafariBrowser } from 'src/utils/isSafariBrowser'
import { Button } from 'antd'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownProps {
  content: string
  className?: string
}
export const Markdown: FCC<MarkdownProps> = ({ content, className }) => {
  const classes = useMemo(() => {
    const classes = ['prose', 'dark:prose-invert']

    if (className) {
      classes.push(className)
    }

    return classes
  }, [className])
  return useMemo(
    () => (
      <div className={classes.join(' ')}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          // @ts-ignore
          rehypePlugins={[rehypeKatex]}
          components={{
            ol({ start, children }) {
              const listItemStart = start || 1
              // для safari ol counterReset: list-item при значении 0 нумерует с 0,
              // а для chrome с 1, поэтому добавлена проверка на браузер
              return (
                <ol
                  start={start ?? 1}
                  style={{
                    counterReset: `list-item ${
                      isSafariBrowser() ? listItemStart : listItemStart - 1
                    }`,
                  }}
                >
                  {children}
                </ol>
              )
            },
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              const code = String(children)
              return !inline ? (
                <>
                  <div className={styles.code}>
                    <div className={styles.header}>
                      {code.startsWith('<svg') && code.includes('</svg>') && (
                        <Button
                          onClick={() => {
                            const blob = new Blob([code], {
                              type: 'image/svg+xml',
                            })
                            const url = URL.createObjectURL(blob)
                            const a = document.createElement('a')
                            a.href = url
                            a.download = 'image.svg'
                            a.click()
                          }}
                        >
                          <i className='fa fa-download' />
                          <span>Download SVG</span>
                        </Button>
                      )}
                    </div>
                    <SyntaxHighlighter
                      children={code}
                      style={vscDarkPlus as any}
                      language={match?.[1] || 'text'}
                      PreTag='div'
                      {...props}
                    />
                  </div>
                  {code.startsWith('<svg') && code.includes('</svg>') && (
                    <div className={styles.imageProview}>
                      <img src={`data:image/svg+xml;base64,${btoa(code)}`} />
                    </div>
                  )}
                </>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    ),
    [content, classes]
  )
}

Markdown.displayName = 'Markdown'

export default Markdown
