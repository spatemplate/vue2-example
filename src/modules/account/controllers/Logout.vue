<script>
    import auth from '../models/auth'
    import router from "../../../config/router";

    export default {
        created() {
            auth.logout();
            router.push('/');
        }
    }
</script>