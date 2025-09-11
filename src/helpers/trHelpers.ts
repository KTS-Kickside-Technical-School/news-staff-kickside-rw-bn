export const now = new Date();
export const last5days = new Date(now.getTime() - 24 * 5 * 60 * 60 * 1000);
export const fiveDaysLater = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
export const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
