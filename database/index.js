require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Config
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use((req, res, next) => {
    const token = req.cookies.token;

    req.session = { user: null };

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.session.user = data;
    } catch (error) {
        console.log(error);
    }

    next();
});

// Routes
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

// Start server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
