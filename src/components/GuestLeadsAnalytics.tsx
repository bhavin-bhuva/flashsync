import React from 'react';
import { EVENT_DETAILS, INITIAL_LEADS, TABLES_LIST } from '../data/mockData';

interface GuestLeadsAnalyticsProps {
  isDarkTheme?: boolean;
}

export const GuestLeadsAnalytics: React.FC<GuestLeadsAnalyticsProps> = ({ isDarkTheme = false }) => {
  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl lg:text-3xl text-slate-900 dark:text-white">
            Guest Leads & Commerce Analytics
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time monetization, attendee identity capture, and table conversion telemetry.
          </p>
        </div>
        <button
          onClick={() => alert('Exporting full attendee CRM data to CSV format')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs transition-colors self-start shadow-xs"
        >
          <span className="material-symbols-outlined text-base">download</span>
          <span>Export CSV / CRM</span>
        </button>
      </div>

      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className={`p-5 rounded-2xl border transition-colors shadow-xs ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
          }`}
        >
          <span className="font-mono-tech text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Total Revenue</span>
          <div className="font-display font-extrabold text-3xl text-amber-600 dark:text-amber-400 mt-2">
            ${EVENT_DETAILS.leadsRevenue}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">19 Print & HD unlocks</span>
        </div>

        <div
          className={`p-5 rounded-2xl border transition-colors shadow-xs ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
          }`}
        >
          <span className="font-mono-tech text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Verified Emails</span>
          <div className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-2">
            {EVENT_DETAILS.emailsCaptured}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">63.7% of all attendees</span>
        </div>

        <div
          className={`p-5 rounded-2xl border transition-colors shadow-xs ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
          }`}
        >
          <span className="font-mono-tech text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Instagram Handles</span>
          <div className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-2">
            {EVENT_DETAILS.igHandlesCaptured}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">Opted into story tag rail</span>
        </div>

        <div
          className={`p-5 rounded-2xl border transition-colors shadow-xs ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
          }`}
        >
          <span className="font-mono-tech text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Average Order</span>
          <div className="font-display font-extrabold text-3xl text-emerald-600 dark:text-emerald-400 mt-2">
            ${(EVENT_DETAILS.leadsRevenue / EVENT_DETAILS.printBuys).toFixed(2)}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">Archival slip + digital pass</span>
        </div>
      </div>

      {/* Table Conversion Matrix & Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div
          className={`lg:col-span-7 p-6 rounded-2xl border transition-colors shadow-xs ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
          }`}
        >
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
            Table QR Engagement Breakdown
          </h3>
          <div className="flex flex-col gap-3">
            {TABLES_LIST.slice(0, 7).map((tbl, i) => {
              const scans = 8 - i;
              const unlocks = Math.max(2, 6 - i);
              const percentage = Math.round((unlocks / 8) * 100);
              return (
                <div key={tbl.id} className="flex flex-col gap-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {tbl.id} ({tbl.label})
                    </span>
                    <span className="font-mono-tech text-slate-500 dark:text-slate-400">
                      {unlocks} of {tbl.guestCount} guests ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`lg:col-span-5 p-6 rounded-2xl border transition-colors shadow-xs ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
          }`}
        >
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
            Live Purchase & Lead Ticker
          </h3>
          <div className="flex flex-col gap-3">
            {INITIAL_LEADS.map((lead) => (
              <div
                key={lead.id}
                className="p-3 rounded-xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200/80 dark:border-slate-800 flex items-start gap-3 text-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-sm">payments</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 dark:text-white">{lead.title}</span>
                    <span className="font-mono-tech text-[10px] text-slate-400 dark:text-slate-500">{lead.relativeTime}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">{lead.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
