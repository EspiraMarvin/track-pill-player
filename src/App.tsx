import React from 'react'
import './App.css'
import AddPill from './components/AddPill'
import AudioLibrary from './components/AudioLibrary'
import Timeline from './components/Timeline'
import { Toaster } from 'react-hot-toast'
import TracksList from './components/TracksList'
import CreateTrack from './components/CreateTrack'

function App() {
  return (
    <div className="px-4">
      <header className="font-bold text-xl p-4 text-center">
        Music Pill Player
      </header>
      <main className="flex flex-col">
        <div className="grid gap-x-2 grid-cols-1 md:grid-cols-2">
          <div className="border shadow-md">
            <div className="flex flex-row justify-center items-center m-1">
              <AddPill />
            </div>
            <AudioLibrary />
          </div>
          <div className="border shadow-md">
            <CreateTrack />
            <TracksList />
          </div>
        </div>

        <div>
          <Timeline />
        </div>
      </main>
      <Toaster position="top-center" />
    </div>
  )
}

export default App
