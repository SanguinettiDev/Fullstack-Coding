const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const plantationRoutes = require("./routes/plantationRoutes");
const app = express();
const PORT = process.env.PORT || 3000;
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");

// Middleware para parse de JSON
app.use(express.json());

app.use(cors());

// Conectando ao MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado ao MongoDB!");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao MongoDB:", err);
  });

// Usando rotas
app.use("/api/users", userRoutes);
app.use("/api/plantations", plantationRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/product", productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.get("/", (req, res) => {
  res.redirect("/api/users");
});
