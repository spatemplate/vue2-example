<template>
    <div v-if="store.post.state.collection">
        <ul>
            <li v-for="post in store.post.state.collection">
                <router-link
                        active-class="is-active"
                        class="link"
                        :to="{ name: 'post', params: { id: post.id } }">
                    {{post.name}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import PostModel from "../models/PostModel";
    import store from '../../../config/store'

    export default {
        data() {
            return {
                store: store,
            }
        },
        created() {
            PostModel.all();
        },
    };
</script>