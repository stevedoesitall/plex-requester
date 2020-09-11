<template>
    <div class="columns is-centered">
        <div class="column is-one-third">
            <label class="label">{{title}}</label>
            <input class="input selection mr-6" v-bind:placeholder="placeholder" v-bind:id="slug + '-input'"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'About',
    props: {
        title: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        }
    }
}
</script>