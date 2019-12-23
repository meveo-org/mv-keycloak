# mv-keycloak

 MvKeycloak is a Meveo component (based on lit-element) that allows meveo page components to be secured by [Keycloak](https://www.keycloak.org/).

## Features
* Written in vanilla javascript
* Simplifies keycloak integration with page components


## Quick Start

To use MvKeycloak component:

1. Clone this repo.
2. Serve the project from the root directory with some http server (best served with meveo itself)
3. Download the Keycloak OIDC JSON configuration file as described here [https://www.keycloak.org/docs/latest/authorization_services/#obtaining-the-adapter-configuration](https://www.keycloak.org/docs/latest/authorization_services/#obtaining-the-adapter-configuration)
4. Copy the `keycloak.json` file obtained from step 3 into the project directory.
5. Import `mv-keycloak` into the page and wrap the page component with the `mv-keycloak` tag. e.g.

   ```html
        <mv-keycloak
            settingsPath="./keycloak.json"
            @auth-success="${this.handleLogin}"
            @auth-fail="${this.handleLoginFail}"
            @auth-init-fail="${this.handleLoginFail}"
        >
            <h1>This is a secure page</h1>
            <button @click="${this.handleLogout}">Logout</button>
        </mv-keycloak>
    ```

## Acknowledgements

* Uses [Keycloak](https://www.keycloak.org/)
