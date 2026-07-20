
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
const libraryPageFilter = document.getElementById("libraryPageFilter");
const libraryPageFilterWrap = document.getElementById("libraryPageFilterWrap");
const templateFilterWrap = document.getElementById("templateFilterWrap");
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
  //  CUSTOM 30×30 TEMPLATE CATALOG — sourced EXCLUSIVELY from the /Templates
  //  folder. The default full-bleed catalog has been removed; below are ALL
  //  hand-supplied 30×30 layouts (2 through 6 photos), transcribed one-to-one
  //  from the PNG mockups. Same convention: normalized slots (0..1) that tile
  //  the surface completely, style:"full-bleed", so mmToLayout renders them
  //  exactly.
  // =======================================================================

  // ----------------------------- 1 PHOTO -----------------------------
  // 1 photo : full spread, a single full-bleed hero (covers the one count the
  // folder does not supply, so a wizard page with 1 photo is never left empty).
  {
    id: "custom-30x30-1-hero",
    name: "30×30 · 1 Full Screen",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 1.00, h: 1.00, style: "full-bleed" }
    ]
  },

  // ----------------------------- 2 PHOTOS -----------------------------
  // 2 photo - 1 : vertical 50 / 50 (one photo per page)
  {
    id: "custom-30x30-2-vsplit",
    name: "30×30 · 2 vertical 50/50",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.50, h: 1.00, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.50, h: 1.00, style: "full-bleed" }
    ]
  },
  // 2 photo - 2 : large left (2/3) + narrow right (1/3)
  {
    id: "custom-30x30-2-left-large",
    name: "30×30 · large left + narrow right",
    category: "full-bleed",
    slots: [
      { x: 0.0000, y: 0.00, w: 0.6667, h: 1.00, style: "full-bleed" },
      { x: 0.6667, y: 0.00, w: 0.3333, h: 1.00, style: "full-bleed" }
    ]
  },

  // ----------------------------- 3 PHOTOS -----------------------------
  // 3 photo - 1 : three equal columns
  {
    id: "custom-30x30-3-cols",
    name: "30×30 · three columns",
    category: "full-bleed",
    slots: [
      { x: 0.0000, y: 0.00, w: 0.3333, h: 1.00, style: "full-bleed" },
      { x: 0.3333, y: 0.00, w: 0.3334, h: 1.00, style: "full-bleed" },
      { x: 0.6667, y: 0.00, w: 0.3333, h: 1.00, style: "full-bleed" }
    ]
  },
  // 3 photo - 2 : 2 stacked left (50%) + large right (50%)
  {
    id: "custom-30x30-3-stack-left",
    name: "30×30 · 2 stacked left + large right",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.50, h: 0.50, style: "full-bleed" },
      { x: 0.00, y: 0.50, w: 0.50, h: 0.50, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.50, h: 1.00, style: "full-bleed" }
    ]
  },
  // 3 photo - 3 : large left (50%) + 2 narrow columns (25%)
  {
    id: "custom-30x30-3-left-hero-cols",
    name: "30×30 · large left + 2 narrow",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.50, h: 1.00, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.25, h: 1.00, style: "full-bleed" },
      { x: 0.75, y: 0.00, w: 0.25, h: 1.00, style: "full-bleed" }
    ]
  },

  // ----------------------------- 4 PHOTOS -----------------------------
  // 4 photo - 1 : 2 stacked left (50%) + 2 columns right (25%)
  {
    id: "custom-30x30-4-stack-left-2cols",
    name: "30×30 · 2 stacked left + 2 columns",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.50, h: 0.50, style: "full-bleed" },
      { x: 0.00, y: 0.50, w: 0.50, h: 0.50, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.25, h: 1.00, style: "full-bleed" },
      { x: 0.75, y: 0.00, w: 0.25, h: 1.00, style: "full-bleed" }
    ]
  },
  // 4 photo - 2 : four equal columns
  {
    id: "custom-30x30-4-cols",
    name: "30×30 · four columns",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.25, h: 1.00, style: "full-bleed" },
      { x: 0.25, y: 0.00, w: 0.25, h: 1.00, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.25, h: 1.00, style: "full-bleed" },
      { x: 0.75, y: 0.00, w: 0.25, h: 1.00, style: "full-bleed" }
    ]
  },
  // 4 photo - 3 : grid 2 x 2
  {
    id: "custom-30x30-4-grid",
    name: "30×30 · grid 2 x 2",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.50, h: 0.50, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.50, h: 0.50, style: "full-bleed" },
      { x: 0.00, y: 0.50, w: 0.50, h: 0.50, style: "full-bleed" },
      { x: 0.50, y: 0.50, w: 0.50, h: 0.50, style: "full-bleed" }
    ]
  },
  // 4 photo - 4 : hero left (2/3) + 3 rows right (1/3)
  {
    id: "custom-30x30-4-hero-left-3rows",
    name: "30×30 · hero left + 3 rows",
    category: "full-bleed",
    slots: [
      { x: 0.0000, y: 0.0000, w: 0.6667, h: 1.0000, style: "full-bleed" },
      { x: 0.6667, y: 0.0000, w: 0.3333, h: 0.3333, style: "full-bleed" },
      { x: 0.6667, y: 0.3333, w: 0.3333, h: 0.3334, style: "full-bleed" },
      { x: 0.6667, y: 0.6667, w: 0.3333, h: 0.3333, style: "full-bleed" }
    ]
  },
  // 4 photo - 5 : hero left (50%) + large top-right + 2 small bottom-right
  {
    id: "custom-30x30-4-hero-left-magazine",
    name: "30×30 · hero left + magazine right",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.50, h: 1.00, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.50, h: 0.65, style: "full-bleed" },
      { x: 0.50, y: 0.65, w: 0.25, h: 0.35, style: "full-bleed" },
      { x: 0.75, y: 0.65, w: 0.25, h: 0.35, style: "full-bleed" }
    ]
  },
  // 4 photo - 6 : hero left (50%) + column (25%) + 2 stacked right (25%)
  {
    id: "custom-30x30-4-hero-col-stack",
    name: "30×30 · hero left + column + 2 stacked",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.50, h: 1.00, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.25, h: 1.00, style: "full-bleed" },
      { x: 0.75, y: 0.00, w: 0.25, h: 0.50, style: "full-bleed" },
      { x: 0.75, y: 0.50, w: 0.25, h: 0.50, style: "full-bleed" }
    ]
  },

  // ----------------------------- 5 PHOTOS -----------------------------
  // 5 photo - 1 : hero left (50%) + grid 2 x 2 right (25%)
  {
    id: "custom-30x30-5-hero-left-grid",
    name: "30×30 · hero left + grid right",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.50, h: 1.00, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.25, h: 0.50, style: "full-bleed" },
      { x: 0.75, y: 0.00, w: 0.25, h: 0.50, style: "full-bleed" },
      { x: 0.50, y: 0.50, w: 0.25, h: 0.50, style: "full-bleed" },
      { x: 0.75, y: 0.50, w: 0.25, h: 0.50, style: "full-bleed" }
    ]
  },
  // 5 photo - 2 : 3 columns (25%) + 4th column split into 2 stacked (25%)
  {
    id: "custom-30x30-5-cols-split",
    name: "30×30 · 3 columns + split column",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.25, h: 1.00, style: "full-bleed" },
      { x: 0.25, y: 0.00, w: 0.25, h: 1.00, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.25, h: 1.00, style: "full-bleed" },
      { x: 0.75, y: 0.00, w: 0.25, h: 0.50, style: "full-bleed" },
      { x: 0.75, y: 0.50, w: 0.25, h: 0.50, style: "full-bleed" }
    ]
  },
  // 5 photo - 3 : 2 columns (25%) + large top-right + 2 small bottom-right
  {
    id: "custom-30x30-5-cols-magazine",
    name: "30×30 · 2 columns + magazine right",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.25, h: 1.00, style: "full-bleed" },
      { x: 0.25, y: 0.00, w: 0.25, h: 1.00, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.50, h: 0.65, style: "full-bleed" },
      { x: 0.50, y: 0.65, w: 0.25, h: 0.35, style: "full-bleed" },
      { x: 0.75, y: 0.65, w: 0.25, h: 0.35, style: "full-bleed" }
    ]
  },
  // 5 photo - 4 : 2 large top (50%) + 3 bottom (50% / 25% / 25%)
  {
    id: "custom-30x30-5-2top-3bottom",
    name: "30×30 · 2 top + 3 bottom",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.00, w: 0.50, h: 0.50, style: "full-bleed" },
      { x: 0.50, y: 0.00, w: 0.50, h: 0.50, style: "full-bleed" },
      { x: 0.00, y: 0.50, w: 0.50, h: 0.50, style: "full-bleed" },
      { x: 0.50, y: 0.50, w: 0.25, h: 0.50, style: "full-bleed" },
      { x: 0.75, y: 0.50, w: 0.25, h: 0.50, style: "full-bleed" }
    ]
  },

  // ----------------------------- 6 PHOTOS -----------------------------
  // 6 photo - 1 : 3 columns (25%) + 4th column split into 3 rows (25%)
  {
    id: "custom-30x30-6-3cols-3rows",
    name: "30×30 · 3 columns + 3 rows",
    category: "full-bleed",
    slots: [
      { x: 0.00, y: 0.0000, w: 0.25, h: 1.0000, style: "full-bleed" },
      { x: 0.25, y: 0.0000, w: 0.25, h: 1.0000, style: "full-bleed" },
      { x: 0.50, y: 0.0000, w: 0.25, h: 1.0000, style: "full-bleed" },
      { x: 0.75, y: 0.0000, w: 0.25, h: 0.3333, style: "full-bleed" },
      { x: 0.75, y: 0.3333, w: 0.25, h: 0.3334, style: "full-bleed" },
      { x: 0.75, y: 0.6667, w: 0.25, h: 0.3333, style: "full-bleed" }
    ]
  },
  // 6 photo - 2 : 2 large top (50%) + 4 columns bottom (25%)
  {
    id: "custom-30x30-6-2top-4bottom",
    name: "30×30 · 2 top + 4 bottom",
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
  // 6 photo - 3 : grid 3 x 2
  {
    id: "custom-30x30-6-grid-3x2",
    name: "30×30 · grid 3 x 2",
    category: "full-bleed",
    slots: [
      { x: 0.0000, y: 0.00, w: 0.3333, h: 0.50, style: "full-bleed" },
      { x: 0.3333, y: 0.00, w: 0.3334, h: 0.50, style: "full-bleed" },
      { x: 0.6667, y: 0.00, w: 0.3333, h: 0.50, style: "full-bleed" },
      { x: 0.0000, y: 0.50, w: 0.3333, h: 0.50, style: "full-bleed" },
      { x: 0.3333, y: 0.50, w: 0.3334, h: 0.50, style: "full-bleed" },
      { x: 0.6667, y: 0.50, w: 0.3333, h: 0.50, style: "full-bleed" }
    ]
  },
  // 6 photo - 4 : hero right (1/3) + mixed grid left
  {
    id: "custom-30x30-6-hero-right-mixed",
    name: "30×30 · hero right + mixed left",
    category: "full-bleed",
    slots: [
      { x: 0.0000, y: 0.00, w: 0.3333, h: 0.50, style: "full-bleed" },
      { x: 0.3333, y: 0.00, w: 0.3334, h: 0.50, style: "full-bleed" },
      { x: 0.0000, y: 0.50, w: 0.3333, h: 0.50, style: "full-bleed" },
      { x: 0.3333, y: 0.50, w: 0.1667, h: 0.50, style: "full-bleed" },
      { x: 0.5000, y: 0.50, w: 0.1667, h: 0.50, style: "full-bleed" },
      { x: 0.6667, y: 0.00, w: 0.3333, h: 1.00, style: "full-bleed" }
    ]
  },
  // 6 photo - 5 : wide column left + grid 2x2 center + wide column right
  {
    id: "custom-30x30-6-cols-quad-cols",
    name: "30×30 · column + grid + column",
    category: "full-bleed",
    slots: [
      { x: 0.0000, y: 0.00, w: 0.3333, h: 1.00, style: "full-bleed" },
      { x: 0.3333, y: 0.00, w: 0.1667, h: 0.50, style: "full-bleed" },
      { x: 0.5000, y: 0.00, w: 0.1667, h: 0.50, style: "full-bleed" },
      { x: 0.3333, y: 0.50, w: 0.1667, h: 0.50, style: "full-bleed" },
      { x: 0.5000, y: 0.50, w: 0.1667, h: 0.50, style: "full-bleed" },
      { x: 0.6667, y: 0.00, w: 0.3333, h: 1.00, style: "full-bleed" }
    ]
  }
];


let currentZoom = 100;
let activeSpread = null;
// Remembers which template slot (frame) the user clicked, so the next click in
// the photo library places that photo straight into that slot.
let selectedFrameId = null;
let project = createEmptyProject(formatSelect.value);
let librarySortMode = "name-asc";
// Onderste galerij-filter: "all" = alle foto's, of "0","1",... = alleen de
// foto's die op die (0-gebaseerde) spread/pagina staan. Dynamisch gevuld op
// basis van het door de wizard opgebouwde album.
let libraryPageFilterValue = "all";
let introMode = "startup";
let assetMode = "photos";
let templateFilterMode = "all";
let templatePhotoCount = 1;
let templateGapPx = 0;
let libraryThumbSize = 60;
let spreadViews = [];

function createEmptyProject(formatValue){
  return {
    version: 4,
    name: 'New album',
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
  return new Intl.DateTimeFormat('en-GB', {
    year:'numeric',
    month:'2-digit',
    day:'2-digit'
  }).format(date);
}

function sortLibraryItems(items){
  const sorted = [...items];
  const getName = item => (item.name || '').toLocaleLowerCase('en');
  const getCapture = item => Number(item.captureDate || 0);

  sorted.sort((a, b) => {
    if(librarySortMode === 'name-desc') return getName(b).localeCompare(getName(a), 'en');
    if(librarySortMode === 'capture-asc'){
      const diff = getCapture(a) - getCapture(b);
      if(diff !== 0) return diff;
      return getName(a).localeCompare(getName(b), 'en');
    }
    if(librarySortMode === 'capture-desc'){
      const diff = getCapture(b) - getCapture(a);
      if(diff !== 0) return diff;
      return getName(a).localeCompare(getName(b), 'en');
    }
    return getName(a).localeCompare(getName(b), 'en');
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

// Zet het aantal-foto's-filter van de sjablonenlijst op het werkelijke aantal
// foto's van de actieve spread. Autoritatief: de waarde wordt ALTIJD gezet
// (geklemd op 1..6) in plaats van stilletjes de oude waarde te laten staan bij
// een lege spread of meer dan 6 foto's — anders opent het paneel op een aantal
// dat niets met deze pagina te maken heeft.
function syncTemplateCountToActiveSpread(){
  const placedCount = activeSpread
    ? activeSpread.frames.filter(frame => !!frame.photoId).length
    : 1;
  templatePhotoCount = Math.min(6, Math.max(1, placedCount));
  if(templateCount){
    templateCount.value = String(templatePhotoCount);
  }
}


function setAssetMode(mode){
  assetMode = mode;
  const showTemplates = mode === "templates";
  libraryTabs.forEach(btn => btn.classList.toggle("active", btn.dataset.mode === mode));
  libraryView.classList.toggle("active", !showTemplates);
  templateView.classList.toggle("active", showTemplates);
  libraryTitle.textContent = showTemplates ? "Templates" : "Photo library";
  librarySortWrap.classList.toggle("hidden", showTemplates);
  if(libraryPageFilterWrap) libraryPageFilterWrap.classList.toggle("hidden", showTemplates);
  templateFilterWrap.classList.toggle("hidden", !showTemplates);
  templateCountWrap.classList.toggle("hidden", !showTemplates);

  if(showTemplates){
    // Openen op het aantal foto's van DEZE spread, niet op een blijvende 1.
    syncTemplateCountToActiveSpread();
    renderTemplates();
  }
}

function renderTemplates(){
  const templates = getFilteredTemplates();
  templateLibrary.innerHTML = "";
  if(!templates.length){
    templateLibrary.innerHTML = '<div id="templateEmpty">No templates found for ' + templatePhotoCount + ' photo(s) within this filter.</div>';
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
      const previewLayout = mmToLayout(slot, 100, 50, 0); // Forced 0px gap for perfect thumbnail previews
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


function mmToLayout(slot, spreadWidth, spreadHeight, gap, paddingPx = 0){
  const isFullBleed = slot.style === "full-bleed";

  if(isFullBleed && typeof slot.x === "number"){
    const gapX = gap / Math.max(1, spreadWidth);
    const gapY = gap / Math.max(1, spreadHeight);
    // Margin: outer inset (0..1) that shrinks slots touching the album edge
    // inward from that edge. Inner edges (seams) keep following the gap; only
    // the outer edge is affected by padding.
    const padX = paddingPx / Math.max(1, spreadWidth);
    const padY = paddingPx / Math.max(1, spreadHeight);

    const touchesLeft = slot.x <= 0.0001;
    const touchesTop = slot.y <= 0.0001;
    const touchesRight = (slot.x + slot.w) >= 0.9999;
    const touchesBottom = (slot.y + slot.h) >= 0.9999;

    const leftInset = touchesLeft ? padX : gapX / 2;
    const rightInset = touchesRight ? padX : gapX / 2;
    const topInset = touchesTop ? padY : gapY / 2;
    const bottomInset = touchesBottom ? padY : gapY / 2;

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

function createTemplateFrame(slot, spreadWidth, spreadHeight, photoId = null, gap = templateGapPx, paddingPx = 0){
  const layout = mmToLayout(slot, spreadWidth, spreadHeight, gap, paddingPx);
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

// Recalculates ONLY the template slot positions of THIS spread using its own
// gap (spreadModel.gap). Uses exactly the same path as applying a template
// (createTemplateFrame + fillFrameWithPhoto), so the cover, scale and centering
// math of the photos stays completely unchanged. Other spreads are untouched.
// Requires the spread to have a template (spreadModel.slots).
function relayoutSpreadWithGap(spreadModel){
  if(!spreadModel) return;

  // A project loaded from JSON does populate spreadModel.frames, but initially
  // leaves spreadModel.slots (the template coordinates) empty. Without slots the
  // photos "freeze" on the first slider move because only clicked frames filled
  // their slot via writeBackResizedSlot. If the slots array is missing, empty, or
  // no longer in sync with the frame count, rebuild it here directly and
  // SYNCHRONOUSLY from the existing frame geometry, so the user does not have to
  // click every photo by hand first.
  if(!Array.isArray(spreadModel.slots) || spreadModel.slots.length !== spreadModel.frames.length){
    spreadModel.slots = [];
    spreadModel.frames.forEach(frame => {
      writeBackResizedSlot(spreadModel, frame);
    });
  }

  // Still no slots (e.g. an empty spread without frames)? Then bail out early.
  if(!spreadModel.slots || !spreadModel.slots.length) return;

  const [spreadWidth, spreadHeight] = formats[project.format];
  // Use EXCLUSIVELY this spread's own gap. If it is missing, fall back to a fixed
  // constant (5) instead of the global templateGapPx, so the bottom bar can never
  // secretly influence this re-render live.
  const gap = typeof spreadModel.gap === "number" ? spreadModel.gap : 5;
  // Margin of THIS spread: 0 = unchanged behavior (full-bleed to the edge).
  const padding = typeof spreadModel.padding === "number" ? spreadModel.padding : 0;
  const view = getSpreadView(spreadModel);
  if(!view) return;

  // LIGHTWEIGHT re-layout: NEVER remove DOM elements (that gave frames new uids
  // and forced the browser into an <img> rebuild the slider could not keep up
  // with, which made photos — especially the right-hand one — "disappear"). Here
  // we mutate the EXISTING frames + their DOM nodes in place; ids stay unchanged.
  spreadModel.slots.forEach((slot, index) => {
    let frame = spreadModel.frames[index];
    const layout = mmToLayout(slot, spreadWidth, spreadHeight, gap, padding);

    // Capture the CURRENT focal point (pan/crop) BEFORE the frame metrics change.
    // Without this the block below would re-center every photo on each slider
    // tick, silently throwing away the user's manual pan. Same math as the
    // resize handlers: the fraction of the image that sits under the frame center.
    const curPctX = (frame && frame.imageWidth) ? (frame.width / 2 - frame.imageLeft) / frame.imageWidth : 0.5;
    const curPctY = (frame && frame.imageHeight) ? (frame.height / 2 - frame.imageTop) / frame.imageHeight : 0.5;
    // Ook de huidige ZOOM vastleggen: hoeveel groter is de foto dan de minimale
    // cover-maat voor het huidige kader? Zonder dit rekent het blok hieronder de
    // cover opnieuw vanaf het minimum en verdwijnt het inzoomen van de gebruiker
    // bij elke sliderbeweging.
    const prevBoxWidth = frame ? frame.width : 0;
    const prevBoxHeight = frame ? frame.height : 0;

    // If a frame is (still) missing at this index, create one (safety net).
    if(!frame){
      frame = createTemplateFrame(slot, spreadWidth, spreadHeight, null, gap, padding);
      spreadModel.frames[index] = frame;
    } else {
      // Update the dimensions of the EXISTING frame; do NOT touch the id.
      frame.x = Math.round(layout.x * spreadWidth);
      frame.y = Math.round(layout.y * spreadHeight);
      frame.width = Math.max(60, Math.round(layout.w * spreadWidth));
      frame.height = Math.max(60, Math.round(layout.h * spreadHeight));
    }

    // Recalculate the cover/focus FULLY SYNCHRONOUSLY from the cached natural sizes.
    if(frame.photoId){
      const photo = getPhotoById(frame.photoId);
      if(photo && photo.naturalWidth && photo.naturalHeight){
        const ratio = photo.naturalWidth / photo.naturalHeight;
        if(isAutoFramed(frame)){
          // Auto-framed slot: the block above just restored the FULL slot box, so
          // shrink it back onto the photo's ratio. Without this the Spacing/Border
          // sliders would blow every frame back up to the slot and re-crop the
          // photo on the first tick.
          fitFrameToPhotoRatio(frame, ratio);
        } else {
          const nextW = frame.width;
          const nextH = frame.height;
          // Zoomfactor t.o.v. de minimale cover-maat van het VORIGE kader.
          let zoom = 1;
          if(prevBoxWidth > 0 && prevBoxHeight > 0 && frame.imageWidth > 0){
            const prevCoverWidth = (prevBoxWidth / prevBoxHeight) > ratio
              ? prevBoxWidth
              : prevBoxHeight * ratio;
            if(prevCoverWidth > 0) zoom = Math.max(1, frame.imageWidth / prevCoverWidth);
          }
          if((nextW / nextH) > ratio){
            frame.imageWidth = nextW;
            frame.imageHeight = nextW / ratio;
          } else {
            frame.imageHeight = nextH;
            frame.imageWidth = nextH * ratio;
          }
          // Zoom opnieuw toepassen zodat sliders het inzoomen niet wegpoetsen.
          frame.imageWidth *= zoom;
          frame.imageHeight *= zoom;
          // Re-apply the focal point captured above instead of hard-centering, so a
          // manual pan/crop survives every Spacing/Border slider move. clamp keeps
          // the image covering the frame (no blank edges) at the new bounds.
          frame.imageLeft = (nextW / 2) - (curPctX * frame.imageWidth);
          frame.imageTop = (nextH / 2) - (curPctY * frame.imageHeight);
          clampImagePosition(frame);
        }
      }
    }

    // Update ONLY the CSS positions of the existing element instead of tearing it
    // down and rebuilding it. If the element does not exist yet, render it once.
    const frameEl = view.canvas.querySelector(`[data-frame-id="${frame.id}"]`);
    if(frameEl){
      updateFrameElement(frameEl, frame);
    } else {
      renderFrame(spreadModel, frame);
    }
  });
}

// Writes the current (manually dragged/resized) geometry of a frame back to its
// matching slot, so relayoutSpreadWithGap (the Spacing slider) works from THIS
// manual size afterwards instead of the original template size. We store the
// "tile" (frame + current gap inset folded back out) so mmToLayout reproduces the
// frame exactly at the same gap, and recalculates the seams correctly at a
// different gap. Does NOT touch the photo cover/focus or snapping.
function writeBackResizedSlot(spreadModel, frameData){
  if(!spreadModel) return;
  // Free-style (template-less) spreads have no slots array yet. Initialize it here
  // so manually added/moved frames also get a dynamic slot and the Spacing slider
  // (relayoutSpreadWithGap) keeps working live.
  if(!Array.isArray(spreadModel.slots)) spreadModel.slots = [];
  const index = spreadModel.frames.indexOf(frameData);
  if(index < 0) return;

  const [spreadWidth, spreadHeight] = formats[project.format];
  const gap = typeof spreadModel.gap === "number" ? spreadModel.gap : 5;

  // Rendered frame -> normalized coords (0..1).
  const nx = frameData.x / spreadWidth;
  const ny = frameData.y / spreadHeight;
  const nw = frameData.width / spreadWidth;
  const nh = frameData.height / spreadHeight;

  const halfGapX = (gap / Math.max(1, spreadWidth)) / 2;
  const halfGapY = (gap / Math.max(1, spreadHeight)) / 2;
  // Include the margin in the edge detection: a frame already sitting p px away
  // from the album edge because of padding must still count as "touches the edge",
  // so the tile expands to 0/1 and mmToLayout then re-applies the padding cleanly
  // (no double inset / drift). padding=0 => unchanged.
  const padX = (spreadModel.padding || 0) / Math.max(1, spreadWidth);
  const padY = (spreadModel.padding || 0) / Math.max(1, spreadHeight);

  // Does the frame touch an album edge? mmToLayout applies no gap there; it does internally.
  const touchesLeft   = nx <= halfGapX + padX + 0.001;
  const touchesTop    = ny <= halfGapY + padY + 0.001;
  const touchesRight  = (nx + nw) >= 1 - (halfGapX + padX + 0.001);
  const touchesBottom = (ny + nh) >= 1 - (halfGapY + padY + 0.001);

  // Fold the gap inset back out into the "tile", clamped within [0..1].
  const tileLeft   = touchesLeft   ? 0 : nx - halfGapX;
  const tileTop    = touchesTop    ? 0 : ny - halfGapY;
  const tileRight  = touchesRight  ? 1 : (nx + nw) + halfGapX;
  const tileBottom = touchesBottom ? 1 : (ny + nh) + halfGapY;

  spreadModel.slots[index] = {
    ...(spreadModel.slots[index] || {}),
    style: "full-bleed",
    x: tileLeft,
    y: tileTop,
    w: Math.max(0, tileRight - tileLeft),
    h: Math.max(0, tileBottom - tileTop)
  };
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
    // Sjabloonslot: laat het KADER de verhouding van de foto aannemen (krimpen
    // binnen het slot) i.p.v. de foto bij te snijden. Vrij geplaatste frames
    // (buiten een sjabloon) houden het oude cover-gedrag. Een kader dat de
    // gebruiker zelf heeft aangepast blijft ongemoeid.
    if(("templateStyle" in frameData) && isAutoFramed(frameData)){
      fitFrameToPhotoRatio(frameData, ratio);
    } else {
      if((frameData.width / frameData.height) > ratio){
        frameData.imageWidth = frameData.width;
        frameData.imageHeight = frameData.width / ratio;
      } else {
        frameData.imageHeight = frameData.height;
        frameData.imageWidth = frameData.height * ratio;
      }
      frameData.imageLeft = (frameData.width - frameData.imageWidth) / 2;
      frameData.imageTop = (frameData.height - frameData.imageHeight) / 2;
    }

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

  // Remember the template on the spread so the per-spread Spacing slider can
  // recalculate the slot positions live later on.
  // Deep clone: detach the spread from the shared catalog object so nothing in
  // the catalog (or a preview render) can mutate these slot coordinates through
  // a shared reference.
  activeSpread.slots = JSON.parse(JSON.stringify(template.slots));

  // On EVERY new template choice the gap resets to the current global bottom bar
  // (templateGapPx) and the spread is unlocked again. That way another template
  // always opens with the current global Spacing; an earlier per-spread setting is
  // deliberately dropped as soon as a new template is chosen.
  activeSpread.gap = templateGapPx;
  activeSpread.gapUserSet = false;
  const spreadGap = templateGapPx;

  const spreadPadding = typeof activeSpread.padding === "number" ? activeSpread.padding : 0;
  activeSpread.frames = template.slots.map((slot, index) => createTemplateFrame(slot, spreadWidth, spreadHeight, existingPhotoIds[index] || null, spreadGap, spreadPadding));

  // Keep this spread's Spacing slider in sync with the gap in use.
  const gapView = getSpreadView(activeSpread);
  if(gapView && gapView.gapSlider){
    gapView.gapSlider.value = String(spreadGap);
    if(gapView.gapValue) gapView.gapValue.textContent = `${spreadGap} px`;
  }

  existingPhotoIds.forEach((photoId, index) => {
    const frame = activeSpread.frames[index];
    if(frame && photoId){
      // SYNCHRONOUS auto-framing from the already sealed natural sizes
      // (importPhotoFiles seals naturalWidth/Height). This makes the FIRST render
      // correct right away; no more async 'squeeze' frame while fillFrameWithPhoto's
      // Image().onload has yet to fire.
      //
      // The frame itself takes the photo's aspect ratio (shrinking inside its
      // slot) so the photo fills it exactly — no crop — and the freed space
      // becomes clean white spacing on the spread.
      autoFrameToPhoto(frame, photoId);
      // Still called: seals natural sizes for photos that do not have them (yet)
      // and keeps library/preview in sync. For already sealed photos, onload
      // recalculates exactly the same values — so it is invisible.
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
    console.warn('EXIF could not be read', error);
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
  return cleaned || 'New album';
}

function syncProjectUI(){
  const safeName = project.name || 'New album';
  projectNameInput.value = safeName;
  formatSelect.value = project.format;
  projectSummaryName.textContent = safeName;
  projectSummaryMeta.textContent = formatLabels[project.format] || project.format;
}

function openIntroOverlay(mode = 'edit'){
  introMode = mode;
  syncProjectUI();
  // As soon as the overlay opens we are no longer in "live preview review": hide
  // the return button (the return handler already hid it; this also covers a fresh
  // wizard/edit while the button would still be visible).
  if(wizardReturnBtn) wizardReturnBtn.classList.add('hidden');
  const wizard = mode === 'wizard';
  if(introCard) introCard.classList.toggle('wizard-mode', wizard);
  if(wizard){
    if(wizardPreserveOnOpen){
      // Coming back from the live preview: keep the page layout, do NOT reset and
      // do not jump to step 1 — the caller puts us on step 2 momentarily.
      wizardPreserveOnOpen = false;
    } else {
      // Fresh wizard: reset the page layout and start at step 1.
      resetWizardState();
      goToWizardStep(1);
      refreshWizardUI();
    }
  } else {
    // Classic settings mode: force panel 1 and the right button label.
    wizardPanels.forEach(panel => panel.classList.toggle('active', panel.dataset.panel === '1'));
    startProjectBtn.textContent = mode === 'startup' ? 'Open project' : 'Apply settings';
  }
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
  // Houd het "Show"-paginafilter in de onderste galerij synchroon met het
  // huidige aantal pagina's (elke toevoeging/verwijdering loopt hier langs).
  updateLibraryPageFilterOptions();
}

function setActiveSpread(spreadModel){
  const previousId = activeSpread ? activeSpread.id : null;
  spreadViews.forEach(view => view.wrapper.classList.remove("active"));
  activeSpread = spreadModel || null;
  if(!activeSpread) return;
  const activeView = spreadViews.find(view => view.model.id === activeSpread.id);
  if(activeView) activeView.wrapper.classList.add("active");

  // Auto-filter the bottom gallery to the spread the user just moved to, so the
  // library always shows that page's own photos without touching the dropdown.
  //
  // Deliberately ONLY on a real spread CHANGE. setActiveSpread also fires when
  // clicking a frame inside the ALREADY-active spread, and re-filtering there
  // would fight the user: picking "All Photos" to place a new photo would snap
  // back to the filtered view on the very next frame click, making it impossible
  // to add a photo that is not already on the page. Keeping the override alive
  // within a spread preserves that flow.
  if(activeSpread.id !== previousId){
    const pageIndex = project.spreads.indexOf(activeSpread);
    if(pageIndex >= 0){
      // A page view now also carries every not-yet-placed photo, so an empty
      // spread still opens with the unused pool ready to drag in. Only fall back
      // to "All Photos" in the degenerate case where the view would be entirely
      // blank (nothing on this page and nothing unplaced left) — otherwise the
      // page the user opened to fill becomes the one page they cannot fill.
      const wouldShow = getPhotosForPage(pageIndex).length;
      libraryPageFilterValue = wouldShow ? String(pageIndex) : "all";
      updateLibraryPageFilterOptions();
    }

    // Staat het sjablonenpaneel al open? Dan het aantal-foto's-filter meteen
    // meebewegen met de nieuwe spread, zodat de getoonde layouts kloppen zonder
    // dat de gebruiker eerst van tab hoeft te wisselen.
    if(assetMode === "templates"){
      syncTemplateCountToActiveSpread();
      renderTemplates();
    }
  }
  renderLibrary();
}

function createSpreadModel(){
  // gap starts equal to the global Spacing bar (as a starting value only).
  // gapUserSet=false => this spread still uses the global default; as soon as the
  // user touches its own slider it becomes fully independent.
  // padding = per-spread outer inset (Margin): distance from the photos to the
  // album edge. Default 0 = full-bleed to the edge, just like before.
  return { id: uid("spread"), frames: [], gap: templateGapPx, gapUserSet: false, padding: 0 };
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

  // --- Per-spread Spacing (gap) slider: compact and horizontal next to the color ---
  if(typeof spreadModel.gap !== "number") spreadModel.gap = templateGapPx;

  const gapLabel = document.createElement("span");
  gapLabel.className = "spreadGapLabel";
  gapLabel.textContent = "Spacing";
  label.appendChild(gapLabel);

  const gapSlider = document.createElement("input");
  gapSlider.type = "range";
  gapSlider.min = "0";
  gapSlider.max = "15";
  gapSlider.step = "1";
  gapSlider.className = "spreadGap";
  gapSlider.value = String(spreadModel.gap);
  gapSlider.title = "Spacing between the photos on this page";
  label.appendChild(gapSlider);

  const gapValue = document.createElement("span");
  gapValue.className = "spreadGapValue";
  gapValue.textContent = `${spreadModel.gap} px`;
  label.appendChild(gapValue);

  // Live: only THIS spread recalculates its slot positions with the new gap.
  // The user has now made their own choice: mark it independent so the global bar
  // never overwrites this spread as a default again.
  gapSlider.addEventListener("input", e => {
    e.stopPropagation();
    const value = Number(e.target.value || 0);
    spreadModel.gap = value;
    spreadModel.gapUserSet = true;
    gapValue.textContent = `${value} px`;
    relayoutSpreadWithGap(spreadModel);
  });

  // --- Per-spread Margin (padding) slider: outer inset to the album edge ---
  if(typeof spreadModel.padding !== "number") spreadModel.padding = 0;

  const padLabel = document.createElement("span");
  padLabel.className = "spreadPadLabel";
  padLabel.textContent = "Border";
  padLabel.style.marginLeft = "12px";
  label.appendChild(padLabel);

  const padSlider = document.createElement("input");
  padSlider.type = "range";
  padSlider.min = "0";
  padSlider.max = "30";
  padSlider.step = "1";
  padSlider.className = "spreadPaddingSlider";
  padSlider.value = String(spreadModel.padding || 0);
  padSlider.title = "Distance from the photos to the album edge on this page";
  label.appendChild(padSlider);

  const padValue = document.createElement("span");
  padValue.className = "spreadPadValue";
  padValue.textContent = `${spreadModel.padding || 0} px`;
  label.appendChild(padValue);

  // Live: only THIS spread shrinks from the album edge with the new padding.
  padSlider.addEventListener("input", e => {
    e.stopPropagation();
    const value = Number(e.target.value || 0);
    spreadModel.padding = value;
    padValue.textContent = `${value} px`;
    relayoutSpreadWithGap(spreadModel);
  });

  // --- Swap-modus: foto's van deze spread onderling verwisselen door slepen ---
  const swapBtn = document.createElement("button");
  swapBtn.type = "button";
  swapBtn.className = "spreadSwapBtn";
  swapBtn.textContent = "Swap";
  swapBtn.title = "Swap mode: drag a photo onto another photo to exchange them";
  swapBtn.classList.toggle("active", !!spreadModel.swapMode);
  label.appendChild(swapBtn);

  swapBtn.addEventListener("click", e => {
    e.stopPropagation();
    spreadModel.swapMode = !spreadModel.swapMode;
    swapBtn.classList.toggle("active", !!spreadModel.swapMode);
    canvas.classList.toggle("swap-mode", !!spreadModel.swapMode);
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
  if(spreadModel.swapMode) canvas.classList.add("swap-mode");
  wrapper.appendChild(canvas);

  const cutline = document.createElement("div");
  cutline.className = "cutline";
  canvas.appendChild(cutline);

  const fold = document.createElement("div");
  fold.className = "fold";
  canvas.appendChild(fold);

  wrapper.addEventListener("click", () => setActiveSpread(spreadModel));
  workspace.insertBefore(wrapper, addSpreadBtn);

  const view = { model: spreadModel, wrapper, label, canvas, cutline, fold, gapSlider, gapValue, padSlider, padValue, swapBtn };
  spreadViews.push(view);
  return view;
}

// ============================================================================
//  SWAP MODE — foto's binnen één spread onderling verwisselen
// ============================================================================

// Zoekt het frame waar de cursor boven (of vlakbij) hangt, het sleepframe zelf
// uitgezonderd. Werkt op de gerenderde rechthoeken, dus schaal/zoom-onafhankelijk.
function findSwapTarget(spreadModel, clientX, clientY, sourceFrame){
  const view = getSpreadView(spreadModel);
  if(!view) return null;
  const TOLERANCE = 10;
  let best = null;
  let bestDistance = Infinity;

  spreadModel.frames.forEach(frame => {
    if(frame === sourceFrame) return;
    const el = view.canvas.querySelector(`[data-frame-id="${frame.id}"]`);
    if(!el) return;
    const rect = el.getBoundingClientRect();
    const inside = clientX >= rect.left - TOLERANCE && clientX <= rect.right + TOLERANCE
      && clientY >= rect.top - TOLERANCE && clientY <= rect.bottom + TOLERANCE;
    if(!inside) return;
    const dx = clientX - (rect.left + rect.width / 2);
    const dy = clientY - (rect.top + rect.height / 2);
    const distance = Math.hypot(dx, dy);
    if(distance < bestDistance){
      bestDistance = distance;
      best = { frame, el };
    }
  });
  return best;
}

// Verwisselt de FOTO (en zijn crop-/pasvormstaat) van twee frames. De kaders
// zelf blijven op hun plek; alleen de inhoud wisselt.
function swapFramePhotos(spreadModel, frameA, frameB){
  if(!spreadModel || !frameA || !frameB || frameA === frameB) return false;

  ["photoId", "autoFramed", "imageWidth", "imageHeight", "imageLeft", "imageTop", "movePhotoMode"]
    .forEach(key => {
      const temp = frameA[key];
      frameA[key] = frameB[key];
      frameB[key] = temp;
    });
  frameA.placeholder = !frameA.photoId;
  frameB.placeholder = !frameB.photoId;

  // Een auto-gekaderd frame heeft de verhouding van zijn OUDE foto; na de wissel
  // klopt die niet meer. relayoutSpreadWithGap bouwt elk kader opnieuw op vanuit
  // zijn slot en past de auto-pasvorm opnieuw toe, zodat beide kaders de vorm van
  // hun NIEUWE foto aannemen (en er geen krimp op krimp ontstaat).
  if(isAutoFramed(frameA) || isAutoFramed(frameB)){
    relayoutSpreadWithGap(spreadModel);
  }

  rerenderSpread(spreadModel);
  renderLibrary();
  commitHistory();
  return true;
}

// Sleepgebaar in swap-modus: een ghost volgt de cursor, het doelframe licht op,
// en bij loslaten wisselen de foto's. De layoutcoördinaten blijven ongemoeid.
function startSwapDrag(event, spreadModel, frameData, frameEl){
  const photo = getPhotoById(frameData.photoId);
  const sourceRect = frameEl.getBoundingClientRect();

  const ghost = document.createElement("div");
  ghost.className = "swap-ghost";
  ghost.style.width = `${sourceRect.width}px`;
  ghost.style.height = `${sourceRect.height}px`;
  if(photo && photo.src){
    const ghostImg = document.createElement("img");
    ghostImg.src = photo.src;
    ghost.appendChild(ghostImg);
  }
  document.body.appendChild(ghost);
  frameEl.classList.add("swap-source");

  let currentTarget = null;

  function positionGhost(clientX, clientY){
    ghost.style.left = `${clientX}px`;
    ghost.style.top = `${clientY}px`;
  }
  positionGhost(event.clientX, event.clientY);

  function move(ev){
    ev.preventDefault();
    positionGhost(ev.clientX, ev.clientY);

    const hit = findSwapTarget(spreadModel, ev.clientX, ev.clientY, frameData);
    const nextEl = hit ? hit.el : null;
    if(nextEl !== (currentTarget ? currentTarget.el : null)){
      if(currentTarget) currentTarget.el.classList.remove("swap-target");
      if(nextEl) nextEl.classList.add("swap-target");
      currentTarget = hit;
    }
  }

  function stop(ev){
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", stop);
    ghost.remove();
    frameEl.classList.remove("swap-source");
    if(currentTarget) currentTarget.el.classList.remove("swap-target");

    // Alleen wisselen als er echt op een ander frame is losgelaten; in lege
    // ruimte laten we de layout volledig ongemoeid.
    const drop = findSwapTarget(spreadModel, ev.clientX, ev.clientY, frameData);
    if(drop) swapFramePhotos(spreadModel, frameData, drop.frame);
  }

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", stop);
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

// ============================================================================
//  UNDO / REDO — geschiedenis van frame-aanpassingen (verplaatsen/resizen/pannen)
// ----------------------------------------------------------------------------
//  We bewaren diepe kloons van project.spreads. Frames zijn platte data (zie
//  normalizeLoadedProject), dus JSON-klonen is veilig. Na undo/redo bouwen we de
//  hele workspace opnieuw op vanuit het model (zelfde pad als loadProject).
// ============================================================================
let undoStack = [];
let redoStack = [];
let historyPresent = null; // diepe snapshot van de laatst vastgelegde staat

function cloneSpreads(){
  return JSON.parse(JSON.stringify(project.spreads || []));
}

// Herbouwt alle spread-views + frames vanuit het huidige project.spreads-model.
function rebuildWorkspaceFromModel(){
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

// Reset de geschiedenis rond een nieuw/opgebouwd album: de huidige staat wordt
// het startpunt (present), stacks leeg.
function initHistory(){
  undoStack = [];
  redoStack = [];
  historyPresent = cloneSpreads();
}

// Legt een committed frame-wijziging vast. Slaat no-ops over (klik zonder echte
// verandering) door de nieuwe staat met de present te vergelijken.
function commitHistory(){
  const current = cloneSpreads();
  if(historyPresent === null){ historyPresent = current; return; }
  if(JSON.stringify(historyPresent) === JSON.stringify(current)) return;
  undoStack.push(historyPresent);
  if(undoStack.length > 60) undoStack.shift();
  redoStack = [];
  historyPresent = current;
}

function restoreSpreadsSnapshot(snapshot){
  project.spreads = JSON.parse(JSON.stringify(snapshot || []));
  rebuildWorkspaceFromModel();
}

function undoFrameChange(){
  if(!undoStack.length) return;
  redoStack.push(historyPresent);
  historyPresent = undoStack.pop();
  restoreSpreadsSnapshot(historyPresent);
}

function redoFrameChange(){
  if(!redoStack.length) return;
  undoStack.push(historyPresent);
  historyPresent = redoStack.pop();
  restoreSpreadsSnapshot(historyPresent);
}

// Ctrl/Cmd+Z = undo, Ctrl/Cmd+Shift+Z = redo. Niet kapen tijdens tekstinvoer.
document.addEventListener('keydown', (e) => {
  if((e.key || '').toLowerCase() !== 'z') return;
  if(!(e.ctrlKey || e.metaKey)) return;
  const el = document.activeElement;
  if(el && ['INPUT','TEXTAREA','SELECT'].includes(el.tagName)) return;
  e.preventDefault();
  if(e.shiftKey) redoFrameChange();
  else undoFrameChange();
});

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

if(libraryPageFilter){
  libraryPageFilter.addEventListener('change', (e) => {
    libraryPageFilterValue = e.target.value;
    renderLibrary();
  });
}

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

// Snap variant for the BOUNDARY-during-resize. Same threshold (3) and exactly the
// same snap targets as applySnap (canvas edges, canvas center, edges + center of
// other frames), except only the MOVING edge of the frame snaps. Returns the
// snapped outer boundaries (x/y/width/height). The photo's cover, scale and
// centering math is left completely untouched by this: it simply runs on the
// (snapped) width/height as before.
function snapResizeBox(curX, curY, curW, curH, moving, spreadModel, frameData){
  const snapThreshold = 3;
  const [canvasW, canvasH] = formats[project.format];
  let left = curX, top = curY, right = curX + curW, bottom = curY + curH;

  const vTargets = [0, canvasW, canvasW / 2];          // vertical edges (x axis)
  const hTargets = [0, canvasH, canvasH / 2];          // horizontal edges (y axis)
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

  // Only the moving edge snaps; the opposite (anchored) edge stays fixed.
  if(moving.left)   left   = Math.min(snapEdge(left,   vTargets), right - 50);
  if(moving.right)  right  = Math.max(snapEdge(right,  vTargets), left + 50);
  if(moving.top)    top    = Math.min(snapEdge(top,    hTargets), bottom - 50);
  if(moving.bottom) bottom = Math.max(snapEdge(bottom, hTargets), top + 50);

  // Keep within the album bounds.
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
      <div class="library-empty-text">Click "Add Photos"</div>
    </div>
  `;
}

// Herbouwt de opties van de "Show"-dropdown op basis van het huidige album:
// "All Photos" + één optie per pagina (Page 1, Page 2, ...). Bewaart de huidige
// keuze indien die nog geldig is; anders terug naar "all".
function updateLibraryPageFilterOptions(){
  if(!libraryPageFilter) return;
  const pageCount = project.spreads ? project.spreads.length : 0;

  // Selectie ongeldig geworden (pagina verwijderd)? Val terug op alle foto's.
  if(libraryPageFilterValue !== "all"){
    const idx = Number(libraryPageFilterValue);
    if(!Number.isInteger(idx) || idx < 0 || idx >= pageCount){
      libraryPageFilterValue = "all";
    }
  }

  let html = '<option value="all">All Photos</option>';
  for(let i = 0; i < pageCount; i++){
    html += `<option value="${i}">Page ${i + 1}</option>`;
  }
  libraryPageFilter.innerHTML = html;
  libraryPageFilter.value = libraryPageFilterValue;
}

// De foto's die bij één pagina horen: alles wat OP die spread staat, PLUS elke
// foto die nog nergens in het album geplaatst is. Zo kan de gebruiker de layout
// van deze pagina beheren én meteen bij de resterende pool, zonder telkens terug
// te schakelen naar "All Photos". Bibliotheekvolgorde blijft behouden.
function getPhotosForPage(idx){
  const spread = project.spreads ? project.spreads[idx] : null;
  if(!spread) return project.library;
  const onThisPage = new Set(spread.frames.map(frame => frame.photoId).filter(Boolean));
  const usedAnywhere = new Set();
  (project.spreads || []).forEach(s => {
    (s.frames || []).forEach(frame => { if(frame.photoId) usedAnywhere.add(frame.photoId); });
  });
  return project.library.filter(photo => onThisPage.has(photo.id) || !usedAnywhere.has(photo.id));
}

// Past het paginafilter toe: bij "all" de hele bibliotheek, anders de pagina-view
// (deze pagina + nog niet geplaatste foto's).
function getFilteredLibraryPhotos(){
  if(libraryPageFilterValue === "all") return project.library;
  return getPhotosForPage(Number(libraryPageFilterValue));
}

function renderLibrary(){
  if(project.library.length === 0){
    restoreEmptyLibraryState();
    return;
  }

  const photos = getFilteredLibraryPhotos();
  library.innerHTML = "";
  if(!photos.length){
    const empty = document.createElement("div");
    empty.className = "library-empty-text";
    empty.style.padding = "24px";
    empty.textContent = "No photos on this page.";
    library.appendChild(empty);
    return;
  }
  sortLibraryItems(photos).forEach(photo => {
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
      // Smart placement: if a slot is selected, fill exactly that slot with the
      // clicked photo and clear the selection. Otherwise the old behavior: open a
      // new, loose frame (or fill the first empty template slot).
      if(selectedFrameId !== null){
        const targetFrame = (activeSpread ? activeSpread.frames : []).find(frame => frame.id === selectedFrameId)
          || project.spreads.flatMap(spread => spread.frames).find(frame => frame.id === selectedFrameId);
        if(targetFrame){
          fillFrameWithPhoto(targetFrame, photo.id);
          selectedFrameId = null;
          document.querySelectorAll('.photo-frame.selected-frame').forEach(el => el.classList.remove('selected-frame'));
          return;
        }
        // The selected slot no longer exists: fall back to the old behavior.
        selectedFrameId = null;
      }
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
    status.textContent = usageCount ? `Used ${usageCount}x${captureLabel}` : `Not used yet${captureLabel}`;
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

// ============================================================================
//  AUTO-FRAMING — het KADER neemt de beeldverhouding van de foto over
// ----------------------------------------------------------------------------
//  Het sjabloonslot is de maximale ruimte. Het kader krimpt daarbinnen naar de
//  echte verhouding van de foto (naturalWidth/naturalHeight) en wordt gecentreerd,
//  zodat de vrijgekomen ruimte een nette witruimte op de spread wordt. Omdat het
//  kader daarna EXACT de verhouding van de foto heeft, valt cover samen met een
//  perfecte pasvorm: de foto vult het kader zonder bij te snijden.
// ============================================================================

// Kaders die de gebruiker zelf heeft verkleind/gezoomd zijn niet langer
// "automatisch": de sliders mogen die niet terugzetten naar de auto-pasvorm.
function isAutoFramed(frameData){
  return !!frameData && frameData.autoFramed !== false;
}

function clearAutoFrame(frameData){
  if(frameData) frameData.autoFramed = false;
}

// Krimpt het kader binnen zijn HUIDIGE box naar de verhouding van de foto.
function fitFrameToPhotoRatio(frameData, ratio){
  if(!ratio || !isFinite(ratio) || ratio <= 0) return false;
  const boxX = frameData.x;
  const boxY = frameData.y;
  const boxWidth = frameData.width;
  const boxHeight = frameData.height;
  if(!boxWidth || !boxHeight) return false;

  let nextWidth, nextHeight;
  if((boxWidth / boxHeight) > ratio){
    // Foto is smaller/hoger dan het slot -> hoogte behouden, breedte krimpen.
    nextHeight = boxHeight;
    nextWidth = boxHeight * ratio;
  } else {
    // Foto is breder dan het slot -> breedte behouden, hoogte krimpen.
    nextWidth = boxWidth;
    nextHeight = boxWidth / ratio;
  }

  frameData.width = Math.max(20, Math.round(nextWidth));
  frameData.height = Math.max(20, Math.round(nextHeight));
  // Centreren in het oorspronkelijke slot: de vrijgekomen ruimte valt gelijk aan
  // beide kanten, wat de witruimte symmetrisch houdt.
  frameData.x = Math.round(boxX + (boxWidth - frameData.width) / 2);
  frameData.y = Math.round(boxY + (boxHeight - frameData.height) / 2);

  // Kader == beeldverhouding, dus de foto vult het kader precies.
  frameData.imageWidth = frameData.width;
  frameData.imageHeight = frameData.height;
  frameData.imageLeft = 0;
  frameData.imageTop = 0;
  frameData.autoFramed = true;
  return true;
}

// Past auto-framing toe op basis van de (al ingelezen) natuurlijke afmetingen.
function autoFrameToPhoto(frameData, photoId){
  const photo = getPhotoById(photoId || frameData.photoId);
  if(!photo || !photo.naturalWidth || !photo.naturalHeight) return false;
  return fitFrameToPhotoRatio(frameData, photo.naturalWidth / photo.naturalHeight);
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
  // Zoomen is een bewuste ingreep: het kader wordt niet meer automatisch
  // op de fotoverhouding teruggezet door de sliders.
  clearAutoFrame(frameData);
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

    // Swap-modus onderschept het slepen VOLLEDIG: geen layoutverplaatsing, geen
    // writeBackResizedSlot. Alleen frames met een foto zijn sleepbaar.
    if(spreadModel.swapMode && frameData.photoId){
      startSwapDrag(e, spreadModel, frameData, frameEl);
      return;
    }

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
      // Verplaatsing (geen pan): leg de nieuwe positie vast in het slot.
      if(!frameData.movePhotoMode) writeBackResizedSlot(spreadModel, frameData);
      commitHistory();
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
    // Onthoud het huidige focuspunt (pan) zodat resize dat behoudt i.p.v. hard te centreren.
    clearAutoFrame(frameData);
    const pctX = frameData.imageWidth ? (startW / 2 - frameData.imageLeft) / frameData.imageWidth : 0.5;
    const pctY = frameData.imageHeight ? (startH / 2 - frameData.imageTop) / frameData.imageHeight : 0.5;

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
        frameData.imageLeft = (nextW / 2) - (pctX * frameData.imageWidth);
        frameData.imageTop = (nextH / 2) - (pctY * frameData.imageHeight);
        clampImagePosition(frameData);
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
      // Resize klaar: leg de nieuwe maat/positie vast in het slot zodat de
      // Ruimte-slider hierna van deze handmatige maat uitgaat.
      writeBackResizedSlot(spreadModel, frameData);
      commitHistory();
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
      // Onthoud het huidige focuspunt (pan) zodat resize dat behoudt i.p.v. hard te centreren.
      clearAutoFrame(frameData);
    const pctX = frameData.imageWidth ? (startW / 2 - frameData.imageLeft) / frameData.imageWidth : 0.5;
      const pctY = frameData.imageHeight ? (startH / 2 - frameData.imageTop) / frameData.imageHeight : 0.5;

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
        frameData.imageLeft = (nextW / 2) - (pctX * frameData.imageWidth);
        frameData.imageTop = (nextH / 2) - (pctY * frameData.imageHeight);
        clampImagePosition(frameData);

        updateFrameElement(frameEl, frameData);
      }

      function stop(){
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stop);
        // Resize klaar: leg de nieuwe maat/positie vast in het slot zodat de
        // Ruimte-slider hierna van deze handmatige maat uitgaat.
        writeBackResizedSlot(spreadModel, frameData);
        commitHistory();
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
      // Onthoud het huidige focuspunt (pan) zodat resize dat behoudt i.p.v. hard te centreren.
      clearAutoFrame(frameData);
    const pctX = frameData.imageWidth ? (startW / 2 - frameData.imageLeft) / frameData.imageWidth : 0.5;
      const pctY = frameData.imageHeight ? (startH / 2 - frameData.imageTop) / frameData.imageHeight : 0.5;

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
          frameData.imageLeft = (nextW / 2) - (pctX * frameData.imageWidth);
          frameData.imageTop = (nextH / 2) - (pctY * frameData.imageHeight);
          clampImagePosition(frameData);
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
        // Resize klaar: leg de nieuwe maat/positie vast in het slot zodat de
        // Ruimte-slider hierna van deze handmatige maat uitgaat.
        writeBackResizedSlot(spreadModel, frameData);
        commitHistory();
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
  // Behoud de visuele selectie als deze frame opnieuw gerenderd wordt.
  if(frameData.id === selectedFrameId) frameEl.classList.add('selected-frame');

  const imgEl = document.createElement('img');
  if(photo?.src){
    imgEl.src = photo.src;
  } else {
    imgEl.alt = 'Empty template slot';
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
      <span>Click a photo to fill this slot</span>
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
  cropWidthHandle.title = 'Crop left and right';
  frameEl.appendChild(cropWidthHandle);

  const cropHeightHandle = document.createElement('div');
  cropHeightHandle.className = 'crop-height-handle';
  cropHeightHandle.title = 'Crop top and bottom';
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
  cropWidthHandleLeft.title = 'Crop left and right';
  frameEl.appendChild(cropWidthHandleLeft);

  const cropHeightHandleTop = document.createElement('div');
  cropHeightHandleTop.className = 'crop-height-handle crop-height-handle-top';
  cropHeightHandleTop.title = 'Crop top and bottom';
  frameEl.appendChild(cropHeightHandleTop);

  view.canvas.appendChild(frameEl);
  updateFrameElement(frameEl, frameData);
  attachFrameInteractions(frameEl, frameData, spreadModel);

  // Slot-selectie: klik op een frame markeert het als doelvak voor de volgende
  // bibliotheek-klik. Niet tijdens movePhotoMode (dan pant de gebruiker de foto)
  // en niet op de bedien-elementen (verwijderen/zoom/handles hebben hun eigen
  // gedrag). De foto-positionering, 8-richtingen-handles en snap blijven intact.
  frameEl.addEventListener('click', (e) => {
    if(frameData.movePhotoMode) return;
    if(e.target.closest('.delete-btn, .move-photo-btn, .zoom-in-btn, .zoom-out-btn, .resize-handle, .crop-width-handle, .crop-height-handle')) return;
    selectedFrameId = frameData.id;
    document.querySelectorAll('.photo-frame.selected-frame').forEach(el => el.classList.remove('selected-frame'));
    frameEl.classList.add('selected-frame');
  });

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
    // Ook zonder sjabloonkeuze meteen slot-geheugen opbouwen, zodat de Ruimte-
    // slider ook op vrij geplaatste foto's live kan herberekenen.
    writeBackResizedSlot(spreadModel, frameData);
    renderLibrary();
    if(typeof callback === 'function') callback(frameData);
  };
  tempImg.src = photo.src;
}

function addLibraryPhoto(name, src, id = uid('img'), options = {}){
  const photo = {
    id,
    name,
    src,
    createdAt: options.createdAt || Date.now(),
    captureDate: options.captureDate || null
  };
  project.library.push(photo);

  // Verzegel de natuurlijke afmetingen METEEN bij binnenkomst in de bibliotheek,
  // zodat photo.naturalWidth/Height nooit undefined blijven. Zo hoeft de synchrone
  // Ruimte-slider (relayoutSpreadWithGap) nooit op een async onload te wachten en
  // kan een foto niet "verdwijnen" als de slider vlak na plaatsing beweegt.
  if(options.naturalWidth && options.naturalHeight){
    photo.naturalWidth = options.naturalWidth;
    photo.naturalHeight = options.naturalHeight;
  } else {
    const probe = new Image();
    probe.onload = function(){
      photo.naturalWidth = probe.naturalWidth;
      photo.naturalHeight = probe.naturalHeight;
    };
    probe.src = src;
  }

  renderLibrary();
}

// Gedeelde foto-import: gebruikt door de bovenbalk-upload én de wizard-upload.
// Exact hetzelfde pad als voorheen (EXIF-datum + verzegelde natuurlijke maten),
// alleen losgetrokken in een herbruikbare functie.
async function importPhotoFiles(fileList){
  const files = Array.from(fileList || []);
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
    // Meet de natuurlijke afmetingen VOORDAT de foto in de bibliotheek belandt,
    // zodat naturalWidth/Height al verzegeld zijn op het moment van plaatsing en
    // de synchrone Ruimte-slider nooit op undefined stuit.
    const dims = await new Promise((resolve) => {
      const probe = new Image();
      probe.onload = () => resolve({ naturalWidth: probe.naturalWidth, naturalHeight: probe.naturalHeight });
      probe.onerror = () => resolve({});
      probe.src = src;
    });
    addLibraryPhoto(file.name, src, uid('img'), {
      createdAt: Date.now(),
      captureDate,
      naturalWidth: dims.naturalWidth,
      naturalHeight: dims.naturalHeight
    });
  }
}

upload.addEventListener('change', async (e) => {
  await importPhotoFiles(e.target.files);
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
    alert('The project file could not be loaded. Check that this is a valid AlbumDesigner JSON file.');
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
  next.name = sanitizeProjectName(data.name || 'New album');

  if(Array.isArray(data.library)){
    next.library = data.library.map(item => ({
      id: item.id || uid('img'),
      name: item.name || 'Untitled photo',
      src: item.src,
      createdAt: item.createdAt || Date.now(),
      captureDate: item.captureDate || null,
      naturalWidth: Number(item.naturalWidth) || null,
      naturalHeight: Number(item.naturalHeight) || null
    })).filter(item => !!item.src);

    // Verzegel ontbrekende natuurlijke afmetingen ook bij het laden van een project,
    // zodat de synchrone Ruimte-slider op geladen foto's dezelfde garantie heeft.
    next.library.forEach(photo => {
      if(photo.naturalWidth && photo.naturalHeight) return;
      const probe = new Image();
      probe.onload = function(){
        photo.naturalWidth = probe.naturalWidth;
        photo.naturalHeight = probe.naturalHeight;
      };
      probe.src = photo.src;
    });
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
  // Verse geschiedenis-basis voor het geladen project.
  initHistory();
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

      // Dinamik Resilient Arka Plan Boyama Katmanı
      let hexColor = '#ffffff';
      if (spread) {
        // Öncelik spread modelinde, yoksa arayüzdeki renk inputunda, yoksa proje genelinde
        const view = spreadViews.find(v => v.model.id === spread.id);
        const colorInput = view?.canvas?.parentNode?.querySelector(".spreadColor");
        hexColor = spread.background || colorInput?.value || project.spreadBackground || '#ffffff';
      }

      // Resilient HEX to RGB Parser — NaN-güvenli: 0 kanalı (ör. siyah #000000) korunur
      let r = 255, g = 255, b = 255;
      try {
        const cleanedHex = String(hexColor).trim().replace('#', '');
        // parseInt sonucu NaN ise beyaza düş; 0 geçerli bir değerdir ve olduğu gibi kalır
        const channel = (raw) => { const n = parseInt(raw, 16); return Number.isNaN(n) ? 255 : n; };
        if (cleanedHex.length === 6) {
          r = channel(cleanedHex.substring(0, 2));
          g = channel(cleanedHex.substring(2, 4));
          b = channel(cleanedHex.substring(4, 6));
        } else if (cleanedHex.length === 3) {
          r = channel(cleanedHex.charAt(0) + cleanedHex.charAt(0));
          g = channel(cleanedHex.charAt(1) + cleanedHex.charAt(1));
          b = channel(cleanedHex.charAt(2) + cleanedHex.charAt(2));
        }
      } catch (colorErr) {
        console.warn("Color parsing failed, falling back to white:", colorErr);
        r = 255; g = 255; b = 255;
      }

      pdf.setFillColor(r, g, b);
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
    alert('Print export failed. Check that all images are fully loaded and try again.');
  } finally {
    document.body.classList.remove('exporting');
  }
}

// ============================================================================
//  AKILLI ALBÜM KURULUM SİHİRBAZI — 3-adımlı wizard
//  Een extra laag BOVENOP de bestaande editor. De reeds werkende logica
//  (8-weg cursor, snap, synchrone relayoutSpreadWithGap, in-place DOM-updates
//  en klik-om-foto-toe-te-wijzen) blijft volledig ongemoeid: de wizard hergebruikt
//  uitsluitend bestaande bouwstenen (createSpreadModel via createSpread +
//  applyTemplateToActiveSpread) om het album kant-en-klaar op te bouwen.
// ============================================================================
const introCard = document.getElementById("introCard");
const wizardUpload = document.getElementById("wizardUpload");
const wizardUploadText = document.getElementById("wizardUploadText");
const wizardNext1 = document.getElementById("wizardNext1");
const wizardNext2 = document.getElementById("wizardNext2");
const wizardFinishBtn = document.getElementById("wizardFinish");
const wizardAddPageBtn = document.getElementById("wizardAddPage");
const wizardLibraryEl = document.getElementById("wizardLibrary");
const wizardLibCount = document.getElementById("wizardLibCount");
const wizardZoomInBtn = document.getElementById("wizardZoomIn");
const wizardZoomOutBtn = document.getElementById("wizardZoomOut");
const wizardSortSelect = document.getElementById("wizardSort");
const wizardPagesEl = document.getElementById("wizardPages");
const wizardSummary = document.getElementById("wizardSummary");
const wizardSummaryGrid = document.getElementById("wizardSummaryGrid");
const wizardDots = Array.from(document.querySelectorAll("#wizardSteps .wizard-dot"));
const wizardPanels = Array.from(document.querySelectorAll(".wizard-panel"));
// Amber "Sihirbaza Geri Dön"-knop in de topbar: alleen zichtbaar tijdens de
// live-preview na stap 3, zodat de gebruiker terug kan naar stap 2.
const wizardReturnBtn = document.getElementById("wizardReturnBtn");

let wizardStep = 1;
// Sorteervolgorde van de stap-2 bibliotheek: 'alpha' (A→Z op bestandsnaam) of
// 'date' (opnamedatum oud→nieuw). Losgekoppeld van de hoofd-bibliotheek
// (librarySortMode) zodat beide onafhankelijk sorteren.
let wizardSortMode = "alpha";
// True zolang we vanuit de live-preview terugkeren naar de wizard: dan mag
// openIntroOverlay de reeds ingedeelde pagina's NIET resetten.
let wizardPreserveOnOpen = false;
// pages: [{ photoIds: [...] }] — activePage bepaalt in welk pakket een aangeklikte
// foto belandt. Wordt bij elke wizard-opening ververst via resetWizardState().
const wizardState = { pages: [], activePage: 0 };

// Standaard start de wizard met 5 lege pagina-pakketten (i.p.v. 1), zodat de
// gebruiker meteen meerdere spreads kan vullen zonder eerst handmatig te moeten
// toevoegen. Elk pakket is een los object zodat ze onafhankelijk gevuld worden.
const WIZARD_DEFAULT_PAGES = 5;
function resetWizardState(){
  wizardState.pages = Array.from({ length: WIZARD_DEFAULT_PAGES }, () => ({ photoIds: [] }));
  wizardState.activePage = 0;
}

function goToWizardStep(step){
  wizardStep = step;
  wizardPanels.forEach(panel => panel.classList.toggle("active", Number(panel.dataset.panel) === step));
  wizardDots.forEach(dot => {
    const s = Number(dot.dataset.step);
    dot.classList.toggle("active", s === step);
    dot.classList.toggle("done", s < step);
  });
  if(step === 2) renderWizardStep2();
  if(step === 3){
    // Stap 3 bouwt direct het album op en sluit de overlay. Na de generatie is
    // teruggaan naar de wizard niet meer mogelijk: de "Back to Wizard"-knop
    // wordt hier expliciet verborgen zodat de opbouw definitief is.
    if(wizardReturnBtn) wizardReturnBtn.classList.add("hidden");
    finishWizard();
  }
}

function refreshWizardUI(){
  const hasPhotos = project.library.length > 0;
  if(wizardNext1) wizardNext1.disabled = !hasPhotos;
  if(wizardUploadText){
    wizardUploadText.textContent = hasPhotos
      ? `${project.library.length} photos loaded — add more or continue`
      : "Bulk Upload Photos";
  }
  if(wizardStep === 2) renderWizardStep2();
  if(wizardStep === 3) renderWizardStep3();
}

function wizardPhotoPageCount(photoId){
  return wizardState.pages.reduce((n, page) => n + (page.photoIds.includes(photoId) ? 1 : 0), 0);
}

// 1-gebaseerde paginanummers waarin deze foto zit (voor de "Sayfa N"-badges).
function wizardPhotoPages(photoId){
  const pages = [];
  wizardState.pages.forEach((page, index) => {
    if(page.photoIds.includes(photoId)) pages.push(index + 1);
  });
  return pages;
}

function assignPhotoToActivePage(photoId){
  const page = wizardState.pages[wizardState.activePage];
  if(!page) return;
  // Zelfde foto niet twee keer in hetzelfde pakket.
  if(page.photoIds.includes(photoId)) return;
  page.photoIds.push(photoId);
  renderWizardStep2();
}

function addWizardPage(){
  wizardState.pages.push({ photoIds: [] });
  wizardState.activePage = wizardState.pages.length - 1;
  renderWizardStep2();
}

function removeWizardPage(index){
  wizardState.pages.splice(index, 1);
  if(!wizardState.pages.length) wizardState.pages.push({ photoIds: [] });
  wizardState.activePage = Math.min(wizardState.activePage, wizardState.pages.length - 1);
  renderWizardStep2();
}

// Sorteert een kopie van de bibliotheek voor stap 2 volgens wizardSortMode.
// 'alpha' = bestandsnaam A→Z, 'date' = opnamedatum oud→nieuw (met naam als
// tie-breaker). Muteert de originele array niet.
function sortWizardPhotos(items){
  const sorted = [...items];
  const getName = it => (it.name || "").toLocaleLowerCase("en");
  const getCapture = it => Number(it.captureDate || it.createdAt || 0);
  if(wizardSortMode === "date"){
    sorted.sort((a, b) => {
      const diff = getCapture(a) - getCapture(b);
      if(diff !== 0) return diff;
      return getName(a).localeCompare(getName(b), "en");
    });
  } else {
    sorted.sort((a, b) => getName(a).localeCompare(getName(b), "en"));
  }
  return sorted;
}

function renderWizardStep2(){
  // Teller toont "X / Y": X = unieke foto's die in minstens één pagina zitten
  // (en nog in de bibliotheek bestaan), Y = totaal geladen foto's. Wordt via
  // renderWizardStep2 bij elke toevoeging/verwijdering opnieuw berekend.
  if(wizardLibCount){
    const assigned = new Set();
    wizardState.pages.forEach(page => page.photoIds.forEach(id => assigned.add(id)));
    const usedCount = [...assigned].filter(id => getPhotoById(id)).length;
    wizardLibCount.textContent = `${usedCount} / ${project.library.length}`;
  }

  // Linkerkolom: bibliotheek-thumbnails (klik = toevoegen aan actieve pagina).
  if(wizardLibraryEl){
    wizardLibraryEl.innerHTML = "";
    if(!project.library.length){
      wizardLibraryEl.innerHTML = '<div class="wizard-empty">No photos loaded yet. Go back to step 1.</div>';
    } else {
      sortWizardPhotos(project.library).forEach(photo => {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "wizard-thumb";
        cell.title = photo.name;
        const pages = wizardPhotoPages(photo.id);
        if(pages.length) cell.classList.add("used");

        const img = document.createElement("img");
        img.src = photo.src;
        img.alt = photo.name;
        cell.appendChild(img);

        // Bestandsnaam onder de foto, zodat de gebruiker zijn bestanden herkent
        // tijdens het indelen. Ellipsis bij te lange namen (CSS).
        const nameTag = document.createElement("div");
        nameTag.className = "wizard-thumb-name";
        nameTag.textContent = photo.name;
        cell.appendChild(nameTag);

        // Duidelijke "Sayfa N"-badges rechtsboven op de fotokaart.
        if(pages.length){
          const badges = document.createElement("div");
          badges.className = "wizard-thumb-badges";
          pages.forEach(pageNr => {
            const badge = document.createElement("span");
            badge.className = "wizard-thumb-badge";
            badge.textContent = `Page ${pageNr}`;
            badges.appendChild(badge);
          });
          cell.appendChild(badges);
        }

        cell.addEventListener("click", () => assignPhotoToActivePage(photo.id));
        wizardLibraryEl.appendChild(cell);
      });
    }
  }

  // Rechterkolom: pagina-pakketten.
  if(wizardPagesEl){
    wizardPagesEl.innerHTML = "";
    wizardState.pages.forEach((page, index) => {
      const card = document.createElement("div");
      card.className = "wizard-page" + (index === wizardState.activePage ? " active" : "");
      card.addEventListener("click", () => {
        wizardState.activePage = index;
        renderWizardStep2();
      });

      const head = document.createElement("div");
      head.className = "wizard-page-head";

      const title = document.createElement("span");
      title.className = "wizard-page-title";
      title.textContent = `Page ${index + 1}`;
      head.appendChild(title);

      const count = document.createElement("span");
      count.className = "wizard-page-count";
      count.textContent = `${page.photoIds.length} photo${page.photoIds.length === 1 ? "" : "s"}`;
      head.appendChild(count);

      // Modern Action Controls Container
      const controlsGroup = document.createElement("div");
      controlsGroup.className = "wizard-page-controls";
      controlsGroup.style.cssText = "display: flex; align-items: center; gap: 6px; margin-left: auto;";

      // Move Up Button (Sleek Circle)
      const moveUpBtn = document.createElement("button");
      moveUpBtn.type = "button";
      moveUpBtn.className = "btn-wizard-action move-up";
      moveUpBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>`;
      moveUpBtn.title = "Move Up";
      moveUpBtn.disabled = index === 0;
      if(!moveUpBtn.disabled) {
        moveUpBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const temp = wizardState.pages[index];
          wizardState.pages[index] = wizardState.pages[index - 1];
          wizardState.pages[index - 1] = temp;
          if(wizardState.activePage === index) wizardState.activePage = index - 1;
          else if(wizardState.activePage === index - 1) wizardState.activePage = index;
          renderWizardStep2();
        });
      }
      controlsGroup.appendChild(moveUpBtn);

      // Move Down Button (Sleek Circle)
      const moveDownBtn = document.createElement("button");
      moveDownBtn.type = "button";
      moveDownBtn.className = "btn-wizard-action move-down";
      moveDownBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>`;
      moveDownBtn.title = "Move Down";
      moveDownBtn.disabled = index === wizardState.pages.length - 1;
      if(!moveDownBtn.disabled) {
        moveDownBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const temp = wizardState.pages[index];
          wizardState.pages[index] = wizardState.pages[index + 1];
          wizardState.pages[index + 1] = temp;
          if(wizardState.activePage === index) wizardState.activePage = index + 1;
          else if(wizardState.activePage === index + 1) wizardState.activePage = index;
          renderWizardStep2();
        });
      }
      controlsGroup.appendChild(moveDownBtn);

      // Modernized Delete Button (Sleek Circle)
      const del = document.createElement("button");
      del.type = "button";
      del.className = "btn-wizard-action delete";
      del.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
      del.title = "Delete page";
      del.addEventListener("click", (e) => {
        e.stopPropagation();
        removeWizardPage(index);
      });
      controlsGroup.appendChild(del);

      head.appendChild(controlsGroup);
      card.appendChild(head);

      const strip = document.createElement("div");
      strip.className = "wizard-page-strip";
      if(!page.photoIds.length){
        const hint = document.createElement("div");
        hint.className = "wizard-page-hint";
        hint.textContent = "Click photos on the left to place them here.";
        strip.appendChild(hint);
      } else {
        page.photoIds.forEach((pid, pi) => {
          const photo = getPhotoById(pid);
          if(!photo) return;
          const mini = document.createElement("button");
          mini.type = "button";
          mini.className = "wizard-mini";
          mini.title = "Click to remove";

          const im = document.createElement("img");
          im.src = photo.src;
          mini.appendChild(im);

          const x = document.createElement("span");
          x.className = "wizard-mini-x";
          x.textContent = "×";
          mini.appendChild(x);

          mini.addEventListener("click", (e) => {
            e.stopPropagation();
            page.photoIds.splice(pi, 1);
            renderWizardStep2();
          });
          strip.appendChild(mini);
        });
      }
      card.appendChild(strip);

      if(page.photoIds.length > 6){
        const warn = document.createElement("div");
        warn.className = "wizard-page-warn";
        warn.textContent = "Max 6 photos per template — extra photos will not be placed.";
        card.appendChild(warn);
      }

      wizardPagesEl.appendChild(card);
    });
  }

  const canContinue = wizardState.pages.some(p => p.photoIds.length > 0);
  if(wizardNext2) wizardNext2.disabled = !canContinue;
}

function renderWizardStep3(){
  const pages = wizardState.pages.filter(p => p.photoIds.length > 0);
  const totalPhotos = pages.reduce((n, p) => n + Math.min(6, p.photoIds.length), 0);

  if(wizardSummary){
    wizardSummary.textContent = pages.length
      ? `${pages.length} page(s) will be built with ${totalPhotos} photos in total, each automatically in a matching full-bleed template.`
      : "First add photos to at least one page in step 2.";
  }
  if(wizardSummaryGrid){
    wizardSummaryGrid.innerHTML = "";
    pages.forEach((page, i) => {
      const n = Math.min(6, page.photoIds.length);
      const chip = document.createElement("div");
      chip.className = "wizard-summary-chip";
      chip.innerHTML = `<b>Page ${i + 1}</b><span>${n} photo${n === 1 ? "" : "s"}</span>`;
      wizardSummaryGrid.appendChild(chip);
    });
  }
  // De blauwe "Albümü Otomatik Oluştur"-knop NOOIT disabled zetten: een disabled
  // knop slikt de klik geluidloos in (zonder :disabled-styling ziet hij er zelfs
  // identiek uit), waardoor de gebruiker "er gebeurt niets" ervaart. Laat elke
  // klik finishWizard bereiken; die valideert zelf (alert bij écht leeg, anders
  // recovery-modus) en sluit de wizard.
  if(wizardFinishBtn) wizardFinishBtn.disabled = false;
}

// Kies het EERSTE full-bleed sjabloon dat exact bij dit aantal foto's past (1..6).
function findWizardTemplate(photoCount){
  const count = Math.min(6, Math.max(1, photoCount));
  return templateCatalog.find(t => t.category === "full-bleed" && t.slots.length === count) || null;
}

// Bouwt de spreads op uit de wizard-pagina's. Hergebruikt BESTAANDE bouwstenen:
//  - createSpread()               -> createSpreadModel + view + actief maken
//  - applyTemplateToActiveSpread  -> zet slots, frames, gap en giet de foto's in
// De frames worden vooraf voorzien van alleen een photoId, zodat
// applyTemplateToActiveSpread ze via existingPhotoIds op slot-index inplaatst.
function buildAlbumFromWizard(pages){
  clearWorkspace();
  project.spreads = [];

  let firstSpread = null;
  pages.forEach(page => {
    const spread = createSpread(); // pusht model, bouwt view, zet actief
    const photoIds = Array.isArray(page.photoIds) ? page.photoIds.slice(0, 6) : [];

    // Seed: minimale frames met enkel photoId (worden volledig vervangen door
    // applyTemplateToActiveSpread, dat er per slot echte template-frames van maakt).
    spread.frames = photoIds.map(pid => ({ photoId: pid }));

    // Güvenlik Ağı: Sayfada foto varsa katalog şablonunu bul ve uygula. Katalog
    // artık 2-6 foto için tüm 30×30 layout'larını içerdiğinden bu yol her sayfayı
    // kapsar (kod-üretimli fallback ızgarasına gerek kalmadı, kaldırıldı).
    if(photoIds.length > 0){
      const template = findWizardTemplate(photoIds.length);
      if(template){
        applyTemplateToActiveSpread(template.id);
      }
    } else {
      // Sayfa tamamen boşsa şablon motorunu pas geç; temiz, serbest bir spread bırak.
      spread.slots = [];
      rerenderSpread(spread);
    }

    if(!firstSpread) firstSpread = spread;
  });

  updateSpreadNumbers();
  if(firstSpread){
    setActiveSpread(firstSpread);
    requestAnimationFrame(() => scrollToSpread(firstSpread, "auto"));
  }
  renderLibrary();
  // Verse geschiedenis-basis voor het net opgebouwde album.
  initHistory();
}

function finishWizard(){
  console.log("WIZARD: Finish button clicked!");
  console.log("WIZARD: Current wizardState pages:", wizardState.pages);

  // Güvenlik Ağı: Önce içi dolu sayfaları süz. Süzülemezse (foto atanmamışsa)
  // ama kullanıcı arayüzde sayfaları görüp onayladıysa, boş dahi olsalar tüm
  // sayfaları kurtarma moduna alıp albümü yine de oluştur — buton hiçbir
  // koşulda sessizce çıkmasın.
  let pages = wizardState.pages.filter(p => p.photoIds && p.photoIds.length > 0);
  console.log("WIZARD: Filtered pages with photos:", pages);

  if(!pages.length && wizardState.pages.length > 0){
    console.log("WIZARD: Recovery mode activated, using all empty/mixed pages.");
    pages = wizardState.pages;
  }

  if(!pages.length){
    console.warn("WIZARD: No pages found to build!");
    alert("Please add photos to at least one page, or create a new page.");
    return;
  }

  // Bulletproof: elke fout tijdens de opbouw wordt zichtbaar gemaakt i.p.v. de
  // wizard stil te laten hangen. Zo zien we in de browserconsole (en via alert)
  // exact welke stap eventueel crasht, en blijft de overlay niet vastzitten.
  try {
    // Naam + formaat toepassen VOOR de opbouw: applyTemplateToActiveSpread rekent
    // met formats[project.format], dus het formaat moet al vaststaan.
    project.name = sanitizeProjectName(projectNameInput.value);
    project.format = formatSelect.value;
    syncProjectUI();
    console.log("WIZARD: Project UI synced successfully.");

    console.log("WIZARD: Starting buildAlbumFromWizard...");
    buildAlbumFromWizard(pages);
    console.log("WIZARD: buildAlbumFromWizard finished without crashing.");

    closeIntroOverlay();
    console.log("WIZARD: Intro overlay closed.");

    // Zodra het album is gegenereerd mag de gebruiker NIET meer terug naar de
    // wizard: de amber "Back to Wizard"-knop blijft volledig verborgen.
    if(wizardReturnBtn) wizardReturnBtn.classList.add("hidden");
  } catch (err) {
    console.error("CRITICAL WIZARD CRASH DETECTED IN BROWSER:", err);
    alert("An error occurred while the wizard was building the album: " + (err && err.message ? err.message : err));
  }
}

// --- Wizard-koppelingen ---
if(wizardUpload){
  wizardUpload.addEventListener("change", async (e) => {
    await importPhotoFiles(e.target.files);
    wizardUpload.value = "";
    refreshWizardUI();
  });
}
if(wizardNext1) wizardNext1.addEventListener("click", () => goToWizardStep(2));
if(wizardNext2) wizardNext2.addEventListener("click", () => goToWizardStep(3));
if(wizardAddPageBtn) wizardAddPageBtn.addEventListener("click", addWizardPage);
if(wizardFinishBtn) wizardFinishBtn.addEventListener("click", finishWizard);

// Terug vanuit de live-preview naar de wizard (stap 2), met behoud van de
// reeds ingedeelde pagina's: verberg de knop, heropen de overlay ZONDER reset
// en land direct op stap 2 waar de fotostroken staan.
if(wizardReturnBtn) wizardReturnBtn.addEventListener("click", () => {
  wizardReturnBtn.classList.add("hidden");
  wizardPreserveOnOpen = true;
  openIntroOverlay("wizard");
  goToWizardStep(2);
});

// --- Galeri yakınlaştırma (Grid Scaler) ---
// Stap 2'deki sol fotoğraf galerisini kademeli büyütüp küçültür. Yalnızca CSS
// değişkenlerini (inline) günceller; foto dağıtımı, sayfa paketleri ve
// senkronizasyon mantığına dokunmaz. Uç seviyeler: en yakın = yan yana 3 foto,
// en uzak = yan yana 6 foto.
const WIZARD_ZOOM_LEVELS = [
  { min: "130px", row: "115px" }, // en uzak — yan yana ~6 foto
  { min: "150px", row: "130px" },
  { min: "170px", row: "150px" }, // varsayılan — yan yana ~4-5 foto
  { min: "210px", row: "185px" },
  { min: "260px", row: "220px" }, // en yakın — yan yana ~3 foto
];
let wizardZoomLevel = 2; // varsayılan başlangıç seviyesi

function applyWizardZoom(){
  if(!wizardLibraryEl) return;
  const level = WIZARD_ZOOM_LEVELS[wizardZoomLevel];
  wizardLibraryEl.style.setProperty("--wizard-thumb-min", level.min);
  wizardLibraryEl.style.setProperty("--wizard-row-height", level.row);
}

if(wizardZoomInBtn) wizardZoomInBtn.addEventListener("click", () => {
  wizardZoomLevel = Math.min(WIZARD_ZOOM_LEVELS.length - 1, wizardZoomLevel + 1);
  applyWizardZoom();
});
if(wizardZoomOutBtn) wizardZoomOutBtn.addEventListener("click", () => {
  wizardZoomLevel = Math.max(0, wizardZoomLevel - 1);
  applyWizardZoom();
});

// Sorteer-dropdown stap 2: herrender de bibliotheek in de gekozen volgorde.
if(wizardSortSelect) wizardSortSelect.addEventListener("change", (e) => {
  wizardSortMode = e.target.value;
  renderWizardStep2();
});

// Terug-knoppen binnen de wizard.
document.querySelectorAll(".wizard-back").forEach(btn => {
  btn.addEventListener("click", () => goToWizardStep(Number(btn.dataset.back)));
});

// Klikbare stap-indicator: alleen terug of naar een reeds bereikbare stap.
wizardDots.forEach(dot => {
  dot.addEventListener("click", () => {
    const target = Number(dot.dataset.step);
    if(target < wizardStep){
      goToWizardStep(target);
    } else if(target === 2 && project.library.length){
      goToWizardStep(2);
    } else if(target === 3 && wizardState.pages.some(p => p.photoIds.length)){
      goToWizardStep(3);
    }
  });
});

function initialize(){
  isLightTheme = localStorage.getItem("albumTheme") === "light";
  applyThemePreference();

  project = createEmptyProject(formatSelect.value);
  syncProjectUI();
  libraryZoom.value = "60";
  libraryThumbSize = 60;
  templateCount.value = String(templatePhotoCount);
  if(spreadBgColor){
    spreadBgColor.value = project.spreadBackground || '#ffffff';
  }
  renderLibrary();
  renderTemplates();
  setAssetMode('photos');
  applySpreadBackgroundToAll();
  applyZoom();

  // Start de Akıllı Albüm Kurulum Sihirbazı i.p.v. meteen een lege spread te
  // maken. De spreads worden pas gebouwd wanneer de gebruiker de wizard afrondt
  // (of een bestaand project laadt).
  introMode = "wizard";
  openIntroOverlay('wizard');
}

initialize();
