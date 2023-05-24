const fs = require("fs");
const config = require("./config");
const helpers = require("./helpers.js")
const {loadCitations, makeCitationPage} = require("./citation");


const prepareDirectory = async (callback) => {
	//Make public folder
	if (!fs.existsSync(config.dev.outdir)) {
		fs.mkdirSync(config.dev.outdir);
	} else {
		await helpers.emptyDirectory(config.dev.outdir);
	}
	callback();
}

prepareDirectory(() => {
	const check = fs.readFileSync("./src/research-proposal/main.html");
	const refs = makeCitationPage();
	helpers.saveFile("research-proposal/main.html", check);
	helpers.saveFile(refs.path, refs.file);
	loadCitations();
});