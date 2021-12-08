import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import NavBar from "../../components/NavBar/NavBar";
import TabBar from "../../components/TabBar/TabBar";
import { familyCaregiverMenu } from "../../constants";
import { getToken, getUser } from "../../utils/common";
import AnalyticsIcon from "../../assets/analytics.png";
import AppointmentAnalyticsIcon from "../../assets/appointmentanalytics.png";
import CallAnalyticsIcon from "../../assets/callanalytics.png";
import "./Analytics.css";
import classNames from "classnames";
import BlueLoadingSpinner from "../../components/LoadingSpinner/BlueLoadingSpinner";
import { apiHandler } from "../../api/axios";
import {
  AppointmentStatsData,
  CallDurationData,
  CallLog,
  CallNumberData,
  MediaLog,
  MedicationStatsData,
} from "../../types/analytics";

type CallLogDataResponse = {
  callLogs: CallLog[];
};

type MediaLogDataResponse = {
  mediaLogs: MediaLog[];
};

const getTotalCallDuration = async (elderId: string) => {
  const response = await apiHandler(
    `/analytic/call-duration-stats?elderId=${elderId}`
  );
  const callDurationData = response.data.data as CallDurationData;

  return (
    callDurationData.voiceCallDurationMinutes +
    callDurationData.videocallDurationMinutes
  );
};

const getAppointmentStats = async (elderId: string) => {
  const response = await apiHandler(
    `/analytic/appointment-stats?elderId=${elderId}`
  );
  const appointmentStatsData = response.data.data as AppointmentStatsData;

  return [
    appointmentStatsData.completedAppointment,
    appointmentStatsData.totalAppointments,
  ];
};

const getMedicationStats = async (elderId: string) => {
  const response = await apiHandler(
    `/analytic/medication-stats?elderId=${elderId}`
  );
  const medicationStatsData = response.data.data as MedicationStatsData;

  return [
    medicationStatsData.completedMedication,
    medicationStatsData.totalMeds,
  ];
};

const getCallNumber = async (elderId: string) => {
  const response = await apiHandler(
    `/analytic/call-quantity?elderId=${elderId}`
  );
  const callNumberData = response.data.data as CallNumberData;

  return [callNumberData.videocallNum, callNumberData.voicecallNum];
};

const getCallLogs = async (elderId: string) => {
  const response = await apiHandler(`/analytic/all/calllog?elderId=${elderId}`);
  const callLogData = response.data.data as CallLogDataResponse;

  return callLogData.callLogs;
};

const getMediaLogs = async (elderId: string) => {
  const response = await apiHandler(
    `/analytic/all/medialog?elderId=${elderId}`
  );
  const callLogData = response.data.data as MediaLogDataResponse;

  return callLogData.mediaLogs;
};

const Analytics: React.FC = () => {
  const navigate = useNavigate();
  const token = getToken();
  const user = getUser();
  const [isLoading, setIsLoading] = useState(false);
  const [totalAppointment, setTotalAppointment] = useState(0);
  const [attendedAppointment, setAttendedAppointment] = useState(0);
  const [videoCallNumber, setVideoCallNumber] = useState(0);
  const [voiceCallNumber, setVoiceCallNumber] = useState(0);
  const [totalCallDuration, setTotalCallDuration] = useState(0);
  const [medicationCompliance, setMedicationCompliance] = useState(0);
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [mediaLogs, setMediaLogs] = useState<MediaLog[]>([]);
  const setCallLogsToState = async () => {
    setCallLogs(await getCallLogs("61547e49adbc3d0023ab129c"));
  };
  const setMediaLogsToState = async () => {
    setMediaLogs(await getMediaLogs("61547e49adbc3d0023ab129c"));
  };
  const setCallDurationToState = async () => {
    setTotalCallDuration(
      await getTotalCallDuration("61547e49adbc3d0023ab129c")
    );
  };
  const setCallNumberToState = async () => {
    await getCallNumber("61547e49adbc3d0023ab129c").then((res) => {
      setVideoCallNumber(res[0]);
      setVoiceCallNumber(res[1]);
    });
  };
  const setAppointmentToState = async () => {
    await getAppointmentStats("61547e49adbc3d0023ab129c").then((res) => {
      setAttendedAppointment(res[0]);
      setTotalAppointment(res[1]);
    });
  };
  const setMedicationToState = async () => {
    await getMedicationStats("61547e49adbc3d0023ab129c").then((res) => {
      const medicationCompliance = (res[0] / res[1]) * 100;
      setMedicationCompliance(medicationCompliance);
    });
  };
  useEffect(() => {
    if (token == null || user == null) {
      // TODO: Check for account type
      navigate("/");
    }
  }, [token, user, navigate]);
  useEffect(() => {
    // TODO: Design a better api call abstraction than crowding everything in the page itself, this isLoading apparently does nothing.., fix this too
    setIsLoading(true);
    try {
      void setCallNumberToState();
      void setCallDurationToState();
      void setAppointmentToState();
      void setMedicationToState();
      void setMediaLogsToState();
      void setCallLogsToState();
    } finally {
      setIsLoading(false);
    }
  }, []);
  ChartJS.register(
    TimeScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  // x: {
  //       type: "time",
  //       time: {
  //         displayFormats: {
  //           hour: "dd MMM YYYY hh:mm A",
  //         },
  //       },
  //     },
  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Daily Breakdown",
      },
    },
  };
  var data = {
    datasets: [
      {
        label: "Calls",
        data: callLogs.map((item) => {
          return { x: item.startTime, y: item.totalMin };
        }),
        borderColor: "rgb(187, 107, 217)",
        backgroundColor: "rgba(187, 107, 217, 0.5)",
      },
      {
        label: "Music",
        data: mediaLogs
          .filter((item) => item.mediaType === "music")
          .map((item) => {
            return { x: item.startTime, y: item.totalMin };
          }),
        borderColor: "rgb(111, 207, 151)",
        backgroundColor: "rgba(111, 207, 151, 0.5)",
      },
      {
        label: "Gallery",
        data: mediaLogs
          .filter((item) => item.mediaType !== "music")
          .map((item) => {
            return { x: item.startTime, y: item.totalMin };
          }),
        borderColor: "rgb(235, 87, 87)",
        backgroundColor: "rgba(235, 87, 87, 0.5)",
      },
    ],
  };
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
          <img src={AnalyticsIcon} className="analytics-icon" alt="" />
          <p className="text-4xl text-primary font-semibold px-8 self-center">
            Breakdown of app usage this week
          </p>
        </div>
        {isLoading ? (
          <BlueLoadingSpinner />
        ) : (
          <div className="flex flex-col">
            <div
              className={classNames([
                "flex md:flex-row mt-10 md:w-min",
                "analytics-overview",
              ])}
            >
              <div
                className={classNames([
                  "flex justify-around flex-row bg-white text-statsBlack rounded-mediumCorner text-base font-bold w-80 h-52 items-center mr-10 mb-25 shadow-xl p-8",
                  "analytics-overview-items",
                ])}
              >
                <img
                  src={CallAnalyticsIcon}
                  className="w-20 h-20 self-center"
                  alt=""
                />

                <div className="flex flex-col ml-8">
                  <p className="text-statsGrey">CALLS</p>
                  <div className="flex flex-row my-5">
                    <p className="text-2xl self-end">{videoCallNumber}</p>
                    <p className="self-end ml-2 leading-none">video</p>
                  </div>
                  <div className="flex flex-row">
                    <p className="text-2xl self-end">{voiceCallNumber}</p>
                    <p className="self-end ml-2 leading-none">voice calls</p>
                  </div>
                </div>
              </div>
              <div
                className={classNames([
                  "flex justify-around flex-row bg-white text-statsBlack rounded-mediumCorner text-base font-bold w-80 h-52 items-center mr-10 mb-25 shadow-xl p-8",
                  "analytics-overview-items",
                ])}
              >
                <img
                  src={AppointmentAnalyticsIcon}
                  className="w-20 h-20 self-center"
                  alt=""
                />

                <div className="flex flex-col ml-8">
                  <p className="text-statsGrey">APPOINTMENTS</p>
                  <div className="flex flex-row my-5">
                    <p className="self-end text-2xl">{attendedAppointment}</p>
                    <p className="self-end ml-2 leading-none">{`out of ${totalAppointment}`}</p>
                  </div>
                  <p className="self-end leading-none text-xl">
                    attended check-ins
                  </p>
                </div>
              </div>
              {/* Add Screen Reader Stats if necessary, currently it is not supported by both tablet and backend */}
              <div
                className={classNames([
                  "flex justify-center flex-col bg-white text-white rounded-mediumCorner text-3xl font-bold w-52 h-52 items-center mb-10 mr-10",
                  "analytics-item",
                ])}
              ></div>
            </div>
            <div className="flex flex-col md:flex-row items-center mt-10">
              <Line options={options} data={data} />
              <div className="flex w-min mt-10 md:mt-0 flex-col justify-around md:ml-10">
                <div
                  className={classNames([
                    "flex flex-col w-52 h-52 mb-10 md:mr-10 rounded-full border-statsCircleGrey text-statsBlack justify-center",
                    "circle",
                  ])}
                >
                  <p className="text-3xl font-bold self-center text-center">
                    {`${medicationCompliance} %`}
                  </p>
                  <p className="text-base self-center text-center">
                    compliance in medications
                  </p>
                </div>
                <div
                  className={classNames([
                    "flex flex-col w-52 h-52 md:mr-10 rounded-full border-statsCircleGrey text-statsBlack justify-center",
                    "circle",
                  ])}
                >
                  <p className="text-3xl font-bold self-center text-center">
                    {`${totalCallDuration} min`}
                  </p>
                  <p className="text-base self-center text-center">call time</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
