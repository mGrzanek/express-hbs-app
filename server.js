const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const convertText = require('./utils/convertText');
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })

const app = express();
app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/contact/send-message', upload.single('picture'), (req, res) => {
    const { author, sender, title, message } = req.body;
    const picture = req.file;

    if(author && sender && title && picture && message) {
      res.render('contact', { isSent: true, filename: req.file.originalname });
    }
    else {
      res.render('contact', { isError: true });
    }
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