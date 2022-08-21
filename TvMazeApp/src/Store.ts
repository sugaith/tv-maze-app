import create from 'zustand'

export interface IStore {
  isSearchActive: boolean
  setIsSearchActive: Function
  searchTerm: string
  setSearchTerm: Function
}

function initStore(set): IStore {
  return {
    isSearchActive: false,
    setIsSearchActive: isActive => set(() => ({isSearchActive: isActive})),
    searchTerm: '',
    setSearchTerm: searchTerm => set(() => ({searchTerm})),
  }
}

export const useStore = create(initStore)
