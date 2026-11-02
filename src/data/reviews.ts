export interface Review {
  id: string;
  name: string;
  source: 'Google My Business' | 'Facebook';
  image: string;
  quote: string;
  rating: number;
  highlight?: string;
  brokerage?: string;
}

export const REAL_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Gaby Martinez',
    source: 'Google My Business',
    image: 'https://lh3.googleusercontent.com/a-/ALV-UjWH3xZRFT5Ko1A_GOJcQsqaRzSf3goifTAAdXYeW2reMs9O3B5bOg=w72-h72-p-rp-mo-br100',
    quote: 'Michelle and Mary are absolutely amazing Transaction Coordinators! Their attention to detail, organization, and communication are truly unmatched. They keep every file on track and make the entire process smooth and stress-free. So grateful to have them on our team!',
    rating: 5,
    brokerage: 'Xtreme By LPT Realty'
  },
  {
    id: '2',
    name: 'Zuzel Gonzalez',
    source: 'Google My Business',
    image: '/images/reviews/zuzel-gonzalez.jpg',
    quote: 'Michelle is my go to transaction coordinator for all of my real estate deals. She is always organized, professional, and on top of every detail from start to finish. I honestly couldn’t do my transactions without her support.',
    rating: 5,
    highlight: 'Essential Transaction Partner'
  },
  {
    id: 'heather',
    name: 'Heather Lefebvre',
    source: 'Facebook',
    image: '/images/reviews/heather-lefebvre.jpg',
    quote: 'Hometown is all over it. As soon as I get my contract and I handed over to Michele and she takes it to closing from every little detail and if there’s a problem she will let me know but for the most part she takes care of all those details. I took a bear off my back and freed up so much of my time to focus on what I do best, Sell Real Estate! People like her and that matters. Always happy and cheerful! Thanks so much! I have another coming over by the morning. Productivity is up for sure',
    rating: 5,
    highlight: 'Took a Bear Off My Back & Freed Up My Time'
  },
  {
    id: '6',
    name: 'Cindy Rios',
    source: 'Google My Business',
    image: 'https://lh3.googleusercontent.com/a-/ALV-UjWdguXoyY1fUwmN1Eu4zcLq6rU1-jhRRaBS_NyrEfPnsSovnx8R=w72-h72-p-rp-mo-br100',
    quote: 'Michelle takes so much weight off my shoulders and keeps everything running smoothly at all times. Her understanding of real estate laws and compliance gives me complete peace of mind because I know nothing is being overlooked.',
    rating: 5,
    highlight: 'Complete Peace of Mind'
  },
  {
    id: '7',
    name: 'Jill Cox',
    source: 'Google My Business',
    image: 'https://lh3.googleusercontent.com/a-/ALV-UjXgtaHo5mlNfHSLiqw5fMSp_ZmhbFvb13yQvK5P7KhHpb9G514SZg=w72-h72-p-rp-mo-ba12-br100',
    quote: 'Michelle and her powerhouse team at Hometown TC are a game-changer for real estate agents. Ultra-organized, super proactive, and an above-and-beyond approach to supporting busy real estate professionals. You’ll be endlessly thankful you did.',
    rating: 5,
    highlight: 'Game-Changer for Agents'
  },
  {
    id: '9',
    name: 'Rasheda L.',
    source: 'Google My Business',
    image: 'https://lh3.googleusercontent.com/a/ACg8ocKI5e2KGRmuh9q08zXuUg6XY3OK_zJb3RQMb7qyNr1rbRsSExI=w72-h72-p-rp-mo-br100',
    quote: 'Michelle and her entire Hometown TC Team provide excellent and professional service. The fact that they tailor their real estate business services to your needs is what I love the most.',
    rating: 5
  },
  {
    id: '10',
    name: 'Robert Rosenberg',
    source: 'Google My Business',
    image: 'https://lh3.googleusercontent.com/a-/ALV-UjW2-dRgL2Ka_MgvBfkhlhQJ8J81YkV_w9pXt2kT2H_Mc-8Rhr8=w72-h72-p-rp-mo-ba12-br100',
    quote: 'As a title agent we work with many realtors and their Title Coordinators. It is a joy and a privilege to work with Michelle. From start to finish she does an outstanding job.',
    rating: 5,
    highlight: 'Title Agent Recommended'
  },
  {
    id: '11',
    name: 'Karla Sucre',
    source: 'Google My Business',
    image: 'https://lh3.googleusercontent.com/a-/ALV-UjXrj7QV57FfECpzA6RHFD6V5WBrHuz8DIPXkZkyP5uWcHmkFnZwgw=w72-h72-p-rp-mo-br100',
    quote: 'Michelle and her team have helped me improve my productivity and also provide my clients with luxury customer service no matter the price of the transaction, which has increased my referrals. Love HTC!',
    rating: 5,
    highlight: 'Increased Referrals & Efficiency'
  },
  {
    id: '12',
    name: 'Chris Wagner',
    source: 'Google My Business',
    image: 'https://lh3.googleusercontent.com/a-/ALV-UjVg_l1u2ROHeEP4p-II8eetpJ37UeAYYXkBp5RisMZYSK_m7_GX=w72-h72-p-rp-mo-ba12-br100',
    quote: 'Working with Michelle and HTC has been great for my business. The experience, customer service and knowledge they have is 1st class. I would highly recommend HTC to any agent trying to grow.',
    rating: 5
  },
  {
    id: '16',
    name: 'Rachel Burfield',
    source: 'Google My Business',
    image: 'https://lh3.googleusercontent.com/a/ACg8ocKhEWjxPgWop1eQyIWh1K33F3G04BuJzOLD_XiyYt-DsPbqs2s=w72-h72-p-rp-mo-br100',
    quote: 'This was my first time using a transaction coordinator and it is a complete game changer for my real estate business. Hometown Transaction Coordinators made the process effortless and were so kind.',
    rating: 5,
    highlight: 'First-Time TC Game Changer'
  },
  {
    id: '17',
    name: 'Wendy Ivanov',
    source: 'Google My Business',
    image: 'https://lh3.googleusercontent.com/a/ACg8ocJmRBwwPD6DBkg2ola44KswUSSmXrrqqjV0WiEdigb5sOuJo6wN=w72-h72-p-rp-mo-ba12-br100',
    quote: 'Michelle is truly a systems and workflow expert, the kind of person who can look at a process, improve it, and implement it in a way that makes everyone’s job easier. She brings a calm, solutions-focused presence.',
    rating: 5,
    highlight: 'Workflow & Systems Expert'
  },
  {
    id: '18',
    name: 'Andrea Cerrada',
    source: 'Google My Business',
    image: 'https://lh3.googleusercontent.com/a-/ALV-UjXdsMcwNaVSlrT77RFeGB6lzhTE3qKLOPS2JhFeuaTA5rGA3-9P=w72-h72-p-rp-mo-ba12-br100',
    quote: 'Working with Michelle and her team has been an absolute game-changer for my business. From the moment I send over a transaction, I know it’s in the best hands. Their level of service is unmatched.',
    rating: 5
  },
  {
    id: '21',
    name: 'Yolene Pierre',
    source: 'Facebook',
    image: '/images/reviews/yolene-pierre.jpg',
    quote: 'HTC, we did it again! The buyer\'s agent and loan officer were very impressed with the quality work you have done throughout the transaction. Thank you, Michelle, and the HTC team. You guys rock!',
    rating: 5
  },
  {
    id: '22',
    name: 'Vienna Whorley Freeman',
    source: 'Facebook',
    image: '/images/reviews/vienna-whorley-freeman.jpg',
    quote: 'I was initially reluctant about using HTC because I felt I could handle my transactions alone... nonetheless I am glad I did. They are very professional, knowledgeable, and ensure a timely closing. I won’t close another transaction without them!',
    rating: 5
  },
  {
    id: '24',
    name: 'Karen Deveau',
    source: 'Facebook',
    image: '/images/reviews/karen-deveau.jpg',
    quote: 'We just finished our first transaction - Contract to Close - with Hometown and what a difference they made! Michelle is really on top of it and made sure things kept on track.',
    rating: 5
  },
  {
    id: '25',
    name: 'Sharon Johnson Arnett',
    source: 'Facebook',
    image: '/images/reviews/sharon-johnson-arnett.jpg',
    quote: 'Our team has been using Michelle at Hometown Transaction Coordinators for almost a year now. Her checklists and systems give our clients (and us!) great peace of mind from Contract to Closing.',
    rating: 5
  },
  {
    id: '28',
    name: 'Yolanda Shubert Graham',
    source: 'Facebook',
    image: '/images/reviews/yolanda-shubert-graham.jpg',
    quote: 'I have worked with Hometown for a few years now. I absolutely love the simplicity and ease of doing business with them. This service allows me to concentrate on new business while knowing my pending deals are handled professionally.',
    rating: 5
  }
];
