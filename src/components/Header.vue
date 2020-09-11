<template>
    <div id="header" class="hero mb-1">
        <h1 class="title is-2 has-text-centered">{{msg}}</h1>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        msg: {
            type: String,
            required: true
        }
    }
}
</script>