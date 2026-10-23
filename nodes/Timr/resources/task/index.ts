import type { INodeProperties } from 'n8n-workflow';
import { getManyRouting } from '../shared';
import { taskGetManyDescription } from './getAll';

const showOnlyForTasks = {
	resource: ['task'],
};

export const taskDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForTasks,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get tasks',
				description: 'Get tasks',
				routing: getManyRouting('/tasks'),
			},
		],
		default: 'getAll',
	},
	...taskGetManyDescription,
];
