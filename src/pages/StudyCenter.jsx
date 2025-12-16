import React, { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { BookOpen, BrainCircuit, Globe2, GraduationCapIcon, icons, LightbulbIcon, RocketIcon, School2, TargetIcon, Users2 } from 'lucide-react'
import { FaArrowRight, FaBolt, FaCalendarCheck, FaChalkboardTeacher, FaChevronDown, FaMapMarkerAlt, FaPlay, FaRegStar, FaSchool, FaUserGraduate, FaUsers, FaPhone, FaEnvelope, FaFacebook, FaTelegram, FaInstagram } from 'react-icons/fa'
import { MdArrowRightAlt } from 'react-icons/md'
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import event from '../assets/img/event.jpg'
import "swiper/css";
import { BsBookshelf } from 'react-icons/bs';
import { LiaUserGraduateSolid } from 'react-icons/lia';
import { Link } from 'react-router';
import logo from '../assets/img/BZwhite.png'

const StudyCenter = () => {
  const { activeLanguage, getLanguageContent } = useLanguage();

  // Barcha tillar uchun tarjimalar
  const translations = {
    UZ: {
      hero: {
        title: "Yoshlar kelajagi uchun eng yaxshi yo'l",
        subtitle: "shu yerdan boshlanadi",
        description: `15yil ichida "Bilim Ziyo", 20 000 dan ortiq o'quvchilarga ta'lim berdi va 1000 ga yaqin natijalarni qo'lga kiritdi!`,
        registerBtn: "Ro'xatdan o'tish",
        schoolBtn: "Xususiy Maktab"
      },
      features: {
        title: "Nima uchun bizning o'quv markaz?",
        items: [
          {
            id: 1,
            icon: <FaRegStar size={40} />,
            title: "15 yillik tajriba",
          },
          {
            id: 2,
            icon: <FaUserGraduate size={40} />,
            title: "20 000 ga yaqin o'quvchi bizni tanlagan",
          },
          {
            id: 3,
            icon: <FaSchool size={40} />,
            title: "3 ta filialga ega",
          },
          {
            id: 4,
            icon: <FaUsers size={40} />,
            title: "50 dan ortiq tajribali va malakali ustozlar biz bilan",
          },
        ]
      },
      teachers: {
        title: "Bizning",
        subtitle: "jamoamiz:",
        yearsExp: "yillik tajriba",
        students: "o'quvchi o'qitdi"
      },
      results: {
        title: "Bizning",
        subtitle: "natijalarimiz:",
        ielts: "IELTS",
        cefr: "CEFR"
      },
      courses: {
        title: "Bizning",
        subtitle: "kurslarimiz:",
        details: {
          duration: "Davomiylik:",
          level: "Daraja:",
          format: "Format:",
          price: "Narx:",
          features: "Kurs imkoniyatlari:"
        },
        registerBtn: "kursiga yozilish"
      },
      faq: {
        title: "Ko'p so'raladigan",
        subtitle: "savollar:",
        items: [
          {
            q: "Nimaga aynan men bu dargohda o'qishim kerak?",
            a: "Barcha qulayliklar, sharoitlar, sifatli o'quv dasturi, tajribali ustozlar, yordamchi ustozlar, qo'shimcha dars qilish uchun 'Coworking space' zali, yakshanba kungi tadbirlar va boshqa imkoniyatlar bilan birga, siz erishmoqchi bo'lgan natijagacha siz bilan teng harakat qilamiz!"
          },
          {
            q: "Qanday o'quv dasturlaridan foydalaniladi?",
            a: "Xalqaro darajadagi Oxford University Press nashriyotining eng samarali o'quv dasturidan to'liq foydalanamiz!"
          },
          {
            q: "Kursdan natija olishimga kafolat bormi?",
            a: "Albatta bor. Agar siz o'qituvchimiz berayotgan topshiriqlarni o'z vaqtida 100% bajarib borsangiz, aniq yaxshi natija olasiz!"
          },
          {
            q: "Agar o'qishga qiynalsam va natija ko'rsata olmasam pulimni qaytarib olamanmi?",
            a: "Bizning maqsad sifatli ta'lim berish va bu hamma uchun. Agar o'qishga qiynalsangiz, biz sizga qo'shimcha yordamchi ustozlarni jalb qilamiz va bu orqali natijangizni sezilarli darajaga oshiramiz!"
          },
          {
            q: "Turk, Xitoy, Nemis, Fransuz tillari mavjudmi?",
            a: "3/2 filialimizda Turk tili, 2/2 filialimizda esa Nemis tili mavjud. Qolgan tillar hozircha yo'q. Agar qabul ochilsa ijtimoiy tarmoqlardagi kanallarimiz orqali habar beramiz!"
          },
          {
            q: "Dars materiallari qanday taqdim etiladi?",
            a: "Barcha o'quv materiallari zamonaviy darsliklar, multimedia resurslari va maxsus tayyorlangan o'quv qo'llanmalardan iborat. Onlayn platforma orqali qo'shimcha materiallar ham taqdim etiladi."
          },
          {
            q: "Chegirma yoki bonus berasizlarmi?",
            a: "Chegirma qila olmasakda, bizda o'qib eng yaxshi natija ko'rsatayotgan o'quvchilarni munosib taqdirlaymiz. Agar IELTS sertifikatidan 7.5 dan yuqori ball to'plasangiz, 1 000 000 so'mdan boshlab CashBack ham sovg'a qilamiz!"
          },
          {
            q: "Universitetga kirish uchun sizlarda tayyorlansam bo'ladimi?",
            a: "Ha albatta, bizda Ingliz, rus yoki koreys tilini to'liq o'rganib maxsus sertifikatni qo'lga kiritishingiz mumkin. IETLS, CEFR va TOPIK sertifikatlari bilan istalgan universitetga tayyor holda hujjat topshirishingiz mumkin!"
          },
          {
            q: "Necha yoshdan boshlab o'qishga qabul qilinadi?",
            a: "Asosan 2-sinfdan yuqori bo'lgan o'quvchilarni o'qishga qabul qilamiz!"
          },
          {
            q: "30-40 yoshlar ham o'qisa bo'ladimi?",
            a: "Agar sheriklaringiz bo'lsa, albatta dars tashkillashtirib berishimiz mumkin. Ammo boshqa holatda sizga boshqa takliflarimiz mavjud. Buning uchun o'quv markazimizga tashrif buyuring yoki +998 78 333 37 73 raqamiga qo'ng'iroq qiling!"
          },
        ]
      },
      advantages: {
        title: "Bizning",
        subtitle: "ustunliklarimiz:",
        items: [
          {
            icon: <FaBolt size={40} />,
            title: "Bepul coworking zone",
            desc: "O'quvchilar darsdan so'ng o'qish yoki mustaqil ishlash uchun qulay joy!",
          },
          {
            icon: <FaUsers size={40} />,
            title: "Yordamchi ustozlar",
            desc: "Har bir o'quvchiga alohida yondashuv bilan yaqindan yordam beradigan yordamchi ustozlar qo'shimcha BEPUL darslar olib boradi!",
          },
          {
            icon: <FaCalendarCheck size={40} />,
            title: "Yakshanba tadbirlari",
            desc: "Har yakshanba – masterklasslar, viktorinalar va motivatsion uchrashuvlar bo'lib o'tadi!",
          },
          {
            icon: <FaMapMarkerAlt size={40} />,
            title: "Eng qulay lokatsiya",
            desc: "Filiallarimiz shaharning markaziy va qulay joylarida joylashgan!",
          },
        ]
      },
      gallery: {
        title: "Bizning",
        subtitle: "galereya:",
        items: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60",
            title: "Sinflarimiz",
            desc: "Zamonaviy jihozlangan sinflar"
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=60",
            title: "Kutubxona",
            desc: "Keng kutubxona zali"
          },
          {
            id: 3,
            src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60",
            title: "Laboratoriya",
            desc: "Zamonaviy laboratoriya"
          },
          {
            id: 4,
            src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=60",
            title: "Sport Zali",
            desc: "Keng sport maydoni"
          },
          {
            id: 5,
            src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=60",
            title: "O'quv Jarayoni",
            desc: "Samarali o'quv jarayoni"
          },
          {
            id: 6,
            src: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=60",
            title: "Tadbir",
            desc: "Madaniy tadbirlar"
          },
        ]
      },
      events: {
        title: "Sunday",
        subtitle: "eventlar:",
        registerBtn: "Eventlarga ro'yxatdan o'ting",
        namePlaceholder: "Ism Familiyangiz",
        agePlaceholder: "Yoshingiz",
        phonePlaceholder: "Telefon raqamingiz",
        submitBtn: "Ro'yxatdan o'tish"
      },
      contact: {
        title: "Biz bilan bog'laning",
        name: "Ism sharif",
        age: "Yoshi",
        phone1: "Telefon raqam 1",
        phone2: "Telefon raqam 2",
        course: "Kursni tanlang",
        format: "O'qish formati",
        time: "Qulay vaqtni tanlang",
        selectTime: "Vaqtni tanlang",
        submit: "Yuborish",
        formats: [
          { value: "guruh", label: "Guruh bilan" },
          { value: "mini", label: "Mini guruh" },
          { value: "individual", label: "Alohida 1-1" }
        ]
      },
      footer: {
        description: "14 yillik tajribaga ega o'quv markazi. Sizning muvaffaqiyatingiz - bizning g'ururimiz.",
        courses: "Kurslar",
        branches: "Filiallar",
        contact: "Bog'lanish",
        copyright: "© 2024 Study Center. Barcha huquqlar himoyalangan."
      },
      common: {
        mainNumber: "Asosiy raqam",
        additionalNumber: "Qo'shimcha raqam",
        email: "Email",
        select: "Tanlang...",
        close: "Yopish",
        clickToView: "Ko'rish uchun bosing"
      }
    },
    RU: {
      hero: {
        title: "Лучший путь к будущему молодежи",
        subtitle: "начинается здесь",
        description: `За 15 лет "Bilim Ziyo" обучил более 20 000 студентов и добился около 1000 результатов!`,
        registerBtn: "Зарегистрироваться",
        schoolBtn: "Частная школа"
      },
      features: {
        title: "Почему именно наш учебный центр?",
        items: [
          {
            id: 1,
            icon: <FaRegStar size={40} />,
            title: "15 лет опыта",
          },
          {
            id: 2,
            icon: <FaUserGraduate size={40} />,
            title: "Более 20 000 студентов выбрали нас",
          },
          {
            id: 3,
            icon: <FaSchool size={40} />,
            title: "3 филиала",
          },
          {
            id: 4,
            icon: <FaUsers size={40} />,
            title: "Более 50 опытных и квалифицированных учителей с нами",
          },
        ]
      },
      teachers: {
        title: "Наша",
        subtitle: "команда:",
        yearsExp: "лет опыта",
        students: "студентов обучил"
      },
      results: {
        title: "Наши",
        subtitle: "результаты:",
        ielts: "IELTS",
        cefr: "CEFR"
      },
      courses: {
        title: "Наши",
        subtitle: "курсы:",
        details: {
          duration: "Продолжительность:",
          level: "Уровень:",
          format: "Формат:",
          price: "Стоимость:",
          features: "Возможности курса:"
        },
        registerBtn: "записаться на курс"
      },
      faq: {
        title: "Часто задаваемые",
        subtitle: "вопросы:",
        items: [
          {
            q: "Почему именно я должен учиться в этом центре?",
            a: "Все удобства, условия, качественная учебная программа, опытные учителя, помощники-учителя, коворкинг-зона для дополнительных занятий, воскресные мероприятия и другие возможности вместе с нами - мы будем работать с вами до достижения желаемого результата!"
          },
          {
            q: "Какие учебные программы используются?",
            a: "Мы полностью используем самую эффективную учебную программу от Oxford University Press международного уровня!"
          },
          {
            q: "Есть ли гарантия результата от курса?",
            a: "Конечно есть. Если вы будете выполнять 100% заданий, которые дает наш преподаватель, вовремя, вы обязательно получите хороший результат!"
          },
          {
            q: "Если мне будет трудно учиться и я не смогу показать результат, могу ли я вернуть свои деньги?",
            a: "Наша цель - давать качественное образование, и это для всех. Если вам будет трудно учиться, мы привлечем дополнительных помощников-учителей и значительно улучшим ваш результат!"
          },
          {
            q: "Есть ли турецкий, китайский, немецкий, французский языки?",
            a: "В 3/2 наших филиалах есть турецкий язык, в 2/2 - немецкий. Остальные языки пока недоступны. Если набор откроется, сообщим в наших социальных сетях!"
          },
          {
            q: "Как предоставляются учебные материалы?",
            a: "Все учебные материалы состоят из современных учебников, мультимедийных ресурсов и специально подготовленных учебных пособий. Дополнительные материалы также предоставляются через онлайн-платформу."
          },
          {
            q: "Предоставляете ли вы скидки или бонусы?",
            a: "Хотя мы не можем предоставить скидки, мы достойно награждаем студентов, которые показывают лучшие результаты. Если вы наберете более 7,5 баллов на сертификате IELTS, мы также подарим CashBack от 1 000 000 сумов!"
          },
          {
            q: "Можно ли у вас подготовиться к поступлению в университет?",
            a: "Да, конечно, у нас вы можете полностью выучить английский, русский или корейский язык и получить специальный сертификат. С сертификатами IELTS, CEFR и TOPIK вы можете подать документы в любой университет!"
          },
          {
            q: "С какого возраста принимают на обучение?",
            a: "В основном мы принимаем учащихся выше 2-го класса!"
          },
          {
            q: "Могут ли учиться люди 30-40 лет?",
            a: "Если у вас есть партнеры, мы обязательно организуем занятия. Но в других случаях у нас есть другие предложения для вас. Посетите наш учебный центр или позвоните по номеру +998 78 333 37 73!"
          },
        ]
      },
      advantages: {
        title: "Наши",
        subtitle: "преимущества:",
        items: [
          {
            icon: <FaBolt size={40} />,
            title: "Бесплатная коворкинг-зона",
            desc: "Удобное место для студентов для учебы или самостоятельной работы после занятий!",
          },
          {
            icon: <FaUsers size={40} />,
            title: "Помощники-учителя",
            desc: "Помощники-учителя, которые помогают каждому студенту с индивидуальным подходом, проводят дополнительные БЕСПЛАТНЫЕ занятия!",
          },
          {
            icon: <FaCalendarCheck size={40} />,
            title: "Воскресные мероприятия",
            desc: "Каждое воскресенье проходят мастер-классы, викторины и мотивационные встречи!",
          },
          {
            icon: <FaMapMarkerAlt size={40} />,
            title: "Самое удобное расположение",
            desc: "Наши филиалы расположены в центральных и удобных местах города!",
          },
        ]
      },
      gallery: {
        title: "Наша",
        subtitle: "галерея:",
        items: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60",
            title: "Наши классы",
            desc: "Современные оснащенные классы"
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=60",
            title: "Библиотека",
            desc: "Просторный читальный зал"
          },
          {
            id: 3,
            src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60",
            title: "Лаборатория",
            desc: "Современная лаборатория"
          },
          {
            id: 4,
            src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=60",
            title: "Спортзал",
            desc: "Просторная спортивная площадка"
          },
          {
            id: 5,
            src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=60",
            title: "Учебный процесс",
            desc: "Эффективный учебный процесс"
          },
          {
            id: 6,
            src: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=60",
            title: "Мероприятие",
            desc: "Культурные мероприятия"
          },
        ]
      },
      events: {
        title: "Воскресные",
        subtitle: "мероприятия:",
        registerBtn: "Зарегистрироваться на мероприятия",
        namePlaceholder: "Ваше имя и фамилия",
        agePlaceholder: "Ваш возраст",
        phonePlaceholder: "Ваш номер телефона",
        submitBtn: "Зарегистрироваться"
      },
      contact: {
        title: "Свяжитесь с нами",
        name: "Имя и фамилия",
        age: "Возраст",
        phone1: "Номер телефона 1",
        phone2: "Номер телефона 2",
        course: "Выберите курс",
        format: "Формат обучения",
        time: "Выберите удобное время",
        selectTime: "Выберите время",
        submit: "Отправить",
        formats: [
          { value: "guruh", label: "В группе" },
          { value: "mini", label: "Мини-группа" },
          { value: "individual", label: "Индивидуально 1-1" }
        ]
      },
      footer: {
        description: "Учебный центр с 14-летним опытом. Ваш успех - наша гордость.",
        courses: "Курсы",
        branches: "Филиалы",
        contact: "Контакты",
        copyright: "© 2024 Study Center. Все права защищены."
      },
      common: {
        mainNumber: "Основной номер",
        additionalNumber: "Дополнительный номер",
        email: "Email",
        select: "Выберите...",
        close: "Закрыть",
        clickToView: "Нажмите для просмотра"
      }
    },
    EN: {
      hero: {
        title: "The best path for youth's future",
        subtitle: "starts here",
        description: `In 15 years, "Bilim Ziyo" has taught over 20,000 students and achieved about 1,000 results!`,
        registerBtn: "Register",
        schoolBtn: "Private School"
      },
      features: {
        title: "Why our study center?",
        items: [
          {
            id: 1,
            icon: <FaRegStar size={40} />,
            title: "15 years of experience",
          },
          {
            id: 2,
            icon: <FaUserGraduate size={40} />,
            title: "Over 20,000 students chose us",
          },
          {
            id: 3,
            icon: <FaSchool size={40} />,
            title: "3 branches",
          },
          {
            id: 4,
            icon: <FaUsers size={40} />,
            title: "Over 50 experienced and qualified teachers with us",
          },
        ]
      },
      teachers: {
        title: "Our",
        subtitle: "team:",
        yearsExp: "years of experience",
        students: "students taught"
      },
      results: {
        title: "Our",
        subtitle: "results:",
        ielts: "IELTS",
        cefr: "CEFR"
      },
      courses: {
        title: "Our",
        subtitle: "courses:",
        details: {
          duration: "Duration:",
          level: "Level:",
          format: "Format:",
          price: "Price:",
          features: "Course features:"
        },
        registerBtn: "register for course"
      },
      faq: {
        title: "Frequently asked",
        subtitle: "questions:",
        items: [
          {
            q: "Why should I study at this center?",
            a: "All the amenities, conditions, quality curriculum, experienced teachers, assistant teachers, coworking space for additional classes, Sunday events and other opportunities together with us - we will work with you until you achieve the desired result!"
          },
          {
            q: "What study programs are used?",
            a: "We fully use the most effective study program from Oxford University Press at an international level!"
          },
          {
            q: "Is there a guarantee of results from the course?",
            a: "Of course there is. If you complete 100% of the assignments given by our teacher on time, you will definitely get good results!"
          },
          {
            q: "If I have difficulty studying and cannot show results, can I get my money back?",
            a: "Our goal is to provide quality education, and this is for everyone. If you have difficulty studying, we will involve additional assistant teachers and significantly improve your results!"
          },
          {
            q: "Are Turkish, Chinese, German, French languages available?",
            a: "Turkish language is available in 3/2 of our branches, and German language in 2/2. Other languages are not available yet. If enrollment opens, we will inform you through our social media channels!"
          },
          {
            q: "How are study materials provided?",
            a: "All study materials consist of modern textbooks, multimedia resources and specially prepared study guides. Additional materials are also provided through an online platform."
          },
          {
            q: "Do you offer discounts or bonuses?",
            a: "Although we cannot offer discounts, we adequately reward students who show the best results. If you score more than 7.5 on the IELTS certificate, we also give CashBack starting from 1,000,000 soums!"
          },
          {
            q: "Can I prepare for university entrance with you?",
            a: "Yes, of course, with us you can fully learn English, Russian or Korean and get a special certificate. With IELTS, CEFR and TOPIK certificates, you can apply to any university!"
          },
          {
            q: "From what age are students accepted?",
            a: "We mainly accept students above 2nd grade!"
          },
          {
            q: "Can 30-40 year olds study?",
            a: "If you have partners, we will definitely organize classes. But in other cases, we have other offers for you. Visit our study center or call +998 78 333 37 73!"
          },
        ]
      },
      advantages: {
        title: "Our",
        subtitle: "advantages:",
        items: [
          {
            icon: <FaBolt size={40} />,
            title: "Free coworking zone",
            desc: "Convenient place for students to study or work independently after classes!",
          },
          {
            icon: <FaUsers size={40} />,
            title: "Assistant teachers",
            desc: "Assistant teachers who help each student with an individual approach conduct additional FREE classes!",
          },
          {
            icon: <FaCalendarCheck size={40} />,
            title: "Sunday events",
            desc: "Every Sunday - master classes, quizzes and motivational meetings are held!",
          },
          {
            icon: <FaMapMarkerAlt size={40} />,
            title: "Most convenient location",
            desc: "Our branches are located in central and convenient locations in the city!",
          },
        ]
      },
      gallery: {
        title: "Our",
        subtitle: "gallery:",
        items: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60",
            title: "Our Classes",
            desc: "Modern equipped classrooms"
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=60",
            title: "Library",
            desc: "Spacious library hall"
          },
          {
            id: 3,
            src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60",
            title: "Laboratory",
            desc: "Modern laboratory"
          },
          {
            id: 4,
            src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=60",
            title: "Gym",
            desc: "Spacious sports ground"
          },
          {
            id: 5,
            src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=60",
            title: "Study Process",
            desc: "Effective study process"
          },
          {
            id: 6,
            src: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=60",
            title: "Event",
            desc: "Cultural events"
          },
        ]
      },
      events: {
        title: "Sunday",
        subtitle: "events:",
        registerBtn: "Register for events",
        namePlaceholder: "Your full name",
        agePlaceholder: "Your age",
        phonePlaceholder: "Your phone number",
        submitBtn: "Register"
      },
      contact: {
        title: "Contact us",
        name: "Full name",
        age: "Age",
        phone1: "Phone number 1",
        phone2: "Phone number 2",
        course: "Select course",
        format: "Study format",
        time: "Select convenient time",
        selectTime: "Select time",
        submit: "Submit",
        formats: [
          { value: "guruh", label: "In group" },
          { value: "mini", label: "Mini group" },
          { value: "individual", label: "Individually 1-1" }
        ]
      },
      footer: {
        description: "Study center with 14 years of experience. Your success is our pride.",
        courses: "Courses",
        branches: "Branches",
        contact: "Contacts",
        copyright: "© 2024 Study Center. All rights reserved."
      },
      common: {
        mainNumber: "Main number",
        additionalNumber: "Additional number",
        email: "Email",
        select: "Select...",
        close: "Close",
        clickToView: "Click to view"
      }
    }
  };

  const currentContent = getLanguageContent(translations);

  // Kurslar ma'lumotlari
  const courses = [
    {
      id: 1,
      name: activeLanguage.code === 'UZ' ? "Ingliz tili" : activeLanguage.code === 'RU' ? "Английский язык" : "English Language",
      desc: activeLanguage.code === 'UZ' ? "Boshlang'ichdan IELTS darajasigacha" : 
            activeLanguage.code === 'RU' ? "От начального до уровня IELTS" : 
            "From beginner to IELTS level",
      icon: "🇬🇧",
      details: {
        duration: activeLanguage.code === 'UZ' ? "6-9 oy" : activeLanguage.code === 'RU' ? "6-9 месяцев" : "6-9 months",
        level: activeLanguage.code === 'UZ' ? "Boshlang'ichdan IELTS gacha" : 
               activeLanguage.code === 'RU' ? "От начального до IELTS" : 
               "From beginner to IELTS",
        format: activeLanguage.code === 'UZ' ? "Guruhli va individual" : 
                activeLanguage.code === 'RU' ? "Групповые и индивидуальные" : 
                "Group and individual",
        price: activeLanguage.code === 'UZ' ? "400,000 so'm/oy" : 
               activeLanguage.code === 'RU' ? "400 000 сум/месяц" : 
               "400,000 soums/month",
        features: activeLanguage.code === 'UZ' ? [
          "Native speaker bilan mashg'ulotlar",
          "IELTS imtihoniga tayyorgarlik",
          "Speaking club har hafta",
          "Zamonaviy o'quv materiallari"
        ] : activeLanguage.code === 'RU' ? [
          "Занятия с носителем языка",
          "Подготовка к экзамену IELTS",
          "Разговорный клуб каждую неделю",
          "Современные учебные материалы"
        ] : [
          "Classes with native speaker",
          "IELTS exam preparation",
          "Speaking club every week",
          "Modern study materials"
        ]
      }
    },
    {
      id: 2,
      name: activeLanguage.code === 'UZ' ? "Matematika" : activeLanguage.code === 'RU' ? "Математика" : "Mathematics",
      desc: activeLanguage.code === 'UZ' ? "Maktab va oliy ta'lim uchun chuqur tayyorgarlik" : 
            activeLanguage.code === 'RU' ? "Глубокая подготовка для школы и высшего образования" : 
            "Deep preparation for school and higher education",
      icon: "📊",
      details: {
        duration: activeLanguage.code === 'UZ' ? "8-10 oy" : activeLanguage.code === 'RU' ? "8-10 месяцев" : "8-10 months",
        level: activeLanguage.code === 'UZ' ? "1-11 sinflar va abituriyentlar" : 
               activeLanguage.code === 'RU' ? "1-11 классы и абитуриенты" : 
               "Grades 1-11 and applicants",
        format: activeLanguage.code === 'UZ' ? "Guruhli va individual" : 
                activeLanguage.code === 'RU' ? "Групповые и индивидуальные" : 
                "Group and individual",
        price: activeLanguage.code === 'UZ' ? "350,000 so'm/oy" : 
               activeLanguage.code === 'RU' ? "350 000 сум/месяц" : 
               "350,000 soums/month",
        features: activeLanguage.code === 'UZ' ? [
          "Maktab dasturi va olimpiada tayyorgarligi",
          "DTM va imtihonlarga tayyorgarlik",
          "Amaliy masalalar yechish",
          "Individual yondashuv"
        ] : activeLanguage.code === 'RU' ? [
          "Школьная программа и подготовка к олимпиадам",
          "Подготовка к DTM и экзаменам",
          "Решение практических задач",
          "Индивидуальный подход"
        ] : [
          "School curriculum and olympiad preparation",
          "DTM and exam preparation",
          "Solving practical problems",
          "Individual approach"
        ]
      }
    },
    {
      id: 3,
      name: activeLanguage.code === 'UZ' ? "Rus tili" : activeLanguage.code === 'RU' ? "Русский язык" : "Russian Language",
      desc: activeLanguage.code === 'UZ' ? "Noldan so'zlash darajasigacha" : 
            activeLanguage.code === 'RU' ? "От нуля до уровня разговорной речи" : 
            "From zero to conversational level",
      icon: "🇷🇺",
      details: {
        duration: activeLanguage.code === 'UZ' ? "4-6 oy" : activeLanguage.code === 'RU' ? "4-6 месяцев" : "4-6 months",
        level: activeLanguage.code === 'UZ' ? "Boshlang'ich va o'rta" : 
               activeLanguage.code === 'RU' ? "Начальный и средний" : 
               "Beginner and intermediate",
        format: activeLanguage.code === 'UZ' ? "Guruhli va individual" : 
                activeLanguage.code === 'RU' ? "Групповые и индивидуальные" : 
                "Group and individual",
        price: activeLanguage.code === 'UZ' ? "300,000 so'm/oy" : 
               activeLanguage.code === 'RU' ? "300 000 сум/месяц" : 
               "300,000 soums/month",
        features: activeLanguage.code === 'UZ' ? [
          "Grammatika va leksika",
          "Og'zaki nutqni rivojlantirish",
          "Real hayot vaziyatlari",
          "Madaniyat va an'analar"
        ] : activeLanguage.code === 'RU' ? [
          "Грамматика и лексика",
          "Развитие устной речи",
          "Реальные жизненные ситуации",
          "Культура и традиции"
        ] : [
          "Grammar and vocabulary",
          "Developing oral speech",
          "Real-life situations",
          "Culture and traditions"
        ]
      }
    },
    {
      id: 4,
      name: activeLanguage.code === 'UZ' ? "Koreys tili" : activeLanguage.code === 'RU' ? "Корейский язык" : "Korean Language",
      desc: activeLanguage.code === 'UZ' ? "TOPIK imtihoniga tayyorgarlik" : 
            activeLanguage.code === 'RU' ? "Подготовка к экзамену TOPIK" : 
            "TOPIK exam preparation",
      icon: "🇰🇷",
      details: {
        duration: activeLanguage.code === 'UZ' ? "6-8 oy" : activeLanguage.code === 'RU' ? "6-8 месяцев" : "6-8 months",
        level: activeLanguage.code === 'UZ' ? "Boshlang'ichdan TOPIK 2 gacha" : 
               activeLanguage.code === 'RU' ? "От начального до TOPIK 2" : 
               "From beginner to TOPIK 2",
        format: activeLanguage.code === 'UZ' ? "Guruhli va individual" : 
                activeLanguage.code === 'RU' ? "Групповые и индивидуальные" : 
                "Group and individual",
        price: activeLanguage.code === 'UZ' ? "450,000 so'm/oy" : 
               activeLanguage.code === 'RU' ? "450 000 сум/месяц" : 
               "450,000 soums/month",
        features: activeLanguage.code === 'UZ' ? [
          "Hangul o'qish va yozish",
          "TOPIK imtihon strategiyalari",
          "Koreys madaniyati",
          "Onlayn resurslar va materiallar"
        ] : activeLanguage.code === 'RU' ? [
          "Чтение и письмо на хангыле",
          "Стратегии экзамена TOPIK",
          "Корейская культура",
          "Онлайн ресурсы и материалы"
        ] : [
          "Reading and writing Hangul",
          "TOPIK exam strategies",
          "Korean culture",
          "Online resources and materials"
        ]
      }
    },
    {
      id: 5,
      name: activeLanguage.code === 'UZ' ? "Dasturlash" : activeLanguage.code === 'RU' ? "Программирование" : "Programming",
      desc: activeLanguage.code === 'UZ' ? "Python va JavaScript asoslari" : 
            activeLanguage.code === 'RU' ? "Основы Python и JavaScript" : 
            "Python and JavaScript basics",
      icon: "💻",
      details: {
        duration: activeLanguage.code === 'UZ' ? "7-9 oy" : activeLanguage.code === 'RU' ? "7-9 месяцев" : "7-9 months",
        level: activeLanguage.code === 'UZ' ? "Boshlang'ich" : activeLanguage.code === 'RU' ? "Начальный" : "Beginner",
        format: activeLanguage.code === 'UZ' ? "Amaliy kurs" : activeLanguage.code === 'RU' ? "Практический курс" : "Practical course",
        price: activeLanguage.code === 'UZ' ? "500,000 so'm/oy" : 
               activeLanguage.code === 'RU' ? "500 000 сум/месяц" : 
               "500,000 soums/month",
        features: activeLanguage.code === 'UZ' ? [
          "Python dasturlash asoslari",
          "Web development (HTML, CSS, JS)",
          "Loyihalar orqali o'rganish",
          "Portfolio yaratish"
        ] : activeLanguage.code === 'RU' ? [
          "Основы программирования на Python",
          "Веб-разработка (HTML, CSS, JS)",
          "Обучение через проекты",
          "Создание портфолио"
        ] : [
          "Python programming basics",
          "Web development (HTML, CSS, JS)",
          "Learning through projects",
          "Portfolio creation"
        ]
      }
    },
    {
      id: 6,
      name: activeLanguage.code === 'UZ' ? "Rasm chizish" : activeLanguage.code === 'RU' ? "Рисование" : "Drawing",
      desc: activeLanguage.code === 'UZ' ? "Asosiy texnikalar va uslublar" : 
            activeLanguage.code === 'RU' ? "Основные техники и стили" : 
            "Basic techniques and styles",
      icon: "🎨",
      details: {
        duration: activeLanguage.code === 'UZ' ? "3-5 oy" : activeLanguage.code === 'RU' ? "3-5 месяцев" : "3-5 months",
        level: activeLanguage.code === 'UZ' ? "Boshlang'ich va o'rta" : 
               activeLanguage.code === 'RU' ? "Начальный и средний" : 
               "Beginner and intermediate",
        format: activeLanguage.code === 'UZ' ? "Amaliy kurs" : activeLanguage.code === 'RU' ? "Практический курс" : "Practical course",
        price: activeLanguage.code === 'UZ' ? "400,000 so'm/oy" : 
               activeLanguage.code === 'RU' ? "400 000 сум/месяц" : 
               "400,000 soums/month",
        features: activeLanguage.code === 'UZ' ? [
          "Qalam texnikasi",
          "Ranglar nazariyasi",
          "Portret va manzara",
          "Materiallar bilan ishlash"
        ] : activeLanguage.code === 'RU' ? [
          "Техника карандаша",
          "Теория цвета",
          "Портрет и пейзаж",
          "Работа с материалами"
        ] : [
          "Pencil technique",
          "Color theory",
          "Portrait and landscape",
          "Working with materials"
        ]
      }
    }
  ];

  const ieltsResults = [ 
    {
      id: 1,
      name: activeLanguage.code === 'UZ' ? "Dilnoza Karimova" : activeLanguage.code === 'RU' ? "Дилноза Каримова" : "Dilnoza Karimova",
      score: "IELTS 8.0",
      img: "https://via.placeholder.com/300x350.png?text=Dilnoza",
    },
    {
      id: 2,
      name: activeLanguage.code === 'UZ' ? "Bekzod Abdullayev" : activeLanguage.code === 'RU' ? "Бекзод Абдуллаев" : "Bekzod Abdullayev",
      score: "IELTS 7.5",
      img: "https://via.placeholder.com/300x350.png?text=Bekzod",
    },
    {
      id: 3,
      name: activeLanguage.code === 'UZ' ? "Nigora Saidova" : activeLanguage.code === 'RU' ? "Нигора Саидова" : "Nigora Saidova",
      score: "IELTS 8.5",
      img: "https://via.placeholder.com/300x350.png?text=Nigora",
    },
    {
      id: 4,
      name: activeLanguage.code === 'UZ' ? "Javohir Rakhmatov" : activeLanguage.code === 'RU' ? "Джавохир Рахматов" : "Javohir Rakhmatov",
      score: "IELTS 7.0",
      img: "https://via.placeholder.com/300x350.png?text=Javohir",
    },
    {
      id: 5,
      name: activeLanguage.code === 'UZ' ? "Umida Norqulova" : activeLanguage.code === 'RU' ? "Умида Норкулова" : "Umida Norqulova",
      score: "IELTS 8.0",
      img: "https://via.placeholder.com/300x350.png?text=Umida",
    },
  ];

  const cefrResults = [
    {
      id: 1,
      name: activeLanguage.code === 'UZ' ? "Azizbek Sobirov" : activeLanguage.code === 'RU' ? "Азизбек Собиров" : "Azizbek Sobirov",
      score: "CEFR C1",
      img: "https://via.placeholder.com/300x350.png?text=Azizbek",
    },
    {
      id: 2,
      name: activeLanguage.code === 'UZ' ? "Madina Yusupova" : activeLanguage.code === 'RU' ? "Мадина Юсупова" : "Madina Yusupova",
      score: "CEFR B2",
      img: "https://via.placeholder.com/300x350.png?text=Madina",
    },
    {
      id: 3,
      name: activeLanguage.code === 'UZ' ? "Shahzod Tursunov" : activeLanguage.code === 'RU' ? "Шахзод Турсунов" : "Shahzod Tursunov",
      score: "CEFR C2",
      img: "https://via.placeholder.com/300x350.png?text=Shahzod",
    },
    {
      id: 4,
      name: activeLanguage.code === 'UZ' ? "Zarina Ismoilova" : activeLanguage.code === 'RU' ? "Зарина Исмоилова" : "Zarina Ismoilova",
      score: "CEFR B1",
      img: "https://via.placeholder.com/300x350.png?text=Zarina",
    },
    {
      id: 5,
      name: activeLanguage.code === 'UZ' ? "Rustam Qodirov" : activeLanguage.code === 'RU' ? "Рустам Кодиров" : "Rustam Qodirov",
      score: "CEFR C1",
      img: "https://via.placeholder.com/300x350.png?text=Rustam",
    },
  ];

  const teachers = [
    {
      id: 1,
      name: activeLanguage.code === 'UZ' ? "Gozal Fayzullayeva" : activeLanguage.code === 'RU' ? "Гозал Файзуллаева" : "Gozal Fayzullayeva",
      score: "IELTS 8.0",
      img: "https://via.placeholder.com/80x80.png?text=G",
      color: "bg-blue-500",
      exp: 6,
      students: 1000,
      video: "https://via.placeholder.com/400x500.png?text=Gozal",
      desc: activeLanguage.code === 'UZ' 
        ? "Ingliz tilidan dars berishga qiziqishim maktab davridan boshlangan va shu yo'nalishni hayotimga bog'lashga qaror qilganman. Maqsadim - o'quvchilarning potensialini ochish va ularni nafaqat ingliz tiliga, balki boshqa sohalarga ham qiziqtira olish."
        : activeLanguage.code === 'RU'
        ? "Мой интерес к преподаванию английского языка начался со школьных лет, и я решил связать свою жизнь с этим направлением. Моя цель - раскрыть потенциал студентов и заинтересовать их не только английским языком, но и другими областями."
        : "My interest in teaching English started from school years, and I decided to connect my life with this direction. My goal is to reveal the potential of students and interest them not only in English, but also in other areas."
    },
    {
      id: 2,
      name: activeLanguage.code === 'UZ' ? "Sardor Erkinov" : activeLanguage.code === 'RU' ? "Сардор Эркинов" : "Sardor Erkinov",
      score: "IELTS 8.5",
      img: "https://via.placeholder.com/80x80.png?text=S",
      color: "bg-cyan-500",
      exp: 7,
      students: 1200,
      video: "https://via.placeholder.com/400x500.png?text=Sardor",
      desc: activeLanguage.code === 'UZ' 
        ? "Tajriba va kreativ yondashuv orqali ingliz tilini oson o'rganish yo'llarini ishlab chiqqanman. Har bir o'quvchi - alohida loyiha."
        : activeLanguage.code === 'RU'
        ? "Через опыт и творческий подход я разработал способы легкого изучения английского языка. Каждый студент - отдельный проект."
        : "Through experience and creative approach, I have developed ways to easily learn English. Each student is a separate project."
    },
    {
      id: 3,
      name: activeLanguage.code === 'UZ' ? "Jakhongir Abbasov" : activeLanguage.code === 'RU' ? "Джахонгир Аббасов" : "Jakhongir Abbasov",
      score: "IELTS 8.0",
      img: "https://via.placeholder.com/80x80.png?text=J",
      color: "bg-green-500",
      exp: 5,
      students: 900,
      video: "https://via.placeholder.com/400x500.png?text=Jakhongir",
      desc: activeLanguage.code === 'UZ' 
        ? "Ingliz tilini o'rgatishda zamonaviy metodlar va real hayotdagi muloqotga urg'u beraman."
        : activeLanguage.code === 'RU'
        ? "В преподавании английского языка делаю акцент на современных методах и реальном общении."
        : "In teaching English, I focus on modern methods and real-life communication."
    },
    {
      id: 4,
      name: activeLanguage.code === 'UZ' ? "Alijon Rakhmatov" : activeLanguage.code === 'RU' ? "Алижон Рахматов" : "Alijon Rakhmatov",
      score: "IELTS 8.0",
      img: "https://via.placeholder.com/80x80.png?text=A",
      color: "bg-red-500",
      exp: 8,
      students: 1500,
      video: "https://via.placeholder.com/400x500.png?text=Alijon",
      desc: activeLanguage.code === 'UZ' 
        ? "Har bir darsda o'quvchini ilhomlantirish - mening asosiy maqsadim. O'quv jarayoni hech qachon zerikarli bo'lmasligi kerak."
        : activeLanguage.code === 'RU'
        ? "Вдохновлять студента на каждом уроке - моя главная цель. Учебный процесс никогда не должен быть скучным."
        : "Inspiring the student in every lesson is my main goal. The learning process should never be boring."
    },
  ];

  // Footer ma'lumotlari
  const footerLinks = {
    courses: courses.map(course => course.name),
    branches: activeLanguage.code === 'UZ' 
      ? ["Yunusobod filiali", "Chilonzor filiali", "Mirzo Ulug'bek filiali"]
      : activeLanguage.code === 'RU'
      ? ["Юнусабадский филиал", "Чиланзарский филиал", "Мирзо Улугбекский филиал"]
      : ["Yunusabad Branch", "Chilanzar Branch", "Mirzo Ulugbek Branch"],
    contacts: [
      "+998 78 333 3773",
      "+998 94 731 3773",
      "Bilimziyo1@gmail.com"
    ]
  };

  const [activeTeacher, setActiveTeacher] = useState(teachers[0]);
  const [activeCourse, setActiveCourse] = useState(courses[0]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("guruh");

  const loopImages = [...currentContent.gallery.items, ...currentContent.gallery.items];
  const loopIeltsResults = [...ieltsResults, ...ieltsResults];
  const loopCefrResults = [...cefrResults, ...cefrResults];

  // Background illustrations array
  const backgroundIcons = [
    { icon: <BookOpen className="w-6 h-6 lg:w-8 lg:h-8" />, style: "top-10 left-5 text-blue-200" },
    { icon: <GraduationCapIcon className="w-8 h-8 lg:w-10 lg:h-10" />, style: "top-20 right-10 text-blue-300" },
    { icon: <School2 className="w-10 h-10 lg:w-12 lg:h-12" />, style: "bottom-20 left-8 text-blue-100" },
    { icon: <Users2 className="w-7 h-7 lg:w-9 lg:h-9" />, style: "bottom-10 right-5 text-blue-400" },
    { icon: <BrainCircuit className="w-9 h-9 lg:w-11 lg:h-11" />, style: "top-1/3 left-1/4 text-blue-200" },
    { icon: <LightbulbIcon className="w-6 h-6 lg:w-8 lg:h-8" />, style: "top-1/2 right-1/4 text-blue-300" },
    { icon: <TargetIcon className="w-8 h-8 lg:w-10 lg:h-10" />, style: "bottom-1/3 left-1/3 text-blue-100" },
    { icon: <RocketIcon className="w-10 h-10 lg:w-12 lg:h-12" />, style: "top-40 right-20 text-blue-400" },
    { icon: <BsBookshelf className="w-7 h-7 lg:w-9 lg:h-9" />, style: "bottom-40 left-20 text-blue-200" },
    { icon: <LiaUserGraduateSolid className="w-9 h-9 lg:w-11 lg:h-11" />, style: "top-60 right-40 text-blue-300" },
    { icon: <FaChalkboardTeacher className="w-8 h-8 lg:w-10 lg:h-10" />, style: "bottom-60 left-40 text-blue-100" },
    { icon: <Globe2 className="w-10 h-10 lg:w-12 lg:h-12" />, style: "top-32 left-60 text-blue-400" },
  ];

  // Background Illustration Component
  const BackgroundIllustrations = ({ sectionClass = "" }) => (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${sectionClass}`}>
      {backgroundIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute opacity-10 ${item.style} hidden sm:block`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.05, 0.15, 0.05],
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 8,
            delay: index * 0.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  );

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className='font-Main relative'>
      {/* Background illustrations for entire site */}
      <BackgroundIllustrations />

      {/* Floating Contact Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          onClick={() => setContactOpen(!contactOpen)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 lg:p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaPhone size={20} className="lg:w-6 lg:h-6" />
        </motion.button>

        <AnimatePresence>
          {contactOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="absolute bottom-full right-0 mb-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-gray-200 min-w-64"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="bg-green-500/20 p-2 rounded-lg">
                    <FaPhone className="text-green-600 w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm lg:text-base">+998 90 123 45 67</p>
                    <p className="text-xs lg:text-sm text-gray-600">{currentContent.common.mainNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <FaPhone className="text-blue-600 w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm lg:text-base">+998 91 234 56 78</p>
                    <p className="text-xs lg:text-sm text-gray-600">{currentContent.common.additionalNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="bg-purple-500/20 p-2 rounded-lg">
                    <FaEnvelope className="text-purple-600 w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm lg:text-base">info@studycenter.uz</p>
                    <p className="text-xs lg:text-sm text-gray-600">{currentContent.common.email}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hero Section */}
      <section className='h-auto min-h-[87vh] py-10 lg:py-0 flex flex-col justify-center items-center relative overflow-hidden'>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white z-0"></div>
        <BackgroundIllustrations sectionClass="z-0" />
        
        {/* Background elements */}
        <motion.div 
          className="absolute top-20 left-5 lg:left-10 text-4xl lg:text-6xl opacity-20"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >📚</motion.div>
        <motion.div 
          className="absolute top-40 right-5 lg:right-20 text-3xl lg:text-5xl opacity-20"
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >✏️</motion.div>
        <motion.div 
          className="absolute bottom-32 left-5 lg:left-20 text-2xl lg:text-4xl opacity-20"
          animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        >🔬</motion.div>
        <motion.div 
          className="absolute bottom-40 right-4 lg:right-16 text-4xl lg:text-6xl opacity-20"
          animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
        >🎓</motion.div>
        
        <div className="relative z-10 text-center px-4 lg:px-0">
          <h1 className='text-4xl lg:text-7xl text-center font-semibold leading-tight lg:leading-normal'>
            {currentContent.hero.title} <br /> 
            <span className='italic text-blue font-semibold'>{currentContent.hero.subtitle}</span>
          </h1>
          <p className='font-normal text-base lg:text-lg mt-4 text-center leading-relaxed lg:leading-normal'>
            {currentContent.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 lg:gap-5 items-center mt-6 lg:mt-4">
            <a href='#contact' className="
              relative overflow-hidden 
              py-3 lg:py-2 pl-6 pr-3 
              bg-blue text-white 
              rounded-full flex gap-6 lg:gap-8 items-center
              group
              transition-all duration-500
              before:content-[''] before:absolute before:inset-0 
              before:bg-white before:translate-x-full before:transition-transform before:duration-500 before:rounded-full
              hover:before:translate-x-0
              border border-blue w-full sm:w-auto justify-center
            ">
              <span className="relative z-10 group-hover:text-blue transition-colors duration-500 text-sm lg:text-base">
                {currentContent.hero.registerBtn}
              </span>
              <div className="relative z-10 rounded-full w-10 h-10 lg:w-12 lg:h-12 bg-white flex items-center justify-center transition-colors duration-500 group-hover:bg-blue">
                <FaArrowRight className="text-blue rotate-[-45deg] transition-colors duration-500 group-hover:text-white w-4 h-4 lg:w-6 lg:h-6" />
              </div>
            </a>
            <Link to='/school' className="
              relative overflow-hidden 
              px-6 lg:px-8 py-3 lg:py-5 border rounded-full border-blue text-blue
              group transition-all duration-500
              before:content-[''] before:absolute before:inset-0 
              before:bg-blue before:translate-x-full before:transition-transform before:duration-500 before:rounded-full
              hover:before:translate-x-0 w-full sm:w-auto text-center
            ">
              <span className="relative z-10 transition-colors duration-500 group-hover:text-white text-sm lg:text-base">
                {currentContent.hero.schoolBtn}
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-white to-blue/5 relative overflow-hidden">
        <BackgroundIllustrations sectionClass="z-0" />
        <div className="container relative z-10 px-4 lg:px-0">
          <h2 className="text-3xl lg:text-5xl text-center font-semibold mb-8 lg:mb-12">
            {currentContent.features.title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {currentContent.features.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  rotate: [0, -2, 2, 0],
                  transition: { duration: 0.4 },
                }}
                className="relative border border-blue group p-6 lg:p-8 rounded-2xl shadow-md hover:shadow-blue/30 
                           bg-white transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <motion.div
                  whileHover={{
                    y: [0, -6, 0],
                    transition: { repeat: Infinity, duration: 1 },
                  }}
                  className="text-blue flex justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                >
                  {React.cloneElement(item.icon, { size: window.innerWidth < 1024 ? 32 : 40 })}
                </motion.div>

                <p className="text-base lg:text-lg font-medium text-center transition-all duration-500 group-hover:text-blue">
                  {item.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-b from-blue/5 to-white relative overflow-hidden">
        <BackgroundIllustrations sectionClass="z-0" />
        <div className="container mx-auto relative z-10 px-4 lg:px-0">
          <h2 className="text-3xl lg:text-5xl text-center font-bold mb-8 lg:mb-12 text-blue">
            {currentContent.teachers.title}{" "}
            <span className="text-gray-800">{currentContent.teachers.subtitle}</span>
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-start">
            {/* Teachers list */}
            <div className="flex flex-row lg:flex-col gap-4 w-full lg:w-1/4 overflow-x-auto pb-4 lg:pb-0">
              {teachers.map((t) => (
                <motion.div
                  key={t.id}
                  onClick={() => setActiveTeacher(t)}
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-xl cursor-pointer transition-all duration-300 min-w-[280px] lg:min-w-0
                    ${activeTeacher.id === t.id ? "bg-blue text-white" : "hover:bg-blue/10 bg-white"}`}
                >
                  <div className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full ${t.color}`} />
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover border border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm lg:text-base truncate ${activeTeacher.id === t.id ? "text-white" : "text-gray-800"}`}>
                      {t.name}
                    </p>
                    <p className={`text-xs lg:text-sm ${activeTeacher.id === t.id ? "text-white/80" : "text-gray-500"}`}>
                      {t.score}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Selected teacher details */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center w-full lg:w-3/4">
              {/* Video section */}
              <motion.div
                key={activeTeacher.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl overflow-hidden shadow-lg w-full lg:w-auto"
              >
                <img
                  src={activeTeacher.video}
                  alt={activeTeacher.name}
                  className="w-full lg:w-[320px] xl:w-[400px] 2xl:w-[420px] h-64 lg:h-auto object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white text-blue flex items-center justify-center rounded-full shadow-md hover:scale-110 transition-transform">
                    <FaPlay size={18} className="lg:w-5 lg:h-5" />
                  </div>
                </div>
              </motion.div>

              {/* Description section */}
              <motion.div
                key={activeTeacher.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-4 lg:gap-6 w-full"
              >
                <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                  {activeTeacher.desc}
                </p>

                <div className="flex gap-4 lg:gap-6">
                  <div className="bg-blue text-white rounded-xl px-4 lg:px-6 py-3 lg:py-4 flex flex-col items-center flex-1">
                    <span className="text-xl lg:text-3xl font-bold">{activeTeacher.exp}</span>
                    <span className="text-xs lg:text-sm opacity-80 text-center">{currentContent.teachers.yearsExp}</span>
                  </div>
                  <div className="bg-gray-100 text-blue rounded-xl px-4 lg:px-6 py-3 lg:py-4 flex flex-col items-center flex-1">
                    <span className="text-xl lg:text-3xl font-bold">
                      {activeTeacher.students}
                    </span>
                    <span className="text-xs lg:text-sm opacity-80 text-center">{currentContent.teachers.students}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-b from-white to-blue/5 relative overflow-hidden">
        <BackgroundIllustrations sectionClass="z-0" />
        <div className="container mx-auto relative z-10 px-4 lg:px-0">
          <h2 className="text-3xl lg:text-5xl text-center font-bold mb-8 lg:mb-12 text-blue">
            {currentContent.results.title}{" "}
            <span className="text-gray-800">{currentContent.results.subtitle}</span>
          </h2>

          {/* IELTS Results Marquee */}
          <div className="mb-12 lg:mb-16">
            <h3 className="text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-8 text-blue">{currentContent.results.ielts}</h3>
            <div className="relative overflow-hidden">
              <motion.div
                className="flex gap-4 lg:gap-6"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 20,
                  ease: "linear",
                }}
              >
                {loopIeltsResults.map((res, index) => (
                  <motion.div
                    key={`${res.id}-${index}`}
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0 w-64 lg:w-80 bg-white rounded-2xl shadow-md hover:shadow-blue/30 transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={res.img}
                        alt={res.name}
                        className="w-full h-48 lg:h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 text-white">
                        <p className="text-base lg:text-lg font-semibold">{res.name}</p>
                        <p className="text-xs lg:text-sm opacity-80">{res.score}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <div className="absolute inset-y-0 left-0 w-16 lg:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-20"></div>
              <div className="absolute inset-y-0 right-0 w-16 lg:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-20"></div>
            </div>
          </div>

          {/* CEFR Results Marquee */}
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-8 text-green-600">{currentContent.results.cefr}</h3>
            <div className="relative overflow-hidden">
              <motion.div
                className="flex gap-4 lg:gap-6"
                animate={{ x: ["-50%", "0%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 18,
                  ease: "linear",
                }}
              >
                {loopCefrResults.map((res, index) => (
                  <motion.div
                    key={`${res.id}-${index}`}
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0 w-64 lg:w-80 bg-white rounded-2xl shadow-md hover:shadow-green-300/30 transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={res.img}
                        alt={res.name}
                        className="w-full h-48 lg:h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 text-white">
                        <p className="text-base lg:text-lg font-semibold">{res.name}</p>
                        <p className="text-xs lg:text-sm opacity-80">{res.score}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <div className="absolute inset-y-0 left-0 w-16 lg:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-20"></div>
              <div className="absolute inset-y-0 right-0 w-16 lg:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-b from-blue/5 to-white relative overflow-hidden">
        <BackgroundIllustrations sectionClass="z-0" />
        <div className="container mx-auto relative z-10 px-4 lg:px-0">
          <h2 className="text-3xl lg:text-5xl text-center font-bold mb-8 lg:mb-12">
            {currentContent.courses.title}{" "}
            <span className="text-blue italic">{currentContent.courses.subtitle}</span>
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Courses list */}
            <div className="w-full lg:w-2/5">
              {/* Mobile & Tablet - Horizontal Scroll */}
              <div className="block lg:hidden">
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                  {courses.map((course) => (
                    <motion.div
                      key={course.id}
                      onClick={() => setActiveCourse(course)}
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 min-w-[200px] snap-center ${
                        activeCourse.id === course.id 
                          ? 'bg-blue text-white border-blue shadow-lg' 
                          : 'bg-white border-blue/20 hover:border-blue/50 hover:bg-blue/5'
                      }`}
                    >
                      <div className="text-2xl">{course.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-sm truncate ${
                          activeCourse.id === course.id ? 'text-white' : 'text-gray-800'
                        }`}>
                          {course.name}
                        </h3>
                        <p className={`text-xs mt-1 line-clamp-1 ${
                          activeCourse.id === course.id ? 'text-white/80' : 'text-gray-600'
                        }`}>
                          {course.desc}
                        </p>
                      </div>
                      {activeCourse.id === course.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-white rounded-full flex-shrink-0"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Desktop - Vertical List */}
              <div className="hidden lg:block space-y-4">
                {courses.map((course) => (
                  <motion.div
                    key={course.id}
                    onClick={() => setActiveCourse(course)}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                      activeCourse.id === course.id 
                        ? 'bg-blue text-white border-blue shadow-lg' 
                        : 'bg-white border-blue/20 hover:border-blue/50 hover:bg-blue/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{course.icon}</div>
                      <div className="flex-1">
                        <h3 className={`text-xl font-semibold ${
                          activeCourse.id === course.id ? 'text-white' : 'text-gray-800'
                        }`}>
                          {course.name}
                        </h3>
                        <p className={`mt-1 ${
                          activeCourse.id === course.id ? 'text-white/80' : 'text-gray-600'
                        }`}>
                          {course.desc}
                        </p>
                      </div>
                      {activeCourse.id === course.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 bg-white rounded-full"
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Selected course details */}
            <motion.div
              key={activeCourse.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-3/5 bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-blue/10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl lg:text-4xl">{activeCourse.icon}</div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">{activeCourse.name}</h3>
                  <p className="text-gray-600 text-base lg:text-lg mt-1">{activeCourse.desc}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 lg:p-4 bg-blue/5 rounded-xl">
                    <span className="font-semibold text-gray-700 text-sm lg:text-base">{currentContent.courses.details.duration}</span>
                    <span className="text-blue font-bold text-sm lg:text-base">{activeCourse.details.duration}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 lg:p-4 bg-blue/5 rounded-xl">
                    <span className="font-semibold text-gray-700 text-sm lg:text-base">{currentContent.courses.details.level}</span>
                    <span className="text-blue font-bold text-sm lg:text-base">{activeCourse.details.level}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 lg:p-4 bg-blue/5 rounded-xl">
                    <span className="font-semibold text-gray-700 text-sm lg:text-base">{currentContent.courses.details.format}</span>
                    <span className="text-blue font-bold text-sm lg:text-base">{activeCourse.details.format}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 lg:p-4 bg-blue/5 rounded-xl">
                    <span className="font-semibold text-gray-700 text-sm lg:text-base">{currentContent.courses.details.price}</span>
                    <span className="text-blue font-bold text-sm lg:text-base">{activeCourse.details.price}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6 lg:mb-8">
                <h4 className="text-lg lg:text-xl font-semibold text-gray-800 mb-3 lg:mb-4">{currentContent.courses.details.features}</h4>
                <div className="grid grid-cols-1 gap-2 lg:gap-3">
                  {activeCourse.details.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm lg:text-base">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue text-white py-3 lg:py-4 rounded-xl font-semibold text-base lg:text-lg hover:bg-blue/90 transition-all duration-300 shadow-lg"
              >
                {activeCourse.name} {currentContent.courses.registerBtn}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-24 bg-gradient-to-b from-white to-blue/10 relative overflow-hidden">
        <BackgroundIllustrations sectionClass="z-0" />
        <div className="container mx-auto max-w-4xl relative z-10 px-4 lg:px-0">
          <h2 className="text-3xl lg:text-5xl font-bold mb-8 lg:mb-12 text-center">
            {currentContent.faq.title}{" "}
            <span className="text-blue italic">{currentContent.faq.subtitle}</span>
          </h2>

          <div className="space-y-3 lg:space-y-4">
            {currentContent.faq.items.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-blue/10 rounded-2xl shadow-sm hover:shadow-blue/20 transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full flex justify-between items-center p-4 lg:p-6 text-left font-medium text-base lg:text-lg hover:bg-blue/5 transition-colors duration-300"
                >
                  <span className="text-gray-800 pr-4 text-sm lg:text-base">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <FaChevronDown className="text-blue w-4 h-4 lg:w-5 lg:h-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="px-4 lg:px-6 pb-4 lg:pb-6 text-gray-600 leading-relaxed border-t border-blue/10 text-sm lg:text-base"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-12 lg:py-24 bg-gradient-to-b from-blue/10 to-white relative overflow-hidden">
        <BackgroundIllustrations sectionClass="z-0" />
        <div className="container mx-auto relative z-10 px-4 lg:px-0">
          <h2 className="text-3xl lg:text-5xl font-bold mb-8 lg:mb-12 text-center">
            {currentContent.advantages.title}{" "}
            <span className="text-blue italic">{currentContent.advantages.subtitle}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {currentContent.advantages.items.map((adv, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  rotate: [0, -2, 2, 0],
                  transition: { duration: 0.4 },
                }}
                className="p-6 lg:p-10 rounded-3xl bg-white shadow-md border border-blue/10 hover:shadow-blue/30 
                           transition-all duration-500 flex flex-col gap-3 lg:gap-4 items-start hover:bg-blue/5"
              >
                <div className="text-blue">
                  {React.cloneElement(adv.icon, { size: window.innerWidth < 1024 ? 32 : 40 })}
                </div>
                <h3 className="text-lg lg:text-xl font-semibold">{adv.title}</h3>
                <p className="text-gray-600 text-sm lg:text-base">{adv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 lg:py-24 bg-gradient-to-b from-blue/10 to-white overflow-hidden relative">
        <BackgroundIllustrations sectionClass="z-0" />
        <div className="container mx-auto text-center mb-8 lg:mb-12 relative z-10 px-4 lg:px-0">
          <h2 className="text-3xl lg:text-5xl font-bold text-blue">
            {currentContent.gallery.title}{" "}
            <span className="text-gray-800 italic">{currentContent.gallery.subtitle}</span>
          </h2>
        </div>

        {/* MARQUEE ANIMATION */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4 lg:gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
          >
            {loopImages.map((image, index) => (
              <motion.div
                key={`${image.id}-${index}`}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 w-[280px] h-[200px] lg:w-[350px] lg:h-[250px] rounded-2xl overflow-hidden shadow-md hover:shadow-blue/40 transition-all duration-300 cursor-pointer"
                onClick={() => openImageModal(image)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
          
          <div className="absolute inset-y-0 left-0 w-16 lg:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-20"></div>
          <div className="absolute inset-y-0 right-0 w-16 lg:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-20"></div>
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeImageModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative max-w-4xl max-h-full w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeImageModal}
                  className="absolute -top-12 lg:-top-16 right-0 text-white hover:text-orange-500 transition-colors z-10 text-2xl lg:text-3xl"
                >
                  ✕
                </button>
                
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="w-full h-64 lg:h-96 object-cover"
                  />
                  
                  <div className="p-4 lg:p-6">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">{selectedImage.title}</h3>
                    <p className="text-gray-600 text-sm lg:text-base">{selectedImage.desc}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Events Section */}
      <section id='event' className='py-12 lg:py-24 overflow-hidden relative'>
        <div className="container text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-blue mb-8 lg:mb-12">
            {currentContent.events.title}{" "}
            <span className="text-gray-800 italic">{currentContent.events.subtitle}</span>
          </h2>
          <div className="grid grid-cols-2 gap-12">
            <img src={event} alt="sunday event" className='rounded-2xl'/>
            <div className="p-5 bg-gray-100 rounded-xl">
              <h3 className='text-2xl font-semibold mb-2 '>
                {currentContent.events.registerBtn} <span className='text-blue'></span>
              </h3>
              <form action="#" className='flex flex-col gap-5 items-start'>
                <label className='flex flex-col gap-2 items-start w-full'>
                  <span>{currentContent.events.namePlaceholder}</span>
                  <input type="text" placeholder={currentContent.events.namePlaceholder} className='p-3 bg-white outline-none w-full' />
                </label>
                <label className='flex flex-col gap-2 items-start w-full'>
                  <span>{currentContent.events.agePlaceholder}</span>
                  <input type="number" placeholder={currentContent.events.agePlaceholder} className='p-3 bg-white outline-none w-full' />
                </label>
                <label className='flex flex-col gap-2 items-start w-full'>
                  <span>{currentContent.events.phonePlaceholder}</span>
                  <input type="tel" placeholder={currentContent.events.phonePlaceholder} className='p-3 bg-white outline-none w-full' />
                </label>
                <input type="submit" value={currentContent.events.submitBtn} className='bg-blue text-white text-2xl px-5 py-3 w-full rounded-xl ' />
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 lg:py-24 bg-gradient-to-b from-white to-blue/10 relative overflow-hidden">
        <BackgroundIllustrations sectionClass="z-0" />
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start relative z-10 px-4 lg:px-0">
          
          {/* LEFT - MAP */}
          <motion.div
            initial={{ opacity: 0, x: -60 }} 
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden shadow-md border border-blue/10 h-full order-2 lg:order-1"
          >
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.004795453528!2d69.281!3d41.3111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDEuMzExMSwgNjkuMjgx!5e0!3m2!1sen!2s!4v1691234567890"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              className="border-0"
            ></iframe>
          </motion.div>

          {/* RIGHT - FORM */}
          <motion.form
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-md border border-blue/10 p-6 lg:p-8 space-y-4 lg:space-y-6 order-1 lg:order-2"
          >
            <h2 className="text-2xl lg:text-4xl font-bold text-blue mb-4 lg:mb-6">{currentContent.contact.title}</h2>

            {/* Ism + Yosh */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              <div>
                <label className="block text-gray-600 mb-2 text-sm lg:text-base">{currentContent.contact.name}</label>
                <input
                  type="text"
                  placeholder={currentContent.contact.name}
                  className="w-full p-3 rounded-xl border border-blue/20 focus:ring-2 focus:ring-blue outline-none transition-all duration-300 text-sm lg:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2 text-sm lg:text-base">{currentContent.contact.age}</label>
                <input
                  type="number"
                  placeholder={currentContent.contact.age}
                  className="w-full p-3 rounded-xl border border-blue/20 focus:ring-2 focus:ring-blue outline-none transition-all duration-300 text-sm lg:text-base"
                />
              </div>
            </div>

            {/* Telefonlar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              <div>
                <label className="block text-gray-600 mb-2 text-sm lg:text-base">{currentContent.contact.phone1}</label>
                <input
                  type="tel"
                  placeholder={currentContent.contact.phone1}
                  className="w-full p-3 rounded-xl border border-blue/20 focus:ring-2 focus:ring-blue outline-none transition-all duration-300 text-sm lg:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2 text-sm lg:text-base">{currentContent.contact.phone2}</label>
                <input
                  type="tel"
                  placeholder={currentContent.contact.phone2}
                  className="w-full p-3 rounded-xl border border-blue/20 focus:ring-2 focus:ring-blue outline-none transition-all duration-300 text-sm lg:text-base"
                />
              </div>
            </div>

            {/* Kurs tanlash */}
            <div>
              <label className="block text-gray-600 mb-2 text-sm lg:text-base">{currentContent.contact.course}</label>
              <select className="w-full p-3 rounded-xl border border-blue/20 focus:ring-2 focus:ring-blue outline-none transition-all duration-300 text-sm lg:text-base">
                <option value="">{currentContent.common.select}</option>
                {courses.map(course => (
                  <option key={course.id}>{course.name}</option>
                ))}
              </select>
            </div>

            {/* O'qish formati */}
            <div>
              <label className="block text-gray-600 mb-2 text-sm lg:text-base">{currentContent.contact.format}</label>
              <div className="grid grid-cols-3 gap-2 lg:gap-3">
                {currentContent.contact.formats.map((format) => (
                  <button
                    key={format.value}
                    type="button"
                    onClick={() => setSelectedFormat(format.value)}
                    className={`p-2 lg:p-3 rounded-xl border transition-all duration-300 text-xs lg:text-sm ${
                      selectedFormat === format.value
                        ? "bg-blue text-white border-blue"
                        : "border-blue/20 hover:bg-blue/5"
                    }`}
                  >
                    {format.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Vaqt tanlash */}
            <div>
              <label className="block text-gray-600 mb-2 text-sm lg:text-base">{currentContent.contact.time}</label>
              <select 
                className="w-full p-3 rounded-xl border border-blue/20 focus:ring-2 focus:ring-blue outline-none mb-3 transition-all duration-300 text-sm lg:text-base"
                onChange={(e) => setSelectedTime(e.target.value)}
                value={selectedTime}
              >
                <option value="">{currentContent.contact.selectTime}</option>
                <option value="morning">9:00 - 10:30</option>
                <option value="morning">10:30 - 12:00</option>
                <option value="morning">12:00 - 14:00</option>
                <option value="morning">10:30 - 12:00</option>
                <option value="morning">15:30 - 17:00</option>
                <option value="morning">17:00 - 18:30</option>
              </select>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 lg:gap-3">
                {selectedTime && [
                  "08:00 - 09:30",
                  "09:30 - 11:00", 
                  "11:00 - 12:30",
                  "13:00 - 14:30",
                  "14:30 - 16:00",
                  "16:00 - 17:30",
                  "17:00 - 18:30"
                ].map((time) => (
                  <button
                    key={time}
                    type="button"
                    className="p-2 text-xs lg:text-sm rounded-xl border border-blue/20 hover:bg-blue hover:text-white transition-all duration-300"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue text-white py-3 lg:py-4 rounded-xl font-semibold hover:bg-blue/90 transition-all duration-300 shadow-lg text-sm lg:text-base"
            >
              {currentContent.contact.submit}
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Logo va description */}
            <div className="lg:col-span-1">
              <Link to="/"><img src={logo} alt="" className='w-40 lg:w-60 mb-4 lg:mb-6'/></Link>
              <p className="text-gray-400 mb-4 leading-relaxed text-sm lg:text-base">
                {currentContent.footer.description}
              </p>
              <div className="flex gap-3 lg:gap-4">
                <a href="#" className="text-gray-400 hover:text-blue transition-colors duration-300">
                  <FaFacebook size={18} className="lg:w-5 lg:h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue transition-colors duration-300">
                  <FaTelegram size={18} className="lg:w-5 lg:h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue transition-colors duration-300">
                  <FaInstagram size={18} className="lg:w-5 lg:h-5" />
                </a>
              </div>
            </div>

            {/* Kurslar */}
            <div>
              <h4 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">{currentContent.footer.courses}</h4>
              <ul className="space-y-1 lg:space-y-2">
                {footerLinks.courses.map((course, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm lg:text-base">
                      {course}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Filiallar */}
            <div>
              <h4 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">{currentContent.footer.branches}</h4>
              <ul className="space-y-1 lg:space-y-2">
                {footerLinks.branches.map((branch, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm lg:text-base">
                      {branch}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontaktlar */}
            <div>
              <h4 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">{currentContent.footer.contact}</h4>
              <ul className="space-y-2 lg:space-y-3">
                {footerLinks.contacts.map((contact, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-400 text-sm lg:text-base">
                    {index < 2 ? <FaPhone size={12} className="lg:w-3 lg:h-3" /> : <FaEnvelope size={12} className="lg:w-3 lg:h-3" />}
                    {contact}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-800 mt-6 lg:mt-8 pt-6 lg:pt-8 text-center text-gray-400 text-sm lg:text-base">
            <p>{currentContent.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default StudyCenter