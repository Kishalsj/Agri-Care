
export default function TermsAndConditions() {

    const sections = [
        {
            title: 'Introduction and Agreement',
            content: [
                'Welcome to Checkins.ai. These Terms and Conditions (the "Terms") constitute a legal agreement between you and Checkins.ai (referred to as "Checkins", "us", "we", or "our" herein).',
                'By accessing, browsing, and using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not accept these Terms, do not use this website or our services.'
            ]
        },
    ];


    return (
        <>
            <div className="border-1 md:border-t-2 container lg:w-[1350px] md:w-auto flex flex-col-reverse items-center mx-auto  space-y-0 md:space-y-0 md:flex-row"></div>

            <section id="Destinations" className="">
                <div className="container font-Montserrat flex flex-col  px-4 lg:w-10/12 mx-auto mt-16 space-y-12 md:space-y-0">
                    <div className='flex flex-col gap-4'>
                        <h2 className=" text-4xl font-bold text-center text-bluedark md:text-left">
                            {"Terms and Conditions"}
                        </h2>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>1. Introduction and Agreement</span>
                            <span>Welcome to Checkins.ai. These Terms and Conditions (the &quot;Terms&quot;) constitute a legal
                                agreement between you and Checkins.ai (referred to as &quot;Checkins&quot;, &quot;us&quot;, &quot;we&quot;, or &quot;our&quot;
                                herein).</span>
                            <span>By accessing, browsing, and using our website and services, you acknowledge that you have
                                read, understood, and agree to be bound by these Terms. If you do not accept these Terms, do
                                not use this website or our services.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>2. Auto Rebooking Feature</span>
                            <span>As a part of our service to our members, Checkins offers an auto rebooking feature. This feature
                                automatically checks for lower prices and rebooks your refundable booking at the new lower
                                price, should one become available. The difference in price is automatically refunded to the
                                credit card on file. This feature is available to members only and requires a refundable booking
                                to be applicable.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>3. Booking and Cancellation</span>
                            <span>The booking process through Checkins.ai is governed by the terms and conditions of the
                                individual hotels. It is your responsibility to understand these terms before making a booking.
                                Cancellation and refund policies are specific to each hotel. In the event of a cancellation,
                                refunds, if applicable, will be processed according to the hotel’s specific policies. Checkins
                                assumes no responsibility for the imposition of fees by hotels in relation to cancellations or
                                changes.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>4. User Account and Security</span>
                            <span>As a user, you are responsible for maintaining the security of your account, including keeping
                                your password confidential and frequently updating it. You agree to notify Checkins immediately
                                of any unauthorized use of your account or any breach of security.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>5. Privacy</span>
                            <span>Your privacy is important to us. We recommend that you read our Privacy Policy, which explains
                                how we collect, use, and protect your personal information. It forms part of these Terms and
                                Conditions.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>6. Limitation of Liability</span>
                            <span>To the extent permitted by law, Checkins will not be liable for any direct, indirect, incidental,
                                special, consequential, or exemplary damages arising out of or relating to your use of the
                                services, even if we have been advised of the possibility of such damages.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>7. Indemnification</span>
                            <span>You agree to defend, indemnify, and hold Checkins, its officers, directors, employees, and
                                agents, harmless from and against any claims, liabilities, damages, losses, and expenses,

                                including, without limitation, reasonable legal and accounting fees, arising out of or in any way
                                connected with your access to or use of the services.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>8. Modifications to the Terms</span>
                            <span>We reserve the right, in our sole discretion, to modify these Terms, at any time. If we make
                                changes, we will post the changes on the Checkins website and update the &quot;Last Updated&quot; date
                                at the top of these Terms. It&#39;s your responsibility to check these Terms periodically for changes.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>9. Governing Law</span>
                            <span>These Terms and any disputes arising out of or related to the services shall be governed by the
                                laws of the State of California, United States, without regard to its conflict of laws rules.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>10. Intellectual Property Rights</span>
                            <span>All content, trademarks, graphics, and other intellectual property found on Checkins.ai are the
                                exclusive property of Checkins or its licensors and are protected by copyright and intellectual
                                property laws. Users are not permitted to use any of these materials without express written
                                consent from Checkins.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>11. User Conduct</span>
                            <span>Users are expected to use Checkins.ai responsibly and legally. Activities such as attempting to
                                gain unauthorized access to our site or services, interfering with the proper working of the site,
                                and sharing harmful or offensive content are strictly prohibited.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>12. Third-Party Links and Services</span>
                            <span>Checkins.ai may contain links to third-party websites or services. These links are provided for
                                convenience and do not indicate an endorsement by Checkins. We bear no responsibility for the
                                content, policies, or practices of these third-party sites.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>13. Dispute Resolution</span>
                            <span>In the event of a dispute arising out of or relating to your use of our services, both parties agree
                                to negotiate in good faith to resolve the issue. If the dispute cannot be resolved through
                                negotiation, it will be resolved by arbitration in the state of California, USA.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>14. Termination of Services</span>
                            <span>Checkins reserves the right to terminate or suspend any user&#39;s access to our services, without
                                prior notice or liability, for any reason, including breach of these Terms. Upon termination, your
                                right to use our services will immediately cease.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>15. Warranties and Disclaimers</span>
                            <span>Checkins.ai and all its contents and services are provided on an &quot;as is&quot; basis without any
                                warranties of any kind, either express or implied. We make no warranty or representation with
                                respect to the completeness, security, reliability, quality, accuracy, or availability of the
                                website.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>16. Payment Terms</span>
                            <span>Payment for memberships at Checkins.ai can be made using major credit cards.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>17. Account Registration</span>
                            <span>To become a member of Checkins.ai, you must complete our registration process. During
                                registration, you will be required to provide certain information and you agree to maintain the
                                accuracy of such information. You are responsible for maintaining the confidentiality of your
                                account and password and accept responsibility for all activities that occur under your account.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>18. Accessibility</span>
                            <span>Checkins.ai is committed to providing a website that is accessible to the widest possible
                                audience, regardless of technology or ability. We are actively working to increase the
                                accessibility and usability of our website and strive to adhere to the most stringent standards in
                                this area.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>19. Force Majeure</span>
                            <span>Checkins will not be deemed to be in breach of these Terms for any delay or failure in
                                performance caused by reasons out of its reasonable control, including acts of God, wars,
                                internet disruptions, or any other cause beyond the reasonable control of Checkins.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>20. Severability</span>
                            <span>If any provision of these Terms is deemed unlawful, void, or for any reason unenforceable, then
                                that provision shall be deemed severable from these Terms and shall not affect the validity and
                                enforceability of the remaining provisions.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>21. Promotions and Competitions</span>
                            <span>From time to time, Checkins.ai may run competitions, free prize draws, and promotions on
                                the website. These are subject to additional terms that will be made available at the time of
                                such competitions.</span>
                        </div>
                        <div className='flex text-[#5C6A7A] flex-col text-[15px] gap-3'>
                            <span className='text-[#002248] font-bold text-[19px]'>22. Communications</span>
                            <span>By becoming a member of Checkins.ai, you agree to receive communications from us,
                                including via e-mail, text message, calls, and push notifications. You agree that texts, calls, or
                                prerecorded messages may be generated by automatic telephone dialing systems.</span>
                            <span>Communications from Checkins, its affiliated companies may include, but are not limited to:
                                operational communications, promotional communications, and service announcements. By
                                providing your contact information, you are consenting to receive communications in this
                                manner.</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
