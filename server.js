import express from 'express'
import * as dotenv from 'dotenv'
// import fetch from "node-fetch";

// activate dotenv
dotenv.config()

const headers = {
    'Accept': 'application/json',
    'Authentication-Key': process.env.AuthenticationKey,
    'Authentication-Secret': process.env.AuthenticationSecret
}

// Maak een nieuwe express app
const app = express()

// Stel in hoe we express gebruiken
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))


// Route for fetching API data
app.get("/", async (req, res) => {
    const response = await fetch('https://demofdnd.simplicate.app/api/v2/projects/project?limit=6', {
        headers: headers
    });

    const response = await fetch('https://demofdnd.simplicate.app/api/v2/hrm/timetable?limit=5', {
        headers: headers
    });


    const data = await response.json();

    console.log(data);

    res.render("index", {
        data: data
    });
})

// Stel het poortnummer in en start express
app.set("port", process.env.PORT || 5050);
app.listen(app.get('port'), function () {
    console.log(`application started on http://localhost:${app.get('port')}`)
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
    return await fetch(url)
        .then((response) => response.json())
        .catch((error) => error)
}