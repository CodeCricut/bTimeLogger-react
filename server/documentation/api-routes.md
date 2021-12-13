# Api Routes

Routing for the application is done with [Express](https://expressjs.com/). Additional details can be found in the server's README.

**Routers can be found in the `routers` directory.**

## Activities

Routes pertaining to the `Activity` model are mapped to the `/activities` endpoint via the `routers/activities.js` router.

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
        "isTrashed": false,
        "__v": 0
    },
    {
        "_id": "612176721e61a22088163e09",
        "type": "612170912b5a1716dca11c48",
        "startTime": "2021-08-21T05:00:00.000Z",
        "isTrashed": true,
        "__v": 0,
        "comment": "this activity was updated",
        "endTime": "2021-08-23T05:00:00.000Z"
    }
]
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
    "isTrashed": true,
    "__v": 0,
    "comment": "this activity was updated",
    "endTime": "2021-08-23T05:00:00.000Z"
}
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

### PATCH `/trash/:id`

**Description**:

**Example request**:

**Example response**

```json

```

### PATCH `/untrash/:id`

**Description**:

**Example request**:

**Example response**

```json

```

### PUT `/update:id`

**Description**:

**Example request**:

**Example response**

```json

```

### DELETE `/remove/:id`

**Description**:

**Example request**:

**Example response**

```json

```

## Activity Types

Routes pertaining to the `ActivityType` model are mapped to the `/types` endpoint via the `routers/types.js` router.

### GET `/`

**Description**:

**Example request**:

**Example response**

```json

```

### GET `/:id`

**Description**:

**Example request**:

**Example response**

```json

```

### POST `/add`

**Description**:

**Example request**:

**Example response**

```json

```

### DELETE `/remove/:id`

**Description**:

**Example request**:

**Example response**

```json

```
