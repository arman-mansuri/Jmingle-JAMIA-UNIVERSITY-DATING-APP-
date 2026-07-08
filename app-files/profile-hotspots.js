'use strict';

// ==========================================
// PROFILE STICKER HOTSPOTS — fancy floating card version
// + distinct "Matches" tracking (persisted in localStorage)
// + click a match name -> popup with "View Profile" / "Message"
// + basic chat window (persisted in localStorage)
// + Shows STATIC_PROFILES (your original hardcoded data.js list)
//   MERGED with profiles loaded live from Supabase
// ==========================================

// ------------------------------------------------------------------
// SUPABASE CONFIG
// ------------------------------------------------------------------
var SUPABASE_URL = 'https://tpweaiounyjzgiasthgv.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwd2VhaW91bnlqemdpYXN0aGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNTg4NzUsImV4cCI6MjA5ODgzNDg3NX0.5fPFgXjq3C-OYuqv0wG4gpRWnNDstOKMgpXVRTUvl7E';
var SUPABASE_TABLE = 'profile';
var STORAGE_BUCKET = 'image'; // bucket that holds the photo files

// ------------------------------------------------------------------
// STATIC_PROFILES — your original hardcoded profile-data.js content,
// kept exactly as-is. These always show, regardless of Supabase.
// ------------------------------------------------------------------
var STATIC_PROFILES = [
  {
    id: 1,
    name: "Abeed Noor faizi",
    age: 34,
    gender: "Male",
    educationLevel: "PhD",
    department: "Department of Economics",
    height: "5'10\"",
    interests: ["Philosophy", "Reading", "PWD", "Sports"],
    bio: "Looking for someone who can convince me that life isn't all timetables, assignemnt deadlines, and attendance sheets",
    image: "profile/1.png",
    location: "Department of Economics"
  },
  {
    id: 2,
    name: "Gumrah kaan ",
    age: 22,
    gender: "Female",
    educationLevel: "Masters",
    department: "Department of Economics",
    height: "5'3\"",
    interests: [ "outdoors", "reading","PWD"],
    bio: "Curious soul with a love for exploring new places, meeting new people, and making every day a little more exciting",
    image: "profile/2.png",
    location: "Department of Economics"
  },
  {
    id: 3,
    name: "Mirza Asim Baig",
    age: 22,
    gender: "Male",
    educationLevel: "faculty",
    department: "Department of Economics",
    height: "5'8\"",
    interests: ["Music", "football", "PWD"],
    bio: "If your favorite hobby is making students attend class and ruining their mass bunk, we're already a perfect match..",
    image: "profile/3.png",
    location: "Department of Economics"
  },
  {
    id: 4,
    name: "Manchali mehta",
    age: 25,
    gender: "Female",
    educationLevel: "Masters",
    department: "Department of Economics",
    height: "5'5\"",
    interests: ["Movies", "sports", "PWD"],
    bio: "Creative soul, foodie, and a hopeless romantic. Seeking a partner who can laugh with me and explore life.",
    image: "profile/4.png",
    location: "Department of Economics"
  },
  {
    id: 5,
    name: "Ask alam",
    age: 23,
    gender: "Male",
    educationLevel: "faculty",
    department: "Department of Economics",
    height: "5'9\"",
    interests: ["Cricket", "Gym", "PWD"],
    bio: "Alpha male, ambitious, looking for a partner who’s equally driven. I’m all about growth and deen.",
    image: "profile/5.png",
    location: "Department of Economics"
  },
  {
    id: 6,
    name: "Asif Rajput",
    age: 28,
    gender: "Male",
    educationLevel: "Staff",
    department: "Department of Economics",
    height: "5'6\"",
    interests: ["sitting", "Photocopying", "PWD", "Procrastination"],
    bio: "Staff at the dept, love catching people with phone on exams. I’m easy‑going and looking for a genuine connection.",
    image: "profile/6.png",
    location: "Department of Economics"
  },
  {
    id: 7,
    name: "Nadia Hassan",
    age: 22,
    gender: "Female",
    educationLevel: "Masters",
    department: "Department of Economics",
    height: "5'4\"",
    interests: ["Reading", "Photography", "Travel", "Music"],
    bio: "I’m a simple Muslim girl who loves reading and capturing moments. Looking for a serious halal relationship.",
    image: "profile/7.png",
    location: "Department of Economics"
  },
  {
    id: 8,
    name: "NOORI",
    age: 19,
    gender: "Female",
    educationLevel: "Bachelors",
    department: "Department of Economics",
    height: "5'4\"",
    interests: ["Photography", "Art", "Travel", "Philosophy"],
    bio: "Dreamer, artist, and deep conversationalist. Seeking someone who appreciates the beauty in small things.",
    image: "profile/8.png",
    location: "Department of Economics"
  },
  {
    id: 11,
    name: "Rayyan Siddiqui",
    age: 23,
    gender: "Male",
    educationLevel: "Bachelors",
    department: "Department of Computer Science",
    height: "5'10\"",
    interests: ["Gaming", "AI", "Football", "Gym"],
    bio: "Tech nerd, gym rat, and a gamer. Looking for a geeky partner who’s into fitness and growth.",
    image: "profile/11.png",
    location: "Department of Computer Science"
  },
  {
    id: 12,
    name: "Iman Ali",
    age: 22,
    gender: "Female",
    educationLevel: "Masters",
    department: "Department of Computer Science",
    height: "5'3\"",
    interests: ["Art", "Coding", "Travel", "Music"],
    bio: "I’m a creative coder who loves art and exploring new places. Looking for a serious relationship.",
    image: "profile/12.png",
    location: "Department of Computer Science"
  },
  {
    id: 13,
    name: "Riya Kapoor",
    age: 21,
    gender: "Female",
    educationLevel: "Bachelors",
    department: "Department of Computer Science",
    height: "5'2\"",
    interests: ["Reading", "Movies", "Photography", "Outdoors"],
    bio: "Book lover, movie buff, and a photography enthusiast. Want someone who can keep up with my curiosity.",
    image: "profile/13.png",
    location: "Department of Computer Science"
  },
  {
    id: 14,
    name: "Zayan Rizvi",
    age: 26,
    gender: "Male",
    educationLevel: "PhD",
    department: "Department of Computer Science",
    height: "5'11\"",
    interests: ["AI", "Philosophy", "Cricket", "Praying"],
    bio: "PhD student, aspiring researcher, and a practicing Muslim. Looking for someone with similar ambitions.",
    image: "profile/14.png",
    location: "Department of Computer Science"
  },
  {
    id: 15,
    name: "Mariam Khan",
    age: 29,
    gender: "Female",
    educationLevel: "Faculty",
    department: "Department of Computer Science",
    height: "5'4\"",
    interests: ["Teaching", "Reading", "Cooking", "Travel"],
    bio: "Lecturer, foodie, and a traveller. I value education and family. Seeking a partner for life.",
    image: "profile/15.png",
    location: "Department of Computer Science"
  },
  {
    id: 16,
    name: "Kabir Sharma",
    age: 27,
    gender: "Male",
    educationLevel: "Staff",
    department: "Department of Computer Science",
    height: "5'8\"",
    interests: ["Music", "Gaming", "Sports", "Movies"],
    bio: "Staff at the dept, loves music and gaming. I’m chill, looking for a partner to share good times.",
    image: "profile/16.png",
    location: "Department of Computer Science"
  },
  {
    id: 17,
    name: "Salman Akhtar",
    age: 25,
    gender: "Male",
    educationLevel: "Masters",
    department: "Commerce Department",
    height: "5'9\"",
    interests: ["Business", "Finance", "Cricket", "Reading Quran"],
    bio: "MBA, entrepreneur mindset, and a Muslim. Want a partner who’s supportive and business‑savvy.",
    image: "profile/17.png",
    location: "Commerce Department"
  },
  {
    id: 18,
    name: "Hira Butt",
    age: 22,
    gender: "Female",
    educationLevel: "Bachelors",
    department: "Commerce Department",
    height: "5'3\"",
    interests: ["Art", "Cooking", "Travel", "Movies"],
    bio: "Creative girl, love cooking and traveling. Looking for a genuine connection leading to marriage.",
    image: "profile/18.png",
    location: "Commerce Department"
  },
  {
    id: 19,
    name: "Sneha Nair",
    age: 23,
    gender: "Female",
    educationLevel: "Bachelors",
    department: "Commerce Department",
    height: "5'4\"",
    interests: ["Music", "Photography", "Outdoors", "Sports"],
    bio: "Music lover, photographer, and outdoor enthusiast. Looking for someone adventurous and kind.",
    image: "profile/19.png",
    location: "Commerce Department"
  },
  {
    id: 20,
    name: "Arham Malik",
    age: 27,
    gender: "Male",
    educationLevel: "PhD",
    department: "Commerce Department",
    height: "5'10\"",
    interests: ["Finance", "Philosophy", "Gym", "Praying"],
    bio: "PhD in finance, gym‑rat, and a practicing Muslim. Seeking a partner with strong values.",
    image: "profile/20.png",
    location: "Commerce Department"
  },
  {
    id: 21,
    name: "Bushra Ansari",
    age: 32,
    gender: "Female",
    educationLevel: "Faculty",
    department: "Commerce Department",
    height: "5'5\"",
    interests: ["Teaching", "Reading", "Cricket", "Cooking"],
    bio: "Commerce lecturer, love teaching and sports. I’m a family person looking for a loving partner.",
    image: "profile/21.png",
    location: "Commerce Department"
  },
  {
    id: 22,
    name: "Amir Khan",
    age: 28,
    gender: "Male",
    educationLevel: "Staff",
    department: "Commerce Department",
    height: "5'8\"",
    interests: ["Music", "Movies", "Travel", "Animals"],
    bio: "Staff, love music and movies. I’m easy‑going and want a partner to share life’s moments with.",
    image: "profile/22.png",
    location: "Commerce Department"
  },
  {
    id: 23,
    name: "Sadia Ahmed",
    age: 21,
    gender: "Female",
    educationLevel: "8th",
    department: "Canteen",
    height: "5'2\"",
    interests: ["Cooking", "Travel", "Music", "Photography"],
    bio: "I’m a foodie, love to cook and travel. Looking for someone who appreciates good food and vibes.",
    image: "profile/23.png",
    location: "Canteen 2"
  },
  {
    id: 24,
    name: "Shahzeb Ali",
    age: 24,
    gender: "Male",
    educationLevel: "12th",
    department: "Canteen",
    height: "5'10\"",
    interests: ["Cricket", "Gaming", "Gym", "Reading"],
    bio: "Alpha male, sports lover, and a gamer. Want a partner who’s equally ambitious and fun.",
    image: "profile/24.png",
    location: "Canteen 2"
  },
  {
    id: 25,
    name: "Gauri Patel",
    age: 25,
    gender: "Female",
    educationLevel: "10th",
    department: "Canteen",
    height: "5'3\"",
    interests: ["Art", "Movies", "Outdoors", "Animals"],
    bio: "Art lover, movie buff, and nature enthusiast. Looking for a partner to share dreams with.",
    image: "profile/25.png",
    location: "Canteen"
  },
  {
    id: 26,
    name: "Fahad Mirza",
    age: 26,
    gender: "Male",
    educationLevel: "10th",
    department: "Canteen",
    height: "5'11\"",
    interests: ["Philosophy", "Reading Quran", "Sports", "Travel"],
    bio: "Deep thinker, practicing Muslim, and a traveler. Seeking a partner with a similar mindset.",
    image: "profile/26.png",
    location: "Canteen"
  },
  {
    id: 27,
    name: "Saima Hassan",
    age: 30,
    gender: "Female",
    educationLevel: "12th",
    department: "Canteen",
    height: "5'4\"",
    interests: ["Teaching", "Cooking", "Reading", "Music"],
    bio: "Teacher, cook, and a music lover. I want a partner who values family and growth.",
    image: "profile/27.png",
    location: "Canteen"
  },
  {
    id: 28,
    name: "Aditya Singh",
    age: 29,
    gender: "Male",
    educationLevel: "Staff",
    department: "Canteen",
    height: "5'8\"",
    interests: ["Music", "Movies", "Cricket", "Travel"],
    bio: "Staff, love cricket and music. I’m a simple guy looking for a genuine connection.",
    image: "profile/28.png",
    location: "Canteen"
  },
  {
    id: 29,
    name: "Fiza Khalid",
    age: 22,
    gender: "Female",
    educationLevel: "Bachelors",
    department: "Socio Dept",
    height: "5'4\"",
    interests: ["Reading", "Cooking", "Travel", "Photography"],
    bio: "I’m a sociable person who loves reading and exploring new cultures. Looking for a serious relationship.",
    image: "profile/29.png",
    location: "Socio Dept"
  },
  {
    id: 30,
    name: "Hussain Raza",
    age: 24,
    gender: "Male",
    educationLevel: "Masters",
    department: "Socio Dept",
    height: "5'9\"",
    interests: ["Sports", "Politics", "Cricket", "Gym"],
    bio: "Sports enthusiast, political junkie, and a Muslim. Want a partner who challenges me intellectually.",
    image: "profile/30.png",
    location: "Socio Dept"
  },
  {
    id: 31,
    name: "Ananya Menon",
    age: 21,
    gender: "Female",
    educationLevel: "Bachelors",
    department: "Socio Dept",
    height: "5'2\"",
    interests: ["Art", "Music", "Outdoors", "Movies"],
    bio: "Creative and free‑spirited, love music and nature. Looking for a soulmate to grow with.",
    image: "profile/31.png",
    location: "Socio Dept"
  },
  {
    id: 32,
    name: "Subhan Tariq",
    age: 27,
    gender: "Male",
    educationLevel: "PhD",
    department: "Socio Dept",
    height: "5'10\"",
    interests: ["Philosophy", "Reading Quran", "Travel", "Cricket"],
    bio: "PhD researcher, avid reader, and a practicing Muslim. Seeking a partner for a meaningful life.",
    image: "profile/32.png",
    location: "Socio Dept"
  },
  {
    id: 33,
    name: "Rabia Afzal",
    age: 31,
    gender: "Female",
    educationLevel: "Faculty",
    department: "Socio Dept",
    height: "5'5\"",
    interests: ["Teaching", "Research", "Cooking", "Travel"],
    bio: "Lecturer, researcher, and a homebody. I want a partner who is supportive and kind.",
    image: "profile/33.png",
    location: "Socio Dept"
  },
  {
    id: 34,
    name: "Nabeel Ahmed",
    age: 28,
    gender: "Male",
    educationLevel: "Staff",
    department: "Socio Dept",
    height: "5'8\"",
    interests: ["Music", "Movies", "Sports", "Gaming"],
    bio: "Staff, love music and gaming. I’m a chill guy looking for a partner to enjoy life with.",
    image: "profile/34.png",
    location: "Socio Dept"
  },
  {
    id: 35,
    name: "Ehsan Ullah",
    age: 23,
    gender: "Male",
    educationLevel: "Bachelors",
    department: "Physics Dept",
    height: "5'10\"",
    interests: ["Gym", "Reading", "Sports", "Gaming"],
    bio: "Fitness freak, bookworm, and a gamer. Looking for a partner who’s active and smart.",
    image: "profile/35.png",
    location: "Physics Dept"
  },
  {
    id: 36,
    name: "Sana Mirza",
    age: 22,
    gender: "Female",
    educationLevel: "Masters",
    department: "Physics Dept",
    height: "5'3\"",
    interests: ["Art", "Photography", "Travel", "Music"],
    bio: "Creative physicist, love art and travel. Seeking someone who sees beauty in science and life.",
    image: "profile/36.png",
    location: "Physics Dept"
  },
  {
    id: 37,
    name: "Kavya Krishnan",
    age: 21,
    gender: "Female",
    educationLevel: "Bachelors",
    department: "Physics Dept",
    height: "5'2\"",
    interests: ["Movies", "Cooking", "Outdoors", "Animals"],
    bio: "Movie buff, foodie, and animal lover. I’m looking for a partner who’s caring and fun.",
    image: "profile/37.png",
    location: "Physics Dept"
  },
  {
    id: 38,
    name: "Luqman Khan",
    age: 26,
    gender: "Male",
    educationLevel: "PhD",
    department: "Physics Dept",
    height: "5'11\"",
    interests: ["Philosophy", "Reading Quran", "Cricket", "Travel"],
    bio: "PhD in physics, philosopher at heart, and a Muslim. Want a partner for a meaningful journey.",
    image: "profile/38.png",
    location: "Physics Dept"
  },
  {
    id: 39,
    name: "Uzma Sheikh",
    age: 30,
    gender: "Female",
    educationLevel: "Faculty",
    department: "Physics Dept",
    height: "5'5\"",
    interests: ["Teaching", "Research", "Cooking", "Reading"],
    bio: "Professor, researcher, and a family person. Looking for a partner who values knowledge and deen.",
    image: "profile/39.png",
    location: "Physics Dept"
  },
  {
    id: 40,
    name: "Rohit Sharma",
    age: 27,
    gender: "Male",
    educationLevel: "Staff",
    department: "Physics Dept",
    height: "5'8\"",
    interests: ["Music", "Sports", "Movies", "Gaming"],
    bio: "Staff, love music and sports. I’m a laid‑back guy seeking a genuine connection.",
    image: "profile/40.png",
    location: "Physics Dept"
  },
  {
    id: 41,
    name: "Shayan Ahmad",
    age: 24,
    gender: "Male",
    educationLevel: "Bachelors",
    department: "Nano Dept",
    height: "5'10\"",
    interests: ["Gym", "Gaming", "Travel", "Sports"],
    bio: "Gym rat, gamer, and traveler. Looking for a partner who’s adventurous and fit.",
    image: "profile/41.png",
    location: "Nano Dept"
  },
  {
    id: 42,
    name: "Aleena Khan",
    age: 22,
    gender: "Female",
    educationLevel: "Masters",
    department: "Nano Dept",
    height: "5'3\"",
    interests: ["Art", "Reading", "Photography", "Cooking"],
    bio: "Art lover, bookworm, and a foodie. I want a partner who appreciates creativity.",
    image: "profile/42.png",
    location: "Nano Dept"
  },
  {
    id: 43,
    name: "Ishika Gupta",
    age: 20,
    gender: "Female",
    educationLevel: "Bachelors",
    department: "Nano Dept",
    height: "5'2\"",
    interests: ["Music", "Movies", "Travel", "Animals"],
    bio: "Music lover, travel enthusiast, and animal lover. Seeking a kind and adventurous partner.",
    image: "profile/43.png",
    location: "Nano Dept"
  },
  {
    id: 44,
    name: "Talha Hussain",
    age: 27,
    gender: "Male",
    educationLevel: "PhD",
    department: "Nano Dept",
    height: "5'11\"",
    interests: ["Research", "Reading Quran", "Cricket", "Gym"],
    bio: "PhD researcher, practicing Muslim, and sports lover. Want a partner with similar goals.",
    image: "profile/44.png",
    location: "Nano Dept"
  },
  {
    id: 45,
    name: "Zoya Akhtar",
    age: 34,
    gender: "Female",
    educationLevel: "Faculty",
    department: "Nano Dept",
    height: "5'4\"",
    interests: ["Teaching", "Science", "Cooking", "Travel"],
    bio: "Nano‑tech professor, love cooking and traveling. Looking for a partner to build a future with.",
    image: "profile/45.png",
    location: "Nano Dept"
  },
  {
    id: 46,
    name: "Danish Abbasi",
    age: 28,
    gender: "Male",
    educationLevel: "Staff",
    department: "Nano Dept",
    height: "5'8\"",
    interests: ["Music", "Movies", "Outdoors", "Sports"],
    bio: "Staff, love music and movies. I’m a simple guy looking for a meaningful relationship.",
    image: "profile/46.png",
    location: "Nano Dept"
  },
  {
    id: 47,
    name: "Mobeen Ansari",
    age: 23,
    gender: "Male",
    educationLevel: "Bachelors",
    department: "Polytechnic Dept",
    height: "5'9\"",
    interests: ["Cricket", "Gaming", "Gym", "Reading"],
    bio: "Cricket lover, gamer, and gym‑rat. Looking for a partner who’s active and supportive.",
    image: "profile/47.png",
    location: "Polytechnic Dept"
  },
  {
    id: 48,
    name: "Warda Shah",
    age: 22,
    gender: "Female",
    educationLevel: "Masters",
    department: "Polytechnic Dept",
    height: "5'3\"",
    interests: ["Art", "Photography", "Travel", "Cooking"],
    bio: "Creative and adventurous, love art and cooking. Seeking a partner for a halal relationship.",
    image: "profile/48.png",
    location: "Polytechnic Dept"
  },
  {
    id: 49,
    name: "Ritu Verma",
    age: 21,
    gender: "Female",
    educationLevel: "Bachelors",
    department: "Polytechnic Dept",
    height: "5'2\"",
    interests: ["Music", "Movies", "Outdoors", "Animals"],
    bio: "Music and movie enthusiast, love nature. Want a partner who shares my passion for life.",
    image: "profile/49.png",
    location: "Polytechnic Dept"
  },
  {
    id: 50,
    name: "Irfan Malik",
    age: 26,
    gender: "Male",
    educationLevel: "PhD",
    department: "Polytechnic Dept",
    height: "5'10\"",
    interests: ["Philosophy", "Reading Quran", "Cricket", "Travel"],
    bio: "PhD candidate, thinker, and a Muslim. Looking for a partner to navigate life and faith together.",
    image: "profile/50.png",
    location: "Polytechnic Dept"
  },
  {
    id: 51,
    name: "Shireen Ali",
    age: 35,
    gender: "Female",
    educationLevel: "Faculty",
    department: "Polytechnic Dept",
    height: "5'5\"",
    interests: ["Teaching", "Research", "Cooking", "Reading"],
    bio: "Lecturer, researcher, and a foodie. I want a partner who values education and family.",
    image: "profile/51.png",
    location: "Polytechnic Dept"
  },
  {
    id: 52,
    name: "Shakir Mahmood",
    age: 28,
    gender: "Male",
    educationLevel: "Staff",
    department: "Polytechnic Dept",
    height: "5'8\"",
    interests: ["Music", "Movies", "Sports", "Gaming"],
    bio: "Staff, love music and movies. I’m a chilled guy looking for a real connection.",
    image: "profile/52.png",
    location: "Polytechnic Dept"
  },
  {
    id: 53,
    name: "Hanzala Khan",
    age: 22,
    gender: "Male",
    educationLevel: "Bachelors",
    department: "Department of Mathematics",
    height: "5'10\"",
    interests: ["Gym", "Cricket", "Gaming", "Reading"],
    bio: "Alpha male energy – I grind hard in maths and in the gym. Looking for a partner who’s equally ambitious and keeps it real.",
    image: "profile/53.png",
    location: "Department of Mathematics"
  },
  {
    id: 54,
    name: "Neha Jain",
    age: 23,
    gender: "Female",
    educationLevel: "Masters",
    department: "Department of Mathematics",
    height: "5'3\"",
    interests: ["Art", "Music", "Travel", "Photography"],
    bio: "Creative soul who finds beauty in numbers and art. I’m a hopeless romantic looking for someone to explore life and cafés with.",
    image: "profile/54.png",
    location: "Department of Mathematics"
  },
  {
    id: 55,
    name: "Kamran Ahmed",
    age: 21,
    gender: "Male",
    educationLevel: "Bachelors",
    department: "Department of Mathematics",
    height: "5'8\"",
    interests: ["Football", "Gaming", "Outdoors", "Movies"],
    bio: "Chill vibes only – I’m a gamer, a footballer, and a big movie nerd. Want a partner who’s my best friend first, then everything else.",
    image: "profile/55.png",
    location: "Department of Mathematics"
  },
  {
    id: 56,
    name: "Eman Fatima",
    age: 26,
    gender: "Female",
    educationLevel: "PhD",
    department: "Department of Mathematics",
    height: "5'4\"",
    interests: ["Reading Quran", "Philosophy", "Research", "Travel"],
    bio: "PhD in pure maths, practicing Muslim, and a deep thinker. I’m seeking a partner for a halal, meaningful marriage – with intellectual and spiritual depth.",
    image: "profile/56.png",
    location: "Department of Mathematics"
  },
  {
    id: 57,
    name: "Sameer Chawla",
    age: 28,
    gender: "Male",
    educationLevel: "Staff",
    department: "Department of Mathematics",
    height: "5'9\"",
    interests: ["Music", "Movies", "Sports", "Animals"],
    bio: "Staff at the maths dept, love music and sports. I’m an easy‑going guy looking for a genuine connection – no drama, just good times.",
    image: "profile/57.png",
    location: "Department of Mathematics"
  },
  {
    id: 58,
    name: "Aleena Javed",
    age: 22,
    gender: "Female",
    educationLevel: "Bachelors",
    department: "Department of Mathematics",
    height: "5'2\"",
    interests: ["Cooking", "Reading", "Photography", "Travel"],
    bio: "Foodie, photographer, and a hopeless romantic. I love cooking for loved ones and capturing sunsets. Looking for a serious partner to build a home with.",
    image: "profile/58.png",
    location: "Department of Mathematics"
  },
  {
    id: 59,
    name: "Rayan Ahmad",
    age: 25,
    gender: "Male",
    educationLevel: "Masters",
    department: "Department of Mathematics",
    height: "5'11\"",
    interests: ["Cricket", "Politics", "Gym", "Reading Quran"],
    bio: "Practicing Muslim, aspiring politician (lol), and a fitness freak. Want a partner with strong values who can match my energy and debates.",
    image: "profile/59.png",
    location: "Department of Mathematics"
  },
  {
    id: 60,
    name: "Sofia Khan",
    age: 37,
    gender: "Female",
    educationLevel: "Faculty",
    department: "Department of Mathematics",
    height: "5'5\"",
    interests: ["Teaching", "Research", "Art", "Music"],
    bio: "Professor of Mathematics, lover of art and classical music. I’m looking for a partner who values intellect, kindness, and a good conversation.",
    image: "profile/60.png",
    location: "Department of Mathematics"
  }
];

// ------------------------------------------------------------------
// LOCATION -> SCENE ID + PIN POSITION
// ------------------------------------------------------------------
var locationPins = {
  "Department of Economics":       { sceneId: "0-eco_dept",      yaw: 1.4,    pitch: -0.6 },
  "Department of Computer Science":{ sceneId: "11-compsci_dept", yaw: 1.4,    pitch: -0.4 },
  "Commerce Department":           { sceneId: "4-commerce_dept", yaw: -1.4,    pitch: -0.6 },
  "Canteen":                       { sceneId: "7-canteen-1",     yaw: -1.4,    pitch: -0.3 },
  "Socio Dept":                    { sceneId: "9-socio_dept",    yaw: 1.4,    pitch: -0.3 },
  "Physics Dept":                  { sceneId: "10-phycis_dept",  yaw: -1.4,    pitch: -0.6},
  "Nano Dept":                     { sceneId: "12-nano_dept",    yaw: 1.4,    pitch: -0.4 },
  "Polytechnic Dept":              { sceneId: "13-polytech_dept",yaw:1.4,    pitch: -0.4 },
   "Department of Mathematics":      { sceneId: "10-phycis_dept",   yaw: 1.4,    pitch: -0.5 },
   "Canteen 2":                     { sceneId: "6-canteen-2",     yaw: -2.7,    pitch: -0.4 }
};

// ------------------------------------------------------------------
// Helpers for converting raw Supabase columns into usable values
// ------------------------------------------------------------------

function resolveImageUrl(value) {
  if (typeof value !== 'string' || !value) return value;
  if (/^https?:\/\//i.test(value)) return value; // already a full URL
  var path = value.replace(/^\/+/, '');
  return SUPABASE_URL + '/storage/v1/object/public/' + STORAGE_BUCKET + '/' + path;
}

function calculateAge(dob) {
  if (!dob) return null;
  var birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) return null;
  var today = new Date();
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function formatHeight(feet, inches) {
  if (!feet && !inches) return '';
  var f = feet || '0';
  var i = inches || '0';
  return f + "'" + i + '"';
}

// passions is stored as `text`, typically as a JSON-array string
// like '["Photography","Dancing"]'. Handles that, real arrays
// (if column type changes to jsonb later), and comma-separated fallback.
function parsePassions(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.length) {
    try {
      var parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      // fall through to comma-split fallback below
    }
    var cleaned = value.replace(/^\{|\}$/g, '').replace(/^\[|\]$/g, '');
    return cleaned
      .split(',')
      .map(function(s) { return s.replace(/^"|"$/g, '').trim(); })
      .filter(Boolean);
  }
  return [];
}

// Converts one raw Supabase row into the shape createProfileStickerElement
// / MatchPopup / etc. expect. Prefixes id with "sb-" so it can never
// collide with a STATIC_PROFILES numeric id.
function mapSupabaseRowToProfile(row) {
  return {
    id: 'sb-' + row.id,
    name: row.fullname,
    age: calculateAge(row.dob),
    gender: row.gender,
    location: row.campus,                 // must match a locationPins key exactly
    educationLevel: row.education,
    department: row.course,
    height: formatHeight(row.height_feet, row.height_inches),
    interests: parsePassions(row.passions),
    bio: (row.bio && String(row.bio).trim())
      ? row.bio
      : (row.course ? 'Studying ' + row.course : ''),
    image: resolveImageUrl(row.photo1_url)
  };
}

function fetchProfilesFromSupabase() {
  var url = SUPABASE_URL + '/rest/v1/' + SUPABASE_TABLE + '?select=*';
  return fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: 'Bearer ' + SUPABASE_ANON_KEY
    }
  })
    .then(function(res) {
      if (!res.ok) {
        return res.text().then(function(text) {
          throw new Error('Supabase fetch failed: ' + res.status + ' ' + res.statusText + ' — ' + text);
        });
      }
      return res.json();
    })
    .then(function(rows) {
      return rows.map(mapSupabaseRowToProfile);
    })
    .catch(function(err) {
      console.error('Failed to load profiles from Supabase (showing static profiles only):', err);
      return []; // don't let a Supabase failure kill the whole page
    });
}

// ==========================================
// Everything below is unchanged hotspot / matches / chat logic
// ==========================================

var MATCHES_STORAGE_KEY = 'profileMatches:v1';
var CHATS_STORAGE_KEY = 'profileChats:v1';

var profiles = STATIC_PROFILES.slice(); // populated further with Supabase rows in initProfileHotspots()

function getProfileId(profile) {
  return profile.id || (profile.name + '|' + profile.location);
}

function getInitials(name) {
  if (!name) return '?';
  var parts = name.trim().split(/\s+/);
  var initials = parts[0].charAt(0);
  if (parts.length > 1) initials += parts[parts.length - 1].charAt(0);
  return initials.toUpperCase();
}

// ---------------------------------------------
// MatchesStore — distinct matched profiles, persisted
// ---------------------------------------------
var MatchesStore = (function() {
  var map = {};

  try {
    var raw = localStorage.getItem(MATCHES_STORAGE_KEY);
    var stored = raw ? JSON.parse(raw) : [];
    stored.forEach(function(p) { map[p.id] = p; });
  } catch (e) {}

  var listeners = [];

  function persist() {
    try {
      localStorage.setItem(MATCHES_STORAGE_KEY, JSON.stringify(getAll()));
    } catch (e) {}
  }

  function getAll() {
    return Object.keys(map).map(function(k) { return map[k]; });
  }

  function notify() {
    var all = getAll();
    listeners.forEach(function(fn) { fn(all); });
  }

  return {
    add: function(profile) {
      var id = getProfileId(profile);
      if (map[id]) return false; // already matched -> distinct only
      map[id] = {
        id: id,
        name: profile.name,
        age: profile.age,
        image: profile.image,
        educationLevel: profile.educationLevel,
        height: profile.height,
        bio: profile.bio,
        interests: profile.interests || []
      };
      persist();
      notify();
      return true;
    },
    getAll: getAll,
    count: function() { return Object.keys(map).length; },
    onChange: function(fn) { listeners.push(fn); }
  };
})();

// ---------------------------------------------
// ChatStore — messages per matched profile, persisted
// ---------------------------------------------
var ChatStore = (function() {
  var data = {};

  try {
    var raw = localStorage.getItem(CHATS_STORAGE_KEY);
    data = raw ? JSON.parse(raw) : {};
  } catch (e) {
    data = {};
  }

  function persist() {
    try {
      localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  return {
    getMessages: function(profileId) {
      return data[profileId] || [];
    },
    addMessage: function(profileId, from, text) {
      if (!data[profileId]) data[profileId] = [];
      data[profileId].push({ from: from, text: text });
      persist();
    }
  };
})();

// ---------------------------------------------
// Match popup — options screen, profile screen, chat screen
// ---------------------------------------------
var MatchPopup = (function() {
  var overlay, box, closeBtn;
  var optionsView, profileView, chatView;
  var currentProfile = null;
  var replyTimer = null;

  function build() {
    if (overlay) return;

    overlay = document.createElement('div');
    overlay.classList.add('match-popup-overlay');

    box = document.createElement('div');
    box.classList.add('match-popup');

    closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.classList.add('match-popup-close');
    closeBtn.textContent = '\u00D7';
    closeBtn.addEventListener('click', close);

    box.appendChild(closeBtn);
    box.appendChild(buildOptionsView());
    box.appendChild(buildProfileView());
    box.appendChild(buildChatView());

    overlay.appendChild(box);
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) close();
    });

    document.body.appendChild(overlay);
  }

  function buildOptionsView() {
    optionsView = document.createElement('div');
    optionsView.classList.add('match-popup-options');

    var avatar = document.createElement('div');
    avatar.classList.add('match-popup-avatar');

    var name = document.createElement('h2');
    name.classList.add('match-popup-name');

    var sub = document.createElement('p');
    sub.classList.add('match-popup-sub');
    sub.textContent = 'What next?';

    var btnRow = document.createElement('div');
    btnRow.classList.add('match-popup-btns');

    var profileBtn = document.createElement('button');
    profileBtn.type = 'button';
    profileBtn.classList.add('match-popup-btn', 'match-popup-btn-profile');
    profileBtn.textContent = '\uD83D\uDC64 View Profile';
    profileBtn.addEventListener('click', showProfile);

    var chatBtn = document.createElement('button');
    chatBtn.type = 'button';
    chatBtn.classList.add('match-popup-btn', 'match-popup-btn-chat');
    chatBtn.textContent = '\uD83D\uDCAC Message';
    chatBtn.addEventListener('click', showChat);

    btnRow.appendChild(profileBtn);
    btnRow.appendChild(chatBtn);

    optionsView.appendChild(avatar);
    optionsView.appendChild(name);
    optionsView.appendChild(sub);
    optionsView.appendChild(btnRow);

    optionsView._avatar = avatar;
    optionsView._name = name;

    return optionsView;
  }

  function buildProfileView() {
    profileView = document.createElement('div');
    profileView.classList.add('match-popup-profile-view');
    profileView.hidden = true;

    var avatar = document.createElement('div');
    avatar.classList.add('match-popup-profile-avatar');

    var name = document.createElement('h2');
    var meta = document.createElement('p');
    meta.classList.add('match-popup-profile-meta');
    var bio = document.createElement('p');
    bio.classList.add('match-popup-profile-bio');
    var tags = document.createElement('div');
    tags.classList.add('match-popup-profile-tags');

    var backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.classList.add('match-popup-back');
    backBtn.textContent = '\u2039 Back';
    backBtn.addEventListener('click', showOptions);

    profileView.appendChild(backBtn);
    profileView.appendChild(avatar);
    profileView.appendChild(name);
    profileView.appendChild(meta);
    profileView.appendChild(bio);
    profileView.appendChild(tags);

    profileView._avatar = avatar;
    profileView._name = name;
    profileView._meta = meta;
    profileView._bio = bio;
    profileView._tags = tags;

    return profileView;
  }

  function buildChatView() {
    chatView = document.createElement('div');
    chatView.classList.add('match-popup-chat-view');
    chatView.hidden = true;

    var header = document.createElement('div');
    header.classList.add('match-popup-chat-header');

    var backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.classList.add('match-popup-back');
    backBtn.textContent = '\u2039';
    backBtn.addEventListener('click', showOptions);

    var name = document.createElement('span');
    name.classList.add('match-popup-chat-name');

    header.appendChild(backBtn);
    header.appendChild(name);

    var messages = document.createElement('div');
    messages.classList.add('match-popup-chat-messages');

    var inputRow = document.createElement('div');
    inputRow.classList.add('match-popup-chat-input-row');

    var input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type a message...';
    input.classList.add('match-popup-chat-input');

    var sendBtn = document.createElement('button');
    sendBtn.type = 'button';
    sendBtn.classList.add('match-popup-chat-send');
    sendBtn.textContent = 'Send';

    function sendMessage() {
      var text = input.value.trim();
      if (!text || !currentProfile) return;
      ChatStore.addMessage(currentProfile.id, 'me', text);
      renderMessages();
      input.value = '';

      clearTimeout(replyTimer);
      replyTimer = setTimeout(function() {
        if (!currentProfile) return;
        ChatStore.addMessage(currentProfile.id, 'them', 'Hey! Thanks for the message \uD83D\uDE0A');
        renderMessages();
      }, 900);
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') sendMessage();
    });

    inputRow.appendChild(input);
    inputRow.appendChild(sendBtn);

    chatView.appendChild(header);
    chatView.appendChild(messages);
    chatView.appendChild(inputRow);

    chatView._name = name;
    chatView._messages = messages;

    return chatView;
  }

  function renderMessages() {
    var list = ChatStore.getMessages(currentProfile.id);
    chatView._messages.innerHTML = '';
    if (list.length === 0) {
      var empty = document.createElement('div');
      empty.classList.add('match-popup-chat-empty');
      empty.textContent = 'Say hi to ' + currentProfile.name + ' \uD83D\uDC4B';
      chatView._messages.appendChild(empty);
    }
    list.forEach(function(m) {
      var bubble = document.createElement('div');
      bubble.classList.add('match-popup-bubble', m.from === 'me' ? 'match-popup-bubble-me' : 'match-popup-bubble-them');
      bubble.textContent = m.text;
      chatView._messages.appendChild(bubble);
    });
    chatView._messages.scrollTop = chatView._messages.scrollHeight;
  }

  function showOptions() {
    optionsView.hidden = false;
    profileView.hidden = true;
    chatView.hidden = true;
  }

  function showProfile() {
    var p = currentProfile;
    profileView._avatar.textContent = getInitials(p.name);
    profileView._name.textContent = p.name + ', ' + p.age;
    profileView._meta.textContent = (p.educationLevel || '') + ' \u00B7 ' + (p.height || '');
    profileView._bio.textContent = p.bio || '';
    profileView._tags.innerHTML = '';
    (p.interests || []).slice(0, 3).forEach(function(interest) {
      var tag = document.createElement('span');
      tag.classList.add('match-popup-profile-tag');
      tag.textContent = '# ' + interest;
      profileView._tags.appendChild(tag);
    });

    optionsView.hidden = true;
    profileView.hidden = false;
    chatView.hidden = true;
  }

  function showChat() {
    chatView._name.textContent = currentProfile.name;
    renderMessages();

    optionsView.hidden = true;
    profileView.hidden = true;
    chatView.hidden = false;
  }

  function close() {
    overlay.classList.remove('is-visible');
    currentProfile = null;
  }

  function open(profile) {
    build();
    currentProfile = profile;
    optionsView._avatar.textContent = getInitials(profile.name);
    optionsView._name.textContent = profile.name;
    showOptions();
    overlay.classList.add('is-visible');
  }

  return { open: open };
})();

// ---------------------------------------------
// Matches panel (fixed on screen, shows count + clickable names)
// ---------------------------------------------
function createMatchesPanel() {
  var existing = document.getElementById('matches-panel');
  if (existing) return existing;

  var panel = document.createElement('div');
  panel.id = 'matches-panel';
  panel.classList.add('matches-panel');

  var title = document.createElement('div');
  title.classList.add('matches-panel-title');
  title.textContent = 'Matches';

  var count = document.createElement('div');
  count.classList.add('matches-panel-count');

  var list = document.createElement('div');
  list.classList.add('matches-panel-list');

  panel.appendChild(title);
  panel.appendChild(count);
  panel.appendChild(list);
  document.body.appendChild(panel);

  function render(all) {
    count.textContent = all.length + ' distinct match' + (all.length === 1 ? '' : 'es');
    list.innerHTML = '';
    all.forEach(function(m) {
      var item = document.createElement('div');
      item.classList.add('matches-panel-item');
      item.textContent = m.name;
      item.addEventListener('click', function() {
        MatchPopup.open(m);
      });
      list.appendChild(item);
    });
  }

  MatchesStore.onChange(render);
  render(MatchesStore.getAll());

  return panel;
}

function groupProfilesByLocation(list) {
  return list.reduce(function(acc, p) {
    (acc[p.location] = acc[p.location] || []).push(p);
    return acc;
  }, {});
}

function createProfileStickerElement(profileList) {
  var index = 0;

  var anchor = document.createElement('div');
  anchor.classList.add('hotspot', 'profile-hotspot');

  var card = document.createElement('div');
  card.classList.add('profile-hotspot-card');

  var imgWrap = document.createElement('div');
  imgWrap.classList.add('profile-hotspot-imgwrap');

  var img = document.createElement('img');
  img.classList.add('profile-hotspot-img');

  var gradient = document.createElement('div');
  gradient.classList.add('profile-hotspot-gradient');

  var badge = document.createElement('div');
  badge.classList.add('profile-hotspot-badge');
  var badgeDot = document.createElement('span');
  badgeDot.classList.add('profile-hotspot-badge-dot');
  var badgeText = document.createElement('span');
  badgeText.textContent = 'Online Now';
  badge.appendChild(badgeDot);
  badge.appendChild(badgeText);

  var counter = document.createElement('div');
  counter.classList.add('profile-hotspot-counter');

  var matchedFlash = document.createElement('div');
  matchedFlash.classList.add('profile-hotspot-matched-flash');
  matchedFlash.textContent = "It's a match!";

  imgWrap.appendChild(img);
  imgWrap.appendChild(gradient);
  imgWrap.appendChild(badge);
  imgWrap.appendChild(counter);
  imgWrap.appendChild(matchedFlash);

  var body = document.createElement('div');
  body.classList.add('profile-hotspot-body');

  var nameRow = document.createElement('h1');
  nameRow.classList.add('profile-hotspot-name');

  var meta = document.createElement('p');
  meta.classList.add('profile-hotspot-meta');

  var bio = document.createElement('p');
  bio.classList.add('profile-hotspot-bio');

  var tags = document.createElement('div');
  tags.classList.add('profile-hotspot-tags');

  var actions = document.createElement('div');
  actions.classList.add('profile-hotspot-actions');

  var passBtn = document.createElement('button');
  passBtn.type = 'button';
  passBtn.classList.add('profile-hotspot-btn', 'profile-hotspot-btn-pass');
  passBtn.textContent = 'You deserve better';

  var matchBtn = document.createElement('button');
  matchBtn.type = 'button';
  matchBtn.classList.add('profile-hotspot-btn', 'profile-hotspot-btn-match');
  matchBtn.textContent = 'Match';

  actions.appendChild(passBtn);
  actions.appendChild(matchBtn);

  body.appendChild(nameRow);
  body.appendChild(meta);
  body.appendChild(bio);
  body.appendChild(tags);
  body.appendChild(actions);

  card.appendChild(imgWrap);
  card.appendChild(body);
  anchor.appendChild(card);

  function render() {
    var p = profileList[index];
    img.src = p.image;
    img.alt = p.name;
    nameRow.textContent = p.name + ', ' + p.age;
    meta.textContent = (p.educationLevel || '') + ' \u00B7 ' + (p.height || '');
    bio.textContent = p.bio || '';
    counter.textContent = (index + 1) + ' / ' + profileList.length;

    tags.innerHTML = '';
    (p.interests || []).slice(0, 3).forEach(function(interest) {
      var tag = document.createElement('span');
      tag.classList.add('profile-hotspot-tag');
      tag.textContent = '# ' + interest;
      tags.appendChild(tag);
    });
  }

  function advance() {
    body.classList.add('is-swapping');
    imgWrap.classList.add('is-swapping');
    setTimeout(function() {
      index = (index + 1) % profileList.length;
      render();
      body.classList.remove('is-swapping');
      imgWrap.classList.remove('is-swapping');
    }, 220);
  }

  passBtn.addEventListener('click', function(event) {
    event.stopPropagation();
    advance();
  });

  matchBtn.addEventListener('click', function(event) {
    event.stopPropagation();

    var p = profileList[index];
    MatchesStore.add(p);

    matchedFlash.classList.add('is-visible');
    setTimeout(function() {
      matchedFlash.classList.remove('is-visible');
      advance();
    }, 700);
  });

  var eventList = ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'wheel', 'mousewheel'];
  eventList.forEach(function(evt) {
    anchor.addEventListener(evt, function(e) { e.stopPropagation(); });
  });

  render();
  return anchor;
}

function setupProfileHotspots(scenes) {
  createMatchesPanel();

  var grouped = groupProfilesByLocation(profiles);

  Object.keys(grouped).forEach(function(location) {
    var pin = locationPins[location];
    if (!pin) {
      console.warn('No pin position defined for location: ' + location);
      return;
    }

    var sceneEntry = null;
    for (var i = 0; i < scenes.length; i++) {
      if (scenes[i].data.id === pin.sceneId) {
        sceneEntry = scenes[i];
        break;
      }
    }
    if (!sceneEntry) {
      console.warn('No scene found with id: ' + pin.sceneId);
      return;
    }

    var element = createProfileStickerElement(grouped[location]);
    sceneEntry.scene.hotspotContainer().createHotspot(element, {
      yaw: pin.yaw,
      pitch: pin.pitch
    });
  });
}

// ------------------------------------------------------------------
// ENTRY POINT — call this instead of setupProfileHotspots(scenes)
// directly. It merges STATIC_PROFILES with profiles fetched live
// from Supabase, fills the `profiles` array, THEN builds the hotspots.
// ------------------------------------------------------------------
function initProfileHotspots(scenes) {
  return fetchProfilesFromSupabase()
    .then(function(supabaseProfiles) {
      profiles = STATIC_PROFILES.concat(supabaseProfiles);
      setupProfileHotspots(scenes);
    });
}