import express from 'express'
import * as dotenv from 'dotenv'

const url = 'https://demofdnd.simplicate.app/api/v2'


// activate dotenv
dotenv.config()


const projectURL = url + 'projects/project?limit=6&authorization=' + process.env.AuthenticationKey
const data = await fetch(url).then((response) => response.json())


// Maak een nieuwe express app
const app = express()


// Stel afhandeling van formulieren in
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


// Stel in hoe we express gebruiken
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

// Maak een route voor de index
app.get('/', (request, response) => {
    fetchJson(projectURL).then((data) => {
        //         let dataClone = structuredClone(data);

        //         if (request.query.name) {
        //             dataClone.results.name = dataClone.results.name.filter(function (name) {
        //                 return results.name.includes(request.query.name)
        //             })
        //         }
        response.render('index', dataClone)
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