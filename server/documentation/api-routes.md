# Api Routes

Routing for the application is done with [Express](https://expressjs.com/). Additional details can be found in the server's README.

**Routers can be found in the `routers` directory.**

## Activities

Routes pertaining to the `Activity` model are mapped to the `/activities` endpoint via the `routers/activities.js` router.

### GET `/`

**Description**: Get an array of all activities

**Example request**: GET `/activites/`

Returns

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

### POST `/start-new`

### POST `/create-completed`

### PATCH `/stop/:id`

### PATCH `/resume/:id`

### PATCH `/trash/:id`

### PATCH `/untrash/:id`

### PUT `/update:id`

### DELETE `/remove/:id`

## Activity Types

Routes pertaining to the `ActivityType` model are mapped to the `/types` endpoint via the `routers/types.js` router.

### GET `/`

### GET `/:id`

### POST `/add`

### DELETE `/remove/:id`
