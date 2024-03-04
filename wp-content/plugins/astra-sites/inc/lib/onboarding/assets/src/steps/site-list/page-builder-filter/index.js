import React from 'react';
import { ToggleDropdown } from '@brainstormforce/starter-templates-components';
import { __ } from '@wordpress/i18n';
import { useStateValue } from '../../../store/store';
import { initialState } from '../../../store/reducer';
const { imageDir, isBrizyEnabled, isElementorDisabled } = starterTemplates;

const PageBuilder = () => {
	const [ { builder }, dispatch ] = useStateValue();
	if ( builder === 'fse' ) {
		return null;
	}
	const buildersList = [
		{
			id: 'gutenberg',
			title: __( 'Block Editor', 'astra-sites' ),
			image: `${ imageDir }block-editor.svg`,
		},
		{
			id: 'elementor',
			title: __( 'Elementor', 'astra-sites' ),
			image: `${ imageDir }elementor.svg`,
		},
		{
			id: 'beaver-builder',
			title: __( 'Beaver Builder', 'astra-sites' ),
			image: `${ imageDir }beaver-builder.svg`,
		},
	];

	if ( isBrizyEnabled === '1' ) {
		buildersList.push( {
			id: 'brizy',
			title: __( 'Brizy', 'astra-sites' ),
			image: `${ imageDir }brizy.svg`,
		} );
	}

	if ( isElementorDisabled === '1' ) {
		// Find the index of the Elementor builder in the array.
		const indexToRemove = buildersList.findIndex(
			( pageBuilder ) => pageBuilder.id === 'elementor'
		);

		// Remove the Elementor builder if it exists.
		if ( indexToRemove !== -1 ) {
			buildersList.splice( indexToRemove, 1 );
		}
	}

	return (
		<div className="st-page-builder-filter">
			<ToggleDropdown
				value={ builder }
				options={ buildersList }
				className="st-page-builder-toggle"
				onClick={ ( event, option ) => {
					dispatch( {
						type: 'set',
						builder: option.id,
						siteSearchTerm: '',
						siteBusinessType: initialState.siteBusinessType,
						selectedMegaMenu: initialState.selectedMegaMenu,
						siteType: '',
						siteOrder: 'popular',
						onMyFavorite: false,
					} );

					const content = new FormData();
					content.append(
						'action',
						'astra-sites-change-page-builder'
					);
					content.append( '_ajax_nonce', astraSitesVars._ajax_nonce );
					content.append( 'page_builder', option.id );

					fetch( ajaxurl, {
						method: 'post',
						body: content,
					} );
				} }
			/>
		</div>
	);
};

export default PageBuilder;
