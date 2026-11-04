import type { INodeProperties } from 'n8n-workflow';
import { getManyRouting } from '../shared';
import { workingTimeTypeGetManyDescription } from './getAll';

const showOnlyForWorkingTimeTypes = {
	resource: ['workingTimeType'],
};

export const workingTimeTypeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForWorkingTimeTypes,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get working time types',
				description: 'Get working time types',
				routing: getManyRouting('/working-time-types'),
			},
		],
		default: 'getAll',
	},
	...workingTimeTypeGetManyDescription,
];
