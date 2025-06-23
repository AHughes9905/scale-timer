
interface ScalePreviewProps {
  scale: string
  buttonLabel: string
  buttonAction: (scale: string) => void
}

function ScalePreview({buttonAction, buttonLabel, scale}: ScalePreviewProps) {
  return (
    <div className="scale-preview">
      <h2 className="text-lg font-semibold mb-2">{scale}</h2>
      <button
        onClick={() => buttonAction(scale)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {buttonLabel}
      </button>
    </div>
  )
}