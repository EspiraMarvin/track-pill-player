import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import Pill from './Pill'
import { usePills } from '../hooks/usePills'
import { useTracks } from '../hooks/useTracks'

export default function Timeline() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [playingIndex, setPlayingIndex] = useState(0)
  const [audioTrackLength, setAudioTrackLength] = useState(0)

  const {
    pills,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnter,
  } = usePills()

  const { audioTrack, saveTrack } = useTracks()

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }

  useEffect(() => {
    if (audioTrack !== undefined) {
      const checkAudioTrackLength = Object.keys(audioTrack).length
      setAudioTrackLength(checkAudioTrackLength)
    }
  }, [audioTrack])

  return (
    <div>
      <div className="text-center text-lg font-semibold border-bottom py-3">
        Timeline
      </div>
      {audioTrackLength === 0 && (
        <div className="text-md italic border border-blue-100 rounded-xl h-10 w-full text-center py-10 pb-24">
          Track pills playground !!!
        </div>
      )}
      {audioTrackLength === 1 && pills.length === 0 && (
        <div className="text-md italic border border-blue-100 rounded-xl h-10 w-full text-center py-10 pb-24">
          Track name created, add pills to your new track from the audio library
          !!!
        </div>
      )}
      {audioTrackLength > 0 && pills.length > 0 && (
        <div className="border">
          <div className="flex flex-row border-top p-2 overflow-x-auto overflow-x-scroll">
            {pills.map((pill: any, index: any) => (
              <Pill
                key={index}
                file={pill}
                index={index}
                handleDragStart={(e: any, index: any) =>
                  handleDragStart(e, index)
                }
                handleDragOver={handleDragOver}
                handleDrop={(e: any, index: any) => handleDrop(e, index)}
                handleDragEnter={(e: any, index: any) =>
                  handleDragEnter(e, index)
                }
              />
            ))}
          </div>

          <div>
            <ReactPlayer
              url={pills[playingIndex]?.['src']}
              playing={isPlaying}
              mute="false"
              controls={true}
              onEnded={() => {
                const indexesLength = pills.length - 1
                if (indexesLength === playingIndex) {
                  setIsPlaying(false)
                  setPlayingIndex(0)
                  setIsPlaying(true)
                  return
                }
                setPlayingIndex(playingIndex + 1)
              }}
              width={0}
              height={0}
              config={{
                file: {
                  forceAudio: true,
                },
              }}
            />
          </div>

          <div className="flex flex-row">
            <div className="w-1/2 text-center">
              <button className="text-center w-full">
                <span
                  className="rounded-xl cursor-pointer group [&_*]:transition-all [&_*]:duration-150 [&_*]:ease-in"
                  onClick={() => togglePlayPause()}
                >
                  {isPlaying && (
                    <div className="px-3 py-3 block rounded-top-xl shadow-md bg-blue-100 group-hover:bg-rose-600">
                      <div className="flex flex-row text-center">
                        Pause
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="text-center w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                  {!isPlaying && (
                    <div className="px-3 py-3 block rounded-top-xl shadow-md bg-blue-100 group-hover:bg-rose-600">
                      <div className="flex flex-row text-center">
                        Play
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="group-hover:fill-white group-hover:stroke-white"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#7e9cff"
                          fill="#7e9cff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M7 4v16l13 -8z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </span>
              </button>
            </div>
            <div
              className="w-1/2 text-center shadow-md bg-green-100 group-hover:bg-rose-600"
              onClick={saveTrack}
            >
              <button className="flex flex-col text-center w-full items-center mt-3">
                Save Track
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
