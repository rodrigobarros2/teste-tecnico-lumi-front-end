import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./page/Home";
import { InfoClient } from "./page/InfoClient";
import { MailingProvider } from "./hook/useUserData";

const App = () => {
  return (
    <MailingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<InfoClient />} />
        </Routes>
      </Router>
    </MailingProvider>
  );
};

export default App;
