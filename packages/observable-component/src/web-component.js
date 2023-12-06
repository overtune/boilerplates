import { ObservableComponent } from "./observable-component.js";
/**
 * WebComponent
 * @class
 * @constructor
 * @public
 */
class WebComponent extends ObservableComponent {
	static observedAttributes = ["value", "query"];

	constructor() {
		super(WebComponent.observedAttributes);

		this.attachShadow({ mode: "open" });
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
		this.button = this.shadowRoot.querySelector("button");
		this.button.addEventListener("click", this);
	}

	/**
	 * disconnectedCallback
	 * Remove listeners.
	 */
	disconnectedCallback() {
		this.button.removeEventListener("click", this);
	}

	/**
	 * attributeChangedCallback
	 * Handle attribute changes.
	 * @param {string} name - Name of changed attribute.
	 * @param {string} _oldValue - Old value of attribute.
	 * @param {string} newValue - New value of attribute.
	 */
	attributeChangedCallback(name, _oldValue, newValue) {
		console.log(name, newValue);
	}

	/**
	 * handles all events, routes them to on`Eventname` for each.
	 * E.g. a `click` event will call `this.onClick`,
	 * a focus event will call `this.onFocus`.
	 * @param {Event} event - event.
	 */
	handleEvent(event) {
		this[`on${event.type.charAt(0).toUpperCase() + event.type.slice(1)}`](
			event,
		);
	}

	/**
	 * On click callback.
	 * @param {Event} e - on click callback.
	 */
	onClick(e) {
		/* eslint-disable-next-line no-console */
		this.value = "OK";

		setTimeout(() => {
			this.query = "hello";
		}, 5000);
	}

	/**
	 * Renders the component html/css.
	 */
	render() {
		this.shadowRoot.innerHTML = `
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

window.customElements.define("web-component", WebComponent);
