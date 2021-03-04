<template>
	<div id="app" v-if="gotData">
		<CarItem v-for="car in avaibleCars" v-bind="car" :key="car.id" />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { component } from "vue/types/umd";
import CarItem from "./components/CarItem.vue";

@Component({
	components: {
		CarItem,
	},
})
export default class App extends Vue {
	private gotData = false;
	private avaibleCars!: Array<object>;
	mounted() {
		(async () => {
			let cars;
			cars = await (await fetch("http://localhost:8081/getCars")).json();
			this.avaibleCars = cars;
			this.gotData = true;
		})();
	}
}
</script>

<style>
#app {
	width: 70%;
	margin: 5px auto;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
#car {
	border: 1px solid black;
}
</style>
