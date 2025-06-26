'use client'

import ScalePreview from "@/components/ScalePreview"

const majorScales = [
  "Ionian",
  "Dorian",
  "Phrygian",
  "Lydian",
  "Mixolydian",
  "Aeolian",
  "Locrian",
]

const pentatonicScales = [
  "Ionian Pentatonic",
  "Dorian Pentatonic",
  "Phrygian Pentatonic",
  "Mixolydian Pentatonic",
  "Aeolian Pentatonic",
]

export default function ScaleSelectorPage() {
  return (
    <div className = "p8 sm:p-20">
      <h1 className="text-3xl font-bold text-center mt-20">
        Select a Scale to Practice
      </h1>
      <div className="text-left mt-4">
        <p className="text-lg">
          Major Scale Modes
        </p>
        <p className="text-gray-600 text-md">
          Practice a major scale mode with all 12 possible root notes.
          </p>
        <div className="flex flex-wrap gap-4 items-center mt-10">
          {majorScales.map((scale) => (
            <div
              key={scale}
              className="inline-flex flex-col bg-gray-100 p-4 rounded-lg shadow border border-gray-200"
            >
              <ScalePreview
                scale={scale}
                buttonLabel="Start Practice"
                buttonAction={(selectedScale) => {
                  window.location.href = `/practice/${selectedScale.toLowerCase()}`
                }}
              />
            </div>
          ))}
        </div>
        
      </div>
      <div className="text-left mt-4">
        <p className="text-lg">
          Pentatonic Scale Shapes
        </p>
        <p className="text-gray-600 text-md">
          Practice a pentatnoic scale shape with all 12 possible root notes.
          </p>
        <div className="flex flex-wrap gap-4 items-center mt-10">
          {pentatonicScales.map((scale) => (
            <div
              key={scale}
              className="inline-flex flex-col bg-gray-100 p-4 rounded-lg shadow border border-gray-200"
            >
              <ScalePreview
                scale={scale}
                buttonLabel="Start Practice"
                buttonAction={(selectedScale) => {
                  window.location.href = `/practice/${selectedScale.toLowerCase().replace(' ', '_')}`
                }}
              />
            </div>
          ))}
        </div>
        
      </div>
    </div>
  )
}
