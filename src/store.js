import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'firebase'
import FirebaseApp from 'firebase-app'
const db = FirebaseApp.firestore()

import {
    firebaseMutations,
    firebaseAction,
} from 'vuexfire'

Vue.use(Vuex)

function fetch(id) {
    return new Promise((resolve, reject) => {
        db.collection("items").doc(id)
            .onSnapshot(function(doc) {
            resolve(doc.data());
        })
    })
}

function fetchAll() {
    return new Promise((resolve, reject) => {
        db.collection("items")
        .onSnapshot(function(querySnapshot) {
            var array = [];
            querySnapshot.forEach(function(doc) {
                array.push({ id : doc.id, name : doc.data().name })
            });
            resolve(array);
        });
    })
}

export function createStore() {
    return new Vuex.Store({
        state: {
            item: {},
            items : []
        },
        actions : {
            
            fetchItems({ commit }) {
                return fetchAll().then(items => {
                    commit('setItems', items);
                    return items
                });
            },

            findItem({ commit }, id) {
                return fetch(id).then(item => {
                    commit('setItem', item)
                    return item
                })
            },
            ...firebaseAction

        },

        mutations: {
            setItem (state, item) {
              state.item = item
            },
            setItems (state, items) {
                state.items = items
            },
            ...firebaseMutations,
          }
    })
}