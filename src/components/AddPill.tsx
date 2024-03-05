import React from 'react'
import { usePills } from '../hooks/usePills'

/** allows addding of an audio file/pill to the audio pill library */
export default function AddPill() {
  const { file, handleAddPillToLibrary, handleUploadNewPill, handleDragOver } =
    usePills()
  return (
    <div className="">
      <div
        className="relative border-2 border-gray-300 border-dashed rounded-lg p-6"
        data-testid="dropzone"
        id="dropzone"
        onDragOver={handleDragOver}
        onDrop={handleUploadNewPill}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 z-50"
          accept="audio/mp3,audio/*;capture=microphone"
          data-testid="audioFileUpload"
          onChange={handleUploadNewPill}
        />
        <div className="text-center">
          <img
            className="mx-auto h-12 w-12"
            src="https://www.svgrepo.com/show/357902/image-upload.svg"
            alt=""
          />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            <label htmlFor="file-upload" className="relative cursor-pointer">
              <span>Drag and drop media file</span>
              <span className="text-indigo-600"> or browse </span>
              <span>to upload to library</span>
            </label>
          </h3>
          {!file && <p className="mt-1 text-xs text-gray-500">MP3 audi file</p>}

          {file && (
            <div>
              <p className="mt-1 text-xs text-gray-500">{file?.title}</p>
            </div>
          )}
        </div>
        <img
          src=""
          className="mt-4 mx-auto max-h-40 hidden"
          id="preview"
          alt=""
        />
      </div>
      {file && (
        <div className="text-center">
          {/* upload button */}
          <button
            className="my-2 py-1 px-6 bg-blue-800 rounded-md text-white"
            onClick={() => handleAddPillToLibrary(file)}
          >
            Upload file
          </button>
        </div>
      )}
    </div>
  )
}
