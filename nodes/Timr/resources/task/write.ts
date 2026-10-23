import type { INodeProperties } from 'n8n-workflow';
import {
	additionalFieldsProperty,
	createProperties,
	toBody,
	updateFieldsProperty,
} from '../shared';

const requiredFields: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		routing: toBody('name'),
	},
	{
		displayName: 'Bookable',
		name: 'bookable',
		type: 'boolean',
		default: true,
		description: 'Whether project times can be booked on the task itself',
		routing: toBody('bookable'),
	},
	{
		displayName: 'Billable',
		name: 'billable',
		type: 'boolean',
		default: true,
		description: 'Whether project times booked on the task are billable',
		routing: toBody('billable'),
	},
];

const localDateHint = 'Day in the format YYYY-MM-DD';
const localTimeHint = 'Time of day in the format HH:MM';

const optionalFields: INodeProperties[] = [
	{
		displayName: 'Custom Field 1',
		name: 'customField1',
		type: 'string',
		default: '',
		routing: toBody('custom_field_1'),
	},
	{
		displayName: 'Custom Field 2',
		name: 'customField2',
		type: 'string',
		default: '',
		routing: toBody('custom_field_2'),
	},
	{
		displayName: 'Custom Field 3',
		name: 'customField3',
		type: 'string',
		default: '',
		routing: toBody('custom_field_3'),
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		routing: toBody('description'),
	},
	{
		displayName: 'Earliest Start Time',
		name: 'earliestStartTime',
		type: 'string',
		default: '',
		description: `${localTimeHint}. Project times can't be booked on the task before this time.`,
		routing: toBody('earliest_start_time'),
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'string',
		default: '',
		description: `${localDateHint}. The task can only be selected up to this day.`,
		routing: toBody('end_date'),
	},
	{
		displayName: 'External Description',
		name: 'descriptionExternal',
		type: 'string',
		default: '',
		routing: toBody('description_external'),
	},
	{
		displayName: 'External ID',
		name: 'externalId',
		type: 'string',
		default: '',
		description: 'ID of the corresponding object in an external system',
		routing: toBody('external_id'),
	},
	{
		displayName: 'Latest End Time',
		name: 'latestEndTime',
		type: 'string',
		default: '',
		description: `${localTimeHint}. Project times can't be booked on the task after this time.`,
		routing: toBody('latest_end_time'),
	},
	{
		displayName: 'Lock Date',
		name: 'lockDate',
		type: 'string',
		default: '',
		description: `${localDateHint}. Project times before this day can no longer be changed.`,
		routing: toBody('lock_date'),
	},
	{
		displayName: 'Parent Task ID',
		name: 'parentTaskId',
		type: 'string',
		default: '',
		description: 'ID of the task to place the task under',
		routing: toBody('parent_task_id'),
	},
	{
		displayName: 'Project Time Notes Required',
		name: 'projectTimeNotesRequired',
		type: 'boolean',
		default: false,
		description: 'Whether project times booked on the task need notes',
		routing: toBody('project_time_notes_required'),
	},
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'string',
		default: '',
		description: `${localDateHint}. The task can only be selected from this day on.`,
		routing: toBody('start_date'),
	},
];

export const taskWriteDescription: INodeProperties[] = [
	...createProperties('task', requiredFields),
	additionalFieldsProperty('task', optionalFields),
	updateFieldsProperty('task', [...requiredFields, ...optionalFields]),
];
