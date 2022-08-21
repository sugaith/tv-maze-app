import React from 'react'
import create from 'zustand'
import {IEpisode, IShow} from './services/api/types'

export interface IStore {
  navigationRef: React.ReactElement | null
  setNavigationRef: Function
  isSearchActive: boolean
  setIsSearchActive: Function
  searchTerm: string
  setSearchTerm: Function
  showOfInterest: IShow | null
  setShowOfInterest: Function
  episodeOfInterest: IEpisode | null
  setEpisodeOfInterest: Function
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

    episodeOfInterest: null,
    setEpisodeOfInterest: episode => set(() => ({episodeOfInterest: episode})),
  }
}

export const useStore = create(initStore)
