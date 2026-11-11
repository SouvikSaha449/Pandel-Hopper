export type ReadyRoute = {
  id: string;
  name: { en: string; bn: string; hi: string };
  sub: { en: string; bn: string; hi: string };
  stops: string[];
  minutes: number;
};

// minutes = walking between stops (straight-line x1.3 at 4.5 km/h via geo.ts) plus 30 minutes at each puja.
export const readyRoutes: ReadyRoute[] = [
  {
    id: 'north-kolkata-hopping',
    name: {
      en: 'North Kolkata Hopping Route',
      bn: 'উত্তর কলকাতা পুজো পরিক্রমা রুট',
      hi: 'उत्तर कोलकाता पंडाल हॉपिंग रूट',
    },
    sub: {
      en: 'Shobhabazar Metro to Sealdah Metro · 11 high-voltage stops',
      bn: 'শোভাবাজার মেট্রো থেকে শিয়ালদহ মেট্রো · ১১টি সেরা পুজো',
      hi: 'शोभाबाजार मेट्रो से सियालदह मेट्रो · 11 प्रमुख पूजा',
    },
    stops: [
      'sovabazar-rajbari',
      'hatibagan-sarbojanin',
      'sikdar-bagan',
      'hatibagan-nabin',
      'nalin-sarkar',
      'kashi-bose-lane',
      'chaltabagan',
      'chorebagan',
      'mohammad-ali',
      'college-square',
      'santosh-mitra',
    ],
    minutes: 425,
  },
  {
    id: 'dum-dum-tala-baghbazar-kumartuli',
    name: {
      en: 'Dum Dum to Kumartuli (Blue Line Walk)',
      bn: 'দমদম থেকে কুমারটুলি (ব্লু লাইন হাঁটা রুট)',
      hi: 'दमदम से कुमारटुली (ब्लू लाइन पैदल रूट)',
    },
    sub: {
      en: 'Dum Dum Metro → Paikpara → Tala → Baghbazar → Kumartuli',
      bn: 'দমদম মেট্রো → পাইকপাড়া → টালা → বাগবাজার → কুমারটুলি',
      hi: 'दमदम मेट्रो → पाइकपाड़ा → टाला → बागबाज़ार → कुमारटुली',
    },
    stops: [
      'paikpara-15-pally',
      'belgachia-sadharan-durgotsab',
      'tala-prattay',
      'tala-barowari',
      'baghbazar',
      'jagat-mukherjee',
      'kumartuli-sarbojanin',
      'kumartuli-park',
      'ahiritola',
    ],
    minutes: 354,
  },
  {
    id: 'dumdum-park-sreebhumi-tala-baghbazar',
    name: {
      en: 'Dum Dum Park, Sreebhumi to Baghbazar',
      bn: 'দমদম পার্ক, শ্রীভূমি থেকে বাগবাজার',
      hi: 'दमदम पार्क, श्रीभूमि से बागबाज़ार',
    },
    sub: {
      en: 'VIP Road mega themes → Belgachia Bridge → Tala → Kumartuli',
      bn: 'ভিআইপি রোড মেগা থিম → বেলগাছিয়া ব্রিজ → টালা → কুমারটুলি',
      hi: 'वीआईपी रोड मेगा थीम → बेलगाछिया ब्रिज → टाला → कुमारटुली',
    },
    stops: [
      'dumdum-park-tarun-dal',
      'dumdum-park-bharat-chakra',
      'dumdum-park-tarun-sangha',
      'sree-bhumi',
      'belgachia-sadharan-durgotsab',
      'tala-prattay',
      'tala-barowari',
      'baghbazar',
      'kumartuli-sarbojanin',
      'kumartuli-park',
    ],
    minutes: 420,
  },
  {
    id: 'bonedi-houses',
    name: {
      en: 'Family-house pujas',
      bn: 'বনেদি বাড়ির পুজো',
      hi: 'बनेदी बाड़ी की पूजा',
    },
    sub: {
      en: 'Shobhabazar to Girish Park · five old family pujas',
      bn: 'শোভাবাজার থেকে গিরিশ পার্ক · পাঁচটি পুরনো বাড়ির পুজো',
      hi: 'शोभाबाजार से गिरीश पार्क · पाँच पुरानी पारिवारिक पूजा',
    },
    stops: [
      'sovabazar-rajbari',
      'hatkhola-dutta',
      'darjipara-mitra',
      'chhatubabu',
      'jorasanko-daw',
    ],
    minutes: 205,
  },
  {
    id: 'south-1-day-complete',
    name: {
      en: 'South 1-Day Complete',
      bn: 'দক্ষিণ কলকাতা ১ দিনের সম্পূর্ণ রুট',
      hi: 'दक्षिण कोलकाता 1-दिन पूरा रूट',
    },
    sub: {
      en: 'Kalighat Metro to Gariahat · 8 South heavyweights in one hop',
      bn: 'কালীঘাট মেট্রো থেকে গড়িয়াহাট · এক দিনে ৮টি সেরা দক্ষিণ পুজো',
      hi: 'कालीघाट मेट्रो से गरियाहाट · एक दिन में 8 प्रमुख दक्षिण पूजा',
    },
    stops: [
      'chetla-agrani',
      'badamtala-ashar-sangha',
      'mudiali-club',
      'deshapriya-park',
      'tridhara-sammilani',
      'maddox-square',
      'ballygunge-cultural',
      'ekdalia-evergreen',
    ],
    minutes: 348,
  },
  {
    id: 'south-day-1',
    name: {
      en: 'South 2-Day: Day 1 (Kalighat & Chetla)',
      bn: 'দক্ষিণ ২-দিন: ১ম দিন (কালীঘাট ও চেতলা)',
      hi: 'दक्षिण 2-दिन: दिन 1 (कालीघाट व चेतला)',
    },
    sub: {
      en: 'Rabindra Sarobar Metro to Rashbehari · New Alipore & Chetla belt',
      bn: 'রবীন্দ্র সরোবর থেকে রাসবিহারী · নিউ আলিপুর ও চেতলা',
      hi: 'रवींद्र सरोवर से रासबिहारी · न्यू अलीपुर और चेतला',
    },
    stops: [
      'suruchi-sangha',
      'chetla-agrani',
      '66-pally',
      'badamtala-ashar-sangha',
      'mudiali-club',
      'shib-mandir-sarbojanin',
      'deshapriya-park',
      'tridhara-sammilani',
      'ballygunge-cultural',
    ],
    minutes: 350,
  },
  {
    id: 'south-day-2',
    name: {
      en: 'South 2-Day: Day 2 (Gariahat & Kasba)',
      bn: 'দক্ষিণ ২-দিন: ২য় দিন (গড়িয়াহাট ও কসবা)',
      hi: 'दक्षिण 2-दिन: दिन 2 (गरियाहाट व कसबा)',
    },
    sub: {
      en: 'Netaji Bhavan Metro to Kasba · Maddox Square, Ekdalia & Bosepukur',
      bn: 'নেতাজি ভবন থেকে কসবা · ম্যাডক্স স্কোয়ার, একডালিয়া ও বোসপুকুর',
      hi: 'नेताजी भवन से कसबा · मैडॉक्स स्क्वायर, एकडालिया व बोसपुकुर',
    },
    stops: [
      'bakulbagan-sarbojanin',
      'hazra-park-durgotsab',
      'maddox-square',
      'hindustan-park-sarbojanin',
      'singhi-park-sarbojanin',
      'ekdalia-evergreen',
      'babubagan-sarbojanin',
      'kasba-bosepukur-sitala-mandir',
    ],
    minutes: 352,
  },
  {
    id: 'behala-purple-line',
    name: {
      en: 'Behala Purple Line Trail',
      bn: 'বেহালা পার্পল লাইন রুট',
      hi: 'बेहाला पर्पल लाइन रूट',
    },
    sub: {
      en: 'Behala Chowrasta Metro to Taratala Metro · 6 walkable stops',
      bn: 'বেহালা চৌরাস্তা থেকে তারাতলা মেট্রো · ৬টি হাঁটা পথের পুজো',
      hi: 'बेहाला चौरास्ता से तरातला मेट्रो · 6 पैदल दूरी की पूजा',
    },
    stops: [
      'barisha-club',
      'barisha-player-s-corner',
      '11-pally-youth-association-behala',
      'behala-notun-dal',
      'behala-club',
      'behala-youngmen-s-association',
    ],
    minutes: 255,
  },
  {
    id: 'dum-dum-park-sreebhumi-saltlake',
    name: {
      en: 'Dum Dum Park, Sreebhumi & Salt Lake',
      bn: 'দমদম পার্ক, শ্রীভূমি ও সল্টলেক',
      hi: 'दमदम पार्क, श्रीभूमि और साल्ट लेक',
    },
    sub: {
      en: 'VIP Road to City Center Metro · mega-theme corridor',
      bn: 'ভিআইপি রোড থেকে সিটি সেন্টার মেট্রো · মেগা থিম রুট',
      hi: 'वीआईपी रोड से सिटी सेंटर मेट्रो · मेगा थीम रूट',
    },
    stops: [
      'dumdum-park-bharat-chakra',
      'dumdum-park-tarun-sangha',
      'dumdum-park-tarun-dal',
      'sree-bhumi',
      'ae-block-durgotsab',
      'fd-block-durgotsab',
    ],
    minutes: 268,
  },
  {
    id: 'salt-lake-green-line',
    name: {
      en: 'Salt Lake Green Line Trail',
      bn: 'সল্টলেক গ্রিন লাইন রুট',
      hi: 'साल्ट लेक ग्रीन लाइन रूट',
    },
    sub: {
      en: 'City Center Metro to Sector-V Metro · 9 top blocks',
      bn: 'সিটি সেন্টার মেট্রো থেকে সেক্টর-৫ মেট্রো · ৯টি সেরা ব্লক',
      hi: 'सिटी सेंटर मेट्रो से सेक्टर-V मेट्रो · 9 प्रमुख ब्लॉक',
    },
    stops: [
      'salt-lake-ec-market',
      'salt-lake-labony-estate',
      'fd-block-durgotsab',
      'salt-lake-fe-block',
      'salt-lake-cj-block',
      'bj-block-durgotsab',
      'salt-lake-aj-block',
      'salt-lake-ak-block',
      'salt-lake-bk-block',
    ],
    minutes: 337,
  },
];
