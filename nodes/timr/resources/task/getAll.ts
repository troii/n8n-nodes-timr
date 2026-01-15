import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTaskGetMany = {
	operation: ['getAll'],
	resource: ['task'],
};

export const taskGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Parent Task ID',
		name: 'parentTaskId',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForTaskGetMany },
		description: "Restrict entries having this task as a parent task",
		routing: {
			send: {
				type: 'query',
				property: 'parent_task_id',
			},
		},
	},
	{
		displayName: 'Traverse Task Tree',
		name: 'traverseTaskTree',
		type: 'boolean',
		default: true,
		displayOptions: { show: showOnlyForTaskGetMany },
		description: 'Whether to traverse the whole task tree',
		routing: {
			send: {
				type: 'query',
				property: 'traverse_task_tree',
			},
		},
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForTaskGetMany },
		description: 'Filter tasks by name',
		routing: {
			send: {
				type: 'query',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Bookable',
		name: 'bookable',
		type: 'boolean',
		default: false,
		displayOptions: { show: showOnlyForTaskGetMany },
		description: 'Whether to only show bookable tasks',
		routing: {
			send: {
				type: 'query',
				property: 'bookable',
			},
		},
	},
	{
		displayName: 'Billable',
		name: 'billable',
		type: 'boolean',
		default: false,
		displayOptions: { show: showOnlyForTaskGetMany },
		description: 'Whether to only show billable tasks',
		routing: {
			send: {
				type: 'query',
				property: 'billable',
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		displayOptions: { show: showOnlyForTaskGetMany },
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
		displayOptions: { show: showOnlyForTaskGetMany },
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
		default: 'breadcrumbs',
		displayOptions: { show: showOnlyForTaskGetMany },
		options: [
			{ name: 'Breadcrumbs', value: 'breadcrumbs' },
			{ name: 'Name', value: 'name' },
		],
		routing: {
			send: {
				type: 'query',
				property: 'sort_by',
			},
		},
	}
];
