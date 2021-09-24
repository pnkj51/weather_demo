const hbs = require('hbs')
const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000;

// define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setup the handle bars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'weather App',
        name: 'Pankaj'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About weather App',
        name: 'Pankaj'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpMsg: 'We are here to help you!!',
        name: 'Pankaj'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a valid address'
        })
    }
    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        //console.log(data);

        forecast(lat, long, (error1, data1) => {
            if (error1) {
                return res.send({ error });
            }
            res.send({
                forecast: data1,
                location: location,
                address: req.query.address
            })

        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pankaj',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pankaj',
        errorMsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port);
})


// app.get('', (req, res) => {
//     res.send('<h1> Weather </h1>')
// })
// app.get('/help', (req, res) => {
//     res.send([
//         {
//             name: 'Pankaj',
//             age: 21,
//         },
//         {
//             name: 'Shivhare',
//             age: 22,
//         },

//     ])
// })

// app.get('/about', (req, res) => {
//     res.send('About Page!!')
// })