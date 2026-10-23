import type { INodeProperties } from 'n8n-workflow';
import { getManyRouting } from '../shared';
import { carGetManyDescription } from './getAll';

const showOnlyForCars = {
	resource: ['car'],
};

export const carDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCars,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get cars',
				description: 'Get cars',
				routing: getManyRouting('/cars'),
			},
		],
		default: 'getAll',
	},
	...carGetManyDescription,
];
