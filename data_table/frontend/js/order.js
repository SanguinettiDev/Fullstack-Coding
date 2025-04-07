// order.js

const apiUrl = "http://localhost:3000/api"; // Definido só uma vez para todo o arquivo

document.getElementById("order-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const userId = document.getElementById("userId").value;
  const productId = document.getElementById("productId").value;
  const quantity = parseInt(document.getElementById("quantity").value);
  const totalPrice = parseFloat(document.getElementById("totalPrice").value);

  try {
    const response = await fetch(`${apiUrl}/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        products: [{ productId: productId, quantity: quantity }],
        totalPrice: totalPrice,
      }),
    });

    if (response.ok) {
      await loadOrders();
      document.getElementById("order-form").reset();
    } else {
      const errorData = await response.json();
      console.error("Erro ao criar pedido:", errorData);
      alert(errorData.message || "Erro desconhecido ao criar pedido");
    }
  } catch (error) {
    console.error("Erro de rede:", error);
    alert("Não foi possível conectar ao servidor.");
  }
});

async function loadOrders() {
  try {
    const response = await fetch(`${apiUrl}/order`);
    const orders = await response.json();

    const list = document.getElementById("order-list");
    list.innerHTML = "";

    orders.forEach((order) => {
      const li = document.createElement("li");
      li.textContent = `User: ${order.userId} | Total: $${
        order.totalPrice
      } | Created: ${new Date(order.createdAt).toLocaleDateString()}`;
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao carregar pedidos:", error);
    alert("Erro ao carregar pedidos.");
  }
}

// Carrega os pedidos ao abrir a página
loadOrders();
