<script>
export default {
    props: ["cards", "dealerHide"]
}
</script>

<template>
    <div id="cardContainer">
        {{ dealerHide ? cards[0] + " | ?" : cards.join(" | ") }}
    </div>
</template>

<style scoped>
#cardContainer {
    color: azure;
}
</style>