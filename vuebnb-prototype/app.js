var app = new Vue({
    el: '#app',
    data: {
        title: sample.title,
        address: sample.address,
        about: sample.about,
        headerImageStyle: {
            'background-image' : 'url(sample/header.jpg)'
        },
        amenities: sample.amenities,
        prices: sample.prices,
        isContracted: true,
        modalOpen: false,
        message: 'hello world!'
    },
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