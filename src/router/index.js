import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home";
import Music from "@/views/Music";
import PlaylistPage from "@/views/PlaylistPage";
import NotFound from "@/views/NotFound";

const routes = [
  {
    path: '',
    component: Home,
    name: 'Home'
  },
  {
    path: '/music/:id',
    component: Music,
    name: 'Music'
  },
  {
    path: '/playlist/:id',
    component: PlaylistPage,
    name: 'PlaylistPage'
  },
//    404 Not Fount
  {
    path: '/:catchAll(.*)',
    component: NotFound,
    name: 'NotFound'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
