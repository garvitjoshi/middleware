import './config/db';

import CONFIG from './config/config';
import app from './App';

console.log(CONFIG);

const PORT = CONFIG.PORT;

app.listen(PORT, err => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server is listening on ${PORT}`);
});
