// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Email Transporter (Configure SMTP)
// const transporter = nodemailer.createTransport({
//   service: "Gmail", // You can use another service
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// app.post("/submit", async (req, res) => {
//     console.log("Received submission:", req.body); // Log the received data
//     const { name, email, phone, businessType, citizenship } = req.body;

//     // Validate required fields


//     if (!name || !email || !phone || !businessType || !citizenship) {
//         console.error("Validation failed:", req.body); // Log validation failure

//     return res.status(400).json({ message: "All fields are required!" });
//   }

//     // Send Confirmation Email
//     console.log("Sending email to:", email); // Log email sending

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Application Received",
//     text: `Dear ${name},\n\nYour application for ${businessType} has been received successfully.\n\nBest regards,\nService Team`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: "Application submitted successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Error sending email", error });
//   }
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
    origin: "http://localhost:5500", // Allow frontend origin
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
}));

app.use(bodyParser.json()); // Parse JSON requests

// Handle form submission
app.post("/submit", (req, res) => {
    const {
        citizenship, id_number, passport_number, full_name, phone, country_code, email,
        business_type, company_name, tin, registration_date, import_purpose,
        other_purpose, product_category, product_name, quantity, description
    } = req.body;

    // Basic validation
    if (!full_name || !email || !phone || !business_type || !company_name || !tin) {
        return res.status(400).json({ message: "All required fields must be filled!" });
    }

    console.log("Received form data:", req.body); // Debugging

    res.status(200).json({ message: "Application submitted successfully!" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
