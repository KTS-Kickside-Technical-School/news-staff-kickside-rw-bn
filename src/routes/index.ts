import express from 'express';
import articlesRoute from './articlesRoutes';
import authRoute from './authRoutes';
import workersRoute from './workersRoutes';
import inquiryRoute from './inquiryRoutes';
import subscribersRoute from './subscribersListRoutes';
import trRoutes from './trRoutes';

const indexRoute = express.Router();

indexRoute.use("/auth", authRoute);
indexRoute.use("/articles", articlesRoute);
indexRoute.use("/workers", workersRoute)
indexRoute.use("/inquiry", inquiryRoute);
indexRoute.use("/subscribers", subscribersRoute)
indexRoute.use("/tr", trRoutes);

export default indexRoute;