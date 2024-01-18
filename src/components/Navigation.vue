<template>
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class="header" to="/">HolidayBlog</router-link>
            </div>
            <div class="nav-links">
                <ul>
                    <router-link class="link" to="/">Home</router-link>
                    <router-link class="link" to="/blogs">Blogs</router-link>
                    <router-link class="link" to="/create-post">Create Post</router-link>
                    <router-link class="link" to="/login">Login/Register</router-link>
                </ul>
            </div>
        </nav>

        <img class="menu-icon" :src="menuIcon" alt="Menu Icon" />

        <transition name="mobile-nav">
            <ul>
                <router-links class="link" to="#">Home</router-links>
                <router-links class="link" to="#">Blogs</router-links>
                <router-links class="link" to="#">Create Post</router-links>
                <router-links class="link" to="#">Login/Register</router-links>
            </ul>
        </transition>
    </header>
</template>
  
<script>
import menuIcon from '../assets/Icons/bars-regular.svg';

export default {
    name: 'Navigation',
    components: {},
    setup() {
      return {
        menuIcon
      };
    }
};
</script>

<style lang="scss" scoped></style>