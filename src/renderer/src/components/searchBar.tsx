import React, { useEffect, useState } from 'react'
import Search from './icons/search'
import Globe from './icons/globe'
import Book from './icons/book'

function SearchBar({
  setSearch,
  search,
  type
}: {
  type: 'File' | 'Folder' | 'App' | 'Package' | 'Command' | 'Web' | 'Calc'
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element {
  const [raw, setRaw] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(raw)
    }, 500)

    return (): void => {
      clearTimeout(handler)
    }
  }, [raw])

  useEffect(() => {
    if (raw !== search) {
      setRaw(search)
    }
  }, [search])

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
      }}
      className="flex gap-3 border border-border px-3 rounded-lg items-center bg-background/95 drop-shadow-lg"
    >
      {type === 'Web' ? (
        <Globe class="size-5" />
      ) : type === 'Calc' ? (
        <Book class="size-5" />
      ) : (
        <Search class="size-5" />
      )}
      <input
        type="text"
        className="flex-1 bg-transparent outline-none font-regular py-2 "
        placeholder="Recherche Spotlike"
        value={raw}
        onChange={(e) => {
          setRaw(e.target.value)
        }}
      />
    </div>
  )
}

export default SearchBar
