import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import { withDispatch, useSelect, useDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import apiFetch from '@wordpress/api-fetch';
import NavigationButtons from './navigation-buttons';
import { classNames, toastBody } from './helpers';
import { STORE_KEY } from './store';
import { ColumnItem } from './components/column-item';
// import ConfirmationPopup from './confirmation-popup';
import Input from './components/input';
import KeywordSuggestions from './components/keyword-suggestions';
// import ConfirmationModal from './confirm-details-popup';
import Divider from './components/divider';

const SelectTemplate = ( {
	onClickPrevious,

	onClickNext,
} ) => {
	// const [
	// 	// hasScrollReachedEnd,
	// 	setHasScrollReachedEnd,
	// ] = useState( false );

	const {
		// setWebsiteImagesAIStep,
		// toggleOnboardingAIStep,
		setWebsiteTemplatesAIStep,
		setWebsiteSelectedTemplateAIStep,
		setWebsiteTemplateSearchResultsAIStep,
	} = useDispatch( STORE_KEY );

	const {
		stepsData: {
			businessName,
			keywords = [],
			businessType,
			// templateList,
			selectedTemplate,
			templateSearchResults,
		},
		// allPatternsCategories,
		// isNewUser,
	} = useSelect( ( select ) => {
		const { getAIStepData, getAllPatternsCategories, getOnboardingAI } =
			select( STORE_KEY );

		const onboardingAI = getOnboardingAI();

		return {
			stepsData: getAIStepData(),
			allPatternsCategories: getAllPatternsCategories(),
			isNewUser: onboardingAI?.isNewUser,
		};
	} );

	const parentContainer = useRef( null );
	const templatesContainer = useRef( null );

	// const handleSaveDetails = async ( event ) => {
	// 	event.preventDefault();
	// 	const formData = new window.FormData();

	// 	formData.append( 'action', 'ast-block-templates-ai-content' );
	// 	formData.append( 'security', astraSitesVars.ai_content_ajax_nonce );
	// 	formData.append( 'business_name', businessName );
	// 	formData.append( 'business_desc', businessDetails );
	// 	formData.append( 'business_category', businessType.slug );
	// 	formData.append( 'images', JSON.stringify( selectedImages ) );
	// 	formData.append( 'image_keywords', JSON.stringify( keywords ) );
	// 	formData.append( 'business_address', businessContact?.address || '' );
	// 	formData.append( 'business_phone', businessContact?.phone || '' );
	// 	formData.append( 'business_email', businessContact?.email || '' );
	// 	formData.append(
	// 		'social_profiles',
	// 		JSON.stringify( businessContact?.socialMedia || [] )
	// 	);

	// 	await apiFetch( {
	// 		url: 'zipwp/v1/user-details',
	// 		method: 'POST',
	// 		body: formData,
	// 	} ).then( ( response ) => {
	// 		if ( response.success ) {
	// 			// Close the onboarding screen on success.
	// 			toggleOnboardingAIStep();
	// 			if ( response?.data.images.length > 0 ) {
	// 				setWebsiteImagesAIStep( response.data.images );
	// 			}
	// 		} else {
	// 			// TODO: Handle error.
	// 		}
	// 	} );
	// };

	const TEMPLATE_TYPE = {
		RECOMMENDED: 'recommended',
		PARTIAL: 'partial',
		GENERIC: 'generic',
	};

	const getTemplates = ( type ) => {
		const { RECOMMENDED, GENERIC, PARTIAL } = TEMPLATE_TYPE;
		switch ( type ) {
			case RECOMMENDED:
				return templateSearchResults?.[ 0 ]?.designs || [];
			case PARTIAL:
				return templateSearchResults?.[ 1 ]?.designs || [];
			case GENERIC:
				return templateSearchResults?.[ 2 ]?.designs || [];
		}
	};

	const getInitialUserKeyword = () => {
		const type = businessType.name?.toLowerCase();
		if ( type !== 'others' ) {
			return type;
		} else if ( keywords?.length > 0 ) {
			return keywords[ 0 ];
		}
		return businessName;
	};

	console.log( { keywords } );
	const fetchTemplates = async ( keyword = getInitialUserKeyword() ) => {
		if ( ! keyword ) return;

		setWebsiteTemplatesAIStep( [] );

		try {
			const res = await apiFetch( {
				path: 'zipwp/v1/templates',
				method: 'POST',
				data: {
					keyword,
					business_name: businessName,
				},
			} );

			const results = res?.data?.data || [];

			// Get the the designs in sequence
			const allTemplatesList = [];
			results.forEach( ( item ) => {
				if ( Array.isArray( item.designs ) ) {
					allTemplatesList.push( ...item.designs );
				}
			} );

			setWebsiteTemplatesAIStep( allTemplatesList );
			setWebsiteTemplateSearchResultsAIStep( results );
		} catch ( error ) {
			toast.error(
				toastBody( {
					message:
						error?.response?.data?.message ||
						'Error while fetching templates',
				} )
			);
		}
	};

	useEffect( () => {
		fetchTemplates();
	}, [] );

	const searchInputRef = useRef( null );

	const [ userKeywords, setUserKeywords ] = useState( [
		getInitialUserKeyword(),
	] );

	const getSuggestedKeywords = () => {
		return [ ...new Set( keywords ) ].filter(
			( keyword ) => ! userKeywords.includes( keyword )
		);
	};

	const handleClickSuggestedKeywords = ( keyword ) => {
		searchInputRef.current.value = keyword;

		setUserKeywords( [ keyword ] );
		fetchTemplates( keyword );
		setWebsiteSelectedTemplateAIStep( '' );
	};

	return (
		<div
			ref={ parentContainer }
			className={ twMerge(
				`mx-auto flex flex-col overflow-x-hidden`,
				'w-full'
			) }
		>
			<div className="space-y-5 px-5 md:px-10 lg:px-14 xl:px-15 pt-12">
				<h1>Choose the structure for your website</h1>
				<p className="text-base font-normal leading-6 text-app-text">
					Select your preferred structure for your website from the
					options below.
				</p>
			</div>

			<div className="sticky -top-1.5 z-10 pt-4 bg-zip-app-light-bg px-5 md:px-10 lg:px-14 xl:px-15">
				<Input
					ref={ searchInputRef }
					defaultValue={ userKeywords[ 0 ] }
					placeholder="Add a keyword"
					enableDebounce
					onChange={ ( e ) => {
						const newValue = e.target.value;
						setUserKeywords( [ newValue ] );
						fetchTemplates( newValue );
						setWebsiteSelectedTemplateAIStep( '' );
					} }
					height="12"
				/>
				<KeywordSuggestions
					className="my-3"
					keywords={ getSuggestedKeywords() }
					onClick={ handleClickSuggestedKeywords }
				/>
				<Divider className="mt-4 mb-0" />
			</div>

			<div
				ref={ templatesContainer }
				className={ classNames(
					// 'min-h-[calc(100svh_-_120px)] max-h-[calc(100svh_-_120px)] pb-2 px-10 lg:px-16 xl:px-0 overflow-x-hidden overflow-y-auto',
					'custom-confirmation-modal-scrollbar', // class for thin scrollbar
					'relative',
					'mt-4',
					'px-5 md:px-10 lg:px-14 xl:px-15',
					'xl:max-w-full'
				) }
			>
				{ !! (
					getTemplates( TEMPLATE_TYPE.RECOMMENDED )?.length ||
					getTemplates( TEMPLATE_TYPE.PARTIAL )?.length
				) && (
					<>
						<div
							ref={ templatesContainer }
							className={ classNames(
								'flex flex-row flex-wrap items-start gap-10 mb-10'
							) }
						>
							{ getTemplates( TEMPLATE_TYPE.RECOMMENDED )?.map(
								( template, index ) => (
									<ColumnItem
										key={ template.uuid }
										template={ template }
										isRecommended
										position={ index + 1 }
									/>
								)
							) }
							{ getTemplates( TEMPLATE_TYPE.PARTIAL )?.map(
								( template, index ) => (
									<ColumnItem
										key={ template.uuid }
										template={ template }
										position={
											index +
											1 +
											( getTemplates(
												TEMPLATE_TYPE.RECOMMENDED
											)?.length || 0 )
										}
									/>
								)
							) }
						</div>
					</>
				) }
				{ getTemplates( TEMPLATE_TYPE.GENERIC )?.length ? (
					<>
						{ !! (
							getTemplates( TEMPLATE_TYPE.RECOMMENDED )?.length ||
							getTemplates( TEMPLATE_TYPE.PARTIAL )?.length
						) && (
							<div className="mb-5 text-xl font-semibold">
								You may also like
							</div>
						) }
						<div
							ref={ templatesContainer }
							className={ classNames(
								'flex flex-row flex-wrap items-start gap-10'
							) }
						>
							{ getTemplates( TEMPLATE_TYPE.GENERIC )?.map(
								( template, index ) => (
									<ColumnItem
										key={ template.uuid }
										template={ template }
										position={
											index +
											1 +
											( ( getTemplates(
												TEMPLATE_TYPE.RECOMMENDED
											)?.length || 0 ) +
												( getTemplates(
													TEMPLATE_TYPE.PARTIAL
												)?.length || 0 ) )
										}
									/>
								)
							) }
						</div>
					</>
				) : (
					''
				) }
			</div>

			<div className="sticky bottom-0 pb-6 bg-zip-app-light-bg pt-6 px-5 md:px-10 lg:px-14 xl:px-15">
				{ /* { ! hasScrollReachedEnd && (
					<div className="relative w-full pointer-events-none">
						<div
							className="h-[8rem] absolute top-[-8rem] w-full"
							style={ {
								background:
									'linear-gradient(180deg, rgba(240, 244, 250, 0.00) 0%, #F0F4FA 100%)',
							} }
						/>
					</div>
				) } */ }
				<NavigationButtons
					onClickPrevious={ onClickPrevious }
					onClickContinue={ onClickNext }
					disableContinue={ ! selectedTemplate }
				/>
			</div>

			{ /* <div className="sticky bottom-0 pt-3 pb-8 bg-app-light-background px-10 lg:px-16 xl:px-36">
				<NavigationButtons
					onClickPrevious={ onClickPrevious }
					onClickContinue={ handleOpenConfirmationPopup }
					disableContinue={ ! selectedTemplate }
				/>
			</div> */ }

			{/* <ConfirmationModal
				open={ openConfirmationPopup }
				setOpen={ setOpenConfirmationPopup }
				onClickGenerate={ handleGenerateContent }
			/> */}
		</div>
	);
};

export default compose(
	withDispatch( ( dispatch ) => {
		const { setNextAIStep, setPreviousAIStep } = dispatch( STORE_KEY );

		return {
			onClickNext: setNextAIStep,
			onClickPrevious: setPreviousAIStep,
		};
	} )
)( SelectTemplate );
