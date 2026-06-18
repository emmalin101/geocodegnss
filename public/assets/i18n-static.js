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

  const searchPages = [
    { title: "GNSS Receivers", url: "/products/gnss-receivers/index.html", category: "Products", text: "RTK receivers, base stations and CORS receivers for surveying, mapping and construction." },
    { title: "GNSS Antennas", url: "/products/gnss-antennas/index.html", category: "Products", text: "Survey antennas, choke ring antennas and helix antennas for high-precision GNSS projects." },
    { title: "Rugged & GIS", url: "/products/rugged-gis/index.html", category: "Products", text: "Field controllers and portable GIS data collection terminals." },
    { title: "Precision Agriculture & Machine Control", url: "/products/precision-agriculture-machine-control/index.html", category: "Products", text: "Auto steering, land leveling and machine control guidance solutions." },
    { title: "GNSS Application Solutions", url: "/products/gnss-application-solutions/index.html", category: "Solutions", text: "Monitoring, CORS, marking robot, USV and SLAM solution packages." },
    { title: "TR10Pro Marking Robot", url: "/products/gnss-application-solutions/marking-robot.html", category: "Solutions", text: "Robotic sports field and line marking solution." },
    { title: "TBoat USV Series", url: "/products/gnss-application-solutions/tboat-series.html", category: "Solutions", text: "Unmanned surface vessel for hydrographic survey and water mapping." },
    { title: "TSR20 SLAM Scanner", url: "/products/gnss-application-solutions/tsr20.html", category: "Solutions", text: "Handheld SLAM mapping system for indoor and outdoor scanning." },
    { title: "T50Pro GNSS Receiver", url: "/products/gnss-receivers/t50pro.html", category: "GNSS Receiver", text: "Professional RTK rover for survey and construction teams." },
    { title: "T30Pro GNSS Receiver", url: "/products/gnss-receivers/t30pro.html", category: "GNSS Receiver", text: "High-performance multi-constellation RTK receiver." },
    { title: "T5Lite GNSS Receiver", url: "/products/gnss-receivers/t5lite.html", category: "GNSS Receiver", text: "Compact GNSS RTK receiver for cost-sensitive surveying projects." },
    { title: "Blog", url: "/blog.html", category: "Resources", text: "GNSS buying guides, application articles and SEO resources." },
    { title: "News", url: "/news.html", category: "Resources", text: "Surveying, GNSS, robotics and positioning industry news." },
    { title: "About TOKNAV", url: "/about.html", category: "Company", text: "Company profile, timeline, certificates and customer feedback." },
    { title: "Contact TOKNAV", url: "/contact.html", category: "Contact", text: "Company address, map, email and inquiry form." },
    { title: "Get a Quote", url: "/inquiry.html", category: "Inquiry", text: "Send GNSS product requirements and project details to TOKNAV." }
  ];

  function injectGlobalUtilitiesStyle() {
    if (document.getElementById("toknav-global-utilities-style")) return;
    const style = document.createElement("style");
    style.id = "toknav-global-utilities-style";
    style.textContent = `
      .toknav-site-search-button {
        width: 44px;
        height: 44px;
        display: inline-grid;
        place-items: center;
        border: 1px solid rgba(255,255,255,.34);
        border-radius: 999px;
        background: rgba(255,255,255,.12);
        color: currentColor;
        font-size: 20px;
        cursor: pointer;
        transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
      }
      .toknav-site-search-button:hover {
        transform: translateY(-1px) scale(1.04);
        box-shadow: 0 14px 28px rgba(7,57,143,.18);
        background: rgba(255,255,255,.2);
      }
      body:not(.toknav-home) .toknav-site-search-button {
        border-color: rgba(7,57,143,.18);
        color: #07398f;
        background: rgba(255,255,255,.88);
      }
      .toknav-site-search-button.is-floating {
        position: fixed;
        top: 18px;
        right: 18px;
        z-index: 10001;
        color: #07398f;
        background: rgba(255,255,255,.92);
        box-shadow: 0 16px 36px rgba(7,57,143,.18);
      }
      .toknav-search-overlay {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: none;
        padding: 92px 20px 32px;
        background: rgba(4,14,32,.56);
        backdrop-filter: blur(12px);
      }
      .toknav-search-overlay.is-open { display: block; }
      .toknav-search-dialog {
        width: min(760px, 100%);
        margin: 0 auto;
        border: 1px solid rgba(188,211,245,.75);
        border-radius: 18px;
        background: rgba(255,255,255,.96);
        box-shadow: 0 32px 80px rgba(2,18,46,.28);
        overflow: hidden;
      }
      .toknav-search-head {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 18px 20px;
        border-bottom: 1px solid #e1ebf7;
      }
      .toknav-search-head input {
        flex: 1;
        min-width: 0;
        height: 46px;
        border: 0;
        outline: 0;
        color: #071325;
        background: transparent;
        font-size: 17px;
        font-weight: 700;
      }
      .toknav-search-close {
        width: 38px;
        height: 38px;
        border: 0;
        border-radius: 999px;
        background: #edf4ff;
        color: #07398f;
        cursor: pointer;
        font-size: 22px;
      }
      .toknav-search-results {
        max-height: min(60vh, 520px);
        overflow: auto;
        padding: 10px;
      }
      .toknav-search-result {
        display: grid;
        gap: 7px;
        padding: 15px 16px;
        border-radius: 12px;
        color: #071325;
        text-decoration: none;
      }
      .toknav-search-result:hover {
        background: #eef6ff;
      }
      .toknav-search-result small {
        color: #07398f;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: .08em;
      }
      .toknav-search-result strong {
        font-size: 18px;
      }
      .toknav-search-result span {
        color: #627188;
        font-size: 14px;
        line-height: 1.5;
      }
      .toknav-search-empty {
        padding: 24px 18px 28px;
        color: #627188;
        text-align: center;
      }
      .social-link-email svg {
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      @media (max-width: 760px) {
        .toknav-site-search-button { width: 40px; height: 40px; }
        .toknav-search-overlay { padding-top: 72px; }
        .toknav-search-head input { font-size: 15px; }
      }
    `;
    document.head.appendChild(style);
  }

  function createSearch() {
    const header = document.querySelector(".site-header");
    if (document.querySelector(".toknav-site-search-button")) return;
    injectGlobalUtilitiesStyle();

    const button = document.createElement("button");
    button.type = "button";
    button.className = "toknav-site-search-button";
    button.setAttribute("aria-label", "Search");
    button.textContent = "🔍";

    if (header) {
      const cta = header.querySelector(".header-cta");
      header.insertBefore(button, cta || null);
    } else {
      button.classList.add("is-floating");
      document.body.appendChild(button);
    }

    const overlay = document.createElement("div");
    overlay.className = "toknav-search-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Site search");
    overlay.innerHTML = [
      '<div class="toknav-search-dialog">',
      '<div class="toknav-search-head"><span aria-hidden="true">🔍</span><input type="search" placeholder="Search products, solutions, blogs..." aria-label="Search website"><button type="button" class="toknav-search-close" aria-label="Close search">×</button></div>',
      '<div class="toknav-search-results" aria-live="polite"></div>',
      '</div>'
    ].join("");
    document.body.appendChild(overlay);

    const input = overlay.querySelector("input");
    const results = overlay.querySelector(".toknav-search-results");
    const close = overlay.querySelector(".toknav-search-close");

    function render(query) {
      const needle = String(query || "").trim().toLowerCase();
      const items = (needle ? searchPages.filter((item) => [item.title, item.category, item.text].join(" ").toLowerCase().includes(needle)) : searchPages.slice(0, 8)).slice(0, 10);
      if (!items.length) {
        results.innerHTML = '<div class="toknav-search-empty">No matching page found. Try GNSS receiver, antenna, marking robot, USV or contact.</div>';
        return;
      }
      results.innerHTML = items.map((item) => `<a class="toknav-search-result" href="${item.url}"><small>${item.category}</small><strong>${item.title}</strong><span>${item.text}</span></a>`).join("");
    }

    function openSearch() {
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
      render(input.value);
      window.setTimeout(() => input.focus(), 30);
    }

    function closeSearch() {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
      button.focus();
    }

    button.addEventListener("click", openSearch);
    close.addEventListener("click", closeSearch);
    input.addEventListener("input", () => render(input.value));
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeSearch();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && overlay.classList.contains("is-open")) closeSearch();
    });
  }

  function ensureFooterEmailIcon() {
    injectGlobalUtilitiesStyle();
    document.querySelectorAll(".social-links").forEach((list) => {
      if (list.querySelector('a[href^="mailto:emma@toknav.cn"]')) return;
      const link = document.createElement("a");
      link.className = "social-link social-link-email";
      link.href = "mailto:emma@toknav.cn";
      link.setAttribute("aria-label", "Email TOKNAV");
      link.title = "Email";
      link.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m4 7 8 6 8-6"></path></svg>';
      list.appendChild(link);
    });
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

  function bootToknavUtilities() {
    let activeCode = "en";
    try {
      activeCode = normalize(window.localStorage.getItem(STORAGE_KEY) || navigator.language);
    } catch {
      activeCode = normalize(navigator.language);
    }
    createSwitcher(activeCode);
    createSearch();
    ensureFooterEmailIcon();
    applyLanguage(activeCode);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootToknavUtilities);
  } else {
    bootToknavUtilities();
  }
})();
