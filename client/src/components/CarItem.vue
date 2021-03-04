<template>
	<div class="car">
		<div class="carName alignCenter">
			<p>{{ name }}</p>
		</div>
		<div class="carPhoto" :style="css"></div>
		<div class="carProps">
			<ul>
				<li>Rocznik: {{ year }}</li>
				<li>Cena wynajmu na 1 dzień: {{ price }}zł</li>
				<li>Wyposażenie: {{ equipment }}</li>
			</ul>
		</div>
		<div class="carRent alignCenter">
			<p v-if="dbError">
				Wystąpił błąd w trakcie wypożyczania samochodu, zgłoś się do
				administratora strony
			</p>
			<p v-else-if="gotRented">Samochód został wypożyczony</p>
			<p v-else-if="rented">Ten samochód jest właśnie wypożyczony</p>
			<button @click="carRent" v-else>Wypożycz ten samochód</button>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CarItem extends Vue {
	@Prop({ required: true }) readonly id!: number;
	@Prop({ required: true }) readonly name!: string;
	@Prop({ required: true }) readonly year!: number;
	@Prop({ required: true }) readonly price!: number;
	@Prop({ required: true }) readonly photoUrl!: string;
	@Prop({ required: true }) readonly equipment!: string;
	@Prop({ required: true }) readonly rented!: boolean;
	private dbError = false;
	private gotRented = false;
	private css = { "background-image": `url(${this.photoUrl})` };
	async carRent() {
		let res = await fetch("http://localhost:8081/rentCar", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id: this.id }),
		});
		if (res.status === 204) this.gotRented = true;
		else this.dbError = true;
	}
}
</script>

<style scoped>
.alignCenter {
	display: flex;
	align-items: center;
	justify-content: center;
}
.car {
	height: 12vh;
	border: 1px solid green;
	margin: 0 auto;
}
.car div {
	height: 12vh;
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
	display: flex;
	align-items: center;
	text-align: left;
	width: 40%;
	font-size: 15px;
}
.carRent {
	width: 20%;
}
.carRent button {
	background-color: cadetblue;
	padding: 20px;
	border-radius: 10px;
	border: 1px solid blue;
}
</style>
