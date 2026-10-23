import type { INodeProperties } from 'n8n-workflow';
import {
	commaSeparatedList,
	sortByStartOrLastModifiedProperty,
	sortDirectionProperty,
	trueOrUndefined,
} from '../shared';

const showOnlyForWorkingTimeGetMany = {
	operation: ['getAll'],
	resource: ['workingTime'],
};

export const workingTimeGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Notes',
		name: 'notes',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForWorkingTimeGetMany },
		description: 'Filter entries containing this string in their notes',
		routing: {
			send: {
				type: 'query',
				property: 'notes',
			},
		},
	},
	{
		displayName: 'Start From',
		name: 'startFrom',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForWorkingTimeGetMany },
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
		displayOptions: { show: showOnlyForWorkingTimeGetMany },
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
		displayOptions: { show: showOnlyForWorkingTimeGetMany },
		description: 'Filter entries modified after this instant (ISO 8601)',
		routing: {
			send: {
				type: 'query',
				property: 'last_modified_after',
			},
		},
	},
	{
		displayName: 'Working Time Type IDs',
		name: 'workingTimeTypes',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForWorkingTimeGetMany },
		description: 'Comma-separated working time type IDs',
		routing: {
			send: {
				type: 'query',
				property: 'working_time_types',
				value: commaSeparatedList,
			},
		},
	},
	{
		displayName: 'Working Time Type Categories',
		name: 'workingTimeTypeCategories',
		type: 'multiOptions',
		default: [],
		displayOptions: { show: showOnlyForWorkingTimeGetMany },
		options: [
			{ name: 'Attendance Time', value: 'attendance_time' },
			{ name: 'Break Time', value: 'break_time' },
			{ name: 'Paid Time Off', value: 'paid_time_off' },
			{ name: 'Suspension', value: 'suspension' },
			{ name: 'Unpaid Time Off', value: 'unpaid_time_off' },
			{ name: 'Vacation', value: 'vacation' },
		],
		description: 'Filter entries by the category of their working time type',
		routing: {
			send: {
				type: 'query',
				property: 'working_time_type_categories',
			},
		},
	},
	{
		displayName: 'Statuses',
		name: 'statuses',
		type: 'multiOptions',
		default: [],
		displayOptions: { show: showOnlyForWorkingTimeGetMany },
		options: [
			{ name: 'Approved', value: 'approved' },
			{ name: 'Archived', value: 'archived' },
			{ name: 'Changeable', value: 'changeable' },
			{ name: 'Closed', value: 'closed' },
			{ name: 'Locked', value: 'locked' },
			{ name: 'Paused', value: 'paused' },
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
		displayOptions: { show: showOnlyForWorkingTimeGetMany },
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
		displayName: 'Changed',
		name: 'changed',
		type: 'boolean',
		default: false,
		displayOptions: { show: showOnlyForWorkingTimeGetMany },
		description: 'Whether to only show entries changed by the user',
		routing: {
			send: {
				type: 'query',
				property: 'changed',
				value: trueOrUndefined,
			},
		},
	},
	sortDirectionProperty(showOnlyForWorkingTimeGetMany),
	sortByStartOrLastModifiedProperty(showOnlyForWorkingTimeGetMany),
];
