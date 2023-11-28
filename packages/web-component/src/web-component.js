/**
 * WebComponent
 * @class
 * @constructor
 * @public
 */
class WebComponent extends HTMLElement {
	constructor() {
		super();

		/**
		 * Bind methods to this
		 */
		this.onClick = this.onClick.bind(this);

		/**
		 * @type {ShadowRoot}
		 */
		this.shadow = this.attachShadow({ mode: 'open' });
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
		this.button = this.shadow.querySelector('button');

		// Attach event listeners
		if (this.button) {
			this.button.addEventListener('click', this.onClick);
		}
	}

	/**
	 * disconnectedCallback
	 * Remove listeners.
	 */
	disconnectedCallback() {
		if (this.button) {
			this.button.removeEventListener('click', this.onClick);
		}
	}

	/**
	 * On click callback.
	 * @param {Event & { target: HTMLButtonElement }} e - on click callback.
	 */
	onClick(e) {
		/* eslint-disable-next-line no-console */
		console.log(e, this.text);
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

window.customElements.define('web-component', WebComponent);
