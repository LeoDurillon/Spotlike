import { exec } from 'node:child_process'
import filter from './fuse'
export default async function searchPackage(search: string): Promise<
  {
    name: string
    command: string | undefined
    type: string
  }[]
> {
  const res = await new Promise<string>((res, rej) =>
    exec(`nala search ${search}`, (e, s) => {
      if (e) rej(e)
      res(s)
    })
  ).then((e) => e.split('\n').filter((e) => e.includes('[Ubuntu')))

  const result = filter(search, res)
    .map((e) => ({
      name: e.item.replace(/\[.*\]/, ''),
      type: 'Package',
      command: `nala install ${e.item}`
    }))
    .slice(0, 8)
  return result
}
