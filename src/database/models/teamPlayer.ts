import mongoose from "mongoose";

export interface iTeamPlayer {
    team: mongoose.Schema.Types.ObjectId;
    player: mongoose.Schema.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    stillPlaying: boolean;
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
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: false,
    },
    stillPlaying: {
        type: Boolean,
        required: true,
    }
});

const TeamPlayer = mongoose.model<iTeamPlayer>("TeamPlayer", TeamPlayerSchema);

export default TeamPlayer;