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
    import axios from 'axios'
    import rest from "../../../components/rest";

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
                rest.get('v1/city', null, null, (response) => {
                    if (response.status < 400) {
                        this.posts = response.data;
                    } else {
                        this.posts = [];
                    }
                });
            }
        }
    }
</script>