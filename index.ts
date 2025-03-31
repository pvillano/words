export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Trie = [
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
    undefined | Trie,
]

/**
 *
 */
export class Words {

  list: string[]
  _trie: Trie | undefined

  constructor(params: /*{ignoreCase: true}*/ & { list: string[] }/* TODO | {url: string}*/) {
    for (const word of params.list) {
      if (/^[a-z]/.test(word)) {
        throw new Error("words must be purely a-z")
      }
    }
    this.list = params.list //TODO .map(w => w.toLowerCase())
  }

  regex(re: string): string[] {
    const reg = new RegExp(re)
    return this.list.filter(w => reg.test(w))
  }

  /**
   * Constructs a trie on first use
   */
  get trie() {
    // todo: support long tails
    const temp: Trie = new Array(26) as Trie
    if (this._trie === undefined) {
      for (const word of this.list) {
        let head = temp
        for (let i = 0; i < word.length; i++) {
          const chi = word.charCodeAt(i)
          if (head[chi] === undefined) {
            head[chi] = new Array(26) as Trie
          }
          head = head[chi]
        }
      }
    }
    this._trie = temp
    return this._trie
  }

  trieContains(word: string): boolean {
    let head = this.trie
    for (let i = 0; i < word.length; i++) {
      const chi = word.charCodeAt(i)
      if (head[chi] === undefined) {
        return false
      }
      head = head[chi]
    }
    return true
  }
}