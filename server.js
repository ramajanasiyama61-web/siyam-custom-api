const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// আপনার নিজস্ব নলেজ ডেটাবেজ
const knowledgeData = [
  {
    tags: ["বিজ্ঞান", "science", "বিজ্ঞান কি", "বিজ্ঞান কোন ভাষা"],
    reply: "বিজ্ঞান হলো পর্যবেক্ষণ ও পরীক্ষার মাধ্যমে প্রমাণিত বিশেষ জ্ঞান। এটি সংস্কৃত (তৎসম) শব্দ থেকে বাংলায় এসেছে।"
  },
  {
    tags: ["কে তৈরি করেছে", "নির্মাতা", "creator", "developer"],
    reply: "আমাকে SiyamDevStudioCodeWith7890AppProDroid-এর সিয়াম তৈরি করেছেন।"
  },
  {
    tags: ["নাম", "তোমার নাম কি", "who are you"],
    reply: "আমার নাম SiyamDev AI। এটি একটি সম্পূর্ণ নিজস্ব সার্ভার ও এপিআই সিস্টেমে পরিচালিত।"
  },
  {
    tags: ["জেমিনি", "gemini", "ফিচার"],
    reply: "জেমিনি একটি মাল্টিমোডাল এআই যা টেক্সট, ছবি ও অডিও বুঝতে পারে এবং লাইভ ভয়েস সাপোর্ট দেয়।"
  }
];

// কাস্টম এপিআই এন্ডপয়েন্ট
app.get('/api/chat', (req, res) => {
  const query = (req.query.q || '').trim().toLowerCase();

  if (!query) {
    return res.json({ success: false, reply: "অনুগ্রহ করে কোনো প্রশ্ন লিখুন।" });
  }

  // কি-ওয়ার্ড ম্যাচিং লজিক
  const match = knowledgeData.find(item =>
    item.tags.some(t => query.includes(t.toLowerCase()))
  );

  if (match) {
    res.json({ success: true, reply: match.reply });
  } else {
    res.json({
      success: true,
      reply: `"${req.query.q}" সম্পর্কিত তথ্যটি আমার নিজস্ব কাস্টম ডেটাবেজে যুক্ত করার কাজ চলছে।`
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
