import type { INodeProperties } from 'n8n-workflow';
import {
	additionalFieldsProperty,
	createProperties,
	dateTimeHint,
	parsedJson,
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
		description: `${dateTimeHint}. Must be midnight for working time types recorded in days.`,
		routing: toBody('start'),
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
			{ name: 'Closed', value: 'closed' },
			{ name: 'Locked', value: 'locked' },
			{ name: 'Paused', value: 'paused' },
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
		displayName: 'Break Times',
		name: 'breakTimes',
		type: 'json',
		default: '[]',
		description:
			'Breaks as a JSON array, e.g. [{ "type": "manual", "duration_minutes": 30 }]. Replaces all existing breaks.',
		routing: toBody('break_times', parsedJson),
	},
	{
		displayName: 'Duration Type',
		name: 'durationType',
		type: 'options',
		default: 'minutes',
		options: [
			{ name: 'Full Day', value: 'full_day' },
			{ name: 'Half Day', value: 'half_day' },
			{ name: 'Minutes', value: 'minutes' },
		],
		description: 'Required for working time types recorded in days or half days',
		routing: toBody('duration_type'),
	},
	{
		displayName: 'End',
		name: 'end',
		type: 'string',
		default: '',
		description: `${dateTimeHint}. Must be midnight for working time types recorded in days.`,
		routing: toBody('end'),
	},
	{
		displayName: 'Notes',
		name: 'notes',
		type: 'string',
		default: '',
		routing: toBody('notes'),
	},
];

export const workingTimeWriteDescription: INodeProperties[] = [
	...createProperties('workingTime', [
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
	additionalFieldsProperty('workingTime', optionalFields),
	updateFieldsProperty('workingTime', [...requiredFields, ...optionalFields]),
];
