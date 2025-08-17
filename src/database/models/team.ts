import mongoose, { Schema } from "mongoose";

export interface ITeam {
    name: string;
    country: mongoose.Schema.Types.ObjectId;
    logo: string;
}

const teamSchema = new Schema<ITeam>({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Country",
    },
    logo: {
        type: String,
        required: true,
    },
});

const Team = mongoose.model("Team", teamSchema);

export default Team;