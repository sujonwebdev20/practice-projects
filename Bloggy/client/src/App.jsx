import "./App.css";
import { RouteIndex, RouteSignIn, RouteSignUp } from "./helpers/RouteName";
import Layout from "./Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Signin from "./pages/Signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
        </Route>
        <Route path={RouteSignIn} element={<Signin />} />
        <Route path={RouteSignUp} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
