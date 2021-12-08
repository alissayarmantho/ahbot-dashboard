export type Reminder = {
  title: string;
  description: string;
  elderId: string;
  reminderType: ReminderTypes;
  status: string;
  isRecurring: boolean;
  recurringCode: string;
  recurringType: string;
  _id: string;
  eventStartTime: string;
  eventEndTime: string;
  startDate: string;
  endDate: string;
};
export enum ReminderTypes {
  APPOINTMENT = "appointment",
  BIRTHDAY = "birthday",
  CALL = "call",
  MEDICATION = "medication",
  OTHER = "other",
}
