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

        const season = await tournamentsRepositories.findSeasonBySlug(req.params.slug);

        if (!season) {
            return res.status(404).json({
                status: 404,
                message: "Tournament season not found"
            });
        }

        const matches = await tournamentsRepositories.findMatchesByTournamentSeasonId(season._id);

        req.season = season
        req.matches = matches

        return next()
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
}

export const isMatchAlreadyExists = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { homeTeam, awayTeam, matchTime, tournamentSeason } = req.body;
        const matchExists = await tournamentsRepositories.findMatchBy4Attributes("homeTeam", homeTeam, "awayTeam", awayTeam, "matchTime", matchTime, "tournamentSeason", tournamentSeason);

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

export const isMatchExists = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const id = req.params.id || req.body.match;
        const match = await tournamentsRepositories.findMatchById(id);
        if (!match) {
            return res.status(404).json({
                status: 404,
                message: "Match not found"
            });
        }

        const matchActivities = await tournamentsRepositories.findMatchActivities(id);


        req.match = match
        req.matchActivities = matchActivities

        return next()
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Internal server error" });
    }
}
export const isMatchExistsBySlug = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const slug = req.params.slug
        const match = await tournamentsRepositories.findMatchBySlug(slug);
        if (!match) {
            return res.status(404).json({
                status: 404,
                message: "Match not found"
            });
        }

        const matchActivities = await tournamentsRepositories.findMatchActivities(match._id || "");


        req.match = match
        req.matchActivities = matchActivities

        return next()
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Internal server error" });
    }
}

export const isPlayerArleadyInTheTeam = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { player, team } = req.body
        const PlayerInTheTeam = await tournamentsRepositories.findPlayerInTheTeamByPlayerAndTeamAndTrue(player, team)

        if (PlayerInTheTeam && PlayerInTheTeam.isStillPlaying === true) {
            return res.status(400).json({
                status: 400,
                message: "Player already in the team"
            })
        }
        return next()
    }
    catch (error: any) {
        return res.status(500).json({ status: 500, message: error.message || "Internal server error" });
    }
}

export const isPlayerExists = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params
        const playerExists = await tournamentsRepositories.findPlayerById(id)

        if (!playerExists) {
            return res.status(400).json({
                status: 400,
                message: "Player not found"
            })
        }

        const playerTeams = await tournamentsRepositories.findPlayerInTheTeamsByPlayerId(id);

        req.player = playerExists;
        req.playerTeams = playerTeams;

        return next()
    } catch (error: any) {
        return res.status(500).json({ status: 500, message: error.message || "Internal server error" });
    }
}

export const isSeasonExistBySlug = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { slug } = req.params
        const seasonExists = await tournamentsRepositories.findSeasonBySlug(slug)

        if (!seasonExists) {
            return res.status(400).json({
                status: 400,
                message: "Season not found"
            })
        }

        req.season = seasonExists;

        const matches = await tournamentsRepositories.findAllMatches({ tournament: seasonExists._id })

        req.matches = matches;

        return next()
    }
    catch (error: any) {
        return res.status(500).json({ status: 500, message: error.message || "Internal server error" });
    }
}