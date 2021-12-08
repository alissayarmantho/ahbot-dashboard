import "./Launch.css";
import { useNavigate } from "react-router-dom";
import Vector from "../../assets/vector.png";
import Sun from "../../assets/sun.png";
import { getToken, getUser } from "../../utils/common";
import { useEffect } from "react";

const Launch: React.FC = () => {
  const navigate = useNavigate();
  const token = getToken();
  const user = getUser();
  useEffect(() => {
    if (token != null && user != null) {
      // TODO: Check for account type
      navigate("/home");
    }
  }, [token, user, navigate]);
  return (
    <div className="background-container">
      <img src={Vector} className="background-image" alt="" />
      <div className="flex p-4 flex-row items-center justify-center">
        <img src={Sun} className="sun" alt="" />
        <p className="text-5xl text-center font-bold p-4">Robo-Companion</p>
      </div>
      <div className="flex p-2 flex-col items-center">
        <button
          className="w-80 m-4 bg-white hover:bg-gray-100 text-black font-semibold py-2 px-4 rounded shadow-md"
          onClick={() => navigate("/sign-up")}
        >
          SIGN UP
        </button>
        <div className="flex flex-col items-center">
          <button
            className="w-80 m-4 bg-primary hover:bg-primaryHover text-white font-semibold py-2 px-4 border-b-3 border-blue-700 hover:border-blue-500 rounded shadow-md"
            onClick={() => navigate("/login")}
          >
            LOGIN
          </button>
          <button
            className="text-primary background-transparent font-semibold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 self-end"
            onClick={() => navigate("/reset-password")}
          >
            Reset Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Launch;
