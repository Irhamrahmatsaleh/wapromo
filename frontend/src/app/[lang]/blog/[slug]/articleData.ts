export interface ArticleSection {
  title: string;
  paragraphs: string[];
}

export interface ArticleFullData {
  slug: string;
  category: string;
  readTime: string;
  date: string;
  title: string;
  lead: string;
  image: string;
  quote: string;
  caseStudyTitle: string;
  caseStudyStory: string;
  keyTakeaways: string[];
  sections: ArticleSection[];
  ctaHeading: string;
  ctaSubheading: string;
  ctaButton: string;
}

export const articleDatabase: Record<string, Record<string, ArticleFullData>> = {
  // ==========================================
  // ID - BAHASA INDONESIA
  // ==========================================
  id: {
    "cara-mengatur-10-cs-whatsapp-tanpa-tabrakan": {
      slug: "cara-mengatur-10-cs-whatsapp-tanpa-tabrakan",
      category: "Manajemen Tim",
      readTime: "4 menit baca",
      date: "20 Okt 2026",
      title: "Strategi Mengatur Tim CS WhatsApp Tanpa Tumpang-Tindih Pelanggan",
      lead: "Ciptakan lingkungan kerja CS yang tenang, harmonis, dan produktif. Simak bagaimana sistem pembagian chat atomik menjaga transparansi komisi serta kepuasan pelanggan secara maksimal.",
      image: "/images/blog/cs-team-harmony.webp",
      quote: "Ketika tim bekerja dalam keharmonisan dan tanpa kecemasan tumpang-tindih, setiap percakapan dengan pelanggan berubah menjadi hubungan berharga yang menghasilkan penjualan berulang.",
      caseStudyTitle: "Studi Kasus Nyata: Transformasi Toko Lumina Wear",
      caseStudyStory: "Sebelum menggunakan sistem terpusat, 6 staf CS Lumina Wear saling berebut membalas chat di ponsel masing-masing. Terjadi komplain pelanggan yang menerima harga berbeda dan suasana kerja tim tegang. Setelah beralih ke 1 nomor resmi WAPromo dengan fitur Atomic Chat Lock, waktu respon turun menjadi 45 detik, kepuasan pembeli mencapai 98.4%, dan omzet toko melonjak 3x lipat dalam 60 hari.",
      keyTakeaways: [
        "Satu nomor resmi WhatsApp dapat diakses 5 hingga 20 agen secara simultan tanpa konflik.",
        "Sistem Atomic Lock secara otomatis mengunci chat begitu dibuka oleh seorang staf, memberi tanda visual jelas bagi staf lain.",
        "Transparansi riwayat chat memudahkan evaluasi KPI serta pembagian komisi penjualan secara adil.",
        "Tim bekerja lebih rileks, bebas stres, dan pelanggan mendapatkan respon yang konsisten."
      ],
      sections: [
        {
          title: "Akar Masalah CS Menggunakan Banyak Ponsel Terpisah",
          paragraphs: [
            "Banyak pemilik bisnis online mengawali operasional dengan membelikan setiap staf CS ponsel fisik dan nomor kartu perdana masing-masing. Sekilas solusi ini tampak praktis, namun seiring bertambahnya jumlah pelanggan, kekacauan mulai muncul.",
            "Pelanggan sering menyimpan beberapa nomor sekaligus. Akibatnya, saat mereka mengirim pesan menanyakan stok barang, dua atau tiga CS merespon secara bersamaan dengan pendekatan yang berbeda. Situasi ini bukan hanya membuat pelanggan ragu, namun juga memicu perselisihan internal terkait siapa yang berhak atas komisi penjualan tersebut."
          ]
        },
        {
          title: "Kunci Emas: Sentralisasi 1 Nomor Bisnis & Kunci Atomik",
          paragraphs: [
            "Solusi paling elegan dan terbukti berhasil di ratusan brand modern adalah sentralisasi satu nomor resmi WhatsApp menggunakan Shared Team Inbox berbasis Cloud.",
            "Dengan teknologi Atomic Chat Locking, saat CS A membuka percakapan dari Ibu Rina, seketika layar staf lain menampilkan label ramah: 'Sedang dilayani oleh CS A'. Staf lain dapat dengan tenang melayani pembeli berikutnya tanpa ada waktu terbuang atau kecemasan menabrak obrolan rekan kerja.",
            "Hasilnya luar biasa: suasana kantor menjadi penuh senyum, tidak ada lagi perdebatan komisi, dan pembeli merasa dilayani oleh brand yang sangat profesional dan terorganisir dengan rapi."
          ]
        }
      ],
      ctaHeading: "Siap Mewujudkan Tim CS yang Rapi dan Kompak?",
      ctaSubheading: "Aktifkan uji coba gratis 14 hari WAPromo sekarang. Sambungkan 1 nomor toko Anda dan rasakan perbedaannya dalam hitungan menit.",
      ctaButton: "Coba Gratis"
    },
    "trik-closing-chat-jam-12-malam-asisten-ai": {
      slug: "trik-closing-chat-jam-12-malam-asisten-ai",
      category: "Otomasi Penjualan",
      readTime: "5 menit baca",
      date: "18 Okt 2026",
      title: "Strategi Toko Fashion Mengamankan Transaksi Malam Hari Menggunakan Asisten AI",
      lead: "Pernahkah Anda bangun di pagi hari dan mendapati puluhan notifikasi transfer bank berhasil masuk saat Anda tidur nyenyak? Simak rahasia asisten AI ramah yang mengamankan penjualan 24 jam nonstop.",
      image: "/images/blog/ai-midnight-sales.webp",
      quote: "Pelanggan yang berbelanja di tengah malam hanya menginginkan satu hal: kepastian instan dengan sapaan yang ramah. Saat asisten cerdas Anda memberikannya, penjualan tercipta dalam sekejap.",
      caseStudyTitle: "Kisah Sukses: Azzahra Boutique Meraih Omzet Tambahan Rp 45 Juta",
      caseStudyStory: "Azzahra Boutique sering kehilangan pembeli di atas jam 21.00 karena tim CS sudah beristirahat. Setelah mengaktifkan Asisten AI WAPromo yang dilatih membaca katalog baju dan hijab mereka, sistem berhasil melayani 42 transaksi lunas di malam hari setiap minggunya. Pemilik toko bangun setiap pagi dengan senyum lebar melihat saldo penjualan bertambah otomatis.",
      keyTakeaways: [
        "Lebih dari 35% pembeli online berbelanja santai antara jam 21.00 hingga 01.00 dini hari.",
        "Asisten AI ramah WAPromo dilatih menggunakan bahasa sopan khas Indonesia, bukan bot kaku.",
        "AI mampu memeriksa ketersediaan ukuran, warna, serta memberikan rincian total pembayaran QRIS/Transfer.",
        "Pemilik bisnis dan tim CS dapat tidur nyenyak dengan ketenangan bahwa setiap calon pembeli tetap disambut hangat."
      ],
      sections: [
        {
          title: "Mengapa Jam Istirahat Adalah Peluang Emas yang Kerap Terlewat",
          paragraphs: [
            "Banyak pemilik toko online tidak menyadari bahwa malam hari setelah jam kerja adalah waktu di mana calon pembeli memiliki waktu luang paling santai untuk memilih barang idaman mereka di kasur sambil rebahan.",
            "Ketika mereka bertanya: 'Kak, dress warna Sage size L masih ada?', respon dalam 30 detik pertama menentukan apakah mereka langsung transfer atau beralih mencari toko kompetitor yang buka."
          ]
        },
        {
          title: "Bukan Bot Kaku: Asisten AI Humanoid yang Menyapa Hangat",
          paragraphs: [
            "Asisten AI modern di WAPromo didesain khusus agar terdengar bersahabat, penuh empati, dan memahami konteks katalog Anda. Asisten dapat merekomendasikan produk senada, menghitungkan ongkos kirim, dan mengonfirmasi alamat pembeli secara presisi.",
            "Keesokan paginya saat staf CS Anda masuk kantor, mereka tinggal mencetak resi pengiriman untuk orderan yang sudah lunas terbayar. Efisiensi luar biasa yang membuat seluruh tim bahagia dan bertenaga."
          ]
        }
      ],
      ctaHeading: "Jadikan Toko Anda Menghasilkan Penjualan 24 Jam",
      ctaSubheading: "Latih asisten AI Anda dalam 5 menit dan nikmati aliran transaksi otomatis bahkan saat Anda sedang beristirahat.",
      ctaButton: "Coba Asisten AI Gratis"
    },
    "panduan-whatsapp-marketing-anti-banned": {
      slug: "panduan-whatsapp-marketing-anti-banned",
      category: "Keamanan Nomor",
      readTime: "6 menit baca",
      date: "15 Okt 2026",
      title: "Panduan Keamanan WhatsApp Bisnis: Mengoptimalkan Pengiriman Pesan Penawaran",
      lead: "Nomor bisnis Anda adalah aset utama yang sangat berharga. Pelajari bagaimana teknik jeda acak manusiawi, variasi pesan spintax, dan pemanasan nomor menjaga kelangsungan promosi toko Anda tetap aman selamanya.",
      image: "/images/blog/whatsapp-security-shield.webp",
      quote: "Pesan promosi terbaik bukanlah yang paling banyak dikirim secara membabi buta, melainkan pesan personal yang datang tepat waktu dengan nada yang bersahabat dan standar keamanan tinggi.",
      caseStudyTitle: "Praktek Terbaik: 50.000 Pesan Promo Terkirim dengan Zero Incident",
      caseStudyStory: "Sebuah brand retail perawatan kulit mengirimkan penawaran flash sale ke 50.000 kontak pelanggan setia dalam tempo 3 hari menggunakan WAPromo. Berkat fitur Human Jitter (jeda 8-15 detik) dan Spintax 4 tingkat, seluruh pesan mendarat sempurna tanpa ada peringatan atau pembatasan dari sistem WhatsApp.",
      keyTakeaways: [
        "Jeda acak (Human Jitter) 8-15 detik mensimulasikan ritme mengetik alami manusia secara presisi.",
        "Spintax variasi kalimat memastikan setiap gelembung pesan memiliki susunan kata unik yang lolos filter anti-spam.",
        "Tahapan pemanasan nomor (warmup) bertahap melindungi nomor baru dari deteksi anomali volume.",
        "Menyediakan opsi berhenti langganan yang sopan meningkatkan reputasi bisnis Anda di mata Meta."
      ],
      sections: [
        {
          title: "Bagaimana Sistem Keamanan WhatsApp Mendeteksi Aktivitas Massal",
          paragraphs: [
            "Algoritma keamanan WhatsApp dirancang untuk mendeteksi pengiriman pesan serentak yang tidak wajar—seperti mengirim 500 pesan dalam rentang 1 detik dengan susunan teks yang identik 100%.",
            "Banyak pengusaha terjebak memakai tools broadcast murahan tanpa jeda sehingga nomor berharga mereka langsung terkena penangguhan (banned). Inilah mengapa pemahaman tentang deliverability sangat penting bagi pertumbuhan jangka panjang toko Anda."
          ]
        },
        {
          title: "3 Pilar Proteksi Tingkat Tinggi WAPromo",
          paragraphs: [
            "Pertama, Human Jitter: WAPromo menyisipkan jeda bervariasi antara 8 hingga 15 detik di antara setiap penerima pesan, meniru perilaku staf toko yang sedang mengetik satu per satu.",
            "Kedua, Variasi Spintax Dinamis: Salam pembuka dan isi penawaran diramu secara otomatis (misalnya {Halo|Hai kak|Selamat siang}), menghasilkan ribuan kombinasi pesan yang unik dan ramah.",
            "Ketiga, Pemanasan Bertahap: Sistem membantu toko Anda meningkatkan kuota pengiriman harian secara aman dari 50, 200, hingga ribuan pesan per hari."
          ]
        }
      ],
      ctaHeading: "Lindungi Nomor WhatsApp Bisnis Anda Sekarang",
      ctaSubheading: "Kirim penawaran menarik kepada pelanggan setia Anda dengan rasa tenang dan jaminan keamanan pengiriman optimal.",
      ctaButton: "Gunakan Pengiriman Aman WAPromo"
    },
    "hemat-5-juta-sebulan-tanpa-biaya-per-pesan": {
      slug: "hemat-5-juta-sebulan-tanpa-biaya-per-pesan",
      category: "Efisiensi Biaya",
      readTime: "4 menit baca",
      date: "12 Okt 2026",
      title: "Analisis Finansial: Bagaimana Bisnis Menghemat Hingga Rp 5 Juta per Bulan Tanpa Tagihan Per Pesan",
      lead: "Ketahui bagaimana skema harga flat WAPromo membebaskan toko online dari kecemasan tagihan percakapan yang membengkak, membuka ruang profit yang jauh lebih sehat untuk ekspansi bisnis Anda.",
      image: "/images/blog/financial-freedom-growth.webp",
      quote: "Setiap rupiah yang berhasil Anda hemat dari tagihan operasional yang tidak perlu adalah profit bersih yang mempercepat pertumbuhan bisnis Anda.",
      caseStudyTitle: "Analisis Kasus Finansial Toko Perlengkapan Bayi",
      caseStudyStory: "Toko perlengkapan bayi dengan rata-rata 10.000 percakapan konsultasi per bulan sebelumnya membayar tagihan resmi per-pesan hingga Rp 6.200.000 setiap bulannya. Setelah beralih ke paket flat WAPromo, biaya komunikasi terpangkas menjadi flat terjangkau. Selisih dana Rp 5 jutaan dialihkan untuk menambah stok barang terlaris dan iklan berbayar.",
      keyTakeaways: [
        "Skema tagihan per-percakapan membebani bisnis saat melayani konsultasi mendalam atau komplain panjang.",
        "Model langganan flat bulanan WAPromo menjamin biaya operasional tetap stabil dan dapat diprediksi 100%.",
        "Tidak ada biaya tersembunyi untuk penambahan riwayat chat, media gambar, maupun pesan masuk pelanggan.",
        "Penghematan biaya langsung meningkatkan margin laba bersih toko Anda setiap bulan."
      ],
      sections: [
        {
          title: "Jebakan Biaya di Balik Model Pay-Per-Message",
          paragraphs: [
            "Pada platform WhatsApp BSP konvensional, setiap sesi percakapan dikenakan biaya antara Rp 450 hingga Rp 750 per sesi. Jika seorang pelanggan bertanya panjang tentang detail ukuran, garansi, dan meminta foto asli, Anda dikenakan tagihan berulang.",
            "Hal ini sering membuat staf CS merasa serba salah: ingin melayani pelanggan dengan ramah dan tuntas, namun khawatir melihat tagihan bulanan toko membengkak tanpa kendali."
          ]
        },
        {
          title: "Kenyamanan Bekerja dengan Model Flat Subscription",
          paragraphs: [
            "Di WAPromo, kami percaya komunikasi dengan pelanggan seharusnya menyenangkan dan bebas dari kekhawatiran finansial. Dengan model langganan bulanan flat yang terjangkau, Anda dapat mengirim ratusan ribu pesan konsultasi, update resi, dan penawaran tanpa dikenakan biaya sepeser pun per pesan.",
            "Penghematan jutaan rupiah setiap bulan ini memberi toko Anda keleluasaan modal untuk memperbesar stok produk, menambah bonus untuk staf CS, atau memperluas jangkauan pemasaran."
          ]
        }
      ],
      ctaHeading: "Nikmati Kebebasan Chat Tanpa Batas Hari Ini",
      ctaSubheading: "Tinggalkan kecemasan melihat lonjakan tagihan per pesan. Beralih ke WAPromo dan amankan arus kas bisnis Anda.",
      ctaButton: "Beralih ke Paket Flat WAPromo"
    }
  },

  // ==========================================
  // EN - ENGLISH
  // ==========================================
  en: {
    "cara-mengatur-10-cs-whatsapp-tanpa-tabrakan": {
      slug: "cara-mengatur-10-cs-whatsapp-tanpa-tabrakan",
      category: "Team Management",
      readTime: "4 min read",
      date: "Oct 20, 2026",
      title: "The Blueprint to Managing 10 Support Reps on 1 Number Without Collisions",
      lead: "Create a serene, harmonious, and highly productive customer service environment. Discover how atomic chat locking protects team commissions and delights buyers with instant responses.",
      image: "/images/blog/cs-team-harmony.webp",
      quote: "When customer service teams collaborate in peace without fear of stepping on each other's chats, every buyer interaction turns into a joyful, high-converting relationship.",
      caseStudyTitle: "Real-World Case Study: The Lumina Wear Transformation",
      caseStudyStory: "Before centralizing on WAPromo, 6 support reps at Lumina Wear fought over chats on separate handheld devices. Buyers received contradictory pricing and team morale plummeted. After consolidating onto 1 unified official line with WAPromo Atomic Locking, response times dropped to 45 seconds, buyer satisfaction hit 98.4%, and monthly revenue tripled within 60 days.",
      keyTakeaways: [
        "1 official WhatsApp number can be seamlessly accessed by 5 to 20 agents simultaneously.",
        "Atomic Chat Lock immediately tags active chats to prevent collision and double replies.",
        "Transparent chat history makes KPI tracking and fair commission distribution effortless.",
        "Support teams work relaxed and happy, delivering consistent service quality."
      ],
      sections: [
        {
          title: "The Root Problem with Multiple Fragmented Phones",
          paragraphs: [
            "Many fast-growing online brands attempt to scale by buying separate smartphones and SIM cards for each customer service representative. While this seems intuitive at first, it inevitably breeds customer confusion as volume grows.",
            "Buyers often message multiple reps simultaneously. When two reps respond with differing quotes or delivery estimates, buyer trust drops sharply, and internal arguments over commission inevitably flare up."
          ]
        },
        {
          title: "The Golden Key: Shared Cloud Inbox & Atomic Locking",
          paragraphs: [
            "The proven solution across modern top-tier brands is unifying customer communications onto a single official WhatsApp business profile backed by a central cloud inbox.",
            "With WAPromo Atomic Chat Locking, the moment Agent A clicks into a buyer's conversation, all other team members instantly see a gentle status: 'Handled by Agent A'. The team operates in perfect alignment, ensuring zero collisions and maximum productivity."
          ]
        }
      ],
      ctaHeading: "Ready to Transform Your Support Team Harmony?",
      ctaSubheading: "Start your 14-day full free trial on WAPromo. Connect your business number in 10 seconds and experience pure operational clarity.",
      ctaButton: "Start 10-Second Free Trial"
    },
    "trik-closing-chat-jam-12-malam-asisten-ai": {
      slug: "trik-closing-chat-jam-12-malam-asisten-ai",
      category: "Sales Automation",
      readTime: "5 min read",
      date: "Oct 18, 2026",
      title: "How Fashion Stores Close Midnight Orders Using 24/7 AI Assistants",
      lead: "Imagine waking up in the morning, taking a sip of fresh coffee, and discovering dozens of confirmed bank transfers completed at 1 AM and 2 AM while you were sound asleep.",
      image: "/images/blog/ai-midnight-sales.webp",
      quote: "Late-night shoppers have the highest buying intent of any demographic. When your AI assistant greets them politely with instant product answers, transactions close effortlessly.",
      caseStudyTitle: "Success Story: Azzahra Boutique Adds $3,000 in Monthly Revenue",
      caseStudyStory: "Azzahra Boutique previously missed out on late-night buyers after their support staff clocked out at 9 PM. By deploying WAPromo conversational AI tailored to their apparel catalog, the brand secured an average of 42 paid midnight transactions every week. The owner now wakes up every morning to a growing bank balance.",
      keyTakeaways: [
        "Over 35% of high-intent e-commerce purchases occur between 9 PM and 1 AM.",
        "WAPromo conversational AI is trained on natural, empathetic customer dialogues.",
        "The assistant verifies real-time stock availability, size specifications, and generates payment summaries.",
        "Your human staff sleep peacefully knowing every visitor is warmly welcomed."
      ],
      sections: [
        {
          title: "Why Late-Night Inquiries Are Pure Untapped Gold",
          paragraphs: [
            "Shoppers relaxing in bed at night have uninterrupted attention and high intent. When they ask about sizing or fabric details, prompt answers within 30 seconds determine whether they complete the purchase or click away to another shop.",
            "Leaving these night inquiries unanswered until 9 AM costs business owners up to 40% of their daily sales potential."
          ]
        },
        {
          title: "Humanoid Conversational AI That Converts With Warmth",
          paragraphs: [
            "WAPromo AI is not a clunky, rigid keyword bot. It understands nuances, responds empathetically, recommends complementary accessories, and formats clear checkout instructions.",
            "When your team logs on in the morning, their job is simply printing packing slips for fully paid orders. A joyful, friction-free workflow that supercharges revenue."
          ]
        }
      ],
      ctaHeading: "Turn Your WhatsApp Store into a 24/7 Revenue Engine",
      ctaSubheading: "Train your AI assistant in under 5 minutes and capture sales while you rest.",
      ctaButton: "Test AI Assistant For Free"
    },
    "panduan-whatsapp-marketing-anti-banned": {
      slug: "panduan-whatsapp-marketing-anti-banned",
      category: "Account Safety",
      readTime: "6 min read",
      date: "Oct 15, 2026",
      title: "The Complete WhatsApp Marketing Safety Guide: Avoid Spam Bans",
      lead: "Your official business number is your company's greatest digital asset. Learn how human jitter delays, dynamic spintax variations, and line warmup keep your marketing campaigns 100% safe.",
      image: "/images/blog/whatsapp-security-shield.webp",
      quote: "The best promotional campaign is not the one fired off in mass blasts, but personal, considerate messages delivered at the right tempo with ironclad safety standards.",
      caseStudyTitle: "Proven Benchmark: 50,000 Broadcasts with Zero Warnings",
      caseStudyStory: "A skincare retail brand broadcast flash sale invitations to 50,000 opted-in customers over 3 days using WAPromo. Powered by Human Jitter (8-15s random delays) and multi-level Spintax phrasing, all messages arrived safely with zero spam flags or delivery interruptions.",
      keyTakeaways: [
        "Human Jitter introduces 8-15 second random delays to emulate manual human typing rhythms.",
        "Dynamic Spintax phrasing generates unique text hashes for every individual chat bubble.",
        "Gradual warmup schedules protect new and growing numbers from sudden volume anomalies.",
        "Providing an easy 1-click unsubscribe option elevates your brand reputation and keeps Meta filters happy."
      ],
      sections: [
        {
          title: "How WhatsApp Anti-Spam Algorithms Analyze Outbound Messages",
          paragraphs: [
            "Modern messaging security systems analyze behavioral signatures. Blasting 500 identical message strings within a single second is an immediate giveaway of automated spam scripts.",
            "WAPromo was architected from the ground up to prevent these triggers by strictly adhering to human deliverability patterns."
          ]
        },
        {
          title: "The 3 Pillars of Safe Outreach Engineering",
          paragraphs: [
            "Pillar 1: Human Jitter randomized timing mimics authentic support staff pacing.",
            "Pillar 2: Dynamic Spintax permutations ({Hi|Hello|Good afternoon}) ensure every payload looks distinct in transit.",
            "Pillar 3: Structured volume scaling guides your line from 50 to hundreds of daily messages with total confidence."
          ]
        }
      ],
      ctaHeading: "Safeguard Your Business Number with Enterprise Deliverability",
      ctaSubheading: "Deliver exciting updates and re-engage loyal buyers with complete peace of mind.",
      ctaButton: "Send Safe Campaigns with WAPromo"
    },
    "hemat-5-juta-sebulan-tanpa-biaya-per-pesan": {
      slug: "hemat-5-juta-sebulan-tanpa-biaya-per-pesan",
      category: "Cost Efficiency",
      readTime: "4 min read",
      date: "Oct 12, 2026",
      title: "Financial Breakdown: How Online Brands Save $400/Mo Without Per-Message Fees",
      lead: "Discover how WAPromo's flat pricing model frees your balance sheet from per-conversation micro-billing traps, boosting healthy net profit margins for business expansion.",
      image: "/images/blog/financial-freedom-growth.webp",
      quote: "Every single dollar saved on unnecessary communication tariffs goes straight to your bottom-line profit, fueling rapid and sustainable business growth.",
      caseStudyTitle: "Baby Goods Retailer Financial Analysis",
      caseStudyStory: "An online retailer averaging 10,000 monthly customer consultations previously paid upwards of $450 every month on pay-per-conversation BSP fees. After switching to WAPromo flat subscription, their communication overhead was permanently stabilized, freeing up $400/month to invest in customer acquisition ads.",
      keyTakeaways: [
        "Pay-per-message billing penalizes businesses for providing caring, extensive customer consultations.",
        "WAPromo flat subscription delivers 100% predictable monthly operational budgeting.",
        "Zero hidden markups on inbound chat volume, media attachments, or customer replies.",
        "Immediate cost savings drop directly into your business's net profit margin."
      ],
      sections: [
        {
          title: "The Hidden Trap of Variable Per-Message Micro-Billing",
          paragraphs: [
            "On conventional BSP platforms, every single conversation window incurs hefty fees. When customers ask detailed questions about warranties or product specs, your bill climbs with every reply.",
            "Support staff become hesitant to engage in warm, relationship-building dialogues out of fear of inflating the owner's monthly communications invoice."
          ]
        },
        {
          title: "The Freedom and Clarity of Flat-Rate Subscriptions",
          paragraphs: [
            "At WAPromo, we believe connecting with your community should be liberating. Our flat pricing model lets you exchange hundreds of thousands of messages, updates, and customer inquiries with zero variable fees.",
            "Reinvest the thousands of dollars saved back into advertising, superior inventory, and rewarding your hard-working customer service team."
          ]
        }
      ],
      ctaHeading: "Experience Unlimited WhatsApp Freedom Today",
      ctaSubheading: "Eliminate unpredictable messaging invoices forever. Upgrade to WAPromo and protect your cash flow.",
      ctaButton: "Switch to WAPromo Flat Plan"
    }
  }
};

export function getArticleData(lang: string, slug: string): ArticleFullData | null {
  const langDb = articleDatabase[lang] || articleDatabase.id;
  if (langDb && langDb[slug]) {
    return langDb[slug];
  }

  // Cross-lingual fallback by slug or index
  const idDb = articleDatabase.id;
  const slugs = Object.keys(idDb);
  const foundSlug = slugs.find((s) => s === slug);
  if (foundSlug) {
    return idDb[foundSlug];
  }

  // Match by partial keyword
  if (slug.includes("cs") || slug.includes("atendente") || slug.includes("asesore") || slug.includes("muwazafin")) {
    return langDb["cara-mengatur-10-cs-whatsapp-tanpa-tabrakan"] || idDb["cara-mengatur-10-cs-whatsapp-tanpa-tabrakan"];
  }
  if (slug.includes("malam") || slug.includes("madrugada") || slug.includes("layl") || slug.includes("midnight")) {
    return langDb["trik-closing-chat-jam-12-malam-asisten-ai"] || idDb["trik-closing-chat-jam-12-malam-asisten-ai"];
  }
  if (slug.includes("anti-banned") || slug.includes("bloqueio") || slug.includes("bloqueo") || slug.includes("hazr")) {
    return langDb["panduan-whatsapp-marketing-anti-banned"] || idDb["panduan-whatsapp-marketing-anti-banned"];
  }
  if (slug.includes("hemat") || slug.includes("economizar") || slug.includes("ahorrar") || slug.includes("tawfir") || slug.includes("save")) {
    return langDb["hemat-5-juta-sebulan-tanpa-biaya-per-pesan"] || idDb["hemat-5-juta-sebulan-tanpa-biaya-per-pesan"];
  }

  return idDb["cara-mengatur-10-cs-whatsapp-tanpa-tabrakan"] || null;
}
