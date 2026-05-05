const heroImage = document.querySelector("#heroImage");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const walmartScreen = document.querySelector("#walmartScreen");
const productMedia = document.querySelector(".product-media");
const keyFeaturesCard = document.querySelector("#keyFeaturesCard");
const specsTitle = document.querySelector("#specsTitle");
const specsList = document.querySelector("#specsList");
const specsCard = document.querySelector("#specsCard");
const reviewsTitle = document.querySelector("#reviewsTitle");
const reviewsPill = document.querySelector("#reviewsPill");
const reviewsList = document.querySelector("#reviewsList");
const reviewsCard = document.querySelector("#reviewsCard");
const fulfillmentCard = document.querySelector(".fulfillment");
const gamingAlternativesCard = document.querySelector("#gamingAlternativesCard");
const gamingProductCarousel = document.querySelector("#gamingProductCarousel");
const gamingCompareButton = document.querySelector("#gamingCompareButton");
const gamingComparePanel = document.querySelector("#gamingComparePanel");
const similarItemsCard = document.querySelector("#similarItemsCard");
let reviewLoadTimer;
let reviewStreamTimer;
let generationTimers = [];
let activeScenarioKey = "gamingFit";
let activeReviewFilter = "all";

const generativeSteps = [
  "Checking gaming fit",
  "Reading GPU, RAM, storage, and display specs",
  "Matching specs to casual, cloud, and AAA gaming needs",
  "Separating strengths from limitations",
  "Scanning reviews for gaming mentions",
  "Curating the gaming PDP",
];

const currentGamingComparison = {
  image:
    "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-5i-16-Touchscreen-2-in-1-Laptop-Intel-Core-5-120U-16GB-512-SSD-83DU004VUS_54648de7-27d1-436e-9045-1eb6651efb94.0a7d381af4aaf8053fb031f2405c3897.jpeg?odnBg=FFFFFF&odnHeight=220&odnWidth=220",
  title: 'Lenovo IdeaPad 5i 2-in-1 16" Touchscreen Laptop',
  shortName: "Current IdeaPad",
  price: "$599.00",
  rating: "4.4",
  reviewCount: "417",
  isCurrent: true,
  values: {
    fit: { text: "Casual gaming", tone: "neutral" },
    graphics: { text: "Integrated", tone: "bad" },
    aaa: { text: "Low fit", tone: "bad" },
    portability: { text: "2-in-1, travel friendly", tone: "good" },
    display: { text: "16 in WUXGA", tone: "good" },
    value: { text: "Lowest price", tone: "good" },
  },
};

const gamingAlternativeProducts = [
  {
    image:
      "https://i5.walmartimages.com/asr/e3399d0c-c753-43fb-af6f-4574e16deff0.6b26caddfcdbffef1e108ff7b26a5927.jpeg?odnBg=FFFFFF&odnHeight=576&odnWidth=576",
    title: "Acer Nitro V 15 Gaming Laptop, RTX 4050, 16GB RAM, 512GB SSD",
    shortName: "Acer Nitro V 15",
    price: "$829.00",
    rating: "4.5",
    reviewCount: "213",
    badge: "Serious gaming",
    highlight: "Compared with this IdeaPad, you trade 2-in-1 flexibility for an RTX GPU that handles newer games better.",
    values: {
      fit: { text: "Serious gaming", tone: "good" },
      graphics: { text: "RTX 4050", tone: "good" },
      aaa: { text: "Good fit", tone: "good" },
      portability: { text: "Bulkier build", tone: "neutral" },
      display: { text: "15.6 in gaming panel", tone: "neutral" },
      value: { text: "+$230", tone: "neutral" },
    },
  },
  {
    image:
      "https://i5.walmartimages.com/asr/ec382747-3630-476f-b757-27850fd5268d.1cb2e27459fdb9f8d341c4c0b104c191.jpeg?odnBg=FFFFFF&odnHeight=576&odnWidth=576",
    title: "ASUS TUF Gaming A15 15.6 inch Laptop, Ryzen 7, RTX 4060, 144Hz",
    shortName: "ASUS TUF A15",
    price: "$899.00",
    rating: "4.6",
    reviewCount: "188",
    badge: "Gaming GPU",
    highlight: "A bigger gaming jump than the IdeaPad: stronger GPU, higher-refresh display, and better AAA-game headroom.",
    values: {
      fit: { text: "Performance gaming", tone: "good" },
      graphics: { text: "RTX 4060", tone: "good" },
      aaa: { text: "Best fit", tone: "good" },
      portability: { text: "Gaming chassis", tone: "neutral" },
      display: { text: "144Hz panel", tone: "good" },
      value: { text: "+$300", tone: "neutral" },
    },
  },
  {
    image:
      "https://i5.walmartimages.com/asr/42ba5206-fd6a-460f-94b8-c6113a706889.f9b783cfcfbed2a037ba145bf2f9790e.jpeg?odnBg=FFFFFF&odnHeight=576&odnWidth=576",
    title: "Lenovo LOQ 15 Gaming Laptop, Intel Core i5, RTX 3050, 16GB Memory",
    shortName: "Lenovo LOQ 15",
    price: "$749.00",
    rating: "4.4",
    reviewCount: "530",
    badge: "Balanced value",
    highlight: "Closest Lenovo alternative: keeps the brand/value feel but adds a dedicated GPU this IdeaPad lacks.",
    values: {
      fit: { text: "Midrange gaming", tone: "good" },
      graphics: { text: "RTX 3050", tone: "good" },
      aaa: { text: "Medium fit", tone: "neutral" },
      portability: { text: "Less flexible", tone: "neutral" },
      display: { text: "15.6 in display", tone: "neutral" },
      value: { text: "+$150", tone: "good" },
    },
  },
  {
    image:
      "https://i5.walmartimages.com/asr/707d42f6-8a35-4a79-a429-fa1d9b45c9c1.06d671f18d1e2d4e7532194c00c58d52.png?odnBg=FFFFFF&odnHeight=576&odnWidth=576",
    title: "HP Victus 16 Gaming Laptop, 16 inch Display, RTX Graphics, 1TB SSD",
    shortName: "HP Victus 16",
    price: "$879.00",
    rating: "4.3",
    reviewCount: "97",
    badge: "Bigger display",
    highlight: "If you like this IdeaPad's 16-inch size, Victus keeps the big screen and shifts the build toward gaming.",
    values: {
      fit: { text: "Big-screen gaming", tone: "good" },
      graphics: { text: "RTX graphics", tone: "good" },
      aaa: { text: "Good fit", tone: "good" },
      portability: { text: "Larger body", tone: "neutral" },
      display: { text: "16 in gaming display", tone: "good" },
      value: { text: "+$280", tone: "neutral" },
    },
  },
  {
    image:
      "https://i5.walmartimages.com/asr/82b98986-afdd-40c3-a2d5-b0355110c65d.8403d90bb2cc57ab6d11c1b93eab4f44.jpeg?odnBg=FFFFFF&odnHeight=576&odnWidth=576",
    title: "MSI Thin 15 Gaming Laptop, Intel Core i7, RTX 4050, 16GB RAM",
    shortName: "MSI Thin 15",
    price: "$799.00",
    rating: "4.2",
    reviewCount: "348",
    badge: "Portable gaming",
    highlight: "More gaming-focused than this IdeaPad without going huge, though it gives up the touchscreen 2-in-1 design.",
    values: {
      fit: { text: "Portable gaming", tone: "good" },
      graphics: { text: "RTX 4050", tone: "good" },
      aaa: { text: "Good fit", tone: "good" },
      portability: { text: "Thinner gaming build", tone: "good" },
      display: { text: "15.6 in display", tone: "neutral" },
      value: { text: "+$200", tone: "neutral" },
    },
  },
];

const gamingSpecSummaries = {
  tier: {
    title: "Casual fit",
    text:
      "Best for casual gaming: This IdeaPad is a strong work-first laptop that can handle lighter games, browser games, Minecraft-style titles, indie games, and cloud gaming. It is not positioned as a gaming laptop.",
  },
  graphics: {
    title: "GPU limits",
    text:
      "Integrated graphics limitation: The Intel Core 5 120U is efficient for travel, calls, docs, and multitasking, but it does not include a dedicated NVIDIA or AMD gaming GPU. Expect lower settings for older or lighter games.",
  },
  ram: {
    title: "Multitask ready",
    text:
      "16GB RAM is a helpful bright spot: it gives enough headroom for cloud gaming, browser tabs, chat apps, and lighter games running alongside everyday work.",
  },
  storage: {
    title: "Enough room",
    text:
      "512GB SSD is comfortable for work files and a handful of casual games. Larger AAA titles can fill it quickly, so cloud gaming or external storage would help if the game library grows.",
  },
  display: {
    title: "Big screen",
    text:
      "The 16-inch WUXGA touchscreen gives casual games and streaming more room than a compact ultraportable. It is practical for controller play, but it is not a high-refresh gaming panel.",
  },
  aaa: {
    title: "Skip AAA",
    text:
      "Not recommended for newer AAA games: integrated graphics are the main constraint, especially for high settings or graphics-heavy titles. A dedicated gaming GPU would be the better fit.",
  },
};

const scenarioContent = {
  gamingFit: {
    key: "gamingFit",
    tag: "Gaming",
    verdictTitle: "Gaming Fit",
    verdictSummary:
      "Good for casual gaming and cloud gaming, but not recommended for newer AAA games or high graphics settings.",
    chatPlaceholder: "Short answer: good for casual and cloud gaming, not AAA.",
    steps: generativeSteps,
    specsTitle: "Gaming specs",
    specs: [
      { key: "tier", label: "Gaming tier", value: "Casual", tone: "positive" },
      { key: "graphics", label: "Graphics", value: "Integrated", tone: "negative" },
      { key: "ram", label: "RAM memory", value: "16 GB", tone: "positive" },
      { key: "storage", label: "Storage", value: "512 GB", tone: "neutral" },
      { key: "display", label: "Display", value: "16 in WUXGA", tone: "positive" },
      { key: "aaa", label: "AAA games", value: "Low fit", tone: "negative" },
    ],
    specSummaries: gamingSpecSummaries,
    defaultSpecKey: "tier",
    alternativesTitle: "Other gaming laptops",
    alternativesSubtitle: "Based on the gaming attributes surfaced above",
    reviewMode: "gamingFilters",
    showCompare: true,
  },
  gameCompatibility: {
    key: "gameCompatibility",
    tag: "Games",
    verdictTitle: "Minecraft + Fortnite Fit",
    verdictSummary:
      "Minecraft is a reasonable fit for casual play. Fortnite is possible only with low expectations, lighter settings, or cloud gaming.",
    chatPlaceholder: "Minecraft is a better fit than Fortnite on this laptop.",
    steps: [
      "Checking Minecraft and Fortnite requirements",
      "Reading graphics, RAM, and display limits",
      "Separating local play from cloud gaming",
      "Estimating realistic settings",
      "Looking for review mentions about casual games",
      "Building the compatibility view",
    ],
    specsTitle: "Game compatibility",
    specs: [
      { key: "minecraft", label: "Minecraft", value: "Good fit", tone: "positive" },
      { key: "fortnite", label: "Fortnite", value: "Low settings", tone: "neutral" },
      { key: "graphics", label: "Graphics", value: "Integrated", tone: "negative" },
      { key: "ram", label: "RAM memory", value: "16 GB", tone: "positive" },
      { key: "storage", label: "Storage", value: "512 GB", tone: "neutral" },
      { key: "cloud", label: "Cloud gaming", value: "Best path", tone: "positive" },
    ],
    specSummaries: {
      minecraft: {
        title: "Minecraft works",
        text:
          "Minecraft-style play is the best local gaming fit here: lighter graphics, enough RAM, and a large screen make it reasonable for casual sessions.",
      },
      fortnite: {
        title: "Fortnite is limited",
        text:
          "Fortnite is the stretch case. Integrated graphics mean low settings and modest expectations, especially if smooth competitive play matters.",
      },
      graphics: gamingSpecSummaries.graphics,
      ram: gamingSpecSummaries.ram,
      storage: gamingSpecSummaries.storage,
      cloud: {
        title: "Cloud helps most",
        text:
          "Cloud gaming is the safest way to play heavier titles on this IdeaPad because the game runs elsewhere and the laptop mainly needs a stable connection and good screen.",
      },
    },
    defaultSpecKey: "minecraft",
    alternativesTitle: "Better for these games",
    alternativesSubtitle: "Options with dedicated graphics if Fortnite matters",
    reviews: {
      summary:
        "Review signals line up with the compatibility read: customers describe lighter games and cloud gaming as comfortable, while demanding games are where expectations drop.",
      snippets: [
        {
          stars: "★★★★☆",
          rating: "4.0",
          name: "Marco R.",
          date: "Mar 18, 2026",
          datetime: "2026-03-18",
          text: "Minecraft runs fine for me after work. I would not use this for competitive Fortnite.",
        },
        {
          stars: "★★★★☆",
          rating: "4.0",
          name: "Alyssa T.",
          date: "Dec 14, 2025",
          datetime: "2025-12-14",
          text: "Cloud games feel better than installed games, especially on the 16-inch display.",
        },
      ],
    },
    showCompare: true,
  },
  gamingLimitation: {
    key: "gamingLimitation",
    tag: "Gaming",
    verdictTitle: "Main Gaming Limitation",
    verdictSummary:
      "The main issue is graphics power. The IdeaPad uses integrated graphics, so RAM and screen size help, but they do not replace a dedicated gaming GPU.",
    chatPlaceholder: "The main gaming limitation is the integrated graphics.",
    steps: [
      "Finding the biggest gaming bottleneck",
      "Checking whether RAM or GPU matters more",
      "Comparing casual games with AAA games",
      "Looking at what customer reviews complain about",
      "Separating fixable tradeoffs from hard limits",
      "Building the limitation view",
    ],
    specsTitle: "Limitation breakdown",
    specs: [
      { key: "graphics", label: "Main limit", value: "Integrated GPU", tone: "negative" },
      { key: "aaa", label: "AAA games", value: "Low fit", tone: "negative" },
      { key: "ram", label: "RAM", value: "Helpful", tone: "positive" },
      { key: "display", label: "Screen", value: "Good size", tone: "positive" },
      { key: "tier", label: "Best use", value: "Casual", tone: "positive" },
      { key: "upgrade", label: "Upgrade path", value: "RTX laptop", tone: "neutral" },
    ],
    specSummaries: {
      graphics: gamingSpecSummaries.graphics,
      aaa: gamingSpecSummaries.aaa,
      ram: gamingSpecSummaries.ram,
      display: gamingSpecSummaries.display,
      tier: gamingSpecSummaries.tier,
      upgrade: {
        title: "GPU upgrade",
        text:
          "If gaming is a priority, the meaningful upgrade is not more storage or a bigger screen; it is a laptop with dedicated NVIDIA or AMD graphics.",
      },
    },
    defaultSpecKey: "graphics",
    alternativesTitle: "Laptops that fix the limit",
    alternativesSubtitle: "These trade 2-in-1 flexibility for stronger gaming graphics",
    reviews: {
      summary:
        "Customer comments that mention gaming usually split in the same place: light games are fine, but buyers who expected a true gaming laptop point to graphics as the blocker.",
      snippets: [
        {
          stars: "★★★☆☆",
          rating: "3.0",
          name: "Priya S.",
          date: "Feb 9, 2026",
          datetime: "2026-02-09",
          text: "Good for casual gaming, but I would not buy it for high settings or newer AAA games.",
        },
        {
          stars: "★★★☆☆",
          rating: "3.0",
          name: "Ben K.",
          date: "Nov 30, 2025",
          datetime: "2025-11-30",
          text: "Great work laptop, but integrated graphics are the limit for serious gaming.",
        },
      ],
    },
    showCompare: true,
  },
  betterGaming: {
    key: "betterGaming",
    tag: "Gaming",
    primary: "alternatives",
    verdictTitle: "Better Gaming Under $900",
    verdictSummary:
      "Under $900, the better gaming move is a laptop with dedicated RTX graphics. You give up some 2-in-1 flexibility, but gain much stronger game performance.",
    chatPlaceholder: "Look for an RTX gaming laptop under $900.",
    steps: [
      "Setting the budget under $900",
      "Prioritizing dedicated gaming graphics",
      "Checking price jumps from this IdeaPad",
      "Comparing display, portability, and game fit",
      "Keeping options close to the current price",
      "Building the shopping comparison",
    ],
    specsTitle: "What better means",
    specs: [
      { key: "gpu", label: "GPU", value: "Dedicated", tone: "positive" },
      { key: "budget", label: "Budget", value: "Under $900", tone: "positive" },
      { key: "tradeoff", label: "Tradeoff", value: "Less 2-in-1", tone: "neutral" },
      { key: "aaa", label: "AAA games", value: "Better fit", tone: "positive" },
      { key: "weight", label: "Weight", value: "Heavier", tone: "negative" },
      { key: "value", label: "Price gap", value: "+$150-$300", tone: "neutral" },
    ],
    specSummaries: {
      gpu: {
        title: "GPU first",
        text:
          "For gaming, dedicated graphics matter more than the current IdeaPad's touchscreen or convertible hinge. That is the clearest upgrade target.",
      },
      budget: {
        title: "Budget held",
        text:
          "There are stronger gaming options below $900, but the best picks sit closer to the top of that budget than this $599 IdeaPad.",
      },
      tradeoff: {
        title: "Flexibility trade",
        text:
          "Most gaming laptops in this range are less flexible than the IdeaPad: fewer tablet-style uses, more weight, and a more gaming-focused build.",
      },
      aaa: gamingSpecSummaries.aaa,
      weight: {
        title: "Less portable",
        text:
          "The extra gaming hardware usually means a bigger charger and heavier body, so this is a performance-for-portability trade.",
      },
      value: {
        title: "Price jump",
        text:
          "The most realistic gaming upgrade costs roughly $150 to $300 more than this IdeaPad, which is worth it only if gaming is a real priority.",
      },
    },
    defaultSpecKey: "gpu",
    alternativesTitle: "Better gaming laptops",
    alternativesSubtitle: "Dedicated GPU options under $900",
    reviews: {
      summary:
        "The review pattern supports shopping up if gaming matters: buyers like this IdeaPad for everyday value, but the gaming ceiling is lower than an RTX-based laptop.",
      snippets: [
        {
          stars: "★★★★☆",
          rating: "4.0",
          name: "Marco R.",
          date: "Mar 18, 2026",
          datetime: "2026-03-18",
          text: "It is a great value laptop, but I would choose a gaming model if newer games were the goal.",
        },
        {
          stars: "★★★☆☆",
          rating: "3.0",
          name: "Ben K.",
          date: "Nov 30, 2025",
          datetime: "2025-11-30",
          text: "Fine for work, not the laptop I would pick for serious gaming.",
        },
      ],
    },
    showCompare: true,
  },
  collegeFit: {
    key: "collegeFit",
    tag: "College",
    verdictTitle: "College + Gaming Fit",
    verdictSummary:
      "Strong for notes, homework, browsing, Zoom, and casual gaming. It is a good student laptop if gaming is secondary, not the main reason to buy.",
    chatPlaceholder: "Good for college work and casual gaming.",
    steps: [
      "Balancing college work and gaming needs",
      "Checking notes, homework, Zoom, and battery fit",
      "Looking at touchscreen and 2-in-1 usefulness",
      "Separating casual gaming from serious gaming",
      "Checking student-friendly value",
      "Building the multi-use fit view",
    ],
    specsTitle: "College + gaming fit",
    specs: [
      { key: "notes", label: "Notes", value: "Strong", tone: "positive" },
      { key: "homework", label: "Homework", value: "Strong", tone: "positive" },
      { key: "gaming", label: "Gaming", value: "Casual", tone: "neutral" },
      { key: "battery", label: "Battery", value: "9 h", tone: "positive" },
      { key: "carry", label: "Campus carry", value: "Moderate", tone: "neutral" },
      { key: "tablet", label: "2-in-1", value: "Useful", tone: "positive" },
    ],
    specSummaries: {
      notes: {
        title: "Note-friendly",
        text:
          "The touchscreen and 2-in-1 hinge make this stronger for class notes than a basic clamshell laptop, especially if you like reading or marking things up.",
      },
      homework: {
        title: "Work ready",
        text:
          "For Docs, spreadsheets, research, LMS tabs, and Zoom, 16GB RAM and the Core 5 chip are a comfortable everyday college setup.",
      },
      gaming: {
        title: "Casual only",
        text:
          "Gaming fits as a side need: Minecraft-style games, cloud gaming, browser games, and older titles are reasonable; AAA games are not the strength.",
      },
      battery: {
        title: "Class day",
        text:
          "The listed 9-hour battery is a good signal for lectures, homework blocks, and library sessions, though heavy video or gaming will drain faster.",
      },
      carry: {
        title: "Bigger bag",
        text:
          "The 16-inch screen is great for multitasking, but it is larger than ultraportables. It is campus-friendly if you value screen space over the lightest carry.",
      },
      tablet: {
        title: "Flexible modes",
        text:
          "The 2-in-1 design is useful for notes, reading, presentations, streaming, and controller-based casual gaming in a dorm or library setup.",
      },
    },
    defaultSpecKey: "homework",
    alternativesTitle: "Other student-friendly picks",
    alternativesSubtitle: "Options if gaming or portability becomes more important",
    reviews: {
      summary:
        "Customer themes make this feel student-friendly: reliable everyday performance, useful touchscreen flexibility, and enough memory for multitasking. Gaming comes through as a bonus, not the core strength.",
      snippets: [
        {
          stars: "★★★★★",
          rating: "5.0",
          name: "Jordan M.",
          date: "Jan 27, 2026",
          datetime: "2026-01-27",
          text: "I use it for school, streaming, and lighter games with a controller. The 16GB memory helps a lot.",
        },
        {
          stars: "★★★★☆",
          rating: "4.0",
          name: "Alyssa T.",
          date: "Dec 14, 2025",
          datetime: "2025-12-14",
          text: "Great for notes and class tabs. I would not call it a gaming laptop, but cloud games work well.",
        },
      ],
    },
    showCompare: false,
  },
  reviewIntelligence: {
    key: "reviewIntelligence",
    tag: "Reviews",
    primary: "reviews",
    verdictTitle: "Review Intelligence",
    verdictSummary:
      "Customers mostly praise everyday reliability, touchscreen usability, and value. Gaming comments are more cautious and point to casual use.",
    chatPlaceholder: "Reviews are strongest for value and everyday use.",
    steps: [
      "Scanning review themes",
      "Finding repeated praise and complaints",
      "Separating gaming mentions from general laptop feedback",
      "Pulling trustworthy snippets",
      "Summarizing what buyers actually say",
      "Building the review intelligence view",
    ],
    specsTitle: "Review signals",
    specs: [
      { key: "value", label: "Value", value: "Positive", tone: "positive" },
      { key: "reliable", label: "Reliability", value: "Positive", tone: "positive" },
      { key: "touch", label: "Touchscreen", value: "Positive", tone: "positive" },
      { key: "gaming", label: "Gaming", value: "Mixed", tone: "neutral" },
      { key: "gpu", label: "Graphics", value: "Limit", tone: "negative" },
      { key: "battery", label: "Battery", value: "Good", tone: "positive" },
    ],
    specSummaries: {
      value: {
        title: "Value praise",
        text:
          "The strongest review theme is value: buyers feel the specs and convertible design are strong for the price.",
      },
      reliable: {
        title: "Daily reliable",
        text:
          "Customers describe smooth everyday use for work, class, browsing, and streaming without needing gaming-level power.",
      },
      touch: {
        title: "Touch helps",
        text:
          "The touchscreen and flexible hinge show up as practical benefits, especially for notes, reading, and media modes.",
      },
      gaming: gamingSpecSummaries.tier,
      gpu: gamingSpecSummaries.graphics,
      battery: gamingSpecSummaries.ram,
    },
    defaultSpecKey: "value",
    alternativesTitle: "Products reviewers compare against",
    alternativesSubtitle: "Nearby options if the review concerns matter to you",
    reviews: {
      summary:
        "The most useful review read is: buy it for everyday performance, value, and flexibility. Treat gaming as occasional, because the reviews that mention games still come back to the integrated graphics limit.",
      snippets: [
        {
          stars: "★★★★★",
          rating: "5.0",
          name: "Nina P.",
          date: "Apr 4, 2026",
          datetime: "2026-04-04",
          text: "Great value for school and work. The touchscreen feels more useful than I expected.",
        },
        {
          stars: "★★★★☆",
          rating: "4.0",
          name: "Marco R.",
          date: "Mar 18, 2026",
          datetime: "2026-03-18",
          text: "Runs work apps great and lighter games are fine after work.",
        },
      ],
    },
    showCompare: false,
  },
  valueAssessment: {
    key: "valueAssessment",
    tag: "Value",
    verdictTitle: "Worth $599?",
    verdictSummary:
      "Strong value for college, work, reading, media, and a flexible 2-in-1 setup. Not the best value if gaming performance is your main priority.",
    chatPlaceholder: "Worth it for school/work value, not serious gaming.",
    steps: [
      "Checking what $599 buys here",
      "Weighing RAM, storage, touchscreen, and size",
      "Comparing the gaming tradeoff",
      "Looking at buyer value signals",
      "Separating good value from wrong fit",
      "Building the value assessment",
    ],
    specsTitle: "Value scorecard",
    specs: [
      { key: "price", label: "Price", value: "$599", tone: "positive" },
      { key: "ram", label: "RAM", value: "16 GB", tone: "positive" },
      { key: "storage", label: "Storage", value: "512 GB", tone: "positive" },
      { key: "touch", label: "2-in-1 touch", value: "Included", tone: "positive" },
      { key: "gaming", label: "Gaming", value: "Limited", tone: "negative" },
      { key: "verdict", label: "Best value", value: "Work + school", tone: "positive" },
    ],
    specSummaries: {
      price: {
        title: "Fair price",
        text:
          "$599 is compelling for a 16-inch 2-in-1 with 16GB RAM and 512GB SSD. The value is strongest when productivity matters more than gaming.",
      },
      ram: gamingSpecSummaries.ram,
      storage: gamingSpecSummaries.storage,
      touch: {
        title: "Feature value",
        text:
          "The touchscreen and convertible hinge add practical value for notes, reading, media, and flexible desk setups.",
      },
      gaming: gamingSpecSummaries.graphics,
      verdict: {
        title: "Right fit",
        text:
          "It is worth the price for college, work, and casual gaming. It is not worth choosing over a gaming laptop if the main goal is Fortnite, AAA games, or high settings.",
      },
    },
    defaultSpecKey: "price",
    alternativesTitle: "Value alternatives",
    alternativesSubtitle: "Other ways to spend around this budget",
    reviewMode: "valueFilters",
    reviewTitle: "Review intelligence",
    reviewTitleTag: "AI summarized",
    reviews: {
      summary:
        "Reviews support the price story: people praise everyday performance and value. Gaming praise is usually about lighter games, not high-end performance.",
      snippets: [
        {
          stars: "★★★★★",
          rating: "5.0",
          name: "Nina P.",
          date: "Apr 4, 2026",
          datetime: "2026-04-04",
          text: "For the price, the memory, storage, and touchscreen made it feel like a strong buy.",
        },
        {
          stars: "★★★★☆",
          rating: "4.0",
          name: "Priya S.",
          date: "Feb 9, 2026",
          datetime: "2026-02-09",
          text: "Great value laptop, but not the one I would buy for high settings gaming.",
        },
      ],
    },
    reviewFilters: {
      all: {
        summary:
          "Reviews support the price story: people praise everyday performance and value. Gaming praise is usually about lighter games, not high-end performance.",
        snippets: [
          {
            stars: "★★★★★",
            rating: "5.0",
            name: "Nina P.",
            date: "Apr 4, 2026",
            datetime: "2026-04-04",
            text: "For the price, memory and touchscreen make it feel like a strong buy.",
          },
          {
            stars: "★★★★☆",
            rating: "4.0",
            name: "Priya S.",
            date: "Feb 9, 2026",
            datetime: "2026-02-09",
            text: "Great everyday laptop. I would buy something else for serious gaming.",
          },
        ],
      },
      value: {
        summary:
          "Value-focused reviews point to the same pattern: buyers feel the 16GB memory, 512GB storage, and touchscreen make the $599 price feel practical for everyday use.",
        snippets: [
          {
            stars: "★★★★★",
            rating: "5.0",
            name: "Nina P.",
            date: "Apr 4, 2026",
            datetime: "2026-04-04",
            text: "For the price, memory and touchscreen make it feel like a strong buy.",
          },
          {
            stars: "★★★★☆",
            rating: "4.0",
            name: "Evan L.",
            date: "Mar 5, 2026",
            datetime: "2026-03-05",
            text: "The specs are better than I expected at this price. It feels like a good all-around laptop.",
          },
        ],
      },
      school: {
        summary:
          "School and work reviews are the strongest signal. Customers describe it as smooth for homework, docs, video calls, streaming, and carrying one flexible machine around.",
        snippets: [
          {
            stars: "★★★★★",
            rating: "5.0",
            name: "Jordan M.",
            date: "Jan 27, 2026",
            datetime: "2026-01-27",
            text: "The 16GB memory helps a lot. I use it for school, streaming, and lighter games with a controller.",
          },
          {
            stars: "★★★★★",
            rating: "5.0",
            name: "Nina P.",
            date: "Apr 4, 2026",
            datetime: "2026-04-04",
            text: "Great value for school and work. The touchscreen feels more useful than I expected.",
          },
        ],
      },
      gaming: {
        summary:
          "Gaming-related reviews are more cautious. People are fine with lighter games and cloud gaming, but they call out that serious gaming needs dedicated graphics.",
        snippets: [
          {
            stars: "★★★★☆",
            rating: "4.0",
            name: "Priya S.",
            date: "Feb 9, 2026",
            datetime: "2026-02-09",
            text: "Great everyday laptop. I would buy something else for serious gaming.",
          },
          {
            stars: "★★★☆☆",
            rating: "3.0",
            name: "Ben K.",
            date: "Nov 30, 2025",
            datetime: "2025-11-30",
            text: "Great work laptop, but the integrated graphics are the limit. I would look elsewhere for serious gaming.",
          },
        ],
      },
    },
    showCompare: true,
  },
  decisionSummary: {
    key: "decisionSummary",
    tag: "Decision",
    verdictTitle: "Should You Buy It?",
    verdictSummary:
      "Buy it if school, work, notes, travel, and casual gaming are the priority. Skip it if the laptop needs to be a serious gaming machine.",
    chatPlaceholder: "Buy it for work/school first, gaming second.",
    steps: [
      "Turning the tradeoffs into a decision",
      "Checking who this laptop is best for",
      "Checking who should skip it",
      "Reviewing price and gaming alternatives",
      "Looking for the cleanest recommendation",
      "Building the decision summary",
    ],
    specsTitle: "Decision checks",
    specs: [
      { key: "buy", label: "Buy if", value: "School/work", tone: "positive" },
      { key: "skip", label: "Skip if", value: "Serious gaming", tone: "negative" },
      { key: "maybe", label: "Maybe if", value: "Casual games", tone: "neutral" },
      { key: "value", label: "Value", value: "Strong", tone: "positive" },
      { key: "future", label: "Future-proof", value: "Mixed", tone: "neutral" },
      { key: "answer", label: "Answer", value: "Yes, with caveat", tone: "positive" },
    ],
    specSummaries: {
      buy: {
        title: "Buy for school",
        text:
          "This is a good buy if the main job is notes, homework, video calls, browsing, documents, streaming, and casual games.",
      },
      skip: gamingSpecSummaries.aaa,
      maybe: gamingSpecSummaries.tier,
      value: {
        title: "Strong value",
        text:
          "The current price is strongest when you value school, work, 16GB RAM, 512GB SSD, and 2-in-1 flexibility more than dedicated gaming power.",
      },
      future: {
        title: "Mixed runway",
        text:
          "The RAM and storage are solid for everyday use, but the integrated graphics limit how well it ages for newer games.",
      },
      answer: {
        title: "Buy with caveat",
        text:
          "The clean recommendation is yes for work, school, and casual gaming. Choose a gaming laptop instead if game performance matters more than versatility.",
      },
    },
    defaultSpecKey: "answer",
    alternativesTitle: "Compare before deciding",
    alternativesSubtitle: "The main alternatives if gaming becomes the deciding factor",
    reviews: {
      summary:
        "The buyer evidence points to a clear decision: people like this laptop when they bought it for everyday value and flexibility, but gaming-focused buyers should compare dedicated-GPU options.",
      snippets: [
        {
          stars: "★★★★★",
          rating: "5.0",
          name: "Nina P.",
          date: "Apr 4, 2026",
          datetime: "2026-04-04",
          text: "Exactly what I needed for school and work. I would buy it again at this price.",
        },
        {
          stars: "★★★☆☆",
          rating: "3.0",
          name: "Ben K.",
          date: "Nov 30, 2025",
          datetime: "2025-11-30",
          text: "Great work laptop, but I would look elsewhere for serious gaming.",
        },
      ],
    },
    showCompare: true,
  },
};

if (gamingCompareButton) {
  gamingCompareButton.addEventListener("click", () => {
    const isOpening = gamingComparePanel.hidden;
    if (isOpening && !gamingComparePanel.innerHTML.trim()) {
      renderGamingComparisonTable();
    }
    gamingComparePanel.hidden = !isOpening;
    gamingCompareButton.classList.toggle("is-active", isOpening);
    gamingCompareButton.setAttribute("aria-expanded", String(isOpening));
    gamingCompareButton.textContent = isOpening ? "Hide comparison" : getCompareButtonLabel();
  });
}

document.querySelectorAll("[data-screen]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    showScreen(trigger.dataset.screen);
  });
  trigger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showScreen(trigger.dataset.screen);
    }
  });
});

document.querySelectorAll(".thumb").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".thumb").forEach((thumb) => thumb.classList.remove("is-selected"));
    button.classList.add("is-selected");
    heroImage.src = button.dataset.image;
  });
});

document.querySelectorAll(".fulfillment-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".fulfillment-card").forEach((item) => item.classList.remove("is-selected"));
    card.classList.add("is-selected");
    card.querySelector("input").checked = true;
  });
});

if (chatForm) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = chatInput.value.trim();
    if (!question) return;

    chatInput.blur();
    chatInput.placeholder = answerQuestion(question);
    chatInput.value = "";
  });
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("is-active", screen.id === screenId);
  });
  document.querySelector(".phone-page").scrollTo({ top: 0, behavior: "auto" });
  window.scrollTo({ top: 0, behavior: "auto" });
}

function getScenario(key = activeScenarioKey) {
  return scenarioContent[key] || scenarioContent.gamingFit;
}

function getCompareButtonLabel(scenario = getScenario()) {
  const labels = {
    betterGaming: "Compare under $900",
    collegeFit: "Compare student fit",
    valueAssessment: "Compare value",
    decisionSummary: "Compare before buying",
    gameCompatibility: "Compare game fit",
    gamingLimitation: "Compare GPU tradeoffs",
  };

  return labels[scenario.key] || "Compare gaming fit";
}

function detectGenerativeScenario(normalized) {
  if (normalized.includes("minecraft") || normalized.includes("fortnite")) {
    return "gameCompatibility";
  }

  if (normalized.includes("college") || normalized.includes("notes") || normalized.includes("homework")) {
    return "collegeFit";
  }

  if (
    (normalized.includes("main reason") || normalized.includes("not great") || normalized.includes("why")) &&
    (normalized.includes("gaming") || normalized.includes("game"))
  ) {
    return "gamingLimitation";
  }

  if (
    normalized.includes("better") &&
    normalized.includes("gaming") &&
    (normalized.includes("900") || normalized.includes("under") || normalized.includes("laptop"))
  ) {
    return "betterGaming";
  }

  if (
    normalized.includes("review") ||
    normalized.includes("reviews") ||
    normalized.includes("people say") ||
    normalized.includes("customers")
  ) {
    return "reviewIntelligence";
  }

  if (normalized.includes("worth") || normalized.includes("$599") || normalized.includes("599") || normalized.includes("value")) {
    return "valueAssessment";
  }

  if (normalized.includes("should i buy") || normalized.includes("buy this one") || normalized.includes("buy it")) {
    return "decisionSummary";
  }

  if (normalized.includes("gaming") || normalized.includes("game")) {
    return "gamingFit";
  }

  return null;
}

function answerQuestion(question) {
  const normalized = question.toLowerCase();
  const scenarioKey = detectGenerativeScenario(normalized);

  if (scenarioKey) {
    const scenario = getScenario(scenarioKey);
    startGenerativePDPTransition(scenarioKey);
    return `Generating ${scenario.verdictTitle.toLowerCase()}...`;
  }

  if (normalized.includes("ship") || normalized.includes("arrive") || normalized.includes("delivery")) {
    return "Shipping is free and the current PDP reference shows arrival today when ordered within the countdown window.";
  }

  if (normalized.includes("pickup")) {
    return "Pickup is shown as available nearby, with a same-day pickup window on the referenced PDP.";
  }

  if (normalized.includes("return")) {
    return "The item shows free 30-day returns, sold and shipped by Walmart.com.";
  }

  if (normalized.includes("battery")) {
    return "The listed battery life is 9 hours.";
  }

  if (normalized.includes("ram") || normalized.includes("memory")) {
    return "This configuration has 16GB RAM and a 512GB SSD.";
  }

  if (normalized.includes("screen") || normalized.includes("touch")) {
    return "It has a 16-inch WUXGA touchscreen and a 360-degree hinge for laptop, tent, stand, and tablet modes.";
  }

  if (normalized.includes("price") || normalized.includes("cost")) {
    return "The current referenced price is $599.00 when purchased online.";
  }

  return "This mobile PDP highlights media, AI features, specs, price, offers, fulfillment, seller details, returns, and reviews.";
}

function startGenerativePDPTransition(scenarioKey = "gamingFit") {
  const scenario = getScenario(scenarioKey);
  const steps = scenario.steps || generativeSteps;
  activeScenarioKey = scenario.key;
  clearGenerativeTransition();
  enterGenerativeTopMode();

  if (similarItemsCard) {
    similarItemsCard.hidden = true;
  }
  if (keyFeaturesCard) {
    keyFeaturesCard.hidden = true;
  }
  if (gamingAlternativesCard) {
    gamingAlternativesCard.hidden = false;
  }
  if (gamingComparePanel) {
    gamingComparePanel.hidden = true;
  }
  if (gamingCompareButton) {
    gamingCompareButton.hidden = true;
    gamingCompareButton.classList.remove("is-active");
    gamingCompareButton.setAttribute("aria-expanded", "false");
    gamingCompareButton.textContent = getCompareButtonLabel(scenario);
  }

  const gamingVerdict = ensureGamingVerdict();
  const compactProductSummary = ensureCompactProductSummary();
  gamingVerdict.classList.add("is-generating");
  gamingVerdict.querySelector("h2").textContent = scenario.verdictTitle;
  gamingVerdict.querySelector("p").textContent = `Building ${scenario.verdictTitle.toLowerCase()} from product specs, customer reviews, and comparable laptops.`;

  const generationProcess = ensureGenerationProcess();

  if (productMedia?.parentElement) {
    productMedia.parentElement.insertBefore(compactProductSummary, productMedia);
  }
  if (fulfillmentCard) {
    fulfillmentCard.insertAdjacentElement("afterend", gamingVerdict);
  } else {
    compactProductSummary.insertAdjacentElement("afterend", gamingVerdict);
  }
  gamingVerdict.insertAdjacentElement("afterend", generationProcess);
  generationProcess.insertAdjacentElement("afterend", specsCard);
  specsCard.insertAdjacentElement("afterend", gamingAlternativesCard);
  gamingAlternativesCard.insertAdjacentElement("afterend", reviewsCard);

  renderGenerationStepState(0, steps);
  renderGenerativeSkeletons(scenario);

  const anchorToGeneration = () => {
    const anchorTop = Math.max(compactProductSummary.offsetTop - 8, 0);
    window.scrollTo({ top: anchorTop, behavior: "smooth" });
  };

  requestAnimationFrame(anchorToGeneration);
  generationTimers.push(
    setTimeout(() => {
      anchorToGeneration();
    }, 380),
  );
  generationTimers.push(
    setTimeout(() => {
      anchorToGeneration();
    }, 880),
  );

  const stepDuration = 1100;
  const stepStartDelay = 620;

  steps.slice(1).forEach((_, stepIndex) => {
    const index = stepIndex + 1;
    generationTimers.push(
      setTimeout(() => {
        renderGenerationStepState(index, steps);
      }, stepStartDelay + index * stepDuration),
    );
  });

  generationTimers.push(
    setTimeout(() => {
      generationProcess.classList.add("is-complete");
      generationTimers.push(
        setTimeout(() => {
          applyScenarioPDP(scenario.key);
        }, 180),
      );
    }, stepStartDelay + steps.length * stepDuration + 260),
  );
}

function clearGenerativeTransition() {
  generationTimers.forEach((timer) => clearTimeout(timer));
  generationTimers = [];
  clearTimeout(reviewLoadTimer);
  clearTimeout(reviewStreamTimer);
  document.querySelector("#generativeProcess")?.remove();
}

function enterGenerativeTopMode() {
  if (!walmartScreen) {
    return;
  }

  walmartScreen.classList.add("is-generative");
  syncScenarioClass(activeScenarioKey);
  setProductDetailsExpanded(false);
}

function syncScenarioClass(scenarioKey = activeScenarioKey) {
  if (!walmartScreen) {
    return;
  }

  Array.from(walmartScreen.classList)
    .filter((className) => className.startsWith("scenario-"))
    .forEach((className) => walmartScreen.classList.remove(className));
  walmartScreen.classList.add(`scenario-${getScenario(scenarioKey).key}`);
}

function ensureCompactProductSummary() {
  let compactSummary = document.querySelector("#compactProductSummary");

  if (!compactSummary) {
    compactSummary = document.createElement("section");
    compactSummary.className = "compact-product-summary";
    compactSummary.id = "compactProductSummary";
    compactSummary.setAttribute("aria-label", "Collapsed product details");
    compactSummary.innerHTML = `
      <span class="compact-product-image" aria-hidden="true">
        <img
          src="https://i5.walmartimages.com/seo/Lenovo-IdeaPad-5i-16-Touchscreen-2-in-1-Laptop-Intel-Core-5-120U-16GB-512-SSD-83DU004VUS_54648de7-27d1-436e-9045-1eb6651efb94.0a7d381af4aaf8053fb031f2405c3897.jpeg?odnBg=FFFFFF&odnHeight=160&odnWidth=160"
          alt=""
        />
      </span>
      <div class="compact-product-copy">
        <span>Viewing this item</span>
        <h2>Lenovo IdeaPad 5i 2-in-1 16&quot;</h2>
        <p>$599.00 · arrives May 5-7 · Free</p>
      </div>
      <button class="compact-product-toggle" id="compactProductToggle" type="button" aria-expanded="false">
        Details
      </button>
    `;

    compactSummary.querySelector("#compactProductToggle").addEventListener("click", () => {
      setProductDetailsExpanded(!walmartScreen.classList.contains("is-product-expanded"));
    });
  }

  return compactSummary;
}

function setProductDetailsExpanded(isExpanded) {
  if (!walmartScreen) {
    return;
  }

  walmartScreen.classList.toggle("is-product-expanded", isExpanded);
  const toggle = document.querySelector("#compactProductToggle");
  const compactSummary = document.querySelector("#compactProductSummary");

  if (toggle) {
    toggle.textContent = isExpanded ? "Hide" : "Details";
    toggle.setAttribute("aria-expanded", String(isExpanded));
  }

  if (compactSummary) {
    compactSummary.classList.toggle("is-expanded", isExpanded);
  }
}

function ensureGenerationProcess() {
  let generationProcess = document.querySelector("#generativeProcess");

  if (!generationProcess) {
    generationProcess = document.createElement("section");
    generationProcess.className = "generative-process";
    generationProcess.id = "generativeProcess";
    generationProcess.setAttribute("aria-label", "Generating PDP");
  }

  return generationProcess;
}

function renderGenerationStepState(activeIndex, steps = getScenario().steps || generativeSteps) {
  const generationProcess = document.querySelector("#generativeProcess");

  if (!generationProcess) {
    return;
  }

  const step = steps[activeIndex] || steps[steps.length - 1];

  generationProcess.innerHTML = `
    <div class="generative-status-line" aria-live="polite">
      <span class="generative-status-dot" aria-hidden="true"></span>
      <p>
        <span>${step}</span>
        <span class="typing-dots" aria-hidden="true"><i></i><i></i><i></i></span>
      </p>
    </div>
  `;
}

function renderGenerativeSkeletons(scenario = getScenario()) {
  const specsLink = specsCard?.querySelector(".text-link");
  const currentReviewsPill = document.querySelector("#reviewsPill");

  specsCard.classList.add("is-contextual", "is-generating");
  specsTitle.textContent = scenario.specsTitle || "Specs";
  specsList.innerHTML = Array.from({ length: 6 })
    .map(
      () => `
        <div class="skeleton-spec-tile" aria-hidden="true">
          <span></span>
          <span></span>
        </div>
      `,
    )
    .join("");
  document.querySelector("#gamingSpecSummary")?.remove();
  if (specsLink) {
    specsLink.hidden = true;
  }

  gamingAlternativesCard.classList.add("is-contextual", "is-generating");
  setAlternativesHeader(scenario);
  gamingProductCarousel.innerHTML = Array.from({ length: 3 })
    .map(
      () => `
        <article class="gaming-product-card skeleton-product-card" aria-hidden="true">
          <div class="skeleton-product-image"></div>
          <div class="skeleton-product-body">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </article>
      `,
    )
    .join("");

  reviewsCard.classList.add("is-contextual", "is-generating");
  reviewsTitle.textContent = "Customer reviews";
  if (currentReviewsPill) {
    currentReviewsPill.outerHTML = `
      <div class="skeleton-chip-row" id="reviewsPill" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
    `;
  }
  reviewsList.classList.add("gaming-review-content");
  reviewsList.innerHTML = `
    <li class="gaming-review-summary skeleton-summary" aria-label="Loading review summary">
      <span></span><span></span><span></span><span></span>
    </li>
    <li class="review-snippet-carousel skeleton-carousel" aria-label="Loading review snippets">
      <article></article><article></article>
    </li>
  `;
}

function applyGamingPDP() {
  applyScenarioPDP("gamingFit");
}

function applyScenarioPDP(scenarioKey = activeScenarioKey) {
  const scenario = getScenario(scenarioKey);
  activeScenarioKey = scenario.key;
  clearGenerativeTransition();
  enterGenerativeTopMode();

  if (similarItemsCard) {
    similarItemsCard.hidden = true;
  }
  if (keyFeaturesCard) {
    keyFeaturesCard.hidden = true;
  }
  if (gamingAlternativesCard) {
    gamingAlternativesCard.hidden = false;
  }
  if (gamingComparePanel) {
    gamingComparePanel.hidden = true;
    gamingComparePanel.innerHTML = "";
  }

  const compactProductSummary = ensureCompactProductSummary();
  const gamingVerdict = ensureGamingVerdict();

  if (productMedia?.parentElement) {
    productMedia.parentElement.insertBefore(compactProductSummary, productMedia);
  }
  if (fulfillmentCard) {
    fulfillmentCard.insertAdjacentElement("afterend", gamingVerdict);
  } else {
    compactProductSummary.insertAdjacentElement("afterend", gamingVerdict);
  }

  orderScenarioSections(scenario, gamingVerdict);
  gamingVerdict.classList.remove("is-generating");
  gamingVerdict.querySelector("h2").textContent = scenario.verdictTitle;
  gamingVerdict.querySelector("p").textContent = scenario.verdictSummary;

  if (chatInput) {
    chatInput.placeholder = scenario.chatPlaceholder || "Ask about this item...";
  }

  setContextTags(scenario);
  renderScenarioSpecs(scenario);
  renderScenarioAlternatives(scenario);
  renderScenarioReviews(scenario);

  if (gamingCompareButton) {
    gamingCompareButton.hidden = !scenario.showCompare;
    gamingCompareButton.classList.remove("is-active");
    gamingCompareButton.setAttribute("aria-expanded", "false");
    gamingCompareButton.textContent = getCompareButtonLabel(scenario);
  }

  [specsList, gamingProductCarousel, reviewsList].forEach((element) => {
    element?.closest(".card")?.classList.add("is-contextual");
  });
}

function orderScenarioSections(scenario, verdict) {
  if (!verdict || !specsCard || !reviewsCard || !gamingAlternativesCard) {
    return;
  }

  if (scenario.primary === "reviews") {
    verdict.insertAdjacentElement("afterend", reviewsCard);
    reviewsCard.insertAdjacentElement("afterend", specsCard);
    specsCard.insertAdjacentElement("afterend", gamingAlternativesCard);
    return;
  }

  if (scenario.primary === "alternatives") {
    verdict.insertAdjacentElement("afterend", gamingAlternativesCard);
    gamingAlternativesCard.insertAdjacentElement("afterend", specsCard);
    specsCard.insertAdjacentElement("afterend", reviewsCard);
    return;
  }

  verdict.insertAdjacentElement("afterend", specsCard);
  specsCard.insertAdjacentElement("afterend", gamingAlternativesCard);
  gamingAlternativesCard.insertAdjacentElement("afterend", reviewsCard);
}

function setContextTags(scenario) {
  const tag = scenario.tag || "AI";
  const alternativeTitle = gamingAlternativesCard?.querySelector(".section-title h2");

  [specsTitle, reviewsTitle, alternativeTitle].forEach((title) => {
    title?.setAttribute("data-context-tag", tag);
  });
}

function renderScenarioSpecs(scenario) {
  specsCard.classList.remove("is-generating");
  const specsLink = specsCard.querySelector(".text-link");
  if (specsLink) {
    specsLink.hidden = false;
  }

  specsTitle.textContent = scenario.specsTitle || "Specs";
  specsList.innerHTML = scenario.specs
    .map(
      (item) => `
        <div class="spec-${item.tone}" role="button" tabindex="0" data-spec-key="${item.key}" aria-pressed="false">
          <dt>${item.label}</dt>
          <dd>${item.value}</dd>
        </div>
      `,
    )
    .join("");

  ensureGamingSpecSummary();
  setScenarioSpecSummary(scenario.defaultSpecKey || scenario.specs[0]?.key, scenario);
  bindScenarioSpecTiles(scenario);
}

function setScenarioSpecSummary(key, scenario = getScenario()) {
  const summary = scenario.specSummaries?.[key];
  const summaryElement = document.querySelector("#gamingSpecSummary");

  if (!summary || !summaryElement) {
    return;
  }

  specsList.querySelectorAll("[data-spec-key]").forEach((tile) => {
    tile.classList.toggle("is-selected", tile.dataset.specKey === key);
    tile.setAttribute("aria-pressed", String(tile.dataset.specKey === key));
  });

  summaryElement.innerHTML = `
    <h3>${summary.title}</h3>
    <p>${summary.text}</p>
  `;
}

function bindScenarioSpecTiles(scenario = getScenario()) {
  specsList.querySelectorAll("[data-spec-key]").forEach((tile) => {
    tile.addEventListener("click", () => setScenarioSpecSummary(tile.dataset.specKey, scenario));
    tile.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setScenarioSpecSummary(tile.dataset.specKey, scenario);
      }
    });
  });
}

function renderScenarioAlternatives(scenario = getScenario()) {
  gamingAlternativesCard.hidden = false;
  gamingAlternativesCard.classList.remove("is-generating");
  setAlternativesHeader(scenario);
  renderGamingAlternatives(scenario);
}

function setAlternativesHeader(scenario = getScenario()) {
  const title = gamingAlternativesCard?.querySelector(".section-title h2");
  const subtitle = gamingAlternativesCard?.querySelector(".section-title p");

  if (title) {
    title.textContent = scenario.alternativesTitle || "Other options";
    title.setAttribute("data-context-tag", scenario.tag || "AI");
  }
  if (subtitle) {
    subtitle.textContent = scenario.alternativesSubtitle || "";
  }
}

function renderScenarioReviews(scenario = getScenario()) {
  reviewsCard.classList.remove("is-generating");
  reviewsCard.classList.toggle("is-review-intelligence", scenario.reviewMode === "valueFilters");
  reviewsTitle.textContent = scenario.reviewTitle || "Customer reviews";
  reviewsTitle.setAttribute("data-context-tag", scenario.reviewTitleTag || scenario.tag || "AI");
  const reviewRating = reviewsCard.querySelector(".review-rating");
  if (reviewRating) {
    reviewRating.innerHTML =
      scenario.reviewMode === "valueFilters" ? "<span>★★★★☆</span><b>4.4</b>" : "<span>★★★★☆</span><b>(4.4)</b>";
  }
  reviewsList.classList.add("gaming-review-content");
  const currentReviewsPill = document.querySelector("#reviewsPill");

  if (scenario.reviewMode === "valueFilters") {
    if (currentReviewsPill) {
      currentReviewsPill.outerHTML = `
      <div class="review-filter-cloud value-review-filter-cloud" id="reviewsPill" aria-label="Review intelligence filters">
        <button class="review-chip is-value" data-scenario-review-filter="value" aria-pressed="false">${getReviewChipIcon("value")}Value</button>
        <button class="review-chip is-positive" data-scenario-review-filter="school" aria-pressed="false">${getReviewChipIcon("school")}School/work</button>
        <button class="review-chip is-negative" data-scenario-review-filter="gaming" aria-pressed="false">${getReviewChipIcon("gaming")}Gaming caveat</button>
      </div>
    `;
    }
    setScenarioReviewFilter("all", scenario);
    bindScenarioReviewFilters(scenario);
    return;
  }

  if (scenario.reviewMode === "gamingFilters") {
    if (currentReviewsPill) {
      currentReviewsPill.outerHTML = `
      <div class="review-filter-cloud" id="reviewsPill">
        <button class="review-chip is-positive" data-review-filter="casual">Casual gaming</button>
        <button class="review-chip is-neutral" data-review-filter="cloud">Cloud gaming</button>
        <button class="review-chip is-negative" data-review-filter="gpu">No gaming GPU</button>
      </div>
    `;
    }
    setGamingReviewFilter("all");
    bindGamingReviewFilters();
    return;
  }

  if (currentReviewsPill) {
    currentReviewsPill.outerHTML = `
    <span class="scenario-review-pill" id="reviewsPill">${scenario.tag || "AI"}</span>
  `;
  }
  renderGamingReviewContent(scenario.reviews || getScenario("reviewIntelligence").reviews);
}

function getReviewChipIcon(type) {
  const icons = {
    value: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.4 13.7 13.7 20.4a2 2 0 0 1-2.8 0L3.6 13.1a2 2 0 0 1-.6-1.4V5a2 2 0 0 1 2-2h6.7a2 2 0 0 1 1.4.6l7.3 7.3a2 2 0 0 1 0 2.8Z" />
        <path d="M7.5 7.5h.01" />
      </svg>
    `,
    school: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
        <path d="M4 7h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" />
        <path d="M4 12h16" />
        <path d="M10 12v2h4v-2" />
      </svg>
    `,
    gaming: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 10h.01" />
        <path d="M10 13H4.5a2.5 2.5 0 0 0-2.3 1.5L1 17.3A2.6 2.6 0 0 0 3.4 21c.8 0 1.5-.4 2-1l1.4-1.6h10.4l1.4 1.6c.5.6 1.2 1 2 1a2.6 2.6 0 0 0 2.4-3.7l-1.2-2.8a2.5 2.5 0 0 0-2.3-1.5H14" />
        <path d="M15 10h3" />
        <path d="M16.5 8.5v3" />
      </svg>
    `,
  };

  return icons[type] || "";
}

function bindScenarioReviewFilters(scenario = getScenario()) {
  document.querySelectorAll("[data-scenario-review-filter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      setScenarioReviewFilter(chip.dataset.scenarioReviewFilter, scenario, { animate: true });
    });
  });
}

function setScenarioReviewFilter(filter, scenario = getScenario(), options = {}) {
  const selectedFilter = filter === activeReviewFilter ? "all" : filter;
  activeReviewFilter = selectedFilter;

  document.querySelectorAll("[data-scenario-review-filter]").forEach((chip) => {
    const isSelected = chip.dataset.scenarioReviewFilter === selectedFilter;
    chip.classList.toggle("is-selected", isSelected);
    chip.setAttribute("aria-pressed", String(isSelected));
  });

  const selectedContent =
    scenario.reviewFilters?.[selectedFilter] || scenario.reviews || getScenario("reviewIntelligence").reviews;

  if (options.animate) {
    animateGamingReviewContent(selectedContent);
    return;
  }

  renderGamingReviewContent(selectedContent);
}

function ensureGamingVerdict() {
  let verdict = document.querySelector("#gamingVerdict");

  if (!verdict) {
    verdict = document.createElement("section");
    verdict.className = "gaming-verdict";
    verdict.id = "gamingVerdict";
    verdict.setAttribute("aria-label", "Gaming fit verdict");
    verdict.innerHTML = `
      <img src="./assets/stars.svg" alt="" aria-hidden="true" />
      <div class="verdict-copy">
        <div class="value-lens-meta" aria-hidden="true">
          <span>AI Value Lens</span>
          <span>Generated from specs + reviews</span>
        </div>
        <h2>Gaming Fit</h2>
        <p>Good for casual gaming and cloud gaming, but not recommended for newer AAA games or high graphics settings.</p>
        <div class="value-verdict-chips" aria-label="Value lens highlights">
          <span class="value-chip-positive">School: strong</span>
          <span class="value-chip-negative">Gaming: limited</span>
          <span class="value-chip-neutral">Touch: yes</span>
        </div>
      </div>
    `;
  }

  return verdict;
}

function ensureGamingSpecSummary() {
  if (!document.querySelector("#gamingSpecSummary")) {
    const summary = document.createElement("div");
    summary.className = "gaming-spec-summary";
    summary.id = "gamingSpecSummary";
    specsList.insertAdjacentElement("afterend", summary);
  }
}

function setGamingSpecSummary(key) {
  setScenarioSpecSummary(key, getScenario());
}

function bindGamingSpecTiles() {
  bindScenarioSpecTiles(getScenario());
}

function renderGamingAlternatives(scenario = getScenario()) {
  const products = scenario.products || gamingAlternativeProducts;

  gamingAlternativesCard.hidden = false;
  gamingProductCarousel.innerHTML = products
    .map(
      (item) => `
        <article class="gaming-product-card">
          <div class="gaming-product-image-well">
            <img src="${item.image}" alt="${item.title}" />
          </div>
          <div class="gaming-product-content">
            <span>${item.badge}</span>
            <h3>${item.title}</h3>
            <strong>${item.price}</strong>
            <p>${item.highlight}</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderGamingComparisonTable() {
  const products = [currentGamingComparison, ...gamingAlternativeProducts];
  const attributes = [
    ["fit", "Gaming fit"],
    ["graphics", "Graphics"],
    ["aaa", "AAA games"],
    ["portability", "Portability"],
    ["display", "Display"],
    ["value", "Price gap"],
  ];

  gamingComparePanel.innerHTML = `
    <div class="compare-table-scroll" role="region" aria-label="Gaming laptop comparison">
      <table class="compare-table">
        <thead>
          <tr>
            <th scope="col" aria-label="Comparison attributes"></th>
            ${products
              .map(
                (product, index) => `
                  <th scope="col" class="compare-product-heading">
                    ${index === 0 ? '<span class="viewing-label">Viewing this item</span>' : '<span class="viewing-label is-empty">Viewing this item</span>'}
                    <img src="${product.image}" alt="${product.shortName}" />
                    ${
                      product.isCurrent
                        ? '<span class="current-compare-chip">Current</span>'
                        : '<button class="add-compare-button" type="button">+ Add</button>'
                    }
                    <b>${product.price}</b>
                    <span class="compare-product-title">${product.title}</span>
                    <span class="compare-rating">★★★★☆ ${product.reviewCount}</span>
                  </th>
                `,
              )
              .join("")}
          </tr>
        </thead>
        <tbody>
          ${attributes
            .map(
              ([key, label]) => `
                <tr>
                  <th scope="row">${label}</th>
                  ${products
                    .map((product) => {
                      const value = product.values[key];
                      return `<td><span class="compare-value is-${value.tone}">${value.text}</span></td>`;
                    })
                    .join("")}
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function bindGamingReviewFilters() {
  document.querySelectorAll("[data-review-filter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("[data-review-filter]").forEach((item) => {
        item.classList.toggle("is-selected", item === chip);
      });
      setGamingReviewFilter(chip.dataset.reviewFilter, { animate: true });
    });
  });
}

function setGamingReviewFilter(filter, options = {}) {
  const reviewContent = {
    all: {
      summary:
        "Customers mostly talk about this laptop as a smooth everyday machine rather than a gaming laptop. The gaming-related feedback points toward casual games, cloud gaming, and older titles being reasonable, while graphics-heavy games are where expectations should stay modest.",
      snippets: [
        {
          stars: "★★★★☆",
          rating: "4.0",
          name: "Marco R.",
          date: "Mar 18, 2026",
          datetime: "2026-03-18",
          text: "Runs my work apps great and I can still play Minecraft and Game Pass cloud games after work without issues.",
        },
        {
          stars: "★★★★☆",
          rating: "4.0",
          name: "Priya S.",
          date: "Feb 9, 2026",
          datetime: "2026-02-09",
          text: "Good for casual gaming, but I would not buy it for high settings or newer AAA games because it is not a gaming laptop.",
        },
        {
          stars: "★★★★★",
          rating: "5.0",
          name: "Jordan M.",
          date: "Jan 27, 2026",
          datetime: "2026-01-27",
          text: "The 16GB memory helps a lot. I use it for school, streaming, and lighter games with a controller.",
        },
      ],
    },
    casual: {
      summary:
        "When customers mention gaming positively, they are usually talking about lighter games and casual play after work or school. The pattern is less about high frame rates and more about having a flexible laptop that can also handle simple games.",
      snippets: [
        {
          stars: "★★★★★",
          rating: "5.0",
          name: "Jordan M.",
          date: "Jan 27, 2026",
          datetime: "2026-01-27",
          text: "The 16GB memory helps a lot. I use it for school, streaming, and lighter games with a controller.",
        },
        {
          stars: "★★★★☆",
          rating: "4.0",
          name: "Marco R.",
          date: "Mar 18, 2026",
          datetime: "2026-03-18",
          text: "Runs my work apps great and I can still play Minecraft after work without issues.",
        },
      ],
    },
    cloud: {
      summary:
        "Cloud gaming comes up as the safest gaming path for this laptop. Customers who stream games care more about screen size, Wi-Fi stability, and comfort than raw graphics power.",
      snippets: [
        {
          stars: "★★★★☆",
          rating: "4.0",
          name: "Marco R.",
          date: "Mar 18, 2026",
          datetime: "2026-03-18",
          text: "Game Pass cloud games work well after work, and the screen is large enough that it feels comfortable.",
        },
        {
          stars: "★★★★☆",
          rating: "4.0",
          name: "Alyssa T.",
          date: "Dec 14, 2025",
          datetime: "2025-12-14",
          text: "I mostly stream games, so I wanted a good display and battery more than a gaming GPU. This worked for that.",
        },
      ],
    },
    gpu: {
      summary:
        "The negative gaming feedback centers on graphics expectations. Customers are clear that this is not the right pick for newer AAA games, high settings, or anyone expecting a dedicated gaming GPU.",
      snippets: [
        {
          stars: "★★★☆☆",
          rating: "3.0",
          name: "Priya S.",
          date: "Feb 9, 2026",
          datetime: "2026-02-09",
          text: "Good for casual gaming, but I would not buy it for high settings or newer AAA games because it is not a gaming laptop.",
        },
        {
          stars: "★★★☆☆",
          rating: "3.0",
          name: "Ben K.",
          date: "Nov 30, 2025",
          datetime: "2025-11-30",
          text: "Great work laptop, but the integrated graphics are the limit. I would look elsewhere for serious gaming.",
        },
      ],
    },
  };

  const selectedContent = reviewContent[filter] || reviewContent.all;
  if (options.animate) {
    animateGamingReviewContent(selectedContent);
    return;
  }

  renderGamingReviewContent(selectedContent);
}

function renderGamingReviewContent(selectedContent) {
  reviewsList.innerHTML = `
    <li class="gaming-review-summary">${selectedContent.summary}</li>
    ${renderReviewSnippetCarousel(selectedContent.snippets)}
  `;
}

function animateGamingReviewContent(selectedContent) {
  clearTimeout(reviewLoadTimer);
  clearTimeout(reviewStreamTimer);
  reviewsList.innerHTML = `
    <li class="gaming-review-summary skeleton-summary" aria-label="Loading review summary">
      <span></span><span></span><span></span><span></span>
    </li>
    <li class="review-snippet-carousel skeleton-carousel" aria-label="Loading review snippets">
      <article></article><article></article>
    </li>
  `;

  reviewLoadTimer = setTimeout(() => {
    reviewsList.innerHTML = `
      <li class="gaming-review-summary is-streaming"></li>
      <li class="review-snippet-carousel skeleton-carousel" aria-label="Loading review snippets">
        <article></article><article></article>
      </li>
    `;

    const summary = reviewsList.querySelector(".gaming-review-summary");
    const lines = splitIntoSummaryLines(selectedContent.summary);
    let index = 0;
    const streamNextLine = () => {
      if (index >= lines.length) {
        summary.classList.remove("is-streaming");
        reviewsList.querySelector(".review-snippet-carousel").outerHTML = renderReviewSnippetCarousel(
          selectedContent.snippets,
        );
        reviewLoadTimer = undefined;
        reviewStreamTimer = undefined;
        return;
      }
      const line = document.createElement("span");
      line.className = "summary-line";
      line.textContent = lines[index];
      summary.append(line);
      index += 1;
      reviewStreamTimer = setTimeout(streamNextLine, 420);
    };
    reviewStreamTimer = setTimeout(streamNextLine, 120);
  }, 520);
}

function splitIntoSummaryLines(summary) {
  const sentences = summary.match(/[^.!?]+[.!?]/g) || [summary];
  return sentences.map((sentence) => sentence.trim());
}

function renderReviewSnippetCarousel(snippets, isLoading = false) {
  return `
    <li class="review-snippet-carousel${isLoading ? " is-loading" : ""}" aria-label="Review snippets">
      ${snippets
        .map(
          (snippet) => `
            <article class="review-snippet-card">
              <div class="snippet-rating"><span class="snippet-stars">${snippet.stars}</span><strong>${snippet.rating}</strong></div>
              <h3>${snippet.name}</h3>
              <time datetime="${snippet.datetime}">${snippet.date}</time>
              <p>"${snippet.text}"</p>
            </article>
          `,
        )
        .join("")}
    </li>
  `;
}
