const fs = require("fs");
const path = require("path");
const config = require("./config");


const saveFile = (path, file) => {
	if(path.includes("/")) {
		const dirs = path.split("/")[0];
		let prefix = `${config.dev.outdir}/${dirs}`;
		//Make subfolder
		if (!fs.existsSync(prefix))
			fs.mkdirSync(prefix);
	}

	let fullPath = `${config.dev.outdir}/${path}`;

	//Save file
	fs.writeFile(
		fullPath,
		file,
		e => {
			if (e) throw e;
			console.log(`${fullPath} was created successfully`);
		}
	);
}

const emptyDirectory = async (directory) => {
	let folders = await fs.promises.readdir(directory);
	for (const file of folders) {
		await fs.promises.unlink(path.join(directory, file));
	}
}

module.exports = {
	saveFile: saveFile,
	emptyDirectory: emptyDirectory
};