<script setup>
defineProps({
    bets: {
        type: Array,
        required: true
    }
})
</script>

<script>
export default {
    data() {
        return {
            value: this.$props.bets[0]
        }
    },
    methods: {
        changeValue() {
            this.value = this.$refs.betValue.value;
        }
    }
}
</script>

<template>
    <select @change="changeValue" ref="betValue">
        <option v-for="bet in bets" :value="bet">{{ bet }}</option>
    </select>
</template>

<style scoped>
select {
    color: azure;
    appearance: none;
    text-align: center;
    width: 20%;
    font-size: 120%;
    padding: 1%;
    background-color: #1f1f1f;
    border: 4px solid #121212;
}

select:focus+.focus {
    border: 2px solid azure;
}
</style>