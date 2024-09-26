'use client'
import React from 'react'
import Union from "@/public/svg/union";
import image from '@/public/img/review/pexels-anna-tarazevich-4926674.jpg'
import avonne from '@/public/img/review/pexels-avonne-stalling-3916455.jpg'
import chloe from '@/public/img/review/pexels-chloe-1043474.jpg'
import clement from '@/public/img/review/pexels-clement-percheron-5160850.jpg'
import david from '@/public/img/review/pexels-david-kuko-2743754.jpg'
import louie from '@/public/img/review/pexels-ike-louie-natividad-2709388.jpg'
import kamiz from '@/public/img/review/pexels-kamiz-ferreira-2218786.jpg'
import marcio from '@/public/img/review/pexels-marcio-bordin-1840608.jpg'
import mateus from '@/public/img/review/pexels-mateus-souza-3586798.jpg'
import nathan from '@/public/img/review/pexels-nathan-cowley-1300402.jpg'
import rodolfo from '@/public/img/review/pexels-rodolfo-quirÃ³s-1727273.jpg'
import pixabay from '@/public/img/review/pexels-pixabay-220453.jpg'
import yaroslava from '@/public/img/review/pexels-yaroslava-borz-10057618.jpg'
import wendy from '@/public/img/review/pexels-wendy-wei-1656684.jpg'
import spencer from '@/public/img/review/pexels-spencer-selover-428328.jpg'
import axios from 'axios';
import { toast } from "react-toastify";
import Image from 'next/image';

export default function Reviews() {
    const [name, setName] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [message, setMessage] = React.useState('');
    const body = {
        name ,
        location,
        message
    }
    const handleSubmit = (e) => {
        //console.log(body);
        axios.post(`${process.env.REACT_APP_AXIOS_URL}/api/v1/testimonials/create`, body)
            .then(res => {
                
                toast.info("Thank you for submitting your feedback. It has been safely received.");
                setName('');
                setLocation('');
                setMessage('');
            })
            .catch(err => {
                toast.error(err.response.data.message);
                
            })
    }

    return (
        <>
            <div className="border-1 md:border-t-2 container lg:w-[1350px] md:w-auto flex flex-col-reverse items-center mx-auto  space-y-0 md:space-y-0 md:flex-row"></div>
            <section id="hero" className="bg-white font-homepage">

                <div className="container text-[#5C6A7A] text-[12px] flex flex-col px-4 w-full lg:w-10/12 mx-auto mt-10 space-y-12 md:space-y-6 ">
                    <div>
                        <h2 className=" text-4xl font-bold text-center text-bluedark md:text-left">
                            {"Reviews"}
                        </h2>
                        <div className='grid grid-flow-row gap-4 text-[15px] mt-5'>
                            <span>Welcome to our Reviews page! We greatly value your opinion and encourage you to share your feedback and reviews about our startup business on our innovative hotel booking platform, Checkins.com. Your voice matters, and your reviews play a pivotal role in spreading the word about our platform.</span>
                            <span>Leaving a review for our startup business is not only beneficial to us but also to fellow travelers like yourself. Your experience and insights can help others make informed decisions when it comes to booking hotels. By sharing your thoughts, you contribute to a vibrant community where travelers support and guide each other.</span>
                            <span>Your reviews hold immense power. They have the ability to shape the reputation and success of our startup. Positive reviews act as a testament to the quality of our service, giving us the opportunity to grow and attract more users. On the other hand, constructive criticism helps us identify areas where we can improve and provide an even better experience for our users.</span>
                            <span>Moreover, your reviews help us understand what sets us apart from other hotel booking platforms. By highlighting the features you appreciate, the smooth booking process, the excellent customer service, or any unique aspect you enjoyed, you assist others in discovering the benefits of Checkins.com.</span>
                            <span>At Checkins.ai, we believe in transparency and authenticity. Your genuine feedback allows us to maintain high standards and continuously enhance our platform. We are dedicated to delivering a seamless and delightful hotel booking experience, and your reviews propel us forward on this journey.</span>
                            <span>So, whether you had an exceptional stay at a hotel, encountered any challenges, or have suggestions for improvement, we eagerly await your valuable reviews. Help us build a community of passionate travelers who share their experiences and support a promising startup like ours.</span>
                            <span>Thank you for choosing Checkins.com and for taking the time to leave your feedback. Together, let's make hotel booking an enjoyable and hassle-free experience for all.</span>
                        </div>
                        <div className='flex w-full justify-center items-center mt-10'>
                        <div className='bg-[#fff] border shadow-xl w-full md:w-1/3 rounded-lg px-3 py-3'>
                            <span className='font-bold text-[20px]'>Leave your feedback</span>
                            <div>
                                <div>
                                    <div className="flex justify-around w-full gap-3.5 flex-col md:flex-row ">

                                        <div className="flex flex-col w-full md:w-1/2 space-y-2">
                                            <label className="text-[#697687] text-[12px]">Name</label>
                                            <input 
                                            value={name}
                                            type="text" className="border w-full border-gray-300 rounded-md px-2 py-2"
                                                onChange={(e) => { setName(e.target.value) }}
                                            />
                                        </div>
                                        <div className="flex flex-col w-full md:w-1/2 space-y-2">
                                            <label className="text-[#697687] text-[12px]">Location</label>
                                            <input 
                                            value={location}
                                            type="text" className="border w-full border-gray-300 rounded-md px-2 py-2"
                                                onChange={(e) => { setLocation(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                   
                                    <div>
                                        <label className="text-[#697687] text-[12px]">Review</label>
                                        <textarea
                                            value={message}
                                            className="border w-full border-gray-300 rounded-md px-2 py-2"
                                            rows="4"
                                            onChange={(e) => { setMessage(e.target.value) }}

                                        ></textarea>

                                    </div>
                                    <div className='flex justify-end'>
                                        <button
                                            className={`bg-[#1893F8] rounded-full mt-3 px-6 font-bold py-2  text-white
                            `}
                                            type="submit"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className='grid grid-flow-row md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 text-[15px] mt-5'>
                            <div className=" bg-[#fFFF] my-7 relative border-[#EFEFEF] border-[1px] shadow-xl 2xl:w-[342px]  w-[320px] rounded-md h-[250px]">
                                <div className="flex flex-col  text-[#5C6A7A] justify-between w-full h-full   px-3 pb-5 pt-11">
                                    <div className="items-center justify-center">
                                        <span className="text-[#5C6A7A] opacity-70 text-center 2xl:text-[15px] text-[13px]">
                                            &quot;After trying many booking sites, Checkins.ai stands out as the
                                            best one yet. My membership, even though free for 3 months, would’ve paid for itself
                                            after just one trip. Their prices are unbeatable, and I look forward to many more
                                            travels.&quot;
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 items-center">
                                        <Image src={david} alt="david" className="rounded-full w-[44px] h-[43px] object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[#002248] font-bold">James, Seattle, WA</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full items-center justify-center mx-auto z-40 absolute -top-6  left-3 bg-[#1893F8]  py-5 px-5">
                                    <Union />
                                </div>
                            </div>
                            <div className=" bg-[#fFFF] flex justify-between  my-7 relative border-[#EFEFEF] border-[1px] shadow-xl 2xl:w-[342px]  w-[320px] rounded-md h-[250px]">
                                <div className="flex flex-col  text-[#5C6A7A] justify-between w-full h-full   px-3 pb-5 pt-11">
                                    <div className="items-center justify-center">
                                        <span className="text-[#5C6A7A] opacity-70 text-center 2xl:text-[15px] text-[13px]">
                                            &quot;I can&#39;t express how much I appreciate the auto-rebooking feature. It
                                            saved me a lot of money on my business trips, and the peace of mind knowing I got the
                                            best price is priceless. Excellent service, Checkins.ai!&quot;
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 items-center">
                                        <Image src={avonne} alt="avonne" className="rounded-full w-[44px] h-[43px] object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[#002248] font-bold">Karen, Miami, FL</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full items-center justify-center mx-auto z-40 absolute -top-6  left-3 bg-[#1893F8]  py-5 px-5">
                                    <Union />
                                </div>
                            </div>
                            <div className=" bg-[#fFFF] my-7 relative border-[#EFEFEF] border-[1px] shadow-xl 2xl:w-[342px]  w-[320px] rounded-md h-[250px]">
                                <div className="flex flex-col  text-[#5C6A7A] justify-between w-full h-full   px-3 pb-5 pt-11">
                                    <div className="items-center justify-center">
                                        <span className="text-[#5C6A7A] opacity-70 text-center 2xl:text-[15px] text-[13px]">
                                            &quot;Checkins.ai has redefined my hotel booking experience. The
                                            savings are tangible, and the process is smooth. Plus, their customer service is always
                                            ready to help. Highly recommended!&quot;
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 items-center">
                                        <Image src={clement} alt="clement" className="rounded-full w-[44px] h-[43px] object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[#002248] font-bold">Richard, Austin, TX</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full items-center justify-center mx-auto z-40 absolute -top-6  left-3 bg-[#1893F8]  py-5 px-5">
                                    <Union />
                                </div>
                            </div>
                            <div className=" bg-[#fFFF] my-7 relative border-[#EFEFEF] border-[1px] shadow-xl 2xl:w-[342px]  w-[320px] rounded-md h-[250px]">
                                <div className="flex flex-col  text-[#5C6A7A] justify-between w-full h-full   px-3 pb-5 pt-11">
                                    <div className="items-center justify-center">
                                        <span className="text-[#5C6A7A] opacity-70 text-center 2xl:text-[15px] text-[13px]">
                                            &quot;We saved so much on our family vacation, thanks to Checkins.ai.
                                            The kids got to enjoy extra activities with the savings. The member prices are
                                            unbeatable. We will be renewing our membership!&quot;
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 items-center">
                                        <Image src={image} alt="image" className="rounded-full w-[44px] h-[43px] object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[#002248] font-bold">Lisa, Denver, CO</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full items-center justify-center mx-auto z-40 absolute -top-6  left-3 bg-[#1893F8]  py-5 px-5">
                                    <Union />
                                </div>
                            </div>
                            <div className=" bg-[#fFFF] my-7 relative border-[#EFEFEF] border-[1px] shadow-xl 2xl:w-[342px]  w-[320px] rounded-md h-[250px]">
                                <div className="flex flex-col  text-[#5C6A7A] justify-between w-full h-full   px-3 pb-5 pt-11">
                                    <div className="items-center justify-center">
                                        <span className="text-[#5C6A7A] opacity-70 text-center 2xl:text-[15px] text-[13px]">
                                            &quot;Navigating Checkins.ai is easy, and the prices are
                                            unbeatable. I&#39;ve saved so much since I became a member. It&#39;s now my first and only
                                            stop for hotel bookings.&quot;
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 items-center">
                                        <Image src={rodolfo} alt="rodolfo" className="rounded-full w-[44px] h-[43px] object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[#002248] font-bold">Emily, San Francisco, CA</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full items-center justify-center mx-auto z-40 absolute -top-6  left-3 bg-[#1893F8]  py-5 px-5">
                                    <Union />
                                </div>
                            </div>
                            <div className=" bg-[#fFFF] my-7 relative border-[#EFEFEF] border-[1px] shadow-xl 2xl:w-[342px]  w-[320px] rounded-md h-[250px]">
                                <div className="flex flex-col  text-[#5C6A7A] justify-between w-full h-full   px-3 pb-5 pt-11">
                                    <div className="items-center justify-center">
                                        <span className="text-[#5C6A7A] opacity-70 text-center 2xl:text-[15px] text-[13px]">
                                            &quot;Checkins.ai offers great membership benefits and dependable
                                            customer service. I&#39;ve seen my travel expenses decrease substantially. It&#39;s a must-have
                                            for travelers.&quot;
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 items-center">
                                        <Image src={nathan} alt="nathan" className="rounded-full w-[44px] h-[43px] object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[#002248] font-bold">John, New York, NY</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full items-center justify-center mx-auto z-40 absolute -top-6  left-3 bg-[#1893F8]  py-5 px-5">
                                    <Union />
                                </div>
                            </div>
                            <div className=" bg-[#fFFF] my-7 relative border-[#EFEFEF] border-[1px] shadow-xl 2xl:w-[342px]  w-[320px] rounded-md h-[250px]">
                                <div className="flex flex-col  text-[#5C6A7A] justify-between w-full h-full   px-3 pb-5 pt-11">
                                    <div className="items-center justify-center">
                                        <span className="text-[#5C6A7A] opacity-70 text-center 2xl:text-[15px] text-[13px]">
                                            &quot;Checkins.ai has become an indispensable part of my travel
                                            plans. The savings are significant, and the selection of hotels is excellent. I&#39;m so glad I
                                            decided to take advantage of the free offer and become a member.&quot;
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 items-center">
                                        <Image src={image} alt="image" className="rounded-full w-[44px] h-[43px] object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[#002248] font-bold">Sarah, Nashville, TN</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full items-center justify-center mx-auto z-40 absolute -top-6  left-3 bg-[#1893F8]  py-5 px-5">
                                    <Union />
                                </div>
                            </div>
                            <div className=" bg-[#fFFF] my-7 relative border-[#EFEFEF] border-[1px] shadow-xl 2xl:w-[342px]  w-[320px] rounded-md h-[250px]">
                                <div className="flex flex-col  text-[#5C6A7A] justify-between w-full h-full   px-3 pb-5 pt-11">
                                    <div className="items-center justify-center">
                                        <span className="text-[#5C6A7A] opacity-70 text-center 2xl:text-[15px] text-[13px]">
                                            &quot;I travel frequently for work, and Checkins.ai has made my trips
                                            more affordable. The auto-rebooking feature ensures I always get the best deal.&quot;
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 items-center">
                                        <Image src={chloe} alt="chloe" className="rounded-full w-[44px] h-[43px] object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[#002248] font-bold">Peter, Boston, MA</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full items-center justify-center mx-auto z-40 absolute -top-6  left-3 bg-[#1893F8]  py-5 px-5">
                                    <Union />
                                </div>
                            </div>
                            <div className=" bg-[#fFFF] my-7 relative border-[#EFEFEF] border-[1px] shadow-xl 2xl:w-[342px]  w-[320px] rounded-md h-[250px]">
                                <div className="flex flex-col  text-[#5C6A7A] justify-between w-full h-full   px-3 pb-5 pt-11">
                                    <div className="items-center justify-center">
                                        <span className="text-[#5C6A7A] opacity-70 text-center 2xl:text-[15px] text-[13px]">
                                            &quot;My friends and I had a great time on our Vegas trip, thanks to
                                            Checkins.ai. We saved a bundle on our hotel. Can&#39;t wait for our next adventure!&quot;
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 items-center">
                                        <Image src={marcio} alt="marcio" className="rounded-full w-[44px] h-[43px] object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[#002248] font-bold">Laura, Dallas, TX</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full items-center justify-center mx-auto z-40 absolute -top-6  left-3 bg-[#1893F8]  py-5 px-5">
                                    <Union />
                                </div>
                            </div>
                            <div className=" bg-[#fFFF] my-7 relative border-[#EFEFEF] border-[1px] shadow-xl 2xl:w-[342px]  w-[320px] rounded-md h-[250px]">
                                <div className="flex flex-col  text-[#5C6A7A] justify-between w-full h-full   px-3 pb-5 pt-11">
                                    <div className="items-center justify-center">
                                        <span className="text-[#5C6A7A] opacity-70 text-center 2xl:text-[15px] text-[13px]">
                                            &quot;Checkins.ai is a game-changer. The savings on hotel bookings are
                                            real, and the user interface is intuitive and straightforward.&quot;
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 items-center">
                                        <Image src={yaroslava} alt="yaroslava" className="rounded-full w-[44px] h-[43px] object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[#002248] font-bold">Steve, Portland, OR</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full items-center justify-center mx-auto z-40 absolute -top-6  left-3 bg-[#1893F8]  py-5 px-5">
                                    <Union />
                                </div>
                            </div>
                            <div className=" bg-[#fFFF] my-7 relative border-[#EFEFEF] border-[1px] shadow-xl 2xl:w-[342px]  w-[320px] rounded-md h-[250px]">
                                <div className="flex flex-col  text-[#5C6A7A] justify-between w-full h-full   px-3 pb-5 pt-11">
                                    <div className="items-center justify-center">
                                        <span className="text-[#5C6A7A] opacity-70 text-center 2xl:text-[15px] text-[13px]">
                                            &quot;Our Hawaiian vacation was a blast! Checkins.ai made it
                                            affordable and hassle-free. We loved the savings and the fantastic hotel selections.&quot;
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 items-center">
                                        <Image src={louie} alt="louie" className="rounded-full w-[44px] h-[43px] object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[#002248] font-bold">Alice, Los Angeles, CA</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full items-center justify-center mx-auto z-40 absolute -top-6  left-3 bg-[#1893F8]  py-5 px-5">
                                    <Union />
                                </div>
                            </div>
                            <div className=" bg-[#fFFF] my-7 relative border-[#EFEFEF] border-[1px] shadow-xl 2xl:w-[342px]  w-[320px] rounded-md h-[250px]">
                                <div className="flex flex-col  text-[#5C6A7A] justify-between w-full h-full   px-3 pb-5 pt-11">
                                    <div className="items-center justify-center">
                                        <span className="text-[#5C6A7A] opacity-70 text-center 2xl:text-[15px] text-[13px]">
                                            &quot;I&#39;ve saved so much time and money using Checkins.ai. Their
                                            customer service is top-notch, and the membership benefits are amazing.&quot;
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 items-center">
                                        <Image src={spencer} alt="spencer" className="rounded-full w-[44px] h-[43px] object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[#002248] font-bold">Michael, Chicago, IL</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full items-center justify-center mx-auto z-40 absolute -top-6  left-3 bg-[#1893F8]  py-5 px-5">
                                    <Union />
                                </div>
                            </div>
                            <div className=" bg-[#fFFF] my-7 relative border-[#EFEFEF] border-[1px] shadow-xl 2xl:w-[342px]  w-[320px] rounded-md h-[250px]">
                                <div className="flex flex-col  text-[#5C6A7A] justify-between w-full h-full   px-3 pb-5 pt-11">
                                    <div className="items-center justify-center">
                                        <span className="text-[#5C6A7A] opacity-70 text-center 2xl:text-[15px] text-[13px]">
                                            &quot;As a frequent traveler, Checkins.ai is a lifesaver. The auto
                                            rebooking feature gives me the best prices without constant checking. Truly a travel
                                            game-changer.&quot;
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 items-center">
                                        <Image src={mateus} alt="mateus" className="rounded-full w-[44px] h-[43px] object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[#002248] font-bold">Jessica, Atlanta, GA</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full items-center justify-center mx-auto z-40 absolute -top-6  left-3 bg-[#1893F8]  py-5 px-5">
                                    <Union />
                                </div>
                            </div>
                            <div className=" bg-[#fFFF] my-7 relative border-[#EFEFEF] border-[1px] shadow-xl 2xl:w-[342px]  w-[320px] rounded-md h-[250px]">
                                <div className="flex flex-col  text-[#5C6A7A] justify-between w-full h-full   px-3 pb-5 pt-11">
                                    <div className="items-center justify-center">
                                        <span className="text-[#5C6A7A] opacity-70 text-center 2xl:text-[15px] text-[13px]">
                                            &quot;Thanks to Checkins.ai, I managed to secure the best deals for my
                                            hotels. Their services exceeded my expectations, and I&#39;m be happy to get the paid
                                            membership after my free membership expires.&quot;
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 items-center">
                                        <Image src={spencer} alt="spencer" className="rounded-full w-[44px] h-[43px] object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[#002248] font-bold">Paul, Dallas, TX</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full items-center justify-center mx-auto z-40 absolute -top-6  left-3 bg-[#1893F8]  py-5 px-5">
                                    <Union />
                                </div>
                            </div>
                            <div className=" bg-[#fFFF] my-7 relative border-[#EFEFEF] border-[1px] shadow-xl 2xl:w-[342px]  w-[320px] rounded-md h-[250px]">
                                <div className="flex flex-col  text-[#5C6A7A] justify-between w-full h-full   px-3 pb-5 pt-11">
                                    <div className="items-center justify-center">
                                        <span className="text-[#5C6A7A] opacity-70 text-center 2xl:text-[15px] text-[13px]">
                                            &quot;Checkins.ai is a must for anyone looking to save on their hotel
                                            bookings. Their platform is easy to navigate, and the customer support is excellent.&quot;
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 items-center">
                                        <Image src={avonne} alt="avonne" className="rounded-full w-[44px] h-[43px] object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[#002248] font-bold">Rebecca, Phoenix, AZ</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full items-center justify-center mx-auto z-40 absolute -top-6  left-3 bg-[#1893F8]  py-5 px-5">
                                    <Union />
                                </div>
                            </div>
                            <div className=" bg-[#fFFF] my-7 relative border-[#EFEFEF] border-[1px] shadow-xl 2xl:w-[342px]  w-[320px] rounded-md h-[250px]">
                                <div className="flex flex-col  text-[#5C6A7A] justify-between w-full h-full   px-3 pb-5 pt-11">
                                    <div className="items-center justify-center">
                                        <span className="text-[#5C6A7A] opacity-70 text-center 2xl:text-[15px] text-[13px]">
                                            &quot;Checkins.ai is my go-to for all hotel bookings. The savings
                                            I&#39;ve enjoyed as a member are astounding, and the service is unparalleled.&quot;
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 items-center">
                                        <Image src={wendy} alt="wendy" className="rounded-full w-[44px] h-[43px] object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[#002248] font-bold">Matthew, Philadelphia, PA</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full items-center justify-center mx-auto z-40 absolute -top-6  left-3 bg-[#1893F8]  py-5 px-5">
                                    <Union />
                                </div>
                            </div>
                            <div className=" bg-[#fFFF] my-7 relative border-[#EFEFEF] border-[1px] shadow-xl 2xl:w-[342px]  w-[320px] rounded-md h-[250px]">
                                <div className="flex flex-col  text-[#5C6A7A] justify-between w-full h-full   px-3 pb-5 pt-11">
                                    <div className="items-center justify-center">
                                        <span className="text-[#5C6A7A] opacity-70 text-center 2xl:text-[15px] text-[13px]">
                                            &quot;I never realized how much I could save on hotel bookings until I
                                            started using Checkins.ai. The service is superb, and I&#39;ve had a fantastic experience.&quot;
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 items-center">
                                        <Image src={louie} alt="louie" className="rounded-full w-[44px] h-[43px] object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[#002248] font-bold">Rachel, San Diego, CA</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full items-center justify-center mx-auto z-40 absolute -top-6  left-3 bg-[#1893F8]  py-5 px-5">
                                    <Union />
                                </div>
                            </div>
                            <div className=" bg-[#fFFF] my-7 relative border-[#EFEFEF] border-[1px] shadow-xl 2xl:w-[342px]  w-[320px] rounded-md h-[250px]">
                                <div className="flex flex-col  text-[#5C6A7A] justify-between w-full h-full   px-3 pb-5 pt-11">
                                    <div className="items-center justify-center">
                                        <span className="text-[#5C6A7A] opacity-70 text-center 2xl:text-[15px] text-[13px]">
                                            &quot;The auto rebooking feature on Checkins.ai is a brilliant idea. I&#39;ve
                                            saved a lot of money on my last few trips because of it. I highly recommend becoming a
                                            member.&quot;
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 items-center">
                                        <Image src={pixabay} alt="pixabay" className="rounded-full w-[44px] h-[43px] object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[#002248] font-bold">William, Detroit, MI</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full items-center justify-center mx-auto z-40 absolute -top-6  left-3 bg-[#1893F8]  py-5 px-5">
                                    <Union />
                                </div>
                            </div>
                            <div className=" bg-[#fFFF] my-7 relative border-[#EFEFEF] border-[1px] shadow-xl 2xl:w-[342px]  w-[320px] rounded-md h-[250px]">
                                <div className="flex flex-col  text-[#5C6A7A] justify-between w-full h-full   px-3 pb-5 pt-11">
                                    <div className="items-center justify-center">
                                        <span className="text-[#5C6A7A] opacity-70 text-center 2xl:text-[15px] text-[13px]">
                                            &quot;I&#39;ve been using Checkins.ai for my hotel bookings for a while
                                            now. I volunteered as a beta tester and loved the product. The savings are incredible,
                                            and the selection of hotels always gives me the best options.&quot;
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 items-center">
                                        <Image src={kamiz} alt="kamiz" className="rounded-full w-[44px] h-[43px] object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[#002248] font-bold">Jennifer, Baltimore, MD</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full items-center justify-center mx-auto z-40 absolute -top-6  left-3 bg-[#1893F8]  py-5 px-5">
                                    <Union />
                                </div>
                            </div>
                            <div className=" bg-[#fFFF] my-7 relative border-[#EFEFEF] border-[1px] shadow-xl 2xl:w-[342px]  w-[320px] rounded-md h-[250px]">
                                <div className="flex flex-col  text-[#5C6A7A] justify-between w-full h-full   px-3 pb-5 pt-11">
                                    <div className="items-center justify-center">
                                        <span className="text-[#5C6A7A] opacity-70 text-center 2xl:text-[15px] text-[13px]">
                                            &quot;Checkins.ai offers fantastic savings and excellent
                                            customer service. I&#39;ve had a great experience with them, and I&#39;m excited to continue my
                                            travels using their platform.&quot;
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 items-center">
                                        <Image src={david} alt="david" className="rounded-full w-[44px] h-[43px] object-cover" />
                                        <div className="flex flex-col">
                                            <span className="text-[#002248] font-bold">Andrew, Minneapolis, MN</span>
                                            <span className="text-[12px] opacity-70"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full items-center justify-center mx-auto z-40 absolute -top-6  left-3 bg-[#1893F8]  py-5 px-5">
                                    <Union />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </section>
        </>
    )
}
