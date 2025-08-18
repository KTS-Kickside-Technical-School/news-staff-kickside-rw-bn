import mongoose from "mongoose";

export interface iMatchActivities {
    match: mongoose.Schema.Types.ObjectId;
    activity: string;
    summary: string;
}

const MatchActivitiesSchema = new mongoose.Schema<iMatchActivities>({
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match",
        required: true,
    },
    activity: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
})

const MatchActivities = mongoose.model<iMatchActivities>("MatchActivities", MatchActivitiesSchema);

export default MatchActivities;