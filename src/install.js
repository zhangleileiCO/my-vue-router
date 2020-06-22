import View from 'component/view'
import Link from 'component/link'

export function install(Vue) {
    Vue.mixin({
        beforeCreate(){
            // $options.router存在则表示是根组件
            if (this.$options && this.$options.router) {
                this._root = this
                this._router = this.$options.router
                Vue.util.defineReactive(this, 'current', this._router.history)
            } else {
                // 不是根组件则从父组件中获取
                this._root = this.$parent._root
            }

            // 使用$router代理对this._root._router的访问
            Object.defineProperty(this, '$router', {
                get() {
                    return this._root._router
                }
            })
        }
    })
    Vue.component('router-view', View)
    Vue.component('router-link', Link)
}
