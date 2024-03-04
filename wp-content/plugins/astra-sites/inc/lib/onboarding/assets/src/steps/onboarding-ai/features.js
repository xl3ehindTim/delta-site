import { useEffect, useState } from 'react';
import {
	FunnelIcon,
	HeartIcon,
	PlayCircleIcon,
	SquaresPlusIcon,
	CheckIcon,
	ChatBubbleLeftEllipsisIcon,
	WrenchIcon
} from '@heroicons/react/24/outline';
import { useDispatch, useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { STORE_KEY } from './store';
import { classNames } from './helpers';
import NavigationButtons from './navigation-buttons';

const fetchStatus = {
	fetching: 'fetching',
	fetched: 'fetched',
	error: 'error',
};

const ICON_SET = {
	heart: HeartIcon,
	'squares-plus': SquaresPlusIcon,
	funnel: FunnelIcon,
	'play-circle': PlayCircleIcon,
	'live-chat' : ChatBubbleLeftEllipsisIcon,
};

const Features = () => {
	const {
		setSiteFeatures,
		storeSiteFeatures,
		setNextAIStep,
		setPreviousAIStep,
		setWebsiteInfoAIStep,
		setLimitExceedModal,
	} = useDispatch( STORE_KEY );
	const {
		siteFeatures,
		stepsData: {
			businessName,
			selectedImages = [],
			keywords = [],
			businessType,
			businessDetails,
			businessContact,
			selectedTemplate,
		},
	} = useSelect( ( select ) => {
		const { getSiteFeatures, getAIStepData } = select( STORE_KEY );

		return {
			siteFeatures: getSiteFeatures(),
			stepsData: getAIStepData(),
		};
	}, [] );
	const [ isFetchingStatus, setIsFetchingStatus ] = useState(
		fetchStatus.fetching
	);
	const [ isInProgress, setIsInProgress ] = useState( false );

	const fetchSiteFeatures = async () => {
		const response = await apiFetch( {
			path: 'zipwp/v1/site-features',
			method: 'GET',
			headers: {
				'X-WP-Nonce': astraSitesVars.rest_api_nonce,
			},
		} );

		if ( response?.success ) {
			// Store to state.
			storeSiteFeatures( response.data.data );

			// Set status to fetched.
			return setIsFetchingStatus( fetchStatus.fetched );
		}

		setIsFetchingStatus( fetchStatus.error );
	};

	const handleToggleFeature = ( featureId ) => () => {
		setSiteFeatures( featureId );
	};

	const limitExceeded = () => {
		const zipPlans = astraSitesVars?.zip_plans;
		const sitesRemaining = zipPlans?.plan_data?.remaining;
		const aiSitesRemainingCount = sitesRemaining?.ai_sites_count;
		const allSitesRemainingCount = sitesRemaining?.all_sites_count;

		if (
			( typeof aiSitesRemainingCount === 'number' &&
				aiSitesRemainingCount <= 0 ) ||
			( typeof allSitesRemainingCount === 'number' &&
				allSitesRemainingCount <= 0 )
		) {
			return true;
		}

		return false;
	};

	const handleGenerateContent = async () => {
		if ( isInProgress ) {
			return;
		}

		if ( limitExceeded() ) {
			setLimitExceedModal( {
				open: true,
			} );
			return;
		}
		setIsInProgress( true );

		const formData = new window.FormData();

		formData.append( 'action', 'ast-block-templates-ai-content' );
		formData.append( 'security', astraSitesVars.ai_content_ajax_nonce );
		formData.append( 'business_name', businessName );
		formData.append( 'business_desc', businessDetails );
		formData.append( 'business_category', businessType.slug );
		formData.append( 'images', JSON.stringify( selectedImages ) );
		formData.append( 'image_keywords', JSON.stringify( keywords ) );
		formData.append( 'business_address', businessContact?.address || '' );
		formData.append( 'business_phone', businessContact?.phone || '' );
		formData.append( 'business_email', businessContact?.email || '' );
		formData.append(
			'social_profiles',
			JSON.stringify( businessContact?.socialMedia || [] )
		);

		const response = await apiFetch( {
			path: 'zipwp/v1/site',
			method: 'POST',
			data: {
				template: selectedTemplate,
				business_email: businessContact?.email,
				business_description: businessDetails,
				business_name: businessName,
				business_phone: businessContact?.phone,
				business_address: businessContact?.address,
				business_category: businessType.slug,
				business_category_name: businessType.name,
				image_keyword: keywords,
				social_profiles: businessContact?.socialMedia,
				images: selectedImages,
				site_features: siteFeatures
					.filter( ( feature ) => feature.enabled )
					.map( ( feature ) => feature.id ),
			},
		} );

		if ( response.success ) {
			// Close the onboarding screen on success.
			setWebsiteInfoAIStep( response.data.data );
			setNextAIStep();
		} else {
			// Handle error.
			const message = response?.data?.data;
			if (
				typeof message === 'string' &&
				message.includes( 'Usage limit' )
			) {
				setLimitExceedModal( {
					open: true,
				} );
			}
			setIsInProgress( false );
		}
	};

	useEffect( () => {
		if ( isFetchingStatus === fetchStatus.fetching ) {
			fetchSiteFeatures();
		}
	}, [] );

	return (
		<div className="grid grid-cols-1 gap-8 auto-rows-auto px-10 pb-10 pt-12 max-w-[880px] w-full mx-auto">
			<div className="space-y-4">
				<h1 className="text-3xl font-bold text-zip-app-heading">
					Select features
				</h1>
				<p className="m-0 p-0 text-base font-normal text-zip-body-text">
					Select the features you want on this website
				</p>
			</div>

			{ /* Feature Cards */ }
			<div className="grid grid-cols-1 lg:grid-cols-2 auto-rows-auto gap-x-8 gap-y-5 w-full">
				{ isFetchingStatus === fetchStatus.fetched &&
					siteFeatures.map( ( feature ) => {
						const FeatureIcon = ICON_SET?.[ feature.icon ];
						return (
							<div
								key={ feature.id }
								className={ classNames(
									'relative py-4 pl-4 pr-5 rounded-md shadow-sm border border-solid bg-white border-transparent transition-colors duration-150 ease-in-out',
									feature.enabled && 'border-accent-st'
								) }
							>
								<div className="flex items-start justify-start gap-3">
									<div className="p-0.5 shrink-0">
										{ FeatureIcon && (
											<FeatureIcon className="text-zip-body-text w-7 h-7" />
										) }
										{ ! FeatureIcon && (
											<WrenchIcon className="text-zip-body-text w-7 h-7" />
										) }
									</div>
									<div className="space-y-1">
										<p className="p-0 m-0 !text-base !font-semibold !text-zip-app-heading">
											{ feature.title }
										</p>
										<p className="p-0 m-0 !text-sm !font-normal !text-zip-body-text">
											{ feature.description }
										</p>
									</div>
								</div>
								{ /* Check mark */ }
								<span
									className={ classNames(
										'inline-flex absolute top-4 right-4 p-[0.1875rem] border border-solid border-zip-app-inactive-icon rounded',
										feature.enabled &&
											'border-accent-st bg-accent-st'
									) }
								>
									<CheckIcon
										className="w-2.5 h-2.5 text-white"
										strokeWidth={ 4 }
									/>
								</span>
								{ /* Click handler overlay */ }
								<div
									className="absolute inset-0 cursor-pointer"
									onClick={ handleToggleFeature(
										feature.id
									) }
								/>
							</div>
						);
					} ) }
				{ /* Skeleton */ }
				{ isFetchingStatus === fetchStatus.fetching &&
					Array.from( { length: Object.keys(ICON_SET).length } ).map( ( _, index ) => (
						<div
							key={ index }
							className="relative py-4 pl-4 pr-5 rounded-md shadow-sm border border-solid bg-white border-transparent"
						>
							<div className="flex items-start justify-start gap-3">
								<div className="p-0.5 shrink-0">
									<div className="w-7 h-7 bg-gray-200 rounded animate-pulse" />
								</div>
								<div className="space-y-1 w-full">
									<div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse" />
									<div className="w-1/2 h-5 bg-gray-200 rounded animate-pulse" />
								</div>
							</div>
							<span className="inline-flex absolute top-4 right-4 w-4 h-4 bg-gray-200 animate-pulse rounded" />
							<div className="absolute inset-0 cursor-pointer" />
						</div>
					) ) }
			</div>
			{ /* Error Message */ }
			{ isFetchingStatus === fetchStatus.error && (
				<div className="flex items-center justify-center w-full px-5 py-5">
					<p className="text-secondary-text text-center px-10 py-5 border-2 border-dashed border-border-primary rounded-md">
						Something went wrong. Please try again later.
					</p>
				</div>
			) }

			<hr className="!border-border-tertiary border-b-0 w-full" />

			{ /* Navigation buttons */ }
			<NavigationButtons
				continueButtonText="Start Building"
				onClickPrevious={ setPreviousAIStep }
				onClickContinue={ handleGenerateContent }
				loading={ isInProgress }
			/>
		</div>
	);
};

export default Features;