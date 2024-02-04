<template>
    <div class="post-view">
        <div class="container quillWrapper" v-if="currentBlog">
            <h2>{{ this.currentBlog[0].blogTitle }}</h2>
            <h4>Posted on: {{ new Date(this.currentBlog[0].blogDate).toLocaleString("en-us", { dataStyle: "long" }) }}</h4>
            <img :src="this.currentBlog[0].blogCoverPhoto" alt="" />
            <div class="post-content ql-editor" v-html="this.currentBlog[0].blogHTML"></div>
            <div class="card-images">
                <img v-for="(image, index) in currentBlog[0].images" :src="image.url" :key="index" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ViewBlog",
    data() {
        return {
            currentBlog: null,
        };
    },
    async mounted() {
        const blogId = this.$route.params.blogid;
        const blog = this.$store.state.blogPosts.find(post => post.blogID === blogId);

        if (blog) {
            this.currentBlog = [blog];
        } else {
            console.error(`Blog post with ID ${blogId} not found.`);
        }
    },

}
</script>

<style lang="scss">
.post-view {
    h4 {
        font-weight: 400;
        font-size: 14px;
        margin-bottom: 24px;
    }

    .card-images {
        display: flex;
        flex-wrap: wrap;
        gap: 10px; // Spațiu între imagini
        justify-content: flex-start;

        img {
            width: calc(25% - 10px); // Aproximativ 25% pentru afisarea a 4 imagini pe rând
            margin-bottom: 10px;
        }
    }
}
</style>