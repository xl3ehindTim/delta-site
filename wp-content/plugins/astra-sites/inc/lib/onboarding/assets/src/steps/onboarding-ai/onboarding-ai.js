import {
	ArrowRightOnRectangleIcon,
	CheckIcon,
	// XMarkIcon,
} from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import { memo, useEffect } from '@wordpress/element';
import {
	withSelect,
	withDispatch,
	useSelect,
	useDispatch,
} from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { addQueryArgs, removeQueryArgs } from '@wordpress/url';
import { useStateValue } from '../../store/store';
import {
	classNames,
	getLocalStorageItem,
	setLocalStorageItem,
} from './helpers/index';
import Button from './components/button';
import Type from './type';
import BusinessName from './business-name';
import DescribeBusiness from './describe-business';
import BusinessContact from './business-contact';
import Images from './images';
import SelectTemplate from './select-template';
import WebsiteBuilding from './building-website';
import BuildDone from './done';
import ImportAiSIte from './import-ai-site';
import PreviewWebsite from './preview';
import { STORE_KEY } from './store';
import LimitExceedModal from './components/limit-exceeded-modal';
import GetStarted from './get-started-step-ai';
import ContinueProgressModal from './components/continue-progress-modal';
import Features from './features';

const { imageDir } = starterTemplates;

console.log( 'astraSitesVars: ', astraSitesVars );

const steps = [
	{
		component: <GetStarted />,
		hideSidebar: true,
		hideCloseIcon: true,
		hideStep: true,
	},
	{
		stepNumber: 1,
		name: 'Type',
		description: 'Select who this website is for',
		screen: 'type',
		component: <Type />,
	},
	{
		stepNumber: 2,
		name: 'Name',
		description: 'What is the name?',
		screen: 'name',
		component: <BusinessName />,
	},
	{
		stepNumber: 3,
		name: 'Describe',
		description: 'Some details please',
		screen: 'details',
		component: <DescribeBusiness />,
	},
	{
		stepNumber: 4,
		name: 'Contact',
		description: 'How can people get in touch',
		screen: 'contact-details',
		component: <BusinessContact />,
	},
	{
		stepNumber: 5,
		name: 'Select Images',
		description: 'Select relevant images as needed',
		screen: 'images',
		contentClassName:
			'px-0 pt-0 md:px-0 md:pt-0 lg:px-0 lg:pt-0 xl:px-0 xl:pt-0',
		component: <Images />,
	},
	{
		stepNumber: 6,
		name: 'Design',
		description: 'Choose a structure for your website',
		screen: 'template',
		contentClassName:
			'px-0 pt-0 md:px-0 md:pt-0 lg:px-0 lg:pt-0 xl:px-0 xl:pt-0',

		component: <SelectTemplate />,
	},
	{
		stepNumber: 7,
		name: 'Features',
		description: 'Select features as you need',
		screen: 'features',
		contentClassName:
			'px-0 pt-0 md:px-0 md:pt-0 lg:px-0 lg:pt-0 xl:px-0 xl:pt-0',
		component: <Features />,
	},
	{
		stepNumber: 8,
		// name: 'Building Website', // actual name
		// description: 'Building your site',
		name: 'Configure',
		description: 'Personalize your website',
		screen: 'building-website',
		hideCloseIcon: true,
		component: <WebsiteBuilding />,
	},
	{
		name: 'Preview',
		description: 'Preview your website',
		screen: 'preview',
		component: <PreviewWebsite />,
		hideSidebar: true,
		hideCloseIcon: true,
		hideStep: true,
	},
	{
		stepNumber: 9,
		// name: 'Migrate', // actual name
		// description: 'Migrating your site',
		// screen: 'migrate',
		name: 'Done',
		description: 'Your website is ready!',
		screen: 'done',
		component: <ImportAiSIte />,
	},
	{
		name: 'Done',
		description: 'Your website is ready!',
		screen: 'done',
		contentClassName: 'pt-0 md:pt-0 lg:pt-0 xl:pt-0',
		component: <BuildDone />,
		hideStep: true,
	},
];

const OnboardingAI = ( {
	togglePopup,
	currentScreen,
	sitePreview,
	currentStep,
	setAIStep,
} ) => {
	const { setWebsiteOnboardingAIDetails } = useDispatch( STORE_KEY );
	const [ { currentIndex }, dispatch ] = useStateValue();

	const { websiteVersionList } = useSelect( ( select ) => {
		const { getWebsiteVersionList } = select( STORE_KEY );
		return {
			websiteVersionList: getWebsiteVersionList(),
		};
	} );

	const aiOnboardingDetails = useSelect( ( select ) => {
		const { getOnboardingAI } = select( STORE_KEY );
		return getOnboardingAI();
	} );

	useEffect( () => {
		if ( ! aiOnboardingDetails?.stepData?.businessType?.id ) return;
		setLocalStorageItem( 'ai-onboarding-details', aiOnboardingDetails );
	}, [ aiOnboardingDetails ] );

	useEffect( () => {
		const savedAiOnboardingDetails = getLocalStorageItem(
			'ai-onboarding-details'
		);

		if ( ! savedAiOnboardingDetails ) return;
		setWebsiteOnboardingAIDetails( savedAiOnboardingDetails );
	}, [] );

	const handleClosePopup = ( event ) => {
		event?.preventDefault();
		event?.stopPropagation();

		dispatch( {
			type: 'set',
			currentIndex: 0,
		} );
	};

	useEffect( () => {
		if ( togglePopup ) {
			document.body.classList.add( 'ast-block-templates-modal-open' );
			document
				.getElementById( 'ast-block-templates-modal-wrap' )
				.classList.add( 'open' );
		} else {
			document.body.classList.remove( 'ast-block-templates-modal-open' );
			document
				.getElementById( 'ast-block-templates-modal-wrap' )
				?.classList.remove( 'open' );
		}
	}, [ togglePopup, currentScreen, sitePreview ] );

	const dynamicStepClass = function ( step, stepIndex ) {
		if ( step === stepIndex + 1 ) {
			return 'border-zip-dark-theme-heading text-zip-dark-theme-heading border-solid';
		}
		if ( step > stepIndex + 1 ) {
			return 'bg-zip-dark-theme-content-background text-zip-app-inactive-icon';
		}
		return 'border-solid border-zip-app-inactive-icon text-zip-app-inactive-icon';
	};

	const dynamicClass = function ( cStep, sIndex ) {
		if ( steps?.[ sIndex ]?.screen === 'done' ) return '';
		if ( cStep === sIndex + 1 ) {
			return 'bg-gradient-to-b from-white to-transparent';
		}
		if ( cStep > sIndex + 1 ) {
			return 'bg-zip-dark-theme-border';
		}
		return 'bg-gradient-to-b from-gray-700 to-transparent';
	};

	useEffect( () => {
		const urlParams = new URLSearchParams( window.location.search );

		const token = urlParams.get( 'token' );
		if ( token ) {
			let url = removeQueryArgs(
				window.location.href,
				'token',
				'email',
				'action',
				'credit_token'
			);
			url = addQueryArgs( url, { ci: currentIndex } );

			window.onbeforeunload = null;
			window.location = url;
		}
	}, [] );

	return (
		<div
			id="spectra-onboarding-ai"
			className={ `font-figtree ${
				steps[ currentStep - 1 ]?.hideSidebar
					? ''
					: 'grid grid-cols-1 lg:grid-cols-[360px_1fr]'
			} h-screen` }
		>
			{ ! steps[ currentStep - 1 ]?.hideSidebar && (
				<div className="hidden lg:flex lg:w-full lg:flex-col z-[1] overflow-y-auto">
					<div className="flex flex-col gap-y-5 overflow-y-hidden border-r border-gray-200 bg-zip-dark-theme-bg px-6 relative h-screen">
						<div className="flex h-16 shrink-0 items-center relative">
							<img
								className="w-10 h-10"
								src={ `${ imageDir }/build-with-ai/st-logo-dark.svg` }
								alt={ __( 'Build with AI', 'astra-sites' ) }
							/>
							<div className="absolute top-1 left-[30px] w-10 h-5 text-xs rounded-[99px] flex items-center justify-center px-3 zw-xs-normal bg-white text-zip-dark-theme-content-background">
								{ __( 'Beta', 'astra-sites' ) }
							</div>
						</div>
						<nav className="flex flex-col gap-y-1 overflow-y-auto">
							{ steps.map(
								(
									{ name, description, hideStep, stepNumber },
									stepIdx
								) =>
									hideStep ? (
										<></>
									) : (
										<div
											className="flex gap-3"
											key={ stepIdx }
										>
											<div
												className={ classNames(
													'flex flex-col gap-y-1 items-center',
													stepIdx === steps.length - 1
														? 'justify-start'
														: 'justify-center'
												) }
											>
												<div
													className={ classNames(
														'rounded-full border text-xs font-semibold flex items-center justify-center w-6 h-6',
														dynamicStepClass(
															currentStep,
															stepIdx
														)
													) }
												>
													{ currentStep >
													stepIdx + 1 ? (
														<CheckIcon className="text-white h-3 w-3" />
													) : (
														<span>
															{ stepNumber }
														</span>
													) }
												</div>
												{ steps.length - 1 >
													stepIdx && (
													<div
														className={ classNames(
															'h-8 w-[1px]',
															dynamicClass(
																currentStep,
																stepIdx
															)
														) }
													/>
												) }
											</div>
											<div className="flex flex-col gap-y-1 items-start justify-start ">
												<div
													className={ classNames(
														'text-sm font-semibold',
														currentStep >=
															stepIdx + 1
															? 'text-zip-app-inactive-icon'
															: 'text-zip-dark-theme-body',
														currentStep ===
															stepIdx + 1 &&
															'text-zip-dark-theme-heading'
													) }
												>
													{ name }
												</div>
												<div
													className={ classNames(
														'text-sm font-normal',
														currentStep >=
															stepIdx + 1
															? 'text-zip-app-inactive-icon'
															: 'text-zip-app-inactive-icon',
														currentStep ===
															stepIdx + 1 &&
															'text-zip-dark-theme-body'
													) }
												>
													{ description }
												</div>
											</div>
										</div>
									)
							) }
						</nav>

						{ /* Do not show on Migration step */ }
						{ !! ( currentStep < 10 ) && (
							<div className="flex items-center justify-center mb-5 mt-auto h-[38px]">
								<Button
									onClick={ ( e ) => {
										if ( websiteVersionList?.length >= 1 ) {
											setAIStep( 9 );
										} else {
											handleClosePopup( e );
										}
									} }
									type="button"
									variant="dark"
									className="flex-1 cursor-pointer"
									isSmall
									hasPrefixIcon
								>
									{ console.log( { currentStep } ) }
									<ArrowRightOnRectangleIcon className="w-5 h-5" />
									{
										<span>
											{ websiteVersionList?.length >= 1
												? 'Back to Preview'
												: 'Exit' }
										</span>
									}
								</Button>
							</div>
						) }
					</div>
				</div>
			) }
			<main
				id="sp-onboarding-content-wrapper"
				className="flex-1 overflow-x-hidden h-screen bg-zip-app-light-bg"
			>
				<div className="h-full w-full relative flex">
					<div
						className={ twMerge(
							`w-full max-h-full flex flex-col flex-auto items-center`,
							steps[ currentStep - 1 ]?.hideSidebar
								? ''
								: 'px-5 pt-5 md:px-10 md:pt-10 lg:px-14 lg:pt-12 xl:px-20 xl:pt-12',
							'',
							steps[ currentStep - 1 ]?.contentClassName
						) }
					>
						{ /* { ! steps[ currentStep - 1 ]?.hideCloseIcon && (
							<div
								className="fixed top-0 right-0 z-50"
								onClick={ handleClosePopup }
								aria-hidden="true"
							>
								<div className="absolute top-5 right-5 cursor-pointer">
									<XMarkIcon className="w-8 text-zip-app-inactive-icon hover:text-icon-secondary transition duration-150 ease-in-out" />
								</div>
							</div>
						) } */ }
						{ /* Step component will go here */ }
						{ steps[ currentStep - 1 ].component }
					</div>
				</div>
			</main>
			<LimitExceedModal />
			<ContinueProgressModal />
		</div>
	);
};

export default compose(
	withSelect( ( select ) => {
		const {
			getTogglePopup,
			getSitePreview,
			getCurrentScreen,
			setCurrentScreen,
			getCurrentAIStep,
		} = select( 'ast-block-templates' );
		return {
			togglePopup: getTogglePopup(),
			sitePreview: getSitePreview(),
			currentScreen: getCurrentScreen(),
			setCurrentScreen,
			currentStep: getCurrentAIStep(),
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { toggleOnboardingAIStep, setAIStep } = dispatch(
			'ast-block-templates'
		);
		return {
			toggleOnboardingAIStep,
			setAIStep,
		};
	} )
)( memo( OnboardingAI ) );
