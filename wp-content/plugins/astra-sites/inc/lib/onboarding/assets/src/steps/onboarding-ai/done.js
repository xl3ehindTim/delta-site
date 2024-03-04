import React, { useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useSelect, withDispatch } from '@wordpress/data';

import { compose } from '@wordpress/compose';
import { FacebookIcon, LinkedInIcon, TwitterXLogo } from '../ui/icons';
import { useStateValue } from '../../store/store';
import Button from './components/button';
import LoadingSpinner from './components/loading-spinner';
import Confetti from './components/Confetti';
import { STORE_KEY } from './store';
import Divider from './components/divider';

const BuildDone = () => {
	const [ isLoading, setIsLoading ] = useState( false );
	const [ , dispatch ] = useStateValue();

	const { websiteInfo } = useSelect( ( select ) => {
		const { getWebsiteInfo } = select( STORE_KEY );

		return {
			websiteInfo: getWebsiteInfo(),
		};
	} );

	const goToCustomizationScreen = () => {
		setIsLoading( true );
		dispatch( {
			type: 'set',
			currentIndex: 2,
			currentCustomizeIndex: 0,
			createdSite: websiteInfo,
		} );
	};

	const postMessage = encodeURIComponent(
		'I just started building my website today, and it is already 70% complete — thanks to the incredible @Zip_WP AI builder. All I had to do was explain my idea, and boom, a beautiful website was generated in just seconds! 💪🚀💻 #AI #WebsiteBuilder #WordPress #Innovation'
	);

	return (
		<div className="w-screen h-screen overflow-y-hidden">
			<div className="relative grid grid-cols-1 grid-rows-1 place-items-center min-h-screen py-5 md:py-0 px-5 md:px-10 bg-app-light-background ">
				<div className="w-full max-w-[32.5rem] p-8 my-10 md:my-0 rounded-lg space-y-6 shadow-xl bg-white">
					<span className="flex items-center justify-center gap-3 text-2xl">
						<span>🎉</span>
						<span>🥳</span>
					</span>
					<div className="space-y-3 text-center">
						<h1>
							Woohoo, your website
							<br /> is ready!
						</h1>
						<p className="text-app-text text-base text-center font-normal leading-6">
							You did it! Your brand new website is all set to
							shine online.
						</p>
					</div>
					<div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
						<Button
							onClick={ () => {
								goToCustomizationScreen();
							} }
							variant="primary"
							size="l"
							className="flex-1 min-w-fit min-h-[48px]"
						>
							{ isLoading ? (
								<LoadingSpinner />
							) : (
								<div className="flex items-center justify-center gap-2">
									Start Customizations
									<ArrowRightIcon className="w-5 h-5" />
								</div>
							) }
						</Button>
					</div>

					<Divider className="my-8" />

					<div className="flex items-center flex-col px-2 justify-center py-6 text-center text-zip-body-text text-base font-normal leading-7 bg-zip-app-highlight-bg rounded-lg">
						<div>
							“I just started building my website today, and it is
							already 70% complete — thanks to the incredible
							@Zip_WP AI builder. All I had to do was explain my
							idea, and boom, a beautiful website was generated in
							just seconds! 💪🚀💻
						</div>
						<div className="mt-2">
							#AI #WebsiteBuilder #WordPress #Innovation”
						</div>
					</div>
					<div className="mt-5 ">
						<div className="text-zip-app-heading text-sm font-medium leading-5 flex items-center justify-center gap-4">
							Share:
							<div className="flex items-center justify-center gap-4">
								<a
									href={ `https://www.facebook.com/sharer/sharer.php?u=${ astraSitesVars.siteURL }` }
									target="_blank"
									rel="noopener noreferrer"
								>
									<FacebookIcon className="text-zip-body-text" />
								</a>
								<a
									href={ `https://twitter.com/intent/tweet?text=${ postMessage }` }
									target="_blank"
									className="twitter-btn-wrap"
									rel="noreferrer"
								>
									<TwitterXLogo />
								</a>

								<a
									href={ `https://www.linkedin.com/sharing/share-offsite?url=${ encodeURI(
										astraSitesVars.siteURL
									) }` }
									target="_blank"
									rel="noopener noreferrer"
									className="linkedin-btn-wrap"
								>
									<LinkedInIcon className="text-zip-body-text" />
								</a>
							</div>
						</div>
					</div>
				</div>
				{ /* Confetti firework */ }
				<Confetti />
			</div>
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
)( BuildDone );
