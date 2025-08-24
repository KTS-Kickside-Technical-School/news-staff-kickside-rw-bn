import mongoose, { Schema } from "mongoose";

export interface IYears {
    name: string;
    startYear: string;
    endYear: string;
    isLatest: boolean;
}

const yearSchema = new Schema<IYears>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    startYear: {
        type: String,
        required: true,
        unique: true
    },
    endYear: {
        type: String,
        required: true
    },
    isLatest: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

const Year = mongoose.model("Year", yearSchema);

export default Year;