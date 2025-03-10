import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import sequelizeStore from "connect-session-sequelize";
import * as models from "./models/index.js";
import sequelize from "./configs/database.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

// Routes
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import ratingRoutes from "./routes/rating.routes.js";

// Socket
import { createServer } from "http";
import { initSocket } from "./configs/socket.js";

const app = express();
const httpServer = createServer(app);
const io = initSocket(httpServer);

const SequelizeStore = new sequelizeStore(session.Store);

const store = new SequelizeStore({
    db: sequelize,
    tableName: "sessions",
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 60 * 60 * 1000,
});
await store.sync();

const swaggerDocument = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express Sale API Documentation",
            version: "1.0.0",
            description: "Documentación de la API de Express Sale.",
        },
    },
    apis: ["./src/routes/*.js"],
});

// Middlewares
app.use(express.json({ limit: "20mb" }));
app.use(morgan("dev"));
app.use(
    cors({
        origin: process.env.VITE_APP_DOMAIN,
        credentials: true,
    })
);
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            maxAge: 1000 * 60 * 60,
            httpOnly: process.env.NODE_ENV === "production",
        },
    })
);
app.use(async (req, res, next) => {
    if (req.session.user_id) {
        const user = await models.User.findByPk(req.session.user_id, {
            include: ["worker", "role"],
        });

        if (user) {
            req.session.user = user;
        }
    }

    next();
});

// Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", ratingRoutes);
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

httpServer.listen(process.env.PORT, () => console.log("server running on port", process.env.PORT));
