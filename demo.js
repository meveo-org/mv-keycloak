import { LitElement, html, css } from "lit-element";
import "./mv-keycloak.js";

export class MvKeycloakDemo extends LitElement {
  static get properties() {
    return {
      auth: { type: Object, attribute: false, reflect: true }
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

  render() {
    return html`
      <mv-keycloak
        settingsPath="./keycloak.json"
        @auth-success="${this.handleLogin}"
        @auth-fail="${this.handleLoginFail}"
        @auth-init-fail="${this.handleLoginFail}"
      >
        <h1>This is a secure page</h1>
        <button @click="${this.handleLogout}">Logout</button>
      </mv-keycloak>
    `;
  }

  handleLogin(event) {
    const { detail: { auth } } = event;
    this.auth = auth;
  }

  handleLoginFail() {
    this.auth = null;
  }

  handleLogout() {
    this.auth.logout();
  }
}

customElements.define("mv-keycloak-demo", MvKeycloakDemo);
