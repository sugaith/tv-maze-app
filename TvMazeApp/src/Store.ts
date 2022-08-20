import create from 'zustand'

export interface IStore {
  isSearchActive: boolean
  setIsSearchActive: Function
  searchTerm: string
  setSearchTerm: Function
}

export const useStore = create(set => ({
  isSearchActive: false,
  setIsSearchActive: isActive => set(() => ({isSearchActive: isActive})),
  searchTerm: '',
  setSearchTerm: searchTerm => set(() => ({searchTerm})),
}))
