import type { IDisplayOptions, INodeProperties, INodePropertyRouting } from 'n8n-workflow';

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
					request: {
						qs: {
							limit: 500,
							page_token: '={{ $response.body?.next_page_token }}',
						},
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
