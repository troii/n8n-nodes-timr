import type { INodeProperties } from 'n8n-workflow';
import { byIdUrl, deleteRouting, getManyRouting, idProperty } from '../shared';
import { workingTimeDateSpanGetManyDescription } from './getAll';
import { workingTimeDateSpanWriteDescription } from './write';

const showOnlyForWorkingTimeDateSpans = {
	resource: ['workingTimeDateSpan'],
};

export const workingTimeDateSpanDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForWorkingTimeDateSpans,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a working time date span',
				description: 'Create a working time date span',
				routing: { request: { method: 'POST', url: '/working-time-date-spans' } },
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a working time date span',
				description: 'Delete a working time date span',
				routing: deleteRouting('/working-time-date-spans', 'workingTimeDateSpanId'),
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get working time date spans',
				description: 'Get working time date spans',
				routing: getManyRouting('/working-time-date-spans'),
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a working time date span',
				description: 'Update a working time date span',
				routing: {
					request: {
						method: 'PATCH',
						url: byIdUrl('/working-time-date-spans', 'workingTimeDateSpanId'),
					},
				},
			},
		],
		default: 'getAll',
	},
	idProperty('workingTimeDateSpan', 'Working Time Date Span ID', ['delete', 'update']),
	...workingTimeDateSpanGetManyDescription,
	...workingTimeDateSpanWriteDescription,
];
