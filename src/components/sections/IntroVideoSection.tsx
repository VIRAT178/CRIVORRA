import React from 'react';
import { Play } from 'lucide-react';
import crivorraDigitalsVideo from '../../../Crivorra Digitals.mp4';

export const IntroVideoSection: React.FC = () => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [playbackError, setPlaybackError] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);

  React.useEffect(() => {
    const handleOtherVideoPlay = (event: Event) => {
      const playingVideo = (event as CustomEvent<HTMLVideoElement | null>).detail;
      if (playingVideo !== videoRef.current) {
        videoRef.current?.pause();
      }
    };

    window.addEventListener('crivorra:video-play', handleOtherVideoPlay);
    return () => window.removeEventListener('crivorra:video-play', handleOtherVideoPlay);
  }, []);

  const handlePlayWithSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    setIsMuted(false);
    try {
      await video.play();
      setPlaybackError(false);
    } catch {
      video.muted = true;
      setIsMuted(true);
      setPlaybackError(true);
    }
  };

  return (
    <section
      id="home"
      aria-labelledby="crivorra-video-heading"
      className="relative w-full overflow-hidden bg-black pt-20 text-[#0A0F1D] sm:pt-24"
    >
      <h1 id="crivorra-video-heading" className="sr-only">
        Crivorra Digitals introduction
      </h1>
      <div className="relative w-full bg-black">
        <video
          ref={videoRef}
          className="block aspect-video w-full bg-black object-contain"
          src={crivorraDigitalsVideo}
          controls={isPlaying}
          preload="metadata"
          playsInline
          muted={isMuted}
          aria-label="Crivorra Digitals introduction video"
          onPlay={(event) => {
            setIsPlaying(true);
            window.dispatchEvent(
              new CustomEvent('crivorra:video-play', { detail: event.currentTarget }),
            );
          }}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          Your browser does not support the video tag.
        </video>
        {!isPlaying && (
          <button
            type="button"
            onClick={handlePlayWithSound}
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0066FF] text-white shadow-[0_0_40px_rgba(0,102,255,0.55)] transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-20 sm:w-20"
            aria-label="Play introduction video with sound"
          >
            <Play className="ml-1 h-8 w-8 fill-current sm:h-9 sm:w-9" />
          </button>
        )}
        {playbackError && (
          <p
            className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-black/80 px-4 py-2 text-center text-sm text-white"
            role="alert"
          >
            Could not start video with sound. Please try again.
          </p>
        )}
      </div>
    </section>
  );
};
