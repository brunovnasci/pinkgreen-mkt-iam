import { getMsg, KcProps } from "keycloakify";
import { Template } from "keycloakify/lib/components/Template";
import { memo } from "react";
import { KcContext } from "../context";
import style from "./index.module.scss";

type KcContext_Error = Extract<KcContext, { pageId: "error.ftl"; }>;

export const Error = memo(({ kcContext, ...props }: { kcContext: KcContext_Error } & KcProps) => {
    const { message, client } = kcContext;

    const { msg } = getMsg(kcContext);

    return (
        <Template
            {...{ kcContext, ...props }}
            doFetchDefaultThemeResources={true} 
            displayMessage={false}
            headerNode={msg("errorTitle")}
            formNode={
                <div className={style.errorPage}>
                    <p className={style.errorDescription}>{message.summary}</p>
                    {client !== undefined && client.baseUrl !== undefined && (
                        <p>
                            <a href={client.baseUrl}>
                                {msg("backToApplication")}
                            </a>
                        </p>
                    )}
                </div>
            }
        />
    );
}
);
