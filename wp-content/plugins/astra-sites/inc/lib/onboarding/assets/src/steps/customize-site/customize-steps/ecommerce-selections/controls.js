import React from 'react';
import { __ } from '@wordpress/i18n';
import Button from '../../../../components/button/button';
import { useStateValue } from '../../../../store/store';
import PreviousStepLink from '../../../../components/util/previous-step-link/index';
import ChooseEcommerce from '../../../../components/choose-ecommerce';

const EcommerceSelectionsControls = () => {
	const [ { currentCustomizeIndex, currentIndex, templateId }, dispatch ] =
		useStateValue();
	const nextStep = () => {
		dispatch( {
			type: 'set',
			currentCustomizeIndex: currentCustomizeIndex + 1,
		} );
	};

	const lastStep = () => {
		setTimeout( () => {
			dispatch( {
				type: 'set',
				currentIndex: currentIndex - 1,
				currentCustomizeIndex: 0,
			} );
		}, 300 );
	};
	const disabledClass = templateId === 0 ? 'disabled-btn' : '';

	return (
		<>
			<ChooseEcommerce />
			<Button
				className={ `ist-button ist-next-step ${ disabledClass }` }
				onClick={ nextStep }
				disabled={ templateId !== 0 ? false : true }
				after
			>
				{ __( 'Continue', 'astra-sites' ) }
			</Button>

			<PreviousStepLink onClick={ lastStep }>
				{ __( 'Back', 'astra-sites' ) }
			</PreviousStepLink>
		</>
	);
};

export default EcommerceSelectionsControls;
