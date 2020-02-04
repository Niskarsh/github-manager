require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
var { renderer } = require("./views/index.js");

const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
	auth: process.env.GITHUT_PAT,
	userAgent: "niskarsh"
});

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
// app.engine('handlebars', hbs.engine());
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "hbs");

app.use(bodyparser.json());
app.use(
	bodyparser.urlencoded({
		extended: true
	})
);

app.get("/", (req, res) => {
	res.send(renderer("home", {}));
});

app.get("/github", async (req, res) => {
	var list = await octokit.repos.createInOrg({
		org: "exponentsoftware",
		name: "ms_prog_coho_city_year"
	});
	console.log(list);
	res.send(list);
});

app.listen(port, err => console.log(err ? err : `server running on ${port}`));
module.exports.app = app;
