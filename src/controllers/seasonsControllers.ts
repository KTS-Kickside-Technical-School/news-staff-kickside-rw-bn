import seasonRepositories from "../repository/seasonRepositories";
import tournamentsRepositories from "../repository/tournamentsRepositories";

const setFeaturedSeason = async (req: any, res: any): Promise<any> => {
    try {
        await seasonRepositories.setSeasonsUnFeaturedById(req.season._id);
        const season = await seasonRepositories.setSeasonsFeaturedById(req.season._id);
        return res.status(200).json({
            status: 200,
            message: 'Tournament set featured successfully',
            data: season
        });
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const getFeaturedSeason = async (req: any, res: any): Promise<any> => {
    try {
        console.log("SD")
        const season = await seasonRepositories.findTournamentSeasonByAttribute("isFeatured", "true");
        const matches = await tournamentsRepositories.findAllMatches({ tournament: season._id })
        const topScorers = await seasonRepositories.findSeasonTopScorersSimplified(season._id)

        return res.status(200).json({
            status: 200,
            message: 'Tournament set featured successfully',
            data: { season, matches, topScorers }
        });
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}


export default {
    setFeaturedSeason,
    getFeaturedSeason
}