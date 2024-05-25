import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./page/Home";
import { InfoClient } from "./page/InfoClient";
import { LuminiProvider } from "./hook/useUserData";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer />
      <LuminiProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<InfoClient />} />
          </Routes>
        </Router>
      </LuminiProvider>
    </>
  );
};

export default App;
