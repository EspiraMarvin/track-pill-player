import React from 'react'
import File from './File'
import { usePills } from '../hooks/usePills'

export default function AudioLibrary() {
  const { files } = usePills()
  return (
    <div>
      <div>
        <div className="text-lg text-center font-semibold mt-4 mb-2">
          Audio Pill Library
        </div>
        <div className="overflow-y-auto h-[430px]">
          {files.map((file: any, index: number) => (
            <File key={index} file={file} />
          ))}
        </div>
      </div>
    </div>
  )
}
