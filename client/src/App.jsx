import { useEffect, useState } from "react";
import SignIn from "./components/screens/SignIn";
import SignUp from "./components/screens/SignUp";
import Home from "./components/screens/Home";
import Header from "./components/Header";
import { jwtDecode } from "jwt-decode";
import "@fontsource-variable/hanken-grotesk";

const App = () => {
  const [session, setSession] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("");

  useEffect(() => {
    const storedSession = JSON.parse(localStorage.getItem("session"));
    try {
      const decodedToken = jwtDecode(storedSession.accessToken);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("session");
        setCurrentScreen("signin");
      } else {
        setSession(storedSession);
        setCurrentScreen("home");
      }
    } catch (err) {
      setSession(null);
      setCurrentScreen("signin");
    }
  }, []);

  function renderScreen() {
    if (!session) {
      if (currentScreen === "signup") {
        return <SignUp setCurrentScreen={setCurrentScreen} />;
      } else {
        return (
          <SignIn setSession={setSession} setCurrentScreen={setCurrentScreen} />
        );
      }
    } else {
      return <Home setCurrentScreen={setCurrentScreen} />;
    }
  }

  return (
    <div className="w-96 min-h-96 max-h-[8rem] dark">
      {currentScreen !== "signin" &&
        currentScreen !== "signup" &&
        session !== null && (
          <Header session={session} setCurrentScreen={setCurrentScreen} />
        )}
      {renderScreen()}
    </div>
  );
};

export default App;
