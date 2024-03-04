$ = jQuery
// Search input view controller.
var AstraSearch = wp.Backbone.View.extend({

    tagName: 'input',
    className: 'ast-image__search',
    id: 'ast-image-search-input',
    searching: false,
    images: [],
    attributes: {
        placeholder: astraImages.search_placeholder,
        type: 'search',
        'aria-describedby': 'live-search-desc'
    },

    events: {
        'search' : 'search',
        'keyup': 'search',
        'blur': 'pushState',
        'infinite': 'infinite',
    },

    initialize: function( options ) {

        this.parent = options.parent;
    },

    infinite: function( event ) {

        // Since doSearch is debounced, it will only run when user input comes to a rest.
        this.doSearch( event );
    },

    search: function( event ) {

        // Clear on escape.
        if ( event.type === 'keyup' && event.which === 27 ) {
            event.target.value = '';
        }
        if( '' == event.target.value ) {
            this.$el.removeClass('has-input');
        } else {
            this.$el.addClass('has-input');
        }

        $scope.find( '.ast-image__skeleton' ).animate({ scrollTop: 0 }, 0 );
        $( 'body' ).data( 'page', 1 );
        AstraImageCommon.infiniteLoad = false;

        let thisObject = this;
        setTimeout( function(){
            thisObject.doSearch( event );
        }, 1500 );
    },

    // Runs a search on the theme collection.
    doSearch: function( event ) {

        if ( this.searching ) {
            return;
        }

        let thisObject = this;
        thisObject.searching = true;
        AstraImageCommon.config.q = event.target.value;

		// Do Image Search.
		$.ajax({
			url: astraImages.ajaxurl,
			type: 'POST',
			data: {
				'action' : 'astra-sites-search-images',
				'params' : AstraImageCommon.config,
				'_ajax_nonce' : astraImages._ajax_nonce,
			},
			beforeSend: function () {
				console.groupCollapsed('Requesting Pixabay API');
			}
		})
		.fail(function( jqXHR ){
			console.log( jqXHR );
			console.groupEnd();
		})
		.done(function (response) {
			console.log('Response:');
			console.log( response );
			console.groupEnd();

			if (response.success) {
				thisObject.searching = false;
				this.images = response.data.hits;
				wp.media.view.AstraAttachmentsBrowser.images = this.images;
			}

			$( document ).trigger( 'ast-image__refresh' );
		});

    },

    pushState: function( event ) {
        $( document ).trigger( 'ast-image__refresh' );
    }
});

module.exports = AstraSearch;
