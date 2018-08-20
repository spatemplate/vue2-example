import PostModel from "../models/PostModel";
import StoreFactory from "../../../components/domain/factories/StoreFactory";

export default StoreFactory.createActive({
    modelObject: PostModel,
});
