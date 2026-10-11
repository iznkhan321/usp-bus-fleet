/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Navigation, 
  LayoutGrid, 
  Contact, 
  CreditCard, 
  MapPin, 
  FolderKanban, 
  IdCard,
  Radio
} from 'lucide-react';
import { StudentProfile, BusTelemetry, ProximitySettings } from './types';
import { StudentPassScreen } from './components/StudentPassScreen';
import { TrackScreen } from './components/TrackScreen';
import { ConsoleScreen } from './components/ConsoleScreen';
import { DirectoryScreen } from './components/DirectoryScreen';
import { 
  ScanZoomModal, 
  SealModal, 
  LedgerModal, 
  DriverContactModal, 
  SosModal 
} from './components/Modals';

export default function App() {
  const [activeTab, setActiveTab] = useState<'track' | 'console' | 'directory' | 'pass'>('pass');

  // Modal states
  const [isScanZoomOpen, setIsScanZoomOpen] = useState(false);
  const [isSealOpen, setIsSealOpen] = useState(false);
  const [isLedgerOpen, setIsLedgerOpen] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [isSosOpen, setIsSosOpen] = useState(false);

  // Student Profile matching Image 6
  const [student, setStudent] = useState<StudentProfile>({
    name: 'Muhammad Bilal',
    rollNumber: 'USP-2024-CS-089',
    semester: 'Sem 3',
    department: 'Dept of Computer Science & IT',
    assignedRouteNumber: 'Route #04',
    assignedRouteName: 'Route #04 (Bosan Road ⇄ USP Main Campus)',
    primaryStop: 'Multan Arts Council',
    seatType: 'PRIORITY SEAT',
    barcode: '8841-0921-USP',
    validityTerm: 'Fall 2024 – Spring 2025',
    verificationStatus: 'Authenticated',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    attendancePercentage: 96,
    verifiedRides: 22,
    totalRides: 23,
    lastCheckInTime: '8:12 AM',
    lastCheckInLocation: 'Yesterday at Gate 2',
    feeStatus: 'Paid',
    feeTerm: 'Semester 3',
    feeChallanNumber: 'CH-2024-USP-9921',
    feeAmount: 'PKR 32,500',
    feePaidDate: '12 Sep 2024'
  });

  // Bus Telemetry matching Image 6 & specs
  const [telemetry, setTelemetry] = useState<BusTelemetry>({
    busId: 'USP-FLEET-04',
    routeNumber: 'Route #04',
    routeName: 'Bosan Road Corridor',
    driverName: 'Jamil Akhtar',
    driverPhone: '+92 301 7845129',
    driverPhotoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    licensePlate: 'MN-2021-USP',
    speedKmh: 42,
    capacityTotal: 45,
    currentOccupancy: 34,
    nextStopName: 'Multan Arts Council',
    distanceToStudentMeters: 740,
    etaSeconds: 210,
    dispatchStatus: 'ON SCHEDULE',
    scheduledDeparture: '07:40 AM',
    rfidActive: true
  });

  // Proximity Alarm Settings matching Image 6
  const [proximitySettings, setProximitySettings] = useState<ProximitySettings>({
    autoAlarmEnabled: true,
    thresholdMeters: 800,
    audioTone: 'Loud Chime',
    smsBackupPing: true,
    driverReadinessBroadcast: true,
    isStudentAtStop: false,
    isSkippedToday: false
  });

  return (
    <div className="min-h-screen bg-[#f0f4f9] text-[#0b1c30] flex flex-col justify-between selection:bg-amber-200">
      {/* Active Screen Content */}
      <main className="flex-1 w-full">
        {activeTab === 'pass' && (
          <StudentPassScreen
            student={student}
            telemetry={telemetry}
            proximitySettings={proximitySettings}
            setProximitySettings={setProximitySettings}
            onOpenScanZoom={() => setIsScanZoomOpen(true)}
            onOpenLedger={() => setIsLedgerOpen(true)}
            onOpenSealModal={() => setIsSealOpen(true)}
            onOpenDriverModal={() => setIsDriverModalOpen(true)}
            onSwitchToTrack={() => setActiveTab('track')}
          />
        )}

        {activeTab === 'track' && (
          <TrackScreen
            student={student}
            telemetry={telemetry}
            proximitySettings={proximitySettings}
            onOpenDriverModal={() => setIsDriverModalOpen(true)}
            onOpenSosModal={() => setIsSosOpen(true)}
          />
        )}

        {activeTab === 'console' && (
          <ConsoleScreen />
        )}

        {activeTab === 'directory' && (
          <DirectoryScreen />
        )}
      </main>

      {/* FIXED BOTTOM NAVIGATION BAR (Matching Image 6) */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-6 shadow-lg max-w-md mx-auto">
        <div className="flex items-center justify-between">
          {/* Tab 1: Track */}
          <button
            onClick={() => setActiveTab('track')}
            className={`flex flex-col items-center gap-1 py-1 transition-all cursor-pointer ${
              activeTab === 'track'
                ? 'text-[#0b2545] font-extrabold'
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            }`}
          >
            <div className={`p-1 rounded-xl transition-colors ${activeTab === 'track' ? 'bg-[#0b2545]/10' : ''}`}>
              <MapPin className={`w-5 h-5 ${activeTab === 'track' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            </div>
            <span className="text-[10px] tracking-tight">Track</span>
          </button>

          {/* Tab 2: Console */}
          <button
            onClick={() => setActiveTab('console')}
            className={`flex flex-col items-center gap-1 py-1 transition-all cursor-pointer ${
              activeTab === 'console'
                ? 'text-[#0b2545] font-extrabold'
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            }`}
          >
            <div className={`p-1 rounded-xl transition-colors ${activeTab === 'console' ? 'bg-[#0b2545]/10' : ''}`}>
              <LayoutGrid className={`w-5 h-5 ${activeTab === 'console' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            </div>
            <span className="text-[10px] tracking-tight">Console</span>
          </button>

          {/* Tab 3: Directory */}
          <button
            onClick={() => setActiveTab('directory')}
            className={`flex flex-col items-center gap-1 py-1 transition-all cursor-pointer ${
              activeTab === 'directory'
                ? 'text-[#0b2545] font-extrabold'
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            }`}
          >
            <div className={`p-1 rounded-xl transition-colors ${activeTab === 'directory' ? 'bg-[#0b2545]/10' : ''}`}>
              <Contact className={`w-5 h-5 ${activeTab === 'directory' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            </div>
            <span className="text-[10px] tracking-tight">Directory</span>
          </button>

          {/* Tab 4: Bus Pass (Active Default) */}
          <button
            onClick={() => setActiveTab('pass')}
            className={`flex flex-col items-center gap-1 py-1 transition-all cursor-pointer ${
              activeTab === 'pass'
                ? 'text-[#0b2545] font-extrabold'
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            }`}
          >
            <div className={`p-1 rounded-xl transition-colors ${activeTab === 'pass' ? 'bg-[#0b2545]/10' : ''}`}>
              <IdCard className={`w-5 h-5 ${activeTab === 'pass' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            </div>
            <span className="text-[10px] tracking-tight">Bus Pass</span>
          </button>
        </div>
      </nav>

      {/* MODALS */}
      <ScanZoomModal
        isOpen={isScanZoomOpen}
        onClose={() => setIsScanZoomOpen(false)}
        student={student}
      />

      <SealModal
        isOpen={isSealOpen}
        onClose={() => setIsSealOpen(false)}
      />

      <LedgerModal
        isOpen={isLedgerOpen}
        onClose={() => setIsLedgerOpen(false)}
        student={student}
      />

      <DriverContactModal
        isOpen={isDriverModalOpen}
        onClose={() => setIsDriverModalOpen(false)}
        telemetry={telemetry}
      />

      <SosModal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
      />
    </div>
  );
}
