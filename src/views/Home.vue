<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, index) in sampleBlogPost" :key="index" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCards :post="post" v-for="(post, index) in sampleBlogCards" :key="index" />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import BlogPost from '../components/BlogPost.vue';
import BlogCards from '../components/BlogCard.vue';
export default {
  name: "Home",
  components: { BlogPost, BlogCards },
  data() {
    return {
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
      sampleBlogCards: [
        { blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "Ian 1, 2024" },
        { blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "Ian 1, 2024" },
        { blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "Ian 1, 2024" },
        { blogTitle: "Blog Card #4", blogCoverPhoto: "stock-4", blogDate: "Ian 1, 2024" }
      ],
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

</style>