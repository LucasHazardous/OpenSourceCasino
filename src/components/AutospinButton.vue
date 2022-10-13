<script>
    export default {
        props: ["autospinning"]
    }
</script>

<template>
    <button class="autospinButton" :class="autospinning ? 'enabledAutospin' : ''">
        <slot></slot>
    </button>
</template>

<style scoped>
.autospinButton {
    background-color: #b4e995;
    border-radius: 1.5rem;
    color: black;
    cursor: pointer;
    padding: 3.5%;
    text-align: center;
    text-decoration: none;
    transition: all 250ms;
    border: 0;
    font-size: 1.2rem;
}

.enabledAutospin {
    background-color: #f00068;
    opacity: 0.7;
    color: azure;
}

.autospinButton:hover {
    box-shadow: rgba(255, 255, 255, 0.3) 0px 1.5rem 3rem 0.2rem;
}
</style>