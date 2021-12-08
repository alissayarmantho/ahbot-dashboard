export type MusicDurationData = {
  musicTotalMin: number;
};

export type GalleryDurationData = {
  galleryTotalMin: number;
};

export type CallDurationData = {
  videocallDurationMinutes: number;
  voiceCallDurationMinutes: number;
};

export type CallNumberData = {
  videocallNum: number;
  voicecallNum: number;
};

export type AppointmentStatsData = {
  completedAppointment: number;
  totalAppointments: number;
};

export type MedicationStatsData = {
  completedMedication: number;
  totalMeds: number;
};

export type CallLog = {
  _id: string;
  callType: string;
  ownerId: string;
  startTime: string;
  endTime: string;
  totalMin: number;
};

export type MediaLog = {
  _id: string;
  mediaType: string;
  ownerId: string;
  startTime: string;
  endTime: string;
  totalMin: number;
};
