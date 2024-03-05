import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTracks } from '../hooks/useTracks'

export default function CreateTrack() {
  const [loading, setLoading] = useState(false)
  const [audioTrackLength, setAudioTrackLength] = useState(0)
  const { trackName, setTrackName, audioTrack } = useTracks()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async ({ name = '' }) => {
    try {
      setLoading(true)
      setTrackName(name.trim())
      reset({ name: '' })
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }

  const nameSubmittedLength = trackName.trim().length

  useEffect(() => {
    if (audioTrack !== undefined) {
      const checkAudioTrackLength = Object.keys(audioTrack).length
      setAudioTrackLength(checkAudioTrackLength)
    }
  }, [audioTrack])

  return (
    <div className="text-center px-2 md:px-4">
      {audioTrackLength === 1 && (
        <div>
          <span className="font-bold uppercase">{trackName}</span> track
          created, add pills from the audio library to your new track !!!
        </div>
      )}

      {nameSubmittedLength === 0 && (
        <>
          <div className="text-md">Create Track</div>
          <div className="text-sm italic">Enter track name to proceed</div>
          <form
            className="flex flex-col gap-y-5 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div
              className={`flex border rounded-xl
         relative ${errors.accountId && 'border-red-500'}`}
            >
              <input
                className="w-full px-6 py-4 border border-none rounded-xl bg-slate-50 focus:outline-none"
                type="text"
                placeholder="Enter track name"
                {...register('name', { required: true })}
              />
            </div>

            {/* login buttons */}
            <div className="input-button">
              <button
                data-type="transaction-submit"
                type="submit"
                className={` w-full rounded-md bg-gradient-to-r from-blue-500 to-indigo-500  py-3 text-gray-50 text-lg
        } ${loading && 'opacity-50'}`}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'save track name'}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}
