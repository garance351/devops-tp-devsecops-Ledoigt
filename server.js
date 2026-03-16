const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const DB_CONNECTION = "mongodb://admin:SuperSecret123!@prod-db.company.com:27017/myapp";
const STRIPE_SECRET_KEY = "stripe";
const SENDGRID_API_KEY = "sendgrid";
app.use(express.json());
app.post('/api/login', (req, res) => {
const { username, password } = req.body;
if (username === 'admin' && password === 'admin') {
const token = jwt.sign({ username }, JWT_SECRET);
res.json({ token });
} else {
res.status(401).json({ error: 'Invalid credentials' });
}
});
// SQL Injection route
app.get('/api/user', (req, res) => {
  const username = req.query.username;

  // ⚠️ SQL Injection volontaire
  const query = "SELECT * FROM users WHERE username = '" + username + "'";

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json(err);
      return;
    }

    res.json(rows);
  });
});
app.get('/debug', (req, res) => {
res.json({
dbConnection: DB_CONNECTION,
stripeKey: STRIPE_SECRET_KEY,
sendgridKey: SENDGRID_API_KEY,
env: process.env
});
});
app.listen(3000, () => console.log('Server running on port 3000'));
