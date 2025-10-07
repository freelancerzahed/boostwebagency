"use client"

import { X, Volume2, VolumeX, Sparkles } from "lucide-react"

interface VideoModalProps {
  isVideoMuted: boolean
  setIsVideoMuted: (muted: boolean) => void
  closeVideoModal: () => void
}

export default function VideoModal({ isVideoMuted, setIsVideoMuted, closeVideoModal }: VideoModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 dark:bg-black/98 backdrop-blur-md">
      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 dark:border-white/5">
        <div className="absolute top-0 left-0 right-0 z-10 p-4 md:p-6 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent">
          <h3 className="text-white font-bold text-base md:text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Success Stories That Inspire
          </h3>
          <div className="flex gap-2 md:gap-3">
            <button
              onClick={() => setIsVideoMuted(!isVideoMuted)}
              className="w-10 h-10 md:w-12 md:h-12 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-white/20 dark:hover:bg-white/10 transition-all border border-white/20 dark:border-white/10 active:scale-95 touch-manipulation"
            >
              {isVideoMuted ? (
                <VolumeX className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </button>
            <button
              onClick={closeVideoModal}
              className="w-10 h-10 md:w-12 md:h-12 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-white/20 dark:hover:bg-white/10 transition-all border border-white/20 dark:border-white/10 active:scale-95 touch-manipulation"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
        <iframe
          src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=${isVideoMuted ? 1 : 0}&rel=0`}
          className="w-full h-full"
          title="Success Stories"
          allow="autoplay; encrypted-media"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  )
}
