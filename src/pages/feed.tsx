import { useQuery } from '@did-network/dapp-sdk'
import { Button, Spin } from 'antd' // @ts-ignore
import dayjs from 'dayjs'
import React from 'react' // @ts-ignore

// @ts-ignore
const parser = new RSSParser()
const CORS_PROXY = 'https://blue-voice-914c.whywanghai3497.workers.dev/?'

export default function () {
  const url = useQuery('url')

  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [updatedAt, setUpdatedAt] = useState<string>()
  const [link, setLink] = useState<string>()
  const [items, setItems] = useState<any[]>()

  useEffect(() => {
    if (!url) {
      return
    }
    parser.parseURL(CORS_PROXY + url, function (err: any, feed: any) {
      if (err) throw err
      console.log(feed)
      setTitle(feed.title)
      setUpdatedAt(dayjs(feed.lastBuildDate).format('YYYY-MM-DD HH:mm'))
      setDescription(feed.description)
      setLink(feed.link)
      setItems(feed.items)
    })
  }, [url])

  if (!items) {
    return (
      <div className="max-w-6xl mx-auto flex flex-row items-center justify-center h-60">
        <Spin spinning={true} />
      </div>
    )
  }

  return (
    <div className="pb-8">
      <div className="max-w-6xl mx-auto flex flex-row items-start">
        <div className="flex-col-center px-4 py-4 bg-white rounded shadow w-80 text-center">
          <div className="w-full">
            <div className="text-lg text-primary font-bold mb-1">{title}</div>
            <div className="text-sm text-text1">{description}</div>
          </div>
          <div className="text-sm text-text1 w-full border-t text-left px-2 py-4 my-1">
            <div className="flex flex-row justify-between">
              <span>Updated Time: </span>
              <span>{updatedAt}</span>
            </div>
            <div className="flex flex-row justify-between mt-1">
              <span>Link: </span>
              <a href={link} className="underline">
                {link}
              </a>
            </div>
          </div>
          <Button type="primary" className="" onClick={() => console.log(11)}>
            <span>Add to My Feeds</span>
          </Button>
        </div>
        <div className="flex-1 ml-10">
          {items?.map((i: any, index: number) => (
            <div key={'item' + index} className="px-10 mb-4 pt-5 pb-6 bg-white rounded shadow [&_a]:hover:underline">
              <a className="text-lg font-bold" href={i.link} target="_blank">
                {i.title}
              </a>
              <p className="mt-3 text-text1 text-sm">{i.contentSnippet}</p>
              <div className="flex flex-row justify-between items-center mt-4">
                <div className="flex justify-start items-center gap-x-3">
                  {i.categories
                    ?.map((i: any) => {
                      if (typeof i === 'string') {
                        return i
                      } else if (i['_']) {
                        return i['_']
                      }
                      return ''
                    })
                    .filter((i: any) => i.length <= 12 && i.length > 0)
                    .slice(0, 10)
                    .map((tag: any, tagIndex: number) => (
                      <div
                        key={'item' + index + '-' + tagIndex}
                        className="px-2 py-1 bg-primary4 text-text1 rounded-sm text-xs"
                      >
                        {tag}
                      </div>
                    ))}
                </div>
                <span className="text-xs text-text2">{dayjs(i.isoDate).format('YYYY-MM-DD HH:mm')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
