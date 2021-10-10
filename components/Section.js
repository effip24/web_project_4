export default class Section {
  /** constructor of Section class.
   * @param renderer - function responsible for creating and rendering data on a page.
   * @param {string} cardSelector -  CSS class selector of a container to add elemets to.
   */
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  /** this function takes a DOM element and adds it to the container.
   * @param evt - the element to be added.
   */
  addItem(element) {
    this._container.prepend(element);
  }

  /** this function will render each element on a page. */
  renderItems() {
    this._renderer();
  }
}
