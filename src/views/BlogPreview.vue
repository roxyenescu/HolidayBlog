<template>
    <div class="post-view">
        <div class="container quillWrapper">
            <h2>{{ this.blogTitle }}</h2>
            <img :src="blogCoverPhoto" alt="" />
            <div class="post-content ql-editor" v-html="blogHTML"></div>
            <div class="card-images">
                <img v-for="(image, index) in images" :src="image.url" :key="index" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "PostPreview",
    computed: {
        blogTitle() {
            return this.$store.state.blogTitle;
        },
        blogHTML() {
            return this.$store.state.blogHTML;
        },
        blogCoverPhoto() {
            return this.$store.state.blogPhotoFileURL;
        },
        images() {
            return this.$store.state.images;
        },
    }
}
</script>
<style lang="scss" scoped>
.post-view {
    min-height: 100%;

    .container {
        max-width: 1000px;
        padding: 60px 25px;
    }

    h2 {
        margin-bottom: 16px;
        font-weight: 300;
        font-size: 32px;
    }

    img {
        width: 100%;
        margin-bottom: 32px;
    }

    .ql-editor {
        white-space: pre-wrap; // Păstrează spațiile și trecerea la linie
        margin-bottom: 32px;
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