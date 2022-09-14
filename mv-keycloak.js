import { LitElement, html } from "lit";
import Keycloak from "keycloak-js";

export class MvKeycloak extends LitElement {
  static get properties() {
    return {
      // the path to the keycloak.json file e.g. "./keycloak.json"
      settingsPath: { type: String, attribute: "settings-path", reflect: true },
      // the number of seconds left before the token expires, default is 10
      minValidity: { type: Number, attribute: "min-validity", reflect: true },
      auth: { type: Object, attribute: false, reflect: true },
      authenticated: { type: Boolean, attribute: false, reflect: true },
      failed: { type: Boolean, attribute: false, reflect: true },
    };
  }

  constructor() {
    super();
    this.settingsPath = "./keycloak.json";
    this.auth = null;
    this.authenticated = false;
    this.failed = false;
    this.minValidity = 10;
  }

  render() {
    const { auth, authenticated, failed, minValidity } = this;
    if (auth) {
      const expired = auth.isTokenExpired(minValidity);
      const valid = authenticated && !expired;
      return valid
        ? html`<slot></slot>`
        : html`<slot name="loading"><b>Loading...</b></slot>`;
    }
    if (failed) {
      return html`<slot name="failed"><b>Authentication failed</b></slot>`;
    }
    return html`
      <slot name="authenticating">
        <b>Authenticating...</b>
      </slot>
    `;
  }

  connectedCallback() {
    const self = this;
    const keycloak = new Keycloak(this.settingsPath);
    keycloak
      .init({ onLoad: "login-required", promiseType: "native", "checkLoginIframe": false })
      .then(function (authenticated) {
        if (authenticated) {
          self.failed = false;
          self.auth = keycloak;
          self.authenticated = authenticated;
          self.dispatchEvent(
            new CustomEvent("auth-success", {
              detail: { auth: keycloak },
            })
          );
        } else {
          self.failed = true;
          self.dispatchEvent(new CustomEvent("auth-fail"));
        }
      })
      .catch(function () {
        self.failed = true;
        self.dispatchEvent(new CustomEvent("auth-init-fail"));
      });

    super.connectedCallback();
  }
}

customElements.define("mv-keycloak", MvKeycloak);
