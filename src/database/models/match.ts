import mongoose, { Schema } from "mongoose";

export interface IMatch {
    slug: string;
    homeTeam: mongoose.Schema.Types.ObjectId;
    awayTeam: mongoose.Schema.Types.ObjectId;
    homeScore: number;
    awayScore: number;
    matchDuration: number;
    matchTime: string;
    status: string;
    tournamentSeason: mongoose.Schema.Types.ObjectId;
}

const matchSchema = new Schema({
    slug: { type: String, required: true, unique: true },
    tournamentSeason: { type: mongoose.Schema.Types.ObjectId, ref: 'TournamentPerYear' },
    homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    homeScore: { type: Number, default: 0 },
    awayScore: { type: Number, default: 0 },
    matchDuration: { type: Number, default: 90 },
    matchTime: { type: String, default: Date.now },
    status: {
        type: String, default: 'scheduled',
        enum: ['scheduled', 'in_progress', 'finished', 'postponed']
    }
}, { timestamps: true }
)


const Match = mongoose.model<IMatch>('Match', matchSchema);

export default Match;