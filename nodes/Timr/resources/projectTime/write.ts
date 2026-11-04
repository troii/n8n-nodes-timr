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
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the bookable task to record the time on',
		routing: toBody('task_id'),
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
		displayName: 'Billable',
		name: 'billable',
		type: 'boolean',
		default: true,
		description: 'Whether the entry is billable',
		routing: toBody('billable'),
	},
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
		displayName: 'End',
		name: 'end',
		type: 'string',
		default: '',
		description: dateTimeHint,
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

export const projectTimeWriteDescription: INodeProperties[] = [
	...createProperties('projectTime', [
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
	additionalFieldsProperty('projectTime', optionalFields),
	updateFieldsProperty('projectTime', [...requiredFields, ...optionalFields]),
];
