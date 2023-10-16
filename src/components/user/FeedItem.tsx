import dayjs from 'dayjs'

export default function FeedItem({ feed }: { feed: any }) {
  return (
    <div className="px-10 mb-4 pt-5 pb-6 bg-white rounded shadow [&_a]:hover:underline">
      <a className="text-lg font-bold" href={feed.link} target="_blank">
        {feed.title}
      </a>
      <p className="mt-3 text-text1 text-sm">{feed.contentSnippet}</p>
      <div className="flex flex-row justify-between items-center mt-4">
        <div className="flex justify-start items-center gap-x-3">
          {feed.categories
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
            .map((tag: any, index: number) => (
              <div key={feed.link + '-' + index} className="px-2 py-1 bg-primary4 text-text1 rounded-sm text-xs">
                {tag}
              </div>
            ))}
        </div>
        <span className="text-xs text-text2">{dayjs(feed.isoDate).format('YYYY-MM-DD HH:mm')}</span>
      </div>
    </div>
  )
}
