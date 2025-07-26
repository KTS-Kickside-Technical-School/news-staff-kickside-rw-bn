import { connect } from '../config/config';
import seedArticles from './articles';
import seedUsers from './users';

connect().then(async () => {
    await seedUsers();
    await seedArticles();
    process.exit()
})
