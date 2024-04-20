import { Spinner } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SetPassword() {
  const navigate = useNavigate();
  const [regNum, setregNum] = useState();
  const [OtpSentSuccessfully, setOtpSentSuccessfully] = useState(null);
  const [otpData, setotpData] = useState();
  const [loading, setLoading] = useState(false);
  const [OTP, setOTP] = useState();
  const handleChange = (e) => {
    setregNum(e.target.value);
  };

  const handleChangeVerify = (e) => {
    setotpData(e.target.value);
  };

  const handleSubmitVerify = (e) => {
    e.preventDefault();
    if (!otpData) {
      console.log("enter otp");
    }
    if (otpData == OTP) {
      toast.success("OTP verified SUCCESSFULLY");
      const username = regNum;
      navigate(`/setforgotpassword/${username}`);
    } else {
      toast.error("invalid OTP");
    }
  };

  const handleOnclick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/otp/verifyuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ regNum }),
      });

      const data = await res.json();
      setLoading(false);
      console.log(data);
      if (data.success === false) {
        setOtpSentSuccessfully(false);
        console.log("failed from trysrdgsdgf");
      }

      if (res.ok) {
        setOtpSentSuccessfully(true);
        console.log(data.otp);
        setOTP(data.otp);
        toast.success("OTP SENT SUCCESSFULLY");
      }
    } catch (error) {
      setLoading(false);
      setOtpSentSuccessfully(false);
      toast.error("Something went wrong");
      console.log("failed from catch");
    }
  };

  return (
    <div>
      {OtpSentSuccessfully === true ? (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-8 rounded shadow-md ">
            <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
              onChange={handleChangeVerify}
            />
            <button
              onClick={handleSubmitVerify}
              className="mt-4 hover:scale-105 transition-transform bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8  shadow-md text-white font-semibold py-2 px-4 rounded-md w-full"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-8 rounded shadow-md">
            <h1 className="text-2xl font-semibold mb-1">
              Enter your Registration Number
            </h1>
            <div className="flex flex-col items-center">
              <label htmlFor="registrationNumber" className="mb-2"></label>
              <input
                type="text"
                id="registrationNumber"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Registration Number"
                onChange={handleChange}
              />
              {loading ? (
                <>
                  <button
                    onClick={handleOnclick}
                    className="mt-4 hover:scale-105 transition-transform bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8  shadow-md text-white font-semibold py-2 px-4 rounded-md "
                  >
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleOnclick}
                  className="mt-4 hover:scale-105 transition-transform bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8  shadow-md text-white font-semibold py-2 px-4 rounded-md "
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}