import type { INodeProperties } from 'n8n-workflow';
import { byIdUrl, deleteRouting, getManyRouting, idProperty } from '../shared';
import { taskGetManyDescription } from './getAll';
import { taskWriteDescription } from './write';

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
				name: 'Create',
				value: 'create',
				action: 'Create a task',
				description: 'Create a task',
				routing: { request: { method: 'POST', url: '/tasks' } },
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a task',
				description:
					'Delete a task together with all its subtasks. Fails if project times are recorded on any of them.',
				routing: deleteRouting('/tasks', 'taskId'),
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get tasks',
				description: 'Get tasks',
				routing: getManyRouting('/tasks'),
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a task',
				description: 'Update a task',
				routing: { request: { method: 'PATCH', url: byIdUrl('/tasks', 'taskId') } },
			},
		],
		default: 'getAll',
	},
	idProperty('task', 'Task ID', ['delete', 'update']),
	...taskGetManyDescription,
	...taskWriteDescription,
];
