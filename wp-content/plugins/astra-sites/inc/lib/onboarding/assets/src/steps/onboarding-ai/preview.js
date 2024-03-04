import React, { useEffect, useState } from 'react';
import {
	ArrowRightOnRectangleIcon,
	ChevronRightIcon,
	// InformationCircleIcon,
	// QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowPathIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { withDispatch, useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import apiFetch from '@wordpress/api-fetch';
import SiteSkeleton from '../../components/site-preview/site-skeleton';
import {
	getAiDemo,
	checkRequiredPlugins,
	checkFileSystemPermissions,
} from '../import-site/import-utils';
import { useStateValue } from '../../store/store';
import Button from './components/button';
import { STORE_KEY } from './store';
import LoadingSpinner from './components/loading-spinner';
import { addHttps } from './utils/helpers';
// import Divider from './components/divider';
import {
	// classNames,
	getPercent,
} from './helpers';
import Tooltip from './components/tooltip';
import { ProgressBar } from './components/progress-bar';
import Dropdown from './components/dropdown';

const { imageDir } = starterTemplates;

const SitePreview = ( { onClickContinue, setAIStep } ) => {
	const storedState = useStateValue();
	const [ , dispatch ] = useStateValue();

	const { setSelectedWebsiteVersion } = useDispatch( STORE_KEY );

	const [ loadingIframe, setLoadingIframe ] = useState( true );
	const [ isLoadingNext, setIsLoadingNext ] = useState( false );

	const { websiteInfo, websiteVersionList, selectedWebsiteVersion } =
		useSelect( ( select ) => {
			const {
				getWebsiteInfo,
				getWebsiteVersionList,
				getSelectedWebsiteVersion,
			} = select( STORE_KEY );

			return {
				websiteInfo: getWebsiteInfo(),
				websiteVersionList: getWebsiteVersionList(),
				selectedWebsiteVersion: getSelectedWebsiteVersion(),
			};
		} );

	const handleIframeLoading = () => {
		console.log( 'loaded' );
		setLoadingIframe( false );
	};

	// TEST SITE
	// websiteInfo.url = 'https://impatient-irene-vzfgd.stagesite.top/';

	// useEffect( () => {
	// 	preImport();
	// }, [] );

	// const preImport = async () => {
	// 	await getAiDemo( addHttps( websiteInfo?.url ), storedState );
	// 	await checkRequiredPlugins( storedState );
	// 	checkFileSystemPermissions( storedState );
	// };

	const handleSelectPreview = async ( version ) => {
		setLoadingIframe( true );
		setIsLoadingNext( true );
		await getAiDemo( addHttps( version?.url ), version?.uuid, storedState );
		await checkRequiredPlugins( storedState );
		checkFileSystemPermissions( storedState );
		setSelectedWebsiteVersion( version );
		setIsLoadingNext( false );
	};

	console.log(
		{ storedState },
		{ templateResponse: storedState[ 0 ].templateResponse }
	);

	useEffect( () => {
		if ( storedState?.[ 0 ]?.templateResponse ) {
			setIsLoadingNext( false );
		}
	}, [ storedState?.[ 0 ]?.templateResponse ] );

	const [ zipPlans, setZipPlans ] = useState( astraSitesVars?.zip_plans );

	const activePlan = zipPlans?.active_plan;
	const sitesRemaining = zipPlans?.plan_data?.remaining;
	const sitesUsed = zipPlans?.plan_data?.usage;

	const aiSitesRemainingCount = sitesRemaining?.ai_sites_count;
	const allSitesRemainingCount = sitesRemaining?.all_sites_count;
	const aiSitesLimitCount =
		zipPlans?.plan_data?.limit?.ai_sites_count_daily ||
		zipPlans?.plan_data?.limit?.ai_sites_count_monthly;
	const aiSitesUsageCount = sitesUsed?.ai_sites_count;

	const renderGenerationsAvailableText = () => {
		const planName = activePlan?.slug;
		const perWhatInterval = planName === 'free' ? 'month' : 'day';

		return (
			<div>
				{ /* Enjoy up to
					{ Math.min( 3, aiSitesLimitCount ) } website generations{ ' ' }
					with your <span className="capitalize">{ planName }</span>{ ' ' }
					plan.
					<br /> */ }
				<div>
					{ `You're on the` }{ ' ' }
					<span className="capitalize">{ planName }</span>{ ' ' }
					{ `plan of ZipWP which allows ${ aiSitesLimitCount } AI website
				generations every ${ perWhatInterval }` }
				</div>
				<div className="mt-5 mb-3">
					<ProgressBar
						value={
							aiSitesLimitCount
								? getPercent(
										aiSitesUsageCount,
										aiSitesLimitCount
								  )
								: 0
						}
						color="bg-white"
						bgColor="bg-[#333E52]"
						height="h-2"
					/>{ ' ' }
				</div>
				<div>
					{ `You've utilized ${ aiSitesUsageCount }/${ aiSitesLimitCount } generations.` }
				</div>
			</div>
		);
	};

	console.log( 'websiteDetails: ', {
		loadingIframe,
		websiteInfo,
		websiteVersionList,
		selectedWebsiteVersion,
		zipPlans,
	} );

	const handleClosePopup = ( event ) => {
		event?.preventDefault();
		event?.stopPropagation();

		dispatch( {
			type: 'set',
			currentIndex: 0,
		} );
	};

	console.log( { selectedWebsiteVersion, websiteVersionList } );
	const getSelectedVersion = () => {
		if ( ! websiteVersionList ) return '';

		const index = websiteVersionList?.findIndex?.(
			( version ) => version?.uuid === selectedWebsiteVersion?.uuid
		);
		return `Version ${ index + 1 }`;
	};

	const updateZipPlanData = async () => {
		await apiFetch( {
			path: 'astra-sites/v1/zip-plan',
			method: 'POST',
			headers: {
				'X-WP-Nonce': astraSitesVars.rest_api_nonce,
			},
		} ).then( ( response ) => {
			if ( response.success ) {
				console.log( response.data );
				setZipPlans( response.data );
			} else {
				//  Handle error.
			}
		} );
	};

	useEffect( () => {
		updateZipPlanData();
	}, [] );

	const disableRegenerate = () =>
		aiSitesRemainingCount <= 0 || allSitesRemainingCount <= 0;

	return (
		<div
			id="spectra-onboarding-ai"
			className={ `font-sans grid grid-cols-1 lg:grid-cols-[380px_1fr] h-screen w-screen` }
		>
			<div className="hidden lg:flex lg:w-full lg:flex-col z-[1] h-screen">
				<div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-zip-dark-theme-bg px-6">
					<div className="flex h-16 shrink-0 items-center mt-1">
						<img
							className="w-10 h-10"
							src={ `${ imageDir }/build-with-ai/st-logo-dark.svg` }
							alt={ __( 'Build with AI', 'astra-sites' ) }
						/>
					</div>
					<nav className="flex flex-1 flex-col gap-y-1">
						<div className="rounded-md p-5 bg-zip-dark-theme-content-background w-full ">
							<div className="text-lg font-bold leading-7 text-zip-dark-theme-heading">
								{ websiteInfo?.title }
							</div>
							<div className="border border-solid border-zip-dark-theme-border rounded-md w-full mt-6">
								<Dropdown
									placement="right"
									trigger={
										<div className="flex items-center justify-between gap-2 min-w-[100px] px-3 py-2">
											<span className="text-white zw-sm-semibold leading-[150%]">
												{ getSelectedVersion() }
											</span>

											<ChevronDownIcon
												className={ `w-5 h-5 ${
													websiteVersionList?.length >
													1
														? 'text-white'
														: 'text-transparent'
												}` }
											/>
										</div>
									}
									width="72.5"
									align="top"
									contentClassName="bg-white p-2 [&>:first-child]:pb-1 [&>:last-child]:pt-1 [&>:not(:first-child,:last-child)]:py-1 !divide-y !divide-border-zip-dark-theme-border bg-zip-dark-theme-content-background divide-solid divide-x-0 border border-solid border-zip-dark-theme-border"
									disabled={ websiteVersionList?.length <= 1 }
								>
									{ websiteVersionList?.map(
										( version, index ) => (
											<Dropdown.Item
												as="div"
												key={ index }
												className="only:!p-0"
											>
												<button
													type="button"
													className={ `w-full flex items-center gap-2 px-1.5 py-1 text-sm font-normal leading-5 h-[37px] rounded-0 text-white hover:bg-zip-dark-theme-border transition duration-150 ease-in-out space-x-2 rounded border-none cursor-pointer 
												${
													!! (
														selectedWebsiteVersion?.uuid ===
														version?.uuid
													)
														? 'bg-zip-dark-theme-border'
														: 'bg-zip-dark-theme-content-background'
												}` }
													onClick={ () => {
														if (
															selectedWebsiteVersion?.uuid ===
															version?.uuid
														)
															return;

														handleSelectPreview(
															version
														);
													} }
												>
													Version { index + 1 }
												</button>
											</Dropdown.Item>
										)
									) }
								</Dropdown>
							</div>
							<div className="text-sm font-normal leading-5 text-zip-dark-theme-body mt-6">
								You will be able to change the text, images,
								colors and make customizations easily with a
								drag-and-drop builder.
							</div>
							<div className="mt-6">
								<Button
									className="h-10 w-full font-semibold text-sm leading-5"
									onClick={ () => {
										setIsLoadingNext( true );
										onClickContinue();
									} }
									variant="primary"
									hasSuffixIcon={ ! isLoadingNext }
									disabled={ isLoadingNext }
								>
									{ isLoadingNext ? (
										<LoadingSpinner />
									) : (
										<>
											<span>Start Importing</span>
											<ChevronRightIcon className="w-5 h-5" />
										</>
									) }
								</Button>
								<Tooltip
									placement="bottom"
									content={ __(
										'Click here to rebuild the website with a different design.',
										'astra-sites'
									) }
								>
									<Button
										type="button"
										className="h-10 w-full mt-4 font-semibold text-sm leading-5"
										onClick={ () => {
											setAIStep( 7 );
										} }
										variant="gray"
										disabled={ disableRegenerate() }
									>
										{ isLoadingNext ? (
											<LoadingSpinner />
										) : (
											<>
												<span>
													Try Different Design
												</span>
												<ArrowPathIcon className="w-5 h-5" />
											</>
										) }
									</Button>
								</Tooltip>
							</div>
						</div>
						<div className="mt-auto p-5 border border-solid border-zip-dark-theme-border rounded-md flex gap-2 items-start">
							<div className="font-normal text-sm leading-5 mt-[-3px] text-zip-dark-theme-heading">
								{ renderGenerationsAvailableText() }
								{ disableRegenerate() && (
									<Button
										className="h-10 w-full font-semibold text-sm leading-5 mt-5"
										onClick={ () =>
											window.open(
												'https://app.zipwp.com/founders-deal',
												'_blank'
											)
										}
										variant="primary"
										hasSuffixIcon={ ! isLoadingNext }
										disabled={ isLoadingNext }
									>
										<span>Need more?</span>
										<ChevronRightIcon className="w-5 h-5" />
									</Button>
								) }
							</div>
						</div>
						{ /* <div className="my-6 bg-zip-dark-theme-content-background p-5 rounded-md">
							<div className="flex justify-between gap-6">
								<div className="font-semibold text-base text-zip-dark-theme-heading">
									Previous versions
								</div>
								<div>
									<Tooltip
										placement="top"
										content={ __(
											'Explore different versions of your website and pick the one that suits you best.',
											'astra-sites'
										) }
									>
										<QuestionMarkCircleIcon className="w-5 h-5 text-zip-dark-theme-icon-active" />
									</Tooltip>
								</div>
							</div>
							<Divider
								className={
									'my-4 border-zip-dark-theme-border'
								}
							/>
							<div className="gap-4 flex flex-col">
								{ websiteVersionList.map(
									( version, index ) => (
										<div
											className="text-base font-normal text-zip-dark-theme-body gap-2 flex justify-between items-start"
											key={ version?.uuid }
										>
											<div>Version { index + 1 }</div>
											<div>
												<Button
													type="button"
													className={ classNames(
														'h-6 w-20  font-semibold text-sm',
														selectedWebsiteVersion?.uuid ===
															version?.uuid
															? 'cursor-default'
															: ''
													) }
													onClick={ () => {
														if (
															selectedWebsiteVersion?.uuid ===
															version?.uuid
														)
															return;

														handleSelectPreview(
															version
														);
													} }
													variant={
														selectedWebsiteVersion?.uuid ===
														version?.uuid
															? 'gray'
															: 'gray-selected'
													}
												>
													{ selectedWebsiteVersion?.uuid ===
													version?.uuid
														? 'Selected'
														: 'Preview' }
												</Button>
											</div>
										</div>
									)
								) }
							</div>
						</div> */ }
						<div className="flex items-center justify-center mb-5 mt-5 h-[38px]">
							<Button
								onClick={ handleClosePopup }
								type="button"
								variant="dark"
								className="flex-1 cursor-pointer font-semibold text-sm leading-5"
								isSmall
								hasPrefixIcon
							>
								<ArrowRightOnRectangleIcon className="w-5 h-5" />
								<span>Exit</span>
							</Button>
						</div>
					</nav>
				</div>
			</div>

			<main
				id="sp-onboarding-content-wrapper"
				className="flex-1 overflow-x-hidden h-screen bg-white"
			>
				<div className="h-full w-full relative flex">
					<div
						className={ `w-full max-h-full flex flex-col flex-auto items-center` }
					>
						<div className="w-full h-full">
							{ loadingIframe && <SiteSkeleton /> }

							{ selectedWebsiteVersion?.url && (
								<div className="w-full h-full">
									<iframe
										id="astra-starter-templates-preview"
										title="Website Preview"
										height="100%"
										width="100%"
										src={
											selectedWebsiteVersion?.url +
											'?style=wireframe&preview_demo=yes'
										}
										onLoad={ handleIframeLoading }
									/>
								</div>
							) }
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default compose(
	withDispatch( ( dispatch ) => {
		const { setNextAIStep, setPreviousAIStep, setAIStep } =
			dispatch( STORE_KEY );
		return {
			onClickContinue: setNextAIStep,
			onClickPrevious: setPreviousAIStep,
			setAIStep,
		};
	} )
)( SitePreview );
