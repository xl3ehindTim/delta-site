import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import Button from '../../../../../components/button/button';
import MediaUploader from '../../../../../components/media-uploader';
import { useStateValue } from '../../../../../store/store';
// import PreviousStepLink from '../../../../../components/util/previous-step-link/index';
import { sendPostMessage } from '../../../../../utils/functions';
import { classNames } from '../../../helpers';
import { STORE_KEY } from '../../../store';

const BusinessLogoControls = () => {
	const [
		{
			siteLogo,
			currentCustomizeIndex,
			// currentIndex,
			// templateId,
		},
		dispatch,
	] = useStateValue();
	const nextStep = () => {
		dispatch( {
			type: 'set',
			currentCustomizeIndex: currentCustomizeIndex + 1,
		} );
	};

	const { businessName } = useSelect( ( select ) => {
		const { getAIStepData } = select( STORE_KEY );
		return getAIStepData();
	} );

	useEffect( () => {
		sendPostMessage( {
			param: 'siteTitle',
			data: businessName,
		} );
	}, [] );

	// const lastStep = () => {
	// 	sendPostMessage( {
	// 		param: 'clearPreviewAssets',
	// 		data: {},
	// 	} );
	// 	setTimeout( () => {
	// 		dispatch( {
	// 			type: 'set',
	// 			// currentIndex: currentIndex - 1,
	// 			currentCustomizeIndex: 0,
	// 		} );
	// 	}, 300 );
	// };
	// const disabledClass = templateId === 0 ? 'disabled-btn' : '';

	return (
		<>
			<MediaUploader />
			<Button
				className={ classNames(
					`ist-button ist-next-step`
					// disabledClass
				) }
				onClick={ nextStep }
				// disabled={ templateId !== 0 ? false : true }
				after
			>
				{ '' !== siteLogo.url
					? __( 'Continue', 'astra-sites' )
					: __( 'Skip & Continue', 'astra-sites' ) }
			</Button>

			{ /* <PreviousStepLink onClick={ lastStep }>
				{ __( 'Back', 'astra-sites' ) }
			</PreviousStepLink> */ }
		</>
	);
};

export default BusinessLogoControls;
