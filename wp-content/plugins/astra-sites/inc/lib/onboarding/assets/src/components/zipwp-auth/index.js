import Button from '../button/button';

const ZipWPAuthorize = () => {
	return (
		<Button
			className="ist-button"
			onClick={ () => {
				const url =
					wpApiSettings?.zipwp_auth?.screen_url +
					'?type=token&redirect_url=' +
					wpApiSettings?.zipwp_auth?.redirect_url;
				window.location.href = url;
			} }
		>
			Authorize
		</Button>
	);
};

export default ZipWPAuthorize;
