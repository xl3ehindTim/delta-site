import LicenseValidation from './license-validation';
import LicenseValidationControls from './license-validation/controls';
import EcommerceSelections from './ecommerce-selections';
import EcommerceSelectionsControls from './ecommerce-selections/controls';
import BusinessLogo from './business-logo';
import BusinessLogoControls from './business-logo/controls';
import SiteColors from './site-colors-typography';
import SiteColorsControls from './site-colors-typography/controls';

export const CustomizeSteps = [
	{
		content: EcommerceSelections,
		controls: EcommerceSelectionsControls,
		class: 'customize-ecommerce-selections',
	},
	{
		content: BusinessLogo,
		controls: BusinessLogoControls,
		class: 'customize-business-logo',
	},
	{
		content: SiteColors,
		controls: SiteColorsControls,
		actions: null,
		class: 'customize-typography-colors',
	},
	{
		content: LicenseValidation,
		controls: LicenseValidationControls,
		actions: null,
		class: 'customize-license-validation',
	},
];
