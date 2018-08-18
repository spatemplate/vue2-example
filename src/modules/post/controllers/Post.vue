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
    import { Notification } from 'uiv'
    import event from "../../../components/event";
    import store from "../stores/post";


    let controller = {

        data() {
            return {
                posts: store.state.collection,
            }
        },

        created() {
            this.all();
        },
        methods: {
            all() {
               /* post.all(function (response) {
                    console.log(response);
                    //if (response.status < 400) {
                    this.posts = response;
                    //}
                });*/
                post.all();
            },
            setCollection(collection) {
                //this.posts = collection;
            }
        },
    };

    event.attach('post-list', function () {
        //console.log(data);
        //Post.setList(data);
        //controller.setCollection(post.collection);
        Notification.notify({
            type: 'success',
            title: 'post',
            content: 'list',
        })
    });

    export default controller;

</script>