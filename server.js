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


// Fetch Partners
app.get('/', async (req, res) => {
    const organizationResponse = await fetch('https://demofdnd.simplicate.app/api/v2/crm/organization?limit=4', {
        headers: headers //authentication key + secret
    });
    const organizationData = await organizationResponse.json();

    // Fetch projects
    const projectResponse = await fetch('https://demofdnd.simplicate.app/api/v2/projects/project?limit=8', {
        headers: headers
    });
    const projectData = await projectResponse.json();


    // Fetch verjaardagen
    const birthdayResponse = await fetch('https://demofdnd.simplicate.nl/api/v2/crm/person?limit=4', {
        headers: headers
    });
    const birthdayData = await birthdayResponse.json();

    // Fetch verschillende contracten fulltime/parttime/oproepkracht
    const employmentResponse = await fetch('https://demofdnd.simplicate.app/api/v2/hrm/employmenttype?limit=10', {
        headers: headers
    });
    const employmentData = await employmentResponse.json();

    res.render("index", {
        organizationData: organizationData,
        projectData: projectData,
        employmentData: employmentData,
        birthdayData: birthdayData

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