import { memo } from "react";
import type { KcContext } from "./kcContext";
import { defaultKcProps, KcProps } from "keycloakify";
import { Login } from "keycloakify/lib/components/Login";
import { Register } from "./Register";
import { Info } from "keycloakify/lib/components/Info";
import { Error } from "keycloakify/lib/components/Error";
import { KcApp as KcAppBase } from "keycloakify/lib/components/KcApp";
import "./kcMessagesExtension";
import { RegisterUserProfile } from "./RegisterUserProfile";

export const KcApp = memo(({ kcContext, ...props }: { kcContext: KcContext; } & KcProps) => {

    const kcProps = {
        ...defaultKcProps,
        "kcHtmlClass": [ "kc-base-html" ],
        "kcLoginClass": [ "kc-login-form-page"],
        "kcHeaderClass": [ "kc-login-form-header" ],
        "kcFormCardClass": [ "kc-login-form-card" ],
    }

    switch (kcContext.pageId) {
        case "register-user-profile.ftl":  return <RegisterUserProfile {...{ kcContext, ...kcProps }} />;
        default: return <KcAppBase {...{ kcContext, ...kcProps }} />;
    }
});
