import express from 'express'
import * as dotenv from 'dotenv'




// function getFetch() {
const url = 'https://demofdnd.simplicate.app/api/v2/projects/project'
const projectUrl = url + '?limit=6' + process.env.AuthenticationKey + process.env.AuthenticationSecret


// activate dotenv
dotenv.config()


// Maak een nieuwe express app
const app = express()

// Stel in hoe we express gebruiken
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))


app.get('/', (request, response) => {
    let projectUrl = url + '/name'

    fetchJson(projectUrl).then((data) => {
        response.render('index', data)
    })
})








// fetch(url)
//     .then(res => res.json()) //parse response van JSON
//     .then(data => {
//         console.log(data)
//     })

//     .catch(err => {
//         console.log(`error ${err}`)
//     })















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