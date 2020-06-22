export function pushState(url, replace) {
    const history = window.history
    if (replace) {
        history.replaceState({key: history.state.key}, '', url)
    } else {
        history.pushState({key: Date.now()}, '', url)
    }
}
