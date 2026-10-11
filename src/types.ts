export interface StudentProfile {
  name: string;
  rollNumber: string;
  semester: string;
  department: string;
  assignedRouteNumber: string;
  assignedRouteName: string;
  primaryStop: string;
  seatType: string;
  barcode: string;
  validityTerm: string;
  verificationStatus: string;
  photoUrl: string;
  attendancePercentage: number;
  verifiedRides: number;
  totalRides: number;
  lastCheckInTime: string;
  lastCheckInLocation: string;
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
  feeTerm: string;
  feeChallanNumber: string;
  feeAmount: string;
  feePaidDate: string;
}

export interface ProximitySettings {
  autoAlarmEnabled: boolean;
  thresholdMeters: number;
  audioTone: 'Loud Chime' | 'Subtle Pulse' | 'Siren Alert' | 'Campus Bell';
  smsBackupPing: boolean;
  driverReadinessBroadcast: boolean;
  isStudentAtStop: boolean;
  isSkippedToday: boolean;
}

export interface RouteStop {
  id: string;
  name: string;
  estimatedTime: string;
  status: 'passed' | 'current' | 'upcoming';
  distanceFromStartKm: number;
  latitude: number;
  longitude: number;
}

export interface BusTelemetry {
  busId: string;
  routeNumber: string;
  routeName: string;
  driverName: string;
  driverPhone: string;
  driverPhotoUrl: string;
  licensePlate: string;
  speedKmh: number;
  capacityTotal: number;
  currentOccupancy: number;
  nextStopName: string;
  distanceToStudentMeters: number;
  etaSeconds: number;
  dispatchStatus: 'ON SCHEDULE' | 'SLIGHT DELAY' | 'DISPATCHING';
  scheduledDeparture: string;
  rfidActive: boolean;
}

export interface RfidTapLog {
  id: string;
  studentName: string;
  rollNumber: string;
  busNumber: string;
  location: string;
  timestamp: string;
  status: 'Authorized' | 'Priority' | 'Flagged';
}
