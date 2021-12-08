import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import TabBar from "../../components/TabBar/TabBar";
import { familyCaregiverMenu } from "../../constants";
import { getToken, getUser } from "../../utils/common";
import FadedSun from "../../assets/fadedsun.png";
import "./Home.css";
import classNames from "classnames";
import StatsOverview from "../../components/StatsOverview/StatsOverview";
import { apiHandler } from "../../api/axios";
import EmptyNotifications from "../../components/Notifications/EmptyNotifications";
import {
  CallDurationData,
  GalleryDurationData,
  MusicDurationData,
} from "../../types/analytics";
import { Reminder } from "../../types/reminder";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import DashboardNotifications from "../../components/Notifications/DashboardNotifications";
import BlueLoadingSpinner from "../../components/LoadingSpinner/BlueLoadingSpinner";

type NotificationDataResponse = {
  notifications: Reminder[];
};

// for now elderId will be hardcoded due to the user saved unable to be accessed like a JSON object
const getMusicDuration = async (elderId: string) => {
  const response = await apiHandler(
    `/analytic/music-activity-duration?elderId=${elderId}`
  );
  const musicDurationData = response.data.data as MusicDurationData;

  return musicDurationData.musicTotalMin;
};

const getGalleryDuration = async (elderId: string) => {
  const response = await apiHandler(
    `/analytic/gallery-activity-duration?elderId=${elderId}`
  );
  const galleryDurationData = response.data.data as GalleryDurationData;

  return galleryDurationData.galleryTotalMin;
};

// for now it will just get voice call duration and will return a number instead of 2 numbers
const getCallDuration = async (elderId: string) => {
  const response = await apiHandler(
    `/analytic/call-duration-stats?elderId=${elderId}`
  );
  const callDurationData = response.data.data as CallDurationData;

  return callDurationData.voiceCallDurationMinutes;
};

const getNotificationsForToday = async (elderId: string) => {
  const response = await apiHandler(
    `/reminder/notifications?elderId=${elderId}`
  );
  const notificationsData = response.data.data as NotificationDataResponse;

  return notificationsData.notifications;
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const token = getToken();
  const user = getUser();
  const [isLoading, setIsLoading] = useState(false);
  const [galleryDuration, setGalleryDuration] = useState(0);
  const [callDuration, setCallDuration] = useState(0);
  const [musicDuration, setMusicDuration] = useState(0);
  const [notifications, setNotifications] = useState<Reminder[]>([]);
  const setMusicDurationToState = async () => {
    setMusicDuration(await getMusicDuration("61547e49adbc3d0023ab129c"));
  };
  const setGalleryDurationToState = async () => {
    setGalleryDuration(await getGalleryDuration("61547e49adbc3d0023ab129c"));
  };
  const setCallDurationToState = async () => {
    setCallDuration(await getCallDuration("61547e49adbc3d0023ab129c"));
  };
  const setNotificationsToState = async () => {
    setNotifications(
      await getNotificationsForToday("61547e49adbc3d0023ab129c")
    );
  };
  dayjs.extend(utc);
  useEffect(() => {
    if (token == null || user == null) {
      // TODO: Check for account type
      // Currently only passing on family caregiver menu instead of the other type of caregiver (the one with 3 menus only)
      navigate("/");
    }
  }, [token, user, navigate]);
  useEffect(() => {
    // TODO: Design a better api call abstraction than crowding everything in the page itself, this isLoading apparently does nothing.., fix this too
    setIsLoading(true);
    try {
      void setMusicDurationToState();
      void setCallDurationToState();
      void setGalleryDurationToState();
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    // TODO: Design a better api call abstraction than crowding everything in the page itself, this isLoading apparently does nothing.., fix this too
    setIsLoading(true);
    try {
      void setNotificationsToState();
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <div className="main-container">
      <NavBar
        navigationData={familyCaregiverMenu}
        selectedRoute={"Dashboard"}
      ></NavBar>
      <TabBar
        navigationData={familyCaregiverMenu}
        selectedRoute={"Dashboard"}
      ></TabBar>
      <div className={classNames(["md:ml-80", "header"])}>
        <div className={classNames(["flex flex-row", "header"])}>
          <img src={FadedSun} className="faded-sun" alt="" />
          <p className="text-5xl text-primary font-bold px-4 self-center">
            This week in a view
          </p>
        </div>
        <StatsOverview
          musicDuration={musicDuration}
          galleryDuration={galleryDuration}
          callDuration={callDuration}
          isLoading={isLoading}
        ></StatsOverview>
        <p className="text-4xl text-primary md:ml-8">Upcoming Notifications:</p>
        {isLoading ? (
          <BlueLoadingSpinner />
        ) : notifications.length === 0 ? (
          <EmptyNotifications />
        ) : (
          <DashboardNotifications
            notifications={notifications.map((item) => {
              return {
                startTime: dayjs
                  .utc(item.eventStartTime)
                  .local()
                  .format("hh:mm A"),
                title: item.title,
                reminderType: item.reminderType,
              };
            })}
          ></DashboardNotifications>
        )}
      </div>
    </div>
  );
};

export default Home;
