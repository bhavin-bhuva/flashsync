import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { EVENT_DETAILS, TABLES_LIST } from '../data/mockData';
import { FaceAuthService, FaceDetectionResult } from '../services/faceAuthService';

interface GuestFaceCamProps {
  onFaceVerified: () => void;
  onBrowsePublic: () => void;
  isDarkTheme?: boolean;
}

export const GuestFaceCam: React.FC<GuestFaceCamProps> = ({
  onFaceVerified,
  onBrowsePublic,
  isDarkTheme = false,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [useLiveWebcam, setUseLiveWebcam] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [flashMode, setFlashMode] = useState<'auto' | 'on' | 'off'>('auto');
  const [isFlipped, setIsFlipped] = useState(false);
  const [detectionState, setDetectionState] = useState<FaceDetectionResult>({
    detected: true,
    confidence: 99.8,
    faceCount: 1,
    message: 'Mesh Locked 99.8%',
    box: { x: 20, y: 16, width: 60, height: 68 },
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [showTableSelector, setShowTableSelector] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>('T04');
  const [projectorExcluded, setProjectorExcluded] = useState(true);
  const [uploadedSelfieUrl, setUploadedSelfieUrl] = useState<string | null>(null);

  // Initialize camera stream if enabled
  useEffect(() => {
    let animFrame: number;
    const faceService = FaceAuthService.getInstance();

    if (useLiveWebcam && videoRef.current) {
      faceService
        .startCamera(videoRef.current, facingMode)
        .then(() => {
          setCameraError(null);
          // Continuous analysis loop
          const loop = () => {
            if (videoRef.current && canvasRef.current && videoRef.current.readyState >= 2) {
              const res = faceService.analyzeFrame(canvasRef.current, videoRef.current);
              setDetectionState(res);
            }
            animFrame = requestAnimationFrame(loop);
          };
          animFrame = requestAnimationFrame(loop);
        })
        .catch((err) => {
          console.warn('Could not start live webcam, using high-resolution sensor feed:', err);
          setCameraError('Webcam permission not granted or device camera busy. Using simulated sensor stream.');
          setUseLiveWebcam(false);
        });
    }

    return () => {
      cancelAnimationFrame(animFrame);
      faceService.stopCamera();
    };
  }, [useLiveWebcam, facingMode]);

  // Handle Shutter Trigger
  const handleSnap = () => {
    setIsAnalyzing(true);
    setAnalysisStep(1);

    // Vibration haptic if supported
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([40, 60, 40]);
    }

    setTimeout(() => {
      setAnalysisStep(2);
    }, 1000);

    setTimeout(() => {
      setAnalysisStep(3);
      // Trigger festive confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#6366F1', '#10B981', '#F43F5E'],
      });
    }, 2200);
  };

  // Handle File Upload from Camera Roll
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const resultUrl = event.target?.result as string;
        setUploadedSelfieUrl(resultUrl);
        handleSnap();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFlipCamera = () => {
    setIsFlipped(!isFlipped);
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
  };

  const cycleFlash = () => {
    if (flashMode === 'auto') setFlashMode('on');
    else if (flashMode === 'on') setFlashMode('off');
    else setFlashMode('auto');
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen py-4 px-3 sm:px-6">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Main Mobile/Tablet Frame Container */}
      <div className="w-full max-w-[430px] flex flex-col gap-4">
        {/* 1. Header & Event Identity Card */}
        <div
          className={`p-4 rounded-2xl border transition-colors shadow-xs ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold">
              <div className="w-4 h-4 rounded bg-amber-500 flex items-center justify-center text-white">
                <span
                  className="material-symbols-outlined text-[11px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
              </div>
              <span>
                Flash<span className="text-amber-600">Sync</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-mono-tech text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              LIVE TETHER STREAM
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-amber-500 text-lg"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                favorite
              </span>
              <h1 className="font-display font-bold text-xl text-slate-900 dark:text-white tracking-tight">
                {EVENT_DETAILS.title}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>{EVENT_DETAILS.date}</span>
              <span>·</span>
              <span>{EVENT_DETAILS.ballroom}</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-xs">photo_camera</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {EVENT_DETAILS.studio}
                </span>
                <span className="font-mono-tech text-[10px] text-slate-500 dark:text-slate-400">Sony α1 Instant Ingest</span>
              </div>
            </div>
            <div className="text-right font-mono-tech">
              <div className="font-bold text-amber-700 dark:text-amber-400">
                {EVENT_DETAILS.totalCaptures} Captures
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">340 Guests Matched</div>
            </div>
          </div>
        </div>

        {/* 2. Hero Live Camera Face-Capture Viewport */}
        <div
          className={`relative rounded-3xl p-3 border overflow-hidden shadow-sm flex flex-col items-center transition-colors ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
          }`}
        >
          {/* Top Viewport Control Bar */}
          <div className="w-full flex items-center justify-between px-2 pt-1 pb-2 z-20">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-mono-tech text-[10px] uppercase font-bold text-slate-700 dark:text-slate-300">
                {useLiveWebcam ? 'Live Webcam' : 'Sensor Feed'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setUseLiveWebcam(!useLiveWebcam)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-colors flex items-center gap-1 ${
                  useLiveWebcam
                    ? 'bg-amber-500 text-white border-amber-600'
                    : 'bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 border-stone-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                }`}
                title="Switch between live physical camera and reference sensor stream"
              >
                <span className="material-symbols-outlined text-xs">videocam</span>
                <span>{useLiveWebcam ? 'Live Active' : 'Enable Webcam'}</span>
              </button>

              <button
                type="button"
                onClick={cycleFlash}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                  flashMode === 'on'
                    ? 'bg-amber-500 text-white border-amber-600'
                    : 'bg-stone-100 dark:bg-slate-800 border-stone-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
                title="Toggle flash simulation"
              >
                <span className="material-symbols-outlined text-sm">
                  {flashMode === 'on' ? 'flash_on' : flashMode === 'off' ? 'flash_off' : 'flash_auto'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleFlipCamera}
                className="w-8 h-8 rounded-full bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-stone-200"
                title="Flip camera"
              >
                <span className="material-symbols-outlined text-sm">flip_camera_ios</span>
              </button>
            </div>
          </div>

          {/* Camera Error Alert if user denied */}
          {cameraError && (
            <div className="w-full mx-2 mb-2 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 flex items-center justify-between">
              <span>{cameraError}</span>
              <button
                onClick={() => setCameraError(null)}
                className="text-amber-900 font-bold ml-2"
              >
                ✕
              </button>
            </div>
          )}

          {/* Dynamic Biometric Oval Framing Container */}
          <div className="relative w-full aspect-[4/5] max-w-[320px] rounded-[36px] overflow-hidden bg-slate-950 flex items-center justify-center my-1 shadow-inner border border-stone-200/50 dark:border-slate-800">
            {/* Real Live Video Tag */}
            <video
              ref={videoRef}
              playsInline
              muted
              className={`absolute inset-0 w-full h-full object-cover transition-transform ${
                isFlipped ? 'scale-x-[-1]' : ''
              } ${useLiveWebcam ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />

            {/* Hidden canvas for video analysis */}
            <canvas ref={canvasRef} width={640} height={480} className="hidden" />

            {/* High-Resolution Guest Reference Feed if webcam is inactive or uploaded file */}
            {!useLiveWebcam && (
              <img
                src={
                  uploadedSelfieUrl ||
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuBxO2Sle2LWxLmWuz2yQ8TTXhh2VFxT86dwg-gs1yG_YXDOW9b78wi-FNSZzbgFx78obt7Q3aXg-TKV1spw3jbho_uq1IXGDlKECADyHgCzHcTNKVsRruzkAHEBXhb0taO7KF3McalSDYaki-BorILlm4W8LBLs2n-AW-iW_Be3nBseNopPq0K5qNO01RMnKfXOn30y80gLyB0Smm_SllyXN-_y2sL9Ec6NPN3gWUajHNGOe_MyigzZBA'
                }
                alt="Camera Feed Stream"
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                  isFlipped ? 'scale-x-[-1]' : ''
                }`}
              />
            )}

            {/* Ambient Biometric Radial Vignette */}
            <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none" />

            {/* Biometric Laser Sweep */}
            {!isAnalyzing && (
              <div className="absolute left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80 pointer-events-none shadow-[0_0_12px_#f59e0b] animate-scan-laser" />
            )}

            {/* Biometric Alignment Oval Brackets */}
            <div className="relative z-10 w-[78%] h-[82%] rounded-[50%/60%] flex flex-col justify-between p-3.5 pointer-events-none transition-all duration-300">
              {/* Top Reticle Corners */}
              <div className="flex justify-between items-start">
                <div className="w-5 h-5 border-t-2 border-l-2 border-amber-400 rounded-tl-xl shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                <div className="px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-xs border border-amber-500/40">
                  <span className="font-mono-tech text-[9px] text-amber-400 font-bold uppercase tracking-wider">
                    {detectionState.message}
                  </span>
                </div>
                <div className="w-5 h-5 border-t-2 border-r-2 border-amber-400 rounded-tr-xl shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              </div>

              {/* Center Crosshair Focus */}
              <div className="self-center flex flex-col items-center gap-1.5 opacity-90">
                <div
                  className="w-12 h-12 rounded-full border border-dashed border-amber-400/60 animate-spin flex items-center justify-center"
                  style={{ animationDuration: '10s' }}
                >
                  <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                </div>
                <p className="font-body text-xs text-white bg-slate-950/80 backdrop-blur-xs px-3 py-1 rounded-full text-center font-medium shadow-md">
                  Align your face within the frame
                </p>
              </div>

              {/* Bottom Reticle Corners */}
              <div className="flex justify-between items-end">
                <div className="w-5 h-5 border-b-2 border-l-2 border-amber-400 rounded-bl-xl shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                <div className="flex items-center gap-1 bg-slate-950/80 backdrop-blur-xs px-2 py-0.5 rounded-full border border-amber-500/30">
                  <span
                    className="material-symbols-outlined text-xs text-amber-400"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    face
                  </span>
                  <span className="font-mono-tech text-[10px] text-white">
                    1 Identity Detected
                  </span>
                </div>
                <div className="w-5 h-5 border-b-2 border-r-2 border-amber-400 rounded-br-xl shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              </div>
            </div>

            {/* In-Flight Analysis & Confirmation Dialog Modal Overlay */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center text-white">
                {analysisStep === 1 && (
                  <>
                    <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 animate-pulse">
                      <span className="material-symbols-outlined text-3xl">fingerprint</span>
                    </div>
                    <h3 className="font-display font-bold text-base mb-1">
                      Generating SHA-256 Biometric Vector...
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">
                      Extracting 128 nodal facial embeddings in-memory.
                    </p>
                    <div className="w-44 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-amber-400 animate-pulse" />
                    </div>
                  </>
                )}

                {analysisStep === 2 && (
                  <>
                    <div className="w-14 h-14 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 animate-spin">
                      <span className="material-symbols-outlined text-3xl">search</span>
                    </div>
                    <h3 className="font-display font-bold text-base mb-1">
                      Querying 1,842 Event RAW Captures...
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">
                      Comparing against Elena Vance Studio photo stream.
                    </p>
                    <div className="w-44 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-indigo-500 animate-pulse" />
                    </div>
                  </>
                )}

                {analysisStep === 3 && (
                  <>
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 animate-bounce">
                      <span className="material-symbols-outlined text-3xl">verified</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-1">
                      Found 14 Photos of You!
                    </h3>
                    <p className="text-xs text-slate-300 mb-4 max-w-xs">
                      High-confidence match: Portraits at Table 4 & Sangeet Dancefloor.
                    </p>
                    <button
                      onClick={onFaceVerified}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2.5 rounded-full text-xs shadow-lg transition-transform active:scale-95"
                    >
                      Open My Curated Album
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Shutter Trigger Buttons */}
          <div className="w-full flex flex-col items-center gap-2.5 pt-3 pb-2 z-20">
            <button
              onClick={handleSnap}
              disabled={isAnalyzing}
              className="w-full max-w-[280px] flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs px-6 py-3.5 rounded-full shadow-sm active:scale-95 transition-all"
            >
              <span
                className="material-symbols-outlined text-lg"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                shutter_speed
              </span>
              <span>Snap to Find My Photos</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1 px-3 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="material-symbols-outlined text-sm text-amber-600">
                add_photo_alternate
              </span>
              <span>Upload selfie from Camera Roll</span>
            </button>
          </div>
        </div>

        {/* 3. Privacy, Security & Biometrics Trust Guarantee Card */}
        <div
          className={`p-4 rounded-2xl border transition-colors shadow-xs flex flex-col gap-3 ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-lg">shield_lock</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-xs text-slate-900 dark:text-white">
                  Zero Account · 100% Private
                </h2>
                <span className="font-mono-tech text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold">
                  Ephemeral
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Your capture is converted directly to an in-memory vector embedding to index your
                appearances in tonight’s album. Raw images are never sold or used for surveillance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 font-mono-tech text-[10px]">
            <div className="p-2 rounded-lg bg-stone-50 dark:bg-slate-800/80 border border-stone-200/60 dark:border-slate-800 text-center flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-sm text-amber-600">enhanced_encryption</span>
              <span className="text-slate-700 dark:text-slate-300 font-semibold uppercase">SHA-256 Vector</span>
            </div>
            <div className="p-2 rounded-lg bg-stone-50 dark:bg-slate-800/80 border border-stone-200/60 dark:border-slate-800 text-center flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-sm text-amber-600">timer</span>
              <span className="text-slate-700 dark:text-slate-300 font-semibold uppercase">Purged 24h</span>
            </div>
            <div className="p-2 rounded-lg bg-stone-50 dark:bg-slate-800/80 border border-stone-200/60 dark:border-slate-800 text-center flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-sm text-amber-600">no_accounts</span>
              <span className="text-slate-700 dark:text-slate-300 font-semibold uppercase">No App Install</span>
            </div>
          </div>

          {/* Privacy Projector Toggle */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-base">visibility_off</span>
              <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Keep matches off ballroom projector
              </span>
            </div>
            <button
              type="button"
              onClick={() => setProjectorExcluded(!projectorExcluded)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                projectorExcluded ? 'bg-amber-500' : 'bg-stone-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  projectorExcluded ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 4. Alternate Flow: Table Lookup & Public Gallery */}
        <div
          className={`p-4 rounded-2xl border transition-colors shadow-xs flex flex-col gap-3 ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
          }`}
        >
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Prefer not to scan right now?</span>
            <span className="font-mono-tech text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">
              Manual Access
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowTableSelector(!showTableSelector)}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 hover:bg-stone-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-base text-amber-600">table_restaurant</span>
              <span>Find by Table #</span>
            </button>

            <button
              onClick={onBrowsePublic}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 hover:bg-stone-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-base text-indigo-600">collections</span>
              <span>Public Gallery</span>
            </button>
          </div>

          {/* Quick Table Grid Dropdown */}
          {showTableSelector && (
            <div className="p-3 rounded-xl bg-stone-50 dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Select Your Table Seating</span>
                <button
                  onClick={() => setShowTableSelector(false)}
                  className="text-amber-600 dark:text-amber-400 font-semibold"
                >
                  Close
                </button>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {TABLES_LIST.slice(0, 18).map((tbl) => (
                  <button
                    key={tbl.id}
                    onClick={() => {
                      setSelectedTable(tbl.id);
                      onFaceVerified();
                    }}
                    className={`py-1.5 rounded text-center font-mono-tech text-xs transition-colors ${
                      selectedTable === tbl.id
                        ? 'bg-amber-500 text-white font-bold'
                        : 'bg-white dark:bg-slate-700 border border-stone-200/80 dark:border-slate-600 hover:border-amber-400 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {tbl.id}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 5. Crowdsourced Guest-Cam Upload Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-lg">party_mode</span>
            </div>
            <div>
              <h3 className="font-semibold text-xs">Have candid photos of the couple?</h3>
              <p className="text-[11px] text-amber-100">Contribute directly to tonight’s live reel</p>
            </div>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-1.5 rounded-lg bg-white text-amber-900 font-bold text-xs shrink-0 shadow-xs hover:bg-amber-50 active:scale-95 transition-all flex items-center gap-1"
          >
            <span>Upload</span>
            <span className="material-symbols-outlined text-xs">upload</span>
          </button>
        </div>

        {/* Micro Footer Signature */}
        <div className="text-center py-2 text-[10px] text-slate-400 font-mono-tech">
          <span>Powered by FlashSync AI · Zero Footprint Event Engine</span>
        </div>
      </div>
    </div>
  );
};
