import React, { useState } from 'react';
import { EVENT_DETAILS } from '../data/mockData';

interface SettingsViewProps {
  isDarkTheme?: boolean;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ isDarkTheme = false }) => {
  const [cameraProtocol, setCameraProtocol] = useState('FTP Wi-Fi 5GHz (128 MB/s)');
  const [faceThreshold, setFaceThreshold] = useState(95);
  const [storageTier, setStorageTier] = useState('NVMe 2TB + AWS S3 Instant Backup');
  const [autoModeration, setAutoModeration] = useState(true);

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 max-w-4xl mx-auto w-full">
      <div>
        <h1 className="font-display font-bold text-2xl lg:text-3xl text-slate-900 dark:text-white">
          Studio Hub OS Configuration
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Camera tethering hardware parameters, AI facial recognition neural models, and storage rules.
        </p>
      </div>

      <div
        className={`p-6 rounded-2xl border transition-colors shadow-xs flex flex-col gap-6 ${
          isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
        }`}
      >
        {/* Hardware Tethering */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-600 text-lg">settings_input_hdmi</span>
            <span>Camera Hardware & Ingestion Rails</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex flex-col gap-1">
              <label className="text-slate-500 dark:text-slate-400 font-medium">Primary Tether Transport</label>
              <select
                value={cameraProtocol}
                onChange={(e) => setCameraProtocol(e.target.value)}
                className="px-3 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono-tech text-xs"
              >
                <option>FTP Wi-Fi 5GHz (128 MB/s)</option>
                <option>USB-C 3.2 Gen 2 (10 Gbps)</option>
                <option>10GbE Tether Bridge</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-slate-500 dark:text-slate-400 font-medium">Secondary Backup Slot</label>
              <input
                type="text"
                disabled
                value="CFexpress Type A (Slot 2 RAW Mirror)"
                className="px-3 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-mono-tech text-xs"
              />
            </div>
          </div>
        </div>

        {/* AI Facial Recognition Engine */}
        <div className="flex flex-col gap-3 pt-4 border-t border-stone-100 dark:border-slate-800">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 text-lg">neurology</span>
            <span>Neural Cluster & Face Recognition Parameters</span>
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">
                Minimum Match Verification Confidence
              </span>
              <span className="font-mono-tech font-bold text-amber-600 dark:text-amber-400">{faceThreshold}%</span>
            </div>
            <input
              type="range"
              min="90"
              max="99"
              value={faceThreshold}
              onChange={(e) => setFaceThreshold(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Only deliveries matching or exceeding this threshold are pushed to guests automatically.
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200/80 dark:border-slate-700 mt-2 text-xs">
            <div className="flex flex-col">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                AI Moderation on Crowdsourced Candids
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Filters duplicate blurs and checks content safety before projection
              </span>
            </div>
            <input
              type="checkbox"
              checked={autoModeration}
              onChange={(e) => setAutoModeration(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Cloud & Local Storage */}
        <div className="flex flex-col gap-3 pt-4 border-t border-stone-100 dark:border-slate-800">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 text-lg">cloud</span>
            <span>Storage & Retention Policies</span>
          </h3>
          <div className="flex flex-col gap-1 text-xs">
            <label className="text-slate-500 dark:text-slate-400 font-medium">Active Storage Target</label>
            <select
              value={storageTier}
              onChange={(e) => setStorageTier(e.target.value)}
              className="px-3 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono-tech text-xs"
            >
              <option>NVMe 2TB + AWS S3 Instant Backup</option>
              <option>Backblaze B2 Mirror (Cold Storage)</option>
              <option>Local SSD Mirror Only (Air-gapped)</option>
            </select>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Ephemeral guest facial vectors are automatically flushed and purged within 24 hours post-event.
          </span>
        </div>
      </div>
    </div>
  );
};
