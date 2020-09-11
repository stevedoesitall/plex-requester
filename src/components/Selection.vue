<template>
    <div class="columns is-centered">
        <div class="column is-one-third">
            <div v-if="type === 'dropdown'">
                <label class="label">{{title}}</label>
                <div class="dropdown select is-fullwidth selection">
                <select v-bind:id="slug + '-input'" v-bind:type="type">
                    <option v-for="option in options" :key="option.toLowerCase()">
                        {{option}}
                    </option>
                </select>
                </div>
            </div>

            <div v-else-if="type === 'text'">
                <label class="label">{{title}}</label>
                <input class="input selection mr-6" v-bind:placeholder="placeholder" v-bind:id="slug + '-input'" v-bind:type="type" v-on:keyup="removeNANs"/>
            </div>
        </div>
    </div>
</template>

<script>
// import { removeWarning } from '../utils/warnings'

export default {
    name: 'Item',
    data() {
        return {
            options: [
                'Movie',
                'TV Show',
                'Cartoon',
                'Disney',
                'Anime',
                'Animated Movie',
                'HDTGM'
            ]
        }
    },
    props: {
        title: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: false
        },
        slug: {
            type: String,
            required: false
        },
        removeNANs: {
            type: Function,
            required: false
        }
    },
    // methods: {
    //     removeWarningMethod: function(type) {
    //         removeWarning(type)
    //     }
    // }
}
</script>

<style scoped>
/* .dropdown {
    margin-right: 15em;
    padding-right: 15em;
} */
</style>