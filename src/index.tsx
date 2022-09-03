import React from "react";
import ReactDOM from "react-dom/client";
import { defaultKcProps } from "keycloakify";
import "./index.scss";
import App from "./App";
import { kcContext } from "./KcApp/kcContext";
import { KcApp } from "./KcApp";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  kcContext === undefined ? (
    <App />
  ) : (
    <KcApp kcContext={kcContext} {...defaultKcProps }/>
  )
);