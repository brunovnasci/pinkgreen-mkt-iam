import { memo } from "react";
import type { KcContext } from "./context";
import { KcProps } from "keycloakify";
import { KcApp as KcAppBase } from "keycloakify/lib/components/KcApp";
import { RegisterUserProfile } from "./RegisterUserProfile";
import { Login } from "./Login";
import { LogoutConfirm } from "./LogoutConfirm";
import { Error } from "./Error";
import style from "./index.module.scss";
import "./messages";

export const KcApp = memo(({ kcContext, ...props }: { kcContext: KcContext; } & KcProps) => {

    const kcProps = {
        ...props,
        "kcHtmlClass": [ style.kcBaseHtml ],
        "kcLoginClass": [ style.kcLoginFormPage],
        "kcHeaderClass": [ style.kcLoginFormHeader ],
        "kcFormCardClass": [ style.kcLoginFormCard ],
        "kcSignUpClass": [ style.kcSignUpCard ]
    }

    switch (kcContext.pageId) {
        case "register-user-profile.ftl":  return <RegisterUserProfile {...{ kcContext, ...kcProps }} />
        case "login.ftl": return <Login {...{kcContext, ...kcProps}} />
        case "logout-confirm.ftl": return <LogoutConfirm {...{kcContext, ...kcProps}} />
        case "error.ftl": return <Error {...{kcContext, ...kcProps}} />
        default: return <KcAppBase {...{ kcContext, ...kcProps }} />;
    }
});
