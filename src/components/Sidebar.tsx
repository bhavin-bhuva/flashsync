import React from 'react';
import { AppViewMode } from '../types';
import { EVENT_DETAILS } from '../data/mockData';

interface SidebarProps {
  currentView: AppViewMode;
  onNavigate: (view: AppViewMode) => void;
  isDarkTheme: boolean;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isDarkTheme,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navItems: Array<{ id: AppViewMode; label: string; icon: string; badge?: string }> = [
    { id: 'ingestion-monitor', label: 'Ingestion Monitor', icon: 'sensors' },
    { id: 'qr-and-table-kits', label: 'QR & Table Kits', icon: 'qr_code_scanner' },
    { id: 'live-slideshow-kiosk', label: 'Live Slideshow Kiosk', icon: 'slideshow' },
    { id: 'guest-leads-and-analytics', label: 'Guest Leads & Analytics', icon: 'analytics' },
    { id: 'print-lab-and-fulfillment', label: 'Print Lab & Fulfillment', icon: 'print' },
    { id: 'settings', label: 'Settings', icon: 'tune' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-16 left-0 bottom-0 w-72 z-40 flex flex-col justify-between transition-all duration-300 border-r ${
          isDarkTheme
            ? 'bg-slate-950/95 border-slate-800 text-slate-200'
            : 'bg-white border-stone-200 text-slate-700'
        } ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col p-4 gap-4 overflow-y-auto">
          {/* Active Production Card */}
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono-tech text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                Active Production
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-mono-tech text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                LIVE SYNC
              </span>
            </div>
            <div className="font-semibold text-sm text-slate-900 dark:text-white truncate">
              {EVENT_DETAILS.title}
            </div>
            <div className="font-mono-tech text-[11px] text-slate-500 mt-0.5">
              {EVENT_DETAILS.dateShort} · {EVENT_DETAILS.ballroom}
            </div>
          </div>

          {/* Primary Navigation Links */}
          <nav className="flex flex-col gap-1">
            <span className="font-mono-tech text-[10px] uppercase font-semibold text-slate-400 tracking-wider px-2 py-1">
              Studio Operations
            </span>
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onCloseMobile();
                  }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                    isActive
                      ? 'bg-amber-500 text-white font-semibold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-lg ${
                      isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge && (
                    <span className="font-mono-tech text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Dedicated Guest Face Cam Quick Launch Banner */}
          <div className="pt-2 border-t border-stone-200 dark:border-slate-800">
            <span className="font-mono-tech text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 tracking-wider px-2 py-1">
              Guest Experience
            </span>
            <div className="mt-1 flex flex-col gap-1.5">
              <button
                onClick={() => {
                  onNavigate('guest-face-cam');
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left transition-all ${
                  currentView === 'guest-face-cam'
                    ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200'
                    : 'bg-stone-50 dark:bg-slate-900/60 border-stone-200/80 dark:border-slate-800 hover:bg-stone-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">face</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">
                      Guest Biometric Scanner
                    </span>
                    <span className="font-mono-tech text-[10px] text-slate-500 dark:text-slate-400">
                      Real-time face search portal
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-sm text-slate-400">chevron_right</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('guest-gallery');
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left transition-all ${
                  currentView === 'guest-gallery'
                    ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200'
                    : 'bg-stone-50 dark:bg-slate-900/60 border-stone-200/80 dark:border-slate-800 hover:bg-stone-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">photo_library</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">
                      Guest Matched Album
                    </span>
                    <span className="font-mono-tech text-[10px] text-slate-500 dark:text-slate-400">
                      14 photos synced (Sophia M.)
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-sm text-slate-400">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Storage Meter Card */}
        <div className="p-4 border-t border-stone-200 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-900/30">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1.5">
            <span className="font-medium">Storage Ingest</span>
            <span className="font-mono-tech text-amber-600 dark:text-amber-400 font-semibold">
              {EVENT_DETAILS.storageUsedGB} GB / 2 TB
            </span>
          </div>
          <div className="w-full bg-stone-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(EVENT_DETAILS.storageUsedGB / EVENT_DETAILS.storageMaxGB) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 font-mono-tech">
            <span>NVMe SSD Mirror</span>
            <span className="text-emerald-600 font-semibold">Sync Healthy</span>
          </div>
        </div>
      </aside>
    </>
  );
};
