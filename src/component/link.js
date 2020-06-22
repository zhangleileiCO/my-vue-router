export default {
    name: 'Router-link',
    props: {
        to: {
            type: [Object, String],
            required: true
        },
        tag: {
            type: String,
            default: 'a'
        },
        replace: Boolean
    },
    render(h) {
        let data = {}
        if (this.tag === 'a') {
            data.attrs = {href: this.to}
        } else {
            data.on = {click: () => {
                    if (this.replace) {
                        this._root._router.replace(this.to)
                    } else {
                        this._root._router.push(this.to)
                    }
                }}
        }
        return h(this.tag, data, this.$slots.default)
    }
}
