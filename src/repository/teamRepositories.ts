import mongoose from "mongoose";
import Player from "../database/models/player";
import Team from "../database/models/team";
import TeamPlayer from "../database/models/teamPlayer";
import Country from "../database/models/country";

const getTeamById = async (id: any) => {
    return await Team.findById(id)
        .populate('country')
}

const findTeamPlayers = async (teamId: string) => {
    try {
        const records = await TeamPlayer.find({ team: teamId })
            .populate("team")
            .lean();

        // Get all unique player IDs
        const playerIds = [...new Set(records.map(rec => rec.player.toString()))];

        // Get all players
        const players = await Player.find({ _id: { $in: playerIds } });

        // Create a map for quick lookup
        const playerMap = new Map();
        players.forEach(player => {
            playerMap.set(player._id.toString(), player.toObject());
        });

        // Group by player for multiple stints
        const grouped: Record<string, any> = {};

        for (const rec of records as any) {
            const playerId = rec.player.toString();
            const playerData = playerMap.get(playerId);

            if (!playerData) {
                continue;
            }

            if (!grouped[playerId]) {
                grouped[playerId] = {
                    player: playerData,
                    stints: [],
                };

                // Manually populate nationality if it's an ObjectId
                if (playerData.nationality && mongoose.Types.ObjectId.isValid(playerData.nationality)) {
                    try {
                        const country = await Country.findById(playerData.nationality);
                        if (country) {
                            grouped[playerId].player.nationality = country;
                        }
                    } catch (error) {
                        console.warn(`Failed to populate nationality for player ${playerId}:`, error);
                    }
                }
            }

            // compute duration
            const start = new Date(rec.contractStartDate);
            const end = rec.isStillPlaying ? new Date() : new Date(rec.contractEndDate);
            const durationMs = end.getTime() - start.getTime();

            const years = Math.floor(durationMs / (1000 * 60 * 60 * 24 * 365));
            const months = Math.floor((durationMs / (1000 * 60 * 60 * 24 * 30)) % 12);

            grouped[playerId].stints.push({
                team: rec.team,
                jerseyNumber: rec.jerseyNumber,
                position: rec.position,
                playerValue: rec.playerValue,
                contractStatus: rec.contractStatus,
                contractStartDate: rec.contractStartDate,
                contractEndDate: rec.contractEndDate,
                isStillPlaying: rec.isStillPlaying,
                duration: `${years}y ${months}m`,
            });
        }

        // Convert grouped object to array
        return Object.values(grouped);
    } catch (error) {
        console.error("Error finding team players:", error);
        throw error;
    }
};

export default {
    getTeamById,
    findTeamPlayers
}