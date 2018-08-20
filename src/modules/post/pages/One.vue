<template>
    <div>
        <div class="post" v-if="state.entity">
            <h1 class="post__title">{{ state.entity.name }}</h1>
            <p class="post__id">{{ state.entity.id }}</p>
        </div>
        <div class="post" v-if="!state.entity">
            <loading/>
        </div>
    </div>
</template>

<script>
    import store from '../../../config/store'

    export default {
        props: ['id'],
        data() {
            return {
                state: store.post.state,
            }
        },
        created() {
            store.post.dispatch('oneById', this.id);
        },
    };
</script>