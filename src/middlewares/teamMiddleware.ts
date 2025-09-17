import { NextFunction, Response } from "express";
import tournamentsRepositories from "../repository/tournamentsRepositories";
import teamRepositories from "../repository/teamRepositories";

export const isTeamExists = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params;
        const teamId = req.body.team;

        const team = await teamRepositories.getTeamById(id || teamId);

        if (!team) {
            return res.status(400).json({ status: 400, message: "Team doesn't exist!" });
        }

        req.team = team
        return next();
    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
}
