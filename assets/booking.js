(function () {
  "use strict";
  const catalog = [
    {
      id: 1,
      category: "قسم الشعر (قص)",
      name: "قص غرة تحديد",
      price: 11,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 2,
      category: "قسم الشعر (قص)",
      name: "قص غرة مدرج",
      price: 34,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 3,
      category: "قسم الشعر (قص)",
      name: "قص تحديد",
      price: 34,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 4,
      category: "قسم الشعر (قص)",
      name: "قص مدرج",
      price: 69,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 5,
      category: "قسم الشعر (قص)",
      name: "قص بوي",
      price: 115,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 6,
      category: "قسم الشعر (قص)",
      name: "قص زيادة ماكينة",
      price: 69,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 7,
      category: "قسم الشعر ( تساريح)",
      name: "تسريحة شعر قصير",
      price: 138,
      kind: "خدمة",
      bookable: true,
    },
    {
      id: 8,
      category: "قسم الشعر ( تساريح)",
      name: "تسريحة شعر متوسط",
      price: 184,
      kind: "خدمة",
      bookable: true,
    },
    {
      id: 9,
      category: "قسم الشعر ( تساريح)",
      name: "تسريحة شعر فوق المتوسط او طويل",
      price: 253,
      kind: "خدمة",
      bookable: true,
    },
    {
      id: 10,
      category: "قسم الشعر ( تساريح)",
      name: "تسريحة شعر طويل جدا",
      price: 299,
      kind: "خدمة",
      bookable: true,
    },
    {
      id: 11,
      category: "قسم الشعر ( تساريح)",
      name: "تسريحة أطفال قصير",
      price: 69,
      kind: "خدمة",
      bookable: true,
    },
    {
      id: 12,
      category: "قسم الشعر ( تساريح)",
      name: "تسريحة أطفال متوسط",
      price: 92,
      kind: "خدمة",
      bookable: true,
    },
    {
      id: 13,
      category: "قسم الشعر ( تساريح)",
      name: "تسريحة أطفال طويل",
      price: 138,
      kind: "خدمة",
      bookable: true,
    },
    {
      id: 14,
      category: "قسم الشعر ( تساريح)",
      name: "تسريحة عروس خارجي",
      price: 1500,
      kind: "خدمة",
      bookable: true,
    },
    {
      id: 15,
      category: "قسم الشعر ( تساريح)",
      name: "تسريحة خارجي",
      price: 575,
      kind: "خدمة",
      bookable: true,
    },
    {
      id: 16,
      category: "قسم الشعر ( استشوارات",
      name: "استشوار شعر قصير",
      price: 46,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 17,
      category: "قسم الشعر ( استشوارات",
      name: "استشوار شعر متوسط",
      price: 69,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 18,
      category: "قسم الشعر ( استشوارات",
      name: "استشوار شعر فوق للمتوسط",
      price: 92,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 19,
      category: "قسم الشعر ( استشوارات",
      name: "استشوار شعر طويل",
      price: 138,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 20,
      category: "قسم الشعر ( استشوارات",
      name: "استشوار ويفي شعر قصير بالفرشة",
      price: 69,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 21,
      category: "قسم الشعر ( استشوارات",
      name: "استشوار ويفي شعر متوسط بالفرشة",
      price: 92,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 22,
      category: "قسم الشعر ( استشوارات",
      name: "استشوار ويفي طويل بالفرشة",
      price: 138,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 23,
      category: "قسم الشعر ( استشوارات",
      name: "زيادة ويفي",
      price: 46,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 24,
      category: "قسم الشعر ( استشوارات",
      name: "زيادة سيراميك",
      price: 46,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 25,
      category: "قسم الشعر ( استشوارات",
      name: "استشوار شعر طويل جدا",
      price: 161,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 26,
      category: "جدائل",
      name: "جديلة واحدة",
      price: 23,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 27,
      category: "جدائل",
      name: "اكسسوار جدائل الحبة",
      price: 10,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 28,
      category: "معالجات باردة",
      name: "حمام زيت كريمي شعر قصير",
      price: 69,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 29,
      category: "معالجات باردة",
      name: "حمام زيت كريمي متوسط",
      price: 92,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 30,
      category: "معالجات باردة",
      name: "حمام زيت كريمي طويل",
      price: 115,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 31,
      category: "معالجات باردة",
      name: "تنظيف فروة راس",
      price: 184,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 32,
      category: "معالجات باردة",
      name: "جلسة الكافيار الباردة",
      price: 184,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 33,
      category: "معالجات باردة",
      name: "جلسة جهاز تقصف الشعر",
      price: 184,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 34,
      category: "معالجات حارة",
      name: "بروتين شعر قصير",
      price: 345,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 35,
      category: "معالجات حارة",
      name: "بروتين جذور",
      price: 315,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 36,
      category: "معالجات حارة",
      name: "اوميغا زيرو+ شامبو بلسم",
      price: 600,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 37,
      category: "معالجات حارة",
      name: "سيليكون شعر قصير",
      price: 535,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 38,
      category: "معالجات حارة",
      name: "سيليكون شعر متوسط",
      price: 840,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 39,
      category: "معالجات حارة",
      name: "سيليكون شعر طويل",
      price: 1050,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 40,
      category: "قسم سبا الاظافر",
      name: "تنظيف يدين رجول كلاسيك",
      price: 120,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 41,
      category: "قسم سبا الاظافر",
      name: "تنظيف يدين",
      price: 40,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 42,
      category: "قسم سبا الاظافر",
      name: "تنظيف ارجل",
      price: 80,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 43,
      category: "قسم سبا الاظافر",
      name: "برافين يدين رجول",
      price: 46,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 44,
      category: "قسم سبا الاظافر",
      name: "برافين يدين",
      price: 23,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 45,
      category: "قسم سبا الاظافر",
      name: "برافين ارجل",
      price: 23,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 46,
      category: "قسم سبا الاظافر",
      name: "لون عادي",
      price: 17,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 47,
      category: "قسم سبا الاظافر",
      name: "لون فرنسي",
      price: 23,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 48,
      category: "قسم سبا الاظافر",
      name: "لون امبري",
      price: 120,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 49,
      category: "قسم سبا الاظافر",
      name: "لون جل",
      price: 369,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 50,
      category: "قسم سبا الاظافر",
      name: "جل اكستنشن",
      price: 345,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 51,
      category: "قسم سبا الاظافر",
      name: "اكليريك",
      price: 345,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 52,
      category: "قسم سبا الاظافر",
      name: "بولي جل",
      price: 369,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 53,
      category: "قسم سبا الاظافر",
      name: "لون بياب",
      price: 249,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 54,
      category: "قسم سبا الاظافر",
      name: "بياب اكستنشن",
      price: 249,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 55,
      category: "قسم سبا الاظافر",
      name: "لون كات اي",
      price: 120,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 56,
      category: "قسم سبا الاظافر",
      name: "لون كروم",
      price: 120,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 57,
      category: "قسم سبا الاظافر",
      name: "نيل ارت اظفر واحد",
      price: 11,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 58,
      category: "قسم سبا الاظافر",
      name: "اكسسوار اظفر واحد",
      price: 11,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 59,
      category: "قسم سبا الاظافر",
      name: "إزالة بياب اكستنشن",
      price: 31,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 60,
      category: "قسم سبا الاظافر",
      name: "إزالة بولي جل",
      price: 31,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 61,
      category: "قسم سبا الاظافر",
      name: "إزالة جل اكستنشن",
      price: 31,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 62,
      category: "قسم سبا الاظافر",
      name: "تنظيف روسي",
      price: 150,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 63,
      category: "تنظيف البشرة",
      name: "فتلة وجه",
      price: 46,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 64,
      category: "تنظيف البشرة",
      name: "شمع وجه",
      price: 46,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 65,
      category: "تنظيف البشرة",
      name: "فتلة اوشمع شنب",
      price: 23,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 66,
      category: "تنظيف البشرة",
      name: "شمع او حلاوة يدين وارجل",
      price: 138,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 67,
      category: "تنظيف البشرة",
      name: "شمع اوحلاوة يدين اوارجل",
      price: 69,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 68,
      category: "تنظيف البشرة",
      name: "شمع او حلاوة ظهر اوبطن اوصدر",
      price: 69,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 69,
      category: "تنظيف البشرة",
      name: "شمع اوحلاوة ابط",
      price: 23,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 70,
      category: "تنظيف البشرة",
      name: "شمع رقبة",
      price: 23,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 71,
      category: "المكياج",
      name: "مكياج ناعم",
      price: 184,
      kind: "خدمة",
      bookable: true,
    },
    {
      id: 72,
      category: "المكياج",
      name: "مكياج كنتور",
      price: 253,
      kind: "خدمة",
      bookable: true,
    },
    {
      id: 73,
      category: "المكياج",
      name: "مكياج بناتي",
      price: 138,
      kind: "خدمة",
      bookable: true,
    },
    {
      id: 74,
      category: "المكياج",
      name: "مكياج خارجي",
      price: 575,
      kind: "خدمة",
      bookable: true,
    },
    {
      id: 75,
      category: "المكياج",
      name: "كحل عيون فقط",
      price: 34,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 76,
      category: "المكياج",
      name: "رموش حبات",
      price: 115,
      kind: "منتج",
      bookable: false,
    },
    {
      id: 77,
      category: "المكياج",
      name: "تركيب رموش كاملة",
      price: 23,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 78,
      category: "المكياج",
      name: "تركيب رموش حبات",
      price: 69,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 79,
      category: "المكياج",
      name: "رموش كاملة",
      price: 57,
      kind: "منتج",
      bookable: false,
    },
    {
      id: 80,
      category: "المكياج",
      name: "رسم حواجب",
      price: 23,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 81,
      category: "المكياج",
      name: "صبغة وتشقير",
      price: 46,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 82,
      category: "المكياج",
      name: "صبغة اوتشقير",
      price: 23,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 83,
      category: "الصبغات",
      name: "تست صبغات",
      price: 11,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 84,
      category: "الصبغات",
      name: "رينساج",
      price: 168,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 85,
      category: "الصبغات",
      name: "زيادة اوبلكس",
      price: 63,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 86,
      category: "الصبغات",
      name: "زيادة صبغة بدون امونيا",
      price: 63,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 87,
      category: "الصبغات",
      name: "صبغة اطراف",
      price: 210,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 88,
      category: "الصبغات",
      name: "سحب اطراف",
      price: 105,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 89,
      category: "الصبغات",
      name: "امبرى فقط",
      price: 315,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 90,
      category: "الصبغات",
      name: "خصل قصدير قصير+ متوسط + فوق المتوسط",
      price: 231,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 91,
      category: "الصبغات",
      name: "خصل قصدير طويل وطويل جدا",
      price: 273,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 92,
      category: "الصبغات",
      name: "خصل طاقية قصير + متوسط + فوق المتوسط",
      price: 168,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 93,
      category: "الصبغات",
      name: "خصل طاقية طويل وطويل جدا",
      price: 231,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 94,
      category: "الصبغات",
      name: "صبغة جذور",
      price: 83,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 95,
      category: "الصبغات",
      name: "صبغة جذور بدون امونيا",
      price: 150,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 96,
      category: "الصبغات",
      name: "خصل كنتور فقط",
      price: 63,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 97,
      category: "الصبغات",
      name: "كنتور كامل + لون",
      price: 450,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 98,
      category: "الصبغات",
      name: "خصلة واحدة",
      price: 21,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 99,
      category: "الصبغات",
      name: "صبغة لون قصير",
      price: 210,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 100,
      category: "الصبغات",
      name: "صبغة لون متوسط",
      price: 273,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 101,
      category: "الصبغات",
      name: "صبغة لون فوق المتوسط",
      price: 378,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 102,
      category: "الصبغات",
      name: "صبغة لون طويل",
      price: 483,
      kind: "خدمة",
      bookable: false,
    },
    {
      id: 103,
      category: "الصبغات",
      name: "صبغة لون طويل جدا",
      price: 588,
      kind: "خدمة",
      bookable: false,
    },
  ];
  const phone = "966506628187";
  const bookingFeePerService = 20;
  // catalog field `bookable` = the service needs the 20 ر.س confirmation fee; every other item can still be requested
  const requiresFee = (item) => item.bookable === true;
  const BANK = {
    name: "مصرف الإنماء",
    account: "فرع شركة زهرة شيفون للتزيين النسائي",
    iban: "SA9805000068203296839000",
  };
  const DRAFT_KEY = "shiffon-draft",
    DRAFT_TTL = 24 * 60 * 60 * 1000;
  // Arabic-Indic / Persian digits → 0-9, then +966 / 00966 / 966 / 5XXXXXXXX → 05XXXXXXXX; null when not a Saudi mobile
  function normalizeMobile(raw) {
    let d = String(raw || "")
      .replace(/[\u0660-\u0669]/g, (c) => c.charCodeAt(0) - 0x0660)
      .replace(/[\u06F0-\u06F9]/g, (c) => c.charCodeAt(0) - 0x06f0)
      .replace(/[\s().\-\u200e\u200f]/g, "");
    if (d.startsWith("+")) d = d.slice(1);
    if (d.startsWith("00966")) d = "0" + d.slice(5);
    else if (d.startsWith("966")) d = "0" + d.slice(3);
    else if (/^5\d{8}$/.test(d)) d = "0" + d;
    return /^05\d{8}$/.test(d) ? d : null;
  }
  const $ = (id) => document.getElementById(id);
  const money = (n) => new Intl.NumberFormat("en-US").format(n) + " ر.س";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ——— state ———
  let cart = []; // [{ id, employee }]
  let category = ""; // '' = all
  let query = "";
  const byId = new Map(catalog.map((x) => [x.id, x]));
  const categories = [...new Set(catalog.map((x) => x.category))];
  const shortCat = (c) =>
    ({
      "قسم الشعر (قص)": "قص الشعر",
      "قسم الشعر ( تساريح)": "التساريح",
      "قسم الشعر ( استشوارات": "الاستشوار",
      "قسم سبا الاظافر": "الأظافر",
      "تنظيف البشرة": "البشرة",
    })[c] ||
    c
      .replace(/^قسم\s+/, "")
      .replace(/[()]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  function persist() {
    try {
      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          v: 2,
          savedAt: Date.now(),
          cart,
          customer: $("customer").value,
          mobile: $("mobile").value,
          day: $("day").value,
          time: $("time").value,
        }),
      );
    } catch (e) {}
  }

  // ——— chips ———
  function renderChips() {
    const host = $("chips");
    host.replaceChildren();
    [["", "الكل"], ...categories.map((c) => [c, shortCat(c)])].forEach(
      ([val, label]) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "chip";
        b.textContent = label;
        b.setAttribute("aria-pressed", String(val === category));
        b.addEventListener("click", () => {
          category = val;
          renderChips();
          renderList(true);
          b.scrollIntoView({
            inline: "center",
            block: "nearest",
            behavior: reduced ? "auto" : "smooth",
          });
        });
        host.append(b);
      },
    );
  }

  // ——— list ———
  const count = (id) => cart.filter((e) => e.id === id).length;
  const controls = new Map();
  const wideMQ = matchMedia("(min-width: 1440px)");
  wideMQ.addEventListener("change", () => renderList());
  function renderList(announce) {
    const host = $("list");
    host.replaceChildren();
    controls.clear();
    const q = query.trim().toLocaleLowerCase("ar");
    const shown = catalog.filter(
      (x) =>
        (!category || x.category === category) &&
        (!q ||
          x.name.toLocaleLowerCase("ar").includes(q) ||
          x.category.toLocaleLowerCase("ar").includes(q)),
    );
    if (announce)
      $("resultCount").textContent = shown.length
        ? `${shown.length} نتيجة`
        : "لا توجد نتائج";
    if (!shown.length) {
      const p = document.createElement("div");
      p.className = "empty";
      p.textContent = "لم نجد خدمة بهذا الاسم.";
      host.append(p);
      return;
    }
    const sections = new Map(),
      secs = [];
    for (const item of shown) {
      const key = q ? "نتائج البحث" : shortCat(item.category);
      if (!sections.has(key)) sections.set(key, []);
      sections.get(key).push(item);
    }
    for (const [title, items] of sections) {
      const sec = document.createElement("section");
      const g = document.createElement("div");
      g.className = "group";
      g.textContent = title;
      const n = document.createElement("small");
      n.textContent =
        items.length === 1
          ? "خدمة واحدة"
          : items.length === 2
            ? "خدمتان"
            : items.length + " خدمات";
      g.append(n);
      const box = document.createElement("div");
      box.className = "box";
      sec.append(g, box);
      host.append(sec);
      secs.push({ sec, w: items.length + 1.6, i: secs.length });
      for (const item of items) {
        const row = document.createElement("div");
        row.className = "row";
        const txt = document.createElement("div");
        txt.className = "txt";
        const name = document.createElement("div");
        name.className = "name";
        name.textContent = item.name;
        const meta = document.createElement("div");
        meta.className = "meta";
        if (requiresFee(item)) {
          const tg = document.createElement("span");
          tg.className = "tag";
          tg.textContent = "رسوم تأكيد الحجز 20 ر.س";
          meta.append(tg);
        } else if (item.kind === "منتج") {
          const tg = document.createElement("span");
          tg.className = "tag muted";
          tg.textContent = "منتج";
          meta.append(tg);
        }
        const st = document.createElement("span");
        meta.append(st);
        txt.append(name, meta);
        if (!requiresFee(item) && item.kind !== "منتج") meta.hidden = true;
        const price = document.createElement("div");
        price.className = "price";
        price.textContent = money(item.price);
        const ctl = document.createElement("span");
        const update = () => {
          const n = count(item.id);
          row.classList.toggle("on", n > 0);
          st.textContent =
            n > 1 ? `العدد ${n} (لأكثر من عميلة)` : n ? "في طلبك" : "";
          meta.hidden = !(n || requiresFee(item) || item.kind === "منتج");
          ctl.replaceChildren();
          if (!n) {
            const add = document.createElement("button");
            add.type = "button";
            add.className = "add";
            add.textContent = "+";
            add.setAttribute("aria-label", "إضافة " + item.name);
            add.addEventListener("click", () => addItem(item.id));
            ctl.append(add);
            return;
          }
          const q = document.createElement("span");
          q.className = "qty";
          q.setAttribute("role", "group");
          q.setAttribute("aria-label", `العدد: ${n} — ${item.name}`);
          const minus = document.createElement("button");
          minus.type = "button";
          minus.textContent = "−";
          minus.setAttribute("aria-label", "تقليل " + item.name);
          minus.addEventListener("click", () => removeOne(item.id));
          const out = document.createElement("output");
          out.textContent = String(n);
          const plus = document.createElement("button");
          plus.type = "button";
          plus.className = "plus";
          plus.textContent = "+";
          plus.setAttribute("aria-label", "زيادة " + item.name);
          plus.addEventListener("click", () => {
            addItem(item.id);
          });
          q.append(minus, out, plus);
          ctl.append(q);
          if (!reduced) {
            out.classList.add("pop");
            setTimeout(() => out.classList.remove("pop"), 170);
          }
        };
        controls.set(item.id, update);
        update();
        // optional service photo: only rendered when the catalog item carries an `image` path
        if (typeof item.image === "string" && item.image) {
          const im = document.createElement("img");
          im.className = "thumb";
          im.src = item.image;
          im.alt = "";
          im.width = 40;
          im.height = 40;
          im.loading = "lazy";
          im.decoding = "async";
          row.append(im);
        }
        row.append(txt, price, ctl);
        box.append(row);
      }
    }
    // wide screens: two columns of whole categories, heaviest first into the shorter column, then each column keeps the menu order
    if (wideMQ.matches && secs.length > 1) {
      const cols = [[], []],
        load = [0, 0];
      [...secs]
        .sort((a, b) => b.w - a.w)
        .forEach((x) => {
          const k = load[0] <= load[1] ? 0 : 1;
          cols[k].push(x);
          load[k] += x.w;
        });
      if (!cols[0].some((x) => x.i === 0)) cols.reverse(); // the column holding the first category opens the menu
      host.replaceChildren(
        ...cols.map((c) => {
          const d = document.createElement("div");
          d.className = "col";
          c.sort((a, b) => a.i - b.i).forEach((x) => d.append(x.sec));
          return d;
        }),
      );
    }
  }
  function addItem(id) {
    cart.push({ id, employee: "" });
    renderCart();
    controls.get(id)?.();
    buzz(8);
  }
  function removeOne(id) {
    for (let i = cart.length - 1; i >= 0; i--) {
      if (cart[i].id === id) {
        removeAt(i);
        break;
      }
    }
  }
  let undoTimer = null,
    removed = null;
  // keep the undo toast clear of the sheet: above the peek footer while collapsed, above the send footer while open, near the bottom when the sheet is away
  function placeToast() {
    if ($("toast").hidden || desk) return;
    $("toast").style.bottom =
      (!visible
        ? 8
        : expanded
          ? $("foot").offsetHeight
          : parseFloat(
              getComputedStyle(document.documentElement).getPropertyValue(
                "--peek",
              ),
            )) +
      12 +
      "px";
  }
  function removeAt(i) {
    removed = { index: i, entry: cart[i] };
    const name = byId.get(cart[i].id).name;
    cart.splice(i, 1);
    renderCart();
    controls.get(removed.entry.id)?.();
    $("toastMsg").textContent = "أُزيلت " + name;
    $("toast").hidden = false;
    placeToast();
    clearTimeout(undoTimer);
    undoTimer = setTimeout(() => {
      $("toast").hidden = true;
      removed = null;
    }, 4500);
  }
  $("undo").addEventListener("click", () => {
    if (!removed) return;
    cart.splice(Math.min(removed.index, cart.length), 0, removed.entry);
    const id = removed.entry.id;
    removed = null;
    $("toast").hidden = true;
    clearTimeout(undoTimer);
    renderCart();
    controls.get(id)?.();
  });
  const buzz = (ms) => {
    try {
      if (!reduced && navigator.vibrate) navigator.vibrate(ms);
    } catch (e) {}
  };

  // ——— cart / sheet content ———
  const feeCount = () => cart.filter((e) => requiresFee(byId.get(e.id))).length;
  const servicesTotal = () =>
    cart.reduce((s, e) => s + byId.get(e.id).price, 0);
  function renderCart() {
    const host = $("lines");
    host.replaceChildren();
    if (!cart.length) {
      const p = document.createElement("div");
      p.className = "empty";
      p.innerHTML =
        "<strong>طلبكِ فارغ</strong>اختاري خدمة أو أكثر من القائمة، ثم يظهر هنا ملخص الطلب وبيانات الموعد.";
      host.append(p);
    } else {
      const wrap = document.createElement("div");
      wrap.className = "lines";
      cart.forEach((entry, index) => {
        const item = byId.get(entry.id);
        const line = document.createElement("div");
        line.className = "line";
        const h = document.createElement("div");
        h.className = "h";
        const n = document.createElement("div");
        n.className = "n";
        n.textContent = item.name;
        const p = document.createElement("div");
        p.className = "p";
        p.textContent = money(item.price);
        const rm = document.createElement("button");
        rm.type = "button";
        rm.className = "lnk rm";
        rm.textContent = "إزالة";
        rm.setAttribute("aria-label", "إزالة " + item.name);
        rm.addEventListener("click", () => removeAt(index));
        h.append(n, p, rm);
        line.append(h);
        const s = document.createElement("div");
        s.className = "s" + (requiresFee(item) ? " fee" : "");
        s.textContent = requiresFee(item)
          ? "رسوم تأكيد الحجز 20 ر.س"
          : item.kind === "منتج"
            ? "منتج ضمن الطلب — يؤكد التوفر عبر واتساب"
            : "بدون رسوم تأكيد — يخضع التوفر لمراجعة الصالون";
        line.append(s);
        if (item.kind !== "منتج") {
          const f = document.createElement("label");
          f.className = "field";
          f.textContent = "الموظفة المفضلة لهذه الخدمة (اختياري)";
          const inp = document.createElement("input");
          inp.type = "text";
          inp.placeholder = "اسم الموظفة";
          inp.value = entry.employee;
          inp.id = "emp-" + index;
          inp.addEventListener("input", (ev) => {
            entry.employee = ev.target.value;
            persist();
          });
          f.append(inp);
          // folded until asked for; a saved name keeps it open
          if (entry.employee) line.append(f);
          else {
            const eb = document.createElement("button");
            eb.type = "button";
            eb.className = "lnk emp";
            eb.textContent = "+ اختيار موظفة مفضلة (اختياري)";
            eb.addEventListener("click", () => {
              eb.replaceWith(f);
              inp.focus();
            });
            line.append(eb);
          }
        }
        wrap.append(line);
      });
      host.append(wrap);
      if (cart.some((e) => byId.get(e.id).kind !== "منتج")) {
        const av = document.createElement("p");
        av.className = "note gap";
        av.textContent =
          "الموظفة المفضلة اختيارية. الوقت والموظفة المفضلة يخضعان للتوفر، ويتم اعتماد الموعد بعد مراجعة الصالون.";
        host.append(av);
      }
      if (new Set(cart.map((e) => e.id)).size < cart.length) {
        const dup = document.createElement("p");
        dup.className = "note";
        dup.textContent =
          "تكرار الخدمة يعني أكثر من عميلة؛ تُحسب رسوم التأكيد لكل عميلة.";
        host.append(dup);
      }
    }
    const fee = feeCount() * bookingFeePerService,
      svc = servicesTotal();
    $("tServices").textContent = money(svc);
    $("tLater").textContent = money(svc);
    $("tFeeLbl").textContent = fee
      ? "رسوم التأكيد بعد اعتماد الوقت"
      : "رسوم التأكيد";
    $("tFee").textContent = money(fee);
    $("tFeeZero").hidden = fee > 0;
    // the order is a request: no transfer until a salon employee confirms the requested time is available
    const nb = $("notice");
    nb.replaceChildren();
    if (fee) {
      const st = document.createElement("strong");
      st.textContent =
        "لا تحولي رسوم التأكيد قبل أن تؤكد موظفة الصالون توفر الوقت المطلوب.";
      nb.append(
        st,
        `بعد تأكيد التوفر يتم تحويل رسوم التأكيد (${money(fee)})، وبعد استلامها يُعتمد الحجز. رسوم التأكيد لا تُخصم من قيمة الخدمات وغير مستردة عند إلغائكِ بعد تأكيد الموعد، وإذا تعذر اعتماد الوقت المطلوب تتواصل معكِ الموظفة لترتيب الخيار المناسب.`,
      );
    } else
      nb.append(
        "لا يوجد مبلغ مطلوب للتحويل. يؤكد الصالون توفر الموعد عبر واتساب.",
      );
    $("sumAmt").textContent = money(svc);
    sheet.classList.toggle("is-empty", cart.length === 0);
    $("sumLbl").textContent = cart.length
      ? `${cart.length === 1 ? "خدمة واحدة" : cart.length === 2 ? "خدمتان" : cart.length + " خدمات"} · ${fee ? "رسوم التأكيد " + money(fee) : "بدون رسوم تأكيد"}`
      : "لم تختاري خدمة بعد";
    persist();
    setVisible(cart.length > 0);
    measure();
    placeToast();
  }

  // ——— time options / date ———
  $("time").innerHTML =
    '<option value="">اختاري الساعة</option>' +
    Array.from({ length: 12 }, (_, i) => i + 10)
      .map(
        (h) =>
          `<option value="${String(h).padStart(2, "0")}:00">${h % 12 || 12}:00 ${h < 12 ? "صباحًا" : "مساءً"}</option>`,
      )
      .join("");
  // dates follow the salon's clock (Riyadh), not the device's time zone
  const riyadhISO = (plusDays = 0) =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Riyadh",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(Date.now() + plusDays * 864e5));
  const todayISO = () => riyadhISO(0);
  // no same-day bookings: same-day clients walk in; the first bookable day is tomorrow
  const firstBookableISO = () => riyadhISO(1);
  const SAME_DAY_MSG =
    "الحجز لنفس اليوم غير متاح. لخدمة اليوم توجّهي للصالون مباشرة والدخول فوري، أو اختاري تاريخًا من الغد لحجز موعد.";
  const dayError = (v) =>
    !v
      ? ""
      : v === todayISO()
        ? SAME_DAY_MSG
        : v < todayISO()
          ? "هذا التاريخ مضى؛ اختاري تاريخًا من الغد فصاعدًا."
          : "";
  $("day").min = firstBookableISO();
  // restore the draft only now that the hour options exist; stale (24h+) drafts, past days and elapsed hours are dropped
  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
    if (
      saved &&
      Array.isArray(saved.cart) &&
      !(saved.savedAt && Date.now() - saved.savedAt > DRAFT_TTL)
    ) {
      cart = saved.cart
        .filter((e) => e && byId.has(e.id))
        .map((e) => ({
          id: e.id,
          employee: typeof e.employee === "string" ? e.employee : "",
        }));
      ["customer", "mobile"].forEach((k) => {
        if (typeof saved[k] === "string") $(k).value = saved[k];
      });
      let restoredDay = false;
      if (
        typeof saved.day === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(saved.day) &&
        saved.day >= firstBookableISO()
      ) {
        $("day").value = saved.day;
        restoredDay = $("day").value === saved.day;
      }
      // a time is only meaningful with its day; syncHours() below drops it if that hour has already started today
      if (
        restoredDay &&
        typeof saved.time === "string" &&
        [...$("time").options].some((o) => o.value && o.value === saved.time)
      )
        $("time").value = saved.time;
      syncHours();
    } else if (saved) localStorage.removeItem(DRAFT_KEY);
  } catch (e) {}
  // on today's date, hours that have started are not bookable
  function syncHours() {
    $("day").min = firstBookableISO();
    const today = $("day").value === todayISO(),
      now = new Date().getHours();
    [...$("time").options].forEach((o) => {
      if (o.value) o.disabled = today && Number(o.value.slice(0, 2)) <= now;
    });
    if ($("time").selectedOptions[0]?.disabled) $("time").value = "";
  }
  function requestedDate() {
    const v = $("day").value;
    if (!v)
      throw Object.assign(new Error("اختاري تاريخ الموعد قبل الإرسال."), {
        field: "day",
      });
    if (dayError(v))
      throw Object.assign(new Error(dayError(v)), { field: "day" });
    const [y, m, d] = v.split("-").map(Number);
    const weekday = new Intl.DateTimeFormat("ar-SA", {
      weekday: "long",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(y, m - 1, d, 12)));
    const label = new Intl.DateTimeFormat("ar-SA-u-ca-gregory-nu-latn", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(y, m - 1, d, 12)));
    return { formatted: `${m}/${d}/${y}`, weekday, label };
  }
  function requestedTime() {
    const v = $("time").value;
    if (!v)
      throw Object.assign(new Error("حددي الوقت المطلوب قبل الإرسال."), {
        field: "time",
      });
    const [h, mi] = v.split(":").map(Number);
    if (mi !== 0 || h < 10 || h > 21)
      throw Object.assign(new Error("اختاري بداية ساعة متاحة فقط."), {
        field: "time",
      });
    if ($("day").value === todayISO() && h <= new Date().getHours())
      throw Object.assign(
        new Error("هذه الساعة مضت اليوم؛ اختاري ساعة لاحقة أو يومًا آخر."),
        { field: "time" },
      );
    return `${h % 12 || 12} ${h < 12 ? "صباحًا" : "مساءً"}`;
  }
  // shows the chosen date as "الخميس، 24 سبتمبر" (Gregorian, Western digits); year only when it is not this year
  function renderDayFace() {
    const v = $("day").value,
      face = $("dayFace");
    if (!v) {
      face.textContent = "اختاري اليوم والشهر";
      face.classList.add("empty");
      return;
    }
    const [y, m, d] = v.split("-").map(Number);
    const opts = {
      weekday: "long",
      day: "numeric",
      month: "long",
      timeZone: "UTC",
    };
    if (y !== new Date().getFullYear()) opts.year = "numeric";
    face.textContent = new Intl.DateTimeFormat(
      "ar-SA-u-ca-gregory-nu-latn",
      opts,
    ).format(new Date(Date.UTC(y, m - 1, d, 12)));
    face.classList.remove("empty");
  }
  $("day").addEventListener("click", () => {
    try {
      $("day").showPicker();
    } catch (e) {}
  });
  $("day").addEventListener("change", () => {
    renderDayFace();
    syncHours();
    try {
      $("weekday").textContent = $("day").value
        ? `اليوم: ${requestedDate().weekday}`
        : "اختاري التاريخ ليظهر اليوم.";
    } catch (e) {}
    persist();
  });
  ["customer", "mobile", "time"].forEach((k) =>
    $(k).addEventListener("input", persist),
  );

  function bookingText() {
    const customer = $("customer").value.trim();
    const mobile = normalizeMobile($("mobile").value);
    if (!cart.length)
      throw Object.assign(new Error("اختاري خدمة واحدة على الأقل."), {
        field: null,
      });
    if (!customer)
      throw Object.assign(new Error("اكتبي اسم العميلة قبل الإرسال."), {
        field: "customer",
      });
    if (!mobile)
      throw Object.assign(
        new Error("اكتبي رقم جوال سعودي صحيحًا، مثل 05XXXXXXXX."),
        { field: "mobile" },
      );
    const date = requestedDate();
    const time = requestedTime();
    // same service more than once = more than one client; grouped as "× n" with each client's preferred employee
    const groups = [];
    cart.forEach((e) => {
      let g = groups.find((x) => x.id === e.id);
      if (!g) {
        g = { id: e.id, n: 0, emps: [] };
        groups.push(g);
      }
      g.n++;
      if (e.employee.trim()) g.emps.push(e.employee.trim());
    });
    const fee = feeCount() * bookingFeePerService,
      svc = servicesTotal();
    const lines = [
      "طلب حجز — صالون شيفون",
      "",
      `الاسم: ${customer}`,
      `الجوال: ${mobile}`,
      `التاريخ: ${date.label}`,
      `الوقت المطلوب: ${time}`,
      "",
      "الخدمات:",
    ];
    groups.forEach((g, i) => {
      const it = byId.get(g.id);
      lines.push(
        `${i + 1}. ${it.name}${g.n > 1 ? ` × ${g.n}` : ""} — ${it.price} ريال${g.n > 1 ? " للواحدة" : ""}${it.kind === "منتج" ? " (منتج)" : requiresFee(it) ? " (رسوم تأكيد)" : ""}`,
      );
      if (g.emps.length) lines.push(`   الموظفة المفضلة: ${g.emps.join("، ")}`);
    });
    lines.push(
      "",
      `قيمة الخدمات: ${svc} ريال (تُدفع عند تقديم الخدمة)`,
      fee
        ? `رسوم التأكيد بعد اعتماد الوقت: ${fee} ريال`
        : "رسوم التأكيد: 0 ريال",
      "",
      "مدة كل خدمة: ساعة تقريبًا.",
      "الوقت والموظفة يخضعان للتوفر ومراجعة الصالون.",
      "",
    );
    if (fee)
      lines.push(
        "مهم:",
        "لا تحولي رسوم التأكيد الآن.",
        "انتظري أولًا تأكيد موظفة الصالون بأن الوقت المطلوب متوفر.",
        `بعد تأكيد التوفر من الموظفة يتم تحويل رسوم التأكيد (${fee} ريال) لاعتماد الحجز.`,
        "",
        "بيانات التحويل — تُستخدم فقط بعد تأكيد الموظفة توفر الوقت:",
        `البنك: ${BANK.name}`,
        `اسم الحساب: ${BANK.account}`,
        "الآيبان:",
        BANK.iban,
        "",
        "بعد تأكيد التوفر واستلام رسوم التأكيد يتم اعتماد الحجز.",
        "رسوم التأكيد لا تُخصم من قيمة الخدمات وغير مستردة عند إلغاء الموعد بعد تأكيده.",
      );
    else
      lines.push(
        "لا يوجد مبلغ مطلوب للتحويل.",
        "يؤكد الصالون توفر الموعد عبر واتساب.",
      );
    return lines.join("\n");
  }
  function clearInvalid() {
    ["customer", "mobile", "day", "time"].forEach((k) =>
      $(k).removeAttribute("aria-invalid"),
    );
  }
  // inline validation on blur/change — the same rules bookingText() enforces on send
  const checks = {
    customer: () => ($("customer").value.trim() ? "" : "اكتبي اسمكِ الكامل."),
    mobile: () =>
      normalizeMobile($("mobile").value)
        ? ""
        : "اكتبي رقم جوال سعودي صحيحًا، مثل 05XXXXXXXX.",
    day: () =>
      !$("day").value ? "اختاري تاريخ الموعد." : dayError($("day").value),
    time: () => ($("time").value ? "" : "حددي الوقت المطلوب."),
  };
  Object.keys(checks).forEach((k) => {
    const el = $(k);
    const ev =
      el.tagName === "SELECT" || el.type === "date" ? "change" : "blur";
    el.addEventListener(ev, () => {
      const msg = checks[k]();
      el.setAttribute("aria-invalid", msg ? "true" : "false");
      if (!msg) el.removeAttribute("aria-invalid");
      if (msg) {
        $("err").textContent = msg;
      } else if ($("err").textContent === (el.dataset.lastMsg || "")) {
        $("err").textContent = "";
      }
      el.dataset.lastMsg = msg;
    });
  });
  $("mobile").addEventListener("blur", () => {
    const m = normalizeMobile($("mobile").value);
    if (m && m !== $("mobile").value) {
      $("mobile").value = m;
      persist();
    }
  });
  // conversion hook — no name, phone, IBAN or any personal data; pushes to dataLayer / gtag only if the page has them
  function trackBookingWhatsAppClick() {
    const items = cart.map((e) => byId.get(e.id)),
      isProduct = (i) => i.kind === "منتج";
    const payload = {
      event: "booking_whatsapp_click",
      items_count: items.length,
      services_count: items.filter((i) => !isProduct(i)).length,
      products_count: items.filter(isProduct).length,
      fee_services_count: feeCount(),
      items_value: servicesTotal(),
      confirmation_fee: feeCount() * bookingFeePerService,
      currency: "SAR",
      has_hair_styling_fee_service: items.some(
        (i) => i.category === "قسم الشعر ( تساريح)" && requiresFee(i),
      ),
      has_makeup_fee_service: items.some(
        (i) => i.category === "المكياج" && requiresFee(i),
      ),
    };
    try {
      (window.dataLayer = window.dataLayer || []).push(payload);
    } catch (e) {}
    try {
      if (typeof window.gtag === "function") {
        const { event, ...params } = payload;
        window.gtag("event", event, params);
      }
    } catch (e) {}
  }
  // "start a new order": two-step confirm when there is something to lose
  let resetTimer = null;
  $("reset").addEventListener("click", () => {
    const b = $("reset"),
      dirty =
        cart.length ||
        ["customer", "mobile", "day", "time"].some((k) => $(k).value);
    if (dirty && !b.classList.contains("armed")) {
      b.classList.add("armed");
      b.textContent = "اضغطي مرة أخرى لمسح الطلب";
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        b.classList.remove("armed");
        b.textContent = "بدء طلب جديد";
      }, 4000);
      return;
    }
    clearTimeout(resetTimer);
    b.classList.remove("armed");
    b.textContent = "بدء طلب جديد";
    const ids = new Set(cart.map((e) => e.id));
    cart = [];
    removed = null;
    $("toast").hidden = true;
    ["customer", "mobile", "day", "time"].forEach((k) => {
      $(k).value = "";
      $(k).removeAttribute("aria-invalid");
    });
    $("err").textContent = "";
    $("status").textContent = "";
    renderDayFace();
    syncHours();
    renderCart();
    ids.forEach((id) => controls.get(id)?.());
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (e) {} // renderCart re-persists, so the draft is removed last
  });
  $("go").addEventListener("click", () => {
    if (visible) openSheet();
  });
  $("send").addEventListener("click", () => {
    clearInvalid();
    $("err").textContent = "";
    $("status").textContent = "";
    try {
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(bookingText())}`;
      trackBookingWhatsAppClick();
      const w = window.open(url, "_blank");
      if (w) {
        try {
          w.opener = null;
        } catch (e) {}
      } else {
        location.href = url;
      }
      $("status").textContent =
        "جارٍ فتح واتساب مع نص الطلب… إن لم يُفتح تلقائيًا اضغطي الزر مرة أخرى.";
      buzz(12);
    } catch (e) {
      $("err").textContent = e.message;
      if (e.field) {
        $(e.field).setAttribute("aria-invalid", "true");
        $(e.field).focus({ preventScroll: false });
      }
    }
  });

  // ——— sheet physics: spring + drag with velocity handoff ———
  const sheet = $("sheet");
  let expanded = false,
    y = 0,
    travel = 0,
    anim = null,
    visible = false,
    hiddenY = 0,
    booted = false;
  const deskMQ = matchMedia("(min-width: 900px)");
  let desk = deskMQ.matches;
  function measure() {
    if (desk) return;
    const sab =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--sab"),
      ) || 0;
    const head = $("grab").offsetHeight + $("sum").offsetHeight;
    $("peekfoot").style.top = head + "px";
    const peek = head + $("peekfoot").offsetHeight + 18 + sab;
    document.documentElement.style.setProperty("--peek", peek + "px");
    // iPhone Safari resizes the visual viewport when its keyboard opens,
    // while the layout viewport (innerHeight) may stay unchanged.
    const viewport = window.visualViewport;
    const viewportHeight = viewport ? viewport.height : window.innerHeight;
    const keyboardInset = viewport
      ? Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)
      : 0;
    const full = Math.min(viewportHeight * 0.88, 760);
    sheet.style.bottom = keyboardInset + "px";
    sheet.style.height = full + "px";
    travel = full - peek;
    hiddenY = full + 80;
    if (!anim && !dragging) setY(!visible ? hiddenY : expanded ? 0 : travel);
  }
  function setY(v) {
    if (desk) return;
    y = v;
    sheet.style.transform = `translateX(-50%) translateY(${v}px)`;
    const k = travel ? Math.min(1, Math.max(0, v / travel)) : 1;
    $("body").style.opacity = $("foot").style.opacity = String(1 - k);
    $("peekfoot").style.opacity = String(k);
  }
  function spring(to, v0, bounce) {
    if (desk) return;
    if (anim) cancelAnimationFrame(anim.raf);
    if (reduced) {
      setY(to);
      anim = null;
      return;
    }
    // damping ratio 1.0 (or 0.85 after a flick), response 0.36s — Apple-style parameters
    const zeta = bounce ? 0.85 : 1.0,
      response = 0.36,
      omega = (2 * Math.PI) / response;
    let x = y - to,
      v = v0,
      last = performance.now();
    const step = (now) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const a = -2 * zeta * omega * v - omega * omega * x;
      v += a * dt;
      x += v * dt;
      setY(to + x);
      if (Math.abs(x) < 0.3 && Math.abs(v) < 6) {
        setY(to);
        anim = null;
        return;
      }
      anim.raf = requestAnimationFrame(step);
    };
    anim = { raf: requestAnimationFrame(step), velocity: () => v };
  }
  function openSheet(v0, bounce) {
    if (desk) return;
    if (v0 == null && anim) v0 = anim.velocity();
    expanded = true;
    $("body").inert = false;
    $("foot").inert = false;
    $("peekfoot").inert = true;
    $("toggle").setAttribute("aria-expanded", "true");
    $("toggle").textContent = "إغلاق";
    sheet.classList.add("open");
    spring(0, v0 || 0, bounce);
  }
  function closeSheet(v0, bounce) {
    if (desk) return;
    if (v0 == null && anim) v0 = anim.velocity();
    expanded = false;
    $("body").inert = true;
    $("foot").inert = true;
    $("peekfoot").inert = false;
    $("toggle").setAttribute("aria-expanded", "false");
    $("toggle").textContent = "تفاصيل";
    sheet.classList.remove("open");
    $("err").textContent = "";
    spring(travel, v0 || 0, bounce);
  }
  $("toggle").addEventListener("click", () =>
    expanded ? closeSheet() : openSheet(),
  );
  function applyMode() {
    desk = deskMQ.matches;
    sheet.classList.toggle("desk", desk);
    if (anim) {
      cancelAnimationFrame(anim.raf);
      anim = null;
    }
    if (desk) {
      sheet.style.transform = "";
      sheet.style.height = "";
      sheet.style.bottom = "";
      $("body").style.opacity = "";
      $("foot").style.opacity = "";
      $("peekfoot").style.opacity = "";
      sheet.inert = false;
      sheet.setAttribute("aria-hidden", "false");
      $("body").inert = false;
      $("foot").inert = false;
      $("peekfoot").inert = true;
      sheet.classList.add("open");
    } else {
      expanded = false;
      sheet.classList.remove("open");
      $("toggle").setAttribute("aria-expanded", "false");
      $("toggle").textContent = "تفاصيل";
      $("body").inert = true;
      $("foot").inert = true;
      $("peekfoot").inert = !visible;
      sheet.inert = !visible;
      sheet.setAttribute("aria-hidden", String(!visible));
      measure();
      setY(visible ? travel : hiddenY);
    }
  }
  deskMQ.addEventListener("change", applyMode);
  // the sheet exists only once something is in the order: it rises when the first service is added and leaves when the last is removed
  function setVisible(v) {
    if (v === visible) return;
    visible = v;
    if (desk) {
      document.documentElement.classList.toggle("has-cart", v);
      return;
    }
    document.documentElement.classList.toggle("has-cart", v);
    sheet.inert = !v;
    sheet.setAttribute("aria-hidden", String(!v));
    // the peek footer (متابعة) must leave the inert state applyMode gave it while the cart was empty — otherwise the button is un-tappable until the sheet is toggled
    if (v) {
      $("peekfoot").inert = false;
      if (booted) spring(travel, 0, false);
      else setY(travel);
    } else {
      expanded = false;
      $("peekfoot").inert = true;
      $("toggle").setAttribute("aria-expanded", "false");
      $("toggle").textContent = "تفاصيل";
      sheet.classList.remove("open");
      $("err").textContent = "";
      if (booted) spring(hiddenY, 0, false);
      else setY(hiddenY);
    }
  }

  // drag from the grabber and summary rows, 1:1, rubber-band past the ends, project momentum on release
  let dragging = false,
    startY = 0,
    startT = 0,
    hist = [],
    moved = false;
  const rubber = (over, dim = 300, c = 0.55) =>
    (over * dim * c) / (dim + c * Math.abs(over));
  const project = (v, rate = 0.998) => ((v / 1000) * rate) / (1 - rate);
  function down(e) {
    if (desk || !visible || (e.button && e.button !== 0)) return;
    dragging = true;
    moved = false;
    if (anim) {
      cancelAnimationFrame(anim.raf);
      anim = null;
    }
    startY = e.clientY - y;
    hist = [[e.clientY, performance.now()]];
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function move(e) {
    if (!dragging) return;
    let ny = e.clientY - startY;
    if (Math.abs(e.clientY - hist[0][0]) > 6) moved = true;
    if (ny < 0) ny = rubber(ny);
    else if (ny > travel) ny = travel + rubber(ny - travel);
    setY(ny);
    hist.push([e.clientY, performance.now()]);
    if (hist.length > 6) hist.shift();
  }
  function up(e) {
    if (!dragging) return;
    dragging = false;
    if (!moved) {
      expanded ? closeSheet() : openSheet();
      return;
    }
    const [y0, t0] = hist[0],
      [y1, t1] = hist[hist.length - 1];
    const dt = Math.max(1, t1 - t0);
    const v = ((y1 - y0) / dt) * 1000; // px/s, +down
    const dest = y + project(v);
    const goOpen = Math.abs(v) > 250 ? v < 0 : dest < travel / 2;
    goOpen ? openSheet(v, Math.abs(v) > 600) : closeSheet(v, Math.abs(v) > 600);
  }
  for (const el of [$("grab"), $("sum")]) {
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
  }
  $("sum")
    .querySelector("#toggle")
    .addEventListener("pointerdown", (e) => e.stopPropagation());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && expanded) closeSheet();
  });

  // ——— boot ———
  $("search").addEventListener("input", (e) => {
    query = e.target.value;
    renderList(true);
  });
  renderChips();
  renderList();
  renderCart();
  syncHours();
  renderDayFace();
  $("time").addEventListener("focus", syncHours);
  $("time").addEventListener("pointerdown", syncHours);
  applyMode();
  booted = true;
  addEventListener("resize", measure);
  if (window.visualViewport) {
    visualViewport.addEventListener("resize", measure);
    visualViewport.addEventListener("scroll", measure);
  }
  if (document.fonts && document.fonts.ready)
    document.fonts.ready.then(measure);
})();
