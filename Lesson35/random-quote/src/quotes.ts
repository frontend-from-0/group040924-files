import { Quote } from './types';
import { doc, setDoc } from 'firebase/firestore';
import { collections, db } from './firebase';
export const quotes: Quote[] = [
  {
    id: 'q1a2b3',
    quote: 'Be yourself; everyone else is already taken.',
    author: 'Oscar Wilde',
    likedBy: 0,
  },
  {
    id: 'q4c5d6',
    quote: 'The secret of getting ahead is getting started.',
    author: 'Mark Twain',
    likedBy: 0,
  },
  {
    id: 'q7e8f9',
    quote: 'In the middle of difficulty lies opportunity.',
    author: 'Albert Einstein',
    likedBy: 0,
  },
  {
    id: 'q0g1h2',
    quote: 'What you do today can improve all your tomorrows.',
    author: 'Ralph Marston',
    likedBy: 0,
  },
  {
    id: 'q3i4j5',
    quote: 'It always seems impossible until it’s done.',
    author: 'Nelson Mandela',
    likedBy: 0,
  },
  {
    id: 'q6k7l8',
    quote: 'If you can dream it, you can do it.',
    author: 'Walt Disney',
    likedBy: 0,
  },
  {
    id: 'q9m0n1',
    quote: 'Stay hungry. Stay foolish.',
    author: 'Steve Jobs',
    likedBy: 0,
  },
  {
    id: 'q2o3p4',
    quote: 'Whatever you are, be a good one.',
    author: 'Abraham Lincoln',
    likedBy: 0,
  },
  {
    id: 'q5q6r7',
    quote: 'Strive not to be a success, but rather to be of value.',
    author: 'Albert Einstein',
    likedBy: 0,
  },
  {
    id: 'q8s9t0',
    quote: 'Simplicity is the ultimate sophistication.',
    author: 'Leonardo da Vinci',
    likedBy: 0,
  },
  {
    id: 'q1u2v3',
    quote: 'Life is short. Live it.',
    author: 'Unknown',
    likedBy: 0,
  },
  {
    id: 'q4w5x6',
    quote: 'Act as if what you do makes a difference. It does.',
    author: 'William James',
    likedBy: 0,
  },
  {
    id: 'q7y8z9',
    quote: 'Turn your wounds into wisdom.',
    author: 'Oprah Winfrey',
    likedBy: 0,
  },
  {
    id: 'q0a1b2',
    quote: 'You miss 100% of the shots you don’t take.',
    author: 'Wayne Gretzky',
    likedBy: 0,
  },
  {
    id: 'q3c4d5',
    quote: 'Dream big and dare to fail.',
    author: 'Norman Vaughan',
    likedBy: 0,
  },
  {
    id: 'q6e7f8',
    quote: 'Don’t wait. The time will never be just right.',
    author: 'Napoleon Hill',
    likedBy: 0,
  },
  {
    id: 'q9g0h1',
    quote: 'Well done is better than well said.',
    author: 'Benjamin Franklin',
    likedBy: 0,
  },
  {
    id: 'q2i3j4',
    quote: 'Be the change that you wish to see in the world.',
    author: 'Often attributed to Gandhi',
    likedBy: 0,
  },
  {
    id: 'q5k6l7',
    quote: 'Happiness is not by chance, but by choice.',
    author: 'Jim Rohn',
    likedBy: 0,
  },
  {
    id: 'q8m9n0',
    quote: 'Action is the foundational key to all success.',
    author: 'Pablo Picasso',
    likedBy: 0,
  },
  {
    id: 'q1o2p3',
    quote: 'Do something today that your future self will thank you for.',
    author: 'Sean Patrick Flanery',
    likedBy: 0,
  },
  {
    id: 'q4q5r6',
    quote:
      'It’s not the years in your life that count. It’s the life in your years.',
    author: 'Abraham Lincoln',
    likedBy: 0,
  },
  {
    id: 'q7s8t9',
    quote: 'Either you run the day or the day runs you.',
    author: 'Jim Rohn',
    likedBy: 0,
  },
  {
    id: 'q0u1v2',
    quote: 'Believe you can and you’re halfway there.',
    author: 'Theodore Roosevelt',
    likedBy: 0,
  },
  {
    id: 'q3w4x5',
    quote: 'Failure is success if we learn from it.',
    author: 'Malcolm Forbes',
    likedBy: 0,
  },
  {
    id: 'q6y7z8',
    quote: 'Life is 10% what happens to us and 90% how we react to it.',
    author: 'Charles R. Swindoll',
    likedBy: 0,
  },
  {
    id: 'q9a0b1',
    quote: 'Start where you are. Use what you have. Do what you can.',
    author: 'Arthur Ashe',
    likedBy: 0,
  },
  {
    id: 'q2c3d4',
    quote: 'What we think, we become.',
    author: 'Buddha',
    likedBy: 0,
  },
  {
    id: 'q5e6f7',
    quote:
      'Keep going. Everything you need will come to you at the perfect time.',
    author: 'Unknown',
    likedBy: 0,
  },
  {
    id: 'q8g9h0',
    quote: 'Success is not final; failure is not fatal.',
    author: 'Winston Churchill',
    likedBy: 0,
  },
  {
    id: 'q1i2j3',
    quote: 'A person who never made a mistake never tried anything new.',
    author: 'Albert Einstein',
    likedBy: 0,
  },
  {
    id: 'q4k5l6',
    quote: 'Don’t let yesterday take up too much of today.',
    author: 'Will Rogers',
    likedBy: 0,
  },
  {
    id: 'q7m8n9',
    quote: 'Everything you’ve ever wanted is on the other side of fear.',
    author: 'George Addair',
    likedBy: 0,
  },
  {
    id: 'q0o1p2',
    quote: 'I have not failed. I’ve just found 10,000 ways that won’t work.',
    author: 'Thomas Edison',
    likedBy: 0,
  },
  {
    id: 'q3q4r5',
    quote: 'If you want to lift yourself up, lift up someone else.',
    author: 'Booker T. Washington',
    likedBy: 0,
  },
  {
    id: 'q6s7t8',
    quote: 'Don’t be pushed around by the fears in your mind.',
    author: 'Roy T. Bennett',
    likedBy: 0,
  },
  {
    id: 'q9u0v1',
    quote: 'Small deeds done are better than great deeds planned.',
    author: 'Peter Marshall',
    likedBy: 0,
  },
  {
    id: 'q2w3x4',
    quote: 'We may encounter many defeats but we must not be defeated.',
    author: 'Maya Angelou',
    likedBy: 0,
  },
  {
    id: 'q5y6z7',
    quote: 'Be kind whenever possible. It is always possible.',
    author: 'Dalai Lama',
    likedBy: 0,
  },
  {
    id: 'q8a9b0',
    quote: 'To succeed in life, you need two things: ignorance and confidence.',
    author: 'Mark Twain',
    likedBy: 0,
  },
  {
    id: 'q1c2d3',
    quote:
      'The only limit to our realization of tomorrow will be our doubts of today.',
    author: 'Franklin D. Roosevelt',
    likedBy: 0,
  },
  {
    id: 'q4e5f6',
    quote:
      'You can, you should, and if you’re brave enough to start, you will.',
    author: 'Stephen King',
    likedBy: 0,
  },
  {
    id: 'q7g8h9',
    quote: 'If at first you don’t succeed, try, try again.',
    author: 'Thomas H. Palmer',
    likedBy: 0,
  },
  {
    id: 'q0i1j2',
    quote: 'It’s kind of fun to do the impossible.',
    author: 'Walt Disney',
    likedBy: 0,
  },
  {
    id: 'q3k4l5',
    quote: 'If opportunity doesn’t knock, build a door.',
    author: 'Milton Berle',
    likedBy: 0,
  },
  {
    id: 'q6m7n8',
    quote: 'Fall seven times, stand up eight.',
    author: 'Japanese Proverb',
    likedBy: 0,
  },
  {
    id: 'q9o0p1',
    quote: 'A journey of a thousand miles begins with a single step.',
    author: 'Lao Tzu',
    likedBy: 0,
  },
  {
    id: 'q2q3r4',
    quote: 'Never regret anything that made you smile.',
    author: 'Mark Twain',
    likedBy: 0,
  },
  {
    id: 'q5s6t7',
    quote: 'Die with memories, not dreams.',
    author: 'Unknown',
    likedBy: 0,
  },
  {
    id: 'q8u9v0',
    quote: 'I can and I will. Watch me.',
    author: 'Carrie Green (often credited)',
    likedBy: 0,
  },
];

export const addQuotesToDB = (quotes: Quote[]) => {
  quotes.map(async ({ quote, author, likedBy, id }) => {
    try {
      await setDoc(doc(db, collections.quotes, id), {
        quote,
        author,
        likedBy,
      });
    } catch (error) {
      console.log('An error occured when uploading quotes', error);
    }
  });
};
