import { LitElement, html, css } from "lit-element";
import "./keycloak.js";

export class MvKeycloak extends LitElement {
  static get properties() {
    return {
      // the path to the keycloak.json file e.g. "./keycloak.json"
      settingsPath: { type: String, attribute: true },
      // the number of seconds left before the token expires, default is 10
      minimumValidity: { type: Number, attribute: true },
      auth: { type: Object, attribute: false, reflect: true },
      authenticated: { type: Boolean, attribute: false, reflect: true },
      offline: { type: Boolean, attribute: false, reflect: true },
    };
  }

  constructor() {
    super();
    this.auth = null;
    this.authenticated = false;
    this.minimumValidity = 10;
    this.offline = false;
  }

  render() {
    const { auth, authenticated, minimumValidity } = this;
    if (auth) {
      const expired = auth.isTokenExpired(minimumValidity);
      const valid = authenticated && !expired;
      return valid ? html`<slot></slot>` : html`<h1>Loading...</h1>`;
    }
    return html``;
  }

  connectedCallback() {
    const { offline } = this;
    if (!offline) {
      const self = this;
      const keycloak = new Keycloak(this.settingsPath);
      keycloak
        .init({ onLoad: "login-required", promiseType: "native" })
        .then(function (authenticated) {
          if (authenticated) {
            self.auth = keycloak;
            self.authenticated = authenticated;
            self.dispatchEvent(
              new CustomEvent("auth-success", {
                detail: { offline, auth: keycloak },
              })
            );
          } else {
            self.dispatchEvent(new CustomEvent("auth-fail"));
          }
        })
        .catch(function () {
          self.dispatchEvent(new CustomEvent("auth-init-fail"));
        });
    } else {
      new CustomEvent("auth-success", { detail: { offline } });
    }

    super.connectedCallback();
  }
}

customElements.define("mv-keycloak", MvKeycloak);
