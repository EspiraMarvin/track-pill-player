import React from 'react'
import { usePills } from '../hooks/usePills'
import { useTracks } from '../hooks/useTracks'

interface IPill {
  title: string
  src: string
  duration?: number
  author?: string
  thumbnail?: string
}

interface PillInterface {
  file: IPill
  index: number
  handleDragStart: (e: any, index: number) => any
  handleDragOver: (e: any) => any
  handleDrop: (e: any, index: number) => any
  handleDragEnter: (e: any, index: number) => any
}

export default function Pill({
  file,
  index,
  handleDragStart,
  handleDragOver,
  handleDragEnter,
  handleDrop,
}: PillInterface) {
  const { audioRef } = usePills()
  const { handleDeletePillFromTrack } = useTracks()

  return (
    <div
      className="h-24 w-36 mr-1 border rounded-lg overflow-x-hidden px-0.5 relative overflow-y-hidden flex items-center text-sm text-center"
      draggable
      onDragStart={(e: any) => handleDragStart(e, index)}
      onDragOver={handleDragOver}
      onDrop={(e: any) => handleDrop(e, index)}
      onDragEnter={(e: any) => handleDragEnter(e, index)}
    >
      <audio src={file.src} ref={audioRef} data-testid="pillTrackSource" />
      <div className="text-ellipsis" data-testid="pillTrackTitle">
        {file.title}
      </div>
      <span
        className="clear-left rounded-full p-4 cursor-pointer group [&_*]:transition-all [&_*]:duration-150 [&_*]:ease-in"
        onClick={() => handleDeletePillFromTrack(file)}
      >
        <span className="absolute bottom-2 right-0 bg-white rounded-full shadow-md group-hover:bg-blue-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#7e9cff"
            fill="#eeee"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </span>
      </span>
    </div>
  )
}
