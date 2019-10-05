import "core-js/fn/object/assign";
import Vue from 'vue';
import { populateAmenitiesAndPrices } from './helpers';
if ( typeof Object.assign != 'function' ) {
    Object.assign;
}

let model = JSON.parse(window.vuebnb_listing_model);
model = populateAmenitiesAndPrices(model);
Vue.component( 'image-carousel', {
    template:
        '<div class="image-carousel">' +
            '<img :src="image">' +
            '<div class="controls">' +
                '<carousel-control dir="left" @change-image="changeImage"></carousel-control>' +
                '<carousel-control dir="right" @change-image="changeImage"></carousel-control>' +
            '</div>' +
        '</div>',
    data() {
        return {
            index: 0
        }
    },
    props: ['images'],
    computed: {
        image() {
            return this.images[this.index];
        }
    },
    methods: {
      changeImage( val ) {
          let newVal = this.index + parseInt( val );
          if ( newVal < 0 )
          {
              this.index = this.images.length -1;
          }
          else if ( newVal === this.images.length )
          {
              this.index = 0;
          }
          else
          {
              this.index = newVal;
          }
      }
    },
    components: {
        'carousel-control' : {
            template: '<i :class="classes" @click="clicked"></i>',
            props: ['dir'],
            computed: {
                classes() {
                    return 'carousel-control fa fa-2x fa-angle-' + this.dir;
                }
            },
            methods: {
                clicked() {
                    this.$emit( 'change-image', this.dir === 'left' ? -1 : 1 );
                }
            }
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