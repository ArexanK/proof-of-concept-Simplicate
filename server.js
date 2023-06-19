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





// Route for fetching API data PARTNERS
app.get("/", async (req, res) => {
    const response = await fetch('https://demofdnd.simplicate.app/api/v2/projects/project?limit=6', {
        headers: headers
    });

    const data = await response.json();

    console.log(data);

    res.render("index", {
        data: data
    });
})



// Route for fetching API data PROJECTS

// Maak een route voor de index
app.get('/', (req, res) => {
    const url = ("https://demofdnd.simplicate.nl/api/v2/crm/organization?limit=11", {
        headers: headers
    });


    fetch(url, {
            headers
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Request failed with status " + response.status);
            }
            return response.json();
        })

        .then(data => {
            res.render('index', {
                data
            });
            const dataArray = data.data;

        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error occurred');
        });
});








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