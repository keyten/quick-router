const { Router } = require('express');
const fs = require('fs');
const path = require('path');

module.exports = userConfig => {
    const config = Object.assign({
        path: './routes',

        processFolder: function(folderPath, routesPath, routes) {
            const list = fs.readdirSync(folderPath);

            list.forEach(fileName => {
                const filePath = path.resolve(folderPath, fileName);
                const stat = fs.statSync(filePath);

                if (stat.isDirectory()) {
                    config.processFolder(filePath, routesPath, routes);
                } else {
                    const routePath = config.fileNameToRoute(filePath, routesPath);
                    console.log(filePath, routePath);
                }
            });
        },

        fileNameToRoute: function (filePath, routesPath) {
            const {dir, name, ext} = path.parse(filePath);
            if (ext !== '.js' && ext !== '.jsx' && ext !== '.ts' && ext !== '.tsx') {
                return;
            }

            const [handlerNameRaw, ...params] = name.split('.');
            const [method, handlerName] = handlerNameRaw.toLowerCase().split('_');

            return {
                method,
                path: ''
            };
        }
    }, userConfig);

    const routes = {};
    const routesPath = path.join(__dirname, config.path);
    config.processFolder(routesPath, routesPath, routes);

    const router = new Router();
    return router;
}
