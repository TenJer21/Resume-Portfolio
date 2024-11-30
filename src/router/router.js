/**
 * Created by Ryan Balieiro on 08.23.2023
 * Main router.
 */
import {useData} from "../composables/data.js"
import RouterView from "../vue/core/RouterView.vue"
import Login from "../vue/core/Login.vue"
import {createRouter, createWebHistory} from "vue-router"
import Cookies from 'js-cookie'

export function createAppRouter() {
    const data = useData()
    const sections = data.getSections()
    const homeSection = sections[0] || {id: 'home'}

    /** Create Routes **/
    const routeList = [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            name: homeSection['id'],
            component: RouterView,
            meta: { requiresAuth: true } // Requires authentication
        }
    ]

    /** Create Section Routes **/
    for (let i = 1; i < sections.length; i++) {
        let sectionId = sections[i].id

        routeList.push({
            path: '/' + sectionId,
            name: sectionId,
            component: RouterView,
            meta: { requiresAuth: true } // Requires authentication
        })
    }

    /** Wildcard Route **/
    routeList.push({
        path: "/:pathMatch(.*)*",
        redirect: '/login'
    })

    const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: routeList
    })

    /** Navigation Guard **/
    router.beforeEach((to, from, next) => {
        const isAuthenticated = checkAuthentication() // Implement this function
        if (to.meta.requiresAuth && !isAuthenticated) {
            next({ path: '/login' })
        } else if (to.path === '/login' && isAuthenticated) {
            next({ path: '/' }) // Redirect authenticated users away from the login page
        } else {
            next()
        }
    })

    return router
}

/** Helper Function to Check Authentication **/
function checkAuthentication() {
    // Replace this with your actual authentication logic
    return !!Cookies.get('authToken') // Example: token stored in localStorage
}
