const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const port = 3000;

app.use(express.json());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));
app.get('/',(req,res)=>res.end('user get password'));
app.post('./forgot-password', (req, res) => res.send('Forgot Password'));
app.post('/reset-password', (req, res) => res.send('Reset Password'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

