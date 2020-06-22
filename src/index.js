import {install} from "./install";
import {HistoryRoute} from "./history/HistoryRoute";
import {pushState} from "./util/push-state";

export default class VueRouter {
    constructor(options) {
        this.mode = options.mode || 'hash'
        this.routes = options.routes || []
        this.history = new HistoryRoute

        this.routes = options.routes || []
        this.routeMap = this.createMap(this.routes)
        this.init()
    }

    init() {
        if (this.mode === 'hash') {
            // 初始化一个#
            window.location.hash ? '' : window.location.hash = '/'
            // 页面加载完成获取当前路由
            window.addEventListener('load', () => {
                this.history.current = location.hash.slice(1)
            })
            window.addEventListener('hashchange', () => {
                this.history.current = location.hash.slice(1)
            })
        } else {
            window.addEventListener('load', () => {
                this.history.current = location.pathname
            })
            window.addEventListener('popstate', () => {
                this.history.current = location.pathname
            })
        }
    }

    createMap(routes) {
        return routes.reduce((memo, current) => {
            memo[current.path] = current.component
            return memo
        }, {})
    }
    push(url) {
        if (this.mode === 'hash') {
            location.hash = url
        } else {
            pushState(url)
        }
    }
    replace(url) {
        if (this.mode === 'hash') {
            location.hash = url
        } else {
            pushState(url, true)
        }
    }
}
VueRouter.install = install
VueRouter.version = '0.0.1'
