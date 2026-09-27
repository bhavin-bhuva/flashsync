import React, { useState } from 'react';
import { PhotoCapture } from '../types';
import { EVENT_DETAILS } from '../data/mockData';

interface PhotoDetailModalProps {
  photo: PhotoCapture;
  onClose: () => void;
  onToggleFavorite?: (id: string) => void;
  isDarkTheme?: boolean;
}

export const PhotoDetailModal: React.FC<PhotoDetailModalProps> = ({
  photo,
  onClose,
  onToggleFavorite,
  isDarkTheme = false,
}) => {
  const [showTags, setShowTags] = useState(true);
  const [showExif, setShowExif] = useState(true);
  const [isFavorite, setIsFavorite] = useState(photo.isFavorite ?? false);
  const [isProjectorExcluded, setIsProjectorExcluded] = useState(photo.isExcludedFromProjector ?? true);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDownload = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      // Trigger genuine image download in browser
      const link = document.createElement('a');
      link.href = photo.url;
      link.download = `${photo.filename.replace('.ARW', '')}_Master_4K.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Exported unwatermarked 45.4MP RAW JPEG to Camera Roll');
    }, 800);
  };

  const handleToggleFav = () => {
    setIsFavorite(!isFavorite);
    if (onToggleFavorite) onToggleFavorite(photo.id);
    showToast(!isFavorite ? 'Saved to Your Gala Favorites' : 'Removed from Favorites');
  };

  const handleToggleProjector = () => {
    setIsProjectorExcluded(!isProjectorExcluded);
    showToast(
      !isProjectorExcluded
        ? 'Photo hidden from Grand Ballroom video wall'
        : 'Photo permitted in live ballroom slide reel'
    );
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/#guest-photo-${photo.id}`);
    }
    showToast('Secure 48h High-Res Guest Link Copied');
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Rohan & Priya's Wedding Gala",
          text: `Check out our photograph by Elena Vance Studio from the Grand Hyatt reception!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex justify-center items-start p-0 sm:p-4">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-60 px-4 py-2 rounded-full bg-slate-900 text-amber-400 font-medium text-xs sm:text-sm flex items-center gap-2 shadow-2xl border border-amber-500/30 animate-bounce">
          <span className="material-symbols-outlined text-base text-emerald-400">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Modal Container */}
      <div
        className={`w-full max-w-2xl min-h-screen sm:min-h-0 sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col transition-colors my-auto ${
          isDarkTheme ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-800'
        }`}
      >
        {/* Modal Top Header */}
        <div className="h-14 px-4 border-b border-stone-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-30 bg-inherit/90 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Close modal"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
            <div className="flex flex-col">
              <span className="font-semibold text-sm leading-tight text-slate-900 dark:text-white">
                Photo Inspection & Export
              </span>
              <span className="font-mono-tech text-[10px] text-slate-500 dark:text-slate-400">
                {photo.filename} · {photo.fileSize}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowTags(!showTags)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                showTags
                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                  : 'bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {showTags ? 'visibility' : 'visibility_off'}
              </span>
              <span>{showTags ? 'Tags ON' : 'Tags OFF'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Hero Photo Viewport with AI Bounding Boxes */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-slate-950 overflow-hidden flex items-center justify-center group">
          <img
            src={photo.url}
            alt={photo.description || photo.filename}
            className="w-full h-full object-cover"
          />

          {/* AI Face Detection Bounding Boxes Overlay */}
          {showTags && photo.faces && (
            <div className="absolute inset-0 pointer-events-none">
              {photo.faces.map((face) => (
                <div
                  key={face.id}
                  style={{
                    left: `${face.box.x}%`,
                    top: `${face.box.y}%`,
                    width: `${face.box.width}%`,
                    height: `${face.box.height}%`,
                  }}
                  className={`absolute rounded border-2 transition-all duration-300 pointer-events-auto ${
                    face.isUser
                      ? 'border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)]'
                      : face.isVip
                      ? 'border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                      : 'border-indigo-400/90 shadow-[0_0_12px_rgba(99,102,241,0.3)]'
                  }`}
                >
                  <div
                    className={`absolute -top-7 left-0 px-2 py-0.5 rounded text-[10px] font-mono-tech whitespace-nowrap flex items-center gap-1 shadow-md ${
                      face.isUser
                        ? 'bg-amber-500 text-white font-bold'
                        : face.isVip
                        ? 'bg-amber-500 text-white font-bold'
                        : 'bg-slate-900/90 text-white'
                    }`}
                  >
                    {face.isUser && (
                      <span
                        className="material-symbols-outlined text-[11px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                    )}
                    <span>{face.name}</span>
                    <span className="opacity-80">({face.confidence}%)</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Preview Scrim & Zero-Watermark Badge */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white font-mono-tech text-[11px] shadow-sm">
              <span className="material-symbols-outlined text-xs text-amber-400">verified_user</span>
              <span>Master RAW · Zero Watermark on Download</span>
            </div>
            <button
              onClick={() => setShowExif(!showExif)}
              className="pointer-events-auto flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-400 hover:text-white font-mono-tech text-[10px] font-semibold transition-colors"
            >
              <span>EXIF</span>
              <span className="material-symbols-outlined text-xs">
                {showExif ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </div>
        </div>

        {/* Collapsible EXIF Details Strip */}
        {showExif && (
          <div className="px-4 py-2.5 bg-stone-100 dark:bg-slate-950 border-b border-stone-200 dark:border-slate-800 font-mono-tech text-xs text-slate-600 dark:text-slate-400 overflow-x-auto no-scrollbar flex items-center gap-3">
            <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1 shrink-0">
              <span className="material-symbols-outlined text-sm text-amber-600">photo_camera</span>
              {photo.camera}
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="shrink-0">{photo.lens}</span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="shrink-0">{photo.shutter}</span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="shrink-0">{photo.aperture}</span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="shrink-0">{photo.iso}</span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold shrink-0">
              {photo.megapixels}
            </span>
          </div>
        )}

        {/* Interactive Controls & Export Actions */}
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="flex-1 h-12 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-lg">
                {isExporting ? 'progress_activity' : 'download'}
              </span>
              <span>{isExporting ? 'Exporting 45.4MP RAW...' : 'Save to Camera Roll'}</span>
            </button>

            <button
              onClick={handleToggleFav}
              className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${
                isFavorite
                  ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950 dark:border-rose-900'
                  : 'bg-stone-50 border-stone-200 text-slate-500 hover:text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:text-white'
              }`}
              title="Add to favorites"
            >
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </button>

            <button
              onClick={() => setShowPrivacyModal(true)}
              className="w-12 h-12 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-rose-500 transition-colors flex items-center justify-center"
              title="Privacy / Untag options"
            >
              <span className="material-symbols-outlined text-xl">shield_person</span>
            </button>
          </div>

          {/* Ballroom Projector Privacy Control */}
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-stone-200 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200">
                <span className="material-symbols-outlined text-base">
                  {isProjectorExcluded ? 'videocam_off' : 'tv'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                  Live Ballroom Projector Screen
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Status:{' '}
                  <strong className={isProjectorExcluded ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}>
                    {isProjectorExcluded ? 'Excluded · Hidden' : 'Broadcast Allowed · Live'}
                  </strong>
                </span>
              </div>
            </div>
            <button
              onClick={handleToggleProjector}
              className="px-3 py-1 rounded-md text-xs font-mono-tech font-semibold bg-stone-200 hover:bg-stone-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 transition-colors"
            >
              TOGGLE
            </button>
          </div>

          {/* Instant Share & AirDrop Carousel */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono-tech">
                Instant Share & AirDrop
              </span>
              <span className="font-mono-tech text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                FLASH-TRANSFER READY
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-1">
              <button
                onClick={() => showToast('Opening Instagram Stories 9:16 template...')}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-stone-50 hover:bg-stone-100 dark:bg-slate-800/80 border border-stone-200/80 dark:border-slate-700 text-center transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-xs">
                  <span className="material-symbols-outlined text-lg">auto_stories</span>
                </div>
                <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200">IG Story</span>
              </button>

              <button
                onClick={() => showToast('Opening Table 4 WhatsApp Group...')}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-stone-50 hover:bg-stone-100 dark:bg-slate-800/80 border border-stone-200/80 dark:border-slate-700 text-center transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                  <span className="material-symbols-outlined text-lg">chat</span>
                </div>
                <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Table 4</span>
              </button>

              <button
                onClick={() => showToast('AirDrop Beam Broadcast initiated for iOS devices nearby')}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-stone-50 hover:bg-stone-100 dark:bg-slate-800/80 border border-stone-200/80 dark:border-slate-700 text-center transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
                  <span className="material-symbols-outlined text-lg">wifi_tethering</span>
                </div>
                <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200">AirDrop</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-stone-50 hover:bg-stone-100 dark:bg-slate-800/80 border border-stone-200/80 dark:border-slate-700 text-center transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-stone-200 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-xs">
                  <span className="material-symbols-outlined text-lg">link</span>
                </div>
                <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Copy Link</span>
              </button>
            </div>
          </div>

          {/* Archival Print Ordering Card */}
          <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-slate-800/50 border border-amber-200 dark:border-slate-700 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-semibold text-xs">
                <span className="material-symbols-outlined text-amber-600 text-base">workspace_premium</span>
                <span>Elena Vance Archival Lab</span>
              </div>
              <span className="font-mono-tech text-[10px] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                SHIPS IN 48H
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Color-graded fine-art gallery prints on Hahnemühle Pearl paper with official studio seal.
            </p>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                onClick={() => showToast('Added 5x7 Pearl Matte ($12) to print lab queue')}
                className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-stone-200 dark:border-slate-600 flex items-center justify-between hover:border-amber-400 transition-colors text-left"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">5×7 Pearl Matte</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Unframed slip</span>
                </div>
                <span className="font-mono-tech text-xs font-bold text-amber-600 dark:text-amber-400">$12</span>
              </button>

              <button
                onClick={() => showToast('Added 8x10 Gallery Framed ($38) to print lab queue')}
                className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-stone-200 dark:border-slate-600 flex items-center justify-between hover:border-amber-400 transition-colors text-left"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">8×10 Monograph</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Custom Framed</span>
                </div>
                <span className="font-mono-tech text-xs font-bold text-amber-600 dark:text-amber-400">$38</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Untag & Privacy Modal Dialog */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-2xl flex flex-col gap-3 border border-stone-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-rose-600">
              <span className="material-symbols-outlined text-2xl">shield_person</span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Privacy & Untag Request</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Remove your face recognition index and personal identification from this capture? It will also be removed from your personal album and hidden from the ballroom projector loop.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  setShowPrivacyModal(false);
                  setShowTags(false);
                  showToast('You have been untagged and hidden from public screens');
                }}
                className="w-full py-2.5 rounded-lg bg-rose-600 text-white font-semibold text-xs hover:bg-rose-700 transition-colors"
              >
                Untag Me & Exclude Photo
              </button>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="w-full py-2 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
