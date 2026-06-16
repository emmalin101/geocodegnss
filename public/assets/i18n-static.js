(function () {
  const STORAGE_KEY = "toknav-preferred-language";
  const languages = [
    { code: "en", nativeName: "English", dir: "ltr" },
    { code: "es", nativeName: "Español", dir: "ltr" },
    { code: "ar", nativeName: "العربية", dir: "rtl" },
    { code: "fr", nativeName: "Français", dir: "ltr" },
    { code: "ru", nativeName: "Русский", dir: "ltr" },
    { code: "de", nativeName: "Deutsch", dir: "ltr" }
  ];

  const copy = {
    "Language": {
      es: "Idioma",
      ar: "اللغة",
      fr: "Langue",
      ru: "Язык",
      de: "Sprache"
    },
    "Products": {
      es: "Productos",
      ar: "المنتجات",
      fr: "Produits",
      ru: "Продукты",
      de: "Produkte"
    },
    "Solutions": {
      es: "Soluciones",
      ar: "الحلول",
      fr: "Solutions",
      ru: "Решения",
      de: "Lösungen"
    },
    "About": {
      es: "Acerca de",
      ar: "من نحن",
      fr: "À propos",
      ru: "О нас",
      de: "Über uns"
    },
    "Blog": {
      es: "Blog",
      ar: "المدونة",
      fr: "Blog",
      ru: "Блог",
      de: "Blog"
    },
    "Contact": {
      es: "Contacto",
      ar: "اتصل بنا",
      fr: "Contact",
      ru: "Контакты",
      de: "Kontakt"
    },
    "Get a Quote": {
      es: "Solicitar cotización",
      ar: "اطلب عرض سعر",
      fr: "Demander un devis",
      ru: "Получить цену",
      de: "Angebot anfordern"
    },
    "Get a Quote →": {
      es: "Solicitar cotización →",
      ar: "اطلب عرض سعر →",
      fr: "Demander un devis →",
      ru: "Получить цену →",
      de: "Angebot anfordern →"
    },
    "Explore Products ›": {
      es: "Explorar productos ›",
      ar: "استكشف المنتجات ›",
      fr: "Voir les produits ›",
      ru: "Посмотреть продукты ›",
      de: "Produkte ansehen ›"
    },
    "Download Catalog": {
      es: "Descargar catálogo",
      ar: "تنزيل الكتالوج",
      fr: "Télécharger le catalogue",
      ru: "Скачать каталог",
      de: "Katalog herunterladen"
    },
    "Send Requirements →": {
      es: "Enviar requisitos →",
      ar: "أرسل متطلباتك →",
      fr: "Envoyer vos besoins →",
      ru: "Отправить требования →",
      de: "Anforderungen senden →"
    },
    "View All Products →": {
      es: "Ver todos los productos →",
      ar: "عرض جميع المنتجات →",
      fr: "Voir tous les produits →",
      ru: "Все продукты →",
      de: "Alle Produkte ansehen →"
    },
    "View More ›": {
      es: "Ver más ›",
      ar: "المزيد ›",
      fr: "Voir plus ›",
      ru: "Подробнее ›",
      de: "Mehr ansehen ›"
    },
    "High-Precision GNSS Receivers & RTK Solutions Manufacturer": {
      es: "Fabricante de receptores GNSS de alta precisión y soluciones RTK",
      ar: "مصنع أجهزة استقبال GNSS عالية الدقة وحلول RTK",
      fr: "Fabricant de récepteurs GNSS haute précision et de solutions RTK",
      ru: "Производитель высокоточных GNSS-приемников и RTK-решений",
      de: "Hersteller hochpräziser GNSS-Empfänger und RTK-Lösungen"
    },
    "Reliable centimeter-level positioning solutions for surveying, construction, agriculture and industrial applications worldwide.": {
      es: "Soluciones de posicionamiento centimétrico para topografía, construcción, agricultura e industria en todo el mundo.",
      ar: "حلول تموضع بدقة السنتيمتر للمساحة والبناء والزراعة والتطبيقات الصناعية حول العالم.",
      fr: "Solutions de positionnement centimétrique pour la topographie, la construction, l’agriculture et l’industrie.",
      ru: "Решения сантиметрового позиционирования для геодезии, строительства, сельского хозяйства и промышленности.",
      de: "Zentimetergenaue Positionierung für Vermessung, Bau, Landwirtschaft und industrielle Anwendungen weltweit."
    },
    "Our Product Categories": {
      es: "Categorías de productos",
      ar: "فئات المنتجات",
      fr: "Catégories de produits",
      ru: "Категории продуктов",
      de: "Produktkategorien"
    },
    "Professional GNSS and positioning solutions for diverse industries and applications.": {
      es: "Soluciones GNSS y de posicionamiento para diferentes industrias y aplicaciones.",
      ar: "حلول GNSS وتموضع احترافية لمختلف الصناعات والتطبيقات.",
      fr: "Solutions GNSS et de positionnement pour de nombreuses industries.",
      ru: "Профессиональные GNSS-решения для разных отраслей и задач.",
      de: "Professionelle GNSS- und Positionierungslösungen für viele Branchen."
    },
    "Why Choose TOKNAV": {
      es: "Por qué elegir TOKNAV",
      ar: "لماذا تختار TOKNAV",
      fr: "Pourquoi choisir TOKNAV",
      ru: "Почему выбирают TOKNAV",
      de: "Warum TOKNAV"
    },
    "Built on innovation. Backed by experience. Trusted worldwide.": {
      es: "Innovación, experiencia y confianza global.",
      ar: "ابتكار وخبرة وثقة عالمية.",
      fr: "Innovation, expérience et confiance mondiale.",
      ru: "Инновации, опыт и доверие по всему миру.",
      de: "Innovation, Erfahrung und weltweites Vertrauen."
    },
    "Applications": {
      es: "Aplicaciones",
      ar: "التطبيقات",
      fr: "Applications",
      ru: "Применения",
      de: "Anwendungen"
    },
    "High-precision positioning empowers a wide range of industries.": {
      es: "El posicionamiento de alta precisión impulsa muchas industrias.",
      ar: "التموضع عالي الدقة يخدم مجموعة واسعة من الصناعات.",
      fr: "Le positionnement haute précision sert de nombreux secteurs.",
      ru: "Высокоточное позиционирование помогает многим отраслям.",
      de: "Hochpräzise Positionierung unterstützt viele Branchen."
    },
    "Trusted by Professionals Around the World": {
      es: "Confiado por profesionales de todo el mundo",
      ar: "يثق به محترفون حول العالم",
      fr: "Reconnu par des professionnels du monde entier",
      ru: "Нам доверяют профессионалы по всему миру",
      de: "Weltweit von Profis geschätzt"
    },
    "TOKNAV products support reliable positioning work across surveying, construction, agriculture and monitoring projects.": {
      es: "Los productos TOKNAV apoyan trabajos fiables en topografía, construcción, agricultura y monitoreo.",
      ar: "تدعم منتجات TOKNAV أعمال التموضع في المساحة والبناء والزراعة والمراقبة.",
      fr: "Les produits TOKNAV accompagnent la topographie, la construction, l’agriculture et le monitoring.",
      ru: "Продукты TOKNAV помогают в геодезии, строительстве, сельском хозяйстве и мониторинге.",
      de: "TOKNAV unterstützt Vermessung, Bau, Landwirtschaft und Monitoring."
    },
    "Learn More About Us": {
      es: "Conozca más sobre nosotros",
      ar: "تعرف علينا أكثر",
      fr: "En savoir plus",
      ru: "Узнать больше о нас",
      de: "Mehr über uns"
    },
    "Need a GNSS Solution?": {
      es: "¿Necesita una solución GNSS?",
      ar: "هل تحتاج إلى حل GNSS؟",
      fr: "Besoin d’une solution GNSS ?",
      ru: "Нужно GNSS-решение?",
      de: "Benötigen Sie eine GNSS-Lösung?"
    },
    "Tell us your product, quantity, country and application. TOKNAV will recommend a practical quote package.": {
      es: "Indique producto, cantidad, país y aplicación. TOKNAV recomendará un paquete práctico de cotización.",
      ar: "أخبرنا بالمنتج والكمية والبلد والتطبيق، وسنوصي بحزمة عرض مناسبة.",
      fr: "Indiquez produit, quantité, pays et application. TOKNAV recommandera un devis adapté.",
      ru: "Укажите продукт, количество, страну и применение. TOKNAV подготовит практичное предложение.",
      de: "Nennen Sie Produkt, Menge, Land und Anwendung. TOKNAV empfiehlt ein passendes Angebotspaket."
    },
    "Product Center": {
      es: "Centro de productos",
      ar: "مركز المنتجات",
      fr: "Centre produits",
      ru: "Центр продуктов",
      de: "Produktzentrum"
    },
    "Application Scenarios": {
      es: "Escenarios de aplicación",
      ar: "سيناريوهات التطبيق",
      fr: "Scénarios d’application",
      ru: "Сценарии применения",
      de: "Anwendungsszenarien"
    },
    "Key Features": {
      es: "Características clave",
      ar: "الميزات الرئيسية",
      fr: "Fonctions clés",
      ru: "Ключевые особенности",
      de: "Hauptmerkmale"
    },
    "Complete Specifications": {
      es: "Especificaciones completas",
      ar: "المواصفات الكاملة",
      fr: "Spécifications complètes",
      ru: "Полные характеристики",
      de: "Vollständige Spezifikationen"
    },
    "Downloads": {
      es: "Descargas",
      ar: "التنزيلات",
      fr: "Téléchargements",
      ru: "Загрузки",
      de: "Downloads"
    },
    "Inquiry": {
      es: "Consulta",
      ar: "استفسار",
      fr: "Demande",
      ru: "Запрос",
      de: "Anfrage"
    },
    "Related Models": {
      es: "Modelos relacionados",
      ar: "موديلات ذات صلة",
      fr: "Modèles associés",
      ru: "Похожие модели",
      de: "Ähnliche Modelle"
    },
    "Contact Sales": {
      es: "Contactar ventas",
      ar: "تواصل مع المبيعات",
      fr: "Contacter les ventes",
      ru: "Связаться с продажами",
      de: "Vertrieb kontaktieren"
    },
    "Submit Inquiry": {
      es: "Enviar consulta",
      ar: "إرسال الاستفسار",
      fr: "Envoyer la demande",
      ru: "Отправить запрос",
      de: "Anfrage senden"
    },
    "GNSS Receiver Manufacturer · Professional OEM & ODM": {
      es: "Fabricante de receptores GNSS · OEM y ODM profesional",
      ar: "مصنع أجهزة استقبال GNSS · OEM وODM احترافي",
      fr: "Fabricant de récepteurs GNSS · OEM et ODM professionnel",
      ru: "Производитель GNSS-приемников · Профессиональный OEM и ODM",
      de: "GNSS-Empfänger-Hersteller · Professioneller OEM & ODM"
    }
  };

  function normalize(value) {
    const code = String(value || "").trim().toLowerCase().split("-")[0];
    return languages.some((language) => language.code === code) ? code : "en";
  }

  function getLanguage(code) {
    return languages.find((language) => language.code === code) || languages[0];
  }

  function translate(source, code) {
    if (code === "en") return source;
    return copy[source]?.[code] || source;
  }

  function createSwitcher(activeCode) {
    if (document.querySelector(".language-switcher")) return;
    const header = document.querySelector(".site-header");
    if (!header) return;

    const wrapper = document.createElement("div");
    wrapper.className = "language-switcher";
    wrapper.innerHTML = [
      "<svg aria-hidden=\"true\" viewBox=\"0 0 24 24\" width=\"17\" height=\"17\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M2 12h20\"></path><path d=\"M12 2a15.3 15.3 0 0 1 0 20\"></path><path d=\"M12 2a15.3 15.3 0 0 0 0 20\"></path></svg>",
      "<label class=\"language-switcher-label\" for=\"toknav-language-select\">Language</label>",
      "<select aria-label=\"Select language\" class=\"language-switcher-select\" id=\"toknav-language-select\"></select>"
    ].join("");

    const select = wrapper.querySelector("select");
    languages.forEach((language) => {
      const option = document.createElement("option");
      option.value = language.code;
      option.textContent = language.nativeName;
      select.appendChild(option);
    });
    select.value = activeCode;
    select.addEventListener("change", () => setLanguage(select.value));

    const cta = header.querySelector(".header-cta");
    header.insertBefore(wrapper, cta || null);
  }

  function translateExactTextNodes(code) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ["SCRIPT", "STYLE", "TEXTAREA", "OPTION"].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      const source = node.__toknavSourceText || node.nodeValue.trim();
      node.__toknavSourceText = source;
      const leading = node.nodeValue.match(/^\s*/)?.[0] || "";
      const trailing = node.nodeValue.match(/\s*$/)?.[0] || "";
      node.nodeValue = leading + translate(source, code) + trailing;
    });
  }

  function translateAttributes(code) {
    document.querySelectorAll("[placeholder]").forEach((element) => {
      const source = element.dataset.toknavPlaceholder || element.getAttribute("placeholder");
      element.dataset.toknavPlaceholder = source;
      element.setAttribute("placeholder", translate(source, code));
    });
    document.querySelectorAll("[title]").forEach((element) => {
      const source = element.dataset.toknavTitle || element.getAttribute("title");
      element.dataset.toknavTitle = source;
      element.setAttribute("title", translate(source, code));
    });
    document.querySelectorAll("[aria-label]").forEach((element) => {
      const source = element.dataset.toknavAria || element.getAttribute("aria-label");
      element.dataset.toknavAria = source;
      element.setAttribute("aria-label", translate(source, code));
    });
  }

  function applyLanguage(code) {
    const language = getLanguage(code);
    document.documentElement.lang = language.code;
    document.documentElement.dir = language.dir;
    document.documentElement.dataset.locale = language.code;
    translateExactTextNodes(language.code);
    translateAttributes(language.code);
    document.querySelectorAll(".language-switcher-select").forEach((select) => {
      select.value = language.code;
      select.setAttribute("aria-label", translate("Language", language.code));
    });
    document.querySelectorAll(".language-switcher-label").forEach((label) => {
      label.textContent = translate("Language", language.code);
    });
  }

  function setLanguage(value) {
    const code = normalize(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Ignore private browsing storage errors.
    }
    applyLanguage(code);
  }

  document.addEventListener("DOMContentLoaded", () => {
    let activeCode = "en";
    try {
      activeCode = normalize(window.localStorage.getItem(STORAGE_KEY) || navigator.language);
    } catch {
      activeCode = normalize(navigator.language);
    }
    createSwitcher(activeCode);
    applyLanguage(activeCode);
  });
})();
