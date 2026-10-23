import type { INodeProperties } from 'n8n-workflow';
import { getManyRouting } from '../shared';
import { workingTimeGetManyDescription } from './getAll';

const showOnlyForWorkingTimes = {
	resource: ['workingTime'],
};

export const workingTimeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForWorkingTimes,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get working times',
				description: 'Get working times',
				routing: getManyRouting('/working-times'),
			},
		],
		default: 'getAll',
	},
	...workingTimeGetManyDescription,
];
