import ReactDOM from "react-dom/client";
import { defaultKcProps } from "keycloakify";
import { kcContext } from "./KcApp/context";
import { KcApp } from "./KcApp";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  kcContext === undefined ? (
    <h1>Hello World</h1>
  ) : (
    <KcApp kcContext={kcContext} {...defaultKcProps }/>
  )
);