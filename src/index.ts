import express from "express";
import app from './app';

console.log("Starting NextEdge Backend...");

const PORT = process.env.PORT || 3000;

console.log("Express app initialized");

app.get("/", (req, res) => {
  console.log("Received request to /");
  res.send("Hello from TypeScript backend!");
});

console.log(`Starting server on port ${PORT}...`);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
