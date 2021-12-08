import "./Login.css";
import { useNavigate } from "react-router-dom";
import Vector from "../../assets/vector.png";
import Sun from "../../assets/sun.png";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiHandler, unauthenticatedApiHandler } from "../../api/axios";
import { User, UserWithFullUserAssociation } from "../../types/users";
import Axios from "axios";
import BlueLoadingSpinner from "../../components/LoadingSpinner/BlueLoadingSpinner";
import {
  getToken,
  getUser,
  setTokenSession,
  setUserSession,
} from "../../utils/common";

const schema = yup.object().shape({
  password: yup.string().trim().required("Please enter your password"),
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email")
    .required("Please enter your email"),
});

type LoginProps = {
  email: string;
  password: string;
};

const defaultValues = {
  email: "",
  password: "",
};

type LoginResponseData = {
  token: string;
  account: User;
};

const Login: React.FC<Record<string, unknown>> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const token = getToken();
  const user = getUser();
  const methods = useForm<LoginProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit, setError } = methods;

  async function submit(data: LoginProps, event?: React.BaseSyntheticEvent) {
    event?.preventDefault();
    setIsLoading(true);
    try {
      const response = await unauthenticatedApiHandler(
        "/authorization/login",
        { data },
        "post"
      );
      const responseData = response.data.data as LoginResponseData;

      const newToken = responseData.token;
      setTokenSession(newToken);

      const userResponse = await apiHandler(
        "/account/associated-elder-caregiver-my-account",
        {},
        "get"
      );

      const userResponseData = userResponse.data
        .data as UserWithFullUserAssociation;
      setUserSession(userResponseData);
      navigate("/home");
    } catch (error: any) {
      if (!Axios.isAxiosError(error)) {
        toast.error("An unexpected error has occured");
      }
      const errorMessage = (
        error.response?.data.msg as string | undefined
      )?.toLowerCase();
      if (errorMessage?.includes("email")) {
        setError("email", {
          type: "manual",
          message: errorMessage,
        });
      } else if (errorMessage?.includes("password")) {
        setError("password", {
          type: "manual",
          message: errorMessage,
        });
      }
    }
    setIsLoading(false);
  }
  useEffect(() => {
    if (token != null && user != null) {
      // TODO: Check for account type
      navigate("/home");
    }
  }, [token, user, navigate]);

  // This complicated thing is supposed to properly submit form, however, for some reason, the form is never submitted when I press the login button
  // It should have verification of valid inputs etc with yup
  // TODO: Fix this
  return (
    <div className="background-container">
      <img src={Vector} className="background-image" alt="" />
      <div className="flex p-4 flex-row items-center justify-center">
        <img src={Sun} className="sun" alt="" />
        <p className="text-5xl text-center font-bold p-4">Welcome</p>
      </div>
      <div className="flex p-4 flex-col items-center">
        {isLoading ? (
          <BlueLoadingSpinner />
        ) : (
          <FormProvider {...methods}>
            <form className="w-80" onSubmit={handleSubmit(submit)}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Email Address"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="password"
                  type="password"
                  placeholder="Password"
                />
              </div>

              <div className="flex flex-col items-center">
                <button
                  className="w-80 bg-primary hover:bg-primaryHover text-white font-semibold py-2 px-4 border-b-3 border-blue-700 hover:border-blue-500 rounded shadow-md"
                  type="submit"
                  onClick={() => submit({ email: email, password: password })}
                >
                  LOGIN
                </button>
                <button
                  className="text-primary background-transparent font-semibold uppercase py-1 text-xs outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 self-end"
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  );
};

export default Login;
