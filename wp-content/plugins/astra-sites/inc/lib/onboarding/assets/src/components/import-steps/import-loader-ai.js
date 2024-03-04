import React, { useEffect } from 'react';
// import { __, sprintf } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';

import { useStateValue } from '../../store/store';
// import { Button } from '../../components';
// import ICONS from '../../../icons';
import { getTotalTime } from '../../utils/functions';
// const { siteUrl } = starterTemplates;

const ImportLoaderAi = ( { onClickNext } ) => {
	const [ { importPercent, builder, importStatus, importError }, dispatch ] =
		useStateValue();

	useEffect( () => {
		if ( importPercent !== 100 || importError ) return;

		const start = localStorage.getItem( 'st-import-start' );
		const end = localStorage.getItem( 'st-import-end' );
		const diff = end - start;
		const unixTimeInSeconds = Math.floor( diff / 1000 );

		const totalTime = start && end ? getTotalTime( unixTimeInSeconds ) : 0;
		const typeOfTime = totalTime > 1 ? 'minutes' : 'seconds';

		const timeTaken = totalTime;

		const themeName = builder !== 'fse' ? '@AstraWP' : '@WPSpectra';

		// document.body.classList.add( 'step-import-site-done' );

		dispatch( {
			type: 'set',
			confettiDone: true,
			importTimeTaken: {
				time: timeTaken,
				type: typeOfTime,
				themeName,
			},
		} );
		onClickNext();
	}, [ importPercent, importStatus, importError ] );

	return (
		<div className="ist-import-progress ist-ai" style={ { marginTop: 0 } }>
			<div
				className="ist-import-progress-info"
				style={ {
					marginTop: 0,
					marginBottom: 0,
				} }
			>
				{ /* <div
					className={ `ist-import-progress-info-text ${ doneClass }` }
				>
					<span className="ist-import-text-inner">{ stepText }</span>
					<span className="ist-import-done-inner">
						{ descMessage }
					</span>
				</div> */ }
				{ /* <div className="ist-import-progress-info-precent">
					{ importPercent > 100 ? 90 : importPercent }%
				</div> */ }
			</div>
			{ /* <div className="ist-import-progress-bar-wrap">
				<div className="ist-import-progress-bar-bg">
					<div
						className={ `ist-import-progress-bar ${ doneClass } ${ percentClass }` }
					/>
				</div>
				<div className="import-progress-gap">
					<span />
					<span />
					<span />
				</div>
			</div> */ }
			<div
				className="ist-import-progress-info"
				style={ {
					marginTop: 0,
					marginBottom: 0,
				} }
			>
				<div className={ `ist-import-progress-info-text` }>
					<span className="import-status-string">
					<p>{ importStatus + decodeEntities( '&nbsp;' ) }</p>
					</span>
					<div className="import-done-section">
						{ /* <div className="tweet-import-success">
							<p className="tweet-text">{ tweetMessage }</p>
							<a
								href={ `https://twitter.com/intent/tweet?text=${ tweetMessage }` }
								target="_blank"
								className="twitter-btn-wrap"
								rel="noreferrer"
							>
								<p className="tweet-btn">
									{ __( 'Tweet this', 'astra-sites' ) }
								</p>
								{ ICONS.twitter }
							</a>
						</div> */ }
						{ /* <div className="import-done-text">
							<Button
								className="view-website-btn import-done-button"
								after
								onClick={ () => {
									window.open( siteUrl, '_blank' );
								} }
							>
								{ __( 'View Your Website', 'astra-sites' ) }
							</Button>
						</div> */ }
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImportLoaderAi;
