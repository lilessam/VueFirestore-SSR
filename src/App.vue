<template>
  <div id="app">
    <li><router-link :to="'/'">Foo</router-link></li>
    <li><router-link :to="'/link'">Bar</router-link></li>
    <li v-for="it in items">
      <router-link class="link" :to="'/item/' + it.id">{{ it.name }}</router-link>
    </li>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import Firebase from 'firebase'
import FirebaseApp from 'firebase-app'
import { mapGetters, mapActions } from 'vuex'

const db = FirebaseApp.firestore()


// check if an element exists in array using a comparer function
// comparer : function(currentElement)
Array.prototype.inArray = function(comparer) { 
    for(var i=0; i < this.length; i++) { 
        if(comparer(this[i])) return true; 
    }
    return false; 
}; 

// adds an element to the array if it does not already exist using a comparer 
// function
Array.prototype.pushIfNotExist = function(element, comparer) { 
    if (!this.inArray(comparer)) {
        this.push(element);
    }
}; 


export default {
  mounted () {
    var vm = this
    db.collection("items")
    .onSnapshot(function(snapshot) {
        snapshot.docChanges.forEach(function(change) {
            if (change.type === "added") {
                console.log(change.doc.data())
                var element = { id :  change.doc.id, name :  change.doc.data().name };
                vm.$store.state.items.pushIfNotExist(element, (e) => {
                  return e.id === element.id && e.name === element.name; 
                })
            }
        });
    });
  },
  name: 'app',
  asyncData({ store }) {
    return store.dispatch('fetchItems').then((items) => {})
  },
  computed : {
    items() {
      return this.$store.state.items;
    }
  }

}

</script>

<style>
html,
body,
#app {
  height: 100%;
}

#app {
  display: flex;
}

.nav {
  flex: 1;
  overflow: scroll;
}

.view {
  flex: 4;
}

.nav ul li {
  list-style-type: none;
}

.nav ul li .link {
  color: black;
  text-decoration: none;
}

.nav ul li.selected {
  font-weight: bold;
}
</style>