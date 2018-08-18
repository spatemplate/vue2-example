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
    import post from "../models/post";
    import store from "../stores/post";

    export default {
        data() {
            return {
                posts: store.state.collection,
            }
        },
        created() {
            post.all();
        },
    };
</script>