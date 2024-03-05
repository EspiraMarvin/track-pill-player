import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useCallback,
  useRef,
} from 'react'
import { audioLibraryFiles } from '../data/pills'
import toast, { Toaster } from 'react-hot-toast'

interface IPill {
  title: string
  src: string
  duration?: number
  author?: string
  thumbnail?: string
}

interface IPills {
  file: any | {}
  setFile: React.Dispatch<React.SetStateAction<any>>
  files: []
  setFiles: React.Dispatch<React.SetStateAction<any>>
  pills: IPill[]
  setPills: React.Dispatch<React.SetStateAction<any>>
  handleAddPillToLibrary: (arg: any) => Promise<void>
  handleDeletePillFromLibrary: (arg: any) => Promise<void>
  handleUploadNewPill: (arg: any) => Promise<void>
  handleDragStart: (e: any, rg: any) => Promise<void>
  handleDragOver: (arg: any) => Promise<void>
  handleDrop: (e: any, rg: any) => Promise<void>
  handleDragEnter: (e: any, rg: any) => Promise<void>
  audioRef: React.RefObject<HTMLAudioElement>
}

export const PillsContext = createContext<IPills>({
  file: {},
  setFile: () => {},
  files: [],
  setFiles: () => {},
  pills: [],
  setPills: () => {},
  handleAddPillToLibrary: async (arg: any) => {},
  handleDeletePillFromLibrary: async (arg: any) => {},
  handleUploadNewPill: async (arg: any) => {},
  handleDragStart: async (e: any, arg: any) => {},
  handleDragOver: async (arg: any) => {},
  handleDrop: async (e: any, arg: any) => {},
  handleDragEnter: async (e: any, arg: any) => {},
  audioRef: { current: null },
})

export const PillsProvider = ({ children }: { children: React.ReactNode }) => {
  const [file, setFile] = useState<any>()
  const [files, setFiles] = useState<any>([])
  const [pills, setPills] = useState<IPill[]>([])
  const audioRef = useRef<HTMLAudioElement>(null)

  const [dragItemIndex, setDragItemIndex] = useState<number | undefined | any>()
  const [dragOverItemIndex, setDragOverItemIndex] = useState<
    number | undefined | any
  >()

  /** notification */
  const notify = (msg: string) => toast(msg)

  useEffect(() => {
    setFiles(audioLibraryFiles)
  }, [])

  const handleAddPillToLibrary = useCallback(
    (file: any) => {
      setFiles([file, ...files])
      notify('audio pill added to audio library')
      setFile('')
    },
    [files]
  )

  /** deletes audio pill from audio library */
  const handleDeletePillFromLibrary = useCallback(
    (pill: any) => {
      const index = files.indexOf(pill)
      if (index === -1) return
      const updatedLibrary = [...files]
      updatedLibrary.splice(index, 1)
      setFiles(updatedLibrary)
    },
    [files]
  )

  /**
   * handles uploading of mp3 files by traditional input or drag & drop operation
   */
  const handleUploadNewPill = useCallback((event: any) => {
    event.preventDefault()
    // try {
    let isDropped = event?.dataTransfer?.files[0]?.type.includes('audio')
    let isUploaded = event?.target?.files[0]?.type.includes('audio')

    if (!isDropped && !isUploaded) {
      notify('Wrong file uploaded, please upload an MP3 audio file')
      return
    }

    let newFile = {}

    /** if audio was dragged and dropped */
    if (isDropped && isUploaded === undefined) {
      newFile = {
        title: event.dataTransfer.files[0].name,
        src: URL.createObjectURL(event.dataTransfer.files[0]),
      }
      setFile(newFile)
    }

    /** if audio was uploaded */
    if (isUploaded && isDropped === undefined) {
      newFile = {
        title: event.target.files[0].name,
        src: URL.createObjectURL(event.target.files[0]),
      }
      setFile(newFile)
    }
    // } catch (error: any) {
    // notify(error?.message)
    // }
  }, [])

  const handleDragStart = useCallback(
    () => (e: any, index: any) => {
      setDragItemIndex(index)
    },
    []
  )

  /** handles drag over event */
  const handleDragOver = useCallback((event: any) => {
    event.preventDefault()
  }, [])

  /** handles drag enter event */
  const handleDragEnter = useCallback((e: any, index: any) => {
    console.log('handleDragEnter', index)

    setDragOverItemIndex(index)
  }, [])

  /** handles drag drop event */
  const handleDrop = useCallback(
    (event: any, index: any) => {
      console.log('BEFORE REORDERED PILLS', pills)

      // console.log('event at handleDrop', event)
      console.log('index at handleDrop', index)

      const reorderedPills = [...pills]
      // move item to new position
      const dragItem = reorderedPills.splice(dragItemIndex, 1)[0]
      console.log('DRAG ITEM', dragItem)
      console.log('dragOverItemIndex', dragOverItemIndex)

      reorderedPills.splice(dragOverItemIndex, 0, dragItem)
      setPills(reorderedPills)
      console.log('REORDERED PILLS', reorderedPills)
      setDragOverItemIndex(undefined)
    },
    [dragItemIndex, dragOverItemIndex, pills]
  )

  // memoized context values to prevent re-renders
  const memoedValue: any = useMemo(
    () => ({
      file,
      setFile,
      files,
      setFiles,
      pills,
      setPills,
      handleAddPillToLibrary,
      handleDeletePillFromLibrary,
      handleUploadNewPill,
      handleDragStart,
      handleDragOver,
      handleDrop,
      handleDragEnter,
      audioRef,
    }),
    [
      file,
      setFile,
      files,
      setFiles,
      pills,
      setPills,
      handleAddPillToLibrary,
      handleDeletePillFromLibrary,
      handleUploadNewPill,
      handleDragStart,
      handleDragOver,
      handleDrop,
      handleDragEnter,
      audioRef,
    ]
  )

  return (
    <PillsContext.Provider value={memoedValue}>
      {children}
    </PillsContext.Provider>
  )
}
