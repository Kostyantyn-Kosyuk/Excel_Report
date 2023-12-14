import { FunctionPlugin, FunctionArgumentType } from 'hyperformula';

export class MyCustomPlugin extends FunctionPlugin {
	greet(ast, state) {
		return this.runFunction(
			ast.args,
			state,
			this.metadata('GREET'),
			(...rest) => {
				return rest.join(', ');
			}
		);
	}
}

MyCustomPlugin.implementedFunctions = {
	GREET: {
		method: 'greet',
		parameters: [
			{
				argumentType: FunctionArgumentType.STRING,
				defaultValue: 'default'
			},
			{
				argumentType: FunctionArgumentType.SCALAR,
				defaultValue: 'default'
			}
		]
	}
};

export const MyCustomPluginTranslations = {
	enGB: {
		GREET: 'GREET'
	},
	enUS: {
		GREET: 'GREET'
	}
};
