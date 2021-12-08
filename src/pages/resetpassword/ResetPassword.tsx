import "./ResetPassword.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Vector from "../../assets/vector.png";
import Sun from "../../assets/sun.png";
import { useState } from "react";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { unauthenticatedApiHandler } from "../../api/axios";

type ResetPasswordProps = {
  newpassword: string;
  token: string;
};

const defaultValues = {
  newwPassword: "",
  token: "",
};

const schema = yup.object().shape({
  newpassword: yup.string().trim().required("Please enter your new password"),
  token: yup.string().trim().required("Please enter the password reset token"),
});

const ResetPassword: React.FC = () => {
  // TODO: Fix form sending to verify input and show errors
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordToken, setPasswordToken] = useState("");
  const navigate = useNavigate();

  const methods = useForm<ResetPasswordProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit, setError } = methods;

  async function submit(
    data: ResetPasswordProps,
    event?: React.BaseSyntheticEvent
  ) {
    event?.preventDefault();
    setIsLoading(true);
    try {
      await unauthenticatedApiHandler(
        "/authorization/update-password-reset-request",
        { data },
        "post"
      );
      navigate("/login");
    } catch (error: any) {
      if (!Axios.isAxiosError(error)) {
        toast.error("An unexpected error has occured");
      }
      const errorMessage = (
        error.response?.data.msg as string | undefined
      )?.toLowerCase();
      if (errorMessage?.includes("token")) {
        setError("token", {
          type: "manual",
          message: errorMessage,
        });
      } else if (errorMessage?.includes("password")) {
        setError("newpassword", {
          type: "manual",
          message: errorMessage,
        });
      }
    }
    setIsLoading(false);
  }
  return (
    <div className="background-container">
      <img src={Vector} className="background-image" alt="" />
      <div className="flex p-4 flex-row items-center justify-center">
        <img src={Sun} className="sun" alt="" />
        <p className="text-5xl text-center font-bold p-4">Password Reset</p>
      </div>
      <div className="flex p-4 flex-col items-center">
        <FormProvider {...methods}>
          <form className="w-80" onSubmit={handleSubmit(submit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="newpassword"
              >
                New Password
              </label>
              <input
                disabled={isLoading}
                onChange={(e) => setNewPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="newpassword"
                type="password"
                placeholder="New Password"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="token"
              >
                Password Reset Token
              </label>
              <input
                disabled={isLoading}
                onChange={(e) => setPasswordToken(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="token"
                type="text"
                placeholder="Token"
              />
            </div>
            <div className="flex p-4 flex-col items-center">
              <button
                disabled={isLoading}
                className="w-80 bg-primary hover:bg-primaryHover text-white font-semibold py-2 px-4 border-b-3 border-blue-700 hover:border-blue-500 rounded shadow-md"
                type="submit"
                onClick={() =>
                  submit({ newpassword: newPassword, token: passwordToken })
                }
              >
                Reset Password
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ResetPassword;
