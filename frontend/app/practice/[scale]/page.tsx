'use client'

import React, { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import Image from 'next/image';
import TimeLog from "@/types/time_log"

const scales = [
    "Ionian",
    "Dorian",
    "Phrygian",
    "Lydian",
    "Mixolydian",
    "Aeolian",
    "Locrian",
]

const notes = [
    "C",
    "C#/Db",
    "D",
    "D#/Eb",
    "E",
    "F",
    "F#/Gb",
    "G",
    "G#/Ab",
    "A",
    "A#/Bb",
    "B",
]

export default function PracticePage() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0)
  const [notePermutations, setNotePermutations] = useState<string[]>([])
  const [bpm, setBpm] = useState(60)
  const [isMetronomeOn, setIsMetronomeOn] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const { scale } = useParams<{ scale: string }>()

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 1)
      }, 10)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  // Metronome effect
  useEffect(() => {
    if (!isMetronomeOn) return
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    const interval = setInterval(() => {
      // Play beep
      const ctx = audioCtxRef.current
      if (ctx) {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = "sine"
        osc.frequency.value = 1000
        gain.gain.value = 0.1
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.05)
      }
    }, 60000 / bpm)
    return () => clearInterval(interval)
  }, [isMetronomeOn, bpm])

  // Generate Random Note Permutations with Fisher-Yates (Knuth) Algorithm
  const generateNotePermutations = (notes: string[]) => {
      let array = [...notes]
      let currentIndex = array.length
      let randomIndex: number

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex)
          currentIndex--
          ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
      }
      return array
  }

  const formatTime = (centiseconds: number) => {
    const minutes = Math.floor(centiseconds / 6000)
    const seconds = Math.floor((centiseconds % 6000) / 100)
    const cs = centiseconds % 100
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${cs.toString().padStart(2, "0")}`
  }

  const handleStart = () => {
    if (!scale) return
    setNotePermutations(generateNotePermutations(notes))
    setCurrentNoteIndex(0)
    setIsRunning(true)
    setIsCompleted(false)
  }

  const handleNextNote = () => {
    if (currentNoteIndex < notePermutations.length - 1) {
      setCurrentNoteIndex(currentNoteIndex + 1)
    } else {
      setIsRunning(false)
      setIsCompleted(true)
    }
  }

  const handleReset = () => {
    setTime(0)
    setIsRunning(false)
    setIsCompleted(false)
    setCurrentNoteIndex(0)
  }

  const handleSave = () => {

    const timeString = formatTime(time)
    fetch("http://localhost:8000/api/time/create/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 1, // Replace with actual user ID
        scale_name: scale,
        duration: time,
      } as TimeLog),
    })
      .then((response) => {
        if (response.ok) {
          alert(`Time saved successfully! Duration: ${timeString}`)
        } else {
          alert("Failed to save time.")
        }
      })
      .catch((error) => {
        console.error("Error saving time:", error)
        alert("An error occurred while saving the time.")
      }
    )

    setTime(0)
    setIsRunning(false)
    setIsCompleted(false)
    setCurrentNoteIndex(0)
  }

  return (
    <div className = "p8 sm:p-10">
    <div className="flex flex-row items-center justify-center p-8 bg-gray-100">
      <div className="flex flex-col items-center">
        <span className="text-8xl font-mono">
          {(scale as string).charAt(0).toUpperCase() + (scale as string).slice(1)}
        </span>
        <Image
          src={`/images/${scale}.png`}
          alt={`${scale} scale diagram`}
          width={'400'}
          height={200}
        />
        <h1 className="text-3xl font-bold mb-6">Timer</h1>
        <div className="text-4xl font-mono mb-6">{formatTime(time)}</div>
        <div className="flex gap-4 justify-center">
          {!isRunning && !isCompleted && (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleStart}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Start
              </button>
            </div>
          )}
          {isRunning && (
            <div className="flex flex-col items-center gap-4">
              
              <span className="text-6xl font-mono">
                  {notePermutations[currentNoteIndex]}
              </span>
              <div className="flex gap-4">
                  <button onClick={handleNextNote} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Next Note
                  </button>
                  <button onClick={handleReset} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                  Stop
                  </button>
              </div>
            </div>
          )}
          {isCompleted && (
            <>
              <span className="text-4xl">Would you like to save your time?</span>
              <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Save
              </button>
              <button onClick={handleReset} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      {/* Metronome UI */}
      <div className="flex flex-col items-center p-4 bg-white rounded shadow ml-8 min-w-[180px]">
        <div className="mb-2 font-bold">Metronome</div>
        <div className="flex items-center gap-2 mb-2">
          <label>BPM:</label>
          <input
            type="number"
            min={30}
            max={300}
            value={bpm}
            onChange={e => setBpm(Number(e.target.value))}
            className="w-16 p-1 border rounded"
          />
        </div>
        <button
          onClick={() => setIsMetronomeOn(on => !on)}
          className={`px-3 py-1 rounded ${isMetronomeOn ? 'bg-red-500' : 'bg-green-500'} text-white`}
        >
          {isMetronomeOn ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
    </div>
  )
}