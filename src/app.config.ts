/**
 * 全局配置
 * @type {{api: {url: string}}}
 */
let configs = {
    api: {
      url: ""
    },
    app: {}
}

export class AppConfig {
    static app = configs.app;
    static api = configs.api;
}
