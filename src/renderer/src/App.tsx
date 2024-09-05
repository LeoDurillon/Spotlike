import { useEffect, useState } from 'react'
import SearchBar from './components/searchBar'
import ChevronsRight from './components/icons/chevrons-right'
import SearchElement from './components/searchElement'

const get = async (
  search: string
): Promise<
  (
    | {
        name: string
        command: string
        type: 'File' | 'Folder' | 'App' | 'Package' | 'Command'
      }
    | {
        name: string
        type: 'Web' | 'Calc'
      }
  )[]
> => {
  // Use IPC API to query Electron's main thread and run this method

  const result = await window.api.get(search)
  return result
}

const exec = async (command: string): Promise<void> => {
  const result = await window.api.exec(command)

  return result
}

const close = async (): Promise<void> => {
  await window.api.close()
}

function App(): JSX.Element {
  const [search, setSearch] = useState<string>('')
  const [apps, setApps] = useState<
    (
      | {
          name: string
          command: string
          type: 'File' | 'Folder' | 'App' | 'Package' | 'Command'
        }
      | {
          name: string
          type: 'Web' | 'Calc'
        }
    )[]
  >([])

  useEffect(() => {
    ;(async (): Promise<void> => {
      const res = await get(search)

      setApps(res)
    })()
  }, [search])

  return (
    <main
      onKeyDown={async (e) => {
        if (e.key === 'Escape') {
          await close()
        }
      }}
      onClick={async () => {
        await close()
      }}
      className="flex flex-col gap-2 justify-center max-w-4xl m-auto h-screen"
    >
      <form
        className="flex flex-col gap-3 h-full py-72"
        onSubmit={async () => {
          if ('command' in apps[0]) {
            await exec(apps[0].command)
          }
          await close()
        }}
      >
        <SearchBar type={apps[0]?.type} search={search} setSearch={setSearch} />
        <div
          className={`flex flex-col rounded-lg mx-3 ${
            search.length && apps.length ? 'bg-background shadow-lg border border-border' : ''
          }`}
        >
          {apps.map((e, i) => {
            if (!e.name) return
            if (!('command' in e)) {
              return (
                <div key={e.name} className="flex items-center gap-3 px-8 py-2">
                  <ChevronsRight class="[&>*]:bg-blue-300 size-4" />
                  <p>{e.name}</p>
                </div>
              )
            }
            return (
              <SearchElement
                key={e.name}
                onClick={(event) => {
                  event.stopPropagation()
                  if (e.type === 'Folder') {
                    const value = search.split('/')
                    value.pop()
                    setSearch(value.join('/') + '/' + e.name + '/')
                  } else {
                    exec(e.command)
                  }
                }}
                index={i}
                {...e}
              />
            )
          })}
        </div>
      </form>
    </main>
  )
}

export default App
