<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <div class="box px-0 py-0">
                <div class="notification mt-4 is-info" v-bind:id="item.id">
                    <p class="is-size-5 has-text-centered pb-2"><span id="item-title">{{item.title}}</span> {{item.year ? '(' + item.year + ')': null}}</p>
                    <p class="is-size-6 has-text-centered pb-2">{{item.type}}</p>
                    <button class="delete" v-on:click="removeItem"></button>
                    <!-- <p class="is-size-6 has-text-centered is-success"><a href="" v-on:click="editItem">Edit</a></p> -->
                </div>
            </div>
        </div>
    </div>        
</template>

<script>
import '@/assets/style.css'

export default {
    name: 'Item',
    props: {
        removeItem: {
            type: Function,
            required: true
        },
        editItem: {
            type: Function,
            required: false
        },
        item: {
            type: Object,
            required: true
        }
    }
}
</script>