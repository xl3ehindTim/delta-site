import React, { useEffect } from 'react';
import {
	ArrowRightIcon,
	ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { removeQueryArgs } from '@wordpress/url';
import { Button, DefaultStep, PreviousStepLink } from '../../components/index';
import { useStateValue } from '../../store/store';
import { STORE_KEY } from '../onboarding-ai/store';
import LimitExceedModal from '../onboarding-ai/components/limit-exceeded-modal';
import { getLocalStorageItem } from '../onboarding-ai/helpers';

const { imageDir } = starterTemplates;
const SiteType = () => {
	const [ , dispatch ] = useStateValue();
	const { setLimitExceedModal, setContinueProgressModal } =
		useDispatch( STORE_KEY );

	const zipPlans = astraSitesVars?.zip_plans;
	const sitesRemaining = zipPlans?.plan_data?.remaining;
	const aiSitesRemainingCount = sitesRemaining?.ai_sites_count;
	const allSitesRemainingCount = sitesRemaining?.all_sites_count;

	useEffect( () => {
		const startTime = localStorage.getItem( 'st-import-start' );
		const endTime = localStorage.getItem( 'st-import-end' );

		if ( startTime || endTime ) {
			localStorage.removeItem( 'st-import-start' );
			localStorage.removeItem( 'st-import-end' );
		}
	} );

	const handleKeyPress = ( e, navigate ) => {
		e = e || window.event;

		if ( e.keyCode === 37 ) {
			//Left Arrow
			if ( e.target.previousSibling ) {
				e.target.previousSibling.focus();
			}
		} else if ( e.keyCode === 39 ) {
			//Right Arrow
			if ( e.target.nextSibling ) {
				e.target.nextSibling.focus();
			}
		} else if ( e.key === 'Enter' ) {
			//Enter
			navigate();
		}
	};

	useEffect( () => {
		const urlParams = new URLSearchParams( window.location.search );

		const token = urlParams.get( 'token' );
		if ( token ) {
			if (
				( typeof aiSitesRemainingCount === 'number' &&
					aiSitesRemainingCount <= 0 ) ||
				( typeof allSitesRemainingCount === 'number' &&
					allSitesRemainingCount <= 0 )
			) {
				setLimitExceedModal( {
					open: true,
				} );
			} else {
				dispatch( {
					type: 'set',
					currentIndex: 1,
				} );
			}
		}
	}, [] );

	const handleBuildWithAIPress = () => {
		if (
			( typeof aiSitesRemainingCount === 'number' &&
				aiSitesRemainingCount <= 0 ) ||
			( typeof allSitesRemainingCount === 'number' &&
				allSitesRemainingCount <= 0 )
		) {
			setLimitExceedModal( {
				open: true,
			} );
			return;
		}

		const savedAiOnboardingDetails = getLocalStorageItem(
			'ai-onboarding-details'
		);
		if ( savedAiOnboardingDetails?.stepData?.businessType?.name ) {
			setContinueProgressModal( {
				open: true,
			} );
		}

		dispatch( {
			type: 'set',
			currentIndex: 1,
		} );
	};

	return (
		<DefaultStep
			content={
				<div className="page-builder-screen-wrap middle-content">
					<div className="w-full flex justify-center">
						<h1 className="w-[390px]">
							{ __(
								'How would you like to build your website?',
								'astra-sites'
							) }
						</h1>
					</div>
					<p className="screen-description" />
					<div className="page-builder-wrap ist-fadeinUp">
						<div
							className="flex-col flex bg-white pt-10 pb-8 px-8 text-left relative  rounded-xl shadow-card gradient-border-cover gradient-border-cover-button"
							tabIndex="0"
							onKeyDown={ ( event ) =>
								handleKeyPress( event, () => {
									dispatch( {
										type: 'set',
										currentIndex: 2,
									} );
								} )
							}
						>
							<img
								className="w-12 h-12"
								src={ `${ imageDir }/build-with-ai/rectangle-stack.svg` }
								alt={ __(
									'Classic Starter Templates',
									'astra-sites'
								) }
							/>{ ' ' }
							<div className="mt-6 text-xl font-semibold leading-7 mb-2.5 text-heading-text">
								{ __(
									'Classic Starter Templates',
									'astra-sites'
								) }
							</div>
							<div className="zw-sm-normal text-body-text">
								{ ' ' }
								{ __(
									'Begin the website-building process with our extensive library of professionally designed templates tailored to meet your requirements.',
									'astra-sites'
								) }{ ' ' }
							</div>
							<div className="mt-10">
								<Button
									className="w-full h-10"
									onClick={ () => {
										dispatch( {
											type: 'set',
											currentIndex:
												astraSitesVars.default_page_builder
													? 4
													: 3,
										} );
									} }
								>
									<span>Build with Templates</span>{ ' ' }
									<ArrowRightIcon className="w-5 h-5 ml-2 text-zip-dark-theme-heading" />
								</Button>
							</div>
						</div>
						<div
							className="flex-col flex bg-white pt-10 pb-8 px-8 text-left relative rounded-xl"
							tabIndex="0"
							onKeyDown={ ( event ) =>
								handleKeyPress( event, handleBuildWithAIPress )
							}
						>
							<div
								className="absolute top-4 right-4 h-7 rounded-[99px] text-white flex items-center justify-center px-3 zw-xs-normal bg-gradient-to-r from-gradient-color-1 via-46.88 via-gradient-color-2 
                        to-gradient-color-3"
							>
								{ __( 'Beta', 'astra-sites' ) }
							</div>
							<img
								className="w-12 h-12"
								src={ `${ imageDir }/build-with-ai/blue-wand.svg` }
								alt={ __(
									'AI Website Builder',
									'astra-sites'
								) }
							/>
							<div className="mt-6 text-xl font-semibold leading-7 mb-2.5 text-heading-text">
								{ __( 'AI Website Builder', 'astra-sites' ) }
							</div>
							<div className="zw-sm-normal text-body-text">
								{ ' ' }
								{ __(
									'Experience the future of website building. We offer AI features powered by ZipWP to help you build your website 10x faster.',
									'astra-sites'
								) }{ ' ' }
							</div>
							<div className="mt-10">
								<Button
									className="w-full h-10"
									type="secondary"
									onClick={ handleBuildWithAIPress }
								>
									<span>Try the New AI Builder</span>{ ' ' }
									<ArrowRightIcon className="w-5 h-5 ml-2" />
								</Button>
							</div>
						</div>
					</div>
					<LimitExceedModal
						onOpenChange={ () => {
							// remove params
							const urlParams = new URLSearchParams(
								window.location.search
							);
							const token = urlParams.get( 'token' );
							if ( token ) {
								const url = removeQueryArgs(
									window.location.href,
									'token',
									'email',
									'action',
									'credit_token'
								);

								window.location = url;
							}
						} }
					/>

					{ /* Back to the wordpress dashboard button */ }
					<button
						className="mx-auto flex items-center justify-center gap-2 mt-10 border-0 bg-transparent focus:outline-none text-zip-body-text text-sm font-normal cursor-pointer"
						onClick={ () =>
							window.open( starterTemplates.adminUrl, '_self' )
						}
					>
						<ArrowRightStartOnRectangleIcon className="w-5 h-5" />
						<span>
							{ __( 'Exit to Dashboard', 'astra-sites' ) }
						</span>
					</button>
				</div>
			}
			actions={
				<>
					<PreviousStepLink
						before
						customizeStep={ true }
						onClick={ () => {
							window.location.href = starterTemplates.adminUrl;
						} }
					>
						{ __( 'Back', 'astra-sites' ) }
					</PreviousStepLink>
				</>
			}
		/>
	);
};

export default SiteType;
