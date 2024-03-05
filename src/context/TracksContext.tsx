import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { createContext } from 'react'
import { usePills } from '../hooks/usePills'

interface IPill {
  title: string
  src: string
  duration?: number
  author?: string
  thumbnail?: string
}

interface ITracks {
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean | any>>
  playingIndex: number
  setPlayingIndex: (arg: number) => Promise<void>
  audioTrack: {}
  setAudioTrack: React.Dispatch<React.SetStateAction<string | any>>
  audioTracks: any | []
  setAudioTracks: React.Dispatch<React.SetStateAction<any>>
  trackName: string
  setTrackName: React.Dispatch<React.SetStateAction<string>>
  handleAddPillToTrack: (pill: any) => Promise<void>
  handleDeletePillFromTrack: (pill: IPill) => Promise<void>
  saveTrack: () => Promise<void>
  handleDeleteTrackFromTrackList: (track: any) => Promise<void>
}
interface NewAudioTrack {
  title: string
  src?: any
  author?: string
  thumbnail?: string
}

export const TracksContext = createContext<ITracks>({
  isPlaying: false,
  setIsPlaying: () => {},
  playingIndex: 0,
  setPlayingIndex: async (arg: number) => {},
  audioTrack: {},
  setAudioTrack: () => {},
  audioTracks: [],
  setAudioTracks: async () => {},
  trackName: '',
  setTrackName: () => {},
  handleAddPillToTrack: async (pill: IPill) => {},
  handleDeletePillFromTrack: async (pill: IPill) => {},
  saveTrack: async () => {},
  handleDeleteTrackFromTrackList: async (track: any) => {},
})

export const TracksProvider = ({ children }: { children: React.ReactNode }) => {
  const [audioTracks, setAudioTracks] = useState<any | []>([])
  const [audioTrack, setAudioTrack] = useState<NewAudioTrack | {} | any>()
  const [trackName, setTrackName] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [playingIndex, setPlayingIndex] = useState(0)

  const { setPills, pills } = usePills()

  useEffect(() => {
    if (trackName) {
      setAudioTrack({ title: trackName })
    }
  }, [trackName])

  const handleAddPillToTrack = useCallback(
    (pill: any) => {
      setPills([...pills, pill])
    },
    [pills, setPills]
  )

  const saveTrack = useCallback(() => {
    const newAudioTrack = { title: audioTrack.title, sources: [...pills] }
    setAudioTracks((prev: any) => [newAudioTrack, ...prev])
    setAudioTrack({})
    setTrackName('')
    setPills([])
    setIsPlaying(false)
    setPlayingIndex(0)
  }, [audioTrack, pills, setPills])

  const handleDeletePillFromTrack = useCallback(
    (pill: IPill) => {
      const index = pills.indexOf(pill)
      if (index === -1) return
      const updatedTracks = [...pills]
      updatedTracks.splice(index, 1)
      setPills(updatedTracks)
      setPlayingIndex(0)
    },
    [pills, setPills]
  )

  const handleDeleteTrackFromTrackList = useCallback(
    (track: any) => {
      const index = audioTracks.indexOf(track)
      if (index === -1) return
      const updatedTracks = [...audioTracks]
      updatedTracks.splice(index, 1)
      setAudioTracks(updatedTracks)
    },
    [audioTracks]
  )

  const memoedValue: any = useMemo(
    () => ({
      isPlaying,
      setIsPlaying,
      playingIndex,
      setPlayingIndex,
      audioTrack,
      setAudioTrack,
      audioTracks,
      setAudioTracks,
      trackName,
      setTrackName,
      handleAddPillToTrack,
      handleDeletePillFromTrack,
      saveTrack,
      handleDeleteTrackFromTrackList,
    }),
    [
      isPlaying,
      setIsPlaying,
      playingIndex,
      setPlayingIndex,
      audioTrack,
      setAudioTrack,
      audioTracks,
      setAudioTracks,
      trackName,
      setTrackName,
      handleAddPillToTrack,
      handleDeletePillFromTrack,
      saveTrack,
      handleDeleteTrackFromTrackList,
    ]
  )

  return (
    <TracksContext.Provider value={memoedValue}>
      {children}
    </TracksContext.Provider>
  )
}
