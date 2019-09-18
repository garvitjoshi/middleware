import * as mongoose from 'mongoose';

import CONFIG from './config';

mongoose.set('useCreateIndex', true);

// Connecting to the database
export default (async () => {
  try {
    await mongoose.connect(
      CONFIG.DB_MONGO_HOST,
      { useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false }
    );
    // listen for requests
    console.log('The Mongo Conection is Ok!');
  } catch (err) {
    console.log(`${err} Could not Connect to the Database. Exiting Now...`);
    process.exit();
  }
})();
