import { getMsg, useFormValidationSlice } from "keycloakify";
import { Template } from "keycloakify/lib/components/Template";
import { KcProps } from "keycloakify/lib/components/KcProps";
import { memo, useEffect, useState } from "react";
import { useCssAndCx } from "tss-react";
import { useCallbackFactory } from "powerhooks/useCallbackFactory";
import { KcContext } from "../context";
import Input from "../../components/Input";
import InputMask from "../../components/InputMask";
import styles from "./index.module.scss";

type KcContext_RegisterUserProfile = Extract<KcContext, { pageId: "register-user-profile.ftl"; }>;

export const RegisterUserProfile = memo(({ kcContext, ...props }: { kcContext: KcContext_RegisterUserProfile; } & KcProps) => {
    const { url, messagesPerField } = kcContext;

    const { 
        formValidationState: { fieldStateByAttributeName, isFormSubmittable },
        formValidationReducer,
        attributesWithPassword
    } = useFormValidationSlice({kcContext});

    const { msg, advancedMsg, msgStr } = getMsg(kcContext);

    const { cx } = useCssAndCx();

    const [isFomSubmittable, setIsFomSubmittable] = useState(false);

    useEffect(() => {
        setIsFomSubmittable(isFormSubmittable);
    }, [isFormSubmittable]);

    const onChangeFactory = useCallbackFactory(
        (
            [name]: [string],
            [
                {
                    target: { value },
                },
            ]: [React.ChangeEvent<HTMLInputElement | HTMLSelectElement>],
        ) => formValidationReducer({
            "action": "update value",
            name,
            "newValue": value,
        }),
    );

    const onBlurFactory = useCallbackFactory(([name]: [string]) => formValidationReducer({
        "action": "focus lost",
        name,
    }));

    return (
        <Template
            {...{ kcContext, ...props }}
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields={true}
            doFetchDefaultThemeResources={true}
            headerNode={msg("registerTitle")}
            formNode={
                <form id="kc-register-form" className={cx(props.kcFormClass)} action={url.registrationAction} method="post">
                    {attributesWithPassword.map((attribute, i) => {
                        const { value, displayableErrors } = fieldStateByAttributeName[attribute.name];

                        switch(attribute.name) {
                            case "phone": 
                                return <InputMask
                                    id={attribute.name}
                                    key={attribute.name}
                                    name={attribute.name}
                                    mask="telephone"
                                    label={advancedMsg(attribute.displayName)}
                                    type="tel"
                                    onChange={onChangeFactory(attribute.name)}
                                    onBlur={onBlurFactory(attribute.name)}
                                    value={value}
                                    disabled={attribute.readOnly}
                                    errorMessage={displayableErrors[0]?.errorMessageStr}
                                />
                            case "CPF":
                                return <InputMask
                                    id={attribute.name}
                                    key={attribute.name}
                                    name={attribute.name}
                                    mask="cpf"
                                    label={advancedMsg(attribute.displayName)}
                                    type="text"
                                    onChange={onChangeFactory(attribute.name)}
                                    onBlur={onBlurFactory(attribute.name)}
                                    value={value}
                                    disabled={attribute.readOnly}
                                    errorMessage={displayableErrors[0]?.errorMessageStr}
                                />
                            case "password-confirm":
                            case "password":
                                return <Input
                                    id={attribute.name}
                                    key={attribute.name}
                                    name={attribute.name}
                                    label={advancedMsg(attribute.displayName)}
                                    type="password"
                                    onChange={onChangeFactory(attribute.name)}
                                    onBlur={onBlurFactory(attribute.name)}
                                    value={value}
                                    disabled={attribute.readOnly}
                                    errorMessage={displayableErrors[0]?.errorMessageStr}
                                />
                            default:
                                return <Input
                                    id={attribute.name}
                                    key={attribute.name}
                                    label={advancedMsg(attribute.displayName)}
                                    type="text"
                                    onChange={onChangeFactory(attribute.name)}
                                    onBlur={onBlurFactory(attribute.name)}
                                    name={attribute.name}
                                    value={value}
                                    className={cx(props.kcInputClass)}
                                    aria-invalid={displayableErrors.length !== 0}
                                    disabled={attribute.readOnly}
                                    autoComplete={attribute.autocomplete}
                                    errorMessage={displayableErrors[0]?.errorMessageStr}
                                />
                        }
                    })}
                    <div className={styles.buttonsWrapper}>
                        <div className={styles.backLoginWrapper}>
                            <span>
                                <a href={url.loginUrl}>{msg("backToLogin")}</a>
                            </span>
                        </div>
                        <div className={styles.submitWrapper}>
                            <input
                                type="submit"
                                value={msgStr("doRegister")}
                                disabled={!isFomSubmittable}
                            />
                        </div>
                    </div>
                </form>
            }
        />
    );
})