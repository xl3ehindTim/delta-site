import { useEffect } from 'react';
import { withDispatch, useSelect, useDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import apiFetch from '@wordpress/api-fetch';
import { useStateValue } from '../../store/store';
import { STORE_KEY } from './store';
import Divider from './components/divider';
import { classNames } from './helpers/index';
import Heading from './heading';
import NavigationButtons from './navigation-buttons';
import LoadingSkeletonGroup from './components/loading-skeleton-group';

const CATEGORY_SEQUENCE = [
	'business',
	'restaurant',
	'organisation',
	'person',
	'product',
	'eCommerce',
	'event',
	'other',
];
const CATEGORY_INDEX_MAP = CATEGORY_SEQUENCE.reduce(
	( map, category, index ) => {
		map[ category.toLowerCase() ] = index;
		return map;
	},
	{}
);

const TypeItem = ( { type, selected, onClick } ) => {
	const { name, prefixIcon, suffixIcon } = type;

	const handleClick = ( item ) => ( event ) => {
		event?.preventDefault();
		event?.stopPropagation();
		if ( typeof onClick !== 'function' ) {
			return;
		}
		onClick( item );
	};

	return (
		<div
			onClick={ handleClick( type ) }
			className={ classNames(
				'flex items-center justify-center gap-2 py-3 font-medium hover:shadow-medium transition duration-150 ease-in-out cursor-pointer border border-solid rounded-full hover:border-accent-st',
				selected
					? 'text-heading-text border-accent-st shadow-medium bg-white'
					: 'text-body-text border-transparent bg-white',
				! prefixIcon && ! suffixIcon && 'px-8',
				prefixIcon && ! suffixIcon && 'pr-8 pl-6',
				! prefixIcon && suffixIcon && 'pl-8 pr-6'
			) }
			aria-hidden="true"
		>
			{ !! prefixIcon && prefixIcon }
			<span>{ name }</span>
			{ !! suffixIcon && suffixIcon }
		</div>
	);
};

const Type = ( { onClickContinue } ) => {
	const { setWebsiteTypeAIStep, setBusinessTypeListAIStep } =
		useDispatch( STORE_KEY );
	const { businessType, businessTypeList } = useSelect( ( select ) => {
		const { getAIStepData } = select( STORE_KEY );
		return getAIStepData();
	} );
	const [ , dispatch ] = useStateValue();

	const handleTypeClick = ( type ) => {
		setWebsiteTypeAIStep( type );
	};

	const handleClickContinue = () => {
		if ( ! businessType ) {
			return;
		}

		onClickContinue();
	};

	const getCategories = async () => {
		await apiFetch( {
			path: 'zipwp/v1/categories',
			method: 'GET',
			headers: {
				'X-WP-Nonce': astraSitesVars.rest_api_nonce,
			},
		} ).then( ( response ) => {
			if ( response.success ) {
				const categories = ( response.data.data || [] ).sort(
					( a, b ) => {
						const aIndex =
							CATEGORY_INDEX_MAP[ a?.name.toLowerCase() ] ??
							Infinity;
						const bIndex =
							CATEGORY_INDEX_MAP[ b?.name.toLowerCase() ] ??
							Infinity;
						return aIndex - bIndex;
					}
				);

				setBusinessTypeListAIStep( categories );
			} else {
				//  Handle error.
			}
		} );
	};

	useEffect( () => {
		getCategories();
	}, [] );

	const handlePrevious = () => {
		dispatch( {
			type: 'set',
			currentIndex: 0,
		} );
	};

	return (
		<div className="w-full max-w-container flex flex-col gap-8">
			{ /* Heading */ }
			<Heading
				heading="This website is for:"
				subHeading="Let's get started by choosing the type of website you'd like to create."
			/>
			{ /* Types */ }
			<div className="flex flex-wrap gap-3">
				{ businessTypeList?.length ? (
					businessTypeList?.map( ( type ) => (
						<TypeItem
							key={ type.slug }
							type={ type }
							selected={ businessType.slug === type.slug }
							onClick={ handleTypeClick }
						/>
					) )
				) : (
					<LoadingSkeletonGroup
						className={ 'flex flex-wrap gap-3' }
						layout={ [
							'h-[44.2px] w-[100px] rounded-full',
							'h-[44.2px] w-[134px] rounded-full',
							'h-[44.2px] w-[160px] rounded-full',
							'h-[44.2px] w-[109px] rounded-full',
							'h-[44.2px] w-[202px] rounded-full',
							'h-[44.2px] w-[178px] rounded-full',
							'h-[44.2px] w-[125px] rounded-full',
							'h-[44.2px] w-[163px] rounded-full',
							'h-[44.2px] w-[118px] rounded-full',
							'h-[44.2px] w-[143px] rounded-full',
						] }
					/>
				) }
				{  }
			</div>
			<Divider />
			{ /* Footer */ }
			<NavigationButtons
				onClickContinue={ handleClickContinue }
				disableContinue={ ! businessType?.slug }
				onClickPrevious={ handlePrevious }
			/>
		</div>
	);
};
export default compose(
	withDispatch( ( dispatch ) => {
		const { setNextAIStep, setPreviousAIStep } = dispatch( STORE_KEY );
		return {
			onClickContinue: setNextAIStep,
			onClickPrevious: setPreviousAIStep,
		};
	} )
)( Type );
