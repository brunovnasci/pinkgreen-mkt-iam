import { getMsg, KcProps } from "keycloakify";
import { Template } from "keycloakify/lib/components/Template";
import { memo } from "react";
import { KcContext } from "../context";
import style from "./index.module.scss";

type KcContext_LogoutConfirm = Extract<KcContext, { pageId: "logout-confirm.ftl"; }>;

export const LogoutConfirm = memo(({ kcContext, ...props}: { kcContext: KcContext_LogoutConfirm;} & KcProps) => {

        const { url, client, logoutConfirm } = kcContext;
        const { msg, msgStr } = getMsg(kcContext);

        return (
            <Template
                {...{ kcContext, ...props }}
                doFetchDefaultThemeResources={true}
                displayMessage={false}
                headerNode={msg("logoutConfirmTitle")}
                formNode={
                    <>
                        <div className={style.logoutConfirmPage}>
                            <p className={style.logoutConfirmHeader}>{msgStr("logoutConfirmHeader")}</p>
                            <form action={url.logoutConfirmAction} method="POST">
                                <input type="hidden" name="session_code" value={logoutConfirm.code} />
                                <div className={style.submitWrapper}>
                                    <input
                                        name="confirmLogout"
                                        type="submit"
                                        value={msgStr("doLogout")}
                                    />
                                </div>
                            </form>
                            <div>
                                {!logoutConfirm.skipLink && client.baseUrl && (
                                    <p>
                                        <a href={client.baseUrl} dangerouslySetInnerHTML={{ __html: msgStr("backToApplication") }} />
                                    </p>
                                )}
                            </div>
                        </div>
                    </>
                }            
            />
        );
    }
);