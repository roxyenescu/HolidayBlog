<template>
    <div class="reset-password">
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
import { ref } from 'vue';
import emailIcon from "../assets/Icons/envelope-regular.svg";

export default {
    name: "ForgotPassword",
    setup() {
        const email = ref(null);

        return {
            email,
            emailIcon
        }
    }

}
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