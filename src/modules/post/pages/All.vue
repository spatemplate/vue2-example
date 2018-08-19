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
        </div>
        <div v-if="!state.collection">
            <loading/>
        </div>
    </div>

</template>

<script>
    import store from '../../../config/store'

    export default {
        data() {
            return {
                state: store.post.state,
            }
        },
        created() {
            store.post.dispatch('all');
        },
    };
</script>