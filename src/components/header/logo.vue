<template>
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489 87" width="489" height="87" fill="#2683c3">
            <defs id="defs1" />
            <!-- <style>
                .a {
                    opacity: 1;
                    fill: #2683c3
                }
            </style> -->
            <path fill-rule="evenodd" class="a" fill="#2683c3"
                d="M-2.83e-6,81.99999 14.999999,-1.01e-5 H 137.55534 L 154.1742,21.25408 143.36477,86.93647 115,86.99997 126.12704,21.25211 120.1742,13.93644 97.936479,13.98364 85.999999,87.00001 h -28 l 12,-73 -29.19057,0.11068 -11.80943,72.88932 H -2.83e-6 Z M 153,86.99999 168,-1.01e-5 h 28 L 192,28.99999 h 43 L 240,-1.01e-5 h 28 L 254,86.99999 h -29 l 7.09515,-43.76122 H 189 l -7,43.76122 z m 110,0 12,-66 24,-21.0000001 h 79 L 364,86.99999 h -29 l 5,-29 h -43 l -5,29 z m 40,-66 -3.57092,22.47576 43.38061,0.28546 4.28546,-29.23698 -36.61939,-0.0951 z M 373.3375,86.91561 384.675,21.69218 409.88593,-1.01e-5 H 489 l -0.0844,2.90313 -5.29531,25.8859301 -27.78906,-0.1247 1.3375,-14.50811 -36.32501,0.12657 -7.84374,7.71718 -2,10 -7.12656,40.84374 71.83125,-0.46406 -1.70469,14.62032 z" />
        </svg>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue';

export default {
    name: 'LogoSvgComponent',
    props: {
        styles: Object, // Assuming styles is an object prop
    },
    setup(props) {

        console.log(props.styles)
    }
};
</script>
  
<style scoped>
/* Your scoped styles go here */
svg {
    fill: #2683c3;
    max-width: 14rem;
    height: auto;
    width: 90%;
}

path {
    fill: var(--logo-color);
}
</style>
  