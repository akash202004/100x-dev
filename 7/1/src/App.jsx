import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
// import Landing from "./components/Landing";
// import Dashboard from "./components/Dashboard";
import { Suspense, lazy } from "react";

const Dashboard = lazy(() => import("./components/Dashboard"));
const Landing = lazy(() => import("./components/Landing"));

function App() {
  return (
    <div>
      <h1>HEYYY</h1>
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route
            path="/landingPage"
            element={
              <Suspense fallback={"loading..."}>
                <Landing />
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={"loading..."}>
                <Dashboard />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function AppBar() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <button
          onClick={() => {
            navigate("/landingPage");
          }}
        >
          LandingPage
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}

export default App;
