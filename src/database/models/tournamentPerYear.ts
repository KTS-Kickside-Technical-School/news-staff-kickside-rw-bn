import mongoose from "mongoose";

export interface ITournamentPerYear {
    tournament: mongoose.Schema.Types.ObjectId;
    name: string;
    year: mongoose.Schema.Types.ObjectId;
    teams: mongoose.Schema.Types.ObjectId[];
    startDate: string;
    endDate: string;
    status: string
}

const tournamentPerYearSchema = new mongoose.Schema<ITournamentPerYear>({
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    year: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Year",
        required: true,
    },
    teams: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Team",
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Upcoming", "Ongoing", "Completed"],
        default: "Upcoming",
        required: true,
    }
})

const TournamentPerYear = mongoose.model<ITournamentPerYear>("TournamentPerYear", tournamentPerYearSchema);

export default TournamentPerYear;