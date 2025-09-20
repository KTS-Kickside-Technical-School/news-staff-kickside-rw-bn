import mongoose from "mongoose";

export interface iTeamPlayer {
    team: mongoose.Schema.Types.ObjectId;
    player: mongoose.Schema.Types.ObjectId;
    jerseyNumber?: number;
    position?: string;
    playerValue?: number;
    constractStatus?: string;
    contractStartDate?: Date;
    contractEndDate?: Date;
    isStillPlaying: boolean;
}

const TeamPlayerSchema = new mongoose.Schema<iTeamPlayer>({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
        required: true,
    },
    jerseyNumber: {
        type: Number,
        required: false,
    },
    position: {
        type: String,
        required: false,
    },
    playerValue: {
        type: Number,
        required: false,
    },
    constractStatus: {
        type: String,
        required: false,
    },
    contractStartDate: {
        type: Date,
        required: false,
    },
    contractEndDate: {
        type: Date,
        required: false,
    },
    isStillPlaying: {
        type: Boolean,
        required: true,
    }
});

const TeamPlayer = mongoose.model<iTeamPlayer>("TeamPlayer", TeamPlayerSchema);

export default TeamPlayer;