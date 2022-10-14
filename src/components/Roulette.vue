<script>
export default {
    data() {
        return {
            canvasCtx: undefined,
            canvas: undefined,
            spinning: false,
            canvasRadius: 0.5,
            offset: 0.05
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
            
            this.canvasCtx.fillStyle = "black";
            this.canvasCtx.beginPath();
            this.canvasCtx.arc(size/2, size/2, r, 0, 2 * Math.PI, false);
            this.canvasCtx.fill();

            this.canvasCtx.strokeStyle = "red";
            this.canvasCtx.beginPath();
            this.canvasCtx.arc(size/2, size/2, r*(1-this.offset*2), 0, 2 * Math.PI, false);
            this.canvasCtx.stroke();

            r -= size*this.offset;

            this.canvasCtx.strokeStyle = "red";
            this.canvasCtx.fillStyle = "red";
            for(let i = 0; i < 20; i++) {
                const pointX = r*Math.sin(2*Math.PI*i/20) + size/2;
                const pointY = r*Math.cos(2*Math.PI*i/20) + size/2;

                this.canvasCtx.beginPath();
                this.canvasCtx.moveTo(pointX, pointY);
                this.canvasCtx.lineTo(size/2, size/2);
                this.canvasCtx.stroke();

                console.log(this.canvasCtx.getImageData(pointX, pointY, 1, 1))
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
    background-color: azure;
}
</style>