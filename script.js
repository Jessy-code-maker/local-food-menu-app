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

function renderCart() {
  const checkout = document.getElementById("checkout");
  const checkoutContainer = document.querySelector(".c-container");
  checkout.innerHTML = "";

  const itemNames = Object.keys(cart);

  if (itemNames.length === 0) {
    checkoutContainer.style.display = "none";
    return;
  } else {
    checkoutContainer.style.display = "block";
  }

  let subtotal = 0;

  for (let item of itemNames) {
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

  // 👇 Conditional Discount
  let discount = 0;
  if (subtotal >= 50) {
    discount = subtotal * 0.10;
  }

  const total = subtotal - discount;

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("discount").textContent = discount.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2);
}


  function toggleCardFields() {
    const method = document.getElementById("payment-method").value;
    const cardSection = document.getElementById("card-fields");
    cardSection.style.display = method === "card" ? "block" : "none";
  }

  function submitPayment(event) {
    event.preventDefault();

    const name = document.getElementById("customer-name").value;
    const method = document.getElementById("payment-method").value;

    if (!name || !method) {
      alert("Please fill out all required fields.");
      return false;
    }

    alert(`Thank you, ${name}! Your payment via ${method} was submitted.`);

    // Prepare receipt HTML
     const checkoutContent = document.getElementById("checkout-content");
    const now = new Date();
    const receiptTime = now.toLocaleString();
    let subtotal = 0;
    let receiptItems = "";

    for (let item in cart) {
      const { price, quantity } = cart[item];
      const itemTotal = price * quantity;
      subtotal += itemTotal;
      receiptItems += `
        <tr>
          <td>${item}</td>
          <td>${quantity}</td>
          <td>$${price.toFixed(2)}</td>
          <td>$${itemTotal.toFixed(2)}</td>
        </tr>
      `;
    }

    const discount = subtotal * 0.1;
    const total = subtotal - discount;

    checkoutContent.innerHTML = `
  <div id="receipt-preview">
    <h3>Receipt</h3>
    <p><strong>Customer:</strong> ${name}</p>
    <p><strong>Payment Method:</strong> ${method}</p>
    <p><strong>Date:</strong> ${receiptTime}</p>
    <table style="width: 100%; border-collapse: collapse;" border="1">
      <thead>
        <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
      </thead>
      <tbody>${receiptItems}</tbody>
    </table>
    <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
    <p><strong>Discount:</strong> $${discount.toFixed(2)}</p>
    <p><strong>Total Paid:</strong> $${total.toFixed(2)}</p>
    <button onclick="window.print()">🖨️ Print Receipt</button>
    <button onclick="startNewOrder()">➕ Start New Order</button>
  </div>
`;

    // Optionally clear form and cart
    document.getElementById("payment-form").reset();
    toggleCardFields();
    cart = {}; // Clear cart
    document.getElementById("subtotal").textContent = "0.00";
    document.getElementById("discount").textContent = "0.00";
    document.getElementById("total").textContent = "0.00";
  }


  