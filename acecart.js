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

    const item = this.exists(id);
    if (item) {
      const doDelete = confirm(`¿Eliminar "${item.name} de su carrito?"`);
      if (doDelete) {
        this.products = this.products.filter(el => el.id !== id);
      }
    }

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
    localStorage.setItem(`${this.name}Cart`, JSON.stringify(this.products));
    this.refresh();
  };

  Cart.prototype.refresh = function() {
    const counter = document.querySelector("[data-items-count]");
    const total = document.querySelector("[data-cart-total]");
    const priceBlock = document.querySelector(".cart-price");
    const purchaseButton = document.querySelector("[data-cart-buy]");
    if (counter) {
      counter.textContent = this.countItems();
    }

    if (total) {
      total.textContent = this.total()
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    if (!this.countItems()) {
      priceBlock.classList.add("hide");
      purchaseButton.classList.add("disabled");
    } else {
      priceBlock.classList.remove("hide");
      purchaseButton.classList.remove("disabled");
    }

    this.showItems();
  };

  Cart.prototype.showItems = function() {
    const dropdown = document.querySelector("[data-cart-list]");

    if (dropdown && this.products.length) {
      let cartContent = "";
      this.products.forEach(product => {
        cartContent += `
            <div class="cart-dropdown-item">
                <button class="delete" onclick="${this.name}.remove(${product.id})"><i class="fa fa-times"></i></button>
                <img src="${product.image}" alt="">
                <span>
                    ${product.name} <br>
                    <small>$<span>${product.price}</span></small>
                </span>
                <span>${product.quantity}</span>
            </div>`;
      });

      dropdown.innerHTML = cartContent;
    } else {
      dropdown.innerHTML = `
        <h4 style="color: black">
            Cart is empty <br>
            <small style="font-weight: 300">Start adding some items</small>
        </h4>`;
    }
  };

  Cart.prototype.load = function() {
    const storageItems = localStorage.getItem(`${this.name}Cart`);
    if (!storageItems) this.clear();
    else this.products = JSON.parse(storageItems);

    this.refresh();
  };

  return Cart;
})();
