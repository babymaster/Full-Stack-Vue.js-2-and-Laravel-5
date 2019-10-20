<template>
    <div>
        <header-image v-if="listing.images[0]" :image-url="listing.images[0]" @header-clicked="openModal" :id="listing.id"></header-image>
            <div class="container">
        <div class="heading">
            <h1>{{ listing.title }}</h1>
            <p>{{ listing.address }}</p>
        </div>
        <div class="about">
            <h3>About this listing</h3>
            <expandable-text>{{listing.about}}</expandable-text>
        </div>
        <div class="lists">
            <feature-list title="Amenities" :items="listing.amenities">
                <template slot-scope="amenity">
                    <i class="fa fa-lg" :class="amenity.icon"></i>
                    <span>{{amenity.title}}</span>
                </template>
            </feature-list>
            <feature-list title="Prices" :items="listing.prices">
                <template slot-scope="price">
                    {{price.title}}: <strong>{{price.value}}</strong>
                </template>
            </feature-list>
        </div>
    </div>
    <modal-window ref="imagemodal">
        <image-carousel :images="listing.images"></image-carousel>
    </modal-window>
    </div>
</template>
<script>
    import { populateAmenitiesAndPrices } from '../js/helpers';

    let serverData = JSON.parse(window.vuebnb_server_data);
    let model = populateAmenitiesAndPrices(serverData.listing);

    import HeaderImage from '../components/HeaderImage';
    import ModalWindow from '../components/ModalWindow';
    import ImageCarousel from '../components/ImageCarousel';
    import FeatureList from '../components/FeatureList';
    import ExpandableText from '../components/ExpandableText';

    export default {
        data() {
            return {
                title: null, about: null, address: null, amenities: [], prices: [], images: [], id: null
            }
        },
        computed: {
            listing() {
                return populateAmenitiesAndPrices(
                    this.$store.getters.getListing(this.$route.params.listing)
                );
            }
        },
        components: {ImageCarousel, ModalWindow, HeaderImage, FeatureList, ExpandableText},
        methods: {
            assignData({ listing }) {
                Object.assign( this.$data, populateAmenitiesAndPrices( listing ) )
            },
            openModal() {
                this.$refs.imagemodal.modalOpen = true;
            }
        }
    }
</script>
<style>
.about { margin-top: 2em; } 
.about h3 { fontsize: 22px; } 
.about p { white-space: pre-wrap; }

.about p.contracted { height: 250px; overflow: hidden;}
</style>