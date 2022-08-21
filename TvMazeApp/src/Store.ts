import React from 'react'
import create from 'zustand'
import {IShow} from './services/api/types'

export interface IStore {
  navigationRef: React.ReactElement | null
  setNavigationRef: Function
  isSearchActive: boolean
  setIsSearchActive: Function
  searchTerm: string
  setSearchTerm: Function
  showOfInterest: IShow | null
  setShowOfInterest: Function
}

function initStore(set): IStore {
  return {
    navigationRef: null,
    setNavigationRef: ref => set(() => ({navigationRef: ref})),

    isSearchActive: false,
    setIsSearchActive: isActive => set(() => ({isSearchActive: isActive})),
    searchTerm: '',
    setSearchTerm: searchTerm => set(() => ({searchTerm})),

    showOfInterest: null,
    setShowOfInterest: show => set(() => ({showOfInterest: show})),
  }
}

export const useStore = create(initStore)
