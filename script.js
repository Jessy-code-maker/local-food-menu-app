//used to manage the order functionality of a restaurant menu app
// This script handles adding items to the order, updating quantities, and submitting payment
  let cart = {};

  function addToOrder(name, price, image) {
    if (!cart[name]) {
      cart[name] = { price, quantity: 1, image };
    } else {
      cart[name].quantity += 1;
    }
    renderCart();
      localStorage.setItem('cartItems', JSON.stringify(cart)); // Save order to localStorage

  }

  // Change quantity of items in the cart
  // This function updates the quantity of an item in the cart, or removes it if the quantity goes to zero
  // It also re-renders the cart and updates the localStorage
  // This function changes the quantity of an item in the cart
  // It takes the item name and the amount to change (positive or negative) 
  // If the quantity goes to zero, it removes the item from the cart
  // It also updates the cart display and localStorage
  function changeQuantity(name, amount) {
    if (cart[name]) {
      cart[name].quantity += amount;
      if (cart[name].quantity <= 0) {
        delete cart[name];
      }
      renderCart();
      localStorage.setItem('cartItems', JSON.stringify(cart)); // Update order in localStorage
    }
  }

  // Render the cart items in the checkout section
  // This function displays the items in the cart, calculates the subtotal, discount, and total
  // It also handles the visibility of the checkout container based on whether there are items in the cart
  // This function renders the cart items in the checkout section
  // It calculates the subtotal, applies a discount if applicable, and displays the total
  function renderCart() {
    const checkout = document.getElementById("checkout");
    const checkoutContainer = document.querySelector(".c-container"); // Ensure checkout container is visible
    checkout.innerHTML = "";
// Get item names from the cart object
    // 👇 Use Object.keys to get item names
    // Get item names from the cart object
    const itemNames = Object.keys(cart);

  if (itemNames.length === 0) {
    checkoutContainer.style.display = "none";
    return;
  } else {
    checkoutContainer.style.display = "block";
  }

  // Initialize subtotal
  // Initialize subtotal to 0
    let subtotal = 0;
// Loop through each item in the cart
    // Loop through each item in the cart 
    // Calculate the total price for each item and add it to the subtotal
    // Create a div for each item and append it to the checkout section
    itemNames.forEach(item => {
      const { price, quantity, image } = cart[item];
      const itemTotal = price * quantity;
      subtotal += itemTotal;
//use template literals to create the HTML structure for each item
      // Create a div for each item and append it to the checkout section
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
    });


    // 👇 Conditional Discount
    // Check if subtotal is greater than or equal to 50 for discount
    // If so, apply a 10% discount
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



// Payment form handling
// This function handles the payment form submission, validates input, and displays a receipt
  function submitPayment(event) {
    event.preventDefault();

     document.getElementById("loading-spinner").style.display = "flex";

    const name = document.getElementById("customer-name").value;
    const method = document.getElementById("payment-method").value;

    if (!name || !method) {
      alert("Please fill out all required fields.");
      document.getElementById("loading-spinner").style.display = "none";
      return false;
    }
// Simulate a delay for payment processing
    // This simulates a delay for payment processing, allowing the loading spinner to be visible
    setTimeout(() => {
    alert(`Thank you, ${name}! Your payment via ${method} was submitted.`);
     document.getElementById("loading-spinner").style.display = "none";
    // Prepare receipt HTML
    // This function generates a receipt based on the current cart items and payment method
    // It displays the receipt in the checkout content area and allows printing or starting a new order
    // const checkoutContent = document.getElementById("checkout-content");
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

    const discount = subtotal >= 50 ? subtotal * 0.1 : 0;
    const total = subtotal - discount;

     const receiptHtml = `
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
    `;

    
    document.getElementById("receipt-preview").innerHTML = receiptHtml;
    showModal();

    // Optionally clear form or redirect
    // This resets the payment form and cart, allowing the user to start a new order
    document.getElementById("payment-form").reset();
    toggleCardFields();
    cart = {};
    renderCart();
    localStorage.removeItem('cartItems');
  }, 1000);
}

function showModal() {
  document.getElementById("receipt-modal").style.display = "block";
}

function closeModal() {
  document.getElementById("receipt-modal").style.display = "none";
}

function printReceipt() {
  window.print();
}



  // Start a new order
  // This function resets the cart and form, allowing the user to start a new order
   function startNewOrder() {
  cart = {};
  renderCart();
   document.getElementById("payment-form").reset();
   toggleCardFields();
  localStorage.removeItem('cartItems');
 }


// Automatically attach print and close logic
setTimeout(() => {
  document.getElementById("printBtn").addEventListener("click", () => {
    window.print();
    setTimeout(() => {
      window.open('', '_self').close();
    }, 500); // Give print a moment before closing
  });
}, 100);


//category filtering
  function showCategory(category, event) {
  const dishes = document.querySelectorAll('.dish');
  const buttons = document.querySelectorAll('.category-nav button');
  dishes.forEach(dish => {
    dish.style.display = (category === 'all' || dish.getAttribute('data-category') === category) ? 'block' : 'none';
  });
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

 window.onload = function() {
  const saved = localStorage.getItem('cartItems');
  if (saved) {
    cart = JSON.parse(saved);
    renderCart();
  }
};   
 