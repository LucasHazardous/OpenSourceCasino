<script>
export default {
    props: ["cards", "dealerHide"]
}
</script>

<template>
    <div class="cardTable">
        <div v-for="card in (dealerHide ? cards.slice(0, 1) : cards)" class="cardContainer">
            <div class="upValue">{{ card.slice(2, 4) }}</div>
            <div class="img" :style="card[0] == '♦' || card[0] == '♥' ? 'color: red;' : 'color: black;'">{{ card[0] }}</div>
            <div class="downValue">{{ card.slice(2, 4) }}</div>
        </div>
        <div v-if="dealerHide" class="cardContainer">
            <div class="upValue">?</div>
            <div class="imgUnknown">?</div>
            <div class="downValue">?</div>
        </div>
    </div>
</template>

<style scoped>
.cardTable {
    padding: 1%;
}

.cardContainer {
    background-color: azure;
    text-align: center;
    display: inline-block;
    outline: 2px solid black;
    max-width: 6rem;
    width: 15%;
    margin-left: 1%;
}

.upValue {
    text-align: left;
}

.img {
    text-align: center;
    margin-top: 2rem;
    font-size: large;
}

.imgUnknown {
    margin-top: 2rem;
    font-size: large;
}

.downValue {
    text-align: right;
    margin-top: 2rem;
}
</style>