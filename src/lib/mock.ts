export const CATEGORIES = [
  { id: "1",  name: "Maids",        icon: "Broom",              desc: "Trusted home cleaning, daily or monthly",        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=75" },
  { id: "2",  name: "Cooks",        icon: "ChefHat",            desc: "Home cooks for daily meals & special occasions",  image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=75" },
  { id: "3",  name: "Plumbers",     icon: "Wrench",             desc: "Fix leaks, pipes & bathroom fittings fast",       image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=500&q=75" },
  { id: "4",  name: "Electricians", icon: "Zap",                desc: "Wiring, fuse & appliance repairs you can trust",  image: "https://images.unsplash.com/photo-1544265176-3b7c7dfbf4a5?w=500&q=75" }, // changed
  { id: "5",  name: "Carpenters",   icon: "Hammer",             desc: "Furniture, doors & custom woodwork",              image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=75" },
  { id: "6",  name: "Painters",     icon: "PaintRoller",        desc: "Interior & exterior painting done right",         image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&q=75" }, // changed
  { id: "7",  name: "Drivers",      icon: "Car",                desc: "Verified drivers for daily or outstation trips",  image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&q=75" },
  { id: "8",  name: "Mechanics",    icon: "PenTool",            desc: "Vehicle servicing & on-spot repairs",            image: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=500&q=75" },
  { id: "9",  name: "Gardeners",    icon: "Leaf",               desc: "Garden care, pruning & landscaping",            image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=75" },
  { id: "10", name: "Guards",       icon: "Shield",             desc: "Trained security for homes & buildings",        image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=500&q=75" },
  { id: "11", name: "Nannies",      icon: "Baby",               desc: "Caring, experienced child caretakers",         image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=500&q=75" },
  { id: "12", name: "Nurses",       icon: "Stethoscope",        desc: "Home nursing & patient care services",         image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=75" },
  { id: "13", name: "Delivery",     icon: "Package",            desc: "Reliable last-mile delivery professionals",    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=500&q=75" },
  { id: "14", name: "Loaders",      icon: "Truck",              desc: "Heavy lifting & shifting made easy",           image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500&q=75" },
  { id: "15", name: "Tailors",      icon: "Scissors",           desc: "Stitching, alterations & custom outfits",     image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=75" },
  { id: "16", name: "Beauticians",  icon: "ScissorsLineDashed", desc: "Beauty & grooming services at home",          image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&q=75" }, // changed
  { id: "17", name: "Masons",       icon: "BrickWall",          desc: "Solid brickwork & construction masonry",      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&q=75" }, // changed
  { id: "18", name: "Welders",      icon: "Flame",              desc: "Metal fabrication & welding on-site",         image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&q=75" },
  { id: "19", name: "Cleaners",     icon: "Sparkles",           desc: "Deep cleaning for offices & homes",           image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=500&q=75" },
  { id: "20", name: "Pest Control", icon: "Bug",                desc: "Safe & effective pest extermination",         image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=75" }, // changed
];


export const MOCK_WORKERS = [
  {
    id: "w1",
    name: "Ramesh Kumar",
    photo: "https://i.pravatar.cc/150?u=ramesh",
    category: "Plumbers",
    trust_score: 95,
    verified: true,
    phone_number: "9876543210",
    price: "₹300/visit",
    ratings: 4.8,
    profile_views: 120,
    status: "active"
  },
  {
    id: "w2",
    name: "Sunita Devi",
    photo: "https://i.pravatar.cc/150?u=sunita",
    category: "Maids",
    trust_score: 88,
    verified: true,
    phone_number: "9123456780",
    price: "₹4000/month",
    ratings: 4.5,
    profile_views: 85,
    status: "active"
  },
  {
    id: "w3",
    name: "Abdul Khan",
    photo: "https://i.pravatar.cc/150?u=abdul",
    category: "Electricians",
    trust_score: 92,
    verified: true,
    phone_number: "9988776655",
    price: "₹250/visit",
    ratings: 4.7,
    profile_views: 200,
    status: "active"
  },
  {
    id: "w4",
    name: "Anita Sharma",
    photo: "https://i.pravatar.cc/150?u=anita",
    category: "Cooks",
    trust_score: 98,
    verified: true,
    phone_number: "9900112233",
    price: "₹5000/month",
    ratings: 4.9,
    profile_views: 310,
    status: "active"
  }
];

export const MOCK_CUSTOMER = {
  id: "c1",
  name: "Sunny",
  phone_number: "9999999999",
  trust_pass_expiry: new Date(Date.now() - 100000).toISOString(),
  total_spent: 0
};
