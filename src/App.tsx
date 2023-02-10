import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/Root";
import Home from "./routes/Home";
import Addentry from "./routes/Addentry";
import TimeEntries from "./routes/TimeEntries";
import Projects from "./routes/Projects";
import Login from "./routes/Login";
import Register from "./routes/Register";
import ProjectDetails from "./routes/ProjectDetails";
import { useEffect } from "react";
import Settings from "./routes/Settings";
import { Box } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import TimedOut from "./routes/TimedOut";

function App() {
  useEffect(() => {
    async function notificationPermission() {
      let permission = await Notification.requestPermission();
      return permission;
    }
    try {
      notificationPermission();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //routes and entry point of the App

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="/addentry" element={<Addentry />} />
          <Route path="/time-entries" element={<TimeEntries />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route
            path="/projects/details/:id"
            element={<ProjectDetails />}
          ></Route>
          <Route path="/timedout" element={<TimedOut />}></Route>
          <Route path="/addentry/:id" element={<Addentry />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
      </>
    )
  );
  return (
    <Box>
      <CssVarsProvider>
        <RouterProvider router={router} />
      </CssVarsProvider>
    </Box>
  );
}

export default App;
