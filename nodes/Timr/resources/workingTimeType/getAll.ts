import type { INodeProperties } from 'n8n-workflow';
import { sortDirectionProperty, trueOrUndefined } from '../shared';

const showOnlyForWorkingTimeTypeGetMany = {
	operation: ['getAll'],
	resource: ['workingTimeType'],
};

export const workingTimeTypeGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForWorkingTimeTypeGetMany },
		description: 'Filter working time types whose name contains this string',
		routing: {
			send: {
				type: 'query',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Short Name',
		name: 'shortName',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForWorkingTimeTypeGetMany },
		description: 'Filter working time types whose short name contains this string',
		routing: {
			send: {
				type: 'query',
				property: 'short_name',
			},
		},
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForWorkingTimeTypeGetMany },
		description: 'Filter working time types whose description contains this string',
		routing: {
			send: {
				type: 'query',
				property: 'description',
			},
		},
	},
	{
		displayName: 'Categories',
		name: 'categories',
		type: 'multiOptions',
		default: [],
		displayOptions: { show: showOnlyForWorkingTimeTypeGetMany },
		options: [
			{ name: 'Attendance Time', value: 'attendance_time' },
			{ name: 'Break Time', value: 'break_time' },
			{ name: 'Paid Time Off', value: 'paid_time_off' },
			{ name: 'Suspension', value: 'suspension' },
			{ name: 'Unpaid Time Off', value: 'unpaid_time_off' },
			{ name: 'Vacation', value: 'vacation' },
		],
		description: 'Filter working time types by category',
		routing: {
			send: {
				type: 'query',
				property: 'categories',
			},
		},
	},
	{
		displayName: 'Sub Categories',
		name: 'subCategories',
		type: 'multiOptions',
		default: [],
		displayOptions: { show: showOnlyForWorkingTimeTypeGetMany },
		options: [
			{ name: 'Active Driving Time', value: 'active_driving_time' },
			{ name: 'Away', value: 'away' },
			{ name: 'Passive Travelling Time', value: 'passive_travelling_time' },
			{ name: 'Present', value: 'present' },
			{ name: 'Work From Home', value: 'work_from_home' },
		],
		description: 'Filter working time types by sub category',
		routing: {
			send: {
				type: 'query',
				property: 'sub_categories',
			},
		},
	},
	{
		displayName: 'Edit Units',
		name: 'editUnits',
		type: 'multiOptions',
		default: [],
		displayOptions: { show: showOnlyForWorkingTimeTypeGetMany },
		options: [
			{ name: 'Days', value: 'days' },
			{ name: 'Half Days', value: 'half_days' },
			{ name: 'Minutes', value: 'minutes' },
		],
		description: 'Filter working time types by the unit they are recorded in',
		routing: {
			send: {
				type: 'query',
				property: 'edit_units',
			},
		},
	},
	{
		displayName: 'Recording Modes',
		name: 'recordingModes',
		type: 'multiOptions',
		default: [],
		displayOptions: { show: showOnlyForWorkingTimeTypeGetMany },
		options: [
			{ name: 'Allowed', value: 'allowed' },
			{ name: 'By Request', value: 'by_request' },
			{ name: 'Not Allowed', value: 'not_allowed' },
		],
		description: 'Filter working time types by whether users may record them themselves',
		routing: {
			send: {
				type: 'query',
				property: 'recording_modes',
			},
		},
	},
	{
		displayName: 'Archived',
		name: 'archived',
		type: 'boolean',
		default: false,
		displayOptions: { show: showOnlyForWorkingTimeTypeGetMany },
		description: 'Whether to only show archived working time types',
		routing: {
			send: {
				type: 'query',
				property: 'archived',
				value: trueOrUndefined,
			},
		},
	},
	sortDirectionProperty(showOnlyForWorkingTimeTypeGetMany),
];
