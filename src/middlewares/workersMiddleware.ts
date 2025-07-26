import authRepositories from "../repository/authRepositories";
import workersRepositories from "../repository/workersRepositories";
import { Response, NextFunction } from "express";

export const isWorkerAlreadyExists = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const worker = await workersRepositories.findWorkerByAttribute("email", req.body.email);

        if (worker) {
            return res.status(400).json({
                status: 400,
                message: "Worker already exists"
            })
        }
        return next()
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}
