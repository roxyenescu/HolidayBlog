<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, index) in sampleBlogPost" :key="index" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in sampleBlogCards" :key="index" />
        </div>
      </div>
    </div>
    <div class="updates">
      <div class="container">
        <h2>Never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#">
          Registre for HolidayBlogs
          <img :src="Arrow" class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
  </div>
</template>
  
<script>
import BlogPost from '../components/BlogPost.vue';
import BlogCard from '../components/BlogCard.vue';
import Arrow from "../assets/Icons/arrow-right-light.svg"

export default {
  name: "Home",
  components: { BlogPost, BlogCard },
  data() {
    return {
      Arrow: Arrow,

      welcomeScreen: {
        title: "Discover Magical Destinations!",
        blogPost:
          "Welcome to our vacation blog, where the adventure begins! Explore our weekly articles on exotic destinations, travel tips, and captivating stories. Register now to stay connected to the latest vacation experiences!",
        welcomeScreen: true,
        photo: "photo-holiday-1",
      },
      sampleBlogPost: [
        {
          title: "Unbounded Exploration!",
          blogPostHTML: "Be inspired by boundless travels and unexpected adventures!",
          blogCoverPhoto: "photo-holiday-2",
        },
        {
          title: "The Odyssey of Our Vacations!",
          blogPostHTML: "See the world with us and create your own memories. ",
          blogCoverPhoto: "photo-holiday-3",
        },
      ],
    }
  },
  computed: {
    sampleBlogCards() {
      return this.$store.state.sampleBlogCards;
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media(min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;

      @media(min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;

      @media(min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>