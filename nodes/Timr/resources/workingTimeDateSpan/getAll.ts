import type { INodeProperties } from 'n8n-workflow';
import { commaSeparatedList, sortDirectionProperty } from '../shared';

const showOnlyForWorkingTimeDateSpanGetMany = {
	operation: ['getAll'],
	resource: ['workingTimeDateSpan'],
};

export const workingTimeDateSpanGetManyDescription: INodeProperties[] = [
	{
		displayName: 'From',
		name: 'from',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForWorkingTimeDateSpanGetMany },
		description: 'Filter date spans ending on or after this day (YYYY-MM-DD)',
		routing: {
			send: {
				type: 'query',
				property: 'from',
			},
		},
	},
	{
		displayName: 'To',
		name: 'to',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForWorkingTimeDateSpanGetMany },
		description: 'Filter date spans starting on or before this day (YYYY-MM-DD)',
		routing: {
			send: {
				type: 'query',
				property: 'to',
			},
		},
	},
	{
		displayName: 'Last Modified After',
		name: 'lastModifiedAfter',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForWorkingTimeDateSpanGetMany },
		description: 'Filter date spans modified after this instant (ISO 8601)',
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
		displayOptions: { show: showOnlyForWorkingTimeDateSpanGetMany },
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
		displayName: 'User IDs',
		name: 'users',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForWorkingTimeDateSpanGetMany },
		description: 'Comma-separated user IDs',
		routing: {
			send: {
				type: 'query',
				property: 'users',
				value: commaSeparatedList,
			},
		},
	},
	sortDirectionProperty(showOnlyForWorkingTimeDateSpanGetMany),
];
