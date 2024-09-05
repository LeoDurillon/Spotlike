import { MouseEvent } from 'react'
import ChevronsRight from './icons/chevrons-right'
import FileText from './icons/file-text'
import Folder from './icons/folder'
import Package from './icons/package'
import Play from './icons/play'
import Terminal from './icons/terminal'

function SearchElements({
  name,
  type,
  index,
  onClick
}: {
  name: string
  type: 'File' | 'Folder' | 'App' | 'Package' | 'Command'
  index: number
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}): JSX.Element {
  return (
    <>
      {index > 0 && <span className="self-stretch bg-border h-px" />}
      <button
        type="button"
        onClick={onClick}
        tabIndex={index}
        className="flex items-center gap-3 px-8 py-2  focus-visible:outline-border focus-visible:bg-black/10"
      >
        {type === 'App' ? (
          <Play class="size-4" />
        ) : type === 'File' ? (
          <FileText class="size-4" />
        ) : type === 'Folder' ? (
          <Folder class="size-4" />
        ) : type === 'Package' ? (
          <Package class="size-4" />
        ) : type === 'Command' ? (
          <Terminal class="size-4" />
        ) : (
          <ChevronsRight class="size-4" />
        )}

        <p>{name}</p>
      </button>
    </>
  )
}

export default SearchElements
