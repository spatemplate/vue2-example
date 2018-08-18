<script>
    import AuthModel from '../models/AuthModel'
    import Router from "../../../helpers/Router";

    export default {
        created() {
            AuthModel.logout();
            Router.push('/');
        }
    }
</script>