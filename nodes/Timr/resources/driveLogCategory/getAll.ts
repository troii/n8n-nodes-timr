import type { INodeProperties } from 'n8n-workflow';
import { sortDirectionProperty } from '../shared';

const showOnlyForDriveLogCategoryGetMany = {
	operation: ['getAll'],
	resource: ['driveLogCategory'],
};

export const driveLogCategoryGetManyDescription: INodeProperties[] = [
	sortDirectionProperty(showOnlyForDriveLogCategoryGetMany),
];
