import React from 'react';

const PrivacyPage = () => {
    return (
        <div className="bg-slate-50 min-h-screen pt-20 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-12">
                    <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-slate-500">Effective Date: January 29, 2026</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-8 text-slate-700 leading-relaxed text-sm md:text-base">

                    <section>
                        <p>
                            At <strong>TalentIQ</strong>, we are committed to maintaining the trust and confidence of our users. This Privacy Policy details how we treat data that we collect from you, the user, or that you provide to us when you visit our website or use our AI-powered resume building services.
                        </p>
                        <p className="mt-2">
                            By accessing or using our Service, you signify your acceptance of the practices described in this policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">1. Information Collection</h2>

                        <div className="pl-4 border-l-2 border-slate-100 space-y-4">
                            <div>
                                <h3 className="font-semibold text-slate-900">1.1. Personal Data</h3>
                                <p className="mb-1">While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you, including but not limited to:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Full Name</li>
                                    <li>Email Address</li>
                                    <li>Telephone Number</li>
                                    <li>Professional Resume Data (Education, Experience, Skills, Certifications)</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-900">1.2. Account Credentials</h3>
                                <p className="mb-1">For registered users, we collect and securely store:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Username or User ID</li>
                                    <li>Encrypted Passwords</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-900">1.3. Usage Data</h3>
                                <p className="mb-1">We automatically collect information on how the Service is accessed and used. This Usage Data may include:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Internet Protocol (IP) address</li>
                                    <li>Browser type and version</li>
                                    <li>Device characteristics</li>
                                    <li>Pages of our Service that you visit</li>
                                    <li>Time and date of your visit</li>
                                    <li>Time spent on those pages</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">2. Use of Data</h2>
                        <p className="mb-2">TalentIQ uses the collected data for various purposes:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>To provide and maintain our Service</li>
                            <li>To generate personalized resume content using Artificial Intelligence</li>
                            <li>To improve our AI models and templates</li>
                            <li>To notify you about changes to our Service</li>
                            <li>To provide customer support</li>
                            <li>To monitor the usage of our Service</li>
                            <li>To detect, prevent and address technical issues</li>
                        </ul>
                        <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-800">
                            Disclosure: We strictly <strong>do not sell</strong>, trade, or otherwise transfer your personally identifiable information to outside parties for marketing purposes.
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">3. AI Processing & Disclaimer</h2>
                        <p className="mb-2">Our platforms utilizes advanced Artificial Intelligence (AI) to assist in resume creation. Please note:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Your input data is processed by our AI algorithms to optimize formatting, structure, and keyword relevance.</li>
                            <li>AI suggestions are generated based on patterns and industry standards but should be reviewed for accuracy.</li>
                            <li>We aim to optimize content for Applicant Tracking Systems (ATS), but cannot guarantee specific outcomes.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">4. Intellectual Property & Data Ownership</h2>
                        <p className="mb-2"><strong>User Ownership:</strong> You retain all rights and ownership to the personal content and resume data you create on our platform.</p>
                        <p><strong>Platform Rights:</strong> TalentIQ does not claim ownership of your personal data. You maintain the right to export, modify, or delete your data at any time pursuant to our retention policies.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">5. Data Security</h2>
                        <p className="mb-2">The security of your data is paramount to us. We implement robust security measures including:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Secure Socket Layer (SSL) technology for data encryption in transit</li>
                            <li>Encrypted database storage for sensitive credentials</li>
                            <li>Strict access controls limiting data access to authorized personnel only</li>
                        </ul>
                        <p className="mt-2 text-sm text-slate-500">
                            Please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">6. Third-Party Service Providers</h2>
                        <p className="mb-2">We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, or to perform Service-related services.</p>
                        <p className="mb-2">These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose. Categories of third-party providers include:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Hosting and Infrastructure Services</li>
                            <li>Analytics Providers</li>
                            <li>Payment Processors (if applicable)</li>
                            <li>Email Communication Services</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">7. Cookies Policy</h2>
                        <p className="mb-2">We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.</p>
                        <p className="mb-2">Cookies are files with small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">8. Data Retention</h2>
                        <p>We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">9. User Rights</h2>
                        <p className="mb-2">Depending on your jurisdiction, you may have specific rights regarding your personal data, including:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Right of Access:</strong> To request copies of your personal data.</li>
                            <li><strong>Right to Rectification:</strong> To request correction of any inaccurate information.</li>
                            <li><strong>Right to Erasure:</strong> To request deletion of your personal data ("Right to be forgotten").</li>
                            <li><strong>Right to Withdraw Consent:</strong> To withdraw consent where we relied on your consent to process your personal information.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">10. Children's Privacy</h2>
                        <p>
                            Our Service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">11. Changes to This Privacy Policy</h2>
                        <p>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We advise you to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">12. Contact Information</h2>
                        <p className="mb-3">
                            If you have any questions about this Privacy Policy, please contact us:
                        </p>
                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 inline-block pr-12">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold w-20">Email:</span>
                                    <a href="mailto:dheerajsaini131652@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors">dheerajsaini131652@gmail.com</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold w-20">Platform:</span>
                                    <span className="text-slate-700">TalentIQ</span>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>

            </div>
        </div>
    );
};

export default PrivacyPage;
