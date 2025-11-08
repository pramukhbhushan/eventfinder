export const eventsData = [
  // ACADEMIC EVENTS
  {
    id: 1,
    title: "AI & Machine Learning Workshop",
    category: "academic",
    date: "2025-11-10",
    time: "14:00",
    location: "Computer Science Building",
    latitude: 38.9890,
    longitude: -76.9364,
    description: "Hands-on workshop covering neural networks and deep learning fundamentals.",
    capacity: 50
  },
  {
    id: 2,
    title: "Guest Lecture: Climate Change Policy",
    category: "academic",
    date: "2025-11-12",
    time: "16:00",
    location: "Chemistry Building",
    latitude: 38.9871,
    longitude: -76.9427,
    description: "Distinguished speaker series featuring international climate policy experts.",
    capacity: 200
  },
  {
    id: 3,
    title: "Research Symposium: Biotechnology",
    category: "academic",
    date: "2025-11-15",
    time: "10:00",
    location: "Biology-Psychology Building",
    latitude: 38.9865,
    longitude: -76.9393,
    description: "Annual symposium showcasing cutting-edge biotech research from faculty and students.",
    capacity: 150
  },
  {
    id: 4,
    title: "Career Development Seminar",
    category: "academic",
    date: "2025-11-18",
    time: "13:00",
    location: "Stamp Student Union",
    latitude: 38.9878,
    longitude: -76.9447,
    description: "Professional development workshop on resume writing and interview skills.",
    capacity: 80
  },
  {
    id: 5,
    title: "Graduate Student Colloquium",
    category: "academic",
    date: "2025-11-20",
    time: "15:30",
    location: "McKeldin Library",
    latitude: 38.9858,
    longitude: -76.9450,
    description: "Graduate students present their thesis research across various disciplines.",
    capacity: 100
  },

  // SOCIAL EVENTS
  {
    id: 6,
    title: "Terps Game Night",
    category: "social",
    date: "2025-11-08",
    time: "19:00",
    location: "Eppley Recreation Center",
    latitude: 38.9912,
    longitude: -76.9456,
    description: "Board games, video games, and pizza! All students welcome.",
    capacity: 120
  },
  {
    id: 7,
    title: "Friday Night Football Watch Party",
    category: "social",
    date: "2025-11-09",
    time: "20:00",
    location: "Stamp Student Union",
    latitude: 38.9878,
    longitude: -76.9447,
    description: "Watch the Terps take on rivals with free food and giveaways.",
    capacity: 300
  },
  {
    id: 8,
    title: "International Students Mixer",
    category: "social",
    date: "2025-11-14",
    time: "18:00",
    location: "Stamp Student Union",
    latitude: 38.9878,
    longitude: -76.9447,
    description: "Cultural exchange event with food from around the world.",
    capacity: 150
  },
  {
    id: 9,
    title: "Intramural Basketball Tournament",
    category: "social",
    date: "2025-11-16",
    time: "12:00",
    location: "Eppley Recreation Center",
    latitude: 38.9912,
    longitude: -76.9456,
    description: "3v3 basketball tournament with prizes for winning teams.",
    capacity: 64
  },
  {
    id: 10,
    title: "Open Mic Night",
    category: "social",
    date: "2025-11-22",
    time: "19:30",
    location: "The Clarice Smith Center",
    latitude: 38.9857,
    longitude: -76.9312,
    description: "Showcase your talent! Music, poetry, comedy - all welcome.",
    capacity: 100
  },

  // UMD SPONSORED EVENTS
  {
    id: 11,
    title: "Fall Campus Tour",
    category: "umd-sponsored",
    date: "2025-11-11",
    time: "10:00",
    location: "Memorial Chapel",
    latitude: 38.9882,
    longitude: -76.9395,
    description: "Official guided tour of UMD campus for prospective students and families.",
    capacity: 40
  },
  {
    id: 12,
    title: "Homecoming Celebration",
    category: "umd-sponsored",
    date: "2025-11-17",
    time: "11:00",
    location: "Maryland Stadium",
    latitude: 38.9906,
    longitude: -76.9478,
    description: "Annual homecoming festivities with parade, tailgate, and football game.",
    capacity: 5000
  },
  {
    id: 13,
    title: "Career Fair: Engineering & Tech",
    category: "umd-sponsored",
    date: "2025-11-13",
    time: "09:00",
    location: "Stamp Student Union",
    latitude: 38.9878,
    longitude: -76.9447,
    description: "Meet with 100+ employers recruiting for internships and full-time positions.",
    capacity: 1000
  },
  {
    id: 14,
    title: "New Student Orientation",
    category: "umd-sponsored",
    date: "2025-11-19",
    time: "08:30",
    location: "Stamp Student Union",
    latitude: 38.9878,
    longitude: -76.9447,
    description: "Welcome session for spring semester transfer and international students.",
    capacity: 250
  },
  {
    id: 15,
    title: "President's Town Hall",
    category: "umd-sponsored",
    date: "2025-11-21",
    time: "17:00",
    location: "Memorial Chapel",
    latitude: 38.9882,
    longitude: -76.9395,
    description: "University president addresses students and takes questions on campus initiatives.",
    capacity: 300
  }
];

export const categoryConfig = {
  academic: {
    name: 'Academic Events',
    color: '#2563eb',
    icon: 'A',
    description: 'Lectures, Workshops, Seminars'
  },
  social: {
    name: 'Social Events',
    color: '#16a34a',
    icon: 'S',
    description: 'Parties, Sports, Networking'
  },
  'umd-sponsored': {
    name: 'UMD Sponsored Events',
    color: '#dc2626',
    icon: 'U',
    description: 'University Events, Tours'
  }
};
