export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-eco-dark">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-eco-green/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-eco-green animate-spin" />
        </div>
        <p className="text-eco-muted-light text-sm">Loading EcoTwin AI...</p>
      </div>
    </div>
  )
}
