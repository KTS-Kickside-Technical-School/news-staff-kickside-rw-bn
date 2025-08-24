import mongoose from "mongoose";

export interface iMatchActivities {
    match: mongoose.Schema.Types.ObjectId;
    team: mongoose.Schema.Types.ObjectId;
    player?: mongoose.Schema.Types.ObjectId;
    relatedPlayer?: mongoose.Schema.Types.ObjectId;
    eventType: string;
    minute: number;
    outcome?: string;
    description?: string;
}

const MatchActivitiesSchema = new mongoose.Schema<iMatchActivities>({
    match: { type: mongoose.Schema.Types.ObjectId, ref: "Match", required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },

    player: {
        type: mongoose.Schema.Types.ObjectId, ref: "Player",
        required: false
    },

    relatedPlayer: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: false },

    eventType: {
        type: String,
        enum: [
            "goal", "own_goal", "penalty_goal",
            "assist",
            "shot_on_target", "shot_off_target", "penalty_missed",
            "yellow_card", "red_card", "second_yellow_card",
            "substitution_in", "substitution_out",
            "foul_committed", "foul_suffered",
            "free_kick_awarded", "penalty_awarded",
            "kickoff", "half_time", "full_time",
            "extra_time_start", "extra_time_end",
            "penalty_shootout_start", "penalty_shootout_end",
            "corner_kick", "throw_in",
            "injury",
            "VAR_check", "goal_cancelled"
        ],
        required: true,
    },

    minute: { type: Number, required: true },

    description: { type: String },

    outcome: { type: String },
}, { timestamps: true });

const MatchActivities = mongoose.model<iMatchActivities>("MatchActivities", MatchActivitiesSchema);

export default MatchActivities;