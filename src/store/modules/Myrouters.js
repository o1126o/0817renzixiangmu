import { constantRoutes } from '@/router'

export default {
    namespaced: true,
    state: {
        routes: constantRoutes
    },
    mutations: {
        setRoutes(state, routesArr) {
            state.routes = [...constantRoutes, ...routesArr]
        }
    }
}