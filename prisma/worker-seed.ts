import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  "Maids", "Cooks", "Plumbers", "Electricians", "Carpenters", 
  "Painters", "Drivers", "Mechanics", "Gardeners", "Guards", 
  "Nannies", "Nurses", "Delivery", "Loaders", "Tailors", 
  "Beauticians", "Masons", "Welders", "Cleaners", "Pest Control"
];

const areas = [
  "Vesu, Surat", "Adajan, Surat", "Varachha, Surat", "Katargam, Surat", 
  "Nanpura, Surat", "Bhatar, Surat", "Pal, Surat", "Udhna, Surat",
  "Bandra, Mumbai", "Andheri, Mumbai", "Dadar, Mumbai", "Borivali, Mumbai", 
  "Juhu, Mumbai", "Powai, Mumbai", "Colaba, Mumbai", "Vile Parle, Mumbai", 
  "Worli, Mumbai", "Thane, Mumbai", "Malad, Mumbai", "Kandivali, Mumbai", "Goregaon, Mumbai"
];

const names = [
  "Rajesh Kumar", "Amit Singh", "Suresh Patel", "Vijay Sharma", "Ramesh Joshi",
  "Sunita Devi", "Priyanka Verma", "Anita Rani", "Kavita Singh", "Meena Kumari",
  "Deepak Gupta", "Sanjay Yadav", "Manish Tiwari", "Rahul Mishra", "Vikram Rathore",
  "Arun Chauhan", "Manoj Pandey", "Anil Jha", "Pawan Soni", "Ravi Shankar",
  "Geeta Sharma", "Mala Roy", "Shanti Devi", "Gauri Shankar", "Laxmi Narayan",
  "Kamal Kishore", "Jagdish Prasad", "Om Prakash", "Ram Niwas", "Shiv Kumar",
  "Umesh Chand", "Vinay Prajapati", "Yogesh Bhardwaj", "Zafar Khan", "Imran Ali",
  "Salim Sheikh", "Abdul Rehman", "Farhan Akhtar", "Shahid Afridi", "Wasim Akram",
  "Shoaib Malik", "Babar Azam", "Rashid Khan", "David Warner", "Steve Smith",
  "Kane Williamson", "Joe Root", "Ben Stokes", "Virat Kohli", "Rohit Sharma",
  "MS Dhoni", "Hardik Pandya", "KL Rahul", "Jasprit Bumrah", "Mohammed Shami",
  "Ravindra Jadeja", "Ravichandran Ashwin", "Yuzvendra Chahal", "Kuldeep Yadav", "Rishabh Pant",
  "Shubman Gill", "Ishaan Kishan", "Prithvi Shaw", "Devdutt Padikkal", "Ruturaj Gaikwad",
  "Venkatesh Iyer", "Deepak Hooda", "Sanju Samson", "Shreyas Iyer", "Mayank Agarwal",
  "Hanuma Vihari", "Cheteshwar Pujara", "Ajinkya Rahane", "Wriddhiman Saha", "Kona Bharat",
  "Umesh Yadav", "Ishant Sharma", "Bhuvneshwar Kumar", "Shardul Thakur", "Arshdeep Singh",
  "Harshal Patel", "Avesh Khan", "Prasidh Krishna", "Umran Malik", "T Natarajan",
  "Varun Chakravarthy", "Rahul Chahar", "Krunal Pandya", "Axar Patel", "Washington Sundar"
];

async function main() {
  console.log("Starting seed process...");

  // Clear existing workers first to avoid duplicates
  console.log("Clearing existing workers...");
  await prisma.worker.deleteMany({});

  const workersToAdd = [];

  for (let i = 0; i < 500; i++) {
    const name = names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length)}` : "");
    const phone = `9${Math.floor(Math.random() * 900000000 + 100000000).toString()}`;
    const category = categories[Math.floor(Math.random() * categories.length)];
    const area = areas[Math.floor(Math.random() * areas.length)];
    const status = "APPROVED"; 
    const trustScore = Math.floor(Math.random() * 21) + 80; // 80-100
    const jobsDone = Math.floor(Math.random() * 101); // 0-100
    const avgRating = parseFloat((Math.random() * 2 + 3).toFixed(1)); // 3.0-5.0
    const priceRate = `₹${(Math.floor(Math.random() * 5) + 2) * 100}/visit`; // ₹200-600

    workersToAdd.push({
      name,
      phone,
      category,
      area,
      status,
      trustScore,
      jobsDone,
      avgRating,
      priceRate,
      isProfilePublic: true,
    });
  }

  // Batch create is available in Prisma 2.20.0+
  const result = await prisma.worker.createMany({
    data: workersToAdd,
    skipDuplicates: true,
  });

  console.log(`Successfully added ${result.count} workers!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
