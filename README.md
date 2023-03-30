# Pinkgreen MKT - IAM
Custom Keycloak pages implementation powered by [Keycloakify](https://www.keycloakify.dev/).

### Requirements
  * Java 11
  * Maven
  * Docker
  * Node.js 14
  * Yarn

## Steps 
### Build the project
  * Before **developing** or **build final Keycloak image**, you need to build the project, run the follow command to do it:
    ```bash
    $ yarn keycloak
    ```

### Start development server
  * Open the [KcContext file](https://github.com/brunovnasci/pinkgreen-mkt-iam/blob/main/src/KcApp/context/index.ts) and uncomment the `mockPageId` attribute.
  * Run the follow command to start development server:
    ```bash
    $ yarn start
    ```
  * The application will be opened on your browser and now you are able to code! 


### Building the final Keycloak image
  * Then, you need to build the docker image:
    ```bash
    $ docker build . -t brunovnasci/pinkgreen-mkt-iam:1.0.0
    ```
  * Finally you can run the keycloak instance:
    ```bash
    $ docker run --name pinkgreen-mkt-iam -p 8080:8080 -it brunovnasci/pinkgreen-mkt-iam:1.0.0 start-dev --import-realm
    ```
  * The instance will be hosted on http://localhost:8080/. 
  * Access the Admin console with `username: admin` and `password: admin` on http://localhost:8080/admin.
