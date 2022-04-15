<template>
	<view>
		<zzx-calendar @selected-change="datechange"></zzx-calendar>
	</view>
</template>

<script>
import zzxCalendar from "@/components/zzx-calendar/zzx-calendar.vue"
export default {
	components: {
		zzxCalendar
	},
	data() {
		return {
		};
	},
	methods: {
		datechange(e) {
			console.log(e);
		}
	}
}

</script>

<style>

</style>
