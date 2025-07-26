import geoip from 'geoip-lite';

export const lookupLocation = (ip: string): string => {
    const geo = geoip.lookup(ip);
    return geo ? `${geo.city}, ${geo.country}` : 'Unknown Location';
};
