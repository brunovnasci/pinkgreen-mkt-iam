FROM quay.io/keycloak/keycloak:18.0.2

ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin
ENV JAVA_OPTS=-Dkeycloak.profile=preview

COPY ./keycloak/imports /opt/keycloak/data/import
COPY ./build_keycloak/src/main/resources/theme/pinkgreen-mkt-iam /opt/keycloak/themes/pinkgreen-mkt-iam
EXPOSE 8080