import Country, { ICountry } from "../database/models/country";
import Team, { ITeam } from "../database/models/team";
import Tournament, { ITournament } from "../database/models/tournament";
import TournamentPerYear, { ITournamentPerYear } from "../database/models/tournamentPerYear";
import Year, { IYears } from "../database/models/years";

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

export default {
    createCountry,
    getCountryByName,
    getAllCountries,
    getTeamByName,
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
    findTournamentSeasonBy4Attributes
}