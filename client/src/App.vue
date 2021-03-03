<template>
	<div id="app" v-if="gotData">
		<CarItem v-for="car in avaibleCars" v-bind="car" :key="car.key" />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { component } from "vue/types/umd";
import CarItem from "./components/CarItem.vue";
// very important commne
@Component({
	components: {
		CarItem,
	},
})
export default class App extends Vue {
	private gotData = false;
	private avaibleCars = ((): Array<object> => {
		this.gotData = true;
		return [
			{
				name: "Opel Astra",
				year: 2004,
				price: 500,
				photoUrl: "https://jopek.eu/opelAstra",
				equipment: "klimatyzacja, czujnik parkowania",
				key: 0,
			},
		];
	})();
}
</script>

<style>
#app {
	width: 70%;
	margin: 5px auto;

	/* font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px; */
}
#car {
	border: 1px solid black;
}
</style>
