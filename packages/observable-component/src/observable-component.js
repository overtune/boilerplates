/**
 * WebComponent
 * @class
 * @constructor
 * @public
 */
export class ObservableComponent extends HTMLElement {
  /**
   * constructor
   * @param {string[]} observedAttributes - list of observedAttributes.
   */
  constructor(observedAttributes) {
    super();
    const component = this;
    observedAttributes.forEach((attribute) => {
      Object.defineProperty(ObservableComponent.prototype, attribute, {
        get: function() {
          return component.getAttribute(attribute);
        },
        set: function(val) {
          component.setAttribute(attribute, val);
        },
      });
    });
  }
}
