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
            slotValueElement.style.border = "3px solid aquamarine";
            
            return new Promise((resolve, reject) => {
                function spinRec() {
                    if (spinCount <= 0) {
                        slotValueElement.style.border = "3px solid #000000";
                        return resolve();
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
    background-color: #121212;
    border: 3px solid #000000;
    width: 1%;
    height: 1%;
}
</style>