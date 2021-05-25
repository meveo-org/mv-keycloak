import { LitElement, html, css } from "lit-element";
import "./mv-keycloak.js";

export class MvKeycloakDemo extends LitElement {
  static get properties() {
    return {
      auth: { type: Object, attribute: false, reflect: true },
      failed: { type: Boolean },
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
    this.failed = false;
  }

  render() {
    return html`
      <mv-keycloak
        settings-path="./keycloak.json"
        @auth-success="${this.handleLogin}"
        @auth-fail="${this.handleLoginFail}"
        @auth-init-fail="${this.handleLoginFail}"
      >
        <h1>This is a secure page</h1>
        <button @click="${this.handleLogout}">Logout</button>
        <div slot="loading">This message is shown while loading...</div>
        <div slot="authenticating">
          This message is shown while authenticating...
        </div>
        <div slot="failed">This message is shown when authentication fails</div>
      </mv-keycloak>
    `;
  }

  handleLogin(event) {
    const {
      detail: { auth },
    } = event;
    this.auth = auth;
  }

  handleLoginFail() {
    this.auth = null;
    this.failed = true;
  }

  handleLogout() {
    if (!!this.auth) {
      this.auth.logout();
    }
  }
}

customElements.define("mv-keycloak-demo", MvKeycloakDemo);
