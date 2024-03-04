import React from 'react';

// Import all steps.
// import Ai from './ai';
import PageBuilder from './page-builder';
import SiteList from './site-list';
import SiteListHeader from './site-list/header';
import CustomizeSite from './customize-site';
import ImportSite from './import-site';
import Survey from './survey';
import SiteType from './site-type';
import OnboardingAi from './onboarding-ai/onboarding-ai';
import CustomizeAiSite from './onboarding-ai/customize-ai-site';

export const STEPS = [
	{
		content: <SiteType />,
		class: 'step-page-builder',
	},
	{
		content: <OnboardingAi />,
		class: 'step-ai',
	},
	{
		content: <CustomizeAiSite />,
		class: 'step-customizer',
	},
	{
		content: <PageBuilder />,
		class: 'step-page-builder',
	},
	{
		header: <SiteListHeader />,
		content: <SiteList />,
		class: 'step-site-list',
	},
	{
		content: <CustomizeSite />,
		class: 'step-customizer',
	},
	{
		content: <Survey />,
		class: 'step-survey',
	},
	{
		title: 'We are buiding your website...',
		content: <ImportSite />,
		class: 'step-import-site',
	},
];
