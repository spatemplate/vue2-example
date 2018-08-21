<template>
    <div>
        <form @submit.prevent="send">
            <div class="row">
                <div class="col-sm-2">

                    <div class="form-group field-requestform-method required">

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
                        <div class="input-group">
                            <div class="input-group-addon">{{ request.baseUrl }}/</div>
                            <input v-model="request.uri" class="form-control" placeholder="endpoint" autofocus=""
                                   type="text">
                            <span class="input-group-btn">
                                <button class="btn btn-primary" type="submit" tabindex="-1">Send</button>
                            </span>
                        </div>

                        <p class="help-block help-block-error"></p>
                    </div>
                </div>
                <div class="col-sm-12">
                    <h4>Request</h4>
                    <tabs>
                        <tab title="Query">
                            Query
                        </tab>
                        <tab title="Body">
                            <br/>
                            <table class="table">
                                <tbody>

                                <tr v-for="(value,key) in request.data">

                                    <td class="column-check">
                                        <div class="form-group field-requestform-bodyactives-1">
                                            <input value="0" type="hidden">
                                            <input value="1" checked="" tabindex="-1" type="checkbox">
                                        </div>
                                    </td>
                                    <td class="column-key">
                                        <div class="form-group form-group-sm field-requestform-bodykeys-1">
                                            <input class="form-control" v-model="key" placeholder="Body Param" type="text">
                                        </div>
                                    </td>
                                    <td class="column-value">
                                        <div class="form-group form-group-sm field-requestform-bodyvalues-1">
                                            <input class="form-control" v-model="request.data[key]" placeholder="Value" type="text">
                                        </div>
                                    </td>
                                    <td class="column-actions">
                                        <button type="button" class="close" tabindex="-1">
                                            <span>×</span>
                                        </button>
                                    </td>

                                </tr>

                                </tbody>
                            </table>
                        </tab>
                        <tab title="Headers">
                            Headers
                        </tab>
                    </tabs>
                </div>
            </div>
        </form>

        <div v-if="response">
            <h4>Response</h4>
            <tabs>
                <tab title="Body">
                    <br/>
                    <pre><code class="json hljs">{{ JSON.stringify(response.data, null, 2) }}</code></pre>

                </tab>
                <tab title="Headers">
                    <br/>
                    <pre><code class="json hljs">{{ JSON.stringify(response.headers, null, 2) }}</code></pre>
                </tab>

                <span slot="nav-right">
                    Status: {{ response.status }}
                </span>

            </tabs>
        </div>

    </div>
</template>

<script>
    import store from "../../../config/store";
    import Rest from "../helpers/Rest";

    export default {
        data() {
            return {
                response: null,
                request: {
                    baseUrl: store.config.server.domain,
                    method: 'get',
                    uri: 'v1/city',
                    data: {
                        login: 'admin',
                        password: 'qwerty',
                    },
                },
                method: {
                    selected: [],
                    options: [
                        {value: 'get', label: 'GET'},
                        {value: 'post', label: 'POST'},
                        {value: 'put', label: 'PUT'},
                        {value: 'delete', label: 'DELETE'},
                        //{value: 'options', label:'OPTIONS'},
                    ]
                },
            }
        },
        methods: {
            setResponse(response) {
                this.response = response;
                console.log(response.headers);
            },
            send() {
                Rest.send(this.request, this.setResponse);
            }
        }
    }
</script>

<style>
    code {
        font-size: 10px;
        color: red;
    }
</style>