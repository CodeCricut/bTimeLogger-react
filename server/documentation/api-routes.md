# Api Routes

Routing for the application is done with [Express](https://expressjs.com/). Additional details can be found in the server's README.

**Routers can be found in the [routers](../src/routers) directory.**

## Activities

Routes pertaining to the `Activity` model are mapped to the `/activities` endpoint via the `src/routers/activities.js` router.

### GET `/`

**Description**: Get an array of all activities

**Example request**: GET `/activites/`

**Example response**

```json
[
    {
        "_id": "612174530de71f4c48ab23e5",
        "type": "6121713a797e0308845ec931",
        "startTime": "2021-08-21T05:00:00.000Z",
        "trashed": false,
        "__v": 0
    },
    {
        "_id": "612176721e61a22088163e09",
        "type": "612170912b5a1716dca11c48",
        "startTime": "2021-08-21T05:00:00.000Z",
        "trashed": true,
        "__v": 0,
        "comment": "this activity was updated",
        "endTime": "2021-08-23T05:00:00.000Z"
    }
]
```

**Error responses**:

-   STATUS 500 - internal server error

```
 "There was an internal server error while handling the request."
```

### GET `/:id`

**Description**: Get an activity by it's ID

**Example request**: GET `/activities/612176721e61a22088163e09`

**Example response**

```json
{
    "_id": "612176721e61a22088163e09",
    "type": "612170912b5a1716dca11c48",
    "startTime": "2021-08-21T05:00:00.000Z",
    "trashed": true,
    "__v": 0,
    "comment": "this activity was updated",
    "endTime": "2021-08-23T05:00:00.000Z"
}
```

**Error responses**:

-   STATUS 400 - invalid id format

```
Invalid ID format.
```

-   STATUS 400 - activity not found

```
Not found.
```

-   STATUS 400 - id not provided

```
No ID provided.
```

-   STATUS 500 - internal server error

```
There was an internal server error while handling the request.
```

### POST `/start-new`

**Description**: Start a new activity and return it. Started activities

-   will have the `startTime` property populated with the current date + time
-   not have a populated `endTime`
-   will not be `trashed`

**Example request**: POST `activities/start-new`

Request body:

```json
{
    "type": "612170912b5a1716dca11c48",
    "comment": "this activity was started at approx 9:45 PM"
}
```

**Example response**

```json
{
    "_id": "61b6c244037857438948d322",
    "type": "612170912b5a1716dca11c48",
    "comment": "this activity was started at approx 9:45 PM",
    "startTime": "2021-12-13T03:47:16.847Z",
    "endTime": null,
    "trashed": false,
    "__v": 0
}
```

**Error responses**:

-   STATUS 400 - missing required fields

```
Could not create activity because one or more fields were missing.
```

-   STATUS 500 - internal server error

```
There was an internal server error while handling the request.
```

### POST `/create-completed`

**Description**: Create a completed activity and return it. A completed activity

-   must have it's `startTime` populated
-   must have it's `endTime` populated
-   will not be `trashed`

**Note**: The `startTime` and `endTime` properties of `Activity` are stored as
`Date` objects internally, and any valid date string can be used in request bodies.

**Example request**: POST `/activities/create-completed`

Request body:

```json
{
    "type": "612170912b5a1716dca11c48",
    "comment": "started at 9:56, ended at 10:00",
    "startTime": "2021-12-13T03:55:30.603Z",
    "endTime": "2021-12-13T04:00:16.847Z"
}
```

**Example response**

```json
{
    "_id": "61b6c688037857438948d325",
    "type": "612170912b5a1716dca11c48",
    "comment": "started at 9:56, ended at 10:00",
    "startTime": "2021-12-13T03:55:30.603Z",
    "endTime": "2021-12-13T04:00:16.847Z",
    "trashed": false,
    "__v": 0
}
```

**Error responses**:

-   STATUS 400 - missing or invalid fields

```
Could not create activity because one or more fields were missing or invalid.
```

-   STATUS 400 - missing start or end time

```
Tried to create an activity without a start or end time.
```

-   STATUS 400 - invalid start time

```
Format for startTime date is invalid.
```

-   STATUS 400 - invalid end time

```
Format for endTime date is invalid
```

-   STATUS 500 - internal server error

```
There was an internal server error while handling the request.
```

### PATCH `/stop/:id`

**Description**: Stop the activity with the given id, and return the patched activity.

This means to set the activity's `endTime` to the current date and time.

**Example request**: PATCH `/activities/stop/612174530de71f4c48ab23e5`

**Example response**

```json
{
    "_id": "61b6c9bcaf732f85914bd711",
    "type": "612170912b5a1716dca11c48",
    "comment": "this activity was started at approx 9:45 PM",
    "startTime": "2021-12-13T04:19:08.361Z",
    "endTime": "2021-12-13T04:19:22.240Z",
    "trashed": false,
    "__v": 0
}
```

**Error responses**:

-   STATUS 400 - invalid id format

```
Invalid ID format.
```

-   STATUS 400 - activity not found

```
Activity with the given ID not found.
```

-   STATUS 400 - id not provided

```
No ID provided.
```

-   STATUS 500 - internal server error

```
There was an internal server error while handling the request.
```

### PATCH `/resume/:id`

**Description**: Resume the given activity and return it.

A resumed activity will

-   have it's `startTime` set to the current date/time
-   have it's `endTime` reset

**Example request**: PATCH `/activities/resume/61b6c9bcaf732f85914bd711`

**Example response**

```json
{
    "_id": "61b6c9bcaf732f85914bd711",
    "type": "612170912b5a1716dca11c48",
    "comment": "this activity was started at approx 9:45 PM",
    "startTime": "2021-12-13T04:19:08.361Z",
    "endTime": null,
    "trashed": false,
    "__v": 0
}
```

**Error responses**:

-   STATUS 400 - invalid id format

```
Invalid ID format.
```

-   STATUS 400 - activity not found

```
Activity with the given ID not found.
```

-   STATUS 400 - id not provided

```
No ID provided.
```

-   STATUS 500 - internal server error

```
There was an internal server error while handling the request.
```

### PATCH `/trash/:id`

**Description**: Trash the given activity and return it. A trashed activity is not
removed from the database, but will have its `trashed` property set to true.

**Example request**: PATCH `/activities/trash/61b6c9bcaf732f85914bd711`

**Example response**

```json
{
    "_id": "61b6c9bcaf732f85914bd711",
    "type": "612170912b5a1716dca11c48",
    "comment": "this activity was started at approx 9:45 PM",
    "startTime": "2021-12-13T04:19:08.361Z",
    "endTime": null,
    "trashed": true,
    "__v": 0
}
```

**Error responses**:

-   STATUS 400 - invalid id format

```
Invalid ID format.
```

-   STATUS 400 - activity not found

```
Activity with the given ID not found.
```

-   STATUS 400 - id not provided

```
No ID provided.
```

-   STATUS 500 - internal server error

```
There was an internal server error while handling the request.
```

### PATCH `/untrash/:id`

**Description**: Untrash the given activity and return it. An untrashed activity will have its `trashed` property set to false.

**Example request**: `/activities/untrash/61b6c9bcaf732f85914bd711`

**Example response**

```json
{
    "_id": "61b6c9bcaf732f85914bd711",
    "type": "612170912b5a1716dca11c48",
    "comment": "this activity was started at approx 9:45 PM",
    "startTime": "2021-12-13T04:19:08.361Z",
    "endTime": null,
    "trashed": false,
    "__v": 0
}
```

**Error responses**:

-   STATUS 400 - invalid id format

```
Invalid ID format.
```

-   STATUS 400 - activity not found

```
Activity with the given ID not found.
```

-   STATUS 400 - id not provided

```
No ID provided.
```

-   STATUS 500 - internal server error

```
There was an internal server error while handling the request.
```

### PUT `/update/:id`

**Description**: Update the given activity and return it. You may update the activity's

-   `type`
-   `startTime`
-   `endTime`
-   `comment`
-   `trashed`

To forego the updating of a property, set the property as `null` in the request body.

Where possible, it is preferable to use endpoints to update these properties individually (such as `/activities/trash/:id`).

**Example request**: PUT `/activities/update/61b6c769c6536ace94ed1941`

Request body:

```json
{
    "type": "612170912b5a1716dca11c48",
    "comment": "this activity was updated",
    "startTime": null, // do not update
    "endTime": null, // do not update
    "trashed": null // do not update
}
}
```

**Example response**

```json
{
    "_id": "61b6c769c6536ace94ed1941",
    "type": "612170912b5a1716dca11c48",
    "comment": "this activity was updated",
    "startTime": "2021-12-13T04:04:42.000Z",
    "endTime": "2021-12-13T04:00:16.847Z",
    "trashed": false,
    "__v": 0
}
```

**Error responses**:

-   STATUS 400 - invalid start time

```
Start time date is invalid.
```

-   STATUS 400 - invalid end time

```
End time date is invalid.
```

-   STATUS 400 - invalid or missing fields

```
Tried to update an activity with incomplete or invalid fields.
```

-   STATUS 400 - invalid id format

```
Invalid ID format.
```

-   STATUS 400 - activity not found

```
Activity with the given ID not found.
```

-   STATUS 400 - id not provided

```
No ID provided.
```

-   STATUS 500 - internal server error

```
There was an internal server error while handling the request.
```

### DELETE `/remove/:id`

**Description**: Completely remove an activity from the database.

**Example request**: DELETE `/activities/remove/612176721e61a22088163e09`

**Example response**

(No response will be given for a valid request.)

```json

```

**Error responses**:

-   STATUS 400 - invalid id format

```
Invalid ID format.
```

-   STATUS 400 - activity not found

```
Activity with the given ID not found.
```

-   STATUS 400 - id not provided

```
No ID provided.
```

-   STATUS 500 - internal server error

```
There was an internal server error while handling the request.
```

## Activity Types

Routes pertaining to the `ActivityType` model are mapped to the `/types` endpoint via the `src/routers/types.js` router.

### GET `/`

**Description**: Get an array of all activity types

**Example request**: GET `/types`

**Example response**

```json
[
    {
        "_id": "612170912b5a1716dca11c48",
        "name": "Exercise",
        "__v": 0
    },
    {
        "_id": "6121713a797e0308845ec931",
        "name": "Coding",
        "__v": 0
    },
    {
        "_id": "61217143797e0308845ec934",
        "name": "Reading",
        "__v": 0
    }
]
```

### GET `/:id`

**Description**: Get an activity type by its ID

**Example request**: GET `/types/612170912b5a1716dca11c48`

**Example response**

```json
{
    "_id": "612170912b5a1716dca11c48",
    "name": "Exercise",
    "__v": 0
}
```

### POST `/add`

**Description**: Add a new type and return it

**Example request**: POST `/types/add`

Request body:

```json
{
    "name": "New type"
}
```

**Example response**

```json
{
    "_id": "61b6cfe6edb2fe93dd605770",
    "name": "New type",
    "__v": 0
}
```

### DELETE `/remove/:id`

**Description**: Delete a type from the database

**Example request**: DELETE `/types/remove/61b6cfe6edb2fe93dd605770`

**Example response**

(No response will be given for a valid request.)

```json

```
