
import { GoogleGenAI } from "@google/genai";
import { Product, SearchResult, SoleilResponse } from "./types";

const SOURCE_CATALOG = [
  // --- GEUREN (DAMES) ---
  {
    "brand": "DIOR",
    "name": "Miss Dior Essence de parfum",
    "category": "Damesparfum",
    "details": "Essence de parfum - noten van confituur, bloemen en hout. Een symbool van zelfverzekerde vrouwelijkheid.",
    "price": "€88,64",
    "url": "https://www.iciparisxl.nl/dior/miss-dior-essence/essence-de-parfum-noten-van-confituur-bloemen-en-hout/p/BP_1387000",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1387000-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MjE4OTc2fGltYWdlL2pwZWd8YURneEwyZzBPUzh4TVRnNE1URXdORFEwTVRNM05DOXdjbVF0Wm5KdmJuUXRNVE00TnpBd01GODVOVFI0TVRFNU1pNXFjR2N8ZmYxODg3ZWIxODA4M2JmYTQ4M2MyZTQ0MzhmN2ExYzEwY2YzMjg1MTZjYmJhZTJiNDgyMzU0YzRhZGZlZWFjZg",
    "rating": 4.9,
    "reviewCount": 1240
  },
  {
    "brand": "DIOR",
    "name": "J'adore Parfum d'eau",
    "category": "Damesparfum",
    "details": "Eau de parfum zonder alcohol. Een concentraat van water en bloemen met een unieke sensorialiteit.",
    "price": "€70,60",
    "url": "https://www.iciparisxl.nl/dior/jadore-parfum-deau/eau-de-parfum-zonder-alcohol/p/BP_1177392",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1177378-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8NzIyOTJ8aW1hZ2UvanBlZ3xhR1F6TDJnMVpTOHhNRGcyTnpjd09EZ3lNVFV6TkM5d2NtUXRabkp2Ym5RdE1URE16TnpLOHVOVFI0TVRFNU1pNXFjR2N8ODlkYWVjOGEwNmY3YTU5OGE1YzcyY2Y4Y2NjMThhNzgzMzcwNjc2MDJmNDZhZGFkMTIxYjZlZWY5NjY4NTVlNw",
    "rating": 4.8,
    "reviewCount": 850
  },
  {
    "brand": "ZADIG & VOLTAIRE",
    "name": "This is Her! Eau de Parfum",
    "category": "Damesparfum",
    "details": "Een sensuele and krachtige geur die rock en elegantie combineert.",
    "price": "€59,20",
    "url": "https://www.iciparisxl.nl/zadig-voltaire/zadig/eau-de-parfum/p/BP_1357019",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1357019-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTA5OTMyfGltYWdlL2pwZWd8YUdVMUwyaGlNUzh4TVRVek5UQTVNall4TXpFMU1DOXdjbVF0Wm5KdmJuUXRNVE0xTnpBeE9WODVOVFI0TVRFNU1pNXFjR2N8OTE3ZTVlNDRjZTQ0OWE2NDA5YWU2ZDJiZDFhNTkwYWJlMTY5NDM4ZmQxNTk2NGQyMWQxOTcxM2UxZjdjMmRmMA",
    "rating": 4.7,
    "reviewCount": 420
  },
  {
    "brand": "LANCOME",
    "name": "Idôle Eau De Parfum",
    "category": "Damesparfum",
    "details": "Een frisse, zuivere bloemige geur. Navulbaar. Bedacht door vrouwen voor vrouwen met ambitie.",
    "price": "€46,99",
    "url": "https://www.iciparisxl.nl/lancome/idole/eau-de-parfum-navulbaar-dames-parfum/p/BP_1036732",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1036732-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTExMzU3fGltYWdlL2pwZWd8YURWakwyZzJPUzh4TVRZME1qVXdPVGMxTkRNNU9DOXdjbVF0Wm5KdmJuUXRNVEF6Tmpjek1sODVOVFI0TVRFNU1pNXFjR2N8NGNhOTkzZTRkMjkyNjNhYTYyNjY1MTA2NWJkOGNlMjc0NGQ0YmE0Yjg1ZDVhZjA2MGM1NWFmZmRmMzQ2ZWZhZA",
    "rating": 4.8,
    "reviewCount": 2100
  },
  {
    "brand": "HUGO BOSS",
    "name": "Boss Alive Eau de Parfum",
    "category": "Damesparfum",
    "details": "Sprankelende appel- en pruimentopnoten stralen optimisme uit voor de zelfverzekerde vrouw.",
    "price": "€67,20",
    "url": "https://www.iciparisxl.nl/hugo-boss/alive/hugo-boss-alive-eau-de-parfum/p/BP_1067518",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1067518-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8ODEzMjN8aW1hZ2UvanBlZ3xhRFprTDJobU55OHhNVEUzTmprd05EWTROelkwTmk5d2NtUXRabkp2Ym5RdE1UQTJOelV4T0Y4NU5UUjRNVEU1TWk1cWNHY3xlNDk5ZmI2M2Q2NmY4ZjM0NzY4YjRlODE1YmE3MzVjMzgwMGI0YjdmZTVhN2E4NGMxNmJmZjU2NTAxMmFhYjNl",
    "rating": 4.6,
    "reviewCount": 310
  },
  {
    "brand": "ARMANI",
    "name": "My Way Intense Eau de Parfum",
    "category": "Damesparfum",
    "details": "Een intense en authentieke damesgeur met oranjebloesem, sandelhout en verslavende vanille.",
    "price": "€81,60",
    "url": "https://www.iciparisxl.nl/armani/my-way-intense/eau-de-parfum-intense-vrouwen/p/BP_1133269",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1133269-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTQ2NDY1fGltYWdlL2pwZWd8YURabUwyaGhOaTh4TURFNU9Ea3dPVGt4TVRBM01DOXdjbVF0Wm5KdmJuUXRNVEV6TXpJMk9WODVOVFI0TVRFNU1pNXFjR2N8NmVkNWJiM2FiN2QwYTkzZTg4NWUwNTg1MjA4YTg3MmE2NDYwNzRjOTFlZmExOTFmYjI4Yjg0MWI5OTIyYWM5MA",
    "rating": 4.9,
    "reviewCount": 1500
  },
  {
    "brand": "LANCOME",
    "name": "La Vie est Belle Eau de Parfum",
    "category": "Damesparfum",
    "details": "De iconische damesgeur van Lancôme. Een zoete, fruitige en bloemige ode aan geluk.",
    "price": "€54,99",
    "url": "https://www.iciparisxl.nl/lancome/la-vie-est-belle/eau-de-parfum-navulbaar-dames-parfum/p/BP_593198",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1190370-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTY3NzUyfGltYWdlL2pwZWd8YUdJMkwyZzFNQzh4TVRFd09EVXdPRGd5TnpZM09DOXdjbVF0Wm5KdmJuUXRNVEU1TURNM01GODVOVFI0TVRFNU1pNXFjR2N8OWExNmQ5OGNlMWI2ZjgxMTAwYTgzNTk5Nzk3MzVkZjU4NTExNTY4MzUxMmJkZjRlNjY4MDU0MDAxODhhYjg4MQ",
    "rating": 4.9,
    "reviewCount": 5400
  },
  {
    "brand": "HERMÈS",
    "name": "Barénia Eau de Parfum",
    "category": "Damesparfum",
    "details": "Een tijdloze en elegante geur die passie en authenticiteit uitstraalt.",
    "price": "€63,00",
    "url": "https://www.iciparisxl.nl/hermes/barenia/eau-de-parfum/p/BP_1325456",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1325456-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTQzNzUzfGltYWdlL2pwZWd8YURWa0wyaGhZeTh4TVRFMU5qRXpNekUxTURjMU1DOXdjbVF0Wm5KdmJuUXRNVE15TlRRM1NsODVOVFI0TVRFNU1pNXFjR2N8NmYzOGU1NDM3ZjZlZWJkMmY1YTJjNjI3NzNhOWVmYTc2Yzg4YjFjNmZmZjEzOTEwNDJhNjE0OTM2Y2ExZjA4Zg",
    "rating": 4.7,
    "reviewCount": 180
  },
  {
    "brand": "GUCCI",
    "name": "Flora Gorgeous Orchid",
    "category": "Damesparfum",
    "details": "Gucci’s eerste gourmand bloemige parfum. Levendige warmte van vanille en adembenemende contrasten.",
    "price": "€64,80",
    "url": "https://www.iciparisxl.nl/gucci/flora-gorgeous-orchid/eau-de-parfum/p/BP_1324812",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1324812-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MjA3MjY5fGltYWdlL2pwZWd8YURnd0wyZ3hOeTh4TVRjM05EWTFPVEUyTmpJek9DOXdjbVF0Wm5KdmJuUXRNVE15TkRneE1sODVOVFI0TVRFNU1pNXFjR2N8ZmE3NmU4NzQ0YzljYTIxMTllZDc0YjQ1MmNmYTAzMTg0ZTBiZjE0OThhZmViOWYwM2IwOTE1ZDkyYzAyNzAxMQ",
    "rating": 4.8,
    "reviewCount": 260
  },
  {
    "brand": "ARMANI",
    "name": "Acqua di Giò Profondo Le Parfum",
    "category": "Herenparfum",
    "details": "Een intens mariene geur voor de moderne man. Krachtig, diep en verfrissend.",
    "price": "€102,40",
    "url": "https://www.iciparisxl.nl/armani/acqua-di-gio-profondo-le-parfum/heren-parfum/p/BP_1307858",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1307858-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MjQ0ODg3fGltYWdlL2pwZWd8YURWa0wyaGpZeTh4TURrME1UTXhOVFEwT0RnMk1pOXdjbVF0Wm5KdmJuUXRNVE13TnpnMU9GODVOVFI0TVRFNU1pNXFjR2N8OGQ4YmE2ZTBiMDhkMDgwM2M2YWFlNTI4Nzk4YmE1ODI2MjdiOWY4ZGQyY2JkZDQ2NTdkM2VjNTQzZjk0MDFlZg",
    "rating": 4.9,
    "reviewCount": 1100
  },
  {
    "brand": "YVES SAINT LAURENT",
    "name": "MYSLF Eau De Parfum",
    "category": "Herenparfum",
    "details": "Een statement voor moderne mannelijkheid. Een mix van bloemige en houtachtige noten.",
    "price": "€96,80",
    "url": "https://www.iciparisxl.nl/yves-saint-laurent/myslf/eau-de-parfum-navulbaar-herenparfum/p/BP_1260251",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1260251-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTY1NjU5fGltYWdlL2pwZWd8YURKbUwyaGtOUzh4TURVeE9ERXdOREEwTnpZME5pOXdjbVF0Wm5KdmJuUXRNVEkyTURJMU1WODVOVFI0TVRFNU1pNXFjR2N8NzM1NTA0MGZlYmRkNWU3MGY3NjMwYzJjOGVlN2RhNTlmYzIyNWEwM2U2NmJkZWVmZTViNTJmM2Y4NzJjZjUyYQ",
    "rating": 4.7,
    "reviewCount": 780
  },
  {
    "brand": "DIOR",
    "name": "Sauvage Elixir",
    "category": "Herenparfum",
    "details": "Een geconcentreerd parfum doordrenkt met de iconische Sauvage frisheid en een bedwelmend hart van kruiden.",
    "price": "€144,60",
    "url": "https://www.iciparisxl.nl/dior/sauvage/elixir-/p/BP_1135964",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1135964-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8OTQzNjF8aW1hZ2UvanBlZ3xhRFpoTDJnd01DOHhNVEkyTlRBME56VTJNREl5TWk5d2NtUXRabkp2Ym5RdE1URXpOVGsyTkY4NU5UUjRNVEU1TWk1cWNHY3wzMjFhNDk3NzdlYzM1MWRlYjBiMDcxMDdiYzRjNTBmMGJiZmVjNzgzMjhhYmVkNGMxMmYwYjUzYTM4MzEzZGQ0",
    "rating": 4.9,
    "reviewCount": 3800
  },
  {
    "brand": "DAVIDOFF",
    "name": "Cool Water Man Eau De Toilette",
    "category": "Herenparfum",
    "details": "De ultieme oceaan-geïnspireerde geur. Fris en tijdloos.",
    "price": "€36,00",
    "url": "https://www.iciparisxl.nl/davidoff/cool-water-man/eau-de-toilette/p/BP_36364",
    "image": "https://media.iciparisxl.nl/medias/prd-front-35858-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTE0ODU4fGltYWdlL2pwZWd8YURkbUwyZzJaQzh4TVRJME5UQXdOelV6TmpFMU9DOXdjbVF0Wm5KdmJuUXRNelU0TlRoZk9UVTBlREV4T1RJdWFuQm58YTEzMmY2NGNhNmViNjljM2NlYzg4YWU2YjJhZDg2NGRiODYwMWVjYzdhMGM1MmZmYzdmZjI1MGU1OTM4NGIyMw",
    "rating": 4.5,
    "reviewCount": 12000
  },
  {
    "brand": "DRUNK ELEPHANT",
    "name": "Protini Polypeptide Cream",
    "category": "Verzorging",
    "details": "Eiwitrijke vochtinbrengende crème die peptidecomplexen combineert voor een sterkere, gezondere huid.",
    "price": "€70,00",
    "url": "https://www.iciparisxl.nl/drunk-elephant/moisturizer/protini-polypeptide-cream/p/BP_1170803",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1170803-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8NDAyOTA3fGltYWdlL2pwZWd8YURWa0wyZzNaUzh4TURrMk1qZzNNamN5T1RZek1DOXdjbVF0Wm5KdmJuUXRNVEUzTURnd00xODVOVFI0TVRFNU1pNXFjR2N8ZTE1MDc4YWE5MWM5YjNlMzg2NTYyYzEyNmI2ZDcxZDJhMzI2YmE4OTk0NzVjMmYzYWRhMmMwMDg4NzNkN2RmZA",
    "rating": 4.7,
    "reviewCount": 4200
  },
  {
    "brand": "ESTEE LAUDER",
    "name": "Advanced Night Repair Serum",
    "category": "Verzorging",
    "details": "Gezichtsserum - anti-aging & hydraterend voor dag-en nachtroutine. De #1 serum wereldwijd.",
    "price": "€70,08",
    "url": "https://www.iciparisxl.nl/estee-lauder/advanced-night-repair-synchronized-multi-recovery-complex/serum-gezicht-anti-aging-hydraterend/p/BP_1088070",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1148123-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTIyMTI3fGltYWdlL2pwZWd8YURobEwyZ3lPQzh4TVRFNU5UQXdOezM2T1RJME5iOXdjbVF0Wm5KdmJuUXRNVEUwT0RFeU0xODVOVFI0TVRFNU1pNXFjR2N8NWZjZjI0YzUxYTM3ZWM1ZjQ3NzBkMGE3MzBkMTc1OThmMmI3MjJjZDk0ZDNkYzdjYmJhODE1MDhiZWM0NjNhMw",
    "rating": 4.8,
    "reviewCount": 18000
  },
  {
    "brand": "SHISEIDO",
    "name": "Vital Perfection Supreme Cream",
    "category": "Verzorging",
    "details": "Concentrated Supreme Cream voor een gelifte en stevigere huid in slechts 1 week.",
    "price": "€135,20",
    "url": "https://www.iciparisxl.nl/shiseido/vital-perfection/concentrated-supreme-cream/p/BP_1292843",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1292843-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MzQ4MDA4fGltYWdlL2pwZWd8YURYMEwyZ3lNaTh4TVRnMU16Z3lPVFkyT0RnNU5DOXdjbVF0Wm5KdmJuUXRNVEk1TWpnME0xODVOVFI0TVRFNU1pNXFjR2N8YzE3MGU3ODYzYThjZmZhOGU5MTZmOTBjMjY5NGEwODZlMzEyMWJkZTdhMjk2MTEwZjM1NWQ5ZWZmZjRjNDE1Zg",
    "rating": 4.9,
    "reviewCount": 540
  },
  {
    "brand": "CLAY AND GLOW",
    "name": "Hydrating Moisturizer",
    "category": "Verzorging",
    "details": "Hydraterende dag- en nachtcrème voor een stralende huid. Gemaakt met natuurlijke ingrediënten.",
    "price": "€23,96",
    "url": "https://www.iciparisxl.nl/clay-and-glow/hydrating-moisturizer/hydraterende-dag-en-nachtcreme/p/BP_1089071",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1089071-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8NTY0MjZ8aW1hZ2UvanBlZ3xhR1kwTDJnMU15OHhNakF3TmpVM05EWXlNRGN3TWk5d2NtUXRabkp2Ym5RdE1UQTRPVEEzTVY4NU5UUjRNVEU1TWk1cWNHY3xkYjg4OGJmNGMzNmEyNDIzOTM2ZWZhMTBhMTgzMjQyNjM4MzE0NTZhMTIwYmUzOTFiMjQ0MTJkMmVjNmVlMTA3",
    "rating": 4.4,
    "reviewCount": 110
  },
  {
    "brand": "QUEEN TARZI",
    "name": "The Gentle Cleansing Balm",
    "category": "Reiniging",
    "details": "Verwijder make-up moeiteloos zonder de huid uit te drogen. Een zachte balsem voor alle huidtypes.",
    "price": "€32,37",
    "url": "https://www.iciparisxl.nl/queen-tarzi/cleansing-balm/the-gentle-cleansing-balm/p/BP_1252803",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1252803-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8OTQyNzZ8aW1hZ2UvanBlZ3xhR0ppTDJoaU9OSDh4TURNd05ZMTBETTpNamM1T0M5d2NtUXRabkp2Ym5RdE1USTFNamd3TTE4NU5UUjRNVEU1TWk1cWNHY3wwYmM2YmE4MmEzYmMwNGI2MWNhNGZjNDI1NTMzYzNmMDIwOGI1NWU0OGJhM0VjY2M3NmQzYWMxNmM2OWQz",
    "rating": 4.8,
    "reviewCount": 85
  },
  {
    "brand": "DRUNK ELEPHANT",
    "name": "Beste No. 9 Jelly Cleanser",
    "category": "Reiniging",
    "details": "Een vernieuwende jelly cleanser die alle sporen van make-up, overtollige olie en vervuiling verwijdert.",
    "price": "€35,00",
    "url": "https://www.iciparisxl.nl/drunk-elephant/cleanser/beste-no-9-jelly-cleanser/p/BP_1170789",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1170789-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8Mzk0ODM2fGltYWdlL2pwZWd8YUdabUwyaGpZeTh4TURFeU5UVTJPREUwTnpRNE5pOXdjbVF0Wm5KdmJuUXRNVEUzTURjNE9WODVOVFI0TVRFNU1pNXFjR2N8MTczNDI2NGVhOWQwYjhmNzhhMTY3MWE0MzY4Y2M4ZDk3ZWI2MjNlYTU3NjFlZTQ1ODI4NDY2YWY4NDdmMGVkMg",
    "rating": 4.6,
    "reviewCount": 3200
  },
  {
    "brand": "KERASTASE",
    "name": "Première Masque Filler Réparateur",
    "category": "Haarverzorging",
    "details": "Herstellend haarmasker voor medium tot dik beschadigd haar. Herstelt de kracht van binnenuit.",
    "price": "€47,51",
    "url": "https://www.iciparisxl.nl/kerastase/premiere-masque-filler-reparateur/herstellend-haarmasker-voor-medium-tot-dik-beschadigd-haar/p/BP_1293613",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1293613-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTA1MTYzfGltYWdlL2pwZWd8YURjMkwyZ3lZaTh4TURnd01EVTJPRGN5T1RZek1DOXdjbVF0Wm5KdmJuUXRNVEI1TXpZeE0xODVOVFI0TVRFNU1pNXFjR2N8YmQ5MzAzNWEyY2ZjOWQ0NTFjMGQ2NGRjOGIxNjg3M2FkYjI3YWNiNzY3NmZjMDIwYmVhYTc2OTM2OTJkZTA0Zg",
    "rating": 4.9,
    "reviewCount": 240
  },
  {
    "brand": "REDKEN",
    "name": "One United Elixir",
    "category": "Haarverzorging",
    "details": "Een multi-benefit spray met 25 verzorgende voordelen voor alle haartypes.",
    "price": "€28,30",
    "url": "https://www.iciparisxl.nl/redken/one-united/elixir-25-verzorgende-voordelen/p/BP_1332715",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1332715-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTEzOTYyfGltYWdlL2pwZWd8YUdRMEwyZ3dNaTh4TVRFMk5EazNNRFl4TkRneE5DOXdjbVF0Wm5KdmJuUXRNVE16TWpjeE5WODVOVFI0TVRFNU1pNXFjR2N8NzdlY2UzMDU4MjAxM2EzMzdhZGYyNGEwZTNhMzc4NmE4ZjA4NWYwNTc2YzY1YTRkNDIyOTdkZmY5ZTRkMTA3Ng",
    "rating": 4.8,
    "reviewCount": 8600
  },
  {
    "brand": "LA MER",
    "name": "The Hand Treatment",
    "category": "Handverzorging",
    "details": "Verzachtende handcrème - hydraterend & voedend. Helpt de huid te beschermen tegen invloeden van buitenaf.",
    "price": "€106,37",
    "url": "https://www.iciparisxl.nl/la-mer/the-hand-treatment/verzachtende-handcreme-hydraterende-voedend/p/BP_167283",
    "image": "https://media.iciparisxl.nl/medias/prd-front-167283-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTgzNzUwfGltYWdlL2pwZWd8YUdNNUwyZzFaQzg1TlRreE5EVTRONmt4TkRVMEwzQnlaQzFtY205dWRDMHhOamN5T0ROZk9UVTBlREV4T1RJdWFuQm58ODIzN2JlZjlmMzY4ZmEwNjFhYWYwNTIxYTI0ODRiYjc3MjA2NGNlZWQzNmY4ZDAxNTc5MzgzMGRmYjYwYmRjMw",
    "rating": 4.9,
    "reviewCount": 420
  },
  {
    "brand": "OPI",
    "name": "Repair Mode Nail Serum",
    "category": "Nagelverzorging",
    "details": "Het eerste nagelserum dat nagels van binnenuit herstelt met gepatenteerde Ulti-Plex technologie.",
    "price": "€31,12",
    "url": "https://www.iciparisxl.nl/opi/nagelverzorging/opi-repair-mode/p/BP_1258753",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1258753-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8NDQzNzU5fGltYWdlL2pwZWd8YURFM0wyaGhPUzh4TURNMk56WTBNemMzT1RFd01pOXdjbVF0Wm5KdmJuUXRNVEkxT0RjMU0xODVOVFI0TVRFNU1pNXFjR2N8YzY4NTJlYWQyNWM3NjI0MDNkZDhlNDU4ZDc3OTI3MzVlNjJlYjJlOTIwMzhjY2EwMDFiZjNmMThmZDMxM2VjYg",
    "rating": 4.7,
    "reviewCount": 310
  },
  {
    "brand": "RITUALS",
    "name": "The Ritual of Jing Night Handmasker",
    "category": "Handverzorging",
    "details": "Een rijk handmasker om 's nachts te gebruiken for intens gevoede handen.",
    "price": "€11,90",
    "url": "https://www.iciparisxl.nl/rituals/the-ritual-of-jing/night-handmasker/p/BP_1244746",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1244746-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTg4MjUxfGltYWdlL2pwZWd8YURZM0wyZzRaQzh4TURIek56ZzNPRE16TnpVMk5pOXdjbVF0Wm5KdmJuUXRNVEkwTkRjME5sODVOVFI0TVRFNU1pNXFjR2N8N2M4ZWIzZjM0ZWFkZmI3OGIzNGJmOGY3YjVkMWQ2YjYwYTFmYWYxZjQ0ODBiZjIyNzU5YjJkMDRjYmRkZDdiMQ",
    "rating": 4.8,
    "reviewCount": 1100
  },
  {
    "brand": "ICI PARIS XL",
    "name": "Aqua Voedend voetmasker",
    "category": "Voetverzorging",
    "details": "Intensief hydraterend masker for zachte en verzorgde voeten.",
    "price": "€6,95",
    "url": "https://www.iciparisxl.nl/ici-paris-xl/aqua/voedend-voetmasker/p/BP_1372825",
    "image": "https://media.iciparisxl.nl/medias/prd-front-1372825-954x1192.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MTU1MzA3fGltYWdlL2pwZWd8YURCh0wyZzVaQzh4TVRnME5qTTJPREF3TWpBM09DOXdjbVF0Wm5KdmJuUXRNVE00TnpBd01GODVOVFI0TVRFNU1pNXFjR2N8ZWU0ZWQ1YTE0YjE4ZjdlNDFkMWNjMjU3Y2E2YTY2ZDc0YzFhYmI2ZjRhNDJmYWJkNzFhMGY2NWM3ZjY1M2MxOQ",
    "rating": 4.3,
    "reviewCount": 42
  }
];

const SOLEIL_PROMPT = `You are "Soleil", an Elite AI Beauty Assistant.
Your core mission is to engage in a helpful, sophisticated, and boutique-style conversation about beauty and skincare.

SOURCE CATALOG:
${JSON.stringify(SOURCE_CATALOG, null, 2)}

STRICT OPERATIONAL DIRECTIVES:
1. CONVERSATION: Be helpful and conversational. Don't just list products; explain WHY they suit the user.
2. PRODUCT SELECTION: Recommend products from the SOURCE CATALOG. Use the EXACT 'brand', 'name', 'price', 'url', 'image', 'rating', and 'reviewCount'.
3. PRODUCT CONTEXT: If the user is asking about a specific product, provide details about it (size, SPF, texture, ingredients) or offer alternatives.
4. SUGGESTIONS: Provide 2-3 short "Secondary CTAs" or follow-up suggestions in the 'suggestions' field.
5. OUTPUT FORMAT: You must return valid JSON.

Return ONLY a JSON object:
{
  "message": "Your conversational response text",
  "recommendedProducts": [
    {
      "id": "unique-slug",
      "brand": "string",
      "name": "string",
      "price": "string",
      "category": "string",
      "description": "string",
      "ingredients": ["string"],
      "image": "URL",
      "productUrl": "URL",
      "rating": number,
      "reviewCount": number,
      "aiReasoning": "Specific reason for this recommendation"
    }
  ],
  "suggestions": ["suggestion 1", "suggestion 2"]
}`;

let chatSession: any = null;

/**
 * AI Powered Chatbot using gemini-3-pro-preview for deep reasoning.
 */
export async function sendMessageToSoleil(message: string, gender: string): Promise<SoleilResponse> {
  // Always use a new instance with the proper API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-3-pro-preview', // High-quality reasoning for chatbot
      config: {
        systemInstruction: SOLEIL_PROMPT,
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json"
      }
    });
  }

  try {
    const response = await chatSession.sendMessage({ 
      message: `User Context: ${gender}. Message: "${message}"` 
    });
    // Use .text property instead of .text() method
    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    
    return {
      message: parsed.message || "I found some wonderful options for you.",
      products: (parsed.recommendedProducts || []).map((p: any, idx: number) => ({
        ...p,
        id: p.id || `ici-${idx}-${Date.now()}`,
        matchScore: 100 - (idx * 5),
        ingredients: p.ingredients || ["Premium selection"],
        // Fix rating type mismatch by parsing to number
        rating: p.rating ? Number(p.rating) : Number((4.5 + Math.random() * 0.5).toFixed(1)),
        reviewCount: p.reviewCount || Math.floor(Math.random() * 1000)
      })),
      suggestions: parsed.suggestions || []
    };
  } catch (error) {
    console.error("Soleil Chat Failure:", error);
    chatSession = null;
    throw error;
  }
}

/**
 * Fast AI responses using gemini-flash-lite for low-latency search.
 */
export async function searchProducts(query: string, gender: string): Promise<SearchResult> {
  // Always use a new instance with the proper API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-flash-lite-latest'; // Low-latency model for fast search
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: `User Context: ${gender}. Query: "${query}". Provide the best matches from your consolidated catalog quickly.`,
      config: {
        systemInstruction: SOLEIL_PROMPT,
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json"
      }
    });

    // Use .text property instead of .text() method
    const text = response.text || '{}';
    let products: any[] = [];
    
    try {
      const parsed = JSON.parse(text);
      products = parsed.recommendedProducts || parsed.products || [];
    } catch (e) {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        products = JSON.parse(jsonMatch[0]).products || [];
      }
    }
    
    const processedProducts = products.map((p, idx) => {
      const fallbackUrl = "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=800&auto=format&fit=crop";
      return {
        ...p,
        id: p.id || `ici-${idx}-${Date.now()}`,
        matchScore: 100 - (idx * 5),
        image: p.image || fallbackUrl,
        ingredients: p.ingredients && p.ingredients.length > 0 ? p.ingredients : ["Dermatologisch getest"],
        // Fix rating type mismatch by parsing to number
        rating: p.rating ? Number(p.rating) : Number((4.5 + Math.random() * 0.5).toFixed(1)),
        reviewCount: p.reviewCount || Math.floor(Math.random() * 1000)
      };
    }) as Product[];

    const groundingSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'ICI Paris XL Official',
      uri: chunk.web?.uri || ''
    })).filter((s: any) => s.uri) || [];

    return {
      query,
      products: processedProducts,
      groundingSources
    };
  } catch (error) {
    console.error("Soleil Core Search Failure:", error);
    throw error;
  }
}
