"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 全局配置
 * @type {{api: {url: string}}}
 */
var configs = {
    api: {
        url: ""
    },
    app: {}
};
var AppConfig = (function () {
    function AppConfig() {
    }
    return AppConfig;
}());
AppConfig.app = configs.app;
AppConfig.api = configs.api;
exports.AppConfig = AppConfig;
