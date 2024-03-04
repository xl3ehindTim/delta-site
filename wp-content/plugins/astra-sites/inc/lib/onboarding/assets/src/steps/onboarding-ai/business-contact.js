import { useForm } from 'react-hook-form';
import { useEffect, useState } from '@wordpress/element';
import { withDispatch, useDispatch, useSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import SocialMediaAdd from './components/social-media';
import Textarea from './components/textarea';
import Input from './components/input';
import { STORE_KEY } from './store';
import Divider from './components/divider';
import Heading from './heading';
import NavigationButtons from './navigation-buttons';

const mapSocialUrl = ( list ) => {
	return list.map( ( item ) => {
		return {
			type: item.id,
			id: item.id,
			url: item.url,
		};
	} );
};

const BusinessContact = ( {
	onClickContinue,
	onClickPrevious,
	onClickSkip,
} ) => {
	const { businessContact } = useSelect( ( select ) => {
		const { getAIStepData } = select( STORE_KEY );
		return getAIStepData();
	} );
	const { setWebsiteContactAIStep } = useDispatch( STORE_KEY );
	const [ socialMediaList, setSocialMediaList ] = useState(
		mapSocialUrl( businessContact.socialMedia ?? [] )
	);

	const handleOnChangeSocialMedia = ( list ) => {
		setSocialMediaList( list );
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		setFocus,
	} = useForm( { defaultValues: { ...businessContact } } );

	const handleSubmitForm = ( data ) => {
		setWebsiteContactAIStep( {
			...data,
			socialMedia: mapSocialUrl( socialMediaList ),
		} );
		onClickContinue();
	};

	useEffect( () => {
		setFocus( 'email' );
	}, [ setFocus ] );

	return (
		<form
			className="w-full max-w-container flex flex-col gap-8 pb-10"
			action="#"
			onSubmit={ handleSubmit( handleSubmitForm ) }
		>
			<Heading
				heading="How people can get in touch"
				subHeading="Please provide the contact information details below. These will be used on the website."
			/>
			<div className="space-y-5">
				<div className="flex justify-between gap-x-8 items-start w-full h-[76px]">
					<Input
						className="w-full h-[48px]"
						type="text"
						name="email"
						id="email"
						label="Email"
						placeholder="Your email"
						register={ register }
						error={ errors.email }
						validations={ {
							pattern: {
								value: /^[a-z0-9!'#$%&*+\/=?^_`{|}~-]+(?:\.[a-z0-9!'#$%&*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-zA-Z]{2,}$/i,
								message: 'Please enter a valid email',
							},
						} }
						height="[48px]"
					/>
					<Input
						className="w-full h-[48px]"
						type="text"
						name="phone"
						id="phone"
						label="Phone Number"
						placeholder="Your phone number"
						register={ register }
						error={ errors.phone }
						validations={ {
							pattern: {
								value: /^\+?[0-9()\s-]{6,20}$/,
								message: 'Please enter a valid phone number',
							},
						} }
						height="[48px]"
					/>
				</div>
				<Textarea
					rows={ 4 }
					name="address"
					id="address"
					label="Address"
					placeholder=""
					register={ register }
					error={ errors.address }
				/>

				<SocialMediaAdd
					list={ socialMediaList }
					onChange={ handleOnChangeSocialMedia }
				/>
			</div>
			<Divider />
			<NavigationButtons
				onClickPrevious={ onClickPrevious }
				onClickSkip={ onClickSkip }
			/>
		</form>
	);
};

export default compose(
	withDispatch( ( dispatch ) => {
		const { setNextAIStep, setPreviousAIStep } = dispatch(
			'ast-block-templates'
		);
		return {
			onClickContinue: setNextAIStep,
			onClickPrevious: setPreviousAIStep,
			onClickSkip: setNextAIStep,
		};
	} )
)( BusinessContact );
