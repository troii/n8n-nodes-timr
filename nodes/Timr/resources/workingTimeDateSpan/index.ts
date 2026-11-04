import type { INodeProperties } from 'n8n-workflow';
import { getManyRouting } from '../shared';
import { workingTimeDateSpanGetManyDescription } from './getAll';

const showOnlyForWorkingTimeDateSpans = {
	resource: ['workingTimeDateSpan'],
};

export const workingTimeDateSpanDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForWorkingTimeDateSpans,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get working time date spans',
				description: 'Get working time date spans',
				routing: getManyRouting('/working-time-date-spans'),
			},
		],
		default: 'getAll',
	},
	...workingTimeDateSpanGetManyDescription,
];
