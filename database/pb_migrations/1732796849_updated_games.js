/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_879072730")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "json1161758770",
    "maxSize": 0,
    "name": "cells",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_879072730")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "json1161758770",
    "maxSize": 0,
    "name": "moves",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
})
