import { Feed } from '@/constants/models'

export function parseOutlines(xmlString: string) {
  console.log('xmlString', xmlString)
  const regex = /<outline.+text\s*=\s*"(.*?)".+htmlUrl\s*=\s*"(.*?)".+xmlUrl\s*=\s*"(.*?)"/g
  const outlines: Feed[] = []

  let match: any
  while ((match = regex.exec(xmlString)) !== null) {
    outlines.push({
      title: match[1],
      html: match[2],
      xml: match[3],
    })
  }
  return outlines
}
