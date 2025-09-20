import mongoose from "mongoose";
import Country, { ICountry } from "../database/models/country";
import Match, { IMatch } from "../database/models/match";
import MatchActivities from "../database/models/matchActivities";
import Player from "../database/models/player";
import Team, { ITeam } from "../database/models/team";
import TeamPlayer from "../database/models/teamPlayer";
import Tournament, { ITournament } from "../database/models/tournament";
import TournamentPerYear, { ITournamentPerYear } from "../database/models/tournamentPerYear";
import Year, { IYears } from "../database/models/years";
import { last5days, now, fiveDaysLater, threeDaysAgo } from "../helpers/trHelpers";

const createCountry = async (data: ICountry) => {
    return await Country.create(data);
}

const getCountryByName = async (name: string) => {
    return await Country.findOne({ name });
}

const getAllCountries = async () => {
    return await Country.find().sort({ name: 1 });
}

const getTeamByName = async (name: string) => {
    return Team.findOne({ name });
}

const getTeamById = async (_id: any) => {
    return Team.findById(_id);
}

const createTeam = async (data: ITeam) => {
    const team = await Team.create(data);
    return await Team.findById(team._id)
        .populate('country')
};

const getAllTeams = async () => {
    return await Team.find()
        .populate("country")
        .sort({
            "country.name": 1,
            "name": 1
        })
}

const getYearBy2Attributes = async (attr1: string, attr2: string, value1: string, value2: string) => {
    return Year.findOne({ [attr1]: value1, [attr2]: value2 });
}

const createYear = async (data: IYears) => {
    return await Year.create(data);
}

const setYearsUnLatest = async () => {
    return await Year.updateMany({}, { $set: { isLatest: false } });
}

const setSeasonsUnLatestByTournament = async (tournament: string) => {
    return await TournamentPerYear.updateMany({ tournament }, { $set: { isLatest: false } });
}

const getTournamentByAttribute = async (attr: string, value: string) => {
    return await Tournament.findOne({ [attr]: value });
}

const createTournament = async (data: ITournament) => {
    return await Tournament.create(data);
}

const getAllYears = async () => {
    return await Year.find()
        .sort({
            isLatest: -1,
            startYear: -1,
            endYear: -1
        })
}

const getAllTournaments = async () => {
    return await Tournament.find()
        .populate("country")
        .sort({
            name: 1
        })
}

const saveTournamentSeason = async (data: ITournamentPerYear) => {
    return await TournamentPerYear.create(data);
}

const findTournamentSeasonBy4Attributes = async (attr1: string, value1: string, attr2: string, value2: string, attr3: string, value3: string, attr4: string, value4: string) => {
    return await TournamentPerYear.findOne({ [attr1]: value1, [attr2]: value2, [attr3]: value3, [attr4]: value4 });
}

const findAllTournamentsSeasons = async () => {
    return await TournamentPerYear.aggregate([
        {
            $lookup: {
                from: 'tournaments',
                localField: 'tournament',
                foreignField: '_id',
                as: 'tournament'
            }
        },
        { $unwind: '$tournament' },

        {
            $lookup: {
                from: 'years',
                localField: 'year',
                foreignField: '_id',
                as: 'year'
            }
        },
        { $unwind: '$year' },

        {
            $lookup: {
                from: 'teams',
                localField: 'teams',
                foreignField: '_id',
                as: 'teams'
            }
        },

        {
            $unwind: {
                path: '$teams',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'countries',
                localField: 'teams.country',
                foreignField: '_id',
                as: 'teams.country'
            }
        },
        {
            $unwind: {
                path: '$teams.country',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: '$_id',
                tournament: { $first: '$tournament' },
                year: { $first: '$year' },
                name: { $first: '$name' },
                startDate: { $first: '$startDate' },
                endDate: { $first: '$endDate' },
                status: { $first: '$status' },
                slug: { $first: '$slug' },
                teams: { $push: '$teams' },
                isLatest: { $first: '$isLatest' },
                isFeatured: { $first: '$isFeatured' }
            }
        },

        {
            $addFields: {
                statusOrder: {
                    $switch: {
                        branches: [
                            { case: { $eq: ['$status', 'Ongoing'] }, then: 1 },
                            { case: { $eq: ['$status', 'Upcoming'] }, then: 2 },
                            { case: { $eq: ['$status', 'Completed'] }, then: 3 }
                        ],
                        default: 4
                    }
                }
            }
        },

        {
            $sort: {
                statusOrder: 1,
                'year.name': -1,
                'tournament.name': 1,
                'teams.name': 1
            }
        }
    ]);
};

const findLatestTournamentsSeasons = async () => {
    return await TournamentPerYear.aggregate([
        {
            $match: {
                isLatest: true,
            },
        },
        {
            $lookup: {
                from: "tournaments",
                localField: "tournament",
                foreignField: "_id",
                as: "tournament",
            },
        },
        { $unwind: "$tournament" },

        {
            $lookup: {
                from: "years",
                localField: "year",
                foreignField: "_id",
                as: "year",
            },
        },
        { $unwind: "$year" },

        {
            $lookup: {
                from: "teams",
                localField: "teams",
                foreignField: "_id",
                as: "teams",
            },
        },
        {
            $unwind: {
                path: "$teams",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "countries",
                localField: "teams.country",
                foreignField: "_id",
                as: "teams.country",
            },
        },
        {
            $unwind: {
                path: "$teams.country",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $group: {
                _id: "$_id",
                tournament: { $first: "$tournament" },
                year: { $first: "$year" },
                name: { $first: "$name" },
                slug: { $first: "$slug" },
                startDate: { $first: "$startDate" },
                endDate: { $first: "$endDate" },
                status: { $first: "$status" },
                teams: { $push: "$teams" },
            },
        },
        {
            $addFields: {
                statusOrder: {
                    $switch: {
                        branches: [
                            { case: { $eq: ["$status", "Ongoing"] }, then: 1 },
                            { case: { $eq: ["$status", "Upcoming"] }, then: 2 },
                            { case: { $eq: ["$status", "Completed"] }, then: 3 },
                        ],
                        default: 4,
                    },
                },
            },
        },
        {
            $sort: {
                statusOrder: 1,
                "year.name": -1,
                "tournament.name": 1,
                "teams.name": 1,
            },
        },
    ]);
};



const findSeasonBySlug = async (slug: any) => {
    return await TournamentPerYear.findOne({ slug })
        .populate("year")
        .populate({
            path: "tournament",
            populate: {
                path: "country",
            },
        }).populate("teams");
};


const findTournamentSeasonById = async (id: any) => {
    return await TournamentPerYear.findOne({ _id: id }).populate("year");
}

const findMatchBy4Attributes = async (attr1: string, value1: string, attr2: string, value2: string, attr3: string, value3: string, attr4: string, value4: string) => {
    return await Match.findOne({ [attr1]: value1, [attr2]: value2, [attr3]: value3, [attr4]: value4 })
}

const saveMatch = async (data: IMatch) => {
    return await Match.create(data);
}

const findAllMatches = async (filters: any) => {
    const matchStage: any = {};

    if (filters.tournament) {
        matchStage["tournamentSeason"] = new mongoose.Types.ObjectId(filters.tournament);
    }

    if (filters.team) {
        matchStage["$or"] = [
            { homeTeam: new mongoose.Types.ObjectId(filters.team) },
            { awayTeam: new mongoose.Types.ObjectId(filters.team) },
        ];
    }

    if (filters.status) {
        matchStage["status"] = filters.status;
    }

    const pipeline: any[] = [];

    if (Object.keys(matchStage).length > 0) {
        pipeline.push({ $match: matchStage });
    }

    pipeline.push(
        {
            $addFields: {
                sortOrder: {
                    $switch: {
                        branches: [
                            { case: { $eq: ["$status", "in_progress"] }, then: 1 },
                            { case: { $eq: ["$status", "postponed"] }, then: 3 },
                            { case: { $eq: ["$status", "scheduled"] }, then: 2 },
                            { case: { $eq: ["$status", "finished"] }, then: 3 },
                        ],
                        default: 4,
                    },
                },
            },
        },
        { $sort: { sortOrder: 1, matchTime: 1 } },

        {
            $lookup: {
                from: "tournamentperyears",
                localField: "tournamentSeason",
                foreignField: "_id",
                as: "tournamentSeason",
            },
        },
        { $unwind: { path: "$tournamentSeason", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "teams",
                localField: "homeTeam",
                foreignField: "_id",
                as: "homeTeam",
            },
        },
        { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "teams",
                localField: "awayTeam",
                foreignField: "_id",
                as: "awayTeam",
            },
        },
        { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: true } }
    );

    if (filters.skip) {
        pipeline.push({ $skip: filters.skip });
    }

    if (filters.limit) {
        pipeline.push({ $limit: filters.limit });
    }

    return await Match.aggregate(pipeline);
};


const findHomepageMatches = async () => {

    let matches = await Match.aggregate([
        {
            $addFields: {
                matchTimeDate: {
                    $dateFromString: { dateString: "$matchTime" }
                }
            }
        },
        {
            $match: {
                $or: [
                    {
                        status: { $in: ["finished", "postponed"] },
                        matchTimeDate: { $gte: last5days, $lt: now }
                    },
                    {
                        status: { $ne: "finished" },
                        matchTimeDate: { $gte: now, $lte: fiveDaysLater }
                    }
                ]
            }
        },
        {
            $addFields: {
                statusOrder: {
                    $switch: {
                        branches: [
                            { case: { $eq: ["$status", "in_progress"] }, then: 1 },
                            { case: { $eq: ["$status", "scheduled"] }, then: 2 },
                            { case: { $eq: ["$status", "postponed"] }, then: 3 },
                            { case: { $eq: ["$status", "finished"] }, then: 4 }
                        ],
                        default: 99
                    }
                }
            }
        },
        {
            $lookup: {
                from: "teams",
                localField: "homeTeam",
                foreignField: "_id",
                as: "homeTeam"
            }
        },
        { $unwind: "$homeTeam" },
        {
            $lookup: {
                from: "teams",
                localField: "awayTeam",
                foreignField: "_id",
                as: "awayTeam"
            }
        },
        { $unwind: "$awayTeam" },
        {
            $lookup: {
                from: "tournamentperyears",
                localField: "tournamentSeason",
                foreignField: "_id",
                as: "tournamentSeason"
            }
        },
        { $unwind: "$tournamentSeason" },

        {
            $lookup: {
                from: "tournaments",
                localField: "tournamentSeason.tournament",
                foreignField: "_id",
                as: "tournament"
            }
        },
        { $unwind: "$tournament" },
        {
            $group: {
                _id: "$tournamentSeason.name",
                tournamentSeason: { $first: "$tournamentSeason" },
                tournament: { $first: "$tournament" },
                matches: {
                    $push: {
                        _id: "$_id",
                        homeTeam: "$homeTeam",
                        awayTeam: "$awayTeam",
                        homeScore: "$homeScore",
                        awayScore: "$awayScore",
                        status: "$status",
                        slug: "$slug",
                        matchTime: "$matchTime",
                        matchTimeDate: "$matchTimeDate",
                        statusOrder: "$statusOrder",
                        tournament: "$tournament"
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                tournamentName: "$_id",
                tournamentSeason: 1,
                tournament: 1,
                matches: 1
            }
        },
        {
            $sort: {
                "tournament.priority": 1,
                "tournament.name": 1
            }
        },
        {
            $addFields: {
                matches: {
                    $sortArray: {
                        input: "$matches",
                        sortBy: { statusOrder: 1, matchTimeDate: 1 }
                    }
                }
            }
        }
    ]);

    // Step 2: Fallback → last 3 days finished/postponed (with same updates)
    if (!matches.length) {
        matches = await Match.aggregate([
            {
                $addFields: {
                    matchTimeDate: {
                        $dateFromString: { dateString: "$matchTime" }
                    }
                }
            },
            {
                $match: {
                    status: { $in: ["finished", "postponed"] },
                    matchTimeDate: { $gte: threeDaysAgo, $lt: now }
                }
            },
            {
                $addFields: {
                    statusOrder: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$status", "in_progress"] }, then: 1 },
                                { case: { $eq: ["$status", "scheduled"] }, then: 2 },
                                { case: { $eq: ["$status", "postponed"] }, then: 3 },
                                { case: { $eq: ["$status", "finished"] }, then: 4 }
                            ],
                            default: 99
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "teams",
                    localField: "homeTeam",
                    foreignField: "_id",
                    as: "homeTeam"
                }
            },
            { $unwind: "$homeTeam" },
            {
                $lookup: {
                    from: "teams",
                    localField: "awayTeam",
                    foreignField: "_id",
                    as: "awayTeam"
                }
            },
            { $unwind: "$awayTeam" },
            {
                $lookup: {
                    from: "tournamentperyears",
                    localField: "tournamentSeason",
                    foreignField: "_id",
                    as: "tournamentSeason"
                }
            },
            { $unwind: "$tournamentSeason" },
            // NEW: Lookup the main tournament document
            {
                $lookup: {
                    from: "tournaments",
                    localField: "tournamentSeason.tournament",
                    foreignField: "_id",
                    as: "tournament"
                }
            },
            { $unwind: "$tournament" },
            {
                $group: {
                    _id: "$tournamentSeason.name",
                    tournamentSeason: { $first: "$tournamentSeason" },
                    tournament: { $first: "$tournament" }, // Add main tournament to group
                    matches: {
                        $push: {
                            _id: "$_id",
                            homeTeam: "$homeTeam",
                            awayTeam: "$awayTeam",
                            homeScore: "$homeScore",
                            awayScore: "$awayScore",
                            status: "$status",
                            matchTime: "$matchTime",
                            matchTimeDate: "$matchTimeDate",
                            statusOrder: "$statusOrder",
                            tournament: "$tournament" // Include tournament in each match
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    tournamentName: "$_id",
                    tournamentSeason: 1,
                    tournament: 1, // Include main tournament
                    matches: 1
                }
            },
            {
                $sort: {
                    "tournament.priority": 1,
                    "tournament.name": 1
                }
            },
            {
                $addFields: {
                    matches: {
                        $sortArray: {
                            input: "$matches",
                            sortBy: { statusOrder: 1, matchTimeDate: 1 }
                        }
                    }
                }
            }
        ]);
    }

    return matches;
};

const findMatchById = async (_id) => {
    const match = await Match.findById(_id)
        .populate({
            path: 'homeTeam',
        })
        .populate({
            path: 'awayTeam',
        })
        .populate({
            path: 'tournamentSeason',
            populate: [{
                path: 'tournament',
            }, {
                path: 'teams',
            }, { path: "year" }]
        })
        .exec();

    return match;
};

const findMatchBySlug = async (slug) => {
    const match = await Match.findOne({ slug })
        .populate({
            path: 'homeTeam',
        })
        .populate({
            path: 'awayTeam',
        })
        .populate({
            path: 'tournamentSeason',
            populate: [{
                path: 'tournament',
            }, {
                path: 'teams',
            }, { path: "year" }]
        })
        .exec();

    return match;
};

const findMatchActivities = async (matchId: any) => {
    return await MatchActivities.find({ match: matchId }).sort({ minute: -1 })
        .populate('player')
        .populate('relatedPlayer')
        .populate('match')
        .populate('team')
}

const updateMatch = async (_id: any, data: any) => {
    return await Match.findOneAndUpdate({ _id }, data, { new: true });
}

const savePlayer = async (data: any) => {
    return await Player.create(data)
}

const findAllPlayers = async () => {
    return await Player.find().sort({
        firstname: 1,
        lastname: 1
    })
}

const findPlayerInTheTeamByPlayerAndTeamAndTrue = async (playerId: string, teamId: string) => {
    return await TeamPlayer.findOne({ player: playerId, team: teamId, stillPlaying: true })
}

const updatePlayerInTheTeamLastPlayings = async (player: any) => {
    return await TeamPlayer.updateMany(
        { player },
        { $set: { stillPlaying: false } },
    );
};

const saveTeamPlayer = async (data: any) => {
    return await TeamPlayer.create(data)
}

const findPlayerById = async (_id: any) => {
    return await Player.findById(_id)
}

const findPlayerInTheTeamsByPlayerId = async (player: any) => {
    return await TeamPlayer.find({ player }).populate("team").populate("player")
        .sort({
            startDate: -1,
            endDate: -1
        }
        )
}

const findTeamCurrentPlayers = async (team: any) => {
    return await TeamPlayer.find({
        team,
        $or: [{ isStillPlaying: true }, { stillPlaying: true }],
    }).populate("team").populate("player")
        .sort({
            startDate: -1,
            endDate: -1
        })
}

const saveMatchEvent = async (data: any) => {
    return await MatchActivities.create(data)
}

const findMatchesByTournamentSeasonId = async (tournamentSeason: any) => {
    return await Match.find({ tournamentSeason })
        .populate("homeTeam")
        .populate("awayTeam")
        .populate("tournamentSeason")
}

const updatePlayerInTheTeam = async (_id: string, data: any) => {
    return await TeamPlayer.findByIdAndUpdate(_id, data, { new: true });
}


export default {
    createCountry,
    getCountryByName,
    getAllCountries,
    getTeamByName,
    getTeamById,
    findMatchBySlug,
    createTeam,
    getAllTeams,
    getYearBy2Attributes,
    createYear,
    setYearsUnLatest,
    getTournamentByAttribute,
    createTournament,
    getAllYears,
    getAllTournaments,
    saveTournamentSeason,
    findTournamentSeasonBy4Attributes,
    findAllTournamentsSeasons,
    findTournamentSeasonById,
    findMatchBy4Attributes,
    saveMatch,
    findAllMatches,
    findHomepageMatches,
    findMatchById,
    findMatchActivities,
    updateMatch,
    savePlayer,
    findAllPlayers,
    findPlayerInTheTeamByPlayerAndTeamAndTrue,
    updatePlayerInTheTeamLastPlayings,
    saveTeamPlayer,
    findPlayerById,
    findPlayerInTheTeamsByPlayerId,
    findTeamCurrentPlayers,
    saveMatchEvent,
    findLatestTournamentsSeasons,
    findSeasonBySlug,
    setSeasonsUnLatestByTournament,
    findMatchesByTournamentSeasonId
}