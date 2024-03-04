import React, { useEffect, useState } from 'react';
import { Tooltip } from '@brainstormforce/starter-templates-components';
import { __ } from '@wordpress/i18n';
import { useStateValue } from '../../store/store';
import ICONS from '../../../icons';
import './style.scss';
import {
	getDemo,
	checkRequiredPlugins,
	checkFileSystemPermissions,
} from '../../steps/import-site/import-utils';
const { imageDir } = starterTemplates;

const ChooseEcommerce = () => {
	const storedState = useStateValue();
	const [
		{ selectedTemplateID, allSitesData, currentCustomizeIndex },
		dispatch,
	] = useStateValue();
	const [ checkedTemplateID, setCheckedTemplateID ] = useState();
	const selectedTemplate = allSitesData[ `id-${ selectedTemplateID }` ];
	const relatedTemplateID =
		selectedTemplate?.related_ecommerce_template !== '' &&
		selectedTemplate?.related_ecommerce_template !== undefined
			? selectedTemplate.related_ecommerce_template
			: '';
	if ( ! relatedTemplateID ) {
		dispatch( {
			type: 'set',
			currentCustomizeIndex: currentCustomizeIndex + 1, // Skip 1 step.
		} );
	}
	const changeEcommerceTemplate = async ( event ) => {
		event.stopPropagation();
		const newTemplateId = parseInt( event.target.value );
		dispatch( {
			type: 'set',
			templateId: newTemplateId,
		} );
		setCheckedTemplateID( newTemplateId );
		await getDemo( newTemplateId, storedState );
		await checkRequiredPlugins( storedState );
		checkFileSystemPermissions( storedState );
	};

	useEffect( () => {
		setCheckedTemplateID( selectedTemplateID );
	}, [] );

	return (
		<div className="customizer-ecommerce-selection">
			<label className="ist-customizer-heading" htmlFor="surecart">
				<div className="ist-image-section">
					<img
						className="ist-surecart-icon"
						alt="SureCart"
						src={ `${ imageDir }surecart-icon.svg` }
					/>
					<span> { __( 'SureCart', 'astra-sites' ) }</span>
					<Tooltip
						placement="top"
						className="custom-tooltip"
						content={
							<span>
								{ __(
									'A simple yet powerful e-commerce platform designed to grow your business with effortlessly selling online.',
									'astra-sites'
								) }
							</span>
						}
					>
						{ ICONS.questionMark }
					</Tooltip>
				</div>
				<input
					id="surecart"
					type="radio"
					name="ecommerce"
					value={ relatedTemplateID }
					checked={ checkedTemplateID === relatedTemplateID }
					onClick={ changeEcommerceTemplate }
				/>
			</label>
			<label className="ist-customizer-heading" htmlFor="woocommerce">
				<div className="ist-image-section">
					<img
						className="ist-woocommerce-icon"
						alt="WooCommerce"
						src={ `${ imageDir }woocommerce-icon.svg` }
					/>
					<span>{ __( 'WooCommerce', 'astra-sites' ) }</span>
					<Tooltip
						placement="bottom"
						className="custom-tooltip"
						content={
							<span>
								{ __(
									'WooCommerce is an open-source e-commerce plugin for WordPress. It is designed for small to large-sized online merchants using WordPress.',
									'astra-sites'
								) }
							</span>
						}
					>
						{ ICONS.questionMark }
					</Tooltip>
				</div>
				<input
					id="woocommerce"
					type="radio"
					name="ecommerce"
					value={ selectedTemplateID }
					checked={ checkedTemplateID === selectedTemplateID }
					onClick={ changeEcommerceTemplate }
				/>
			</label>
		</div>
	);
};

export default ChooseEcommerce;
