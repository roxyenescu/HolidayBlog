<template>
    <div class="reset-password">
        <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
        <Loading v-if="loading" />
        <div class="form-wrap">
            <form class="reset">

                <p class="login-register">
                    Back to
                    <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
                </p>

                <h2>Reset Password</h2>

                <p class="login-register">
                    Forgot your password? Enter your email to reset it!
                </p>

                <div class="inputs">
                    <div class="input">
                        <input type="text" placeholder="Email" v-model="email" />
                        <img :src="emailIcon" class="icon" />
                    </div>
                </div>

                <button @click.prevent="resetPassword">Reset</button>

                <div class="angle"></div>
            </form>

            <div class="background"></div>
        </div>
    </div>
</template>

<script>
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import emailIcon from "../assets/Icons/envelope-regular.svg";
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue";

export default {
    name: "ForgotPassword",
    data() {
        return {
            email: "",
            modalActive: false,
            modalMessage: "",
            loading: false,
        }
    },
    components: {
        Modal,
        Loading,
    },
    setup() {
        return {
            emailIcon
        }
    },
    methods: {
        resetPassword() {
            if (!this.email) {
                this.modalMessage = "Please enter your email";
                this.modalActive = true;
                return;
            }

            this.loading = true;
            const auth = getAuth();
            sendPasswordResetEmail(auth, this.email).then(() => {
                this.modalMessage = "If your account exists, you will receive an email!";
                this.loading = false;
                this.modalActive = true;
            }).catch(err => {
                if (err.code === 'auth/invalid-email') {
                    this.modalMessage = "The email address is badly formatted!";
                } else {
                    this.modalMessage = err.message;
                }
                this.loading = false;
                this.modalActive = true;
            });
        },
        closeModal() {
            this.modalActive = !this.modalActive;
            this.email = "";
        },
    },
};
</script>

<style lang="scss" scoped>
.reset-password {
    position: relative;

    .form-wrap {
        .reset {
            h2 {
                margin-bottom: 8px;
            }

            p {
                text-align: center;
                margin-bottom: 32px;
            }
        }
    }
}
</style>