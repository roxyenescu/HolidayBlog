<template>
    <div class="modal">
        <div class="modal-content">
            <p>Are you sure you want to delete this post?</p>
            <button @click="confirmDelete">Yes</button>
            <button @click="cancelDelete">No</button>
        </div>
    </div>
</template>
  
<script>
export default {
    methods: {
        confirmDelete() {
            this.$emit("confirm");
        },
        cancelDelete() {
            this.$emit("cancel");
        },
    },
};
</script>
  
<style scoped>
</style>
  