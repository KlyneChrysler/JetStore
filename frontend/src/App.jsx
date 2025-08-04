import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import waveBackground from "./assets/sign_in_wave.png";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen bg-[rgba(250,245,235,1)] text-black relative overflow-hidden">
      {/* Main Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_farthest-corner_at_top,_#f1fcb0_0%,_#d2ffc2_50%,_#b3ffe1_80%,_#a1ffe8_100%)]" />
          <img
            style={{
              backgroundImage: `url(${waveBackground})`,
            }}
            className="absolute bottom-0 left-0 w-full h-auto"
            src="/src/assets/down_wave2.svg"
            alt="Homepage Wave Graphic"
          />
        </div>
      </div>

      <div className="relative z-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
