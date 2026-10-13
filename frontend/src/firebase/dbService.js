// DermaAI Firebase Database Service
// Cloud Firestore & Realtime Database sync for dataset and clinical records

import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { ref, set, get, child } from "firebase/database";
import { db, rtdb } from "./firebaseConfig";

// 1. EXACT 8 Balanced Dataset Classes defined in project specifications
export const BALANCED_DATASET_CLASSES = [
  {
    id: "acne-rosacea",
    folderName: "Acne And Rosacea Photos",
    name: "Acne & Rosacea",
    shortName: "Acne & Rosacea",
    category: "Sebaceous & Facial Vascular",
    description: "Acne (cystic, pustular, comedones, scarring) and Rosacea (facial redness, rhinophyma)",
    urgency: "Low - Moderate",
    urgencyColor: "amber",
    avgConfidence: 95.8,
    icd11: "ED80 / ED90",
    symptoms: [
      "Comedones (blackheads and whiteheads) and inflammatory pustules",
      "Persistent central facial flushing and erythema (cheeks, nose, forehead)",
      "Visible broken micro-vessels (telangiectasia)",
      "Facial stinging, sensitivity, and swelling (rhinophyma risk)"
    ],
    causes: [
      "Pilosebaceous unit hyperkeratinization and sebum excess",
      "Cutibacterium acnes follicular bacterial proliferation",
      "Neurovascular hyper-reactivity and Demodex mite response",
      "UV radiation, thermal shifts, spicy foods, and emotional stress"
    ],
    precautions: [
      "Cleanse twice daily using a gentle non-comedogenic salicylic acid / syndet wash.",
      "Apply broad-spectrum mineral SPF 50+ sunscreen daily without fragrance.",
      "Avoid abrasive scrubs, chemical exfoliants >10%, and extreme hot baths.",
      "Never pick or extract pustules to avoid permanent pitted scarring."
    ],
    whenToConsult: "Consult a certified dermatologist if painful deep nodulocystic lesions arise, facial redness remains permanent, or burning ocular discomfort occurs."
  },
  {
    id: "eczema",
    folderName: "Eczema Photos",
    name: "Eczema / Atopic Dermatitis",
    shortName: "Eczema",
    category: "Inflammatory / Barrier Defect",
    description: "Skin inflammation, dry/scaly patches, and atopic dermatitis",
    urgency: "Moderate",
    urgencyColor: "amber",
    avgConfidence: 94.2,
    icd11: "EA80",
    symptoms: [
      "Intense pruritus (itching) that sharply worsens at night",
      "Erythematous, cracked, and excoriated patches on skin flexures",
      "Small raised vesicles that may weep exudate when scratched",
      "Lichenification (thickened, leathery skin plaques) from chronic rubbing"
    ],
    causes: [
      "Epidermal Filaggrin (FLG) gene mutations disrupting skin barrier",
      "Immune TH2 over-activation triggered by environmental allergens",
      "Harsh surfactants, synthetic detergents, and dry indoor climates",
      "Staphylococcus aureus microbial colonization of barrier cracks"
    ],
    precautions: [
      "Apply thick ceramide or petrolatum emollient within 3 minutes of bathing.",
      "Take short lukewarm showers (<10 minutes) avoiding hot water.",
      "Wear 100% breathable organic cotton and avoid wool or polyester.",
      "Maintain 45–55% home humidity using an ultrasonic humidifier."
    ],
    whenToConsult: "Seek clinical consultation if plaques exhibit honey-colored weeping crusts (secondary impetigo), or pruritus prohibits restorative sleep."
  },
  {
    id: "fungal-ringworm",
    folderName: "Fu Ringworm",
    name: "Fungal Infection / Ringworm",
    shortName: "Fungal Ringworm",
    category: "Infectious / Dermatophyte",
    description: "Dermatophyte fungal infections (Tinea, ringworm, fungal rashes)",
    urgency: "Moderate",
    urgencyColor: "amber",
    avgConfidence: 91.4,
    icd11: "1F28",
    symptoms: [
      "Annular (ring-shaped) erythematous rash with raised, active borders",
      "Central clearing giving classic 'target' or expanding ring appearance",
      "Peripheral scaling, fine vesicles, and localized burning pruritus",
      "Well-demarcated boundary separating infected lesion from healthy skin"
    ],
    causes: [
      "Dermatophyte fungi invasion (Trichophyton, Microsporum, Epidermophyton)",
      "Direct skin-to-skin transmission from infected humans or household pets",
      "Fomite exposure via damp locker rooms, gym mats, and shared towels",
      "High ambient humidity and excessive perspiration facilitating spore growth"
    ],
    precautions: [
      "Keep affected cutaneous areas meticulously dry and ventilated.",
      "Wash clothing, towels, and bed linens in hot water (>60°C).",
      "Do NOT share personal sports gear, hairbrushes, or clothing.",
      "Apply topical antifungal 2cm beyond visible edge of the rash."
    ],
    whenToConsult: "Consult a physician if rash spreads despite 2 weeks of topical OTC antifungals, affects scalp hair follicles (Tinea Capitis), or patient has diabetes."
  },
  {
    id: "alopecia",
    folderName: "Hair Loss Photos Alopecia And Other Hair Diseases",
    name: "Alopecia & Hair/Scalp Diseases",
    shortName: "Alopecia & Scalp",
    category: "Follicular / Autoimmune",
    description: "Alopecia areata, androgenetic hair loss, and scalp disorders",
    urgency: "Low - Moderate",
    urgencyColor: "amber",
    avgConfidence: 92.6,
    icd11: "ED70 / ED71",
    symptoms: [
      "Circumscribed, smooth, coin-shaped bald patches on scalp (Alopecia Areata)",
      "Progressive thinning at vertex or bitemporal hair recession (Androgenetic)",
      "Microscopic 'exclamation point hairs' along active expansion borders",
      "Scalp erythema, scaling, or burning in cicatricial inflammatory cases"
    ],
    causes: [
      "Autoimmune T-cell attack on anagen hair follicle immunoprivilege",
      "Genetic follicular sensitivity to Dihydrotestosterone (DHT)",
      "Severe acute physiological or emotional stress (Telogen Effluvium)",
      "Nutritional deficits (Serum ferritin, Vitamin D, Zinc deficiency)"
    ],
    precautions: [
      "Avoid tight traction hairstyles (cornrows, high buns) that pull roots.",
      "Use sulfate-free, pH-balanced hair cleansers; limit heat styling tools.",
      "Maintain a balanced diet rich in bioavailable protein, iron, and zinc.",
      "Manage systemic stress with mindfulness and adequate sleep hygiene."
    ],
    whenToConsult: "Consult a trichologist or dermatologist if hair sheds in large clumps, scalp hurts or scars, or rapid total hair loss occurs."
  },
  {
    id: "healthy-skin",
    folderName: "Heathy",
    name: "Healthy Skin (Control)",
    shortName: "Healthy Skin",
    category: "Physiological Control",
    description: "Normal, non-diseased skin",
    urgency: "Normal / Routine Care",
    urgencyColor: "emerald",
    avgConfidence: 98.4,
    icd11: "Normal Physiological Variant",
    symptoms: [
      "Uniform cutaneous tone and intact stratum corneum barrier",
      "Absence of erythema, induration, scaling, or irregular pigmentation",
      "Normal physiological pore distribution and baseline hydration",
      "Balanced cutaneous microbiome and elasticity"
    ],
    causes: [
      "Healthy intact epidermal barrier and regulated stratum corneum turnover",
      "Optimal balance of cutaneous lipids and Natural Moisturizing Factors (NMF)",
      "Adequate photoprotection and cellular antioxidant defense"
    ],
    precautions: [
      "Apply broad-spectrum SPF 30+ or SPF 50+ sunscreen daily before UV exposure.",
      "Maintain daily hydration with a light, ceramide-based moisturizer.",
      "Perform monthly self-checks using the ABCDE dermatological guidelines.",
      "Schedule a routine annual skin screening with a certified dermatologist."
    ],
    whenToConsult: "Schedule standard preventive annual skin examinations or consult if any new, rapidly morphing, or bleeding spot appears."
  },
  {
    id: "melanoma-moles",
    folderName: "Melanoma Skin Cancer Nevi And Moles",
    name: "Melanoma & Skin Cancer / Moles",
    shortName: "Melanoma & Moles",
    category: "Neoplastic / Melanocytic",
    description: "Malignant melanoma, melanocytic nevi, and abnormal moles",
    urgency: "High / Urgent",
    urgencyColor: "red",
    avgConfidence: 93.9,
    icd11: "2C30 / 2B90",
    symptoms: [
      "Asymmetry: Two halves of the pigmented lesion do not match",
      "Border Irregularity: Edges are scalloped, notched, or poorly defined",
      "Color Variegation: Shades of brown, black, red, white, or slate-blue",
      "Diameter: Greater than 6 mm (pencil eraser size) or rapidly enlarging",
      "Evolving: Noticeable changes in size, shape, surface elevation, or bleeding"
    ],
    causes: [
      "Intermittent intense ultraviolet (UV) radiation causing DNA pyrimidine dimers",
      "High total count of dysplastic (atypical) melanocytic nevi",
      "Genetic mutations in CDKN2A, CDK4, or somatic BRAF V600E oncogenes",
      "Fitzpatrick phototype I or II with propensity to sunburn rather than tan"
    ],
    precautions: [
      "DO NOT pick, scratch, or attempt chemical peel removal at home.",
      "Avoid all ultraviolet tanning beds and direct peak sunlight (10 AM – 4 PM).",
      "Document high-resolution photos with a millimeter calibration ruler.",
      "Wear certified UPF 50+ clothing and broad-spectrum mineral sunscreen."
    ],
    whenToConsult: "CRITICAL: Urgent dermatological biopsy and dermoscopic assessment is strongly recommended within 48 to 72 hours."
  },
  {
    id: "vascular-tumors",
    folderName: "Vascular Tumors",
    name: "Vascular Tumors & Lesions",
    shortName: "Vascular Lesions",
    category: "Vascular / Angiomatous",
    description: "Hemangiomas, vascular malformations, and blood vessel lesions",
    urgency: "Moderate",
    urgencyColor: "amber",
    avgConfidence: 92.1,
    icd11: "2E81 / LA90",
    symptoms: [
      "Bright crimson, scarlet, or violaceous macules, papules, or nodules",
      "Compressible vascular lacunae (strawberry hemangioma, cherry angioma)",
      "Blanching response under diascopy (pressure glass slide)",
      "Pulsatile or elevated capillary ectasia that may bleed on slight trauma"
    ],
    causes: [
      "Clonal endothelial cell proliferation (e.g., GLUT-1 positive infantile hemangiomas)",
      "Somatic mosaic mutations in angiogenesis pathways (GNAQ, PIK3CA)",
      "Age-related dermal capillary dilation (Campbell de Morgan / Cherry angiomas)",
      "Trauma-induced capillary proliferation (Pyogenic granuloma)"
    ],
    precautions: [
      "Shield the lesion against accidental mechanical trauma, friction, or shaving.",
      "Do NOT attempt home needle drainage or caustic topical acids.",
      "If bleeding occurs, apply steady, direct pressure with sterile gauze for 10 minutes.",
      "Keep skin hydrated to prevent surface micro-fissuring."
    ],
    whenToConsult: "Consult a specialist if lesion rapidly accelerates in size, bleeds frequently, ulcerates, or impinges on periorbital or respiratory structures."
  },
  {
    id: "chickenpox",
    folderName: "Vi Chickenpox",
    name: "Chickenpox (Viral Infection)",
    shortName: "Chickenpox (Viral)",
    category: "Infectious / Viral Exanthem",
    description: "Varicella zoster viral rash, chickenpox blisters, and eruptions",
    urgency: "Moderate - High",
    urgencyColor: "red",
    avgConfidence: 94.7,
    icd11: "1E90",
    symptoms: [
      "Successive crops of intensely pruritic 'dewdrops on rose petal' vesicles",
      "Rapid progression: macules -> papules -> clear vesicles -> umbilicated pustules -> crusts",
      "Polymorphic presentation (all lesion stages visible concurrently)",
      "Systemic prodrome: Moderate to high pyrexia (fever), malaise, headache, anorexia"
    ],
    causes: [
      "Primary infection by Varicella-Zoster Virus (VZV / Human Alphaherpesvirus 3)",
      "Airborne respiratory droplet inhalation from an infected individual",
      "Direct cutaneous contact with infectious vesicular fluid",
      "High contagion rate in non-immunized susceptible hosts"
    ],
    precautions: [
      "Strict contact and respiratory isolation until ALL lesions have completely crusted.",
      "Apply soothing calamine lotion and take lukewarm colloidal oatmeal baths.",
      "Trim fingernails short to prevent excoriation and secondary staphylococcal cellulitis.",
      "NEVER administer Aspirin to febrile children (risk of fatal Reye's Syndrome)."
    ],
    whenToConsult: "Seek urgent medical care if patient develops persistent high fever (>4 days), dyspnea, persistent vomiting, or if blisters appear infected with spreading redness."
  }
];

// Helper: Sync the 8 dataset classes to Firestore and Realtime Database
export async function syncDiseasesToFirebase() {
  try {
    // 1. Sync to Cloud Firestore
    for (const item of BALANCED_DATASET_CLASSES) {
      const diseaseRef = doc(db, "diseases", item.id);
      await setDoc(diseaseRef, {
        ...item,
        datasetSource: "balanced_dataset",
        lastUpdated: serverTimestamp()
      }, { merge: true });
    }

    // 2. Sync to Realtime Database
    try {
      const rtdbRef = ref(rtdb, "dataset_diseases");
      await set(rtdbRef, BALANCED_DATASET_CLASSES);
    } catch (e) {
      console.warn("RTDB sync non-blocking warning:", e.message);
    }

    return { success: true, count: BALANCED_DATASET_CLASSES.length };
  } catch (error) {
    console.warn("Firebase diseases sync fallback (offline/sandboxed):", error.message);
    return { success: false, error: error.message, count: BALANCED_DATASET_CLASSES.length };
  }
}

// 2. Scans & AI Analysis Results Persistence
export async function saveScanResultToFirebase(scanData) {
  try {
    const scanPayload = {
      ...scanData,
      createdAt: serverTimestamp(),
      savedAt: new Date().toISOString()
    };
    
    // Add to Firestore
    const docRef = await addDoc(collection(db, "scans"), scanPayload);
    
    // Also mirror to user scans subcollection if userId provided
    if (scanData.userId) {
      await setDoc(doc(db, "users", scanData.userId, "history", docRef.id), scanPayload);
    }
    
    return { success: true, id: docRef.id };
  } catch (err) {
    console.warn("Save scan to Firebase fallback to local storage:", err.message);
    const localId = `scan-loc-${Date.now()}`;
    const localList = JSON.parse(localStorage.getItem('dermaai_scans') || '[]');
    localList.unshift({ id: localId, ...scanData, createdAt: new Date().toISOString() });
    localStorage.setItem('dermaai_scans', JSON.stringify(localList.slice(0, 50)));
    return { success: true, id: localId, local: true };
  }
}

export async function fetchUserScansFromFirebase(userId) {
  try {
    if (!userId) return [];
    const q = query(
      collection(db, "scans"), 
      where("userId", "==", userId), 
      orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    const scans = [];
    snap.forEach(d => scans.push({ id: d.id, ...d.data() }));
    return scans;
  } catch (err) {
    console.warn("Fetch scans fallback to local storage:", err.message);
    const local = JSON.parse(localStorage.getItem('dermaai_scans') || '[]');
    return local;
  }
}

// 3. Appointments Persistence
export async function bookAppointmentInFirebase(appointmentData) {
  try {
    const aptPayload = {
      ...appointmentData,
      status: appointmentData.status || "Confirmed",
      createdAt: serverTimestamp(),
      updatedAt: new Date().toISOString()
    };
    const docRef = await addDoc(collection(db, "appointments"), aptPayload);
    
    // Also save in RTDB for real-time doctor live update
    try {
      await set(ref(rtdb, `appointments/${docRef.id}`), aptPayload);
    } catch (e) {
      // non-blocking
    }
    
    return { success: true, id: docRef.id };
  } catch (err) {
    console.warn("Book appointment fallback to local storage:", err.message);
    const localId = `apt-loc-${Date.now()}`;
    const localApts = JSON.parse(localStorage.getItem('dermaai_appointments') || '[]');
    localApts.unshift({ id: localId, ...appointmentData, createdAt: new Date().toISOString() });
    localStorage.setItem('dermaai_appointments', JSON.stringify(localApts));
    return { success: true, id: localId, local: true };
  }
}

export async function fetchAppointmentsFromFirebase(filter = {}) {
  try {
    let q = collection(db, "appointments");
    if (filter.patientId) {
      q = query(q, where("patientId", "==", filter.patientId));
    } else if (filter.doctorId) {
      q = query(q, where("doctorId", "==", filter.doctorId));
    }
    const snap = await getDocs(q);
    const list = [];
    snap.forEach(d => list.push({ id: d.id, ...d.data() }));
    return list;
  } catch (err) {
    console.warn("Fetch appointments fallback to local storage:", err.message);
    return JSON.parse(localStorage.getItem('dermaai_appointments') || '[]');
  }
}

// 4. Prescriptions Persistence
export async function savePrescriptionInFirebase(prescriptionData) {
  try {
    const rxPayload = {
      ...prescriptionData,
      issuedAt: serverTimestamp(),
      savedAt: new Date().toISOString()
    };
    const docRef = await addDoc(collection(db, "prescriptions"), rxPayload);
    return { success: true, id: docRef.id };
  } catch (err) {
    console.warn("Save rx fallback to local storage:", err.message);
    const localId = `rx-loc-${Date.now()}`;
    const localRx = JSON.parse(localStorage.getItem('dermaai_prescriptions') || '[]');
    localRx.unshift({ id: localId, ...prescriptionData, savedAt: new Date().toISOString() });
    localStorage.setItem('dermaai_prescriptions', JSON.stringify(localRx));
    return { success: true, id: localId, local: true };
  }
}
