import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;  // Đổi lại port để khớp với frontend

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use('/api/user', userRoute);
app.use('/api/residency', residencyRoute);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
