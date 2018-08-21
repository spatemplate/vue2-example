<template>
    <div>
        <form @submit.prevent="send">
            <div class="row">
                <div class="col-sm-2">

                    <div class="form-group field-requestform-method required">
                        <label class="control-label sr-only" for="requestform-method">Method</label>

                        <select v-model="request.method" class="form-control" name="method" aria-required="true">
                            <option v-for="item in method.options" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>

                        <p class="help-block help-block-error"></p>
                    </div>
                </div>
                <div class="col-sm-10">

                    <div class="form-group field-requestform-endpoint">
                        <label class="control-label sr-only" for="requestform-endpoint">endpoint</label>
                        <div class="input-group">
                            <div class="input-group-addon">{{ request.baseUrl }}/</div>
                            <input v-model="request.uri" class="form-control" placeholder="endpoint" autofocus="" type="text">
                            <span class="input-group-btn">
                                <button class="btn btn-primary" type="submit" tabindex="-1">Send</button>
                            </span>
                        </div>

                        <p class="help-block help-block-error"></p>
                    </div>
                </div>
            </div>
        </form>

        <div v-if="response.data">
            <pre>
                <code id="response-content" class="json hljs">
                    {{ response.data }}
                </code>
            </pre>
        </div>

    </div>
</template>

<script>
    import store from "../../../config/store";
    import Rest from "../helpers/Rest";

    export default {
        data() {
            return {
                login: '',
                password: '',
                response: {
                    data: null,
                },
                request: {
                    baseUrl: store.config.server.domain,
                    method: 'get',
                    uri: 'v1/city',
                },
                method: {
                    selected: [],
                    options: [
                        {value: 'get', label:'GET'},
                        {value: 'post', label:'POST'},
                        {value: 'put', label:'PUT'},
                        {value: 'delete', label:'DELETE'},
                        //{value: 'options', label:'OPTIONS'},
                    ]
                },
            }
        },
        methods: {
            cb(response) {
                this.response.data = JSON.stringify(response, null, 2);
                //console.log(response);
            },
            send() {
              // console.log(this.request.uri);
               /* const cb = function (response) {
                    this.response = JSON.stringify(response, null, 2);
                    //console.log(response);
                };*/
                Rest.send(this.request, this.cb);
            }
        }
    }
</script>
