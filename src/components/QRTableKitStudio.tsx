import React, { useState } from 'react';
import { TableKitSettings } from '../types';
import { EVENT_DETAILS, TABLES_LIST } from '../data/mockData';

interface QRTableKitStudioProps {
  isDarkTheme?: boolean;
}

export const QRTableKitStudio: React.FC<QRTableKitStudioProps> = ({ isDarkTheme = false }) => {
  const [settings, setSettings] = useState<TableKitSettings>({
    archetype: 'tent',
    headline: 'Rohan & Priya',
    subtitle: 'The Wedding Celebration of',
    venue: 'The Grand Hyatt Ballroom',
    date: 'October 24, 2025',
    colorProfile: 'obsidian',
    tableNumber: 'T07',
    qrEmblem: 'bolt',
    ctaHeadline: 'Find Your Photos in 1 Second',
    guestGuide: 'Point phone camera at this QR code, snap a selfie, and FlashSync AI will instantly deliver every shot you’re in.',
    autoPartition: true,
    includeScoreLine: true,
    leadGate: true,
  });

  const [previewMode, setPreviewMode] = useState<'single' | 'folded' | 'sheet'>('folded');
  const [selectedTableIndex, setSelectedTableIndex] = useState(6); // Table 07
  const [showFoilShimmer, setShowFoilShimmer] = useState(true);
  const [showGuides, setShowGuides] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const currentTable = TABLES_LIST[selectedTableIndex] || TABLES_LIST[0];

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleNextTable = () => {
    setSelectedTableIndex((prev) => (prev + 1) % TABLES_LIST.length);
  };

  const handlePrevTable = () => {
    setSelectedTableIndex((prev) => (prev - 1 + TABLES_LIST.length) % TABLES_LIST.length);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-slate-900 text-amber-400 font-semibold text-xs shadow-2xl flex items-center gap-2 border border-amber-500/30 animate-bounce">
          <span className="material-symbols-outlined text-base text-emerald-400">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Workspace Control Bar */}
      <div
        className={`px-4 lg:px-8 py-4 border-b flex flex-col xl:flex-row xl:items-center justify-between gap-4 transition-colors ${
          isDarkTheme ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-stone-200'
        }`}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 font-mono-tech text-[11px] text-slate-500 dark:text-slate-400">
            <span>Events</span>
            <span>/</span>
            <span>{EVENT_DETAILS.title}</span>
            <span>/</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">QR & Table Kit Studio</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-display font-bold text-xl lg:text-2xl text-slate-900 dark:text-white">
              Collateral Generator & Print Engine
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-mono-tech text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              READY FOR PRINT · 36 TABLE CODES GENERATED
            </span>
          </div>
        </div>

        {/* View Mode & Export Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Layout Mode Selector */}
          <div className="flex items-center p-1 rounded-xl bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-xs font-medium">
            <button
              onClick={() => setPreviewMode('single')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                previewMode === 'single'
                  ? 'bg-amber-500 text-white font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Single Tent
            </button>
            <button
              onClick={() => setPreviewMode('folded')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                previewMode === 'folded'
                  ? 'bg-amber-500 text-white font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              2-Up Folded
            </button>
            <button
              onClick={() => setPreviewMode('sheet')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                previewMode === 'sheet'
                  ? 'bg-amber-500 text-white font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sheet A3 Impose
            </button>
          </div>

          <button
            onClick={() => showToast('Generated ZIP package with 36 vector SVGs & 300DPI PNGs')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 hover:bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-base">folder_zip</span>
            <span>Bulk SVG/PNG</span>
          </button>

          <button
            onClick={() => showToast('Submitted 36 table tent prints to professional dye-sub lab ($42.50)')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 hover:bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-base text-amber-600">local_shipping</span>
            <span>Send to Lab ($42.50)</span>
          </button>

          <button
            onClick={() => showToast('Compiling 36 imposition pages to CMYK 300 DPI PDF...')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-base">print</span>
            <span>Download PDF (CMYK 300 DPI)</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Studio Workspace */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* LEFT COLUMN: Parametric Customization Panel (~400px) */}
        <div
          className={`w-full lg:w-[410px] shrink-0 p-5 lg:p-6 border-r flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-140px)] transition-colors ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200'
          }`}
        >
          {/* Section 1: Collateral Archetype */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono-tech font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                01. Collateral Archetype
              </span>
              <span className="font-mono-tech text-slate-500 dark:text-slate-400">Die-Cut Presets</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSettings({ ...settings, archetype: 'tent' })}
                className={`p-2.5 rounded-xl border text-left flex flex-col gap-0.5 transition-all ${
                  settings.archetype === 'tent'
                    ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 shadow-xs'
                    : 'border-stone-200 dark:border-slate-800 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                  <span>Table Tent</span>
                  <span className="material-symbols-outlined text-sm text-amber-600">layers</span>
                </div>
                <span className="font-mono-tech text-[11px] text-slate-700 dark:text-slate-300">
                  4.0" × 6.0" Folded
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Dual face · Self-standing</span>
              </button>

              <button
                type="button"
                onClick={() => setSettings({ ...settings, archetype: 'card' })}
                className={`p-2.5 rounded-xl border text-left flex flex-col gap-0.5 transition-all ${
                  settings.archetype === 'card'
                    ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 shadow-xs'
                    : 'border-stone-200 dark:border-slate-800 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                  <span>Place Card</span>
                  <span className="material-symbols-outlined text-sm text-slate-400">crop_landscape</span>
                </div>
                <span className="font-mono-tech text-[11px] text-slate-700 dark:text-slate-300">
                  3.5" × 2.0" Flat
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Individual plate mount</span>
              </button>

              <button
                type="button"
                onClick={() => setSettings({ ...settings, archetype: 'arch' })}
                className={`p-2.5 rounded-xl border text-left flex flex-col gap-0.5 transition-all ${
                  settings.archetype === 'arch'
                    ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 shadow-xs'
                    : 'border-stone-200 dark:border-slate-800 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                  <span>Acrylic Arch</span>
                  <span className="material-symbols-outlined text-sm text-slate-400">rounded_corner</span>
                </div>
                <span className="font-mono-tech text-[11px] text-slate-700 dark:text-slate-300">
                  5.0" × 7.0" Rigid
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">UV Direct Print Base</span>
              </button>

              <button
                type="button"
                onClick={() => setSettings({ ...settings, archetype: 'easel' })}
                className={`p-2.5 rounded-xl border text-left flex flex-col gap-0.5 transition-all ${
                  settings.archetype === 'easel'
                    ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 shadow-xs'
                    : 'border-stone-200 dark:border-slate-800 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                  <span>A2 Easel Sign</span>
                  <span className="material-symbols-outlined text-sm text-slate-400">download</span>
                </div>
                <span className="font-mono-tech text-[11px] text-slate-700 dark:text-slate-300">
                  16.5" × 23.4" Board
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Entrance Pedestal</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-mono-tech">120 × 180 mm Finished</span>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.includeScoreLine}
                  onChange={(e) => setSettings({ ...settings, includeScoreLine: e.target.checked })}
                  className="accent-amber-500 rounded"
                />
                <span>Include score line</span>
              </label>
            </div>
          </div>

          {/* Section 2: Monogram & Typographic Palette */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono-tech font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                02. Monogram & Palette
              </span>
              <span className="material-symbols-outlined text-base text-slate-400">palette</span>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200/80 dark:border-slate-800 flex flex-col gap-3 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Honorees Headline</label>
                <input
                  type="text"
                  value={settings.headline}
                  onChange={(e) => setSettings({ ...settings, headline: e.target.value })}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-display font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Venue & Dateline</label>
                <input
                  type="text"
                  value={`${settings.venue} · ${settings.date}`}
                  onChange={(e) => setSettings({ ...settings, venue: e.target.value })}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-mono-tech text-[11px]"
                />
              </div>

              {/* Color profile buttons */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Color Profile</span>
                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, colorProfile: 'obsidian' })}
                    className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${
                      settings.colorProfile === 'obsidian'
                        ? 'border-amber-500 bg-stone-200 dark:bg-slate-700'
                        : 'border-stone-200 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                    </span>
                    <span className="font-mono-tech text-[10px] text-slate-700 dark:text-slate-200 font-semibold">Obsidian</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, colorProfile: 'ivory' })}
                    className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${
                      settings.colorProfile === 'ivory'
                        ? 'border-amber-500 bg-stone-200 dark:bg-slate-700'
                        : 'border-stone-200 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-amber-700" />
                    </span>
                    <span className="font-mono-tech text-[10px] text-slate-700 dark:text-slate-200 font-semibold">Ivory Foil</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, colorProfile: 'navy' })}
                    className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${
                      settings.colorProfile === 'navy'
                        ? 'border-amber-500 bg-stone-200 dark:bg-slate-700'
                        : 'border-stone-200 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-900 border border-indigo-400 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    </span>
                    <span className="font-mono-tech text-[10px] text-slate-700 dark:text-slate-200 font-semibold">Royal Navy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, colorProfile: 'gold' })}
                    className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${
                      settings.colorProfile === 'gold'
                        ? 'border-amber-500 bg-stone-200 dark:bg-slate-700'
                        : 'border-stone-200 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-white" />
                    </span>
                    <span className="font-mono-tech text-[10px] text-slate-700 dark:text-slate-200 font-semibold">Pure Gold</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Dynamic QR & Routing Hub */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono-tech font-bold uppercase tracking-wider text-amber-600">
                03. Dynamic QR Hub
              </span>
              <span className="font-mono-tech text-amber-600 font-semibold">flashsync.ai/g/rp-25</span>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200/80 dark:border-slate-800 flex flex-col gap-3 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Auto-Partition Tables
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono-tech">
                    Dynamic link: ?table={currentTable.id}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoPartition}
                  onChange={(e) => setSettings({ ...settings, autoPartition: e.target.checked })}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </div>

              {/* QR Center Emblem Picker */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">QR Center Emblem</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, qrEmblem: 'bolt' })}
                    className={`py-1.5 px-2 rounded-lg border text-center font-mono-tech text-xs transition-colors flex items-center justify-center gap-1 ${
                      settings.qrEmblem === 'bolt'
                        ? 'border-amber-500 bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 font-bold'
                        : 'border-stone-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">bolt</span>
                    Bolt
                  </button>

                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, qrEmblem: 'monogram' })}
                    className={`py-1.5 px-2 rounded-lg border text-center font-mono-tech text-xs transition-colors flex items-center justify-center gap-1 ${
                      settings.qrEmblem === 'monogram'
                        ? 'border-amber-500 bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 font-bold'
                        : 'border-stone-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">favorite</span>
                    R & P
                  </button>

                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, qrEmblem: 'camera' })}
                    className={`py-1.5 px-2 rounded-lg border text-center font-mono-tech text-xs transition-colors flex items-center justify-center gap-1 ${
                      settings.qrEmblem === 'camera'
                        ? 'border-amber-500 bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 font-bold'
                        : 'border-stone-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">photo_camera</span>
                    Lens
                  </button>
                </div>
              </div>

              {/* Call-to-action text */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400">CTA Headline</label>
                <input
                  type="text"
                  value={settings.ctaHeadline}
                  onChange={(e) => setSettings({ ...settings, ctaHeadline: e.target.value })}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Step-by-Step Guest Guide</label>
                <textarea
                  rows={2}
                  value={settings.guestGuide}
                  onChange={(e) => setSettings({ ...settings, guestGuide: e.target.value })}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Paper & Lab Specs */}
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200/80 dark:border-slate-800 flex flex-col gap-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Substrate Stock</span>
              <span className="font-mono-tech text-amber-600 dark:text-amber-400 font-semibold">350 GSM Velvet Soft-Touch</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Embellishment</span>
              <span className="font-mono-tech text-amber-600 dark:text-amber-400 font-semibold">Digital Gold Foil (Layer 2)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Bleed & Margins</span>
              <span className="font-mono-tech text-slate-500 dark:text-slate-400">3.175 mm (0.125 in)</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Realistic High-Fidelity Canvas Viewport */}
        <div className="flex-1 flex flex-col bg-stone-100 dark:bg-slate-950 overflow-hidden relative">
          {/* Top Canvas Control Bar */}
          <div
            className={`h-14 px-6 border-b flex items-center justify-between z-20 ${
              isDarkTheme ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-stone-200'
            }`}
          >
            {/* Table Navigation */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-stone-100 dark:bg-slate-800 p-0.5 rounded-lg border border-stone-200 dark:border-slate-700">
                <button
                  onClick={handlePrevTable}
                  className="p-1 hover:text-amber-600 text-slate-500 dark:text-slate-400 transition-colors"
                  title="Previous table"
                >
                  <span className="material-symbols-outlined text-base">chevron_left</span>
                </button>
                <span className="font-mono-tech text-xs font-bold text-slate-800 dark:text-slate-200 px-2">
                  TABLE {currentTable.id.replace('T', '')} / 36
                </span>
                <button
                  onClick={handleNextTable}
                  className="p-1 hover:text-amber-600 text-slate-500 dark:text-slate-400 transition-colors"
                  title="Next table"
                >
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
                {currentTable.label} · {currentTable.guestCount} Guests
              </span>
            </div>

            {/* Overlays & View Options */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowFoilShimmer(!showFoilShimmer)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono-tech transition-colors ${
                  showFoilShimmer
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold'
                    : 'bg-stone-100 text-slate-500 dark:bg-slate-800'
                }`}
              >
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span>Foil 3D Shimmer</span>
              </button>

              <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showGuides}
                  onChange={(e) => setShowGuides(e.target.checked)}
                  className="accent-amber-500 rounded"
                />
                <span>Trim & Fold Marks</span>
              </label>
            </div>
          </div>

          {/* Interactive Printable Artboard Stage */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-10 flex items-center justify-center relative">
            {/* The Print Collateral Card Container */}
            {(() => {
              const isTentDark = settings.colorProfile === 'obsidian' || settings.colorProfile === 'navy';
              return (
                <div
                  className={`relative transition-all duration-300 w-full rounded-2xl shadow-2xl overflow-hidden border ${
                    previewMode === 'single' ? 'max-w-[420px]' : 'max-w-[540px]'
                  } ${
                    settings.colorProfile === 'obsidian'
                      ? 'bg-slate-950 text-white border-slate-800'
                      : settings.colorProfile === 'ivory'
                      ? 'bg-stone-100 text-slate-900 border-amber-300 shadow-xl'
                      : settings.colorProfile === 'navy'
                      ? 'bg-slate-900 text-white border-indigo-900'
                      : 'bg-amber-500 text-slate-950 border-amber-600'
                  }`}
                >
                  {/* Optional Trim Guides Overlay */}
                  {showGuides && (
                    <div className="absolute inset-0 pointer-events-none z-30">
                      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-rose-500/60" />
                      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-rose-500/60" />
                      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-rose-500/60" />
                      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-rose-500/60" />
                    </div>
                  )}

                  {/* REAR TABLE FACING PANEL (Upload Station) */}
                  {previewMode !== 'single' && (
                    <div className={`p-6 border-b border-dashed flex flex-col items-center text-center gap-2 relative ${
                      isTentDark ? 'border-amber-500/40' : 'border-amber-400'
                    }`}>
                      <span className={`font-mono-tech text-[10px] uppercase tracking-widest ${
                        isTentDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        [ Rear Table Facing · Guest Upload Station ]
                      </span>
                      <div className={`flex items-center gap-1.5 font-display font-semibold text-base pt-1 ${
                        isTentDark ? 'text-amber-400' : 'text-amber-900'
                      }`}>
                        <span className="material-symbols-outlined text-lg">add_a_photo</span>
                        <span>Share Your Wedding Snaps</span>
                      </div>
                      <p className={`text-xs max-w-sm ${isTentDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Have candid moments or dancefloor videos? Beam them instantly into tonight’s
                        ballroom live slideshow screens.
                      </p>

                      <div className={`p-2.5 rounded-xl border flex items-center gap-3 mt-1 ${
                        isTentDark
                          ? 'bg-slate-900/80 border-amber-500/30 text-white'
                          : 'bg-white border-amber-300 text-slate-900 shadow-xs'
                      }`}>
                        <div className={`w-12 h-12 rounded p-1 flex items-center justify-center shrink-0 ${
                          isTentDark ? 'bg-white text-slate-950' : 'bg-slate-900 text-white'
                        }`}>
                          <span className="material-symbols-outlined text-2xl">qr_code_2</span>
                        </div>
                        <div className="flex flex-col text-left">
                          <span className={`font-mono-tech text-[10px] uppercase font-bold ${
                            isTentDark ? 'text-amber-400' : 'text-amber-800'
                          }`}>
                            Direct Upload Hub
                          </span>
                          <span className="text-xs font-semibold">No guest account needed</span>
                          <span className={`text-[10px] ${isTentDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            Auto-moderated by Elena Vance AI
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FOLD SCORE NOTCH */}
                  {settings.includeScoreLine && previewMode !== 'single' && (
                    <div className={`flex items-center justify-between px-4 py-1 text-[9px] font-mono-tech select-none ${
                      isTentDark ? 'text-amber-500/70 bg-black/30' : 'text-amber-800/80 bg-amber-200/50'
                    }`}>
                      <span>---- 180° MOUNTED CREASE ----</span>
                      <span>FOLD LINE</span>
                      <span>---- 180° MOUNTED CREASE ----</span>
                    </div>
                  )}

                  {/* FRONT HERO PANEL (Primary Guest View) */}
                  <div className="p-6 lg:p-8 flex flex-col items-center text-center gap-4 relative">
                    {/* Monogram Ribbon */}
                    <div className="w-full flex items-center justify-center gap-3">
                      <div className={`h-px flex-1 ${
                        isTentDark
                          ? 'bg-gradient-to-r from-transparent via-amber-400 to-transparent'
                          : 'bg-gradient-to-r from-transparent via-amber-700 to-transparent'
                      }`} />
                      <div className={`px-3 py-0.5 rounded-full border font-mono-tech text-[10px] font-bold tracking-widest ${
                        isTentDark
                          ? 'bg-amber-500/10 border-amber-400/40 text-amber-400'
                          : 'bg-amber-100 border-amber-400 text-amber-900'
                      }`}>
                        R & P
                      </div>
                      <div className={`h-px flex-1 ${
                        isTentDark
                          ? 'bg-gradient-to-r from-transparent via-amber-400 to-transparent'
                          : 'bg-gradient-to-r from-transparent via-amber-700 to-transparent'
                      }`} />
                    </div>

                    {/* Gala Title */}
                    <div className="flex flex-col items-center">
                      <span className={`font-mono-tech text-[10px] uppercase tracking-[0.2em] font-semibold ${
                        isTentDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {settings.subtitle}
                      </span>
                      <h2 className={`font-display font-extrabold text-2xl lg:text-3xl tracking-tight mt-0.5 ${
                        isTentDark ? 'text-amber-400' : 'text-amber-900'
                      }`}>
                        {settings.headline}
                      </h2>
                      <span className={`font-mono-tech text-xs mt-1 ${
                        isTentDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {settings.venue} · {settings.date}
                      </span>
                    </div>

                    {/* Table Seating Badge */}
                    <div className={`px-4 py-1 rounded-full border shadow-sm flex items-center gap-2 ${
                      isTentDark
                        ? 'bg-slate-900 border-amber-400/50 text-amber-400'
                        : 'bg-white border-amber-400 text-amber-900'
                    }`}>
                      <span className={`font-mono-tech text-[10px] uppercase tracking-widest ${
                        isTentDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        GUEST SEATING
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      <span className="font-mono-tech text-sm font-extrabold">
                        TABLE {currentTable.id.replace('T', '')}
                      </span>
                    </div>

                    {/* LARGE SCANNABLE VECTOR QR CODE CONTAINER */}
                    <div className="p-4 rounded-2xl bg-white text-slate-950 shadow-xl relative group">
                      <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
                        <svg className="w-full h-full text-slate-950" fill="currentColor" viewBox="0 0 160 160">
                          {/* Top-Left Finder */}
                          <rect x="8" y="8" width="40" height="40" rx="6" fill="currentColor" />
                          <rect x="14" y="14" width="28" height="28" rx="4" fill="#ffffff" />
                          <rect x="20" y="20" width="16" height="16" rx="2" fill="currentColor" />

                          {/* Top-Right Finder */}
                          <rect x="112" y="8" width="40" height="40" rx="6" fill="currentColor" />
                          <rect x="118" y="14" width="28" height="28" rx="4" fill="#ffffff" />
                          <rect x="124" y="20" width="16" height="16" rx="2" fill="currentColor" />

                          {/* Bottom-Left Finder */}
                          <rect x="8" y="112" width="40" height="40" rx="6" fill="currentColor" />
                          <rect x="14" y="118" width="28" height="28" rx="4" fill="#ffffff" />
                          <rect x="20" y="124" width="16" height="16" rx="2" fill="currentColor" />

                          {/* Data Pattern Nodes */}
                          <circle cx="60" cy="18" r="4" />
                          <circle cx="72" cy="18" r="4" />
                          <circle cx="84" cy="18" r="4" />
                          <circle cx="96" cy="18" r="4" />
                          <circle cx="60" cy="30" r="4" />
                          <circle cx="84" cy="30" r="4" />
                          <circle cx="96" cy="42" r="4" />
                          <circle cx="18" cy="60" r="4" />
                          <circle cx="30" cy="60" r="4" />
                          <circle cx="42" cy="60" r="4" />
                          <circle cx="60" cy="60" r="4" />
                          <circle cx="102" cy="60" r="4" />
                          <circle cx="120" cy="60" r="4" />
                          <circle cx="138" cy="60" r="4" />
                          <circle cx="18" cy="72" r="4" />
                          <circle cx="42" cy="72" r="4" />
                          <circle cx="114" cy="72" r="4" />
                          <circle cx="132" cy="72" r="4" />
                          <circle cx="18" cy="84" r="4" />
                          <circle cx="30" cy="84" r="4" />
                          <circle cx="42" cy="84" r="4" />
                          <circle cx="60" cy="84" r="4" />
                          <circle cx="102" cy="84" r="4" />
                          <circle cx="126" cy="84" r="4" />
                          <circle cx="144" cy="84" r="4" />
                          <circle cx="18" cy="96" r="4" />
                          <circle cx="30" cy="96" r="4" />
                          <circle cx="120" cy="96" r="4" />
                          <circle cx="138" cy="96" r="4" />
                          <circle cx="60" cy="114" r="4" />
                          <circle cx="72" cy="114" r="4" />
                          <circle cx="84" cy="114" r="4" />
                          <circle cx="102" cy="114" r="4" />
                          <circle cx="120" cy="114" r="4" />
                          <circle cx="138" cy="114" r="4" />
                          <circle cx="60" cy="126" r="4" />
                          <circle cx="84" cy="126" r="4" />
                          <circle cx="96" cy="126" r="4" />
                          <circle cx="114" cy="126" r="4" />
                          <circle cx="132" cy="126" r="4" />
                          <circle cx="60" cy="138" r="4" />
                          <circle cx="72" cy="138" r="4" />
                          <circle cx="96" cy="138" r="4" />
                          <circle cx="108" cy="138" r="4" />
                          <circle cx="126" cy="138" r="4" />
                          <circle cx="144" cy="138" r="4" />
                        </svg>

                        {/* Center Logo Emblem */}
                        <div className="absolute w-10 h-10 rounded-full bg-slate-950 text-amber-400 border-2 border-amber-400 flex items-center justify-center shadow-lg">
                          <span
                            className="material-symbols-outlined text-lg"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            bolt
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Clear Step-by-Step Guest Instructions */}
                    <div className="flex flex-col items-center gap-1 max-w-xs">
                      <span className={`font-display font-bold text-base ${
                        isTentDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {settings.ctaHeadline}
                      </span>
                      <p className={`text-xs ${isTentDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {settings.guestGuide}
                      </p>
                      <div className={`flex items-center gap-1.5 mt-1 font-mono-tech text-[10px] px-2.5 py-0.5 rounded-full border ${
                        isTentDark
                          ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                          : 'text-amber-900 bg-amber-100 border-amber-300'
                      }`}>
                        <span className="material-symbols-outlined text-xs">face</span>
                        <span>ZERO APPS REQUIRED · PRIVATE GALLERY</span>
                      </div>
                    </div>

                    {/* Footer Attribution */}
                    <div className={`w-full pt-2 flex items-center justify-between text-[10px] font-mono-tech border-t ${
                      isTentDark ? 'text-slate-400 border-slate-800' : 'text-slate-600 border-amber-200'
                    }`}>
                      <span>PHOTOGRAPHY: {EVENT_DETAILS.studio.toUpperCase()}</span>
                      <span>FLASHSYNC AI LIVE STREAM</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* BOTTOM TABLE MATRIX QUICK-JUMP STRIP */}
          <div
            className={`h-20 px-6 border-t flex flex-col justify-center gap-1 transition-colors z-20 ${
              isDarkTheme ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-stone-200'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono-tech font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Table Matrix Quick Jump (36 Configured)
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px] font-mono-tech">
                Active Selection: <strong className="text-amber-600 dark:text-amber-400">{currentTable.id} ({currentTable.label})</strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {TABLES_LIST.map((tbl, idx) => (
                <button
                  key={tbl.id}
                  onClick={() => setSelectedTableIndex(idx)}
                  className={`px-3 py-1 rounded-lg font-mono-tech text-xs whitespace-nowrap transition-all ${
                    idx === selectedTableIndex
                      ? 'bg-amber-500 text-white font-bold shadow-xs'
                      : 'bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tbl.id} {tbl.isVip ? '★' : ''}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
