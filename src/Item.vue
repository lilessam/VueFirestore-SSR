<template>
	<h1>{{ item.name }}</h1>
</template>
<script>
import Firebase from 'firebase'
import FirebaseApp from 'firebase-app'
const db = FirebaseApp.firestore()

export default {

	mounted() {
		
		return this.$store.dispatch('findItem', this.$route.params.id);

	},
	asyncData({ store, route }) {
		// Call then and do nothing !
		return store.dispatch('findItem', route.params.id).then(item => {});
	},
	computed : {
		item() {
			return this.$store.state.item;
		}
	},

	watch: {
		'$route'(to, from) {
			const id = to.params.id
			if (!id) {
			return
			}
			this.$store.dispatch('findItem', id);
		}
	},

}
</script>