/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "collectionId": "_pb_users_auth_",
        "hidden": false,
        "id": "relation2375276105",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "user",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
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
      },
      {
        "hidden": false,
        "id": "select2744374011",
        "maxSelect": 1,
        "name": "state",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "progress",
          "win",
          "draw",
          "lose"
        ]
      },
      {
        "hidden": false,
        "id": "json1161758770",
        "maxSize": 0,
        "name": "moves",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "pbc_879072730",
    "indexes": [],
    "listRule": null,
    "name": "games",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_879072730");

  return app.delete(collection);
})
