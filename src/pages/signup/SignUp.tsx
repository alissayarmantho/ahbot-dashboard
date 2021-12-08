import { useState } from "react";
import { unauthenticatedApiHandler } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

type SignUpProps = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  accountType: string;
};
const SignUp: React.FC = () => {
  // TODO: Do validation and error handling
  // TODO: Make use of phone number if needed (need to update the backend too)
  // TODO: The request is correct, but it always get cancelled, fix this
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accountType, setAccountType] = useState("");
  async function submit(data: SignUpProps, event?: React.BaseSyntheticEvent) {
    event?.preventDefault();
    setIsLoading(true);
    try {
      await unauthenticatedApiHandler(
        "/authorization/signup",
        { data },
        "post"
      ).then(() => navigate("/login"));
    } catch (error: any) {
      console.log(error);
    }
    setIsLoading(false);
  }
  return (
    <div className="background-container">
      <div className="flex p-4">
        <p className="text-5xl text-center font-bold p-2">Sign Up</p>
      </div>
      <div className="flex p-6 flex-col">
        <form
          className="w-full max-w-lg"
          onSubmit={() =>
            submit({
              firstName: firstName,
              lastName: lastName,
              password: password,
              email: email,
              accountType: accountType,
            })
          }
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                First Name
              </label>
              <input
                disabled={isLoading}
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Last Name
              </label>
              <input
                disabled={isLoading}
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="phone-number"
              >
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="phone-number"
                type="text"
                placeholder="Phone Number"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                disabled={isLoading}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email Address"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                disabled={isLoading}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="retype-password"
              >
                Retype Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="retype-password"
                type="password"
                placeholder="Retype Password"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <select
                disabled={isLoading}
                onChange={(e) => setAccountType(e.target.value)}
                value={accountType}
                className="block appearance-none w-full bg-white border rounded px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option>caregiver</option>
                <option>elder</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full mt-4 md:w-1/2 px-3 mb-6 md:mb-0">
              <button
                className="w-full bg-primary hover:bg-primaryHover text-white font-semibold py-2 px-4 border-b-3 border-blue-700 hover:border-blue-500 rounded shadow-lg"
                type="submit"
              >
                REGISTER
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
