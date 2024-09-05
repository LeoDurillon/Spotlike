import { exec } from 'node:child_process'
import filter from './fuse'

export default async function searchFolder(search: string): Promise<
  {
    name: string
    command: string | undefined
    type: string
  }[]
> {
  const folder = search.replace('file:', '').split('/')
  const searchedFile = search.replace(/^.*\//, '')
  folder.pop()

  const files = await new Promise<string>((resolve, reject) => {
    exec(`ls ${folder.join('/')}`, (e, s) => {
      if (e) reject(e)
      resolve(s)
    })
  }).then((e) => e.split('\n'))

  let result
  if (searchedFile) {
    result = filter(searchedFile, files).map((e) => ({
      name: e.item,
      type: e.item.split('.')[1] ? 'File' : 'Folder',
      command: 'open ' + search + '/' + e.item
    }))
  } else {
    result = [
      {
        name: '/',
        type: 'Folder',
        command: 'open ' + folder.join('/')
      },
      ...files.map((e) => ({
        name: e,
        type: e.split('.')[1] ? 'File' : 'Folder',
        command: 'open ' + folder.join('/') + e
      }))
    ]
  }
  return result
}
