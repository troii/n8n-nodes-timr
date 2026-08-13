# n8n-nodes-timr

This is an n8n community node. It lets you use [timr](https://www.timr.com/) in your n8n workflows.

timr is a cloud-based time tracking service for companies. It records working times, project times and drive logs for employees, and organises the recorded project times along a hierarchical tree of tasks (customers, projects, sub-tasks). This node reads that data out of timr so you can report on it, forward it to other systems, or hand it to an AI agent.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation and install the package `n8n-nodes-timr`.

## Operations

The node is read-only. Both resources support a single **Get Many** operation.

### Task — Get Many

Returns tasks from the task tree (`GET /tasks`). Available filters:

| Field | Description |
| --- | --- |
| Parent Task ID | Only return tasks below this task |
| Traverse Task Tree | Whether to descend into the whole subtree, or only return direct children (default: on) |
| Name | Only return tasks whose name matches |
| Bookable | Only return tasks that can be booked on |
| Billable | Only return billable tasks |
| Sort By / Sort Direction | Sort by `Breadcrumbs` or `Name`, ascending or descending |

### Project Time — Get Many

Returns recorded project times (`GET /project-times`). Available filters:

| Field | Description |
| --- | --- |
| Start From / Start To | Only return entries started within this day range, `YYYY-MM-DD`, both ends inclusive |
| Last Modified After | Only return entries modified after this instant, ISO 8601 |
| Task ID | Only return entries booked on this task |
| Traverse Task Tree | Whether entries booked on subtasks of **Task ID** are included as well (default: on) |
| Notes | Only return entries whose notes contain this string |
| Billable | Only return billable entries |
| Changed | Only return entries that were changed by the user |
| Statuses | Only return entries in the selected states: Approved, Archived, Changeable, Cleared, Closed, Locked, Paused, Running |
| User IDs | Restrict to specific users, as a comma-separated list of IDs |
| Sort By / Sort Direction | Sort by `Start` or `Last Modified`, ascending or descending |

## Credentials

The node authenticates against the timr API with OAuth2 (authorization code grant), so you need a timr account and an OAuth2 client.

1. **Request an OAuth2 client.** Client ID and Client Secret are issued by timr on request — contact [timr support](https://support.timr.com/) and ask for OAuth2 credentials for the timr API.
2. **Create the credential in n8n.** Add a new **Timr OAuth2 API** credential and enter the Client ID and Client Secret. The authorization URL, token URL and scope (`openid timrintegration`) are preconfigured and do not need to be filled in.
3. **Register the redirect URL.** n8n shows an *OAuth Redirect URL* on the credential. Pass that URL to timr support so it can be registered for your client — the login will be rejected otherwise.
4. **Connect.** Click *Connect my account* and log in with your timr account to grant access.

The credential is used against the timr API at `https://api.timr.com/v0.2/`; the login itself runs against `https://system.timr.com/id/`.

Access is subject to the permissions of the timr user that grants access. A user who may only see their own times will only get their own times back, even without a **User IDs** filter.

## Compatibility

Requires n8n 2.0.0 or newer.

## Usage

**All matching records are returned.** Both operations page through the timr API automatically (500 records per request, following `next_page_token` until the last page), so there is no *Return All* or *Limit* option. A wide date range on **Project Time — Get Many** can therefore produce a large number of items and many API requests — filter with **Start From** / **Start To** where you can.

**Each record is one item.** The node emits one n8n item per task or project time, so you can wire the output straight into a loop, a filter, or a spreadsheet node.

**Incremental syncs.** Use **Last Modified After** on project times to fetch only what changed since the previous run, instead of re-reading the whole range.

**Time zones.** timr timestamps carry an explicit UTC offset reflecting the device that recorded the entry, which is not necessarily your own. Keep the offset in mind when comparing or formatting timestamps downstream.

**Use as an AI tool.** The node is available as a tool for AI agents, so an agent can look up tasks and project times itself. Self-hosted instances need `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true` for community nodes to be usable as tools.

New to n8n? The [Try it out](https://docs.n8n.io/try-it-out/) documentation walks through the basics.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [timr website](https://www.timr.com/)
* [timr support and help center](https://support.timr.com/)

## Version history

| Version | Changes |
| --- | --- |
| 0.2.x | Initial release: **Get Many** for Tasks and Project Times, OAuth2 credentials, automatic pagination |

The node is at API version 1 and there are no breaking changes between the 0.2.x releases.
