import type { INodeProperties } from 'n8n-workflow';
import { byIdUrl, deleteRouting, getManyRouting, idProperty } from '../shared';
import { driveLogGetManyDescription } from './getAll';
import { driveLogWriteDescription } from './write';

const showOnlyForDriveLogs = {
	resource: ['driveLog'],
};

export const driveLogDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForDriveLogs,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a drive log',
				description: 'Create a drive log',
				routing: { request: { method: 'POST', url: '/drive-logs' } },
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a drive log',
				description: 'Delete a drive log',
				routing: deleteRouting('/drive-logs', 'driveLogId'),
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get drive logs',
				description: 'Get drive logs',
				routing: getManyRouting('/drive-logs'),
			},
			{
				name: 'Get Track',
				value: 'getTrack',
				action: 'Get the track of a drive log',
				description: 'Get the recorded GPS track of a drive log',
				routing: {
					request: { method: 'GET', url: `${byIdUrl('/drive-logs', 'driveLogId')}/track` },
					// The API returns a bare waypoint array; keep it as one item per drive log.
					output: {
						postReceive: [
							{
								type: 'set',
								properties: {
									value:
										'={{ { drive_log_id: $parameter.driveLogId, waypoints: $response.body } }}',
								},
							},
						],
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a drive log',
				description: 'Update a drive log',
				routing: { request: { method: 'PATCH', url: byIdUrl('/drive-logs', 'driveLogId') } },
			},
		],
		default: 'getAll',
	},
	idProperty('driveLog', 'Drive Log ID', ['delete', 'getTrack', 'update']),
	...driveLogGetManyDescription,
	...driveLogWriteDescription,
];
