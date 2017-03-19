import express from 'express';
import http from 'http';
import router from './route.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import * as Helper from './helper';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import client_routes from './client-route';

const app = express();
const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Accept-Ranges, Content-Range, Content-Encoding, Content-Length');
//     res.header('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Range, Content-Encoding, Content-Length');
//     next();
// });

app.get('/', (req, res) => {
    match(
        { client_routes, location: req.url },
        (err, redirectLocation, renderProps) => {

            if (err) {
                return res.status(500).send(err.message);
            }

            // in case of redirect propagate the redirect to the browser
            if (redirectLocation) {
                return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            }

            let markup;
            if (renderProps) {
                markup = renderToString(<RouterContext {...renderProps} />);
            }
            else {

            }

            return res.render('index', { markup });
        }
    );
})

app.use('/api', router);


const uriString = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL ||
    "mongodb://hmtri1011:Hoangminhtri1011@ds029426.mlab.com:29426/pdffiller"

mongoose.Promise = Promise;
mongoose.connect(uriString, (err, res) => {
    if (err) {
        console.log('ERROR connecting to: database' + '. ' + err);
    } else {
        console.log('Succeeded connected to: database');
    }
});

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

server.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
});
