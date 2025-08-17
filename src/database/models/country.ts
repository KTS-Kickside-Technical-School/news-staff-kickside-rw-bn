import mongoose, { Schema } from "mongoose";

export interface ICountry {
    name: string;
    code: string;
    flagUrl: string;
}

const countriesSchema = new Schema<ICountry>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    flagUrl: {
        type: String,
        required: true,
    }
})

const Country = mongoose.model("Country", countriesSchema);

export default Country;