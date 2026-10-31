import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("amit@gmail.com");
  const [password, setPassword] = useState("Amit@123786");
  const [error, setError] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError("");

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (loginError) {
      console.error("Login failed:", loginError);
      const responseData = loginError.response?.data;
      const responseMessage =
        typeof responseData === "string"
          ? responseData.replace(/^ERROR:\s*/i, "").trim()
          : responseData?.message;

      setError(
        typeof responseMessage === "string" && responseMessage
          ? responseMessage
          : "Unable to log in. Please check your credentials and try again.",
      );
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-200 w-96">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="email"
                className="input rounded-xl"
                placeholder="Type here"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input rounded-xl"
                placeholder="Type here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          {error && (
            <p className="text-red-600 ml-2" role="alert">
              {error}
            </p>
          )}
          <div className="card-actions justify-end">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
