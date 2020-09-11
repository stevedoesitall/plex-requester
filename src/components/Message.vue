<template>
    <div id="message-component">
        <div class="columns is-centered">
            <div class="column is-two-thirds">
                <article class="message mt-4" v-bind:class="className">
                    <div class="message-header">
                        <p>{{msgType}}</p>
                    </div>
                    <div class="message-body">
                        <p>{{msg}}</p>
                    </div>
                </article>
            </div>
        </div>   
    </div>
</template>

<script>

export default {
    name: 'Message',
    props: {
        msg: {
            type: String,
            required: true
        },
        msgType: {
            type: String,
            required: true
        },
        className: {
            type: String,
            required: true
        }
    }
}
</script>