import { Request, Response } from 'express';
import teamsRepositories from "../repository/tournamentsRepositories";

const saveCountry = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, code, flagUrl } = req.body;

        const country = await teamsRepositories.createCountry({
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
        const countries = await teamsRepositories.getAllCountries();
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

        const team = await teamsRepositories.createTeam({ name, country, logo });

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
        const teams = await teamsRepositories.getAllTeams();
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

export default {
    saveCountry,
    getAllCountries,
    saveTeam,
    getAllTeams
}