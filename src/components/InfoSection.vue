<script>
export default {
    data() {
        return {
            visible: false
        }
    }
}
</script>

<template>
    <main>
        <button id="infoButton" @click="visible = !visible">Info</button>
        <div id="infoContent" :style="'display: ' + (visible ? 'block' : 'none')">
            <slot></slot>
        </div>
    </main>
</template>

<style scoped>
main {
    padding: 10%;
}

#infoButton {
    padding: 0.5%;
    font-size: 120%;
    border: none;
    background-color: #b4e995;
    border-radius: 0.3rem;
    outline: none;
}

#infoButton:hover {
    background-color: #d7ffc0;
}

#infoContent {
    text-align: center;
    padding: 1%;
    margin-top: 2%;
    background-color: #d7ffc0;
    width: 80%;
    margin-left: 10%;
}
</style>