import { useEffect, useRef } from 'react';
import { useSelect, useDispatch } from '@wordpress/data';
import { classNames } from '../helpers';
import { STORE_KEY } from '../store';
import { addHttps, sendPostMessage } from '../utils/helpers';
import TemplateInfo from './template-info';

export const ColumnItem = ( { template, isRecommended, position } ) => {
	const { businessName, selectedImages, templateList, selectedTemplate } =
		useSelect( ( select ) => {
			const { getAIStepData } = select( STORE_KEY );
			return getAIStepData();
		} );

	const { setWebsiteSelectedTemplateAIStep } = useDispatch( STORE_KEY );
	const containerRef = useRef( null );
	const loadingSkeleton = useRef( null );

	const url = template.domain + '?style=wireframe&preview_demo=yes';

	const handleScaling = () => {
		if ( ! containerRef.current ) return;
		const clientWidth = containerRef.current.clientWidth;
		const scaleValue = clientWidth / 1200;
		containerRef.current.firstChild.style.transform = `scale(${ scaleValue })`;
	};

	useEffect( () => {
		handleScaling();
	}, [] );

	useEffect( () => {
		window.addEventListener( 'resize', handleScaling );

		return () => {
			window.removeEventListener( 'resize', handleScaling );
		};
	}, [] );

	const handleRemoveLoadingSkeleton = ( uuid ) => {
		if ( ! loadingSkeleton.current ) return;
		loadingSkeleton.current.remove();
		const landscape = [];
		const portrait = [];
		selectedImages.forEach( ( image ) => {
			if ( image.orientation === 'landscape' ) {
				landscape.push( image );
			} else {
				portrait.push( image );
			}
		} );
		sendPostMessage(
			{
				param: 'images',
				data: {
					landscape,
					portrait,
				},
			},
			uuid
		);

		const templateData = templateList.find(
			( site ) => site.uuid === uuid
		);

		if ( templateData?.content ) {
			sendPostMessage(
				{
					param: 'content',
					data: templateData.content,
					businessName,
				},
				uuid
			);
		}
	};

	const hoverScrollTimeout = useRef( null );

	return (
		<div
			className={ classNames(
				'w-[calc(30%)] lg:w-[calc(50%_-_20px)] xl:w-[calc(30%)]  border border-zip-app-border-hover border-solid p-1',
				selectedTemplate === template.uuid &&
					'bg-clip-border bg-gradient-to-tr from-gradient-color-1 via-46.88 via-gradient-color-2 to-100 to-gradient-color-3'
			) }
		>
			<div
				className={ classNames(
					'w-full h-fit p-1 bg-zip-app-highlight-bg'
				) }
			>
				<div
					ref={ containerRef }
					key={ template.uuid }
					className="w-full max-h-[calc(19_/_15_*_100%)] pt-[calc(19_/_15_*_100%)] relative  shadow-md overflow-hidden bg-neutral-300"
				>
					<div className="scale-[0.33] w-[1200px] h-[1600px] absolute left-0 top-0 origin-top-left">
						<iframe
							title={ template?.domain }
							className="absolute w-[1200px] h-[1600px]"
							src={ addHttps( url ) }
							onLoad={ () =>
								handleRemoveLoadingSkeleton( template.uuid )
							}
							frameBorder="0"
							scrolling="no"
							id={ template.uuid }
						/>
						<div
							onClick={ () => {
								setWebsiteSelectedTemplateAIStep(
									template.uuid
								);
							} }
							onMouseEnter={ () => {
								hoverScrollTimeout.current = setTimeout( () => {
									sendPostMessage(
										{
											param: 'template-hover',
											data: {
												action: 'scroll-start',
											},
										},
										template.uuid
									);
								}, 1000 );
							} }
							onMouseLeave={ () => {
								clearTimeout( hoverScrollTimeout.current );
								sendPostMessage(
									{
										param: 'template-hover',
										data: {
											action: 'scroll-stop',
										},
									},
									template.uuid
								);
							} }
							className="absolute inset-0 w-full h-full bg-transparent"
						/>
					</div>
					{ isRecommended && (
						<div
							className="absolute top-3 right-5 h-6 zw-xs-semibold text-white flex items-center 
                        justify-center rounded-3xl bg-gradient-to-r from-gradient-color-1 via-46.88 via-gradient-color-2 
                        to-gradient-color-3 px-3 pointer-events-none"
						>
							Recommended
						</div>
					) }
					<TemplateInfo template={ template } position={ position } />

					<div
						ref={ loadingSkeleton }
						className="absolute inset-0 flex flex-col bg-white shadow-md  items-center"
					>
						<div className="w-full flex items-center p-4 space-x-5">
							<div
								data-placeholder
								className="h-5 w-10 rounded-full overflow-hidden relative bg-gray-200"
							/>
							<div className="w-full flex justify-between items-center gap-2">
								<div
									data-placeholder
									className="h-5 w-1/3 overflow-hidden relative bg-gray-200 rounded-md"
								/>
								<div
									data-placeholder
									className="h-5 w-1/3 overflow-hidden relative bg-gray-200 rounded-md"
								/>
								<div
									data-placeholder
									className="h-5 w-1/3 overflow-hidden relative bg-gray-200 rounded-md"
								/>
							</div>
						</div>
						<div
							data-placeholder
							className="h-52 w-full overflow-hidden relative bg-gray-200"
						/>

						<div className="w-full flex flex-col p-4 space-y-2">
							<div
								data-placeholder
								className="flex h-3 w-10/12 overflow-hidden relative bg-gray-200 rounded"
							/>
							<div
								data-placeholder
								className="flex h-3 w-10/12 overflow-hidden relative bg-gray-200 rounded"
							/>
							<div
								data-placeholder
								className="flex h-3 w-1/2 overflow-hidden relative bg-gray-200 rounded"
							/>
						</div>
						<div className="w-full h-px  overflow-hidden relative bg-gray-200 m-4" />
						<div className="flex justify-between items-center p-4 w-full gap-3">
							<div
								data-placeholder
								className="h-14 w-1/3 rounded-md overflow-hidden relative bg-gray-200"
							/>
							<div
								data-placeholder
								className="h-14 w-1/3 rounded-md overflow-hidden relative bg-gray-200"
							/>
							<div
								data-placeholder
								className="h-14 w-1/3 rounded-md overflow-hidden relative bg-gray-200"
							/>
						</div>
						<div className="flex justify-between items-end flex-1 w-full">
							<div
								data-placeholder
								className="h-5 w-full overflow-hidden relative bg-gray-200"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
