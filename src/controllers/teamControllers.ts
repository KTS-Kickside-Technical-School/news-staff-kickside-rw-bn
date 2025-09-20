import teamRepositories from "../repository/teamRepositories"
import tournamentsRepositories from "../repository/tournamentsRepositories"

const getTeam = async (req: any, res: any) => {
    try {
        res.status(200).json({
            status: 200,
            message: "Team fetched successfully",
            data: { team: req.team }
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const getTeamPLayers = async (req: any, res: any) => {
    try {
        const players = await teamRepositories.findTeamPlayers(req.team._id);

        return res.status(200).json({
            status: 200,
            data: { players },
            message: "Team players received successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const saveNewTeamPlayerInfo = async (req: any, res: any) => {
    try {

        const personalInfo = {
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            nationality: req.body.nationality,
            dateOfBirth: req.body.dateOfBirth,
            height: req.body.height,
            weight: req.body.weight,
            preferredFoot: req.body.preferredFoot,
            image: req.body.image,
        }

        const player = await tournamentsRepositories.savePlayer(personalInfo);

        const playerTeamInfo = {
            team: req.team._id,
            player: player._id,
            jerseyNumber: req.body.jerseyNumber,
            position: req.body.position,
            playerValue: req.body.playerValue,
            contractStatus: req.body.contractStatus,
            contractStartDate: req.body.contractStartDate,
            contractEndDate: req.body.contractEndDate,
            isStillPlaying: req.body.isStillPlaying,
        }
        console.log(playerTeamInfo);

        const teamPlayer = await tournamentsRepositories.saveTeamPlayer(playerTeamInfo);

        return res.status(201).json({
            status: 201,
            data: { player, teamPlayer },
            message: "Team player saved successfully"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

export default {
    getTeam,
    getTeamPLayers,
    saveNewTeamPlayerInfo
}