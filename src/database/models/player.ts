import mongoose from "mongoose";

export interface iPlayer {
    firstname: string;
    lastname?: string;
    nationality?: mongoose.Schema.Types.ObjectId;
    dateOfBirth?: Date;
    height?: number;
    weight?: number;
    preferredFoot?: string;
    image?: string;
}

const PlayersSchema = new mongoose.Schema<iPlayer>({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: false,
    },
    nationality: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
        required: false,
        validate: {
            validator: async function (value: mongoose.Types.ObjectId) {
                if (!value) return true; 
                const country = await mongoose.model('Country').findById(value);
                return country !== null;
            },
            message: "Invalid country reference"
        }
    },
    dateOfBirth: {
        type: Date,
        required: false,
    },
    height: {
        type: Number,
        required: false,

    },
    weight: {
        type: Number,
        required: false,
    },
    preferredFoot: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    }
})

const Player = mongoose.model<iPlayer>("Player", PlayersSchema);

export default Player;