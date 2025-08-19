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

export const isYearAlreadyExists = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { startYear, endYear } = req.body;
        const yearExists = await tournamentsRepositories.getYearBy2Attributes("startYear", "endYear", startYear, endYear);

        if (yearExists) {
            return res.status(400).json({ status: 400, message: "Year already exists" });
        }

        return next();
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
}

export const isTournamentAlreadyExists = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { name } = req.body;
        const tournamentExists = await tournamentsRepositories.getTournamentByAttribute("name", name);

        if (tournamentExists) {
            return res.status(400).json({ status: 400, message: "Tournament already exists" });
        }
        return next()
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
}

export const isTournamentSeasonAlreadyExists = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {

        const { tournament, year, startDate, endDate } = req.body;
        const tournamentSeasonExists = await tournamentsRepositories.findTournamentSeasonBy4Attributes("tournament", tournament, "year", year, "startDate", startDate, "endDate", endDate);

        if (tournamentSeasonExists) {
            return res.status(400).json({
                status: 400,
                message: "Tournament season already exists"
            });
        }
        return next()
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
}

export const isTournamentSeasonExists = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const season = await tournamentsRepositories.findTournamentSeasonById(req.params.id);

        if (!season) {
            return res.status(404).json({
                status: 404,
                message: "Tournament season not found"
            });
        }
        req.season = season
        return next()
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
}

export const isMatchAlreadyExists = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { homeTeam, awayTeam, date, tournamentSeason } = req.body;
        const matchExists = await tournamentsRepositories.findMatchBy4Attributes("homeTeam", homeTeam, "awayTeam", awayTeam, "date", date, "tournamentSeason", tournamentSeason);
        console.log(matchExists)
        if (matchExists) {
            return res.status(400).json({
                status: 400,
                message: "The match is already scheduled at the same time"
            })
        }
        return next()
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Internal server error" });
    }
}