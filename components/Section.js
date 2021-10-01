export default class Section {
  /** constructor of Section class
   * @param item - serves as an array of data to be added on a page.
   * @param renderer - function responsible for creating and rendering data on a page.
   * @param {string} cardSelector -  CSS class selector of a container to add elemets to.
   */
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  /** this function takes a DOM element and adds it to the container.
   * @param evt - the element to be added.
   */
  addItem(element) {
    this._container.prepend(element);
  }

  /** this function will render each element on a page.
   */
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
