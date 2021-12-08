import { useCallback } from "react";
import { MdOutlineEditNote, MdMedication } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { IoNotifications, IoCall } from "react-icons/io5";

type DashboardNotificationsProp = {
  startTime: string;
  title: string;
  reminderType: string;
};

export const mockNotifications: DashboardNotificationsProp[] = [
  {
    startTime: "1.00 PM",
    title: "Appointment",
    reminderType: "medication",
  },
  {
    startTime: "3.00 PM",
    title: "Call with Cally",
    reminderType: "call",
  },
];

const DashboardNotifications: React.FC<{
  notifications: DashboardNotificationsProp[];
}> = ({ notifications }) => {
  const getNavIcon = useCallback((item) => {
    switch (item) {
      case "appointment":
        return (
          <MdOutlineEditNote className="w-8 h-8 text-primary self-center" />
        );
      case "birthday":
        return <FaBirthdayCake className="w-5 h-5 text-primary self-center" />;
      case "call":
        return <IoCall className="w-8 h-8 text-primary self-center" />;
      case "medication":
        return <MdMedication className="w-8 h-8 text-primary self-center" />;
      case "other":
        return <IoNotifications className="w-5 h-5 text-primary self-center" />;
    }
  }, []);
  return (
    <div>
      {notifications.map((item, index) => (
        <div
          key={index}
          className="flex self-center md:ml-5 md:mr-5 mt-5 mb-10 text-lg rounded-tl-largeCorner rounded-tr-smallCorner rounded-br-largeCorner rounded-bl-largeCorner h-min bg-secondary px-10 pt-6 pb-8"
        >
          <p className="mr-3 self-center font-bold">{item.startTime}</p>
          <p className="mr-3 self-center">{item.title}</p>
          {getNavIcon(item.reminderType)}
        </div>
      ))}
    </div>
  );
};

export default DashboardNotifications;
