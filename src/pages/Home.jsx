import React, { useState, useEffect, useRef } from "react";
import { BiRightArrowAlt, BiDownArrow, BiCodeBlock, BiPalette, BiData, BiMobile, BiCloud, BiCheck, BiUserVoice, BiTrophy, BiImages, BiGroup, BiPlay, BiMap, BiPhone, BiEnvelope, BiCalendar, BiTime } from "react-icons/bi";
import { motion, useInView, useAnimation } from "framer-motion";
import img1 from '../assets/img/1.jpg'

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    phone2: '',
    course: '',
    time: ''
  });
  const videoRefs = useRef([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    // Videolarni boshqarish
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (playingVideo === index) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [playingVideo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone' || name === 'phone2') {
      // Telefon raqamini formatlash
      let formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 0) {
        formattedValue = formattedValue.match(/.{1,2}/g).join('-');
        if (value.length === 12) {
          formattedValue = `+998 (${formattedValue.slice(0, 2)})-${formattedValue.slice(3, 6)}-${formattedValue.slice(7)}`;
        }
      }
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Formani yuborish logikasi
    console.log('Form data:', formData);
    alert('Arizangiz qabul qilindi! Tez orada siz bilan bog\'lanamiz.');
    setFormData({
      name: '',
      age: '',
      phone: '',
      phone2: '',
      course: '',
      time: ''
    });
  };

  const features = [
    {
      icon: <BiCodeBlock className="text-3xl" />,
      title: "Dasturlash",
      description: "Zamonaviy dasturlash tillarini mukammal o'rganing"
    },
    {
      icon: <BiPalette className="text-3xl" />,
      title: "Dizayn",
      description: "Grafik va veb-dizayn sohasida professional bo'ling"
    },
    {
      icon: <BiData className="text-3xl" />,
      title: "Ma'lumotlar tahlili",
      description: "Data Science va sun'iy intellektni o'rganing"
    },
    {
      icon: <BiMobile className="text-3xl" />,
      title: "Mobil ilovalar",
      description: "iOS va Android platformalarida dasturlash"
    },
    {
      icon: <BiCloud className="text-3xl" />,
      title: "Bulut texnologiyalari",
      description: "Cloud computing va serverless arxitektura"
    }
  ];

  const stats = [
    { value: "1500+", label: "O'quvchilar" },
    { value: "50+", label: "O'qituvchilar" },
    { value: "14", label: "Yillik tajriba" },
  ];

  // Ustunliklarimiz bo'limi
  const advantages = [
    {
      icon: <BiGroup className="text-3xl" />,
      title: "Bepul coworking zona",
      description: "Darsdan tashqari vaqtlarda bepul ishlash uchun qulay joy"
    },
    {
      icon: <BiUserVoice className="text-3xl" />,
      title: "Yordamchi ustozlar",
      description: "Har bir guruhda yordamchi o'qituvchilar bilan mustahkam o'rganish"
    },
    {
      icon: <BiCalendar className="text-3xl" />,
      title: "Yakshanba kunlik tadbirlar",
      description: "Haftalik qo'shimcha darslar va qiziqarli tadbirlar"
    },
    {
      icon: <BiMap className="text-3xl" />,
      title: "Eng qulay lokatsiya",
      description: "Shahar markazida, transport bekati yonida joylashgan"
    },
    {
      icon: <BiTrophy className="text-3xl" />,
      title: "Xalqaro sertifikatlar",
      description: "Bitiruvchilarga xalqaro darajadagi sertifikatlar beramiz"
    },
    {
      icon: <BiTime className="text-3xl" />,
      title: "Moslashuvchan dars jadvali",
      description: "Ishlaydiganlar va o'quvchilar uchun qulay vaqtlar"
    }
  ];

  // Yangi bo'limlar uchun ma'lumotlar
  const teamMembers = [
    { 
      name: "Azizbek Ismoilov", 
      role: "Dasturlash bo'limi rahbari", 
      exp: "12 yillik tajriba",
      video: "/api/placeholder/400/300"
    },
    { 
      name: "Nigora Xasanova", 
      role: "Ingliz tili o'qituvchisi", 
      exp: "9 yillik tajriba",
      video: "/api/placeholder/400/300"
    },
    { 
      name: "Javohir Siddiqov", 
      role: "Matematika o'qituvchisi", 
      exp: "15 yillik tajriba",
      video: "/api/placeholder/400/300"
    },
    { 
      name: "Dilnoza Yusupova", 
      role: "Dizayn bo'limi rahbari", 
      exp: "10 yillik tajriba",
      video: "/api/placeholder/400/300"
    }
  ];

  const results = [
    { name: "Akmal Rajabov", score: "IELTS 7.5" },
    { name: "Dilnoza Xasanova", score: "IELTS 8.0" },
    { name: "Javohir To'rayev", score: "CEFR C1" },
    { name: "Gulnora Ismoilova", score: "CEFR B2" },
    { name: "Sanjar Olimov", score: "IELTS 7.0" },
    { name: "Farida Yusupova", score: "IELTS 8.5" }
  ];

  const achievementStats = [
    { value: "85%", label: "IELTS 7.0+ natija" },
    { value: "92%", label: "CEFR sertifikatlari" },
    { value: "78%", label: "Xalqaro universitetlar" },
    { value: "95%", label: "O'quvchilar mamnuniyati" }
  ];

  const galleryImages = [
    { id: 1, caption: "Dasturlash dars jarayoni" },
    { id: 2, caption: "Ingliz tili mashg'uloti" },
    { id: 3, caption: "Bitiruvchilar marosimi" },
    { id: 4, caption: "Xalqaro hamkorlar" },
    { id: 5, caption: "Yutuqli o'quvchilar" },
    { id: 6, caption: "Zamonaviy darsxonalar" }
  ];

  const courses = [
    "Dasturlash foundation",
    "Web dasturlash",
    "Mobil dasturlash",
    "Grafik dizayn",
    "IELTS tayyorlov",
    "Matematika",
    "Ingliz tili",
    "Data Science"
  ];

  const timeSlots = [
    "Ertalab (9:00 - 11:00)",
    "Kunduzi (12:00 - 14:00)",
    "Kunduzi (14:00 - 16:00)",
    "Kechki (16:00 - 18:00)",
    "Kechki (18:00 - 20:00)"
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Minimalistic with centered text */}
      <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-gray-900 to-black py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-red-800 opacity-20"
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 30 - 15],
                x: [0, Math.random() * 30 - 15],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Kelajakni <span className="text-yellow-400">qurishni</span> boshlang
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Zamonaviy kasblarni o'rganing, do'stlar ortingiz va martabangizni oshiring. 
              Biz sizga eng yaxshi o'quv muhitini taqdim etamiz.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 justify-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <button className="py-4 px-8 bg-red-700 text-white rounded-xl font-medium flex items-center gap-2 transition-all duration-300 hover:bg-red-800 hover:shadow-lg hover:shadow-red-700/30">
                <span>Biz bilan bog'laning</span>
                <BiRightArrowAlt size={20} />
              </button>
              <button className="py-4 px-8 bg-transparent text-white border border-yellow-400 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 hover:bg-yellow-400/10 hover:shadow-lg hover:shadow-yellow-400/20">
                <span>Maktabimiz</span>
              </button>
            </motion.div>

            <motion.div 
              className="animate-bounce mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            >
              <BiDownArrow className="text-yellow-400 text-2xl" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section 
        className="py-16 bg-gray-900"
        ref={ref}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        initial="hidden"
        animate={controls}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700"
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-yellow-400 mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Advantages Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ustunliklarimiz</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Nega aynan bizni tanlashingiz kerak?
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-700 backdrop-blur-sm bg-opacity-70"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.03,
                  backgroundColor: "rgba(55, 65, 81, 0.8)",
                  transition: { duration: 0.2 }
                }}
              >
                <div className="w-16 h-16 bg-red-700 rounded-2xl flex items-center justify-center mb-4 text-white">
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{advantage.title}</h3>
                <p className="text-gray-300">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Bizning kurslarimiz</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Zamonaviy kasblarni o'rganing va kelajagingizni yarating
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-700 backdrop-blur-sm bg-opacity-70"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setActiveFeature(index)}
                whileHover={{ 
                  scale: 1.03,
                  backgroundColor: "rgba(55, 65, 81, 0.8)",
                  transition: { duration: 0.2 }
                }}
              >
                <div className="w-16 h-16 bg-red-700 rounded-2xl flex items-center justify-center mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
                <button className="mt-6 text-yellow-400 font-medium flex items-center gap-2 hover:gap-3 transition-all duration-300">
                  <span>Batafsil</span>
                  <BiRightArrowAlt />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with Videos */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center justify-center p-4 bg-red-700 rounded-full mb-4">
              <BiGroup className="text-3xl text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Bizning Jamoa</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Tajribali o'qituvchilarimiz bilan tanishing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 backdrop-blur-sm bg-opacity-70"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                onHoverStart={() => setPlayingVideo(index)}
                onHoverEnd={() => setPlayingVideo(null)}
              >
                <div className="relative aspect-video overflow-hidden bg-gray-700">
                  <video 
                    ref={el => videoRefs.current[index] = el}
                    src={member.video}
                    muted
                    loop
                    className="w-full h-full object-cover"
                  />
                  {playingVideo !== index && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                      <BiPlay className="text-4xl text-white" />
                    </div>
                  )}
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-yellow-400 mb-2">{member.role}</p>
                  <p className="text-gray-300">{member.exp}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center justify-center p-4 bg-yellow-400 rounded-full mb-4">
              <BiTrophy className="text-3xl text-gray-900" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Natijalarimiz</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              O'quvchilarimizning xalqaro sertifikatlardagi yutuqlari
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {results.map((result, index) => (
              <div className="">
                <img src="" alt="rasm" className="w-full h-[250px] rounded-t-2xl"/>
              <motion.div 
                key={index}
                className="bg-gradient-to-br from-gray-900 to-red-900 rounded-b-2xl p-6 text-center border border-gray-700"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
              >
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">{result.name}</h3>
                <div className="text-3xl font-bold text-white">{result.score}</div>
              </motion.div>
              </div>
            ))}
          </div>

          {/* Achievement Stats */}
        </div>
      </section>

      {/* Contact Section */}

      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center justify-center p-4 bg-yellow-400 rounded-full mb-4">
              <BiImages className="text-3xl text-gray-900" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Lavhalar</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              O'quv markazimiz hayotidan lavhalar
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div 
                key={index}
                className="relative h-64 rounded-2xl overflow-hidden border border-gray-700"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p>{image.caption}</p>
                </div>
                <div className="w-full h-full bg-gradient-to-br from-red-900 to-yellow-600 opacity-70"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center justify-center p-4 bg-red-700 rounded-full mb-4">
              <BiPhone className="text-3xl text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Biz bilan bog'laning</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Kursga yozilish uchun ariza qoldiring
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <motion.div 
              className="h-96 rounded-2xl overflow-hidden border border-gray-700"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
            >
              <div className="w-full bg-gradient-to-br from-red-900 to-yellow-600 opacity-70 flex items-center justify-center text-white">
              </div>
            </motion.div>

            {/* Form */}
            <motion.div 
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Ism sharifingiz</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Yoshingiz</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Telefon raqamingiz</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+998 (99)-999-99-99"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Qo'shimcha telefon</label>
                    <input
                      type="text"
                      name="phone2"
                      value={formData.phone2}
                      onChange={handleInputChange}
                      placeholder="+998 (99)-999-99-99"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Kursni tanlang</label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    >
                      <option value="">Kursni tanlang</option>
                      {courses.map((course, index) => (
                        <option key={index} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Qulay vaqt</label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    >
                      <option value="">Vaqtni tanlang</option>
                      {timeSlots.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-red-700 text-white rounded-xl font-bold text-lg mt-8 hover:bg-red-800 transition-colors duration-300"
                >
                  Ariza jo'natish
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}

    </div>
  );
};

export default Home;