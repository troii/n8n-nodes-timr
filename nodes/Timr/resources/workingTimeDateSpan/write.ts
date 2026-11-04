import type { INodeProperties } from 'n8n-workflow';
import {
	additionalFieldsProperty,
	createProperties,
	toBody,
	updateFieldsProperty,
} from '../shared';

const requiredFields: INodeProperties[] = [
	{
		displayName: 'Working Time Type ID',
		name: 'workingTimeTypeId',
		type: 'string',
		required: true,
		default: '',
		routing: toBody('working_time_type_id'),
	},
	{
		displayName: 'Start',
		name: 'start',
		type: 'string',
		required: true,
		default: '',
		description: 'First day of the span (YYYY-MM-DD)',
		routing: toBody('start'),
	},
	{
		displayName: 'End',
		name: 'end',
		type: 'string',
		required: true,
		default: '',
		description: 'Last day of the span (YYYY-MM-DD)',
		routing: toBody('end'),
	},
];

const optionalFields: INodeProperties[] = [
	{
		displayName: 'End Half Day',
		name: 'endHalfDay',
		type: 'boolean',
		default: false,
		description: 'Whether the span ends at noon of its last day',
		routing: toBody('end_half_day'),
	},
	{
		displayName: 'Notes',
		name: 'notes',
		type: 'string',
		default: '',
		routing: toBody('notes'),
	},
	{
		displayName: 'Start Half Day',
		name: 'startHalfDay',
		type: 'boolean',
		default: false,
		description: 'Whether the span starts at noon of its first day',
		routing: toBody('start_half_day'),
	},
	{
		displayName: 'Substitute User ID',
		name: 'substituteId',
		type: 'string',
		default: '',
		description: 'ID of the user standing in during the span',
		routing: toBody('substitute_id'),
	},
];

export const workingTimeDateSpanWriteDescription: INodeProperties[] = [
	...createProperties('workingTimeDateSpan', [
		{
			displayName: 'User ID',
			name: 'userId',
			type: 'string',
			required: true,
			default: '',
			routing: toBody('user_id'),
		},
		...requiredFields,
	]),
	additionalFieldsProperty('workingTimeDateSpan', optionalFields),
	updateFieldsProperty('workingTimeDateSpan', [...requiredFields, ...optionalFields]),
];
