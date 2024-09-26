'use client'
import React, { useState } from 'react';

function Accordion({ title, content }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleAccordion = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="flex  text-[#5C6A7A] flex-col text-[15px] gap-3">
            <div className="flex cursor-pointer items-center justify-between" onClick={handleAccordion}>
                <span className="text-[#002248] font-bold text-[19px]">{title}</span>
                {isOpen ? (
                    <svg
                        className="w-5 h-5 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-5 h-5 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                )}
            </div>
            {isOpen && (
                <div>
                    {content.map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}
                </div>
            )}
        </div>
    );
}
export default function Terms() {
    const sections = [
        {
          title: '1. How much can I potentially save on hotel bookings ?',
          content: [
            'The savings you can make are variable, as they depend on the specific hotels and dates you choose.',
          ],
        },
        {
          title: '2. Are there any limitations to the number of bookings I can make at these discounted rates?',
          content: [
            'No, there are no limitations. You can make as many bookings as you want at our exclusive wholesale rates',
          ],
        },
        {
          title: '3. How does Checkins.ai ensure the hotel prices offered are genuinely lower than elsewhere?',
          content: [
            'We work closely with our hotel partners to secure wholesale rates. We also continuously monitor prices from other sources to ensure our prices remain competitive.',
          ],
        },
        {
          title: '4. Are there any blackout dates ?',
          content: [
            'No, there are no blackout dates. You can book hotels at our wholesale rates at any time of the year.',
          ],
        },
        {
          title: '5. What happens if I encounter an issue with a hotel booking made through Checkins.ai?',
          content: [
            'Our dedicated customer service team is available to assist you with any issues or concerns you may have with your booking. Please contact us at help@Checkins.ai and provide a contact number to reach you. We\'re committed to ensuring your travel experiences booked through Checkins.ai meet your expectations.',
          ],
        },
        {
          title: '6. How does the auto rebooking feature work?',
          content: [
            'Our auto rebooking feature leverages AI technology to constantly monitor hotel prices. If you\'ve made a refundable booking and the price for your room drops, our system automatically rebooks you at the lower rate. The savings are then refunded directly to your credit card. This ensures you always get the best price possible without having to do anything.',
          ],
        },
        {
          title: '7. Is there a limit on how many times my booking can be rebooked at a lower rate?',
          content: [
            'There\'s no limit on the number of times your booking can be rebooked. As long as you have a refundable booking and the price drops, our system will automatically rebook your reservation to secure the lower rate.',
          ],
        },
        {
          title: '8. Do I need to enable the auto rebooking feature or is it automatic?',
          content: [
            'The auto rebooking feature is automatic for all refundable bookings made through Checkins.ai. You don\'t need to enable anything - it\'s part of our commitment to provide you with the best possible value.',
          ],
        },
        {
          title: '9. What happens if the price drops after I\'ve already checked into the hotel? Can I still benefit from the auto rebooking feature?',
          content: [
            'The auto rebooking feature applies up until the time of your check-in. Once you\'ve checked into your hotel, your booking is considered final and can\'t be rebooked even if the price drops.',
          ],
        }
      ];
    return (
        <>
            <div className="border-1 md:border-t-2 container lg:w-[1350px] md:w-auto flex flex-col-reverse items-center mx-auto  space-y-0 md:space-y-0 md:flex-row"></div>

            <section id="Destinations" className="">
                <div className="container font-Montserrat flex flex-col  px-4 lg:w-10/12 mx-auto mt-16 space-y-12 md:space-y-0">
                    <div className="flex flex-col gap-4">
                        {sections.map((section, index) => (
                            <Accordion key={index} title={section.title} content={section.content} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
