import { LitElement, html, css } from "lit-element";
import "./mv-keycloak.js";

export class MvKeycloakDemo extends LitElement {
  static get properties() {
    return {
      auth: { type: Object, attribute: false, reflect: true },
      offline: { type: Boolean, attribute: false, reflect: true },
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
      }
    `;
  }

  constructor() {
    super();
    this.offline = true;
  }

  render() {
    return html`
      <mv-keycloak
        ?offline="${this.offline}"
        settingsPath="./keycloak.json"
        @auth-success="${this.handleLogin}"
        @auth-fail="${this.handleLoginFail}"
        @auth-init-fail="${this.handleLoginFail}"
      >
        <h1>
          This is a secure
          page${this.offline ? html`<small> ( offline )</small>` : html``}
        </h1>

        <button @click="${this.handleLogout}">Logout</button>
      </mv-keycloak>
    `;
  }

  handleLogin(event) {
    const {
      detail: { auth, offline },
    } = event;
    this.auth = auth;
    this.offline = offline;
    console.log("this.auth: ", auth);
    console.log("this.offline: ", offline);
  }

  handleLoginFail() {
    this.auth = null;
  }

  handleLogout() {
    if (!this.offline) {
      this.auth.logout();
    }
  }
}

customElements.define("mv-keycloak-demo", MvKeycloakDemo);
