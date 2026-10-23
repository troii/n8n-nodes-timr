import type { INodeProperties } from 'n8n-workflow';
import { getManyRouting } from '../shared';
import { driveLogGetManyDescription } from './getAll';

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
					request: {
						method: 'GET',
						url: '=/drive-logs/{{ encodeURIComponent($parameter.driveLogId) }}/track',
					},
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
		],
		default: 'getAll',
	},
	{
		displayName: 'Drive Log ID',
		name: 'driveLogId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { ...showOnlyForDriveLogs, operation: ['getTrack'] } },
		description: 'ID of the drive log whose track to return',
	},
	...driveLogGetManyDescription,
];
