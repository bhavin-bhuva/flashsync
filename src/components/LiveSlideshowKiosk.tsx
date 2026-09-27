import React, { useState, useEffect } from 'react';
import { EVENT_DETAILS, INITIAL_PHOTOS } from '../data/mockData';

interface LiveSlideshowKioskProps {
  onExit: () => void;
  isDarkTheme?: boolean;
}

export const LiveSlideshowKiosk: React.FC<LiveSlideshowKioskProps> = ({ onExit }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cycleProgress, setCycleProgress] = useState(0);

  const kioskSlides = [
    {
      leftImg:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAU_MADHT9ijyz8CpU6lmRzsiypUb6wAxKv8qqHK7cZE4EnthyQ9l5BpuqLZ8dwV6qWdoobWRzusfjA9EFus-YCSVrsKQSztGnX7W8kCJJC53bEtXjFKJkoCxmmhFuly8_uHMfMyz-m6dHIUGsFKPNQvq2kDbt3VQeygrpD421VrKCB2OTVzSJUtICw9x0u2vf59kh-xzAL02NUjQ0EPdrhWUqCQAXccTVq5yQQTvK75pRMHu0DNFE0Og',
      leftTitle: 'The Grand Vows & First Glimpse',
      leftSub: 'Elena Vance Signature Gallery · 50mm · ƒ/1.2 · 1/250s · ISO 640',
      leftMatch: 'AI ID: Rohan (Groom) + Priya (Bride) · Matched in 42 guest galleries',
      rightImg:
        'https://lh3.googleusercontent.com/aida/AEtjO1Xy-3mecThHznFX8z-PGKL70x9TfdGh8K3JjGcrB2TwCpHo0qAGO2yrtZbnzfhZEkp14Gn3zlySTLhKiGFTW_gkNX1ZSGLVj-C0JhJS72W9IjJaZnslLTZUqRn3otXlEPQAtWLQpBU3Adqr2mpKXCtYdLdO0Sd0jBWC-6NNg-cAQNJ8f2_pBjMnlg3rcqUSKjUulj5SGNBjaVqXTPrRJiXmPpc9vScGmjTPUHM_NRnsfF0wLemZlItdbKX3',
      rightTitle: 'Toast to the New Chapter',
      rightSub: 'Crowd Pulse · Table 4 Candids · Uploaded via FlashSync QR Portal',
    },
    {
      leftImg:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBvqHx7FKieEGF6QIFXeQs1hTVhAMF3jhP-bpt8duBVutqrcSOnTdfi7ecgqulQ1QbOyIrsOijyDwvApFsjydqfnHZDGhGp0udabqQ94NjIiZ8jk3oPrP2r3E_7ra7Ifd5HKRXEBtknwe5dgVutbywHIDmJHgPCZwcf95TEOJ5n53SdECnjqDkvu-cEOInSts24bLotPKHhhMe6DL13L07i68R1x14Cawgcj52G-iEYVsXLUhS2qtpWBA',
      leftTitle: 'Golden Hour Ballroom Laughs',
      leftSub: 'Elena Vance Signature Gallery · 85mm · ƒ/1.4 · 1/800s · ISO 320',
      leftMatch: 'AI ID: Priya Sharma (99.8%) + Rohan Kapoor (99.6%)',
      rightImg:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDbSpwlbT1RsfTpVhjGS9OOACZNtmjmeySyPqKluTQ53WYCt969_0Aq_vwLvIcpmSofRzb18YjgX4Ozq3UWR93WsIbVnpDgNt27pnWjT1nHMk0SzQda07bOwI3atSbQe_fAto7zjbAH_TnihBpDh-rArB-SSRVL3RCOVrUZjQzZvxcayQ-mrOnSDtQYD9sPrqeZpcIuRDrF_E0ku-Y6sUF1pbKdViMpCVIzEgKh1RPX1lIoN8lkqn_mSA',
      rightTitle: 'First Dance Ovation',
      rightSub: 'Grand Ballroom Main Floor · 28m ago',
    },
  ];

  const currentSlide = kioskSlides[currentIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCycleProgress((prev) => {
          if (prev >= 100) {
            setCurrentIndex((curr) => (curr + 1) % kioskSlides.length);
            return 0;
          }
          return prev + 2;
        });
      }, 140);
    }
    return () => clearInterval(timer);
  }, [isPlaying, kioskSlides.length]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Top Presentation HUD */}
      <header className="h-20 px-6 lg:px-12 flex items-center justify-between bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent z-30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="font-mono-tech text-[10px] uppercase font-bold text-amber-400">
              Live Tether Stream
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-200">
              Sony α1 · Studio A ({EVENT_DETAILS.leadPhotographer})
            </span>
            <span className="font-mono-tech text-[11px] text-amber-400">
              {EVENT_DETAILS.totalCaptures} Captures Synced · 0 Dropped
            </span>
          </div>
        </div>

        {/* Regal Monogram */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400 text-sm">auto_awesome</span>
            <span className="font-display font-bold text-base lg:text-lg tracking-[0.2em] text-amber-400 uppercase">
              ROHAN & PRIYA
            </span>
            <span className="material-symbols-outlined text-amber-400 text-sm">auto_awesome</span>
          </div>
          <span className="font-mono-tech text-[10px] tracking-widest text-slate-400 uppercase">
            {EVENT_DETAILS.venue} · {EVENT_DETAILS.date}
          </span>
        </div>

        {/* Kiosk Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 font-mono-tech text-xs text-slate-300">
            <span className="material-symbols-outlined text-sm text-amber-400">timelapse</span>
            <span>Auto-Cycle: 7s</span>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white"
            title={isPlaying ? 'Pause slideshow' : 'Resume slideshow'}
          >
            <span className="material-symbols-outlined text-lg">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button
            onClick={() => {
              setCurrentIndex((curr) => (curr + 1) % kioskSlides.length);
              setCycleProgress(0);
            }}
            className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white"
            title="Next slide"
          >
            <span className="material-symbols-outlined text-lg">skip_next</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white"
            title="Toggle fullscreen"
          >
            <span className="material-symbols-outlined text-lg">fullscreen</span>
          </button>

          <button
            onClick={onExit}
            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs transition-colors ml-2"
          >
            Exit Kiosk
          </button>
        </div>
      </header>

      {/* Cinematic Dual-Frame Stage */}
      <main className="flex-1 px-6 lg:px-12 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 bg-slate-900 min-h-[500px] xl:min-h-[580px]">
          {/* Left Feature Frame (7 Columns) */}
          <div className="relative lg:col-span-7 overflow-hidden group">
            <img
              src={currentSlide.leftImg}
              alt={currentSlide.leftTitle}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md font-mono-tech text-[10px] text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1.5 shadow">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                Live Tether · Master Edit
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>{currentSlide.leftSub}</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-white tracking-tight">
                {currentSlide.leftTitle}
              </h2>
              <span className="font-mono-tech text-xs text-slate-300 mt-1">
                {currentSlide.leftMatch}
              </span>
            </div>
          </div>

          {/* Right Companion Frame (5 Columns) */}
          <div className="relative lg:col-span-5 overflow-hidden bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800">
            <img
              src={currentSlide.rightImg}
              alt={currentSlide.rightTitle}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md font-mono-tech text-[10px] text-indigo-400 font-bold uppercase tracking-widest flex items-center gap-1.5 shadow">
                <span className="material-symbols-outlined text-xs">celebration</span>
                Crowd Pulse · Candids
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1">
              <span className="font-mono-tech text-[10px] text-indigo-400 uppercase font-bold">
                Guest Cam Approved
              </span>
              <h3 className="font-display font-bold text-xl text-white">
                {currentSlide.rightTitle}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-1">{currentSlide.rightSub}</p>
            </div>
          </div>
        </div>

        {/* Slideshow Progress Bar */}
        <div className="w-full h-1 bg-slate-800 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-amber-400 transition-all duration-150"
            style={{ width: `${cycleProgress}%` }}
          />
        </div>
      </main>

      {/* Lower Deck: Ingestion Ticker & Embedded QR Discovery Portal */}
      <footer className="px-6 lg:px-12 pb-6 pt-2 flex flex-col lg:flex-row items-center justify-between gap-4 z-30">
        {/* Ticker & Queue */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-base">sensors</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono-tech text-[10px] uppercase font-bold text-amber-400">
                Tether Ingested 38s Ago
              </span>
              <span className="text-slate-500">·</span>
              <span className="font-mono-tech text-xs text-slate-400">Sony A7R V Stream</span>
            </div>
            <span className="text-xs font-medium text-slate-200">
              Sangeet Dance Sequence · 99.8% AI Face Match
            </span>
          </div>
        </div>

        {/* High-Contrast QR Code Card for Distance Scanning */}
        <div className="p-3 rounded-2xl bg-slate-900 border border-amber-500/40 shadow-xl flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-lg p-1.5 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-slate-950 text-4xl">qr_code_2</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono-tech text-[10px] uppercase font-bold text-amber-400">
              Instant Personal Gallery
            </span>
            <span className="font-bold text-sm text-white">Point Phone to Find Your Photos</span>
            <span className="text-[11px] text-slate-400">
              No app required · {EVENT_DETAILS.uniqueAttendees} Guests Connected
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
