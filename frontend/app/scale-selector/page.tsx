const majorScales = [
  "Ionian",
  "Dorian",
  "Phrygian",
  "Lydian",
  "Mixolydian",
  "Aeolian",
  "Locrian",
]

export default function ScaleSelectorPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-20">
        Select a Scale to Practice
      </h1>
      <div className="flex flex-col items-center mt-10">
        {majorScales.map((scale) => (
          <ScalePreview
            key={scale}
            scale={scale}
            buttonLabel="Start Practice"
            buttonAction={(selectedScale) => {
              window.location.href = `/practice/${selectedScale.toLowerCase()}`
            }}
          />
        ))}
      </div>
    </div>
  )
}
