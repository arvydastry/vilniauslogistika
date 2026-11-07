# Vilniaus logistika (logistik.lt): demo dizainas

Naujos **logistik.lt** svetainės demonstracinis pradžios puslapis. Visas dabartinės svetainės turinys perkeltas į vieną aiškų, lengvai skaitomą puslapį, papildytas paaiškinimais, schemomis, Pexels nuotraukomis ir vaizdo įrašais.

## Peržiūra

- **Gyva versija:** <https://arvydastry.github.io/vilniauslogistika/> (GitHub Pages iš saugyklos <https://github.com/arvydastry/vilniauslogistika> `main` šakos šaknies; failas `.nojekyll` išjungia Jekyll). Atnaujinimas: `git add -A && git commit -m "..." && git push`, Pages persigeneruoja per ~1 min.
- `python3 serve.py` ir atverti <http://localhost:8150/> (`.claude/launch.json` konfigūracija „logistik“). Galima atidaryti ir tiesiog `index.html`, tik tada neveiks žemėlapis.
- `?static=1` prie adreso išjungia visus judesio efektus (patogu ekrano nuotraukoms).
- Puslapis turi `noindex, nofollow`. Užklausos forma demonstracinė: tikrina laukus, bet duomenų niekur nesiunčia.

## Dabartinės svetainės problemos (patikrinta 2026-11-06)

1. **Kiekvieno puslapio viršuje rodomi PHP „Deprecated“ pranešimai** (Carbon Fields įskiepis nesuderinamas su serverio PHP versija). Lankytojas mato serverio kelius `/home/lostik/domains/...`.
2. `/logistikos-paslaugos/` grąžina tuščią puslapį.
3. `/musu-projektai/` turi tik „Informacija ruošiama!“.
4. Patalpų nuomos puslapyje paliktas šablono tekstas „Šiuo metu yra įsikūrę **XX** įmonių“.
5. Telefono nuoroda sugadinta: `tel:http://+37052640660`.
6. Schema.org duomenyse liko WordPress numatytasis aprašymas „Kol kas tik dar vienas WordPress tinklalapis“.
7. Turinys nekeistas nuo 2019 m., daug rašybos klaidų („tarpininikavimo“, „Įmones kodas“, „teises saugomos“, „judejimą“, „iki duru“, „mokeščius“, „įvairiaus“, „požiuris“).
8. Nėra aiškios paslaugų struktūros, raginimų veikti ir patogaus vaizdo telefone.

## Turinys

**Perkelta iš logistik.lt:** visos 9 paslaugos su originaliais tekstais ir sąrašais, „Apie mus“, infrastruktūros aprašymas, saugumo ir draudimo informacija, ekspedijavimo principai, patalpų nuoma (100–7 000 m² gamybinio ploto, 1 000 m² biurų), visi kontaktai (3 telefonai, el. paštas, adresas), rekvizitai, logotipas, vilkiko nuotrauka.

**Pataisyta:**
- rašybos ir skyrybos klaidos, lietuviškos kabutės „…“ ir brūkšniai;
- „ne Lietuvos prekes“ pakeista į „ne ES prekes“ (atitinka dabartinį muitinės sandėlio apibrėžimą);
- dalinių krovinių pervežime **išimtas Rusijos paminėjimas** (sankcijos); palikta „iš Vakarų Europos“. Patikslinti su klientu.

**Papildyta (reikia kliento patvirtinimo):**
- hero tekstas ir 6 pagrindiniai faktai (iš originalių duomenų);
- paslaugos sugrupuotos į krovinio kelią: atvykimas ir krova → saugojimas → paruošimas → dokumentai ir išsiuntimas;
- papildomi sakiniai paslaugose, kur originalas buvo vieno sakinio (mechanizuota ir rankinė krova, rūšiavimas);
- muitinės paslaugų sąrašas su kodais (IM/EX, T1/TIR, CMR, EUR.1, Intrastat…) ir paaiškinimas „Kas yra A tipo muitinės sandėlis?“;
- **terminalo schema** (iliustracinė, ne tikras teritorijos planas) su 7 zonomis;
- konsolidacinio sandėlio schema (tiekėjai → Vilnius → gavėjas / saugojimas);
- ploto skaičiuoklė (plotas lyginamas su krepšinio aikštelėmis, 420 m²);
- 4 darbo eigos žingsniai, sakinys apie vieną kontaktą visai grandinei.

**Ko neįtraukta:** „Mūsų projektai“ (turinio nėra), įmonių skaičius biuruose, darbo laikas (svetainėje nenurodytas). DUK blokas pašalintas 2026-11-07 (kliento sprendimas).

**Klausimai klientui:** tikri sandėlių plotai ir paletviečių skaičius; darbo laikas; tikros teritorijos, sandėlių ir technikos nuotraukos; ar dirbama su Rusija / NVS; atliktų projektų ar klientų pavyzdžiai; leidimai ir sertifikatai (pvz., AEO), kuriuos verta parodyti; veiklos pradžia (svetainėje 2004 m., registruose įmonė įregistruota 2002 m.).

## Dizaino kryptis „Terminalas“

Šviesus, informatyvus, B2B: daug baltos erdvės, aiški hierarchija, plonos skiriamosios linijos vietoje kortelių gausos, vienas tamsus blokas (terminalas) per puslapį.

| | |
|---|---|
| Firminė mėlyna | `#214673` (paimta iš logotipo), tamsi `#0A1C33` |
| Fonas | baltas ir šaltas šviesiai pilkas `#F4F6F9` |
| Akcentas | sandėlio grindų žymėjimo geltona `#F2B01E`, tik žymėms, linijoms ir aktyvioms būsenoms |
| Šriftai | **Manrope** (kintamo storio 200–800: antraštės 800, tekstas 450, 17 px) ir **JetBrains Mono** (smulkios žymos ir muitinės kodai). Abu su lietuviškais rašmenimis, po vieną woff2 failą (be latin / latin-ext skaidymo, kad „ū“ rodytų teisingai). Iki 2026-11-07 buvo Sofia Sans / Sofia Sans Condensed |
| Motyvas | keturkampė žvaigždė iš logotipo: sąrašų ženkleliai ir antraščių žymos |

**Hero:** vaizdo įrašas per visą ekrano plotį ir aukštį (`100svh`), tamsus perėjimas kairėje, kad tekstas būtų skaitomas, antraštė virš video permatoma su baltu logotipu, o nuslinkus tampa balta su mėlynu logotipu. Dešinėje apačioje patalpų nuomos kortelė (telefone paslėpta), apačioje slinkimo ženklas. Kol video įsikelia, rodomas 1920 px plakatas.

**„Terminalas skaičiais“ (blokas po hero):** bento tinklelis iš 6 plytelių, kiekviena su savo duomenų vizualizacija: patirtis (nuotrauka, skaičius ir laiko juosta 2004 → dabartiniai metai), krovos technika (1,5–10 t skalė), apsauga 24/7 (gyvas Vilniaus laikas su pulsuojančiu tašku), patalpų nuoma (70 langelių po 100 m², pirmas geltonas = „nuo 100 m²“), muitinė (procedūrų kodai), geležinkelis (nuotrauka). Plytelės išnyra paeiliui, skalės ir langeliai užsipildo slenkant. Planšetėje 2 stulpeliai, telefone 1.

**Puslapio blokai:** antraštė su telefonu → hero per visą ekraną su vaizdo įrašu → terminalas skaičiais (bento) → krovinio kelias (4 etapai) ir 9 paslaugų skirtukai (telefone – akordeonas) → terminalas (tamsus blokas: traukinio video, interaktyvi schema su legenda, 3 nuotraukos) → saugumas ir atsakomybė → muitinė (dokumentų sąrašas) → ekspedijavimas (konsolidacijos schema, principai) → patalpų nuoma (ploto skaičiuoklė, biurai) → apie mus → kontaktai (užklausos forma su paslaugų žymomis, kontaktai, OpenStreetMap žemėlapis) → poraštė.

**Poraštė:** tamsus blokas suapvalintais viršutiniais kampais. Kairėje baltas logotipas, dideli telefono ir el. pašto kontaktai, kiti du telefonai. Toliau paslaugų ir įmonės nuorodų stulpeliai, rekvizitai su mygtuku „Kopijuoti rekvizitus“ (nukopijuoja visus duomenis į iškarpinę). Apačioje geležinkelio bėgiai su lėtai važiuojančiu traukiniu (atliepia įmonės geležinkelio atšaką; esant „mažiau judesio“ nustatymui traukinys stovi), tada autorių teisės, adresas su nuoroda į žemėlapį ir mygtukas „Į viršų“. Telefone nuorodos dviem stulpeliais, įmonės ir PVM kodai poromis.

**Judesys:** hero įėjimo seka, atsiradimas slenkant, krovinio kelio linija, terminalo schema „nusibraižo“ ir vagonai įvažiuoja, judantys taškai konsolidacijos schemoje, švelnus parallax, skaičių skaičiavimas. Animuojami tik `transform` / `opacity` / `stroke-dashoffset`; `prefers-reduced-motion` ir `?static=1` viską išjungia. Vaizdo įrašai groja tik matomi.

## Failai

```
index.html               vienas puslapis
assets/css/style.css     dizaino sistema ir blokai
assets/js/main.js        meniu, skirtukai, schema, skaičiuoklė, forma, video, animacijos
assets/fonts/            Manrope, JetBrains Mono (licencijos OFL-*.txt)
assets/img/brand/        logotipas (originalus ir baltas), favicon
assets/img/foto/         nuotraukos WebP 640 / 1280 / 1920 px (srcset), video plakatai
assets/video/            hero 1280 / 1920 px, traukinys 1280 px
serve.py                 peržiūros serveris (portas 8150)
```

## Nuotraukos ir video

Pexels (Pexels licencija), parsisiųsta 2026-11-06 per Pexels API. Demonstracinei versijai; prieš paleidžiant svetainę verta pakeisti tikromis teritorijos nuotraukomis.

| Failas | Pexels | Autorius |
|---|---|---|
| `krautuvas-10t-*.webp` | [29491416](https://www.pexels.com/photo/10-ton-ace-diesel-forklift-in-industrial-yard-29491416/) | Action Construction Equipment Ltd. – ACE |
| `krova-rampa-*.webp` | [1267329](https://www.pexels.com/photo/man-riding-on-yellow-forklift-1267329/) | ELEVATE |
| `sandelis-darbas-*.webp` | [36696522](https://www.pexels.com/photo/industrial-warehouse-with-forklifts-in-action-36696522/) | amerimet suppliers |
| `sandelis-praejimas-*.webp` | [5775099](https://www.pexels.com/photo/stacks-of-cardboard-boxes-5775099/) | Handi Boyz LLC |
| `sandelis-stelazai-*.webp` | [4483610](https://www.pexels.com/photo/warehouse-with-concrete-floors-4483610/) | Tiger Lily |
| `rampos-virsus-*.webp` | [35501715](https://www.pexels.com/photo/aerial-view-of-industrial-loading-dock-area-35501715/) | Giant Asparagus |
| `traukinys-vagonai-*.webp` | [15969776](https://www.pexels.com/photo/cargo-wagons-on-railway-tracks-15969776/) | Jakub Pabis |
| `muitine-dokumentai-*.webp` | [7821495](https://www.pexels.com/photo/person-writing-on-white-paper-7821495/) | RDNE Stock project |
| `negabaritai-kranas-*.webp` | [7751627](https://www.pexels.com/photo/containers-being-moved-from-a-cargo-ship-with-cranes-7751627/) | Christopher Seufert |
| `rusiavimas-patikra-*.webp` | [6170410](https://www.pexels.com/photo/man-getting-the-fragile-box-6170410/) | Tima Miroshnichenko |
| `rankine-krova-*.webp` | [4487485](https://www.pexels.com/photo/men-unloading-boxes-4487485/) | Tiger Lily |
| `biuras-*.webp` | [7750129](https://www.pexels.com/photo/white-desks-and-swivel-chairs-in-the-office-7750129/) | Max Vakhtbovych |
| `posedziu-sale-*.webp` | [5444195](https://www.pexels.com/photo/brown-wooden-table-with-chairs-5444195/) | myHQ-Workspaces |
| `apsauga-kamera-*.webp` | [37591155](https://www.pexels.com/photo/close-up-of-security-camera-on-modern-building-37591155/) | Giant Asparagus |
| `sandelis-fasadas-*.webp` | [36006588](https://www.pexels.com/photo/modern-industrial-warehouse-exterior-view-36006588/) | Peter Xie |
| `paletes-aikstele-*.webp` | [10096900](https://www.pexels.com/photo/stacked-plastic-pallet-10096900/) | Mathias Reding |
| `video/hero-*.mp4`, `poster-hero-1920.webp` | [32838797](https://www.pexels.com/video/efficient-warehouse-forklift-loading-outdoors-32838797/) | Tomas Gutierrez Duport |
| `video/traukinys-1280.mp4`, `poster-traukinys.webp` | [4066320](https://www.pexels.com/video/trains-used-in-transport-of-cargoes-4066320/) | K |

Iš logistik.lt: `brand/logo-vilniaus-logistika.png` (ir iš jo padaryta balta versija), `brand/favicon-32.png`, `foto/vilkikas-tiltas-1000.webp`.
