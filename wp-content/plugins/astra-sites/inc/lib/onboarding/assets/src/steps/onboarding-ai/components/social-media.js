import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useState } from '@wordpress/element';
import {
	FacebookIcon,
	InstagramIcon,
	LinkedInIcon,
	TwitterIcon,
	YouTubeIcon,
} from '../../ui/icons';
import Dropdown from './dropdown';
import Input from './input';

const SocialMediaItem = ( { socialMedia, onRemove, onEdit } ) => {
	const [ isEditing, setIsEditing ] = useState( false );
	const url = new URL( socialMedia.url );
	const [ editedUrl, setEditedUrl ] = useState( socialMedia.url );

	const handleDoubleClick = () => {
		setEditedUrl( socialMedia.url );
		setIsEditing( true );
	};

	const handleUpdateURL = ( value = '' ) => {
		setIsEditing( false );
		if ( ! value.trim() ) {
			setEditedUrl( url.pathname.substring( 1 ) );
			return;
		}
		onEdit( value );
	};

	const handleBlur = () => {
		handleUpdateURL( editedUrl );
	};

	const handleKeyDown = ( event ) => {
		if ( event.key === 'Enter' ) {
			event.preventDefault();
			handleUpdateURL( editedUrl );
		} else if ( event.key === 'Escape' ) {
			handleUpdateURL();
		}
	};

	return (
		<div
			key={ socialMedia.id }
			className="relative h-[50px] pl-[23px] pr-[25px] rounded-[25px] bg-white flex items-center gap-3 shadow-sm"
			onDoubleClick={ handleDoubleClick }
		>
			{ ! isEditing && (
				<div
					role="button"
					className="absolute top-0 right-0 w-4 h-4 rounded-full flex items-center justify-center cursor-pointer bg-nav-active"
					onClick={ onRemove }
					tabIndex={ 0 }
					onKeyDown={ onRemove }
				>
					<XMarkIcon className="w-4 h-4 text-white" />
				</div>
			) }
			<socialMedia.icon className="shrink-0 text-nav-active inline-block" />
			{ isEditing ? (
				<Input
					ref={ ( node ) => {
						if ( node ) {
							node.focus();
						}
					} }
					name="socialMediaURL"
					inputClassName="!border-0 !bg-transparent !shadow-none focus:!ring-0"
					value={ editedUrl }
					onChange={ ( e ) => {
						setEditedUrl( e.target.value );
					} }
					className="w-full"
					placeholder={ `Enter your ${ socialMedia.name } URL` }
					noBorder
					onBlur={ handleBlur }
					onKeyDown={ handleKeyDown }
					enableAutoGrow
				/>
			) : (
				<p className="text-base font-medium text-body-text">
					{ socialMedia.url }
				</p>
			) }
		</div>
	);
};

const SocialMediaAdd = ( { list, onChange } ) => {
	const socialMediaList = [
		{
			name: 'Facebook',
			id: 'facebook',
			icon: FacebookIcon,
		},
		{
			name: 'Twitter',
			id: 'twitter',
			icon: TwitterIcon,
		},
		{
			name: 'Instagram',
			id: 'instagram',
			icon: InstagramIcon,
		},
		{
			name: 'LinkedIn',
			id: 'linkedin',
			icon: LinkedInIcon,
		},
		{
			name: 'YouTube',
			id: 'youtube',
			icon: YouTubeIcon,
		},
	];

	const [ selectedSocialMedia, setSelectedSocialMedia ] = useState( null );
	const [ socialMediaURL, setSocialMediaURL ] = useState( '' );

	const socialMediaHandles = {
		twitter: 'twitter.com/',
		facebook: 'facebook.com/',
		instagram: 'instagram.com/',
		linkedin: 'linkedin.com/in/',
		youtube: 'youtube.com/@',
	};

	const getSocialMediaURL = ( LINK, SOCIAL_MEDIA_TYPE ) => {
		const socialMediaDomain =
			socialMediaHandles[ SOCIAL_MEDIA_TYPE?.toLowerCase() ];
		if ( ! socialMediaDomain ) {
			return null;
		}

		// Regular expression to extract handle from a URL or handle string
		const handleRegex = /^@?(.+)$/;
		const urlRegex = /^(?:https?:\/\/)?(?:www\.)?([^]+)\/(.+)$/i;

		// Check if LINK is a valid URL
		const urlMatch = LINK?.match( urlRegex );

		if ( urlMatch ) {
			if ( SOCIAL_MEDIA_TYPE === 'youtube' ) {
				return `https://${ socialMediaDomain }${ urlMatch[ 2 ].slice(
					1
				) }`;
			}
			return `https://${ socialMediaDomain }${ urlMatch[ 2 ] }`;
		}

		// If LINK is not a URL, check if it's a social media handle
		const handleMatch = LINK?.match( handleRegex );
		if ( handleMatch && SOCIAL_MEDIA_TYPE ) {
			if ( socialMediaDomain ) {
				return `https://www.${ socialMediaDomain }${ handleMatch[ 1 ] }`;
			}
		}

		// If LINK is a handle without SOCIAL_MEDIA_TYPE, return null
		if ( handleMatch ) {
			return null;
		}

		// If the input is neither a URL nor a handle, return null
		return null;
	};

	const filterList = ( socialMediaItemList ) => {
		if ( list.length === 0 ) {
			return socialMediaItemList;
		}
		const addedSocialMediaIds = list.map( ( sm ) => sm.id );
		return socialMediaItemList.filter(
			( sm ) => ! addedSocialMediaIds.includes( sm.id )
		);
	};

	const handleEnterLink = ( type ) => {
		if (
			! (
				typeof socialMediaURL === 'string' && !! socialMediaURL?.trim()
			)
		) {
			return;
		}
		const link = getSocialMediaURL( socialMediaURL.trim(), type );
		const newList = [
			...list,
			{
				...selectedSocialMedia,
				url: link,
			},
		];
		onChange( newList );
		setSelectedSocialMedia( null );
		setSocialMediaURL( '' );
	};

	const handleEditLink = ( id, value ) => {
		const newList = list.map( ( sm ) => {
			if ( sm.id === id ) {
				return {
					...sm,
					url: getSocialMediaURL( value, id ),
				};
			}
			return sm;
		} );
		onChange( newList );
	};

	const updatedList = list.map( ( sm ) => {
		return {
			...sm,
			url: getSocialMediaURL( sm.url, sm.id ),
			icon: socialMediaList.find( ( item ) => item.id === sm.id )?.icon,
		};
	} );

	const socialMediaRender = () => {
		if ( selectedSocialMedia ) {
			return (
				<div className="h-[50px] w-[520px] rounded-[25px] bg-white flex items-center pl-[23px]">
					<Input
						name="socialMediaURL"
						value={ socialMediaURL }
						onChange={ ( e ) => {
							setSocialMediaURL( e.target.value );
						} }
						ref={ ( node ) => {
							if ( node ) {
								node.focus();
							}
						} }
						inputClassName="!pr-10 !border-0 !bg-transparent !shadow-none focus:!ring-0"
						className="w-full"
						placeholder={ `Enter your ${ selectedSocialMedia.name } URL` }
						noBorder
						prefixIcon={
							<selectedSocialMedia.icon className="text-nav-active inline-block" />
						}
						onBlur={ ( event ) => {
							event.preventDefault();
							handleEnterLink( selectedSocialMedia.id );
						} }
						onKeyDown={ ( event ) => {
							if ( event.key === 'Enter' ) {
								event.preventDefault();
								handleEnterLink( selectedSocialMedia.id );
							} else if ( event.key === 'Escape' ) {
								setSelectedSocialMedia( null );
								setSocialMediaURL( '' );
							}
						} }
						suffixIcon={
							<div className="relative">
								<div
									className="absolute -top-7 -right-3"
									onClick={ () => {
										setSelectedSocialMedia( null );
										setSocialMediaURL( '' );
									} }
									role="button"
									tabIndex={ 0 }
									onKeyDown={ () => {
										setSelectedSocialMedia( null );
										setSocialMediaURL( '' );
									} }
								>
									<div className="w-4 h-4 rounded-full flex items-center justify-center bg-app-inactive-icon cursor-pointer bg-nav-active">
										<XMarkIcon className="w-4 h-4 text-white" />
									</div>
								</div>
							</div>
						}
					/>
				</div>
			);
		}
		if ( filterList( socialMediaList ).length ) {
			return (
				<Dropdown
					width="60"
					contentClassName="p-4 bg-white [&>:first-child]:pb-2.5 [&>:last-child]:pt-2.5 [&>:not(:first-child,:last-child)]:py-2.5 !divide-y !divide-border-primary divide-solid divide-x-0"
					trigger={
						<div className="p-3 rounded-full flex items-center justify-center bg-white cursor-pointer border border-border-primary border-solid shadow-small">
							<PlusIcon className="w-6 h-6 text-accent-st" />
						</div>
					}
					placement="top-start"
				>
					{ filterList( socialMediaList ).map( ( item, index ) => (
						<Dropdown.Item
							as="div"
							role="none"
							key={ index }
							className="only:!py-0"
							onClick={ () => setSelectedSocialMedia( item ) }
						>
							<button
								onClick={ () => null }
								type="button"
								className="w-full flex items-center text-sm font-normal text-left py-2 px-2 leading-5 hover:bg-background-secondary focus:outline-none transition duration-150 ease-in-out space-x-2 rounded bg-transparent border-0 cursor-pointer"
							>
								<item.icon className="text-nav-inactive inline-block" />
								<span className="text-body-text">
									{ item.name }
								</span>
							</button>
						</Dropdown.Item>
					) ) }
				</Dropdown>
			);
		}
		return '';
	};

	return (
		<div>
			<div className="text-sm font-semibold leading-[21px] mb-5 text-heading-text">
				Social Media
			</div>

			<div className="flex items-center gap-4 flex-wrap">
				{ updatedList?.length > 0 && (
					<div className="flex items-center gap-4 flex-wrap">
						{ updatedList.map( ( sm ) => (
							<SocialMediaItem
								key={ sm.id }
								socialMedia={ sm }
								onRemove={ () => {
									onChange(
										updatedList.filter(
											( item ) => item.id !== sm.id
										)
									);
								} }
								onEdit={ ( url ) =>
									handleEditLink( sm.id, url )
								}
							/>
						) ) }
					</div>
				) }

				{ socialMediaRender() }
			</div>
		</div>
	);
};

export default SocialMediaAdd;
