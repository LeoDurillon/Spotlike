import { exec } from 'node:child_process'
import calculate from './calculate'
import match from './match'
import searchPackage from './package'
import searchFolder from './folder'
import getApp from './apps'

const keyWord = ['upd'] as const

export default class Spotlike {
  static async parse(search: string): Promise<
    {
      name: string
      command: string | undefined
      type: string
    }[]
  > {
    if (!search) return []

    if (keyWord.some((e) => search.includes(e))) {
      const word = keyWord.find((e) => search.includes(e))
      switch (word) {
        case 'upd': {
          return [
            {
              name: 'Update apt packages',
              type: 'Command',
              command: `xterm -hold -e "sudo apt update"`
            }
          ]
        }
      }
    }

    let data
    if (match.url(search)) {
      data = [
        {
          name: 'Search for a web address',
          type: 'Web',
          command: `open ${search}`
        }
      ]
    } else if (match.calc(search)) {
      data = calculate(search)
    } else if (match.package(search)) {
      data = await searchPackage(search)
    } else if (match.path(search)) {
      data = await searchFolder(search)
    } else {
      data = await getApp(search)
    }

    if (search.length && !data.length) {
      data = [
        {
          name: 'Search something on the web',
          type: 'Web',
          command: `open https://google.com/search?q=${search.replaceAll(' ', '+')}`
        }
      ]
    }

    return data
  }

  static async exec(command: string): Promise<unknown> {
    return new Promise((res, rej) =>
      exec(command, (e, s) => {
        if (e) rej(e)
        else res(s)
      })
    )
      .then((e) => e)
      .catch((e) => e)
  }
}
