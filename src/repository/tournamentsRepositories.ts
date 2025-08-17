import Country, { ICountry } from "../database/models/country";
import Team, { ITeam } from "../database/models/team";

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
export default {
    createCountry,
    getCountryByName,
    getAllCountries,
    getTeamByName,
    createTeam,
    getAllTeams
}