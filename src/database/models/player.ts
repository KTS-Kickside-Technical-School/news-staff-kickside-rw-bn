import mongoose from "mongoose";

export interface iPlayer {
    firstname: string;
    lastname: string;
    birthdate: Date;
    nationality: string;
}

const PlayersSchema = new mongoose.Schema<iPlayer>({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
})

const Player = mongoose.model<iPlayer>("Player", PlayersSchema);

export default Player;