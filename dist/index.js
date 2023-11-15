"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.app = exports.closeServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const ticketRoutes_1 = __importDefault(require("./routes/ticketRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const config_1 = require("./config");
const seedDatabase_1 = require("./script/seedDatabase");
dotenv_1.default.config();
// Create Express app
const app = (0, express_1.default)();
exports.app = app;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Generate Swagger JSON
const specs = (0, swagger_jsdoc_1.default)(config_1.swaggerOptions);
// Serve Swagger UI
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
//Routes
app.use('/api/tickets', ticketRoutes_1.default);
app.use('/api/comments', commentRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});
let server = null; // Variable to store the server instance
// Connect to MongoDB and return the server instance
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            console.error('MongoDB connection string not provided. Please set MONGODB_URI in .env file.');
            return null;
        }
        try {
            yield mongoose_1.default.connect(mongoURI, {});
            yield (0, seedDatabase_1.seedTickets)();
            console.log('Connected to MongoDB successfully');
            // Start the server and store the instance
            const port = process.env.PORT || 5000;
            server = app.listen(port, () => {
                console.log(`Server running on port ${port}`);
            });
            return server;
        }
        catch (error) {
            console.error('Error connecting to MongoDB:', error);
            return null;
        }
    });
}
exports.connectToDatabase = connectToDatabase;
// Function to close the server (for testing purposes)
function closeServer() {
    if (server) {
        server.close();
    }
}
exports.closeServer = closeServer;
connectToDatabase();
