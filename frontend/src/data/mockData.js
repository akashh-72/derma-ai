// DermaAI Clinical Data & Knowledge Base
// Aligned with the 8 Official Balanced Dataset Categories

// High-Fidelity SVG Medical Dermoscopic Visualizers
export const createClinicalSVG = (type, isGradCam = false) => {
  if (isGradCam) {
    // Grad-CAM Heatmap overlay with vibrant Jet/Turbo color scheme (red-yellow-green hot zones)
    // Custom heat center positions per condition type
    const heatCenters = {
      acne_rosacea: { cx1: 52, cy1: 48, r1: 48, cx2: 44, cy2: 42, r2: 32 },
      eczema: { cx1: 50, cy1: 50, r1: 55, cx2: 46, cy2: 48, r2: 36 },
      fungal_ringworm: { cx1: 50, cy1: 50, r1: 52, cx2: 60, cy2: 44, r2: 28 },
      alopecia_hair_loss: { cx1: 48, cy1: 52, r1: 46, cx2: 44, cy2: 50, r2: 30 },
      healthy_skin: { cx1: 50, cy1: 50, r1: 25, cx2: 50, cy2: 50, r2: 15 },
      melanoma_skin_cancer: { cx1: 46, cy1: 46, r1: 50, cx2: 42, cy2: 42, r2: 34 },
      vascular_tumors: { cx1: 52, cy1: 52, r1: 48, cx2: 50, cy2: 50, r2: 32 },
      chickenpox_viral: { cx1: 48, cy1: 45, r1: 52, cx2: 54, cy2: 42, r2: 35 }
    };

    const hc = heatCenters[type] || heatCenters.eczema;

    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
      <defs>
        <radialGradient id="heat1" cx="${hc.cx1}%" cy="${hc.cy1}%" r="${hc.r1}%">
          <stop offset="0%" stop-color="%23FF0000" stop-opacity="0.95" />
          <stop offset="25%" stop-color="%23FF7700" stop-opacity="0.85" />
          <stop offset="50%" stop-color="%23FFFF00" stop-opacity="0.65" />
          <stop offset="75%" stop-color="%2300FF66" stop-opacity="0.4" />
          <stop offset="100%" stop-color="%230044FF" stop-opacity="0.05" />
        </radialGradient>
        <radialGradient id="heat2" cx="${hc.cx2}%" cy="${hc.cy2}%" r="${hc.r2}%">
          <stop offset="0%" stop-color="%23FF0033" stop-opacity="0.98" />
          <stop offset="40%" stop-color="%23FFAA00" stop-opacity="0.8" />
          <stop offset="70%" stop-color="%2333CCFF" stop-opacity="0.3" />
          <stop offset="100%" stop-color="%23000088" stop-opacity="0" />
        </radialGradient>
        <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="15" />
        </filter>
      </defs>
      <!-- Base tissue underlay -->
      <rect width="400" height="400" fill="%23D4A373" />
      <rect width="400" height="400" fill="%23000000" opacity="0.18" />
      <!-- Lesion base silhouette -->
      <path d="M 120 180 C 110 110, 260 90, 280 160 C 310 230, 240 310, 170 290 C 110 270, 130 220, 120 180 Z" fill="%237F382A" opacity="0.4" />
      <!-- Grad-CAM Jet Activation Heatmaps -->
      <g filter="url(%23blurFilter)">
        <ellipse cx="205" cy="200" rx="140" ry="120" fill="url(%23heat1)" opacity="0.9" />
        <ellipse cx="195" cy="190" rx="95" ry="85" fill="url(%23heat2)" opacity="0.95" />
      </g>
      <!-- Neural Focus Indicator Ring -->
      <circle cx="200" cy="195" r="75" fill="none" stroke="%23FFFFFF" stroke-width="2.5" stroke-dasharray="8 6" opacity="0.85" />
      <text x="200" y="380" font-family="sans-serif" font-size="12" font-weight="bold" fill="%23FFFFFF" text-anchor="middle" letter-spacing="1">GRAD-CAM ACTIVATION PEAK (LAYER: CONV_FINAL)</text>
    </svg>`;
  }

  // Original Dermoscopic Tissue Images for all 8 classes
  switch (type) {
    case 'acne_rosacea':
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
        <rect width="400" height="400" fill="%23F3C6A5" />
        <!-- Facial flushing background glow -->
        <circle cx="200" cy="200" r="150" fill="%23E86161" opacity="0.35" />
        <!-- Rosacea telangiectasia micro-vessels -->
        <path d="M 140 160 Q 160 175 190 170 T 230 185" stroke="%23B31D1D" stroke-width="1.8" fill="none" opacity="0.8" />
        <path d="M 170 220 Q 200 210 225 240 T 260 235" stroke="%23B31D1D" stroke-width="1.5" fill="none" opacity="0.75" />
        <path d="M 180 130 Q 185 160 210 165" stroke="%23C92A2A" stroke-width="1.2" fill="none" opacity="0.7" />
        <!-- Inflammatory papules & pustules -->
        <circle cx="160" cy="180" r="16" fill="%23E03131" />
        <circle cx="160" cy="180" r="6" fill="%23FFF3BF" />
        <circle cx="230" cy="165" r="18" fill="%23E03131" />
        <circle cx="230" cy="165" r="7" fill="%23FFFFFF" />
        <circle cx="190" cy="240" r="22" fill="%23C92A2A" />
        <circle cx="190" cy="240" r="8" fill="%23FFF9DB" />
        <circle cx="250" cy="230" r="14" fill="%23E03131" />
        <!-- Comedones (Blackheads) -->
        <circle cx="130" cy="230" r="4" fill="%23212529" />
        <circle cx="215" cy="120" r="3.5" fill="%23212529" />
        <circle cx="270" cy="190" r="4" fill="%23212529" />
        <!-- Calibration Grid -->
        <line x1="20" y1="20" x2="60" y2="20" stroke="%23FFFFFF" stroke-width="1.5" opacity="0.6"/>
        <text x="25" y="45" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23FFFFFF">10mm</text>
      </svg>`;

    case 'eczema':
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
        <rect width="400" height="400" fill="%23E8BC96" />
        <!-- Inflammatory erythema plaque base -->
        <path d="M 110 170 C 90 100, 270 90, 290 160 C 320 240, 250 320, 160 300 C 100 280, 130 210, 110 170 Z" fill="%23D65A4F" opacity="0.88" />
        <!-- Dry epidermal scaling & lichenification ridges -->
        <path d="M 120 160 Q 200 170 280 150 M 130 200 Q 210 215 270 190 M 140 240 Q 200 260 260 230" stroke="%23FCEADE" stroke-width="2.5" fill="none" opacity="0.8" />
        <path d="M 150 140 Q 180 200 170 270 M 210 130 Q 230 190 220 280 M 250 150 Q 260 210 245 260" stroke="%23FCEADE" stroke-width="2" fill="none" opacity="0.75" />
        <!-- Excoriation marks (scratching fissures) -->
        <path d="M 160 185 L 210 195" stroke="%23841818" stroke-width="2.2" stroke-linecap="round" />
        <path d="M 180 225 L 235 230" stroke="%23841818" stroke-width="2" stroke-linecap="round" />
        <path d="M 195 160 L 225 170" stroke="%23841818" stroke-width="1.8" stroke-linecap="round" />
        <line x1="20" y1="20" x2="60" y2="20" stroke="%23FFFFFF" stroke-width="1.5" opacity="0.6"/>
        <text x="25" y="45" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23FFFFFF">10mm</text>
      </svg>`;

    case 'fungal_ringworm':
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
        <rect width="400" height="400" fill="%23E2B897" />
        <!-- Annular ringworm elevated border -->
        <circle cx="200" cy="200" r="105" fill="none" stroke="%23C94A4A" stroke-width="28" opacity="0.85" />
        <!-- Active advancing edge with fine papules -->
        <circle cx="200" cy="200" r="118" fill="none" stroke="%23A82424" stroke-width="5" stroke-dasharray="12 8" opacity="0.9" />
        <circle cx="200" cy="200" r="92" fill="none" stroke="%23F0C2A8" stroke-width="4" stroke-dasharray="6 4" opacity="0.75" />
        <!-- Central partial clearing -->
        <circle cx="200" cy="200" r="78" fill="%23DFB492" opacity="0.95" />
        <circle cx="200" cy="200" r="50" fill="%23E4BC9C" opacity="0.9" />
        <!-- Peripheral scaling flecks -->
        <circle cx="110" cy="150" r="5" fill="%23FFF2E8" opacity="0.8" />
        <circle cx="290" cy="160" r="6" fill="%23FFF2E8" opacity="0.8" />
        <circle cx="260" cy="275" r="5" fill="%23FFF2E8" opacity="0.8" />
        <circle cx="140" cy="265" r="5" fill="%23FFF2E8" opacity="0.8" />
        <line x1="20" y1="20" x2="60" y2="20" stroke="%23FFFFFF" stroke-width="1.5" opacity="0.6"/>
        <text x="25" y="45" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23FFFFFF">10mm</text>
      </svg>`;

    case 'alopecia_hair_loss':
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
        <!-- Scalp baseline skin tone -->
        <rect width="400" height="400" fill="%23E6BA95" />
        <!-- Surrounding healthy dense hair strands -->
        <g stroke="%232B1810" stroke-width="2.5" opacity="0.85">
          <!-- Top strands -->
          <path d="M 30 10 Q 50 80 40 140 M 80 0 Q 90 70 70 130 M 130 5 Q 140 60 120 110" />
          <path d="M 270 10 Q 260 60 280 110 M 320 0 Q 310 70 330 130 M 370 10 Q 350 80 360 140" />
          <!-- Left strands -->
          <path d="M 0 170 Q 70 160 100 180 M 0 220 Q 60 215 95 240 M 0 280 Q 70 270 110 290" />
          <!-- Right strands -->
          <path d="M 400 170 Q 330 160 300 180 M 400 220 Q 340 215 305 240 M 400 280 Q 330 270 290 290" />
          <!-- Bottom strands -->
          <path d="M 50 400 Q 70 340 60 280 M 120 400 Q 130 350 115 300 M 280 400 Q 270 350 285 300 M 350 400 Q 330 340 340 280" />
        </g>
        <!-- Alopecia Areata circumscribed bald patch -->
        <ellipse cx="200" cy="200" rx="98" ry="90" fill="%23F5CEAD" stroke="%23E09968" stroke-width="3" opacity="0.95" />
        <!-- Miniaturized follicular ostia (yellow dots) -->
        <circle cx="160" cy="180" r="3" fill="%23D48B3B" />
        <circle cx="220" cy="170" r="3" fill="%23D48B3B" />
        <circle cx="185" cy="230" r="3" fill="%23D48B3B" />
        <circle cx="230" cy="220" r="3" fill="%23D48B3B" />
        <circle cx="150" cy="210" r="2.5" fill="%23D48B3B" />
        <!-- Exclamation mark hairs along periphery -->
        <path d="M 125 155 L 132 170" stroke="%231F100A" stroke-width="3" stroke-linecap="round" />
        <circle cx="133" cy="173" r="1.5" fill="%231F100A" />
        <path d="M 270 160 L 263 175" stroke="%231F100A" stroke-width="3" stroke-linecap="round" />
        <circle cx="262" cy="178" r="1.5" fill="%231F100A" />
        <line x1="20" y1="20" x2="60" y2="20" stroke="%23FFFFFF" stroke-width="1.5" opacity="0.6"/>
        <text x="25" y="45" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23FFFFFF">10mm</text>
      </svg>`;

    case 'healthy_skin':
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
        <!-- Uniform physiological Fitzpatrick cutaneous tone -->
        <rect width="400" height="400" fill="%23E5BA98" />
        <!-- Natural delicate dermatoglyphic micro-relief lines -->
        <g stroke="%23CE9A72" stroke-width="0.8" opacity="0.45" fill="none">
          <path d="M 0 50 Q 200 45 400 60 M 0 110 Q 200 120 400 100 M 0 180 Q 200 170 400 190" />
          <path d="M 0 250 Q 200 260 400 240 M 0 310 Q 200 300 400 320 M 0 370 Q 200 375 400 365" />
          <path d="M 60 0 Q 70 200 50 400 M 130 0 Q 140 200 125 400 M 210 0 Q 200 200 215 400" />
          <path d="M 280 0 Q 290 200 275 400 M 350 0 Q 345 200 360 400" />
        </g>
        <!-- Regular micro-pore distribution -->
        <g fill="%23C98E64" opacity="0.3">
          <circle cx="100" cy="90" r="1.5" /><circle cx="220" cy="110" r="1.5" /><circle cx="310" cy="80" r="1.5" />
          <circle cx="80" cy="210" r="1.5" /><circle cx="190" cy="200" r="1.5" /><circle cx="320" cy="220" r="1.5" />
          <circle cx="120" cy="320" r="1.5" /><circle cx="230" cy="310" r="1.5" /><circle cx="340" cy="330" r="1.5" />
        </g>
        <!-- Clinical normal control label banner -->
        <rect x="110" y="340" width="180" height="26" rx="13" fill="%232B8A3E" opacity="0.85" />
        <text x="200" y="357" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23FFFFFF" text-anchor="middle">CONTROL: HEALTHY DERMIS</text>
        <line x1="20" y1="20" x2="60" y2="20" stroke="%23FFFFFF" stroke-width="1.5" opacity="0.6"/>
        <text x="25" y="45" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23FFFFFF">10mm</text>
      </svg>`;

    case 'melanoma_skin_cancer':
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
        <rect width="400" height="400" fill="%23DFB18A" />
        <!-- Asymmetric atypical melanocytic lesion -->
        <path d="M 130 170 C 95 110, 240 70, 275 140 C 310 190, 315 275, 230 300 C 150 320, 100 280, 115 230 C 80 195, 120 180, 130 170 Z" fill="%231C130E" opacity="0.95" />
        <!-- Variegated pigment lobes (dark brown, slate-grey, red rim) -->
        <circle cx="160" cy="180" r="45" fill="%233D2214" opacity="0.9" />
        <circle cx="240" cy="195" r="50" fill="%2320140D" opacity="0.95" />
        <circle cx="205" cy="245" r="42" fill="%234A2E1F" opacity="0.85" />
        <!-- Erythematous inflammatory border & regression zone -->
        <path d="M 270 140 Q 310 180 295 240" stroke="%23C92A2A" stroke-width="8" fill="none" opacity="0.65" />
        <ellipse cx="150" cy="235" rx="20" ry="16" fill="%237D8287" opacity="0.6" />
        <!-- Dermoscopic ABCDE Notching callout -->
        <path d="M 100 195 L 125 210" stroke="%23FFFFFF" stroke-width="2" />
        <text x="75" y="195" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23FFFFFF">Notched</text>
        <line x1="20" y1="20" x2="60" y2="20" stroke="%23FFFFFF" stroke-width="1.5" opacity="0.6"/>
        <text x="25" y="45" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23FFFFFF">10mm</text>
      </svg>`;

    case 'vascular_tumors':
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
        <rect width="400" height="400" fill="%23E2B694" />
        <!-- Dermal background capillary blush -->
        <circle cx="200" cy="200" r="130" fill="%23D6336C" opacity="0.25" />
        <!-- Mulberry vascular lacunae cluster (Hemangioma / Angioma) -->
        <g>
          <circle cx="170" cy="170" r="32" fill="%23C2255C" opacity="0.9" />
          <circle cx="225" cy="165" r="36" fill="%23A61E4D" opacity="0.92" />
          <circle cx="175" cy="230" r="40" fill="%2386123D" opacity="0.95" />
          <circle cx="235" cy="225" r="35" fill="%23C2255C" opacity="0.9" />
          <circle cx="200" cy="195" r="28" fill="%23E64980" opacity="0.88" />
          <!-- Peripheral satellite micro-lacunae -->
          <circle cx="125" cy="190" r="12" fill="%23C2255C" opacity="0.85" />
          <circle cx="270" cy="180" r="14" fill="%23A61E4D" opacity="0.85" />
          <circle cx="210" cy="275" r="15" fill="%2386123D" opacity="0.85" />
        </g>
        <!-- Glint/specular reflections of vascular endothelial domes -->
        <circle cx="160" cy="160" r="7" fill="%23FFFFFF" opacity="0.6" />
        <circle cx="218" cy="155" r="8" fill="%23FFFFFF" opacity="0.55" />
        <circle cx="165" cy="218" r="9" fill="%23FFFFFF" opacity="0.5" />
        <line x1="20" y1="20" x2="60" y2="20" stroke="%23FFFFFF" stroke-width="1.5" opacity="0.6"/>
        <text x="25" y="45" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23FFFFFF">10mm</text>
      </svg>`;

    case 'chickenpox_viral':
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
        <rect width="400" height="400" fill="%23EABFA0" />
        <!-- Erythematous inflammatory halos ("dewdrops on rose petal") -->
        <!-- Lesion 1: Central clear dewdrop vesicle -->
        <circle cx="190" cy="170" r="44" fill="%23E03131" opacity="0.6" />
        <circle cx="190" cy="170" r="22" fill="%23FFEC99" opacity="0.85" />
        <circle cx="186" cy="166" r="16" fill="%23E7F5FF" opacity="0.95" />
        <circle cx="182" cy="162" r="5" fill="%23FFFFFF" />
        <!-- Lesion 2: Umbilicated pustule -->
        <circle cx="270" cy="210" r="36" fill="%23E03131" opacity="0.55" />
        <circle cx="270" cy="210" r="18" fill="%23FFE066" opacity="0.9" />
        <circle cx="270" cy="210" r="5" fill="%23C92A2A" />
        <!-- Lesion 3: Crusted stage -->
        <circle cx="130" cy="245" r="32" fill="%23E03131" opacity="0.45" />
        <circle cx="130" cy="245" r="16" fill="%23842000" opacity="0.95" />
        <!-- Lesion 4 & 5: Early maculopapular crops -->
        <circle cx="230" cy="100" r="24" fill="%23E03131" opacity="0.5" />
        <circle cx="230" cy="100" r="8" fill="%23C92A2A" opacity="0.8" />
        <circle cx="120" cy="130" r="22" fill="%23E03131" opacity="0.5" />
        <circle cx="120" cy="130" r="7" fill="%23C92A2A" opacity="0.8" />
        <line x1="20" y1="20" x2="60" y2="20" stroke="%23FFFFFF" stroke-width="1.5" opacity="0.6"/>
        <text x="25" y="45" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23FFFFFF">10mm</text>
      </svg>`;

    default:
      return createClinicalSVG('eczema', false);
  }
};

// 2. THE 8 OFFICIAL BENCHMARK CLINICAL CASES
export const CLINICAL_CASES = [
  {
    id: "case-acne-rosacea",
    datasetFolder: "Acne And Rosacea Photos",
    name: "Acne & Rosacea",
    shortName: "Acne & Rosacea",
    category: "Sebaceous & Facial Vascular",
    confidence: 95.8,
    urgency: "Moderate",
    urgencyColor: "amber",
    description: "Acne (cystic, pustular, comedones, scarring) and Rosacea (facial redness, rhinophyma). Chronic inflammatory disorder of pilosebaceous units paired with facial vascular hyper-reactivity.",
    symptoms: [
      "Open and closed comedones with inflammatory pustules",
      "Persistent facial erythema and flushing across cheeks and nose",
      "Visible telangiectasias (dilated micro-capillaries)",
      "Burning, stinging sensations and potential rhinophyma tissue hypertrophy"
    ],
    causes: [
      "Androgen-mediated sebum overproduction and hyperkeratinization",
      "Cutibacterium acnes bacterial proliferation and cytokine release",
      "Facial vasomotor instability and Demodex folliculorum hypersensitivity",
      "Sun exposure, heat, spicy foods, and emotional stress triggers"
    ],
    precautions: [
      "Wash face twice daily with a non-comedogenic salicylic acid / syndet cleanser.",
      "Apply broad-spectrum mineral SPF 50+ sunscreen daily without chemical irritants.",
      "Never squeeze or extract pustules to avoid deep atrophic scar formation.",
      "Avoid abrasive scrubs, facial alcohol toners, and extreme hot showers."
    ],
    whenToConsult: "Consult a certified dermatologist if painful cystic nodules form, persistent tissue swelling (rhinophyma) begins, or ocular burning occurs.",
    originalImage: createClinicalSVG("acne_rosacea", false),
    gradcamImage: createClinicalSVG("acne_rosacea", true)
  },
  {
    id: "case-eczema",
    datasetFolder: "Eczema Photos",
    name: "Eczema / Atopic Dermatitis",
    shortName: "Eczema",
    category: "Inflammatory / Barrier Defect",
    confidence: 94.2,
    urgency: "Moderate",
    urgencyColor: "amber",
    description: "Skin inflammation, dry/scaly patches, and atopic dermatitis. Chronic pruritic epidermal barrier disruption with recurrent flares.",
    symptoms: [
      "Intense pruritus (itching) worsening nocturnal restlessness",
      "Dry, cracked, erythematous patches on flexural skin (elbows, knees)",
      "Small raised vesicles that weep serum upon excoriation",
      "Lichenification (leathery skin thickening) from persistent rubbing"
    ],
    causes: [
      "Filaggrin (FLG) epidermal barrier loss-of-function gene mutations",
      "TH2-skewed immune hyper-reactivity to environmental allergens",
      "Harsh surfactants, synthetic fragrances, and dry winter climates",
      "Secondary colonization by Staphylococcus aureus"
    ],
    precautions: [
      "Apply ceramide-rich emollient within 3 minutes of bathing.",
      "Limit showers to 10 minutes with lukewarm water.",
      "Wear 100% breathable organic cotton; avoid rough wool or synthetics.",
      "Maintain indoor ambient humidity between 45% and 55%."
    ],
    whenToConsult: "Consult a doctor if patches weep honey-colored crusts (secondary bacterial impetigo) or pruritus severely impairs sleep.",
    originalImage: createClinicalSVG("eczema", false),
    gradcamImage: createClinicalSVG("eczema", true)
  },
  {
    id: "case-fungal-ringworm",
    datasetFolder: "Fu Ringworm",
    name: "Fungal Infection / Ringworm",
    shortName: "Fungal Ringworm",
    category: "Infectious / Dermatophyte",
    confidence: 91.4,
    urgency: "Moderate",
    urgencyColor: "amber",
    description: "Dermatophyte fungal infections (Tinea, ringworm, fungal rashes). Superficial fungal infection of keratinized stratum corneum.",
    symptoms: [
      "Annular (ring-shaped) erythematous patch with raised leading edges",
      "Central clearing creating a classic concentric target ring pattern",
      "Peripheral scaling, fine papules, and localized burning pruritus",
      "Clear demarcated margin dividing healthy epidermis from lesion"
    ],
    causes: [
      "Keratinophilic dermatophytes (Trichophyton, Microsporum, Epidermophyton)",
      "Direct skin contact with infected individuals or household pets",
      "Fomite transmission through damp gym mats, towels, and locker rooms",
      "Perspiration accumulation in warm, high-humidity environments"
    ],
    precautions: [
      "Maintain strict cleanliness and thorough drying of intertriginous skin.",
      "Launder athletic wear, towels, and sheets at high temperatures (>60°C).",
      "Do not share towels, combs, or personal grooming utensils.",
      "Continue prescribed topical antifungals 2 weeks past visual clearance."
    ],
    whenToConsult: "Seek clinical consultation if the fungal ring spreads despite 2 weeks of topical OTC antifungals, or if scalp hair loss occurs.",
    originalImage: createClinicalSVG("fungal_ringworm", false),
    gradcamImage: createClinicalSVG("fungal_ringworm", true)
  },
  {
    id: "case-alopecia",
    datasetFolder: "Hair Loss Photos Alopecia And Other Hair Diseases",
    name: "Alopecia & Hair/Scalp Diseases",
    shortName: "Alopecia & Scalp",
    category: "Follicular / Autoimmune",
    confidence: 92.6,
    urgency: "Low - Moderate",
    urgencyColor: "amber",
    description: "Alopecia areata, androgenetic hair loss, and scalp disorders. Loss of scalp or body hair due to autoimmune attack, hormonal DHT sensitivity, or scalp inflammation.",
    symptoms: [
      "Circumscribed, smooth circular bald patches on scalp (Alopecia Areata)",
      "Gradual crown or bitemporal hair thinning (Androgenetic Alopecia)",
      "Exclamation-mark dystrophic hairs visible at active border",
      "Scalp erythema, perifollicular scaling, or inflammatory burning"
    ],
    causes: [
      "Autoimmune breakdown of hair follicle immune privilege",
      "Genetically determined follicular sensitivity to Dihydrotestosterone",
      "Severe physiological or psychological stress triggers (Telogen Effluvium)",
      "Micronutrient deficiencies (Serum ferritin, Vitamin D, Zinc)"
    ],
    precautions: [
      "Avoid traction hairstyles (tight braids, high ponytails) that stress roots.",
      "Use mild, sulfate-free cleansers and minimize high-heat styling tools.",
      "Ensure sufficient nutritional intake of dietary protein and iron.",
      "Practice stress-reduction techniques to regulate cortisol."
    ],
    whenToConsult: "Consult a trichologist or dermatologist if hair sheds in sudden extensive clumps, scalp hurts or scars, or total eyebrow loss occurs.",
    originalImage: createClinicalSVG("alopecia_hair_loss", false),
    gradcamImage: createClinicalSVG("alopecia_hair_loss", true)
  },
  {
    id: "case-healthy-skin",
    datasetFolder: "Heathy",
    name: "Healthy Skin (Control)",
    shortName: "Healthy Skin",
    category: "Physiological Control",
    confidence: 98.4,
    urgency: "Normal",
    urgencyColor: "emerald",
    description: "Normal, non-diseased skin. Intact epidermal barrier without active inflammation, infection, or malignant lesions.",
    symptoms: [
      "Smooth, uniform epidermal texture and consistent pigmentation",
      "Intact stratum corneum barrier without erythema, scaling, or crusting",
      "Normal cutaneous micro-relief lines and physiological elasticity",
      "Balanced sebum secretion and absence of suspicious lesions"
    ],
    causes: [
      "Physiological baseline state with homeostatic cellular turnover",
      "Balanced lipid mantle and functional Natural Moisturizing Factor",
      "Effective routine photoprotection and hydration"
    ],
    precautions: [
      "Apply broad-spectrum SPF 30+ or SPF 50+ sunscreen daily before UV exposure.",
      "Maintain gentle daily cleansing and barrier-supporting hydration.",
      "Conduct regular monthly self-examinations using ABCDE guidelines.",
      "Schedule routine annual preventive dermatological examinations."
    ],
    whenToConsult: "Schedule annual routine check-ups or seek prompt evaluation if any mole evolves, bleeds, or presents asymmetric growth.",
    originalImage: createClinicalSVG("healthy_skin", false),
    gradcamImage: createClinicalSVG("healthy_skin", true)
  },
  {
    id: "case-melanoma-moles",
    datasetFolder: "Melanoma Skin Cancer Nevi And Moles",
    name: "Melanoma & Skin Cancer / Moles",
    shortName: "Melanoma & Moles",
    category: "Neoplastic / Melanocytic",
    confidence: 93.9,
    urgency: "Urgent",
    urgencyColor: "red",
    description: "Malignant melanoma, melanocytic nevi, and abnormal moles. Malignant transformation of epidermal melanocytes requiring urgent ABCDE triage.",
    symptoms: [
      "Asymmetry: Two halves of the lesion do not match in geometry",
      "Border Irregularity: Edges are notched, scalloped, or ragged",
      "Color Variation: Inconsistent shades of black, dark brown, blue, red",
      "Diameter: Exceeds 6mm or exhibits rapid progressive enlargement",
      "Evolving: Progressive changes in elevation, bleeding, or itching"
    ],
    causes: [
      "Intense intermittent UV exposure and severe blistering sunburns",
      "High aggregate count of atypical or dysplastic nevi",
      "Genetic oncogenic mutations (CDKN2A, CDK4, BRAF V600E)",
      "Fitzpatrick phototype I or II with reduced melanin protection"
    ],
    precautions: [
      "Do NOT pick, scratch, or attempt home removal or corrosive acids.",
      "Strictly avoid indoor tanning beds and direct peak UV sunlight.",
      "Document lesion dimensions photographically next to a millimeter ruler.",
      "Wear broad-spectrum mineral SPF 50+ sunscreen and UV-blocking clothing."
    ],
    whenToConsult: "CRITICAL: Urgent dermoscopic evaluation and excisional biopsy by a board-certified dermatologist is required within 48 to 72 hours.",
    originalImage: createClinicalSVG("melanoma_skin_cancer", false),
    gradcamImage: createClinicalSVG("melanoma_skin_cancer", true)
  },
  {
    id: "case-vascular-tumors",
    datasetFolder: "Vascular Tumors",
    name: "Vascular Tumors & Lesions",
    shortName: "Vascular Lesions",
    category: "Vascular / Angiomatous",
    confidence: 92.1,
    urgency: "Moderate",
    urgencyColor: "amber",
    description: "Hemangiomas, vascular malformations, and blood vessel lesions. Proliferations or structural anomalies of dermal capillaries and venous vessels.",
    symptoms: [
      "Bright red, scarlet, or violaceous macules or raised dome-shaped papules",
      "Lobulated compressible vascular lacunae (cherry angioma, strawberry hemangioma)",
      "Blanching response when pressure is applied with a glass slide",
      "Tendency to bleed briskly following minor superficial friction"
    ],
    causes: [
      "Endothelial cellular proliferation (GLUT-1 positive infantile hemangiomas)",
      "Somatic mutations impacting angiogenesis pathways (GNAQ, PIK3CA)",
      "Age-related ectasia of superficial dermal micro-vessels",
      "Trauma-triggered pyogenic capillary proliferation"
    ],
    precautions: [
      "Protect lesion from friction, sharp mechanical trauma, or shaving cuts.",
      "Never attempt home needle puncture or chemical cauterization.",
      "If accidental bleeding occurs, apply firm direct pressure for 10 minutes with sterile gauze.",
      "Keep surrounding skin moisturized to prevent micro-fissuring."
    ],
    whenToConsult: "Consult a specialist if lesion rapidly accelerates in size, bleeds frequently, ulcerates, or occurs near the periorbital zone.",
    originalImage: createClinicalSVG("vascular_tumors", false),
    gradcamImage: createClinicalSVG("vascular_tumors", true)
  },
  {
    id: "case-chickenpox",
    datasetFolder: "Vi Chickenpox",
    name: "Chickenpox (Viral Infection)",
    shortName: "Chickenpox (Viral)",
    category: "Infectious / Viral Exanthem",
    confidence: 94.7,
    urgency: "Moderate - High",
    urgencyColor: "red",
    description: "Varicella zoster viral rash, chickenpox blisters, and eruptions. Highly contagious primary viral infection by the Varicella-Zoster Virus (VZV).",
    symptoms: [
      "Successive waves of intensely pruritic 'dewdrops on rose petal' blisters",
      "Polymorphic presentation (macules, papules, vesicles, and crusts together)",
      "Vesicles that break open and form dry granular crusts",
      "Systemic prodrome of moderate fever, headache, malaise, and fatigue"
    ],
    causes: [
      "Primary infection with Varicella-Zoster Virus (VZV / Human Alphaherpesvirus 3)",
      "Respiratory aerosol droplet transmission from an infected carrier",
      "Direct contact with infectious vesicle fluid",
      "High contagion index in non-immune susceptible populations"
    ],
    precautions: [
      "Maintain strict contact and respiratory isolation until all lesions crust.",
      "Apply soothing calamine lotion and take lukewarm colloidal oatmeal baths.",
      "Trim fingernails short to prevent scratching and secondary staph infection.",
      "NEVER administer Aspirin to children due to the risk of fatal Reye's Syndrome."
    ],
    whenToConsult: "Seek immediate medical care if fever persists >4 days, cough or shortness of breath occurs, rash spreads to the eyes, or surrounding skin turns severely red/swollen.",
    originalImage: createClinicalSVG("chickenpox_viral", false),
    gradcamImage: createClinicalSVG("chickenpox_viral", true)
  }
];

// 3. CONDITIONS DIRECTORY FOR EXPLORATION (8 DATASET CATEGORIES)
export const CONDITIONS_DIRECTORY = [
  {
    id: "acne-rosacea",
    datasetFolder: "Acne And Rosacea Photos",
    title: "Acne & Rosacea",
    type: "Sebaceous & Facial Vascular",
    description: "Acne (cystic, pustular, comedones, scarring) and Rosacea (facial redness, rhinophyma).",
    keySign: "Comedones, facial flushing, pustules, telangiectasia",
    prevalence: "Very Common (Affects >80% adolescents, 10% adults)"
  },
  {
    id: "eczema",
    datasetFolder: "Eczema Photos",
    title: "Eczema / Atopic Dermatitis",
    type: "Inflammatory / Barrier Defect",
    description: "Skin inflammation, dry/scaly patches, and atopic dermatitis with chronic barrier disruption.",
    keySign: "Intense pruritus, erythematous flexural plaques, lichenification",
    prevalence: "Common (15-20% pediatric, 5-10% adult population)"
  },
  {
    id: "fungal-ringworm",
    datasetFolder: "Fu Ringworm",
    title: "Fungal Infection / Ringworm",
    type: "Infectious (Dermatophyte)",
    description: "Dermatophyte fungal infections (Tinea, ringworm, fungal rashes) causing annular scaling.",
    keySign: "Annular active red border, central clearing, fine scaling",
    prevalence: "Very Common (Highly contagious in humid climates)"
  },
  {
    id: "alopecia",
    datasetFolder: "Hair Loss Photos Alopecia And Other Hair Diseases",
    title: "Alopecia & Hair/Scalp Diseases",
    type: "Follicular / Autoimmune",
    description: "Alopecia areata, androgenetic hair loss, and scalp disorders causing localized or diffuse thinning.",
    keySign: "Circumscribed bald patches, exclamation-mark hairs, vertex thinning",
    prevalence: "Common (2% lifetime risk for areata; 50% androgenetic)"
  },
  {
    id: "healthy-skin",
    datasetFolder: "Heathy",
    title: "Healthy Skin (Control)",
    type: "Physiological Control",
    description: "Normal, non-diseased skin serving as clinical negative control with intact epidermal barrier.",
    keySign: "Uniform tone, absence of lesions, balanced elasticity",
    prevalence: "Baseline healthy physiological standard"
  },
  {
    id: "melanoma-moles",
    datasetFolder: "Melanoma Skin Cancer Nevi And Moles",
    title: "Melanoma & Skin Cancer / Moles",
    type: "Neoplastic / Melanocytic",
    description: "Malignant melanoma, melanocytic nevi, and abnormal moles requiring urgent ABCDE triage.",
    keySign: "Asymmetry, irregular notched border, multi-tone color, diameter >6mm",
    prevalence: "Critical clinical priority (Rapidly rising global incidence)"
  },
  {
    id: "vascular-tumors",
    datasetFolder: "Vascular Tumors",
    title: "Vascular Tumors & Lesions",
    type: "Vascular / Angiomatous",
    description: "Hemangiomas, vascular malformations, and blood vessel lesions with compressible lacunae.",
    keySign: "Crimson/violaceous nodular papules, blanching vascular network",
    prevalence: "Common (Infantile hemangiomas in 5% infants; cherry angiomas in >50% adults)"
  },
  {
    id: "chickenpox",
    datasetFolder: "Vi Chickenpox",
    title: "Chickenpox (Viral Infection)",
    type: "Infectious (Viral Exanthem)",
    description: "Varicella zoster viral rash, chickenpox blisters, and eruptions with polymorphic presentation.",
    keySign: "Dewdrops on rose petal vesicles, polymorphic lesions, febrile prodrome",
    prevalence: "Frequent viral exanthem in unvaccinated cohorts"
  }
];

// 4. VERIFIED DERMATOLOGISTS WITH SPECIALTIES MATCHED TO THE 8 CONDITIONS
export const DERMATOLOGISTS = [
  {
    id: "doc-1",
    name: "Dr. Sneha Patil",
    title: "MD, DNB (Dermatology & Venereology)",
    gender: "female",
    experienceYears: 12,
    rating: 4.9,
    reviewsCount: 184,
    clinicName: "Patil Dermacare & Aesthetic Clinic",
    city: "Kolhapur",
    address: "Suite 302, Cyber City Medical Square, Kolhapur",
    distanceKm: 1.2,
    fee: "₹700",
    verified: true,
    availableToday: true,
    nextSlot: "Today, 4:30 PM",
    availableSlots: ["Today 4:30 PM", "Today 5:45 PM", "Tomorrow 10:30 AM", "Tomorrow 2:00 PM"],
    specialties: ["Atopic Eczema", "Acne & Rosacea", "Alopecia & Scalp Disorders", "Dermoscopy"],
    image: "/doctors/doctor-1.jpg"
  },
  {
    id: "doc-2",
    name: "Dr. Rajesh Kulkarni",
    title: "MBBS, MD - Dermatology, FAAD",
    gender: "male",
    experienceYears: 16,
    rating: 4.8,
    reviewsCount: 230,
    clinicName: "Kulkarni Dermacare & Aesthetic Clinic",
    city: "Kolhapur",
    address: "24 Station Road, Near Central Hospital, Kolhapur",
    distanceKm: 2.5,
    fee: "₹800",
    verified: true,
    availableToday: true,
    nextSlot: "Today, 6:15 PM",
    availableSlots: ["Today 6:15 PM", "Tomorrow 11:00 AM", "Tomorrow 3:30 PM"],
    specialties: ["Melanoma & Moles", "Fungal Ringworm", "Vascular Lesions", "Biopsy & Dermatosurgery"],
    image: "/doctors/doctor-2.jpg"
  },
  {
    id: "doc-3",
    name: "Dr. Neha Deshmukh",
    title: "DDVL, Cosmetologist & Trichologist",
    gender: "female",
    experienceYears: 9,
    rating: 4.9,
    reviewsCount: 142,
    clinicName: "GlowMed Clinical Skin Center",
    city: "Pune",
    address: "Lane 7, Koregaon Park, Pune",
    distanceKm: 3.1,
    fee: "₹650",
    verified: true,
    availableToday: false,
    nextSlot: "Tomorrow, 10:00 AM",
    availableSlots: ["Tomorrow 10:00 AM", "Tomorrow 12:30 PM", "Tomorrow 4:00 PM"],
    specialties: ["Alopecia Areata", "Acne & Rosacea", "Chickenpox / Viral Exanthem", "Grad-CAM Review"],
    image: "/doctors/doctor-3.jpg"
  },
  {
    id: "doc-4",
    name: "Dr. Sameer Patil",
    title: "MD Dermatology, Fellowship in Pediatric Dermatology",
    gender: "male",
    experienceYears: 14,
    rating: 4.7,
    reviewsCount: 119,
    clinicName: "Patil Skin & Child Allergy Clinic",
    city: "Kolhapur",
    address: "Opp. Mahavir Garden, Tarabai Park, Kolhapur",
    distanceKm: 4.2,
    fee: "₹750",
    verified: true,
    availableToday: true,
    nextSlot: "Today, 5:00 PM",
    availableSlots: ["Today 5:00 PM", "Tomorrow 10:30 AM", "Tomorrow 5:00 PM"],
    specialties: ["Pediatric Eczema", "Chickenpox & Viral Infections", "Vascular Hemangiomas", "Skin Allergies"],
    image: "/doctors/doctor-4.jpg"
  },
  {
    id: "doc-5",
    name: "Dr. Priya Nair",
    title: "MBBS, DNB, Post-Grad Dermatosurgery",
    gender: "female",
    experienceYears: 11,
    rating: 4.9,
    reviewsCount: 198,
    clinicName: "Nair Dermatology & Skin Surgery",
    city: "Mumbai",
    address: "Bandra West, Hill Road Medical Towers, Mumbai",
    distanceKm: 5.8,
    fee: "₹1,000",
    verified: true,
    availableToday: false,
    nextSlot: "Tomorrow, 2:15 PM",
    availableSlots: ["Tomorrow 2:15 PM", "Tomorrow 4:30 PM"],
    specialties: ["Melanoma Screening", "Vascular Tumors & Malformations", "Mole Excision", "Skin Cancer Triage"],
    image: "/doctors/doctor-5.jpg"
  },
  {
    id: "doc-6",
    name: "Dr. Vikram Joshi",
    title: "MD, Senior Consultant Dermatologist",
    gender: "male",
    experienceYears: 19,
    rating: 4.8,
    reviewsCount: 310,
    clinicName: "City Skin & Immune Disorders Center",
    city: "Pune",
    address: "FC Road, Shivajinagar, Pune",
    distanceKm: 6.4,
    fee: "₹850",
    verified: true,
    availableToday: true,
    nextSlot: "Today, 7:00 PM",
    availableSlots: ["Today 7:00 PM", "Tomorrow 11:30 AM"],
    specialties: ["Fungal Ringworm", "Atopic Dermatitis", "Severe Acne & Rosacea", "Alopecia Biologics"],
    image: "/doctors/doctor-6.jpg"
  }
];

// 5. PROJECT TEAM & GUIDE
export const TEAM_MEMBERS = [
  {
    name: "Irtika Faras",
    rollNo: "23",
    role: "AI / Deep Learning Researcher & Data Pipeline",
    badge: "Roll No. 23"
  },
  {
    name: "Maliha Mulla",
    rollNo: "49",
    role: "Computer Vision & Grad-CAM Explainability Lead",
    badge: "Roll No. 49"
  },
  {
    name: "Sanika Shendure",
    rollNo: "80",
    role: "Full-Stack System Architect & Integration Specialist",
    badge: "Roll No. 80"
  }
];

export const PROJECT_GUIDE = {
  name: "Prof. Rohit Nalavde",
  designation: "Project Guide & Department Mentor",
  institution: "Department of Computer Science & Engineering"
};

// 6. CLINICAL FAQ
export const FAQ_ITEMS = [
  {
    q: "Which specific diseases does DermaAI detect from the balanced dataset?",
    a: "DermaAI is trained on the balanced dataset covering 8 distinct clinical classes: (1) Acne & Rosacea, (2) Eczema / Atopic Dermatitis, (3) Fungal Infection / Ringworm, (4) Alopecia & Hair/Scalp Diseases, (5) Healthy Skin (Control), (6) Melanoma & Skin Cancer / Moles, (7) Vascular Tumors & Lesions, and (8) Chickenpox (Viral Infection)."
  },
  {
    q: "How does the Firebase Database integration work in this project?",
    a: "DermaAI connects with Google Cloud Firebase (Project ID: skin-disease-detection-59480). It utilizes Firebase Authentication for secure multi-role sessions (Patients and Doctors), Cloud Firestore for storing disease metadata, scan analysis history, appointments, and prescriptions, and Realtime Database for live clinician dashboard sync."
  },
  {
    q: "What is Grad-CAM and why is it crucial for clinical trust?",
    a: "Grad-CAM (Gradient-weighted Class Activation Mapping) produces visual heatmaps that highlight the exact pixel regions in the lesion image that contributed to the neural network's classification. Patients and doctors can instantly verify whether the AI focused on the actual dermatological lesion or irrelevant background artifacts."
  },
  {
    q: "How does the Smart Dermatologist Matching algorithm work?",
    a: "DermaAI calculates proximity scores between the user's location and verified dermatologists, while applying patient preferences such as preferred doctor gender (Female / Male / Any) and immediate slot availability for today or tomorrow."
  },
  {
    q: "Can I use DermaAI via WhatsApp without installing an app?",
    a: "Yes! DermaAI is built with multi-channel access in mind. Users can send their skin image directly to our WhatsApp service to receive instant preliminary triage, Grad-CAM summary, and nearby doctor booking links directly in chat."
  },
  {
    q: "Is DermaAI an official medical diagnosis?",
    a: "No. DermaAI is an AI-powered clinical screening, triage, and monitoring assistant. It is designed to assist early detection and facilitate prompt consultation with certified dermatologists, but does not replace formal laboratory biopsies or physician examinations."
  }
];
