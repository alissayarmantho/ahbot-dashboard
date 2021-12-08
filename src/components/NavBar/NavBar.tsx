import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { removeUserSession } from "../../utils/common";
import classNames from "classnames";
import { AiFillHome } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import {
  IoSettingsSharp,
  IoNotifications,
  IoCloudUpload,
} from "react-icons/io5";
import { AiOutlineRight } from "react-icons/ai";
import "./NavBar.css";
import { routes } from "../../constants";

// TODO: Change the icons if necessary
const Navbar = ({ navigationData, selectedRoute }: any) => {
  const navigate = useNavigate();
  const [currentRoute, setCurrentRoute] = useState(selectedRoute);
  const getNavIcon = useCallback((item) => {
    switch (item) {
      case "Dashboard":
        return <AiFillHome className="mr-5 self-center" />;
      case "Upload":
        return <IoCloudUpload className="mr-5 self-center" />;
      case "Notifications":
        return <IoNotifications className="mr-5 self-center" />;
      case "Settings":
        return <IoSettingsSharp className="mr-5 self-center" />;
      case "Manage":
        return <BsPeopleFill className="mr-5 self-center" />;
    }
  }, []);
  async function logOut(event?: React.BaseSyntheticEvent) {
    event?.preventDefault();
    removeUserSession();
    navigate("/");
  }
  return (
    <div>
      <nav
        className={classNames([
          "hidden md:flex flex-col h-18 bg-white",
          "navBar",
        ])}
      >
        <ul className="flex flex-col h-12">
          <li className="text-4xl text-primary p-8 items-start font-bold text-left">
            Menu
          </li>
          {navigationData.map((item: string, index: number) => (
            <li
              className={classNames([
                currentRoute === item && index % 2 === 0 && "evenSelected",
                currentRoute === item && index % 2 === 1 && "oddSelected",
                "w-22 p-8 text-white hover:text-gray-100 cursor-pointer font-medium tracking-wide text-2xl flex mt-2 mb-2",
                index % 2 === 0 && "bg-menuPrimary",
                index % 2 === 1 && "bg-secondaryGrey",
              ])}
              key={index}
              onClick={() => {
                setCurrentRoute(item);
                navigate(routes[item]);
              }}
            >
              {getNavIcon(item)}
              {item}
              <AiOutlineRight className="ml-5 self-center" />
            </li>
          ))}
        </ul>
      </nav>
      <button
        className={classNames([
          "bg-white hover:bg-gray-50 border-2 border-primary text-sm text-primary py-3 px-5 rounded-lg font-medium tracking-wide leading-none",
          "logOutButton",
        ])}
        onClick={() => logOut()}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
