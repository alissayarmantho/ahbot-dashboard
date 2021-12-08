import React, { useCallback, useState } from "react";
import classNames from "classnames";
import { AiFillHome } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import {
  IoLogOut,
  IoSettingsSharp,
  IoNotifications,
  IoCloudUpload,
} from "react-icons/io5";

import "./TabBar.css";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import { removeUserSession } from "../../utils/common";

// TODO: Change the icons if necessary

const TabBar = ({ navigationData, selectedRoute }: any) => {
  const [currentRoute, setCurrentRoute] = useState(selectedRoute);
  const navigate = useNavigate();
  async function logOut(event?: React.BaseSyntheticEvent) {
    event?.preventDefault();
    removeUserSession();
    navigate("/");
  }
  const getTabIcon = useCallback((item) => {
    switch (item) {
      case "Dashboard":
        return <AiFillHome />;
      case "Upload":
        return <IoCloudUpload />;
      case "Notifications":
        return <IoNotifications />;
      case "Settings":
        return <IoSettingsSharp />;
      case "Manage":
        return <BsPeopleFill />;
    }
  }, []);

  return (
    <nav
      className={classNames([
        "flex md:hidden flex-row items-center justify-around px-8 h-18 bg-white visible md:invisible fixed bottom-0 w-full rounded-t-3xl text-2xl bg-secondary pt-4",
        "tabBar",
      ])}
    >
      {navigationData.map((item: string, index: number) => (
        <span
          key={index}
          className={classNames([
            "text-gray-400 hover:text-gray-700 cursor-pointer w-18 h-full flex items-center justify-center",
            currentRoute === item && " text-primary",
          ])}
          onClick={() => {
            setCurrentRoute(item);
            navigate(routes[item]);
          }}
        >
          <span className="mb-5 justify-center">{getTabIcon(item)}</span>
        </span>
      ))}
      <span
        className="text-gray-400 hover:text-gray-700 cursor-pointer w-18 h-full flex items-center justify-center"
        onClick={() => logOut()}
      >
        <span className="mb-5 justify-center">{<IoLogOut />}</span>
      </span>
    </nav>
  );
};

export default TabBar;
