import React, { useState } from 'react';
import { 
  Bus, 
  Search, 
  MapPin, 
  Clock, 
  Calendar, 
  ChevronRight, 
  Phone, 
  Users, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface RouteItem {
  id: string;
  routeNumber: string;
  name: string;
  corridor: string;
  morningTime: string;
  returnTime: string;
  driverName: string;
  driverPhone: string;
  stops: string[];
  isUserRoute?: boolean;
}

export const DirectoryScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [shiftTab, setShiftTab] = useState<'morning' | 'afternoon'>('morning');
  const [expandedRouteId, setExpandedRouteId] = useState<string | null>('R04');

  const routes: RouteItem[] = [
    {
      id: 'R04',
      routeNumber: 'Route #04',
      name: 'Bosan Road ⇄ USP Main Campus',
      corridor: 'Bosan Road & Arts Council',
      morningTime: '07:40 AM',
      returnTime: '03:45 PM',
      driverName: 'Jamil Akhtar',
      driverPhone: '+92 301 7845129',
      stops: ['Chungi No. 6', 'Multan Arts Council', 'Gol Bagh Cross', 'Bahadurpur Chowk', 'Northern Bypass', 'USP Campus Gate 1 & 2'],
      isUserRoute: true
    },
    {
      id: 'R02',
      routeNumber: 'Route #02',
      name: 'Gulgasht Colony ⇄ USP Main Campus',
      corridor: 'Gulgasht & Gol Bagh',
      morningTime: '07:25 AM',
      returnTime: '03:30 PM',
      driverName: 'Riaz Hussain',
      driverPhone: '+92 300 4521890',
      stops: ['Pari Chowk Gulgasht', 'Gulgast Commercial Centre', 'Jalilabad Chowk', 'Masoom Shah Road', 'USP Gate 1'],
      isUserRoute: false
    },
    {
      id: 'R01',
      routeNumber: 'Route #01',
      name: 'Multan Cantt ⇄ USP Main Campus',
      corridor: 'Cantt & Mall Road',
      morningTime: '07:15 AM',
      returnTime: '03:30 PM',
      driverName: 'Tahir Mehmood',
      driverPhone: '+92 302 9182345',
      stops: ['Multan Cantt Railway Station', 'Mall Road Garrison', 'Nawan Shehr Chowk', 'Chungi No. 9', 'USP Gate 2'],
      isUserRoute: false
    },
    {
      id: 'R03',
      routeNumber: 'Route #03',
      name: 'Shah Rukn-e-Alam ⇄ USP Main Campus',
      corridor: 'Shah Rukn-e-Alam & MDA',
      morningTime: '07:10 AM',
      returnTime: '03:30 PM',
      driverName: 'Nasir Abbas',
      driverPhone: '+92 304 8831920',
      stops: ['Chowk Shah Rukn-e-Alam', 'MDA Officers Colony', 'Khanewal Road Chowk', 'Kalma Chowk', 'USP Gate 1'],
      isUserRoute: false
    },
    {
      id: 'R05',
      routeNumber: 'Route #05',
      name: 'New Multan ⇄ USP Main Campus',
      corridor: 'Mumtazabad & New Multan',
      morningTime: '07:15 AM',
      returnTime: '03:30 PM',
      driverName: 'Khalid Qureshi',
      driverPhone: '+92 303 6672341',
      stops: ['New Multan Block H', 'Mumtazabad Main Bazaar', 'Double Phatak', 'Dera Adda', 'USP Gate 1'],
      isUserRoute: false
    },
    {
      id: 'R06',
      routeNumber: 'Route #06',
      name: 'Suraj Miani ⇄ USP Main Campus',
      corridor: 'Suraj Miani & Chungi 1',
      morningTime: '07:20 AM',
      returnTime: '03:30 PM',
      driverName: 'Sajid Mehmood',
      driverPhone: '+92 305 1198421',
      stops: ['Suraj Miani Mor', 'Chungi No. 1', 'Fish Market Road', 'Bosan Link Road', 'USP Gate 2'],
      isUserRoute: false
    }
  ];

  const filteredRoutes = routes.filter(r => {
    const q = searchQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.routeNumber.toLowerCase().includes(q) ||
      r.corridor.toLowerCase().includes(q) ||
      r.stops.some(s => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="w-full max-w-md mx-auto pb-28 px-4 pt-3 space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
            MULTAN TRANSIT NETWORK
          </span>
          <h2 className="text-base font-extrabold text-[#0b1c30]">
            Fleet Routes & Timetables
          </h2>
        </div>

        <div className="px-2.5 py-1 rounded-full bg-slate-100 text-[#0b2545] text-xs font-bold border border-slate-200">
          6 Active Lines
        </div>
      </div>

      {/* SEARCH INPUT */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search stops (e.g. Arts Council, Cantt, Gol Bagh)..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#0b2545]/20 focus:border-[#0b2545]"
        />
      </div>

      {/* SHIFT SELECTOR */}
      <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-200/80 text-xs font-extrabold">
        <button
          onClick={() => setShiftTab('morning')}
          className={`py-2 rounded-xl transition-all ${
            shiftTab === 'morning'
              ? 'bg-white text-[#0b2545] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Morning Pickups (07:00 – 08:00 AM)
        </button>
        <button
          onClick={() => setShiftTab('afternoon')}
          className={`py-2 rounded-xl transition-all ${
            shiftTab === 'afternoon'
              ? 'bg-white text-[#0b2545] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Campus Return (03:30 – 04:30 PM)
        </button>
      </div>

      {/* ROUTES LIST */}
      <div className="space-y-3">
        {filteredRoutes.map((route) => {
          const isExpanded = expandedRouteId === route.id;

          return (
            <div
              key={route.id}
              className={`rounded-2xl border transition-all ${
                route.isUserRoute
                  ? 'bg-white border-amber-400/90 shadow-md ring-1 ring-amber-400/50'
                  : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <div
                onClick={() => setExpandedRouteId(isExpanded ? null : route.id)}
                className="p-3.5 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      route.isUserRoute
                        ? 'bg-amber-500 text-white'
                        : 'bg-[#0b2545] text-white'
                    }`}
                  >
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#0b1c30]">
                        {route.routeNumber}
                      </span>
                      {route.isUserRoute && (
                        <span className="px-1.5 py-0.2 rounded-md bg-amber-100 text-[10px] font-black text-amber-800">
                          YOUR PASS
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-slate-700">
                      {route.corridor}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-black text-[#0b2545] block">
                    {shiftTab === 'morning' ? route.morningTime : route.returnTime}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    {route.stops.length} Stops ▾
                  </span>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-3.5 pb-4 pt-1 border-t border-slate-100 space-y-3 text-xs animate-fade-in">
                  <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Assigned Driver
                      </span>
                      <span className="font-extrabold text-[#0b1c30]">
                        {route.driverName}
                      </span>
                    </div>
                    <a
                      href={`tel:${route.driverPhone}`}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200 flex items-center gap-1 hover:bg-emerald-100"
                    >
                      <Phone className="w-3 h-3" /> Call
                    </a>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-black text-slate-400 block mb-1.5">
                      Designated Stops & Boarding Sequence:
                    </span>
                    <div className="space-y-1.5 pl-2 border-l-2 border-amber-400">
                      {route.stops.map((stop, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          <span>{stop}</span>
                          {route.isUserRoute && stop.includes('Arts Council') && (
                            <span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded-full">
                              Your Pickup
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
