import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Blogs from '../views/Blogs.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import Profile from '../views/Profile.vue';
import Admin from '../views/Admin.vue';
import CreatePost from '../views/CreatePost.vue';
import BlogPreview from '../views/BlogPreview.vue';
import ViewBlog from '../views/BlogPreview.vue';
import ViewBlogPost from '../views/ViewBlogPost.vue';
import { getAuth, getIdTokenResult } from 'firebase/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      requiresAuth: false,
    }
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs,
    meta: {
      title: 'Blogs',
      requiresAuth: false,
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
      requiresAuth: false,
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register',
      requiresAuth: false,
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password',
      requiresAuth: false,
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Profile',
      requiresAuth: true,
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      title: 'Admin',
      requiresAuth: true,
      requiresAdmin: true,
    }
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
    meta: {
      title: 'Create Post',
      requiresAuth: true,
      requiresAdmin: true,
    }
  },
  {
    path: '/post-preview',
    name: 'BlogPreview',
    component: BlogPreview,
    meta: {
      title: 'Preview Blog Post',
      requiresAuth: true,
      requiresAdmin: true,
    }
  },
  {
    path: '/view-blog',
    name: 'ViewBlog',
    component: ViewBlog,
    meta: {
      title: 'View Blog',
      requiresAuth: false,
    }
  },
  {
    path: '/view-blog-post/:blogid',
    name: 'ViewBlogPost',
    component: ViewBlogPost,
    meta: {
      title: 'View Blog Post',
      requiresAuth: false,
    }
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | HolidayBlog`;
  next();
});

router.beforeEach(async (to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      try {
        const token = await getIdTokenResult(user);
        const admin = token.claims.admin;

        if (to.matched.some((res) => res.meta.requiresAdmin)) {
          if (admin) {
            return next();
          } else {
            return next({ name: 'Home' });
          }
        }

        return next();
      } catch (error) {
        // Handle error if getting token fails
        console.error('Error getting token:', error);
        return next({ name: 'Home' });
      }
    } else {
      return next({ name: 'Home' });
    }
  }

  return next();
});

export default router
