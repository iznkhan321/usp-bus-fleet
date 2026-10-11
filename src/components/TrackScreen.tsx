import React, { useState, useEffect } from 'react';
import { 
  Bus, 
  MapPin, 
  Navigation, 
  Phone, 
  MessageSquare, 
  AlertTriangle, 
  ShieldCheck, 
  Users, 
  Gauge, 
  Clock, 
  Radio, 
  Check, 
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { StudentProfile, BusTelemetry, RouteStop, ProximitySettings } from '../types';

interface TrackScreenProps {
  student: StudentProfile;
  telemetry: BusTelemetry;
  proximitySettings: ProximitySettings;
  onOpenDriverModal: () => void;
  onOpenSosModal: () => void;
}

export const TrackScreen: React.FC<TrackScreenProps> = ({
  student,
  telemetry,
  proximitySettings,
  onOpenDriverModal,
  onOpenSosModal
}) => {
  // Live simulated telemetry ticks
  const [speed, setSpeed] = useState(42);
  const [distanceMeters, setDistanceMeters] = useState(740);
  const [etaSeconds, setEtaSeconds] = useState(210);
  const [busProgressPct, setBusProgressPct] = useState(45); // 0 to 100% along the route

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(prev => Math.floor(38 + Math.random() * 8));
      setDistanceMeters(prev => Math.max(120, prev - 15));
      setEtaSeconds(prev => Math.max(25, prev - 4));
      setBusProgressPct(prev => (prev >= 95 ? 20 : prev + 0.8));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const routeStops: RouteStop[] = [
    {
      id: 's1',
      name: 'Chungi No. 6 (Bosan Road)',
      estimatedTime: '07:28 AM',
      status: 'passed',
      distanceFromStartKm: 0.0,
      latitude: 30.201,
      longitude: 71.458
    },
    {
      id: 's2',
      name: 'Multan Arts Council (Your Stop)',
      estimatedTime: '07:35 AM',
      status: 'current',
      distanceFromStartKm: 2.1,
      latitude: 30.215,
      longitude: 71.465
    },
    {
      id: 's3',
      name: 'Gol Bagh & Gulgasht Cross',
      estimatedTime: '07:42 AM',
      status: 'upcoming',
      distanceFromStartKm: 3.9,
      latitude: 30.229,
      longitude: 71.472
    },
    {
      id: 's4',
      name: 'Bahadurpur Chowk',
      estimatedTime: '07:49 AM',
      status: 'upcoming',
      distanceFromStartKm: 5.6,
      latitude: 30.245,
      longitude: 71.482
    },
    {
      id: 's5',
      name: 'USP Main Campus Gate 1 & 2',
      estimatedTime: '07:58 AM',
      status: 'upcoming',
      distanceFromStartKm: 8.4,
      latitude: 30.271,
      longitude: 71.503
    }
  ];

  const isWithinProximity = distanceMeters <= proximitySettings.thresholdMeters;

  return (
    <div className="w-full max-w-md mx-auto pb-28 px-4 pt-3 space-y-4">
      {/* HEADER: Live GPS Status & Route Name */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
            LIVE FLEET TELEMATICS
          </span>
          <h2 className="text-base font-extrabold text-[#0b1c30]">
            Route #04 Bosan Road
          </h2>
        </div>

        {/* Live Tracking Pill (From Design Spec) */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] text-xs font-extrabold shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          <span>LIVE GPS • BUS #04</span>
        </div>
      </div>

      {/* PROXIMITY ALERT ACTIVE BANNER */}
      {isWithinProximity && proximitySettings.autoAlarmEnabled && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-400 text-amber-950 flex items-center justify-between shadow-sm animate-pulse-subtle">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
              <Radio className="w-4 h-4 animate-spin" />
            </div>
            <div>
              <p className="text-xs font-black">PROXIMITY ALARM ENGAGED</p>
              <p className="text-[11px] text-amber-900 font-medium">
                Bus #04 is within your {proximitySettings.thresholdMeters}m perimeter!
              </p>
            </div>
          </div>
          <span className="text-xs font-extrabold font-mono text-amber-900">
            ~{Math.ceil(etaSeconds / 60)} MIN
          </span>
        </div>
      )}

      {/* INTERACTIVE VECTOR ROUTE MAP OVERLAY */}
      <div className="relative w-full h-64 rounded-3xl overflow-hidden border border-slate-300 shadow-md bg-[#eaf0f8]">
        {/* SVG Map of Multan Route */}
        <svg viewBox="0 0 360 256" className="w-full h-full">
          {/* Subtle street grid lines */}
          <line x1="0" y1="50" x2="360" y2="50" stroke="#d5dfed" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="0" y1="120" x2="360" y2="120" stroke="#d5dfed" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="0" y1="190" x2="360" y2="190" stroke="#d5dfed" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="80" y1="0" x2="80" y2="256" stroke="#d5dfed" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="200" y1="0" x2="200" y2="256" stroke="#d5dfed" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="300" y1="0" x2="300" y2="256" stroke="#d5dfed" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Area Labels */}
          <text x="30" y="235" fill="#8898aa" fontSize="9" fontWeight="bold">CHUNGI #6</text>
          <text x="110" y="35" fill="#8898aa" fontSize="9" fontWeight="bold">GULGASHT</text>
          <text x="270" y="45" fill="#0b2545" fontSize="10" fontWeight="bold">USP CAMPUS</text>

          {/* Primary Route Path (Bosan Road corridor) */}
          <path
            d="M 40,220 C 70,180 110,170 140,130 C 170,90 220,70 290,50"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 40,220 C 70,180 110,170 140,130 C 170,90 220,70 290,50"
            fill="none"
            stroke="#0b2545"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Proximity Alarm Radius around Multan Arts Council */}
          <circle
            cx="140"
            cy="130"
            r="44"
            fill="#fea619"
            fillOpacity="0.15"
            stroke="#fea619"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />

          {/* Stops along the path */}
          {/* Stop 1: Chungi 6 */}
          <circle cx="40" cy="220" r="5" fill="#0b2545" stroke="#ffffff" strokeWidth="2" />
          {/* Stop 2: Multan Arts Council (Student's stop) */}
          <circle cx="140" cy="130" r="7" fill="#fea619" stroke="#ffffff" strokeWidth="2" />
          <circle cx="140" cy="130" r="3" fill="#0b1c30" />
          {/* Stop 3: Gol Bagh */}
          <circle cx="185" cy="100" r="4" fill="#64748b" stroke="#ffffff" strokeWidth="1.5" />
          {/* Stop 4: Bahadurpur */}
          <circle cx="235" cy="74" r="4" fill="#64748b" stroke="#ffffff" strokeWidth="1.5" />
          {/* Stop 5: USP Main Campus */}
          <circle cx="290" cy="50" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />

          {/* LIVE MOVING BUS INDICATOR */}
          {/* Position interpolated between Stop 1 and Stop 2 */}
          <g transform={`translate(${40 + (140 - 40) * (busProgressPct / 100)}, ${220 + (130 - 220) * (busProgressPct / 100)})`}>
            {/* Pulsing Beacon */}
            <circle cx="0" cy="0" r="14" fill="#fea619" fillOpacity="0.3" className="animate-ping" />
            <circle cx="0" cy="0" r="9" fill="#0b2545" stroke="#fea619" strokeWidth="2.5" />
            <path d="M -3,-3 L 4,0 L -3,3 Z" fill="#fea619" />
          </g>

          {/* User Location Pin Label */}
          <g transform="translate(140, 112)">
            <rect x="-48" y="-18" width="96" height="16" rx="4" fill="#0b2545" />
            <text x="0" y="-7" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
              You • Arts Council
            </text>
          </g>
        </svg>

        {/* Floating live badge in map */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-xl shadow-xs border border-slate-200 flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <Navigation className="w-3.5 h-3.5 text-amber-500" />
          <span>Bosan Road Corridor</span>
        </div>

        {/* Map speed overlay badge */}
        <div className="absolute bottom-3 left-3 bg-[#0b2545]/90 backdrop-blur-sm text-white px-3 py-1 rounded-xl shadow-md flex items-center gap-2 text-xs">
          <Gauge className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-mono font-bold text-amber-300">{speed} km/h</span>
          <span className="text-[10px] text-slate-300">GPS Ping: Active</span>
        </div>
      </div>

      {/* TELEMATICS METRIC STRIP (4-Column Density) */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-3 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            EST. ARRIVAL
          </span>
          <span className="text-xl font-black text-[#0b1c30] tracking-tight tabular-nums font-mono">
            {Math.floor(etaSeconds / 60)}m {etaSeconds % 60}s
          </span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
            On Schedule
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            DISTANCE
          </span>
          <span className="text-xl font-black text-[#fea619] tracking-tight tabular-nums font-mono">
            {distanceMeters}m
          </span>
          <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
            to Arts Council
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            SEAT LOAD
          </span>
          <span className="text-xl font-black text-[#0b1c30] tracking-tight tabular-nums">
            {telemetry.currentOccupancy}/{telemetry.capacityTotal}
          </span>
          <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
            11 Seats Free
          </span>
        </div>
      </div>

      {/* DRIVER & BUS TELEMATICS CARD (From Design Spec) */}
      <section className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-slate-200 shadow-xs">
            <img
              src={telemetry.driverPhotoUrl}
              alt={telemetry.driverName}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-black text-[#0b1c30]">
                Driver {telemetry.driverName}
              </h3>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded-md">
                ★ 4.9
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono font-bold">
              {telemetry.licensePlate} • Bus #04
            </p>
          </div>
        </div>

        {/* CTA Group: Click-to-call & SMS buttons */}
        <div className="flex items-center gap-2">
          <a
            href={`tel:${telemetry.driverPhone}`}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200 flex items-center justify-center text-slate-700 transition-colors shadow-2xs"
            title="Call Driver handsfree"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={onOpenDriverModal}
            className="w-9 h-9 rounded-full bg-[#0b2545] hover:bg-[#133e87] text-white flex items-center justify-center transition-colors shadow-sm"
            title="Message Driver or Dispatch"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ROUTE PROGRESS STEPPER (From Design Spec) */}
      <section className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black tracking-wider uppercase text-slate-500">
            ROUTE PROGRESS & STOPS
          </h3>
          <span className="text-[11px] text-slate-500 font-semibold">
            Bosan Road Morning Run
          </span>
        </div>

        <div className="relative pl-6 space-y-4 pt-1">
          {routeStops.map((stop, idx) => {
            const isLast = idx === routeStops.length - 1;
            const isPassed = stop.status === 'passed';
            const isCurrent = stop.status === 'current';

            return (
              <div key={stop.id} className="relative flex items-start justify-between">
                {/* Connecting Line */}
                {!isLast && (
                  <div
                    className={`absolute -left-4 top-3 w-0.5 h-10 ${
                      isPassed ? 'bg-[#0b2545]' : 'bg-slate-200'
                    }`}
                  />
                )}

                {/* Node Indicator */}
                <div className="absolute -left-[22px] top-1">
                  {isPassed ? (
                    <div className="w-5 h-5 rounded-full bg-[#0b2545] text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-5 h-5 rounded-full border-2 border-[#fea619] bg-white flex items-center justify-center shadow-xs">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#fea619] animate-ping" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 bg-white ml-0.5" />
                  )}
                </div>

                {/* Stop Info */}
                <div className="pr-2">
                  <p
                    className={`text-xs font-bold leading-tight ${
                      isCurrent
                        ? 'text-[#0b2545] font-extrabold'
                        : isPassed
                        ? 'text-slate-800'
                        : 'text-slate-400'
                    }`}
                  >
                    {stop.name}
                  </p>
                  {isCurrent && (
                    <span className="inline-block mt-0.5 text-[10px] font-extrabold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded-md">
                      Arriving in ~{Math.ceil(etaSeconds / 60)} mins
                    </span>
                  )}
                </div>

                {/* Stop Time */}
                <span
                  className={`text-[11px] font-mono font-semibold shrink-0 ${
                    isCurrent ? 'text-amber-600 font-bold' : 'text-slate-400'
                  }`}
                >
                  {stop.estimatedTime}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* EMERGENCY SOS TRIGGER BUTTON */}
      <button
        onClick={onOpenSosModal}
        className="w-full py-3 px-4 rounded-2xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors active:scale-[0.99]"
      >
        <AlertTriangle className="w-4 h-4 text-red-600" />
        <span>Emergency SOS & Campus Control Hotline</span>
      </button>
    </div>
  );
};
