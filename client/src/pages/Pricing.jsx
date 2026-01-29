import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const pricingPlans = [
    {
        name: "Free",
        price: "0",
        description: "Perfect for getting started",
        features: [
            "1 Resume Template",
            "Basic AI Suggestions",
            "PDF Download (Watermarked)",
            "Standard Support"
        ],
        cta: "Start for Free",
        popular: false
    },
    {
        name: "Pro",
        price: "19",
        description: "Best for active job seekers",
        features: [
            "Unlimited Resume Templates",
            "Advanced AI Writing Assistant",
            "ATS Keyword Optimization",
            "Cover Letter Generator",
            "No Watermark",
            "Priority Support"
        ],
        cta: "Get Pro",
        popular: true
    },
    {
        name: "Enterprise",
        price: "49",
        description: "For teams and organizations",
        features: [
            "Everything in Pro",
            "Team Management",
            "Custom Branding",
            "API Access",
            "Dedicated Account Manager",
            "SSO Integration"
        ],
        cta: "Contact Sales",
        popular: false
    }
];

const Pricing = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-20 pb-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-50 sm:text-5xl tracking-tight mb-6">
                        Simple, transparent pricing
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                        Choose the plan that's right for your career goals. No hidden fees.
                    </p>

                    <div className="flex items-center justify-center gap-4 bg-white dark:bg-slate-900 w-fit mx-auto p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${billingCycle === 'monthly' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${billingCycle === 'yearly' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                        >
                            Yearly <span className="ml-1 text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-full">Save 20%</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingPlans.map((plan, index) => (
                        <div key={index} className={`relative bg-white dark:bg-slate-900 rounded-2xl shadow-sm border transition-all duration-300 ${plan.popular ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-950' : 'border-slate-200 dark:border-slate-800'} p-8 flex flex-col`}>
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-slate-900 dark:text-slate-50">${billingCycle === 'yearly' && plan.price !== "0" ? Math.floor(plan.price * 0.8) : plan.price}</span>
                                    <span className="text-slate-500 dark:text-slate-400">/month</span>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-grow">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-green-500 shrink-0" />
                                        <span className="text-slate-600 dark:text-slate-300 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/register" className="block">
                                <Button
                                    variant={plan.popular ? 'primary' : 'outline'}
                                    className="w-full"
                                >
                                    {plan.cta}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Pricing;
