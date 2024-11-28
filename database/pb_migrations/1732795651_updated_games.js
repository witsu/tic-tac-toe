/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_879072730")

  // remove field
  collection.fields.removeById("select3144380399")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number3144380399",
    "max": null,
    "min": null,
    "name": "difficulty",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_879072730")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "select3144380399",
    "maxSelect": 1,
    "name": "difficulty",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "novice",
      "advanced",
      "expert",
      "legend"
    ]
  }))

  // remove field
  collection.fields.removeById("number3144380399")

  return app.save(collection)
})
