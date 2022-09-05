import { memo } from "react";
import type { KcContext } from "./context";
import { KcProps } from "keycloakify";
import { KcApp as KcAppBase } from "keycloakify/lib/components/KcApp";
import { RegisterUserProfile } from "./RegisterUserProfile";
import style from "./index.module.scss";
import "./messages";

export const KcApp = memo(({ kcContext, ...props }: { kcContext: KcContext; } & KcProps) => {

    const kcProps = {
        ...props,
        "kcHtmlClass": [ style.kcBaseHtml ],
        "kcLoginClass": [ style.kcLoginFormPage],
        "kcHeaderClass": [ style.kcLoginFormHeader ],
        "kcFormCardClass": [ style.kcLoginFormCard ],
    }

    switch (kcContext.pageId) {
        case "register-user-profile.ftl":  return <RegisterUserProfile {...{ kcContext, ...kcProps }} />;
        default: return <KcAppBase {...{ kcContext, ...kcProps }} />;
    }
});
