
import { MarketEntity, OccupancyStats } from './types';

export const MARKET_ENTITIES: MarketEntity[] = [
  // --- নিচতলা: বাম দিকের সারি ---
  { id: 'L1', name: 'Food Lover Zone', category: 'Shop', floor: 'নিচতলা', floorNumber: 0, side: 'Left', specialty: 'খাবারের দোকান', owner: 'মালিক ১', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800' },
  { id: 'L2', name: 'সাইফুল কম্পিউটার এন্ড ফটোকপি', category: 'Shop', floor: 'নিচতলা', floorNumber: 0, side: 'Left', specialty: 'ফটোকপি, টাইপ, প্রিন্ট, ছবি তোলা ও সার্ভিসিং', owner: 'সাইফুল ইসলাম', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=800' },
  { id: 'L3', name: 'আর.কে. কম্পিউটার', category: 'Shop', floor: 'নিচতলা', floorNumber: 0, side: 'Left', specialty: 'ফটোকপি ও কম্পিউটারের টাইপ, প্রিন্ট', owner: 'মালিক ৩', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800' },
  { id: 'L4', name: 'আদি এন্টারপ্রাইজ', category: 'Shop', floor: 'নিচতলা', floorNumber: 0, side: 'Left', specialty: 'ফটোকপি ও কম্পিউটারের টাইপ, প্রিন্ট', owner: 'মালিক ৪', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800' },
  { id: 'L5', name: 'সুজন কম্পিউটার', category: 'Shop', floor: 'নিচতলা', floorNumber: 0, side: 'Left', specialty: 'ফটোকপি ও কম্পিউটারের টাইপ, প্রিন্ট', owner: 'সুজন আহমেদ', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800' },
  { id: 'L6', name: 'মা এন্টারপ্রাইজ', category: 'Shop', floor: 'নিচতলা', floorNumber: 0, side: 'Left', specialty: 'ফটোকপি ও কম্পিউটারের টাইপ, প্রিন্ট', owner: 'মালিক ৬', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800' },
  { id: 'L7', name: 'মুন্না আইটি এন্ড কম্পিউটার ট্রেনিং', category: 'Coaching', floor: 'নিচতলা', floorNumber: 0, side: 'Left', specialty: 'কম্পিউটার ট্রেনিং সেন্টার', owner: 'মুন্না', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800' },
  { id: 'L8', name: 'ট্রাভেল এজেন্সি', category: 'Service', floor: 'নিচতলা', floorNumber: 0, side: 'Left', specialty: 'টিকিট ও ট্যুরিজম সেবা', owner: 'মালিক ৮', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&w=800' },
  { id: 'L9', name: 'সিটিজেন বিজনেস জোন', category: 'Service', floor: 'নিচতলা', floorNumber: 0, side: 'Left', specialty: 'ডাচ বাংলা ব্যাংক এজেন্ট ব্যাংকিং', owner: 'মালিক ৯', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=800' },
  { id: 'L10', name: 'এ্যাডভোকেট বশির আহম্মেদ চেম্বার', category: 'Service', floor: 'নিচতলা', floorNumber: 0, side: 'Left', specialty: 'আইনি পরামর্শ ও সেবা', owner: 'এ্যাডভোকেট বশির', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800' },

  // --- নিচতলা: ডান দিকের সারি ---
  { id: 'R1', name: 'সেলিম বুক হাউজ', category: 'Shop', floor: 'নিচতলা', floorNumber: 0, side: 'Right', specialty: 'বই খাতা ও স্টেশনারি', owner: 'সেলিম', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800' },
  { id: 'R2', name: 'জুয়েল এন্টাপ্রাইজ', category: 'Shop', floor: 'নিচতলা', floorNumber: 0, side: 'Right', specialty: 'ভিসা ও অনলাইন আবেদন সেবা', owner: 'জুয়েল', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800' },
  { id: 'R3', name: 'রাজা কম্পিউটার', category: 'Shop', floor: 'নিচতলা', floorNumber: 0, side: 'Right', specialty: 'টাইপ, প্রিন্ট ও হোলসেল বিক্রয়', owner: 'রাজা', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1491933382434-50028639c52b?auto=format&fit=crop&w=800' },
  { id: 'R4', name: 'সাবাব এন্টারপ্রাইজ', category: 'Shop', floor: 'নিচতলা', floorNumber: 0, side: 'Right', specialty: 'ফটোকপি ও কম্পিউটারের টাইপ, প্রিন্ট', owner: 'মালিক ৪', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800' },
  { id: 'R5', name: 'আরভিন ষ্টুডিও', category: 'Shop', floor: 'নিচতলা', floorNumber: 0, side: 'Right', specialty: 'আর্জেন্ট ছবি ও ফটোকপি', owner: 'মালিক ৫', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800' },
  { id: 'R6', name: 'আরজে কম্পিউটার', category: 'Shop', floor: 'নিচতলা', floorNumber: 0, side: 'Right', specialty: 'ফটোকপি ও কম্পিউটারের টাইপ, প্রিন্ট', owner: 'মালিক ৬', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800' },
  { id: 'R7', name: 'কর আইনজীবির কক্ষ', category: 'Service', floor: 'নিচতলা', floorNumber: 0, side: 'Right', specialty: 'ট্যাক্স ও ভ্যাট কনসালটেন্ট', owner: 'মালিক ৭', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800' },
  { id: 'R8', name: 'সেলিম বুক হাউজ (গুদাম)', category: 'Service', floor: 'নিচতলা', floorNumber: 0, side: 'Right', specialty: 'গুদাম ঘর (বই স্টক)', owner: 'সেলিম', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1553729784-e91953dec042?auto=format&fit=crop&w=800' },
  { id: 'R9', name: 'ওয়াটার পিওরিফায়ার', category: 'Shop', floor: 'নিচতলা', floorNumber: 0, side: 'Right', specialty: 'পানি ফিল্টার সরঞ্জাম ও পার্টস', owner: 'মালিক ৯', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca1f963?auto=format&fit=crop&w=800' },
  { id: 'R10', name: 'হুজুর সাইফুল ভাইয়ের দোকান', category: 'Shop', floor: 'নিচতলা', floorNumber: 0, side: 'Right', specialty: 'কম্পিউটার টাইপ ও প্রিন্ট', owner: 'সাইফুল', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1522071823991-b59fe5f248b0?auto=format&fit=crop&w=800' },

  // --- ২য় তলা: মেডিকো ও কেক স্কিল ---
  { id: 'FL2-1', name: 'মেডিকো কোচিং সেন্টার', category: 'Coaching', floor: '২য় তলা', floorNumber: 2, specialty: 'মেডিকেল ভর্তি প্রস্তুতি (৯৮% এরিয়া)', owner: 'পরিচালক', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1523050335392-9bc5675e7bb5?auto=format&fit=crop&w=800' },
  { id: 'FL2-2', name: 'প্রফেশনাল কেক স্কিল ডেভেলপমেন্ট', category: 'Coaching', floor: '২য় তলা', floorNumber: 2, specialty: 'কেক তৈরির প্রশিক্ষণ (২% এরিয়া)', owner: 'মালিক', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800' },

  // --- ৩য় তলা থেকে ৬ষ্ঠ তলা ---
  { id: 'FL3-1', name: 'সাগর ল্যাঙ্গুয়েজ ক্লাব', category: 'Coaching', floor: '৩য় তলা', floorNumber: 3, specialty: 'ইংরেজি ভাষা শিক্ষা', owner: 'পরিচালক', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800' },
  { id: 'FL4-1', name: 'স্কিল ডেভেলপমেন্ট একাডেমি', category: 'Coaching', floor: '৪র্থ তলা', floorNumber: 4, specialty: 'পেশাগত দক্ষতা উন্নয়ন', owner: 'পরিচালক', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1513258496099-48168024adb0?auto=format&fit=crop&w=800' },
  { id: 'FL5-1', name: 'বিসিএস কেয়ার', category: 'Coaching', floor: '৫ম তলা', floorNumber: 5, specialty: 'বিসিএস প্রস্তুতি', owner: 'পরিচালক', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800' },
  { id: 'FL6-1', name: 'ডিজিটাল সলিউশন আইটি', category: 'Coaching', floor: '৬ষ্ঠ তলা', floorNumber: 6, specialty: 'আইটি ট্রেনিং', owner: 'পরিচালক', contact: '০১৭...', status: 'Open', imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800' },
];

export const MARKET_STATS: OccupancyStats = {
  totalUnits: 60,
  occupied: 27,
  byFloor: [
    { floor: 'নিচতলা', count: 20, color: '#1e3a8a' },
    { floor: '২য় তলা', count: 2, color: '#dc2626' },
    { floor: '৩য় তলা', count: 2, color: '#f59e0b' },
    { floor: '৪র্থ তলা', count: 1, color: '#6366f1' },
    { floor: '৫ম তলা', count: 1, color: '#ec4899' },
    { floor: '৬ষ্ঠ তলা', count: 1, color: '#10b981' }
  ]
};
