<script>
export default {
    data() {
        return {
            canvasCtx: undefined,
            canvas: undefined
        }
    },
    mounted() {
        this.canvas = this.$refs.roulette;
        this.canvasCtx = this.canvas.getContext("2d");

        window.addEventListener("resize", this.rescaleCanvas);
        this.rescaleCanvas();
    },
    methods: {
        spin() {
            
        },
        rescaleCanvas() {
            this.canvas.width = window.innerHeight/3.5;
            this.canvas.height = window.innerHeight/3.5;
        }
    }
}
</script>

<template>
    <canvas ref="roulette"></canvas>
</template>

<style scoped>
canvas {
    background-color: azure;
}
</style>