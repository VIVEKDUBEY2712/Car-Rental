const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const User = require("./models/user");

const app = express();
const PORT = 3000;

// =============================
// MongoDB connection
// =============================
mongoose.connect("mongodb://127.0.0.1:27017/car_rental", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("✅ Connected to MongoDB");
});

// =============================
// Middleware
// =============================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files (public folder serve karega)
app.use(express.static(path.join(__dirname, "public")));

// =============================
// Routes
// =============================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// --- Sign In Route ---
app.post("/signin", async (req, res) => {
  const { firstName, lastName, email, contact } = req.body;

  try {
    const newUser = new User({ firstName, lastName, email, contact });
    await newUser.save();
    res.json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.json({
      success: false,
      message:
        error.code === 11000 ? "Email already exists." : "Submission failed.",
    });
  }
});

// --- Search Route ---
app.post("/search", async (req, res) => {
  const { location, startDate, endDate } = req.body;

  // Sample response (aap baad me DB se data fetch kar sakte ho)
  const availableCars = [
    { name: "Sedan Classic", price: "₹1100 / day" },
    { name: "SUV Comfort", price: "₹2000 / day" },
  ];

  res.json({ success: true, cars: availableCars });
});

// =============================
// Start server
// =============================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});