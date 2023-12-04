/**
 * WebComponent
 * @class
 * @constructor
 * @public
 */
class WebComponent extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
	}

	/**
	 * connectedCallback
	 * Render html/css & attatch event listeners
	 */
	connectedCallback() {
		/**
		 * @type {string}
		 */
		this.text = this.getAttribute('text') || 'My text';

		// Render
		this.render();

		/**
		 * @type {HTMLButtonElement | null}
		 */
		this.button = this.shadowRoot.querySelector('button');
		this.button.addEventListener('click', this);
	}

	/**
	 * disconnectedCallback
	 * Remove listeners.
	 */
	disconnectedCallback() {
		this.button.removeEventListener('click', this);
	}

	/**
	 * handles all events, routes them to on`Eventname` for each.
	 * E.g. a `click` event will call `this.onClick`,
	 * a focus event will call `this.onFocus`.
	 * @param {Event} event - event.
	 */
	handleEvent(event) {
		this[`on${event.type.charAt(0).toUpperCase() + event.type.slice(1)}`](
			event
		);
	}

	/**
	 * On click callback.
	 * @param {Event} e - on click callback.
	 */
	onClick(e) {
		/* eslint-disable-next-line no-console */
		console.log(e, this.text);
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

window.customElements.define('web-component', WebComponent);
