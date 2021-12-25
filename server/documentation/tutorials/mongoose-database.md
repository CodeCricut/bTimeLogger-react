## Mongoose Database

**Model objects can be found in the [`model`](../src/model) directory.**

Mongoose is used to connect the application to a Mongo database. Mongo is a NoSQL database.

In Mongo, related data is stored in "documents." A document might be something like `Note`, which represents a single note object. "**Schema**" define the structure of our documents.

For example, a note schema might look like this:

```js
const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
});
```

Mongoose assigns each schema an `_id` property which can be used to uniquely reference it.

Related documents are stored together in "Collections."

A **Model** is a class which lets us interact with a collection in the database.

```js
const Note = mongoose.model("Note", NoteSchema);
```

Models have methods to interact with the collection:

```js
const noteById = await Note.findById(id);
const allNotes = await Note.find();

const newNote = new Note({ title: "Title", description: "Desc" });
await newNote.save();
```

More information can be found in [this tutorial](https://rahmanfadhil.com/express-rest-api/) or the [Mongoose docs](https://mongoosejs.com/docs/guide.html).
