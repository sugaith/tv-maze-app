export interface IShow {
  id: number
  name: string
  image: {
    medium: string
    original: string
  }
  summary: string
  schedule: {
    days: string[]
    time: string
  }
}

export interface IUseShowAPIResponse {
  showsPages: IShow[][]
  currentPages: number
  setPages: Function
  isLoading: boolean
  isError: boolean
}

export interface IUseSearchShowAPIResponse {
  searchResults: IShow[][]
  isLoading: boolean
  isError: boolean
}
