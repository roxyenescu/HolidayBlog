<template>
    <div class="form-wrap">
        <form class="register">
            <p class="login-register">
                Already have an account?
                <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
            </p>
            <h2>Create Your HolidayBlog Account</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="Firts Name" v-model="firstName" />
                    <img :src="userIcon" class="icon" />
                </div>

                <div class="input">
                    <input type="text" placeholder="Last Name" v-model="lastName" />
                    <img :src="userIcon" class="icon" />
                </div>

                <div class="input">
                    <input type="text" placeholder="Username" v-model="username" />
                    <img :src="userIcon" class="icon" />
                </div>

                <div class="input">
                    <input type="text" placeholder="Email" v-model="email" />
                    <img :src="emailIcon" class="icon" />
                </div>

                <div class="input">
                    <input type="password" placeholder="Password" v-model="password" />
                    <img :src="passwordIcon" class="icon" />
                </div>
            </div>

            <button>Sign Up</button>

            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>
import { ref } from 'vue';
import emailIcon from "../assets/Icons/envelope-regular.svg";
import passwordIcon from "../assets/Icons/lock-alt-solid.svg";
import userIcon from "../assets/Icons/user-alt-light.svg";

export default {
    name: "Register",
    setup() {
        const firstName = ref(null);
        const lastName = ref(null);
        const username = ref(null);
        const email = ref(null);
        const password = ref(null);

        return {
            firstName,
            lastName,
            username,
            email,
            password,
            emailIcon,
            passwordIcon,
            userIcon
        }
    }

}
</script>

<style lang="scss" scoped>

.register {
    h2{
        max-width: 350px;

    }
}
    
</style>