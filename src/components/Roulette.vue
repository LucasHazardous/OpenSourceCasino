<script>
export default {
    data() {
        return {
            canvasCtx: undefined,
            canvas: undefined,
            spinning: false,
            canvasRadius: 0.5,
            offset: 0.05,
            fieldCount: 20,
            ballSize: 0.05,
            initialMoveDelay: 10,
            moveDelayDelta: 10
        }
    },
    mounted() {
        this.canvas = this.$refs.roulette;
        this.canvasCtx = this.canvas.getContext("2d");

        window.addEventListener("resize", this.rescaleCanvas);
        this.rescaleCanvas();
        const size = this.canvas.width;
        this.drawFreshWheel(size, size*this.canvasRadius, size/2, size/2);
    },
    methods: {
        spin() {
            this.spinning = true;

            const size = this.canvas.width;
            let r = this.canvasRadius * size;
            const centerX = size / 2;
            const centerY = size / 2;

            let i = 0;
            const drawWheelWithBall = this.drawWheelWithBall;
            const moveDelayDelta = this.moveDelayDelta;

            const maxDelay = Math.floor(Math.random() * 101) + 200;

            return new Promise((resolve, reject) => {
                function spinRec(moveDelay) {
                    if (moveDelay >= maxDelay) {
                        return resolve(i % 2 == 0 ? "black" : "red");
                    }
                    drawWheelWithBall(size, r, centerX, centerY, i++);
                    setTimeout(spinRec, moveDelay, moveDelay + moveDelayDelta * Math.floor(Math.random() * 2));
                }
                spinRec(this.initialMoveDelay);
            });
        },
        drawWheelWithBall(size, r, centerX, centerY, i) {
            this.drawFreshWheel(size, r, centerX, centerY);

            this.canvasCtx.fillStyle = "white";
            this.canvasCtx.beginPath();
            const pointX = (r - size * this.ballSize * 2) * Math.sin(2 * Math.PI * i / this.fieldCount) + centerX;
            const pointY = (r - size * this.ballSize * 2) * Math.cos(2 * Math.PI * i / this.fieldCount) + centerY;
            this.canvasCtx.arc(pointX, pointY, size * this.ballSize, 0, 2 * Math.PI);
            this.canvasCtx.fill();
        },
        rescaleCanvas() {
            if (this.spinning) return;
            this.canvas.width = window.innerHeight / 3.5;
            this.canvas.height = window.innerHeight / 3.5;

            const size = this.canvas.height;
            this.drawFreshWheel(size, size*this.canvasRadius, size/2, size/2);
        },
        drawFreshWheel(size, r, centerX, centerY) {
            this.canvasCtx.fillStyle = "black";
            this.canvasCtx.beginPath();
            this.canvasCtx.arc(centerX, centerY, r, 0, 2 * Math.PI, false);
            this.canvasCtx.fill();

            this.canvasCtx.strokeStyle = "red";
            this.canvasCtx.beginPath();
            this.canvasCtx.arc(centerX, centerY, r * (1 - this.offset * 2), 0, 2 * Math.PI, false);
            this.canvasCtx.stroke();

            r -= size * this.offset;
            let radianSum = (1 / this.fieldCount) * Math.PI;

            for (let i = 0; i < this.fieldCount; i++) {
                const current = (1 / this.fieldCount) * 2 * Math.PI;

                this.canvasCtx.beginPath();
                this.canvasCtx.arc(centerX, centerY, r, radianSum, radianSum + current);
                radianSum += current;
                this.canvasCtx.lineTo(centerX, centerY);

                if (i % 2 == 0) this.canvasCtx.fillStyle = "red";
                else this.canvasCtx.fillStyle = "black";

                this.canvasCtx.fill();
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