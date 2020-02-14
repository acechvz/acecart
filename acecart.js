const AceCart = (function() {
  function Cart(name) {
    this.name = name;
    this.products = [];

    Object.defineProperty(this, "products", {
      value: [],
      enumerable: false,
      configurable: false
    });

    this.load();
  }

  Cart.prototype.exists = function(id) {
    return this.products.find(el => el.id === id);
  };

  Cart.prototype.add = function(product) {
    if (
      typeof product !== "object" ||
      !product.hasOwnProperty("id") ||
      typeof product.id !== "number"
    )
      throw new Error("invalid product");

    if (!this.exists(product.id))
      this.products.push({
        ...product,
        quantity: 1
      });
    else
      this.products = this.products.map(item => {
        if (item.id === product.id) item.quantity++;
        return item;
      });

    this.save();
  };

  Cart.prototype.remove = function(id) {
    if (!id || typeof id !== "number") throw new Error("bad id, check it!");

    if (this.exists(id))
      this.products = this.products.filter(el => el.id !== id);

    this.save();
  };

  Cart.prototype.clear = function() {
    this.products = [];
    this.save();
  };

  Cart.prototype.countItems = function() {
    return this.products.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0);
  };

  Cart.prototype.total = function() {
    return this.products.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
  };

  Cart.prototype.move = function(id, target) {
    if (!this.exists.call(target, id)) {
      const product = this.products.find(el => el.id === id);
      this.add.call(target, product);
      this.remove(product.id);
      this.save.call(target);
    }
    this.save();
  };

  Cart.prototype.getItems = function() {
    return this.products;
  };

  Cart.prototype.save = function() {
    if (this.products.length)
      localStorage.setItem(`${this.name}Cart`, JSON.stringify(this.products));
  };

  Cart.prototype.load = function() {
    const storageItems = localStorage.getItem(`${this.name}Cart`);
    if (!storageItems) this.clear();
    else this.products = JSON.parse(storageItems);
  };

  return Cart;
})();

const shopping = new AceCart("shopping");
