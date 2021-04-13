export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(data) {
    this._items.unshift(data);
    this._container.prepend(this._renderer(data));
  }

  removeElementById(id) {
    this._items
      .find((item) => item._id === id)
      .getElement()
      .remove();

    this._items.splice(
      this._items.findIndex((item) => item._id === id),
      1
    );
  }
}
