/** eslint ignore-line */
import { component, signal } from './lib/reef.es.min.js';

/**
 * WebComponent
 * @class
 * @constructor
 * @public
 */
class WebComponent extends HTMLElement {
	constructor() {
		super();

		this.count = signal(0);
		this.value = signal('');
		this.events = {
			countUp: () => {
				this.count.value += 1;
			},
			/**
			 * changevalue callback.
			 * @param {Event & { target: HTMLInputElement }} e - input on key up event.
			 */
			changevalue: (e) => {
				this.value.value = e.target.value;
			},
		};
		component(this, this.template, { events: this.events });
	}

	template = () => `
			<div>
				<p>Value: ${this.value.value}</p>
				<input type="text" value="${this.value.value}" onkeyup="changevalue()" />
				<button onclick="countUp()">Clicked ${this.count.value} times</button>
			</div>`;
}

window.customElements.define('web-component', WebComponent);
