import HotelDetails from "@/components/sections/hotel-details/HotelDetails";

describe("HotelDetails", () => {
  const hotelMock = {
    id: "39714475",
    name: "SLS Hotel, a Luxury Collection Hotel, Beverly Hills",
    relevanceScore: "19",
    providerId: "RateHawk",
    providerHotelId: "sls_hotel_at_beverly_hills",
    providerName: "RateHawk",
    language: "en-US",
    geoCode: { lat: "34.070007", long: "-118.37691" },
    neighbourhoods: [],
    contact: {
      address: {
        line1: "465 S La Cienega Blvd, Los Angeles",
        city: [Object],
        state: {},
        country: [Object],
        postalCode: "CA90048",
        destinationCode: "2011",
      },
      phones: ["+13102470400"],
      fax: [],
      emails: ["slsbh.reservations@luxurycollection.com"],
    },
    chainName: "The Luxury Collection",
    type: "Hotel",
    descriptions: [
      {
        type: "Location",
        text: "Sophisticated but very comfortable hotel «SLS Hotel, a Luxury Collection Hotel, Beverly Hills» is located in Los Angeles. This hotel is located in 12 km from the city center. You can take a walk and explore the neighbourhood area of the hotel — Farmers Market, Los Angeles County Museum of Art and Hollywood/Highland.",
      },
      {
        type: "At the hotel",
        text: "You can stop by the bar. Taste the local cuisine and have a rest in the restaurant. The hotel cafe is a nice place to have a snack. Free Wi-Fi on the territory will help you to stay on-line.,Specially for tourists who travel by car, there’s a parking zone. The following services are also available for the guests: a massage room, a sauna, a spa center and a doctor. Guests who love doing sports will be able to enjoy a fitness center and a gym. Tourists who can’t live without swimming will appreciate a pool and an outdoor pool.,There are playrooms for children at the hotel. They will be having so much fun that you might have to spend the evening with adults. The tour assistance desk of the hotel will help you book an excursion. You can take your pet with you for the journey. Pets are allowed. For the free movement around the city, the hotel offers a transfer for you.,Accessibility: there is an elevator/lift. Additional services that the hotel offers to its guests: a laundry, dry cleaning, an ATM, private check-in and check-out, ironing, press, car rental, a safe-deposit box and a concierge. The staff of the hotel speaks English, Spanish, German, Russian, French and Korean.",
      },
      {
        type: "Room amenities",
        text: "The room is warmly decorated and has everything you need to have a rest after a long eventful day. There is a DVD player, an alarm clock, a TV, a mini-bar, a bathrobe and slippers. Please note that the listed services may not be available in all the rooms.",
      },
    ],
    category: "Hotel",
    starRating: "5",
    facilities: [
      { id: "1", groupId: "48", name: "ATM" },
      { id: "2", groupId: "0", name: "Shopping on site" },
      { id: "3", groupId: "0", name: "Air conditioning" },
      { id: "4", groupId: "0", name: "Elevator/lift" },
      { id: "5", groupId: "7", name: "Currency exchange" },
      { id: "6", groupId: "10", name: "Smoke-free property" },
      { id: "7", groupId: "0", name: "Heating" },
      { id: "8", groupId: "0", name: "Security guard" },
      { id: "9", groupId: "0", name: "Newspapers" },
      { id: "10", groupId: "0", name: "Ticket assistance" },
      { id: "11", groupId: "0", name: "Gift shop" },
      { id: "12", groupId: "0", name: "Express check-in/check-out" },
      { id: "13", groupId: "0", name: "Terrace" },
      { id: "14", groupId: "0", name: "Private check-in/check-out" },
      { id: "15", groupId: "0", name: "Doorman" },
      {
        id: "16",
        groupId: "10",
        name: "All Spaces Non-Smoking (public and private)",
      },
      { id: "17", groupId: "0", name: "Radio" },
      { id: "18", groupId: "0", name: "Reception desk" },
      { id: "19", groupId: "0", name: "Electric car charging" },
      { id: "20", groupId: "10", name: "Non-smoking rooms" },
      { id: "21", groupId: "24", name: "Room service" },
      { id: "22", groupId: "0", name: "Interconnecting rooms available" },
      { id: "23", groupId: "0", name: "Fridge" },
      { id: "24", groupId: "0", name: "Family room" },
      { id: "25", groupId: "0", name: "VIP room amenities" },
      { id: "26", groupId: "0", name: "Indoor Fireplace" },
      { id: "27", groupId: "0", name: "Smoke Detector" },
      { id: "28", groupId: "11", name: "Cable TV" },
      { id: "29", groupId: "11", name: "TV" },
      { id: "30", groupId: "0", name: "Minibar" },
      { id: "31", groupId: "0", name: "DVD Player" },
      { id: "32", groupId: "0", name: "Hairdryer" },
      { id: "33", groupId: "0", name: "Shower/Bathtub" },
      { id: "34", groupId: "0", name: "Wardrobe/Closet" },
      { id: "35", groupId: "0", name: "Bathrobe" },
      { id: "36", groupId: "0", name: "Linens" },
      { id: "37", groupId: "0", name: "Alarm clock" },
      { id: "38", groupId: "0", name: "Slippers" },
      { id: "39", groupId: "0", name: "Safe (in room)" },
      { id: "40", groupId: "0", name: "Toiletries" },
      { id: "41", groupId: "0", name: "Accessibility features" },
      { id: "42", groupId: "34", name: "Wheelchair Accessible" },
      {
        id: "43",
        groupId: "14",
        name: "Wheelchair access to restaurant",
      },
      { id: "44", groupId: "12", name: "Iron and board" },
      { id: "45", groupId: "12", name: "Ironing" },
      { id: "46", groupId: "12", name: "Laundry" },
      { id: "47", groupId: "0", name: "Safe-deposit box" },
      { id: "48", groupId: "49", name: "Concierge services" },
      { id: "49", groupId: "12", name: "Dry-cleaning" },
      { id: "50", groupId: "0", name: "Shoe shine" },
      { id: "51", groupId: "0", name: "Luggage storage" },
      { id: "52", groupId: "0", name: "Wake-up service" },
      { id: "53", groupId: "0", name: "Telephone" },
      { id: "54", groupId: "12", name: "Iron" },
      { id: "55", groupId: "8", name: "Bar" },
      { id: "56", groupId: "0", name: "Coffee/tea for guests" },
      { id: "57", groupId: "5", name: "Breakfast" },
      { id: "58", groupId: "5", name: "Buffet breakfast" },
      { id: "59", groupId: "5", name: "Breakfast in the room" },
      { id: "60", groupId: "0", name: "Cafe" },
      { id: "61", groupId: "14", name: "Restaurant" },
      { id: "62", groupId: "0", name: "Bottled water" },
      { id: "63", groupId: "16", name: "Free Wi-Fi" },
      { id: "64", groupId: "16", name: "Internet" },
      { id: "65", groupId: "16", name: "In-room internet" },
      { id: "66", groupId: "0", name: "Car rental" },
      { id: "67", groupId: "18", name: "Airport transportation" },
      { id: "68", groupId: "0", name: "Transfer services" },
      { id: "69", groupId: "0", name: "Spanish" },
      { id: "70", groupId: "0", name: "German" },
      { id: "71", groupId: "0", name: "Russian" },
      { id: "72", groupId: "0", name: "English" },
      { id: "73", groupId: "0", name: "French" },
      { id: "74", groupId: "0", name: "Korean" },
      { id: "75", groupId: "16", name: "Multi-language staff" },
      { id: "76", groupId: "0", name: "Arabic" },
      { id: "77", groupId: "0", name: "Chinese" },
      { id: "78", groupId: "0", name: "Tour assistance" },
      { id: "79", groupId: "50", name: "Billiards" },
      { id: "80", groupId: "0", name: "Hiking" },
      { id: "81", groupId: "0", name: "Sun Deck" },
      { id: "82", groupId: "1", name: "Parking" },
      { id: "83", groupId: "1", name: "Parking nearby" },
      { id: "84", groupId: "13", name: "Swimming pool" },
      { id: "85", groupId: "13", name: "Outdoor pool" },
      { id: "86", groupId: "13", name: "Pool facilities" },
      { id: "87", groupId: "6", name: "Business center" },
      { id: "88", groupId: "0", name: "Event facilities" },
      { id: "89", groupId: "0", name: "Fax and copy machine" },
      { id: "90", groupId: "6", name: "Conference Hall" },
      { id: "91", groupId: "17", name: "Fitness facilities" },
      { id: "92", groupId: "17", name: "Gym" },
      { id: "93", groupId: "30", name: "Doctor" },
      { id: "94", groupId: "0", name: "Massage" },
      { id: "95", groupId: "0", name: "Beauty services" },
      { id: "96", groupId: "0", name: "Sauna" },
      { id: "97", groupId: "9", name: "Spa" },
      { id: "98", groupId: "0", name: "First Aid Kit" },
      { id: "99", groupId: "0", name: "Playroom" },
      { id: "100", groupId: "3", name: "Babysitting and childcare" },
    ],
    facilityGroups: [
      { id: "1", name: "Parking", culture: "en-us", type: "Hotel" },
      {
        id: "3",
        name: "Childcare Service",
        culture: "en-us",
        type: "Hotel",
      },
      {
        id: "34",
        name: "Disable Friendly",
        culture: "en-us",
        type: "Hotel",
      },
      { id: "5", name: "Breakfast", culture: "en-us", type: "Hotel" },
      {
        id: "6",
        name: "Business Center",
        culture: "en-us",
        type: "Hotel",
      },
      {
        id: "7",
        name: "Currency Exchange",
        culture: "en-us",
        type: "Hotel",
      },
      { id: "8", name: "Bar", culture: "en-us", type: "Hotel" },
      { id: "9", name: "Spa", culture: "en-us", type: "Hotel" },
      { id: "10", name: "Non Smoking", culture: "en-us", type: "Hotel" },
      { id: "11", name: "Television", culture: "en-us", type: "Hotel" },
      {
        id: "12",
        name: "Laundry Services",
        culture: "en-us",
        type: "Hotel",
      },
      {
        id: "13",
        name: "Swimming Pool",
        culture: "en-us",
        type: "Hotel",
      },
      { id: "14", name: "Restaurant", culture: "en-us", type: "Hotel" },
      { id: "15", name: "Pets Allowed", culture: "en-us", type: "Hotel" },
      { id: "16", name: "Internet", culture: "en-us", type: "Room" },
      {
        id: "17",
        name: "Fitness Facility",
        culture: "en-us",
        type: "Room",
      },
      { id: "48", name: "ATM", culture: "en-us", type: "Hotel" },
      {
        id: "18",
        name: "Airport Shuttle",
        culture: "en-us",
        type: "Room",
      },
      {
        id: "49",
        name: "Concierge Services",
        culture: "en-us",
        type: "Hotel",
      },
      { id: "50", name: "Billiards", culture: "en-us", type: "Hotel" },
      { id: "24", name: "Room service", culture: "en-us", type: "Hotel" },
      { id: "30", name: "Medical", culture: "en-us", type: "Hotel" },
    ],
    nearByAttractions: [],
    images: [
      {
        links: [
          {
            size: "Standard",
            url: "https://cdn.worldota.net/t/1024x768/content/e9/1c/e91ca0758c53819477272de77fc0b8e4bf329d1f.jpeg",
          },
        ],
        roomCodes: [],
      },
    ],
    policies: [
      {
        type: "Meals",
        text: "Information about the type of meals included in the price is indicated in the rate details.",
      },
      {
        type: "Children and information about extra beds",
        text: "Fee for an extra bed: 25.00 USD per night.",
      },
      {
        type: "Children and information about extra beds",
        text: "The number of extra beds depends on the room category. You must take a look at the information about the size of the selected room.",
      },
      {
        type: "Special living conditions",
        text: "A deposit of 300.00 USD per stay will be required by bank transfer upon arrival to cover any potential damages.",
      },
      {
        type: "Pets",
        text: "Pets are allowed for an additional fee. Price of accommodation: 150.00 USD per stay.",
      },
    ],
    fees: [
      {
        feeType: "Mandatory",
        text: " Fee Type: Extra Bed Price: 25 Currency : USD  Price Unit  per_guest_per_night  Inclusion  not_included  ",
      },
      {
        feeType: "Mandatory",
        text: " Fee Type: Internet  Internet type: wireless Price: 15 Currency : USD  Price Unit  per_room_per_night  inclusion  not_included  ",
      },
      {
        feeType: "Mandatory",
        text: " Fee Type: Pets  Pet  Type: unspecified Price: 150 Currency : USD   Inclusion  not_included  ",
      },
    ],
    reviews: [],
    checkinInfo: { beginTime: "16:00:00", minAge: "0" },
    checkoutInfo: { time: "12:00:00" },
    heroImage:
      "https://cdn.worldota.net/t/1024x768/content/6f/94/6f94129d1975f164f223f519d25c36389fe5bf44.jpeg",
    distance: "0",
    attributes: [],
    ratePlanTypes: [],
    imageCount: "148",
    rooms: [
      {
        roomId:
          "class:5|quality:23|sex:0|bathroom:2|bedding:0|family:0|capacity:4|club:0",
        type: "Signature Quadruple Suite",
        roomDescription: "Signature Quadruple Suite",
        facilities: [Array],
        beds: [Array],
      },
    ],
  };

  const reviewsMock = [
    {
      date: "Date of stay: September 2023",
      hotel: "SLS Hotel, a Luxury Collection Hotel, Beverly Hills",
      main_text:
        "We stayed here for 8 nights in total and loved every minute. What a quirky hotel which is unusual since it’s part of a huge chain   The staff were great and could not have been more accommodating and friendly.  The room was comfortable and quiet with a view over the city,the bed was great, I got a good nights sleep and the bathroom had a nice large bath.   We loved the pool area on the roof, with fab views, you could even see the Hollywood sign in the distance.  All of the staff were lovely and efficient and the food and drinks were good too. They couldn’t have done more for us.  There was a great atmosphere and a DJ a couple of times.  Big thank you to the staff,  a very nice crew working up there..  We liked the cocktail bar (based on Alice Through the Looking Glass) hidden away on the ground floor,  and had several pre dinner cocktails in there. We thought they were good value.   We ate breakfast there as it was included in our deal and also had several dinners all of which were a good standard and promptly served .   I’d like to give a big mention to Natalia in the restaurant downstairs, excellent service from her.  What a lovely lady.   We really liked the SLS and when we return to LA next year we won’t stay anywhere else.",
      rating: 5,
      title: "A quirky lovely hotel with great staff and good facilities",
      user: "JR100",
    },
    {
      date: "Date of stay: September 2023",
      hotel: "SLS Hotel, a Luxury Collection Hotel, Beverly Hills",
      main_text:
        "The hotel is unique and the rooms are spacious . The beds are so comfortable. I really enjoyed the food and ambiance. I love the pool area with the great views. It is close to Cedar Sinai where I have my medical appointments and for stays that involve medical procedures it is great!",
      rating: 4,
      title: "Unique and a great experience",
      user: "Nanette F",
    },
    {
      date: "Date of stay: September 2023",
      hotel: "SLS Hotel, a Luxury Collection Hotel, Beverly Hills",
      main_text:
        "My room was great. Very spacious bedroom with a separate living area and large bathroom. Lots of in-room and bathroom amenities to make one feel pampered. The furniture was plush and inviting. Wonderful mattress!  The roof top pool was a delight. A bit of a small pool but great service, great food and drinks.   I enjoyed the speakeasy every night I was there. The music was a bit loud and poorly chosen at times (for a speakeasy atmosphere they should not be playing hard rock, for example) but the drinks were great as well as the wait staff.   The greatest disappointment was how slowly the breakfast staff move. Once they finally arrive, they are very friendly but between each visit to my table, long periods of time went by. No follow up visits for coffee, water, etc... I had to stand and walk around looking for someone to get a refill on my coffee. The taste and presentation of the food was great, however the overall experience kept me out of the breakfast room for the remainder of my stay.   The valet attendants are fast, friendly and attentive.   I would stay again. There were too many great things about this hotel for me to allow the breakfast staff to ruin my experience.",
      rating: 4,
      title:
        "Luxurious room, rmazing roof top pool and bar, slow breakfast staff.",
      user: "JM Witt",
    },
    {
      date: "Date of stay: August 2023",
      hotel: "SLS Hotel, a Luxury Collection Hotel, Beverly Hills",
      main_text:
        "Watch your bill and charges, greedy & unethical staff attempt to nickel and dime customers. Make sure to have your AAA card with you at check in as they will triple check the rates and packages. Make sure you have a watch and can tell time as your restaurant wait staff will attempt to say meal packages are expired when there is an hour left.",
      rating: 1,
      title:
        "Horrible Staff - watch for fraud room/restaurant or other charges on your account",
      user: "Joe T",
    },
    {
      date: "Date of stay: August 2023",
      hotel: "SLS Hotel, a Luxury Collection Hotel, Beverly Hills",
      main_text:
        "SLS BH has gone down hill.  Not sure it’s really recovered from COVID. No dinner restaurant or decent lounge bar at night.  No amenities in the room.  Rooms all have the smell of trying to cover up smokers and tokers.",
      rating: 2,
      title: "Somewhat Lacking Slacking (SLS)",
      user: "Shaun W",
    },
  ];

  const ratingsMock = [
    {
      id: "39714475",
      ratings: { NumReviews: 2489, Ranking: 79, Rating: 4, TotalHotels: 420 },
    },
  ];

  const searchParamsMock = {};

  it("renders HotelDetails component", () => {
    cy.intercept(
      {
        method: "POST",
        url: "/api/v1/rates/individualHotel/roomAndRates/availability/init", // that have a URL that matches '/users/*'
      },
      [] // and force the response to be: []
    ).as("getAvailableRoomsNonRateHawk");

    cy.intercept(
      {
        method: "POST",
        url: "/api/v1/rates/individualHotel/roomAndRates/availability/init/rh", // that have a URL that matches '/users/*'
      },
      [] // and force the response to be: []
    ).as("getAvailableRoomsRateHawk");

    cy.mount(
      <HotelDetails
        hotel={hotelMock}
        reviews={reviewsMock}
        ratings={ratingsMock}
        searchParams={searchParamsMock}
      />
    );

    cy.get(".hotel-details").should("exist");
  });
});
