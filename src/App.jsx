import { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════════════════════════════════
 SOURATES — 15 courtes existantes + Ayat al-Kursi + 4 sourates clés
 (Al-Mulk, Yâ-Sîn, Al-Kahf, Al-Wâqiʿa)
═════════════════════════════════════════════════════════════════════ */

const SURAHS = [
  {
    num: 1,
    name: "Al-Fâtiha",
    ar_name: "الفاتحة",
    cat: "essentielle",
    tip: "Récitée dans chaque rakaa de la prière. La base de tout l'islam.",
    verses: [
      [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "Bismillāhi r-raḥmāni r-raḥīm",
        "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux",
      ],
      [
        "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        "Al-ḥamdu lillāhi rabbi l-ʿālamīn",
        "Louange à Allah, Seigneur des mondes",
      ],
      [
        "الرَّحْمَٰنِ الرَّحِيمِ",
        "Ar-raḥmāni r-raḥīm",
        "Le Tout Miséricordieux, le Très Miséricordieux",
      ],
      [
        "مَالِكِ يَوْمِ الدِّينِ",
        "Māliki yawmi d-dīn",
        "Maître du Jour de la rétribution",
      ],
      [
        "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        "Iyyāka naʿbudu wa-iyyāka nastaʿīn",
        "C'est Toi seul que nous adorons, et c'est Toi seul dont nous implorons le secours",
      ],
      [
        "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        "Ihdinā ṣ-ṣirāṭa l-mustaqīm",
        "Guide-nous dans le droit chemin",
      ],
      [
        "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        "Ṣirāṭa llaḏīna anʿamta ʿalayhim ġayri l-maġḍūbi ʿalayhim wa-lā ḍ-ḍāllīn",
        "Le chemin de ceux que Tu as comblés de bienfaits, non pas de ceux qui ont encouru Ta colère, ni des égarés",
      ],
    ],
  },

  {
    num: "2:255",
    name: "Âyat al-Kursî",
    ar_name: "آية الكرسي",
    cat: "essentielle",
    tip: "Le verset le plus grand du Coran. Le Prophète ﷺ a dit : « Celui qui le récite après chaque prière obligatoire, rien ne le sépare du Paradis sauf la mort. » (Nasâʾî, authentique)",
    verses: [
      [
        "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        "Allāhu lā ilāha illā huwa l-ḥayyu l-qayyūm, lā taʾḫuḏuhu sinatun wa-lā nawm, lahu mā fī s-samāwāti wa-mā fī l-arḍ, man ḏā llaḏī yašfaʿu ʿindahu illā bi-iḏnih, yaʿlamu mā bayna aydīhim wa-mā ḫalfahum, wa-lā yuḥīṭūna bi-šayʾin min ʿilmihi illā bimā šāʾ, wasiʿa kursiyyuhu s-samāwāti wa-l-arḍ, wa-lā yaʾūduhu ḥifẓuhumā, wa-huwa l-ʿaliyyu l-ʿaẓīm",
        "Allah ! Point de divinité à part Lui, le Vivant, Celui qui subsiste par Lui-même. Ni somnolence ni sommeil ne Le saisissent. À Lui appartient tout ce qui est dans les cieux et sur la terre. Qui peut intercéder auprès de Lui sans Sa permission ? Il connaît leur passé et leur futur. Et de Sa science, ils n'embrassent que ce qu'Il veut. Son Trône déborde les cieux et la terre, dont la garde ne Lui coûte aucune peine. Et Il est le Très-Haut, le Très-Grand.",
      ],
    ],
  },

  {
    num: 112,
    name: "Al-Ikhlâs",
    ar_name: "الإخلاص",
    cat: "essentielle",
    tip: "Équivaut à 1/3 du Coran. Sourate centrale sur l'Unicité d'Allah.",
    verses: [
      [
        "قُلْ هُوَ اللَّهُ أَحَدٌ",
        "Qul huwa llāhu aḥad",
        "Dis : Il est Allah, Unique",
      ],
      ["اللَّهُ الصَّمَدُ", "Allāhu ṣ-ṣamad", "Allah, l'Éternel Absolu"],
      [
        "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        "Lam yalid wa-lam yūlad",
        "Il n'a pas engendré et n'a pas été engendré",
      ],
      [
        "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        "Wa-lam yakun lahu kufuwan aḥad",
        "Et nul n'est égal à Lui",
      ],
    ],
  },

  {
    num: 113,
    name: "Al-Falaq",
    ar_name: "الفلق",
    cat: "essentielle",
    tip: "Protection contre le mal extérieur. Récitée 3x le matin et le soir.",
    verses: [
      [
        "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
        "Qul aʿūḏu bi-rabbi l-falaq",
        "Dis : Je cherche protection auprès du Seigneur de l'aube naissante",
      ],
      [
        "مِن شَرِّ مَا خَلَقَ",
        "Min šarri mā ḫalaq",
        "Contre le mal de ce qu'Il a créé",
      ],
      [
        "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
        "Wa-min šarri ġāsiqin iḏā waqab",
        "Contre le mal de l'obscurité quand elle s'étend",
      ],
      [
        "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
        "Wa-min šarri n-naffāṯāti fī l-ʿuqad",
        "Contre le mal des souffleuses sur les nœuds",
      ],
      [
        "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        "Wa-min šarri ḥāsidin iḏā ḥasad",
        "Contre le mal de l'envieux quand il envie",
      ],
    ],
  },

  {
    num: 114,
    name: "An-Nâs",
    ar_name: "الناس",
    cat: "essentielle",
    tip: "Protection contre le mal intérieur. Récitée 3x le matin et le soir avec Al-Falaq.",
    verses: [
      [
        "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        "Qul aʿūḏu bi-rabbi n-nās",
        "Dis : Je cherche protection auprès du Seigneur des hommes",
      ],
      ["مَلِكِ النَّاسِ", "Maliki n-nās", "Le Roi des hommes"],
      ["إِلَٰهِ النَّاسِ", "Ilāhi n-nās", "Le Dieu des hommes"],
      [
        "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
        "Min šarri l-waswāsi l-ḫannās",
        "Contre le mal du mauvais tentateur",
      ],
      [
        "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
        "Allaḏī yuwaswisu fī ṣudūri n-nās",
        "Qui souffle le mal dans les poitrines des hommes",
      ],
      [
        "مِنَ الْجِنَّةِ وَالنَّاسِ",
        "Mina l-jinnati wa-n-nās",
        "Qu'il soit parmi les djinns ou les hommes",
      ],
    ],
  },

  {
    num: 108,
    name: "Al-Kawthar",
    ar_name: "الكوثر",
    cat: "courte",
    tip: "Sourate la plus courte du Coran. Révélée en signe de réconfort au Prophète ﷺ.",
    verses: [
      [
        "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
        "Innā aʿṭaynāka l-kawṯar",
        "En vérité, Nous t'avons accordé l'abondance",
      ],
      [
        "فَصَلِّ لِرَبِّكَ وَانْحَرْ",
        "Faṣalli li-rabbika wa-nḥar",
        "Accomplis donc la Salat pour ton Seigneur et sacrifie",
      ],
      [
        "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ",
        "Inna šāniʾaka huwa l-abtar",
        "C'est ton ennemi qui est sans postérité",
      ],
    ],
  },

  {
    num: 103,
    name: "Al-ʿAsr",
    ar_name: "العصر",
    cat: "courte",
    tip: "Imam Shâfiʿî : si Allah n'avait révélé que cette sourate, elle suffirait à guider l'humanité.",
    verses: [
      ["وَالْعَصْرِ", "Wa-l-ʿaṣr", "Par le Temps"],
      [
        "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",
        "Inna l-insāna lafī ḫusr",
        "Certes, l'homme est en perdition",
      ],
      [
        "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
        "Illā llaḏīna āmanū wa-ʿamilū ṣ-ṣāliḥāti wa-tawāṣaw bi-l-ḥaqqi wa-tawāṣaw bi-ṣ-ṣabr",
        "Sauf ceux qui croient, accomplissent les bonnes œuvres, s'enjoignent mutuellement la vérité et la patience",
      ],
    ],
  },

  {
    num: 110,
    name: "An-Nasr",
    ar_name: "النصر",
    cat: "courte",
    tip: "Révélée lors de la conquête de La Mecque. Le Prophète ﷺ sut qu'elle annonçait sa fin proche.",
    verses: [
      [
        "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ",
        "Iḏā jāʾa naṣru llāhi wa-l-fatḥ",
        "Lorsque vient le secours d'Allah et la victoire",
      ],
      [
        "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا",
        "Wa-raʾayta n-nāsa yadḫulūna fī dīni llāhi afwājā",
        "Et que tu vois les gens entrer en foule dans la religion d'Allah",
      ],
      [
        "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ إِنَّهُ كَانَ تَوَّابًا",
        "Fasabbiḥ bi-ḥamdi rabbika wa-staġfirhu innahu kāna tawwābā",
        "Alors célèbre les louanges de ton Seigneur et implore Son pardon. Il est certes le Grand Accueillant au repentir",
      ],
    ],
  },

  {
    num: 109,
    name: "Al-Kâfirûn",
    ar_name: "الكافرون",
    cat: "courte",
    tip: "Récitée dans la 1ère rakaa de la Sounnah de Fajr. Déclare l'innocence vis-à-vis du polythéisme.",
    verses: [
      [
        "قُلْ يَا أَيُّهَا الْكَافِرُونَ",
        "Qul yā ayyuhā l-kāfirūn",
        "Dis : Ô mécréants !",
      ],
      [
        "لَا أَعْبُدُ مَا تَعْبُدُونَ",
        "Lā aʿbudu mā taʿbudūn",
        "Je n'adore pas ce que vous adorez",
      ],
      [
        "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ",
        "Wa-lā antum ʿābidūna mā aʿbud",
        "Et vous n'adorez pas ce que j'adore",
      ],
      [
        "وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ",
        "Wa-lā anā ʿābidun mā ʿabadtum",
        "Et je n'adorerai pas ce que vous adorez",
      ],
      [
        "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ",
        "Wa-lā antum ʿābidūna mā aʿbud",
        "Et vous n'adorerez pas ce que j'adore",
      ],
      [
        "لَكُمْ دِينُكُمْ وَلِيَ دِينِ",
        "Lakum dīnukum wa-liya dīn",
        "À vous votre religion, à moi ma religion",
      ],
    ],
  },

  {
    num: 111,
    name: "Al-Masad",
    ar_name: "المسد",
    cat: "courte",
    tip: "Révélée en réponse à Abû Lahab, oncle du Prophète ﷺ, qui s'y opposa farouchement.",
    verses: [
      [
        "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ",
        "Tabbat yadā abī lahabin wa-tabb",
        "Que périssent les deux mains d'Abou Lahab, et qu'il périsse",
      ],
      [
        "مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ",
        "Mā aġnā ʿanhu māluhu wa-mā kasab",
        "Sa fortune ne lui a servi à rien, ni ce qu'il a acquis",
      ],
      [
        "سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ",
        "Sayaṣlā nāran ḏāta lahab",
        "Il brûlera dans un feu ardent",
      ],
      [
        "وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ",
        "Wa-mraʾatuhu ḥammālata l-ḥaṭab",
        "Ainsi que sa femme, porteuse de bois",
      ],
      [
        "فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ",
        "Fī jīdihā ḥablun min masad",
        "À son cou, une corde de fibres de palmier",
      ],
    ],
  },

  {
    num: 105,
    name: "Al-Fîl",
    ar_name: "الفيل",
    cat: "courte",
    tip: "Rappelle la destruction de l'armée d'Abraha venue détruire la Kaaba l'année de la naissance du Prophète ﷺ.",
    verses: [
      [
        "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ",
        "Alam tara kayfa faʿala rabbuka bi-aṣḥābi l-fīl",
        "N'as-tu pas vu comment ton Seigneur a agi avec les gens de l'Éléphant ?",
      ],
      [
        "أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ",
        "Alam yajʿal kaydahum fī taḍlīl",
        "N'a-t-Il pas rendu vaine leur ruse ?",
      ],
      [
        "وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ",
        "Wa-arsala ʿalayhim ṭayran abābīl",
        "Et envoyé contre eux des oiseaux en vol groupé",
      ],
      [
        "تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ",
        "Tarmīhim bi-ḥijāratin min sijjīl",
        "Leur lançant des pierres de terre cuite",
      ],
      [
        "فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ",
        "Fajaʿalahum kaʿaṣfin maʾkūl",
        "Et Il les a rendus pareils à de la paille mâchée",
      ],
    ],
  },

  {
    num: 106,
    name: "Quraysh",
    ar_name: "قريش",
    cat: "courte",
    tip: "Rappelle les bénédictions accordées aux Quraysh : sécurité et nourriture. Liée à Al-Fîl.",
    verses: [
      [
        "لِإِيلَافِ قُرَيْشٍ",
        "Li-ʾīlāfi qurayš",
        "À cause de l'accoutumance des Quraysh",
      ],
      [
        "إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ",
        "ʾīlāfihim riḥlata š-šitāʾi wa-ṣ-ṣayf",
        "Leur accoutumance aux voyages d'hiver et d'été",
      ],
      [
        "فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ",
        "Falyaʿbudū rabba hāḏā l-bayt",
        "Qu'ils adorent donc le Seigneur de cette Maison",
      ],
      [
        "الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ",
        "Allaḏī aṭʿamahum min jūʿin wa-āmanahum min ḫawf",
        "Qui les a nourris contre la faim et préservés de la crainte",
      ],
    ],
  },

  {
    num: 107,
    name: "Al-Mâʿûn",
    ar_name: "الماعون",
    cat: "courte",
    tip: "Dénonce l'hypocrisie : prier par ostentation et refuser d'aider les autres.",
    verses: [
      [
        "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ",
        "Araʾayta llaḏī yukaḏḏibu bi-d-dīn",
        "As-tu vu celui qui traite la religion de mensonge ?",
      ],
      [
        "فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ",
        "Faḏālika llaḏī yaduʿʿu l-yatīm",
        "C'est celui-là qui repousse l'orphelin",
      ],
      [
        "وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ",
        "Wa-lā yaḥuḍḍu ʿalā ṭaʿāmi l-miskīn",
        "Et qui n'encourage pas à nourrir le pauvre",
      ],
      [
        "فَوَيْلٌ لِّلْمُصَلِّينَ",
        "Fawaylun lil-muṣallīn",
        "Malheur donc à ceux qui prient",
      ],
      [
        "الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ",
        "Allaḏīna hum ʿan ṣalātihim sāhūn",
        "Et qui sont négligents dans leur prière",
      ],
      [
        "الَّذِينَ هُمْ يُرَاءُونَ",
        "Allaḏīna hum yurāʾūn",
        "Qui font montre d'hypocrisie",
      ],
      [
        "وَيَمْنَعُونَ الْمَاعُونَ",
        "Wa-yamnaʿūna l-māʿūn",
        "Et refusent l'ustensile du ménage",
      ],
    ],
  },

  {
    num: 99,
    name: "Az-Zalzala",
    ar_name: "الزلزلة",
    cat: "courte",
    tip: "Décrit le Jour du Jugement avec une précision saisissante. « Quiconque fait un atome de bien le verra. »",
    verses: [
      [
        "إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا",
        "Iḏā zulzilati l-arḍu zilzālahā",
        "Quand la terre tremblera d'un violent séisme",
      ],
      [
        "وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا",
        "Wa-aḫrajati l-arḍu aṯqālahā",
        "Et que la terre jettera ses fardeaux",
      ],
      [
        "وَقَالَ الْإِنسَانُ مَا لَهَا",
        "Wa-qāla l-insānu mā lahā",
        "Et que l'homme dira : Qu'a-t-elle ?",
      ],
      [
        "يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا",
        "Yawmaʾiḏin tuḥaddiṯu aḫbārahā",
        "Ce jour-là, elle racontera ses nouvelles",
      ],
      [
        "بِأَنَّ رَبَّكَ أَوْحَىٰ لَهَا",
        "Bi-anna rabbaka awḥā lahā",
        "Parce que ton Seigneur le lui aura inspiré",
      ],
      [
        "يَوْمَئِذٍ يَصْدُرُ النَّاسُ أَشْتَاتًا",
        "Yawmaʾiḏin yaṣduru n-nāsu aštātā",
        "Ce jour-là, les gens sortiront en groupes dispersés",
      ],
      [
        "لِّيُرَوْا أَعْمَالَهُمْ",
        "Liyuraw aʿmālahum",
        "Pour qu'on leur montre leurs œuvres",
      ],
      [
        "فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ",
        "Faman yaʿmal miṯqāla ḏarratin ḫayran yarah",
        "Quiconque fait un atome de bien le verra",
      ],
      [
        "وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ",
        "Wa-man yaʿmal miṯqāla ḏarratin šarran yarah",
        "Et quiconque fait un atome de mal le verra",
      ],
    ],
  },

  {
    num: 94,
    name: "Ash-Sharh",
    ar_name: "الشرح",
    cat: "courte",
    tip: "Révélée pour réconforter le Prophète ﷺ. Message clé : après chaque difficulté vient la facilité.",
    verses: [
      [
        "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ",
        "Alam nashraḥ laka ṣadrak",
        "N'avons-Nous pas dilaté ta poitrine ?",
      ],
      [
        "وَوَضَعْنَا عَنكَ وِزْرَكَ",
        "Wa-waḍaʿnā ʿanka wizrak",
        "Et n'avons-Nous pas allégé ton fardeau",
      ],
      [
        "الَّذِي أَنقَضَ ظَهْرَكَ",
        "Allaḏī anqaḍa ẓahrak",
        "Qui t'accablait le dos ?",
      ],
      [
        "وَرَفَعْنَا لَكَ ذِكْرَكَ",
        "Wa-rafaʿnā laka ḏikrak",
        "Et n'avons-Nous pas élevé ta renommée ?",
      ],
      [
        "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
        "Fa-inna maʿa l-ʿusri yusrā",
        "Certes, avec la difficulté vient la facilité",
      ],
      [
        "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
        "Inna maʿa l-ʿusri yusrā",
        "Certes, avec la difficulté vient la facilité",
      ],
      [
        "فَإِذَا فَرَغْتَ فَانصَبْ",
        "Fa-iḏā faraġta fanṣab",
        "Lorsque tu seras libéré, travaille encore",
      ],
      [
        "وَإِلَىٰ رَبِّكَ فَارْغَب",
        "Wa-ilā rabbika farġab",
        "Et vers ton Seigneur, tourne-toi avec ardeur",
      ],
    ],
  },

  {
    num: 93,
    name: "Ad-Duhâ",
    ar_name: "الضحى",
    cat: "courte",
    tip: "Révélée après une interruption des révélations. Allah assure le Prophète ﷺ de Son amour constant.",
    verses: [
      ["وَالضُّحَىٰ", "Wa-ḍ-ḍuḥā", "Par la matinée lumineuse"],
      [
        "وَاللَّيْلِ إِذَا سَجَىٰ",
        "Wa-l-layli iḏā sajā",
        "Et par la nuit quand elle s'étend",
      ],
      [
        "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ",
        "Mā waddaʿaka rabbuka wa-mā qalā",
        "Ton Seigneur ne t'a pas abandonné et Il ne t'a pas oublié",
      ],
      [
        "وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ",
        "Wa-lal-āḫiratu ḫayrun laka mina l-ūlā",
        "Et certes la vie future est meilleure pour toi que la présente",
      ],
      [
        "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ",
        "Wa-lasawfa yuʿṭīka rabbuka fa-tarḍā",
        "Et ton Seigneur te donnera, et tu seras satisfait",
      ],
      [
        "أَلَمْ يَجِدْكَ يَتِيمًا فَآوَىٰ",
        "Alam yajidka yatīman fa-āwā",
        "Ne t'a-t-Il pas trouvé orphelin et recueilli ?",
      ],
      [
        "وَوَجَدَكَ ضَالًّا فَهَدَىٰ",
        "Wa-wajadaka ḍāllan fa-hadā",
        "Ne t'a-t-Il pas trouvé égaré et guidé ?",
      ],
      [
        "وَوَجَدَكَ عَائِلًا فَأَغْنَىٰ",
        "Wa-wajadaka ʿāʾilan fa-aġnā",
        "Ne t'a-t-Il pas trouvé pauvre et enrichi ?",
      ],
      [
        "فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ",
        "Fa-ammā l-yatīma falā taqhar",
        "Quant à l'orphelin, ne l'opprime pas",
      ],
      [
        "وَأَمَّا السَّائِلَ فَلَا تَنْهَرْ",
        "Wa-ammā s-sāʾila falā tanhar",
        "Et quant au mendiant, ne le repousse pas",
      ],
      [
        "وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ",
        "Wa-ammā bi-niʿmati rabbika fa-ḥaddiṯ",
        "Et quant aux bienfaits de ton Seigneur, proclame-les",
      ],
    ],
  },

  /* ─── SOURATES IMPORTANTES (longues) ─── */

  {
    num: 67,
    name: "Al-Mulk",
    ar_name: "الملك",
    cat: "importante",
    tip: "Le Prophète ﷺ a dit : « Une sourate du Coran de 30 versets a intercédé pour un homme jusqu'à ce qu'il soit pardonné : Tabârakalladhî biyadihil-mulk. » (Tirmidhî, Abû Dâwûd — authentique). À réciter chaque nuit avant de dormir : protège du châtiment de la tombe.",
    verses: [
      [
        "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        "Tabāraka llaḏī biyadihi l-mulk, wa-huwa ʿalā kulli šayʾin qadīr",
        "Béni soit Celui dans la main de qui est la royauté, et Il est Omnipotent.",
      ],
      [
        "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ",
        "Allaḏī ḫalaqa l-mawta wa-l-ḥayāta liyabluwakum ayyukum aḥsanu ʿamalā, wa-huwa l-ʿazīzu l-ġafūr",
        "Celui qui a créé la mort et la vie afin de vous éprouver, qui d'entre vous est le meilleur en œuvre. Il est le Puissant, le Pardonneur.",
      ],
      [
        "الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ",
        "Allaḏī ḫalaqa sabʿa samāwātin ṭibāqā, mā tarā fī ḫalqi r-raḥmāni min tafāwut, fa-rjiʿi l-baṣara hal tarā min fuṭūr",
        "C'est Lui qui a créé sept cieux superposés. Tu ne vois aucune contradiction dans la création du Tout Miséricordieux. Ramène donc le regard : y vois-tu une faille ?",
      ],
      [
        "ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ",
        "Ṯumma rjiʿi l-baṣara karratayni yanqalib ilayka l-baṣaru ḫāsiʾan wa-huwa ḥasīr",
        "Puis ramène le regard à deux fois : il te reviendra humble et fatigué.",
      ],
      [
        "وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِّلشَّيَاطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ السَّعِيرِ",
        "Wa-laqad zayyannā s-samāʾa d-dunyā bimaṣābīḥa wa-jaʿalnāhā rujūman li-š-šayāṭīn, wa-aʿtadnā lahum ʿaḏāba s-saʿīr",
        "Nous avons orné le ciel le plus proche de luminaires, et fait d'eux des projectiles pour lapider les démons. Nous leur avons préparé le châtiment de la Fournaise.",
      ],
      [
        "وَلِلَّذِينَ كَفَرُوا بِرَبِّهِمْ عَذَابُ جَهَنَّمَ ۖ وَبِئْسَ الْمَصِيرُ",
        "Wa-lillaḏīna kafarū bi-rabbihim ʿaḏābu jahannam, wa-biʾsa l-maṣīr",
        "Ceux qui ont mécru envers leur Seigneur auront le châtiment de l'Enfer. Quelle mauvaise destination !",
      ],
      [
        "إِذَا أُلْقُوا فِيهَا سَمِعُوا لَهَا شَهِيقًا وَهِيَ تَفُورُ",
        "Iḏā ulqū fīhā samiʿū lahā šahīqan wa-hiya tafūr",
        "Quand ils y seront jetés, ils l'entendront rugir tandis qu'elle bouillonnera.",
      ],
      [
        "تَكَادُ تَمَيَّزُ مِنَ الْغَيْظِ ۖ كُلَّمَا أُلْقِيَ فِيهَا فَوْجٌ سَأَلَهُمْ خَزَنَتُهَا أَلَمْ يَأْتِكُمْ نَذِيرٌ",
        "Takādu tamayyazu mina l-ġayẓ, kullamā ulqiya fīhā fawjun saʾalahum ḫazanatuhā alam yaʾtikum naḏīr",
        "Peu s'en faudrait qu'elle n'éclate de fureur. Toutes les fois qu'un groupe y sera jeté, ses gardiens leur demanderont : N'est-il pas venu d'avertisseur ?",
      ],
      [
        "قَالُوا بَلَىٰ قَدْ جَاءَنَا نَذِيرٌ فَكَذَّبْنَا وَقُلْنَا مَا نَزَّلَ اللَّهُ مِن شَيْءٍ إِنْ أَنتُمْ إِلَّا فِي ضَلَالٍ كَبِيرٍ",
        "Qālū balā qad jāʾanā naḏīrun fakaḏḏabnā wa-qulnā mā nazzala llāhu min šayʾ in antum illā fī ḍalālin kabīr",
        "Si, ils diront, certes un avertisseur nous est venu, mais nous l'avons traité de menteur et avons dit : Allah n'a rien fait descendre, vous n'êtes que dans un grand égarement.",
      ],
      [
        "وَقَالُوا لَوْ كُنَّا نَسْمَعُ أَوْ نَعْقِلُ مَا كُنَّا فِي أَصْحَابِ السَّعِيرِ",
        "Wa-qālū law kunnā nasmaʿu aw naʿqilu mā kunnā fī aṣḥābi s-saʿīr",
        "Et ils diront : Si nous avions écouté ou raisonné, nous ne serions pas parmi les gens de la Fournaise.",
      ],
      [
        "فَاعْتَرَفُوا بِذَنبِهِمْ فَسُحْقًا لِّأَصْحَابِ السَّعِيرِ",
        "Fa-ʿtarafū bi-ḏanbihim fasuḥqan li-aṣḥābi s-saʿīr",
        "Ils confesseront leur péché. Loin d'Allah les gens de la Fournaise !",
      ],
      [
        "إِنَّ الَّذِينَ يَخْشَوْنَ رَبَّهُم بِالْغَيْبِ لَهُم مَّغْفِرَةٌ وَأَجْرٌ كَبِيرٌ",
        "Inna llaḏīna yaḫšawna rabbahum bi-l-ġaybi lahum maġfiratun wa-ajrun kabīr",
        "Ceux qui craignent leur Seigneur dans l'invisible auront un pardon et une grande récompense.",
      ],
      [
        "وَأَسِرُّوا قَوْلَكُمْ أَوِ اجْهَرُوا بِهِ ۖ إِنَّهُ عَلِيمٌ بِذَاتِ الصُّدُورِ",
        "Wa-asirrū qawlakum awi jharū bih, innahu ʿalīmun bi-ḏāti ṣ-ṣudūr",
        "Que vous cachiez votre parole ou que vous la divulguiez, Il connaît bien le contenu des poitrines.",
      ],
      [
        "أَلَا يَعْلَمُ مَنْ خَلَقَ وَهُوَ اللَّطِيفُ الْخَبِيرُ",
        "A-lā yaʿlamu man ḫalaqa wa-huwa l-laṭīfu l-ḫabīr",
        "Ne connaîtrait-Il pas ce qu'Il a créé alors qu'Il est le Subtil, le Parfaitement Connaisseur ?",
      ],
      [
        "هُوَ الَّذِي جَعَلَ لَكُمُ الْأَرْضَ ذَلُولًا فَامْشُوا فِي مَنَاكِبِهَا وَكُلُوا مِن رِّزْقِهِ ۖ وَإِلَيْهِ النُّشُورُ",
        "Huwa llaḏī jaʿala lakumu l-arḍa ḏalūlan famšū fī manākibihā wa-kulū min rizqih, wa-ilayhi n-nušūr",
        "C'est Lui qui vous a soumis la terre : parcourez ses étendues et mangez de ce qu'Il vous fournit. Vers Lui est la résurrection.",
      ],
      [
        "أَأَمِنتُم مَّن فِي السَّمَاءِ أَن يَخْسِفَ بِكُمُ الْأَرْضَ فَإِذَا هِيَ تَمُورُ",
        "A-amintum man fi s-samāʾi an yaḫsifa bikumu l-arḍa fa-iḏā hiya tamūr",
        "Êtes-vous à l'abri que Celui qui est au ciel n'engloutisse la terre sous vos pieds ? La voilà qui se met à trembler !",
      ],
      [
        "أَمْ أَمِنتُم مَّن فِي السَّمَاءِ أَن يُرْسِلَ عَلَيْكُمْ حَاصِبًا ۖ فَسَتَعْلَمُونَ كَيْفَ نَذِيرِ",
        "Am amintum man fi s-samāʾi an yursila ʿalaykum ḥāṣibā, fasataʿlamūna kayfa naḏīr",
        "Ou êtes-vous à l'abri qu'Il envoie contre vous un ouragan de pierres ? Vous saurez alors quel est Mon avertissement.",
      ],
      [
        "وَلَقَدْ كَذَّبَ الَّذِينَ مِن قَبْلِهِمْ فَكَيْفَ كَانَ نَكِيرِ",
        "Wa-laqad kaḏḏaba llaḏīna min qablihim fakayfa kāna nakīr",
        "Ceux d'avant eux ont crié au mensonge — quelle fut alors Ma réprobation !",
      ],
      [
        "أَوَلَمْ يَرَوْا إِلَى الطَّيْرِ فَوْقَهُمْ صَافَّاتٍ وَيَقْبِضْنَ ۚ مَا يُمْسِكُهُنَّ إِلَّا الرَّحْمَٰنُ ۚ إِنَّهُ بِكُلِّ شَيْءٍ بَصِيرٌ",
        "Awalam yaraw ilā ṭ-ṭayri fawqahum ṣāffātin wa-yaqbiḍn, mā yumsikuhunna illā r-raḥmān, innahu bi-kulli šayʾin baṣīr",
        "N'ont-ils pas vu les oiseaux au-dessus d'eux, déployant et repliant leurs ailes ? Seul le Tout Miséricordieux les soutient. Il voit parfaitement toute chose.",
      ],
      [
        "أَمَّنْ هَٰذَا الَّذِي هُوَ جُندٌ لَّكُمْ يَنصُرُكُم مِّن دُونِ الرَّحْمَٰنِ ۚ إِنِ الْكَافِرُونَ إِلَّا فِي غُرُورٍ",
        "Amman hāḏā llaḏī huwa jundun lakum yanṣurukum min dūni r-raḥmān, ini l-kāfirūna illā fī ġurūr",
        "Qui est cette troupe qui vous secourrait en dehors du Tout Miséricordieux ? Les mécréants ne sont que dans l'illusion.",
      ],
      [
        "أَمَّنْ هَٰذَا الَّذِي يَرْزُقُكُمْ إِنْ أَمْسَكَ رِزْقَهُ ۚ بَل لَّجُّوا فِي عُتُوٍّ وَنُفُورٍ",
        "Amman hāḏā llaḏī yarzuqukum in amsaka rizqah, bal lajjū fī ʿutuwwin wa-nufūr",
        "Ou qui vous nourrirait s'Il retenait Sa subsistance ? Mais ils s'obstinent dans l'arrogance et la fuite.",
      ],
      [
        "أَفَمَن يَمْشِي مُكِبًّا عَلَىٰ وَجْهِهِ أَهْدَىٰ أَمَّن يَمْشِي سَوِيًّا عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ",
        "Afaman yamšī mukibban ʿalā wajhihi ahdā amman yamšī sawiyyan ʿalā ṣirāṭin mustaqīm",
        "Qui est mieux guidé : celui qui marche le visage baissé, ou celui qui marche redressé sur un chemin droit ?",
      ],
      [
        "قُلْ هُوَ الَّذِي أَنشَأَكُمْ وَجَعَلَ لَكُمُ السَّمْعَ وَالْأَبْصَارَ وَالْأَفْئِدَةَ ۖ قَلِيلًا مَّا تَشْكُرُونَ",
        "Qul huwa llaḏī anšaʾakum wa-jaʿala lakumu s-samʿa wa-l-abṣāra wa-l-afʾidah, qalīlan mā taškurūn",
        "Dis : C'est Lui qui vous a fait naître et qui vous a donné l'ouïe, les yeux et les cœurs. Combien peu reconnaissants vous êtes !",
      ],
      [
        "قُلْ هُوَ الَّذِي ذَرَأَكُمْ فِي الْأَرْضِ وَإِلَيْهِ تُحْشَرُونَ",
        "Qul huwa llaḏī ḏaraʾakum fi l-arḍi wa-ilayhi tuḥšarūn",
        "Dis : C'est Lui qui vous a multipliés sur la terre, et c'est vers Lui que vous serez rassemblés.",
      ],
      [
        "وَيَقُولُونَ مَتَىٰ هَٰذَا الْوَعْدُ إِن كُنتُمْ صَادِقِينَ",
        "Wa-yaqūlūna matā hāḏā l-waʿdu in kuntum ṣādiqīn",
        "Ils disent : À quand cette promesse, si vous êtes véridiques ?",
      ],
      [
        "قُلْ إِنَّمَا الْعِلْمُ عِندَ اللَّهِ وَإِنَّمَا أَنَا نَذِيرٌ مُّبِينٌ",
        "Qul innamā l-ʿilmu ʿinda llāhi wa-innamā anā naḏīrun mubīn",
        "Dis : La science n'est qu'auprès d'Allah ; je ne suis qu'un avertisseur clair.",
      ],
      [
        "فَلَمَّا رَأَوْهُ زُلْفَةً سِيئَتْ وُجُوهُ الَّذِينَ كَفَرُوا وَقِيلَ هَٰذَا الَّذِي كُنتُم بِهِ تَدَّعُونَ",
        "Falammā raʾawhu zulfatan sīʾat wujūhu llaḏīna kafarū wa-qīla hāḏā llaḏī kuntum bihi taddaʿūn",
        "Quand ils le verront tout proche, les visages de ceux qui ont mécru s'assombriront, et il sera dit : Voilà ce que vous réclamiez !",
      ],
      [
        "قُلْ أَرَأَيْتُمْ إِنْ أَهْلَكَنِيَ اللَّهُ وَمَن مَّعِيَ أَوْ رَحِمَنَا فَمَن يُجِيرُ الْكَافِرِينَ مِنْ عَذَابٍ أَلِيمٍ",
        "Qul araʾaytum in ahlakaniya llāhu wa-man maʿiya aw raḥimanā faman yujīru l-kāfirīna min ʿaḏābin alīm",
        "Dis : Que vous en semble ? Qu'Allah me fasse périr ainsi que ceux qui sont avec moi, ou qu'Il nous fasse miséricorde, qui protégera les mécréants d'un châtiment douloureux ?",
      ],
      [
        "قُلْ هُوَ الرَّحْمَٰنُ آمَنَّا بِهِ وَعَلَيْهِ تَوَكَّلْنَا ۖ فَسَتَعْلَمُونَ مَنْ هُوَ فِي ضَلَالٍ مُّبِينٍ",
        "Qul huwa r-raḥmānu āmannā bihi wa-ʿalayhi tawakkalnā, fasataʿlamūna man huwa fī ḍalālin mubīn",
        "Dis : C'est Lui le Tout Miséricordieux. Nous avons cru en Lui et sur Lui nous nous appuyons. Vous saurez bientôt qui est dans un égarement manifeste.",
      ],
      [
        "قُلْ أَرَأَيْتُمْ إِنْ أَصْبَحَ مَاؤُكُمْ غَوْرًا فَمَن يَأْتِيكُم بِمَاءٍ مَّعِينٍ",
        "Qul araʾaytum in aṣbaḥa māʾukum ġawran faman yaʾtīkum bimāʾin maʿīn",
        "Dis : Que vous en semble ? Si votre eau venait à se perdre dans la terre, qui vous apporterait alors une eau de source ?",
      ],
    ],
  },

  {
    num: 36,
    name: "Yâ-Sîn",
    ar_name: "يس",
    cat: "importante",
    tip: "Appelée « le cœur du Coran » dans une tradition rapportée par Tirmidhî (statut faible). Sa lecture demeure très recommandée pour la méditation. La sourate aborde la résurrection, la création et les signes d'Allah dans l'univers.",
    verses: [
      ["يس", "Yā-Sīn", "Yâ, Sîn"],
      [
        "وَالْقُرْآنِ الْحَكِيمِ",
        "Wa-l-qurʾāni l-ḥakīm",
        "Par le Coran plein de sagesse,",
      ],
      [
        "إِنَّكَ لَمِنَ الْمُرْسَلِينَ",
        "Innaka lamina l-mursalīn",
        "Tu es en vérité du nombre des Messagers,",
      ],
      [
        "عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ",
        "ʿalā ṣirāṭin mustaqīm",
        "sur un chemin droit.",
      ],
      [
        "تَنزِيلَ الْعَزِيزِ الرَّحِيمِ",
        "Tanzīla l-ʿazīzi r-raḥīm",
        "Une révélation du Puissant, du Très Miséricordieux,",
      ],
      [
        "لِتُنذِرَ قَوْمًا مَّا أُنذِرَ آبَاؤُهُمْ فَهُمْ غَافِلُونَ",
        "Litunḏira qawman mā unḏira ābāʾuhum fahum ġāfilūn",
        "pour que tu avertisses un peuple dont les ancêtres n'ont pas été avertis : ils sont insouciants.",
      ],
      [
        "لَقَدْ حَقَّ الْقَوْلُ عَلَىٰ أَكْثَرِهِمْ فَهُمْ لَا يُؤْمِنُونَ",
        "Laqad ḥaqqa l-qawlu ʿalā akṯarihim fahum lā yuʾminūn",
        "La parole s'est réalisée contre la plupart d'entre eux : ils ne croient pas.",
      ],
      [
        "إِنَّا جَعَلْنَا فِي أَعْنَاقِهِمْ أَغْلَالًا فَهِيَ إِلَى الْأَذْقَانِ فَهُم مُّقْمَحُونَ",
        "Innā jaʿalnā fī aʿnāqihim aġlālan fahiya ila l-aḏqāni fahum muqmaḥūn",
        "Nous avons mis à leurs cous des carcans qui leur arrivent jusqu'aux mentons : ils ont la tête redressée.",
      ],
      [
        "وَجَعَلْنَا مِن بَيْنِ أَيْدِيهِمْ سَدًّا وَمِنْ خَلْفِهِمْ سَدًّا فَأَغْشَيْنَاهُمْ فَهُمْ لَا يُبْصِرُونَ",
        "Wa-jaʿalnā min bayni aydīhim saddan wa-min ḫalfihim saddan fa-aġšaynāhum fahum lā yubṣirūn",
        "Nous avons placé une barrière devant eux et une barrière derrière eux, puis Nous les avons recouverts : ils ne voient plus.",
      ],
      [
        "وَسَوَاءٌ عَلَيْهِمْ أَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ",
        "Wa-sawāʾun ʿalayhim a-anḏartahum am lam tunḏirhum lā yuʾminūn",
        "Que tu les avertisses ou que tu ne les avertisses pas, c'est égal : ils ne croient pas.",
      ],
      [
        "إِنَّمَا تُنذِرُ مَنِ اتَّبَعَ الذِّكْرَ وَخَشِيَ الرَّحْمَٰنَ بِالْغَيْبِ ۖ فَبَشِّرْهُ بِمَغْفِرَةٍ وَأَجْرٍ كَرِيمٍ",
        "Innamā tunḏiru mani ttabaʿa ḏ-ḏikra wa-ḫašiya r-raḥmāna bi-l-ġayb, fabašširhu bimaġfiratin wa-ajrin karīm",
        "Tu n'avertis utilement que celui qui suit le Rappel et craint le Tout Miséricordieux dans l'invisible. Annonce-lui un pardon et une généreuse récompense.",
      ],
      [
        "إِنَّا نَحْنُ نُحْيِي الْمَوْتَىٰ وَنَكْتُبُ مَا قَدَّمُوا وَآثَارَهُمْ ۚ وَكُلَّ شَيْءٍ أَحْصَيْنَاهُ فِي إِمَامٍ مُّبِينٍ",
        "Innā naḥnu nuḥyī l-mawtā wa-naktubu mā qaddamū wa-āṯārahum, wa-kulla šayʾin aḥṣaynāhu fī imāmin mubīn",
        "C'est Nous qui ressuscitons les morts et inscrivons ce qu'ils ont avancé et leurs traces. Toute chose, Nous l'avons recensée dans un Registre explicite.",
      ],
      [
        "وَاضْرِبْ لَهُم مَّثَلًا أَصْحَابَ الْقَرْيَةِ إِذْ جَاءَهَا الْمُرْسَلُونَ",
        "Wa-ḍrib lahum maṯalan aṣḥāba l-qaryati iḏ jāʾahā l-mursalūn",
        "Donne-leur en exemple les habitants de la cité, quand des messagers leur sont venus.",
      ],
      [
        "إِذْ أَرْسَلْنَا إِلَيْهِمُ اثْنَيْنِ فَكَذَّبُوهُمَا فَعَزَّزْنَا بِثَالِثٍ فَقَالُوا إِنَّا إِلَيْكُم مُّرْسَلُونَ",
        "Iḏ arsalnā ilayhimu ṯnayni fakaḏḏabūhumā faʿazzaznā bi-ṯāliṯin faqālū innā ilaykum mursalūn",
        "Quand Nous leur en envoyâmes deux qu'ils traitèrent de menteurs, Nous les renforçâmes par un troisième. Ils dirent : Nous sommes envoyés vers vous.",
      ],
      [
        "قَالُوا مَا أَنتُمْ إِلَّا بَشَرٌ مِّثْلُنَا وَمَا أَنزَلَ الرَّحْمَٰنُ مِن شَيْءٍ إِنْ أَنتُمْ إِلَّا تَكْذِبُونَ",
        "Qālū mā antum illā bašarun miṯlunā wa-mā anzala r-raḥmānu min šayʾin in antum illā takḏibūn",
        "Ils répondirent : Vous n'êtes que des humains comme nous. Le Tout Miséricordieux n'a rien fait descendre. Vous ne faites que mentir.",
      ],
      [
        "قَالُوا رَبُّنَا يَعْلَمُ إِنَّا إِلَيْكُمْ لَمُرْسَلُونَ",
        "Qālū rabbunā yaʿlamu innā ilaykum lamursalūn",
        "Ils dirent : Notre Seigneur sait que nous sommes vraiment envoyés vers vous.",
      ],
      [
        "وَمَا عَلَيْنَا إِلَّا الْبَلَاغُ الْمُبِينُ",
        "Wa-mā ʿalaynā illā l-balāġu l-mubīn",
        "Il ne nous incombe que la transmission claire.",
      ],
      [
        "قَالُوا إِنَّا تَطَيَّرْنَا بِكُمْ ۖ لَئِن لَّمْ تَنتَهُوا لَنَرْجُمَنَّكُمْ وَلَيَمَسَّنَّكُم مِّنَّا عَذَابٌ أَلِيمٌ",
        "Qālū innā taṭayyarnā bikum, la-in lam tantahū lanarjumannakum wa-layamassannakum minnā ʿaḏābun alīm",
        "Ils dirent : Nous voyons en vous un mauvais présage. Si vous ne cessez, nous vous lapiderons et un châtiment douloureux vous atteindra de notre part.",
      ],
      [
        "قَالُوا طَائِرُكُم مَّعَكُمْ ۚ أَئِن ذُكِّرْتُم ۚ بَلْ أَنتُمْ قَوْمٌ مُّسْرِفُونَ",
        "Qālū ṭāʾirukum maʿakum, a-in ḏukkirtum, bal antum qawmun musrifūn",
        "Ils répondirent : Votre mauvais sort dépend de vous. Est-ce parce qu'on vous rappelle ? Vous êtes plutôt un peuple outrancier.",
      ],
      [
        "وَجَاءَ مِنْ أَقْصَى الْمَدِينَةِ رَجُلٌ يَسْعَىٰ قَالَ يَا قَوْمِ اتَّبِعُوا الْمُرْسَلِينَ",
        "Wa-jāʾa min aqṣa l-madīnati rajulun yasʿā qāla yā qawmi ttabiʿu l-mursalīn",
        "Du bout de la ville accourut un homme qui dit : Ô mon peuple, suivez les messagers !",
      ],
      [
        "اتَّبِعُوا مَن لَّا يَسْأَلُكُمْ أَجْرًا وَهُم مُّهْتَدُونَ",
        "Ittabiʿū man lā yasʾalukum ajran wa-hum muhtadūn",
        "Suivez ceux qui ne vous demandent aucun salaire et qui sont eux-mêmes bien guidés.",
      ],
      [
        "وَمَا لِيَ لَا أَعْبُدُ الَّذِي فَطَرَنِي وَإِلَيْهِ تُرْجَعُونَ",
        "Wa-mā liya lā aʿbudu llaḏī faṭaranī wa-ilayhi turjaʿūn",
        "Pourquoi n'adorerais-je pas Celui qui m'a créé et vers qui vous serez ramenés ?",
      ],
      [
        "أَأَتَّخِذُ مِن دُونِهِ آلِهَةً إِن يُرِدْنِ الرَّحْمَٰنُ بِضُرٍّ لَّا تُغْنِ عَنِّي شَفَاعَتُهُمْ شَيْئًا وَلَا يُنقِذُونِ",
        "A-attaḫiḏu min dūnihi ālihatan in yuridni r-raḥmānu bi-ḍurrin lā tuġni ʿannī šafāʿatuhum šayʾan wa-lā yunqiḏūn",
        "Prendrai-je en dehors de Lui des divinités ? Si le Tout Miséricordieux me veut du mal, leur intercession ne me servira à rien et elles ne me sauveront pas.",
      ],
      [
        "إِنِّي إِذًا لَّفِي ضَلَالٍ مُّبِينٍ",
        "Innī iḏan lafī ḍalālin mubīn",
        "Je serais alors dans un égarement manifeste.",
      ],
      [
        "إِنِّي آمَنتُ بِرَبِّكُمْ فَاسْمَعُونِ",
        "Innī āmantu bi-rabbikum fa-smaʿūn",
        "Je crois en votre Seigneur, écoutez-moi donc.",
      ],
      [
        "قِيلَ ادْخُلِ الْجَنَّةَ ۖ قَالَ يَا لَيْتَ قَوْمِي يَعْلَمُونَ",
        "Qīla dḫuli l-jannah, qāla yā layta qawmī yaʿlamūn",
        "Il lui fut dit : Entre au Paradis. Il dit : Si seulement mon peuple savait,",
      ],
      [
        "بِمَا غَفَرَ لِي رَبِّي وَجَعَلَنِي مِنَ الْمُكْرَمِينَ",
        "Bimā ġafara lī rabbī wa-jaʿalanī mina l-mukramīn",
        "comment mon Seigneur m'a pardonné et m'a placé parmi les honorés.",
      ],
      [
        "وَمَا أَنزَلْنَا عَلَىٰ قَوْمِهِ مِن بَعْدِهِ مِن جُندٍ مِّنَ السَّمَاءِ وَمَا كُنَّا مُنزِلِينَ",
        "Wa-mā anzalnā ʿalā qawmihi min baʿdihi min jundin mina s-samāʾi wa-mā kunnā munzilīn",
        "Après lui, Nous ne fîmes descendre du ciel aucune armée contre son peuple — Nous n'avions pas à le faire.",
      ],
      [
        "إِن كَانَتْ إِلَّا صَيْحَةً وَاحِدَةً فَإِذَا هُمْ خَامِدُونَ",
        "In kānat illā ṣayḥatan wāḥidatan fa-iḏā hum ḫāmidūn",
        "Il n'y eut qu'un seul cri, et les voilà éteints.",
      ],
      [
        "يَا حَسْرَةً عَلَى الْعِبَادِ ۚ مَا يَأْتِيهِم مِّن رَّسُولٍ إِلَّا كَانُوا بِهِ يَسْتَهْزِئُونَ",
        "Yā ḥasratan ʿala l-ʿibād, mā yaʾtīhim min rasūlin illā kānū bihi yastahziʾūn",
        "Quel regret pour les serviteurs ! Pas un messager ne leur est venu sans qu'ils ne s'en moquent.",
      ],
      [
        "أَلَمْ يَرَوْا كَمْ أَهْلَكْنَا قَبْلَهُم مِّنَ الْقُرُونِ أَنَّهُمْ إِلَيْهِمْ لَا يَرْجِعُونَ",
        "Alam yaraw kam ahlaknā qablahum mina l-qurūni annahum ilayhim lā yarjiʿūn",
        "N'ont-ils pas vu combien de générations Nous avons fait périr avant eux, qui ne reviendront jamais vers eux ?",
      ],
      [
        "وَإِن كُلٌّ لَّمَّا جَمِيعٌ لَّدَيْنَا مُحْضَرُونَ",
        "Wa-in kullun lammā jamīʿun ladaynā muḥḍarūn",
        "Tous, sans exception, comparaîtront devant Nous.",
      ],
      [
        "وَآيَةٌ لَّهُمُ الْأَرْضُ الْمَيْتَةُ أَحْيَيْنَاهَا وَأَخْرَجْنَا مِنْهَا حَبًّا فَمِنْهُ يَأْكُلُونَ",
        "Wa-āyatun lahumu l-arḍu l-maytatu aḥyaynāhā wa-aḫrajnā minhā ḥabban faminhu yaʾkulūn",
        "Un signe pour eux est la terre morte que Nous ressuscitons et dont Nous faisons sortir des grains qu'ils mangent.",
      ],
      [
        "وَجَعَلْنَا فِيهَا جَنَّاتٍ مِّن نَّخِيلٍ وَأَعْنَابٍ وَفَجَّرْنَا فِيهَا مِنَ الْعُيُونِ",
        "Wa-jaʿalnā fīhā jannātin min naḫīlin wa-aʿnābin wa-fajjarnā fīhā mina l-ʿuyūn",
        "Nous y avons placé des jardins de palmiers et de vignes, et y avons fait jaillir des sources,",
      ],
      [
        "لِيَأْكُلُوا مِن ثَمَرِهِ وَمَا عَمِلَتْهُ أَيْدِيهِمْ ۖ أَفَلَا يَشْكُرُونَ",
        "Liyaʾkulū min ṯamarihi wa-mā ʿamilathu aydīhim, afalā yaškurūn",
        "afin qu'ils en mangent les fruits — ce que leurs mains n'ont pas fait. Ne sont-ils pas reconnaissants ?",
      ],
      [
        "سُبْحَانَ الَّذِي خَلَقَ الْأَزْوَاجَ كُلَّهَا مِمَّا تُنبِتُ الْأَرْضُ وَمِنْ أَنفُسِهِمْ وَمِمَّا لَا يَعْلَمُونَ",
        "Subḥāna llaḏī ḫalaqa l-azwāja kullahā mimmā tunbitu l-arḍu wa-min anfusihim wa-mimmā lā yaʿlamūn",
        "Gloire à Celui qui a créé tous les couples : ce que la terre fait pousser, eux-mêmes, et ce qu'ils ne connaissent pas.",
      ],
      [
        "وَآيَةٌ لَّهُمُ اللَّيْلُ نَسْلَخُ مِنْهُ النَّهَارَ فَإِذَا هُم مُّظْلِمُونَ",
        "Wa-āyatun lahumu l-laylu naslaḫu minhu n-nahāra fa-iḏā hum muẓlimūn",
        "Un signe pour eux est la nuit dont Nous écorchons le jour : les voilà dans l'obscurité.",
      ],
      [
        "وَالشَّمْسُ تَجْرِي لِمُسْتَقَرٍّ لَّهَا ۚ ذَٰلِكَ تَقْدِيرُ الْعَزِيزِ الْعَلِيمِ",
        "Wa-š-šamsu tajrī limustaqarrin lahā, ḏālika taqdīru l-ʿazīzi l-ʿalīm",
        "Le soleil court vers son lieu de repos : c'est l'ordonnance du Puissant, de l'Omniscient.",
      ],
      [
        "وَالْقَمَرَ قَدَّرْنَاهُ مَنَازِلَ حَتَّىٰ عَادَ كَالْعُرْجُونِ الْقَدِيمِ",
        "Wa-l-qamara qaddarnāhu manāzila ḥattā ʿāda ka-l-ʿurjūni l-qadīm",
        "Quant à la lune, Nous lui avons fixé des phases, jusqu'à ce qu'elle retourne comme la palme desséchée.",
      ],
      [
        "لَا الشَّمْسُ يَنبَغِي لَهَا أَن تُدْرِكَ الْقَمَرَ وَلَا اللَّيْلُ سَابِقُ النَّهَارِ ۚ وَكُلٌّ فِي فَلَكٍ يَسْبَحُونَ",
        "Lā š-šamsu yanbaġī lahā an tudrika l-qamara wa-la l-laylu sābiqu n-nahār, wa-kullun fī falakin yasbaḥūn",
        "Ni le soleil ne peut rattraper la lune, ni la nuit ne peut devancer le jour : chacun nage dans son orbite.",
      ],
      [
        "وَآيَةٌ لَّهُمْ أَنَّا حَمَلْنَا ذُرِّيَّتَهُمْ فِي الْفُلْكِ الْمَشْحُونِ",
        "Wa-āyatun lahum annā ḥamalnā ḏurriyyatahum fi l-fulki l-mašḥūn",
        "Un signe pour eux est que Nous avons porté leur descendance dans l'arche chargée.",
      ],
      [
        "وَخَلَقْنَا لَهُم مِّن مِّثْلِهِ مَا يَرْكَبُونَ",
        "Wa-ḫalaqnā lahum min miṯlihi mā yarkabūn",
        "Et Nous leur avons créé des navires semblables sur lesquels ils embarquent.",
      ],
      [
        "وَإِن نَّشَأْ نُغْرِقْهُمْ فَلَا صَرِيخَ لَهُمْ وَلَا هُمْ يُنقَذُونَ",
        "Wa-in našaʾ nuġriqhum falā ṣarīḫa lahum wa-lā hum yunqaḏūn",
        "Si Nous voulions, Nous les noierions : nul ne les secourrait et ils ne seraient pas sauvés,",
      ],
      [
        "إِلَّا رَحْمَةً مِّنَّا وَمَتَاعًا إِلَىٰ حِينٍ",
        "Illā raḥmatan minnā wa-matāʿan ilā ḥīn",
        "sauf par une miséricorde de Notre part et pour une jouissance temporaire.",
      ],
      [
        "وَإِذَا قِيلَ لَهُمُ اتَّقُوا مَا بَيْنَ أَيْدِيكُمْ وَمَا خَلْفَكُمْ لَعَلَّكُمْ تُرْحَمُونَ",
        "Wa-iḏā qīla lahumu ttaqū mā bayna aydīkum wa-mā ḫalfakum laʿallakum turḥamūn",
        "Quand on leur dit : Craignez ce qui est devant vous et ce qui est derrière vous, peut-être recevrez-vous miséricorde,",
      ],
      [
        "وَمَا تَأْتِيهِم مِّنْ آيَةٍ مِّنْ آيَاتِ رَبِّهِمْ إِلَّا كَانُوا عَنْهَا مُعْرِضِينَ",
        "Wa-mā taʾtīhim min āyatin min āyāti rabbihim illā kānū ʿanhā muʿriḍīn",
        "Pas un signe parmi ceux de leur Seigneur ne leur vient sans qu'ils ne s'en détournent.",
      ],
      [
        "وَإِذَا قِيلَ لَهُمْ أَنفِقُوا مِمَّا رَزَقَكُمُ اللَّهُ قَالَ الَّذِينَ كَفَرُوا لِلَّذِينَ آمَنُوا أَنُطْعِمُ مَن لَّوْ يَشَاءُ اللَّهُ أَطْعَمَهُ إِنْ أَنتُمْ إِلَّا فِي ضَلَالٍ مُّبِينٍ",
        "Wa-iḏā qīla lahum anfiqū mimmā razaqakumu llāhu qāla llaḏīna kafarū lillaḏīna āmanū anuṭʿimu man law yašāʾu llāhu aṭʿamahu in antum illā fī ḍalālin mubīn",
        "Quand on leur dit : Dépensez de ce qu'Allah vous a accordé, les mécréants disent aux croyants : Nourrirons-nous celui qu'Allah aurait nourri s'Il l'avait voulu ? Vous n'êtes que dans un égarement manifeste.",
      ],
      [
        "وَيَقُولُونَ مَتَىٰ هَٰذَا الْوَعْدُ إِن كُنتُمْ صَادِقِينَ",
        "Wa-yaqūlūna matā hāḏā l-waʿdu in kuntum ṣādiqīn",
        "Ils disent : À quand cette promesse, si vous êtes véridiques ?",
      ],
      [
        "مَا يَنظُرُونَ إِلَّا صَيْحَةً وَاحِدَةً تَأْخُذُهُمْ وَهُمْ يَخِصِّمُونَ",
        "Mā yanẓurūna illā ṣayḥatan wāḥidatan taʾḫuḏuhum wa-hum yaḫiṣṣimūn",
        "Ils n'attendent qu'un seul cri qui les saisira tandis qu'ils disputent.",
      ],
      [
        "فَلَا يَسْتَطِيعُونَ تَوْصِيَةً وَلَا إِلَىٰ أَهْلِهِمْ يَرْجِعُونَ",
        "Falā yastaṭīʿūna tawṣiyatan wa-lā ilā ahlihim yarjiʿūn",
        "Alors ils ne pourront ni faire de testament, ni retourner auprès des leurs.",
      ],
      [
        "وَنُفِخَ فِي الصُّورِ فَإِذَا هُم مِّنَ الْأَجْدَاثِ إِلَىٰ رَبِّهِمْ يَنسِلُونَ",
        "Wa-nufiḫa fi ṣ-ṣūri fa-iḏā hum mina l-ajdāṯi ilā rabbihim yansilūn",
        "On soufflera dans la Trompe : voilà qu'ils sortent des tombes et accourent vers leur Seigneur.",
      ],
      [
        "قَالُوا يَا وَيْلَنَا مَن بَعَثَنَا مِن مَّرْقَدِنَا ۜ ۗ هَٰذَا مَا وَعَدَ الرَّحْمَٰنُ وَصَدَقَ الْمُرْسَلُونَ",
        "Qālū yā waylanā man baʿaṯanā min marqadinā, hāḏā mā waʿada r-raḥmānu wa-ṣadaqa l-mursalūn",
        "Ils diront : Malheur à nous ! Qui nous a réveillés de notre lit ? Voilà ce qu'avait promis le Tout Miséricordieux, et les messagers ont dit vrai.",
      ],
      [
        "إِن كَانَتْ إِلَّا صَيْحَةً وَاحِدَةً فَإِذَا هُمْ جَمِيعٌ لَّدَيْنَا مُحْضَرُونَ",
        "In kānat illā ṣayḥatan wāḥidatan fa-iḏā hum jamīʿun ladaynā muḥḍarūn",
        "Il n'y eut qu'un seul cri : les voilà tous comparaissant devant Nous.",
      ],
      [
        "فَالْيَوْمَ لَا تُظْلَمُ نَفْسٌ شَيْئًا وَلَا تُجْزَوْنَ إِلَّا مَا كُنتُمْ تَعْمَلُونَ",
        "Falyawma lā tuẓlamu nafsun šayʾan wa-lā tujzawna illā mā kuntum taʿmalūn",
        "Aujourd'hui, nulle âme ne sera lésée en rien : vous ne serez rétribués que pour ce que vous faisiez.",
      ],
      [
        "إِنَّ أَصْحَابَ الْجَنَّةِ الْيَوْمَ فِي شُغُلٍ فَاكِهُونَ",
        "Inna aṣḥāba l-jannati l-yawma fī šuġulin fākihūn",
        "Les hôtes du Paradis seront aujourd'hui occupés à se réjouir.",
      ],
      [
        "هُمْ وَأَزْوَاجُهُمْ فِي ظِلَالٍ عَلَى الْأَرَائِكِ مُتَّكِئُونَ",
        "Hum wa-azwājuhum fī ẓilālin ʿala l-arāʾiki muttakiʾūn",
        "Eux et leurs épouses, sous des ombrages, accoudés sur des divans.",
      ],
      [
        "لَهُمْ فِيهَا فَاكِهَةٌ وَلَهُم مَّا يَدَّعُونَ",
        "Lahum fīhā fākihatun wa-lahum mā yaddaʿūn",
        "Là, ils auront des fruits et tout ce qu'ils réclameront.",
      ],
      [
        "سَلَامٌ قَوْلًا مِّن رَّبٍّ رَّحِيمٍ",
        "Salāmun qawlan min rabbin raḥīm",
        "« Paix » : telle sera la parole d'un Seigneur Très Miséricordieux.",
      ],
      [
        "وَامْتَازُوا الْيَوْمَ أَيُّهَا الْمُجْرِمُونَ",
        "Wa-mtāzu l-yawma ayyuhā l-mujrimūn",
        "Et : Démarquez-vous aujourd'hui, ô criminels !",
      ],
      [
        "أَلَمْ أَعْهَدْ إِلَيْكُمْ يَا بَنِي آدَمَ أَن لَّا تَعْبُدُوا الشَّيْطَانَ ۖ إِنَّهُ لَكُمْ عَدُوٌّ مُّبِينٌ",
        "Alam aʿhad ilaykum yā banī ādama an lā taʿbudu š-šayṭān, innahu lakum ʿaduwwun mubīn",
        "Ne vous avais-Je pas engagés, ô fils d'Adam, à ne pas adorer Satan ? Il est pour vous un ennemi déclaré.",
      ],
      [
        "وَأَنِ اعْبُدُونِي ۚ هَٰذَا صِرَاطٌ مُّسْتَقِيمٌ",
        "Wa-ani ʿbudūnī, hāḏā ṣirāṭun mustaqīm",
        "Et à M'adorer ? Voilà le droit chemin.",
      ],
      [
        "وَلَقَدْ أَضَلَّ مِنكُمْ جِبِلًّا كَثِيرًا ۖ أَفَلَمْ تَكُونُوا تَعْقِلُونَ",
        "Wa-laqad aḍalla minkum jibillan kaṯīrā, afalam takūnū taʿqilūn",
        "Il a égaré une grande partie d'entre vous. Ne raisonniez-vous donc pas ?",
      ],
      [
        "هَٰذِهِ جَهَنَّمُ الَّتِي كُنتُمْ تُوعَدُونَ",
        "Hāḏihi jahannamu llatī kuntum tūʿadūn",
        "Voici l'Enfer qui vous était promis.",
      ],
      [
        "اصْلَوْهَا الْيَوْمَ بِمَا كُنتُمْ تَكْفُرُونَ",
        "Iṣlawha l-yawma bimā kuntum takfurūn",
        "Brûlez-y aujourd'hui pour avoir mécru.",
      ],
      [
        "الْيَوْمَ نَخْتِمُ عَلَىٰ أَفْوَاهِهِمْ وَتُكَلِّمُنَا أَيْدِيهِمْ وَتَشْهَدُ أَرْجُلُهُم بِمَا كَانُوا يَكْسِبُونَ",
        "Al-yawma naḫtimu ʿalā afwāhihim wa-tukallimunā aydīhim wa-tašhadu arjuluhum bimā kānū yaksibūn",
        "Aujourd'hui, Nous scellons leurs bouches : leurs mains Nous parleront et leurs pieds témoigneront de ce qu'ils acquéraient.",
      ],
      [
        "وَلَوْ نَشَاءُ لَطَمَسْنَا عَلَىٰ أَعْيُنِهِمْ فَاسْتَبَقُوا الصِّرَاطَ فَأَنَّىٰ يُبْصِرُونَ",
        "Wa-law našāʾu laṭamasnā ʿalā aʿyunihim fastabaqu ṣ-ṣirāṭa fa-annā yubṣirūn",
        "Si Nous voulions, Nous oblitérerions leurs yeux : ils chercheraient alors le chemin — comment verraient-ils ?",
      ],
      [
        "وَلَوْ نَشَاءُ لَمَسَخْنَاهُمْ عَلَىٰ مَكَانَتِهِمْ فَمَا اسْتَطَاعُوا مُضِيًّا وَلَا يَرْجِعُونَ",
        "Wa-law našāʾu lamasaḫnāhum ʿalā makānatihim famā staṭāʿū muḍiyyan wa-lā yarjiʿūn",
        "Si Nous voulions, Nous les transformerions sur place : ils ne pourraient ni avancer ni reculer.",
      ],
      [
        "وَمَن نُّعَمِّرْهُ نُنَكِّسْهُ فِي الْخَلْقِ ۖ أَفَلَا يَعْقِلُونَ",
        "Wa-man nuʿammirhu nunakkishu fi l-ḫalq, afalā yaʿqilūn",
        "Celui à qui Nous accordons longue vie, Nous le diminuons dans sa constitution. Ne raisonnent-ils pas ?",
      ],
      [
        "وَمَا عَلَّمْنَاهُ الشِّعْرَ وَمَا يَنبَغِي لَهُ ۚ إِنْ هُوَ إِلَّا ذِكْرٌ وَقُرْآنٌ مُّبِينٌ",
        "Wa-mā ʿallamnāhu š-šiʿra wa-mā yanbaġī lah, in huwa illā ḏikrun wa-qurʾānun mubīn",
        "Nous ne lui avons pas enseigné la poésie, cela ne lui convient pas. Ce n'est qu'un Rappel et un Coran clair,",
      ],
      [
        "لِّيُنذِرَ مَن كَانَ حَيًّا وَيَحِقَّ الْقَوْلُ عَلَى الْكَافِرِينَ",
        "Liyunḏira man kāna ḥayyan wa-yaḥiqqa l-qawlu ʿala l-kāfirīn",
        "afin qu'il avertisse celui qui est vivant et que la parole se réalise contre les mécréants.",
      ],
      [
        "أَوَلَمْ يَرَوْا أَنَّا خَلَقْنَا لَهُم مِّمَّا عَمِلَتْ أَيْدِينَا أَنْعَامًا فَهُمْ لَهَا مَالِكُونَ",
        "Awalam yaraw annā ḫalaqnā lahum mimmā ʿamilat aydīnā anʿāman fahum lahā mālikūn",
        "N'ont-ils pas vu que, parmi les œuvres de Nos mains, Nous leur avons créé des bestiaux dont ils sont propriétaires,",
      ],
      [
        "وَذَلَّلْنَاهَا لَهُمْ فَمِنْهَا رَكُوبُهُمْ وَمِنْهَا يَأْكُلُونَ",
        "Wa-ḏallalnāhā lahum faminhā rakūbuhum wa-minhā yaʾkulūn",
        "et que Nous les leur avons soumis, certains pour leur monture et d'autres pour leur nourriture ?",
      ],
      [
        "وَلَهُمْ فِيهَا مَنَافِعُ وَمَشَارِبُ ۖ أَفَلَا يَشْكُرُونَ",
        "Wa-lahum fīhā manāfiʿu wa-mašārib, afalā yaškurūn",
        "Et qu'ils en tirent des profits et des boissons. Ne sont-ils pas reconnaissants ?",
      ],
      [
        "وَاتَّخَذُوا مِن دُونِ اللَّهِ آلِهَةً لَّعَلَّهُمْ يُنصَرُونَ",
        "Wa-ttaḫaḏū min dūni llāhi ālihatan laʿallahum yunṣarūn",
        "Ils ont pris des divinités en dehors d'Allah, espérant être secourus.",
      ],
      [
        "لَا يَسْتَطِيعُونَ نَصْرَهُمْ وَهُمْ لَهُمْ جُندٌ مُّحْضَرُونَ",
        "Lā yastaṭīʿūna naṣrahum wa-hum lahum jundun muḥḍarūn",
        "Mais elles ne peuvent les secourir : ce sont elles plutôt qui leur seront amenées comme une armée comparaissant.",
      ],
      [
        "فَلَا يَحْزُنكَ قَوْلُهُمْ ۘ إِنَّا نَعْلَمُ مَا يُسِرُّونَ وَمَا يُعْلِنُونَ",
        "Falā yaḥzunka qawluhum, innā naʿlamu mā yusirrūna wa-mā yuʿlinūn",
        "Que leur parole ne t'attriste pas. Nous savons ce qu'ils cachent et ce qu'ils manifestent.",
      ],
      [
        "أَوَلَمْ يَرَ الْإِنسَانُ أَنَّا خَلَقْنَاهُ مِن نُّطْفَةٍ فَإِذَا هُوَ خَصِيمٌ مُّبِينٌ",
        "Awalam yara l-insānu annā ḫalaqnāhu min nuṭfatin fa-iḏā huwa ḫaṣīmun mubīn",
        "L'homme n'a-t-il pas vu que Nous l'avons créé d'une goutte de sperme ? Et le voilà disputeur déclaré !",
      ],
      [
        "وَضَرَبَ لَنَا مَثَلًا وَنَسِيَ خَلْقَهُ ۖ قَالَ مَن يُحْيِي الْعِظَامَ وَهِيَ رَمِيمٌ",
        "Wa-ḍaraba lanā maṯalan wa-nasiya ḫalqah, qāla man yuḥyī l-ʿiẓāma wa-hiya ramīm",
        "Il Nous propose une comparaison et oublie sa propre création. Il dit : Qui ranimera des os décomposés ?",
      ],
      [
        "قُلْ يُحْيِيهَا الَّذِي أَنشَأَهَا أَوَّلَ مَرَّةٍ ۖ وَهُوَ بِكُلِّ خَلْقٍ عَلِيمٌ",
        "Qul yuḥyīha llaḏī anšaʾahā awwala marrah, wa-huwa bi-kulli ḫalqin ʿalīm",
        "Dis : Celui qui les a créés une première fois les fera revivre. Il connaît parfaitement toute création.",
      ],
      [
        "الَّذِي جَعَلَ لَكُم مِّنَ الشَّجَرِ الْأَخْضَرِ نَارًا فَإِذَا أَنتُم مِّنْهُ تُوقِدُونَ",
        "Allaḏī jaʿala lakum mina š-šajari l-aḫḍari nāran fa-iḏā antum minhu tūqidūn",
        "C'est Lui qui, de l'arbre vert, fait pour vous du feu — et voilà que vous l'allumez.",
      ],
      [
        "أَوَلَيْسَ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ بِقَادِرٍ عَلَىٰ أَن يَخْلُقَ مِثْلَهُم ۚ بَلَىٰ وَهُوَ الْخَلَّاقُ الْعَلِيمُ",
        "Awalaysa llaḏī ḫalaqa s-samāwāti wa-l-arḍa biqādirin ʿalā an yaḫluqa miṯlahum, balā wa-huwa l-ḫallāqu l-ʿalīm",
        "Celui qui a créé les cieux et la terre n'est-Il pas capable d'en créer de pareils ? Si certes ! Il est le Suprême Créateur, l'Omniscient.",
      ],
      [
        "إِنَّمَا أَمْرُهُ إِذَا أَرَادَ شَيْئًا أَن يَقُولَ لَهُ كُن فَيَكُونُ",
        "Innamā amruhu iḏā arāda šayʾan an yaqūla lahu kun fayakūn",
        "Quand Il veut une chose, Son ordre est de dire : Sois — et elle est.",
      ],
      [
        "فَسُبْحَانَ الَّذِي بِيَدِهِ مَلَكُوتُ كُلِّ شَيْءٍ وَإِلَيْهِ تُرْجَعُونَ",
        "Fasubḥāna llaḏī biyadihi malakūtu kulli šayʾin wa-ilayhi turjaʿūn",
        "Gloire à Celui dans la main de qui est la royauté de toute chose, et c'est vers Lui que vous serez ramenés.",
      ],
    ],
  },

  {
    num: 18,
    name: "Al-Kahf (10 premiers versets)",
    ar_name: "الكهف",
    cat: "importante",
    tip: "Le Prophète ﷺ a dit : « Celui qui apprend par cœur les dix premiers versets de Sourate Al-Kahf sera protégé du Dajjâl. » (Muslim). Il a aussi dit : « Celui qui récite Sourate Al-Kahf le vendredi, une lumière l'illuminera entre les deux vendredis. » (Hâkim, authentique). La sourate complète comprend 110 versets — pour la lecture intégrale du vendredi, se référer au Mushaf.",
    verses: [
      [
        "الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَل لَّهُ عِوَجًا",
        "Al-ḥamdu lillāhi llaḏī anzala ʿalā ʿabdihi l-kitāba wa-lam yajʿal lahu ʿiwajā",
        "Louange à Allah qui a fait descendre sur Son serviteur le Livre, sans y mettre aucune tortuosité,",
      ],
      [
        "قَيِّمًا لِّيُنذِرَ بَأْسًا شَدِيدًا مِّن لَّدُنْهُ وَيُبَشِّرَ الْمُؤْمِنِينَ الَّذِينَ يَعْمَلُونَ الصَّالِحَاتِ أَنَّ لَهُمْ أَجْرًا حَسَنًا",
        "Qayyiman liyunḏira baʾsan šadīdan min ladunhu wa-yubaššira l-muʾminīna llaḏīna yaʿmalūna ṣ-ṣāliḥāti anna lahum ajran ḥasanā",
        "mais droit, pour avertir d'une rigueur venant de Sa part et pour annoncer aux croyants qui font de bonnes œuvres qu'ils auront une belle récompense,",
      ],
      [
        "مَّاكِثِينَ فِيهِ أَبَدًا",
        "Mākiṯīna fīhi abadā",
        "où ils demeureront éternellement,",
      ],
      [
        "وَيُنذِرَ الَّذِينَ قَالُوا اتَّخَذَ اللَّهُ وَلَدًا",
        "Wa-yunḏira llaḏīna qālu ttaḫaḏa llāhu waladā",
        "et pour avertir ceux qui ont dit : Allah s'est attribué un fils.",
      ],
      [
        "مَّا لَهُم بِهِ مِنْ عِلْمٍ وَلَا لِآبَائِهِمْ ۚ كَبُرَتْ كَلِمَةً تَخْرُجُ مِنْ أَفْوَاهِهِمْ ۚ إِن يَقُولُونَ إِلَّا كَذِبًا",
        "Mā lahum bihi min ʿilmin wa-lā li-ābāʾihim, kaburat kalimatan taḫruju min afwāhihim, in yaqūlūna illā kaḏibā",
        "Ils n'en ont aucun savoir, ni leurs ancêtres. C'est une parole monstrueuse qui sort de leurs bouches : ils ne disent que des mensonges.",
      ],
      [
        "فَلَعَلَّكَ بَاخِعٌ نَّفْسَكَ عَلَىٰ آثَارِهِمْ إِن لَّمْ يُؤْمِنُوا بِهَٰذَا الْحَدِيثِ أَسَفًا",
        "Fa-laʿallaka bāḫiʿun nafsaka ʿalā āṯārihim in lam yuʾminū bi-hāḏā l-ḥadīṯi asafā",
        "Tu vas peut-être te consumer de chagrin sur leurs traces s'ils ne croient pas à ce discours.",
      ],
      [
        "إِنَّا جَعَلْنَا مَا عَلَى الْأَرْضِ زِينَةً لَّهَا لِنَبْلُوَهُمْ أَيُّهُمْ أَحْسَنُ عَمَلًا",
        "Innā jaʿalnā mā ʿala l-arḍi zīnatan lahā linabluwahum ayyuhum aḥsanu ʿamalā",
        "Nous avons fait de tout ce qui est sur la terre une parure pour elle, afin de les éprouver et de voir lequel d'entre eux est le meilleur en œuvres.",
      ],
      [
        "وَإِنَّا لَجَاعِلُونَ مَا عَلَيْهَا صَعِيدًا جُرُزًا",
        "Wa-innā la-jāʿilūna mā ʿalayhā ṣaʿīdan juruzā",
        "Nous transformerons ce qui s'y trouve en sol aride.",
      ],
      [
        "أَمْ حَسِبْتَ أَنَّ أَصْحَابَ الْكَهْفِ وَالرَّقِيمِ كَانُوا مِنْ آيَاتِنَا عَجَبًا",
        "Am ḥasibta anna aṣḥāba l-kahfi wa-r-raqīmi kānū min āyātinā ʿajabā",
        "Penses-tu que les gens de la Caverne et de l'Inscription aient constitué une chose étonnante parmi Nos prodiges ?",
      ],
      [
        "إِذْ أَوَى الْفِتْيَةُ إِلَى الْكَهْفِ فَقَالُوا رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
        "Iḏ awa l-fityatu ila l-kahfi faqālū rabbanā ātinā min ladunka raḥmatan wa-hayyiʾ lanā min amrinā rašadā",
        "Quand les jeunes gens se réfugièrent dans la caverne et dirent : Notre Seigneur, donne-nous de Ta part une miséricorde, et facilite-nous une voie droite dans notre affaire.",
      ],
    ],
  },

  {
    num: 56,
    name: "Al-Wâqiʿa (ouverture)",
    ar_name: "الواقعة",
    cat: "importante",
    tip: "Le Prophète ﷺ a dit : « Celui qui récite Sourate Al-Wâqiʿa chaque nuit, la pauvreté ne le touchera jamais. » (rapporté par Bayhaqî — chaîne discutée mais largement pratiquée). La sourate complète comprend 96 versets et décrit les trois groupes du Jour Dernier : les Rapprochés, les Gens de la droite, les Gens de la gauche. Pour la version intégrale, se référer au Mushaf.",
    verses: [
      [
        "إِذَا وَقَعَتِ الْوَاقِعَةُ",
        "Iḏā waqaʿati l-wāqiʿah",
        "Quand l'événement (l'inéluctable) surviendra,",
      ],
      [
        "لَيْسَ لِوَقْعَتِهَا كَاذِبَةٌ",
        "Laysa li-waqʿatihā kāḏibah",
        "nul ne pourra alors démentir sa survenue,",
      ],
      [
        "خَافِضَةٌ رَّافِعَةٌ",
        "Ḫāfiḍatun rāfiʿah",
        "abaissant les uns, élevant les autres.",
      ],
      [
        "إِذَا رُجَّتِ الْأَرْضُ رَجًّا",
        "Iḏā rujjati l-arḍu rajjā",
        "Quand la terre tremblera violemment,",
      ],
      [
        "وَبُسَّتِ الْجِبَالُ بَسًّا",
        "Wa-bussati l-jibālu bassā",
        "et que les montagnes seront pulvérisées,",
      ],
      [
        "فَكَانَتْ هَبَاءً مُّنبَثًّا",
        "Fa-kānat habāʾan munbaṯṯā",
        "et qu'elles deviendront poussière éparpillée.",
      ],
      [
        "وَكُنتُمْ أَزْوَاجًا ثَلَاثَةً",
        "Wa-kuntum azwājan ṯalāṯah",
        "Alors vous serez en trois groupes :",
      ],
      [
        "فَأَصْحَابُ الْمَيْمَنَةِ مَا أَصْحَابُ الْمَيْمَنَةِ",
        "Fa-aṣḥābu l-maymanati mā aṣḥābu l-maymanah",
        "les gens de la droite — que sont les gens de la droite ?",
      ],
      [
        "وَأَصْحَابُ الْمَشْأَمَةِ مَا أَصْحَابُ الْمَشْأَمَةِ",
        "Wa-aṣḥābu l-mašʾamati mā aṣḥābu l-mašʾamah",
        "les gens de la gauche — que sont les gens de la gauche ?",
      ],
      [
        "وَالسَّابِقُونَ السَّابِقُونَ",
        "Wa-s-sābiqūna s-sābiqūn",
        "Et les premiers (les Rapprochés) seront les premiers.",
      ],
      [
        "أُولَٰئِكَ الْمُقَرَّبُونَ",
        "Ulāʾika l-muqarrabūn",
        "Ce sont ceux-là les plus rapprochés (d'Allah),",
      ],
      [
        "فِي جَنَّاتِ النَّعِيمِ",
        "Fī jannāti n-naʿīm",
        "dans les Jardins des délices.",
      ],
    ],
  },
];

/* ════════════════════════════════════════════════════════════════════
 99 NOMS D'ALLAH — Liste canonique (Tirmidhî), 99 noms exacts
 Hadith : « Allah a 99 Noms, cent moins un. Celui qui les dénombre
 entrera au Paradis. » (Bukhârî et Muslim)
═════════════════════════════════════════════════════════════════════ */

const NAMES = [
  [
    "اللّٰهُ",
    "Allāh",
    "Allah",
    "Le nom propre de Dieu. Il englobe tous les attributs divins et désigne l'Être unique sans associé, sans semblable et sans égal.",
  ],
  [
    "الرَّحْمَٰنُ",
    "Ar-Raḥmān",
    "Le Tout Miséricordieux",
    "Sa miséricorde englobe toute la création sans exception. Croyants et non-croyants en bénéficient dans cette vie. C'est la miséricorde immense, générale et absolue.",
  ],
  [
    "الرَّحِيمُ",
    "Ar-Raḥīm",
    "Le Très Miséricordieux",
    "Sa miséricorde spécifique réservée aux croyants dans l'au-delà. Plus intime que Raḥmān, elle désigne l'amour et la bienveillance continue envers Ses serviteurs fidèles.",
  ],
  [
    "الْمَلِكُ",
    "Al-Malik",
    "Le Roi Souverain",
    "Il est le Souverain absolu de tout l'univers. Son règne ne connaît ni fin ni limite. Toute autorité terrestre n'est qu'un reflet infime de Sa souveraineté parfaite.",
  ],
  [
    "الْقُدُّوسُ",
    "Al-Quddūs",
    "Le Très Saint",
    "Totalement exempt de tout défaut, imperfection ou association. Sa sainteté est absolue, au-delà de tout ce que l'esprit humain peut concevoir.",
  ],
  [
    "السَّلَامُ",
    "As-Salām",
    "La Source de Paix",
    "Source de toute paix et de toute sécurité. Le Paradis lui-même est nommé Dār as-Salām — la Demeure de la Paix — car Il en est l'unique source.",
  ],
  [
    "الْمُؤْمِنُ",
    "Al-Muʾmin",
    "Le Garant de Sécurité",
    "Il accorde la sécurité à Ses serviteurs et confirme la véracité de Ses prophètes. Il est aussi Celui qui dépose la foi (īmān) dans les cœurs.",
  ],
  [
    "الْمُهَيْمِنُ",
    "Al-Muhaymin",
    "Le Gardien Suprême",
    "Il surveille, protège et préserve toutes choses. Il est le Témoin qui connaît chaque détail de la création et veille sur elle en permanence.",
  ],
  [
    "الْعَزِيزُ",
    "Al-ʿAzīz",
    "Le Puissant",
    "Aucune force ne peut Le vaincre ou Lui résister. Sa puissance est incomparable. Il est le Victorieux qui domine toute chose sans jamais être dominé.",
  ],
  [
    "الْجَبَّارُ",
    "Al-Jabbār",
    "Le Réparateur Tout-Puissant",
    "Il contraint selon Sa volonté et répare ce qui est brisé. C'est Lui qui redresse les injustices, console les cœurs blessés et rend la grandeur à ceux qui ont été humiliés.",
  ],
  [
    "الْمُتَكَبِّرُ",
    "Al-Mutakabbir",
    "Celui à qui appartient la Suprême Grandeur",
    "La grandeur (al-Kibriyāʾ) Lui appartient à Lui seul. Cette grandeur est légitime chez Allah, alors qu'elle devient orgueil condamnable chez la créature.",
  ],
  [
    "الْخَالِقُ",
    "Al-Ḫāliq",
    "Le Créateur",
    "Il crée ex nihilo, sans modèle ni matière préexistante. Toute chose dans l'univers est le fruit de Son acte créateur, y compris le temps et l'espace.",
  ],
  [
    "الْبَارِئُ",
    "Al-Bāriʾ",
    "Le Producteur",
    "Il donne à chaque être l'existence en le distinguant des autres. C'est Lui qui fait naître les créatures de la matière en les différenciant les unes des autres.",
  ],
  [
    "الْمُصَوِّرُ",
    "Al-Muṣawwir",
    "Le Façonneur des Formes",
    "Il donne à chaque créature sa forme unique et particulière. C'est Lui qui modèle dans le ventre maternel les traits de chaque être humain.",
  ],
  [
    "الْغَفَّارُ",
    "Al-Ġaffār",
    "Le Très Pardonneur",
    "Il pardonne encore et encore, sans se lasser. Le pardon est Sa nature profonde. Même si le serviteur revient au péché, Allah est prêt à pardonner à chaque repentir sincère.",
  ],
  [
    "الْقَهَّارُ",
    "Al-Qahhār",
    "Le Dominateur Absolu",
    "Il soumet toute chose à Sa volonté. Rien ni personne ne peut Lui échapper. Les tyrans et les arrogants seront tous réduits à néant devant Lui.",
  ],
  [
    "الْوَهَّابُ",
    "Al-Wahhāb",
    "Le Grand Donateur",
    "Il donne sans contrepartie, sans compte, sans attente de retour. Ses dons sont constants et généreux, pour qui Il veut, quand Il veut.",
  ],
  [
    "الرَّزَّاقُ",
    "Ar-Razzāq",
    "Le Pourvoyeur",
    "Il pourvoit aux besoins de toute créature : l'animal dans les profondeurs de l'océan comme l'homme dans le désert. Nul n'est oublié dans Sa providence.",
  ],
  [
    "الْفَتَّاحُ",
    "Al-Fattāḥ",
    "Celui qui Ouvre / Tranche",
    "Il ouvre les portes de Sa miséricorde, des solutions et des victoires. Il tranche entre les serviteurs avec un jugement parfait. Quand toutes les issues semblent fermées, c'est Lui qui ouvre celle que nul autre ne peut ouvrir.",
  ],
  [
    "الْعَلِيمُ",
    "Al-ʿAlīm",
    "L'Omniscient",
    "Sa connaissance est infinie et éternelle. Il connaît le passé, le présent et le futur. Il connaît le secret des cœurs et ce que cachent les ténèbres les plus profondes.",
  ],
  [
    "الْقَابِضُ",
    "Al-Qābiḍ",
    "Celui qui Restreint",
    "Il restreint les provisions, les âmes ou la pluie selon Sa sagesse. Rien n'est donné ni retiré sans Sa permission. Sa restriction est sagesse, non injustice.",
  ],
  [
    "الْبَاسِطُ",
    "Al-Bāsiṭ",
    "Celui qui Étend",
    "Il étend Sa générosité à qui Il veut. Il élargit les moyens de subsistance, ouvre les cœurs à la foi et répand Sa grâce sur toute Sa création.",
  ],
  [
    "الْخَافِضُ",
    "Al-Ḫāfiḍ",
    "Celui qui Abaisse",
    "Il abaisse les arrogants et les injustes par Sa sagesse, pour maintenir l'équilibre cosmique et punir l'orgueil. L'humiliation est entre Ses mains.",
  ],
  [
    "الرَّافِعُ",
    "Ar-Rāfiʿ",
    "Celui qui Élève",
    "Il élève les humbles, les croyants sincères et les prophètes. L'honneur véritable vient de Lui seul — pas du rang social ou de la richesse.",
  ],
  [
    "الْمُعِزُّ",
    "Al-Muʿizz",
    "Celui qui Honore",
    "Il donne la gloire et l'honneur à qui Il veut. L'honneur véritable ne vient que de Lui. Celui qu'Il honore, nul ne peut l'avilir.",
  ],
  [
    "الْمُذِلُّ",
    "Al-Muḏill",
    "Celui qui Humilie",
    "Il humilie les oppresseurs qui se croient supérieurs. Cette humiliation est juste et méritée, rappelant que la vraie puissance appartient à Allah seul.",
  ],
  [
    "السَّمِيعُ",
    "As-Samīʿ",
    "Celui qui Entend Tout",
    "Il entend chaque son, chaque prière, chaque murmure du cœur. Il entend la fourmi marcher dans l'obscurité d'une nuit sans lune.",
  ],
  [
    "الْبَصِيرُ",
    "Al-Baṣīr",
    "Le Clairvoyant",
    "Il voit chaque chose, visible ou invisible, dans les ténèbres comme en pleine lumière. Rien n'échappe à Son regard, ni un atome dans les cieux, ni un atome sous terre.",
  ],
  [
    "الْحَكَمُ",
    "Al-Ḥakam",
    "L'Arbitre Suprême",
    "Son jugement est le seul véritablement juste et définitif. Il tranche entre les serviteurs le Jour du Jugement avec une équité et une précision parfaites.",
  ],
  [
    "الْعَدْلُ",
    "Al-ʿAdl",
    "Le Parfaitement Juste",
    "Son jugement est absolu, impartial et parfait. Il ne commet aucune injustice, même la valeur d'un atome. Toute souffrance ici-bas est un test, non une injustice divine.",
  ],
  [
    "اللَّطِيفُ",
    "Al-Laṭīf",
    "Le Subtil Bienveillant",
    "Il connaît les subtilités les plus fines et atteint Ses serviteurs par des moyens imperceptibles. Sa bienveillance se manifeste souvent de façon invisible mais réelle.",
  ],
  [
    "الْخَبِيرُ",
    "Al-Ḫabīr",
    "Le Parfaitement Informé",
    "Il connaît les intériorités des choses, les secrets les plus profonds et les détails les plus imperceptibles de toute la création sans exception.",
  ],
  [
    "الْحَلِيمُ",
    "Al-Ḥalīm",
    "Le Longanime",
    "Il ne se hâte pas de punir malgré les péchés répétés. Sa douceur Lui permet de laisser du temps aux pécheurs pour se repentir, par amour et sagesse.",
  ],
  [
    "الْعَظِيمُ",
    "Al-ʿAẓīm",
    "L'Immense",
    "Sa grandeur en magnitude dépasse toute description et toute imagination humaine. Tout l'univers visible et invisible n'est qu'une infime manifestation de Son immensité.",
  ],
  [
    "الْغَفُورُ",
    "Al-Ġafūr",
    "Le Pardonneur",
    "Il efface les péchés et voile les fautes. Sa capacité de pardon est sans limite — il n'y a pas de péché trop grand pour Sa clémence si le repentir est sincère.",
  ],
  [
    "الشَّكُورُ",
    "Aš-Šakūr",
    "Le Très Reconnaissant",
    "Il récompense généreusement les bonnes actions, même les plus petites. Une bonne action sincère est multipliée au-delà de toute mesure par Sa gratitude divine.",
  ],
  [
    "الْعَلِيُّ",
    "Al-ʿAlī",
    "Le Très-Haut",
    "Il est au-dessus de toute chose par Son essence, Ses attributs et Sa domination absolue. Sa transcendance est totale et incomparable.",
  ],
  [
    "الْكَبِيرُ",
    "Al-Kabīr",
    "Le Sublime",
    "Sa sublimité dépasse toute autre grandeur. Tout ce que nous imaginons de grand dans l'univers n'est rien en comparaison de Sa sublimité réelle et infinie.",
  ],
  [
    "الْحَفِيظُ",
    "Al-Ḥafīẓ",
    "Le Gardien Préservateur",
    "Il préserve toute la création et protège Ses serviteurs. Il consigne chaque action pour en rendre compte le Jour du Jugement avec une précision parfaite.",
  ],
  [
    "الْمُقِيتُ",
    "Al-Muqīt",
    "Le Soutien Nourricier",
    "Il pourvoit à la subsistance de chaque être vivant et maintient leur existence. Il est le gardien de toute nourriture et de toute sustentation dans l'univers.",
  ],
  [
    "الْحَسِيبُ",
    "Al-Ḥasīb",
    "Celui qui Suffit / Le Comptable",
    "Il tient compte de chaque action et suffit à Ses serviteurs. Il récompense et rétribue avec une précision absolue et une justice parfaite.",
  ],
  [
    "الْجَلِيلُ",
    "Al-Jalīl",
    "Le Majestueux",
    "Sa majesté est absolue et inspire une révérence profonde. C'est cette majesté qui fait trembler le Trône et les anges devant Sa gloire incomparable.",
  ],
  [
    "الْكَرِيمُ",
    "Al-Karīm",
    "Le Très Généreux",
    "Sa générosité est infinie et ne cesse jamais. Il donne même sans être sollicité, et quand on Lui demande, Il donne plus que ce qui est demandé.",
  ],
  [
    "الرَّقِيبُ",
    "Ar-Raqīb",
    "Le Surveillant Attentif",
    "Il observe chaque chose à chaque instant. Nul acte, nulle pensée, nulle intention n'échappe à Sa surveillance constante et parfaite.",
  ],
  [
    "الْمُجِيبُ",
    "Al-Mujīb",
    "Celui qui Exauce",
    "Il répond aux invocations de Ses serviteurs. Chaque duʿāʾ sincère est entendu et reçoit une réponse — parfois immédiate, parfois reportée selon Sa sagesse.",
  ],
  [
    "الْوَاسِعُ",
    "Al-Wāsiʿ",
    "L'Immensément Vaste",
    "Sa connaissance, Sa miséricorde et Sa générosité sont infiniment vastes. Il n'y a aucune limite à ce qu'Il peut accorder à Ses créatures.",
  ],
  [
    "الْحَكِيمُ",
    "Al-Ḥakīm",
    "Le Sage",
    "Tout ce qu'Il fait est empreint d'une sagesse parfaite, même si nous ne la comprenons pas toujours. Ses décrets sont toujours les meilleurs pour Ses créatures.",
  ],
  [
    "الْوَدُودُ",
    "Al-Wadūd",
    "Le Tout-Aimant",
    "Il aime Ses serviteurs croyants d'un amour profond et vrai. Cet amour divin dépasse tout amour humain en intensité et en constance absolue.",
  ],
  [
    "الْمَجِيدُ",
    "Al-Majīd",
    "Le Très Glorieux",
    "Sa gloire est parfaite, combinant la beauté des attributs et la grandeur absolue. Il est digne de toute louange et de tout honneur dans les cieux et sur terre.",
  ],
  [
    "الْبَاعِثُ",
    "Al-Bāʿiṯ",
    "Celui qui Ressuscite",
    "Il ressuscitera tous les morts le Jour du Jugement. Cette résurrection est une certitude absolue, quel que soit l'état de décomposition du corps.",
  ],
  [
    "الشَّهِيدُ",
    "Aš-Šahīd",
    "Le Témoin Omniprésent",
    "Il est présent partout et témoin de tout ce qui se passe. Son témoignage est parfait, fiable et incontestable pour le Jour du Jugement.",
  ],
  [
    "الْحَقُّ",
    "Al-Ḥaqq",
    "La Vérité Absolue",
    "Il est la seule vérité réelle et absolue. Son existence est la seule qui soit nécessaire — tout le reste dépend de Lui pour exister.",
  ],
  [
    "الْوَكِيلُ",
    "Al-Wakīl",
    "Le Garant",
    "Il s'occupe des affaires de ceux qui Lui font confiance. Se remettre à Lui (tawakkul) apporte sérénité et protection dans toutes les épreuves.",
  ],
  [
    "الْقَوِيُّ",
    "Al-Qawī",
    "Le Très Fort",
    "Sa force est absolue et ne connaît aucune faiblesse. Toute la puissance de l'univers réuni n'est qu'une infime parcelle de Sa force incommensurable.",
  ],
  [
    "الْمَتِينُ",
    "Al-Matīn",
    "L'Inébranlable",
    "Son pouvoir est inébranlable et ne peut jamais être diminué ou affaibli. Il est la Roche absolue sur laquelle repose toute l'existence.",
  ],
  [
    "الْوَلِيُّ",
    "Al-Walī",
    "L'Allié Protecteur",
    "Il est le protecteur et l'ami des croyants. Avoir Allah comme allié signifie n'avoir aucune véritable raison de craindre quoi que ce soit.",
  ],
  [
    "الْحَمِيدُ",
    "Al-Ḥamīd",
    "Le Digne de Louange",
    "Il mérite toutes les louanges et toutes les actions de grâce. Toute la création Le loue, consciemment ou non, à chaque instant.",
  ],
  [
    "الْمُحْصِي",
    "Al-Muḥṣī",
    "Le Dénombreur",
    "Il compte et enregistre chaque chose, même la plus infime. Pas un atome de bien ou de mal n'échappe à Son décompte parfait.",
  ],
  [
    "الْمُبْدِئُ",
    "Al-Mubdiʾ",
    "L'Initiateur",
    "Il a commencé la création de toutes choses à partir de rien. C'est Son acte créateur initial qui a fait naître l'univers entier du néant.",
  ],
  [
    "الْمُعِيدُ",
    "Al-Muʿīd",
    "Celui qui Recommence",
    "Il recommencera la création après sa fin. La résurrection est pour Lui plus facile encore que la première création initiale.",
  ],
  [
    "الْمُحْيِي",
    "Al-Muḥyī",
    "Celui qui Donne la Vie",
    "Il donne la vie à toutes les créatures. C'est Lui qui souffle la vie dans les corps et dans les cœurs morts par l'ignorance et le péché.",
  ],
  [
    "الْمُمِيتُ",
    "Al-Mumīt",
    "Celui qui Donne la Mort",
    "Il décide du moment de la mort de chaque être. La mort est une transition, non une fin, et elle est entièrement entre Ses mains.",
  ],
  [
    "الْحَيُّ",
    "Al-Ḥayy",
    "Le Vivant",
    "Il est vivant d'une vie sans début ni fin, sans besoin de nourriture ni de sommeil. Sa vie est parfaite et absolue, sans aucune interruption possible.",
  ],
  [
    "الْقَيُّومُ",
    "Al-Qayyūm",
    "Le Subsistant par Lui-même",
    "Il subsiste par Lui-même et tout subsiste grâce à Lui. Si Son soutien venait à cesser un instant, l'univers entier s'effondrerait immédiatement.",
  ],
  [
    "الْوَاجِدُ",
    "Al-Wājid",
    "Celui qui Trouve",
    "Il trouve tout ce qu'Il veut, à tout moment. Il n'y a rien qu'Il désire et qu'Il ne puisse obtenir — Sa volonté est absolue.",
  ],
  [
    "الْمَاجِدُ",
    "Al-Mājid",
    "Le Noble",
    "Il est noble dans Ses attributs et généreux dans Ses dons. Sa noblesse est parfaite, incomparable, et ne se dégrade jamais. (Distinct d'Al-Majīd الْمَجِيدُ par la nuance : Al-Mājid désigne l'essence noble, Al-Majīd la gloire active.)",
  ],
  [
    "الْأَحَدُ",
    "Al-Aḥad",
    "L'Unique Absolu",
    "L'Un absolu, indivisible et incomparable. Il n'a ni partenaire, ni rival, ni égal dans aucun domaine de l'existence. Son unicité est totale, sans aucune analogie possible. (Al-Wāḥid الواحد, qui figure dans certaines compilations, exprime la même idée et est ici fusionné avec Al-Aḥad pour respecter le compte canonique de 99.)",
  ],
  [
    "الصَّمَدُ",
    "Aṣ-Ṣamad",
    "L'Éternel Absolu",
    "L'Être vers lequel toutes les créatures se tournent dans leurs besoins. Il n'a besoin de rien tandis que tout le monde a besoin de Lui.",
  ],
  [
    "الْقَادِرُ",
    "Al-Qādir",
    "Le Tout-Puissant",
    "Il a le pouvoir sur toute chose. Rien n'est impossible pour Lui — Il dit à une chose 'Sois !' et elle est, sans délai ni effort.",
  ],
  [
    "الْمُقْتَدِرُ",
    "Al-Muqtadir",
    "L'Omnipotent",
    "Son pouvoir est encore plus total que Qādir. Il exerce Son autorité sur toute la création de manière absolue et permanente.",
  ],
  [
    "الْمُقَدِّمُ",
    "Al-Muqaddim",
    "Celui qui Avance",
    "Il met en avant ce qu'Il veut selon Sa sagesse. Il a placé les prophètes, les croyants et les bonnes actions en position de priorité absolue.",
  ],
  [
    "الْمُؤَخِّرُ",
    "Al-Muʾaḫḫir",
    "Celui qui Diffère",
    "Il reporte ce qu'Il veut selon Sa sagesse. Ce qui semble tardif est toujours au bon moment dans Son plan parfait.",
  ],
  [
    "الْأَوَّلُ",
    "Al-Awwal",
    "Le Premier",
    "Il est le Premier sans commencement. Il existait avant toute chose — avant l'espace, le temps et la matière.",
  ],
  [
    "الْآخِرُ",
    "Al-Āḫir",
    "Le Dernier",
    "Il est le Dernier sans fin. Après la disparition de l'univers entier, Il demeurera éternellement seul.",
  ],
  [
    "الظَّاهِرُ",
    "Aẓ-Ẓāhir",
    "Le Manifeste",
    "Il est manifeste par Ses signes dans toute la création. Ses traces sont visibles partout pour ceux qui réfléchissent et observent.",
  ],
  [
    "الْبَاطِنُ",
    "Al-Bāṭin",
    "Le Caché",
    "Son essence est cachée aux regards et aux esprits. Sa profondeur dépasse toute compréhension humaine et toute imagination.",
  ],
  [
    "الْوَالِي",
    "Al-Wālī",
    "Le Maître Régisseur",
    "Il gouverne et administre l'univers entier avec un contrôle absolu. Rien ne se produit sans Sa permission et Sa gestion souveraine. (Distinct d'Al-Walī الولي par la fonction de gouvernance.)",
  ],
  [
    "الْمُتَعَالِي",
    "Al-Mutaʿālī",
    "Le Très-Élevé Transcendant",
    "Il est au-dessus de tout attribut imparfait que les humains pourraient Lui attribuer. Sa transcendance et Son élévation sont totales et absolues.",
  ],
  [
    "الْبَرُّ",
    "Al-Barr",
    "Le Source du Bien",
    "Il est infiniment bon et bienveillant envers Ses serviteurs. Sa bonté se manifeste dans chaque souffle de vie accordé à toute Sa création.",
  ],
  [
    "التَّوَّابُ",
    "At-Tawwāb",
    "Le Grand Accueillant au Repentir",
    "Il accueille le repentir encore et encore avec joie. Le Prophète ﷺ dit qu'Allah est plus heureux du repentir de Son serviteur qu'un homme retrouvant son chameau perdu dans le désert.",
  ],
  [
    "الْمُنْتَقِمُ",
    "Al-Muntaqim",
    "Celui qui Punit",
    "Il punit les injustes et venge les opprimés. Cette punition n'est pas de la rancœur mais la manifestation parfaite de Sa justice absolue.",
  ],
  [
    "الْعَفُوُّ",
    "Al-ʿAfuww",
    "Celui qui Efface",
    "Il efface les péchés complètement, comme s'ils n'avaient jamais existé. Différence avec Ġafūr : ʿAfuww efface sans laisser de trace, même le souvenir du péché.",
  ],
  [
    "الرَّؤُوفُ",
    "Ar-Raʾūf",
    "Le Très Compatissant",
    "Sa compassion est la manifestation la plus tendre de Sa miséricorde. Elle est si intense qu'elle devance la demande et se manifeste avant même la prière.",
  ],
  [
    "مَالِكُ الْمُلْكِ",
    "Mālik al-Mulk",
    "Maître du Royaume",
    "Il possède tout le royaume de l'univers et en dispose comme Il veut. Les rois humains ne sont que des locataires éphémères de ce qu'Il leur confie temporairement.",
  ],
  [
    "ذُو الْجَلَالِ وَالْإِكْرَامِ",
    "Ḏū l-Jalāli wa-l-Ikrām",
    "Maître de la Majesté et de la Générosité",
    "Il combine la majesté qui impose la révérence et la générosité qui invite à l'amour. Ces deux attributs résument la perfection divine dans sa totalité.",
  ],
  [
    "الْمُقْسِطُ",
    "Al-Muqsiṭ",
    "L'Équitable",
    "Il rend la justice avec équité parfaite, sans favoritisme ni injustice d'aucune sorte. Son équité s'étend à toute la création, au-delà de toute considération.",
  ],
  [
    "الْجَامِعُ",
    "Al-Jāmiʿ",
    "Le Rassembleur",
    "Il rassemblera toute la création le Jour du Jugement. Il rassemble aussi les contraires et les différences dans Sa création par Sa sagesse infinie.",
  ],
  [
    "الْغَنِيُّ",
    "Al-Ġanī",
    "Le Riche Absolu",
    "Il est absolument indépendant de toute Sa création. Il n'a besoin de rien ni de personne, tandis que tout dépend de Lui pour son existence.",
  ],
  [
    "الْمُغْنِي",
    "Al-Muġnī",
    "L'Enrichisseur",
    "Il enrichit qui Il veut par Sa grâce. La vraie richesse — matérielle ou spirituelle — ne vient que de Lui et ne peut venir d'ailleurs.",
  ],
  [
    "الْمَانِعُ",
    "Al-Māniʿ",
    "Celui qui Empêche",
    "Il empêche ce qui nuirait à Ses serviteurs et préserve ce qui leur est bénéfique. Son empêchement apparent est une forme de miséricorde cachée.",
  ],
  [
    "الضَّارُّ",
    "Aḍ-Ḍārr",
    "Celui qui peut Affliger",
    "Il peut permettre l'épreuve selon Sa sagesse, pour tester ou rappeler. Aucun mal ne peut atteindre sans Sa permission absolue. (Toujours invoqué avec An-Nāfiʿ.)",
  ],
  [
    "النَّافِعُ",
    "An-Nāfiʿ",
    "Celui qui Profite",
    "Il est la source de tout bénéfice et de toute utilité dans l'univers. Tout bien vient de Lui, directement ou indirectement.",
  ],
  [
    "النُّورُ",
    "An-Nūr",
    "La Lumière",
    "Il est la Lumière des cieux et de la terre. Sa lumière guide les cœurs, éclaire les esprits et donne vie aux âmes obscurcies par l'ignorance.",
  ],
  [
    "الْهَادِي",
    "Al-Hādī",
    "Le Guide",
    "Il guide vers la vérité qui Il veut. La guidance véritable ne vient que de Lui — ni l'intelligence ni l'éducation ne peuvent la remplacer.",
  ],
  [
    "الْبَدِيعُ",
    "Al-Badīʿ",
    "L'Incomparable Créateur",
    "Il crée des choses uniques sans modèle préexistant. Chaque être dans l'univers est une innovation absolue, une création sans précédent dans l'existence.",
  ],
  [
    "الْبَاقِي",
    "Al-Bāqī",
    "L'Éternel Subsistant",
    "Il demeure éternellement après la fin de toute chose. Quand les cieux et la terre disparaîtront, seul Lui demeurera pour toujours.",
  ],
  [
    "الْوَارِثُ",
    "Al-Wāriṯ",
    "L'Héritier Absolu",
    "Il hérite de tout après la mort de toute Sa création. À la fin, tout retourne à Lui — les royaumes, les richesses, les vies, tout.",
  ],
  [
    "الرَّشِيدُ",
    "Ar-Rašīd",
    "Le Guide vers la Rectitude",
    "Sa sagesse guide chaque chose vers ce qui est juste et correct. Ses décrets sont toujours parfaitement orientés vers le meilleur pour Ses créatures.",
  ],
  [
    "الصَّبُورُ",
    "Aṣ-Ṣabūr",
    "Le Très Patient",
    "Il ne Se hâte pas de punir malgré les désobéissances répétées. Sa patience est une forme de miséricorde qui donne aux pécheurs le temps précieux de se repentir.",
  ],
];

/* ════════════════════════════════════════════════════════════════════
 DHIKR — Formules quotidiennes (les plus essentielles)
═════════════════════════════════════════════════════════════════════ */

const DHIKR = [
  {
    ar: "سُبْحَانَ اللَّهِ",
    ph: "Subḥāna llāh",
    fr: "Gloire à Allah",
    count: "33x après chaque prière",
    benefits:
      "Efface les péchés. Composante de la formule des 100 louanges après chaque prière obligatoire.",
  },
  {
    ar: "الْحَمْدُ لِلَّهِ",
    ph: "Al-ḥamdu lillāh",
    fr: "Louange à Allah",
    count: "33x après chaque prière",
    benefits:
      "« Al-ḥamdu lillāh remplit la balance » (Muslim). Formule de gratitude par excellence.",
  },
  {
    ar: "اللَّهُ أَكْبَرُ",
    ph: "Allāhu Akbar",
    fr: "Allah est le Plus Grand",
    count: "34x après chaque prière",
    benefits:
      "Proclame la grandeur d'Allah. Récité pour compléter les 100 après les 33 Subḥānallāh et 33 Alḥamdulillāh.",
  },
  {
    ar: "لَا إِلَٰهَ إِلَّا اللَّهُ",
    ph: "Lā ilāha illā llāh",
    fr: "Il n'y a de dieu qu'Allah",
    count: "100x par jour",
    benefits:
      "« La meilleure des invocations est Lā ilāha illā llāh » (Tirmidhî). 100 fois = récompense de 10 affranchis, 100 bonnes actions, protection contre le diable jusqu'au soir (Bukhârî).",
  },
  {
    ar: "أَسْتَغْفِرُ اللَّهَ",
    ph: "Astaġfiru llāh",
    fr: "Je demande pardon à Allah",
    count: "100x par jour minimum",
    benefits:
      "Le Prophète ﷺ demandait pardon plus de 70 fois par jour (Bukhârî). Ouvre les portes du rizq, soulage l'anxiété.",
  },
  {
    ar: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    ph: "Lā ḥawla wa-lā quwwata illā billāh",
    fr: "Il n'y a ni force ni puissance sauf par Allah",
    count: "Autant que possible",
    benefits:
      "Appelée la « trésorerie du Paradis » (Bukhârî, Muslim). Rappelle que toute force vient d'Allah.",
  },
  {
    ar: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    ph: "Subḥāna llāhi wa-biḥamdih",
    fr: "Gloire à Allah et Sa louange",
    count: "100x matin et soir",
    benefits:
      "« Celui qui dit 100x dans la journée Subḥāna llāhi wa-biḥamdih, ses péchés sont effacés même s'ils étaient comme l'écume de la mer. » (Bukhârî, Muslim)",
  },
  {
    ar: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
    ph: "Subḥāna llāhi wa-biḥamdih, Subḥāna llāhi l-ʿaẓīm",
    fr: "Gloire à Allah et Sa louange, Gloire à Allah le Très Grand",
    count: "Autant que possible",
    benefits:
      "« Deux paroles légères sur la langue, lourdes dans la balance et chères au Miséricordieux. » (Bukhârî, Muslim)",
  },
  {
    ar: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَىٰ نَبِيِّنَا مُحَمَّدٍ",
    ph: "Allāhumma ṣalli wa-sallim ʿalā nabiyyinā Muḥammad",
    fr: "Ô Allah, prie et accorde la paix sur notre prophète Muhammad",
    count: "10x matin et soir minimum",
    benefits:
      "« Quiconque prie sur moi une fois, Allah priera sur lui dix fois. » (Muslim). Attire l'intercession le Jour du Jugement.",
  },
  {
    ar: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    ph: "Ḥasbunā llāhu wa-niʿma l-wakīl",
    fr: "Allah nous suffit et quel excellent garant Il est !",
    count: "En cas d'angoisse ou de peur",
    benefits:
      "Formule prononcée par Ibrâhîm ﷺ jeté dans le feu, et par le Prophète ﷺ face aux ennemis. Allah répondit : « Il leur suffit. » (Bukhârî)",
  },
  {
    ar: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    ph: "Aʿūḏu billāhi mina š-šayṭāni r-rajīm",
    fr: "Je cherche protection en Allah contre le diable maudit",
    count: "En cas de colère ou de tentation",
    benefits:
      "Le Prophète ﷺ a dit : si une personne en colère prononce cette formule, sa colère s'éteint (Bukhârî).",
  },
  {
    ar: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    ph: "Lā ilāha illā llāh waḥdahu lā šarīka lah, lahu l-mulku wa-lahu l-ḥamd, wa-huwa ʿalā kulli šayʾin qadīr",
    fr: "Il n'y a de dieu qu'Allah, Unique sans associé, à Lui la royauté et la louange, et Il est puissant sur toute chose",
    count: "100x par jour / 10x après Fajr et Maghrib",
    benefits:
      "« Celui qui dit cette formule 100x dans la journée a la récompense d'avoir affranchi 10 esclaves, 100 bonnes actions lui sont inscrites, 100 mauvaises lui sont effacées, et il est protégé du diable jusqu'au soir. » (Bukhârî, Muslim). 10 fois après Fajr et Maghrib selon la pratique du Prophète ﷺ.",
  },
];

/* ════════════════════════════════════════════════════════════════════
 ROUTINES — Adhkar guidées (post-prière, matin, soir)
═════════════════════════════════════════════════════════════════════ */

const ROUTINES = [
  {
    id: "post",
    name: "Après chaque prière obligatoire",
    color: "#c9a84c",
    intro:
      "Séquence d'adhkar pratiquée par le Prophète ﷺ après chaque salât. À ne pas manquer pour bénéficier de la baraka maximale de la prière.",
    steps: [
      {
        ar: "أَسْتَغْفِرُ اللَّهَ",
        ph: "Astaġfiru llāh",
        fr: "Je demande pardon à Allah",
        count: "3x",
      },
      {
        ar: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
        ph: "Allāhumma anta s-salām wa-minka s-salām, tabārakta yā ḏa l-jalāli wa-l-ikrām",
        fr: "Ô Allah, Tu es la Paix et la paix vient de Toi. Béni sois-Tu, ô Toi qui possèdes la majesté et la générosité",
        count: "1x",
      },
      {
        ar: "سُبْحَانَ اللَّهِ",
        ph: "Subḥāna llāh",
        fr: "Gloire à Allah",
        count: "33x",
      },
      {
        ar: "الْحَمْدُ لِلَّهِ",
        ph: "Al-ḥamdu lillāh",
        fr: "Louange à Allah",
        count: "33x",
      },
      {
        ar: "اللَّهُ أَكْبَرُ",
        ph: "Allāhu Akbar",
        fr: "Allah est le Plus Grand",
        count: "34x",
      },
      {
        ar: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        ph: "Lā ilāha illā llāh waḥdahu lā šarīka lah, lahu l-mulku wa-lahu l-ḥamd, wa-huwa ʿalā kulli šayʾin qadīr",
        fr: "Il n'y a de dieu qu'Allah, Unique sans associé, à Lui la royauté et la louange, et Il est puissant sur toute chose",
        count: "1x (complète les 100)",
      },
      {
        ar: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        ph: "Āyat al-Kursî",
        fr: "Verset 2:255 — Récité après chaque prière, rien ne sépare du Paradis sauf la mort (Nasâʾî)",
        count: "1x (verset complet)",
      },
      {
        ar: "قُلْ هُوَ اللَّهُ أَحَدٌ...",
        ph: "Sourate Al-Iḫlāṣ",
        fr: "Sourate 112 — Équivaut à 1/3 du Coran",
        count: "1x",
      },
      {
        ar: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ...",
        ph: "Sourate Al-Falaq",
        fr: "Sourate 113 — Protection contre le mal extérieur",
        count: "1x",
      },
      {
        ar: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ...",
        ph: "Sourate An-Nâs",
        fr: "Sourate 114 — Protection contre le mal intérieur",
        count: "1x",
      },
      {
        ar: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        ph: "Lā ilāha illā llāh waḥdahu lā šarīka lah, lahu l-mulku wa-lahu l-ḥamd, wa-huwa ʿalā kulli šayʾin qadīr",
        fr: " Spécifique APRÈS FAJR et MAGHRIB uniquement",
        count: "10x (après Fajr et Maghrib)",
      },
    ],
  },

  {
    id: "matin",
    name: "Adhkar du matin (Aṣ-Ṣabāḥ)",
    color: "#4ecca3",
    intro:
      "Adhkar à réciter après la prière de Fajr jusqu'au lever du soleil. Le Prophète ﷺ a dit : « Quiconque dit ces formules ne sera atteint d'aucun mal jusqu'au soir. »",
    steps: [
      {
        ar: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
        ph: "Aʿūḏu billāhi mina š-šayṭāni r-rajīm",
        fr: "Puis Âyat al-Kursî (verset 2:255)",
        count: "1x — Protège jusqu'au soir (Hâkim, authentique)",
      },
      {
        ar: "قُلْ هُوَ اللَّهُ أَحَدٌ / قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ / قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        ph: "Sourates Al-Iḫlāṣ + Al-Falaq + An-Nâs",
        fr: "« Récite-les trois fois matin et soir, elles te suffiront contre toute chose. » (Tirmidhî, Abû Dâwûd — authentique)",
        count: "3x chacune",
      },
      {
        ar: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ",
        ph: "Aṣbaḥnā wa-aṣbaḥa l-mulku lillāh, wa-l-ḥamdu lillāh, lā ilāha illā llāh waḥdahu lā šarīka lah, lahu l-mulku wa-lahu l-ḥamd, wa-huwa ʿalā kulli šayʾin qadīr. Rabbi asʾaluka ḫayra mā fī hāḏā l-yawmi wa-ḫayra mā baʿdah, wa-aʿūḏu bika min šarri mā fī hāḏā l-yawmi wa-šarri mā baʿdah",
        fr: "Nous voici au matin, et la royauté est à Allah. Louange à Allah. Il n'y a de dieu qu'Allah Unique sans associé. À Lui la royauté, à Lui la louange, et Il est puissant sur toute chose. Seigneur, je Te demande le bien de ce jour et de ce qui suit, et je cherche refuge auprès de Toi contre le mal de ce jour et de ce qui suit",
        count: "1x (Muslim)",
      },
      {
        ar: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ...",
        ph: "Sayyid al-Istiġfār",
        fr: "Le Maître des demandes de pardon — voir section Doua. « Celui qui le dit le matin avec certitude et meurt ce jour-là entre au Paradis. » (Bukhârî)",
        count: "1x",
      },
      {
        ar: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ",
        ph: "Allāhumma ʿāfinī fī badanī, Allāhumma ʿāfinī fī samʿī, Allāhumma ʿāfinī fī baṣarī, lā ilāha illā ant",
        fr: "Ô Allah, préserve mon corps, mon ouïe, ma vue. Il n'y a de dieu que Toi",
        count: "3x (Abû Dâwûd, authentique)",
      },
      {
        ar: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ، وَهُوَ السَّمِيعُ الْعَلِيمُ",
        ph: "Bismillāhi llaḏī lā yaḍurru maʿa smihi šayʾun fi l-arḍi wa-lā fi s-samāʾ, wa-huwa s-samīʿu l-ʿalīm",
        fr: "Au nom d'Allah avec le nom duquel rien sur terre ni dans le ciel ne peut nuire ; Il est Celui qui entend tout et l'Omniscient",
        count:
          "3x — « Quiconque le dit ne sera atteint d'aucun mal soudain » (Tirmidhî, authentique)",
      },
      {
        ar: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا",
        ph: "Raḍītu billāhi rabbā, wa-bi-l-islāmi dīnā, wa-bi-Muḥammadin ﷺ nabiyyā",
        fr: "Je suis satisfait d'avoir Allah pour Seigneur, l'Islam pour religion et Muhammad ﷺ pour prophète",
        count:
          "3x — Allah s'engage à le satisfaire le Jour du Jugement (Tirmidhî, authentique)",
      },
      {
        ar: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ، وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
        ph: "Ḥasbiya llāhu lā ilāha illā huwa, ʿalayhi tawakkaltu, wa-huwa rabbu l-ʿarši l-ʿaẓīm",
        fr: "Allah me suffit, point de divinité hormis Lui. À Lui je m'en remets, et Il est le Seigneur du Trône immense",
        count:
          "7x — Allah lui suffit pour ses soucis (Abû Dâwûd, chaîne discutée mais largement pratiquée)",
      },
      {
        ar: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَىٰ نَفْسِي طَرْفَةَ عَيْنٍ",
        ph: "Yā Ḥayyu yā Qayyūm bi-raḥmatika astaġīṯ, aṣliḥ lī šaʾnī kullah, wa-lā takilnī ilā nafsī ṭarfata ʿayn",
        fr: "Ô Vivant, ô Subsistant ! Par Ta miséricorde j'implore secours. Améliore toute mon affaire et ne m'abandonne pas à moi-même le temps d'un clin d'œil",
        count: "1x (Hâkim, Nasâʾî)",
      },
      {
        ar: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
        ph: "Subḥāna llāhi wa-biḥamdih",
        fr: "100x — efface les péchés comme l'écume de la mer (Bukhârî, Muslim)",
        count: "100x",
      },
      {
        ar: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        ph: "Lā ilāha illā llāh waḥdahu lā šarīka lah, lahu l-mulku wa-lahu l-ḥamd, wa-huwa ʿalā kulli šayʾin qadīr",
        fr: "100x = récompense de 10 affranchis, protection contre le diable jusqu'au soir (Bukhârî, Muslim)",
        count: "10x ou 100x",
      },
      {
        ar: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَىٰ نَبِيِّنَا مُحَمَّدٍ",
        ph: "Allāhumma ṣalli wa-sallim ʿalā nabiyyinā Muḥammad",
        fr: "Salawât sur le Prophète ﷺ",
        count: "10x minimum",
      },
    ],
  },

  {
    id: "soir",
    name: "Adhkar du soir (Al-Masāʾ)",
    color: "#6e5fa6",
    intro:
      "Adhkar à réciter après la prière de ʿAṣr jusqu'à la nuit. Mêmes formules que le matin avec « Amsaynā » (« Nous voici au soir ») au lieu de « Aṣbaḥnā ».",
    steps: [
      {
        ar: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...",
        ph: "Âyat al-Kursî",
        fr: "Verset 2:255 — Protège jusqu'au matin",
        count: "1x",
      },
      {
        ar: "قُلْ هُوَ اللَّهُ أَحَدٌ / قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ / قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        ph: "Al-Iḫlāṣ + Al-Falaq + An-Nâs",
        fr: "« Récite-les trois fois matin et soir, elles te suffiront contre toute chose. » (Tirmidhî, authentique)",
        count: "3x chacune",
      },
      {
        ar: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا",
        ph: "Amsaynā wa-amsa l-mulku lillāh, wa-l-ḥamdu lillāh...",
        fr: "Nous voici au soir, et la royauté est à Allah... (variante du soir de la formule du matin)",
        count: "1x (Muslim)",
      },
      {
        ar: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
        ph: "Allāhumma bika amsaynā, wa-bika aṣbaḥnā, wa-bika naḥyā, wa-bika namūt, wa-ilayka l-maṣīr",
        fr: "Ô Allah, par Toi nous arrivons au soir, par Toi nous nous levons, par Toi nous vivons, par Toi nous mourons, et vers Toi est le retour",
        count: "1x (Tirmidhî, authentique)",
      },
      {
        ar: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        ph: "Aʿūḏu bi-kalimāti llāhi t-tāmmāti min šarri mā ḫalaq",
        fr: "Je cherche refuge dans les paroles parfaites d'Allah contre le mal de ce qu'Il a créé",
        count:
          "3x — « Quiconque le dit le soir n'est touché par aucune nuisance cette nuit-là » (Muslim)",
      },
      {
        ar: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ، وَهُوَ السَّمِيعُ الْعَلِيمُ",
        ph: "Bismillāhi llaḏī lā yaḍurru maʿa smihi šayʾun fi l-arḍi wa-lā fi s-samāʾ, wa-huwa s-samīʿu l-ʿalīm",
        fr: "Au nom d'Allah avec le nom duquel rien ne peut nuire",
        count: "3x",
      },
      {
        ar: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا",
        ph: "Raḍītu billāhi rabbā, wa-bi-l-islāmi dīnā, wa-bi-Muḥammadin ﷺ nabiyyā",
        fr: "Je suis satisfait d'avoir Allah pour Seigneur, l'Islam pour religion et Muhammad ﷺ pour prophète",
        count: "3x",
      },
      {
        ar: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
        ph: "Subḥāna llāhi wa-biḥamdih",
        fr: "Gloire à Allah et Sa louange",
        count: "100x",
      },
      {
        ar: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَىٰ نَبِيِّنَا مُحَمَّدٍ",
        ph: "Allāhumma ṣalli wa-sallim ʿalā nabiyyinā Muḥammad",
        fr: "Salawât sur le Prophète ﷺ",
        count: "10x minimum",
      },
    ],
  },

  {
    id: "sommeil",
    name: "Avant de dormir",
    color: "#3a7ca5",
    intro:
      "Le Prophète ﷺ avait des adhkar spécifiques avant de s'endormir, qui apportaient protection toute la nuit.",
    steps: [
      {
        ar: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...",
        ph: "Âyat al-Kursî",
        fr: "Verset 2:255 — « Allah te protège, et Satan ne s'approchera de toi jusqu'au matin. » (Bukhârî)",
        count: "1x",
      },
      {
        ar: "آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ... (إلى آخر السورة)",
        ph: "Les 2 derniers versets de Sourate Al-Baqara (2:285-286)",
        fr: "« Les deux derniers versets d'Al-Baqara, quiconque les récite la nuit, ils lui suffiront. » (Bukhârî)",
        count: "1x",
      },
      {
        ar: "قُلْ هُوَ اللَّهُ أَحَدٌ / قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ / قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        ph: "Al-Iḫlāṣ + Al-Falaq + An-Nâs",
        fr: "Le Prophète ﷺ les récitait, soufflait dans ses paumes et passait ses mains sur tout son corps. (Bukhârî)",
        count: "3x chacune (puis souffler dans les paumes)",
      },
      {
        ar: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        ph: "Bismika llāhumma amūtu wa-aḥyā",
        fr: "En Ton nom, ô Allah, je meurs et je vis",
        count: "1x (Bukhârî)",
      },
      {
        ar: "اللَّهُمَّ إِنْ أَمْسَكْتَ نَفْسِي فَاغْفِرْ لَهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ",
        ph: "Allāhumma in amsakta nafsī fa-ġfir lahā, wa-in arsaltahā fa-ḥfaẓhā bimā taḥfaẓu bihi ʿibādaka ṣ-ṣāliḥīn",
        fr: "Ô Allah, si Tu prends mon âme, pardonne-lui ; et si Tu la renvoies, protège-la comme Tu protèges Tes serviteurs vertueux",
        count: "1x (Muslim)",
      },
    ],
  },
];

/* ════════════════════════════════════════════════════════════════════
 DOUA — Coran/Sunna, Prophètes, Quotidien
═════════════════════════════════════════════════════════════════════ */

const DOUA_GENERAL = [
  {
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ بِأَنِّي أَشْهَدُ أَنَّكَ أَنْتَ اللَّهُ لَا إِلَٰهَ إِلَّا أَنْتَ الْأَحَدُ الصَّمَدُ الَّذِي لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
    ph: "Allāhumma innī asʾaluka bi-annī ašhadu annaka anta llāh, lā ilāha illā anta, al-Aḥadu ṣ-Ṣamad, allaḏī lam yalid wa-lam yūlad, wa-lam yakun lahu kufuwan aḥad",
    fr: "Ô Allah, je Te demande en attestant que c'est Toi Allah ; il n'y a de divinité que Toi, l'Unique, l'Absolu, Celui qui n'a pas engendré et n'a pas été engendré, et nul n'est égal à Lui",
    context: "Invocation par le Nom Suprême d'Allah (Ism al-Aʿẓam)",
    benefits:
      "« Il a invoqué Allah par Son Nom le Plus Grand ; celui par lequel, lorsqu'on Lui demande, Il accorde, et lorsqu'on L'invoque, Il répond. » (Tirmidhî, Abû Dâwûd — authentique)",
  },

  {
    ar: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    ph: "Ḥasbunā llāhu wa-niʿma l-wakīl",
    fr: "Allah nous suffit et c'est le meilleur des garants",
    context:
      "Invocation d'Ibrâhîm ﷺ jeté dans le feu, puis du Prophète ﷺ face aux ennemis",
    benefits:
      "Ibrâhîm ﷺ l'a prononcée jeté dans le feu : Allah a transformé le feu en fraîcheur. Formule de confiance totale (tawakkul) dans les moments de peur ou de danger. (Bukhârî)",
  },

  {
    ar: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    ph: "Allāhumma anta rabbī, lā ilāha illā anta, ḫalaqtanī wa-anā ʿabduka, wa-anā ʿalā ʿahdika wa-waʿdika ma staṭaʿtu, aʿūḏu bika min šarri mā ṣanaʿtu, abūʾu laka bi-niʿmatika ʿalayya, wa-abūʾu bi-ḏanbī, fa-ġfir lī fa-innahu lā yaġfiru ḏ-ḏunūba illā anta",
    fr: "Seigneur Allah, Tu es mon Seigneur. Il n'y a de dieu que Toi. Tu m'as créé et je suis Ton serviteur. Je me conforme autant que je peux à mon engagement et à ma promesse envers Toi. Je me mets sous Ta protection contre le mal de ce que j'ai fait. Je reconnais Ton bienfait à mon égard. Je reconnais mon péché. Pardonne-moi car il n'y a que Toi qui pardonnes les péchés",
    context: "Sayyid al-Istiġfār — Le Maître des demandes de pardon",
    benefits:
      "« Celui qui la dit le jour avec certitude et meurt avant le soir, ou la dit la nuit avec certitude et meurt avant le matin, entrera au Paradis. » (Bukhârî)",
  },

  {
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ",
    ph: "Allāhumma innī asʾaluka l-jannah",
    fr: "Ô Allah, accorde-moi le Paradis",
    context: "Invocation concise pour demander le Paradis",
    benefits:
      "« Celui qui demande le Paradis trois fois, le Paradis dit : Ô Allah, fais-le entrer au Paradis. » (Tirmidhî, authentique)",
  },

  {
    ar: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
    ph: "Allāhumma ajirnī mina n-nār",
    fr: "Ô Allah, préserve-moi du Feu de l'Enfer",
    context: "Protection contre l'Enfer — à coupler avec la demande du Paradis",
    benefits:
      "« Celui qui demande protection contre l'Enfer trois fois, l'Enfer dit : Ô Allah, protège-le de moi. » (Tirmidhî, authentique)",
  },

  {
    ar: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    ph: "Allāhumma innaka ʿafuwwun tuḥibbu l-ʿafwa fa-ʿfu ʿannī",
    fr: "Ô Allah, Tu es Celui qui pardonne, Tu aimes pardonner, alors pardonne-moi",
    context:
      "Doua enseignée par le Prophète ﷺ à Aïcha (RA) pour Laylat al-Qadr",
    benefits:
      "Aïcha (RA) demanda au Prophète ﷺ ce qu'elle devait dire si elle trouvait la Nuit du Destin — il lui enseigna cette invocation (Tirmidhî, authentique). Essentielle durant les 10 dernières nuits du Ramadan.",
  },

  {
    ar: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    ph: "Rabbi rḥamhumā kamā rabbayānī ṣaġīrā",
    fr: "Seigneur, fais-leur miséricorde (à mes parents) comme ils m'ont élevé tout petit",
    context: "Verset coranique (Sourate Al-Isrāʾ 17:24)",
    benefits:
      "Doua parfaite pour les parents, vivants ou décédés. Allah associe Son droit à celui des parents.",
  },

  {
    ar: "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
    ph: "Rabbanā ġfir lī wa-li-wālidayya wa-lil-muʾminīna yawma yaqūmu l-ḥisāb",
    fr: "Notre Seigneur, pardonne-moi ainsi qu'à mes parents et aux croyants, le Jour où se dressera le Jugement",
    context:
      "Verset coranique (Sourate Ibrâhîm 14:41) — invocation du prophète Ibrâhîm ﷺ",
    benefits: "Englobe soi-même, ses parents et toute la communauté musulmane.",
  },

  {
    ar: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    ph: "Allāhumma aʿinnī ʿalā ḏikrika wa-šukrika wa-ḥusni ʿibādatik",
    fr: "Ô Allah, aide-moi à T'invoquer, à Te remercier et à T'adorer de la meilleure manière",
    context:
      "Doua enseignée par le Prophète ﷺ à Muʿāḏ ibn Jabal (RA), à dire après chaque prière",
    benefits:
      "Le Prophète ﷺ prit la main de Muʿāḏ et lui dit : « Par Allah, je t'aime », puis lui apprit cette invocation (Abû Dâwûd, authentique).",
  },

  {
    ar: "اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
    ph: "Allāhumma jʿalnī mina t-tawwābīna wa-jʿalnī mina l-mutaṭahhirīn",
    fr: "Ô Allah, place-moi parmi ceux qui se repentent et parmi ceux qui se purifient",
    context: "À réciter après le woudou (ablutions)",
    benefits:
      "« Les huit portes du Paradis s'ouvrent pour celui qui fait ses ablutions correctement puis prononce cette invocation. » (Muslim)",
  },

  {
    ar: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ",
    ph: "Astaġfiru llāha l-ʿaẓīma llaḏī lā ilāha illā huwa, al-Ḥayya l-Qayyūm, wa-atūbu ilayh",
    fr: "Je demande pardon à Allah le Très Grand, Celui en dehors duquel il n'y a pas d'autre divinité, le Vivant, le Subsistant, et je me repens à Lui",
    context: "Istiġfâr complet enseigné par le Prophète ﷺ",
    benefits:
      "« Celui qui dit cette formule, ses péchés sont pardonnés même s'il avait fui le champ de bataille. » (Abû Dâwûd, Tirmidhî — authentique)",
  },

  {
    ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ وَمِنْ عَذَابِ جَهَنَّمَ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
    ph: "Allāhumma innī aʿūḏu bika min ʿaḏābi l-qabri wa-min ʿaḏābi jahannam, wa-min fitnati l-maḥyā wa-l-mamāt, wa-min šarri fitnati l-masīḥi d-dajjāl",
    fr: "Ô Allah, je cherche Ta protection contre le châtiment de la tombe, contre le châtiment de l'Enfer, contre les épreuves de la vie et de la mort, et contre le mal de l'épreuve du faux messie (Dajjâl)",
    context:
      "À réciter dans le dernier tashahhud de chaque prière, avant le salam",
    benefits:
      "Le Prophète ﷺ ordonnait cette invocation : « Quand l'un de vous termine le dernier tashahhud, qu'il cherche refuge en Allah contre quatre choses. » (Muslim)",
  },

  {
    ar: "اللَّهُمَّ اغْفِرْ لِلْمُسْلِمِينَ وَالْمُسْلِمَاتِ وَالْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ الْأَحْيَاءِ مِنْهُمْ وَالْأَمْوَاتِ",
    ph: "Allāhumma ġfir lil-muslimīna wa-l-muslimāt, wa-l-muʾminīna wa-l-muʾmināt, al-aḥyāʾi minhum wa-l-amwāt",
    fr: "Ô Allah, pardonne aux musulmans et musulmanes, ainsi qu'aux croyants et croyantes, les vivants d'entre eux comme les morts",
    context: "Invocation collective pour toute la communauté",
    benefits:
      "Selon certains savants, celui qui invoque pour chaque croyant et croyante reçoit une bonne action pour chacun d'entre eux.",
  },

  {
    ar: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ، دِقَّهُ وَجِلَّهُ، وَأَوَّلَهُ وَآخِرَهُ، وَعَلَانِيَتَهُ وَسِرَّهُ",
    ph: "Allāhumma ġfir lī ḏanbī kullahu, diqqahu wa-jillahu, wa-awwalahu wa-āḫirahu, wa-ʿalāniyatahu wa-sirrahu",
    fr: "Ô Allah, pardonne-moi tous mes péchés, les petits et les grands, les premiers et les derniers, ceux commis en public et ceux commis en secret",
    context: "Invocation du Prophète ﷺ dans la prosternation (sujûd)",
    benefits:
      "Couvre absolument tous les types de péchés en une seule formule. Le sujûd est le moment où le serviteur est le plus proche d'Allah. (Muslim)",
  },

  {
    ar: "اللَّهُمَّ تَقَبَّلْ مِنَّا صِيَامَنَا وَقِيَامَنَا وَصَلَاتَنَا وَأَذْكَارَنَا وَدُعَاءَنَا وَقِرَاءَتَنَا لِلْقُرْآنِ وَلَا تَرُدَّهَا فِي وُجُوهِنَا يَوْمَ الْقِيَامَةِ",
    ph: "Allāhumma taqabbal minnā ṣiyāmanā wa-qiyāmanā wa-ṣalātanā wa-aḏkāranā wa-duʿāʾanā wa-qirāʾatanā lil-qurʾān, wa-lā taruddahā fī wujūhinā yawma l-qiyāmah",
    fr: "Ô Allah, accepte de nous notre jeûne, notre prière nocturne, notre prière, nos évocations, nos invocations et notre récitation du Coran, et ne nous les rejette pas au visage le Jour de la Résurrection",
    context: "Invocation pour l'acceptation des actes d'adoration",
    benefits:
      "L'acceptation (qabûl) est plus importante que l'accomplissement lui-même. À utiliser toute l'année pour chaque ʿibāda.",
  },
];

const DOUA_PROPHETS = [
  {
    prophet: "Ādam ﷺ",
    ar: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    ph: "Rabbanā ẓalamnā anfusanā wa-in lam taġfir lanā wa-tarḥamnā lanakūnanna mina l-ḫāsirīn",
    fr: "Seigneur, nous nous sommes fait du tort à nous-mêmes. Si Tu ne nous pardonnes pas et ne nous fais pas miséricorde, nous serons très certainement du nombre des perdants",
    ref: "Sourate Al-Aʿrāf 7:23",
    context:
      "Adam ﷺ et Hawa après avoir mangé du fruit de l'arbre interdit. Ils n'ont pas accusé Šayṭān ni cherché d'excuse, mais ont immédiatement reconnu leur faute.",
    benefits:
      "Doua parfaite du repentir : aveu complet de la faute, reconnaissance que seul Allah peut pardonner, peur sincère. Elle a été la cause du pardon d'Adam ﷺ.",
  },

  {
    prophet: "Nūḥ (Noé) ﷺ",
    ar: "رَبِّ إِنِّي أَعُوذُ بِكَ أَنْ أَسْأَلَكَ مَا لَيْسَ لِي بِهِ عِلْمٌ وَإِلَّا تَغْفِرْ لِي وَتَرْحَمْنِي أَكُنْ مِنَ الْخَاسِرِينَ",
    ph: "Rabbi innī aʿūḏu bika an asʾaluka mā laysa lī bihi ʿilm, wa-illā taġfir lī wa-tarḥamnī akun mina l-ḫāsirīn",
    fr: "Seigneur, je cherche Ta protection contre toute demande d'une chose dont je n'ai aucune connaissance. Et si Tu ne me pardonnes pas et ne me fais pas miséricorde, je serai au nombre des perdants",
    ref: "Sourate Hûd 11:47",
    context:
      "Nûḥ ﷺ après avoir demandé à Allah de sauver son fils mécréant du déluge.",
    benefits:
      "Nous apprend l'humilité face à notre ignorance. Protection contre les invocations précipitées.",
  },

  {
    prophet: "Ibrāhīm (Abraham) ﷺ",
    ar: "رَبِّ هَبْ لِي حُكْمًا وَأَلْحِقْنِي بِالصَّالِحِينَ، وَاجْعَل لِّي لِسَانَ صِدْقٍ فِي الْآخِرِينَ",
    ph: "Rabbi hab lī ḥukman wa-alḥiqnī bi-ṣ-ṣāliḥīn, wa-jʿal lī lisāna ṣidqin fi l-āḫirīn",
    fr: "Seigneur, accorde-moi sagesse et fais-moi rejoindre les vertueux. Fais que j'aie une mention honorable dans la postérité",
    ref: "Sourate Aš-Šuʿarāʾ 26:83-84",
    context:
      "Ibrâhîm ﷺ implore Allah pour la sagesse et une mémoire vertueuse.",
    benefits:
      "Doua pour être guidé dans le savoir et les décisions, pour la compagnie des pieux, et pour laisser une trace bénéfique. Allah a exaucé : toutes les religions monothéistes honorent Ibrâhîm ﷺ.",
  },

  {
    prophet: "Ibrāhīm & Ismāʿīl ﷺ",
    ar: "رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
    ph: "Rabbanā taqabbal minnā, innaka anta s-samīʿu l-ʿalīm",
    fr: "Notre Seigneur, accepte ceci de notre part ! Car c'est Toi l'Audient, l'Omniscient",
    ref: "Sourate Al-Baqara 2:127",
    context:
      "Prononcée par Ibrâhîm ﷺ et son fils Ismāʿīl ﷺ pendant qu'ils construisaient les fondations de la Kaaba.",
    benefits:
      "Doua essentielle à dire après toute ʿibāda. Même les plus grands prophètes craignaient que leur acte ne soit pas accepté.",
  },

  {
    prophet: "Yūsuf (Joseph) ﷺ",
    ar: "فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ أَنتَ وَلِيِّي فِي الدُّنْيَا وَالْآخِرَةِ ۖ تَوَفَّنِي مُسْلِمًا وَأَلْحِقْنِي بِالصَّالِحِينَ",
    ph: "Fāṭira s-samāwāti wa-l-arḍ, anta waliyyī fī d-dunyā wa-l-āḫirah, tawaffanī musliman wa-alḥiqnī bi-ṣ-ṣāliḥīn",
    fr: "Ô Créateur des cieux et de la terre, Tu es mon protecteur, ici-bas et dans l'au-delà. Fais-moi mourir en parfaite soumission et fais-moi rejoindre les vertueux",
    ref: "Sourate Yûsuf 12:101",
    context:
      "Yûsuf ﷺ après avoir retrouvé sa famille et au sommet du pouvoir en Égypte.",
    benefits:
      "Doua pour mourir musulman. Leçon : c'est au moment du succès qu'il faut le plus craindre de s'éloigner d'Allah.",
  },

  {
    prophet: "Mūsā (Moïse) ﷺ",
    ar: "رَبِّ اشْرَحْ لِي صَدْرِي، وَيَسِّرْ لِي أَمْرِي، وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي، يَفْقَهُوا قَوْلِي",
    ph: "Rabbi šraḥ lī ṣadrī, wa-yassir lī amrī, wa-ḥlul ʿuqdatan min lisānī, yafqahū qawlī",
    fr: "Seigneur, dilate ma poitrine, facilite-moi ma tâche, dénoue un nœud en ma langue, afin qu'ils comprennent mes paroles",
    ref: "Sourate Ṭā-Hā 20:25-28",
    context: "Mūsā ﷺ avant d'aller affronter Pharaon.",
    benefits:
      "La doua ultime avant toute tâche difficile : examen, entretien, discours, confrontation. Quatre demandes en une : courage, facilité, éloquence, compréhension par l'auditoire.",
  },

  {
    prophet: "Mūsā ﷺ",
    ar: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
    ph: "Rabbi innī limā anzalta ilayya min ḫayrin faqīr",
    fr: "Seigneur, j'ai grand besoin du bien que Tu feras descendre vers moi",
    ref: "Sourate Al-Qaṣaṣ 28:24",
    context:
      "Mūsā ﷺ, fuyant l'Égypte, arrive à Madyan épuisé, affamé et sans abri.",
    benefits:
      "Puissante invocation pour le rizq. Dans les heures qui suivirent, Allah lui accorda foyer, travail et épouse vertueuse.",
  },

  {
    prophet: "Ayyūb (Job) ﷺ",
    ar: "أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ",
    ph: "Annī massaniya ḍ-ḍurru wa-anta arḥamu r-rāḥimīn",
    fr: "Le malheur m'a touché. Mais Toi, Tu es le plus miséricordieux des miséricordieux",
    ref: "Sourate Al-Anbiyāʾ 21:83",
    context:
      "Après des années de maladie sévère et de pertes, Ayyūb ﷺ ne se plaint pas directement.",
    benefits:
      "Modèle absolu de patience (ṣabr). Allah le guérit immédiatement et lui rendit famille et biens. À réciter pendant la maladie ou la détresse prolongée.",
  },

  {
    prophet: "Yūnus (Jonas) ﷺ",
    ar: "لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
    ph: "Lā ilāha illā anta subḥānaka innī kuntu mina ẓ-ẓālimīn",
    fr: "Il n'y a de divinité que Toi. Gloire à Toi ! J'ai été vraiment du nombre des injustes",
    ref: "Sourate Al-Anbiyāʾ 21:87",
    context: "Yūnus ﷺ dans le ventre de la baleine, dans trois ténèbres.",
    benefits:
      "« Aucun musulman n'invoque Allah avec cette doua sans qu'Allah lui réponde. » (Tirmidhî, authentique). La doua miracle pour sortir de toute détresse extrême.",
  },

  {
    prophet: "Zakariyyā ﷺ",
    ar: "رَبِّ لَا تَذَرْنِي فَرْدًا وَأَنتَ خَيْرُ الْوَارِثِينَ",
    ph: "Rabbi lā taḏarnī fardan wa-anta ḫayru l-wāriṯīn",
    fr: "Seigneur, ne me laisse pas seul, Tu es le meilleur des héritiers",
    ref: "Sourate Al-Anbiyāʾ 21:89",
    context:
      "Zakariyyā ﷺ, âgé et sans enfant, craint que personne ne poursuive la mission.",
    benefits:
      "Doua exaucée : Allah lui donna Yaḥyā ﷺ. Invocation puissante pour obtenir une descendance vertueuse.",
  },

  {
    prophet: "Sulaymān (Salomon) ﷺ",
    ar: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ",
    ph: "Rabbi awziʿnī an aškura niʿmataka llatī anʿamta ʿalayya wa-ʿalā wālidayya wa-an aʿmala ṣāliḥan tarḍāhu wa-adḫilnī bi-raḥmatika fī ʿibādika ṣ-ṣāliḥīn",
    fr: "Seigneur, permets-moi de rendre grâce pour le bienfait dont Tu m'as comblé ainsi que mes parents, et que je fasse une bonne œuvre que Tu agrées. Fais-moi entrer, par Ta miséricorde, parmi Tes serviteurs vertueux",
    ref: "Sourate An-Naml 27:19",
    context:
      "Sulaymān ﷺ, à qui Allah avait donné un royaume sans pareil, entendit une fourmi prévenir les siennes.",
    benefits:
      "Doua complète pour le shukr : pour soi, pour ses parents, et pour agir selon l'agrément divin.",
  },

  {
    prophet: "ʿĪsā (Jésus) ﷺ",
    ar: "اللَّهُمَّ رَبَّنَا أَنزِلْ عَلَيْنَا مَائِدَةً مِّنَ السَّمَاءِ تَكُونُ لَنَا عِيدًا لِّأَوَّلِنَا وَآخِرِنَا وَآيَةً مِّنكَ ۖ وَارْزُقْنَا وَأَنتَ خَيْرُ الرَّازِقِينَ",
    ph: "Allāhumma rabbanā anzil ʿalaynā māʾidatan mina s-samāʾi takūnu lanā ʿīdan li-awwalinā wa-āḫirinā wa-āyatan minka, wa-rzuqnā wa-anta ḫayru r-rāziqīn",
    fr: "Ô Allah, notre Seigneur, fais descendre du ciel sur nous une table servie qui soit une fête pour nous — pour le premier et le dernier d'entre nous — ainsi qu'un signe de Ta part. Nourris-nous : Tu es le meilleur des pourvoyeurs",
    ref: "Sourate Al-Māʾida 5:114",
    context: "ʿĪsā ﷺ invoque Allah à la demande de ses apôtres.",
    benefits:
      "De cette invocation la sourate tire son nom (Al-Māʾida = La Table). Doua pour le rizq béni.",
  },

  {
    prophet: "Muḥammad ﷺ",
    ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
    ph: "Allāhumma innī aʿūḏu bika mina l-hammi wa-l-ḥazan, wa-l-ʿajzi wa-l-kasal, wa-l-buḫli wa-l-jubn, wa-ḍalaʿi d-dayni wa-ġalabati r-rijāl",
    fr: "Ô Allah, je cherche Ta protection contre le souci et la tristesse, contre l'incapacité et la paresse, contre l'avarice et la lâcheté, contre l'accablement des dettes et l'oppression des hommes",
    ref: "Bukhârî",
    context:
      "Invocation que le Prophète ﷺ répétait fréquemment, à faire matin et soir.",
    benefits:
      "Protection contre 8 maux : 2 mentaux (souci, tristesse), 2 comportementaux, 2 moraux, 2 sociaux. La formule la plus complète de protection psycho-sociale.",
  },

  {
    prophet: "Muḥammad ﷺ",
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
    ph: "Allāhumma innī asʾaluka l-hudā wa-t-tuqā wa-l-ʿafāfa wa-l-ġinā",
    fr: "Ô Allah, je Te demande la guidance, la piété, la chasteté et la richesse (du cœur et des moyens)",
    ref: "Muslim",
    context:
      "Invocation enseignée par le Prophète ﷺ — quatre demandes en une seule formule courte.",
    benefits: "Quatre trésors combinés : hudā, tuqā, ʿafāf et ġinā.",
  },
];

const DOUA_QUOTIDIEN = [
  {
    ar: "بِسْمِ اللَّهِ",
    ph: "Bismillāh",
    fr: "Au nom d'Allah",
    context: "Avant chaque action (manger, boire, entrer aux toilettes...)",
    benefits:
      "Le Prophète ﷺ a dit : « Quand l'un de vous mange, qu'il mentionne le nom d'Allah ; s'il oublie au début, qu'il dise : Bismillāhi awwalahu wa-āḫirah. » (Tirmidhî, authentique)",
  },

  {
    ar: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَٰذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِّنِّي وَلَا قُوَّةٍ",
    ph: "Al-ḥamdu lillāhi llaḏī aṭʿamanī hāḏā wa-razaqanīhi min ġayri ḥawlin minnī wa-lā quwwah",
    fr: "Louange à Allah qui m'a nourri de cela et me l'a accordé sans force ni puissance de ma part",
    context: "Après le repas",
    benefits:
      "« Celui qui dit cela après son repas, ses péchés passés sont pardonnés. » (Abû Dâwûd, Tirmidhî — authentique)",
  },

  {
    ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    ph: "Allāhumma innī aʿūḏu bika mina l-ḫubuṯi wa-l-ḫabāʾiṯ",
    fr: "Ô Allah, je cherche refuge auprès de Toi contre les démons mâles et femelles",
    context: "En entrant aux toilettes",
    benefits:
      "Protection contre les démons qui fréquentent les lieux d'impureté. (Bukhârî, Muslim)",
  },

  {
    ar: "غُفْرَانَكَ",
    ph: "Ġufrānak",
    fr: "(Je demande) Ton pardon",
    context: "En sortant des toilettes",
    benefits:
      "Reconnaissance qu'on a été soulagé d'une difficulté biologique. (Abû Dâwûd, Tirmidhî — authentique)",
  },

  {
    ar: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    ph: "Bismillāh, tawakkaltu ʿala llāh, lā ḥawla wa-lā quwwata illā billāh",
    fr: "Au nom d'Allah, je m'en remets à Allah, il n'y a ni force ni puissance sauf par Allah",
    context: "En sortant de chez soi",
    benefits:
      "« Il te sera dit : tu es guidé, suffi, protégé. Et le diable s'écarte de toi. » (Abû Dâwûd, Tirmidhî — authentique)",
  },

  {
    ar: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    ph: "Bismillāhi walajnā, wa-bismillāhi ḫarajnā, wa-ʿala llāhi rabbinā tawakkalnā",
    fr: "Au nom d'Allah nous entrons, au nom d'Allah nous sortons, et nous nous en remettons à Allah notre Seigneur",
    context: "En entrant chez soi (puis saluer les habitants)",
    benefits: "Protège la maison du diable et apporte la baraka. (Abû Dâwûd)",
  },

  {
    ar: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    ph: "Al-ḥamdu lillāhi llaḏī aḥyānā baʿda mā amātanā wa-ilayhi n-nušūr",
    fr: "Louange à Allah qui nous a fait revivre après nous avoir fait mourir, et c'est vers Lui que se fera la résurrection",
    context: "Au réveil",
    benefits: "Reconnaissance du don de la vie chaque matin. (Bukhârî)",
  },

  {
    ar: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ",
    ph: "Subḥāna llaḏī saḫḫara lanā hāḏā wa-mā kunnā lahu muqrinīn, wa-innā ilā rabbinā lamunqalibūn",
    fr: "Gloire à Celui qui nous a soumis cela alors que nous n'étions pas en mesure de le maîtriser. C'est vers notre Seigneur que nous retournerons",
    ref: "Coran 43:13-14",
    context: "En montant en voiture, train, avion ou tout moyen de transport",
    benefits:
      "Doua coranique pour le voyage. Le Prophète ﷺ la disait à chaque montée. (Muslim)",
  },

  {
    ar: "الْحَمْدُ لِلَّهِ",
    ph: "Al-ḥamdu lillāh",
    fr: "Louange à Allah",
    context: "Après avoir éternué",
    benefits:
      "« Quand l'un de vous éternue, qu'il dise Al-ḥamdu lillāh. » Et celui qui l'entend répond : Yarḥamuka llāh (Qu'Allah te fasse miséricorde). (Bukhârî)",
  },

  {
    ar: "يَرْحَمُكَ اللَّهُ",
    ph: "Yarḥamuka llāh",
    fr: "Qu'Allah te fasse miséricorde",
    context: "Réponse à celui qui éternue (s'il a dit Al-ḥamdu lillāh)",
    benefits:
      "À quoi celui qui a éternué répond : Yahdīkumu llāhu wa-yuṣliḥu bālakum (Qu'Allah vous guide et améliore votre situation). (Bukhârî)",
  },

  {
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا فِيهَا وَخَيْرَ مَا أَرْسَلْتَ بِهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا فِيهَا وَشَرِّ مَا أُرْسِلَتْ بِهِ",
    ph: "Allāhumma innī asʾaluka ḫayrahā wa-ḫayra mā fīhā wa-ḫayra mā arsalta bih, wa-aʿūḏu bika min šarrihā wa-šarri mā fīhā wa-šarri mā ursilat bih",
    fr: "Ô Allah, je Te demande son bien, le bien qui s'y trouve et le bien qui en émane ; et je cherche refuge auprès de Toi contre son mal, le mal qui s'y trouve et le mal qui en émane",
    context: "Quand le vent souffle fort",
    benefits:
      "Le vent peut être miséricorde ou châtiment selon ce qu'Allah a décrété. (Muslim)",
  },

  {
    ar: "اللَّهُمَّ صَيِّبًا نَافِعًا",
    ph: "Allāhumma ṣayyiban nāfiʿā",
    fr: "Ô Allah, fais que ce soit une pluie bénéfique",
    context: "Quand il pleut",
    benefits:
      "Les invocations sous la pluie sont parmi les plus exaucées. (Bukhârî)",
  },

  {
    ar: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
    ph: "Allāhumma bārik lanā fīmā razaqtanā wa-qinā ʿaḏāba n-nār",
    fr: "Ô Allah, bénis-nous dans ce que Tu nous as accordé et préserve-nous du châtiment du Feu",
    context: "Avant ou après le repas (variante)",
    benefits: "Demande de baraka dans la nourriture. (Ibn Mâjah)",
  },

  {
    ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    ph: "Allāhumma innī asʾaluka min faḍlik",
    fr: "Ô Allah, je Te demande de Ta grâce",
    context: "En entrant à la mosquée (après les salawât)",
    benefits:
      "Le Prophète ﷺ enseignait cette doua en entrant à la mosquée. (Muslim)",
  },

  {
    ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أُشْرِكَ بِكَ شَيْئًا أَعْلَمُهُ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ",
    ph: "Allāhumma innī aʿūḏu bika an ušrika bika šayʾan aʿlamuh, wa-astaġfiruka limā lā aʿlam",
    fr: "Ô Allah, je cherche refuge auprès de Toi contre tout shirk dont je serais conscient, et je Te demande pardon pour celui dont je n'ai pas conscience",
    context: "Protection quotidienne contre le shirk caché",
    benefits:
      "« Le shirk dans cette communauté est plus discret que le pas d'une fourmi sur une pierre noire dans la nuit noire. » Cette doua est la protection enseignée par le Prophète ﷺ. (Aḥmad, authentique)",
  },

  {
    ar: "بِسْمِ اللَّهِ، اللَّهُمَّ جَنِّبْنَا الشَّيْطَانَ، وَجَنِّبِ الشَّيْطَانَ مَا رَزَقْتَنَا",
    ph: "Bismillāh, Allāhumma jannibna š-šayṭāna, wa-jannibi š-šayṭāna mā razaqtanā",
    fr: "Au nom d'Allah, Ô Allah, éloigne de nous le diable et éloigne le diable de ce que Tu nous as accordé",
    context: "Avant les relations conjugales",
    benefits:
      "« Si Allah décrète un enfant entre eux, le diable ne pourra jamais lui nuire. » (Bukhârî, Muslim)",
  },
];

/* ════════════════════════════════════════════════════════════════════
 SAHABA — Compagnons du Prophète ﷺ
═════════════════════════════════════════════════════════════════════ */

const SAHABA = [
  {
    name: "Abû Bakr aṣ-Ṣiddīq",
    title: "Le Véridique • 1er Calife",
    dates: "573–634 EC",
    bio: "Compagnon le plus proche du Prophète ﷺ. Premier homme adulte à embrasser l'islam. Père d'Aïcha (RA). Compagnon dans la Hijra (Allah les mentionne dans le Coran 9:40 : « le second de deux quand ils étaient dans la grotte »). Premier calife après la mort du Prophète ﷺ.",
    notes: [
      "Surnommé « aṣ-Ṣiddīq » (Le Véridique) par le Prophète ﷺ après avoir cru sans hésitation au voyage nocturne (Isrâʾ wa Miʿrâj).",
      "A libéré Bilâl (RA) de l'esclavage et de la torture en l'achetant pour l'affranchir.",
      "A donné toute sa fortune lors de la bataille de Tabûk : « J'ai laissé Allah et Son Messager pour ma famille. »",
      "A combattu les apostats (ḥurûb ar-ridda) et préservé l'unité de la communauté après le décès du Prophète ﷺ.",
      "Hadith : « Si je devais prendre un ami intime parmi les hommes, ce serait Abû Bakr. » (Bukhârî)",
    ],
  },

  {
    name: "ʿUmar ibn al-Ḫaṭṭāb",
    title: "Al-Fārūq • 2ᵉ Calife",
    dates: "584–644 EC",
    bio: "D'abord ennemi farouche de l'islam, sa conversion fut un tournant majeur. Surnommé « al-Fārūq » (Celui qui distingue le vrai du faux). Deuxième calife après Abû Bakr. Sous son califat, l'empire islamique s'étendit considérablement (Perse, Égypte, Levant).",
    notes: [
      "Sa conversion a tellement renforcé les musulmans qu'ils ont pu prier ouvertement à la Kaaba pour la première fois.",
      "Le Prophète ﷺ a dit : « Si un prophète devait venir après moi, ce serait ʿUmar. » (Tirmidhî)",
      "Modèle de justice et de simplicité : il portait des vêtements rapiécés malgré son immense pouvoir.",
      "A institué le calendrier hijri, organisé l'administration de l'État, créé le système de pension publique (dīwân).",
      "Assassiné en pleine prière de Fajr par un esclave persan. Mort en martyr.",
    ],
  },

  {
    name: "ʿUthmān ibn ʿAffān",
    title: "Ḏu n-Nūrayn • 3ᵉ Calife",
    dates: "576–656 EC",
    bio: "Surnommé « Ḏu n-Nūrayn » (Possesseur des deux lumières) car il a épousé successivement deux filles du Prophète ﷺ : Ruqayya puis Umm Kulṯūm. Riche commerçant qui a financé une grande part de l'expansion de l'islam. Troisième calife.",
    notes: [
      "A acheté le puits de Rūma à Médine et l'a offert à la communauté quand l'eau y était rare.",
      "A équipé seul l'armée de l'épreuve (Tabûk) avec 950 chameaux et 100 chevaux.",
      "A unifié le Coran en un seul muṣḥaf (la version utilisée aujourd'hui dans le monde entier vient de lui).",
      "Connu pour sa pudeur extrême : « Les anges eux-mêmes ont pudeur devant lui. » (Muslim)",
      "Assassiné par des révoltés alors qu'il lisait le Coran. Mort en martyr.",
    ],
  },

  {
    name: "ʿAlī ibn Abī Ṭālib",
    title: "Bāb al-ʿIlm — Karramallāhu Wajhah • 4ᵉ Calife",
    dates: "600–661 EC",
    bio: "Cousin et gendre du Prophète ﷺ (mari de Fātima, sa fille). Premier enfant à embrasser l'islam (ou l'un des premiers, parfois cité comme le tout premier, à l'âge de 9-10 ans). Il a dormi dans le lit du Prophète ﷺ la nuit de la Hijra pour le couvrir au péril de sa vie. Quatrième calife. Connu pour sa science profonde, sa bravoure et son éloquence.",
    notes: [
      "Surnommé « Bāb al-ʿIlm » (la Porte de la Science) par le Prophète ﷺ : « Je suis la cité de la science et ʿAlī en est la porte. » (Tirmidhî, Hâkim — chaîne discutée mais largement transmise.)",
      "Reçoit traditionnellement le suffixe honorifique « Karramallāhu wajhah » (Qu'Allah honore son visage) en raison de sa pureté — il n'a jamais adoré une idole de sa vie, ayant grandi sous la tutelle du Prophète ﷺ.",
      "À Khaybar, le Prophète ﷺ a dit : « Je donnerai demain l'étendard à un homme qu'Allah et Son Messager aiment et qui aime Allah et Son Messager. » Il l'a donné à ʿAlī. (Bukhârî, Muslim)",
      "Père de Ḥasan et Ḥusayn — petits-fils du Prophète ﷺ, « les deux maîtres de la jeunesse du Paradis ». (Tirmidhî, authentique)",
      "Assassiné en se rendant à la prière de Fajr par un Khâridjite. Mort en martyr.",
    ],
  },

  {
    name: "Ḫadīja bint Ḫuwaylid (RA)",
    title: "Mère des croyants",
    dates: "555–620 EC",
    bio: "Première épouse du Prophète ﷺ. Première personne à avoir embrassé l'islam. Riche commerçante respectée à La Mecque, elle proposa elle-même le mariage au Prophète ﷺ alors qu'il avait 25 ans et elle 40. Mère de Fātima (RA), Ruqayya, Umm Kulṯūm et Zaynab.",
    notes: [
      "À la première révélation, le Prophète ﷺ rentra terrifié. Elle le rassura : « Allah ne t'humiliera jamais : tu maintiens les liens familiaux, tu portes les faibles, tu donnes au démuni, tu honores l'invité, tu aides face aux épreuves. »",
      "Le Prophète ﷺ ne s'est jamais remarié de son vivant — fait unique dans la culture arabe de l'époque.",
      "Aïcha (RA) disait : « Je n'ai jamais été jalouse d'aucune femme du Prophète ﷺ comme je l'étais de Khadīja, alors qu'elle était morte avant que je n'épouse le Prophète. »",
      "Allah lui a envoyé Ses salutations par l'intermédiaire de Jibrîl ﷺ (Bukhârî) — honneur unique.",
      "Décédée 3 ans avant la Hijra. L'année de sa mort fut appelée « l'année de la tristesse ».",
    ],
  },

  {
    name: "ʿĀʾiša bint Abī Bakr (RA)",
    title: "Mère des croyants • La Véridique fille du Véridique",
    dates: "~613–678 EC",
    bio: "Épouse bien-aimée du Prophète ﷺ après Ḫadīja. Fille d'Abû Bakr. Connue pour son intelligence prodigieuse, sa mémoire exceptionnelle et sa science religieuse. Plus de 2200 hadiths sont rapportés par elle.",
    notes: [
      "Le Prophète ﷺ est mort dans ses bras, dans sa maison.",
      "Source majeure de la jurisprudence (fiqh), surtout pour les questions concernant les femmes.",
      "Allah a révélé son innocence directement dans le Coran (Sourate An-Nûr) après l'incident de la calomnie.",
      "Hadith : « Le mérite de ʿĀʾiša par rapport aux femmes est comme celui du ṯarīd (plat) par rapport aux autres mets. » (Bukhârî)",
      "Elle a vécu près de 50 ans après le Prophète ﷺ et a enseigné des générations de savants.",
    ],
  },

  {
    name: "Bilāl ibn Rabāḥ",
    title: "Le premier muezzin",
    dates: "~580–640 EC",
    bio: "Esclave abyssin libéré par Abû Bakr. Premier muezzin de l'islam. Symbole universel que la noblesse en islam vient de la piété, non de la naissance. Sa voix appelait les musulmans à la prière à Médine.",
    notes: [
      "Torturé sur le sable brûlant de La Mecque pour sa foi, on plaçait des pierres sur sa poitrine pour qu'il renie l'islam. Il ne disait que : « Aḥad ! Aḥad ! » (L'Unique ! L'Unique !).",
      "Le Prophète ﷺ a dit : « J'ai entendu le bruit de tes pas devant moi au Paradis. » (Bukhârî) — il les a fait remonter à sa pratique de prier 2 rakaʿats après chaque woudou.",
      "Après la conquête de La Mecque, il monta sur la Kaaba pour faire l'adhân — moment historique inversant l'oppression.",
      "Après la mort du Prophète ﷺ, il ne pouvait plus faire l'adhân tant son émotion était forte. Il s'installa à Damas.",
    ],
  },

  {
    name: "Ḥamza ibn ʿAbd al-Muṭṭalib",
    title: "Asad Allāh — Sayyid aš-Šuhadāʾ",
    dates: "~568–625 EC",
    bio: "Oncle paternel du Prophète ﷺ et son frère de lait, à peu près du même âge que lui. Sa conversion à l'islam (peu avant celle de ʿUmar) a fait basculer la balance de protection en faveur des premiers musulmans persécutés. Surnommé « Asad Allāh » (Le Lion d'Allah) — titre qui lui revient en propre dans la tradition sunnite — pour son courage prodigieux. Tombé en martyr à Uḥud.",
    notes: [
      "À la bataille de Badr, il portait deux plumes d'autruche distinctives au combat et a tué plusieurs chefs Quraysh, dont ʿUtba ibn Rabīʿa, le père de Hind.",
      "À Uḥud, l'esclave abyssin Waḥšī, expert au javelot, le tua à distance. Waḥšī avait été engagé par Hind bint ʿUtba (qui voulait venger son père) avec la promesse d'affranchissement de la part de son maître Jubayr ibn Muṭʿim (dont l'oncle avait été tué par Ḥamza à Badr).",
      "Hind se livra à la mutilation du corps de Ḥamza. Cet acte horrifia le Prophète ﷺ qui, à la conquête de La Mecque, pardonna pourtant à Hind quand elle embrassa l'islam.",
      "Le Prophète ﷺ pleura amèrement à sa mort. Lui-même appela Ḥamza « Sayyid aš-Šuhadāʾ » (Le Maître des Martyrs).",
      "Quand Waḥšī embrassa l'islam après la conquête, le Prophète ﷺ accepta sa conversion mais lui demanda de ne plus se présenter devant lui — la douleur de la perte étant trop vive.",
    ],
  },
];

/* ════════════════════════════════════════════════════════════════════
 HADITHS — Paradis et Enfer (Ākhira)
═════════════════════════════════════════════════════════════════════ */

const HADITHS_AKHIRAH = [
  {
    topic: "Le Paradis dépasse l'imagination",
    ar: "قَالَ اللَّهُ تَعَالَى: أَعْدَدْتُ لِعِبَادِي الصَّالِحِينَ مَا لَا عَيْنٌ رَأَتْ، وَلَا أُذُنٌ سَمِعَتْ، وَلَا خَطَرَ عَلَىٰ قَلْبِ بَشَرٍ",
    ph: "Allāh ta'ālā : Aʿdadtu li-ʿibādi ṣ-ṣāliḥīna mā lā ʿaynun raʾat, wa-lā uḏunun samiʿat, wa-lā ḫaṭara ʿalā qalbi bašar",
    fr: "Allah dit : « J'ai préparé pour Mes serviteurs vertueux ce qu'aucun œil n'a vu, qu'aucune oreille n'a entendu, et qui n'est jamais venu à l'esprit d'un humain. »",
    src: "Bukhârî 3244, Muslim 2824 (hadith qudsi)",
    explain:
      "Tout ce que nous imaginons comme bonheur dans cette vie n'est qu'une infime parcelle de ce qu'Allah a préparé. Le Paradis est littéralement inimaginable.",
  },

  {
    topic: "Les huit portes du Paradis",
    ar: "فِي الْجَنَّةِ ثَمَانِيَةُ أَبْوَابٍ، فِيهَا بَابٌ يُسَمَّى الرَّيَّانَ، لَا يَدْخُلُهُ إِلَّا الصَّائِمُونَ",
    ph: "Fi l-jannati ṯamāniyatu abwāb, fīhā bābun yusammā r-Rayyān, lā yadḫuluhu illā ṣ-ṣāʾimūn",
    fr: "« Au Paradis il y a huit portes ; l'une d'elles est appelée ar-Rayyān : seuls les jeûneurs y entreront. »",
    src: "Bukhârî 1896, Muslim 1152",
    explain:
      "Chaque porte correspond à un type d'œuvre : prière, aumône, jihâd, jeûne, etc. Celui qui excelle dans plusieurs domaines est appelé par toutes ces portes (le Prophète ﷺ a dit qu'Abû Bakr serait dans cette catégorie).",
  },

  {
    topic: "Le plus haut degré : al-Firdaws",
    ar: "إِذَا سَأَلْتُمُ اللَّهَ فَاسْأَلُوهُ الْفِرْدَوْسَ، فَإِنَّهُ أَوْسَطُ الْجَنَّةِ وَأَعْلَى الْجَنَّةِ، وَفَوْقَهُ عَرْشُ الرَّحْمَٰنِ، وَمِنْهُ تَفَجَّرُ أَنْهَارُ الْجَنَّةِ",
    ph: "Iḏā saʾaltumu llāha fa-sʾalūhu l-Firdaws, fa-innahu awsaṭu l-jannati wa-aʿla l-jannah, wa-fawqahu ʿaršu r-Raḥmān, wa-minhu tafajjaru anhāru l-jannah",
    fr: "« Lorsque vous demandez à Allah, demandez-Lui le Firdaws : c'est le centre du Paradis, son sommet ; au-dessus, c'est le Trône du Tout Miséricordieux, et c'est de là que jaillissent les rivières du Paradis. »",
    src: "Bukhârî 2790",
    explain:
      "Le Firdaws est le degré le plus élevé du Paradis. Demander moins serait se sous-estimer face à la générosité d'Allah.",
  },

  {
    topic: "Le plus bas degré du Paradis",
    ar: "إِنَّ أَدْنَى أَهْلِ الْجَنَّةِ مَنْزِلَةً لَمَنْ يَنْظُرُ إِلَىٰ جَنَّاتِهِ وَأَزْوَاجِهِ وَنَعِيمِهِ وَخَدَمِهِ وَسُرُرِهِ مَسِيرَةَ أَلْفِ سَنَةٍ",
    ph: "Inna adnā ahli l-jannati manzilatan laman yanẓuru ilā jannātihi wa-azwājihi wa-naʿīmihi wa-ḫadamihi wa-sururihi masīrata alfi sanah",
    fr: "« Le plus bas degré au Paradis est celui de l'homme qui contemple ses jardins, ses épouses, ses délices, ses serviteurs et ses lits de repos sur une étendue de mille ans de marche. »",
    src: "Tirmidhî 2553 — authentique",
    explain:
      "Même le degré le plus bas du Paradis dépasse tout ce que la richesse terrestre la plus extravagante peut offrir. Aucune comparaison possible avec le Firdaws.",
  },

  {
    topic: "Récompense pour les bonnes œuvres",
    ar: "مَنْ عَمِلَ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ، وَمَنْ عَمِلَ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ",
    ph: "Man ʿamila miṯqāla ḏarratin ḫayran yarah, wa-man ʿamila miṯqāla ḏarratin šarran yarah",
    fr: "« Quiconque fait un atome de bien le verra, et quiconque fait un atome de mal le verra. »",
    src: "Coran 99:7-8 (Sourate Az-Zalzala)",
    explain:
      "Aucun acte n'est trop petit pour être compté. Le sourire à un frère, un mot gentil, retirer un obstacle de la route — tout est consigné. C'est terrifiant ET rassurant.",
  },

  {
    topic: "Description de l'Enfer",
    ar: "نَارُكُمْ هَٰذِهِ الَّتِي يُوقِدُ ابْنُ آدَمَ جُزْءٌ مِنْ سَبْعِينَ جُزْءًا مِنْ نَارِ جَهَنَّمَ",
    ph: "Nārukum hāḏihi llatī yūqidu bnu ādama juzʾun min sabʿīna juzʾan min nāri jahannam",
    fr: "« Ce feu que vous allumez, fils d'Adam, n'est qu'une seule des soixante-dix parts du feu de l'Enfer. »",
    src: "Bukhârî 3265, Muslim 2843",
    explain:
      "Le feu de cette vie — qui peut détruire des villes — n'est que 1/70ᵉ du feu de l'Enfer. À méditer face à toute désobéissance.",
  },

  {
    topic: "Le châtiment le plus léger en Enfer",
    ar: "إِنَّ أَهْوَنَ أَهْلِ النَّارِ عَذَابًا يَوْمَ الْقِيَامَةِ لَرَجُلٌ يُوضَعُ فِي أَخْمَصِ قَدَمَيْهِ جَمْرَتَانِ يَغْلِي مِنْهُمَا دِمَاغُهُ",
    ph: "Inna ahwana ahli n-nāri ʿaḏāban yawma l-qiyāmati la-rajulun yūḍaʿu fī aḫmaṣi qadamayhi jamratāni yaġlī minhumā dimāġuh",
    fr: "« Le châtiment le plus léger pour les gens de l'Enfer le Jour du Jugement sera celui d'un homme à qui on placera deux braises sous les pieds, ce qui fera bouillir sa cervelle. »",
    src: "Bukhârî 6562, Muslim 213",
    explain:
      "Si c'est le châtiment le plus léger, qu'en est-il du plus sévère ? Cet homme est Abû Ṭâlib, l'oncle qui a protégé le Prophète ﷺ mais n'a pas embrassé l'islam — il bénéficie de cette atténuation grâce à sa protection du Prophète ﷺ.",
  },

  {
    topic: "Le pont (aṣ-Ṣirāṭ)",
    ar: "يُضْرَبُ الصِّرَاطُ بَيْنَ ظَهْرَيْ جَهَنَّمَ، فَأَكُونُ أَنَا وَأُمَّتِي أَوَّلَ مَنْ يُجِيزُ، وَلَا يَتَكَلَّمُ يَوْمَئِذٍ إِلَّا الرُّسُلُ، وَدَعْوَى الرُّسُلِ يَوْمَئِذٍ: اللَّهُمَّ سَلِّمْ سَلِّمْ",
    ph: "Yuḍrabu ṣ-ṣirāṭu bayna ẓahray jahannam, fa-akūnu anā wa-ummatī awwala man yujīz, wa-lā yatakallamu yawmaʾiḏin illa r-rusul, wa-daʿwa r-rusuli yawmaʾiḏin : Allāhumma sallim sallim",
    fr: "« Le Pont (aṣ-Ṣirāṭ) sera dressé au-dessus de l'Enfer. Je serai le premier avec ma communauté à le franchir. Personne ne parlera ce jour-là sauf les Messagers, et leur invocation sera : Ô Allah, sauve, sauve. »",
    src: "Bukhârî 7439, Muslim 183",
    explain:
      "Tous traverseront le Pont — certains comme l'éclair, d'autres en marchant, d'autres en rampant. Ceux qui tombent vont en Enfer ; ceux qui passent vont au Paradis.",
  },

  {
    topic: "L'intercession du Prophète ﷺ",
    ar: "لِكُلِّ نَبِيٍّ دَعْوَةٌ مُسْتَجَابَةٌ، فَتَعَجَّلَ كُلُّ نَبِيٍّ دَعْوَتَهُ، وَإِنِّي اخْتَبَأْتُ دَعْوَتِي شَفَاعَةً لِأُمَّتِي يَوْمَ الْقِيَامَةِ",
    ph: "Likulli nabiyyin daʿwatun mustajābah, fa-taʿajjala kullu nabiyyin daʿwatah, wa-innī ḫtabaʾtu daʿwatī šafāʿatan li-ummatī yawma l-qiyāmah",
    fr: "« Chaque prophète a eu une invocation exaucée ; chacun s'est empressé de l'utiliser. Moi, j'ai gardé la mienne en réserve : ce sera mon intercession pour ma communauté le Jour du Jugement. »",
    src: "Bukhârî 6304, Muslim 198",
    explain:
      "Le Prophète ﷺ a réservé sa doua exaucée pour intercéder pour les musulmans qui méritent l'Enfer. Cette intercession sera spécialement pour celui qui dit la Shahâda sincèrement.",
  },

  {
    topic: "L'éternité dans la rétribution",
    ar: "يُؤْتَى بِالْمَوْتِ كَهَيْئَةِ كَبْشٍ أَمْلَحَ، فَيُذْبَحُ بَيْنَ الْجَنَّةِ وَالنَّارِ، فَيُقَالُ: يَا أَهْلَ الْجَنَّةِ، خُلُودٌ فَلَا مَوْتَ، وَيَا أَهْلَ النَّارِ، خُلُودٌ فَلَا مَوْتَ",
    ph: "Yuʾtā bi-l-mawti ka-hayʾati kabšin amlaḥ, fa-yuḏbaḥu bayna l-jannati wa-n-nār, fa-yuqāl : yā ahla l-jannah, ḫulūdun fa-lā mawt, wa-yā ahla n-nār, ḫulūdun fa-lā mawt",
    fr: "« La mort sera amenée sous la forme d'un bélier blanc et noir, puis elle sera égorgée entre le Paradis et l'Enfer. Il sera alors dit : Ô gens du Paradis, c'est l'éternité — plus de mort. Ô gens de l'Enfer, c'est l'éternité — plus de mort. »",
    src: "Bukhârî 4730, Muslim 2849",
    explain:
      "L'éternité est la dimension la plus terrifiante (pour l'Enfer) ou la plus rassurante (pour le Paradis). Plus jamais de fin.",
  },

  {
    topic: "Le bassin du Prophète ﷺ (al-Ḥawḍ)",
    ar: "حَوْضِي مَسِيرَةُ شَهْرٍ، مَاؤُهُ أَبْيَضُ مِنَ اللَّبَنِ، وَرِيحُهُ أَطْيَبُ مِنَ الْمِسْكِ، وَكِيزَانُهُ كَنُجُومِ السَّمَاءِ، مَنْ شَرِبَ مِنْهَا فَلَا يَظْمَأُ أَبَدًا",
    ph: "Ḥawḍī masīratu šahr, māʾuhu abyaḍu mina l-laban, wa-rīḥuhu aṭyabu mina l-misk, wa-kīzānuhu ka-nujūmi s-samāʾ, man šariba minhā fa-lā yaẓmaʾu abadā",
    fr: "« Mon Bassin (al-Ḥawḍ) est large d'un mois de marche, son eau est plus blanche que le lait, son odeur plus suave que le musc, ses coupes nombreuses comme les étoiles du ciel. Quiconque y boit n'aura plus jamais soif. »",
    src: "Bukhârî 6579, Muslim 2292",
    explain:
      "Avant d'entrer au Paradis, les croyants boiront à ce bassin. C'est le Kawthar, l'abondance accordée au Prophète ﷺ (Sourate 108).",
  },

  {
    topic: "La marche selon les œuvres",
    ar: "يُؤْتَى بِجَهَنَّمَ يَوْمَئِذٍ لَهَا سَبْعُونَ أَلْفَ زِمَامٍ، مَعَ كُلِّ زِمَامٍ سَبْعُونَ أَلْفَ مَلَكٍ يَجُرُّونَهَا",
    ph: "Yuʾtā bi-jahannama yawmaʾiḏin lahā sabʿūna alfa zimām, maʿa kulli zimāmin sabʿūna alfa malakin yajurrūnahā",
    fr: "« L'Enfer sera amené ce Jour-là avec soixante-dix mille brides, et chaque bride sera tirée par soixante-dix mille anges. »",
    src: "Muslim 2842",
    explain:
      "L'image rend tangible l'horreur du Jour Dernier. La création divine elle-même est mobilisée pour accueillir le verdict.",
  },

  {
    topic: "Les sept ombrages d'Allah",
    ar: "سَبْعَةٌ يُظِلُّهُمُ اللَّهُ فِي ظِلِّهِ يَوْمَ لَا ظِلَّ إِلَّا ظِلُّهُ: إِمَامٌ عَادِلٌ، وَشَابٌّ نَشَأَ فِي عِبَادَةِ اللَّهِ، وَرَجُلٌ قَلْبُهُ مُعَلَّقٌ بِالْمَسَاجِدِ، وَرَجُلَانِ تَحَابَّا فِي اللَّهِ اجْتَمَعَا عَلَيْهِ وَتَفَرَّقَا عَلَيْهِ، وَرَجُلٌ دَعَتْهُ امْرَأَةٌ ذَاتُ مَنْصِبٍ وَجَمَالٍ فَقَالَ إِنِّي أَخَافُ اللَّهَ، وَرَجُلٌ تَصَدَّقَ بِصَدَقَةٍ فَأَخْفَاهَا حَتَّىٰ لَا تَعْلَمَ شِمَالُهُ مَا تُنْفِقُ يَمِينُهُ، وَرَجُلٌ ذَكَرَ اللَّهَ خَالِيًا فَفَاضَتْ عَيْنَاهُ",
    ph: "Sabʿatun yuẓilluhumu llāhu fī ẓillihi yawma lā ẓilla illā ẓilluh : imāmun ʿādil, wa-šābbun našaʾa fī ʿibādati llāh, wa-rajulun qalbuhu muʿallaqun bi-l-masājid, wa-rajulāni taḥābbā fi llāh ijtamaʿā ʿalayhi wa-tafarraqā ʿalayh, wa-rajulun daʿathu mraʾatun ḏātu manṣibin wa-jamālin faqāla innī aḫāfu llāh, wa-rajulun taṣaddaqa bi-ṣadaqatin fa-aḫfāhā ḥattā lā taʿlama šimāluhu mā tunfiqu yamīnuh, wa-rajulun ḏakara llāha ḫāliyan fa-fāḍat ʿaynāh",
    fr: "« Sept catégories de personnes seront sous l'ombre d'Allah le Jour où il n'y aura d'autre ombre que la Sienne : 1) un dirigeant juste ; 2) un jeune qui a grandi dans l'adoration d'Allah ; 3) un homme dont le cœur est attaché aux mosquées ; 4) deux personnes qui se sont aimées en Allah, se sont réunies pour Lui et séparées pour Lui ; 5) un homme tenté par une femme noble et belle qui dit : Je crains Allah ; 6) un homme qui fait une aumône en la cachant tellement que sa main gauche ignore ce que donne sa droite ; 7) un homme qui se rappelle Allah dans la solitude et dont les yeux débordent de larmes. »",
    src: "Bukhârî 660, Muslim 1031",
    explain:
      "Ces sept profils sont des modèles concrets vers lesquels tendre — chacun touche un domaine différent de la vie : pouvoir, jeunesse, mosquée, amitié, tentation, aumône, intimité avec Allah.",
  },

  {
    topic: "Le rang le plus élevé",
    ar: "إِنَّ فِي الْجَنَّةِ مِائَةَ دَرَجَةٍ، أَعَدَّهَا اللَّهُ لِلْمُجَاهِدِينَ فِي سَبِيلِ اللَّهِ، مَا بَيْنَ الدَّرَجَتَيْنِ كَمَا بَيْنَ السَّمَاءِ وَالْأَرْضِ",
    ph: "Inna fi l-jannati miʾata darajah, aʿaddaha llāhu li-l-mujāhidīna fī sabīli llāh, mā bayna d-darajatayni kamā bayna s-samāʾi wa-l-arḍ",
    fr: "« Il y a au Paradis cent degrés qu'Allah a préparés pour ceux qui combattent dans Sa voie. Entre chaque degré, la distance équivaut à celle qui sépare le ciel de la terre. »",
    src: "Bukhârî 2790",
    explain:
      "Le Paradis n'est pas un seul lieu uniforme. Sa structure est hiérarchique selon les œuvres. Chaque degré dépasse le précédent d'une distance cosmique.",
  },

  {
    topic: "Le Paradis sous les pieds des mères",
    ar: "الْجَنَّةُ تَحْتَ أَقْدَامِ الْأُمَّهَاتِ",
    ph: "Al-jannatu taḥta aqdāmi l-ummahāt",
    fr: "« Le Paradis se trouve sous les pieds des mères. »",
    src: "Nasâʾî, Aḥmad — chaîne discutée mais sens largement transmis. Confirmé par : « Reste auprès d'elle (ta mère), car le Paradis est sous ses pieds. » (Aḥmad, authentique)",
    explain:
      "Le bon traitement de la mère est l'une des voies les plus directes vers le Paradis. Quand un homme demanda au Prophète ﷺ qui méritait le plus sa bonne compagnie, il répondit : « Ta mère. » Trois fois. Puis : « Ton père. »",
  },

  {
    topic: "Les bonnes œuvres effacent les mauvaises",
    ar: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ",
    ph: "Ittaqi llāha ḥayṯumā kunt, wa-atbiʿi s-sayyiʾata l-ḥasanata tamḥuhā, wa-ḫāliqi n-nāsa bi-ḫuluqin ḥasan",
    fr: "« Crains Allah où que tu sois ; fais suivre une mauvaise action d'une bonne action — elle l'effacera ; et comporte-toi avec les gens avec de bonnes mœurs. »",
    src: "Tirmidhî 1987 — bon (ḥasan)",
    explain:
      "Recette en trois temps pour éviter l'Enfer : conscience permanente d'Allah, réparation immédiate après une faute, beauté du caractère envers les autres.",
  },

  {
    topic: "L'orgueil exclut du Paradis",
    ar: "لَا يَدْخُلُ الْجَنَّةَ مَنْ كَانَ فِي قَلْبِهِ مِثْقَالُ ذَرَّةٍ مِنْ كِبْرٍ",
    ph: "Lā yadḫulu l-jannata man kāna fī qalbihi miṯqālu ḏarratin min kibr",
    fr: "« N'entrera pas au Paradis celui qui aura dans son cœur un atome d'orgueil. »",
    src: "Muslim 91",
    explain:
      "Quand on lui demanda ce qu'est l'orgueil, le Prophète ﷺ répondit : « C'est rejeter la vérité et mépriser les gens. » L'orgueil est le péché le plus disqualifiant — le péché d'Iblîs.",
  },

  {
    topic: "Le Paradis et l'Enfer ne sont jamais saturés",
    ar: "لَا تَزَالُ جَهَنَّمُ تَقُولُ: هَلْ مِنْ مَزِيدٍ، حَتَّىٰ يَضَعَ رَبُّ الْعِزَّةِ فِيهَا قَدَمَهُ، فَتَقُولُ: قَطْ قَطْ",
    ph: "Lā tazālu jahannamu taqūlu : hal min mazīd, ḥattā yaḍaʿa rabbu l-ʿizzati fīhā qadamah, fa-taqūlu : qaṭ qaṭ",
    fr: "« L'Enfer ne cessera de demander : Y en a-t-il plus ? jusqu'à ce qu'Allah, le Seigneur de la Puissance, y mette Son pied — il dira alors : Assez ! Assez ! »",
    src: "Bukhârî 4848",
    explain:
      "Verset coranique sous-jacent : « Le Jour où Nous dirons à l'Enfer : Es-tu rempli ? Et il répondra : En est-il encore d'autres ? » (50:30). L'image rappelle l'immensité du décompte divin.",
  },

  {
    topic: "L'image qui détruit la maison",
    ar: "إِنَّ الْمَلَائِكَةَ لَا تَدْخُلُ بَيْتًا فِيهِ كَلْبٌ وَلَا صُورَةٌ",
    ph: "Inna l-malāʾikata lā tadḫulu baytan fīhi kalbun wa-lā ṣūrah",
    fr: "« Les anges n'entrent pas dans une maison où il y a un chien ou une image (figurative). »",
    src: "Bukhârî 3225, Muslim 2106",
    explain:
      "Hadith dont l'application contemporaine est débattue (chien-de-garde versus chien-d'agrément ; photographie versus statuaire). Le principe sous-jacent : la baraka des anges fuit certains contextes — vigilance sur ce qu'on accueille chez soi.",
  },
];

/* ════════════════════════════════════════════════════════════════════
 HADITHS IMPORTANTS — piliers de la foi, intentions, fondations
═════════════════════════════════════════════════════════════════════ */

const HADITHS_IMPORTANTS = [
  {
    topic: "Hadith de Jibrîl ﷺ — Iman, Islam, Iḥsân",
    ar: "بَيْنَمَا نَحْنُ جُلُوسٌ عِنْدَ النَّبِيِّ ﷺ ذَاتَ يَوْمٍ، إِذْ طَلَعَ عَلَيْنَا رَجُلٌ شَدِيدُ بَيَاضِ الثِّيَابِ، شَدِيدُ سَوَادِ الشَّعْرِ، لَا يُرَىٰ عَلَيْهِ أَثَرُ السَّفَرِ، وَلَا يَعْرِفُهُ مِنَّا أَحَدٌ… فَقَالَ: يَا مُحَمَّدُ أَخْبِرْنِي عَنِ الْإِسْلَامِ. قَالَ: الْإِسْلَامُ أَنْ تَشْهَدَ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَتُقِيمَ الصَّلَاةَ، وَتُؤْتِيَ الزَّكَاةَ، وَتَصُومَ رَمَضَانَ، وَتَحُجَّ الْبَيْتَ إِنِ اسْتَطَعْتَ إِلَيْهِ سَبِيلًا. قَالَ: فَأَخْبِرْنِي عَنِ الْإِيمَانِ. قَالَ: أَنْ تُؤْمِنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ، وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ. قَالَ: فَأَخْبِرْنِي عَنِ الْإِحْسَانِ. قَالَ: أَنْ تَعْبُدَ اللَّهَ كَأَنَّكَ تَرَاهُ، فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ",
    ph: "Bayna mā naḥnu julūsun ʿinda n-nabiyyi ﷺ ḏāta yawm, iḏ ṭalaʿa ʿalaynā rajulun šadīdu bayāḍi ṯ-ṯiyāb, šadīdu sawādi š-šaʿr, lā yurā ʿalayhi aṯaru s-safar, wa-lā yaʿrifuhu minnā aḥad… fa-qāla : Yā Muḥammad aḫbirnī ʿani l-Islām. Qāla : Al-Islāmu an tašhada an lā ilāha illā llāh wa-anna Muḥammadan rasūlu llāh, wa-tuqīma ṣ-ṣalāh, wa-tuʾtiya z-zakāh, wa-taṣūma ramaḍān, wa-taḥujja l-bayta ini staṭaʿta ilayhi sabīlā. Qāla : Fa-aḫbirnī ʿani l-īmān. Qāla : An tuʾmina billāh wa-malāʾikatihi wa-kutubihi wa-rusulihi wa-l-yawmi l-āḫir, wa-tuʾmina bi-l-qadari ḫayrihi wa-šarrih. Qāla : Fa-aḫbirnī ʿani l-iḥsān. Qāla : An taʿbuda llāha ka-annaka tarāh, fa-in lam takun tarāhu fa-innahu yarāk",
    fr: "« Un jour, un homme aux vêtements d'une blancheur éclatante et aux cheveux d'un noir profond — sans trace de voyage et que nul d'entre nous ne connaissait — s'avança vers le Prophète ﷺ. Il dit : Ô Muḥammad, parle-moi de l'Islam. — L'Islam, c'est attester qu'il n'y a de divinité qu'Allah et que Muḥammad est Son Messager, accomplir la prière, donner la Zakât, jeûner le Ramadan et accomplir le pèlerinage à la Maison sacrée si tu en as les moyens. — Parle-moi de la Foi (Iman). — Croire en Allah, en Ses anges, en Ses Livres, en Ses Messagers, au Jour dernier, et au Décret divin (Qadar), en bien comme en mal. — Parle-moi de l'Excellence (Iḥsân). — C'est adorer Allah comme si tu Le voyais ; car si tu ne Le vois pas, Lui te voit. » Puis le Prophète ﷺ révéla : c'était l'ange Jibrîl venu vous enseigner votre religion.",
    src: "Muslim 8, ʿUmar ibn al-Khaṭṭâb (RA) — fondement des 40 Hadiths de Nawawî (n°2)",
    explain:
      "Le hadith le plus dense de l'islam : il définit en une scène les trois niveaux de la religion — l'acte (Islam), la croyance (Iman), la sincérité du cœur (Iḥsân). Toute la spiritualité musulmane découle de ces trois axes. C'est pour cela qu'il est étudié en premier dans tous les cursus islamiques classiques.",
  },
  {
    topic: "Le hadith des intentions",
    ar: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَىٰ",
    ph: "Innamā l-aʿmālu bi-n-niyyāt, wa-innamā li-kulli imriʾin mā nawā",
    fr: "« Les actes ne valent que par les intentions, et chacun n'a que ce qu'il a eu l'intention de faire. »",
    src: "Bukhârî 1, Muslim 1907 — ʿUmar ibn al-Khaṭṭâb (RA). 1er hadith des 40 Nawawî",
    explain:
      "Bukhârî l'a placé délibérément en tête de son Sahîh : aucun acte n'a de poids spirituel sans l'intention juste. Une même prière peut valoir tout ou rien selon ce que vise le cœur. Ce hadith est la porte d'entrée de toute la jurisprudence et de tout le travail intérieur.",
  },
  {
    topic: "La religion est sincérité",
    ar: "الدِّينُ النَّصِيحَةُ. قُلْنَا: لِمَنْ؟ قَالَ: لِلَّهِ وَلِكِتَابِهِ وَلِرَسُولِهِ وَلِأَئِمَّةِ الْمُسْلِمِينَ وَعَامَّتِهِمْ",
    ph: "Ad-dīnu n-naṣīḥah. Qulnā : liman ? Qāla : lillāhi wa-li-kitābihi wa-li-rasūlihi wa-li-aʾimmati l-muslimīna wa-ʿāmmatihim",
    fr: "« La religion est sincérité (naṣīḥa). — Envers qui ? demandâmes-nous. — Envers Allah, envers Son Livre, envers Son Messager, envers les responsables des musulmans, et envers la communauté tout entière. »",
    src: "Muslim 55 — Tamîm ad-Dârî (RA). 7e hadith des 40 Nawawî",
    explain:
      "Naṣīḥa dépasse le simple « conseil » : c'est vouloir authentiquement le bien d'autrui, sans fausseté ni intérêt. La religion, dit le Prophète ﷺ, se résume à cette droiture du cœur tournée à la fois vers Allah, Sa Parole, Son Messager, les dirigeants justes, et tout musulman.",
  },
  {
    topic: "Aimer pour son frère ce qu'on aime pour soi",
    ar: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّىٰ يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    ph: "Lā yuʾminu aḥadukum ḥattā yuḥibba li-aḫīhi mā yuḥibbu li-nafsih",
    fr: "« Aucun de vous n'est véritablement croyant tant qu'il n'aime pas pour son frère ce qu'il aime pour lui-même. »",
    src: "Bukhârî 13, Muslim 45 — Anas (RA). 13e hadith des 40 Nawawî",
    explain:
      "Mesure brute de la foi : si tu te réjouis qu'autrui ait moins que toi, ou si la réussite des autres te dérange, le Prophète ﷺ te dit que ta foi est incomplète. Ce n'est pas un idéal lointain, c'est un seuil minimal d'iman.",
  },
  {
    topic: "Changer le mal par la main, la langue, le cœur",
    ar: "مَنْ رَأَىٰ مِنْكُمْ مُنْكَرًا فَلْيُغَيِّرْهُ بِيَدِهِ، فَإِنْ لَمْ يَسْتَطِعْ فَبِلِسَانِهِ، فَإِنْ لَمْ يَسْتَطِعْ فَبِقَلْبِهِ، وَذَٰلِكَ أَضْعَفُ الْإِيمَانِ",
    ph: "Man raʾā minkum munkaran fal-yuġayyirhu bi-yadih, fa-in lam yastaṭiʿ fa-bi-lisānih, fa-in lam yastaṭiʿ fa-bi-qalbih, wa-ḏālika aḍʿafu l-īmān",
    fr: "« Celui qui voit un mal parmi vous, qu'il le change par sa main ; s'il ne peut, par sa langue ; s'il ne peut, par son cœur — et c'est là le plus faible degré de la foi. »",
    src: "Muslim 49 — Abû Saʿîd al-Khudrî (RA). 34e hadith des 40 Nawawî",
    explain:
      "Hiérarchie de l'action : agir, parler, ou au minimum désapprouver intérieurement. Le « cœur » n'est pas une excuse pour l'inaction : c'est l'ultime palier quand l'autorité ou la sécurité manquent. En perdre même cela, c'est sortir de la foi.",
  },
  {
    topic: "Le musulman est celui dont les autres sont en sécurité",
    ar: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ، وَالْمُهَاجِرُ مَنْ هَجَرَ مَا نَهَى اللَّهُ عَنْهُ",
    ph: "Al-muslimu man salima l-muslimūna min lisānihi wa-yadih, wa-l-muhājiru man hajara mā nahā llāhu ʿanh",
    fr: "« Le musulman est celui dont les autres musulmans sont préservés de sa langue et de sa main. Et le véritable émigrant (muhâjir) est celui qui s'éloigne de ce qu'Allah a interdit. »",
    src: "Bukhârî 10, Muslim 40 — ʿAbd Allâh ibn ʿAmr (RA)",
    explain:
      "Définition fonctionnelle de l'islam au quotidien : pas de prétention spirituelle si la langue blesse ou si la main nuit. La hijra, au sens profond, n'est pas un déplacement géographique mais une rupture intérieure avec le péché.",
  },
  {
    topic: "Quitter ce qui ne te concerne pas",
    ar: "مِنْ حُسْنِ إِسْلَامِ الْمَرْءِ تَرْكُهُ مَا لَا يَعْنِيهِ",
    ph: "Min ḥusni islāmi l-marʾi tarkuhu mā lā yaʿnīh",
    fr: "« Une marque de l'excellence de l'islam d'un homme est qu'il délaisse ce qui ne le concerne pas. »",
    src: "Tirmidhî 2317, Ibn Mâjah 3976 — authentique. 12e hadith des 40 Nawawî",
    explain:
      "Règle d'hygiène spirituelle : se préserver du superflu, des polémiques stériles, des affaires d'autrui, des distractions inutiles. Concentrer son temps, sa langue et son énergie sur ce qui sert vraiment sa relation à Allah, ses obligations et ses responsabilités.",
  },
];

/* ════════════════════════════════════════════════════════════════════
 PALETTE — fond blanc, vert profond, lignes sobres
═════════════════════════════════════════════════════════════════════ */

const C = {
  bg: "#fbfaf6", // blanc cassé chaleureux
  surface: "#ffffff", // cards
  surface2: "#f4f2eb", // accent doux
  border: "#e5e2d8",
  borderLight: "#efece4",
  text: "#161b18", // presque noir, légèrement vert
  textMuted: "#54605a",
  textSubtle: "#8a948e",
  green: "#0f7a4a", // émeraude vif — accent principal
  greenLight: "#13935a", // émeraude clair pour hover/highlights
  greenSoft: "#e8f4ee", // vert très doux pour fonds
  greenDark: "#085532", // pour textes sur fond vert
  greenDeep: "#063a23", // pour gradients profonds
  gold: "#c9a876", // accent or — sobre, premium
  goldSoft: "#f3ecdb", // or très clair
  divider: "#d8d4c8",
  shadow: "0 1px 2px rgba(15,40,30,0.04), 0 4px 14px rgba(15,40,30,0.05)",
  shadowLg: "0 2px 6px rgba(15,40,30,0.06), 0 12px 32px rgba(15,40,30,0.08)",
};

/* ════════════════════════════════════════════════════════════════════
 SCÈNES SVG — illustrations intégrées (pas de dépendance externe).
 Trois ambiances : haram (Mecque), nabawi (Médine, dôme vert),
 kaaba (la Kaʿba sous étoiles).
═════════════════════════════════════════════════════════════════════ */

function HaramScene() {
  return (
    <svg
      viewBox="0 0 800 220"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id="haram-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#063a23" />
          <stop offset="55%" stopColor="#0a5a36" />
          <stop offset="100%" stopColor="#0f7a4a" />
        </linearGradient>
        <radialGradient id="haram-glow" cx="0.5" cy="0.95" r="0.6">
          <stop offset="0%" stopColor="#c9a876" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#c9a876" stopOpacity="0" />
        </radialGradient>
        <pattern
          id="haram-stars"
          x="0"
          y="0"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="12" cy="18" r="0.9" fill="#fff" opacity="0.55" />
          <circle cx="55" cy="40" r="0.5" fill="#fff" opacity="0.35" />
          <circle cx="70" cy="10" r="0.7" fill="#fff" opacity="0.5" />
          <circle cx="30" cy="55" r="0.5" fill="#fff" opacity="0.3" />
        </pattern>
      </defs>

      <rect width="800" height="220" fill="url(#haram-sky)" />
      <rect width="800" height="120" fill="url(#haram-stars)" />
      <rect width="800" height="220" fill="url(#haram-glow)" />

      {/* Lune croissant */}
      <g transform="translate(680,42)">
        <circle r="14" fill="#c9a876" />
        <circle cx="5" r="14" fill="#085532" />
      </g>

      {/* Montagnes lointaines */}
      <path
        d="M0,170 L80,130 L160,155 L240,120 L320,150 L400,115 L480,150 L560,125 L640,155 L720,130 L800,150 L800,220 L0,220 Z"
        fill="#063a23"
        opacity="0.7"
      />

      {/* Silhouette mosquée centrale */}
      <g fill="#042918" opacity="0.95">
        {/* Minaret gauche */}
        <rect x="280" y="95" width="7" height="105" />
        <circle cx="283.5" cy="92" r="7" />
        <rect x="281" y="80" width="5" height="14" />
        {/* Minaret droit */}
        <rect x="513" y="95" width="7" height="105" />
        <circle cx="516.5" cy="92" r="7" />
        <rect x="514" y="80" width="5" height="14" />
        {/* Coupole centrale */}
        <path d="M 350 200 L 350 145 Q 350 110 400 110 Q 450 110 450 145 L 450 200 Z" />
        <path d="M 360 145 Q 360 100 400 100 Q 440 100 440 145 Z" />
        <rect x="397" y="80" width="6" height="22" />
        <circle cx="400" cy="80" r="4" />
        {/* Coupoles latérales */}
        <path d="M 305 200 L 305 165 Q 305 145 325 145 Q 345 145 345 165 L 345 200 Z" />
        <path d="M 455 200 L 455 165 Q 455 145 475 145 Q 495 145 495 165 L 495 200 Z" />
        {/* Arches */}
        <rect x="200" y="170" width="60" height="30" />
        <path
          d="M210,170 Q210,155 225,155 Q240,155 240,170 Z M250,170 Q250,160 257,160 Q264,160 264,170 Z"
          fill="#0a5a36"
        />
        <rect x="540" y="170" width="60" height="30" />
        <path
          d="M550,170 Q550,160 557,160 Q564,160 564,170 Z M580,170 Q580,155 595,155 Q610,155 610,170 Z"
          fill="#0a5a36"
        />
      </g>

      {/* Ligne d'horizon dorée subtile */}
      <line
        x1="0"
        y1="200"
        x2="800"
        y2="200"
        stroke="#c9a876"
        strokeWidth="0.5"
        opacity="0.4"
      />
    </svg>
  );
}

function NabawiScene() {
  return (
    <svg
      viewBox="0 0 800 220"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id="nabawi-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a5a36" />
          <stop offset="60%" stopColor="#0f7a4a" />
          <stop offset="100%" stopColor="#13935a" />
        </linearGradient>
        <radialGradient id="nabawi-sun" cx="0.85" cy="0.2" r="0.4">
          <stop offset="0%" stopColor="#f3ecdb" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f3ecdb" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="800" height="220" fill="url(#nabawi-sky)" />
      <rect width="800" height="220" fill="url(#nabawi-sun)" />

      {/* Soleil/halo */}
      <circle cx="680" cy="60" r="24" fill="#f3ecdb" opacity="0.4" />
      <circle cx="680" cy="60" r="14" fill="#f3ecdb" opacity="0.7" />

      {/* Mosquée du Prophète — dôme vert iconique */}
      <g>
        {/* Minarets (4 visibles) */}
        <g fill="#042918">
          <rect x="180" y="80" width="8" height="125" />
          <circle cx="184" cy="76" r="8" />
          <rect x="182" y="62" width="4" height="16" />
          <rect x="320" y="90" width="7" height="115" />
          <circle cx="323.5" cy="86" r="7" />
          <rect x="490" y="90" width="7" height="115" />
          <circle cx="493.5" cy="86" r="7" />
          <rect x="620" y="80" width="8" height="125" />
          <circle cx="624" cy="76" r="8" />
          <rect x="622" y="62" width="4" height="16" />
        </g>

        {/* Bâtiment principal */}
        <rect x="220" y="135" width="370" height="70" fill="#042918" />
        <rect x="220" y="130" width="370" height="6" fill="#063a23" />

        {/* DÔME VERT iconique de la mosquée du Prophète ﷺ */}
        <g transform="translate(405,135)">
          <path
            d="M -50 0 L -50 -10 Q -50 -55 0 -55 Q 50 -55 50 -10 L 50 0 Z"
            fill="#0f7a4a"
          />
          <path
            d="M -42 -10 Q -42 -50 0 -50 Q 42 -50 42 -10 Z"
            fill="#13935a"
          />
          <path
            d="M -28 -45 Q -20 -52 0 -52 Q 20 -52 28 -45 Q 15 -42 0 -42 Q -15 -42 -28 -45 Z"
            fill="#0f7a4a"
            opacity="0.6"
          />
          <rect x="-3" y="-72" width="6" height="20" fill="#c9a876" />
          <circle cy="-72" r="4" fill="#c9a876" />
          <path
            d="M -3 -78 Q 0 -82 3 -78 L 3 -72 L -3 -72 Z"
            fill="#c9a876"
          />
        </g>

        {/* Arches du portique */}
        <g fill="#0a5a36">
          {[230, 270, 310, 350, 390, 430, 470, 510, 550].map((x, i) => (
            <path
              key={i}
              d={`M${x},205 L${x},170 Q${x},155 ${x + 15},155 Q${x + 30},155 ${x + 30},170 L${x + 30},205 Z`}
            />
          ))}
        </g>
      </g>

      {/* Sol */}
      <rect x="0" y="200" width="800" height="20" fill="#063a23" />
      <line
        x1="0"
        y1="200"
        x2="800"
        y2="200"
        stroke="#c9a876"
        strokeWidth="0.6"
        opacity="0.5"
      />
    </svg>
  );
}

function KaabaScene() {
  return (
    <svg
      viewBox="0 0 800 220"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id="kaaba-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#042918" />
          <stop offset="60%" stopColor="#085532" />
          <stop offset="100%" stopColor="#0f7a4a" />
        </linearGradient>
        <linearGradient id="kaaba-cube" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a0a" />
          <stop offset="100%" stopColor="#1c1c1c" />
        </linearGradient>
        <pattern
          id="kaaba-stars"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="20" cy="25" r="1" fill="#fff" opacity="0.7" />
          <circle cx="65" cy="45" r="0.6" fill="#fff" opacity="0.4" />
          <circle cx="85" cy="15" r="0.8" fill="#fff" opacity="0.55" />
          <circle cx="40" cy="65" r="0.5" fill="#fff" opacity="0.3" />
          <circle cx="10" cy="80" r="0.7" fill="#fff" opacity="0.5" />
        </pattern>
      </defs>

      <rect width="800" height="220" fill="url(#kaaba-sky)" />
      <rect width="800" height="140" fill="url(#kaaba-stars)" />

      {/* Halo doré central */}
      <circle cx="400" cy="200" r="180" fill="#c9a876" opacity="0.08" />
      <circle cx="400" cy="200" r="120" fill="#c9a876" opacity="0.1" />

      {/* Arcades en arrière-plan */}
      <g fill="#063a23" opacity="0.7">
        {[40, 110, 180, 590, 660, 730].map((x, i) => (
          <path
            key={i}
            d={`M${x},200 L${x},150 Q${x},125 ${x + 25},125 Q${x + 50},125 ${x + 50},150 L${x + 50},200 Z`}
          />
        ))}
      </g>

      {/* La Kaaba — cube central drapé du kiswah */}
      <g transform="translate(400,200)">
        {/* Plateforme */}
        <ellipse cx="0" cy="8" rx="120" ry="8" fill="#063a23" opacity="0.6" />
        {/* Cube */}
        <rect
          x="-60"
          y="-90"
          width="120"
          height="100"
          fill="url(#kaaba-cube)"
        />
        {/* Bande dorée (hizam) */}
        <rect x="-60" y="-65" width="120" height="10" fill="#c9a876" />
        {/* Calligraphie stylisée sur la bande */}
        <g fill="#085532" opacity="0.4">
          <rect x="-50" y="-63" width="6" height="6" />
          <rect x="-35" y="-63" width="6" height="6" />
          <rect x="-20" y="-63" width="6" height="6" />
          <rect x="-5" y="-63" width="6" height="6" />
          <rect x="10" y="-63" width="6" height="6" />
          <rect x="25" y="-63" width="6" height="6" />
          <rect x="40" y="-63" width="6" height="6" />
        </g>
        {/* Porte de la Kaaba */}
        <rect x="20" y="-50" width="22" height="40" fill="#c9a876" />
        <rect x="22" y="-48" width="18" height="36" fill="#a08456" />
      </g>

      {/* Ligne d'horizon dorée */}
      <line
        x1="0"
        y1="208"
        x2="800"
        y2="208"
        stroke="#c9a876"
        strokeWidth="0.5"
        opacity="0.4"
      />
    </svg>
  );
}

const SCENES = {
  haram: HaramScene,
  nabawi: NabawiScene,
  kaaba: KaabaScene,
};

/* ════════════════════════════════════════════════════════════════════
 COMPOSANTS UTILITAIRES
═════════════════════════════════════════════════════════════════════ */

function Card({ children, style }) {
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 6,
        padding: 22,
        marginBottom: 14,
        boxShadow: C.shadow,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Tab({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 0",
        marginRight: 28,
        border: "none",
        borderBottom: active ? `2px solid ${C.green}` : "2px solid transparent",
        background: "transparent",
        color: active ? C.green : C.textMuted,
        fontSize: 14,
        fontWeight: active ? 600 : 500,
        cursor: "pointer",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
        transition: "all 0.15s",
      }}
    >
      {children}
    </button>
  );
}

function SubTab({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "7px 16px",
        borderRadius: 999,
        border: `1px solid ${active ? C.green : C.border}`,
        background: active ? C.green : C.surface,
        color: active ? "#fff" : C.textMuted,
        fontSize: 13,
        fontWeight: active ? 600 : 500,
        cursor: "pointer",
        whiteSpace: "nowrap",
        letterSpacing: "0.01em",
        transition: "all 0.15s",
      }}
    >
      {children}
    </button>
  );
}

function ArabicLine({ ar, ph, fr, count, accent = C.green, onPlay, isPlaying, reciterLabel }) {
  return (
    <>
      {count && (
        <div
          style={{
            display: "inline-block",
            padding: "3px 10px",
            borderRadius: 2,
            background: C.greenSoft,
            color: C.greenDark,
            fontSize: 11.5,
            fontWeight: 600,
            marginBottom: 14,
            letterSpacing: "0.03em",
          }}
        >
          {count}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 23,
              lineHeight: 2,
              textAlign: "right",
              color: C.text,
              marginBottom: 12,
              fontFamily: "'Amiri','Scheherazade New',Georgia,serif",
              direction: "rtl",
            }}
          >
            {ar}
          </div>
          <div
            style={{
              fontSize: 14,
              color: C.textMuted,
              fontStyle: "italic",
              marginBottom: 8,
              lineHeight: 1.6,
            }}
          >
            {ph}
          </div>
          <div style={{ fontSize: 15, color: C.text, lineHeight: 1.65 }}>{fr}</div>
        </div>
        {onPlay && (
          <button
            type="button"
            onClick={onPlay}
            title={`Écouter — ${reciterLabel || "Yasser Ad-Dussary"}`}
            aria-label={`Écouter le verset avec ${reciterLabel || "Yasser Ad-Dussary"}`}
            style={{
              flexShrink: 0,
              marginTop: 6,
              background: isPlaying ? C.gold : "transparent",
              border: `1px solid ${isPlaying ? C.gold : C.border}`,
              borderRadius: "50%",
              width: 32,
              height: 32,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isPlaying ? "#0a0a0a" : C.textMuted,
              fontSize: 13,
              transition: "all 0.2s",
            }}
          >
            {isPlaying ? "■" : "▶"}
          </button>
        )}
      </div>
    </>
  );
}

function SectionHeader({ title, subtitle, count }) {
  return (
    <div
      style={{
        marginBottom: 24,
        marginTop: 6,
        paddingBottom: 16,
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 600,
            color: C.text,
            letterSpacing: "-0.01em",
            fontFamily: "Georgia,serif",
          }}
        >
          {title}
        </h2>
        {count != null && (
          <span
            style={{
              fontSize: 12,
              color: C.textSubtle,
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {count}
          </span>
        )}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: 14,
            color: C.textMuted,
            lineHeight: 1.6,
            marginTop: 8,
            fontStyle: "italic",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}

/* Petit ornement décoratif — losange or entre lignes */
function Ornament() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        margin: "32px 0",
        color: C.textSubtle,
      }}
    >
      <span
        style={{
          height: 1,
          width: 60,
          background: `linear-gradient(90deg, transparent, ${C.divider})`,
        }}
      />
      <svg width="14" height="14" viewBox="0 0 14 14">
        <path
          d="M7 0 L14 7 L7 14 L0 7 Z"
          fill="none"
          stroke={C.gold}
          strokeWidth="1"
        />
        <circle cx="7" cy="7" r="1.5" fill={C.gold} />
      </svg>
      <span
        style={{
          height: 1,
          width: 60,
          background: `linear-gradient(90deg, ${C.divider}, transparent)`,
        }}
      />
    </div>
  );
}

/* Bandeau illustration SVG avec overlay caption */
function ImageBanner({ scene, src, caption, height = 220 }) {
  // Compat : on accepte soit `scene="haram"` soit l'ancien `src`.
  // Si `src` correspond à une ancienne constante on tombe automatiquement
  // sur la bonne scène SVG.
  const SceneComp =
    SCENES[scene] ||
    (src && src.includes("Nabawi")
      ? SCENES.nabawi
      : src && src.includes("Kaaba")
        ? SCENES.kaaba
        : SCENES.haram);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height,
        borderRadius: 6,
        overflow: "hidden",
        marginBottom: 24,
        background: C.greenDeep,
        boxShadow: C.shadow,
      }}
    >
      <SceneComp />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.1) 60%, transparent)",
          padding: "32px 20px 16px",
          color: "#fff",
          fontSize: 13,
          fontFamily: "Georgia,serif",
          fontStyle: "italic",
          letterSpacing: "0.02em",
          textShadow: "0 1px 2px rgba(0,0,0,0.4)",
        }}
      >
        {caption}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
 COMPOSANT PRINCIPAL
═════════════════════════════════════════════════════════════════════ */

export default function App() {
  const [tab, setTab] = useState("sourates");
  const [coursTab, setCoursTab] = useState("sahaba");
  const [dhikrTab, setDhikrTab] = useState("formules");
  const [douaTab, setDouaTab] = useState("general");
  const [routineId, setRoutineId] = useState(null);
  const [namesQuery, setNamesQuery] = useState("");
  const [playingKey, setPlayingKey] = useState(null);
  const audioRef = useRef(null);
  const [openSurah, setOpenSurah] = useState(null);
  const [surahAutoPlay, setSurahAutoPlay] = useState(null);
  const [reciter, setReciter] = useState("Yasser_Ad-Dussary_128kbps");
  const [swReady, setSwReady] = useState(false);
  const swRegistrationRef = useRef(null);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setPlayingKey(null);
    setSurahAutoPlay(null);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // ── Service worker — enregistrement + écoute des messages ────────
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    let mounted = true;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then(async (reg) => {
        if (!mounted) return;
        swRegistrationRef.current = reg;
        // Attend que le SW soit vraiment prêt et contrôle la page
        try { await navigator.serviceWorker.ready; } catch {}
        if (!mounted) return;
        setSwReady(true);
      })
      .catch((err) => {
        console.warn("[SW] Enregistrement échoué :", err);
      });

    // Détecte le changement de contrôleur (premier install)
    const onControllerChange = () => {
      if (mounted) setSwReady(true);
    };
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

    // Écoute les messages venant du SW (notamment PLAY_ADHAN au clic notif)
    const onMessage = (event) => {
      const { type, payload } = event.data || {};
      if (type === "PLAY_ADHAN") {
        const label = payload?.prayerLabel
          ? `${payload.prayerLabel}${payload?.ar ? " — " + payload.ar : ""}`
          : "Prière";
        playAdhanRef.current && playAdhanRef.current(payload?.prayerKey || "standard", label);
        setTab("prieres");
      }
    };
    navigator.serviceWorker.addEventListener("message", onMessage);

    return () => {
      mounted = false;
      navigator.serviceWorker.removeEventListener("message", onMessage);
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Au chargement de la page : si ?play_adhan=... dans l'URL (clic notif sur app fermée)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const key = params.get("play_adhan");
      if (key) {
        const label = params.get("label") || "Prière";
        const ar = params.get("ar") || "";
        const fullLabel = ar ? `${label} — ${ar}` : label;
        // Délai pour laisser playAdhanRef se définir
        setTimeout(() => {
          if (playAdhanRef.current) playAdhanRef.current(key, fullLabel);
        }, 600);
        setTab("prieres");
        // Nettoie l'URL
        try { window.history.replaceState({}, "", window.location.pathname); } catch {}
      }
    } catch {}
  }, []);

  // Ref pour playAdhan (défini plus bas) — permet aux effets ci-dessus d'y accéder
  const playAdhanRef = useRef(null);

  const RECITERS = [
    { id: "Yasser_Ad-Dussary_128kbps", label: "Yasser Ad-Dussary", surahBase: "https://server11.mp3quran.net/yasser/" },
    { id: "Abdurrahmaan_As-Sudais_192kbps", label: "Sudais", surahBase: "https://server11.mp3quran.net/sds/" },
    { id: "Saood_ash-Shuraym_128kbps", label: "Shuraim", surahBase: "https://server7.mp3quran.net/shur/" },
  ];

  // URL verset individuel (everyayah.com)
  const getVerseAudioUrl = (surahNum, verseIndex) => {
    const BASE = `https://everyayah.com/data/${reciter}/`;
    if (typeof surahNum === "string" && surahNum.includes(":")) {
      const [surah, ayah] = surahNum.split(":").map(Number);
      if (!Number.isFinite(surah) || !Number.isFinite(ayah)) return null;
      return `${BASE}${String(surah).padStart(3, "0")}${String(ayah).padStart(3, "0")}.mp3`;
    }
    if (!Number.isFinite(surahNum)) return null;
    return `${BASE}${String(surahNum).padStart(3, "0")}${String(verseIndex + 1).padStart(3, "0")}.mp3`;
  };

  // URL sourate complète (mp3quran.net) — null pour les références verset (ex: "2:255")
  const getSurahAudioUrl = (surahNum) => {
    if (typeof surahNum === "string" && surahNum.includes(":")) return null;
    if (!Number.isFinite(surahNum)) return null;
    const r = RECITERS.find(r => r.id === reciter);
    if (!r) return null;
    return `${r.surahBase}${String(surahNum).padStart(3, "0")}.mp3`;
  };

  const playVerseAudio = (url, key) => {
    if (!url) return;
    if (playingKey === key) { stopAudio(); return; }
    stopAudio();
    const audio = new Audio(url);
    audioRef.current = audio;
    setPlayingKey(key);
    audio.onended = () => { audioRef.current = null; setPlayingKey(null); };
    audio.onerror = () => { audioRef.current = null; setPlayingKey(null); };
    audio.play().catch(() => { audioRef.current = null; setPlayingKey(null); });
  };

  const playSurah = (surahIdx) => {
    const s = SURAHS[surahIdx];
    if (!s) return;
    const url = getSurahAudioUrl(s.num);
    if (!url) return;
    stopAudio();
    const audio = new Audio(url);
    audioRef.current = audio;
    setSurahAutoPlay(surahIdx);
    audio.onended = () => { audioRef.current = null; setSurahAutoPlay(null); };
    audio.onerror = () => { audioRef.current = null; setSurahAutoPlay(null); };
    audio.play().catch(() => { audioRef.current = null; setSurahAutoPlay(null); });
  };

  // ── Compteur Tasbih ──────────────────────────────────────────────
  const todayKey = () => new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  const [allCounts, setAllCounts] = useState(() => {
    try { return JSON.parse(localStorage.getItem("dhikr_counts") || "{}"); }
    catch { return {}; }
  });
  const [selectedDhikrIdx, setSelectedDhikrIdx] = useState(0); // 0..N-1 = DHIKR, N = libre
  const FREE_IDX = DHIKR.length;

  const getTodayCounts = () => allCounts[todayKey()] || {};

  const saveCount = (idx, delta) => {
    const key = todayKey();
    const field = idx === FREE_IDX ? "__libre__" : `d${idx}`;
    setAllCounts(prev => {
      const day = { ...(prev[key] || {}) };
      day[field] = Math.max(0, (day[field] || 0) + delta);
      const next = { ...prev, [key]: day };
      try { localStorage.setItem("dhikr_counts", JSON.stringify(next)); } catch {}
      return next;
    });
    // Retour haptique
    try { if (navigator.vibrate) navigator.vibrate(40); } catch {}
  };

  const currentCount = () => {
    const day = getTodayCounts();
    const field = selectedDhikrIdx === FREE_IDX ? "__libre__" : `d${selectedDhikrIdx}`;
    return day[field] || 0;
  };

  const resetTodaySelected = () => {
    const key = todayKey();
    const field = selectedDhikrIdx === FREE_IDX ? "__libre__" : `d${selectedDhikrIdx}`;
    setAllCounts(prev => {
      const day = { ...(prev[key] || {}) };
      day[field] = 0;
      const next = { ...prev, [key]: day };
      try { localStorage.setItem("dhikr_counts", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  // ── Calendrier ───────────────────────────────────────────────────
  const [calYear, setCalYear] = useState(() => {
    const y = new Date().getFullYear();
    return y >= 2026 && y <= 2027 ? y : 2026;
  });
  const [calSelectedDate, setCalSelectedDate] = useState(null);

  // Auto-scroll vers le mois courant quand on ouvre le calendrier
  useEffect(() => {
    if (tab !== "calendrier") return;
    const now = new Date();
    if (now.getFullYear() !== calYear) return;
    const monthIdx = now.getMonth();
    // Attendre le rendu
    const t = setTimeout(() => {
      const el = document.getElementById(`cal-month-${calYear}-${monthIdx}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
    return () => clearTimeout(t);
  }, [tab, calYear]);

  // ── Horaires de prière + notifications adhan ────────────────────
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [prayerDate, setPrayerDate] = useState(null);
  const [prayerHijri, setPrayerHijri] = useState(null);
  const [prayerCity, setPrayerCity] = useState(null);
  const [prayerCoords, setPrayerCoords] = useState(() => {
    try { return JSON.parse(localStorage.getItem("prayer_coords") || "null"); }
    catch { return null; }
  });
  const [prayerLoading, setPrayerLoading] = useState(false);
  const [prayerError, setPrayerError] = useState(null);
  const [prayerMethod, setPrayerMethod] = useState(() => {
    return localStorage.getItem("prayer_method") || "12"; // 12 = UOIF (France)
  });
  const [notifPermission, setNotifPermission] = useState(() => {
    if (typeof Notification === "undefined") return "unsupported";
    return Notification.permission;
  });
  const [notifEnabled, setNotifEnabled] = useState(() => {
    return localStorage.getItem("notif_enabled") === "true";
  });
  const [adhanPlaying, setAdhanPlaying] = useState(null); // nom de la prière en cours
  const notifTimeoutsRef = useRef([]);
  const adhanAudioRef = useRef(null);
  const adhanFailedRef = useRef(false);

  // URLs adhan — multiples sources avec fallback
  const ADHAN_URLS = {
    fajr: [
      "https://www.islamcan.com/audio/adhan/azan1.mp3",
      "https://www.islamcan.com/audio/adhan/azan2.mp3",
    ],
    standard: [
      "https://www.islamcan.com/audio/adhan/azan2.mp3",
      "https://www.islamcan.com/audio/adhan/azan3.mp3",
      "https://www.islamcan.com/audio/adhan/azan4.mp3",
    ],
  };

  const playAdhan = (prayerKey, prayerLabel) => {
    // Stop tout audio précédent
    if (adhanAudioRef.current) {
      try { adhanAudioRef.current.pause(); } catch {}
      adhanAudioRef.current = null;
    }
    const list = prayerKey === "Fajr" ? ADHAN_URLS.fajr : ADHAN_URLS.standard;
    let i = 0;
    const tryNext = () => {
      if (i >= list.length) {
        adhanFailedRef.current = true;
        setAdhanPlaying(null);
        return;
      }
      const audio = new Audio(list[i]);
      audio.preload = "auto";
      adhanAudioRef.current = audio;
      audio.onended = () => {
        adhanAudioRef.current = null;
        setAdhanPlaying(null);
      };
      audio.onerror = () => {
        i++;
        tryNext();
      };
      audio.play().then(() => {
        setAdhanPlaying(prayerLabel || prayerKey);
      }).catch(() => {
        i++;
        tryNext();
      });
    };
    tryNext();
  };

  const stopAdhan = () => {
    if (adhanAudioRef.current) {
      try { adhanAudioRef.current.pause(); } catch {}
      adhanAudioRef.current = null;
    }
    setAdhanPlaying(null);
  };

  // Bind playAdhan dans la ref (pour que le SW puisse la déclencher)
  useEffect(() => {
    playAdhanRef.current = playAdhan;
  });

  const fetchPrayerTimes = async (lat, lng, method = "12") => {
    setPrayerLoading(true);
    setPrayerError(null);
    try {
      const d = new Date();
      const dateStr = `${String(d.getDate()).padStart(2,"0")}-${String(d.getMonth()+1).padStart(2,"0")}-${d.getFullYear()}`;
      const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=${method}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      if (data.code !== 200 || !data.data) throw new Error("Réponse API invalide");
      setPrayerTimes(data.data.timings);
      setPrayerDate(data.data.date?.gregorian?.date || dateStr);
      setPrayerHijri(data.data.date?.hijri || null);
      // Reverse géocodage léger (best-effort)
      try {
        const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=fr`);
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          const city = geoData.city || geoData.locality || geoData.principalSubdivision || "";
          const country = geoData.countryName || "";
          setPrayerCity([city, country].filter(Boolean).join(", "));
        }
      } catch {}
    } catch (e) {
      setPrayerError("Impossible de charger les horaires : " + (e.message || "erreur réseau"));
    } finally {
      setPrayerLoading(false);
    }
  };

  const requestPrayerLocation = (method) => {
    if (!navigator.geolocation) {
      setPrayerError("Géolocalisation non supportée par ce navigateur.");
      return;
    }
    setPrayerLoading(true);
    setPrayerError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setPrayerCoords(coords);
        try { localStorage.setItem("prayer_coords", JSON.stringify(coords)); } catch {}
        fetchPrayerTimes(coords.lat, coords.lng, method || prayerMethod);
      },
      (err) => {
        setPrayerLoading(false);
        let msg = "Impossible de récupérer la localisation. ";
        if (err.code === 1) msg += "Autorise l'accès à la localisation dans les paramètres du navigateur/téléphone.";
        else if (err.code === 2) msg += "Position indisponible.";
        else if (err.code === 3) msg += "Délai dépassé.";
        else msg += err.message;
        setPrayerError(msg);
      },
      { timeout: 15000, enableHighAccuracy: false, maximumAge: 30 * 60 * 1000 }
    );
  };

  // Auto-charge à l'ouverture de l'onglet
  useEffect(() => {
    if (tab !== "prieres") return;
    if (prayerTimes) return; // déjà chargé
    if (prayerCoords) {
      fetchPrayerTimes(prayerCoords.lat, prayerCoords.lng, prayerMethod);
    } else {
      requestPrayerLocation(prayerMethod);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  // Recharge les horaires à minuit (changement de jour)
  useEffect(() => {
    if (!prayerCoords) return;
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 1, 0, 0);
    const ms = tomorrow - now;
    const id = setTimeout(() => {
      fetchPrayerTimes(prayerCoords.lat, prayerCoords.lng, prayerMethod);
    }, ms);
    return () => clearTimeout(id);
  }, [prayerCoords, prayerMethod, prayerTimes]);

  const enableNotifications = async () => {
    if (typeof Notification === "undefined") {
      setPrayerError("Les notifications ne sont pas supportées par ce navigateur.");
      return;
    }
    try {
      const perm = await Notification.requestPermission();
      setNotifPermission(perm);
      if (perm === "granted") {
        setNotifEnabled(true);
        try { localStorage.setItem("notif_enabled", "true"); } catch {}
      } else {
        setPrayerError("Permission refusée. Active les notifications dans les paramètres du navigateur.");
      }
    } catch (e) {
      setPrayerError("Erreur lors de la demande de permission : " + e.message);
    }
  };

  const disableNotifications = () => {
    setNotifEnabled(false);
    try { localStorage.setItem("notif_enabled", "false"); } catch {}
    notifTimeoutsRef.current.forEach(clearTimeout);
    notifTimeoutsRef.current = [];
    postToSW({ type: "CLEAR_SCHEDULE" });
  };

  // Helper : envoie un message au SW (controller OU active worker)
  const postToSW = (msg) => {
    try {
      if (navigator.serviceWorker?.controller) {
        navigator.serviceWorker.controller.postMessage(msg);
        return true;
      }
      const reg = swRegistrationRef.current;
      const worker = reg?.active || reg?.waiting || reg?.installing;
      if (worker) {
        worker.postMessage(msg);
        return true;
      }
    } catch {}
    return false;
  };

  // Planifie les notifications + adhan pour les prières du jour
  useEffect(() => {
    notifTimeoutsRef.current.forEach(clearTimeout);
    notifTimeoutsRef.current = [];

    if (!notifEnabled || !prayerTimes || notifPermission !== "granted") {
      // Si désactivé, prévient le SW d'oublier la planification
      postToSW({ type: "CLEAR_SCHEDULE" });
      return;
    }

    const PRAYERS = [
      { key: "Fajr", label: "Fajr", ar: "الفجر" },
      { key: "Dhuhr", label: "Dhuhr", ar: "الظهر" },
      { key: "Asr", label: "ʿAsr", ar: "العصر" },
      { key: "Maghrib", label: "Maghrib", ar: "المغرب" },
      { key: "Isha", label: "ʿIshâʾ", ar: "العشاء" },
    ];

    const now = Date.now();
    const swPayload = [];

    PRAYERS.forEach(p => {
      const t = prayerTimes[p.key];
      if (!t) return;
      // Format "HH:MM" éventuellement avec " (CET)" → on ne garde que les chiffres
      const m = String(t).match(/(\d{1,2}):(\d{2})/);
      if (!m) return;
      const target = new Date();
      target.setHours(parseInt(m[1], 10), parseInt(m[2], 10), 0, 0);
      const ts = target.getTime();
      const ms = ts - now;
      if (ms <= 0 || ms > 24 * 60 * 60 * 1000) return;

      // Prépare la charge utile pour le SW
      swPayload.push({ key: p.key, label: p.label, ar: p.ar, timestamp: ts });

      // Planification page-level (marche tant que l'app est vivante)
      const id = setTimeout(() => {
        try {
          new Notification(`${p.label} — ${p.ar}`, {
            body: "L'heure de la prière est arrivée — حَيَّ عَلَى الصَّلَاة",
            icon: "/icon-192.png",
            badge: "/icon-192.png",
            tag: `prayer-${p.key}`,
            requireInteraction: false,
            silent: false,
          });
        } catch {}
        try { if (navigator.vibrate) navigator.vibrate([300, 150, 300]); } catch {}
        playAdhan(p.key, `${p.label} — ${p.ar}`);
      }, ms);
      notifTimeoutsRef.current.push(id);
    });

    // Envoie aussi au service worker (backup pour app en arrière-plan/fermée)
    if (swPayload.length > 0) {
      postToSW({
        type: "SCHEDULE_PRAYERS",
        payload: { prayers: swPayload },
      });
    }

    return () => {
      notifTimeoutsRef.current.forEach(clearTimeout);
      notifTimeoutsRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifEnabled, prayerTimes, notifPermission, swReady]);

  // Cleanup audio adhan au démontage
  useEffect(() => {
    return () => {
      if (adhanAudioRef.current) {
        try { adhanAudioRef.current.pause(); } catch {}
      }
    };
  }, []);

  const filteredNames = namesQuery
    ? NAMES.filter(([ar, ph, fr]) => {
        const q = namesQuery.toLowerCase();
        return (
          ph.toLowerCase().includes(q) ||
          fr.toLowerCase().includes(q) ||
          ar.includes(namesQuery)
        );
      })
    : NAMES;

  const tabs = [
    { id: "sourates", label: "Sourates" },
    { id: "noms", label: "99 Noms" },
    { id: "dhikr", label: "Dhikr" },
    { id: "doua", label: "Doua" },
    { id: "cours", label: "Compagnons & Hadiths" },
    { id: "compteur", label: "Tasbih" },
    { id: "prieres", label: "Prières" },
    { id: "calendrier", label: "Calendrier" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        color: C.text,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
      }}
    >
      {/* HEADER avec bandeau illustration SVG */}
      <div
        style={{ background: C.surface, borderBottom: `1px solid ${C.border}` }}
      >
        <div
          style={{
            position: "relative",
            height: 200,
            backgroundColor: C.greenDeep,
            overflow: "hidden",
          }}
        >
          {/* Scène SVG en arrière-plan */}
          <div style={{ position: "absolute", inset: 0 }}>
            <HaramScene />
          </div>
          {/* Voile assombrissant pour lisibilité du texte */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(6,58,35,0.35) 0%, rgba(6,58,35,0.7) 100%)",
            }}
          />
          {/* Liseré or en bas */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, #c9a876 50%, transparent)",
              opacity: 0.7,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              padding: "0 16px",
            }}
          >
            <div
              style={{
                fontSize: 38,
                fontFamily: "'Amiri',Georgia,serif",
                letterSpacing: "0.02em",
                marginBottom: 10,
                textShadow: "0 2px 8px rgba(0,0,0,0.35)",
              }}
            >
              تعلّم الإسلام
            </div>
            <div
              style={{
                width: 40,
                height: 1,
                background: "#c9a876",
                marginBottom: 10,
                opacity: 0.8,
              }}
            />
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                opacity: 0.92,
                fontWeight: 500,
              }}
            >
              Apprentissage personnel
            </div>
          </div>
        </div>

        {/* Onglets sticky */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: C.surface,
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              maxWidth: 760,
              margin: "0 auto",
              padding: "0 18px",
              display: "flex",
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {tabs.map((t) => (
              <Tab
                key={t.id}
                active={tab === t.id}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </Tab>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{ maxWidth: 760, margin: "0 auto", padding: "32px 18px 80px" }}
      >
        {/* ═══════════════ SOURATES ═══════════════ */}
        {tab === "sourates" && (
          <>
            <SectionHeader
              title="Sourates"
              subtitle="Coran — récitation, mémoire, méditation"
              count={`${SURAHS.length} entrées`}
            />
            <div style={{ marginBottom: 22, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 12, color: C.textSubtle, letterSpacing: "0.08em", textTransform: "uppercase" }}>Récitateur</span>
              <select
                value={reciter}
                onChange={e => { stopAudio(); setReciter(e.target.value); }}
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 6,
                  color: C.text,
                  fontSize: 13,
                  padding: "6px 12px",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                {RECITERS.map(r => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
            </div>
            {SURAHS.map((s, i) => (
              <Card key={i}>
                <button
                  onClick={() => setOpenSurah(openSurah === i ? null : i)}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    color: C.text,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 0,
                    textAlign: "left",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: C.textSubtle,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      Sourate · n° {s.num}
                    </div>
                    <div
                      style={{
                        fontSize: 19,
                        fontWeight: 600,
                        color: C.text,
                        fontFamily: "Georgia,serif",
                      }}
                    >
                      {s.name}
                    </div>
                    <div
                      style={{
                        fontSize: 22,
                        color: C.green,
                        fontFamily: "'Amiri',serif",
                        marginTop: 4,
                      }}
                    >
                      {s.ar_name}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span
                      style={{
                        color: C.textSubtle,
                        fontSize: 24,
                        fontWeight: 300,
                        transform: openSurah === i ? "rotate(45deg)" : "none",
                        transition: "transform 0.2s",
                      }}
                    >
                      +
                    </span>
                  </div>
                </button>

                {openSurah === i && (
                  <>
                    {s.tip && (
                      <div
                        style={{
                          marginTop: 18,
                          padding: "14px 16px",
                          background: C.greenSoft,
                          borderRadius: 2,
                          fontSize: 13,
                          color: C.greenDark,
                          lineHeight: 1.65,
                          fontStyle: "italic",
                        }}
                      >
                        {s.tip}
                      </div>
                    )}
                    {getSurahAudioUrl(s.num) && (
                      <div style={{ marginTop: 18, marginBottom: 4 }}>
                        <button
                          type="button"
                          onClick={() => surahAutoPlay === i ? stopAudio() : playSurah(i)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            background: surahAutoPlay === i ? C.gold : "transparent",
                            border: `1px solid ${surahAutoPlay === i ? C.gold : C.border}`,
                            borderRadius: 20,
                            padding: "7px 16px",
                            color: surahAutoPlay === i ? "#0a0a0a" : C.textMuted,
                            fontSize: 13,
                            cursor: "pointer",
                            fontWeight: 500,
                            transition: "all 0.2s",
                          }}
                        >
                          <span style={{ fontSize: 15 }}>{surahAutoPlay === i ? "■" : "▶"}</span>
                          {surahAutoPlay === i ? "Arrêter la récitation" : "Écouter la sourate entière"}
                        </button>
                      </div>
                    )}
                    <div style={{ marginTop: 20 }}>
                      {s.verses.map((v, vi) => (
                        <div
                          key={vi}
                          style={{
                            borderTop:
                              vi > 0 ? `1px solid ${C.borderLight}` : "none",
                            paddingTop: vi > 0 ? 18 : 0,
                            marginTop: vi > 0 ? 18 : 0,
                          }}
                        >
                          <div
                            style={{
                              fontSize: 11,
                              color: C.textSubtle,
                              marginBottom: 10,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                            }}
                          >
                            Verset {vi + 1}
                          </div>
                          <ArabicLine
                            ar={v[0]}
                            ph={v[1]}
                            fr={v[2]}
                            onPlay={() =>
                              playVerseAudio(
                                getVerseAudioUrl(s.num, vi),
                                `surah-${s.num}-${vi}`
                              )
                            }
                            isPlaying={playingKey === `surah-${s.num}-${vi}`}
                            reciterLabel={RECITERS.find(r => r.id === reciter)?.label}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </Card>
            ))}
          </>
        )}

        {/* ═══════════════ 99 NOMS ═══════════════ */}
        {tab === "noms" && (
          <>
            <SectionHeader
              title="Les 99 Noms d'Allah"
              subtitle="« Allah a 99 Noms — celui qui les dénombre entre au Paradis. » (Bukhârî, Muslim)"
              count={`${NAMES.length} noms`}
            />
            <div
              style={{
                background: C.greenSoft,
                border: `1px solid ${C.green}`,
                borderRadius: 4,
                padding: "16px 18px",
                marginBottom: 22,
                fontSize: 13.5,
                color: C.greenDark,
                lineHeight: 1.7,
              }}
            >
              <strong>Pourquoi les apprendre et les pratiquer.</strong>{" "}
              Connaître les 99 Noms d'Allah, c'est apprendre à Le reconnaître dans
              chaque instant de la vie — Sa miséricorde quand on est pardonné,
              Sa générosité dans le rizq, Sa sagesse quand l'épreuve dépasse la
              compréhension — et passer ainsi d'une foi abstraite à un lien vivant
              et nourri (« iḥṣāʾ », le dénombrement, signifie aussi méditer le sens
              et y conformer son comportement). Les invoquer dans la duʿāʾ par le
              Nom adapté à la demande (Ar-Razzāq pour la subsistance, At-Tawwāb
              pour le repentir, Ash-Shāfī pour la guérison) suit l'ordre direct du
              Coran : « À Allah appartiennent les Noms les plus beaux. Invoquez-Le
              par eux. » (7:180). Enfin, méditer chaque Nom transforme le
              caractère : qui contemple Al-Ḥalīm (le Longanime) apprend la
              patience, qui contemple Al-Wadūd (le Très Aimant) apprend à aimer
              en Allah — c'est ce que les savants nomment <em>at-takhalluq
              bi-akhlāqi llāh</em>, se parer des nobles caractères qu'ils
              désignent.
            </div>
            <div style={{ position: "relative", marginBottom: 22 }}>
              <input
                type="text"
                placeholder="Rechercher un nom (arabe, phonétique, français)…"
                value={namesQuery}
                onChange={(e) => setNamesQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 18px",
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 2,
                  color: C.text,
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
            </div>
            {namesQuery && (
              <div
                style={{
                  fontSize: 12,
                  color: C.textMuted,
                  marginBottom: 14,
                  letterSpacing: "0.05em",
                }}
              >
                {filteredNames.length} résultat
                {filteredNames.length > 1 ? "s" : ""}
              </div>
            )}
            {filteredNames.map(([ar, ph, fr, exp]) => {
              const realIndex = NAMES.findIndex((n) => n[0] === ar);
              return (
                <Card key={ar}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 12,
                      gap: 14,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 11,
                          color: C.textSubtle,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        n° {realIndex + 1}
                      </div>
                      <div
                        style={{
                          fontSize: 19,
                          fontWeight: 600,
                          color: C.green,
                          marginTop: 4,
                          fontFamily: "Georgia,serif",
                        }}
                      >
                        {ph}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: C.textMuted,
                          marginTop: 2,
                          fontStyle: "italic",
                        }}
                      >
                        {fr}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 30,
                        color: C.text,
                        fontFamily: "'Amiri',serif",
                        lineHeight: 1,
                        paddingTop: 4,
                      }}
                    >
                      {ar}
                    </div>
                  </div>
                  <div
                    style={{
                      height: 1,
                      background: C.borderLight,
                      margin: "14px 0",
                    }}
                  />
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: C.text,
                      margin: 0,
                    }}
                  >
                    {exp}
                  </p>
                </Card>
              );
            })}
          </>
        )}

        {/* ═══════════════ DHIKR ═══════════════ */}
        {tab === "dhikr" && (
          <>
            <SectionHeader
              title="Dhikr & Routines"
              subtitle="Évocation d'Allah — formules et séquences guidées"
            />

            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 24,
                flexWrap: "wrap",
              }}
            >
              <SubTab
                active={dhikrTab === "formules"}
                onClick={() => {
                  setDhikrTab("formules");
                  setRoutineId(null);
                }}
              >
                Formules
              </SubTab>
              <SubTab
                active={dhikrTab === "routines"}
                onClick={() => setDhikrTab("routines")}
              >
                Routines guidées
              </SubTab>
            </div>

            {dhikrTab === "formules" &&
              DHIKR.map((d, i) => (
                <Card key={i}>
                  <ArabicLine ar={d.ar} ph={d.ph} fr={d.fr} count={d.count} />
                  {d.benefits && (
                    <>
                      <div
                        style={{
                          height: 1,
                          background: C.borderLight,
                          margin: "16px 0",
                        }}
                      />
                      <div
                        style={{
                          fontSize: 11,
                          color: C.green,
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: 6,
                        }}
                      >
                        Bienfaits
                      </div>
                      <p
                        style={{
                          fontSize: 13.5,
                          color: C.textMuted,
                          lineHeight: 1.65,
                          margin: 0,
                        }}
                      >
                        {d.benefits}
                      </p>
                    </>
                  )}
                </Card>
              ))}

            {dhikrTab === "routines" && !routineId && (
              <>
                <p
                  style={{
                    fontSize: 13.5,
                    color: C.textMuted,
                    marginBottom: 18,
                    lineHeight: 1.65,
                    fontStyle: "italic",
                  }}
                >
                  Séquences pratiquées par le Prophète ﷺ. Sélectionnez-en une
                  pour voir les étapes détaillées.
                </p>
                {ROUTINES.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRoutineId(r.id)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      background: C.surface,
                      border: `1px solid ${C.border}`,
                      borderRadius: 4,
                      padding: 22,
                      marginBottom: 14,
                      cursor: "pointer",
                      color: C.text,
                      fontFamily: "inherit",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        color: C.green,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 6,
                        fontWeight: 600,
                      }}
                    >
                      Routine · {r.steps.length} étapes
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: C.text,
                        marginBottom: 8,
                        fontFamily: "Georgia,serif",
                      }}
                    >
                      {r.name}
                    </div>
                    <div
                      style={{
                        fontSize: 13.5,
                        color: C.textMuted,
                        lineHeight: 1.6,
                      }}
                    >
                      {r.intro}
                    </div>
                  </button>
                ))}
              </>
            )}

            {dhikrTab === "routines" &&
              routineId &&
              (() => {
                const r = ROUTINES.find((x) => x.id === routineId);
                return (
                  <>
                    <button
                      onClick={() => setRoutineId(null)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: C.green,
                        padding: 0,
                        fontSize: 13,
                        cursor: "pointer",
                        marginBottom: 18,
                        letterSpacing: "0.05em",
                        fontFamily: "inherit",
                        fontWeight: 600,
                      }}
                    >
                      ← Toutes les routines
                    </button>
                    <SectionHeader
                      title={r.name}
                      subtitle={r.intro}
                      count={`${r.steps.length} étapes`}
                    />
                    {r.steps.map((step, i) => (
                      <Card key={i}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            marginBottom: 14,
                          }}
                        >
                          <span
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              background: C.greenSoft,
                              color: C.greenDark,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 13,
                              fontWeight: 700,
                              flexShrink: 0,
                              fontFamily: "Georgia,serif",
                            }}
                          >
                            {i + 1}
                          </span>
                          <div
                            style={{
                              fontSize: 11.5,
                              color: C.green,
                              fontWeight: 600,
                              letterSpacing: "0.05em",
                              textTransform: "uppercase",
                            }}
                          >
                            {step.count}
                          </div>
                        </div>
                        <ArabicLine ar={step.ar} ph={step.ph} fr={step.fr} />
                      </Card>
                    ))}
                  </>
                );
              })()}
          </>
        )}

        {/* ═══════════════ DOUA ═══════════════ */}
        {tab === "doua" && (
          <>
            <SectionHeader
              title="Invocations"
              subtitle="Doua du Coran, des prophètes et du quotidien"
            />

            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 24,
                flexWrap: "wrap",
              }}
            >
              <SubTab
                active={douaTab === "general"}
                onClick={() => setDouaTab("general")}
              >
                Coran & Sunna
              </SubTab>
              <SubTab
                active={douaTab === "prophets"}
                onClick={() => setDouaTab("prophets")}
              >
                Prophètes
              </SubTab>
              <SubTab
                active={douaTab === "quotidien"}
                onClick={() => setDouaTab("quotidien")}
              >
                Quotidien
              </SubTab>
            </div>

            {douaTab === "general" &&
              DOUA_GENERAL.map((d, i) => (
                <Card key={i}>
                  <div
                    style={{
                      fontSize: 11,
                      color: C.green,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 14,
                    }}
                  >
                    {d.context}
                  </div>
                  <ArabicLine ar={d.ar} ph={d.ph} fr={d.fr} />
                  {d.benefits && (
                    <>
                      <div
                        style={{
                          height: 1,
                          background: C.borderLight,
                          margin: "16px 0",
                        }}
                      />
                      <p
                        style={{
                          fontSize: 13,
                          color: C.textMuted,
                          lineHeight: 1.65,
                          margin: 0,
                          fontStyle: "italic",
                        }}
                      >
                        {d.benefits}
                      </p>
                    </>
                  )}
                </Card>
              ))}

            {douaTab === "prophets" &&
              DOUA_PROPHETS.map((d, i) => (
                <Card key={i}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: 14,
                      flexWrap: "wrap",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 15,
                        color: C.green,
                        fontWeight: 600,
                        fontFamily: "Georgia,serif",
                      }}
                    >
                      {d.prophet}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: C.textSubtle,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {d.ref}
                    </div>
                  </div>
                  <ArabicLine ar={d.ar} ph={d.ph} fr={d.fr} />
                  <div
                    style={{
                      marginTop: 16,
                      padding: "12px 14px",
                      background: C.surface2,
                      borderRadius: 2,
                      fontSize: 12.5,
                      color: C.textMuted,
                      lineHeight: 1.65,
                    }}
                  >
                    <strong style={{ color: C.text, fontWeight: 600 }}>
                      Contexte.{" "}
                    </strong>
                    {d.context}
                  </div>
                  {d.benefits && (
                    <p
                      style={{
                        fontSize: 12.5,
                        color: C.textMuted,
                        lineHeight: 1.65,
                        marginTop: 10,
                        marginBottom: 0,
                        fontStyle: "italic",
                      }}
                    >
                      {d.benefits}
                    </p>
                  )}
                </Card>
              ))}

            {douaTab === "quotidien" &&
              DOUA_QUOTIDIEN.map((d, i) => (
                <Card key={i}>
                  <div
                    style={{
                      fontSize: 11,
                      color: C.green,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 14,
                    }}
                  >
                    {d.context}
                  </div>
                  <ArabicLine ar={d.ar} ph={d.ph} fr={d.fr} />
                  {d.benefits && (
                    <>
                      <div
                        style={{
                          height: 1,
                          background: C.borderLight,
                          margin: "16px 0",
                        }}
                      />
                      <p
                        style={{
                          fontSize: 13,
                          color: C.textMuted,
                          lineHeight: 1.65,
                          margin: 0,
                          fontStyle: "italic",
                        }}
                      >
                        {d.benefits}
                      </p>
                    </>
                  )}
                </Card>
              ))}
          </>
        )}

        {/* ═══════════════ COMPAGNONS & HADITHS ═══════════════ */}
        {tab === "cours" && (
          <>
            <SectionHeader
              title="Compagnons & Hadiths"
              subtitle="Figures fondatrices, hadiths-piliers et enseignements sur l'autre vie"
            />

            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 24,
                flexWrap: "wrap",
              }}
            >
              <SubTab
                active={coursTab === "sahaba"}
                onClick={() => setCoursTab("sahaba")}
              >
                Compagnons
              </SubTab>
              <SubTab
                active={coursTab === "akhirah"}
                onClick={() => setCoursTab("akhirah")}
              >
                Paradis & Enfer
              </SubTab>
              <SubTab
                active={coursTab === "hadiths"}
                onClick={() => setCoursTab("hadiths")}
              >
                Hadiths
              </SubTab>
            </div>

            {coursTab === "sahaba" && (
              <>
                <ImageBanner
                  scene="nabawi"
                  caption="Al-Masjid an-Nabawî — Médine"
                  height={200}
                />
                {SAHABA.map((s, i) => (
                  <Card key={i}>
                    <div
                      style={{
                        fontSize: 11,
                        color: C.textSubtle,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      Compagnon · {s.dates}
                    </div>
                    <h3
                      style={{
                        margin: "0 0 4px",
                        fontSize: 20,
                        color: C.text,
                        fontWeight: 600,
                        fontFamily: "Georgia,serif",
                      }}
                    >
                      {s.name}
                    </h3>
                    <div
                      style={{
                        fontSize: 13,
                        color: C.green,
                        marginBottom: 14,
                        fontStyle: "italic",
                      }}
                    >
                      {s.title}
                    </div>
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: C.text,
                        marginBottom: 16,
                      }}
                    >
                      {s.bio}
                    </p>
                    <div
                      style={{
                        height: 1,
                        background: C.borderLight,
                        margin: "14px 0",
                      }}
                    />
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: 20,
                        fontSize: 13,
                        lineHeight: 1.75,
                        color: C.textMuted,
                      }}
                    >
                      {s.notes.map((n, ni) => (
                        <li key={ni} style={{ marginBottom: 8 }}>
                          {n}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </>
            )}

            {coursTab === "akhirah" && (
              <>
                <ImageBanner
                  scene="kaaba"
                  caption="Al-Masjid al-Ḥarām — La Mecque"
                  height={200}
                />
                <p
                  style={{
                    fontSize: 13.5,
                    color: C.textMuted,
                    marginBottom: 24,
                    lineHeight: 1.7,
                    fontStyle: "italic",
                  }}
                >
                  Hadiths authentiques sur la vie après la mort, le Paradis
                  (al-Jannah) et l'Enfer (Jahannam) — issus des recueils de
                  Bukhârî, Muslim, Tirmidhî et autres ouvrages classiques.
                </p>
                {HADITHS_AKHIRAH.map((h, i) => (
                  <Card key={i}>
                    <div
                      style={{
                        fontSize: 11,
                        color: C.green,
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 14,
                      }}
                    >
                      {h.topic}
                    </div>
                    <ArabicLine ar={h.ar} ph={h.ph} fr={h.fr} />
                    <div
                      style={{
                        marginTop: 16,
                        padding: "10px 14px",
                        background: C.surface2,
                        borderRadius: 2,
                        fontSize: 12,
                        color: C.textMuted,
                        letterSpacing: "0.02em",
                      }}
                    >
                      Source · {h.src}
                    </div>
                    {h.explain && (
                      <p
                        style={{
                          fontSize: 13,
                          color: C.textMuted,
                          lineHeight: 1.7,
                          marginTop: 14,
                          marginBottom: 0,
                          fontStyle: "italic",
                        }}
                      >
                        {h.explain}
                      </p>
                    )}
                  </Card>
                ))}
              </>
            )}

            {coursTab === "hadiths" && (
              <>
                <ImageBanner
                  scene="haram"
                  caption="Hadiths fondateurs — paroles du Prophète ﷺ"
                  height={200}
                />
                <p
                  style={{
                    fontSize: 13.5,
                    color: C.textMuted,
                    marginBottom: 24,
                    lineHeight: 1.7,
                    fontStyle: "italic",
                  }}
                >
                  Hadiths-piliers de l'islam — le Hadith de Jibrîl, l'intention,
                  la sincérité, la fraternité — issus principalement des recueils
                  authentiques de Bukhârî et Muslim.
                </p>
                {HADITHS_IMPORTANTS.map((h, i) => (
                  <Card key={i}>
                    <div
                      style={{
                        fontSize: 11,
                        color: C.green,
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 14,
                      }}
                    >
                      {h.topic}
                    </div>
                    <ArabicLine ar={h.ar} ph={h.ph} fr={h.fr} />
                    <div
                      style={{
                        marginTop: 16,
                        padding: "10px 14px",
                        background: C.surface2,
                        borderRadius: 2,
                        fontSize: 12,
                        color: C.textMuted,
                        letterSpacing: "0.02em",
                      }}
                    >
                      Source · {h.src}
                    </div>
                    {h.explain && (
                      <p
                        style={{
                          fontSize: 13,
                          color: C.textMuted,
                          lineHeight: 1.7,
                          marginTop: 14,
                          marginBottom: 0,
                          fontStyle: "italic",
                        }}
                      >
                        {h.explain}
                      </p>
                    )}
                  </Card>
                ))}
              </>
            )}
          </>
        )}

        <Ornament />

        {/* ═══════════════ COMPTEUR TASBIH ═══════════════ */}
        {tab === "compteur" && (() => {
          const dhikrLabels = DHIKR.map((d, i) => ({ idx: i, ar: d.ar, ph: d.ph, fr: d.fr }));
          const allLabels = [...dhikrLabels, { idx: FREE_IDX, ar: "", ph: "", fr: "Compteur libre" }];
          const cnt = currentCount();
          return (
            <>
              <SectionHeader
                title="Compteur de Dhikr"
                subtitle="Sélectionne une formule et compte"
              />

              {/* Sélecteur */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 11, color: C.textSubtle, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                  Formule
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {allLabels.map(({ idx, ar, ph, fr }) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedDhikrIdx(idx)}
                      style={{
                        textAlign: "left",
                        background: selectedDhikrIdx === idx ? C.greenSoft : C.surface,
                        border: `1px solid ${selectedDhikrIdx === idx ? C.green : C.border}`,
                        borderRadius: 4,
                        padding: "12px 16px",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        color: selectedDhikrIdx === idx ? C.greenDark : C.text,
                        transition: "all 0.15s",
                      }}
                    >
                      {ar && (
                        <div style={{ fontSize: 18, fontFamily: "'Amiri',serif", direction: "rtl", textAlign: "right", lineHeight: 1.7, color: selectedDhikrIdx === idx ? C.greenDark : C.text, marginBottom: 4 }}>
                          {ar}
                        </div>
                      )}
                      {ph && (
                        <div style={{ fontSize: 12, fontStyle: "italic", color: selectedDhikrIdx === idx ? C.greenDark : C.textSubtle, marginBottom: 4 }}>
                          {ph}
                        </div>
                      )}
                      <div style={{ fontSize: 13, fontWeight: 500, color: selectedDhikrIdx === idx ? C.greenDark : C.textMuted }}>
                        {fr}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Compteur principal */}
              <div style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                padding: "40px 24px",
                textAlign: "center",
                marginBottom: 20,
              }}>
                {selectedDhikrIdx < FREE_IDX && (
                  <>
                    <div style={{ fontSize: 24, fontFamily: "'Amiri',serif", color: C.text, marginBottom: 6, lineHeight: 1.8, direction: "rtl" }}>
                      {DHIKR[selectedDhikrIdx].ar}
                    </div>
                    <div style={{ fontSize: 14, color: C.gold, fontStyle: "italic", marginBottom: 4, fontWeight: 500 }}>
                      {DHIKR[selectedDhikrIdx].ph}
                    </div>
                    <div style={{ fontSize: 13, color: C.textMuted, fontStyle: "italic", marginBottom: 8 }}>
                      {DHIKR[selectedDhikrIdx].fr}
                    </div>
                  </>
                )}
                {selectedDhikrIdx === FREE_IDX && (
                  <div style={{ fontSize: 18, color: C.textMuted, marginBottom: 8, fontStyle: "italic" }}>Compteur libre</div>
                )}

                {/* Grand afficheur */}
                <div style={{
                  fontSize: 88,
                  fontWeight: 700,
                  color: C.gold,
                  lineHeight: 1,
                  margin: "24px 0",
                  fontFamily: "Georgia,serif",
                  letterSpacing: "-0.02em",
                }}>
                  {cnt}
                </div>

                {/* Bouton +1 */}
                <button
                  onClick={() => saveCount(selectedDhikrIdx, 1)}
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${C.green}, ${C.greenDeep})`,
                    border: "none",
                    color: "#fff",
                    fontSize: 40,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: `0 6px 24px rgba(78,204,163,0.35)`,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.08s",
                    WebkitTapHighlightColor: "transparent",
                    userSelect: "none",
                  }}
                  onPointerDown={e => e.currentTarget.style.transform = "scale(0.93)"}
                  onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
                  onPointerLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  +
                </button>

                {/* Boutons ± soustractif + reset */}
                <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 24 }}>
                  <button
                    onClick={() => saveCount(selectedDhikrIdx, -1)}
                    style={{
                      width: 48, height: 48, borderRadius: "50%",
                      background: C.surface, border: `1px solid ${C.border}`,
                      color: C.textMuted, fontSize: 22, cursor: "pointer",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                    }}
                  >−</button>
                  <button
                    onClick={resetTodaySelected}
                    style={{
                      padding: "10px 22px", borderRadius: 4,
                      background: "transparent", border: `1px solid ${C.border}`,
                      color: C.textMuted, fontSize: 12, cursor: "pointer",
                      letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "inherit",
                    }}
                  >Remettre à 0</button>
                  <button
                    onClick={() => saveCount(selectedDhikrIdx, 33)}
                    style={{
                      padding: "10px 22px", borderRadius: 4,
                      background: C.greenSoft, border: `1px solid ${C.green}`,
                      color: C.greenDark, fontSize: 12, cursor: "pointer",
                      letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "inherit",
                      fontWeight: 600,
                    }}
                  >+33</button>
                </div>
              </div>

              {/* Récapitulatif du jour */}
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 11, color: C.textSubtle, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                  Aujourd'hui — {todayKey()}
                </div>
                {Object.entries(getTodayCounts()).filter(([,v]) => v > 0).length === 0 ? (
                  <div style={{ fontSize: 13, color: C.textMuted, fontStyle: "italic" }}>Aucun dhikr enregistré aujourd'hui.</div>
                ) : (
                  Object.entries(getTodayCounts()).filter(([,v]) => v > 0).map(([field, val]) => {
                    const idx = field === "__libre__" ? FREE_IDX : parseInt(field.slice(1));
                    const label = idx === FREE_IDX ? "Libre" : (DHIKR[idx]?.fr || field);
                    return (
                      <div key={field} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.borderLight}`, fontSize: 14 }}>
                        <span style={{ color: C.text }}>{label}</span>
                        <span style={{ color: C.gold, fontWeight: 700, fontFamily: "Georgia,serif" }}>{val}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          );
        })()}

        {/* ═══════════════ HORAIRES DE PRIÈRES ═══════════════ */}
        {tab === "prieres" && (() => {
          const PRAYERS_DISPLAY = [
            { key: "Fajr", label: "Fajr", ar: "الفجر", note: "Aube" },
            { key: "Sunrise", label: "Lever du soleil", ar: "الشروق", note: "Fin du temps de Fajr", muted: true },
            { key: "Dhuhr", label: "Dhuhr", ar: "الظهر", note: "Midi" },
            { key: "Asr", label: "ʿAsr", ar: "العصر", note: "Après-midi" },
            { key: "Maghrib", label: "Maghrib", ar: "المغرب", note: "Coucher du soleil" },
            { key: "Isha", label: "ʿIshâʾ", ar: "العشاء", note: "Nuit" },
          ];

          const METHODS = [
            { id: "12", label: "France (UOIF — 12°/12°)" },
            { id: "3", label: "Ligue Islamique Mondiale" },
            { id: "2", label: "ISNA (Amérique du Nord)" },
            { id: "5", label: "Égypte" },
            { id: "4", label: "Umm al-Qurâ (Arabie)" },
            { id: "1", label: "Université Karachi" },
          ];

          // Calcule la prochaine prière
          const now = new Date();
          let nextPrayer = null;
          let nextPrayerMs = Infinity;
          if (prayerTimes) {
            ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].forEach(k => {
              const t = prayerTimes[k];
              if (!t) return;
              const m = String(t).match(/(\d{1,2}):(\d{2})/);
              if (!m) return;
              const target = new Date();
              target.setHours(parseInt(m[1], 10), parseInt(m[2], 10), 0, 0);
              const ms = target.getTime() - now.getTime();
              if (ms > 0 && ms < nextPrayerMs) {
                nextPrayerMs = ms;
                nextPrayer = k;
              }
            });
          }

          const formatCountdown = (ms) => {
            if (!Number.isFinite(ms) || ms <= 0) return "";
            const h = Math.floor(ms / 3600000);
            const m = Math.floor((ms % 3600000) / 60000);
            if (h > 0) return `dans ${h}h ${m}min`;
            return `dans ${m}min`;
          };

          return (
            <>
              <SectionHeader
                title="Horaires de prières"
                subtitle="Calculés selon ta localisation"
              />

              {/* Localisation / état */}
              {prayerLoading && (
                <div style={{ padding: 16, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, marginBottom: 16, color: C.textMuted, fontSize: 14 }}>
                  Chargement…
                </div>
              )}

              {prayerError && (
                <div style={{ padding: 16, background: "#fdf2f0", border: `1px solid #e8a89e`, borderRadius: 6, marginBottom: 16, color: "#8a3624", fontSize: 13, lineHeight: 1.6 }}>
                  {prayerError}
                  <div style={{ marginTop: 10 }}>
                    <button
                      onClick={() => requestPrayerLocation(prayerMethod)}
                      style={{
                        padding: "8px 16px", borderRadius: 4,
                        background: C.green, border: "none",
                        color: "#fff", fontSize: 12, cursor: "pointer",
                        fontWeight: 600, fontFamily: "inherit",
                      }}
                    >Réessayer</button>
                  </div>
                </div>
              )}

              {prayerCity && (
                <div style={{ padding: "12px 16px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, marginBottom: 12, fontSize: 13, color: C.textMuted, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <span>📍 {prayerCity}</span>
                  <button
                    onClick={() => requestPrayerLocation(prayerMethod)}
                    style={{
                      padding: "5px 12px", borderRadius: 999,
                      background: "transparent", border: `1px solid ${C.border}`,
                      color: C.textMuted, fontSize: 11, cursor: "pointer", fontFamily: "inherit",
                    }}
                  >Actualiser</button>
                </div>
              )}

              {prayerHijri && (
                <div style={{ padding: "10px 16px", background: C.goldSoft, border: `1px solid ${C.gold}`, borderRadius: 6, marginBottom: 16, fontSize: 12, color: C.text, textAlign: "center" }}>
                  {prayerHijri.day} {prayerHijri.month?.en} {prayerHijri.year} H —{" "}
                  <span style={{ fontFamily: "'Amiri',serif", fontSize: 14 }}>
                    {prayerHijri.day} {prayerHijri.month?.ar} {prayerHijri.year}
                  </span>
                </div>
              )}

              {/* Prochaine prière */}
              {nextPrayer && (
                <div style={{
                  padding: "18px 20px", background: `linear-gradient(135deg, ${C.green}, ${C.greenDeep})`,
                  borderRadius: 8, marginBottom: 20, color: "#fff", textAlign: "center",
                  boxShadow: `0 4px 14px rgba(15,122,74,0.25)`,
                }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.85, marginBottom: 6 }}>
                    Prochaine prière
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "Georgia,serif", marginBottom: 4 }}>
                    {nextPrayer === "Fajr" ? "Fajr" : nextPrayer === "Dhuhr" ? "Dhuhr" : nextPrayer === "Asr" ? "ʿAsr" : nextPrayer === "Maghrib" ? "Maghrib" : "ʿIshâʾ"}
                  </div>
                  <div style={{ fontSize: 14, opacity: 0.95 }}>
                    {prayerTimes[nextPrayer]} — {formatCountdown(nextPrayerMs)}
                  </div>
                </div>
              )}

              {/* Liste des prières */}
              {prayerTimes && (
                <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden", marginBottom: 24 }}>
                  {PRAYERS_DISPLAY.map((p, i) => {
                    const t = prayerTimes[p.key];
                    if (!t) return null;
                    const isNext = p.key === nextPrayer;
                    return (
                      <div
                        key={p.key}
                        style={{
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                          padding: "16px 18px",
                          borderBottom: i < PRAYERS_DISPLAY.length - 1 ? `1px solid ${C.borderLight}` : "none",
                          background: isNext ? C.greenSoft : "transparent",
                        }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                          <div style={{ fontSize: 16, fontWeight: 600, color: p.muted ? C.textMuted : (isNext ? C.greenDark : C.text) }}>
                            {p.label}
                          </div>
                          <div style={{ fontSize: 11, color: C.textSubtle, letterSpacing: "0.04em" }}>
                            <span style={{ fontFamily: "'Amiri',serif", fontSize: 14 }}>{p.ar}</span> · {p.note}
                          </div>
                        </div>
                        <div style={{
                          fontSize: 22, fontWeight: 700, fontFamily: "Georgia,serif",
                          color: p.muted ? C.textMuted : (isNext ? C.green : C.gold),
                          letterSpacing: "-0.01em",
                        }}>
                          {String(t).match(/(\d{1,2}):(\d{2})/)?.[0] || t}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Notifications adhan */}
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 18px", marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: C.textSubtle, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                  Notifications & Adhan
                </div>
                {notifPermission === "unsupported" ? (
                  <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>
                    Les notifications ne sont pas supportées par ce navigateur.
                  </div>
                ) : notifEnabled && notifPermission === "granted" ? (
                  <>
                    <div style={{ fontSize: 13, color: C.greenDark, lineHeight: 1.6, marginBottom: 8 }}>
                      ✓ Notifications activées. L'adhan complet sera joué à chaque prière.
                    </div>
                    <div style={{ fontSize: 11, color: C.textSubtle, lineHeight: 1.5, marginBottom: 12 }}>
                      Service worker : {swReady ? "actif" : "en cours…"} · Pour recevoir les notifs téléphone verrouillé, installe l'app sur l'écran d'accueil.
                    </div>
                    <button
                      onClick={disableNotifications}
                      style={{
                        padding: "10px 20px", borderRadius: 4,
                        background: "transparent", border: `1px solid ${C.border}`,
                        color: C.textMuted, fontSize: 12, cursor: "pointer",
                        fontFamily: "inherit", letterSpacing: "0.05em", textTransform: "uppercase",
                      }}
                    >Désactiver</button>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6, marginBottom: 12 }}>
                      Reçois une notification + l'adhan complet à chaque prière. Pour les notifications téléphone verrouillé, ajoute l'app à l'écran d'accueil (PWA).
                    </div>
                    <button
                      onClick={enableNotifications}
                      style={{
                        padding: "12px 22px", borderRadius: 4,
                        background: C.green, border: "none",
                        color: "#fff", fontSize: 13, cursor: "pointer",
                        fontFamily: "inherit", letterSpacing: "0.04em", fontWeight: 600,
                      }}
                    >Activer les notifications</button>
                  </>
                )}

                {/* Test adhan */}
                {prayerTimes && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.borderLight}` }}>
                    {!adhanPlaying ? (
                      <button
                        onClick={() => playAdhan("test", "Test adhan")}
                        style={{
                          padding: "9px 18px", borderRadius: 4,
                          background: "transparent", border: `1px solid ${C.gold}`,
                          color: C.gold, fontSize: 12, cursor: "pointer",
                          fontFamily: "inherit", letterSpacing: "0.04em", fontWeight: 600,
                        }}
                      >▶ Tester l'adhan</button>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                        <div style={{ fontSize: 13, color: C.greenDark, fontWeight: 600 }}>
                          🔊 {adhanPlaying} — adhan en cours…
                        </div>
                        <button
                          onClick={stopAdhan}
                          style={{
                            padding: "7px 14px", borderRadius: 999,
                            background: "transparent", border: `1px solid ${C.border}`,
                            color: C.textMuted, fontSize: 11, cursor: "pointer", fontFamily: "inherit",
                          }}
                        >■ Arrêter</button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Méthode de calcul */}
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 18px", marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: C.textSubtle, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                  Méthode de calcul
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {METHODS.map(m => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setPrayerMethod(m.id);
                        try { localStorage.setItem("prayer_method", m.id); } catch {}
                        if (prayerCoords) fetchPrayerTimes(prayerCoords.lat, prayerCoords.lng, m.id);
                      }}
                      style={{
                        textAlign: "left", padding: "10px 14px",
                        background: prayerMethod === m.id ? C.greenSoft : "transparent",
                        border: `1px solid ${prayerMethod === m.id ? C.green : C.border}`,
                        borderRadius: 4, cursor: "pointer", fontFamily: "inherit",
                        color: prayerMethod === m.id ? C.greenDark : C.text,
                        fontSize: 13, fontWeight: prayerMethod === m.id ? 600 : 400,
                      }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ fontSize: 11, color: C.textSubtle, lineHeight: 1.6, textAlign: "center", padding: "12px 0" }}>
                Horaires : api.aladhan.com · Géolocalisation : navigateur
              </div>
            </>
          );
        })()}

        {/* ═══════════════ CALENDRIER ═══════════════ */}
        {tab === "calendrier" && (() => {
          const MONTHS_FR = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
          const DOW = ["Lu","Ma","Me","Je","Ve","Sa","Di"];

          // Total dhikr pour une date key "YYYY-MM-DD"
          const totalForDate = (dk) => {
            const day = allCounts[dk] || {};
            return Object.values(day).reduce((s, v) => s + v, 0);
          };

          // Build calendar grid for a month
          const buildMonth = (year, month) => {
            const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
            const startOffset = (firstDay + 6) % 7; // Mon=0
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const cells = [];
            for (let i = 0; i < startOffset; i++) cells.push(null);
            for (let d = 1; d <= daysInMonth; d++) cells.push(d);
            return cells;
          };

          const today = new Date().toISOString().slice(0, 10);

          const detailDay = calSelectedDate;
          const detailCounts = detailDay ? (allCounts[detailDay] || {}) : {};
          const hasDetail = Object.values(detailCounts).some(v => v > 0);

          return (
            <>
              <SectionHeader
                title="Calendrier Dhikr"
                subtitle="Historique de vos invocations jour par jour"
              />

              {/* Sélecteur année */}
              <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                {[2026, 2027].map(y => (
                  <button key={y} onClick={() => { setCalYear(y); setCalSelectedDate(null); }}
                    style={{
                      padding: "8px 20px", borderRadius: 4, cursor: "pointer", fontFamily: "inherit",
                      background: calYear === y ? C.green : C.surface,
                      border: `1px solid ${calYear === y ? C.green : C.border}`,
                      color: calYear === y ? "#fff" : C.text, fontWeight: 600, fontSize: 14,
                    }}>
                    {y}
                  </button>
                ))}
              </div>

              {/* Grille des 12 mois */}
              {MONTHS_FR.map((mName, mIdx) => {
                const cells = buildMonth(calYear, mIdx);
                return (
                  <div
                    key={mIdx}
                    id={`cal-month-${calYear}-${mIdx}`}
                    style={{ marginBottom: 28, scrollMarginTop: 80 }}
                  >
                    <div style={{ fontSize: 13, color: C.gold, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                      {mName} {calYear}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}>
                      {DOW.map(d => (
                        <div key={d} style={{ textAlign: "center", fontSize: 10, color: C.textSubtle, padding: "4px 0", letterSpacing: "0.06em" }}>{d}</div>
                      ))}
                      {cells.map((day, ci) => {
                        if (!day) return <div key={`e${ci}`} />;
                        const dk = `${calYear}-${String(mIdx + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
                        const total = totalForDate(dk);
                        const isToday = dk === today;
                        const isSelected = dk === calSelectedDate;
                        return (
                          <button
                            key={dk}
                            onClick={() => setCalSelectedDate(dk === calSelectedDate ? null : dk)}
                            style={{
                              width: "100%", aspectRatio: "1", borderRadius: 4, border: `1px solid ${isSelected ? C.gold : isToday ? C.green : C.border}`,
                              background: isSelected ? C.goldSoft || "#2d2410" : total > 0 ? C.greenSoft : C.surface,
                              cursor: "pointer", padding: 0, display: "flex", flexDirection: "column",
                              alignItems: "center", justifyContent: "center",
                            }}
                          >
                            <span style={{ fontSize: 12, color: isToday ? C.green : isSelected ? C.gold : C.text, fontWeight: isToday || isSelected ? 700 : 400 }}>{day}</span>
                            {total > 0 && <span style={{ fontSize: 9, color: C.gold, fontWeight: 700, lineHeight: 1 }}>{total}</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Détail d'une date sélectionnée */}
              {detailDay && (
                <div style={{ position: "sticky", bottom: 16, background: C.surface, border: `1px solid ${C.gold}`, borderRadius: 8, padding: "18px 20px", boxShadow: `0 4px 20px rgba(0,0,0,0.4)` }}>
                  <div style={{ fontSize: 12, color: C.gold, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
                    {detailDay}
                  </div>
                  {!hasDetail ? (
                    <div style={{ fontSize: 13, color: C.textMuted, fontStyle: "italic" }}>Aucun dhikr enregistré ce jour.</div>
                  ) : (
                    Object.entries(detailCounts).filter(([,v]) => v > 0).map(([field, val]) => {
                      const idx = field === "__libre__" ? FREE_IDX : parseInt(field.slice(1));
                      const label = idx === FREE_IDX ? "Libre" : (DHIKR[idx]?.fr || field);
                      return (
                        <div key={field} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.borderLight}`, fontSize: 14 }}>
                          <span style={{ color: C.text }}>{label}</span>
                          <span style={{ color: C.gold, fontWeight: 700 }}>{val}</span>
                        </div>
                      );
                    })
                  )}
                  <button onClick={() => setCalSelectedDate(null)} style={{ marginTop: 14, background: "transparent", border: "none", color: C.textSubtle, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>✕ Fermer</button>
                </div>
              )}
            </>
          );
        })()}
      </div>

      {/* FOOTER */}
      <div
        style={{
          textAlign: "center",
          padding: "28px 18px 40px",
          fontSize: 11,
          color: C.textSubtle,
          lineHeight: 1.7,
          letterSpacing: "0.05em",
        }}
      >
        Application personnelle d'apprentissage de l'islam
        <br />
        Sources : Coran · Bukhârî · Muslim · Tirmidhî · Abû Dâwûd · Nasâʾî · Ibn
        Mâjah · Aḥmad
      </div>
    </div>
  );
}
