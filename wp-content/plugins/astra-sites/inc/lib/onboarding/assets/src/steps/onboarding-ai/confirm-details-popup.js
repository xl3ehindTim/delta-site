import React, { useState } from 'react';
import { useSelect } from '@wordpress/data';
import Modal from './components/modal';
import Button from './components/button';
import { STORE_KEY } from './store';
import { classNames } from './helpers';
import Divider from './components/divider';
import LoadingSpinner from './components/loading-spinner';

const ConfirmationModal = ( { open, setOpen, onClickGenerate } ) => {
	const {
		// businessType: { name: businessType },
		businessName,
		businessDetails,
		businessContact: { email, phone, address },
	} = useSelect( ( select ) => {
		const { getAIStepData, getOnboardingAI, getAllPatternsCategories } =
			select( STORE_KEY );

		return {
			...getAIStepData(),
			isNewUser: getOnboardingAI()?.isNewUser,
			allPatternsCategories: getAllPatternsCategories(),
		};
	}, [] );

	const [ isLoading, setIsLoading ] = useState( false );

	const [ showFullDescription, setShowFullDescription ] = useState( false );

	const handleShowFullDescription = () => {
		setShowFullDescription( true );
	};

	return (
		<Modal width="640" open={ open } setOpen={ setOpen }>
			<div className="font-sans">
				<h1 className="font-bold">
					Congratulations, { `you're almost there!` } 🎉
				</h1>
				<div className="pt-2 text-base text-app-text">
					{ `Before we hit the final button, let's quickly double-check
					everything.` }
				</div>
			</div>
			<div className="mt-4 custom-confirmation-modal-scrollbar border border-solid border-gray-300 rounded-md p-2 ">
				<div className="space-y-4 p-3 overflow-y-auto max-h-[19rem]">
					<div className="">
						<div className="font-bold leading-6 text-base">
							Business Name:
						</div>
						<div className="text-app-heading">{ businessName }</div>
					</div>
					<Divider className={ 'mt-0' } />
					<div className="">
						<div className="font-bold leading-6 text-base">
							Business Description:
						</div>
						{ businessDetails &&
						businessDetails > 140 &&
						! showFullDescription ? (
							<>
								<div className="text-app-heading">
									{ businessDetails.slice( 0, 140 ) }
									... { '' }
									<button
										className="text-blue-500 hover:underline cursor-pointer"
										onClick={ handleShowFullDescription }
									>
										Show More
									</button>
								</div>
							</>
						) : (
							<div className="text-app-heading">
								{ businessDetails }
							</div>
						) }
					</div>
					{ !! ( email || phone || address ) && (
						<>
							<Divider className={ 'mt-0' } />

							<div>
								<div className="font-bold leading-6 text-base">
									Contact Details:
								</div>
								<div className="text-app-heading">
									{ email }
								</div>
								<div className="text-app-heading">
									{ phone }
								</div>
								<div className="text-app-heading">
									{ address }
								</div>
							</div>
						</>
					) }
				</div>
			</div>

			<div className="mt-4 space-y-4 text-center">
				{ /* <Button
					className="w-full bg-confirmation-modal text-white py-3 px-4.5 text-base"
					onClick={ onClickStartBuilding }
					size="l"
					variant="other"
				>
					Start Building the Website
				</Button>
				<button
					className="text-app-secondary font-medium py-2 px-4 rounded w-full"
					onClick={ () => setOpen( false ) }
				>
					Back
				</button> */ }
				<Button
					className={ classNames( 'w-full min-w-fit min-h-[45px]' ) }
					variant="primary"
					hasSuffixIcon={ isLoading }
					onClick={ ( e ) => {
						setIsLoading( true );
						onClickGenerate( e );
					} }
				>
					{ isLoading ? (
						<LoadingSpinner />
					) : (
						'Yes! Build This Website.'
					) }
				</Button>

				<Button
					className={ classNames( 'w-full min-h-[45px]' ) }
					variant="white"
					onClick={ () => setOpen( false ) }
				>
					Back
				</Button>
			</div>
		</Modal>
	);
};

export default ConfirmationModal;
