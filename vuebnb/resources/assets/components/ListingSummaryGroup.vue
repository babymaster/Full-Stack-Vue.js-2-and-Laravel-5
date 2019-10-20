<template>
    <div class="listing-summary-group">
        <h1>Place in {{ country }}</h1>
        <div class="listing-carousel">
            <div class="controls">
                <carousel-control dir="left" @change-image="change"></carousel-control>
                <carousel-control dir="right" @change-image="change"></carousel-control>
            </div>
            <div class="listing-summaries-wrapper">
                <div class="listing-summaries" :style="style">
                    <listing-summary v-for="listing in listings" :key="listing.id" :listing="listing"></listing-summary>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ListingSummary from '../components/ListingSummary';
import CarouselControl from '../components/CarouselControl';
const rowSize = 3; 
const listingSummaryWidth = 365;
export default {
    data() {
        return {
            offset: 0
        }
    },
    methods: {
        change( val ) {
            let newVal = this.offset + parseInt(val);
            if ( newVal >= 0 && newVal <= this.listings.length - rowSize )
            {
                this.offset = newVal;
            }
        }
    },

    props: [ 'country', 'listings' ],
    components: {ListingSummary, CarouselControl},
    computed: {
        style() {
            return { ttransform: `translateX(${this.offset * -listingSummaryWidth}px)` }
        }
    }
}
</script>
<style>
.listing-summary-group {
    padding-bottom: 20px;
}

.listing-summaries { 
    display: flex;
    flex-direction: row; 
    justify-content: space-between; 
    transition: transform 0.5s; 
}

.listing-summaries > .listing-summary {
    marginright: 15px;
}

.listing-summaries > .listing-summary:last-child {
    margin-right: 0;
}
.listing-carousel {
    position: relative;
}

.listing-carousel .controls {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: calc(50% - 45px);
    left: -45px;
    width: calc(100% + 90px);
}

.listing-carousel .controls .carousel-control {
    color: #c5c5c5;
    font-size: 1.5rem;
    cursor: pointer;
}

.listing-summaries-wrapper {
    overflow: hidden;
}
.listing-summaries { 
    display: flex; 
    flex-direction: row;
    justify-content: space-between; 
}
</style>