# Database models

[Mongoose](https://www.npmjs.com/package/mongoose) is used to connect the application to a [Mongo](https://www.mongodb.com/) database. Mongo is a NoSQL database. Additional information can be found in the server's README.md.

Outlined below are the available Mongoose Models used in the application.

## Activity

**The `Activity` schema and model are available in [`src/model/Activity.js`](../src/model/Activity.js)**.

An `Activity` represents something the user did between particular points in time.
Activities are of a certain `Type`, and can include information such as comments made by the user.

To interact with the model class, use

```js
import Activity from ".Activity.js"; // replace with relative path

const activity = Activity.findById(id);
const newActivity = new Activity({ ... });
newActivity.save();
// etc
```

**ActivityType reference**:

The Activity schema contains a `type` property which is a reference to
the `ActivityType` for that particular activity.

```js
const ActivitySchema = new Schema({
    ...
    type: { type: Schema.Types.ObjectId, ref: "Activities", required: true }
});
```

To populate this field, provide a valid `ActivityType._id` value of an exisiting activity type.

```js
const typeId = readingType._id; // Something like "612174530de71f4c48ab23e5"
const readingActivity = new Activity({
    ...
    type: typeId // will have a reference to the reading type
})
```

Note that when an activity object is returned by the Model, **the `type` property will only be populated with the `ActivityType` id, not the `ActivityType` object itself.**

## ActivityType

**The `ActivityType` schema and model are available in [`src/model/ActivityType.js`](../src/model/ActivityType.js)**.

An `ActivityType` represents the type of activity the user did at a particular point, such as "Reading" or "Sleeping."

To interact with the model class, use

```js
import ActivityType from "./ActivityType.js"; // replace with relative path

const activityTypes = ActivityType.find();
const newActivityType = new ActivityType({ ... });
newActivityType.save();
// etc
```
