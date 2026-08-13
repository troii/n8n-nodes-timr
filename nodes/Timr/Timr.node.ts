import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { taskDescription } from './resources/task';
import { projectTimeDescription } from './resources/projectTime';

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
						name: 'Task',
						value: 'task',
					},
					{
						name: 'Project Time',
						value: 'projectTime',
					},
				],
				default: 'task',
			},
			...taskDescription,
			...projectTimeDescription,
		],
	};
}
