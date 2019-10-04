import "core-js/fn/object/assign";
import Vue from 'vue';
import { populateAmenitiesAndPrices } from './helpers';
if ( typeof Object.assign != 'function' ) {
    Object.assign;
}
let model = JSON.parse(window.vuebnb_listing_model);
model = populateAmenitiesAndPrices(model);
Vue.component( 'image-carousel', {
    template: '<div class="image-carousel"><img :src="images[index]"></div>',
    data() {
        return {
            images: [
                '/images/1/Image_1.jpg',
                '/images/1/Image_2.jpg',
                '/images/1/Image_3.jpg',
                '/images/1/Image_4.jpg'
            ],
            index: 0
        }
    }
});
var app = new Vue({
    el: '#app',
    data: Object.assign( model, {
        headerImageStyle: { 'background-image': 'url(' + model.images[0] + ')' },
        isContracted: true,
        modalOpen: false
    }),
    watch: {
        modalOpen: function () {
            var className = 'modal-open';
            if ( this.modalOpen )
            {
                document.body.classList.add( className );
            }
            else
            {
                document.body.classList.remove( className );
            }
        }
    },
    methods: {
        escapeKeyListener: function ( evt ) {
            if ( evt.keyCode === 27 && this.modalOpen )
            {
                this.modalOpen = false;
            }
        }
    },
    created: function () {
        document.addEventListener( 'keyup', this.escapeKeyListener );
    },
    destroyed: function () {
        document.removeEventListener( 'keyup', this.escapeKeyListener );
    }
});