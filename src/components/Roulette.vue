<script>
export default {
    data() {
        return {
            canvasCtx: undefined,
            canvas: undefined,
            spinning: false,
            canvasRadius: 0.5,
            offset: 0.05,
            fieldCount: 20
        }
    },
    mounted() {
        this.canvas = this.$refs.roulette;
        this.canvasCtx = this.canvas.getContext("2d");

        window.addEventListener("resize", this.rescaleCanvas);
        this.rescaleCanvas();
        this.drawFreshWheel();
    },
    methods: {
        spin() {
            this.drawFreshWheel();
            this.spinning = true;
        },
        rescaleCanvas() {
            if(this.spinning) return;
            this.canvas.width = window.innerHeight/3.5;
            this.canvas.height = window.innerHeight/3.5;
            this.drawFreshWheel();
        },
        drawFreshWheel() {
            const size = this.canvas.width;
            let r = this.canvasRadius*size;
            const centerX = size/2;
            const centerY = size/2;

            this.canvasCtx.fillStyle = "black";
            this.canvasCtx.beginPath();
            this.canvasCtx.arc(centerX, centerY, r, 0, 2 * Math.PI, false);
            this.canvasCtx.fill();

            this.canvasCtx.strokeStyle = "red";
            this.canvasCtx.beginPath();
            this.canvasCtx.arc(centerX, centerY, r*(1-this.offset*2), 0, 2 * Math.PI, false);
            this.canvasCtx.stroke();

            r -= size*this.offset;

            for(let i = 0; i < this.fieldCount; i++) {
                const pointX = r*Math.sin(2*Math.PI*i/this.fieldCount) + centerX;
                const pointY = r*Math.cos(2*Math.PI*i/this.fieldCount) + centerY;

                this.canvasCtx.beginPath();
                this.canvasCtx.moveTo(pointX, pointY);
                this.canvasCtx.lineTo(centerX, centerY);
                this.canvasCtx.stroke();
            }
        }
    }
}
</script>

<template>
    <canvas ref="roulette"></canvas>
</template>

<style scoped>
canvas {
    margin-top: 5%;
}
</style>