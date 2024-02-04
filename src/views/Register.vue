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
                <div v-show="error" class="error">{{ this.errorMsg }}</div>
            </div>

            <button @click.prevent="register">Sign Up</button>

            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import db from '../firebase/firebaseInit';

import emailIcon from "../assets/Icons/envelope-regular.svg";
import passwordIcon from "../assets/Icons/lock-alt-solid.svg";
import userIcon from "../assets/Icons/user-alt-light.svg";

export default {
    name: "Register",
    data() {
        return {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            error: null,
            errorMsg: "",
        }
    },
    setup() {
        return {
            emailIcon,
            passwordIcon,
            userIcon
        }
    },
    methods: {
        async register() {
            if (this.email !== "" &&
                this.password !== "" &&
                this.firstName !== "" &&
                this.lastName !== "" &&
                this.username !== "") {

                this.error = false;
                this.errorMsg = "";
                const auth = getAuth();
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
                    const user = userCredential.user;
                    const userRef = doc(db, "users", user.uid);
                    await setDoc(userRef, {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        username: this.username,
                        email: this.email,
                    });
                    this.$router.push({ name: 'Home' });
                } catch (error) {
                    this.error = true;
                    this.errorMsg = error.message;
                }
            } else {
                this.error = true;
                this.errorMsg = "Please fill out all the fields!";
            }
        },
    }
}
</script>


<style lang="scss" scoped>
.register {
    h2 {
        max-width: 350px;

    }
}
</style>