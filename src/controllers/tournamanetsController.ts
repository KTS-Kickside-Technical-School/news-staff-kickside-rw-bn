import { Request, Response } from 'express';
import tournamentsRepositories from '../repository/tournamentsRepositories';
import mongoose from 'mongoose';

const saveCountry = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, code, flagUrl } = req.body;

        const country = await tournamentsRepositories.createCountry({
            name,
            code,
            flagUrl
        });

        return res.status(201).json({
            status: 201,
            message: 'Country saved successfully',
            data: country
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error saving country',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

const getAllCountries = async (req: Request, res: Response): Promise<any> => {
    try {
        const countries = await tournamentsRepositories.getAllCountries();
        return res.status(200).json({
            status: 200,
            data: countries
        });

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error getting countries',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

const saveTeam = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, country, logo } = req.body;

        const team = await tournamentsRepositories.createTeam({ name, country, logo });

        return res.status(201).json({
            status: 201,
            message: 'Team saved successfully',
            data: team
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error saving team',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

const getAllTeams = async (req: Request, res: Response): Promise<any> => {
    try {
        const teams = await tournamentsRepositories.getAllTeams();
        return res.status(200).json({
            status: 200,
            message: "Teams retrieved successfully",
            data: teams
        })
    }
    catch (error: any) {
        return res.status(500).json({
            status: 500, message: error.message || "Teams failed to be retrieved"
        })
    }
}

const saveYear = async (req: Request, res: Response): Promise<any> => {
    try {
        const { startYear, endYear, isLatest } = req.body;
        const name = `${startYear}/${endYear}`

        if (isLatest) {
            await tournamentsRepositories.setYearsUnLatest()
        }

        const tournament = await tournamentsRepositories.createYear({ startYear, endYear, isLatest, name });
        return res.status(201).json({
            status: 201,
            message: 'Tournament saved successfully',
            data: tournament
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error saving tournament',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

const saveTournament = async (req: Request, res: Response): Promise<any> => {
    try {

        const tournament = await tournamentsRepositories.createTournament(req.body);
        return res.status(201).json({
            status: 201,
            message: 'Tournament saved successfully',
            data: tournament
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error saving tournament',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

const getAllYears = async (req: Request, res: Response): Promise<any> => {
    try {
        const years = await tournamentsRepositories.getAllYears();
        return res.status(200).json({
            status: 200,
            message: 'Years retrieved successfully',
            data: years
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error retrieving years',
        })
    }
}

const getAllTournaments = async (req: Request, res: Response): Promise<any> => {
    try {
        const tournaments = await tournamentsRepositories.getAllTournaments();
        return res.status(200).json({
            status: 200,
            message: 'Tournaments retrieved successfully',
            data: tournaments
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: 'Error retrieving tournaments',
        })
    }
}

const saveTournamentSeason = async (req: Request, res: Response): Promise<any> => {
    try {
        const season = await tournamentsRepositories.saveTournamentSeason(req.body);
        return res.status(201).json({
            status: 201,
            message: 'Tournament season saved successfully',
            data: season
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: 'Error saving tournament season',
        })
    }
}

const getAllTournamentsSeasons = async (req: Request, res: Response): Promise<any> => {
    try {
        const seasons = await tournamentsRepositories.findAllTournamentsSeasons();
        return res.status(200).json({
            status: 200,
            message: 'Tournaments seasons retrieved successfully',
            data: seasons
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: 'Error retrieving tournaments',
        })
    }
}

const getSingleTournamentSeason = async (req: any, res: Response): Promise<any> => {
    try {
        return res.status(200).json({
            status: 200,
            message: 'Tournament season retrieved successfully',
            data: req.season
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: 'Error retrieving tournament',
        })
    }
}

const saveMatch = async (req: Request, res: Response): Promise<any> => {
    try {
        const match = await tournamentsRepositories.saveMatch(req.body);
        return res.status(201).json({
            status: 201,
            message: 'Match saved successfully',
            data: match
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: 'Error saving match',
        })
    }
}

const getAllMatches = async (req: Request, res: Response): Promise<any> => {
    try {
        const matches = await tournamentsRepositories.findAllMatches();
        return res.status(200).json({
            status: 200,
            message: "Matches retrieved successfully",
            data: matches
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message || "Error retrieving matches"
        })
    }
}

const getHomepageMatches = async (req: Request, res: Response): Promise<any> => {
    try {

        const matches = await tournamentsRepositories.findHomepageMatches();

        return res.status(200).json({
            status: 200,
            message: 'Homepage matches retrieved successfully',
            data: matches
        })

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message || "Error getting homepage matches"
        })
    }
}

const getSingleMatch = async (req: any, res: Response): Promise<any> => {
    try {
        return res.status(200).json({
            status: 200,
            message: "Match retrieved successfully",
            data: {
                match: req.match,
                matchActivities: req.matchActivities
            }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message || "Error retrieving match"
        })
    }
}

const updateMatch = async (req: any, res: Response): Promise<any> => {
    try {

        const match = await tournamentsRepositories.updateMatch(req.match, req.body);
        return res.status(200).json({
            status: 200,
            message: "Match updated successfully",
            data: match
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message || "Error updating match"
        })
    }
}

export default {
    saveCountry,
    getAllCountries,
    saveTeam,
    getAllTeams,
    saveYear,
    saveTournament,
    getAllYears,
    getAllTournaments,
    saveTournamentSeason,
    getAllTournamentsSeasons,
    getSingleTournamentSeason,
    saveMatch,
    getAllMatches,
    getHomepageMatches,
    getSingleMatch,
    updateMatch
}