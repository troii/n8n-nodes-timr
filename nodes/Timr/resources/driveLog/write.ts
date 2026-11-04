import type { INodeProperties } from 'n8n-workflow';
import {
	additionalFieldsProperty,
	createProperties,
	dateTimeHint,
	toBody,
	updateFieldsProperty,
} from '../shared';

const requiredFields: INodeProperties[] = [
	{
		displayName: 'Drive Log Category ID',
		name: 'driveLogCategoryId',
		type: 'string',
		required: true,
		default: '',
		routing: toBody('drive_log_category_id'),
	},
	{
		displayName: 'Start',
		name: 'start',
		type: 'string',
		required: true,
		default: '',
		description: dateTimeHint,
		routing: toBody('start'),
	},
	{
		displayName: 'Start Mileage',
		name: 'startMileage',
		type: 'number',
		required: true,
		default: 0,
		typeOptions: { minValue: 0, numberPrecision: 0 },
		routing: toBody('start_mileage'),
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		default: 'changeable',
		options: [
			{ name: 'Approved', value: 'approved' },
			{ name: 'Archived', value: 'archived' },
			{ name: 'Changeable', value: 'changeable' },
			{ name: 'Cleared', value: 'cleared' },
			{ name: 'Closed', value: 'closed' },
			{ name: 'Locked', value: 'locked' },
			{ name: 'Running', value: 'running' },
		],
		routing: toBody('status'),
	},
	{
		displayName: 'Changed',
		name: 'changed',
		type: 'boolean',
		default: false,
		description: 'Whether the entry counts as changed by the user',
		routing: toBody('changed'),
	},
];

const optionalFields: INodeProperties[] = [
	{
		displayName: 'End',
		name: 'end',
		type: 'string',
		default: '',
		description: dateTimeHint,
		routing: toBody('end'),
	},
	{
		displayName: 'End Mileage',
		name: 'endMileage',
		type: 'number',
		default: 0,
		typeOptions: { minValue: 0, numberPrecision: 0 },
		routing: toBody('end_mileage'),
	},
	{
		displayName: 'Purpose',
		name: 'purpose',
		type: 'string',
		default: '',
		routing: toBody('purpose'),
	},
	{
		displayName: 'Route',
		name: 'route',
		type: 'string',
		default: '',
		routing: toBody('route'),
	},
	{
		displayName: 'Visited',
		name: 'visited',
		type: 'string',
		default: '',
		description: 'Places or customers visited on the trip',
		routing: toBody('visited'),
	},
];

export const driveLogWriteDescription: INodeProperties[] = [
	...createProperties('driveLog', [
		{
			displayName: 'User ID',
			name: 'userId',
			type: 'string',
			required: true,
			default: '',
			routing: toBody('user_id'),
		},
		{
			displayName: 'Car ID',
			name: 'carId',
			type: 'string',
			required: true,
			default: '',
			routing: toBody('car_id'),
		},
		...requiredFields,
	]),
	additionalFieldsProperty('driveLog', optionalFields),
	updateFieldsProperty('driveLog', [...requiredFields, ...optionalFields]),
];
