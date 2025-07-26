"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupLocation = void 0;
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const lookupLocation = (ip) => {
    const geo = geoip_lite_1.default.lookup(ip);
    return geo ? `${geo.city}, ${geo.country}` : 'Unknown Location';
};
exports.lookupLocation = lookupLocation;
//# sourceMappingURL=geoService.js.map