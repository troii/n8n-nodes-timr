import type { INodeProperties } from 'n8n-workflow';
import { byIdUrl, deleteRouting, getManyRouting, idProperty } from '../shared';
import { projectTimeGetManyDescription } from './getAll';
import { projectTimeWriteDescription } from './write';

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
				name: 'Create',
				value: 'create',
				action: 'Create a project time',
				description: 'Create a project time',
				routing: { request: { method: 'POST', url: '/project-times' } },
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a project time',
				description: 'Delete a project time',
				routing: deleteRouting('/project-times', 'projectTimeId'),
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get project times',
				description: 'Get project times',
				routing: getManyRouting('/project-times'),
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a project time',
				description: 'Update a project time',
				routing: { request: { method: 'PATCH', url: byIdUrl('/project-times', 'projectTimeId') } },
			},
		],
		default: 'getAll',
	},
	idProperty('projectTime', 'Project Time ID', ['delete', 'update']),
	...projectTimeGetManyDescription,
	...projectTimeWriteDescription,
];
