const express = require('express');
const app = express();
const port = process.env.PORT || 5001; // Changed to 5001

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
