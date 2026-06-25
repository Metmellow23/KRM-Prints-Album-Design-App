
const workspace = document.getElementById("workspace");

workspace.addEventListener('wheel', (e) => {
  if(Math.abs(e.deltaY) > Math.abs(e.deltaX)){
    workspace.scrollLeft += e.deltaY;
    e.preventDefault();
  }
}, { passive:false });

const addSpreadBtn = document.getElementById("addSpreadBtn");
const upload = document.getElementById("upload");
const loadProjectInput = document.getElementById("loadProjectInput");
const introLoadProjectInput = document.getElementById("introLoadProjectInput");
const library = document.getElementById("library");
const spreadCount = document.getElementById("spreadCount");
const zoomLevelEl = document.getElementById("zoomLevel");
const projectNameInput = document.getElementById("startupProjectName");
const formatSelect = document.getElementById("startupFormat");
const introOverlay = document.getElementById("introOverlay");
const projectSummaryName = document.getElementById("projectSummaryName");
const projectSummaryMeta = document.getElementById("projectSummaryMeta");
const startProjectBtn = document.getElementById("startProjectBtn");
const librarySort = document.getElementById("librarySort");
const libraryTitle = document.getElementById("libraryTitle");
const libraryTabs = Array.from(document.querySelectorAll(".library-tab"));
const libraryView = document.getElementById("libraryView");
const templateView = document.getElementById("templateView");
const templateLibrary = document.getElementById("templateLibrary");
const templateFilter = document.getElementById("templateFilter");
const librarySortWrap = document.getElementById("librarySortWrap");
const templateFilterWrap = document.getElementById("templateFilterWrap");
const templateGapWrap = document.getElementById("templateGapWrap");
const templateGap = document.getElementById("templateGap");
const templateGapValue = document.getElementById("templateGapValue");
const templateCountWrap = document.getElementById("templateCountWrap");
const templateCount = document.getElementById("templateCount");
const libraryZoom = document.getElementById("libraryZoom");
const spreadBgColor = document.getElementById("spreadBgColor");

const formats = {
  "306x156":[306,156],
  "406x156":[406,156],
  "456x156":[456,156],
  "406x206":[406,206],
  "606x206":[606,206],
  "506x256":[506,256],
  "756x256":[756,256],
  "606x306":[606,306],
  "806x306":[806,306],
  "906x306":[906,306]
};

const formatLabels = {
  "306x156":"15×15 cm",
  "406x156":"15×20 cm",
  "456x156":"15×22 cm",
  "406x206":"20×20 cm",
  "606x206":"20×30 cm",
  "506x256":"25×25 cm",
  "756x256":"25×38 cm",
  "606x306":"30×30 cm",
  "806x306":"30×40 cm",
  "906x306":"30×45 cm"
};

const templateCatalog = [
  // =======================================================================
  //  FULL-BLEED TEMPLATE CATALOG (alleen rand-tot-rand, geen marges)
  //  Slots zijn genormaliseerd (0..1) en betegelen het volledige vlak.
  //  mmToLayout houdt album-randen op 0 inset; alleen interne naden krijgen
  //  de templateGap. 1 t/m 6 foto's, meerdere moderne varianten per aantal.
  // =======================================================================

  // ---------------------------- 1 FOTO ----------------------------
  {
    id: "fb-1-hero",
    name: "Hero Full Bleed",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 1.00, h: 1.00, style: "full-bleed" }
    ]
  },

  // ---------------------------- 2 FOTO'S ----------------------------
  {
    id: "fb-2-vsplit",
    name: "Verticaal 50 / 50",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.50, h: 1.00, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.50, h: 1.00, style: "full-bleed" }
    ]
  },
  {
    id: "fb-2-hsplit",
    name: "Horizontaal 50 / 50",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 1.00, h: 0.50, style: "full-bleed" },
      { x: 0.00, y: 0.50, w: 1.00, h: 0.50, style: "full-bleed" }
    ]
  },
  {
    id: "fb-2-left-third",
    name: "1/3 + 2/3",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.3333, h: 1.00, style: "full-bleed" },
      { x: 0.3333, y: 0.00, w: 0.6667, h: 1.00, style: "full-bleed" }
    ]
  },
  {
    id: "fb-2-right-third",
    name: "2/3 + 1/3",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.6667, h: 1.00, style: "full-bleed" },
      { x: 0.6667, y: 0.00, w: 0.3333, h: 1.00, style: "full-bleed" }
    ]
  },
  {
    id: "fb-2-htop-60",
    name: "Boven 60 / 40",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 1.00, h: 0.60, style: "full-bleed" },
      { x: 0.00, y: 0.60, w: 1.00, h: 0.40, style: "full-bleed" }
    ]
  },

  // ---------------------------- 3 FOTO'S ----------------------------
  {
    id: "fb-3-cols",
    name: "Drie kolommen",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.3333, h: 1.00, style: "full-bleed" },
      { x: 0.3333, y: 0.00, w: 0.3334, h: 1.00, style: "full-bleed" },
      { x: 0.6667, y: 0.00, w: 0.3333, h: 1.00, style: "full-bleed" }
    ]
  },
  {
    id: "fb-3-rows",
    name: "Drie rijen",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 1.00, h: 0.3333, style: "full-bleed" },
      { x: 0.00, y: 0.3333, w: 1.00, h: 0.3334, style: "full-bleed" },
      { x: 0.00, y: 0.6667, w: 1.00, h: 0.3333, style: "full-bleed" }
    ]
  },
  {
    id: "fb-3-left-hero",
    name: "Groot links + 2",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.50, h: 1.00, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.50, h: 0.50, style: "full-bleed" },
      { x: 0.50, y: 0.50, w: 0.50, h: 0.50, style: "full-bleed" }
    ]
  },
  {
    id: "fb-3-right-hero",
    name: "2 + groot rechts",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.50, h: 0.50, style: "full-bleed" },
      { x: 0.00, y: 0.50, w: 0.50, h: 0.50, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.50, h: 1.00, style: "full-bleed" }
    ]
  },
  {
    id: "fb-3-top-hero",
    name: "Groot boven + 2",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 1.00, h: 0.60, style: "full-bleed" },
      { x: 0.00, y: 0.60, w: 0.50, h: 0.40, style: "full-bleed" },
      { x: 0.50, y: 0.60, w: 0.50, h: 0.40, style: "full-bleed" }
    ]
  },
  {
    id: "fb-3-bottom-hero",
    name: "2 + groot onder",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.50, h: 0.40, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.50, h: 0.40, style: "full-bleed" },
      { x: 0.00, y: 0.40, w: 1.00, h: 0.60, style: "full-bleed" }
    ]
  },

  // ---------------------------- 4 FOTO'S ----------------------------
  {
    id: "fb-4-grid",
    name: "Raster 2 x 2",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.50, h: 0.50, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.50, h: 0.50, style: "full-bleed" },
      { x: 0.00, y: 0.50, w: 0.50, h: 0.50, style: "full-bleed" },
      { x: 0.50, y: 0.50, w: 0.50, h: 0.50, style: "full-bleed" }
    ]
  },
  {
    id: "fb-4-cols",
    name: "Vier kolommen",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.25, h: 1.00, style: "full-bleed" },
      { x: 0.25, y: 0.00, w: 0.25, h: 1.00, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.25, h: 1.00, style: "full-bleed" },
      { x: 0.75, y: 0.00, w: 0.25, h: 1.00, style: "full-bleed" }
    ]
  },
  {
    id: "fb-4-rows",
    name: "Vier rijen",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 1.00, h: 0.25, style: "full-bleed" },
      { x: 0.00, y: 0.25, w: 1.00, h: 0.25, style: "full-bleed" },
      { x: 0.00, y: 0.50, w: 1.00, h: 0.25, style: "full-bleed" },
      { x: 0.00, y: 0.75, w: 1.00, h: 0.25, style: "full-bleed" }
    ]
  },
  {
    id: "fb-4-left-hero",
    name: "Groot links + 3",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.60, h: 1.00, style: "full-bleed" },
      { x: 0.60, y: 0.00, w: 0.40, h: 0.3333, style: "full-bleed" },
      { x: 0.60, y: 0.3333, w: 0.40, h: 0.3334, style: "full-bleed" },
      { x: 0.60, y: 0.6667, w: 0.40, h: 0.3333, style: "full-bleed" }
    ]
  },
  {
    id: "fb-4-top-hero",
    name: "Groot boven + 3",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 1.00, h: 0.60, style: "full-bleed" },
      { x: 0.00, y: 0.60, w: 0.3333, h: 0.40, style: "full-bleed" },
      { x: 0.3333, y: 0.60, w: 0.3334, h: 0.40, style: "full-bleed" },
      { x: 0.6667, y: 0.60, w: 0.3333, h: 0.40, style: "full-bleed" }
    ]
  },

  // ---------------------------- 5 FOTO'S ----------------------------
  {
    id: "fb-5-mosaic",
    name: "Mozaiek vijf",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.3333, h: 0.50, style: "full-bleed" },
      { x: 0.3333, y: 0.00, w: 0.6667, h: 0.50, style: "full-bleed" },
      { x: 0.00, y: 0.50, w: 0.3333, h: 0.50, style: "full-bleed" },
      { x: 0.3333, y: 0.50, w: 0.3334, h: 0.50, style: "full-bleed" },
      { x: 0.6667, y: 0.50, w: 0.3333, h: 0.50, style: "full-bleed" }
    ]
  },
  {
    id: "fb-5-center-hero",
    name: "Center hero",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.25, h: 0.50, style: "full-bleed" },
      { x: 0.00, y: 0.50, w: 0.25, h: 0.50, style: "full-bleed" },
      { x: 0.25, y: 0.00, w: 0.50, h: 1.00, style: "full-bleed" },
      { x: 0.75, y: 0.00, w: 0.25, h: 0.50, style: "full-bleed" },
      { x: 0.75, y: 0.50, w: 0.25, h: 0.50, style: "full-bleed" }
    ]
  },
  {
    id: "fb-5-left-hero",
    name: "Groot links + 4",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.50, h: 1.00, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.25, h: 0.50, style: "full-bleed" },
      { x: 0.75, y: 0.00, w: 0.25, h: 0.50, style: "full-bleed" },
      { x: 0.50, y: 0.50, w: 0.25, h: 0.50, style: "full-bleed" },
      { x: 0.75, y: 0.50, w: 0.25, h: 0.50, style: "full-bleed" }
    ]
  },
  {
    id: "fb-5-top-hero",
    name: "Groot boven + 4",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 1.00, h: 0.55, style: "full-bleed" },
      { x: 0.00, y: 0.55, w: 0.25, h: 0.45, style: "full-bleed" },
      { x: 0.25, y: 0.55, w: 0.25, h: 0.45, style: "full-bleed" },
      { x: 0.50, y: 0.55, w: 0.25, h: 0.45, style: "full-bleed" },
      { x: 0.75, y: 0.55, w: 0.25, h: 0.45, style: "full-bleed" }
    ]
  },
  {
    id: "fb-5-cols",
    name: "Vijf kolommen",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.20, h: 1.00, style: "full-bleed" },
      { x: 0.20, y: 0.00, w: 0.20, h: 1.00, style: "full-bleed" },
      { x: 0.40, y: 0.00, w: 0.20, h: 1.00, style: "full-bleed" },
      { x: 0.60, y: 0.00, w: 0.20, h: 1.00, style: "full-bleed" },
      { x: 0.80, y: 0.00, w: 0.20, h: 1.00, style: "full-bleed" }
    ]
  },

  // ---------------------------- 6 FOTO'S ----------------------------
  {
    id: "fb-6-grid-3x2",
    name: "Raster 3 x 2",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.3333, h: 0.50, style: "full-bleed" },
      { x: 0.3333, y: 0.00, w: 0.3334, h: 0.50, style: "full-bleed" },
      { x: 0.6667, y: 0.00, w: 0.3333, h: 0.50, style: "full-bleed" },
      { x: 0.00, y: 0.50, w: 0.3333, h: 0.50, style: "full-bleed" },
      { x: 0.3333, y: 0.50, w: 0.3334, h: 0.50, style: "full-bleed" },
      { x: 0.6667, y: 0.50, w: 0.3333, h: 0.50, style: "full-bleed" }
    ]
  },
  {
    id: "fb-6-grid-2x3",
    name: "Raster 2 x 3",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.50, h: 0.3333, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.50, h: 0.3333, style: "full-bleed" },
      { x: 0.00, y: 0.3333, w: 0.50, h: 0.3334, style: "full-bleed" },
      { x: 0.50, y: 0.3333, w: 0.50, h: 0.3334, style: "full-bleed" },
      { x: 0.00, y: 0.6667, w: 0.50, h: 0.3333, style: "full-bleed" },
      { x: 0.50, y: 0.6667, w: 0.50, h: 0.3333, style: "full-bleed" }
    ]
  },
  {
    id: "fb-6-cols",
    name: "Zes kolommen",
    category: "full-bleed",
    slots: [
      { x: 0.0000, y: 0.00, w: 0.1667, h: 1.00, style: "full-bleed" },
      { x: 0.1667, y: 0.00, w: 0.1667, h: 1.00, style: "full-bleed" },
      { x: 0.3334, y: 0.00, w: 0.1666, h: 1.00, style: "full-bleed" },
      { x: 0.5000, y: 0.00, w: 0.1667, h: 1.00, style: "full-bleed" },
      { x: 0.6667, y: 0.00, w: 0.1667, h: 1.00, style: "full-bleed" },
      { x: 0.8334, y: 0.00, w: 0.1666, h: 1.00, style: "full-bleed" }
    ]
  },
  {
    id: "fb-6-top2-bottom4",
    name: "2 boven + 4 onder",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.50, h: 0.50, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.50, h: 0.50, style: "full-bleed" },
      { x: 0.00, y: 0.50, w: 0.25, h: 0.50, style: "full-bleed" },
      { x: 0.25, y: 0.50, w: 0.25, h: 0.50, style: "full-bleed" },
      { x: 0.50, y: 0.50, w: 0.25, h: 0.50, style: "full-bleed" },
      { x: 0.75, y: 0.50, w: 0.25, h: 0.50, style: "full-bleed" }
    ]
  },
  {
    id: "fb-6-left2-right4",
    name: "2 links + raster rechts",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.3333, h: 0.50, style: "full-bleed" },
      { x: 0.00, y: 0.50, w: 0.3333, h: 0.50, style: "full-bleed" },
      { x: 0.3333, y: 0.00, w: 0.3334, h: 0.50, style: "full-bleed" },
      { x: 0.6667, y: 0.00, w: 0.3333, h: 0.50, style: "full-bleed" },
      { x: 0.3333, y: 0.50, w: 0.3334, h: 0.50, style: "full-bleed" },
      { x: 0.6667, y: 0.50, w: 0.3333, h: 0.50, style: "full-bleed" }
    ]
  },

  // ============ 3 FOTO'S — extra asymmetrische / hero varianten ============
  {
    id: "fb-3-hero-left-65",
    name: "Hero links 65 + 2",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.65, h: 1.00, style: "full-bleed" },
      { x: 0.65, y: 0.00, w: 0.35, h: 0.50, style: "full-bleed" },
      { x: 0.65, y: 0.50, w: 0.35, h: 0.50, style: "full-bleed" }
    ]
  },
  {
    id: "fb-3-hero-right-65",
    name: "2 + hero rechts 65",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.35, h: 0.50, style: "full-bleed" },
      { x: 0.00, y: 0.50, w: 0.35, h: 0.50, style: "full-bleed" },
      { x: 0.35, y: 0.00, w: 0.65, h: 1.00, style: "full-bleed" }
    ]
  },
  {
    id: "fb-3-hero-top-70",
    name: "Hero boven 70 + 2",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 1.00, h: 0.70, style: "full-bleed" },
      { x: 0.00, y: 0.70, w: 0.50, h: 0.30, style: "full-bleed" },
      { x: 0.50, y: 0.70, w: 0.50, h: 0.30, style: "full-bleed" }
    ]
  },
  {
    id: "fb-3-hero-bottom-70",
    name: "2 + hero onder 70",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.50, h: 0.30, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.50, h: 0.30, style: "full-bleed" },
      { x: 0.00, y: 0.30, w: 1.00, h: 0.70, style: "full-bleed" }
    ]
  },
  {
    id: "fb-3-hero-left-vstrips",
    name: "Hero links + 2 stroken",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.60, h: 1.00, style: "full-bleed" },
      { x: 0.60, y: 0.00, w: 0.20, h: 1.00, style: "full-bleed" },
      { x: 0.80, y: 0.00, w: 0.20, h: 1.00, style: "full-bleed" }
    ]
  },
  {
    id: "fb-3-band-center",
    name: "Hero midden + 2 stroken",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.20, h: 1.00, style: "full-bleed" },
      { x: 0.20, y: 0.00, w: 0.60, h: 1.00, style: "full-bleed" },
      { x: 0.80, y: 0.00, w: 0.20, h: 1.00, style: "full-bleed" }
    ]
  },

  // ============ 4 FOTO'S — extra asymmetrische / hero varianten ============
  {
    id: "fb-4-hero-right-3strip",
    name: "3 stroken + hero rechts",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.35, h: 0.3333, style: "full-bleed" },
      { x: 0.00, y: 0.3333, w: 0.35, h: 0.3334, style: "full-bleed" },
      { x: 0.00, y: 0.6667, w: 0.35, h: 0.3333, style: "full-bleed" },
      { x: 0.35, y: 0.00, w: 0.65, h: 1.00, style: "full-bleed" }
    ]
  },
  {
    id: "fb-4-hero-bottom-3col",
    name: "3 kolommen + hero onder",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.3333, h: 0.40, style: "full-bleed" },
      { x: 0.3333, y: 0.00, w: 0.3334, h: 0.40, style: "full-bleed" },
      { x: 0.6667, y: 0.00, w: 0.3333, h: 0.40, style: "full-bleed" },
      { x: 0.00, y: 0.40, w: 1.00, h: 0.60, style: "full-bleed" }
    ]
  },
  {
    id: "fb-4-hero-tl-L",
    name: "Hero linksboven + L",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.6667, h: 0.6667, style: "full-bleed" },
      { x: 0.6667, y: 0.00, w: 0.3333, h: 0.6667, style: "full-bleed" },
      { x: 0.00, y: 0.6667, w: 0.50, h: 0.3333, style: "full-bleed" },
      { x: 0.50, y: 0.6667, w: 0.50, h: 0.3333, style: "full-bleed" }
    ]
  },
  {
    id: "fb-4-hero-tr-L",
    name: "Hero rechtsboven + L",
    category: "full-bleed",
    slots: [
      { x: 0.3333, y: 0.00, w: 0.6667, h: 0.6667, style: "full-bleed" },
      { x: 0.00, y: 0.00, w: 0.3333, h: 0.6667, style: "full-bleed" },
      { x: 0.00, y: 0.6667, w: 0.50, h: 0.3333, style: "full-bleed" },
      { x: 0.50, y: 0.6667, w: 0.50, h: 0.3333, style: "full-bleed" }
    ]
  },
  {
    id: "fb-4-hero-left-mixed",
    name: "Hero links + 2 boven + breed",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.60, h: 1.00, style: "full-bleed" },
      { x: 0.60, y: 0.00, w: 0.20, h: 0.50, style: "full-bleed" },
      { x: 0.80, y: 0.00, w: 0.20, h: 0.50, style: "full-bleed" },
      { x: 0.60, y: 0.50, w: 0.40, h: 0.50, style: "full-bleed" }
    ]
  },
  {
    id: "fb-4-hero-center-vert",
    name: "Hero midden + zijblokken",
    category: "full-bleed",
    slots: [
      { x: 0.25, y: 0.00, w: 0.50, h: 1.00, style: "full-bleed" },
      { x: 0.00, y: 0.00, w: 0.25, h: 1.00, style: "full-bleed" },
      { x: 0.75, y: 0.00, w: 0.25, h: 0.50, style: "full-bleed" },
      { x: 0.75, y: 0.50, w: 0.25, h: 0.50, style: "full-bleed" }
    ]
  },

  // ============ 5 FOTO'S — extra asymmetrische / hero varianten ============
  {
    id: "fb-5-hero-left-4strip",
    name: "Hero links + 4 stroken",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.60, h: 1.00, style: "full-bleed" },
      { x: 0.60, y: 0.00, w: 0.40, h: 0.25, style: "full-bleed" },
      { x: 0.60, y: 0.25, w: 0.40, h: 0.25, style: "full-bleed" },
      { x: 0.60, y: 0.50, w: 0.40, h: 0.25, style: "full-bleed" },
      { x: 0.60, y: 0.75, w: 0.40, h: 0.25, style: "full-bleed" }
    ]
  },
  {
    id: "fb-5-hero-right-4strip",
    name: "4 stroken + hero rechts",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.40, h: 0.25, style: "full-bleed" },
      { x: 0.00, y: 0.25, w: 0.40, h: 0.25, style: "full-bleed" },
      { x: 0.00, y: 0.50, w: 0.40, h: 0.25, style: "full-bleed" },
      { x: 0.00, y: 0.75, w: 0.40, h: 0.25, style: "full-bleed" },
      { x: 0.40, y: 0.00, w: 0.60, h: 1.00, style: "full-bleed" }
    ]
  },
  {
    id: "fb-5-hero-top-4col",
    name: "Hero boven + 4 kolommen",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 1.00, h: 0.60, style: "full-bleed" },
      { x: 0.00, y: 0.60, w: 0.25, h: 0.40, style: "full-bleed" },
      { x: 0.25, y: 0.60, w: 0.25, h: 0.40, style: "full-bleed" },
      { x: 0.50, y: 0.60, w: 0.25, h: 0.40, style: "full-bleed" },
      { x: 0.75, y: 0.60, w: 0.25, h: 0.40, style: "full-bleed" }
    ]
  },
  {
    id: "fb-5-hero-bottom-4col",
    name: "4 kolommen + hero onder",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.25, h: 0.40, style: "full-bleed" },
      { x: 0.25, y: 0.00, w: 0.25, h: 0.40, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.25, h: 0.40, style: "full-bleed" },
      { x: 0.75, y: 0.00, w: 0.25, h: 0.40, style: "full-bleed" },
      { x: 0.00, y: 0.40, w: 1.00, h: 0.60, style: "full-bleed" }
    ]
  },
  {
    id: "fb-5-hero-tl",
    name: "Hero linksboven + 4",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.6667, h: 0.6667, style: "full-bleed" },
      { x: 0.6667, y: 0.00, w: 0.3333, h: 0.3333, style: "full-bleed" },
      { x: 0.6667, y: 0.3333, w: 0.3333, h: 0.3334, style: "full-bleed" },
      { x: 0.00, y: 0.6667, w: 0.50, h: 0.3333, style: "full-bleed" },
      { x: 0.50, y: 0.6667, w: 0.50, h: 0.3333, style: "full-bleed" }
    ]
  },
  {
    id: "fb-5-hero-tr",
    name: "Hero rechtsboven + 4",
    category: "full-bleed",
    slots: [
      { x: 0.3333, y: 0.00, w: 0.6667, h: 0.6667, style: "full-bleed" },
      { x: 0.00, y: 0.00, w: 0.3333, h: 0.3333, style: "full-bleed" },
      { x: 0.00, y: 0.3333, w: 0.3333, h: 0.3334, style: "full-bleed" },
      { x: 0.00, y: 0.6667, w: 0.50, h: 0.3333, style: "full-bleed" },
      { x: 0.50, y: 0.6667, w: 0.50, h: 0.3333, style: "full-bleed" }
    ]
  }
];


let currentZoom = 100;
let activeSpread = null;
let project = createEmptyProject(formatSelect.value);
let librarySortMode = "name-asc";
let introMode = "startup";
let assetMode = "photos";
let templateFilterMode = "all";
let templatePhotoCount = 1;
let templateGapPx = 5;
let libraryThumbSize = 60;
let spreadViews = [];

function createEmptyProject(formatValue){
  return {
    version: 4,
    name: 'Nieuw album',
    format: formatValue,
    spreadBackground: '#ffffff',
    library: [],
    spreads: []
  };
}

function uid(prefix){
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

function getPhotoById(photoId){
  return project.library.find(item => item.id === photoId) || null;
}

function formatCaptureDate(ts){
  if(!ts) return '';
  const date = new Date(ts);
  if(Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('nl-NL', {
    year:'numeric',
    month:'2-digit',
    day:'2-digit'
  }).format(date);
}

function sortLibraryItems(items){
  const sorted = [...items];
  const getName = item => (item.name || '').toLocaleLowerCase('nl-NL');
  const getCapture = item => Number(item.captureDate || 0);

  sorted.sort((a, b) => {
    if(librarySortMode === 'name-desc') return getName(b).localeCompare(getName(a), 'nl-NL');
    if(librarySortMode === 'capture-asc'){
      const diff = getCapture(a) - getCapture(b);
      if(diff !== 0) return diff;
      return getName(a).localeCompare(getName(b), 'nl-NL');
    }
    if(librarySortMode === 'capture-desc'){
      const diff = getCapture(b) - getCapture(a);
      if(diff !== 0) return diff;
      return getName(a).localeCompare(getName(b), 'nl-NL');
    }
    return getName(a).localeCompare(getName(b), 'nl-NL');
  });

  return sorted;
}

function getFilteredTemplates(){
  let templates = templateCatalog;

  if(templateFilterMode !== "all"){
    templates = templates.filter(template => template.category === templateFilterMode);
  }

  templates = templates.filter(template => template.slots.length === templatePhotoCount);
  return templates;
}

function syncTemplateCountToActiveSpread(){
  if(!activeSpread) return;
  const placedPhotoCount = activeSpread.frames.filter(frame => !!frame.photoId).length;
  if(placedPhotoCount >= 1 && placedPhotoCount <= 6){
    templatePhotoCount = placedPhotoCount;
    if(templateCount){
      templateCount.value = String(templatePhotoCount);
    }
  }
}


function setAssetMode(mode){
  assetMode = mode;
  const showTemplates = mode === "templates";
  libraryTabs.forEach(btn => btn.classList.toggle("active", btn.dataset.mode === mode));
  libraryView.classList.toggle("active", !showTemplates);
  templateView.classList.toggle("active", showTemplates);
  libraryTitle.textContent = showTemplates ? "Templates" : "Fotobibliotheek";
  librarySortWrap.classList.toggle("hidden", showTemplates);
  templateFilterWrap.classList.toggle("hidden", !showTemplates);
  templateGapWrap.classList.toggle("hidden", !showTemplates);
  templateCountWrap.classList.toggle("hidden", !showTemplates);

  if(showTemplates){
    if(activeSpread){
      const placedPhotoCount = activeSpread.frames.filter(frame => !!frame.photoId).length;
      if(placedPhotoCount >= 1 && placedPhotoCount <= 6){
        templatePhotoCount = placedPhotoCount;
        templateCount.value = String(templatePhotoCount);
      }
    }
    renderTemplates();
  }
}

function renderTemplates(){
  const templates = getFilteredTemplates();
  templateLibrary.innerHTML = "";
  if(!templates.length){
    templateLibrary.innerHTML = '<div id="templateEmpty">Geen templates gevonden voor ' + templatePhotoCount + ' foto\'s binnen dit filter.</div>';
    return;
  }

  templates.forEach(template => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "template-card";
    card.dataset.templateId = template.id;

    const preview = document.createElement("div");
    preview.className = "template-preview";

    template.slots.forEach(slot => {
      const previewLayout = mmToLayout(slot, 100, 50);
      const slotEl = document.createElement("div");
      slotEl.className = "template-slot" + (slot.style === "full-bleed" ? " full-bleed" : "");
      slotEl.style.left = `${previewLayout.x * 100}%`;
      slotEl.style.top = `${previewLayout.y * 100}%`;
      slotEl.style.width = `${previewLayout.w * 100}%`;
      slotEl.style.height = `${previewLayout.h * 100}%`;
      preview.appendChild(slotEl);
    });

    card.appendChild(preview);
    card.addEventListener("click", () => applyTemplateToActiveSpread(template.id));
    templateLibrary.appendChild(card);
  });
}


function mmToLayout(slot, spreadWidth, spreadHeight, gap = templateGapPx){
  const isFullBleed = slot.style === "full-bleed";

  if(isFullBleed && typeof slot.x === "number"){
    const gapX = gap / Math.max(1, spreadWidth);
    const gapY = gap / Math.max(1, spreadHeight);

    const touchesLeft = slot.x <= 0.0001;
    const touchesTop = slot.y <= 0.0001;
    const touchesRight = (slot.x + slot.w) >= 0.9999;
    const touchesBottom = (slot.y + slot.h) >= 0.9999;

    const leftInset = touchesLeft ? 0 : gapX / 2;
    const rightInset = touchesRight ? 0 : gapX / 2;
    const topInset = touchesTop ? 0 : gapY / 2;
    const bottomInset = touchesBottom ? 0 : gapY / 2;

    return {
      x: slot.x + leftInset,
      y: slot.y + topInset,
      w: Math.max(0, slot.w - leftInset - rightInset),
      h: Math.max(0, slot.h - topInset - bottomInset),
      style: slot.style || null
    };
  }

  const outerMargin = 0.043;
  const cols = Math.max(1, Number(slot.gridCols || 1));
  const rows = Math.max(1, Number(slot.gridRows || 1));
  const col = Math.max(0, Number(slot.col || 0));
  const row = Math.max(0, Number(slot.row || 0));
  const colSpan = Math.max(1, Number(slot.colSpan || 1));
  const rowSpan = Math.max(1, Number(slot.rowSpan || 1));

  const usableWidth = spreadWidth * (1 - outerMargin * 2) - (gap * (cols - 1));
  const usableHeight = spreadHeight * (1 - outerMargin * 2) - (gap * (rows - 1));

  const cellWidth = usableWidth / cols;
  const cellHeight = usableHeight / rows;

  const x = spreadWidth * outerMargin + (col * (cellWidth + gap));
  const y = spreadHeight * outerMargin + (row * (cellHeight + gap));
  const width = (cellWidth * colSpan) + (gap * (colSpan - 1));
  const height = (cellHeight * rowSpan) + (gap * (rowSpan - 1));

  return {
    x: x / spreadWidth,
    y: y / spreadHeight,
    w: width / spreadWidth,
    h: height / spreadHeight,
    style: slot.style || null
  };
}

function createTemplateFrame(slot, spreadWidth, spreadHeight, photoId = null, gap = templateGapPx){
  const layout = mmToLayout(slot, spreadWidth, spreadHeight, gap);
  const x = Math.round(layout.x * spreadWidth);
  const y = Math.round(layout.y * spreadHeight);
  const width = Math.max(60, Math.round(layout.w * spreadWidth));
  const height = Math.max(60, Math.round(layout.h * spreadHeight));
  const frame = createFrameData(photoId, x, y, width, height, {
    imageWidth: width,
    imageHeight: height,
    imageLeft: 0,
    imageTop: 0
  });
  frame.placeholder = !photoId;
  frame.templateStyle = slot.style || null;
  return frame;
}

function rerenderSpread(spreadModel){
  const view = getSpreadView(spreadModel);
  if(!view) return;
  view.canvas.querySelectorAll(".photo-frame").forEach(el => el.remove());
  spreadModel.frames.forEach(frame => renderFrame(spreadModel, frame));
}

// Herberekent ALLEEN de sjabloon-slotposities van DEZE spread met zijn eigen
// gap (spreadModel.gap). Gebruikt exact hetzelfde pad als het toepassen van een
// sjabloon (createTemplateFrame + fillFrameWithPhoto), zodat de cover-, schaal-
// en centreer-wiskunde van de foto's volledig ongewijzigd blijft. Andere spreads
// worden niet aangeraakt. Vereist dat de spread een sjabloon heeft (spreadModel.slots).
function relayoutSpreadWithGap(spreadModel){
  if(!spreadModel || !Array.isArray(spreadModel.slots) || !spreadModel.slots.length) return;
  const [spreadWidth, spreadHeight] = formats[project.format];
  const gap = typeof spreadModel.gap === "number" ? spreadModel.gap : templateGapPx;
  const photoIds = spreadModel.frames.map(frame => frame.photoId);

  spreadModel.frames = spreadModel.slots.map((slot, index) =>
    createTemplateFrame(slot, spreadWidth, spreadHeight, photoIds[index] || null, gap));

  photoIds.forEach((photoId, index) => {
    const frame = spreadModel.frames[index];
    if(frame && photoId) fillFrameWithPhoto(frame, photoId);
  });

  rerenderSpread(spreadModel);
}

function fillFrameWithPhoto(frameData, photoId, callback = null){
  const photo = getPhotoById(photoId);
  if(!photo) return;

  const tempImg = new Image();
  tempImg.onload = function(){
    photo.naturalWidth = tempImg.naturalWidth;
    photo.naturalHeight = tempImg.naturalHeight;

    frameData.photoId = photoId;
    frameData.placeholder = false;

    const ratio = tempImg.naturalWidth / tempImg.naturalHeight;
    if((frameData.width / frameData.height) > ratio){
      frameData.imageWidth = frameData.width;
      frameData.imageHeight = frameData.width / ratio;
    } else {
      frameData.imageHeight = frameData.height;
      frameData.imageWidth = frameData.height * ratio;
    }
    frameData.imageLeft = (frameData.width - frameData.imageWidth) / 2;
    frameData.imageTop = (frameData.height - frameData.imageHeight) / 2;

    if(typeof callback === "function") callback(frameData);
    rerenderSpread(activeSpread || project.spreads.find(spread => spread.frames.some(frame => frame.id === frameData.id)));
    renderLibrary();
  };
  tempImg.src = photo.src;
}

function applyTemplateToActiveSpread(templateId){
  if(!activeSpread) return;
  const template = templateCatalog.find(item => item.id === templateId);
  if(!template) return;

  const [spreadWidth, spreadHeight] = formats[project.format];
  const existingPhotoIds = activeSpread.frames.map(frame => frame.photoId).filter(Boolean);

  // Onthoud het sjabloon op de spread zodat de per-spread Ruimte-slider de
  // slotposities later live kan herberekenen.
  activeSpread.slots = template.slots;

  // Bij ELKE nieuwe sjabloonkeuze reset de gap naar de actuele globale onderbalk
  // (templateGapPx) en wordt de spread weer ontgrendeld. Zo opent een ander
  // sjabloon altijd met de huidige globale Ruimte; een eerdere eigen instelling
  // van deze spread wordt bewust losgelaten zodra een nieuw sjabloon wordt gekozen.
  activeSpread.gap = templateGapPx;
  activeSpread.gapUserSet = false;
  const spreadGap = templateGapPx;

  activeSpread.frames = template.slots.map((slot, index) => createTemplateFrame(slot, spreadWidth, spreadHeight, existingPhotoIds[index] || null, spreadGap));

  // Houd de Ruimte-slider van deze spread in sync met de gebruikte gap.
  const gapView = getSpreadView(activeSpread);
  if(gapView && gapView.gapSlider){
    gapView.gapSlider.value = String(spreadGap);
    if(gapView.gapValue) gapView.gapValue.textContent = `${spreadGap} px`;
  }

  existingPhotoIds.forEach((photoId, index) => {
    const frame = activeSpread.frames[index];
    if(frame && photoId){
      fillFrameWithPhoto(frame, photoId);
    }
  });

  rerenderSpread(activeSpread);
  renderLibrary();
  setActiveSpread(activeSpread);
  requestAnimationFrame(() => scrollToSpread(activeSpread, "smooth"));
}


async function readExifCaptureDate(file){
  try {
    const buffer = await file.arrayBuffer();
    const view = new DataView(buffer);
    if(view.byteLength < 4 || view.getUint16(0, false) !== 0xFFD8) return null;

    let offset = 2;
    while(offset + 4 < view.byteLength){
      const marker = view.getUint16(offset, false);
      offset += 2;
      if(marker === 0xFFE1){
        const app1Length = view.getUint16(offset, false);
        const tiffStart = offset + 8;
        if(offset + app1Length > view.byteLength) return null;
        if(view.getUint32(offset + 2, false) !== 0x45786966) return null;
        const little = view.getUint16(tiffStart, false) === 0x4949;
        const get16 = pos => view.getUint16(pos, little);
        const get32 = pos => view.getUint32(pos, little);
        const firstIfdOffset = get32(tiffStart + 4);
        const exifIfdPointer = findExifTagOffset(view, tiffStart, tiffStart + firstIfdOffset, 0x8769, little);
        if(!exifIfdPointer) return null;
        const dateStr = readExifDateString(view, tiffStart, tiffStart + exifIfdPointer, little, [0x9003, 0x9004, 0x0132]);
        return parseExifDateString(dateStr);
      }
      if(marker === 0xFFDA || marker === 0xFFD9) break;
      const size = view.getUint16(offset, false);
      offset += size;
    }
  } catch (error) {
    console.warn('EXIF kon niet worden gelezen', error);
  }
  return null;
}

function findExifTagOffset(view, tiffStart, dirStart, tagId, little){
  if(dirStart + 2 > view.byteLength) return 0;
  const entries = view.getUint16(dirStart, little);
  for(let i = 0; i < entries; i++){
    const entry = dirStart + 2 + i * 12;
    if(entry + 12 > view.byteLength) break;
    const tag = view.getUint16(entry, little);
    if(tag === tagId){
      return view.getUint32(entry + 8, little);
    }
  }
  return 0;
}

function readExifDateString(view, tiffStart, dirStart, little, preferredTags){
  if(dirStart + 2 > view.byteLength) return '';
  const entries = view.getUint16(dirStart, little);
  for(const wanted of preferredTags){
    for(let i = 0; i < entries; i++){
      const entry = dirStart + 2 + i * 12;
      if(entry + 12 > view.byteLength) break;
      const tag = view.getUint16(entry, little);
      if(tag !== wanted) continue;
      const type = view.getUint16(entry + 2, little);
      const count = view.getUint32(entry + 4, little);
      if(type !== 2 || count < 8) continue;
      const valueOffset = view.getUint32(entry + 8, little);
      const stringStart = count <= 4 ? entry + 8 : tiffStart + valueOffset;
      const chars = [];
      for(let j = 0; j < count - 1 && stringStart + j < view.byteLength; j++){
        const code = view.getUint8(stringStart + j);
        if(code === 0) break;
        chars.push(String.fromCharCode(code));
      }
      const value = chars.join('').trim();
      if(value) return value;
    }
  }
  return '';
}

function parseExifDateString(value){
  if(!value) return null;
  const match = String(value).match(/^(\d{4}):(\d{2}):(\d{2})[ T](\d{2}):(\d{2}):(\d{2})$/);
  if(!match) return null;
  const [, y, m, d, hh, mm, ss] = match;
  const parsed = new Date(Number(y), Number(m) - 1, Number(d), Number(hh), Number(mm), Number(ss));
  return Number.isNaN(parsed.getTime()) ? null : parsed.getTime();
}



let isLightTheme = false;
const themeBtn = document.getElementById("themeBtn");

function updateThemeIcon(){
  if(!themeBtn) return;
  if(isLightTheme){
    themeBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  } else {
    themeBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  }
}

function applyThemePreference(){
  document.body.classList.toggle("light-theme", isLightTheme);
  localStorage.setItem("albumTheme", isLightTheme ? "light" : "dark");
  updateThemeIcon();
}

function toggleTheme(){
  isLightTheme = !isLightTheme;
  applyThemePreference();
}

function sanitizeProjectName(name){
  const cleaned = String(name || '').trim().replace(/[\/:*?"<>|]+/g, '-').replace(/\s+/g, ' ');
  return cleaned || 'Nieuw album';
}

function syncProjectUI(){
  const safeName = project.name || 'Nieuw album';
  projectNameInput.value = safeName;
  formatSelect.value = project.format;
  projectSummaryName.textContent = safeName;
  projectSummaryMeta.textContent = formatLabels[project.format] || project.format;
}

function openIntroOverlay(mode = 'edit'){
  introMode = mode;
  syncProjectUI();
  startProjectBtn.textContent = mode === 'startup' ? 'Project openen' : 'Instellingen toepassen';
  introOverlay.classList.remove('hidden');
  setTimeout(() => projectNameInput.focus(), 0);
}

function closeIntroOverlay(){
  introOverlay.classList.add('hidden');
}

function applyIntroSettings(){
  project.name = sanitizeProjectName(projectNameInput.value);
  const nextFormat = formatSelect.value;
  if(project.format !== nextFormat){
    project.format = nextFormat;
    resizeAllCanvases();
  }
  syncProjectUI();
  closeIntroOverlay();
}

function getPhotoUsageCount(photoId){
  let count = 0;
  project.spreads.forEach(spread => {
    spread.frames.forEach(frame => {
      if(frame.photoId === photoId) count += 1;
    });
  });
  return count;
}

function getSpreadUsage(photoId){
  const pages = [];
  project.spreads.forEach((spread, idx) => {
    if(spread.frames.some(frame => frame.photoId === photoId)){
      pages.push(idx + 1);
    }
  });
  return pages;
}

function getActiveSpreadIndex(){
  return project.spreads.findIndex(spread => spread.id === activeSpread?.id);
}

function zoomIn(){
  if(currentZoom < 200){
    currentZoom += 25;
    applyZoom();
  }
}

function zoomOut(){
  if(currentZoom > 25){
    currentZoom -= 25;
    applyZoom();
  }
}

function applyZoom(){
  zoomLevelEl.textContent = currentZoom + "%";
  workspace.style.zoom = (currentZoom / 100);
}

function updateSpreadNumbers(){
  spreadViews.forEach((view, i) => {
    const labelText = view.label.querySelector("span");
    if(labelText){
      labelText.textContent = (i + 1);
    } else {
      view.label.textContent = (i + 1);
    }
  });
  spreadCount.innerText = project.spreads.length;
}

function setActiveSpread(spreadModel){
  spreadViews.forEach(view => view.wrapper.classList.remove("active"));
  activeSpread = spreadModel || null;
  if(!activeSpread) return;
  const activeView = spreadViews.find(view => view.model.id === activeSpread.id);
  if(activeView) activeView.wrapper.classList.add("active");
  renderLibrary();
}

function createSpreadModel(){
  // gap start gelijk aan de globale Ruimte-bar (alleen als startwaarde).
  // gapUserSet=false => deze spread gebruikt nog de globale default; zodra de
  // gebruiker de eigen slider aanraakt wordt hij volledig onafhankelijk.
  return { id: uid("spread"), frames: [], gap: templateGapPx, gapUserSet: false };
}

function buildSpreadView(spreadModel){
  const wrapper = document.createElement("div");
  wrapper.className = "canvasWrapper";

  const label = document.createElement("div");
  label.className = "spreadLabel";
  const labelText = document.createElement("span");
  label.appendChild(labelText);

  const colorInput = document.createElement("input");
  colorInput.type = "color";
  colorInput.className = "spreadColor";
  colorInput.value = spreadModel.background || "#ffffff";
  colorInput.style.marginLeft = "8px";
  label.appendChild(colorInput);

  // --- Per-spread Ruimte (gap) slider: kompakt en horizontaal naast de kleur ---
  if(typeof spreadModel.gap !== "number") spreadModel.gap = templateGapPx;

  const gapLabel = document.createElement("span");
  gapLabel.className = "spreadGapLabel";
  gapLabel.textContent = "Ruimte";
  label.appendChild(gapLabel);

  const gapSlider = document.createElement("input");
  gapSlider.type = "range";
  gapSlider.min = "0";
  gapSlider.max = "15";
  gapSlider.step = "1";
  gapSlider.className = "spreadGap";
  gapSlider.value = String(spreadModel.gap);
  gapSlider.title = "Ruimte tussen de foto's op deze pagina";
  label.appendChild(gapSlider);

  const gapValue = document.createElement("span");
  gapValue.className = "spreadGapValue";
  gapValue.textContent = `${spreadModel.gap} px`;
  label.appendChild(gapValue);

  // Live: alleen DEZE spread herberekent zijn slotposities met de nieuwe gap.
  // De gebruiker heeft nu een eigen keuze gemaakt: markeer onafhankelijk zodat
  // de globale bar deze spread nooit meer als default overschrijft.
  gapSlider.addEventListener("input", e => {
    e.stopPropagation();
    const value = Number(e.target.value || 0);
    spreadModel.gap = value;
    spreadModel.gapUserSet = true;
    gapValue.textContent = `${value} px`;
    relayoutSpreadWithGap(spreadModel);
  });

  wrapper.appendChild(label);

  colorInput.addEventListener("input", e => {
    spreadModel.background = e.target.value;
    canvas.style.background = e.target.value;
  });
  colorInput.addEventListener("input", e=>{
    spreadModel.background=e.target.value;
    canvas.style.background=e.target.value;
  });

  const canvas = document.createElement("div");
  canvas.className = "canvas";
  wrapper.appendChild(canvas);

  const cutline = document.createElement("div");
  cutline.className = "cutline";
  canvas.appendChild(cutline);

  const fold = document.createElement("div");
  fold.className = "fold";
  canvas.appendChild(fold);

  wrapper.addEventListener("click", () => setActiveSpread(spreadModel));
  workspace.insertBefore(wrapper, addSpreadBtn);

  const view = { model: spreadModel, wrapper, label, canvas, cutline, fold, gapSlider, gapValue };
  spreadViews.push(view);
  return view;
}

function applyFormatToCanvas(canvas){
  const [width, height] = formats[project.format];
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  canvas.style.background = project.spreadBackground || '#ffffff';
}


function scrollToSpread(spreadModel, behavior = "smooth"){
  const view = getSpreadView(spreadModel);
  if(!view) return;
  const targetLeft = Math.max(0, view.wrapper.offsetLeft - 24);
  workspace.scrollTo({ left: targetLeft, behavior });
}


function updateActiveSpreadFromScroll(){
  if(!spreadViews.length) return;
  const viewportCenter = workspace.scrollLeft + (workspace.clientWidth / 2);
  let bestView = null;
  let bestDistance = Infinity;

  spreadViews.forEach(view => {
    const spreadCenter = view.wrapper.offsetLeft + (view.wrapper.offsetWidth / 2);
    const distance = Math.abs(spreadCenter - viewportCenter);
    if(distance < bestDistance){
      bestDistance = distance;
      bestView = view;
    }
  });

  if(bestView && (!activeSpread || activeSpread.id !== bestView.model.id)){
    setActiveSpread(bestView.model);
  }
}

let scrollActiveSpreadRaf = null;
workspace.addEventListener('scroll', () => {
  if(scrollActiveSpreadRaf) cancelAnimationFrame(scrollActiveSpreadRaf);
  scrollActiveSpreadRaf = requestAnimationFrame(() => {
    updateActiveSpreadFromScroll();
    scrollActiveSpreadRaf = null;
  });
});

function resizeAllCanvases(){
  spreadViews.forEach(view => {
    applyFormatToCanvas(view.canvas);
    view.model.frames.forEach(frame => {
      const maxX = Math.max(0, formats[project.format][0] - frame.width);
      const maxY = Math.max(0, formats[project.format][1] - frame.height);
      frame.x = Math.min(Math.max(0, frame.x), maxX);
      frame.y = Math.min(Math.max(0, frame.y), maxY);
      ensureImageCoversFrame(frame);
      const frameEl = view.canvas.querySelector(`[data-frame-id="${frame.id}"]`);
      if(frameEl) updateFrameElement(frameEl, frame);
    });
  });
  if(activeSpread){
    requestAnimationFrame(() => scrollToSpread(activeSpread, "auto"));
  }
}

function applySpreadBackgroundToAll(){
  spreadViews.forEach(view => {
    view.canvas.style.background = project.spreadBackground || '#ffffff';
  });
  if(spreadBgColor){
    spreadBgColor.value = project.spreadBackground || '#ffffff';
  }
}


function createSpread(){
  const spreadModel = createSpreadModel();
  project.spreads.push(spreadModel);
  const view = buildSpreadView(spreadModel);
  applyFormatToCanvas(view.canvas);
  updateSpreadNumbers();
  setActiveSpread(spreadModel);
  return spreadModel;
}

function clearWorkspace(){
  spreadViews.forEach(view => view.wrapper.remove());
  spreadViews = [];
  activeSpread = null;
}

projectNameInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    applyIntroSettings();
  }
});

startProjectBtn.addEventListener('click', () => {
  applyIntroSettings();
});

librarySort.addEventListener('change', (e) => {
  librarySortMode = e.target.value;
  renderLibrary();
});

libraryTabs.forEach(tab => {
  tab.addEventListener('click', () => setAssetMode(tab.dataset.mode));
});

templateFilter.addEventListener('change', (e) => {
  templateFilterMode = e.target.value;
  renderTemplates();
});

templateCount.addEventListener('change', (e) => {
  templatePhotoCount = Number(e.target.value || 1);
  renderTemplates();
});

templateGap.addEventListener('input', (e) => {
  // De globale bar past de default-startwaarde (templateGapPx) en de previews aan.
  templateGapPx = Number(e.target.value || 5);
  templateGapValue.textContent = `${templateGapPx} px`;
  renderTemplates();

  // Live: werk ALLEEN de actieve spread bij, en alleen als die nog niet door de
  // gebruiker zelf is ingesteld (gapUserSet !== true). Andere, eigen ingestelde
  // spreads worden bewust NIET aangeraakt; die bewaren hun eigen gap.
  if(activeSpread && activeSpread.gapUserSet !== true){
    activeSpread.gap = templateGapPx;
    const gapView = getSpreadView(activeSpread);
    if(gapView && gapView.gapSlider){
      gapView.gapSlider.value = String(templateGapPx);
      if(gapView.gapValue) gapView.gapValue.textContent = `${templateGapPx} px`;
    }
    relayoutSpreadWithGap(activeSpread);
  }
});

libraryZoom.addEventListener('input', (e) => {
  libraryThumbSize = Number(e.target.value || 60);
  renderLibrary();
});


if(spreadBgColor){
  spreadBgColor.addEventListener('input', (e) => {
    project.spreadBackground = e.target.value || '#ffffff';
    applySpreadBackgroundToAll();
  });
}


function enableHorizontalWheelScroll(container){
  if(!container) return;
  container.addEventListener('wheel', (e) => {
    const mostlyVertical = Math.abs(e.deltaY) > Math.abs(e.deltaX);
    if(mostlyVertical){
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    }
  }, { passive:false });
}

enableHorizontalWheelScroll(library);
enableHorizontalWheelScroll(templateLibrary);

function applySnap(x, y, frameData, spreadModel){
  const snapThreshold = 3;
  const result = {x, y};
  const [canvasW, canvasH] = formats[project.format];
  const frameW = frameData.width;
  const frameH = frameData.height;

  if(Math.abs(x) < snapThreshold) result.x = 0;
  if(Math.abs(x + frameW - canvasW) < snapThreshold) result.x = canvasW - frameW;
  if(Math.abs(y) < snapThreshold) result.y = 0;
  if(Math.abs(y + frameH - canvasH) < snapThreshold) result.y = canvasH - frameH;

  const canvasCenterX = canvasW / 2;
  const canvasCenterY = canvasH / 2;
  if(Math.abs((x + frameW / 2) - canvasCenterX) < snapThreshold) result.x = canvasCenterX - frameW / 2;
  if(Math.abs((y + frameH / 2) - canvasCenterY) < snapThreshold) result.y = canvasCenterY - frameH / 2;
  if(Math.abs(x - canvasCenterX) < snapThreshold) result.x = canvasCenterX;
  if(Math.abs(x + frameW - canvasCenterX) < snapThreshold) result.x = canvasCenterX - frameW;

  spreadModel.frames.forEach(otherFrame => {
    if(otherFrame.id === frameData.id) return;
    const ox = otherFrame.x;
    const oy = otherFrame.y;
    const ow = otherFrame.width;
    const oh = otherFrame.height;

    if(Math.abs(x - ox) < snapThreshold) result.x = ox;
    if(Math.abs(x + frameW - ox - ow) < snapThreshold) result.x = ox + ow - frameW;
    if(Math.abs(x - ox - ow) < snapThreshold) result.x = ox + ow;
    if(Math.abs(x + frameW - ox) < snapThreshold) result.x = ox - frameW;
    if(Math.abs((x + frameW / 2) - (ox + ow / 2)) < snapThreshold) result.x = ox + ow / 2 - frameW / 2;

    if(Math.abs(y - oy) < snapThreshold) result.y = oy;
    if(Math.abs(y + frameH - oy - oh) < snapThreshold) result.y = oy + oh - frameH;
    if(Math.abs(y - oy - oh) < snapThreshold) result.y = oy + oh;
    if(Math.abs(y + frameH - oy) < snapThreshold) result.y = oy - frameH;
    if(Math.abs((y + frameH / 2) - (oy + oh / 2)) < snapThreshold) result.y = oy + oh / 2 - frameH / 2;
  });

  return result;
}

// Snap-variant voor het BOUNDARY-tijdens-resizen. Dezelfde drempel (3) en exact
// dezelfde snap-doelen als applySnap (canvasranden, canvasmidden, randen + midden
// van andere kaders), maar nu snapt alleen de BEWEGENDE rand van het kader.
// Geeft de gesnapte buiten-boundaries terug (x/y/width/height). De cover-, schaal-
// en centreer-wiskunde van de foto blijft hierdoor volledig ongemoeid: die draait
// gewoon op de (gesnapte) width/height zoals voorheen.
function snapResizeBox(curX, curY, curW, curH, moving, spreadModel, frameData){
  const snapThreshold = 3;
  const [canvasW, canvasH] = formats[project.format];
  let left = curX, top = curY, right = curX + curW, bottom = curY + curH;

  const vTargets = [0, canvasW, canvasW / 2];          // verticale randen (x-as)
  const hTargets = [0, canvasH, canvasH / 2];          // horizontale randen (y-as)
  spreadModel.frames.forEach(other => {
    if(other.id === frameData.id) return;
    vTargets.push(other.x, other.x + other.width,  other.x + other.width  / 2);
    hTargets.push(other.y, other.y + other.height, other.y + other.height / 2);
  });

  const snapEdge = (value, targets) => {
    let best = value, bestDist = snapThreshold;
    for(const t of targets){
      const d = Math.abs(value - t);
      if(d < bestDist){ bestDist = d; best = t; }
    }
    return best;
  };

  // Alleen de bewegende rand snapt; de tegenoverliggende (geankerde) rand blijft vast.
  if(moving.left)   left   = Math.min(snapEdge(left,   vTargets), right - 50);
  if(moving.right)  right  = Math.max(snapEdge(right,  vTargets), left + 50);
  if(moving.top)    top    = Math.min(snapEdge(top,    hTargets), bottom - 50);
  if(moving.bottom) bottom = Math.max(snapEdge(bottom, hTargets), top + 50);

  // Binnen de albumgrenzen houden.
  left   = Math.max(0, left);
  top    = Math.max(0, top);
  right  = Math.min(canvasW, right);
  bottom = Math.min(canvasH, bottom);

  return { x: left, y: top, width: right - left, height: bottom - top };
}

function ensureLibraryIsNotEmpty(){
  const empty = library.querySelector('.library-empty');
  if(empty) empty.remove();
}

function restoreEmptyLibraryState(){
  if(project.library.length > 0) return;
  library.innerHTML = `
    <div class="library-empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <div class="library-empty-text">Klik op "Foto's Toevoegen"</div>
    </div>
  `;
}

function renderLibrary(){
  if(project.library.length === 0){
    restoreEmptyLibraryState();
    return;
  }

  library.innerHTML = "";
  sortLibraryItems(project.library).forEach(photo => {
    const usagePages = getSpreadUsage(photo.id);
    const usageCount = getPhotoUsageCount(photo.id);
    const wrapper = document.createElement("div");
    wrapper.className = "thumbWrapper";
    wrapper.dataset.photoId = photo.id;

    const img = document.createElement("img");
    img.src = photo.src;
    img.className = "thumb" + (usageCount ? " used" : "");
    img.style.height = `${libraryThumbSize}px`;
    img.title = photo.name;
    img.addEventListener("click", () => {
      if(activeSpread) addPhotoToSpread(activeSpread, photo.id, 50, 50);
    });
    wrapper.appendChild(img);

    if(usagePages.length){
      const tag = document.createElement("div");
      tag.className = "spread-tag";
      tag.textContent = usagePages.map(page => `P${page}`).join(", ");
      wrapper.appendChild(tag);
    }

    const meta = document.createElement("div");
    meta.className = "thumbMeta";
    meta.style.width = `${Math.max(84, Math.round(libraryThumbSize * 0.95))}px`;

    const name = document.createElement("div");
    name.className = "thumbName";
    name.textContent = photo.name;
    meta.appendChild(name);

    const status = document.createElement("div");
    status.className = "thumbStatus";
    const captureLabel = photo.captureDate ? ` • ${formatCaptureDate(photo.captureDate)}` : '';
    status.textContent = usageCount ? `${usageCount}x gebruikt${captureLabel}` : `Nog niet gebruikt${captureLabel}`;
    meta.appendChild(status);

    wrapper.appendChild(meta);
    library.appendChild(wrapper);
  });
}

function getPhotoAspectRatio(photoId){
  const photo = getPhotoById(photoId);
  if(!photo || typeof photo.src !== "string") return 1;
  if(photo.naturalWidth && photo.naturalHeight){
    return photo.naturalWidth / photo.naturalHeight;
  }
  return 1;
}

function clampImagePosition(frameData){
  frameData.imageLeft = Math.min(0, Math.max(frameData.width - frameData.imageWidth, frameData.imageLeft));
  frameData.imageTop = Math.min(0, Math.max(frameData.height - frameData.imageHeight, frameData.imageTop));
}

function ensureImageCoversFrame(frameData){
  if(!frameData.photoId) return;
  const ratio = getPhotoAspectRatio(frameData.photoId);
  const minScale = Math.max(frameData.width / ratio, frameData.height);
  if(frameData.imageHeight < minScale){
    frameData.imageHeight = minScale;
    frameData.imageWidth = frameData.imageHeight * ratio;
  }
  if(frameData.imageWidth < frameData.width){
    frameData.imageWidth = frameData.width;
    frameData.imageHeight = frameData.imageWidth / ratio;
  }
  if(frameData.imageHeight < frameData.height){
    frameData.imageHeight = frameData.height;
    frameData.imageWidth = frameData.imageHeight * ratio;
  }
  clampImagePosition(frameData);
}

function zoomFramePhoto(frameData, factor){
  const ratio = getPhotoAspectRatio(frameData.photoId);
  const frameCenterX = frameData.width / 2;
  const frameCenterY = frameData.height / 2;

  const relativeCenterX = (frameCenterX - frameData.imageLeft) / frameData.imageWidth;
  const relativeCenterY = (frameCenterY - frameData.imageTop) / frameData.imageHeight;

  let newWidth = frameData.imageWidth * factor;
  let newHeight = newWidth / ratio;

  const minScale = Math.max(frameData.width / ratio, frameData.height);
  const minHeight = Math.max(frameData.height, minScale);
  const minWidth = minHeight * ratio;

  if(newWidth < minWidth){
    newWidth = minWidth;
    newHeight = minHeight;
  }

  frameData.imageWidth = newWidth;
  frameData.imageHeight = newHeight;
  frameData.imageLeft = frameCenterX - (relativeCenterX * newWidth);
  frameData.imageTop = frameCenterY - (relativeCenterY * newHeight);
  clampImagePosition(frameData);
}

function createFrameData(photoId, x, y, width, height, options = {}){
  return {
    id: uid("frame"),
    photoId,
    x,
    y,
    width,
    height,
    imageWidth: options.imageWidth ?? width,
    imageHeight: options.imageHeight ?? height,
    imageLeft: options.imageLeft ?? 0,
    imageTop: options.imageTop ?? 0,
    movePhotoMode: false
  };
}

function getSpreadView(spreadModel){
  return spreadViews.find(view => view.model.id === spreadModel.id) || null;
}

function updateFrameElement(frameEl, frameData){
  frameEl.style.left = frameData.x + "px";
  frameEl.style.top = frameData.y + "px";
  frameEl.style.width = frameData.width + "px";
  frameEl.style.height = frameData.height + "px";

  const imgEl = frameEl.querySelector("img");
  if(imgEl){
    imgEl.style.width = frameData.imageWidth + "px";
    imgEl.style.height = frameData.imageHeight + "px";
    imgEl.style.left = frameData.imageLeft + "px";
    imgEl.style.top = frameData.imageTop + "px";
  }

  frameEl.classList.toggle("placeholder", !frameData.photoId);
  const moveBtn = frameEl.querySelector(".move-photo-btn");
  if(moveBtn) moveBtn.classList.toggle("active", !!frameData.movePhotoMode);
}

function attachFrameInteractions(frameEl, frameData, spreadModel){
  const handle = frameEl.querySelector('.resize-handle');
  const delBtn = frameEl.querySelector('.delete-btn');
  const moveBtn = frameEl.querySelector('.move-photo-btn');
  const zoomInBtn = frameEl.querySelector('.zoom-in-btn');
  const zoomOutBtn = frameEl.querySelector('.zoom-out-btn');
  const cropWidthHandle = frameEl.querySelector('.crop-width-handle');
  const cropHeightHandle = frameEl.querySelector('.crop-height-handle');
  // Nieuwe symmetrische handles (8 richtingen)
  const handleTL = frameEl.querySelector('.resize-handle-tl');
  const handleTR = frameEl.querySelector('.resize-handle-tr');
  const handleBL = frameEl.querySelector('.resize-handle-bl');
  const cropWidthHandleLeft = frameEl.querySelector('.crop-width-handle-left');
  const cropHeightHandleTop = frameEl.querySelector('.crop-height-handle-top');
  const imgEl = frameEl.querySelector('img');

  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    removeFrame(spreadModel, frameData.id);
  });

  frameEl.addEventListener('dblclick', (e) => {
    e.stopPropagation();
    setActiveSpread(spreadModel);
  });

  moveBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if(!frameData.photoId) return;
    frameData.movePhotoMode = !frameData.movePhotoMode;
    updateFrameElement(frameEl, frameData);
  });

  zoomInBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if(!frameData.photoId) return;
    zoomFramePhoto(frameData, 1.12);
    updateFrameElement(frameEl, frameData);
  });

  zoomOutBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if(!frameData.photoId) return;
    zoomFramePhoto(frameData, 1 / 1.12);
    updateFrameElement(frameEl, frameData);
  });

  frameEl.addEventListener('mousedown', (e) => {
    if([handle, delBtn, moveBtn, zoomInBtn, zoomOutBtn, cropWidthHandle, cropHeightHandle, handleTL, handleTR, handleBL, cropWidthHandleLeft, cropHeightHandleTop].includes(e.target)) return;
    e.preventDefault();
    e.stopPropagation();
    setActiveSpread(spreadModel);

    const view = getSpreadView(spreadModel);
    const canvasRect = view.canvas.getBoundingClientRect();
    const visualScale = canvasRect.width / view.canvas.clientWidth;
    let startX = e.clientX;
    let startY = e.clientY;

    function move(ev){
      ev.preventDefault();
      const dx = (ev.clientX - startX) / visualScale;
      const dy = (ev.clientY - startY) / visualScale;

      if(frameData.movePhotoMode){
        const nextLeft = Math.min(0, Math.max(frameData.width - frameData.imageWidth, frameData.imageLeft + dx));
        const nextTop = Math.min(0, Math.max(frameData.height - frameData.imageHeight, frameData.imageTop + dy));
        frameData.imageLeft = nextLeft;
        frameData.imageTop = nextTop;
      } else {
        const [canvasW, canvasH] = formats[project.format];
        let nx = Math.max(0, Math.min(frameData.x + dx, canvasW - frameData.width));
        let ny = Math.max(0, Math.min(frameData.y + dy, canvasH - frameData.height));
        const snapped = applySnap(nx, ny, frameData, spreadModel);
        frameData.x = snapped.x;
        frameData.y = snapped.y;
      }

      updateFrameElement(frameEl, frameData);
      startX = ev.clientX;
      startY = ev.clientY;
    }

    function stop(){
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', stop);
    }

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stop);
  });

  handle.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    const view = getSpreadView(spreadModel);
    const canvasRect = view.canvas.getBoundingClientRect();
    const visualScale = canvasRect.width / view.canvas.clientWidth;
    const startW = frameData.width;
    const startH = frameData.height;
    const startX = e.clientX;
    const startY = e.clientY;
    const imageRatio = frameData.photoId ? getPhotoAspectRatio(frameData.photoId) : Math.max(0.5, startW / Math.max(1, startH));

    function resize(ev){
      const dx = (ev.clientX - startX) / visualScale;
      const dy = (ev.clientY - startY) / visualScale;
      let nextW = Math.max(50, startW + dx);
      let nextH = Math.max(50, startH + dy);
      const [canvasW, canvasH] = formats[project.format];
      nextW = Math.min(nextW, canvasW - frameData.x);
      nextH = Math.min(nextH, canvasH - frameData.y);

      // Snap de bewegende randen (rechts/onder) — alleen de boundaries.
      const snapped = snapResizeBox(frameData.x, frameData.y, nextW, nextH, {right:true, bottom:true}, spreadModel, frameData);
      frameData.x = snapped.x;
      frameData.y = snapped.y;
      nextW = snapped.width;
      nextH = snapped.height;

      frameData.width = nextW;
      frameData.height = nextH;

      if(frameData.photoId){
        if((nextW / nextH) > imageRatio){
          frameData.imageWidth = nextW;
          frameData.imageHeight = nextW / imageRatio;
        } else {
          frameData.imageHeight = nextH;
          frameData.imageWidth = nextH * imageRatio;
        }
        frameData.imageLeft = (nextW - frameData.imageWidth) / 2;
        frameData.imageTop = (nextH - frameData.imageHeight) / 2;
      } else {
        frameData.imageWidth = nextW;
        frameData.imageHeight = nextH;
        frameData.imageLeft = 0;
        frameData.imageTop = 0;
      }
      updateFrameElement(frameEl, frameData);
    }

    function stop(){
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stop);
    }

    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stop);
  });

  // ---- Rand-handles (n/s/e/w): IDENTIEKE cover + centreer-wiskunde als de hoeken ----
  // Eén as verandert (breedte OF hoogte); de foto wordt herschaald om te coveren en
  // EXACT gecentreerd in het kader, precies zoals bij de hoeken. Hierdoor schuift de
  // foto niet meer naar links/rechts of boven/onder en verliest hij zijn focus niet.
  // movesAnchor=true => tegenoverliggende rand (rechts/onder) blijft vast; alleen de
  // buiten-X/Y van het kader schuift mee (zoals bij de nieuwe hoeken).
  function attachEdgeResize(edgeEl, dim, sign, movesAnchor){
    if(!edgeEl) return;
    edgeEl.addEventListener('mousedown', (e) => {
      if(!frameData.photoId) return;
      e.preventDefault();
      e.stopPropagation();
      const view = getSpreadView(spreadModel);
      const canvasRect = view.canvas.getBoundingClientRect();
      const visualScaleX = canvasRect.width / view.canvas.clientWidth;
      const visualScaleY = canvasRect.height / view.canvas.clientHeight;
      const startW = frameData.width;
      const startH = frameData.height;
      const startFrameX = frameData.x;
      const startFrameY = frameData.y;
      const startX = e.clientX;
      const startY = e.clientY;
      const imageRatio = getPhotoAspectRatio(frameData.photoId);

      function resize(ev){
        const [canvasW, canvasH] = formats[project.format];
        let nextW = startW;
        let nextH = startH;

        if(dim === 'w'){
          const dx = (ev.clientX - startX) / visualScaleX;
          nextW = Math.max(50, startW + sign * dx);
          nextW = movesAnchor ? Math.min(nextW, startFrameX + startW)   // linkerrand >= 0
                              : Math.min(nextW, canvasW - startFrameX);  // rechterrand <= canvas
          if(movesAnchor) frameData.x = startFrameX + startW - nextW;    // rechterrand vast
        } else {
          const dy = (ev.clientY - startY) / visualScaleY;
          nextH = Math.max(50, startH + sign * dy);
          nextH = movesAnchor ? Math.min(nextH, startFrameY + startH)   // bovenrand >= 0
                              : Math.min(nextH, canvasH - startFrameY);  // onderrand <= canvas
          if(movesAnchor) frameData.y = startFrameY + startH - nextH;    // onderrand vast
        }

        // Snap de bewegende rand — alleen de boundary; de cover-wiskunde blijft ongewijzigd.
        const moving = dim === 'w'
          ? (movesAnchor ? {left:true} : {right:true})
          : (movesAnchor ? {top:true}  : {bottom:true});
        const snapped = snapResizeBox(frameData.x, frameData.y, nextW, nextH, moving, spreadModel, frameData);
        frameData.x = snapped.x;
        frameData.y = snapped.y;
        nextW = snapped.width;
        nextH = snapped.height;

        frameData.width = nextW;
        frameData.height = nextH;

        // ----- ONGEWIJZIGDE cover/centreer-wiskunde, identiek aan de hoeken -----
        if((nextW / nextH) > imageRatio){
          frameData.imageWidth = nextW;
          frameData.imageHeight = nextW / imageRatio;
        } else {
          frameData.imageHeight = nextH;
          frameData.imageWidth = nextH * imageRatio;
        }
        frameData.imageLeft = (nextW - frameData.imageWidth) / 2;
        frameData.imageTop = (nextH - frameData.imageHeight) / 2;

        updateFrameElement(frameEl, frameData);
      }

      function stop(){
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stop);
      }

      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stop);
    });
  }

  attachEdgeResize(cropWidthHandle,      'w', +1, false); // rechter rand (oost)
  attachEdgeResize(cropWidthHandleLeft,  'w', -1, true);  // linker rand (west)
  attachEdgeResize(cropHeightHandle,     'h', +1, false); // onder rand (zuid)
  attachEdgeResize(cropHeightHandleTop,  'h', -1, true);  // boven rand (noord)

  // =========================================================================
  // NIEUWE SYMMETRISCHE HANDLES (8 richtingen)
  // -------------------------------------------------------------------------
  // KRITIEKE REGEL: de foto-wiskunde (scale / centreren / cover) blijft exact
  // gelijk aan de originele rechtsonder-hoek en de rechter/onder crop-handles.
  // Voor de nieuwe links/boven-richtingen verschuiven we ALLEEN de buiten-X/Y
  // van het kader zodat de tegenoverliggende rand vast (geankerd) blijft.
  // =========================================================================

  // ---- Hoek-handles: hergebruiken EXACT de originele hoek-cover-wiskunde ----
  // wSign/hSign bepalen de sleeprichting; movesX/movesY of de buiten-X/Y schuift.
  function attachCornerResize(cornerEl, wSign, hSign, movesX, movesY){
    if(!cornerEl) return;
    cornerEl.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const view = getSpreadView(spreadModel);
      const canvasRect = view.canvas.getBoundingClientRect();
      const visualScale = canvasRect.width / view.canvas.clientWidth;
      const startW = frameData.width;
      const startH = frameData.height;
      const startFrameX = frameData.x;
      const startFrameY = frameData.y;
      const startX = e.clientX;
      const startY = e.clientY;
      const imageRatio = frameData.photoId ? getPhotoAspectRatio(frameData.photoId) : Math.max(0.5, startW / Math.max(1, startH));

      function resize(ev){
        const dx = (ev.clientX - startX) / visualScale;
        const dy = (ev.clientY - startY) / visualScale;
        let nextW = Math.max(50, startW + wSign * dx);
        let nextH = Math.max(50, startH + hSign * dy);
        const [canvasW, canvasH] = formats[project.format];
        // Buiten-grens: vast ankerpunt is de tegenoverliggende rand.
        nextW = movesX ? Math.min(nextW, startFrameX + startW)   // linkerrand >= 0
                       : Math.min(nextW, canvasW - startFrameX); // rechterrand <= canvas (origineel)
        nextH = movesY ? Math.min(nextH, startFrameY + startH)   // bovenrand >= 0
                       : Math.min(nextH, canvasH - startFrameY); // onderrand <= canvas (origineel)

        // Alleen de buiten-X/Y verschuiven (tegenoverliggende hoek blijft vast).
        if(movesX) frameData.x = startFrameX + startW - nextW;
        if(movesY) frameData.y = startFrameY + startH - nextH;

        // Snap de bewegende randen — alleen de boundaries; de cover-wiskunde blijft ongewijzigd.
        const snapped = snapResizeBox(frameData.x, frameData.y, nextW, nextH, {left:movesX, right:!movesX, top:movesY, bottom:!movesY}, spreadModel, frameData);
        frameData.x = snapped.x;
        frameData.y = snapped.y;
        nextW = snapped.width;
        nextH = snapped.height;

        frameData.width = nextW;
        frameData.height = nextH;

        // ----- ONGEWIJZIGDE originele scale/centreer-wiskunde -----
        if(frameData.photoId){
          if((nextW / nextH) > imageRatio){
            frameData.imageWidth = nextW;
            frameData.imageHeight = nextW / imageRatio;
          } else {
            frameData.imageHeight = nextH;
            frameData.imageWidth = nextH * imageRatio;
          }
          frameData.imageLeft = (nextW - frameData.imageWidth) / 2;
          frameData.imageTop = (nextH - frameData.imageHeight) / 2;
        } else {
          frameData.imageWidth = nextW;
          frameData.imageHeight = nextH;
          frameData.imageLeft = 0;
          frameData.imageTop = 0;
        }
        updateFrameElement(frameEl, frameData);
      }

      function stop(){
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stop);
      }

      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stop);
    });
  }

  attachCornerResize(handleTL, -1, -1, true,  true);   // linksboven
  attachCornerResize(handleTR, +1, -1, false, true);   // rechtsboven
  attachCornerResize(handleBL, -1, +1, true,  false);  // linksonder
}

function renderFrame(spreadModel, frameData){
  const photo = getPhotoById(frameData.photoId);
  const view = getSpreadView(spreadModel);
  if(!view) return;

  const frameEl = document.createElement('div');
  frameEl.className = 'photo-frame' + (!photo ? ' placeholder' : '');
  frameEl.dataset.frameId = frameData.id;

  const imgEl = document.createElement('img');
  if(photo?.src){
    imgEl.src = photo.src;
  } else {
    imgEl.alt = 'Leeg templatevak';
  }
  frameEl.appendChild(imgEl);

  if(!photo){
    const placeholder = document.createElement('div');
    placeholder.className = 'placeholder-fill';
    placeholder.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <path d="M12 8v8"></path>
        <path d="M8 12h8"></path>
      </svg>
      <span>Klik op een foto om dit vak te vullen</span>
    `;
    frameEl.appendChild(placeholder);
  }

  const handle = document.createElement('div');
  handle.className = 'resize-handle';
  frameEl.appendChild(handle);

  const delBtn = document.createElement('div');
  delBtn.className = 'delete-btn';
  delBtn.innerHTML = '&times;';
  frameEl.appendChild(delBtn);

  const moveBtn = document.createElement('div');
  moveBtn.className = 'move-photo-btn';
  moveBtn.innerHTML = '&#8644;';
  frameEl.appendChild(moveBtn);

  const zoomInBtn = document.createElement('div');
  zoomInBtn.className = 'zoom-in-btn';
  zoomInBtn.textContent = '+';
  frameEl.appendChild(zoomInBtn);

  const zoomOutBtn = document.createElement('div');
  zoomOutBtn.className = 'zoom-out-btn';
  zoomOutBtn.textContent = '−';
  frameEl.appendChild(zoomOutBtn);

  const cropWidthHandle = document.createElement('div');
  cropWidthHandle.className = 'crop-width-handle';
  cropWidthHandle.title = 'Croppen links en rechts';
  frameEl.appendChild(cropWidthHandle);

  const cropHeightHandle = document.createElement('div');
  cropHeightHandle.className = 'crop-height-handle';
  cropHeightHandle.title = 'Croppen boven en onder';
  frameEl.appendChild(cropHeightHandle);

  // --- Nieuwe symmetrische handles (8 richtingen) ---
  // 3 hoeken (linksboven / rechtsboven / linksonder) + 2 randmiddens (links / boven).
  // Rechtsonder-hoek, rechter- en onderrand bestaan al hierboven.
  const handleTL = document.createElement('div');
  handleTL.className = 'resize-handle resize-handle-tl';
  frameEl.appendChild(handleTL);

  const handleTR = document.createElement('div');
  handleTR.className = 'resize-handle resize-handle-tr';
  frameEl.appendChild(handleTR);

  const handleBL = document.createElement('div');
  handleBL.className = 'resize-handle resize-handle-bl';
  frameEl.appendChild(handleBL);

  const cropWidthHandleLeft = document.createElement('div');
  cropWidthHandleLeft.className = 'crop-width-handle crop-width-handle-left';
  cropWidthHandleLeft.title = 'Croppen links en rechts';
  frameEl.appendChild(cropWidthHandleLeft);

  const cropHeightHandleTop = document.createElement('div');
  cropHeightHandleTop.className = 'crop-height-handle crop-height-handle-top';
  cropHeightHandleTop.title = 'Croppen boven en onder';
  frameEl.appendChild(cropHeightHandleTop);

  view.canvas.appendChild(frameEl);
  updateFrameElement(frameEl, frameData);
  attachFrameInteractions(frameEl, frameData, spreadModel);

  imgEl.onload = () => {
    photo.naturalWidth = imgEl.naturalWidth;
    photo.naturalHeight = imgEl.naturalHeight;
    if(!frameData.imageWidth || !frameData.imageHeight){
      const ratio = imgEl.naturalWidth / imgEl.naturalHeight;
      if((frameData.width / frameData.height) > ratio){
        frameData.imageWidth = frameData.width;
        frameData.imageHeight = frameData.width / ratio;
      } else {
        frameData.imageHeight = frameData.height;
        frameData.imageWidth = frameData.height * ratio;
      }
      frameData.imageLeft = (frameData.width - frameData.imageWidth) / 2;
      frameData.imageTop = (frameData.height - frameData.imageHeight) / 2;
      updateFrameElement(frameEl, frameData);
    }
  };
}

function removeFrame(spreadModel, frameId){
  spreadModel.frames = spreadModel.frames.filter(frame => frame.id !== frameId);
  const view = getSpreadView(spreadModel);
  if(view){
    const frameEl = view.canvas.querySelector(`[data-frame-id="${frameId}"]`);
    if(frameEl) frameEl.remove();
  }
  renderLibrary();
}

function addPhotoToSpread(spreadModel, photoId, x = 50, y = 50, callback = null){
  const emptyTemplateFrame = spreadModel.frames.find(frame => !frame.photoId);
  if(emptyTemplateFrame){
    fillFrameWithPhoto(emptyTemplateFrame, photoId, callback);
    return;
  }

  const photo = getPhotoById(photoId);
  if(!photo) return;

  const tempImg = new Image();
  tempImg.onload = function(){
    photo.naturalWidth = tempImg.naturalWidth;
    photo.naturalHeight = tempImg.naturalHeight;
    const ratio = tempImg.naturalWidth / tempImg.naturalHeight;
    let width, height;

    if(ratio > 1){
      width = 180;
      height = 180 / ratio;
    } else {
      height = 150;
      width = 150 * ratio;
    }

    width = Math.max(80, Math.min(300, width));
    height = Math.max(60, Math.min(250, height));

    let imageWidth, imageHeight;
    if((width / height) > ratio){
      imageWidth = width;
      imageHeight = width / ratio;
    } else {
      imageHeight = height;
      imageWidth = height * ratio;
    }

    const frameData = createFrameData(photoId, x, y, width, height, {
      imageWidth,
      imageHeight,
      imageLeft: (width - imageWidth) / 2,
      imageTop: (height - imageHeight) / 2
    });

    spreadModel.frames.push(frameData);
    renderFrame(spreadModel, frameData);
    renderLibrary();
    if(typeof callback === 'function') callback(frameData);
  };
  tempImg.src = photo.src;
}

function addLibraryPhoto(name, src, id = uid('img'), options = {}){
  project.library.push({
    id,
    name,
    src,
    createdAt: options.createdAt || Date.now(),
    captureDate: options.captureDate || null
  });
  renderLibrary();
}

upload.addEventListener('change', async (e) => {
  const files = Array.from(e.target.files || []);
  if(!files.length) return;
  ensureLibraryIsNotEmpty();

  for(const file of files){
    const captureDate = await readExifCaptureDate(file) || (file.lastModified || null);
    const src = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = ev => resolve(ev.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    addLibraryPhoto(file.name, src, uid('img'), {
      createdAt: Date.now(),
      captureDate
    });
  }

  upload.value = '';
});

async function handleProjectFileInput(e){
  const file = e.target.files?.[0];
  if(!file) return;
  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    loadProject(parsed);
  } catch (error) {
    alert('Projectbestand kon niet worden geladen. Controleer of dit een geldig AlbumDesigner JSON-bestand is.');
    console.error(error);
  }
  e.target.value = '';
}

loadProjectInput.addEventListener('change', handleProjectFileInput);
introLoadProjectInput.addEventListener('change', handleProjectFileInput);

addSpreadBtn.addEventListener('click', () => {
  const spread = createSpread();
  requestAnimationFrame(() => scrollToSpread(spread, "smooth"));
});

function duplicateSpread(spreadModel){
  if(!spreadModel) return;
  const duplicate = createSpreadModel();
  // Neem de eigen gap + het sjabloon over zodat de Ruimte-slider ook hier werkt.
  if(typeof spreadModel.gap === "number") duplicate.gap = spreadModel.gap;
  duplicate.gapUserSet = !!spreadModel.gapUserSet;
  if(Array.isArray(spreadModel.slots)) duplicate.slots = spreadModel.slots;
  duplicate.frames = spreadModel.frames.map(frame => ({
    ...JSON.parse(JSON.stringify(frame)),
    id: uid('frame')
  }));
  project.spreads.push(duplicate);
  const view = buildSpreadView(duplicate);
  applyFormatToCanvas(view.canvas);
  duplicate.frames.forEach(frame => renderFrame(duplicate, frame));
  updateSpreadNumbers();
  setActiveSpread(duplicate);
  renderLibrary();
}

function deleteSpread(spreadModel){
  if(!spreadModel) return;
  const idx = project.spreads.findIndex(spread => spread.id === spreadModel.id);
  if(idx < 0) return;

  project.spreads.splice(idx, 1);
  const viewIndex = spreadViews.findIndex(view => view.model.id === spreadModel.id);
  if(viewIndex >= 0){
    spreadViews[viewIndex].wrapper.remove();
    spreadViews.splice(viewIndex, 1);
  }

  if(project.spreads.length > 0){
    setActiveSpread(project.spreads[Math.max(0, idx - 1)]);
  } else {
    activeSpread = null;
  }

  updateSpreadNumbers();
  renderLibrary();
}

function serializeProject(){
  return {
    version: 2,
    name: sanitizeProjectName(project.name),
    format: project.format,
    spreadBackground: project.spreadBackground || '#ffffff',
    library: project.library.map(photo => ({
      id: photo.id,
      name: photo.name,
      src: photo.src,
      createdAt: photo.createdAt || Date.now(),
      captureDate: photo.captureDate || null
    })),
    spreads: project.spreads.map(spread => ({
      id: spread.id,
      frames: spread.frames.map(frame => ({
        id: frame.id,
        photoId: frame.photoId,
        x: frame.x,
        y: frame.y,
        width: frame.width,
        height: frame.height,
        imageWidth: frame.imageWidth,
        imageHeight: frame.imageHeight,
        imageLeft: frame.imageLeft,
        imageTop: frame.imageTop
      }))
    }))
  };
}

function saveProject(){
  project.name = sanitizeProjectName(project.name);
  syncProjectUI();
  const payload = serializeProject();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${sanitizeProjectName(project.name)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function normalizeLoadedProject(data){
  const next = createEmptyProject(data.format && formats[data.format] ? data.format : '606x206');
  next.name = sanitizeProjectName(data.name || 'Nieuw album');

  if(Array.isArray(data.library)){
    next.library = data.library.map(item => ({
      id: item.id || uid('img'),
      name: item.name || 'Onbenoemde foto',
      src: item.src,
      createdAt: item.createdAt || Date.now(),
      captureDate: item.captureDate || null
    })).filter(item => !!item.src);
  }

  if(Array.isArray(data.spreads)){
    next.spreads = data.spreads.map(spread => ({
      id: spread.id || uid('spread'),
      frames: Array.isArray(spread.frames) ? spread.frames.map(frame => ({
        id: frame.id || uid('frame'),
        photoId: frame.photoId,
        x: Number(frame.x) || 0,
        y: Number(frame.y) || 0,
        width: Math.max(50, Number(frame.width) || 120),
        height: Math.max(50, Number(frame.height) || 120),
        imageWidth: Number(frame.imageWidth) || null,
        imageHeight: Number(frame.imageHeight) || null,
        imageLeft: Number(frame.imageLeft) || 0,
        imageTop: Number(frame.imageTop) || 0,
        movePhotoMode: false
      })).filter(frame => next.library.some(photo => photo.id === frame.photoId)) : []
    }));
  }

  if(next.spreads.length === 0){
    next.spreads = [createSpreadModel()];
  }

  return next;
}

function loadProject(data){
  project = normalizeLoadedProject(data);
  syncProjectUI();
  closeIntroOverlay();
  clearWorkspace();
  project.spreads.forEach(spread => {
    const view = buildSpreadView(spread);
    applyFormatToCanvas(view.canvas);
  });
  project.spreads.forEach(spread => {
    spread.frames.forEach(frame => renderFrame(spread, frame));
  });
  updateSpreadNumbers();
  setActiveSpread(project.spreads[0] || null);
  renderLibrary();
}

function getImageFormatFromSrc(src){
  if(typeof src !== 'string') return 'JPEG';
  if(src.startsWith('data:image/png')) return 'PNG';
  if(src.startsWith('data:image/webp')) return 'WEBP';
  return 'JPEG';
}

async function preloadImage(src){
  return await new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function getFrameSourceCrop(frame, img){
  const naturalWidth = img.naturalWidth || img.width;
  const naturalHeight = img.naturalHeight || img.height;
  const scaleX = naturalWidth / frame.imageWidth;
  const scaleY = naturalHeight / frame.imageHeight;

  const visibleLeft = Math.max(0, -frame.imageLeft);
  const visibleTop = Math.max(0, -frame.imageTop);
  const visibleRight = Math.min(frame.imageWidth, frame.width - frame.imageLeft);
  const visibleBottom = Math.min(frame.imageHeight, frame.height - frame.imageTop);

  const visibleWidth = Math.max(1, visibleRight - visibleLeft);
  const visibleHeight = Math.max(1, visibleBottom - visibleTop);

  return {
    sx: Math.max(0, visibleLeft * scaleX),
    sy: Math.max(0, visibleTop * scaleY),
    sw: Math.min(naturalWidth, visibleWidth * scaleX),
    sh: Math.min(naturalHeight, visibleHeight * scaleY)
  };
}

const PRINT_DPI = 300;

function mmToPx(mm, dpi = PRINT_DPI){
  return Math.max(1, Math.round((mm / 25.4) * dpi));
}

function inferPdfImageFormat(photo){
  const src = String(photo?.src || '');
  const name = String(photo?.name || '').toLowerCase();
  if(src.startsWith('data:image/jpeg') || src.startsWith('data:image/jpg')) return 'JPEG';
  if(src.startsWith('data:image/png')) return 'PNG';
  if(/\.(jpe?g)$/i.test(name)) return 'JPEG';
  if(/\.png$/i.test(name)) return 'PNG';
  return 'JPEG';
}

function getFrameTargetPixels(frame){
  return {
    width: Math.max(1, Math.round(mmToPx(frame.width) * 1.05)),
    height: Math.max(1, Math.round(mmToPx(frame.height) * 1.05))
  };
}

async function getOptimizedFrameAsset(frame, photo, imageCache, assetCache){
  const cacheKey = `${frame.id}_${frame.width}_${frame.height}_${frame.imageWidth}_${frame.imageHeight}_${frame.imageLeft}_${frame.imageTop}`;
  if(assetCache.has(cacheKey)) return assetCache.get(cacheKey);

  if(!imageCache.has(photo.id)){
    imageCache.set(photo.id, await preloadImage(photo.src));
  }

  const img = imageCache.get(photo.id);
  const crop = getFrameSourceCrop(frame, img);
  const target = getFrameTargetPixels(frame);
  const canvas = document.createElement('canvas');
  canvas.width = target.width;
  canvas.height = target.height;

  const ctx = canvas.getContext('2d', { alpha: false });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, crop.sx, crop.sy, crop.sw, crop.sh, 0, 0, canvas.width, canvas.height);

  const preferredFormat = inferPdfImageFormat(photo) === 'PNG' ? 'PNG' : 'JPEG';
  const asset = {
    data: canvas.toDataURL(preferredFormat === 'PNG' ? 'image/png' : 'image/jpeg', 0.92),
    format: preferredFormat,
    width: frame.width,
    height: frame.height
  };
  assetCache.set(cacheKey, asset);
  return asset;
}

async function getEmbeddedImageAsset(photo, preparedCache, imageCache){
  if(preparedCache.has(photo.id)) return preparedCache.get(photo.id);

  const preferredFormat = inferPdfImageFormat(photo);
  let asset = null;

  if(preferredFormat === 'JPEG' || preferredFormat === 'PNG'){
    asset = { data: photo.src, format: preferredFormat };
  } else {
    if(!imageCache.has(photo.id)){
      imageCache.set(photo.id, await preloadImage(photo.src));
    }
    const img = imageCache.get(photo.id);
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx = canvas.getContext('2d', { alpha: preferredFormat === 'PNG' });
    if(preferredFormat !== 'PNG'){
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0);
    asset = {
      data: canvas.toDataURL(preferredFormat === 'PNG' ? 'image/png' : 'image/jpeg', 0.98),
      format: preferredFormat === 'PNG' ? 'PNG' : 'JPEG'
    };
  }

  preparedCache.set(photo.id, asset);
  return asset;
}

async function exportAllSpreadsPDF(){
  if(!project.spreads.length) return;

  project.name = sanitizeProjectName(project.name);
  syncProjectUI();

  const [spreadWidthMm, spreadHeightMm] = formats[project.format];
  const orientation = spreadWidthMm >= spreadHeightMm ? 'landscape' : 'portrait';
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({
    unit: 'mm',
    format: [spreadWidthMm, spreadHeightMm],
    orientation,
    compress: true,
    precision: 12
  });

  document.body.classList.add('exporting');

  try {
    const imageCache = new Map();
    const assetCache = new Map();

    for(let spreadIndex = 0; spreadIndex < project.spreads.length; spreadIndex++){
      const spread = project.spreads[spreadIndex];

      if(spreadIndex > 0){
        pdf.addPage([spreadWidthMm, spreadHeightMm], orientation);
      }

      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, spreadWidthMm, spreadHeightMm, 'F');

      for(const frame of spread.frames){
        const photo = getPhotoById(frame.photoId);
        if(!photo?.src) continue;
        const asset = await getOptimizedFrameAsset(frame, photo, imageCache, assetCache);
        pdf.addImage(asset.data, asset.format, frame.x, frame.y, frame.width, frame.height, undefined, 'MEDIUM');
      }
    }

    pdf.save(`${sanitizeProjectName(project.name)}.pdf`);
  } catch (error) {
    console.error(error);
    alert('Drukwerkexport is mislukt. Controleer of alle afbeeldingen volledig geladen zijn en probeer opnieuw.');
  } finally {
    document.body.classList.remove('exporting');
  }
}

function initialize(){
  isLightTheme = localStorage.getItem("albumTheme") === "light";
  applyThemePreference();

  project = createEmptyProject(formatSelect.value);
  syncProjectUI();
  openIntroOverlay('startup');
  const firstSpread = createSpread();
  setActiveSpread(firstSpread);
  requestAnimationFrame(() => scrollToSpread(firstSpread, "auto"));
  libraryZoom.value = "60";
  libraryThumbSize = 60;
  templateCount.value = String(templatePhotoCount);
  templateGap.value = String(templateGapPx);
  templateGapValue.textContent = `${templateGapPx} px`;
  if(spreadBgColor){
    spreadBgColor.value = project.spreadBackground || '#ffffff';
  }
  renderLibrary();
  renderTemplates();
  setAssetMode('photos');
  applySpreadBackgroundToAll();
  applyZoom();
  requestAnimationFrame(() => updateActiveSpreadFromScroll());
}

initialize();
