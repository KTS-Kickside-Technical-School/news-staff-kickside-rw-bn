import mongoose from "mongoose";
import TournamentPerYear from "../database/models/tournamentPerYear";

const setSeasonsUnFeaturedById = async (_id: any) => {
    return await TournamentPerYear.updateMany({ _id: { $ne: _id } }, { $set: { isFeatured: false } });
}

const setSeasonsFeaturedById = async (id: string) => {
    return await TournamentPerYear.findOneAndUpdate({ _id: id }, { $set: { isFeatured: true } },
        { new: true });
}

const findTournamentSeasonByAttribute = async (key: any, value: any) => {
    return await TournamentPerYear.findOne({ [key]: value })
        .populate("year")
        .populate("tournament")
        .populate("teams")
}

const findSeasonTopScorersSimplified = async (seasonId: any) => {
    const matchIds = await mongoose.model('Match')
        .find({ tournamentSeason: seasonId })
        .select('_id')
        .lean();

    if (matchIds.length === 0) {
        return { topScorers: [], totalMatches: 0 };
    }

    const matchIdsArray = matchIds.map(match => match._id);

    const topScorers = await mongoose.model('MatchActivities').aggregate([
        {
            $match: {
                match: { $in: matchIdsArray },
                eventType: { $in: ['goal', 'penalty_goal'] },
                player: { $exists: true, $ne: null }
            }
        },
        {
            $group: {
                _id: '$player',
                goals: { $sum: 1 },
                matches: { $addToSet: '$match' }
            }
        },
        // fetch player info
        {
            $lookup: {
                from: 'players',
                localField: '_id',
                foreignField: '_id',
                as: 'playerInfo'
            }
        },
        { $set: { playerInfo: { $arrayElemAt: ['$playerInfo', 0] } } },
        // fetch only the latest teamplayer entry
        {
            $lookup: {
                from: 'teamplayers',
                let: { playerId: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$player', '$$playerId'] },
                                    {
                                        $or: [
                                            { $eq: ['$isStillPlaying', true] },
                                            { $eq: ['$stillPlaying', true] }
                                        ]
                                    }
                                ]
                            }
                        }
                    },
                    { $sort: { contractStartDate: -1 } },
                    { $limit: 1 }
                ],
                as: 'teamPlayerInfo'
            }
        },
        { $set: { teamPlayerInfo: { $arrayElemAt: ['$teamPlayerInfo', 0] } } },
        // fetch team
        {
            $lookup: {
                from: 'teams',
                localField: 'teamPlayerInfo.team',
                foreignField: '_id',
                as: 'teamInfo'
            }
        },
        { $set: { teamInfo: { $arrayElemAt: ['$teamInfo', 0] } } },
        // shape response
        {
            $project: {
                playerId: '$_id',
                playerName: {
                    $concat: [
                        '$playerInfo.firstname',
                        ' ',
                        { $ifNull: ['$playerInfo.lastname', ''] }
                    ]
                },
                playerImage: '$playerInfo.image',
                jerseyNumber: '$teamPlayerInfo.jerseyNumber',
                position: '$teamPlayerInfo.position',
                team: {
                    _id: '$teamInfo._id',
                    name: '$teamInfo.name',
                    logo: '$teamInfo.logo',
                    shortName: '$teamInfo.shortName'
                },
                goals: 1,
                matchesPlayed: { $size: '$matches' },
                goalsPerMatch: {
                    $cond: [
                        { $gt: [{ $size: '$matches' }, 0] },
                        { $divide: ['$goals', { $size: '$matches' }] },
                        0
                    ]
                }
            }
        },
        { $sort: { goals: -1, matchesPlayed: 1, goalsPerMatch: -1 } },
        { $limit: 20 }
    ]);

    return topScorers;
};


export default {
    setSeasonsUnFeaturedById,
    setSeasonsFeaturedById,
    findTournamentSeasonByAttribute,
    findSeasonTopScorersSimplified
}