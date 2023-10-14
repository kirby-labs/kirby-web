import { Feed } from '@/constants/models'

export const FEEDS: Feed[] = [
  {
    title: 'Hacker News',
    xml: 'https://hnrss.org/frontpage',
    html: 'https://news.ycombinator.com/',
    description: 'A social news website focusing on computer science and entrepreneurship.',
  },
  {
    title: 'Tech Crunch',
    xml: 'https://techcrunch.com/feed/',
    html: 'https://techcrunch.com/',
    description: 'Reporting on the business of technology, startups, venture capital funding, and Silicon Valley',
  },
  {
    title: 'The Verge',
    xml: 'https://www.theverge.com/rss/index.xml',
    html: 'https://www.theverge.com/',
    description: 'The in-depth reporting and long-form feature stories of technology, science, art, and culture.',
  },
  {
    title: 'The New York Times',
    xml: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
    html: 'https://www.nytimes.com/',
    description: 'Live news, investigations, opinion, photos and video by the journalists of The New York Times',
  },
]
