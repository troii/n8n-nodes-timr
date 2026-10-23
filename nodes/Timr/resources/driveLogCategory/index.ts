import type { INodeProperties } from 'n8n-workflow';
import { getManyRouting } from '../shared';
import { driveLogCategoryGetManyDescription } from './getAll';

const showOnlyForDriveLogCategories = {
	resource: ['driveLogCategory'],
};

export const driveLogCategoryDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForDriveLogCategories,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get drive log categories',
				description: 'Get drive log categories',
				routing: getManyRouting('/drive-log-categories'),
			},
		],
		default: 'getAll',
	},
	...driveLogCategoryGetManyDescription,
];
