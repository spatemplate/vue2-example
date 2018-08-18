<template>
    <div v-if="posts">
        <ul>
            <li v-for="post in posts">
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
                posts: store.post.state.collection,
            }
        },
        created() {
            PostModel.all();
        },
    };
</script>