let selectedCompounds = [];
let activeSelection = 'combo'; // 'a', 'combo', 'b'

const specialButtons = [
    {
        key: "test_compound",
        label: "Wanna test your compound?",
        route: "test"
    }
];

function normalizeKey(k) {
    return (k || '').trim().toLowerCase().replace(/\s+/g, '_');
}

function comboKey(a, b) {
    return [a, b]
        .map(normalizeKey)
        .sort()
        .join('_');
}

function buildButtons() {
    const list = document.getElementById('compounds-list');
    list.innerHTML = '';
    Object.keys(compounds).forEach(key => {     //compounds button
        const btn = document.createElement('button');
        btn.type = "button";
        btn.textContent = compounds[key].label;
        btn.className = 'compound-btn';
        btn.onclick = () => handleCompoundSelection(key, btn);
        list.appendChild(btn);
    });
}

function renderSpecialButton() {
    const container = document.getElementById("test-compound-container");
    if (!container) return;

    container.innerHTML = "";

    const item = specialButtons[0];

    const btn = document.createElement("button");
    btn.textContent = item.label;
    btn.className = "compound-btn special-btn";
    btn.onclick = () => handleSpecialRoute(item.route);

    container.appendChild(btn);
}

// test your compound button route handler
function handleSpecialRoute(route) {
    console.log("route:", route);

    if (route !== "test") return;

    selectedCompounds = [];
    activeSelection = 'combo';

    updateActiveButtons();

    // ocultar resultados
    const panels = document.getElementById("panels");
    if (panels) panels.style.display = "none";

    // intro video
    const videoDiv = document.querySelector(".intro-video");
    if (videoDiv) videoDiv.style.display = "none";

    const section = document.getElementById("contact-section");

    if (!section) {
        console.error("contact-section NOT FOUND in DOM");
        return;
    }

    section.style.display = "block";

    setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth" });
    }, 50);
}

function handleCompoundSelection(key, button) {
    resetPart4();
    document.getElementById("contact-section").style.display = "none";
    const idx = selectedCompounds.indexOf(key);

    if (idx !== -1) {
        selectedCompounds.splice(idx, 1);
    } else {
        if (selectedCompounds.length === 2) {
            selectedCompounds = [key];
        } else {
            selectedCompounds.push(key);
        }
    }

    isOptimalMode = false;

    updateActiveButtons();
    renderSelected();
}

function updateActiveButtons() {
    document.querySelectorAll('.compound-btn').forEach(btn => {
        const key = Object.keys(compounds).find(k =>
            normalizeKey(compounds[k].label) === normalizeKey(btn.textContent)
        );
        if (key && selectedCompounds.includes(key)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function renderSelected() {
    if (selectedCompounds.length === 0) {
        document.getElementById('panels').style.display = 'none';
        return;
    }

    // Ocultar hint y video al hacer click
    const videoDiv = document.querySelector('.intro-video');
    const videoEl = videoDiv ? videoDiv.querySelector('video') : null;
    if (videoEl) {
        videoEl.pause();              // Detiene el video
        videoEl.currentTime = 0;      // Opcional: reinicia al principio
        videoDiv.style.display = 'none'; // Oculta el contenedor del video
    }

    // Ocultamos los paneles hasta que termine la animación
    document.getElementById('panels').style.display = 'none';
    document.querySelector('footer.site-footer').style.display = 'none';

    if (selectedCompounds.length === 1) {
        activeSelection = 'combo'; // for single, it's the compound
        runTestingAnimation(() => {
            document.getElementById('panels').style.display = 'block';
            document.querySelector('footer.site-footer').style.display = 'block';
            renderCompound(selectedCompounds[0]);
        });
        return;
    }

    activeSelection = 'combo'; // default to combination
    runTestingAnimation(() => {
        document.getElementById('panels').style.display = 'block';
        document.querySelector('footer.site-footer').style.display = 'block';
        renderCombination(selectedCompounds[0], selectedCompounds[1]);
    });
}

function runTestingAnimation(callback) {
    const animationDiv = document.getElementById('testing-animation');
    if (!animationDiv) return callback();

    const textDiv = animationDiv.querySelector('.testing-text');
    const images = Array.from(animationDiv.querySelectorAll('.testing-image'));
    if (images.length === 0) return callback();

    const image = images[0];

    const testingPhrases = [
        "Testing this compound based on 24 endpoints of ageing",
        "Analyzing effects on metabolism",
        "Examining stem cell activity",
        "Evaluating ECM remodeling",
        "Measuring mitochondrial health",
        "Tracking inflamm-aging markers",
        "Observing neural communication"
    ];

    const firstPhrase = testingPhrases[0];
    const restPhrases = testingPhrases
        .slice(1)
        .sort(() => Math.random() - 0.5)
        .slice(0, 1);
    const allPhrases = [firstPhrase, ...restPhrases];

    const imageFiles = [
        "img/pipette.png",
        "img/brown_models.png",
        "img/exadex_adipose.png",
        "img/exadex_vascularized.png"
    ];

    imageFiles.forEach(src => {
        const imgPreload = new Image();
        imgPreload.src = src;
    });

    const startIndex = Math.floor(Math.random() * imageFiles.length);
    const orderedImages = imageFiles.slice(startIndex).concat(imageFiles.slice(0, startIndex));

    animationDiv.style.display = 'flex';

    let i = 0;
    let imageIndex = 0;

    function showNext() {
        image.style.opacity = 0;
        setTimeout(() => {
            textDiv.textContent = allPhrases[i];
            image.src = orderedImages[imageIndex];
            image.onload = () => { image.style.opacity = 1; };
            i++;
            imageIndex = (imageIndex + 1) % orderedImages.length;
        }, 500);
    }

    textDiv.textContent = allPhrases[i];
    image.src = orderedImages[imageIndex];
    image.onload = () => { image.style.opacity = 1; };
    i++;
    imageIndex = (imageIndex + 1) % orderedImages.length;

    const interval = setInterval(() => {
        if (i >= allPhrases.length) {
            clearInterval(interval);
            setTimeout(() => {
                animationDiv.style.display = 'none';
                callback();
            }, 500);
            return;
        }
        showNext();
    }, 2000);
}

function combineMaps(mapA = {}, mapB = {}) {
    const result = {};
    const keys = new Set([...Object.keys(mapA), ...Object.keys(mapB)]);

    for (const key of keys) {
        const a = mapA[key] ?? 0;
        const b = mapB[key] ?? 0;
        result[key] = (a + b) / 2;
    }

    return result;
}

function renderCombination(keyA, keyB) {
    const comboKey = `${keyA}_${keyB}`;
    const comboKeyReverse = `${keyB}_${keyA}`;
    const combo = combinationTemplates[comboKey] || combinationTemplates[comboKeyReverse];

    let comboDatas, comboLabel;
    if (combo && combo.datas && combo.datas.antiAging !== null) {
        comboLabel = combo.label;
        comboDatas = combo.datas;
    } else {
        const dataA = compounds[keyA].datas;
        const dataB = compounds[keyB].datas;
        comboLabel = `${compounds[keyA].label} + ${compounds[keyB].label}`;
        comboDatas = {
            heat: combineMaps(dataA.heat, dataB.heat),

            score: combineMaps(dataA.score || {}, dataB.score || {}),

            antiAging: (dataA.antiAging + dataB.antiAging) / 2,
            ageGain: (dataA.ageGain + dataB.ageGain) / 2,

            radar: combineMaps(dataA.radar || {}, dataB.radar || {}),
        };
    }

    // Show all three cards
    document.getElementById('score-card-a').style.display = 'block';
    document.getElementById('score-card-b').style.display = 'block';
    document.getElementById('score-card-combo').style.display = 'block';

    // Render data for each
    renderCompoundFromData(compounds[keyA].label, compounds[keyA].datas, 'a');
    renderCompoundFromData(comboLabel, comboDatas, 'combo');
    renderCompoundFromData(compounds[keyB].label, compounds[keyB].datas, 'b');

    // Set up click handlers
    document.getElementById('score-card-a').onclick = () => setActiveSelection('a');
    document.getElementById('score-card-b').onclick = () => setActiveSelection('b');
    document.getElementById('score-card-combo').onclick = () => setActiveSelection('combo');

    // Hide optimal graph
    resetPart4();

    // Update active classes
    updateActiveCardClasses();
}

function setActiveSelection(selection) {
    activeSelection = selection;
    updateActiveCardClasses();
    // Re-render heatmap and radar based on active selection
    if (selectedCompounds.length === 1) {
        const { datas } = compounds[selectedCompounds[0]];
        renderAll(datas);
    } else if (selectedCompounds.length === 2) {
        const keyA = selectedCompounds[0];
        const keyB = selectedCompounds[1];
        let datas, label;
        if (activeSelection === 'a') {
            datas = compounds[keyA].datas;
            label = compounds[keyA].label;
        } else if (activeSelection === 'b') {
            datas = compounds[keyB].datas;
            label = compounds[keyB].label;
        } else {
            // combo
            const comboKey = `${keyA}_${keyB}`;
            const comboKeyReverse = `${keyB}_${keyA}`;
            const combo = combinationTemplates[comboKey] || combinationTemplates[comboKeyReverse];
            if (combo && combo.datas) {
                datas = combo.datas;
                label = combo.label;
            } else {
                const dataA = compounds[keyA].datas;
                const dataB = compounds[keyB].datas;
                datas = {
                    heat: combineMaps(dataA.heat, dataB.heat),
                    radar: combineMaps(dataA.radar, dataB.radar),
                    antiAging: (dataA.antiAging + dataB.antiAging) / 2,
                    ageGain: (dataA.ageGain + dataB.ageGain) / 2
                };
                label = `${compounds[keyA].label} + ${compounds[keyB].label}`;
            }
        }
        renderAll(datas);
        isOptimalMode = false;
    }
}

function updateActiveCardClasses() {
    const cards = ['a', 'combo', 'b'];
    cards.forEach(card => {
        const el = document.getElementById(`score-card-${card}`);
        if (el) {
            if (card === activeSelection) {
                el.classList.remove('inactive');
                el.classList.add('active');
            } else {
                el.classList.remove('active');
                el.classList.add('inactive');
            }
        }
    });
}

function renderCompoundFromData(label, datas, suffix = '') {
    const nameEl = document.getElementById(`compound-name${suffix ? '-' + suffix : ''}`);
    const scoreEl = document.getElementById(`score-value${suffix ? '-' + suffix : ''}`);
    const ageEl = document.getElementById(`age-value${suffix ? '-' + suffix : ''}`);

    if (nameEl) nameEl.textContent = label;

    if (scoreEl) {
        const s = datas.antiAging ?? 0;
        const sign = s >= 0 ? '+' : '';
        scoreEl.textContent = `${sign}${s.toFixed(2)}`;
        scoreEl.style.color = getScoreColor(s);
    }

    if (ageEl) {
        const ag = datas.ageGain ?? 0;

        const label = ag >= 0 ? 'years younger' : 'years older';
        const absValue = Math.abs(ag);

        ageEl.textContent = `${absValue.toFixed(1)} ${label}`;

        ageEl.style.color = ag >= 0 ? '#4CB292' : '#993C1E';
    }

    // Only render heatmap and radar if this is the active selection
    if (suffix === '' || suffix === activeSelection) {
        renderAll(datas);
    }
}

function getScoreColor(score) {
    if (score > 0.263) return '#4CB292';
    if (score < -0.322) return '#993C1E';
    return '#999999';
}

function heatmapColor(v) {
    // 🟡 NEUTRAL ZONE (±20% variation in log2FC)
    if (v >= -0.322 && v <= 0.263) return '#e5e7eb';

    // 🔥 POSITIVE SIDE
    if (v >= 0.807) return '#00ad76';   // ≥ +75%
    if (v >= 0.585) return '#52c09d';   // ≥ +50%
    if (v > 0.263)  return '#8edac2';   // +20% to +50%

    // 🔴 NEGATIVE SIDE
    if (v <= -0.322 && v > -1.0) return '#dd937c';
    if (v <= -1.0 && v > -2.0) return '#d17759';
    return '#993C1E';
}

function scoreColor(v) {
    if (v >= 75) return '#00ad76';
    if (v >= 50) return '#52c09d';
    if (v > 20) return '#8edac2';
    if (v >= -20 && v <= 20) return '#e5e7eb';
    if (v >= -50) return '#dd937c';
    if (v >= -75) return '#d17759';
    return '#993C1E';
}

function getTextColor(bgColor) {
    let r, g, b;

    if (bgColor.startsWith('#')) {
        const hex = bgColor.replace('#', '');
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    } 
    else {
        const rgb = bgColor.match(/\d+/g);
        if (!rgb) return '#000000';
        r = parseInt(rgb[0]);
        g = parseInt(rgb[1]);
        b = parseInt(rgb[2]);
    }

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 160 ? '#000000' : '#ffffff';
}

// Mapa de colores
const colorMap = {
    optimal: '#4CAF50', // verde
    borderline: '#FFEB3B', // amarillo
    caution: '#FF9800', // naranja
    critical: '#F44336', // rojo
    empty: '#E0E0E0' // gris claro
};

let isOptimalMode = false; // fuera de cualquier función, al inicio de tu script

function getBestCombination(selectedCompound) {
    // asegurarnos de que es un string
    if (Array.isArray(selectedCompound)) selectedCompound = selectedCompound[0];
    
    let bestCombo = null;
    let maxOptimalCount = -1; // número de valores >= 75%

    // recorremos todas las combinaciones
    for (const comboKey in combinationTemplates) {
        const comboParts = comboKey.split('_').map(normalizeKey);
        const selected = normalizeKey(selectedCompound);

        // ahora sí consistente
        if (!comboParts.includes(selected)) continue;

        const combo = combinationTemplates[comboKey];
        const score = combo.datas.score;
        if (!score) continue;

        // contar cuántos valores >= 75%
        const optimalCount = Object.values(score)
            .filter(v => v !== null && v !== undefined && Math.abs(v) >= 75)
            .length;

        if (optimalCount > maxOptimalCount) {
            maxOptimalCount = optimalCount;
            bestCombo = combo;
        }
    }

    // si no encontró ninguna combinación, devolver solo el compuesto
    if (!bestCombo) {
        return { datas: { score: compounds[selectedCompound] || {} }, label: selectedCompound };
    }

    return bestCombo;
}

function resetPart4() {
    const part4 = document.querySelector('.results-part.part-4');
    const graphBlock = document.getElementById('optimal-graph-block');
    const buttonContainer = document.getElementById('optimal-button-container');
    const labelContainer = document.getElementById('optimal-graph-label');

    // 🔴 ocultar TODO el bloque 4 entero
    if (part4) part4.style.display = 'none';

    if (graphBlock) graphBlock.innerHTML = '';
    if (buttonContainer) buttonContainer.innerHTML = '';
    if (labelContainer) labelContainer.textContent = '';

    isOptimalMode = false;
}

const pathwayVideoMap = {
    "Cell-ECM communication": "videos/cellECMcomm.mp4",
    "Chronic inflammation": "videos/inflammaging.mp4",
    "Nutrient-sensing": "videos/metabolism.mp4",
    "Mitochondrial function": "videos/mitochondria.mp4",
    "Vascular/Lymphatic Flow": "videos/vascular.mp4",
    "Stem cell activation": "videos/stemcell.mp4",
    "Neural communication": "videos/neuralcomm.mp4"
};

function renderTopBiologicalSignals(datas) {
    const container = document.getElementById("bio-videos-container");
    if (!container) return;

    const score = datas?.score || datas?.heat;
    if (!score) {
        container.innerHTML = "";
        return;
    }

    const filteredEntries = Object.entries(score)
        .filter(([key]) => pathwayVideoMap[key]) // 👈 SOLO LOS QUE TIENEN VIDEO
        .map(([key, value]) => ({
            key,
            value: value ?? -999
        }));

    const top2 = filteredEntries
        .sort((a, b) => b.value - a.value)
        .slice(0, 2);

    container.innerHTML = top2.map(item => {
        const video = pathwayVideoMap[item.key];

        return `
            <div class="bio-video-card">
                <video class="bio-video" autoplay muted loop playsinline>
                    <source src="${video}" type="video/mp4">
                </video>
                <a 
                    href="https://exadex-innov.com/exadex-platform/" 
                    target="_blank" 
                    class="bio-video-title"
                >
                    ${item.key}
                </a>
            </div>
        `;
    }).join("");
}

function safeGet(id) {
    return document.getElementById(id);
}

function initCommon() {
    const list = safeGet('compounds-list');

    if (list) {
        buildButtons();
    }

    renderSpecialButton();
}

document.addEventListener("DOMContentLoaded", initCommon);

console.log("common.js loaded");