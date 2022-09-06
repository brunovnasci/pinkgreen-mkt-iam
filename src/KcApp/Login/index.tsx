import { useState, memo } from "react";
import type { FormEventHandler } from "react";
import { useConstCallback } from "powerhooks/useConstCallback";
import { getMsg, KcProps } from "keycloakify";
import { Template } from "keycloakify/lib/components/Template";
import { KcContext } from "../context";
import Input from "../../components/Input";
import style from "./index.module.scss";

type KcContext_Login = Extract<KcContext, { pageId: "login.ftl"; }>;

export const Login = memo(({ kcContext, ...props }: { kcContext: KcContext_Login } & KcProps) => {

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const { 
        social,
        realm, 
        url,
        login, 
        registrationDisabled 
    } = kcContext;
    console.log(url.registrationUrl)

    const { msg, msgStr } = getMsg(kcContext);

    const loginLabel = !realm.loginWithEmailAllowed
        ? "username"
        : realm.registrationEmailAsUsername
        ? "email"
        : "usernameOrEmail";

    const autoCompleteHelper: typeof loginLabel = loginLabel === "usernameOrEmail" ? "username" : loginLabel;

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
        e.preventDefault();
        setIsLoginButtonDisabled(true);

        const formElement = e.target as HTMLFormElement;

        formElement.querySelector("input[name='email']")?.setAttribute("name", "username");

        formElement.submit();
    });

    return (
        <Template
            {...{ kcContext, ...props }}
            doFetchDefaultThemeResources={true}
            displayInfo={social.displayInfo}
            displayWide={realm.password && social.providers !== undefined}
            headerNode={msg("doLogIn")}
            formNode={
                <form onSubmit={onSubmit} action={url.loginAction} method="post">
                    <Input
                        key={autoCompleteHelper}
                        name={autoCompleteHelper}
                        label={msg(loginLabel)}
                        type="text"
                        defaultValue={login.username ?? ""}
                        autoFocus={true}
                        autoComplete="off"
                    />
                    <Input
                        key={"password"}
                        name={"password"}
                        label={msg("password")}
                        type="password"
                        autoComplete="off"
                    />
                    <div className={style.optionsWrapper}>
                        {realm.rememberMe && (
                            <div className={style.rememberMeWrapper}>
                                <input
                                    name="rememberMe"
                                    type="checkbox"
                                    {...(login.rememberMe ? 
                                        { "checked": true } :
                                        {}
                                    )}
                                />
                                <label>
                                    {msg("rememberMe")}
                                </label>
                            </div>
                        )}
                        {realm.resetPasswordAllowed && (
                            <span className={style.forgotPasswordWrapper}>
                                <a href={url.loginResetCredentialsUrl}>
                                    {msg("doForgotPassword")}
                                </a>
                            </span>
                        )}
                    </div>
                    <div className={style.submitWrapper}>
                        <input
                            type="submit"
                            value={msgStr("doLogIn")}
                            disabled={isLoginButtonDisabled}
                        />
                    </div>
                </form>
            }
            infoNode={
                realm.password &&
                realm.registrationAllowed &&
                !registrationDisabled && (
                    <div className={style.signupWrapper}>
                        <div className={style.signupSeparator}>
                            <span className={style.signupSeparatorLabel}>{msgStr("orWord")}</span>
                        </div>
                        <input
                            type="button"
                            className={style.signupButton}
                            onClick={() => window.location.href=url.registrationUrl}
                            value={msgStr("doRegister")}
                        />
                    </div>
                )
            }
        />
    );
});