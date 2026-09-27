import React, { useState } from 'react';
import { PhotoCapture, LeadActivity } from '../types';
import { EVENT_DETAILS, INITIAL_PHOTOS, INITIAL_LEADS } from '../data/mockData';

interface IngestionMonitorProps {
  onSelectPhoto: (photo: PhotoCapture) => void;
  onNavigateToQRKit: () => void;
  onLaunchKiosk: () => void;
  isDarkTheme?: boolean;
}

export const IngestionMonitor: React.FC<IngestionMonitorProps> = ({
  onSelectPhoto,
  onNavigateToQRKit,
  onLaunchKiosk,
  isDarkTheme = false,
}) => {
  const [photos, setPhotos] = useState<PhotoCapture[]>(INITIAL_PHOTOS);
  const [leads, setLeads] = useState<LeadActivity[]>(INITIAL_LEADS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'queue' | 'matched' | 'review'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'stream'>('grid');
  const [leadGateActive, setLeadGateActive] = useState(true);
  const [watermarkStyle, setWatermarkStyle] = useState('Subtle Gold');
  const [isIngestingPaused, setIsIngestingPaused] = useState(false);
  const [autoPushVips, setAutoPushVips] = useState(true);
  const [printKioskSync, setPrintKioskSync] = useState(true);
  const [activeLut, setActiveLut] = useState('FineArt Gold v4.2');

  const filteredPhotos = photos.filter((p) => {
    if (activeFilter === 'queue') return p.status === 'processing';
    if (activeFilter === 'matched') return p.status === 'matched';
    if (activeFilter === 'review') return p.status === 'review';
    return true;
  });

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 max-w-7xl mx-auto w-full">
      {/* 1. Event Header & Global Control Deck */}
      <section
        className={`p-5 lg:p-6 rounded-2xl border transition-colors flex flex-col xl:flex-row xl:items-center justify-between gap-6 shadow-xs ${
          isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
        }`}
      >
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-mono-tech text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Event In Progress
            </span>
            <span className="font-mono-tech text-xs text-slate-400">
              Session UID: #{EVENT_DETAILS.id}
            </span>
          </div>

          <h1 className="font-display font-bold text-2xl lg:text-3xl text-slate-900 dark:text-white tracking-tight">
            {EVENT_DETAILS.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="material-symbols-outlined text-sm text-amber-600">calendar_today</span>
            <span>{EVENT_DETAILS.date}</span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="material-symbols-outlined text-sm text-amber-600">location_on</span>
            <span>{EVENT_DETAILS.venue}</span>
          </div>
        </div>

        {/* Global Controls & Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Micro Toggles Box */}
          <div
            className={`flex items-center gap-4 px-3.5 py-2 rounded-xl border text-xs ${
              isDarkTheme ? 'bg-slate-800/80 border-slate-700' : 'bg-stone-50 border-stone-200'
            }`}
          >
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Lead Gate:</span>
              <button
                type="button"
                onClick={() => setLeadGateActive(!leadGateActive)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  leadGateActive ? 'bg-amber-500' : 'bg-stone-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    leadGateActive ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="font-mono-tech text-[10px] font-bold uppercase text-amber-600">
                {leadGateActive ? 'Active' : 'Off'}
              </span>
            </label>

            <span className="w-px h-4 bg-stone-300 dark:bg-slate-700" />

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Watermark:</span>
              <select
                value={watermarkStyle}
                onChange={(e) => setWatermarkStyle(e.target.value)}
                className="bg-transparent font-mono-tech text-xs text-amber-700 dark:text-amber-400 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="Subtle Gold" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">Subtle Gold</option>
                <option value="Minimal Scrim" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">Minimal Scrim</option>
                <option value="Disabled (VIP)" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">Disabled (VIP)</option>
              </select>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToQRKit}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-2xs transition-all"
            >
              <span className="material-symbols-outlined text-base text-amber-600">download</span>
              <span>Table QR Kit</span>
            </button>

            <button
              onClick={onLaunchKiosk}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-xs transition-all"
            >
              <span
                className="material-symbols-outlined text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
              <span>Launch Kiosk</span>
            </button>

            <button
              onClick={() => setIsIngestingPaused(!isIngestingPaused)}
              className={`p-2 rounded-xl border transition-colors ${
                isIngestingPaused
                  ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950 dark:border-rose-900'
                  : 'bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-stone-200 dark:border-slate-700'
              }`}
              title={isIngestingPaused ? 'Resume ingestion pipeline' : 'Pause ingestion pipeline'}
            >
              <span className="material-symbols-outlined text-lg">
                {isIngestingPaused ? 'play_circle' : 'pause_circle'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Real-Time Telemetry & Metric KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Ingested */}
        <div
          className={`p-5 rounded-2xl border transition-all flex flex-col justify-between shadow-xs ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 font-mono-tech">
              Photos Ingested
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">add_a_photo</span>
            </div>
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
                {EVENT_DETAILS.totalCaptures}
              </span>
              <span className="font-mono-tech text-[10px] font-semibold text-amber-700 bg-amber-50 dark:bg-amber-950 dark:text-amber-300 px-1.5 py-0.5 rounded">
                +48 in 2m
              </span>
            </div>
            <div className="font-mono-tech text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Sony A1 (RAW+JPG · 84 MB/s)
            </div>
          </div>
          <div className="w-full bg-stone-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full w-[78%] rounded-full" />
          </div>
        </div>

        {/* KPI 2: AI Faces Processed */}
        <div
          className={`p-5 rounded-2xl border transition-all flex flex-col justify-between shadow-xs ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-400 font-mono-tech">
              AI Faces Processed
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">face_retouching_natural</span>
            </div>
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
                {EVENT_DETAILS.facesProcessed}
              </span>
              <span className="font-mono-tech text-[10px] font-semibold text-indigo-700 bg-indigo-50 dark:bg-indigo-950 dark:text-indigo-300 px-1.5 py-0.5 rounded">
                98.4% conf
              </span>
            </div>
            <div className="font-mono-tech text-xs text-slate-500 dark:text-slate-400 mt-1">
              {EVENT_DETAILS.uniqueAttendees} unique attendee profiles matched
            </div>
          </div>
          <div className="w-full bg-stone-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-[94%] rounded-full" />
          </div>
        </div>

        {/* KPI 3: Guest Engagement */}
        <div
          className={`p-5 rounded-2xl border transition-all flex flex-col justify-between shadow-xs ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-400 font-mono-tech">
              Guest Engagement
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">sentiment_very_satisfied</span>
            </div>
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
                {EVENT_DETAILS.guestEngagementPct}%
              </span>
              <span className="font-mono-tech text-[10px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.5 rounded">
                {EVENT_DETAILS.selfiesCount} Selfies
              </span>
            </div>
            <div className="font-mono-tech text-xs text-slate-500 dark:text-slate-400 mt-1">
              1,418 instant photo drops delivered
            </div>
          </div>
          <div className="w-full bg-stone-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[84%] rounded-full" />
          </div>
        </div>

        {/* KPI 4: Leads & Instant Sales */}
        <div
          className={`p-5 rounded-2xl border transition-all flex flex-col justify-between shadow-xs ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-400 font-mono-tech">
              Leads & Instant Sales
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">point_of_sale</span>
            </div>
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl text-amber-600 tracking-tight">
                ${EVENT_DETAILS.leadsRevenue}
              </span>
              <span className="font-mono-tech text-[10px] font-semibold text-slate-700 bg-stone-100 dark:bg-slate-800 dark:text-slate-300 px-1.5 py-0.5 rounded">
                {EVENT_DETAILS.emailsCaptured} Emails
              </span>
            </div>
            <div className="font-mono-tech text-xs text-slate-500 dark:text-slate-400 mt-1">
              {EVENT_DETAILS.igHandlesCaptured} IG Handles · {EVENT_DETAILS.printBuys} Print buys
            </div>
          </div>
          <div className="w-full bg-stone-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full w-[65%] rounded-full" />
          </div>
        </div>
      </section>

      {/* 3. Main Operational Split (8 Columns Media Stream / 4 Columns Hardware & Live Leads) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Media Stream Deck (Col 8) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Filtering Bar & Ingestion Batch Gauge */}
          <div
            className={`p-4 rounded-2xl border transition-colors flex flex-col gap-3 shadow-xs ${
              isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeFilter === 'all'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  All Ingested (1,842)
                </button>
                <button
                  onClick={() => setActiveFilter('queue')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    activeFilter === 'queue'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span>Processing Queue</span>
                  <span className="font-mono-tech text-[10px] px-1.5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                    8
                  </span>
                </button>
                <button
                  onClick={() => setActiveFilter('matched')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeFilter === 'matched'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Matched & Delivered (1,620)
                </button>
                <button
                  onClick={() => setActiveFilter('review')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    activeFilter === 'review'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span>Needs Review</span>
                  <span className="font-mono-tech text-[10px] px-1.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                    14
                  </span>
                </button>
              </div>

              {/* View switch */}
              <div className="flex items-center gap-1 bg-stone-100 dark:bg-slate-800 p-0.5 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1 rounded ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-slate-700 text-amber-600 shadow-xs'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                  title="Grid view"
                >
                  <span className="material-symbols-outlined text-base">grid_view</span>
                </button>
                <button
                  onClick={() => setViewMode('stream')}
                  className={`p-1 rounded ${
                    viewMode === 'stream'
                      ? 'bg-white dark:bg-slate-700 text-amber-600 shadow-xs'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                  title="Stream view"
                >
                  <span className="material-symbols-outlined text-base">view_stream</span>
                </button>
              </div>
            </div>

            {/* Live Ingestion Batch Gauge */}
            <div className="p-3 rounded-xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200/80 dark:border-slate-800 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-600 text-sm animate-spin">
                    sync
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    Ingesting Batch #42 (DSC09812 – DSC09828) · Neural Face Embedding
                  </span>
                </div>
                <span className="font-mono-tech font-semibold text-amber-700 dark:text-amber-400">
                  92% · ~1.2s remaining
                </span>
              </div>
              <div className="w-full bg-stone-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[92%] rounded-full transition-all" />
              </div>
            </div>
          </div>

          {/* Photo Cards Grid with AI Bounding Box Overlays */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
                className={`flex flex-col rounded-2xl overflow-hidden border cursor-pointer group transition-all hover:border-amber-400 hover:shadow-md ${
                  isDarkTheme
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-stone-200/90 shadow-2xs'
                }`}
              >
                {/* Media Container with Overlays */}
                <div className="relative w-full aspect-[4/3] bg-slate-950 overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.filename}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Bounding Boxes */}
                  {photo.faces && (
                    <div className="absolute inset-0 pointer-events-none">
                      {photo.faces.map((f) => (
                        <div
                          key={f.id}
                          style={{
                            left: `${f.box.x}%`,
                            top: `${f.box.y}%`,
                            width: `${f.box.width}%`,
                            height: `${f.box.height}%`,
                          }}
                          className={`absolute rounded border-2 ${
                            f.isVip || f.isUser
                              ? 'border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                              : 'border-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.4)]'
                          }`}
                        >
                          <div className="bg-slate-900/90 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-mono-tech text-white -translate-y-5 inline-flex items-center gap-1 shadow">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                            <span>{f.name}</span>
                            <span className="opacity-80">({f.confidence}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Top Floating Badges */}
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md font-mono-tech text-[10px] text-white">
                      {photo.filename}
                    </span>
                    {photo.faces.some((f) => f.isVip) && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white font-mono-tech text-[10px] font-bold">
                        VIP MATCH
                      </span>
                    )}
                  </div>

                  {/* Bottom Notification Scrim */}
                  <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-slate-950/80 backdrop-blur-md flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-amber-400 text-sm">
                        send_and_archive
                      </span>
                      <span className="font-medium truncate">
                        {photo.tableNumber === 'T01'
                          ? 'Pushed to 2 VIP Portals'
                          : photo.tableNumber === 'T04'
                          ? 'Instant SMS Sent · Table 4'
                          : photo.tableNumber === 'T07'
                          ? 'Table 7 Gallery Updated'
                          : 'Delivered to Guests'}
                      </span>
                    </div>
                    <span className="font-mono-tech text-[10px] text-slate-300">
                      {photo.relativeTime}
                    </span>
                  </div>
                </div>

                {/* EXIF Metadata Footer */}
                <div className="p-3 flex items-center justify-between font-mono-tech text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span>{photo.lens}</span>
                    <span>·</span>
                    <span>{photo.shutter}</span>
                    <span>·</span>
                    <span>{photo.iso}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-semibold">
                    <span>{photo.fileSize}</span>
                    <span className="text-amber-600 dark:text-amber-400 text-[10px]">Sony α1</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Deck for Auto Color Grading */}
          <div
            className={`p-4 rounded-2xl border transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs ${
              isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-600 text-lg">auto_fix_high</span>
              <span className="text-xs text-slate-700 dark:text-slate-300">
                Auto-color grading LUT active:{' '}
                <strong className="text-slate-900 dark:text-white">{activeLut}</strong>
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <button
                onClick={() => {
                  const luts = ['FineArt Gold v4.2', 'Editorial B&W', 'Champagne Glow', 'Natural Velvet'];
                  const nextLut = luts[(luts.indexOf(activeLut) + 1) % luts.length];
                  setActiveLut(nextLut);
                }}
                className="font-medium text-amber-700 dark:text-amber-400 hover:underline"
              >
                Switch LUT Preset
              </button>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <button
                onClick={() => alert('Batch reprocess triggered for 1,842 captures.')}
                className="font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                Batch Reprocess
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Hardware Hub & Live Lead Stream (Col 4) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Hardware Ingest Hub */}
          <div
            className={`p-5 rounded-2xl border transition-colors flex flex-col gap-4 shadow-xs ${
              isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-600 text-lg">memory</span>
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
                  Hardware Ingest Hub
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded font-mono-tech text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                Optimal
              </span>
            </div>

            {/* Camera Diagnostics */}
            <div className="p-3 rounded-xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200/80 dark:border-slate-800 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Sony Alpha 1 (Cam 01)
                </span>
                <span className="font-mono-tech text-[10px] text-amber-600 font-semibold">
                  v2.01 Firmware
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-stone-200/60 dark:border-slate-600 flex flex-col">
                  <span className="text-[10px] uppercase text-slate-400 font-mono-tech">Battery</span>
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">
                    82% (FZ100)
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-stone-200/60 dark:border-slate-600 flex flex-col">
                  <span className="text-[10px] uppercase text-slate-400 font-mono-tech">Card A</span>
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">
                    48GB / 256GB
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-stone-200/60 dark:border-slate-600 flex flex-col">
                  <span className="text-[10px] uppercase text-slate-400 font-mono-tech">Signal</span>
                  <span className="text-xs font-semibold text-amber-600">-42 dBm (5G)</span>
                </div>
              </div>
            </div>

            {/* Processing Cluster Diagnostics */}
            <div className="flex flex-col gap-2 font-mono-tech text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-indigo-600">computer</span>
                  Local Bridge:
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  MacBook Pro M3 Max · 10GbE
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-amber-600">cloud_sync</span>
                  Neural GPU:
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  AWS 4x A100 (TensorRT)
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-emerald-600">speed</span>
                  Shutter → Guest Phone:
                </span>
                <span className="font-bold text-amber-600">3.4s avg latency</span>
              </div>
            </div>
          </div>

          {/* Real-Time Lead Stream */}
          <div
            className={`p-5 rounded-2xl border transition-colors flex flex-col gap-3 shadow-xs ${
              isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
            }`}
          >
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-600 text-lg">stream</span>
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
                  Real-Time Lead Stream
                </h3>
              </div>
              <span className="font-mono-tech text-[10px] text-emerald-600 uppercase font-bold">
                Live Stream
              </span>
            </div>

            <div className="flex flex-col gap-2 max-h-[360px] overflow-y-auto no-scrollbar">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-2.5 rounded-xl bg-stone-50 dark:bg-slate-800/70 border border-stone-200/60 dark:border-slate-800 flex items-start gap-2.5 text-xs"
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      lead.type === 'purchase'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : lead.type === 'selfie_unlock'
                        ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                        : lead.type === 'crowdsource'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                        : 'bg-stone-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {lead.type === 'purchase'
                        ? 'payments'
                        : lead.type === 'selfie_unlock'
                        ? 'face'
                        : lead.type === 'crowdsource'
                        ? 'photo_library'
                        : 'qr_code'}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900 dark:text-white truncate">
                        {lead.title}
                      </span>
                      <span className="font-mono-tech text-[10px] text-slate-400 dark:text-slate-400">
                        {lead.relativeTime}
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] truncate mt-0.5">{lead.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Automation Parameters */}
          <div
            className={`p-5 rounded-2xl border transition-colors flex flex-col gap-3 shadow-xs ${
              isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
            }`}
          >
            <h4 className="font-semibold text-xs text-slate-900 dark:text-white uppercase tracking-wider font-mono-tech">
              Delivery Automation Parameters
            </h4>

            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 dark:bg-slate-800/70 border border-stone-200/60 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Watermark Placement</span>
                <select className="bg-transparent font-mono-tech text-xs text-amber-700 dark:text-amber-400 font-semibold focus:outline-none cursor-pointer">
                  <option className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">Diagonal Subtle Amber</option>
                  <option className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">Lower Right Minimal</option>
                  <option className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">Center Monogram</option>
                  <option className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">Disabled (VIP Only)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 dark:bg-slate-800/70 border border-stone-200/60 dark:border-slate-800">
                <div className="flex flex-col">
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    Auto-Push to Matched VIPs
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    Deliver instant push when 98%+ match
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={autoPushVips}
                  onChange={(e) => setAutoPushVips(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 dark:bg-slate-800/70 border border-stone-200/60 dark:border-slate-800">
                <div className="flex flex-col">
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    Instant Print Lab Kiosk Sync
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    Push 5-star flagged shots to Dye-Sub Queue
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={printKioskSync}
                  onChange={(e) => setPrintKioskSync(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
