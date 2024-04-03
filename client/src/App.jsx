import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import ContactUs from "./pages/ContactUs"
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sender from "./pages/Sender";
import Receiver from "./pages/Receiver";
import ReceiverPost from "./pages/ReceiverPost";
import SenderPost from "./pages/SenderPost";
import Stopwatch from "./pages/Stopwatch";
import SenderCountdown from "./pages/OtpVerify";
import OtpVerify from "./pages/OtpVerify";
import AfterPickingTimer from "./pages/AfterPickingTimer";


export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/sender" element={<Sender />} />
        <Route path="/receiver" element={<Receiver/>} />
        <Route path="/receiverpost" element={<ReceiverPost/>} />
        <Route path="/senderpost" element={<SenderPost/>} />
        <Route path="/stopwatch" element={<Stopwatch/>} />
        <Route path="/afterpickingtimer" element={<AfterPickingTimer/>}/>
        <Route path="/otpverify" element={<OtpVerify/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

