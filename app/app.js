/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { Application } from '@nativescript/core';
const appSettings = require("./appSettings.json");
const Sqlite = require("nativescript-sqlite");

if (!Sqlite.exists(appSettings.database)) {
    console.log("copying.. "+appSettings.database);
    Sqlite.copyDatabase(appSettings.database);
}

Application.run({ moduleName: 'views/frame/frame' })

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
