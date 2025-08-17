import { NextFunction, Response } from "express";
import tournamentsRepositories from "../repository/tournamentsRepositories";

export const isCountryAlreadyExists = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { name } = req.body;
        const country = await tournamentsRepositories.getCountryByName(name);
        if (country) {
            return res.status(400).json({ status: 400, message: "Country already exists" });
        }
        return next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


export const isTeamAlreadyExists = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { name } = req.body;
        const team = await tournamentsRepositories.getTeamByName(name);
        if (team) {
            return res.status(400).json({ status: 400, message: "Team already exists" });
        }
        return next();
    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
}