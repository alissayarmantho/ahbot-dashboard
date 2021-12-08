import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import TabBar from "../../components/TabBar/TabBar";
import { familyCaregiverMenu } from "../../constants";
import { getToken, getUser } from "../../utils/common";
import "./Manage.css";

const Manage: React.FC = () => {
  const navigate = useNavigate();
  const token = getToken();
  const user = getUser();
  useEffect(() => {
    if (token == null || user == null) {
      // TODO: Check for account type
      navigate("/");
    }
  }, [token, user, navigate]);
  return (
    <div className="main-container">
      <NavBar
        navigationData={familyCaregiverMenu}
        selectedRoute={"Manage"}
      ></NavBar>
      <TabBar
        navigationData={familyCaregiverMenu}
        selectedRoute={"Manage"}
      ></TabBar>
    </div>
  );
};

export default Manage;
