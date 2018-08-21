<template>
    <div></div>
</template>

<script>
    import Router from "../../../vue-rails/app/helpers/Router";
    import store from '../../../../config/store'
    import Event from "../../../vue-rails/app/helpers/Event";

    export default {
        created() {
            store.auth.dispatch('logout');
            Event.trigger('account-logout');
            Router.push('/');
        }
    }
</script>