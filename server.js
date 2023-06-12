import express, {
    json,
    response
} from "express";
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

app.get('/', function (request, response) {
    response.render('index')
})

app.set("port", process.env.PORT || 5050);
app.listen(app.get('port'), function () {
    console.log(`application started on http://localhost:${app.get('port')}`)
})