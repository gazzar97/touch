import arg from 'arg';
import inquirer from 'inquirer';
import {generateComponent} from './util/generateComponent';
import { generateHTMLFile } from './util/generateHTMLFile';
import {generateStyleSheet} from './util/generateStyleSheet';

function parseArgumentsIntoOptions(rowArgs){
	const args = arg(
		{	
			'--yes':Boolean,
			'--gc':Boolean, // gc stands for generateComponent
			'--gs':Boolean, // gs stands for generateStyleSheet
			'--ghtml':Boolean, // ghtml stands for generate html file 
			'-y':'--yes',
		},
		{
			argv:rowArgs.slice(2)
		}
	);
	return {
		skipPrompts: args['--yes'] || false,
		template: args._[0],
		generateComponent: args['--gc'] || false,
		generateStyleSheet: args['--gs'] || false,
		generateHTMLFile: args['--ghtml'] || false
		
	};


}
/* async function promptForMissingOptions(options){
	
	const defaultTemplate = "JavaScript";
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
			message:'Please choose which project template to use ',
			choices: ['JavaScript','TypeScript'],
			default:defaultTemplate
		})
	}
	if(!options.git){
		questions.push({
			type:'confirm',
			name:'git',
			message:'Initialize a git repository?',
			default:false
		})
	}
	const answers = await inquirer.prompt(questions);
	return{
		...options,
		template: options.template || answers.template,
		git: options.git || answers.git
	}

} */

export async function index(args) {
	let options = parseArgumentsIntoOptions(args)
	options.generateComponent ? generateComponent(args):'';
	options.generateStyleSheet? generateStyleSheet(args):'';
	options.generateHTMLFile? generateHTMLFile(args):'';
}