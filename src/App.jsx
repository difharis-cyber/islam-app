import { useState } from "react";

const SURAHS = [
  { num:1, name:"Al-Fâtiha", ar_name:"الفاتحة", tip:"Récitée dans chaque rakaa de la prière. La base de tout l'islam.",
    verses:[
      ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","Bismillāhi r-raḥmāni r-raḥīm","Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux"],
      ["الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ","Al-ḥamdu lillāhi rabbi l-ʿālamīn","Louange à Allah, Seigneur des mondes"],
      ["الرَّحْمَٰنِ الرَّحِيمِ","Ar-raḥmāni r-raḥīm","Le Tout Miséricordieux, le Très Miséricordieux"],
      ["مَالِكِ يَوْمِ الدِّينِ","Māliki yawmi d-dīn","Maître du Jour de la rétribution"],
      ["إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ","Iyyāka naʿbudu wa-iyyāka nastaʿīn","C'est Toi seul que nous adorons, et c'est Toi seul dont nous implorons le secours"],
      ["اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ","Ihdinā ṣ-ṣirāṭa l-mustaqīm","Guide-nous dans le droit chemin"],
      ["صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ","Ṣirāṭa llaḏīna anʿamta ʿalayhim ġayri l-maġḍūbi ʿalayhim wa-lā ḍ-ḍāllīn","Le chemin de ceux que Tu as comblés de bienfaits, non pas de ceux qui ont encouru Ta colère, ni des égarés"],
    ]},
  { num:112, name:"Al-Ikhlâs", ar_name:"الإخلاص", tip:"Équivaut à 1/3 du Coran. Sourate centrale sur l'Unicité d'Allah.",
    verses:[
      ["قُلْ هُوَ اللَّهُ أَحَدٌ","Qul huwa llāhu aḥad","Dis : Il est Allah, Unique"],
      ["اللَّهُ الصَّمَدُ","Allāhu ṣ-ṣamad","Allah, l'Éternel Absolu"],
      ["لَمْ يَلِدْ وَلَمْ يُولَدْ","Lam yalid wa-lam yūlad","Il n'a pas engendré et n'a pas été engendré"],
      ["وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ","Wa-lam yakun lahu kufuwan aḥad","Et nul n'est égal à Lui"],
    ]},
  { num:108, name:"Al-Kawthar", ar_name:"الكوثر", tip:"Sourate la plus courte du Coran. Révélée en signe de réconfort au Prophète ﷺ.",
    verses:[
      ["إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ","Innā aʿṭaynāka l-kawṯar","En vérité, Nous t'avons accordé l'abondance"],
      ["فَصَلِّ لِرَبِّكَ وَانْحَرْ","Faṣalli li-rabbika wa-nḥar","Accomplis donc la Salat pour ton Seigneur et sacrifie"],
      ["إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ","Inna šāniʾaka huwa l-abtar","C'est ton ennemi qui est sans postérité"],
    ]},
  { num:103, name:"Al-ʿAsr", ar_name:"العصر", tip:"Imam Shafi'i : si Allah n'avait révélé que cette sourate, elle suffirait à guider l'humanité.",
    verses:[
      ["وَالْعَصْرِ","Wa-l-ʿaṣr","Par le Temps"],
      ["إِنَّ الْإِنسَانَ لَفِي خُسْرٍ","Inna l-insāna lafī ḫusr","Certes, l'homme est en perdition"],
      ["إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ","Illā llaḏīna āmanū wa-ʿamilū ṣ-ṣāliḥāti wa-tawāṣaw bi-l-ḥaqqi wa-tawāṣaw bi-ṣ-ṣabr","Sauf ceux qui croient, accomplissent les bonnes œuvres, s'enjoignent mutuellement la vérité et la patience"],
    ]},
  { num:110, name:"An-Nasr", ar_name:"النصر", tip:"Révélée lors de la conquête de La Mecque. Le Prophète ﷺ sut qu'elle annonçait sa fin proche.",
    verses:[
      ["إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ","Iḏā jāʾa naṣru llāhi wa-l-fatḥ","Lorsque vient le secours d'Allah et la victoire"],
      ["وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا","Wa-raʾayta n-nāsa yadḫulūna fī dīni llāhi afwājā","Et que tu vois les gens entrer en foule dans la religion d'Allah"],
      ["فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ إِنَّهُ كَانَ تَوَّابًا","Fasabbiḥ bi-ḥamdi rabbika wa-staġfirhu innahu kāna tawwābā","Alors célèbre les louanges de ton Seigneur et implore Son pardon. Il est certes le Grand Accueillant au repentir"],
    ]},
  { num:109, name:"Al-Kâfirûn", ar_name:"الكافرون", tip:"Récitée dans la 1ère rakaa de la Sounnah de Fajr. Déclare l'innocence vis-à-vis du polythéisme.",
    verses:[
      ["قُلْ يَا أَيُّهَا الْكَافِرُونَ","Qul yā ayyuhā l-kāfirūn","Dis : Ô mécréants !"],
      ["لَا أَعْبُدُ مَا تَعْبُدُونَ","Lā aʿbudu mā taʿbudūn","Je n'adore pas ce que vous adorez"],
      ["وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ","Wa-lā antum ʿābidūna mā aʿbud","Et vous n'adorez pas ce que j'adore"],
      ["وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ","Wa-lā anā ʿābidun mā ʿabadtum","Et je n'adorerai pas ce que vous adorez"],
      ["وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ","Wa-lā antum ʿābidūna mā aʿbud","Et vous n'adorerez pas ce que j'adore"],
      ["لَكُمْ دِينُكُمْ وَلِيَ دِينِ","Lakum dīnukum wa-liya dīn","À vous votre religion, à moi ma religion"],
    ]},
  { num:113, name:"Al-Falaq", ar_name:"الفلق", tip:"Protection contre le mal extérieur. Récitée 3x le matin et le soir.",
    verses:[
      ["قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ","Qul aʿūḏu bi-rabbi l-falaq","Dis : Je cherche protection auprès du Seigneur de l'aube naissante"],
      ["مِن شَرِّ مَا خَلَقَ","Min šarri mā ḫalaq","Contre le mal de ce qu'Il a créé"],
      ["وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ","Wa-min šarri ġāsiqin iḏā waqab","Contre le mal de l'obscurité quand elle s'étend"],
      ["وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ","Wa-min šarri n-naffāṯāti fī l-ʿuqad","Contre le mal des souffleuses sur les nœuds"],
      ["وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ","Wa-min šarri ḥāsidin iḏā ḥasad","Contre le mal de l'envieux quand il envie"],
    ]},
  { num:114, name:"An-Nâs", ar_name:"الناس", tip:"Protection contre le mal intérieur. Récitée 3x le matin et le soir avec Al-Falaq.",
    verses:[
      ["قُلْ أَعُوذُ بِرَبِّ النَّاسِ","Qul aʿūḏu bi-rabbi n-nās","Dis : Je cherche protection auprès du Seigneur des hommes"],
      ["مَلِكِ النَّاسِ","Maliki n-nās","Le Roi des hommes"],
      ["إِلَٰهِ النَّاسِ","Ilāhi n-nās","Le Dieu des hommes"],
      ["مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ","Min šarri l-waswāsi l-ḫannās","Contre le mal du mauvais tentateur"],
      ["الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ","Allaḏī yuwaswisu fī ṣudūri n-nās","Qui souffle le mal dans les poitrines des hommes"],
      ["مِنَ الْجِنَّةِ وَالنَّاسِ","Mina l-jinnati wa-n-nās","Qu'il soit parmi les djinns ou les hommes"],
    ]},
  { num:111, name:"Al-Masad", ar_name:"المسد", tip:"Révélée en réponse à Abû Lahab, oncle du Prophète ﷺ, qui s'y opposa farouchement.",
    verses:[
      ["تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ","Tabbat yadā abī lahabin wa-tabb","Que périssent les deux mains d'Abou Lahab, et qu'il périsse"],
      ["مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ","Mā aġnā ʿanhu māluhu wa-mā kasab","Sa fortune ne lui a servi à rien, ni ce qu'il a acquis"],
      ["سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ","Sayaṣlā nāran ḏāta lahab","Il brûlera dans un feu ardent"],
      ["وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ","Wa-mraʾatuhu ḥammālata l-ḥaṭab","Ainsi que sa femme, porteuse de bois"],
      ["فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ","Fī jīdihā ḥablun min masad","À son cou, une corde de fibres de palmier"],
    ]},
  { num:105, name:"Al-Fîl", ar_name:"الفيل", tip:"Rappelle la destruction de l'armée d'Abraha venue détruire la Kaaba l'année de la naissance du Prophète ﷺ.",
    verses:[
      ["أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ","Alam tara kayfa faʿala rabbuka bi-aṣḥābi l-fīl","N'as-tu pas vu comment ton Seigneur a agi avec les gens de l'Éléphant ?"],
      ["أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ","Alam yajʿal kaydahum fī taḍlīl","N'a-t-Il pas rendu vaine leur ruse ?"],
      ["وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ","Wa-arsala ʿalayhim ṭayran abābīl","Et envoyé contre eux des oiseaux en vol groupé"],
      ["تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ","Tarmīhim bi-ḥijāratin min sijjīl","Leur lançant des pierres de terre cuite"],
      ["فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ","Fajaʿalahum kaʿaṣfin maʾkūl","Et Il les a rendus pareils à de la paille mâchée"],
    ]},
  { num:106, name:"Quraysh", ar_name:"قريش", tip:"Rappelle les bénédictions accordées aux Quraysh : sécurité et nourriture. Liée à Al-Fîl.",
    verses:[
      ["لِإِيلَافِ قُرَيْشٍ","Li-ʾīlāfi qurayš","À cause de l'accoutumance des Quraysh"],
      ["إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ","ʾīlāfihim riḥlata š-šitāʾi wa-ṣ-ṣayf","Leur accoutumance aux voyages d'hiver et d'été"],
      ["فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ","Falyaʿbudū rabba hāḏā l-bayt","Qu'ils adorent donc le Seigneur de cette Maison"],
      ["الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ","Allaḏī aṭʿamahum min jūʿin wa-āmanahum min ḫawf","Qui les a nourris contre la faim et préservés de la crainte"],
    ]},
  { num:107, name:"Al-Mâʿûn", ar_name:"الماعون", tip:"Dénonce l'hypocrisie : prier par ostentation et refuser d'aider les autres.",
    verses:[
      ["أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ","Araʾayta llaḏī yukaḏḏibu bi-d-dīn","As-tu vu celui qui traite la religion de mensonge ?"],
      ["فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ","Faḏālika llaḏī yaduʿʿu l-yatīm","C'est celui-là qui repousse l'orphelin"],
      ["وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ","Wa-lā yaḥuḍḍu ʿalā ṭaʿāmi l-miskīn","Et qui n'encourage pas à nourrir le pauvre"],
      ["فَوَيْلٌ لِّلْمُصَلِّينَ","Fawaylun lil-muṣallīn","Malheur donc à ceux qui prient"],
      ["الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ","Allaḏīna hum ʿan ṣalātihim sāhūn","Et qui sont négligents dans leur prière"],
      ["الَّذِينَ هُمْ يُرَاءُونَ","Allaḏīna hum yurāʾūn","Qui font montre d'hypocrisie"],
      ["وَيَمْنَعُونَ الْمَاعُونَ","Wa-yamnaʿūna l-māʿūn","Et refusent l'ustensile du ménage"],
    ]},
  { num:99, name:"Az-Zalzala", ar_name:"الزلزلة", tip:"Décrit le Jour du Jugement avec une précision saisissante. 'Quiconque fait un atome de bien le verra.'",
    verses:[
      ["إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا","Iḏā zulzilati l-arḍu zilzālahā","Quand la terre tremblera d'un violent séisme"],
      ["وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا","Wa-aḫrajati l-arḍu aṯqālahā","Et que la terre jettera ses fardeaux"],
      ["وَقَالَ الْإِنسَانُ مَا لَهَا","Wa-qāla l-insānu mā lahā","Et que l'homme dira : Qu'a-t-elle ?"],
      ["يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا","Yawmaʾiḏin tuḥaddiṯu aḫbārahā","Ce jour-là, elle racontera ses nouvelles"],
      ["بِأَنَّ رَبَّكَ أَوْحَىٰ لَهَا","Bi-anna rabbaka awḥā lahā","Parce que ton Seigneur le lui aura inspiré"],
      ["يَوْمَئِذٍ يَصْدُرُ النَّاسُ أَشْتَاتًا","Yawmaʾiḏin yaṣduru n-nāsu aštātā","Ce jour-là, les gens sortiront en groupes dispersés"],
      ["لِّيُرَوْا أَعْمَالَهُمْ","Liyuraw aʿmālahum","Pour qu'on leur montre leurs œuvres"],
      ["فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ","Faman yaʿmal miṯqāla ḏarratin ḫayran yarah","Quiconque fait un atome de bien le verra"],
      ["وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ","Wa-man yaʿmal miṯqāla ḏarratin šarran yarah","Et quiconque fait un atome de mal le verra"],
    ]},
  { num:94, name:"Ash-Sharh", ar_name:"الشرح", tip:"Révélée pour réconforter le Prophète ﷺ. Message clé : après chaque difficulté vient la facilité.",
    verses:[
      ["أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ","Alam nashraḥ laka ṣadrak","N'avons-Nous pas dilaté ta poitrine ?"],
      ["وَوَضَعْنَا عَنكَ وِزْرَكَ","Wa-waḍaʿnā ʿanka wizrak","Et n'avons-Nous pas allégé ton fardeau"],
      ["الَّذِي أَنقَضَ ظَهْرَكَ","Allaḏī anqaḍa ẓahrak","Qui t'accablait le dos ?"],
      ["وَرَفَعْنَا لَكَ ذِكْرَكَ","Wa-rafaʿnā laka ḏikrak","Et n'avons-Nous pas élevé ta renommée ?"],
      ["فَإِنَّ مَعَ الْعُسْرِ يُسْرًا","Fa-inna maʿa l-ʿusri yusrā","Certes, avec la difficulté vient la facilité"],
      ["إِنَّ مَعَ الْعُسْرِ يُسْرًا","Inna maʿa l-ʿusri yusrā","Certes, avec la difficulté vient la facilité"],
      ["فَإِذَا فَرَغْتَ فَانصَبْ","Fa-iḏā faraġta fanṣab","Lorsque tu seras libéré, travaille encore"],
      ["وَإِلَىٰ رَبِّكَ فَارْغَب","Wa-ilā rabbika farġab","Et vers ton Seigneur, tourne-toi avec ardeur"],
    ]},
  { num:93, name:"Ad-Duha", ar_name:"الضحى", tip:"Révélée après une interruption des révélations. Allah assure le Prophète ﷺ de Son amour constant.",
    verses:[
      ["وَالضُّحَىٰ","Wa-ḍ-ḍuḥā","Par la matinée lumineuse"],
      ["وَاللَّيْلِ إِذَا سَجَىٰ","Wa-l-layli iḏā sajā","Et par la nuit quand elle s'étend"],
      ["مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ","Mā waddaʿaka rabbuka wa-mā qalā","Ton Seigneur ne t'a pas abandonné et Il ne t'a pas oublié"],
      ["وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ","Wa-lal-āḫiratu ḫayrun laka mina l-ūlā","Et certes la vie future est meilleure pour toi que la présente"],
      ["وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ","Wa-lasawfa yuʿṭīka rabbuka fa-tarḍā","Et ton Seigneur te donnera, et tu seras satisfait"],
      ["أَلَمْ يَجِدْكَ يَتِيمًا فَآوَىٰ","Alam yajidka yatīman fa-āwā","Ne t'a-t-Il pas trouvé orphelin et recueilli ?"],
      ["وَوَجَدَكَ ضَالًّا فَهَدَىٰ","Wa-wajadaka ḍāllan fa-hadā","Ne t'a-t-Il pas trouvé égaré et guidé ?"],
      ["وَوَجَدَكَ عَائِلًا فَأَغْنَىٰ","Wa-wajadaka ʿāʾilan fa-aġnā","Ne t'a-t-Il pas trouvé pauvre et enrichi ?"],
      ["فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ","Fa-ammā l-yatīma falā taqhar","Quant à l'orphelin, ne l'opprime pas"],
      ["وَأَمَّا السَّائِلَ فَلَا تَنْهَرْ","Wa-ammā s-sāʾila falā tanhar","Et quant au mendiant, ne le repousse pas"],
      ["وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ","Wa-ammā bi-niʿmati rabbika fa-ḥaddiṯ","Et quant aux bienfaits de ton Seigneur, proclame-les"],
    ]},
];

const NAMES = [
  ["اللَّهُ","Allāh","Allah","Le nom propre de Dieu. Il englobe tous les attributs divins et désigne l'Être unique sans associé, sans semblable et sans égal."],
  ["الرَّحْمَٰنُ","Ar-Raḥmān","Le Tout Miséricordieux","Sa miséricorde englobe toute la création sans exception. Croyants et non-croyants en bénéficient dans cette vie. C'est la miséricorde immense, générale et absolue."],
  ["الرَّحِيمُ","Ar-Raḥīm","Le Très Miséricordieux","Sa miséricorde spécifique réservée aux croyants dans l'au-delà. Plus intime que Raḥmān, elle désigne l'amour et la bienveillance continue envers Ses serviteurs fidèles."],
  ["الْمَلِكُ","Al-Malik","Le Roi Souverain","Il est le Souverain absolu de tout l'univers. Son règne ne connaît ni fin ni limite. Toute autorité terrestre n'est qu'un reflet infime de Sa souveraineté parfaite."],
  ["الْقُدُّوسُ","Al-Quddūs","Le Très Saint","Totalement exempt de tout défaut, imperfection ou association. Sa sainteté est absolue, au-delà de tout ce que l'esprit humain peut concevoir."],
  ["السَّلَامُ","As-Salām","La Paix","Source de toute paix et de toute sécurité. Le Paradis lui-même est nommé Dār as-Salām — la Demeure de la Paix — car Il en est l'unique source."],
  ["الْمُؤْمِنُ","Al-Muʾmin","Le Garant de Sécurité","Il accorde la sécurité à Ses serviteurs et confirme la véracité de Ses prophètes. Il est aussi Celui qui dépose la foi (īmān) dans les cœurs."],
  ["الْمُهَيْمِنُ","Al-Muhaymin","Le Gardien Suprême","Il surveille, protège et préserve toutes choses. Il est le Témoin qui connaît chaque détail de la création et veille sur elle en permanence."],
  ["الْعَزِيزُ","Al-ʿAzīz","Le Tout-Puissant","Aucune force ne peut Le vaincre ou Lui résister. Sa puissance est incomparable. Il est le Victorieux qui domine toute chose sans jamais être dominé."],
  ["الْجَبَّارُ","Al-Jabbār","Le Contraignant","Il contraint selon Sa volonté et répare ce qui est brisé. C'est Lui qui redresse les injustices et rend la grandeur à ceux qui ont été humiliés."],
  ["الْمُتَكَبِّرُ","Al-Mutakabbir","Le Très Grand","Il est le seul à qui appartient légitimement la grandeur absolue. Cette grandeur Lui appartient à Lui seul — chez l'humain, elle devient arrogance condamnable."],
  ["الْخَالِقُ","Al-Khāliq","Le Créateur","Il crée ex nihilo, sans modèle ni matière préexistante. Toute chose dans l'univers est le fruit de Son acte créateur, y compris le temps et l'espace."],
  ["الْبَارِئُ","Al-Bāriʾ","Le Créateur qui Distingue","Il donne à chaque être sa forme distincte. C'est Lui qui fait naître les créatures de la matière en les différenciant les unes des autres."],
  ["الْمُصَوِّرُ","Al-Muṣawwir","Le Façonneur des Formes","Il donne à chaque créature sa forme unique et particulière. C'est Lui qui modèle dans le ventre maternel les traits de chaque être humain."],
  ["الْغَفَّارُ","Al-Ghaffār","Le Grand Pardonneur","Il pardonne encore et encore, sans se lasser. Le pardon est Sa nature profonde. Même si le serviteur revient au péché, Allah est prêt à pardonner à chaque repentir sincère."],
  ["الْقَهَّارُ","Al-Qahhār","Le Dominateur Absolu","Il soumet toute chose à Sa volonté. Rien ni personne ne peut Lui échapper. Les tyrans et les arrogants seront tous réduits à néant devant Lui."],
  ["الْوَهَّابُ","Al-Wahhāb","Le Grand Donateur","Il donne sans contrepartie, sans compte, sans attente de retour. Ses dons sont constants et généreux, pour qui Il veut, quand Il veut."],
  ["الرَّزَّاقُ","Ar-Razzāq","Le Pourvoyeur","Il pourvoit aux besoins de toute créature : l'animal dans les profondeurs de l'océan comme l'homme dans le désert. Nul n'est oublié dans Sa providence."],
  ["الْفَتَّاحُ","Al-Fattāḥ","L'Ouvreur","Il ouvre les portes de Sa miséricorde, des solutions et des victoires. Quand toutes les issues semblent fermées, c'est Lui qui ouvre celle que nul autre ne peut ouvrir."],
  ["الْعَلِيمُ","Al-ʿAlīm","L'Omniscient","Sa connaissance est infinie et éternelle. Il connaît le passé, le présent et le futur. Il connaît le secret des cœurs et ce que cachent les ténèbres les plus profondes."],
  ["الْقَابِضُ","Al-Qābiḍ","Celui qui Retient","Il retient les provisions, les âmes ou la pluie selon Sa sagesse. Rien n'est donné ni retiré sans Sa permission. Sa restriction est sagesse, non injustice."],
  ["الْبَاسِطُ","Al-Bāsiṭ","Celui qui Étend","Il étend Sa générosité à qui Il veut. Il élargit les moyens de subsistance, ouvre les cœurs à la foi et répand Sa grâce sur toute Sa création."],
  ["الْخَافِضُ","Al-Khāfiḍ","Celui qui Abaisse","Il abaisse les arrogants et les injustes par Sa sagesse, pour maintenir l'équilibre cosmique et punir l'orgueil. L'humiliation est entre Ses mains."],
  ["الرَّافِعُ","Ar-Rāfiʿ","Celui qui Élève","Il élève les humbles, les croyants sincères et les prophètes. L'honneur véritable vient de Lui seul — pas du rang social ou de la richesse."],
  ["الْمُعِزُّ","Al-Muʿizz","Celui qui Honore","Il donne la gloire et l'honneur à qui Il veut. L'honneur véritable ne vient que de Lui. Celui qu'Il honore, nul ne peut l'avilir."],
  ["الْمُذِلُّ","Al-Muḏill","Celui qui Humilie","Il humilie les oppresseurs qui se croient supérieurs. Cette humiliation est juste et méritée, rappelant que la vraie puissance appartient à Allah seul."],
  ["السَّمِيعُ","As-Samīʿ","L'Omniscient qui Entend","Il entend chaque son, chaque prière, chaque murmure du cœur. Il entend la fourmi marcher dans l'obscurité d'une nuit sans lune."],
  ["الْبَصِيرُ","Al-Baṣīr","Le Clairvoyant","Il voit chaque chose, visible ou invisible, dans les ténèbres comme en pleine lumière. Rien n'échappe à Son regard, ni un atome dans les cieux, ni un atome sous terre."],
  ["الْحَكَمُ","Al-Ḥakam","L'Arbitre Suprême","Son jugement est le seul véritablement juste et définitif. Il tranche entre les serviteurs le Jour du Jugement avec une équité et une précision parfaites."],
  ["الْعَدْلُ","Al-ʿAdl","Le Parfaitement Juste","Son jugement est absolu, impartial et parfait. Il ne commet aucune injustice, même la valeur d'un atome. Toute souffrance ici-bas est un test, non une injustice divine."],
  ["اللَّطِيفُ","Al-Laṭīf","Le Subtil Bienveillant","Il connaît les subtilités les plus fines et atteint Ses serviteurs par des moyens imperceptibles. Sa bienveillance se manifeste souvent de façon invisible mais réelle."],
  ["الْخَبِيرُ","Al-Khabīr","Le Parfaitement Informé","Il connaît les intériorités des choses, les secrets les plus profonds et les détails les plus imperceptibles de toute la création sans exception."],
  ["الْحَلِيمُ","Al-Ḥalīm","Le Doux et Clément","Il ne se hâte pas de punir malgré les péchés répétés. Sa douceur Lui permet de laisser du temps aux pécheurs pour se repentir, par amour et sagesse."],
  ["الْعَظِيمُ","Al-ʿAẓīm","Le Très Grand","Sa grandeur dépasse toute description et toute imagination humaine. Tout l'univers visible et invisible n'est qu'une infime manifestation de Sa grandeur."],
  ["الْغَفُورُ","Al-Ghafūr","Le Très Pardonneur","Il efface les péchés et voile les fautes. Sa capacité de pardon est sans limite — il n'y a pas de péché trop grand pour Sa clémence si le repentir est sincère."],
  ["الشَّكُورُ","Ash-Shakūr","Le Très Reconnaissant","Il récompense généreusement les bonnes actions, même les plus petites. Une bonne action sincère est multipliée au-delà de toute mesure par Sa gratitude divine."],
  ["الْعَلِيُّ","Al-ʿAlī","Le Très Haut","Il est au-dessus de toute chose par Son essence, Ses attributs et Sa domination absolue. Sa transcendance est totale et incomparable."],
  ["الْكَبِيرُ","Al-Kabīr","Le Grand","Sa grandeur est absolue et inconcevable. Tout ce que nous imaginons de grand dans l'univers n'est rien en comparaison de Sa grandeur réelle et infinie."],
  ["الْحَفِيظُ","Al-Ḥafīẓ","Le Gardien Préservateur","Il préserve toute la création et protège Ses serviteurs. Il mémorise chaque action pour en rendre compte le Jour du Jugement avec une précision parfaite."],
  ["الْمُقِيتُ","Al-Muqīt","Le Soutien Nourricier","Il pourvoit à la subsistance de chaque être vivant et maintient leur existence. Il est le gardien de toute nourriture et de toute sustentation dans l'univers."],
  ["الْحَسِيبُ","Al-Ḥasīb","Le Comptable Suffisant","Il tient compte de chaque action et suffit à Ses serviteurs. Il récompense et rétribue avec une précision absolue et une justice parfaite."],
  ["الْجَلِيلُ","Al-Jalīl","Le Majestueux","Sa majesté est absolue et inspire une révérence profonde. C'est cette majesté qui fait trembler le Trône et les anges devant Sa gloire incomparable."],
  ["الْكَرِيمُ","Al-Karīm","Le Très Généreux","Sa générosité est infinie et ne cesse jamais. Il donne même sans être sollicité, et quand on Lui demande, Il donne plus que ce qui est demandé."],
  ["الرَّقِيبُ","Ar-Raqīb","Le Surveillant Attentif","Il observe chaque chose à chaque instant. Nul acte, nulle pensée, nulle intention n'échappe à Sa surveillance constante et parfaite."],
  ["الْمُجِيبُ","Al-Mujīb","Celui qui Répond","Il répond aux invocations de Ses serviteurs. Chaque duʿāʾ sincère est entendu et reçoit une réponse — parfois immédiate, parfois reportée selon Sa sagesse."],
  ["الْوَاسِعُ","Al-Wāsiʿ","L'Immensément Vaste","Sa connaissance, Sa miséricorde et Sa générosité sont infiniment vastes. Il n'y a aucune limite à ce qu'Il peut accorder à Ses créatures."],
  ["الْحَكِيمُ","Al-Ḥakīm","Le Sage","Tout ce qu'Il fait est empreint d'une sagesse parfaite, même si nous ne la comprenons pas toujours. Ses décrets sont toujours les meilleurs pour Ses créatures."],
  ["الْوَدُودُ","Al-Wadūd","L'Aimant","Il aime Ses serviteurs croyants d'un amour profond et vrai. Cet amour divin dépasse tout amour humain en intensité et en constance absolue."],
  ["الْمَجِيدُ","Al-Majīd","Le Glorieux","Sa gloire est parfaite, combinant la beauté des attributs et la grandeur absolue. Il est digne de toute louange et de tout honneur dans les cieux et sur terre."],
  ["الْبَاعِثُ","Al-Bāʿiṯ","Celui qui Ressuscite","Il ressuscitera tous les morts le Jour du Jugement. Cette résurrection est une certitude absolue, quel que soit l'état de décomposition du corps."],
  ["الشَّهِيدُ","Ash-Shahīd","Le Témoin Omniprésent","Il est présent partout et témoin de tout ce qui se passe. Son témoignage est parfait, fiable et incontestable pour le Jour du Jugement."],
  ["الْحَقُّ","Al-Ḥaqq","La Vérité Absolue","Il est la seule vérité réelle et absolue. Son existence est la seule qui soit nécessaire — tout le reste dépend de Lui pour exister."],
  ["الْوَكِيلُ","Al-Wakīl","Le Garant","Il s'occupe des affaires de ceux qui Lui font confiance. Se remettre à Lui (tawakkul) apporte sérénité et protection dans toutes les épreuves."],
  ["الْقَوِيُّ","Al-Qawī","Le Très Fort","Sa force est absolue et ne connaît aucune faiblesse. Toute la puissance de l'univers réuni n'est qu'une infime parcelle de Sa force incommensurable."],
  ["الْمَتِينُ","Al-Matīn","Le Ferme et Solide","Son pouvoir est inébranlable et ne peut jamais être diminué ou affaibli. Il est la Roche absolue sur laquelle repose toute l'existence."],
  ["الْوَلِيُّ","Al-Walī","L'Allié Protecteur","Il est le protecteur et l'ami des croyants. Avoir Allah comme allié signifie n'avoir aucune véritable raison de craindre quoi que ce soit."],
  ["الْحَمِيدُ","Al-Ḥamīd","Le Digne de Louange","Il mérite toutes les louanges et toutes les actions de grâce. Toute la création Le loue, consciemment ou non, à chaque instant."],
  ["الْمُحْصِي","Al-Muḥṣī","Le Dénombreur","Il compte et enregistre chaque chose, même la plus infime. Pas un atome de bien ou de mal n'échappe à Son décompte parfait."],
  ["الْمُبْدِئُ","Al-Mubdiʾ","L'Initiateur","Il a commencé la création de toutes choses à partir de rien. C'est Son acte créateur initial qui a fait naître l'univers entier du néant."],
  ["الْمُعِيدُ","Al-Muʿīd","Le Restaurateur","Il recommencera la création après sa fin. La résurrection est pour Lui plus facile encore que la première création initiale."],
  ["الْمُحْيِي","Al-Muḥyī","Le Vivificateur","Il donne la vie à toutes les créatures. C'est Lui qui souffle la vie dans les corps et dans les cœurs morts par l'ignorance et le péché."],
  ["الْمُمِيتُ","Al-Mumīt","Celui qui Fait Mourir","Il décide du moment de la mort de chaque être. La mort est une transition, non une fin, et elle est entièrement entre Ses mains."],
  ["الْحَيُّ","Al-Ḥayy","Le Vivant Éternel","Il est vivant d'une vie sans début ni fin, sans besoin de nourriture ni de sommeil. Sa vie est parfaite et absolue, sans aucune interruption possible."],
  ["الْقَيُّومُ","Al-Qayyūm","Le Subsistant","Il subsiste par Lui-même et tout subsiste grâce à Lui. Si Son soutien venait à cesser un instant, l'univers entier s'effondrerait immédiatement."],
  ["الْوَاجِدُ","Al-Wājid","Le Trouvant","Il trouve tout ce qu'Il veut, à tout moment. Il n'y a rien qu'Il désire et qu'Il ne puisse obtenir — Sa volonté est absolue."],
  ["الْمَاجِدُ","Al-Mājidd","Le Noble","Il est noble dans Ses attributs et généreux dans Ses dons. Sa noblesse est parfaite, incomparable, et ne se dégrade jamais."],
  ["الْأَحَدُ","Al-Aḥad","L'Unique Absolu","L'Un absolu, indivisible et incomparable. Il n'a ni partenaire, ni rival, ni égal dans aucun domaine de l'existence. Son unicité est totale, sans aucune analogie possible."],
  ["الصَّمَدُ","Aṣ-Ṣamad","L'Éternel Absolu","L'Être vers lequel toutes les créatures se tournent dans leurs besoins. Il n'a besoin de rien tandis que tout le monde a besoin de Lui."],
  ["الْقَادِرُ","Al-Qādir","Le Tout Puissant","Il a le pouvoir sur toute chose. Rien n'est impossible pour Lui — Il dit à une chose 'Sois !' et elle est, sans délai ni effort."],
  ["الْمُقْتَدِرُ","Al-Muqtadir","Le Détenteur du Pouvoir","Son pouvoir est encore plus total que Qādir. Il exerce Son autorité sur toute la création de manière absolue et permanente."],
  ["الْمُقَدِّمُ","Al-Muqaddim","Celui qui Avance","Il met en avant ce qu'Il veut selon Sa sagesse. Il a placé les prophètes, les croyants et les bonnes actions en position de priorité absolue."],
  ["الْمُؤَخِّرُ","Al-Muʾaḫḫir","Celui qui Reporte","Il reporte ce qu'Il veut selon Sa sagesse. Ce qui semble tardif est toujours au bon moment dans Son plan parfait."],
  ["الْأَوَّلُ","Al-Awwal","Le Premier","Il est le Premier sans commencement. Il existait avant toute chose — avant l'espace, le temps et la matière."],
  ["الْآخِرُ","Al-Āḫir","Le Dernier","Il est le Dernier sans fin. Après la disparition de l'univers entier, Il demeurera éternellement seul."],
  ["الظَّاهِرُ","Aẓ-Ẓāhir","L'Apparent","Il est manifeste par Ses signes dans toute la création. Ses traces sont visibles partout pour ceux qui réfléchissent et observent."],
  ["الْبَاطِنُ","Al-Bāṭin","Le Caché","Son essence est cachée aux regards et aux esprits. Sa profondeur dépasse toute compréhension humaine et toute imagination."],
  ["الْوَالِي","Al-Wālī","Le Gouverneur","Il gouverne et administre l'univers entier avec un contrôle absolu. Rien ne se produit sans Sa permission et Sa gestion souveraine."],
  ["الْمُتَعَالِي","Al-Mutaʿālī","Le Très Élevé","Il est au-dessus de tout attribut imparfait que les humains pourraient Lui attribuer. Sa transcendance et Son élévation sont totales et absolues."],
  ["الْبَرُّ","Al-Barr","Le Bienveillant","Il est infiniment bon et bienveillant envers Ses serviteurs. Sa bonté se manifeste dans chaque souffle de vie accordé à toute Sa création."],
  ["التَّوَّابُ","At-Tawwāb","Le Grand Accueillant","Il accueille le repentir encore et encore avec joie. Le Prophète ﷺ dit qu'Allah est plus heureux du repentir de Son serviteur qu'un homme retrouvant son chameau perdu dans le désert."],
  ["الْمُنْتَقِمُ","Al-Muntaqim","Le Vengeur de Justice","Il se venge pour les opprimés et punit les injustes. Sa vengeance n'est pas de la rancœur mais la manifestation parfaite de Sa justice absolue."],
  ["الْعَفُوُّ","Al-ʿAfuww","Celui qui Efface","Il efface les péchés complètement, comme s'ils n'avaient jamais existé. Différence avec Ghafūr : ʿAfuww efface sans laisser de trace, même le souvenir du péché."],
  ["الرَّؤُوفُ","Ar-Raʾūf","Le Très Compatissant","Sa compassion est la manifestation la plus tendre de Sa miséricorde. Elle est si intense qu'elle devance la demande et se manifeste avant même la prière."],
  ["مَالِكُ الْمُلْكِ","Mālik al-Mulk","Maître du Royaume","Il possède tout le royaume de l'univers et en dispose comme Il veut. Les rois humains ne sont que des locataires éphémères de ce qu'Il leur confie temporairement."],
  ["ذُو الْجَلَالِ وَالْإِكْرَامِ","Ḏū l-Jalāli wa-l-Ikrām","Maître de la Majesté et de la Générosité","Il combine la majesté qui impose la révérence et la générosité qui invite à l'amour. Ces deux attributs résument la perfection divine dans sa totalité."],
  ["الْمُقْسِطُ","Al-Muqsiṭ","L'Équitable","Il rend la justice avec équité parfaite, sans favoritisme ni injustice d'aucune sorte. Son équité s'étend à toute la création, au-delà de toute considération."],
  ["الْجَامِعُ","Al-Jāmiʿ","Le Rassembleur","Il rassemblera toute la création le Jour du Jugement. Il rassemble aussi les contraires et les différences dans Sa création par Sa sagesse infinie."],
  ["الْغَنِيُّ","Al-Ghanī","Le Riche Absolu","Il est absolument indépendant de toute Sa création. Il n'a besoin de rien ni de personne, tandis que tout dépend de Lui pour son existence."],
  ["الْمُغْنِي","Al-Mughnī","L'Enrichisseur","Il enrichit qui Il veut par Sa grâce. La vraie richesse — matérielle ou spirituelle — ne vient que de Lui et ne peut venir d'ailleurs."],
  ["الْمَانِعُ","Al-Māniʿ","Celui qui Préserve","Il empêche ce qui nuirait à Ses serviteurs et préserve ce qui leur est bénéfique. Son empêchement apparent est une forme de miséricorde cachée."],
  ["الضَّارُّ","Aḍ-Ḍārr","Celui qui Afflige","Il peut permettre ou envoyer l'épreuve selon Sa sagesse, pour tester ou rappeler. Aucun mal ne peut atteindre sans Sa permission absolue."],
  ["النَّافِعُ","An-Nāfiʿ","Celui qui Profite","Il est la source de tout bénéfice et de toute utilité dans l'univers. Tout bien vient de Lui, directement ou indirectement."],
  ["النُّورُ","An-Nūr","La Lumière","Il est la Lumière des cieux et de la terre. Sa lumière guide les cœurs, éclaire les esprits et donne vie aux âmes obscurcies par l'ignorance."],
  ["الْهَادِي","Al-Hādī","Le Guide","Il guide vers la vérité qui Il veut. La guidance véritable ne vient que de Lui — ni l'intelligence ni l'éducation ne peuvent la remplacer."],
  ["الْبَدِيعُ","Al-Badīʿ","L'Incomparable Créateur","Il crée des choses uniques sans modèle préexistant. Chaque être dans l'univers est une innovation absolue, une création sans précédent dans l'existence."],
  ["الْبَاقِي","Al-Bāqī","L'Éternel","Il demeure éternellement après la fin de toute chose. Quand les cieux et la terre disparaîtront, seul Lui demeurera pour toujours."],
  ["الْوَارِثُ","Al-Wāriṯ","L'Héritier Absolu","Il hérite de tout après la mort de toute Sa création. À la fin, tout retourne à Lui — les royaumes, les richesses, les vies, tout."],
  ["الرَّشِيدُ","Ar-Rashīd","Le Guide vers la Rectitude","Sa sagesse guide chaque chose vers ce qui est juste et correct. Ses décrets sont toujours parfaitement orientés vers le meilleur pour Ses créatures."],
  ["الصَّبُورُ","Aṣ-Ṣabūr","Le Très Patient","Il ne Se hâte pas de punir malgré les désobéissances répétées. Sa patience est une forme de miséricorde qui donne aux pécheurs le temps précieux de se repentir."],
];

const DHIKR = [
  { ar:"سُبْحَانَ اللَّهِ", ph:"Subḥāna llāh", fr:"Gloire à Allah", count:"33x après chaque prière",
    benefits:"Efface les péchés comme les feuilles d'un arbre en automne. Celui qui le dit 100x le matin aura ses péchés effacés même s'ils étaient aussi nombreux que l'écume de la mer."},
  { ar:"الْحَمْدُ لِلَّهِ", ph:"Al-ḥamdu lillāh", fr:"Louange à Allah", count:"33x après chaque prière",
    benefits:"Remplit la balance des bonnes actions. Avec Subḥānallāh et Allāhu Akbar, il remplit tout ce qui est entre les cieux et la terre de récompenses."},
  { ar:"اللَّهُ أَكْبَرُ", ph:"Allāhu Akbar", fr:"Allah est le Plus Grand", count:"34x après chaque prière",
    benefits:"Proclame la grandeur d'Allah dans sa vie. Récité pour compléter les 100 après les 33 Subḥānallāh et 33 Alḥamdulillāh."},
  { ar:"لَا إِلَٰهَ إِلَّا اللَّهُ", ph:"Lā ilāha illā llāh", fr:"Il n'y a de dieu qu'Allah", count:"100x par jour",
    benefits:"La meilleure des invocations. 100 fois = récompense de 10 affranchissements, 100 bonnes actions, 100 mauvaises effacées. Protection contre le diable jusqu'au soir."},
  { ar:"أَسْتَغْفِرُ اللَّهَ", ph:"Astaġfiru llāh", fr:"Je demande pardon à Allah", count:"100x par jour minimum",
    benefits:"Le Prophète ﷺ demandait pardon plus de 70 fois par jour. L'istighfār ouvre les portes de la miséricorde, du rizq et de la pluie. Il soulage l'anxiété et la tristesse."},
  { ar:"لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", ph:"Lā ḥawla wa-lā quwwata illā billāh", fr:"Il n'y a ni force ni puissance sauf par Allah", count:"Autant que possible",
    benefits:"Appelé la 'trésorerie du Paradis'. Remède contre 99 maux dont la tristesse et l'anxiété. Rappelle que toute force vient d'Allah, non de nous-mêmes."},
  { ar:"سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", ph:"Subḥāna llāhi wa-biḥamdih", fr:"Gloire à Allah et Sa louange", count:"100x matin et soir",
    benefits:"Léger sur la langue mais lourd dans la balance. Celui qui le dit 100x matin et soir, personne le Jour du Jugement n'aura de meilleure action — sauf celui qui en dit autant."},
  { ar:"سُبْحَانَ اللَّهِ الْعَظِيمِ", ph:"Subḥāna llāhi l-ʿaẓīm", fr:"Gloire à Allah, le Très Grand", count:"Autant que possible",
    benefits:"Deux mots légers sur la langue, lourds dans la balance et chers au Miséricordieux (Hadith). À répéter surtout dans les moments de difficulté ou d'épreuve."},
  { ar:"اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ", ph:"Allāhumma ṣalli ʿalā Muḥammad", fr:"Ô Allah, envoie Ta bénédiction sur Muhammad", count:"10x matin et soir",
    benefits:"Chaque salawat entraîne 10 bénédictions d'Allah sur celui qui la prononce. Rapproche du Prophète ﷺ au Paradis et attire son intercession le Jour du Jugement."},
  { ar:"بِسْمِ اللَّهِ", ph:"Bismillāh", fr:"Au nom d'Allah", count:"Avant chaque action",
    benefits:"Protège des méfaits du diable lors des repas, de l'entrée chez soi, des relations conjugales. Donne de la baraka (bénédiction) dans chaque action entreprise."},
  { ar:"حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", ph:"Ḥasbunā llāhu wa-niʿma l-wakīl", fr:"Allah nous suffit et quel excellent garant Il est !", count:"En cas d'angoisse ou de peur",
    benefits:"Formule prononcée par Ibrahim ﷺ jeté dans le feu, et par Muhammad ﷺ face aux ennemis. Allah répondit : 'Il leur suffit.' Protection totale dans les épreuves."},
  { ar:"رَبِّ اشْرَحْ لِي صَدْرِي", ph:"Rabbi shraḥ lī ṣadrī", fr:"Seigneur, dilate ma poitrine", count:"En cas de difficulté",
    benefits:"Invocation de Mûsâ ﷺ avant de parler à Pharaon. Demande à Allah d'ouvrir le cœur, de faciliter les paroles et de donner la confiance dans les moments d'épreuve."},
  { ar:"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", ph:"Rabbanā ātinā fi d-dunyā ḥasanatan wa-fi l-āḫirati ḥasanatan wa-qinā ʿaḏāba n-nār", fr:"Seigneur, accorde-nous le bien ici-bas et dans l'au-delà, et préserve-nous du châtiment du Feu", count:"Après chaque prière",
    benefits:"L'invocation que le Prophète ﷺ faisait le plus souvent. Elle englobe tous les biens de cette vie et de l'au-delà en une seule formule. La plus complète du Coran (v. 2:201)."},
  { ar:"أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", ph:"Aʿūḏu billāhi mina š-šayṭāni r-rajīm", fr:"Je cherche protection en Allah contre le diable maudit", count:"En cas de colère ou de tentation",
    benefits:"Arme contre la colère et les tentations du diable. Le Prophète ﷺ a dit : si une personne en colère dit cette formule, sa colère s'éteint immédiatement."},
];

const DOUA_GENERAL = [
  { ar:"اللَّهُمَّ إِنِّي أَسْأَلُكَ بِأَنِّي أَشْهَدُ أَنَّكَ أَنْتَ اللَّهُ لَا إِلَٰهَ إِلَّا أَنْتَ الْأَحَدُ الصَّمَدُ الَّذِي لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
    ph:"Allāhumma innī asʾaluka bi-annī ašhadu annaka anta llāh, lā ilāha illā anta, al-Aḥadu ṣ-Ṣamad, allaḏī lam yalid wa-lam yūlad, wa-lam yakun lahu kufuwan aḥad",
    fr:"Ô Allah, je Te demande en attestant que c'est Toi Allah ; il n'y a de divinité que Toi, l'Unique, l'Absolu (Celui dont tout dépend), Celui qui n'a pas engendré et n'a pas été engendré, et nul n'est égal à Lui",
    context:"Invocation par le Nom Suprême d'Allah (Ism al-Aʿẓam)",
    benefits:"Le Messager d'Allah ﷺ a dit : « Il a invoqué Allah par Son Nom le Plus Grand, celui par lequel, lorsqu'on Lui demande, Il accorde, et lorsqu'on L'invoque, Il répond. » (Tirmidhi, Abou Dawoud — authentique)"},

  { ar:"حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    ph:"Ḥasbunā llāhu wa-niʿma l-wakīl",
    fr:"Allah nous suffit et c'est le meilleur des garants",
    context:"Invocation d'Ibrahim ﷺ jeté dans le feu, puis du Prophète ﷺ face aux ennemis",
    benefits:"Ibrahim ﷺ l'a prononcée jeté dans le feu : Allah a transformé le feu en fraîcheur. Le Prophète ﷺ l'a dite quand on lui annonça que les ennemis se rassemblaient contre lui — Allah les a retenus. Formule de confiance totale (tawakkul) dans les moments de peur ou de danger."},

  { ar:"اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    ph:"Allāhumma anta rabbī, lā ilāha illā anta, ḫalaqtanī wa-anā ʿabduka, wa-anā ʿalā ʿahdika wa-waʿdika mā staṭaʿtu, aʿūḏu bika min šarri mā ṣanaʿtu, abūʾu laka bi-niʿmatika ʿalayya, wa-abūʾu bi-ḏanbī, fa-ġfir lī fa-innahu lā yaġfiru ḏ-ḏunūba illā anta",
    fr:"Seigneur Allah, Tu es mon Seigneur. Il n'y a de dieu que Toi. Tu m'as créé et je suis Ton serviteur. Je me conforme autant que je peux à mon engagement et à ma promesse envers Toi. Je me mets sous Ta protection contre le mal de ce que j'ai fait. Je reconnais Ton bienfait à mon égard. Je reconnais mon péché. Pardonne-moi car il n'y a que Toi qui pardonnes les péchés",
    context:"Sayyid al-Istighfār — Le Maître des demandes de pardon",
    benefits:"Le Prophète ﷺ a dit : « Celui qui la dit le jour avec certitude et meurt avant le soir, ou la dit la nuit avec certitude et meurt avant le matin, entrera au Paradis. » (Bukhari)"},

  { ar:"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ",
    ph:"Allāhumma innī asʾaluka l-jannah",
    fr:"Ô Allah, accorde-moi le Paradis",
    context:"Invocation concise pour demander le Paradis",
    benefits:"Le Prophète ﷺ a dit : « Celui qui demande le Paradis trois fois, le Paradis dit : ‹ Ô Allah, fais-le entrer au Paradis. › » À dire surtout après les prières et le vendredi."},

  { ar:"اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
    ph:"Allāhumma ajirnī mina n-nār",
    fr:"Ô Allah, préserve-moi du Feu de l'Enfer",
    context:"Protection contre l'Enfer — à coupler avec la demande du Paradis",
    benefits:"Le Prophète ﷺ a dit : « Celui qui demande protection contre l'Enfer trois fois, l'Enfer dit : ‹ Ô Allah, protège-le de moi. › » À dire matin et soir, et après chaque prière."},

  { ar:"اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    ph:"Allāhumma innaka ʿafuwwun tuḥibbu l-ʿafwa fa-ʿfu ʿannī",
    fr:"Ô Allah, Tu es Celui qui pardonne, Tu aimes pardonner, alors pardonne-moi",
    context:"Duʿāʾ enseigné par le Prophète ﷺ à Aïcha (RA) pour Laylat al-Qadr",
    benefits:"Aïcha (RA) demanda au Prophète ﷺ ce qu'elle devait dire si elle trouvait la Nuit du Destin — il lui enseigna cette invocation (Tirmidhi, authentique). Essentielle durant les 10 dernières nuits du Ramadan."},

  { ar:"رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    ph:"Rabbi rḥamhumā kamā rabbayānī ṣaġīrā",
    fr:"Seigneur, fais-leur miséricorde (à mes parents) comme ils m'ont élevé tout petit",
    context:"Verset coranique (Sourate Al-Isrāʾ 17:24) — Allah ordonne cette invocation pour les parents",
    benefits:"Doua parfaite pour les parents, vivants ou décédés. Allah associe Son droit à celui des parents. À dire quotidiennement, surtout après les prières obligatoires."},

  { ar:"رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
    ph:"Rabbanā ġfir lī wa-li-wālidayya wa-lil-muʾminīna yawma yaqūmu l-ḥisāb",
    fr:"Notre Seigneur, pardonne-moi ainsi qu'à mes parents et aux croyants, le Jour où se dressera le Jugement",
    context:"Verset coranique (Sourate Ibrāhīm 14:41) — invocation du prophète Ibrahim ﷺ",
    benefits:"Englobe soi-même, ses parents et toute la communauté musulmane. Chaque croyant qui la récite reçoit une bonne action pour chaque croyant et croyante (selon certains savants)."},

  { ar:"اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    ph:"Allāhumma aʿinnī ʿalā ḏikrika wa-šukrika wa-ḥusni ʿibādatik",
    fr:"Ô Allah, aide-moi à T'invoquer, à Te remercier et à T'adorer de la meilleure manière",
    context:"Duʿāʾ enseigné par le Prophète ﷺ à Muʿāḏ ibn Jabal (RA)",
    benefits:"Le Prophète ﷺ prit la main de Muʿāḏ et lui dit : « Par Allah, je t'aime » puis lui apprit cette invocation à dire après chaque prière (Abou Dawoud, authentique). Couvre les 3 dimensions : dhikr, shukr, ʿibāda."},

  { ar:"اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
    ph:"Allāhumma jʿalnī mina t-tawwābīna wa-jʿalnī mina l-mutaṭahhirīn",
    fr:"Ô Allah, place-moi parmi ceux qui se repentent et parmi ceux qui se purifient",
    context:"À réciter après le woudou (ablutions)",
    benefits:"Le Prophète ﷺ a dit : « Les huit portes du Paradis s'ouvrent pour celui qui fait ses ablutions correctement puis prononce cette invocation — il entrera par celle qu'il voudra. » (Muslim)"},

  { ar:"أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ",
    ph:"Astaġfiru llāha l-ʿaẓīma llaḏī lā ilāha illā huwa, al-Ḥayya l-Qayyūm, wa-atūbu ilayh",
    fr:"Je demande pardon à Allah le Très Grand, Celui en dehors duquel il n'y a pas d'autre divinité, le Vivant, le Subsistant, et je me repens à Lui",
    context:"Istighfār complet enseigné par le Prophète ﷺ",
    benefits:"Le Prophète ﷺ a dit : « Celui qui dit cette formule, ses péchés sont pardonnés même s'il avait fui le champ de bataille. » (Abou Dawoud, Tirmidhi — authentique)"},

  { ar:"رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    ph:"Rabbanā ẓalamnā anfusanā wa-in lam taġfir lanā wa-tarḥamnā lanakūnanna mina l-ḫāsirīn",
    fr:"Notre Seigneur, nous nous sommes fait du tort à nous-mêmes. Si Tu ne nous pardonnes pas et ne nous fais pas miséricorde, nous serons très certainement du nombre des perdants",
    context:"Verset coranique (Sourate Al-Aʿrāf 7:23) — duʿāʾ d'Adam et Hawa après avoir mangé de l'arbre",
    benefits:"La doua qui a été la cause du pardon d'Adam ﷺ. Formule parfaite de repentir : reconnaissance de la faute, aveu de dépendance à Allah, peur sincère de la perdition."},

  { ar:"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ وَمِنْ عَذَابِ جَهَنَّمَ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
    ph:"Allāhumma innī aʿūḏu bika min ʿaḏābi l-qabri wa-min ʿaḏābi jahannam, wa-min fitnati l-maḥyā wa-l-mamāt, wa-min šarri fitnati l-masīḥi d-dajjāl",
    fr:"Ô Allah, je cherche Ta protection contre le châtiment de la tombe, contre le châtiment de l'Enfer, contre les épreuves de la vie et de la mort, et contre le mal de l'épreuve du faux messie (Dajjal)",
    context:"Duʿāʾ à réciter dans le dernier tashahhud de chaque prière, avant le salam",
    benefits:"Le Prophète ﷺ ordonnait cette invocation : « Quand l'un de vous termine le dernier tashahhud, qu'il cherche refuge en Allah contre quatre choses… » (Muslim). Quatre protections majeures en une seule formule."},

  { ar:"اللَّهُمَّ اغْفِرْ لِلْمُسْلِمِينَ وَالْمُسْلِمَاتِ وَالْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ الْأَحْيَاءِ مِنْهُمْ وَالْأَمْوَاتِ",
    ph:"Allāhumma ġfir lil-muslimīna wa-l-muslimāti, wa-l-muʾminīna wa-l-muʾmināti, al-aḥyāʾi minhum wa-l-amwāt",
    fr:"Ô Allah, pardonne aux musulmans et musulmanes, ainsi qu'aux croyants et croyantes, les vivants d'entre eux comme les morts",
    context:"Invocation collective pour toute la communauté",
    benefits:"Selon certains savants, celui qui invoque pour chaque croyant et croyante reçoit une bonne action pour chacun d'entre eux. Doua majeure pour nourrir la fraternité musulmane."},

  { ar:"اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ، دِقَّهُ وَجِلَّهُ، وَأَوَّلَهُ وَآخِرَهُ، وَعَلَانِيَتَهُ وَسِرَّهُ",
    ph:"Allāhumma ġfir lī ḏanbī kullahu, diqqahu wa-jillahu, wa-awwalahu wa-āḫirahu, wa-ʿalāniyatahu wa-sirrahu",
    fr:"Ô Allah, pardonne-moi tous mes péchés, les petits et les grands, les premiers et les derniers, ceux commis en public et ceux commis en secret",
    context:"Invocation du Prophète ﷺ dans la prosternation (sujud)",
    benefits:"Couvre absolument tous les types de péchés en une seule formule. Le sujud est le moment où le serviteur est le plus proche d'Allah — invocation recommandée à cet instant (Muslim)."},

  { ar:"اللَّهُمَّ تَقَبَّلْ مِنَّا صِيَامَنَا وَقِيَامَنَا وَصَلَاتَنَا وَأَذْكَارَنَا وَدُعَاءَنَا وَقِرَاءَتَنَا لِلْقُرْآنِ وَلَا تَرُدَّهَا فِي وُجُوهِنَا يَوْمَ الْقِيَامَةِ",
    ph:"Allāhumma taqabbal minnā ṣiyāmanā wa-qiyāmanā wa-ṣalātanā wa-aḏkāranā wa-duʿāʾanā wa-qirāʾatanā lil-qurʾān, wa-lā taruddahā fī wujūhinā yawma l-qiyāmah",
    fr:"Ô Allah, accepte de nous notre jeûne, notre prière nocturne, notre prière, nos évocations, nos invocations et notre récitation du Coran, et ne nous les rejette pas au visage le Jour de la Résurrection",
    context:"Invocation pour l'acceptation des actes d'adoration, particulièrement après le Ramadan",
    benefits:"L'acceptation (qabūl) est plus importante que l'accomplissement lui-même. Les pieux prédécesseurs priaient 6 mois pour que leur Ramadan soit accepté. À utiliser toute l'année pour chaque ibada."},
];

const DOUA_PROPHETS = [
  { prophet:"Ādam ﷺ",
    ar:"رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    ph:"Rabbanā ẓalamnā anfusanā wa-in lam taġfir lanā wa-tarḥamnā lanakūnanna mina l-ḫāsirīn",
    fr:"Seigneur, nous nous sommes fait du tort à nous-mêmes. Si Tu ne nous pardonnes pas et ne nous fais pas miséricorde, nous serons très certainement du nombre des perdants",
    ref:"Sourate Al-Aʿrāf 7:23",
    context:"Adam ﷺ et Hawa après avoir mangé du fruit de l'arbre interdit au Paradis. Ils n'ont pas accusé Shayṭān ni cherché d'excuse, mais ont immédiatement reconnu leur faute.",
    benefits:"La doua parfaite du repentir : aveu complet de la faute, reconnaissance que seul Allah peut pardonner, peur sincère. Elle a été la cause du pardon d'Adam ﷺ. À utiliser après tout péché."},

  { prophet:"Nūḥ (Noé) ﷺ",
    ar:"رَبِّ إِنِّي أَعُوذُ بِكَ أَنْ أَسْأَلَكَ مَا لَيْسَ لِي بِهِ عِلْمٌ وَإِلَّا تَغْفِرْ لِي وَتَرْحَمْنِي أَكُنْ مِنَ الْخَاسِرِينَ",
    ph:"Rabbi innī aʿūḏu bika an asʾaluka mā laysa lī bihi ʿilm, wa-illā taġfir lī wa-tarḥamnī akun mina l-ḫāsirīn",
    fr:"Seigneur, je cherche Ta protection contre toute demande d'une chose dont je n'ai aucune connaissance. Et si Tu ne me pardonnes pas et ne me fais pas miséricorde, je serai au nombre des perdants",
    ref:"Sourate Hūd 11:47",
    context:"Nouh ﷺ après avoir demandé à Allah de sauver son fils mécréant du déluge. Allah lui a rappelé que son fils n'était pas de sa vraie famille en foi.",
    benefits:"Nous apprend l'humilité face à notre ignorance. Protection contre les invocations précipitées ou mal pensées. À dire avant toute demande importante pour qu'Allah nous guide vers ce qui est vraiment bien."},

  { prophet:"Ibrāhīm (Abraham) ﷺ",
    ar:"رَبِّ هَبْ لِي حُكْمًا وَأَلْحِقْنِي بِالصَّالِحِينَ، وَاجْعَل لِّي لِسَانَ صِدْقٍ فِي الْآخِرِينَ",
    ph:"Rabbi hab lī ḥukman wa-alḥiqnī bi-ṣ-ṣāliḥīn, wa-jʿal lī lisāna ṣidqin fi l-āḫirīn",
    fr:"Seigneur, accorde-moi sagesse et fais-moi rejoindre les vertueux. Fais que j'aie une mention honorable dans la postérité",
    ref:"Sourate Ash-Shuʿarāʾ 26:83-84",
    context:"Ibrahim ﷺ, après avoir rejeté les idoles de son peuple, implore Allah pour la sagesse et une mémoire vertueuse parmi les générations futures.",
    benefits:"Doua pour être guidé dans le savoir et les décisions (ḥukm), pour la compagnie des pieux, et pour laisser une trace bénéfique après sa mort. Allah a exaucé : toutes les religions monothéistes honorent Ibrahim ﷺ."},

  { prophet:"Ibrāhīm & Ismāʿīl ﷺ",
    ar:"رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
    ph:"Rabbanā taqabbal minnā, innaka anta s-samīʿu l-ʿalīm",
    fr:"Notre Seigneur, accepte ceci de notre part ! Car c'est Toi l'Audient, l'Omniscient",
    ref:"Sourate Al-Baqara 2:127",
    context:"Prononcée par Ibrahim ﷺ et son fils Ismāʿīl ﷺ pendant qu'ils construisaient les fondations de la Kaaba à La Mecque.",
    benefits:"Doua essentielle à dire après toute ʿibāda : prière, jeûne, aumône, récitation. Même les plus grands prophètes, en accomplissant l'œuvre la plus noble (bâtir la Maison d'Allah), craignaient que leur acte ne soit pas accepté."},

  { prophet:"Yūsuf (Joseph) ﷺ",
    ar:"فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ أَنتَ وَلِيِّي فِي الدُّنْيَا وَالْآخِرَةِ ۖ تَوَفَّنِي مُسْلِمًا وَأَلْحِقْنِي بِالصَّالِحِينَ",
    ph:"Fāṭira s-samāwāti wa-l-arḍ, anta waliyyī fī d-dunyā wa-l-āḫirah, tawaffanī musliman wa-alḥiqnī bi-ṣ-ṣāliḥīn",
    fr:"Ô Créateur des cieux et de la terre, Tu es mon protecteur, ici-bas et dans l'au-delà. Fais-moi mourir en parfaite soumission et fais-moi rejoindre les vertueux",
    ref:"Sourate Yūsuf 12:101",
    context:"Yusuf ﷺ après avoir retrouvé ses parents et ses frères en Égypte, devenu ministre au sommet de la gloire. Au lieu de jouir de son triomphe, il demande une bonne fin.",
    benefits:"Doua pour mourir musulman. Leçon capitale : c'est au moment du succès qu'il faut le plus craindre de s'éloigner d'Allah. À faire quand on est comblé, pour ne jamais oublier que la vraie réussite est la bonne fin (ḥusn al-ḫātima)."},

  { prophet:"Mūsā (Moïse) ﷺ",
    ar:"رَبِّ اشْرَحْ لِي صَدْرِي، وَيَسِّرْ لِي أَمْرِي، وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي، يَفْقَهُوا قَوْلِي",
    ph:"Rabbi šraḥ lī ṣadrī, wa-yassir lī amrī, wa-ḥlul ʿuqdatan min lisānī, yafqahū qawlī",
    fr:"Seigneur, dilate ma poitrine, facilite-moi ma tâche, dénoue un nœud en ma langue, afin qu'ils comprennent mes paroles",
    ref:"Sourate Ṭā-Hā 20:25-28",
    context:"Mūsā ﷺ juste avant d'aller affronter Pharaon pour lui transmettre le message d'Allah, alors qu'il redoutait son éloquence défaillante et l'ampleur de la mission.",
    benefits:"La doua ultime avant toute tâche difficile : un examen, un entretien, un discours, une confrontation, une conversation délicate. Quatre demandes en une : courage intérieur, facilité, éloquence, compréhension par l'auditoire."},

  { prophet:"Mūsā ﷺ",
    ar:"رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
    ph:"Rabbi innī limā anzalta ilayya min ḫayrin faqīr",
    fr:"Seigneur, j'ai grand besoin du bien que Tu feras descendre vers moi",
    ref:"Sourate Al-Qaṣaṣ 28:24",
    context:"Mūsā ﷺ, après avoir fui l'Égypte, arrive à Madyan épuisé, affamé et sans abri. Il aide deux jeunes femmes à abreuver leur troupeau, puis se retire à l'ombre d'un arbre et prononce cette doua.",
    benefits:"Puissante invocation pour le rizq (subsistance). Dans les heures qui suivirent, Allah lui accorda un foyer, un travail et une épouse vertueuse. À dire dans toute situation de besoin matériel ou spirituel."},

  { prophet:"Ayyūb (Job) ﷺ",
    ar:"أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ",
    ph:"Annī massaniya ḍ-ḍurru wa-anta arḥamu r-rāḥimīn",
    fr:"Le malheur m'a touché. Mais Toi, Tu es le plus miséricordieux des miséricordieux",
    ref:"Sourate Al-Anbiyāʾ 21:83",
    context:"Après des années de maladie sévère, la perte de ses enfants et de toute sa richesse, Ayyūb ﷺ ne se plaint pas directement — il mentionne son état et rappelle la miséricorde d'Allah avec une pudeur exemplaire.",
    benefits:"Modèle absolu de patience (ṣabr) dans l'épreuve. Allah répondit immédiatement : Il guérit Ayyūb et lui rendit famille et biens. À réciter pendant la maladie, la douleur ou toute détresse prolongée."},

  { prophet:"Yūnus (Jonas) ﷺ",
    ar:"لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
    ph:"Lā ilāha illā anta subḥānaka innī kuntu mina ẓ-ẓālimīn",
    fr:"Il n'y a de divinité que Toi. Gloire à Toi ! J'ai été vraiment du nombre des injustes",
    ref:"Sourate Al-Anbiyāʾ 21:87",
    context:"Yūnus ﷺ dans le ventre de la baleine, dans trois ténèbres (celles de la nuit, de la mer et du ventre de la baleine), après avoir quitté son peuple sans la permission d'Allah.",
    benefits:"Le Prophète ﷺ a dit : « Aucun musulman n'invoque Allah avec cette doua pour quoi que ce soit sans qu'Allah lui réponde. » (Tirmidhi — authentique). La doua miracle pour sortir de toute détresse extrême."},

  { prophet:"Zakariyyā ﷺ",
    ar:"رَبِّ لَا تَذَرْنِي فَرْدًا وَأَنتَ خَيْرُ الْوَارِثِينَ",
    ph:"Rabbi lā taḏarnī fardan wa-anta ḫayru l-wāriṯīn",
    fr:"Seigneur, ne me laisse pas seul, Tu es le meilleur des héritiers",
    ref:"Sourate Al-Anbiyāʾ 21:89",
    context:"Zakariyyā ﷺ, âgé et sans enfant, son épouse stérile, craint que personne ne poursuive la mission prophétique après lui. Il invoque Allah en secret dans le mihrab.",
    benefits:"Doua exaucée : Allah lui donna Yaḥyā (Jean-Baptiste) ﷺ. Invocation puissante pour obtenir une descendance vertueuse, pour les couples qui attendent un enfant, ou pour ceux qui se sentent seuls dans leur mission."},

  { prophet:"Zakariyyā ﷺ",
    ar:"رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ الدُّعَاءِ",
    ph:"Rabbi hab lī min ladunka ḏurriyyatan ṭayyibah, innaka samīʿu d-duʿāʾ",
    fr:"Seigneur, accorde-moi, venant de Toi, une descendance pure ! Certes, Tu entends bien les invocations",
    ref:"Sourate Āl ʿImrān 3:38",
    context:"Zakariyyā ﷺ, voyant la piété exceptionnelle de Maryam (la mère de ʿĪsā) dans son mihrab, fut inspiré à demander une descendance vertueuse.",
    benefits:"Doua pour une descendance pure et pieuse (ḏurriyyatan ṭayyibah). Demande non seulement des enfants, mais des enfants bons. Essentielle pour tout parent ou futur parent."},

  { prophet:"Sulaymān (Salomon) ﷺ",
    ar:"رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ",
    ph:"Rabbi awziʿnī an aškura niʿmataka llatī anʿamta ʿalayya wa-ʿalā wālidayya wa-an aʿmala ṣāliḥan tarḍāhu wa-adḫilnī bi-raḥmatika fī ʿibādika ṣ-ṣāliḥīn",
    fr:"Seigneur, permets-moi de rendre grâce pour le bienfait dont Tu m'as comblé ainsi que mes parents, et que je fasse une bonne œuvre que Tu agrées. Fais-moi entrer, par Ta miséricorde, parmi Tes serviteurs vertueux",
    ref:"Sourate An-Naml 27:19",
    context:"Sulaymān ﷺ, à qui Allah avait donné un royaume sans pareil, entendit une fourmi prévenir les siennes de la venue de son armée. Il sourit de cette sagesse miniature et invoqua Allah.",
    benefits:"Doua complète pour la reconnaissance (shukr) : pour soi, pour ses parents, et pour agir selon l'agrément divin. À réciter chaque fois qu'on reçoit un bienfait, petit ou grand, pour ne jamais tomber dans l'ingratitude."},

  { prophet:"ʿĪsā (Jésus) ﷺ",
    ar:"اللَّهُمَّ رَبَّنَا أَنزِلْ عَلَيْنَا مَائِدَةً مِّنَ السَّمَاءِ تَكُونُ لَنَا عِيدًا لِّأَوَّلِنَا وَآخِرِنَا وَآيَةً مِّنكَ ۖ وَارْزُقْنَا وَأَنتَ خَيْرُ الرَّازِقِينَ",
    ph:"Allāhumma rabbanā anzil ʿalaynā māʾidatan mina s-samāʾi takūnu lanā ʿīdan li-awwalinā wa-āḫirinā wa-āyatan minka, wa-rzuqnā wa-anta ḫayru r-rāziqīn",
    fr:"Ô Allah, notre Seigneur, fais descendre du ciel sur nous une table servie qui soit une fête pour nous — pour le premier et le dernier d'entre nous — ainsi qu'un signe de Ta part. Nourris-nous : Tu es le meilleur des pourvoyeurs",
    ref:"Sourate Al-Māʾida 5:114",
    context:"ʿĪsā ﷺ invoque Allah à la demande de ses apôtres qui souhaitaient voir un signe et manger à une table descendue du ciel pour renforcer leur foi.",
    benefits:"C'est d'ailleurs de cette invocation que la sourate tire son nom (Al-Māʾida = La Table). Doua pour le rizq béni, la subsistance abondante, et les réunions de famille ou communautaires bénies."},

  { prophet:"Muḥammad ﷺ",
    ar:"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
    ph:"Allāhumma innī aʿūḏu bika mina l-hammi wa-l-ḥazan, wa-l-ʿajzi wa-l-kasal, wa-l-buḫli wa-l-jubn, wa-ḍalaʿi d-dayni wa-ġalabati r-rijāl",
    fr:"Ô Allah, je cherche Ta protection contre le souci et la tristesse, contre l'incapacité et la paresse, contre l'avarice et la lâcheté, contre l'accablement des dettes et l'oppression des hommes",
    ref:"Bukhari",
    context:"Invocation que le Prophète ﷺ répétait fréquemment, à faire matin et soir.",
    benefits:"Protection contre 8 maux qui détruisent la vie du croyant : 2 mentaux (souci, tristesse), 2 comportementaux (incapacité, paresse), 2 moraux (avarice, lâcheté) et 2 sociaux (dettes, oppression). La formule la plus complète de protection psycho-sociale."},

  { prophet:"Muḥammad ﷺ",
    ar:"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
    ph:"Allāhumma innī asʾaluka l-hudā wa-t-tuqā wa-l-ʿafāfa wa-l-ġinā",
    fr:"Ô Allah, je Te demande la guidance, la piété, la chasteté et la richesse (du cœur et des moyens)",
    ref:"Muslim",
    context:"Invocation enseignée par le Prophète ﷺ — quatre demandes essentielles en une seule formule courte.",
    benefits:"Quatre trésors combinés : hudā (la guidance dans les choix), tuqā (la conscience d'Allah dans l'action), ʿafāf (la retenue face aux désirs illicites) et ġinā (l'indépendance financière et la richesse du cœur)."},
];

const COURSES = [
  { level:"Fondements", emoji:"🌱", color:"#4ecca3",
    chapters:[
      { title:"L'Islam : définition et piliers", content:[
        "Islam signifie 'soumission à Allah' et 'paix'. Il est la religion de tous les prophètes depuis Adam ﷺ.",
        "Les 5 piliers : Shahada (témoignage de foi), Salat (prière 5x/j), Zakat (aumône annuelle), Sawm (jeûne du Ramadan), Hajj (pèlerinage).",
        "Les 6 piliers de la foi (Iman) : croire en Allah, les anges, les Livres, les Prophètes, le Jour Dernier, le Destin (bon et mauvais).",
        "L'Islam, l'Iman et l'Ihsân forment les 3 dimensions de la religion (Hadith de Jibrîl ﷺ).",
      ]},
      { title:"La Shahada : témoignage de foi", content:[
        "لَا إِلَٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ — Lā ilāha illā llāhu Muḥammadun rasūlu llāh",
        "Traduction : 'Il n'y a de dieu qu'Allah et Muhammad ﷺ est Son Messager.'",
        "Conditions : conviction du cœur (Tasdiq), déclaration de la langue, action des membres. Les 3 doivent être réunis.",
        "Deux composantes : Tawhid (l'unicité d'Allah) et Risala (la prophétie de Muhammad ﷺ).",
      ]},
      { title:"La Prière (Salat)", content:[
        "5 prières obligatoires : Fajr (2 rakaat), Dhuhr (4), Asr (4), Maghrib (3), Isha (4).",
        "Conditions : pureté rituelle (wudhu), direction de la Qibla (La Mecque), vêtements couvrants, être dans le temps de la prière.",
        "Structure : Niyya (intention) → Takbir → récitation Fatiha → Rukuʿ (inclination) → Sujud (prosternation) × 2 → Tashahhud → Salam.",
        "'La prière est le pilier de la religion. Celui qui l'établit établit la religion, et celui qui l'abandonne démantèle la religion.' (Hadith)",
      ]},
      { title:"La Purification (Tahara)", content:[
        "La pureté est essentielle : 'La purification est la moitié de la foi' (Hadith Muslim).",
        "Wudhu (ablutions mineures) : intention → bismillah → mains → bouche → nez → visage → bras → tête → oreilles → pieds.",
        "Ghusl (bain rituel) : obligatoire après la junub (impureté majeure), les règles, l'accouchement, l'entrée en Islam.",
        "Tayammum : ablution sèche avec de la terre pure — permise quand l'eau est inaccessible ou la maladie l'interdit.",
      ]},
    ]},
  { level:"Pratique", emoji:"🌿", color:"#c9a84c",
    chapters:[
      { title:"Le Coran : nature et relation", content:[
        "Le Coran est la parole d'Allah révélée à Muhammad ﷺ en arabe sur 23 ans par l'ange Jibrîl. Il est inimitable (Iʿjāz).",
        "114 sourates, 6236 versets, classés de la plus longue à la plus courte (sauf Al-Fatiha, placée en tête).",
        "Réciter le Coran est une ibada. Chaque lettre vaut 10 récompenses. Le Prophet ﷺ dit : 'Le meilleur d'entre vous est celui qui apprend le Coran et l'enseigne.'",
        "Étapes recommandées : écouter → mémoriser Al-Fatiha → apprendre les sourates courtes → étudier le Tajwid (règles de récitation).",
      ]},
      { title:"Le Ramadan et le Jeûne", content:[
        "Le jeûne du Ramadan est obligatoire pour tout musulman adulte et sain dès la puberté. Il commence au croissant de lune.",
        "De l'aube (Fajr) au coucher du soleil (Maghrib) : abstention de nourriture, boisson et relations conjugales.",
        "Nuit du Destin (Laylat al-Qadr) : meilleure que 1000 mois. À chercher dans les 10 dernières nuits impaires du Ramadan.",
        "Bienfaits : purification de l'âme, empathie avec les pauvres, renforcement de la taqwa (piété), resserrement des liens communautaires.",
      ]},
      { title:"Les Bonnes Mœurs (Akhlaq)", content:[
        "Le Prophète ﷺ a dit : 'J'ai été envoyé pour parfaire les bonnes mœurs.' L'éthique est au cœur de l'islam.",
        "Vertus fondamentales : honnêteté (Sidq), générosité (Karam), patience (Sabr), gratitude (Shukr), pudeur (Hayāʾ).",
        "Les droits : droits d'Allah (ibada), droits des parents (birr), droits du voisin, droits du musulman (6 droits du frère).",
        "L'islam est une religion de miséricorde (Rahma) — envers les humains, les animaux et l'environnement naturel.",
      ]},
      { title:"Le Halal et le Haram", content:[
        "Halal : tout ce qui est permis. Haram : tout ce qui est interdit. Entre les deux : Makruh (déconseillé) et Mubah (neutre).",
        "Aliments haram : porc, sang, alcool, animaux morts sans abattage islamique, animaux dédiés à d'autres qu'Allah.",
        "Principe général : tout est halal sauf ce qui est explicitement interdit dans le Coran ou la Sunna authentique.",
        "Règle de la nécessité (Darura) : le haram devient permis en cas de contrainte extrême préservant la vie.",
      ]},
    ]},
  { level:"Approfondissement", emoji:"🌳", color:"#6e5fa6",
    chapters:[
      { title:"La Sira : Vie du Prophète ﷺ", content:[
        "Muhammad ﷺ est né à La Mecque en 570 EC (Année de l'Éléphant), orphelin de père avant la naissance et de mère à 6 ans.",
        "Première révélation à 40 ans dans la grotte de Hira : 'Lis au nom de ton Seigneur qui a créé' (Alaq : 1-5).",
        "Hégire (622 EC) : migration vers Médine — acte fondateur du calendrier islamique (année 1 de l'Hégire).",
        "Décès à 63 ans (632 EC) après la révélation : 'Aujourd'hui j'ai parachevé votre religion pour vous' (Maida : 3).",
      ]},
      { title:"L'Aqida : les fondements de la foi", content:[
        "Tawhid : l'unicité d'Allah est la base de tout l'islam. Il est Un en essence, attributs et actes d'adoration.",
        "3 types de Tawhid : Rububiyya (seigneurie), Uluhiyya (adoration exclusive), Asma wa Sifat (noms et attributs divins).",
        "Shirk (association) : le plus grand péché, le seul que Allah ne pardonne pas si on meurt sans s'en repentir (Coran 4:48).",
        "Les 4 règles (Ibn Abd al-Wahhab) : savoir qui est Allah → savoir ce qu'Il exige → accomplir → inviter les autres avec sagesse.",
      ]},
      { title:"Le Jour Dernier (Yawm al-Qiyama)", content:[
        "Étapes : mort → tombe (Barzakh) → résurrection → rassemblement → jugement → balance (Mizan) → Pont (Sirat) → Paradis ou Enfer.",
        "Signes mineurs (100+) : disparition de la connaissance religieuse, multiplication des péchés, guerres, tremblements de terre...",
        "Signes majeurs (10) : Dajjal, Descente d'Isa ﷺ, Yajouj et Majouj, lever du soleil à l'Ouest, la Bête, et autres...",
        "Le croyant prépare ce Jour par les bonnes actions, le repentir sincère et la purification constante du cœur.",
      ]},
      { title:"La Spiritualité (Tazkiyya)", content:[
        "Tazkiyya : purification de l'âme. Troisième dimension de la religion après l'Islam extérieur et l'Iman intérieur.",
        "Maladies du cœur : orgueil (Kibr), envie (Hasad), avidité (Tama'), hypocrisie (Nifaq), attachement au monde (Hubb ad-Dunya).",
        "Remèdes : dhikr constant, lecture du Coran avec tadabbur (réflexion), bonnes compagnies, service des autres, jeûnes volontaires.",
        "L'objectif final : l'Ihsân — 'Adore Allah comme si tu Le voyais, car si tu ne Le vois pas, Lui te voit.' (Hadith de Jibrîl)",
      ]},
    ]},
];

export default function App() {
  const [tab, setTab] = useState(0);
  const [surah, setSurah] = useState(null);
  const [done, setDone] = useState({});
  const [search, setSearch] = useState("");
  const [expName, setExpName] = useState(null);
  const [expDhikr, setExpDhikr] = useState(null);
  const [lvl, setLvl] = useState(0);
  const [expCh, setExpCh] = useState(null);
  const [douaSub, setDouaSub] = useState(0);
  const [expDouaG, setExpDouaG] = useState(null);
  const [expDouaP, setExpDouaP] = useState(null);

  const toggle = k => setDone(p => ({ ...p, [k]: !p[k] }));
  const filtered = NAMES.filter(n =>
    n[0].includes(search) || n[1].toLowerCase().includes(search.toLowerCase()) || n[2].toLowerCase().includes(search.toLowerCase())
  );
  const TABS = ["📖 Cours","🕌 Sourates","✨ 99 Noms","📿 Dhikr","🤲 Doua"];

  return (
    <div style={{minHeight:"100vh",background:"#0f1117",color:"#e8e6df",fontFamily:"system-ui,sans-serif"}}>
      {/* HEADER */}
      <div style={{background:"#1a1d27",borderBottom:"1px solid #2a2d3e",padding:"14px 16px",position:"sticky",top:0,zIndex:10}}>
        <div style={{textAlign:"center",marginBottom:12}}>
          <div style={{fontSize:26,color:"#c9a84c",fontWeight:700,fontFamily:"serif"}}>☪ تعلّم الإسلام</div>
          <div style={{fontSize:11,color:"#8b8fa8",marginTop:2}}>Guide d'apprentissage personnel</div>
        </div>
        <div style={{display:"flex",gap:4}}>
          {TABS.map((t,i)=>(
            <button key={i} onClick={()=>{setTab(i);setSurah(null);}} style={{
              flex:1,padding:"7px 2px",borderRadius:8,border:"none",cursor:"pointer",fontSize:10.5,fontWeight:600,
              background:tab===i?"#c9a84c":"#2a2d3e",color:tab===i?"#0f1117":"#8b8fa8"
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:700,margin:"0 auto",padding:"16px 14px"}}>

        {/* ─── COURS ─── */}
        {tab===0&&(
          <div>
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              {COURSES.map((c,i)=>(
                <button key={i} onClick={()=>{setLvl(i);setExpCh(null);}} style={{
                  flex:1,padding:"9px 4px",borderRadius:10,border:`2px solid ${lvl===i?c.color:"#2a2d3e"}`,
                  background:lvl===i?c.color+"22":"#1a1d27",color:lvl===i?c.color:"#8b8fa8",
                  cursor:"pointer",fontWeight:700,fontSize:12
                }}>{c.emoji}<br/>{c.level}</button>
              ))}
            </div>
            {(()=>{
              const tot=COURSES[lvl].chapters.length;
              const d=COURSES[lvl].chapters.filter((_,i)=>done[`${lvl}-${i}`]).length;
              return(
                <div style={{marginBottom:16}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#8b8fa8",marginBottom:5}}>
                    <span>Progression</span><span>{d}/{tot} chapitres lus</span>
                  </div>
                  <div style={{background:"#2a2d3e",borderRadius:8,height:5}}>
                    <div style={{width:`${Math.round(d/tot*100)}%`,background:COURSES[lvl].color,height:5,borderRadius:8,transition:"width .4s"}}/>
                  </div>
                </div>
              );
            })()}
            {COURSES[lvl].chapters.map((ch,i)=>(
              <div key={i} style={{background:"#1a1d27",borderRadius:12,marginBottom:10,border:`1px solid ${expCh===i?COURSES[lvl].color:"#2a2d3e"}`,overflow:"hidden"}}>
                <div onClick={()=>setExpCh(expCh===i?null:i)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 14px",cursor:"pointer"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div onClick={e=>{e.stopPropagation();toggle(`${lvl}-${i}`);}} style={{
                      width:22,height:22,borderRadius:"50%",border:`2px solid ${COURSES[lvl].color}`,
                      background:done[`${lvl}-${i}`]?COURSES[lvl].color:"transparent",
                      display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0
                    }}>{done[`${lvl}-${i}`]&&<span style={{color:"#0f1117",fontSize:11,fontWeight:900}}>✓</span>}</div>
                    <span style={{fontWeight:600,fontSize:13}}>{ch.title}</span>
                  </div>
                  <span style={{color:"#8b8fa8",fontSize:12}}>{expCh===i?"▲":"▼"}</span>
                </div>
                {expCh===i&&(
                  <div style={{padding:"0 14px 14px",borderTop:"1px solid #2a2d3e"}}>
                    {ch.content.map((pt,j)=>(
                      <div key={j} style={{display:"flex",gap:8,marginTop:10}}>
                        <span style={{color:COURSES[lvl].color,flexShrink:0,marginTop:3,fontSize:10}}>◆</span>
                        <p style={{margin:0,fontSize:13,lineHeight:1.65,color:"#c8c6c0"}}>{pt}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ─── SOURATES ─── */}
        {tab===1&&(
          <div>
            {!surah?(
              <>
                <p style={{color:"#8b8fa8",fontSize:13,marginBottom:14}}>15 sourates triées par difficulté. Commence par Al-Ikhlâs ou Al-Kawthar.</p>
                {SURAHS.map((s,i)=>(
                  <div key={i} onClick={()=>setSurah(i)} style={{
                    background:"#1a1d27",borderRadius:12,padding:"13px 14px",cursor:"pointer",
                    border:"1px solid #2a2d3e",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8
                  }}>
                    <div>
                      <div style={{fontWeight:700,fontSize:14}}>{s.name} <span style={{color:"#8b8fa8",fontSize:12}}>n°{s.num}</span></div>
                      <div style={{color:"#c9a84c",fontSize:20,marginTop:1,fontFamily:"serif"}}>{s.ar_name}</div>
                      <div style={{color:"#8b8fa8",fontSize:12,marginTop:2}}>{s.verses.length} versets</div>
                    </div>
                    <span style={{color:"#c9a84c",fontSize:22}}>›</span>
                  </div>
                ))}
              </>
            ):(
              <>
                <button onClick={()=>setSurah(null)} style={{background:"#2a2d3e",border:"none",color:"#c9a84c",padding:"7px 14px",borderRadius:8,cursor:"pointer",marginBottom:14,fontWeight:600,fontSize:13}}>← Retour</button>
                <div style={{background:"#1a1d27",borderRadius:14,padding:"18px 14px",marginBottom:14,textAlign:"center"}}>
                  <div style={{fontSize:30,color:"#c9a84c",fontFamily:"serif"}}>{SURAHS[surah].ar_name}</div>
                  <div style={{fontWeight:700,fontSize:18,marginTop:4}}>{SURAHS[surah].name}</div>
                  <div style={{color:"#8b8fa8",fontSize:12,marginTop:3}}>Sourate n°{SURAHS[surah].num} — {SURAHS[surah].verses.length} versets</div>
                  <div style={{background:"#2a2d3e22",border:"1px solid #c9a84c33",borderRadius:8,padding:"9px 12px",fontSize:12,color:"#c9a84c",marginTop:12,textAlign:"left"}}>💡 {SURAHS[surah].tip}</div>
                </div>
                {SURAHS[surah].verses.map((v,i)=>(
                  <div key={i} style={{background:"#1a1d27",borderRadius:12,padding:"14px",marginBottom:8,border:"1px solid #2a2d3e"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                      <div style={{width:26,height:26,borderRadius:"50%",background:"#c9a84c22",border:"1px solid #c9a84c55",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#c9a84c",fontWeight:700,flexShrink:0}}>{i+1}</div>
                      <div style={{textAlign:"right",flex:1,paddingLeft:10,fontSize:22,color:"#e8e6df",fontFamily:"serif",lineHeight:1.9,direction:"rtl"}}>{v[0]}</div>
                    </div>
                    <div style={{borderTop:"1px solid #2a2d3e",paddingTop:10}}>
                      <div style={{color:"#c9a84c",fontSize:13,fontStyle:"italic",marginBottom:4}}>{v[1]}</div>
                      <div style={{color:"#8b8fa8",fontSize:13}}>{v[2]}</div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* ─── 99 NOMS ─── */}
        {tab===2&&(
          <div>
            <div style={{background:"linear-gradient(135deg,#1a1d27,#13151f)",borderRadius:14,padding:"14px",marginBottom:14,border:"1px solid #c9a84c55"}}>
              <div style={{fontSize:11,color:"#c9a84c",fontWeight:700,marginBottom:6,letterSpacing:1}}>✦ BIENFAITS DES 99 NOMS</div>
              <p style={{margin:"0 0 8px",fontSize:13,lineHeight:1.65,color:"#e8e6df"}}>
                Le Prophète ﷺ a dit : <span style={{color:"#c9a84c",fontStyle:"italic"}}>« Allah a 99 noms, cent moins un. Celui qui les dénombre entrera au Paradis. »</span> (Bukhari et Muslim)
              </p>
              <p style={{margin:"0 0 8px",fontSize:12.5,lineHeight:1.65,color:"#c8c6c0"}}>
                Le terme <span style={{color:"#c9a84c"}}>iḥṣāʾ</span> (dénombrer) signifie selon les savants quatre niveaux liés :
              </p>
              <div style={{fontSize:12.5,lineHeight:1.75,color:"#c8c6c0",paddingLeft:4}}>
                <div><span style={{color:"#c9a84c"}}>1.</span> Les <b>mémoriser</b> et les réciter</div>
                <div><span style={{color:"#c9a84c"}}>2.</span> <b>Comprendre</b> leur sens profond</div>
                <div><span style={{color:"#c9a84c"}}>3.</span> <b>Invoquer</b> Allah par eux (Coran 7:180)</div>
                <div><span style={{color:"#c9a84c"}}>4.</span> <b>Se conformer</b> à ce qu'ils exigent</div>
              </div>
              <div style={{fontSize:12,lineHeight:1.6,color:"#c8c6c0",marginTop:10,paddingTop:10,borderTop:"1px solid #2a2d3e"}}>
                Mettre les noms en pratique, c'est refléter leurs traces dans sa vie : être miséricordieux parce qu'Il est Ar-Raḥmān, pardonner parce qu'Il est Al-Ghaffūr, être patient parce qu'Il est Aṣ-Ṣabūr, être généreux parce qu'Il est Al-Karīm. Invoquer Allah par le nom adapté à son besoin : Ar-Razzāq pour la subsistance, Ash-Shāfī pour la guérison, Al-Hādī pour la guidance. Plus on connaît Ses noms, plus on L'aime, plus on Le craint, et plus on Lui fait confiance.
              </div>
            </div>
            <input placeholder="Rechercher nom arabe, phonétique ou français..." value={search} onChange={e=>setSearch(e.target.value)}
              style={{width:"100%",padding:"9px 12px",borderRadius:10,border:"1px solid #2a2d3e",background:"#1a1d27",color:"#e8e6df",fontSize:13,marginBottom:10,boxSizing:"border-box",outline:"none"}}/>
            <div style={{color:"#8b8fa8",fontSize:12,marginBottom:10}}>{filtered.length} noms — clique pour l'explication</div>
            {filtered.map((n,i)=>{
              const idx=NAMES.indexOf(n);
              return(
                <div key={idx} onClick={()=>setExpName(expName===idx?null:idx)}
                  style={{background:"#1a1d27",borderRadius:10,marginBottom:6,border:`1px solid ${expName===idx?"#c9a84c":"#2a2d3e"}`,overflow:"hidden",cursor:"pointer"}}>
                  <div style={{display:"flex",alignItems:"center",padding:"11px 14px",gap:10}}>
                    <div style={{width:30,height:30,borderRadius:"50%",background:"#c9a84c11",border:"1px solid #c9a84c33",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#c9a84c",fontWeight:700,flexShrink:0}}>{idx+1}</div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div style={{fontFamily:"serif",fontSize:20,color:"#c9a84c"}}>{n[0]}</div>
                        <span style={{color:"#8b8fa8",fontSize:11}}>{expName===idx?"▲":"▼"}</span>
                      </div>
                      <div style={{fontSize:12,color:"#8b8fa8",fontStyle:"italic"}}>{n[1]}</div>
                      <div style={{fontSize:13,fontWeight:600}}>{n[2]}</div>
                    </div>
                  </div>
                  {expName===idx&&(
                    <div style={{padding:"10px 14px",borderTop:"1px solid #2a2d3e",background:"#13151f"}}>
                      <p style={{margin:0,fontSize:13,lineHeight:1.7,color:"#c8c6c0"}}>{n[3]}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ─── DHIKR ─── */}
        {tab===3&&(
          <div>
            <p style={{color:"#8b8fa8",fontSize:13,marginBottom:14}}>14 formules de dhikr — arabe, phonétique, traduction et bienfaits.</p>
            {DHIKR.map((d,i)=>(
              <div key={i} onClick={()=>setExpDhikr(expDhikr===i?null:i)}
                style={{background:"#1a1d27",borderRadius:12,marginBottom:10,border:`1px solid ${expDhikr===i?"#6e5fa6":"#2a2d3e"}`,overflow:"hidden",cursor:"pointer"}}>
                <div style={{padding:"14px"}}>
                  <div style={{textAlign:"right",direction:"rtl",fontFamily:"serif",fontSize:20,color:"#e8e6df",lineHeight:1.9,marginBottom:8}}>{d.ar}</div>
                  <div style={{color:"#c9a84c",fontSize:13,fontStyle:"italic",marginBottom:3}}>{d.ph}</div>
                  <div style={{fontWeight:700,fontSize:14,marginBottom:8}}>{d.fr}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{background:"#2a2d3e",padding:"4px 9px",borderRadius:6,fontSize:11,color:"#4ecca3"}}>🕐 {d.count}</div>
                    <span style={{color:"#8b8fa8",fontSize:11}}>{expDhikr===i?"Masquer ▲":"Bienfaits ▼"}</span>
                  </div>
                </div>
                {expDhikr===i&&(
                  <div style={{padding:"10px 14px",borderTop:"1px solid #2a2d3e",background:"#13151f"}}>
                    <div style={{fontSize:11,marginBottom:5,color:"#6e5fa6",fontWeight:700}}>✦ BIENFAITS</div>
                    <p style={{margin:0,fontSize:13,lineHeight:1.7,color:"#c8c6c0"}}>{d.benefits}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ─── DOUA ─── */}
        {tab===4&&(
          <div>
            <div style={{display:"flex",gap:6,marginBottom:14,background:"#1a1d27",padding:4,borderRadius:10,border:"1px solid #2a2d3e"}}>
              <button onClick={()=>{setDouaSub(0);setExpDouaG(null);setExpDouaP(null);}} style={{
                flex:1,padding:"8px 4px",borderRadius:8,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,
                background:douaSub===0?"#4ecca3":"transparent",color:douaSub===0?"#0f1117":"#8b8fa8"
              }}>📖 Sunna & Coran</button>
              <button onClick={()=>{setDouaSub(1);setExpDouaG(null);setExpDouaP(null);}} style={{
                flex:1,padding:"8px 4px",borderRadius:8,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,
                background:douaSub===1?"#c9a84c":"transparent",color:douaSub===1?"#0f1117":"#8b8fa8"
              }}>🌟 Prophètes</button>
            </div>

            {douaSub===0&&(
              <>
                <p style={{color:"#8b8fa8",fontSize:13,marginBottom:14}}>{DOUA_GENERAL.length} invocations essentielles tirées du Coran et de la Sunna authentique.</p>
                {DOUA_GENERAL.map((d,i)=>(
                  <div key={i} onClick={()=>setExpDouaG(expDouaG===i?null:i)}
                    style={{background:"#1a1d27",borderRadius:12,marginBottom:10,border:`1px solid ${expDouaG===i?"#4ecca3":"#2a2d3e"}`,overflow:"hidden",cursor:"pointer"}}>
                    <div style={{padding:"14px"}}>
                      <div style={{display:"inline-block",background:"#4ecca322",border:"1px solid #4ecca355",padding:"3px 9px",borderRadius:6,fontSize:10,color:"#4ecca3",fontWeight:700,marginBottom:10}}>📿 {d.context}</div>
                      <div style={{textAlign:"right",direction:"rtl",fontFamily:"serif",fontSize:19,color:"#e8e6df",lineHeight:2,marginBottom:9}}>{d.ar}</div>
                      <div style={{color:"#c9a84c",fontSize:13,fontStyle:"italic",marginBottom:5,lineHeight:1.5}}>{d.ph}</div>
                      <div style={{fontWeight:600,fontSize:13.5,color:"#c8c6c0",marginBottom:8,lineHeight:1.55}}>{d.fr}</div>
                      <div style={{textAlign:"right"}}>
                        <span style={{color:"#8b8fa8",fontSize:11}}>{expDouaG===i?"Masquer ▲":"Bienfaits ▼"}</span>
                      </div>
                    </div>
                    {expDouaG===i&&(
                      <div style={{padding:"10px 14px",borderTop:"1px solid #2a2d3e",background:"#13151f"}}>
                        <div style={{fontSize:11,marginBottom:5,color:"#4ecca3",fontWeight:700}}>✦ BIENFAITS</div>
                        <p style={{margin:0,fontSize:13,lineHeight:1.7,color:"#c8c6c0"}}>{d.benefits}</p>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {douaSub===1&&(
              <>
                <p style={{color:"#8b8fa8",fontSize:13,marginBottom:14}}>{DOUA_PROPHETS.length} invocations des prophètes ﷺ — avec le contexte dans lequel chaque prophète les a prononcées.</p>
                {DOUA_PROPHETS.map((d,i)=>(
                  <div key={i} onClick={()=>setExpDouaP(expDouaP===i?null:i)}
                    style={{background:"#1a1d27",borderRadius:12,marginBottom:10,border:`1px solid ${expDouaP===i?"#c9a84c":"#2a2d3e"}`,overflow:"hidden",cursor:"pointer"}}>
                    <div style={{padding:"14px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:6}}>
                        <div style={{background:"#c9a84c22",border:"1px solid #c9a84c55",padding:"4px 10px",borderRadius:6,fontSize:12,color:"#c9a84c",fontWeight:700}}>🌟 {d.prophet}</div>
                        <div style={{fontSize:10,color:"#8b8fa8"}}>{d.ref}</div>
                      </div>
                      <div style={{textAlign:"right",direction:"rtl",fontFamily:"serif",fontSize:19,color:"#e8e6df",lineHeight:2,marginBottom:9}}>{d.ar}</div>
                      <div style={{color:"#c9a84c",fontSize:13,fontStyle:"italic",marginBottom:5,lineHeight:1.5}}>{d.ph}</div>
                      <div style={{fontWeight:600,fontSize:13.5,color:"#c8c6c0",marginBottom:8,lineHeight:1.55}}>{d.fr}</div>
                      <div style={{textAlign:"right"}}>
                        <span style={{color:"#8b8fa8",fontSize:11}}>{expDouaP===i?"Masquer ▲":"Contexte & bienfaits ▼"}</span>
                      </div>
                    </div>
                    {expDouaP===i&&(
                      <div style={{padding:"12px 14px",borderTop:"1px solid #2a2d3e",background:"#13151f"}}>
                        <div style={{fontSize:11,marginBottom:5,color:"#c9a84c",fontWeight:700}}>📜 CONTEXTE</div>
                        <p style={{margin:"0 0 12px",fontSize:13,lineHeight:1.7,color:"#c8c6c0"}}>{d.context}</p>
                        <div style={{fontSize:11,marginBottom:5,color:"#4ecca3",fontWeight:700}}>✦ BIENFAITS</div>
                        <p style={{margin:0,fontSize:13,lineHeight:1.7,color:"#c8c6c0"}}>{d.benefits}</p>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
