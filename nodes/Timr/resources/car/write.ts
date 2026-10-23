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
		displayName: 'Plate',
		name: 'plate',
		type: 'string',
		required: true,
		default: '',
		description: 'Licence plate of the car',
		routing: toBody('plate'),
	},
];

const optionalFields: INodeProperties[] = [
	{
		displayName: 'External ID',
		name: 'externalId',
		type: 'string',
		default: '',
		description: 'ID of the corresponding object in an external system',
		routing: toBody('external_id'),
	},
	{
		displayName: 'Usable',
		name: 'usable',
		type: 'boolean',
		default: true,
		description: 'Whether the car can be used for new drive logs',
		routing: toBody('usable'),
	},
];

export const carWriteDescription: INodeProperties[] = [
	...createProperties('car', requiredFields),
	additionalFieldsProperty('car', optionalFields),
	updateFieldsProperty('car', [...requiredFields, ...optionalFields]),
];
