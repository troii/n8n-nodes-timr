import type { INodeProperties } from 'n8n-workflow';
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
				routing: {
					request: {
						method: 'GET',
						url: '/working-times',
					},
				},
			},
		],
		default: 'getAll',
	},
	...workingTimeGetManyDescription,
];
