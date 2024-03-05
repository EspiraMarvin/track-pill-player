import { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useTracks } from '../hooks/useTracks'

export default function TracksList() {
  const {
    audioTracks,
    isPlaying,
    setIsPlaying,
    playingIndex,
    setPlayingIndex,
    handleDeleteTrackFromTrackList,
  } = useTracks()

  useEffect(() => {
    console.log('playingIndex', playingIndex)
  }, [audioTracks, setIsPlaying, setPlayingIndex, playingIndex])

  useEffect(() => {
    setPlayingIndex(0)
  }, [setPlayingIndex])

  return (
    <div className="text-center my-3 px-2 md:px-4">
      <div className="text-lg font-bold my-3">TracksList</div>
      {audioTracks.length === 0 && (
        <div className="text-center text-sm"> No Audio Tracks</div>
      )}
      <div className="overflow-y-auto h-[430px]">
        {audioTracks.map((track: any, index: any) => (
          <div
            key={index}
            className="h-20 w-full px-2 md:px-6 border shadow-md rounded-lg overflow-x-hidden px-0.5 relative overflow-y-hidden flex items-center text-md text-center relative"
          >
            <div className="capitalize">
              <span className="text-xs">Title</span>: {track.title}
            </div>
            <span
              className="clear-left rounded-full p-4 cursor-pointer group [&_*]:transition-all [&_*]:duration-150 [&_*]:ease-in absolute right-28 bottom-0"
              onClick={() => handleDeleteTrackFromTrackList(track)}
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
            {/* url={audioTracks[index]['sources'][playingIndex]['src']} */}

            <div className="absolute bottom-0 right-0">
              <ReactPlayer
                url={track?.['sources'][playingIndex]['src']}
                playing={isPlaying}
                controls={true}
                onEnded={() => {
                  const indexesLength = track['sources'].length - 1
                  if (indexesLength === playingIndex) {
                    setPlayingIndex(0)
                    setIsPlaying(false)
                    return
                  }
                  setPlayingIndex(playingIndex + 1)
                  setIsPlaying(true)
                }}
                width={100}
                height={100}
                config={{
                  file: {
                    forceAudio: true,
                  },
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
