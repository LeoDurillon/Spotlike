import Fuse, { FuseResult } from 'fuse.js'

export default function filter(search: string, data: string[]): FuseResult<string>[] {
  return new Fuse(data, {
    shouldSort: true
  }).search(search)
}
