<template>
    <div class="home-container">
        <listing-summary-group v-for="( group, country ) in listing_groups" :key="country" :listings="group" :country="country" class="listing-summary-group"></listing-summary-group>
    </div>
</template>
<script>
import { groupByCountry } from '../js/helpers';
import ListingSummary from '../components/ListingSummary';
import axios from 'axios';
import ListingSummaryGroup from '../components/ListingSummaryGroup';

let serverData = JSON.parse(window.vuebnb_server_data);
let listing_groups = groupByCountry(serverData.listings);
export default {
    data() {
        return {
            listing_groups: []
        }
    },
    computed: {
        listing_groups() {
            return groupByCountry( this.$store.state.listing_summaries );
        }
    },
    components: {ListingSummaryGroup},
    methods: {
        assignData( { listings } ) {
            this.listing_groups = groupByCountry( listings );
        }
    },
    beforeRouteEnter( to,from, next ) {
        let serveData = JSON.parse( window.vuebnb_server_data );

        if( to.path === serverData.path ) {
            let listing_groups = groupByCountry( serverData.listings );
            next( component => component.listing_groups = listing_groups );
        }
        else {
            axios.get( '/api/' ).then(({data}) => {
                let listing_groups = groupByCountry( data.listings );
                next( component => component.listing_groups = listing_groups );
            }) ;
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
    justify-content: spacebetween;
    overflow: hidden;
}

.listing-summaries > .listing-summary {
    marginright: 15px;
}

.listing-summaries > .listing-summary:last-child {
    margin-right: 0;
}
</style>