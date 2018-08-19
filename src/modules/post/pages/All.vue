<template>
    <div>
        <div v-if="state.collection">
            <ul>
                <li v-for="entity in state.collection">
                    <router-link
                            active-class="is-active"
                            class="link"
                            :to="{ name: 'post', params: { id: entity.id } }">
                        {{entity.name}}
                    </router-link>
                </li>
            </ul>
            <pagination v-model="currentPage" :total-page="Number(state.paginate.pageCount)" size="sm"/>
        </div>
        <div v-if="!state.collection">
            <loading/>
        </div>
    </div>

</template>

<script>
    import store from '../../../config/store'

    export default {
        props: ['page'],
        data() {
            return {
                state: store.post.state,
                currentPage: 1,
                perPage: 20,
            }
        },
        created() {
            if(this.page) {
                this.currentPage = Number(this.page);
            }
            this.all();
        },
        methods: {
            all() {
                let query = {
                    "page": this.currentPage,
                    "per-page": this.perPage,
                };
                store.post.dispatch('all', query);
            }
        },
        watch: {
            currentPage: function (val) {
                this.all();
            },
        }
    };
</script>