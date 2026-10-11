import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Users, 
  Clock, 
  ShieldCheck, 
  Bus, 
  Filter, 
  CheckCircle2, 
  AlertCircle,
  Activity,
  Layers,
  MapPin,
  Search
} from 'lucide-react';
import { RfidTapLog } from '../types';

export const ConsoleScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'Bus #04' | 'Gate 1' | 'Gate 2'>('all');

  const initialTaps: RfidTapLog[] = [
    {
      id: 'tap-1',
      studentName: 'Muhammad Bilal',
      rollNumber: 'USP-2024-CS-089',
      busNumber: 'Bus #04',
      location: 'Multan Arts Council Stop',
      timestamp: '07:34:12 AM',
      status: 'Priority'
    },
    {
      id: 'tap-2',
      studentName: 'Ayesha Fatima',
      rollNumber: 'USP-2023-EE-042',
      busNumber: 'Bus #02',
      location: 'Gulgasht Gol Bagh',
      timestamp: '07:33:45 AM',
      status: 'Authorized'
    },
    {
      id: 'tap-3',
      studentName: 'Hamza Tariq',
      rollNumber: 'USP-2022-BBA-110',
      busNumber: 'Bus #01',
      location: 'Multan Cantt Station',
      timestamp: '07:32:19 AM',
      status: 'Authorized'
    },
    {
      id: 'tap-4',
      studentName: 'Zainab Noor',
      rollNumber: 'USP-2024-CS-015',
      busNumber: 'Bus #04',
      location: 'Chungi No. 6',
      timestamp: '07:31:02 AM',
      status: 'Authorized'
    },
    {
      id: 'tap-5',
      studentName: 'Usman Ali',
      rollNumber: 'USP-2023-ME-067',
      busNumber: 'Bus #03',
      location: 'Shah Rukn-e-Alam Gate',
      timestamp: '07:29:50 AM',
      status: 'Authorized'
    }
  ];

  const [taps, setTaps] = useState<RfidTapLog[]>(initialTaps);

  // Simulate real-time RFID tap events arriving
  useEffect(() => {
    const names = [
      { name: 'Saad Farooq', roll: 'USP-2024-SE-033', bus: 'Bus #04', loc: 'Arts Council' },
      { name: 'Maryam Khan', roll: 'USP-2023-CS-091', bus: 'Bus #02', loc: 'Pari Chowk' },
      { name: 'Daniyal Ahmed', roll: 'USP-2022-CV-012', bus: 'Bus #05', loc: 'Mumtazabad' }
    ];

    const interval = setInterval(() => {
      const randomPerson = names[Math.floor(Math.random() * names.length)];
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      const newTap: RfidTapLog = {
        id: `tap-${Date.now()}`,
        studentName: randomPerson.name,
        rollNumber: randomPerson.roll,
        busNumber: randomPerson.bus,
        location: randomPerson.loc,
        timestamp: timeStr,
        status: 'Authorized'
      };

      setTaps(prev => [newTap, ...prev.slice(0, 9)]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const fleetBuses = [
    { id: 'B04', name: 'Route #04 (Bosan Road)', driver: 'Jamil Akhtar', speed: '42 km/h', load: '34/45', status: 'En Route', onTime: true },
    { id: 'B02', name: 'Route #02 (Gulgasht Colony)', driver: 'Riaz Hussain', speed: '38 km/h', load: '41/45', status: 'En Route', onTime: true },
    { id: 'B01', name: 'Route #01 (Multan Cantt)', driver: 'Tahir Mehmood', speed: '45 km/h', load: '39/45', status: 'En Route', onTime: true },
    { id: 'B03', name: 'Route #03 (Shah Rukn-e-Alam)', driver: 'Nasir Abbas', speed: '35 km/h', load: '44/45', status: 'En Route', onTime: true },
    { id: 'B05', name: 'Route #05 (New Multan)', driver: 'Khalid Qureshi', speed: '40 km/h', load: '28/45', status: 'En Route', onTime: true }
  ];

  const filteredTaps = taps.filter(t => {
    if (selectedFilter === 'all') return true;
    return t.busNumber === selectedFilter || t.location.includes(selectedFilter);
  });

  return (
    <div className="w-full max-w-md mx-auto pb-28 px-4 pt-3 space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
            CENTRAL TELEMATICS
          </span>
          <h2 className="text-base font-extrabold text-[#0b1c30]">
            Directorate Operations Console
          </h2>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[#0b2545] border border-blue-200 text-xs font-bold">
          <Activity className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
          <span>Realtime Stream</span>
        </div>
      </div>

      {/* OPERATIONS KPI GRID */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[9px] font-extrabold uppercase text-slate-400 block">
            ACTIVE BUSES
          </span>
          <span className="text-xl font-black text-[#0b2545] tabular-nums">
            8 / 8
          </span>
          <span className="text-[10px] text-emerald-600 font-bold block">
            100% Deployed
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[9px] font-extrabold uppercase text-slate-400 block">
            STUDENTS IN TRANSIT
          </span>
          <span className="text-xl font-black text-[#0b1c30] tabular-nums">
            312
          </span>
          <span className="text-[10px] text-slate-500 font-medium block">
            Active Seats
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[9px] font-extrabold uppercase text-slate-400 block">
            PUNCTUALITY
          </span>
          <span className="text-xl font-black text-emerald-600 tabular-nums">
            98.4%
          </span>
          <span className="text-[10px] text-emerald-700 font-bold block">
            On Schedule
          </span>
        </div>
      </div>

      {/* ACTIVE FLEET STATUS LIST */}
      <section className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black tracking-wider uppercase text-slate-600">
            MULTAN FLEET SQUAD (MORNING DISPATCH)
          </h3>
          <span className="text-[11px] text-emerald-600 font-bold">
            All Units Online
          </span>
        </div>

        <div className="space-y-2.5">
          {fleetBuses.map((bus) => (
            <div
              key={bus.id}
              className={`p-3 rounded-2xl border transition-all ${
                bus.id === 'B04'
                  ? 'bg-amber-50/70 border-amber-300'
                  : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    bus.id === 'B04' ? 'bg-amber-500 text-white' : 'bg-[#0b2545] text-white'
                  }`}>
                    {bus.id}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#0b1c30]">
                      {bus.name}
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      Driver: {bus.driver} • Speed: {bus.speed}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-slate-800">
                    {bus.load} Seats
                  </span>
                  <span className="block text-[9px] font-bold text-emerald-600 uppercase">
                    • {bus.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE RFID SWIPE TELEMETRY STREAM */}
      <section className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
            <h3 className="text-xs font-black tracking-wider uppercase text-slate-600">
              LIVE RFID SWIPE TELEMETRY
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Auto-Sync
          </span>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px]">
          {(['all', 'Bus #04', 'Gate 1', 'Gate 2'] as const).map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 rounded-full font-bold whitespace-nowrap transition-colors ${
                selectedFilter === filter
                  ? 'bg-[#0b2545] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter === 'all' ? 'All Transits' : filter}
            </button>
          ))}
        </div>

        {/* Event List */}
        <div className="space-y-2">
          {filteredTaps.map((item) => (
            <div
              key={item.id}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-extrabold text-[#0b1c30]">
                    {item.studentName}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {item.rollNumber} • {item.busNumber}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-500 block">
                  {item.timestamp}
                </span>
                <span className="text-[10px] font-semibold text-emerald-700">
                  {item.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
