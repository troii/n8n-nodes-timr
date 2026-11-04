import type { INodeProperties } from 'n8n-workflow';
import { byIdUrl, deleteRouting, getManyRouting, idProperty } from '../shared';
import { workingTimeGetManyDescription } from './getAll';
import { workingTimeWriteDescription } from './write';

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
				name: 'Create',
				value: 'create',
				action: 'Create a working time',
				description: 'Create a working time',
				routing: { request: { method: 'POST', url: '/working-times' } },
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a working time',
				description: 'Delete a working time',
				routing: deleteRouting('/working-times', 'workingTimeId'),
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get working times',
				description: 'Get working times',
				routing: getManyRouting('/working-times'),
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a working time',
				description: 'Update a working time',
				routing: { request: { method: 'PATCH', url: byIdUrl('/working-times', 'workingTimeId') } },
			},
		],
		default: 'getAll',
	},
	idProperty('workingTime', 'Working Time ID', ['delete', 'update']),
	...workingTimeGetManyDescription,
	...workingTimeWriteDescription,
];
