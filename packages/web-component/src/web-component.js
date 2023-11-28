const HTMLElementBase =
  typeof HTMLElement === "undefined" ? function() { } : HTMLElement;

/**
 * WebComponent
 * @class
 * @constructor
 * @public
 */
class WebComponent extends HTMLElementBase {
  constructor() {
    super();

    /**
     * Bind methods to this
     */
    this.initiateKundoChat = this.initiateKundoChat.bind(this);

    /**
     * @type {ShadowRoot}
     */
    this.shadow = this.attachShadow({ mode: "open" });
  }

  /**
   * connectedCallback
   * Render html/css & attatch event listeners
   */
  connectedCallback() {
    /**
     * @type {string}
     */
    this.text = this.getAttribute("text") || "My text";

    // Render
    this.render();

    /**
     * @type {HTMLButtonElement | null}
     */
    this.button = this.shadow.querySelector("button");

    // Attach event listeners
    this.button &&
      this.button.addEventListener("click", this.onClick);
    );
  }

  /**
   * disconnectedCallback
   * Remove listeners.
   */
  disconnectedCallback() {
    this.button &&
      this.button.removeEventListener("click", this.onClick);
  }

  /**
   * On click callback.
   */
  onClick(e) {
    console.log('click');
  }

  /**
   * Renders the component html/css.
   */
  render() {
    this.shadow.innerHTML = `
    <style>
        :host {
          --color: var(--wc-color, #333);
        }
        #app {
          color: var(--color);
        }
    </style>
      
      <div id="app">
        <h1>Web Component</h1>
        <button type="button">${this.text}</button>
      </div>
    `;
  }
}

if (typeof window !== "undefined") {
  if (typeof window.customElements !== "undefined") {
    window.customElements.define("web-component", WebComponent);
  }
}
export { };
