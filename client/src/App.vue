<template>
	<div id="app" v-if="gotData">
		<CarItem v-for="car in avaibleCars" v-bind="car" :key="car.id" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CarItem from "./components/CarItem.vue";

@Component({
	components: {
		CarItem,
	},
})
export default class App extends Vue {
	private gotData = false;
	private avaibleCars: Array<object>;
	async mounted() {
		this.avaibleCars = await (
			await fetch("http://localhost:8081/getCars")
		).json();
		this.gotData = true;
	}
}
</script>

<style>
body {
	background-color: #141414;
}
#app {
	width: 65%;
	margin: 5px auto;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	text-align: center;
	color: white;
}
</style>
