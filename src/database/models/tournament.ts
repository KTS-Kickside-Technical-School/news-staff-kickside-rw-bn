import mongoose, { Schema } from "mongoose";

export interface ITournament {
    name: string;
    description?: string;
    foundedYear?: string;
    country?: Schema.Types.ObjectId;
    type: Schema.Types.ObjectId;
    logo: string;
    created_at: Date;
    updated_at: Date;
}

const tournamentSchema = new Schema<ITournament>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    foundedYear: {
        type: String,
        required: false,
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: "Country",
        required: false,
    },
    type: {
        type: String,
        required: false,
    },
    logo: {
        type: String,
        required: false,
    }
}, { timestamps: true });

const Tournament = mongoose.model<ITournament>("Tournament", tournamentSchema);

export default Tournament;