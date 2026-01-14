import type { INodeProperties } from 'n8n-workflow';
import { projectTimeGetManyDescription } from './getAll';

const showOnlyForProjectTimes = {
	resource: ['projectTime'],
};

export const projectTimeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForProjectTimes,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get project times',
				description: 'Get project times',
				routing: {
					request: {
						method: 'GET',
						url: '/project-times',
					},
				},
			},
		],
		default: 'getAll',
	},
	...projectTimeGetManyDescription,
];
