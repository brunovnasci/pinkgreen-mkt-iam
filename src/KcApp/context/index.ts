
import { getKcContext } from "keycloakify";

export const { kcContext } = getKcContext<
	{
		pageId: "register-user-profile.ftl";
	}
>({
	"mockPageId": "register-user-profile.ftl",
	"mockData": [
		{
			"pageId": "register-user-profile.ftl",
			"locale": {
				"currentLanguageTag": "pt-BR"
			},
			"profile": {
				"attributes": [
					{
						"validators": {
							"pattern": {
								"pattern": "^[a-zA-Z0-9]+$",
								"ignore.empty.value": true,
								// eslint-disable-next-line no-template-curly-in-string
								"error-message": "${alphanumericalCharsOnly}",
							},
						},
						"value": undefined,
						"name": "username",
					},
					{
						"validators": {
							"pattern": {
								// eslint-disable-next-line
								"pattern": "^\\([0-9]{2}\\) [0-9]{5}-[0-9]{4}$",
								"ignore.empty.value": true,
								// eslint-disable-next-line no-template-curly-in-string
								"error-message": "${phoneValueError}",
							},
						},
						// eslint-disable-next-line no-template-curly-in-string
						"displayName": "${phone}",
						"annotations": {},
						"required": true,
						"groupAnnotations": {},
						"readOnly": false,
						"name": "phone",
					},
					{
						"validators": {
							"pattern": {
								// eslint-disable-next-line
								"pattern": "^\\d{3}\\x2E\\d{3}\\x2E\\d{3}\\x2D\\d{2}$",
								"ignore.empty.value": true,
								// eslint-disable-next-line no-template-curly-in-string
								"error-message": "${cpfValueError}",
							},
						},
						// eslint-disable-next-line no-template-curly-in-string
						"displayName": "${cpf}",
						"annotations": {},
						"required": true,
						"groupAnnotations": {},
						"readOnly": false,
						"name": "CPF",
					}
				],
			},
		},

	]
});

export type KcContext = NonNullable<typeof kcContext>;