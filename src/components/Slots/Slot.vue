<script>
export default {
    data() {
        return {
            slotValues: ["$", "0", "7", "-", "="]
        }
    },
    methods: {
        spin(spinCount) {
            const slotValueElement = this.$refs.slotValue;
            const slotValues = this.slotValues;
            slotValueElement.style.background = "#d7ffc0";
            
            return new Promise((resolve, reject) => {
                function spinRec() {
                    if (spinCount <= 0) {
                        slotValueElement.style.background = "#b4e995";
                        return resolve(slotValueElement.innerText);
                    }
                    slotValueElement.innerText = slotValues[Math.floor(Math.random() * slotValues.length)];
                    setTimeout(spinRec, 200, --spinCount);
                }
                spinRec();
            });
        }
    }
}
</script>

<template>
    <div ref="slotValue" id="slotValue">$</div>
</template>

<style scoped>
#slotValue {
    color: azure;
    background-color: #b4e995;
    border: 3px solid #000000;
    font-size: 110%;
    border-radius: 0.7rem;
    width: 1%;
    height: 1%;
    font-weight: 900;
    color: black;
}
</style>