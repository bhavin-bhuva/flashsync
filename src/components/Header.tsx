import React from 'react';
import { EVENT_DETAILS } from '../data/mockData';
import { AppViewMode } from '../types';

interface HeaderProps {
  currentView: AppViewMode;
  onNavigate: (view: AppViewMode) => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  onLaunchKiosk: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  isDarkTheme,
  onToggleTheme,
  onLaunchKiosk,
}) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 h-16 z-40 transition-colors border-b flex items-center justify-between px-4 lg:px-6 backdrop-blur-xl ${
        isDarkTheme
          ? 'bg-slate-950/85 border-slate-800 text-slate-100'
          : 'bg-white/90 border-stone-200 text-slate-800 shadow-xs'
      }`}
    >
      {/* Zone 1: Brand & Current Production */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => onNavigate('ingestion-monitor')}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white shadow-sm group-hover:bg-amber-600 transition-colors shrink-0">
            <span
              className="material-symbols-outlined text-lg leading-none"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-display font-bold text-base tracking-tight text-slate-900 dark:text-white">
                Flash<span className="text-amber-600 dark:text-amber-400">Sync</span>
              </span>
              <span className="font-mono-tech text-[10px] uppercase font-semibold px-1 py-0.2 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                AI
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[140px] sm:max-w-none">
              Studio Hub OS
            </span>
          </div>
        </button>

        <span className="hidden md:inline-block w-px h-5 bg-stone-300 dark:bg-slate-700" />

        {/* Live Event Indicator Pill */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[160px]">
            {EVENT_DETAILS.title}
          </span>
          <span className="text-slate-400">·</span>
          <span className="font-mono-tech text-[11px] text-slate-500 dark:text-slate-400">
            {EVENT_DETAILS.totalCaptures} Captures
          </span>
        </div>
      </div>

      {/* Zone 2: Real-time Telemetry Telemetry Strip */}
      <div className="hidden xl:flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-stone-50 dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 text-xs">
          <span className="material-symbols-outlined text-amber-600 text-sm">photo_camera</span>
          <div className="flex flex-col">
            <span className="font-mono-tech text-[9px] uppercase tracking-wider text-slate-400">Tether Stream</span>
            <span className="font-mono-tech text-[11px] font-semibold text-slate-700 dark:text-slate-200">Sony α1 · 128 MB/s</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-stone-50 dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 text-xs">
          <span className="material-symbols-outlined text-indigo-600 text-sm">neurology</span>
          <div className="flex flex-col">
            <span className="font-mono-tech text-[9px] uppercase tracking-wider text-slate-400">Neural Cluster</span>
            <span className="font-mono-tech text-[11px] font-semibold text-slate-700 dark:text-slate-200">Online (3.4s lat)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-stone-50 dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 text-xs">
          <span className="material-symbols-outlined text-emerald-600 text-sm">groups</span>
          <div className="flex flex-col">
            <span className="font-mono-tech text-[9px] uppercase tracking-wider text-slate-400">Audience</span>
            <span className="font-mono-tech text-[11px] font-semibold text-slate-700 dark:text-slate-200">{EVENT_DETAILS.uniqueAttendees} Guests Live</span>
          </div>
        </div>
      </div>

      {/* Zone 3: Navigation Views & Primary Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Portal View Selector */}
        <div className="flex items-center p-1 rounded-lg bg-stone-100 dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 text-xs">
          <button
            onClick={() => onNavigate('ingestion-monitor')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              currentView === 'ingestion-monitor'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Studio OS
          </button>
          <button
            onClick={() => onNavigate('guest-face-cam')}
            className={`px-2.5 py-1 rounded font-medium transition-colors flex items-center gap-1 ${
              currentView === 'guest-face-cam' || currentView === 'guest-gallery'
                ? 'bg-amber-500 text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-xs">face</span>
            Guest Cam
          </button>
        </div>

        {/* Projection Kiosk Direct Launch */}
        <button
          onClick={onLaunchKiosk}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors border border-stone-200 dark:border-slate-700"
          title="Launch 16:9 Fullscreen Ballroom Kiosk"
        >
          <span className="material-symbols-outlined text-base text-amber-600">fullscreen</span>
          <span>Ballroom Kiosk</span>
        </button>

        {/* Theme Toggle (Light mode is requested default) */}
        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors border border-stone-200/80 dark:border-slate-800"
          title={isDarkTheme ? 'Switch to Clean Light Mode' : 'Switch to Ballroom Obsidian Dark'}
        >
          <span className="material-symbols-outlined text-base">
            {isDarkTheme ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {/* Studio Photographer Profile */}
        <div className="flex items-center gap-2 pl-1">
          <img
            src={EVENT_DETAILS.studioAvatar}
            alt={EVENT_DETAILS.leadPhotographer}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-500/30"
          />
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">
              {EVENT_DETAILS.leadPhotographer}
            </span>
            <span className="font-mono-tech text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-tight">
              Lead Camera
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
