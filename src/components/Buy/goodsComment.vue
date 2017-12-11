<template>
    <div class="mui-content">
        <comments :id="id"></comments>
    </div>
</template>
<script>
    import comments from '../Common/comments.vue';
    export default{
        props:['id'],
        components:{
            comments
        }
    }
</script>
<style scoped>

</style>

