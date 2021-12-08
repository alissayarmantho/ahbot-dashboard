import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Vector from "../../assets/vector.png";
import Sun from "../../assets/sun.png";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { unauthenticatedApiHandler } from "../../api/axios";
import { useState } from "react";

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email")
    .required("Please enter your email"),
});

type ForgotPasswordProps = {
  email: string;
};

const defaultValues = {
  email: "",
};

const ForgotPassword: React.FC = () => {
  // TODO: Fix form sending (like login page and other pages)
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const methods = useForm<ForgotPasswordProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit, setError } = methods;

  async function submit(
    data: ForgotPasswordProps,
    event?: React.BaseSyntheticEvent
  ) {
    event?.preventDefault();
    setIsLoading(true);
    try {
      await unauthenticatedApiHandler(
        "/authorization/reset-password-request",
        { data },
        "post"
      );
      navigate("/reset-password");
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
      }
    }
    setIsLoading(false);
  }
  return (
    <div className="background-container">
      <img src={Vector} className="background-image" alt="" />
      <div className="flex p-4 flex-row items-center justify-center">
        <img src={Sun} className="sun" alt="" />
        <p className="text-5xl text-center font-bold p-4">Welcome</p>
      </div>
      <div className="flex p-4 flex-col items-center">
        <FormProvider {...methods}>
          <form className="w-80" onSubmit={handleSubmit(submit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                disabled={isLoading}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="flex p-4 flex-col items-center">
              <button
                disabled={isLoading}
                className="w-80 bg-primary hover:bg-primaryHover text-white font-semibold py-2 px-4 border-b-3 border-blue-700 hover:border-blue-500 rounded shadow-md"
                onClick={() => submit({ email: email })}
                type="submit"
              >
                SUBMIT REQUEST
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ForgotPassword;
