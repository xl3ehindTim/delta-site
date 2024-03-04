import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import apiFetch from '@wordpress/api-fetch';
import {
	useEffect,
	useState,
	useCallback,
	useRef,
	Fragment,
} from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withDispatch, useDispatch, useSelect } from '@wordpress/data';
import { CheckCircleColorfulIcon } from '../ui/icons';
import Masonry from './components/masonary';
import Tile from './components/tile';
import SuggestedKeywords from './components/suggested-keywords';
import TagsInput from './components/tags-input';
import Dropdown from './components/dropdown';
import { useDebounce, useDebounceWithCancel } from './hooks/use-debounce';

import { STORE_KEY } from './store';
import NavigationButtons from './navigation-buttons';
import Heading from './heading';
import { classNames } from './helpers';

const ORIENTATIONS = {
	all: {
		value: 'all',
		label: 'All',
	},
	landscape: {
		value: 'landscape',
		label: 'Landscape',
	},
	portrait: {
		value: 'portrait',
		label: 'Portrait',
	},
};

const IMAGES_PER_PAGE = 20;
const PRE_SELECTED_IMAGES_PORTRAIT = 10;
const PRE_SELECTED_IMAGES_LANDSCAPE = 10;
const IMAGE_ENGINES = [ 'pexels', 'unsplash' ];

const getImageSkeleton = ( count = 8 ) => {
	const aspectRatioClassNames = [
		'aspect-[1/1]',
		'aspect-[1/2]',
		'aspect-[2/1]',
		'aspect-[2/2]',
		'aspect-[3/3]',
		'aspect-[4/3]',
		'aspect-[3/4]',
	];

	let aspectRatioIndex = 0;

	return Array.from( { length: count } ).map( ( _, index ) => {
		aspectRatioIndex =
			aspectRatioIndex === aspectRatioClassNames.length
				? 0
				: aspectRatioIndex;

		return (
			<Tile
				key={ index }
				className={ classNames(
					'relative overflow-hidden rounded-lg',
					'bg-slate-300 rounded-lg relative animate-pulse',
					aspectRatioClassNames[ aspectRatioIndex++ ]
				) }
			/>
		);
	} );
};

const Images = ( { onClickPrevious, onClickNext } ) => {
	const {
		setWebsiteImagesAIStep,
		setWebsiteImagesPreSelectedAIStep,
		setWebsiteTemplatesAIStep,
	} = useDispatch( STORE_KEY );

	const {
		stepsData: {
			businessName,
			selectedImages = [],
			keywords = [],
			// imagesPreSelected,
			businessType,
			businessDetails,
			businessContact,
			templateList,
		},
		updateImages,
	} = useSelect( ( select ) => {
		const {
			getAIStepData,
			getAllPatternsCategories,
			getDynamicContent,
			getOnboardingAI,
		} = select( STORE_KEY );
		const onboardingAI = getOnboardingAI();
		return {
			stepsData: getAIStepData(),
			allPatternsCategories: getAllPatternsCategories(),
			dynamicContent: getDynamicContent(),
			isNewUser: onboardingAI?.isNewUser,
			updateImages: onboardingAI?.updateImages,
		};
	} );

	const [ orientation, setOrientation ] = useState( ORIENTATIONS.all );
	const [ keyword, setKeyword ] = useState(
		keywords?.length > 0 ? keywords[ 0 ] : ''
	);
	const [ images, setImages ] = useState( [] );
	const [ page, setPage ] = useState( 1 );
	const [ hasMore, setHasMore ] = useState( true );
	const [ isLoading, setIsLoading ] = useState( false );
	const [ backToTop, setBackToTop ] = useState( false );

	const mainWrapper = useRef( null );
	const scrollContainerRef = useRef( null );
	const imageRequestCompleted = useRef( false );
	const blackListedEngines = useRef( new Set() );
	// const areImagesPreSelected = useRef( imagesPreSelected );

	const [ debouncedImageKeywords, cancelDebouncedImageKeywords ] =
		useDebounceWithCancel( keyword, 500 );

	const debouncedOrientation = useDebounce( orientation, 500 );

	console.log( { businessContact } );

	const handleOrientationChange = ( orientation_value ) => () => {
		setOrientation( orientation_value );
	};

	const handleSelectKeyword = ( keyword_value ) => {
		cancelDebouncedImageKeywords();
		setKeyword( keyword_value );
	};

	const getSuggestedKeywords = () => {
		return [ ...new Set( keywords ) ].filter( ( keywordItem ) => {
			if ( keyword.trim() === '' ) {
				return true;
			}
			return keywordItem?.toLowerCase() !== keyword?.toLowerCase();
		} );
	};

	const isSelected = ( image ) => {
		const filteredSelectedImages = selectedImages?.filter(
			( img ) => img.id === image.id
		);
		return filteredSelectedImages?.length > 0;
	};

	// Function to merge new images with old images without duplicates
	const mergeUniqueImages = ( oldImages, newImages ) => {
		const uniqueImagesMap = new Map();

		// Prioritize selected images first
		selectedImages?.forEach( ( image ) => {
			uniqueImagesMap.set( image.id, image );
		} );
		[ ...oldImages, ...newImages ].forEach( ( image ) => {
			if ( ! uniqueImagesMap.has( image.id ) ) {
				// Add check to prevent overwrite
				uniqueImagesMap.set( image.id, image );
			}
		} );

		return Array.from( uniqueImagesMap.values() );
	};

	const handleImageSelection = useCallback(
		( image ) => ( event ) => {
			event.preventDefault();
			event.stopPropagation();
			let newSelectedImages = [];

			if ( isSelected( image ) ) {
				image.id = String( image.id );
				newSelectedImages = selectedImages?.filter(
					( img ) => img.id !== image.id
				);
			} else {
				newSelectedImages = [ ...selectedImages, image ];
			}

			setWebsiteImagesAIStep( newSelectedImages );
		},
		[ selectedImages, setWebsiteImagesAIStep ] // eslint-disable-line
	);

	const handleClearImageSelection = useCallback(
		( event ) => {
			event.preventDefault();
			event.stopPropagation();

			setWebsiteImagesAIStep( [] );
		},
		[ setWebsiteImagesAIStep ]
	);

	const handleClickBackToTop = () => {
		if ( ! scrollContainerRef.current ) {
			return;
		}
		setBackToTop( false );
		scrollContainerRef.current.scrollTo( {
			top: 0,
			behavior: 'smooth',
		} );
		mainWrapper.current.scrollTo( {
			top: 0,
			behavior: 'smooth',
		} );
	};

	const handleShowBackToTop = ( event ) => {
		if ( ! event ) {
			return;
		}
		const { scrollTop } = event.target;
		const { scrollTop: mainScrollTop, scrollHeight: mainScrollHeight } =
			mainWrapper.current;
		const SCROLL_THRESHOLD = 50;
		if ( scrollTop > SCROLL_THRESHOLD && ! backToTop ) {
			setBackToTop( true );
			mainWrapper.current.scrollTo( {
				top: mainWrapper.current.scrollHeight,
				behavior: 'smooth',
			} );
		}
		if ( scrollTop <= SCROLL_THRESHOLD && backToTop ) {
			setBackToTop( false );
			mainWrapper.current.scrollTo( {
				top: 0,
				behavior: 'smooth',
			} );
		}
		if (
			scrollTop > SCROLL_THRESHOLD &&
			mainScrollTop < mainScrollHeight
		) {
			mainWrapper.current.scrollTo( {
				top: mainWrapper.current.scrollHeight,
				behavior: 'smooth',
			} );
		}
	};

	const handleScroll = ( event ) => {
		if ( ! event ) {
			return;
		}
		handleShowBackToTop( event );

		if ( ! hasMore || isLoading ) {
			return;
		}

		const { scrollTop, scrollHeight, clientHeight } =
			scrollContainerRef.current;

		// Load more images when user is 200px away from the bottom
		if ( scrollTop + clientHeight >= scrollHeight - 100 ) {
			setPage( ( prev ) => prev + 1 );
		}
	};

	const handlePreSelectImages = ( imgValues ) => {
		// if ( !! areImagesPreSelected.current ) {
		// 	return;
		// }

		const allPreSelectedImages = imgValues
			.filter(
				( image ) => image.orientation === ORIENTATIONS.landscape.value
			)
			.slice( 0, PRE_SELECTED_IMAGES_LANDSCAPE )
			.concat(
				imgValues
					.filter(
						( image ) =>
							image.orientation === ORIENTATIONS.portrait.value
					)
					.slice( 0, PRE_SELECTED_IMAGES_PORTRAIT )
			);

		setWebsiteImagesAIStep( allPreSelectedImages );

		if ( allPreSelectedImages.length === 0 ) {
			return;
		}
		setWebsiteImagesPreSelectedAIStep( true );
		// areImagesPreSelected.current = true;

		return allPreSelectedImages;
	};

	// Define a function to fetch all images
	const fetchAllImages = async ( engine ) => {
		// eslint-disable-line
		let searchKeywords = keyword;

		// If we the input filed is empty we are passing the keyword as businessName[category]
		if (
			typeof keyword === 'string' &&
			( ! keyword || keyword.trim() === '' )
		) {
			searchKeywords = businessName;
		}

		const payload = {
			keywords: searchKeywords,
			orientation: orientation.value,
			per_page: IMAGES_PER_PAGE?.toString(),
			page: page?.toString(),
		};
		try {
			const res = await apiFetch( {
				path: `zipwp/v1/images`,
				data: { ...payload, engine },
				method: 'POST',
				headers: {
					'X-WP-Nonce': astraSitesVars.rest_api_nonce,
				},
			} );
			const imageResponse = res.data?.data || [];

			// If there are no images, blacklist the engine
			if ( imageResponse?.length === 0 ) {
				blackListedEngines.current.add( engine );
			}

			// Filter out images that are already selected
			const newImages =
				imageResponse?.length > 0
					? imageResponse
							.map( ( image ) => ( {
								...image,
								id: String( image.id ),
							} ) )
							.filter(
								( image ) =>
									! selectedImages?.some(
										( prevImage ) =>
											prevImage.id === image.id
									)
							)
					: [];

			// Pre-select images for user.
			// handlePreSelectImages( newImages ); // do not autoselect images

			// Combine with existing images
			setImages( ( prevImages ) =>
				mergeUniqueImages( prevImages, newImages )
			);

			// Return image response length
			return imageResponse?.length || 0;
		} catch ( error ) {
			// Do nothing
			console.error( error );
		}

		return 0;
	};

	const getTemplates = async () => {
		await apiFetch( {
			path: 'zipwp/v1/template-keywords',
			method: 'POST',
			headers: {
				'X-WP-Nonce': astraSitesVars.rest_api_nonce,
			},
			data: {
				business_name: businessName,
				business_description: businessDetails,
				business_category: businessType.id.toString(),
				business_category_name: businessType.name,
			},
		} ).then( ( response ) => {
			if ( response.success ) {
				setWebsiteTemplatesAIStep( response.data.data );
			} else {
				// Handle error.
			}
		} );
	};

	useEffect( () => {
		imageRequestCompleted.current = false;
		const fetchAllImagesFromAllEngines = async () => {
			if ( isLoading ) {
				return;
			}
			try {
				setIsLoading( true );
				const responseLengths = await Promise.all(
					IMAGE_ENGINES.map( async ( engine ) => {
						if ( ! blackListedEngines.current.has( engine ) ) {
							return await fetchAllImages( engine );
						}
					} )
				);

				if (
					Math.max( responseLengths.filter( Boolean ) ) <
					IMAGES_PER_PAGE
				) {
					setHasMore( false );
				} else {
					setHasMore( true );
				}
			} catch ( error ) {
				// Do nothing
				console.error( error );
			} finally {
				imageRequestCompleted.current = true;
				setIsLoading( false );
			}
		};

		fetchAllImagesFromAllEngines();
	}, [ debouncedImageKeywords, debouncedOrientation, page ] );

	useEffect( () => {
		imageRequestCompleted.current = false;
		blackListedEngines.current.clear();
		setPage( 1 );
		setImages( [] );
	}, [ keyword, orientation ] );

	// Trigger to load more images.
	useEffect( () => {
		mainWrapper.current = document.getElementById(
			'sp-onboarding-content-wrapper'
		);
		const mainWrapperElem = mainWrapper.current;
		if (
			!! mainWrapperElem &&
			! mainWrapperElem.classList.contains( 'hide-scrollbar' )
		) {
			mainWrapperElem.classList.add( 'hide-scrollbar' );
		}

		return () => {
			if (
				!! mainWrapperElem &&
				mainWrapperElem.classList.contains( 'hide-scrollbar' )
			) {
				mainWrapperElem.classList.remove( 'hide-scrollbar' );
			}
		};
	}, [] );

	useEffect( () => {
		if ( ! templateList?.length ) {
			getTemplates();
		}
	}, [ templateList ] );

	const renderImages = isLoading
		? [ ...images, ...getImageSkeleton() ]
		: images;

	const handleSaveDetails = async ( selImages = selectedImages ) => {
		await apiFetch( {
			path: 'zipwp/v1/user-details',
			method: 'POST',
			headers: {
				'X-WP-Nonce': astraSitesVars.rest_api_nonce,
			},
			data: {
				business_description: businessDetails,
				business_name: businessName,
				business_category: businessType.id.toString(),
				business_category_name: businessType.name.toString(),
				business_category_slug: businessType.slug.toString(),
				images: selImages,
				keywords,
				business_address: businessContact?.address || '',
				business_phone: businessContact?.phone || '',
				business_email: businessContact?.email || '',
				social_profiles: businessContact?.socialMedia || [],
			},
		} ).then( ( response ) => {
			if ( response.success ) {
				console.log( 'response: ', response );
			} else {
				//  Handle error.
			}
		} );
	};

	const handleClickNext = async () => {
		let updatedSelectedImages = selectedImages;

		// if user hasn't selected any images, pre-select images
		if ( selectedImages.length < 1 ) {
			updatedSelectedImages = await handlePreSelectImages( images );
			setWebsiteImagesAIStep( updatedSelectedImages );
		}

		await handleSaveDetails( updatedSelectedImages );
		onClickNext();
	};

	return (
		<div
			className="w-full flex flex-col flex-auto h-full overflow-y-auto"
			ref={ scrollContainerRef }
			onScroll={ handleScroll }
		>
			<Heading
				heading="Select Images"
				className="px-5 md:px-10 lg:px-14 xl:px-15 pt-5 md:pt-10 lg:pt-12 xl:pt-12"
			/>
			<div className="pt-4 sticky top-0 space-y-4 z-[1] bg-zip-app-light-bg px-5 md:px-10 lg:px-14 xl:px-15">
				<TagsInput
					className={ classNames( 'flex flex-wrap bg-white py-3' ) }
					tokenClassName="!rounded-full"
					value={ keyword }
					onChange={ ( value ) => {
						let inputValue = '';
						if ( Array.isArray( value ) ) {
							inputValue = value.join( ' ' );
						}
						setKeyword( inputValue );
					} }
					placeholder="Add more relevant keywords..."
					delimiters={ [ ',', ';', '\n' ] }
					maxTokens={ 1 }
				/>
				<SuggestedKeywords
					keywordClassName=""
					keywords={ getSuggestedKeywords() }
					onClick={ handleSelectKeyword }
				/>
				<div className=" rounded-t-lg py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-1 text-sm font-normal leading-[21px]">
							<span>
								{ selectedImages?.length ?? 0 }{ ' ' }
								{ selectedImages?.length === 1
									? 'image'
									: 'images' }{ ' ' }
								selected
							</span>
							{ !! selectedImages?.length && (
								<button
									onClick={ handleClearImageSelection }
									className="px-1 py-px bg-transparent border border-solid border-border-primary rounded text-xs leading-4 text-body-text cursor-pointer"
								>
									Clear
								</button>
							) }
						</div>
						<Dropdown
							placement="right"
							trigger={
								<div className="flex items-center gap-2 min-w-[100px]">
									<span className="text-sm font-normal text-body-text leading-[150%]">
										Orientation: { '' }
										{ orientation.label }
									</span>
									<ChevronDownIcon className="w-5 h-5 text-app-inactive-icon" />
								</div>
							}
							align="top"
							width="48"
							contentClassName="p-4 bg-white [&>:first-child]:pb-3 [&>:last-child]:pt-3 [&>:not(:first-child,:last-child)]:py-3 !divide-y !divide-border-primary divide-solid divide-x-0"
						>
							{ Object.values( ORIENTATIONS ).map(
								( orientationItem, index ) => (
									<Dropdown.Item
										as="div"
										key={ index }
										className="only:!p-0"
									>
										<button
											type="button"
											className="w-full flex items-center gap-2 px-1.5 py-1 text-sm font-normal leading-5 text-body-text hover:bg-background-secondary transition duration-150 ease-in-out space-x-2 rounded bg-white border-none cursor-pointer"
											onClick={ handleOrientationChange(
												orientationItem
											) }
										>
											{ orientationItem.label }
										</button>
									</Dropdown.Item>
								)
							) }
						</Dropdown>
					</div>
				</div>
			</div>
			<div className="rounded-b-lg py-4 flex flex-col flex-auto relative px-5 md:px-10 lg:px-14 xl:px-15">
				{ renderImages?.length > 0 && (
					<Masonry
						rowClassName="gap-x-6 mx-auto my-0"
						columnClassName="gap-y-6 space-y-px"
						breakPoints={ [ 460, 656, 856 ] }
					>
						{ renderImages.map( ( image ) =>
							image?.optimized_url ? (
								<div key={ image?.id }>
									<Tile
										key={ image?.id }
										className={ classNames(
											'flex relative overflow-hidden rounded-lg border border-solid border-transparent',
											isSelected( image ) &&
												'border-accent-st ring-2 ring-accent-st'
										) }
										onClick={ handleImageSelection(
											image
										) }
									>
										<img
											className="inline-block w-full relative aspect-[12/8] bg-background-secondary"
											src={ image.optimized_url }
											alt={ image?.description ?? '' }
											loading="lazy"
											onLoad={ ( event ) => {
												event.target.classList.remove(
													'aspect-[12/8]'
												);
											} }
										/>
										{ isSelected( image ) && (
											<>
												<div className="absolute top-0 right-0 p-2">
													<CheckCircleColorfulIcon className="w-6 h-6" />
												</div>
											</>
										) }
									</Tile>
									{ image?.author_name && (
										<a
											href={ image?.author_url }
											target="_blank"
											className="block w-11/12 mt-1 mx-1 text-[0.625rem] font-normal leading-3 !text-secondary-text no-underline"
											rel="noreferrer"
										>
											by { image.author_name } via{ ' ' }
											{ image.engine
												.charAt( 0 )
												.toUpperCase() +
												image.engine.slice( 1 ) }
										</a>
									) }
								</div>
							) : (
								<Fragment
									key={ Math.random()
										.toString( 36 )
										.substring( 2, 10 ) }
								>
									{ image }
								</Fragment>
							)
						) }
					</Masonry>
				) }

				{ ! isLoading &&
					! images.length &&
					imageRequestCompleted.current && (
						<div className="flex flex-col items-center justify-center h-full">
							<p className="text-secondary-text text-center px-10 py-5 border-2 border-dashed border-border-primary rounded-md">
								{ ! keyword.length ? (
									<>
										Find the perfect images for your website
										by entering a keyword or selecting from
										the suggested options.
									</>
								) : (
									<>
										We couldn`t find anything with your
										keyword.
										<br />
										Try to refine your search.
									</>
								) }
							</p>
						</div>
					) }
				{ ! isLoading && ! hasMore && !! images.length && (
					<div className="pb-5 pt-10 flex flex-col items-center justify-center h-full">
						<p className="text-secondary-text text-sm leading-5 text-center after:mx-2.5 after:content-[''] after:inline-block after:w-5 sm:after:w-12 after:h-px after:bg-app-border after:relative after:-top-[5px] before:mx-2.5 before:content-[''] before:inline-block before:w-5 sm:before:w-12 before:h-px before:bg-app-border before:relative before:-top-[5px]">
							End of the search results
						</p>
					</div>
				) }
			</div>
			{ /* Back to the top */ }
			{ backToTop && (
				<div className="absolute right-20 bottom-28 ml-auto">
					<button
						type="button"
						className="absolute bottom-0 right-0 z-10 w-8 h-8 rounded-full bg-accent-st border-0 border-solid text-white flex items-center justify-center shadow-sm cursor-pointer"
						onClick={ handleClickBackToTop }
					>
						<ChevronUpIcon className="w-5 h-5" />
					</button>
				</div>
			) }
			<div className="min-h-[100px] py-4 sticky bottom-0 bg-zip-app-light-bg px-5 md:px-10 lg:px-14 xl:px-15">
				<NavigationButtons
					{ ...( updateImages
						? {
								continueButtonText: 'Save & Exit',
								onClickContinue: handleSaveDetails,
						  }
						: {
								onClickContinue: handleClickNext,
								onClickSkip: handleClickNext,
								onClickPrevious,
						  } ) }
				/>
			</div>
		</div>
	);
};

export default compose(
	withDispatch( ( dispatch ) => {
		const { setPreviousAIStep, setCurrentCategory, setNextAIStep } =
			dispatch( STORE_KEY );

		return {
			onClickPrevious: setPreviousAIStep,
			setCurrentCategory,
			onClickNext: setNextAIStep,
		};
	} )
)( Images );
