import React, { useState } from 'react';
import { PhotoCapture } from '../types';
import { EVENT_DETAILS, INITIAL_PHOTOS } from '../data/mockData';

interface GuestGalleryProps {
  onSelectPhoto: (photo: PhotoCapture) => void;
  onRescan: () => void;
  isDarkTheme?: boolean;
}

export const GuestGallery: React.FC<GuestGalleryProps> = ({
  onSelectPhoto,
  onRescan,
  isDarkTheme = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'solo' | 'couple' | 'group'>('all');
  const [guestEmail, setGuestEmail] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'my-photos' | 'full-event' | 'guest-cam' | 'saved'>('my-photos');

  // Filter matched photos for guest
  const guestPhotos = INITIAL_PHOTOS.filter((p) => {
    if (activeCategory === 'solo') return p.category === 'solo';
    if (activeCategory === 'couple') return p.category === 'couple';
    if (activeCategory === 'group') return p.category === 'group' || p.category === 'toast';
    return true;
  });

  const handleUnlockHD = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestEmail || !guestEmail.includes('@')) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsUnlocked(true);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen pb-24 pt-3 px-3 sm:px-6">
      <div className="w-full max-w-[430px] flex flex-col gap-4">
        {/* 1. Header with Biometric Identity & Matched Stats */}
        <div
          className={`p-4 rounded-2xl border transition-colors shadow-xs ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
          }`}
        >
          <div className="flex items-center gap-3.5">
            {/* Guest Selfie Reference Scan Avatar */}
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 to-amber-600 shadow-sm">
                <img
                  src={EVENT_DETAILS.guestAvatar}
                  alt={EVENT_DETAILS.guestName}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-white dark:bg-slate-950 text-amber-600 border border-stone-200 dark:border-slate-800 flex items-center gap-0.5 shadow-xs">
                <span
                  className="material-symbols-outlined text-[10px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <span className="font-mono-tech text-[9px] font-bold">99.8%</span>
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  Found 14 Photos
                </h2>
                <span className="font-mono-tech text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  AI Synced
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Matched across {EVENT_DETAILS.totalCaptures} captures by{' '}
                <strong className="text-slate-800 dark:text-slate-200 font-semibold">
                  {EVENT_DETAILS.studio}
                </strong>
              </p>
            </div>
          </div>

          {/* Live Sync Ingestion Ticker */}
          <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <p className="font-mono-tech text-[10px] text-slate-500 dark:text-slate-400 truncate">
                8 new shots ingested 2m ago — analyzing stream...
              </p>
            </div>
            <span className="font-mono-tech text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide shrink-0">
              LIVE TETHER
            </span>
          </div>
        </div>

        {/* 2. Filter Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCategory === 'all'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <span>All Matches</span>
            <span
              className={`text-[10px] px-1.5 rounded-full ${
                activeCategory === 'all' ? 'bg-white/20' : 'bg-stone-200 dark:bg-slate-700'
              }`}
            >
              14
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('solo')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCategory === 'solo'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <span>Solo</span>
            <span
              className={`text-[10px] px-1.5 rounded-full ${
                activeCategory === 'solo' ? 'bg-white/20' : 'bg-stone-200 dark:bg-slate-700'
              }`}
            >
              4
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('couple')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCategory === 'couple'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <span>With Couple</span>
            <span
              className={`text-[10px] px-1.5 rounded-full ${
                activeCategory === 'couple' ? 'bg-white/20' : 'bg-stone-200 dark:bg-slate-700'
              }`}
            >
              3
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('group')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCategory === 'group'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <span>Group & Friends</span>
            <span
              className={`text-[10px] px-1.5 rounded-full ${
                activeCategory === 'group' ? 'bg-white/20' : 'bg-stone-200 dark:bg-slate-700'
              }`}
            >
              7
            </span>
          </button>
        </div>

        {/* 3. Masonry / Grid Gallery */}
        <div className="grid grid-cols-2 gap-3">
          {guestPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => onSelectPhoto(photo)}
              className="flex flex-col gap-1 cursor-pointer group"
            >
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 shadow-sm border border-stone-200/60 dark:border-slate-800">
                <img
                  src={photo.url}
                  alt={photo.filename}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-xs text-amber-400 font-mono-tech text-[10px] font-bold flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                    {photo.category === 'couple'
                      ? 'VIP Match · 99.1%'
                      : photo.tableNumber === 'T07'
                      ? '99.8% Table 7'
                      : '99.4% Match'}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('Saved to favorites');
                    }}
                    className="w-6 h-6 rounded-full bg-slate-950/70 text-white flex items-center justify-center hover:text-amber-400"
                  >
                    <span className="material-symbols-outlined text-xs">favorite</span>
                  </button>
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-0.5 text-white">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[11px] truncate">
                      {photo.category === 'couple'
                        ? 'With Rohan & Priya'
                        : photo.tableNumber === 'T07'
                        ? 'Dinner Toast Candid'
                        : 'You + 3 others'}
                    </span>
                    <span className="font-mono-tech text-[9px] text-amber-300 uppercase">
                      {photo.tableNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[10px] text-slate-300">
                    <span>{photo.relativeTime}</span>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">share</span>
                      <span className="material-symbols-outlined text-xs">download</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-1 text-[10px] text-slate-500 dark:text-slate-400 font-mono-tech">
                <span>{photo.filename}</span>
                <span className="text-amber-600 dark:text-amber-400 font-semibold">{EVENT_DETAILS.studio}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Instant High-Res Gallery Unlock Lead Gate */}
        <div
          className={`p-4 rounded-2xl border transition-colors shadow-xs relative overflow-hidden flex flex-col gap-3 ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">workspace_premium</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm text-slate-900 dark:text-white">
                Download All 14 in 4K Master Res
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Zero watermarks, color-graded 45MP files ready for print and social stories.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 font-mono-tech text-[10px]">
            <div className="p-2 rounded-lg bg-stone-50 dark:bg-slate-800 border border-stone-200/60 dark:border-slate-700 text-center flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-sm text-amber-600">verified</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">No Scrim</span>
            </div>
            <div className="p-2 rounded-lg bg-stone-50 dark:bg-slate-800 border border-stone-200/60 dark:border-slate-700 text-center flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-sm text-amber-600">hd</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">45 Megapixels</span>
            </div>
            <div className="p-2 rounded-lg bg-stone-50 dark:bg-slate-800 border border-stone-200/60 dark:border-slate-700 text-center flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-sm text-amber-600">offline_bolt</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">AirDrop Ready</span>
            </div>
          </div>

          {!isUnlocked ? (
            <form onSubmit={handleUnlockHD} className="flex flex-col gap-1.5 mt-1">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="Enter email to unlock HD free..."
                  required
                  className="flex-1 px-3 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1 shadow-xs"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Unlock'}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 text-center font-mono-tech">
                Free instant delivery funded by {EVENT_DETAILS.couple}'s photography package
              </span>
            </form>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-center flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              <span className="material-symbols-outlined text-base">check_circle</span>
              <span>All 14 Master RAW photos sent to {guestEmail}! AirDrop link active.</span>
            </div>
          )}
        </div>

        {/* 5. Privacy & Rescan Footer Strip */}
        <div className="flex flex-col items-center justify-center gap-1 text-center py-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px]">
              <span className="material-symbols-outlined text-xs text-amber-600">lock</span>
              Private to you
            </span>
            <span>·</span>
            <span className="text-[11px]">Ballroom Screen: Excluded</span>
            <span>·</span>
            <button
              onClick={onRescan}
              className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold hover:underline flex items-center gap-0.5"
            >
              <span className="material-symbols-outlined text-xs">refresh</span>
              Rescan Face
            </button>
          </div>
          <span className="font-mono-tech text-[9px] text-slate-400 dark:text-slate-500 mt-1">
            Encrypted Face Vectors · FlashSync v3.4 Tether Ingest
          </span>
        </div>
      </div>

      {/* 6. Fixed Bottom Mobile Navigation Bar */}
      <nav
        className={`fixed bottom-0 left-0 right-0 h-16 border-t z-40 px-6 flex items-center justify-around backdrop-blur-xl transition-colors ${
          isDarkTheme ? 'bg-slate-950/90 border-slate-800' : 'bg-white/95 border-stone-200 shadow-sm'
        }`}
      >
        <button
          onClick={() => setActiveTab('my-photos')}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] ${
            activeTab === 'my-photos' ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <span className="material-symbols-outlined text-xl">face</span>
            <span className="absolute -top-1 -right-2 text-[9px] font-mono-tech bg-amber-500 text-white font-bold px-1 rounded-full">
              14
            </span>
          </div>
          <span className="text-[11px]">My Photos</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('full-event');
            alert('Opening Full Event Curated Stream (1,842 captures)');
          }}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] ${
            activeTab === 'full-event' ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-xl">grid_view</span>
          <span className="text-[11px]">Full Event</span>
        </button>

        <button
          onClick={onRescan}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] ${
            activeTab === 'guest-cam' ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-xl">photo_camera</span>
          <span className="text-[11px]">Guest Cam</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('saved');
            alert('Opening Your Saved & Bookmarked Captures');
          }}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] ${
            activeTab === 'saved' ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-xl">bookmark</span>
          <span className="text-[11px]">Saved</span>
        </button>
      </nav>
    </div>
  );
};
