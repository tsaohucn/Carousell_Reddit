"use strict"
import express from 'express'

const app = express();

app.get('/articles/new', function(req, res) {
  res.status(200).json({ name: 'tobi' });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})

export default app