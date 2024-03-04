import { CircularProgressBar } from '@tomickigrzegorz/react-circular-progress-bar';
import { useEffect, useRef, useState } from 'react';
import {
	ExclamationTriangleIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { compose } from '@wordpress/compose';
import { withDispatch, useSelect, useDispatch } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { useStateValue } from '../../store/store';
import {
	checkFileSystemPermissions,
	checkRequiredPlugins,
	exportAiSite,
	getAiDemo,
} from '../import-site/import-utils';
import { SITE_CREATION_STATUS_CODES } from './helpers/index';
import { STORE_KEY } from './store';
import { addHttps } from './utils/helpers';

const { imageDir } = starterTemplates;

const WebsiteBuilding = ( { onClickNext } ) => {
	const [ progressPercentage, setProgressPercentage ] = useState( 0 );
	const intervalHandle = useRef( null );
	const [ , dispatch ] = useStateValue();
	const storedState = useStateValue();

	const { setWebsiteVersionList, setSelectedWebsiteVersion } =
		useDispatch( STORE_KEY );

	const [ hideCloseIcon, setHideCloseIcon ] = useState( true );

	const { websiteInfo, websiteVersionList } = useSelect( ( select ) => {
		const { getWebsiteInfo, getWebsiteVersionList } = select( STORE_KEY );

		return {
			websiteInfo: getWebsiteInfo(),
			websiteVersionList: getWebsiteVersionList(),
		};
	} );

	console.log( { intervalHandle } );

	const TOTAL_STEPS = 11;

	let currentStep = 0;

	const [ status, setStatus ] = useState( 'second' );
	const [ statusText, setStatusText ] = useState( false );
	const [ showProgressBar, setShowProgressBar ] = useState( true );
	const [ isFetchingStatus, setIsFetchingStatus ] = useState( false );

	const updateProgressBar = ( step, totalSteps ) => {
		if ( step >= totalSteps ) {
			setProgressPercentage( 100 );
			return;
		}

		const percentage = Math.floor( ( step / totalSteps ) * 100 );
		setProgressPercentage( percentage );
	};

	const onCreationError = ( msg ) => {
		console.log( 'onCreationError: ', msg );
		setHideCloseIcon( false );
		setStatusText( msg || 'Failed to create website' );
		setStatus( 'error' );
		setShowProgressBar( false );
		clearInterval( intervalHandle.current );
	};

	const handleStatusResponse = async ( response ) => {
		const responseCode = response?.data?.data?.code;
		const responseCodeType = responseCode?.slice( 0, 1 );

		if ( ! ( responseCode in SITE_CREATION_STATUS_CODES ) ) return;

		const msg = SITE_CREATION_STATUS_CODES[ responseCode ]?.trim();

		console.log( 'complete website', response, msg, responseCodeType );
		if ( response?.success ) {
			const step = +responseCode?.slice( 1 );

			// Avoid progress bar going back
			if ( step > currentStep ) {
				currentStep = step;
				updateProgressBar( currentStep, TOTAL_STEPS );
			}

			// Make sure msg is not empty
			if ( msg && msg !== 'Done' ) {
				setStatusText( msg );
				setStatus(
					responseCodeType !== 'R' ? 'in-progress' : 'retrying'
				);
			}

			if ( msg === 'Done' ) {
				clearInterval( intervalHandle.current );

				await exportAiSite( websiteInfo.uuid );

				setStatusText( 'Please wait a moment...' );
				setStatus( 'in-progress' );

				const templateResponse = await getAiDemo(
					addHttps( websiteInfo?.url ),
					websiteInfo?.uuid,
					storedState
				);

				if (
					! templateResponse.success ||
					( templateResponse.success &&
						Object.keys?.( templateResponse )?.length === 0 )
				) {
					console.error( 'Import Error', templateResponse );
					onCreationError();
					return;
				}

				await checkRequiredPlugins( storedState );
				checkFileSystemPermissions( storedState );

				setStatusText( 'Your website is ready!' );
				setStatus( 'done' );
				setWebsiteVersionList( [ ...websiteVersionList, websiteInfo ] );
				setSelectedWebsiteVersion( websiteInfo );
				// clearInterval( intervalHandle.current );
				onClickNext();
			}
		} else {
			onCreationError( msg );
		}
	};

	const fetchImportStatus = async () => {
		if ( isFetchingStatus ) {
			return;
		}
		setIsFetchingStatus( true );

		try {
			const randomToken = ( Math.random() * 200 )?.toString(); // to avoid response caching
			const response = await apiFetch( {
				path: `zipwp/v1/import-status?uuid=${ websiteInfo.uuid }&token=${ randomToken }`,
				method: 'GET',
				headers: {
					'X-WP-Nonce': astraSitesVars.rest_api_nonce,
					_ajax_nonce: astraSitesVars._ajax_nonce,
				},
			} );
			console.log( 'response: ', response );

			// explicit check
			if ( response?.success === true ) {
				handleStatusResponse( response );
			} else if ( response?.success === false ) {
				onCreationError();
			}
		} catch ( error ) {
			console.log( error );
		} finally {
			setIsFetchingStatus( false );
		}
	};

	const handleRefreshStatus = () => {
		intervalHandle.current = setInterval( () => {
			console.log( 'refresh' );
			fetchImportStatus();
		}, 7000 );
	};

	useEffect( () => {
		fetchImportStatus();
		handleRefreshStatus();
	}, [] );

	const handleClose = () => {
		dispatch( {
			type: 'set',
			currentIndex: 0,
		} );
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center w-full h-screen gap-y-4">
				{ status !== 'error' && (
					<div className="relative flex items-center justify-center px-10 py-6 h-120 w-120 bg-loading-website-grid-texture">
						<div className="absolute flex items-center justify-center w-full h-full">
							<div className="relative flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-loader">
								<div className="absolute flex items-center justify-center w-full h-full">
									<img
										width={ 82 }
										height={ 82 }
										className="animate-rotate"
										src={ `${ imageDir }/build-with-ai/loader-circle-dots.svg` }
										alt=""
									/>
								</div>
								<div className="absolute flex items-center justify-center w-full h-full">
									<img
										width={ 40 }
										height={ 40 }
										src={ `${ imageDir }/build-with-ai/loader-wand.svg` }
										alt=""
									/>
								</div>
							</div>
						</div>
						<img
							width={ 400 }
							height={ 288 }
							className="w-full"
							src={ `${ imageDir }/build-with-ai/frame.svg` }
							alt=""
						/>
					</div>
				) }
				<div className="flex items-center justify-center gap-x-6">
					{ showProgressBar && (
						<CircularProgressBar
							colorCircle="#3d45921a"
							linearGradient={
								status !== 'error'
									? [ '#FC8536', '#E90B76', '#B809A7' ]
									: undefined
							}
							colorSlice={
								status === 'error' ? '#EF4444' : undefined
							}
							percent={ progressPercentage }
							round
							speed={
								status === 'error' || status === 'retrying'
									? 0
									: 15
							}
							fontColor="#0F172A"
							fontSize="18px"
							fontWeight={ 700 }
							size={ 72 }
						/>
					) }
					{ status === 'error' && (
						<ExclamationTriangleIcon className="w-16 h-16 mt-2 cursor-pointer text-alert-error" />
					) }
					<div className="flex flex-col">
						<h4>
							{ status === 'error'
								? 'Something went wrong'
								: 'We are building your website...' }
						</h4>
						<p className="zw-sm-normal text-app-text w-[300px]">
							{ statusText }
						</p>
					</div>
				</div>
			</div>
			{ ! hideCloseIcon && (
				<div
					className="fixed top-0 right-0 z-50"
					onClick={ handleClose }
					aria-hidden="true"
				>
					<div className="absolute top-5 right-5 cursor-pointer">
						<XMarkIcon className="w-8 text-zip-app-inactive-icon hover:text-icon-secondary transition duration-150 ease-in-out" />
					</div>
				</div>
			) }
		</>
	);
};

export default compose(
	withDispatch( ( dispatch ) => {
		const {
			setPreviousAIStep,
			setCurrentCategory,

			setNextAIStep,
		} = dispatch( 'ast-block-templates' );

		return {
			onClickPrevious: setPreviousAIStep,
			setCurrentCategory,
			onClickNext: setNextAIStep,
		};
	} )
)( WebsiteBuilding );
