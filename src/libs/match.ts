export default {
  calc: (search: string): boolean => {
    const reg = new RegExp(/\d+(\d+|\+|-|\*|\/|\(|\))/g)
    return !!search.match(reg)
  },
  path: (search: string): boolean => {
    const reg = new RegExp(/(^(.?)(\/))+.*\/?/)
    return !!search.match(reg) && (search.startsWith('/') || search.startsWith('~/'))
  },
  url: (search: string): boolean => {
    const reg = new RegExp(/\d+\.\d+(\.\d+)+/g)
    return (
      search.startsWith('https://') ||
      search.startsWith('http://') ||
      search.startsWith('localhost') ||
      !!search.match(reg)
    )
  },
  package: (search: string): boolean => {
    return search.startsWith('add')
  }
}
