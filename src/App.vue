<template>
  <div id="app" class="mt-6 is-family-sans-serif">
    <Header msg="Plex Requester"/>
    
    <section class="section">
      <div class="container">
        <About title="Your Name" type="text" placeholder="Marty McFly"/> 
        <About title="Email" type="text" placeholder="mmcfly@hillvalleyhs.edu"/> 
      </div>

      <nav class="level">
          <div class="level-item pb-1">
            <hr>
          </div>
      </nav>

      <div class="container">
        <Selection title="Title" type="text" placeholder="Back to the Future"/>
        <Selection title="Year" type="text" placeholder="1985" :removeNANs="removeNANs"/>
        <Selection title="Type" type="dropdown" options="options"/> 
        <!-- <Selection title="Notes" type="text" placeholder="Best movie ever"/>  -->
      </div>
  
      <div v-if="!validSubmission && !showResponse">
        <Message v-bind:msg="message" v-bind:className="className" v-bind:msgType="msgType"/>
      </div>


      <div v-if="showProgressBar">
        <progress class="progress is-small is-one-quarter is-primary mt-5" max="100">15%</progress>
      </div>

      <div v-else>

        <div v-if="itemsList.length === limit">
          <Message msg="You hit the request limit." className="is-warning" msgType="Warning"/>
        </div>

        <div v-else class="has-text-centered">
            <button v-on:click="addItem" id="add" class="button is-medium is-primary is-family-sans-serif is-hovered mt-5">Add</button>
        </div>

      </div>

      <div v-for="movie in itemsList" :key="movie.id">
        <Item v-bind:item="movie" :removeItem="removeItem"/>
      </div>

      <!-- <div v-if="itemsList.length < 1 && !showResponse">
        <p class="subtitle is-5 is-spaced mt-4 has-text-centered">Request list empty</p>
      </div> -->

      <div v-if="itemsList.length > 0 && !showProgressBar" class="has-text-centered">
        <button v-on:click="sendData" class="button is-primary is-family-sans-serif is-large mt-4">Submit</button>
      </div>

      <div v-if="showResponse && !showProgressBar">
        <Message v-bind:msg="message" v-bind:className="className" v-bind:msgType="msgType"/>
      </div>
    </section>
  </div>
</template>

<script>
//Bulma-generated CSS file
import '@/assets/style.css'

//Components
import About from './components/About.vue'
import Message from './components/Message.vue'
import Header from './components/Header.vue'
import Item from './components/Item.vue'
import Selection from './components/Selection.vue'

//Utility functions
import { addWarning, removeWarning } from './utils/warnings'
import capitalize from './utils/capitalize'

const LIMIT = 5
let id = 0

//NOTE: DRY this up
export default {
  name: 'App',
  data() {
    return {
      itemsList: [],
      validSubmission: true,
      className: '',
      message: '',
      msgType: '',
      showProgressBar: false,
      showResponse: false,
      limit: LIMIT,
      min: 1900,
      max: new Date().getFullYear()
    }
  },
  methods: {
    removeItem: function(e) {
      const currentItems = [...this.itemsList]
      const itemId = e.target.parentNode.id.toString()
      this.itemsList = currentItems.filter(item => item.id != itemId)
    },
    addItem: function() {
      this.showResponse = false
      const titleInput = capitalize(document.querySelector('#title-input').value)
      const yearInput = document.querySelector('#year-input').value
      const typeInput = document.querySelector('#type-input').value

      if (!titleInput &&
      (yearInput && 
        (yearInput > this.max || yearInput < this.min || isNaN(yearInput))
      )) {
        this.validSubmission = false
        this.message = 'Please fix all issues.'
        this.className = 'is-danger'
        this.msgType = 'Error'
        addWarning('title')
        addWarning('year')
        return true
      } else if (!titleInput) {
        this.validSubmission = false
        this.message = 'Please enter a movie title.'
        this.className = 'is-danger'
        this.msgType = 'Error'
        addWarning('title')
        removeWarning('year')
        return true
      } else if (
        yearInput && 
        (yearInput > this.max || yearInput < this.min || isNaN(yearInput))
      ) {
        this.validSubmission = false
        this.message = 'Please enter a valid year.'
        this.className = 'is-danger'
        this.msgType = 'Error'
        addWarning('year')
        removeWarning('title')
        return true
      }

      removeWarning('all')

      id++
      this.validSubmission = true
      this.itemsList.push({
        id: id,
        title: titleInput,
        year: yearInput,
        type: typeInput
      })
      document.querySelector('#title-input').value = ''
      document.querySelector('#year-input').value = ''
      document.querySelector('#type-input').value = 'Movie'

    },
    editItem: function(e) {
      e.preventDefault()
      const itemId = e.target.parentNode.id.toString()
      console.log(itemId + ' edited')
    },
    removeNANs: function() {
      const inputArray = document.querySelector('#year-input').value.split('')
      document.querySelector('#year-input').value = inputArray.filter(char => !isNaN(parseInt(char))).join('')
    },
    sendData: async function() {
      const userData = {}
      const userEmail = document.querySelector('#email-input').value
      const userName = document.querySelector('#your-name-input').value
      
      if (!userName) {
        this.showResponse = true
        this.message = 'Name is required.'
        this.className = 'is-danger'
        this.msgType = 'Error'
        addWarning('name')
        return true
      }

      removeWarning('name')
       
      userData.name = capitalize(userName)

      if (userEmail) {
        userData.email = userEmail.toLowerCase()
      } else {
        userData.email = null
      }

      this.showProgressBar = true

      const response = await fetch('/server', {
        method: 'POST',
        body: JSON.stringify({user: userData, items: this.itemsList}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      this.showProgressBar = false
      console.log(data)
      removeWarning('all')

      if (data.status === 'error') {
        this.showResponse = true
        this.itemsList = []
        this.message = 'Something went wrong. Please try again later.'
        this.className = 'is-danger'
        this.msgType = 'Error'
      } else {
        this.showResponse = true
        this.itemsList = []
        this.message = 'Thank you. Your request has been received.'
        this.className = 'is-success'
        this.msgType = 'Success' 
      }
    }
  },
  computed: {
    getYear: function() {
      return new Date().getFullYear()
    }
  },
  components: {
    About,
    Message,
    Header,
    Item,
    Selection
  }
}
</script>