<script>
export default {
    props: ["cards"]
}
</script>

<template>
    <div id="cardContainer">
        {{ cards.join(" ") }}
    </div>
</template>

<style scoped>
</style>