import { useSelect, useDispatch } from '@wordpress/data';
import { ExclamationTriangleColorfulIcon } from '../../ui/icons';
import { STORE_KEY } from '../store';
import Modal from './modal';
import ModalTitle from './modal-title';
import Button from './button';

const LimitExceedModal = ( { onOpenChange, openTarget = '_blank' } ) => {
	const { setLimitExceedModal } = useDispatch( STORE_KEY );

	const { limitExceedModal } = useSelect( ( select ) => {
		const { getLimitExceedModalInfo } = select( STORE_KEY );

		return {
			limitExceedModal: getLimitExceedModalInfo(),
		};
	} );

	const planName = (
		<span className="zw-base-semibold text-app-heading capitalize">
			{ astraSitesVars?.zip_plans?.active_plan?.slug }
		</span>
	);

	const teamName = (
		<span className="zw-base-semibold text-app-heading">
			{ astraSitesVars?.zip_plans?.team?.name }
		</span>
	);

	const teamPlanInfo = (
		<span>
			Your current active organisation is { teamName }, which is on the{ ' ' }
			{ planName } plan
		</span>
	);

	return (
		<Modal
			open={ limitExceedModal.open }
			setOpen={ ( toggle ) => {
				if ( typeof onOpenChange === 'function' ) {
					onOpenChange( toggle );
				}

				setLimitExceedModal( {
					...limitExceedModal,
					open: toggle,
				} );
			} }
			width={ 464 }
			height="200"
			overflowHidden={ false }
		>
			<ModalTitle>
				<ExclamationTriangleColorfulIcon className="w-6 h-6" />
				<span>Limit reached</span>
			</ModalTitle>
			<div className="space-y-8">
				<div className="text-app-text text-base leading-6">
					<div>
						{ teamPlanInfo }. You have reached the maximum number of
						sites allowed to be created on { planName } plan.
						<br /> <br /> Please upgrade the plan for {
							teamName
						}{ ' ' }
						in order to create more sites.
					</div>
				</div>
				<Button
					variant="primary"
					size="base"
					className="w-full"
					onClick={ () => {
						setLimitExceedModal( {
							...limitExceedModal,
							open: false,
						} );
						if ( typeof window === 'undefined' ) return;
						window.open(
							'https://app.zipwp.com/founders-deal',
							openTarget
						);
					} }
				>
					Unlock Full Power
				</Button>
			</div>
		</Modal>
	);
};

export default LimitExceedModal;
