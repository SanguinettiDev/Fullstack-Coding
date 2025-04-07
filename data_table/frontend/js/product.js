const apiUrl = "http://localhost:3000/api"; // define uma vez aqui

document
  .getElementById("product-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;

    const response = await fetch(`${apiUrl}/product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });

    if (response.ok) {
      await loadProducts(); // await para garantir
      document.getElementById("product-form").reset();
    } else {
      const errorData = await response.json();
      console.error("Erro ao criar produto:", errorData);
      alert(errorData.message || "Erro desconhecido ao criar produto");
    }
  });

async function loadProducts() {
  try {
    const response = await fetch(`${apiUrl}/product`); // <-- com "s" aqui
    const products = await response.json();

    const list = document.getElementById("product-list");
    list.innerHTML = "";

    products.forEach((product) => {
      const li = document.createElement("li");
      li.textContent = `${product.name} - $${product.price}`;
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    alert("Erro ao carregar produtos.");
  }
}

// Carrega os produtos ao abrir a página
loadProducts();
