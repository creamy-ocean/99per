import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import AuthService from "./service/auth";
import ProfileService from "./service/profile";
import { BrowserRouter } from "react-router-dom";
import {
  AuthProvider,
  AuthErrorEventBus,
  fetchCsrfToken,
} from "./context/AuthContext";
import HttpClient from "./network/http";
import { config } from "./util/config.js";

const baseURL = process.env.REACT_APP_BASE_URL;
const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(
  baseURL,
  authErrorEventBus,
  () => fetchCsrfToken(),
  config
);
const authService = new AuthService(httpClient);
const profileService = new ProfileService(httpClient);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        authService={authService}
        authErrorEventBus={authErrorEventBus}
      >
        <App profileService={profileService} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
