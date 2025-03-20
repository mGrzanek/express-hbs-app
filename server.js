const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const convertText = require('./utils/convertText');

const app = express();
app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about', { layout: 'dark' });
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/contact/send-message', (req, res) => {
    res.json(req.body);
});

app.get('/info', (req, res) => {
    res.render('info');
});

app.get('/history', (req, res) => {
    res.render('history');
});

app.get('/hello/:name', (req, res) => {
    res.render('hello', { name: convertText(req.params.name) });
});

app.use((req, res) => {
    res.status(404).render('not-found', { layout: 'dark' });
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});