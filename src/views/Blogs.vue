<template>
    <div class="blog-card-wrap">
        <div class="toggle-edit">
            <label class="toggle-label">
                <span>Toggle Deleting Post</span>
                <input type="checkbox" v-model="editPost" class="toggle-checkbox" />
                <span class="toggle-slider"></span>
            </label>
        </div>

        <div class="blog-cards container">
            <BlogCard :post="post" v-for="(post, index) in blogPosts" :key="index" />
        </div>
    </div>
</template>

<script>
import BlogCard from '../components/BlogCard.vue';

export default {
    name: "blogs",
    components: { BlogCard, },
    computed: {
        blogPosts() {
            return this.$store.state.blogPosts;
        },
        editPost: {
            get() {
                return this.$store.state.editPost;
            },
            set(payload) {
                this.$store.commit("toggleEditPost", payload);
            }
        }
    },
    beforeUnmount() {
        this.$store.commit("toggleEditPost", false);
    },
}
</script>

<style lang="scss" scoped>

.toggle-edit {
  display: flex;
  align-items: center;
  padding: 16px;

  .toggle-label {
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
      margin-right: 16px;
      font-weight: bold;
    }

    .toggle-checkbox {
      position: absolute;
      opacity: 0;
    }

    .toggle-slider {
      position: relative;
      width: 50px;
      height: 26px;
      border-radius: 20px;
      background-color: #ddd;
      transition: background-color 0.3s;

      &::before {
        content: "";
        position: absolute;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s;
      }
    }

    .toggle-checkbox:checked + .toggle-slider {
      background-color: #303030;

      &::before {
        transform: translateX(24px);
      }
    }
  }
}
</style>