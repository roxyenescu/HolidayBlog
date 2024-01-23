<template>
    <div class="reset-password">
        <Modal v-if="modalActive" v-on:close-modal="closeModal" />
        <Loading v-if="loading" />
        <div class="form-wrap">
            <form class="reset">
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

                <button>Reset</button>

                <div class="angle"></div>
            </form>

            <div class="background"></div>
        </div>
    </div>
</template>

<script>
import emailIcon from "../assets/Icons/envelope-regular.svg";
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue";

export default {
    name: "ForgotPassword",
    data() {
        return {
            email: null,
            modalActive: false,
            modalMessage: "",
            loading: null,
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