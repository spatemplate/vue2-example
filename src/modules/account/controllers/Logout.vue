<script>
    import auth from '../models/auth'
    import router from "../../../config/routes";

    export default {
        created() {
            auth.logout();
            router.push('/');
        }
    }
</script>