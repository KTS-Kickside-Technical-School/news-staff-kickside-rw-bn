import { connect } from '../config/config';
import { unseedArticles } from './articles';
import { unseedUsers } from './users';

connect().then(async () => {
    try {
        await unseedUsers();
        await unseedArticles();
    } catch (error) {
        console.error("Error during unseeding:", error);
    } finally {
        process.exit();
    }
});
