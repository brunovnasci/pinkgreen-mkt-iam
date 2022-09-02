#!/bin/bash

docker rm keycloak-testing-container || true

cd /projects/pinkgreen/pinkgreen-mkt-iam/build_keycloak

docker run \
   -p 8080:8080 \
   --name keycloak-testing-container \
   -e KEYCLOAK_ADMIN=admin \
   -e KEYCLOAK_ADMIN_PASSWORD=admin \
   -e JAVA_OPTS=-Dkeycloak.profile=preview \
   -v /projects/pinkgreen/pinkgreen-mkt-iam/build_keycloak/src/main/resources/theme/pinkgreen-mkt-iam:/opt/keycloak/themes/pinkgreen-mkt-iam:rw \
   -it quay.io/keycloak/keycloak:18.0.2 \
   start-dev
