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
async function promptForMissingOptions(options){

	const defaultTemplate = "css";
	if(options.skipPrompts){
		return {
			...options,
			template : options.template || defaultTemplate
		};
	}
	const questions = [];
	if(!options.template){
		questions.push({
			type:'list',
			name:'template',
			message:'Please choose which stylesheet mode to use ?',
			choices: ['css','module.css'],
			default:defaultTemplate
		})
	}
	const answers = await inquirer.prompt(questions);
	return{
		...options,
		template: options.template || answers.template
	}
}
function createFile (options){
	
	let pathFile = `${process.cwd()}/ ${options.fileName}.${options.template}`;
	//let reqPath = path.join(__dirname, '../../');
	//let functionalTemplate = fs.readFileSync(`${reqPath}template/FunctionalTemplate.js`); 
	//let classTemplate = fs.readFileSync(`${reqPath}template/ClassTemplate.js`); 
	//let fileContent =  options.template === 'Functional'? functionalTemplate:classTemplate;
	fs.writeFileSync(pathFile,'');
}
export async function generateStyleSheet(args){
	let options = parseArgumentsIntoOptions(args)
	options = await promptForMissingOptions(options)
	createFile(options);
}