export default {
    name: "RouterView",
    render(h) {
        let current = this._root._router.history.current  // 当前路由
        let routerMap = this._root._router.routeMap
        return h(routerMap[current])
    }
}
