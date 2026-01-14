import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { userDescription } from './resources/user';
import { companyDescription } from './resources/company';
import { taskDescription } from './resources/task';

export class Timr implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'timr',
		name: 'timr',
		icon: { light: 'file:timr.svg', dark: 'file:timr.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the timr API',
		defaults: {
			name: 'timr',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'timrOAuth2Api', required: true }],
		requestDefaults: {
			baseURL: 'https://api.timr.com/v0.2/',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Company',
						value: 'company',
					},
					{
						name: 'Task',
						value: 'task',
					},
				],
				default: 'user',
			},
			...userDescription,
			...companyDescription,
			...taskDescription,
		],
	};
}
