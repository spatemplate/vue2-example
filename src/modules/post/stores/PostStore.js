import PostModel from "../models/PostModel";
import StoreFactory from "../../../vendor/vue-rails/domain/factories/StoreFactory";

export default StoreFactory.createActive({
    modelObject: PostModel,
});
