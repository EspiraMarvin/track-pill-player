import React, { useRef, useState } from 'react'
import { formatTime } from '../utils/format-time'
import { usePills } from '../hooks/usePills'
import { useTracks } from '../hooks/useTracks'

interface IFile {
  title: string
  src: string
  duration?: number
  author?: string
  thumbnail?: string
}
interface FileInterface {
  file: IFile
}

export default function File({ file }: FileInterface) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)

  const { handleDeletePillFromLibrary } = usePills()

  const audioRef = useRef<HTMLAudioElement>(null)

  const { trackName, handleAddPillToTrack } = useTracks()

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev)
    if (audioRef.current) {
      isPlaying ? audioRef?.current.pause() : audioRef?.current.play()
    }
  }

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      const seconds = audioRef.current.duration
      setDuration(seconds)
    }
  }

  return (
    <div>
      <div className="md:px-10">
        <audio
          src={file?.src}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
        <div className="bg-white w-full flex justify-start items-center p-4 relative max-h-20 shadow-sm rounded-md m-1 px-2 py-4 border rounded-xl group">
          <img
            src={
              file.thumbnail
                ? file.thumbnail
                : 'https://static-00.iconduck.com/assets.00/no-image-icon-2048x2048-2t5cx953.png'
            }
            className="rounded-xl w-32 h-16 object-cover"
            alt={file.thumbnail}
          />
          <p className="pl-2 md:pl-9 text-sm md:text-md font-semibold grow">
            <span data-testid="trackTitle">{file.title}</span>
            <br />
            <span className="text-sm font-normal">
              {file.author ? file.author : 'Unknown'}, {formatTime(duration)}
            </span>
          </p>

          {trackName.trim().length > 0 && (
            <span
              className="clear-left rounded-full p-4 cursor-pointer group [&_*]:transition-all [&_*]:duration-150 [&_*]:ease-in"
              onClick={() => handleAddPillToTrack(file)}
            >
              <span className="px-3 py-3 bg-white rounded-full shadow-md group-hover:bg-blue-100 hidden group-hover:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#7e9cff"
                  fill="#7e9cff"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
            </span>
          )}

          <span
            className="clear-left rounded-full p-4 cursor-pointer group [&_*]:transition-all [&_*]:duration-150 [&_*]:ease-in"
            onClick={() => handleDeletePillFromLibrary(file)}
          >
            <span className="px-3 py-3 block bg-white rounded-full shadow-md group-hover:bg-rose-600 hidden group-hover:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#FFFFFF"
                fill="#FF0000"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </span>
          </span>
          <span
            className="clear-left rounded-full p-4 cursor-pointer group [&_*]:transition-all [&_*]:duration-150 [&_*]:ease-in"
            onClick={() => togglePlayPause()}
          >
            {isPlaying && (
              <span className="px-3 py-3 block bg-white rounded-full shadow-md group-hover:bg-blue-400 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
            )}
            {!isPlaying && (
              <span className="px-3 py-3 block bg-white rounded-full shadow-md group-hover:bg-blue-900">
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
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
