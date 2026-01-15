import type { Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class TimrOAuth2Api implements ICredentialType {
	name = 'timrOAuth2Api';

	extends = ['oAuth2Api'];

	displayName = 'Timr OAuth2 API';

	icon: Icon = 'file:timr.svg';

	// Link to your community node's README
	documentationUrl = 'https://github.com/org/-timr?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'authorizationCode',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			default: 'https://system.timr.com/id/oauth2/authorize',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: 'https://system.timr.com/id/oauth2/token',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: 'openid timrintegration',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'header',
		},
	];
}
