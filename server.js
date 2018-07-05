const express = require('express');

const app = express();
const PORT = '8111';

app.use(express.static('dist'));

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
