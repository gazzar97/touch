import arg from 'arg';
import inquirer from 'inquirer';

function parseArgumentsIntoOptions(rowArgs){
	const args = arg(
		{	
			'--git':Boolean,
			'--yes':Boolean,
			'--install':Boolean,
			'--generateComponent':Boolean,
			'-g':'--git',
			'-y':'--yes',
			'-i':'--install',
			'-c':'--generateComponent'

		},
		{
			argv:rowArgs.slice(2)
		}
	);
	return {
		skipPrompts: args['--yes'] || false,
		git: args['--git'] || false,
		template: args._[0],
		runInstall: args['--install'] || false,
		generateComponent: args['--generateComponent'] || false
	};


}
async function promptForMissingOptions(options){
	
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

}

export async function index(args) {
	let options = parseArgumentsIntoOptions(args)
	options = await promptForMissingOptions(options);
	console.log(options);
   }