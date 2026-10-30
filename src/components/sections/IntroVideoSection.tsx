import React from 'react';
import crivorraDigitalsVideo from '../../../Crivorra Digitals.mp4';

export const IntroVideoSection: React.FC = () => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

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

  return (
    <section
      id="home"
      aria-labelledby="crivorra-video-heading"
      className="relative overflow-hidden bg-white bg-grid-subtle px-4 pb-10 pt-28 text-[#0A0F1D] sm:px-6 sm:pb-12 sm:pt-32 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(0,102,255,0.18),transparent_58%)]" />

      <div className="relative mx-auto max-w-screen-2xl text-center">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto w-full max-w-[280px] rounded-[2.25rem] border border-slate-600/70 bg-slate-700 p-2 shadow-[0_24px_70px_-28px_rgba(0,102,255,0.4)] sm:max-w-none sm:rounded-3xl sm:p-2">
            <div className="flex h-9 items-center justify-between px-2 sm:h-10 sm:px-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-orange-500 sm:h-3 sm:w-3" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 sm:h-3 sm:w-3" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 sm:h-3 sm:w-3" />
              </div>
              <span className="text-[10px] font-semibold tracking-wide text-slate-300 sm:text-sm">
                CRIVORRA DIGITALS
              </span>
              <span className="w-10 sm:w-14" aria-hidden="true" />
            </div>

            <div className="aspect-[9/16] overflow-hidden rounded-[1.5rem] bg-black sm:aspect-[2.8/1] sm:rounded-2xl">
              <video
                ref={videoRef}
                className="block h-full w-full bg-black object-contain"
                src={crivorraDigitalsVideo}
                controls
                autoPlay
                muted
                preload="metadata"
                playsInline
                aria-label="Crivorra Digitals introduction video"
                onPlay={(event) => {
                  window.dispatchEvent(
                    new CustomEvent('crivorra:video-play', { detail: event.currentTarget }),
                  );
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="mx-auto hidden h-5 w-1/3 rounded-b-xl bg-gradient-to-b from-slate-700 to-slate-800 sm:block sm:h-7" />
          <div className="mx-auto hidden h-2 w-2/3 rounded-full bg-slate-700 sm:block sm:h-3" />
        </div>
      </div>
    </section>
  );
};
