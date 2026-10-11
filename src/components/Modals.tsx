import React from 'react';
import { UspLogo } from './UspLogo';
import { 
  X, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  FileText, 
  AlertTriangle, 
  QrCode, 
  CheckCircle2,
  Calendar,
  CreditCard,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { StudentProfile, BusTelemetry } from '../types';

interface SealModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SealModal: React.FC<SealModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#14181f] border border-amber-500/30 p-6 text-white text-center shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center">
          <div className="my-3">
            <UspLogo size="xl" />
          </div>

          <h3 className="text-xl font-bold text-amber-300 mt-2">
            University of Southern Punjab
          </h3>
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mt-1">
            Multan, Pakistan • Est. 2010
          </p>

          <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed text-left">
            <p className="font-arabic text-center text-sm font-semibold text-amber-200 mb-1">
              (اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ (القرآن
            </p>
            <p className="text-[11px] text-slate-400 text-center">
              Official Seal of Institutional Accreditation & Directorate of Fleet Operations
            </p>
          </div>

          <button
            onClick={onClose}
            className="mt-5 w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-amber-500/20"
          >
            Close Crest Preview
          </button>
        </div>
      </div>
    </div>
  );
};

interface ScanZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
}

export const ScanZoomModal: React.FC<ScanZoomModalProps> = ({ isOpen, onClose, student }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 text-slate-900 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" /> Driver High-Speed Scan
          </div>
          <h3 className="text-lg font-extrabold text-[#0b2545] mt-1.5">
            {student.name}
          </h3>
          <p className="text-xs text-slate-500 font-mono font-semibold">
            {student.rollNumber} • {student.assignedRouteNumber}
          </p>
        </div>

        {/* High contrast barcode for physical scanner */}
        <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-center py-2">
            {/* Detailed high-contrast SVG barcode */}
            <svg viewBox="0 0 280 60" className="w-full h-16">
              <rect x="0" y="0" width="280" height="60" fill="#ffffff" />
              {/* Barcode lines */}
              {[
                4, 9, 15, 20, 24, 28, 35, 42, 45, 50, 56, 62, 68, 75, 80, 85, 92, 98,
                105, 110, 114, 120, 128, 134, 140, 148, 154, 160, 166, 172, 180, 186,
                192, 198, 205, 210, 218, 224, 230, 238, 244, 252, 260, 268, 274
              ].map((pos, i) => (
                <rect
                  key={i}
                  x={pos}
                  y="4"
                  width={(i % 3 === 0 ? 3 : (i % 2 === 0 ? 2 : 1.2))}
                  height="46"
                  fill="#0b1c30"
                />
              ))}
            </svg>
          </div>
          <div className="font-mono text-xs tracking-widest font-extrabold text-slate-800 mt-1">
            {student.barcode}
          </div>

          <div className="w-full border-t border-slate-200 my-4" />

          {/* QR Code Container */}
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 p-2 bg-white rounded-xl border border-slate-300 shadow-sm flex items-center justify-center relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* QR Code Finder Patterns */}
                <rect x="5" y="5" width="26" height="26" rx="3" fill="#0b2545" />
                <rect x="9" y="9" width="18" height="18" rx="2" fill="#ffffff" />
                <rect x="13" y="13" width="10" height="10" rx="1" fill="#0b2545" />

                <rect x="69" y="5" width="26" height="26" rx="3" fill="#0b2545" />
                <rect x="73" y="9" width="18" height="18" rx="2" fill="#ffffff" />
                <rect x="77" y="13" width="10" height="10" rx="1" fill="#0b2545" />

                <rect x="5" y="69" width="26" height="26" rx="3" fill="#0b2545" />
                <rect x="9" y="73" width="18" height="18" rx="2" fill="#ffffff" />
                <rect x="13" y="77" width="10" height="10" rx="1" fill="#0b2545" />

                {/* Simulated QR Payload matrix */}
                <rect x="36" y="8" width="5" height="5" fill="#0b2545" />
                <rect x="46" y="8" width="8" height="4" fill="#0b2545" />
                <rect x="58" y="10" width="5" height="5" fill="#0b2545" />
                <rect x="36" y="18" width="6" height="6" fill="#0b2545" />
                <rect x="48" y="20" width="14" height="4" fill="#0b2545" />
                <rect x="8" y="38" width="8" height="5" fill="#0b2545" />
                <rect x="22" y="42" width="6" height="4" fill="#0b2545" />
                <rect x="35" y="35" width="30" height="30" rx="4" fill="#fea619" opacity="0.2" />
                <rect x="42" y="42" width="16" height="16" rx="3" fill="#0b2545" />
                {/* USP crest mark center */}
                <circle cx="50" cy="50" r="5" fill="#fea619" />
                <rect x="70" y="38" width="6" height="6" fill="#0b2545" />
                <rect x="82" y="44" width="8" height="5" fill="#0b2545" />
                <rect x="38" y="72" width="10" height="4" fill="#0b2545" />
                <rect x="54" y="68" width="8" height="8" fill="#0b2545" />
                <rect x="68" y="74" width="12" height="5" fill="#0b2545" />
                <rect x="84" y="82" width="8" height="6" fill="#0b2545" />
                <rect x="44" y="84" width="16" height="4" fill="#0b2545" />
              </svg>
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-2">
              Hold within 15cm of driver mobile terminal
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2.5 rounded-xl bg-[#0b2545] hover:bg-[#133e87] text-white font-bold text-sm transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};

interface LedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
}

export const LedgerModal: React.FC<LedgerModalProps> = ({ isOpen, onClose, student }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 text-slate-900 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#0b2545]">
              Transit Fee Ledger
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              University Treasury Department
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500">Challan Reference</span>
            <span className="font-mono font-bold text-slate-800">{student.feeChallanNumber}</span>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500">Billing Semester</span>
            <span className="font-semibold text-slate-800">{student.feeTerm}</span>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500">Transit Route</span>
            <span className="font-semibold text-slate-800">{student.assignedRouteNumber}</span>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500">Amount Paid</span>
            <span className="font-extrabold text-base text-slate-900">{student.feeAmount}</span>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500">Payment Date</span>
            <span className="font-medium text-slate-800">{student.feePaidDate}</span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-500">Verification</span>
            <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> Cleared by Bank
            </span>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              alert('Downloading official University e-Challan receipt (PDF)...');
            }}
            className="flex-1 py-2.5 rounded-xl bg-[#0b2545] hover:bg-[#133e87] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" /> Get Challan
          </button>
        </div>
      </div>
    </div>
  );
};

interface DriverContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  telemetry: BusTelemetry;
}

export const DriverContactModal: React.FC<DriverContactModalProps> = ({ isOpen, onClose, telemetry }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 text-slate-900 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 rounded-full mx-auto relative border-2 border-amber-400 overflow-hidden shadow-md">
            <img
              src={telemetry.driverPhotoUrl}
              alt={telemetry.driverName}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          <h3 className="text-lg font-extrabold text-[#0b2545] mt-2">
            Driver {telemetry.driverName}
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Assigned to {telemetry.routeNumber} ({telemetry.licensePlate})
          </p>
        </div>

        <div className="my-4 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 leading-relaxed text-center">
          Notice: Bus is currently in transit along Bosan Road. Calls are routed through hands-free cabin audio for driver safety.
        </div>

        <div className="space-y-2.5">
          <a
            href={`tel:${telemetry.driverPhone}`}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-colors"
          >
            <Phone className="w-4 h-4" /> Call Driver ({telemetry.driverPhone})
          </a>
          <button
            onClick={() => {
              alert(`Pre-formatted SMS sent to Driver ${telemetry.driverName}: "Student Muhammad Bilal is waiting at Multan Arts Council stop."`);
              onClose();
            }}
            className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <MessageSquare className="w-4 h-4" /> Send Instant Stop Broadcast
          </button>
        </div>
      </div>
    </div>
  );
};

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 text-slate-900 shadow-2xl border-2 border-red-500">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 mx-auto flex items-center justify-center mb-3">
            <AlertTriangle className="w-8 h-8 animate-pulse" />
          </div>
          <h3 className="text-xl font-extrabold text-red-600">
            USP Emergency SOS
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Directorate of Campus Security & Emergency Transit Dispatch
          </p>
        </div>

        <div className="my-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 leading-normal text-left">
          Activating SOS broadcasts your live GPS coordinates, student roll ID, and bus route #04 to both the bus driver and campus control room.
        </div>

        <div className="space-y-2">
          <button
            onClick={() => {
              alert('EMERGENCY BROADCAST TRANSMITTED: Campus Security dispatch unit notified. Live GPS sharing engaged.');
              onClose();
            }}
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-red-600/30 transition-colors"
          >
            CONFIRM SOS DISPATCH
          </button>
          <a
            href="tel:+923001234567"
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" /> Call Campus Police Hotline
          </a>
        </div>
      </div>
    </div>
  );
};
