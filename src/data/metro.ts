import type { Lang } from '@/store/prefs';

export type MetroStation = {
  id: string;
  name: { en: string; bn: string; hi: string };
  lat: number;
  lng: number;
};

export const metroStations: MetroStation[] = [
  { id: 'belgachia', name: { en: 'Belgachia', bn: 'বেলগাছিয়া', hi: 'बेलगछिया' }, lat: 22.60583, lng: 88.38639 },
  { id: 'shyambazar', name: { en: 'Shyambazar', bn: 'শ্যামবাজার', hi: 'श्यामबाजार' }, lat: 22.601313, lng: 88.372586 },
  { id: 'shobhabazar', name: { en: 'Shobhabazar Sutanuti', bn: 'শোভাবাজার সুতানুটি', hi: 'शोभाबाजार सुतानुती' }, lat: 22.596029, lng: 88.365285 },
  { id: 'girish-park', name: { en: 'Girish Park', bn: 'গিরিশ পার্ক', hi: 'गिरीश पार्क' }, lat: 22.587143, lng: 88.363083 },
  { id: 'mg-road', name: { en: 'MG Road', bn: 'এম জি রোড', hi: 'एमजी रोड' }, lat: 22.580858, lng: 88.361401 },
  { id: 'central', name: { en: 'Central', bn: 'সেন্ট্রাল', hi: 'सेंट्रल' }, lat: 22.57247, lng: 88.358788 },
  { id: 'kalighat', name: { en: 'Kalighat', bn: 'কালীঘাট', hi: 'कालीघाट' }, lat: 22.516652, lng: 88.346003 },
  { id: 'jatin-das-park', name: { en: 'Jatin Das Park', bn: 'যতীন দাস পার্ক', hi: 'जतीन दास पार्क' }, lat: 22.524262, lng: 88.346489 },
  { id: 'dum-dum', name: { en: 'Dum Dum', bn: 'দমদম', hi: 'दमदम' }, lat: 22.62111, lng: 88.39278 },
  { id: 'noapara', name: { en: 'Noapara', bn: 'নোয়াপাড়া', hi: 'नोआपाड़ा' }, lat: 22.63972, lng: 88.39389 },
  { id: 'kavi-subhash', name: { en: 'Kavi Subhash', bn: 'কবি সুভাষ', hi: 'कवि सुभाष' }, lat: 22.47194, lng: 88.39806 },
  { id: 'shahid-khudiram', name: { en: 'Shahid Khudiram', bn: 'শহীদ ক্ষুদিরাম', hi: 'शहीद खुदीराम' }, lat: 22.465972, lng: 88.39167 },
  { id: 'masterda-surya-sen', name: { en: 'Masterda Surya Sen', bn: 'মাস্টারদা সূর্য সেন', hi: 'मास्टरदा सूर्य सेन' }, lat: 22.473521, lng: 88.360871 },
  { id: 'netaji', name: { en: 'Netaji', bn: 'নেতাজি', hi: 'नेताजी' }, lat: 22.480976, lng: 88.346 },
  { id: 'mahanayak-uttam-kumar', name: { en: 'Mahanayak Uttam Kumar', bn: 'মহানায়ক উত্তম কুমার', hi: 'महानायक उत्तम कुमार' }, lat: 22.49472, lng: 88.345 },
  { id: 'rabindra-sarobar', name: { en: 'Rabindra Sarobar', bn: 'রবীন্দ্র সরোবর', hi: 'रवींद्र सरोवर' }, lat: 22.50722, lng: 88.34556 },
  { id: 'netaji-bhavan', name: { en: 'Netaji Bhavan', bn: 'নেতাজি ভবন', hi: 'नेताजी भवन' }, lat: 22.53333, lng: 88.34611 },
  { id: 'rabindra-sadan', name: { en: 'Rabindra Sadan', bn: 'রবীন্দ্র সদন', hi: 'रवींद्र सदन' }, lat: 22.54139, lng: 88.34722 },
  { id: 'maidan', name: { en: 'Maidan', bn: 'ময়দান', hi: 'मैदान' }, lat: 22.54944, lng: 88.34889 },
  { id: 'park-street', name: { en: 'Park Street', bn: 'পার্ক স্ট্রিট', hi: 'पार्क स्ट्रीट' }, lat: 22.555, lng: 88.35028 },
  { id: 'esplanade', name: { en: 'Esplanade', bn: 'এসপ্ল্যানেড', hi: 'एस्प्लेनेड' }, lat: 22.56444, lng: 88.35167 },
  { id: 'chandni-chowk', name: { en: 'Chandni Chowk', bn: 'চাঁদনি চক', hi: 'चाँदनी चौक' }, lat: 22.566796, lng: 88.354137 },
  { id: 'baranagar', name: { en: 'Baranagar', bn: 'বরানগর', hi: 'बारानगर' }, lat: 22.653529, lng: 88.378873 },
  { id: 'dakshineswar', name: { en: 'Dakshineswar', bn: 'দক্ষিণেশ্বর', hi: 'दक्षिणेश्वर' }, lat: 22.653971, lng: 88.363724 },
  { id: 'salt-lake-sector-v', name: { en: 'Salt Lake Sector-V', bn: 'সল্টলেক সেক্টর ৫', hi: 'साल्ट लेक सेक्टर 5' }, lat: 22.581318, lng: 88.429822 },
  { id: 'karunamoyee', name: { en: 'Karunamoyee', bn: 'করুণাময়ী', hi: 'करुणामयी' }, lat: 22.586435, lng: 88.421515 },
  { id: 'central-park', name: { en: 'Central Park', bn: 'সেন্ট্রাল পার্ক', hi: 'सेंट्रल पार्क' }, lat: 22.590437, lng: 88.415605 },
  { id: 'city-center', name: { en: 'City Center', bn: 'সিটি সেন্টার', hi: 'सिटी सेंटर' }, lat: 22.587069, lng: 88.407875 },
  { id: 'bengal-chemical', name: { en: 'Bengal Chemical', bn: 'বেঙ্গল কেমিক্যাল', hi: 'बंगाल केमिकल' }, lat: 22.580076, lng: 88.401283 },
  { id: 'salt-lake-stadium', name: { en: 'Salt Lake Stadium', bn: 'সল্টলেক স্টেডিয়াম', hi: 'साल्ट लेक स्टेडियम' }, lat: 22.57306, lng: 88.40306 },
  { id: 'phoolbagan', name: { en: 'Phoolbagan', bn: 'ফুলবাগান', hi: 'फूलबागान' }, lat: 22.57214, lng: 88.390282 },
  { id: 'sealdah', name: { en: 'Sealdah', bn: 'শিয়ালদহ', hi: 'सियालदह' }, lat: 22.567207, lng: 88.371497 },
  { id: 'mahakaran', name: { en: 'Mahakaran', bn: 'মহাকরণ', hi: 'महाकरण' }, lat: 22.571189, lng: 88.350106 },
  { id: 'howrah', name: { en: 'Howrah', bn: 'হাওড়া', hi: 'हावड़ा' }, lat: 22.584454, lng: 88.340578 },
  { id: 'howrah-maidan', name: { en: 'Howrah Maidan', bn: 'হাওড়া ময়দান', hi: 'हावड़ा मैदान' }, lat: 22.581998, lng: 88.332994 },
  { id: 'joka', name: { en: 'Joka', bn: 'জোকা', hi: 'जोका' }, lat: 22.452244, lng: 88.301751 },
  { id: 'thakurpukur', name: { en: 'Thakurpukur', bn: 'ঠাকুরপুকুর', hi: 'ठाकुरपुकुर' }, lat: 22.464261, lng: 88.307555 },
  { id: 'behala-sakherbazar', name: { en: 'Behala Sakherbazar', bn: 'বেহালা সখেরবাজার', hi: 'बेहाला सखेरबाजार' }, lat: 22.474611, lng: 88.309991 },
  { id: 'behala-chowrasta', name: { en: 'Behala Chowrasta', bn: 'বেহালা চৌরাস্তা', hi: 'बेहाला चौरास्ता' }, lat: 22.487529, lng: 88.313426 },
  { id: 'behala-bazar', name: { en: 'Behala Bazar', bn: 'বেহালা বাজার', hi: 'बेहाला बाजार' }, lat: 22.498929, lng: 88.317354 },
  { id: 'taratala', name: { en: 'Taratala', bn: 'তারাতলা', hi: 'ताराताला' }, lat: 22.508165, lng: 88.320563 },
  { id: 'majerhat', name: { en: 'Majerhat', bn: 'মাঝেরহাট', hi: 'माझेरहाट' }, lat: 22.5191, lng: 88.3234 },
  { id: 'satyajit-ray', name: { en: 'Satyajit Ray', bn: 'সত্যজিৎ রায়', hi: 'सत्यजीत राय' }, lat: 22.4846, lng: 88.3926 },
  { id: 'jyotirindra-nandi', name: { en: 'Jyotirindra Nandi', bn: 'জ্যোতিরিন্দ্র নন্দী', hi: 'ज्योतिरिंद्र नंदी' }, lat: 22.495915, lng: 88.398667 },
  { id: 'kavi-sukanta', name: { en: 'Kavi Sukanta', bn: 'কবি সুকান্ত', hi: 'कवि सुकांत' }, lat: 22.505262, lng: 88.400996 },
  { id: 'hemanta-mukhopadhyay', name: { en: 'Hemanta Mukhopadhyay', bn: 'হেমন্ত মুখোপাধ্যায়', hi: 'हेमंत मुखोपाध्याय' }, lat: 22.514777, lng: 88.401469 },
  { id: 'vip-bazar', name: { en: 'VIP Bazar', bn: 'ভিআইপি বাজার', hi: 'वीआईपी बाजार' }, lat: 22.5255, lng: 88.39586 },
  { id: 'ritwik-ghatak', name: { en: 'Ritwik Ghatak', bn: 'ঋত্বিক ঘটক', hi: 'ऋत्विक घटक' }, lat: 22.5328605, lng: 88.3957647 },
  { id: 'beleghata', name: { en: 'Beleghata', bn: 'বেলেঘাটা', hi: 'बेलेघाटा' }, lat: 22.550703, lng: 88.404094 },
  { id: 'dum-dum-cantonment', name: { en: 'Dum Dum Cantonment', bn: 'দমদম ক্যান্টনমেন্ট', hi: 'दमदम छावनी' }, lat: 22.638, lng: 88.4123 },
  { id: 'jessore-road', name: { en: 'Jessore Road', bn: 'যশোর রোড', hi: 'जेसोर रोड' }, lat: 22.6395137, lng: 88.4297765 },
  { id: 'jai-hind', name: { en: 'Jai Hind', bn: 'জয় হিন্দ', hi: 'जय हिंद' }, lat: 22.64619, lng: 88.43591 },
];


export function formatMetroName(stationIdOrName: string, lang: Lang): string {
  const station = metroStations.find(
    (s) => s.id === stationIdOrName || s.name.en === stationIdOrName
  );
  const name = station ? (station.name[lang] ?? station.name.en) : stationIdOrName;
  const suffix = lang === 'bn' ? 'মেট্রো' : lang === 'hi' ? 'मेट्रो' : 'Metro';
  return `${name} ${suffix}`;
}