import type {
	IDataObject,
	IDisplayOptions,
	INodeProperties,
	INodePropertyRouting,
} from 'n8n-workflow';

type Show = IDisplayOptions['show'];

// Pages through every Get Many operation, 500 records per request, until next_page_token is empty.
export const returnAllProperty: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'hidden',
	default: true,
	displayOptions: { show: { operation: ['getAll'] } },
	routing: {
		send: {
			paginate: '={{ $value }}',
		},
		operations: {
			pagination: {
				type: 'generic',
				properties: {
					continue: '={{ !!$response.body?.next_page_token }}',
					// n8n merges this shallowly into the request, so qs has to carry the filters along.
					request: {
						qs: '={{ Object.assign({}, $request.qs, { limit: 500, page_token: $response.body?.next_page_token }) }}' as unknown as IDataObject,
					},
				},
			},
		},
	},
};

// List endpoints answer with a page object; emit its records as one item each.
export function getManyRouting(url: string): INodePropertyRouting {
	return {
		request: { method: 'GET', url },
		output: { postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }] },
	};
}

// Path of a single record, e.g. byIdUrl('/cars', 'carId') → /cars/<carId>.
export function byIdUrl(path: string, idParameter: string): string {
	return `=${path}/{{ encodeURIComponent($parameter.${idParameter}) }}`;
}

export function idProperty(
	resource: string,
	displayName: string,
	operations: string[],
): INodeProperties {
	return {
		displayName,
		name: `${resource}Id`,
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [resource], operation: operations } },
	};
}

// DELETE answers 204 without a body; emit what was deleted instead of an empty item.
export function deleteRouting(path: string, idParameter: string): INodePropertyRouting {
	return {
		request: { method: 'DELETE', url: byIdUrl(path, idParameter) },
		output: {
			postReceive: [
				{
					type: 'set',
					properties: { value: `={{ { id: $parameter.${idParameter}, deleted: true } }}` },
				},
			],
		},
	};
}

export function toBody(property: string, value?: string): INodePropertyRouting {
	return { send: { type: 'body', property, ...(value ? { value } : {}) } };
}

// Fields the API requires on create are top-level parameters there and optional Update Fields on update.
export function createProperties(resource: string, fields: INodeProperties[]): INodeProperties[] {
	return fields.map((field) => ({
		...field,
		displayOptions: { show: { operation: ['create'], resource: [resource] } },
	}));
}

// Optional body fields of a create operation.
export function additionalFieldsProperty(
	resource: string,
	options: INodeProperties[],
): INodeProperties {
	return {
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { operation: ['create'], resource: [resource] } },
		options: sortedByDisplayName(options),
	};
}

// Body fields of an update operation; the API leaves fields that are not sent unchanged.
export function updateFieldsProperty(
	resource: string,
	options: INodeProperties[],
): INodeProperties {
	return {
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { operation: ['update'], resource: [resource] } },
		options: sortedByDisplayName(options.map((field) => ({ ...field, required: false }))),
	};
}

function sortedByDisplayName(fields: INodeProperties[]): INodeProperties[] {
	return [...fields].sort((a, b) => a.displayName.localeCompare(b.displayName));
}

export const parsedJson = '={{ typeof $value === "string" ? JSON.parse($value) : $value }}';

export const dateTimeHint = 'RFC 3339 date-time with UTC offset, e.g. 2026-10-23T09:00:00+02:00';

// The timr API reads false as a filter, so boolean switches are only sent when on.
export const trueOrUndefined = '={{ $value ? true : undefined }}';

export const commaSeparatedList =
	'={{ $value ? $value.split(",").map((entry) => entry.trim()).filter((entry) => entry) : undefined }}';

export function sortDirectionProperty(show: Show): INodeProperties {
	return {
		displayName: 'Sort Direction',
		name: 'sortDirection',
		type: 'options',
		default: 'asc',
		displayOptions: { show },
		options: [
			{ name: 'Ascending', value: 'asc' },
			{ name: 'Descending', value: 'dsc' },
		],
		routing: {
			send: {
				type: 'query',
				property: 'sort_direction',
			},
		},
	};
}

export function sortByStartOrLastModifiedProperty(show: Show): INodeProperties {
	return {
		displayName: 'Sort By',
		name: 'sortBy',
		type: 'options',
		default: 'start',
		displayOptions: { show },
		options: [
			{ name: 'Start', value: 'start' },
			{ name: 'Last Modified', value: 'last_modified' },
		],
		routing: {
			send: {
				type: 'query',
				property: 'sort_by',
			},
		},
	};
}
