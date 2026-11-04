import type { INodeProperties } from 'n8n-workflow';
import { byIdUrl, getManyRouting, idProperty } from '../shared';
import { carGetManyDescription } from './getAll';
import { carWriteDescription } from './write';

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
				name: 'Create',
				value: 'create',
				action: 'Create a car',
				description: 'Create a car',
				routing: { request: { method: 'POST', url: '/cars' } },
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get cars',
				description: 'Get cars',
				routing: getManyRouting('/cars'),
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a car',
				description: 'Update a car',
				routing: { request: { method: 'PATCH', url: byIdUrl('/cars', 'carId') } },
			},
		],
		default: 'getAll',
	},
	idProperty('car', 'Car ID', ['update']),
	...carGetManyDescription,
	...carWriteDescription,
];
