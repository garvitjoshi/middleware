import * as mongoose from 'mongoose';

import CONFIG from './config';

mongoose.set('useCreateIndex', true);

// Connecting to the database
export default (async () => {

  const userPass = (CONFIG.DB_MONGO_USER && CONFIG.DB_MONGO_PASSWORD) ? `${CONFIG.DB_MONGO_USER}:${CONFIG.DB_MONGO_PASSWORD}@` : ``;

  const mongo = {
    "MONGO_URL": `mongodb://${userPass}${CONFIG.DB_MONGO_HOST}:${CONFIG.DB_MONGO_PORT}/`,
    "MONGO_DB_NAME": `${CONFIG.DB_MONGO_NAME}`
  };

  try {
    await mongoose.connect(
      `mongodb://opsengg:mF0cWT0Z6cw51AzXrCOnxKfXuEbTHRSwH7VZ5nVF8uQyOKaPLziIrCF2qlr1dxgmxQZXrhRovu7y9arMT1EuKw==@opsengg.documents.azure.com:10255/OPSMONGO?ssl=true`,
      // `${mongo.MONGO_URL}${mongo.MONGO_DB_NAME}`,
      { useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false }
    );
    // listen for requests
    // console.log('The Mongo Conection is Ok!');
  } catch (err) {
    console.log(`${err} Could not Connect to the Database. Exiting Now...`);
    process.exit();
  }
})();
