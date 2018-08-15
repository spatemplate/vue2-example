<template>
    <div v-if="posts">
        <router-link
                v-for="post in posts"
                active-class="is-active"
                class="link"
                :to="{ name: 'post', params: { id: post.id } }">
            {{post.id}}. {{post.title}}
        </router-link>
    </div>


</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                posts: [],
                endpoint: 'https://jsonplaceholder.typicode.com/posts/',
            }
        },

        created() {
            this.getAllPosts();
        },

        methods: {
            getAllPosts() {
                axios.get(this.endpoint)
                    .then(response => {
                        this.posts = response.data;
                    })
                    .catch(error => {
                        console.log('-----error-------');
                        console.log(error);
                    })
            }
        }
    }
</script>