import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { carDescription } from './resources/car';
import { driveLogDescription } from './resources/driveLog';
import { driveLogCategoryDescription } from './resources/driveLogCategory';
import { projectTimeDescription } from './resources/projectTime';
import { returnAllProperty } from './resources/shared';
import { taskDescription } from './resources/task';
import { workingTimeDescription } from './resources/workingTime';
import { workingTimeDateSpanDescription } from './resources/workingTimeDateSpan';
import { workingTimeTypeDescription } from './resources/workingTimeType';

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
			baseURL: 'https://api.timr.com/v1/',
			// The timr API reads array filters as statuses=a&statuses=b, not n8n's default statuses[0]=a.
			arrayFormat: 'repeat',
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
						name: 'Car',
						value: 'car',
					},
					{
						name: 'Drive Log',
						value: 'driveLog',
					},
					{
						name: 'Drive Log Category',
						value: 'driveLogCategory',
					},
					{
						name: 'Project Time',
						value: 'projectTime',
					},
					{
						name: 'Task',
						value: 'task',
					},
					{
						name: 'Working Time',
						value: 'workingTime',
					},
					{
						name: 'Working Time Date Span',
						value: 'workingTimeDateSpan',
					},
					{
						name: 'Working Time Type',
						value: 'workingTimeType',
					},
				],
				default: 'task',
			},
			returnAllProperty,
			...carDescription,
			...driveLogDescription,
			...driveLogCategoryDescription,
			...projectTimeDescription,
			...taskDescription,
			...workingTimeDescription,
			...workingTimeDateSpanDescription,
			...workingTimeTypeDescription,
		],
	};
}
