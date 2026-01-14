import type { INodeProperties } from 'n8n-workflow';

const showOnlyForProjectTimeGetMany = {
	operation: ['getAll'],
	resource: ['projectTime'],
};

export const projectTimeGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Notes',
		name: 'notes',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForProjectTimeGetMany },
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
		displayOptions: { show: showOnlyForProjectTimeGetMany },
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
		displayOptions: { show: showOnlyForProjectTimeGetMany },
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
		displayOptions: { show: showOnlyForProjectTimeGetMany },
		description: 'Filter entries modified after this instant (ISO 8601)',
		routing: {
			send: {
				type: 'query',
				property: 'last_modified_after',
			},
		},
	},
	{
		displayName: 'Task ID',
		name: 'task',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForProjectTimeGetMany },
		description: 'Restrict entries to a specific task',
		routing: {
			send: {
				type: 'query',
				property: 'task',
				value: '={{ $value ? $value : undefined }}',
			},
		},
	},
	{
		displayName: 'Traverse Task Tree',
		name: 'traverseTaskTree',
		type: 'boolean',
		default: true,
		displayOptions: { show: showOnlyForProjectTimeGetMany },
		description: 'Whether to traverse the task tree for the specified task',
		routing: {
			send: {
				type: 'query',
				property: 'traverse_task_tree',
			},
		},
	},
	{
		displayName: 'Billable',
		name: 'billable',
		type: 'boolean',
		default: false,
		displayOptions: { show: showOnlyForProjectTimeGetMany },
		description: 'Only show billable entries',
		routing: {
			send: {
				type: 'query',
				property: 'billable',
			},
		},
	},
	{
		displayName: 'Statuses',
		name: 'statuses',
		type: 'multiOptions',
		default: [],
		displayOptions: { show: showOnlyForProjectTimeGetMany },
		options: [
			{ name: 'Running', value: 'running' },
			{ name: 'Paused', value: 'paused' },
			{ name: 'Changeable', value: 'changeable' },
			{ name: 'Locked', value: 'locked' },
			{ name: 'Approved', value: 'approved' },
			{ name: 'Cleared', value: 'cleared' },
			{ name: 'Closed', value: 'closed' },
			{ name: 'Archived', value: 'archived' },
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
		displayOptions: { show: showOnlyForProjectTimeGetMany },
		description: 'Comma-separated user IDs',
		routing: {
			send: {
				type: 'query',
				property: 'users',
				value: '={{ $value ? $value.split(\",\").map((entry) => entry.trim()).filter((entry) => entry) : undefined }}',
			},
		},
	},
	{
		displayName: 'Changed',
		name: 'changed',
		type: 'boolean',
		default: false,
		displayOptions: { show: showOnlyForProjectTimeGetMany },
		description: 'Only show entries changed by the user',
		routing: {
			send: {
				type: 'query',
				property: 'changed',
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 20,
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		displayOptions: { show: showOnlyForProjectTimeGetMany },
		description: 'Max number of results to return',
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
		},
	},
	{
		displayName: 'Sort Direction',
		name: 'sortDirection',
		type: 'options',
		default: 'asc',
		displayOptions: { show: showOnlyForProjectTimeGetMany },
		options: [
			{ name: 'Ascending', value: 'asc' },
			{ name: 'Descending', value: 'dsc' },
		],
		routing: {
			send: {
				type: 'query',
				property: 'sort_direction',
			},
		},
	},
	{
		displayName: 'Sort By',
		name: 'sortBy',
		type: 'options',
		default: 'start',
		displayOptions: { show: showOnlyForProjectTimeGetMany },
		options: [
			{ name: 'Start', value: 'start' },
			{ name: 'Last Modified', value: 'last_modified' },
		],
		routing: {
			send: {
				type: 'query',
				property: 'sort_by',
			},
		},
	}
];
