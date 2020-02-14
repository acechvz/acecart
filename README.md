### Initializing

Create a new cart by passing a name to identify it later.

```javascript
const shopping = new AceCart('shopping')
```
### Multiple carts
You can create more than one cart if you need, maybe you want to have a separate one to hold a wishlist.

```javascript
const shopping = new AceCart('shopping');
const wishlist = new AceCart('wishlist');
```

### Add a product
if you need to add a new item to a cart you can simply call its add method. This method will receive an object, be sure to include an ***id*** property to your products.

```javascript
const product = {
	id: 1,
	name: 'Sample Product',
	price: 199
}

shopping.add( product )
```
#### Updating the quantity
If you add the same item again the quantity in the cart will be automatically updated.
```javascript
shopping.add( product )
```
```json
[{
	id: 1,
	name: 'Sample Product',
	price: 199,
	quantity: 2
}]
```

### Get items
Get the array of items in the current cart.
```javascript
shopping.getItems()
```

This will return an array like this.
```json
[{
	id: 1,
	name: 'Sample Product',
	price: 199,
	quantity: 2
}]
```
### Count items in cart
Retrieve the number of items in the cart.
```javascript
shopping.countItems() // 2
```

### Total
Get the grand total of the cart.
```javascript
shopping.total() // 398
```


### Remove a product
Delete a product by passing the ***id***.

```javascript
shopping.remove( 1 )
```

### Clear  the cart
Clear the entire cart leaving it completly empty.

```javascript
shopping.clear()
```

### Move items between carts
You are able to move items between carts (if you have created more than one). An ***id*** is needed to identify the item you want to move from the current cart and the target cart you want that item to be placed.

```javascript
shopping.move(1, wishlist) // Move an item from shopping to wishlist cart

shopping.getItems(); // []
wishlist.getItems(); // [{id:1, name:'Sample Product', price: 199}]
```

## ToDo

 - [ ] Add tax support
 - [ ] Retrieve items in cart formatted to be visible in DOM
 - [ ] Handle data attributes support to avoid object creation for each item
