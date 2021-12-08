import classNames from "classnames";
import { IoMusicalNotes } from "react-icons/io5";
import { RiContactsLine, RiGalleryLine } from "react-icons/ri";
import { BsChevronDoubleRight } from "react-icons/bs";
import WhiteLoadingSpinner from "../LoadingSpinner/WhiteLoadingSpinner";

import "./StatsOverview.css";
import { useNavigate } from "react-router-dom";

// TODO: Change the icons if necessary
const StatsOverview = ({
  isLoading,
  musicDuration,
  callDuration,
  galleryDuration,
}: any) => {
  const navigate = useNavigate();
  return (
    <div
      className={classNames([
        "flex md:flex-row mt-10 md:ml-10 md:w-min",
        "overview",
      ])}
    >
      <div
        className={classNames([
          "flex justify-center flex-col bg-primary text-white rounded-tl-smallCorner rounded-tr-largeCorner rounded-br-largeCorner rounded-bl-largeCorner text-3xl font-bold w-52 h-52 items-center mr-10 mb-15",
          "overviewIcon",
        ])}
      >
        <RiGalleryLine className="w-20 h-20 mt-4 mb-2" />
        {isLoading ? (
          <WhiteLoadingSpinner />
        ) : (
          <p className="text-center text-5xl mb-2">{galleryDuration}</p>
        )}
        <p className="text-center mb-2">mins</p>
      </div>
      <div
        className={classNames([
          "flex justify-center flex-col bg-primaryGrey text-white rounded-tl-smallCorner rounded-tr-largeCorner rounded-br-largeCorner rounded-bl-largeCorner text-3xl font-bold w-52 h-52 items-center mr-10 mb-10",
          "overviewIcon",
        ])}
      >
        <RiContactsLine className="w-20 h-20 mt-4 mb-2" />
        {isLoading ? (
          <WhiteLoadingSpinner />
        ) : (
          <p className="text-center text-5xl mb-2">{callDuration}</p>
        )}
        <p className="text-center mb-2">mins</p>
      </div>
      <div
        className={classNames([
          "flex justify-center flex-col bg-primary text-white rounded-tl-smallCorner rounded-tr-largeCorner rounded-br-largeCorner rounded-bl-largeCorner text-3xl font-bold w-52 h-52 items-center mb-10 mr-10",
          "overviewIcon",
        ])}
      >
        <IoMusicalNotes className="w-20 h-20 mt-4 mb-2" />
        {isLoading ? (
          <WhiteLoadingSpinner />
        ) : (
          <p className="text-center text-5xl mb-2">{musicDuration}</p>
        )}
        <p className="text-center mb-2">mins</p>
      </div>
      <button
        className="hover:bg-gray-50 rounded-full"
        onClick={() => navigate("/analytics")}
      >
        <BsChevronDoubleRight className="w-20 h-20 self-center text-chevronGrey" />
      </button>
    </div>
  );
};

export default StatsOverview;
