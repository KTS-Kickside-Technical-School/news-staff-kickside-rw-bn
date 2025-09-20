import { Request, Response } from 'express';
import tournamentsRepositories from '../repository/tournamentsRepositories';
import mongoose from 'mongoose';
import Match from '../database/models/match';
import TeamPlayer from '../database/models/teamPlayer';

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
        const { isLatest, tournament } = req.body
        if (isLatest) {
            await tournamentsRepositories.setSeasonsUnLatestByTournament(tournament);
        }
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

const getLatestSeasons = async (req: Request, res: Response): Promise<any> => {
    try {
        const seasons = await tournamentsRepositories.findLatestTournamentsSeasons();
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
            data: {
                season: req.season,
                matches: req.matches
            }
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: 'Error retrieving tournament',
        })
    }
}

const getTeamAVSTeamB = async (teamA: any, teamB: any) => {
    const home = await tournamentsRepositories.getTeamById(teamA);
    const away = await tournamentsRepositories.getTeamById(teamB);

    const toPascalCase = (str: string) => {
        return str.replace(/\w+/g, (word) =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).replace(/\s+/g, '');
    };

    const homeName = toPascalCase(home.name);
    const awayName = toPascalCase(away.name);

    return `${homeName}Vs${awayName}`;
};

const saveMatch = async (req: Request, res: Response): Promise<any> => {
    try {
        const vs = await getTeamAVSTeamB(req.body.homeTeam, req.body.awayTeam)
        const season: any = await tournamentsRepositories.findTournamentSeasonById(req.body.tournamentSeason)

        req.body.slug = `${season?.year?.name}-${season.name}-${vs}`

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
        const { tournament, team, status, limit, skip } = req.query;

        const matches = await tournamentsRepositories.findAllMatches({
            tournament,
            team,
            status,
            limit: limit ? parseInt(limit as string, 10) : undefined,
            skip: skip ? parseInt(skip as string, 10) : undefined,
        });

        return res.status(200).json({
            status: 200,
            message: "Matches retrieved successfully",
            data: matches,
        });
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message || "Error retrieving matches",
        });
    }
};


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
        const homeTeamPlayers = await tournamentsRepositories.findTeamCurrentPlayers(req.match.homeTeam)
        const awayTeamPlayers = await tournamentsRepositories.findTeamCurrentPlayers(req.match.awayTeam)

        return res.status(200).json({
            status: 200,
            message: "Match retrieved successfully",
            data: {
                match: req.match,
                matchActivities: req.matchActivities,
                players: {
                    home: homeTeamPlayers,
                    away: awayTeamPlayers
                }
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

const savePlayer = async (req: Request, res: Response): Promise<any> => {
    try {
        const player = await tournamentsRepositories.savePlayer(req.body);
        return res.status(201).json({
            status: 201,
            message: "Player saved successfully",
            data: player
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message || "Error saving player"
        })
    }
}

const getAllPlayers = async (req: Request, res: Response): Promise<any> => {
    try {
        const players = await tournamentsRepositories.findAllPlayers();
        return res.status(200).json({
            status: 200,
            message: "Players retrieved successfully",
            data: players
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message || "Error retrieving players"
        })
    }
}

const saveTeamPlayer = async (req: Request, res: Response): Promise<any> => {
    try {
        if (req.body.stillPlaying === true) {
            const a = await tournamentsRepositories.updatePlayerInTheTeamLastPlayings(req.body.player);
        }

        const teamPlayer = await tournamentsRepositories.saveTeamPlayer(req.body);

        return res.status(201).json({
            status: 201,
            message: "Team player saved successfully",
            data: teamPlayer
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message || "Error saving team player"
        })
    }
}

const getSinglePlayer = async (req: any, res: Response): Promise<any> => {
    try {
        return res.status(200).json({
            status: 200,
            message: "Player retrieved successfully",
            data: {
                player: req.player,
                playerTeams: req.playerTeams
            }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message || "Error retrieving player"
        })
    }
}

const saveMatchEvent = async (req: any, res: Response): Promise<any> => {
    try {
        const requiredFields = ["match", "team", "eventType", "minute", "description"];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ status: 400, message: `${field} is required` });
            }
        }

        const matchEvent = await tournamentsRepositories.saveMatchEvent(req.body);

        const goalEvents = ["goal", "own_goal", "penalty_goal"];

        if (goalEvents.includes(req.body.eventType)) {

            if (req.match.homeTeam._id.toString() === req.body.team) {
                await Match.findByIdAndUpdate(req.match._id, { $inc: { homeScore: 1 } });
            } else if (req.match.awayTeam._id.toString() === req.body.team) {
                await Match.findByIdAndUpdate(req.match._id, { $inc: { awayScore: 1 } });
            } else {
                throw new Error("Team not found");
            }
        }

        if (req.body.eventType === "goal_cancelled") {
            if (req.match.homeTeam._id.toString() === req.body.team) {
                await Match.findByIdAndUpdate(req.match._id, { $inc: { homeScore: -1 } });
            } else if (req.match.awayTeam._id.toString() === req.body.team) {
                await Match.findByIdAndUpdate(req.match._id, { $inc: { awayScore: -1 } });
            } else {
                throw new Error("Team not found");
            }
        }

        return res.status(201).json({
            status: 201,
            message: "Match event saved successfully",
            data: matchEvent,
        });
    } catch (error: any) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: error.message || "Error saving match event",
        });
    }
};

const getTournamentSeasonMatches = async (req: any, res: Response): Promise<any> => {
    try {
        return res.status(200).json({
            status: 200,
            message: "Tournament season matches retrieved successfully",
            data: { season: req.season, matches: req.matches }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message || "Error getting tournament season matches",
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
    getLatestSeasons,
    getSingleTournamentSeason,
    saveMatch,
    getAllMatches,
    getHomepageMatches,
    getSingleMatch,
    updateMatch,
    savePlayer,
    getAllPlayers,
    saveTeamPlayer,
    getSinglePlayer,
    saveMatchEvent,
    getTournamentSeasonMatches
}