<template>
	<div class="car">
		<div class="carName">
			<p>
				{{ name }}
			</p>
		</div>
		<div class="carPhoto" :style="cssProps"></div>
		<div class="carProps">
			<ul>
				<li>Rocznik: {{ year }}</li>
				<li>Cena wynajmu na 1 dzień: {{ price }}zł</li>
				<li>Wyposażenie: {{ equipment }}</li>
			</ul>
		</div>
		<div class="carRent">
			<button @click="carRent" v-if="!rentedNow">Wypożycz ten samochód</button>
			<div v-else>Ten samochód jest właśnie wypożyczony</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// import { component } from "vue/types/umd";

@Component
export default class CarItem extends Vue {
	@Prop({ required: true }) readonly id: number;
	@Prop({ required: true }) readonly name: string;
	@Prop({ required: true }) readonly year: number;
	@Prop({ required: true }) readonly price: number;
	@Prop({ required: true }) readonly photoUrl: string;
	@Prop({ required: true }) readonly equipment: string;
	@Prop({ required: true }) readonly rented!: boolean;
	private rentedNow = this.rented;
	get cssProps(): object {
		return {
			"background-image": `url(${this.photoUrl})`,
		};
	}
	async carRent() {
		let res = await fetch("http://localhost:8081/rentCar", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id: this.id }),
		});
		if (res.status === 204) this.rentedNow = true;
	}
}
</script>

<style scoped>
.car {
	width: 90%;
	height: 8vh;
	border: 1px solid green;
}
.car div {
	height: 8vh;
	float: left;
}
.carName {
	width: 20%;
	font-size: 25px;
}
.carPhoto {
	width: 20%;
	background-size: 100% 100%;
}
.carProps {
	width: 40%;
}
.carProps ul {
	columns: 2;
	font-size: 15px;
}
.carRent {
	display: flex;
	align-items: center;
	text-align: center;
	width: 20%;
}
</style>
