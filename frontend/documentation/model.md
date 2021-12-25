# Model

The model classes which represent the data types used in the application can be found in [src/model](../src/model).

## ActivityModel

The [`ActivityModel`](../src/model/ActivityModel.js) class represents a single activity.

The `ActivityModel` relates very closely to the [`Activity` schema/model](../../server/src/model/Activity.js) in the server app, and is used both to post and receive activities from the REST API through the `ActivityRepository`.

## ActivityTypeModel

The [`ActivityTypeModel`](../src/model/ActivityTypeModel.js) class represents a single activity type.

The `ActivityTypeModel` relates very closely to the [`ActivityType` schema/model](../../server/src/model/ActivityType.js) in the server app, and is used both to post and receive activities from the REST API through the `ActivityTypeRepository`.

## Search Params

The [`SearchParams`](../src/model/SearchParams.js) class contains fields pertaining
to filtering the search for activities. It is used by components such as the search
bar and filtered activity list.

`SearchParams` have an associated query string in the format of
`selectedType={selected type}&fromDate={from date}&toDate={to date}&searchTerm={search term}`.
