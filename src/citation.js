const Cite = require('citation-js')
const bibCite = require('@citation-js/plugin-bibtex')
const fs = require('fs')

const citations = loadCitations();

const loadCitations = () => {
	const refs = fs.readFileSync("./src/references.bib", { encoding: 'utf8', flag: 'r' });

	// console.log(refs);
	const data = new Cite(refs);

	console.log(data.format('bibliography', {
		format: 'html',
		template: 'apa',
		lang: 'en-US'
	}));

	return 	data.format('bibliography', {
		format: 'html',
		template: 'apa',
		lang: 'en-US'
	});
}

const makeCitationPage = () => {
	const refs = loadCitations();
	const text = `<!DOCTYPE html>
	<html lang="en">
		<head>
		<meta charset="UTF-8">
		<title>Research proposal IPC</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
	      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	</head>
	<body>
	${refs}
	</body>

</html>`
	return {
		path: "citations.html",
		file: text
	}
}

module.exports = {
	citations: citations,
	makeCitationPage: makeCitationPage
}



