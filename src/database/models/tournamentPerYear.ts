import mongoose from "mongoose";

export interface ITournamentPerYear {
    tournament: mongoose.Schema.Types.ObjectId;
    name: string;
    year: mongoose.Schema.Types.ObjectId;
    teams: mongoose.Schema.Types.ObjectId[];
    startDate: string;
    endDate: string;
    status: string;
    slug: string;
}

const tournamentPerYearSchema = new mongoose.Schema<ITournamentPerYear>(
    {
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
        },
        slug: {
            type: String,
            unique: true,
            required: true,
        },
    },
    { timestamps: true }
);

tournamentPerYearSchema.pre("validate", function (next) {
    if (!this.slug) {
        const timestamp = Math.floor(Date.now() / 1000);
        const safeName = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
        this.slug = `${safeName}-${timestamp}`;
    }
    next();
});

const TournamentPerYear = mongoose.model<ITournamentPerYear>(
    "TournamentPerYear",
    tournamentPerYearSchema
);

export default TournamentPerYear;
