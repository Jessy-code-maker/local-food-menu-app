  let cart = {};

  function addToOrder(name, price, image) {
    if (!cart[name]) {
      cart[name] = { price, quantity: 1, image };
    } else {
      cart[name].quantity += 1;
    }
    renderCart();
  }

  function changeQuantity(name, amount) {
    if (cart[name]) {
      cart[name].quantity += amount;
      if (cart[name].quantity <= 0) {
        delete cart[name];
      }
      renderCart();
    }
  }

  function renderCart() {
    const checkout = document.getElementById("checkout");
    checkout.innerHTML = "";

    let subtotal = 0;

    for (let item in cart) {
      const { price, quantity, image } = cart[item];
      const itemTotal = price * quantity;
      subtotal += itemTotal;

      const div = document.createElement("div");
      div.className = "checkout-item";

      div.innerHTML = `
        <img src="${image}" alt="${item}">
        <div class="item-details">
          <strong>${item}</strong><br>
          $${price.toFixed(2)} x ${quantity} = $${itemTotal.toFixed(2)}
          <div class="quantity-controls">
            <button onclick="changeQuantity('${item}', -1)">−</button>
            <span>${quantity}</span>
            <button onclick="changeQuantity('${item}', 1)">+</button>
          </div>
        </div>
      `;

      checkout.appendChild(div);
    }

    const discount = subtotal * 0.10;
    const total = subtotal - discount;

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("discount").textContent = discount.toFixed(2);
    document.getElementById("total").textContent = total.toFixed(2);
  }
