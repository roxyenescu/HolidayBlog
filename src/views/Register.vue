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
import emailIcon from "../assets/Icons/envelope-regular.svg";
import passwordIcon from "../assets/Icons/lock-alt-solid.svg";
import userIcon from "../assets/Icons/user-alt-light.svg";

export default {
    name: "Register",
    data() {
        return {
            firstName: null,
            lastName: null,
            username: null,
            email: null,
            password: null
        }
    },
    setup() {
        return {
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