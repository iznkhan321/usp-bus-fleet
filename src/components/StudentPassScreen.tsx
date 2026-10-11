import React, { useState } from 'react';
import { 
  Bus, 
  ArrowRightLeft, 
  GraduationCap, 
  MapPin, 
  TrendingUp, 
  RotateCcw, 
  Clock, 
  Volume2, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  QrCode, 
  Receipt, 
  AlertCircle,
  BellRing,
  CheckCircle2,
  Calendar,
  UserCheck
} from 'lucide-react';
import { StudentProfile, BusTelemetry, ProximitySettings } from '../types';
import { playAlarmTone } from '../utils/audio';
import { UspLogo } from './UspLogo';

interface StudentPassScreenProps {
  student: StudentProfile;
  telemetry: BusTelemetry;
  proximitySettings: ProximitySettings;
  setProximitySettings: React.Dispatch<React.SetStateAction<ProximitySettings>>;
  onOpenScanZoom: () => void;
  onOpenLedger: () => void;
  onOpenSealModal: () => void;
  onOpenDriverModal: () => void;
  onSwitchToTrack: () => void;
}

export const StudentPassScreen: React.FC<StudentPassScreenProps> = ({
  student,
  telemetry,
  proximitySettings,
  setProximitySettings,
  onOpenScanZoom,
  onOpenLedger,
  onOpenSealModal,
  onOpenDriverModal,
  onSwitchToTrack
}) => {
  const [isPlayingTestTone, setIsPlayingTestTone] = useState(false);
  const [showStopBroadcastToast, setShowStopBroadcastToast] = useState(false);
  const [showSkipModal, setShowSkipModal] = useState(false);

  const handleTestTone = () => {
    setIsPlayingTestTone(true);
    playAlarmTone(proximitySettings.audioTone);
    setTimeout(() => setIsPlayingTestTone(false), 800);
  };

  const handleImAtTheStop = () => {
    const nextState = !proximitySettings.isStudentAtStop;
    setProximitySettings(prev => ({
      ...prev,
      isStudentAtStop: nextState,
      isSkippedToday: false
    }));
    if (nextState) {
      setShowStopBroadcastToast(true);
      setTimeout(() => setShowStopBroadcastToast(false), 5000);
    }
  };

  const handleConfirmSkip = () => {
    setProximitySettings(prev => ({
      ...prev,
      isSkippedToday: true,
      isStudentAtStop: false
    }));
    setShowSkipModal(false);
  };

  const handleCancelSkip = () => {
    setProximitySettings(prev => ({
      ...prev,
      isSkippedToday: false
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto pb-28 px-4 pt-3 space-y-4">
      {/* Toast Notification when Broadcast is Sent */}
      {showStopBroadcastToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm p-3.5 rounded-2xl bg-[#0b2545] text-white shadow-2xl border border-amber-400/40 flex items-center gap-3 animate-bounce">
          <div className="w-8 h-8 rounded-full bg-amber-400 text-[#0b2545] flex items-center justify-center font-bold">
            <Check className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs">
            <p className="font-bold text-amber-300">Driver Notified via Fleet Radio</p>
            <p className="text-slate-200 text-[11px]">
              Driver Jamil alerted: Student at Multan Arts Council stop.
            </p>
          </div>
        </div>
      )}

      {/* TOP HEADER: Logo, Status, Swap, Avatar */}
      <header className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2.5">
          {/* USP BusFleet Logo with Seal button */}
          <button
            onClick={onOpenSealModal}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity text-left group"
            title="Click to view Official Seal"
          >
            <UspLogo size="sm" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[#001026] text-base tracking-tight leading-none">
                  USP BusFleet
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                  ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-tight mt-0.5">
                Student Pass
              </p>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Swap / Switch Role Button */}
          <button
            onClick={onSwitchToTrack}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200/80 flex items-center justify-center text-slate-700 transition-colors shadow-sm"
            title="Switch to Live Telematics"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          {/* Student Profile Avatar */}
          <button
            onClick={onOpenScanZoom}
            className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#0b2545] shadow-sm hover:ring-2 hover:ring-amber-400 transition-all"
            title="Student Profile"
          >
            <img
              src={student.photoUrl}
              alt={student.name}
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </header>

      {/* BANNER: Morning Dispatch Ready */}
      <div 
        onClick={onSwitchToTrack}
        className="w-full p-3 rounded-2xl bg-[#eff4ff] border border-[#d5e3ff] flex items-center justify-between shadow-xs cursor-pointer hover:bg-[#e5eeff] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
            <Bus className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-[13px] font-extrabold text-[#0b1c30] leading-snug">
              Morning Dispatch Ready
            </h2>
            <p className="text-[11px] text-slate-600 font-medium">
              Route #04 scheduled at 07:40 A...
            </p>
          </div>
        </div>

        <div className="px-2.5 py-1 rounded-full bg-[#002b1b] text-[#4edea3] text-[10px] font-extrabold tracking-wider uppercase border border-[#005236]">
          ON SCHEDULE
        </div>
      </div>

      {/* SKIPPED TODAY NOTICE (If student tapped Skip) */}
      {proximitySettings.isSkippedToday && (
        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span>Marked as <strong>Skipping Today</strong>. Driver won&apos;t wait at Arts Council.</span>
          </div>
          <button
            onClick={handleCancelSkip}
            className="px-2.5 py-1 rounded-lg bg-amber-600 text-white font-bold text-[11px] hover:bg-amber-700"
          >
            Undo
          </button>
        </div>
      )}

      {/* MAIN CARD: USP TRANSIT ID */}
      <section className="relative rounded-3xl bg-[#001733] text-white shadow-xl overflow-hidden border border-slate-700/50">
        {/* Subtle geometric pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#d4af37 1px, transparent 1px)`,
            backgroundSize: '16px 16px'
          }}
        />

        <div className="relative p-4 sm:p-5 space-y-4">
          {/* Card Top Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-black tracking-wider uppercase text-white leading-none">
                  USP TRANSIT ID
                </h3>
                <p className="text-[10px] text-slate-300 font-medium mt-0.5">
                  Directorate of Fleet Operations
                </p>
              </div>
            </div>

            {/* RFID Active Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#002b1b]/80 border border-emerald-500/40 text-[10px] font-bold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              RFID ACTIVE
            </div>
          </div>

          {/* Student Identity Section */}
          <div className="flex items-start gap-3.5 pt-1">
            {/* Student Photo with verified badge */}
            <div className="relative w-20 h-24 rounded-xl overflow-hidden border-2 border-amber-400/80 shadow-md bg-slate-800 shrink-0">
              <img
                src={student.photoUrl}
                alt={student.name}
                className="w-full h-full object-cover"
              />
              {/* Verified Gold Shield Badge */}
              <div 
                className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-amber-400 text-[#0b1c30] flex items-center justify-center shadow-sm"
                title="Verified Student ID"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </div>

            {/* Student Details */}
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  ROLL NUMBER
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-white/15 text-[10px] font-bold text-slate-200">
                  {student.semester}
                </span>
              </div>

              <div className="text-lg font-black text-white tracking-tight leading-none font-mono">
                {student.rollNumber}
              </div>

              <div className="text-base font-extrabold text-white leading-tight pt-0.5">
                {student.name}
              </div>

              <div className="text-xs text-slate-300 font-medium truncate">
                {student.department}
              </div>
            </div>
          </div>

          {/* Assigned Route Box */}
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-300">
                ASSIGNED ROUTE
              </span>
              <span className="text-[10px] font-black tracking-wider uppercase text-[#fea619] bg-[#fea619]/15 px-2 py-0.5 rounded-full border border-[#fea619]/30">
                {student.seatType}
              </span>
            </div>

            <div className="text-xs font-bold text-white">
              {student.assignedRouteName}
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-medium">
              <MapPin className="w-3 h-3 text-[#fea619] shrink-0" />
              <span>Primary Stop: {student.primaryStop}</span>
            </div>
          </div>

          {/* Driver Scan Zone (Barcode + QR Code) */}
          <button
            onClick={onOpenScanZoom}
            className="w-full p-3 rounded-2xl bg-white text-slate-900 shadow-md text-left transition-transform active:scale-[0.99] group cursor-pointer"
            title="Click to expand scan zone for driver scanner"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-[10px] font-black tracking-wider uppercase text-slate-600">
                <QrCode className="w-3.5 h-3.5 text-slate-700" />
                <span>DRIVER SCAN ZONE</span>
              </div>
              <span className="text-[9px] font-bold text-slate-400 group-hover:text-[#0b2545] transition-colors">
                TAP TO ZOOM
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              {/* Barcode Section */}
              <div className="flex-1 flex flex-col items-center">
                <svg viewBox="0 0 200 45" className="w-full h-9">
                  {[
                    4, 8, 14, 18, 22, 26, 32, 38, 42, 46, 52, 58, 64, 70, 75, 80,
                    86, 92, 98, 104, 108, 114, 120, 126, 132, 138, 144, 150, 156,
                    162, 168, 174, 180, 186, 192, 196
                  ].map((pos, idx) => (
                    <rect
                      key={idx}
                      x={pos}
                      y="2"
                      width={idx % 4 === 0 ? 3 : idx % 2 === 0 ? 2 : 1}
                      height="38"
                      fill="#0b1c30"
                    />
                  ))}
                </svg>
                <div className="font-mono text-[10px] font-extrabold tracking-widest text-slate-700 mt-0.5">
                  {student.barcode}
                </div>
              </div>

              {/* QR Code Section */}
              <div className="w-12 h-12 bg-slate-100 rounded-lg border border-slate-300 p-1 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <rect x="2" y="2" width="12" height="12" rx="1.5" fill="#0b2545" />
                  <rect x="4" y="4" width="8" height="8" rx="1" fill="#ffffff" />
                  <rect x="6" y="6" width="4" height="4" fill="#0b2545" />

                  <rect x="26" y="2" width="12" height="12" rx="1.5" fill="#0b2545" />
                  <rect x="28" y="4" width="8" height="8" rx="1" fill="#ffffff" />
                  <rect x="30" y="6" width="4" height="4" fill="#0b2545" />

                  <rect x="2" y="26" width="12" height="12" rx="1.5" fill="#0b2545" />
                  <rect x="4" y="28" width="8" height="8" rx="1" fill="#ffffff" />
                  <rect x="6" y="30" width="4" height="4" fill="#0b2545" />

                  <rect x="16" y="4" width="4" height="4" fill="#0b2545" />
                  <rect x="20" y="8" width="4" height="4" fill="#0b2545" />
                  <rect x="16" y="18" width="8" height="8" fill="#fea619" />
                  <rect x="26" y="16" width="4" height="4" fill="#0b2545" />
                  <rect x="32" y="22" width="6" height="4" fill="#0b2545" />
                  <rect x="16" y="28" width="6" height="4" fill="#0b2545" />
                  <rect x="26" y="30" width="8" height="6" fill="#0b2545" />
                </svg>
              </div>
            </div>
          </button>

          {/* Card Validity & Authentication Footer */}
          <div className="flex items-center justify-between text-[10px] pt-1 border-t border-white/10">
            <div>
              <span className="text-slate-400 font-bold uppercase tracking-wider block text-[9px]">
                VALIDITY TERM
              </span>
              <span className="text-slate-200 font-semibold">
                {student.validityTerm}
              </span>
            </div>

            <div className="text-right">
              <span className="text-slate-400 font-bold uppercase tracking-wider block text-[9px]">
                VERIFICATION
              </span>
              <span className="text-emerald-400 font-bold inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Authenticated
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSIT LEDGER CARD */}
      <button
        onClick={onOpenLedger}
        className="w-full p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0b2545] flex items-center justify-center border border-slate-200">
            <Receipt className="w-5 h-5 text-[#0b2545]" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
              TRANSIT LEDGER
            </span>
            <span className="text-xs font-black text-[#0b1c30]">
              Transport Fee ({student.feeTerm})
            </span>
          </div>
        </div>

        <div className="px-3 py-1 rounded-full bg-[#002b1b] text-[#4edea3] text-xs font-black flex items-center gap-1">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
          Paid
        </div>
      </button>

      {/* METRICS 2-COLUMN GRID */}
      <div className="grid grid-cols-2 gap-3">
        {/* Monthly Transit */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              MONTHLY TRANSIT
            </span>
            <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-[#0b1c30] tracking-tight tabular-nums">
              {student.attendancePercentage}%
            </span>
            <span className="text-xs font-bold text-emerald-600">
              Attendance
            </span>
          </div>

          {/* Yellow Progress Bar */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full"
              style={{ width: `${student.attendancePercentage}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-500 font-medium">
            {student.verifiedRides}/{student.totalRides} rides verified
          </p>
        </div>

        {/* Latest Check-In */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              LATEST CHECK-IN
            </span>
            <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="text-2xl font-black text-[#0b1c30] tracking-tight tabular-nums">
            {student.lastCheckInTime}
          </div>

          <p className="text-xs font-semibold text-slate-700">
            {student.lastCheckInLocation}
          </p>

          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium pt-0.5">
            <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
            <span>RFID reader sync</span>
          </div>
        </div>
      </div>

      {/* PROXIMITY ALARM SETTINGS CARD */}
      <section className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mt-0.5">
              <BellRing className="w-4 h-4 text-[#0b2545]" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#0b1c30] leading-tight">
                Proximity Alarm Settings
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Tailor your morning pickup alerts
              </p>
            </div>
          </div>

          {/* Test Tone Button */}
          <button
            onClick={handleTestTone}
            disabled={isPlayingTestTone}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-[#0b2545] font-bold text-xs flex items-center gap-1.5 border border-slate-200 transition-all cursor-pointer shadow-2xs"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isPlayingTestTone ? 'text-amber-500 animate-pulse' : ''}`} />
            {isPlayingTestTone ? 'Playing...' : 'Test Tone'}
          </button>
        </div>

        {/* Setting 1: Auto Proximity Alarm Toggle */}
        <div className="flex items-center justify-between pt-1">
          <div className="space-y-0.5 max-w-[78%]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-[#0b1c30]">
                Auto Proximity Alarm
              </span>
              <span className="px-1.5 py-0.2 rounded-md bg-slate-100 text-[10px] font-bold text-slate-600 border border-slate-200">
                500m
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Triggers wake-up call when Bus #04 enters arrival radius
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={proximitySettings.autoAlarmEnabled}
              onChange={(e) =>
                setProximitySettings(prev => ({ ...prev, autoAlarmEnabled: e.target.checked }))
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0b2545]"></div>
          </label>
        </div>

        {/* Setting 2: Alert Threshold Distance Slider */}
        <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-slate-700">
              Alert Threshold Distance
            </span>
            <span className="font-black text-[#fea619] bg-[#fea619]/10 px-2 py-0.5 rounded-lg border border-[#fea619]/30">
              {proximitySettings.thresholdMeters} Meters (~{Math.round(proximitySettings.thresholdMeters / 200)} Mins)
            </span>
          </div>

          <input
            type="range"
            min="300"
            max="1500"
            step="50"
            value={proximitySettings.thresholdMeters}
            onChange={(e) =>
              setProximitySettings(prev => ({ ...prev, thresholdMeters: Number(e.target.value) }))
            }
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b2545]"
          />

          <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
            <span>300m (Close)</span>
            <span>1.5km (Early)</span>
          </div>
        </div>

        {/* Setting 3: Audio Alert Tone Dropdown */}
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-0.5 max-w-[60%]">
            <span className="text-xs font-extrabold text-[#0b1c30] block">
              Audio Alert Tone
            </span>
            <p className="text-[11px] text-slate-500 leading-tight">
              Optimized acoustic signal to cut through sleep
            </p>
          </div>

          <div className="relative">
            <select
              value={proximitySettings.audioTone}
              onChange={(e) =>
                setProximitySettings(prev => ({
                  ...prev,
                  audioTone: e.target.value as ProximitySettings['audioTone']
                }))
              }
              className="appearance-none bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-[#0b2545] py-2 pl-3 pr-8 rounded-xl focus:outline-none cursor-pointer"
            >
              <option value="Loud Chime">Loud Chime</option>
              <option value="Subtle Pulse">Subtle Pulse</option>
              <option value="Siren Alert">Siren Alert</option>
              <option value="Campus Bell">Campus Bell</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-600 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Setting 4: SMS Backup Ping Toggle */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
          <div className="space-y-0.5 max-w-[78%]">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-extrabold text-[#0b1c30]">
                SMS Backup Ping
              </span>
              <span className="px-1.5 py-0.2 rounded-md bg-emerald-50 text-[10px] font-extrabold text-emerald-700 border border-emerald-200">
                Free
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Sends automated cellular text if mobile data is offline
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={proximitySettings.smsBackupPing}
              onChange={(e) =>
                setProximitySettings(prev => ({ ...prev, smsBackupPing: e.target.checked }))
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0b2545]"></div>
          </label>
        </div>

        {/* Setting 5: Driver Readiness Broadcast Toggle */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
          <div className="space-y-0.5 max-w-[78%]">
            <span className="text-xs font-extrabold text-[#0b1c30] block">
              Driver Readiness Broadcast
            </span>
            <p className="text-[11px] text-slate-500 leading-tight">
              Signals Driver Jamil that you are already standing at stop
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={proximitySettings.driverReadinessBroadcast}
              onChange={(e) =>
                setProximitySettings(prev => ({ ...prev, driverReadinessBroadcast: e.target.checked }))
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0b2545]"></div>
          </label>
        </div>
      </section>

      {/* BOTTOM ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        {/* Button 1: "I'm At The Stop" */}
        <button
          onClick={handleImAtTheStop}
          className={`py-3.5 px-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] ${
            proximitySettings.isStudentAtStop
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30 ring-2 ring-emerald-400'
              : 'bg-[#fea619] hover:bg-amber-500 text-[#0b1c30] shadow-amber-500/20'
          }`}
        >
          {proximitySettings.isStudentAtStop ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Broadcasting: At Stop!</span>
            </>
          ) : (
            <>
              <span className="text-base">🚶</span>
              <span>I&apos;m At The Stop</span>
            </>
          )}
        </button>

        {/* Button 2: "Skip Today" */}
        <button
          onClick={() => setShowSkipModal(true)}
          className={`py-3.5 px-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
            proximitySettings.isSkippedToday
              ? 'bg-amber-100 text-amber-900 border border-amber-300'
              : 'bg-[#e5eeff] hover:bg-[#d5e3ff] text-[#0b2545]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{proximitySettings.isSkippedToday ? 'Skipped for Today' : 'Skip Today'}</span>
        </button>
      </div>

      {/* SKIP TODAY CONFIRMATION MODAL */}
      {showSkipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white p-5 text-slate-900 shadow-2xl">
            <h3 className="text-base font-extrabold text-[#0b2545]">
              Skip Morning Transit Today?
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              This notifies Driver Jamil on Route #04 that you will not board at <strong>Multan Arts Council</strong> this morning, saving transit time for the rest of the cohort.
            </p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setShowSkipModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Nevermind
              </button>
              <button
                onClick={handleConfirmSkip}
                className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md"
              >
                Yes, Skip Route #04
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
