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

Every resource supports a **Get Many** operation. Working times, project times, tasks, drive logs and working time date spans can also be created, updated and deleted, cars can be created and updated — see [Create, Update and Delete](#create-update-and-delete). Drive logs additionally support **Get Track**.

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

### Working Time — Get Many

Returns recorded working times (`GET /working-times`) — attendance times, break times and absences such as vacation or time off. Available filters:

| Field | Description |
| --- | --- |
| Start From / Start To | Only return entries started within this day range, `YYYY-MM-DD`, both ends inclusive |
| Last Modified After | Only return entries modified after this instant, ISO 8601 |
| Notes | Only return entries whose notes contain this string |
| Working Time Type IDs | Restrict to specific working time types, as a comma-separated list of IDs |
| Working Time Type Categories | Only return entries whose working time type falls into the selected categories: Attendance Time, Break Time, Paid Time Off, Suspension, Unpaid Time Off, Vacation |
| Statuses | Only return entries in the selected states: Approved, Archived, Changeable, Closed, Locked, Paused, Running |
| User IDs | Restrict to specific users, as a comma-separated list of IDs |
| Changed | Only return entries that were changed by the user |
| Sort By / Sort Direction | Sort by `Start` or `Last Modified`, ascending or descending |

### Working Time Type — Get Many

Returns the working time types (`GET /working-time-types`) that working times and date spans refer to, for example *Attendance*, *Vacation* or *Sick Leave*. Available filters:

| Field | Description |
| --- | --- |
| Name / Short Name / Description | Only return types whose name, short name or description contains this string |
| Categories | Only return types in the selected categories: Attendance Time, Break Time, Paid Time Off, Suspension, Unpaid Time Off, Vacation |
| Sub Categories | Only return types in the selected sub categories: Active Driving Time, Away, Passive Travelling Time, Present, Work From Home |
| Edit Units | Only return types recorded in the selected units: Days, Half Days, Minutes |
| Recording Modes | Only return types users may record themselves as selected: Allowed, By Request, Not Allowed |
| Archived | Only return archived types |
| Sort Direction | Sort by name, ascending or descending |

### Working Time Date Span — Get Many

Returns working time date spans (`GET /working-time-date-spans`) — day-based or half-day-based entries such as multi-day vacation or sick leave. Available filters:

| Field | Description |
| --- | --- |
| From / To | Only return spans overlapping this day range, `YYYY-MM-DD`: **From** matches spans ending on or after the day, **To** matches spans starting on or before the day |
| Last Modified After | Only return spans modified after this instant, ISO 8601 |
| Working Time Type IDs | Restrict to specific working time types, as a comma-separated list of IDs |
| User IDs | Restrict to specific users, as a comma-separated list of IDs |
| Sort Direction | Sort by start, ascending or descending |

### Drive Log — Get Many

Returns recorded drive logs (`GET /drive-logs`) — the trips of a car with mileage, route and purpose. Available filters:

| Field | Description |
| --- | --- |
| Start From / Start To | Only return entries started within this day range, `YYYY-MM-DD`, both ends inclusive |
| Last Modified After | Only return entries modified after this instant, ISO 8601 |
| Details | Only return entries whose route, purpose or visited places contain this string |
| Car IDs | Restrict to specific cars, as a comma-separated list of IDs |
| Drive Log Category IDs | Restrict to specific drive log categories, as a comma-separated list of IDs |
| Statuses | Only return entries in the selected states: Approved, Archived, Changeable, Cleared, Closed, Locked, Running |
| User IDs | Restrict to specific users, as a comma-separated list of IDs |
| Has Track | Only return entries with a recorded GPS track |
| Changed | Only return entries that were changed by the user |
| Sort By / Sort Direction | Sort by `Start` or `Last Modified`, ascending or descending |

### Drive Log — Get Track

Returns the recorded GPS track of a single drive log (`GET /drive-logs/{id}/track`) as one item with the fields `drive_log_id` and `waypoints`, a list of `lat`/`lon` pairs. Set **Drive Log ID**, typically to `{{ $json.id }}` behind a **Drive Log — Get Many**.

Drive logs without a track are answered with an error. Switch on **Has Track** in the preceding **Get Many**, or enable *On Error → Continue* on the node.

### Car — Get Many

Returns the cars drive logs are recorded for (`GET /cars`). Available filters:

| Field | Description |
| --- | --- |
| Name or Plate | Only return cars whose name or licence plate contains this string |
| Usable | Only return cars that can be used for new drive logs |
| Sort Direction | Sort by name, ascending or descending |

### Drive Log Category — Get Many

Returns the drive log categories (`GET /drive-log-categories`), for example business or private trips. The only option is **Sort Direction** — sort by name, ascending or descending.

### Create, Update and Delete

| Resource | Required on Create | Optional on Create (Additional Fields) | Delete |
| --- | --- | --- | --- |
| Working Time | User ID, Working Time Type ID, Start, Status, Changed | End, Notes, Duration Type, Break Times | yes |
| Project Time | User ID, Task ID, Start, Status, Changed | End, Notes, Billable, Break Times | yes |
| Task | Name, Bookable, Billable | Parent Task ID, Description, External Description, External ID, Start Date, End Date, Lock Date, Earliest Start Time, Latest End Time, Project Time Notes Required, Custom Field 1–3 | yes, together with all subtasks |
| Drive Log | User ID, Car ID, Drive Log Category ID, Start, Start Mileage, Status, Changed | End, End Mileage, Route, Purpose, Visited | yes |
| Car | Name, Plate | External ID, Usable | no |
| Working Time Date Span | User ID, Working Time Type ID, Start, End | Start Half Day, End Half Day, Notes, Substitute User ID | yes |

**Update** takes the ID of the record and an **Update Fields** collection with the same fields as Create, except **User ID** and **Car ID**, which can't be changed. Only the fields you add are sent; all others stay unchanged, so add at least one field. Fields can't be cleared through the node.

Things to know when writing:

* **Timestamps** — **Start** and **End** of times and drive logs are RFC 3339 date-times with a UTC offset, e.g. `2026-10-23T09:00:00+02:00`. Keep the offset of the person who worked; timr shows every entry in the offset it was recorded with. Dates of tasks and date spans are `YYYY-MM-DD`.
* **Status and Changed** — the API requires both on create. They default to *Changeable* and off, which is what a newly recorded, unapproved entry looks like.
* **Break Times** — a JSON array such as `[{ "type": "manual", "duration_minutes": 30 }]`. It replaces all breaks of the entry.
* **Day-based working time types** — types recorded in days or half days need **Duration Type**, and **Start** and **End** at midnight of the same day. For multi-day absences use a **Working Time Date Span** instead.
* **Requests instead of entries** — if a working time type can only be recorded by request, timr creates a working time request instead of changing the working time.
* **Delete** emits one item `{ "id": "…", "deleted": true }` per deleted record. A task with recorded project times on itself or any subtask can't be deleted.
* **Not exposed** — locations, `metadata`, task budget and geofence settings, tracks, attachments and assignments can't be written through the node yet.

## Credentials

The node authenticates against the timr API with OAuth2 (authorization code grant), so you need a timr account and an OAuth2 client.

1. **Request an OAuth2 client.** Client ID and Client Secret are issued by timr on request — contact [timr support](https://support.timr.com/) and ask for OAuth2 credentials for the timr API.
2. **Create the credential in n8n.** Add a new **Timr OAuth2 API** credential and enter the Client ID and Client Secret. The authorization URL, token URL and scope (`openid offline_access`) are preconfigured and do not need to be filled in.
3. **Register the redirect URL.** n8n shows an *OAuth Redirect URL* on the credential. Pass that URL to timr support so it can be registered for your client — the login will be rejected otherwise.
4. **Connect.** Click *Connect my account* and log in with your timr account to grant access.

The credential is used against the timr API at `https://api.timr.com/v1/` ([API documentation](https://developer.timr.com/)); the login itself runs against `https://system.timr.com/id/`.

Access is subject to the permissions of the timr user that grants access. A user who may only see their own times will only get their own times back, even without a **User IDs** filter.

## Compatibility

Requires n8n 2.0.0 or newer.

## Usage

**All matching records are returned.** Every operation pages through the timr API automatically (500 records per request, following `next_page_token` until the last page), so there is no *Return All* or *Limit* option. A wide date range on **Project Time**, **Working Time** or **Drive Log — Get Many** can therefore produce a large number of items and many API requests — filter with **Start From** / **Start To** where you can.

**Each record is one item.** Every **Get Many** operation emits one n8n item per record, so you can wire the output straight into a loop, a filter, or a spreadsheet node.

**Incremental syncs.** Use **Last Modified After** on project times, working times, working time date spans and drive logs to fetch only what changed since the previous run, instead of re-reading the whole range.

**Project times vs. working times.** Project times are the entries booked on a task and answer "what was worked on"; working times are the attendance, break and absence entries and answer "when was someone at work". Both are recorded per user and can be correlated over the `user` and `start` fields.

**Resolving references.** Records reference related entities by a partial object with an `id` — a working time its `working_time_type`, a drive log its `car` and `drive_log_category`. Read the full entities with the matching **Get Many** and join them over `id`, for example with a **Merge** node.

**Time zones.** timr timestamps carry an explicit UTC offset reflecting the device that recorded the entry, which is not necessarily your own. Keep the offset in mind when comparing or formatting timestamps downstream.

**Use as an AI tool.** The node is available as a tool for AI agents, so an agent can look up tasks, times, drive logs and their related entities itself — and, with the write operations, create, change and delete them within the permissions of the connected timr user. Self-hosted instances need `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true` for community nodes to be usable as tools.

New to n8n? The [Try it out](https://docs.n8n.io/try-it-out/) documentation walks through the basics.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [timr website](https://www.timr.com/)
* [timr support and help center](https://support.timr.com/)

## Version history

| Version | Changes |
| --- | --- |
| 0.2.x | Initial release: **Get Many** for Tasks and Project Times, OAuth2 credentials, automatic pagination |
| 0.3.0 | Switched to the generally available timr API v1. Added **Get Many** for Working Times, Working Time Types, Working Time Date Spans, Drive Logs, Cars and Drive Log Categories, and **Get Track** for Drive Logs. Added **Create**, **Update** and **Delete** for Working Times, Project Times, Tasks, Drive Logs and Working Time Date Spans, and **Create** and **Update** for Cars. **Get Many** now emits one item per record — previously it emitted one item per page of up to 500 records, holding them in a `data` array. Filters are now applied: up to 0.2.x the pagination replaced the whole query string, so every **Get Many** returned all records regardless of the filters set. Multi-value filters such as **Statuses** or **User IDs** are sent as repeated query parameters, and switches such as **Bookable**, **Billable** and **Changed** only filter when switched on. |

The node is at node version 1. Workflows built on 0.2.x that read the `data` array of a **Get Many** item need to be adapted to the per-record items of 0.3.0.
