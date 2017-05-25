require('dotenv').config()
require("es6-promise").polyfill;
require("isomorphic-fetch");

const express = require('express');
const app = express();

const QUANDL_API_KEY = process.env.QUANDL_API_KEY
const baseUrl = 'https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json';

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

function checkStatus(response) {
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}


const {
  dateBuilder,
  datesStringBuilder
} = require('./lib/dateBuilder');



app.get('/api/stocks', (req, res, next) => {
  const date = Number(req.query.date) || (Date.now() - 24 * 60 * 60 * 1000);
  const dates = dateBuilder(date);
  const datesString = datesStringBuilder(dates);
  const initial = req.query.initial;
  const numQuery = initial === "true" ? "&qopts.per_page=100" : ""

  fetch(`${baseUrl}?date=${datesString}` +
        `&qopts.columns=ticker,date,close` +
        numQuery +
        `&api_key=${QUANDL_API_KEY}`)
    .then(checkStatus)
    .then(response => response.json())
    .then(js => {
      let stocks = {};
      js.datatable.data.forEach(stock => {
        stocks[stock[0]] = stocks[stock[0]] || {};
        switch(stock[1].replace(/-/g, "")) {
          case dates.current:
            stocks[stock[0]].current = stock[2];
            break;
          case dates.dayAgo:
            stocks[stock[0]].dayAgo = stock[2];
            break;
          case dates.weekAgo:
            stocks[stock[0]].weekAgo = stock[2];
            break;
          case dates.monthAgo:
            stocks[stock[0]].monthAgo = stock[2];
            break;
          default:
            break;     
        } 
      });
      res.json(stocks);
    })
    .catch(next);
});

app.use((err, req, res, next) => {
  console.error(`Error: ${err.stack}`);
  res.status(err.response ? err.response.status : 500);
  res.json({ error: err.message });
});

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}/`);
});



// `https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?
// date=20160912,20160911&qopts.columns=ticker,date,close&
// api_key=${QUANDL_API_KEY}`
