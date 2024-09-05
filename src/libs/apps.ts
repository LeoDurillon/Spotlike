import { exec } from 'node:child_process'
import filter from './fuse'

export default async function getApp(search: string): Promise<
  {
    name: string
    command: string | undefined
    type: string
  }[]
> {
  const files = await new Promise<string>((resolve, reject) => {
    exec('ls /usr/share/applications', (e, s) => {
      if (e) reject(e)
      resolve(s)
    })
  }).then((e) => e)

  const fuse = filter(search, files.split('.desktop\n'))

  const fileData = await Promise.allSettled(
    fuse.slice(0, 8).map((e) =>
      new Promise<string>((resolve, reject) => {
        exec(`cat /usr/share/applications/${e.item}.desktop`, (e, s) => {
          if (e) reject(e)
          resolve(s)
        })
      }).then((result) => ({
        file: e.item,
        content: result
          .split('\n')
          .find((e) => e.includes('Exec='))
          ?.split('=')[1]
          .split(' ')[0]
      }))
    )
  ).then((val) =>
    val
      .filter((e) => e.status === 'fulfilled')
      .map((e) => ({ content: e.value.content, file: e.value.file }))
  )

  const data = Array(...new Set(fileData.map((e) => e.content))).map((e) => ({
    name:
      (e ?? '').replace(/^.*\//, '').slice(0, 1).toUpperCase() +
      (e ?? '').replace(/^.*\//, '').slice(1).split('.')[0],
    command: e,
    type: 'App'
  }))

  return data
}
