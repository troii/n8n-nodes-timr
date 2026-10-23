import type { INodeProperties } from 'n8n-workflow';
import {
	commaSeparatedList,
	sortByStartOrLastModifiedProperty,
	sortDirectionProperty,
	trueOrUndefined,
} from '../shared';

const showOnlyForDriveLogGetMany = {
	operation: ['getAll'],
	resource: ['driveLog'],
};

export const driveLogGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Start From',
		name: 'startFrom',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForDriveLogGetMany },
		description: 'Filter entries started from this day on (YYYY-MM-DD)',
		routing: {
			send: {
				type: 'query',
				property: 'start_from',
			},
		},
	},
	{
		displayName: 'Start To',
		name: 'startTo',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForDriveLogGetMany },
		description: 'Filter entries started up to and including this day (YYYY-MM-DD)',
		routing: {
			send: {
				type: 'query',
				property: 'start_to',
			},
		},
	},
	{
		displayName: 'Last Modified After',
		name: 'lastModifiedAfter',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForDriveLogGetMany },
		description: 'Filter entries modified after this instant (ISO 8601)',
		routing: {
			send: {
				type: 'query',
				property: 'last_modified_after',
			},
		},
	},
	{
		displayName: 'Details',
		name: 'details',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForDriveLogGetMany },
		description: 'Filter entries containing this string in their route, purpose or visited places',
		routing: {
			send: {
				type: 'query',
				property: 'details',
			},
		},
	},
	{
		displayName: 'Car IDs',
		name: 'cars',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForDriveLogGetMany },
		description: 'Comma-separated car IDs',
		routing: {
			send: {
				type: 'query',
				property: 'cars',
				value: commaSeparatedList,
			},
		},
	},
	{
		displayName: 'Drive Log Category IDs',
		name: 'driveLogCategories',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForDriveLogGetMany },
		description: 'Comma-separated drive log category IDs',
		routing: {
			send: {
				type: 'query',
				property: 'drive_log_categories',
				value: commaSeparatedList,
			},
		},
	},
	{
		displayName: 'Statuses',
		name: 'statuses',
		type: 'multiOptions',
		default: [],
		displayOptions: { show: showOnlyForDriveLogGetMany },
		options: [
			{ name: 'Approved', value: 'approved' },
			{ name: 'Archived', value: 'archived' },
			{ name: 'Changeable', value: 'changeable' },
			{ name: 'Cleared', value: 'cleared' },
			{ name: 'Closed', value: 'closed' },
			{ name: 'Locked', value: 'locked' },
			{ name: 'Running', value: 'running' },
		],
		description: 'Filter entries by status',
		routing: {
			send: {
				type: 'query',
				property: 'statuses',
			},
		},
	},
	{
		displayName: 'User IDs',
		name: 'users',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForDriveLogGetMany },
		description: 'Comma-separated user IDs',
		routing: {
			send: {
				type: 'query',
				property: 'users',
				value: commaSeparatedList,
			},
		},
	},
	{
		displayName: 'Has Track',
		name: 'hasTrack',
		type: 'boolean',
		default: false,
		displayOptions: { show: showOnlyForDriveLogGetMany },
		description: 'Whether to only show entries with a recorded GPS track',
		routing: {
			send: {
				type: 'query',
				property: 'has_track',
				value: trueOrUndefined,
			},
		},
	},
	{
		displayName: 'Changed',
		name: 'changed',
		type: 'boolean',
		default: false,
		displayOptions: { show: showOnlyForDriveLogGetMany },
		description: 'Whether to only show entries changed by the user',
		routing: {
			send: {
				type: 'query',
				property: 'changed',
				value: trueOrUndefined,
			},
		},
	},
	sortDirectionProperty(showOnlyForDriveLogGetMany),
	sortByStartOrLastModifiedProperty(showOnlyForDriveLogGetMany),
];
