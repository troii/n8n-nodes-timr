import type { INodeProperties } from 'n8n-workflow';
import { sortDirectionProperty, trueOrUndefined } from '../shared';

const showOnlyForCarGetMany = {
	operation: ['getAll'],
	resource: ['car'],
};

export const carGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Name or Plate',
		name: 'nameOrPlate',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForCarGetMany },
		description: 'Filter cars whose name or licence plate contains this string',
		routing: {
			send: {
				type: 'query',
				property: 'name_or_plate',
			},
		},
	},
	{
		displayName: 'Usable',
		name: 'usable',
		type: 'boolean',
		default: false,
		displayOptions: { show: showOnlyForCarGetMany },
		description: 'Whether to only show cars that can be used for new drive logs',
		routing: {
			send: {
				type: 'query',
				property: 'usable',
				value: trueOrUndefined,
			},
		},
	},
	sortDirectionProperty(showOnlyForCarGetMany),
];
