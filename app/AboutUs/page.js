'use client'
import React from 'react'
import video from '@/public/img/video.jpg';
import Image from 'next/image';

  const src =
  "https://dl.dropboxusercontent.com/scl/fi/3t1ap6cg46scza33hx338/Checkins-Features-Video-HD-720p.mov?dl=0&rlkey=vowixhb8817ffir13w06tz2y0";

const Video = () => {
  return (
    <video controls width="100%">
      <source src={src} type="video/mp4" />
      frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen allow="autoplay"
    </video>
  );
};

export default function AboutUs() {

  const [videoShow , setVideoShow] = React.useState(false)

  const onClickOnImage = () => {
    setVideoShow(true)
  }

  return (
    <>
      <div className="border-1 md:border-t-2 container lg:w-[1350px] md:w-auto flex flex-col-reverse items-center mx-auto  space-y-0 md:space-y-0 md:flex-row"></div>
      <section id="hero" className="bg-white font-homepage">
        <div className="container text-[#5C6A7A] text-[15px] flex flex-col px-4 w-full lg:w-10/12 mx-auto mt-10 space-y-12 md:space-y-6 ">
          <div>
            <h2 className=" text-4xl font-bold text-center text-bluedark md:text-left">
              {"About Us - Checkins.ai"}
            </h2>
            <div className='w-full mt-5'>
              {!videoShow && <Image src={video} alt="videoShow" onClick={() => onClickOnImage()} className='w-full cursor-pointer ' />}
              {videoShow && <Video/>}
            </div>
            <div className='grid  font-normal grid-flow-row gap-4 text-[#5C6A7A] text-[15px] mt-5'>
              <span>In the vast world of hospitality and travel, Checkins.ai holds a distinct place. Our platform,
                characterized by a unique and innovative Closed User Group (CUG) model, is breaking the
                norms and setting new trends in hotel booking. With a commitment to making travel more
                affordable and less complicated, we provide our paid members with wholesale hotel prices,
                creating a ripple effect of cost-effective travel opportunities.</span>
              <span>The inception of Checkins.ai dates back to 2023. Nestled in the Silicon Valley, California, our
                journey began when a team of dynamic individuals envisioned an unprecedented approach to
                hotel booking. With diverse experiences and a shared passion for travel and technology, our
                founders saw a gap in the traditional hotel booking system. They recognized the pain points
                faced by travelers – overpriced accommodation options, lack of customer focus, and an
                overwhelming booking process. It was these observations that sparked the conception of
                Checkins.ai.</span>
              <span>At the heart of Checkins.ai is our disruptive CUG membership model. We asked ourselves a
                fundamental question: Why can&#39;t travelers access wholesale hotel prices directly? The answer
                was surprisingly simple – they could, and they should. This revelation was the bedrock on which
                we built our CUG model.</span>
              <span>By adopting the CUG model, we were able to negotiate wholesale rates directly with our hotel
                partners. These negotiated rates, significantly lower than traditional retail prices, are what we
                offer our members. A minimal annual membership fee of $199 unlocks a world of exclusive,
                affordable accommodation options for our members. This approach transformed the
                conventional hotel booking process, redefining the value proposition for both customers and
                hotels.</span>
              <span>Our CUG model doesn&#39;t just serve our members – it&#39;s a win-win for our hotel partners too. With
                Checkins.ai, hotels can fill their rooms efficiently and discreetly without needing to publicly
                advertise discounted rates. This approach allows them to maintain their prestige and brand
                image while achieving optimal occupancy levels.</span>
              <span>A pivotal development in our journey has been our auto rebooking feature, a revolutionary tool
                driven by artificial intelligence. With this feature, our members can book refundable rooms and
                rest easy, knowing that they will automatically benefit from any price drops. Our system
                continuously scans for potential savings, automatically rebooking at the lower rate if one
                becomes available. The savings are directly refunded to the member, resulting in an effortless
                and convenient way to secure the best price. We take pride in being the only platform that
                provides this trailblazing feature, proving our commitment to prioritizing our members&#39; needs.
                Since our launch, Checkins.ai has grown both in size and reputation. We have successfully
                onboarded hundreds of members who have reaped the benefits of substantial savings on their
                hotel bookings. The transformation we&#39;ve brought about in how people perceive, and
                experience travel is evident in the heartening stories of our satisfied members.</span>
              <span>Yet, we believe in continually moving forward and pushing the boundaries. Looking into the
                future, our plans are ambitious and customer centric. In 2024, we intend to launch an AI-driven
                adaptive booking experience. Leveraging cutting-edge artificial intelligence technology, we aim
                to revolutionize the booking process, making it more adaptive and responsive to changing
                prices and availability.</span>
              <span>But we&#39;re not stopping there. At Checkins.ai, we understand that every traveler is unique,
                with their own preferences, interests, and needs. To cater to these diverse needs, we plan to
                introduce a personalization feature. With this feature, each member&#39;s travel preference will be
                factored into our AI system, allowing us to provide customized booking options and
                recommendations.</span>
              <span>This new era of personalized travel experience promises to take our members&#39; travel journey to
                new heights. By understanding and incorporating their preferences, we aim to make
                Checkins.ai a platform that not only provides hotel bookings but also curates travel
                experiences that match each member&#39;s unique taste.</span>
              <span>The journey of Checkins.ai has been an exciting and fulfilling one. Each milestone, every
                innovation, and all the successful experiences of our members fuel our passion and drive us to
                achieve more. As we look towards the future, we remain committed to our founding vision –
                transforming the landscape of hotel bookings and making travel accessible and affordable for
                everyone.</span>
              <span>Checkins.ai is more than just a business venture; it&#39;s the embodiment of a dream and a
                testament to our passion for travel. We believe that travel is about much more than reaching a
                destination. It&#39;s about the experiences you have, the people you meet, the memories you
                make, and the stories you bring back. And we&#39;re here to ensure that you have more of those
                experiences and memories, without the worry of overspending on accommodation.
                With our ambitious plans and ceaseless pursuit of innovation, we look forward to bringing even
                more exciting and transformative features to our members. And as we continue to grow, we
                invite you to join us on this journey, experience the difference of Checkins.ai, and let us
                redefine your travel experience.</span>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}
