import React, { useEffect, useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@brainstormforce/starter-templates-components';
import { __ } from '@wordpress/i18n';
import { useDispatch, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { Button } from '../../../components/index';
import { useStateValue } from '../../../store/store';
import { STORE_KEY } from '../../onboarding-ai/store';
import Logo from '../../../components/logo';
import ICONS from '../../../../icons';
import { Graphics } from './graphics';

const { adminUrl } = starterTemplates;

const GetStarted = ( { onClickNext } ) => {
	const [ , dispatch ] = useStateValue();
	const { setLimitExceedModal } = useDispatch( STORE_KEY );

	const zipPlans = astraSitesVars?.zip_plans;
	const sitesRemaining = zipPlans?.plan_data?.remaining;
	const aiSitesRemainingCount = sitesRemaining?.ai_sites_count;
	const allSitesRemainingCount = sitesRemaining?.all_sites_count;
	const [ isLoading, setIsLoading ] = useState( true );

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

	useEffect( () => {
		if ( astraSitesVars?.zip_token_exists ) {
			onClickNext();
		} else {
			setIsLoading( false );
		}
	}, [] );

	if ( isLoading ) {
		return <div className="w-screen h-screen bg-[#f7f7f9]" />;
	}

	return (
		<div className="w-full h-screen max-h-screen bg-st-background-secondary">
			{
				<div className="step-header">
					{
						<div className="row">
							<div className="col">
								<Logo />
							</div>
							<div className="right-col">
								<div className="col exit-link">
									<a href={ adminUrl }>
										<Tooltip
											content={ __(
												'Exit to Dashboard',
												'astra-sites'
											) }
										>
											{ ICONS.remove }
										</Tooltip>
									</a>
								</div>
							</div>
						</div>
					}

					<canvas
						id="ist-bashcanvas"
						width={ window.innerWidth }
						height={ window.innerHeight }
					/>
				</div>
			}
			<div className="flex w-full h-[calc(100vh_-_140px)]">
				<div className="gap-10 lg:gap-16 h-full flex items-center justify-center w-full">
					<div className="flex flex-col items-start justify-center gap-6 h-full">
						<h1 className="font-bold">
							Building a website has never been this easy!
						</h1>
						<p className=" m-0 !text-zip-body-text !text-xl !font-normal">
							Here is how the AI Website Builder works:
						</p>
						<ul className="list-decimal ml-6 my-0 !text-zip-body-text !text-xl font-normal">
							<li className="text-start">
								Create a free account on ZipWP platform.
							</li>
							<li className="text-start">
								Describe your dream website in your own words.
							</li>
							<li className="text-start">
								Watch as AI crafts your WordPress website
								instantly.
							</li>
							<li className="text-start">
								Refine the website with an easy drag & drop
								builder.
							</li>
							<li className="text-start">Launch.</li>
						</ul>

						<div className="gap-6 mt-4 flex flex-col items-start justify-start">
							<Button
								variant="primary"
								hasSuffixIcon
								onClick={ () => {
									const url =
										wpApiSettings?.zipwp_auth?.screen_url +
										'?type=token&redirect_url=' +
										wpApiSettings?.zipwp_auth?.redirect_url;
									window.location.href = url;
								} }
							>
								<span className="mr-2">{ `Let's Get Started. It's Free` }</span>
								<ArrowRightIcon className="w-5 h-5" />
							</Button>
							<button
								className="w-auto p-0 m-0 focus:outline-none bg-transparent border-0 cursor-pointer !text-zip-body-text"
								onClick={ () => {
									dispatch( {
										type: 'set',
										currentIndex: 0,
									} );
								} }
							>
								Back
							</button>
						</div>
					</div>
					<div className="self-center">
						<Graphics />
					</div>
				</div>
			</div>
		</div>
	);
};

export default compose(
	withDispatch( ( dispatch ) => {
		const { setNextAIStep } = dispatch( STORE_KEY );
		return {
			onClickNext: setNextAIStep,
		};
	} )
)( GetStarted );
