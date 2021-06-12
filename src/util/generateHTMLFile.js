import arg from 'arg';
import inquirer from 'inquirer';
const fs  = require('fs');
const path = require('path');

function parseArgumentsIntoOptions(rowArgs){
	
	const args = arg(
		{	
			'--yes':Boolean,
			'-y':'--yes',
		},
		{
			argv:rowArgs.slice(3)
		}
	);
	
	return {
		skipPrompts: args['--yes'] || false,
		template: args._[1],
		fileName:args._[0]
	};
}
function createFile (options){
	
	let pathFile = `${process.cwd()}/ ${options.fileName}.html`;
	let reqPath = path.join(__dirname, '../../');
	//let functionalTemplate = fs.readFileSync(`${reqPath}template/FunctionalTemplate.js`); 
	//let classTemplate = fs.readFileSync(`${reqPath}template/ClassTemplate.js`); 
	let fileContent =  fs.readFileSync(`${reqPath}template/index.html`); 
	fs.writeFileSync(pathFile,fileContent);
}
export  function generateHTMLFile(args){
	let options = parseArgumentsIntoOptions(args)
	createFile(options);
}