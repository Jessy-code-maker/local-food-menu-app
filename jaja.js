// Payment form handling
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

    // Optionally clear form or redirect
    document.getElementById("payment-form").reset();
    toggleCardFields(); // Hide card fields again

    return false;
  }
