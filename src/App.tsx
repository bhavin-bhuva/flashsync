import React, { useState, useEffect } from 'react';
import { AppViewMode, PhotoCapture } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { IngestionMonitor } from './components/IngestionMonitor';
import { GuestFaceCam } from './components/GuestFaceCam';
import { GuestGallery } from './components/GuestGallery';
import { QRTableKitStudio } from './components/QRTableKitStudio';
import { LiveSlideshowKiosk } from './components/LiveSlideshowKiosk';
import { GuestLeadsAnalytics } from './components/GuestLeadsAnalytics';
import { PrintLabFulfillment } from './components/PrintLabFulfillment';
import { SettingsView } from './components/SettingsView';
import { PhotoDetailModal } from './components/PhotoDetailModal';

export default function App() {
  const [currentView, setCurrentView] = useState<AppViewMode>('ingestion-monitor');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoCapture | null>(null);
  // Default is clean modern light mode as explicitly requested by user
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sync dark class on document element if user toggles theme
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const handleToggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleLaunchKiosk = () => {
    setCurrentView('live-slideshow-kiosk');
  };

  // If in fullscreen kiosk mode, render the immersive 16:9 projection kiosk
  if (currentView === 'live-slideshow-kiosk') {
    return (
      <LiveSlideshowKiosk
        onExit={() => setCurrentView('ingestion-monitor')}
        isDarkTheme={isDarkTheme}
      />
    );
  }

  // If user is on the Guest Face Cam mobile experience, render dedicated centered mobile container
  const isGuestView = currentView === 'guest-face-cam' || currentView === 'guest-gallery';

  return (
    <div
      className={`min-h-screen transition-colors flex flex-col ${
        isDarkTheme ? 'bg-slate-950 text-slate-100 dark' : 'bg-stone-50 text-slate-800'
      }`}
    >
      {/* Top Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        isDarkTheme={isDarkTheme}
        onToggleTheme={handleToggleTheme}
        onLaunchKiosk={handleLaunchKiosk}
      />

      <div className="flex flex-1 pt-16">
        {/* Sidebar (visible in Studio views) */}
        {!isGuestView && (
          <Sidebar
            currentView={currentView}
            onNavigate={(view) => setCurrentView(view)}
            isDarkTheme={isDarkTheme}
            isOpenMobile={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Mobile View Sidebar Toggle Button for studio operations */}
        {!isGuestView && (
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden fixed bottom-6 left-6 z-30 w-12 h-12 rounded-full bg-amber-500 text-white shadow-lg flex items-center justify-center"
            title="Open studio menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        )}

        {/* Main Content Area */}
        <main
          className={`flex-1 transition-all ${
            !isGuestView ? 'lg:pl-72' : 'w-full'
          }`}
        >
          {currentView === 'ingestion-monitor' && (
            <IngestionMonitor
              onSelectPhoto={(photo) => setSelectedPhoto(photo)}
              onNavigateToQRKit={() => setCurrentView('qr-and-table-kits')}
              onLaunchKiosk={handleLaunchKiosk}
              isDarkTheme={isDarkTheme}
            />
          )}

          {currentView === 'guest-face-cam' && (
            <GuestFaceCam
              onFaceVerified={() => setCurrentView('guest-gallery')}
              onBrowsePublic={() => setCurrentView('ingestion-monitor')}
              isDarkTheme={isDarkTheme}
            />
          )}

          {currentView === 'guest-gallery' && (
            <GuestGallery
              onSelectPhoto={(photo) => setSelectedPhoto(photo)}
              onRescan={() => setCurrentView('guest-face-cam')}
              isDarkTheme={isDarkTheme}
            />
          )}

          {currentView === 'qr-and-table-kits' && (
            <QRTableKitStudio isDarkTheme={isDarkTheme} />
          )}

          {currentView === 'guest-leads-and-analytics' && (
            <GuestLeadsAnalytics isDarkTheme={isDarkTheme} />
          )}

          {currentView === 'print-lab-and-fulfillment' && (
            <PrintLabFulfillment isDarkTheme={isDarkTheme} />
          )}

          {currentView === 'settings' && <SettingsView isDarkTheme={isDarkTheme} />}
        </main>
      </div>

      {/* High-Resolution Photo Detail & EXIF Lightbox Modal */}
      {selectedPhoto && (
        <PhotoDetailModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          isDarkTheme={isDarkTheme}
        />
      )}
    </div>
  );
}
