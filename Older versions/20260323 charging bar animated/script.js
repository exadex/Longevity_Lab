const compartments = ['Metabolism', 'Stem cell', 'ECM', 'Mitochondria', 'inflam-aging', 'Neuro-aging'];

const compounds = {
    Cafeine: {
        label: 'Caffeine',
        datas: {
            radar: { Metabolism:1.555153608, 'Stem cell':0.804801211, ECM:1.408648042, Mitochondria:0.942647289, 'inflam-aging':1.476356749, 'Neuro-aging':1.098239504 },
            heat: { Metabolism:0.637075088, 'Stem cell':-0.313295619, ECM:0.494311192, Mitochondria:-0.085210037, 'inflam-aging':0.562041378, 'Neuro-aging':0.135192712 },
            antiAging: 0.359252188, ageGain: 4.9
        }
    },
    'Anti-oxy': {
        label: 'Anti-oxy',
        datas: {
            radar: { Metabolism:1.02241417, 'Stem cell':1.1224292, ECM:0.6112996, Mitochondria:1.15959402, 'inflam-aging':1.01252605, 'Neuro-aging':1.49833398 },
            heat: { Metabolism:0.03197974, 'Stem cell':0.16662445, ECM:-0.71044889, Mitochondria:0.2136198, 'inflam-aging':0.01795902, 'Neuro-aging':0.58335924 },
            antiAging: -0.13180946, ageGain: -2.0
        }
    },
    'Anti-inflammatory 1': {
        label: 'Anti-inflammatory 1',
        datas: {
            radar: { Metabolism:1.97061158, 'Stem cell':0.2985296, ECM:2.5960618, Mitochondria:1.00888437, 'inflam-aging':1.97444806, 'Neuro-aging':1.3297509 },
            heat: { Metabolism:0.97861158, 'Stem cell':-1.74450409, ECM:1.37632473, Mitochondria:0.01276083, 'inflam-aging':0.98144941, 'Neuro-aging':0.41115602 },
            antiAging: 0.64012325, ageGain: 7.4
        }
    },
    'Anti-inflammatory 2': {
        label: 'Anti-inflammatory 2',
        datas: {
            radar: { Metabolism:1.60965769, 'Stem cell':0.58183722, ECM:0.92050647, Mitochondria:0.88604018, 'inflam-aging':1.34671877, 'Neuro-aging':0.6572614 },
            heat: { Metabolism:0.68675392, 'Stem cell':-0.78134409, ECM:-0.12020568, Mitochondria:-0.1745597, 'inflam-aging':0.42944386, 'Neuro-aging':-0.60663621 },
            antiAging: 0.11566192, ageGain: 1.7
        }
    },
    'GLP1-agonist': {
        label: 'GLP1-agonist',
        datas: {
            radar: { Metabolism:1.91303566, 'Stem cell':1.24773326, ECM:0.66041222, Mitochondria:1.65380092, 'inflam-aging':1.23684124, 'Neuro-aging':1.53247882 },
            heat: { Metabolism:0.93586377, 'Stem cell':0.31930955, ECM:-0.59856128, Mitochondria:0.72578557, 'inflam-aging':0.30666033, 'Neuro-aging':0.61586714 },
            antiAging: 0.26190119, ageGain: 3.7
        }
    },
    'Botox Injected: {
        label: ''Botox Injected',
        datas: {
            radar: { Metabolism:0.67425533, 'Stem cell':0.69851636, ECM:1.02337683, Mitochondria:0.6969957, 'inflam-aging':0.852734, 'Neuro-aging':0.36499353 },
            heat: { Metabolism:-0.56863308, 'Stem cell':-0.51763418, ECM:0.03750547, Mitochondria:-0.52077834, 'inflam-aging':-0.22985093, 'Neuro-aging':-1.45427068 },
            antiAging: -0.44653357, ageGain: -5.8
        }
    }
};

const combinationTemplates = {
    'Cafeine + Anti-oxy': {
        label: 'Cafeine + Anti-oxy',
        datas: {
            radar: null,
            heat: {Metabolism: 0.455533883, 'Stem cell': 0.02264843, ECM: 0.132883166, Mitochondria: 0.123970852, 'inflam-aging': 0.398816671, 'Neuro-aging': null},
            antiAging: 0.249251386, ageGain: 1.0
        }
    },
    'Cafeine + Anti-inflammatory 1': {
        label: 'Cafeine + Anti-inflammatory 1',
        datas: {
            radar: null,
            heat: {Metabolism: 0.876167537, 'Stem cell': -0.742523162, ECM: 1.111720666, Mitochondria: -0.01663043, 'inflam-aging': 0.855627003, 'Neuro-aging': null},
            antiAging: 0.613174173, ageGain: 2.4
        }
    },
    'Cafeine + Anti-inflammatory 2': {
        label: 'Cafeine + Anti-inflammatory 2',
        datas: {
            radar: null,
            heat: {Metabolism: 0.671844871, 'Stem cell': -0.453700682, ECM: 0.30995613, Mitochondria: -0.112013817, 'inflam-aging': 0.522263546, 'Neuro-aging': null},
            antiAging: 0.290938315, ageGain: 1.1
        }
    },
    'Cafeine + GLP1-agonist': {
        label: 'Cafeine + GLP1-agonist',
        datas: {
            radar: null,
            heat: {Metabolism: 0.846221765, 'Stem cell': 0.129528001, ECM: 0.16644945, Mitochondria: 0.48248689, 'inflam-aging': 0.485427065, 'Neuro-aging': null},
            antiAging: 0.431692145, ageGain: 1.7
        }
    },
    'Anti-oxy + Anti-inflammatory 1': {
        label: 'Anti-oxy + Anti-inflammatory 1',
        datas: {
            radar: null,
            heat: {Metabolism: 0.694644332, 'Stem cell': -0.406579113, ECM: 0.75029264, Mitochondria: 0.153362112, 'inflam-aging': 0.692402296, 'Neuro-aging': null},
            antiAging: 0.49702212, ageGain: 1.9
        }
    },
    'Anti-oxy + Anti-inflammatory 2': {
        label: 'Anti-oxy + Anti-inflammatory 2',
        datas: {
            radar: null,
            heat: {Metabolism: 0.490321667, 'Stem cell': -0.117756634, ECM: -0.297278643, Mitochondria: 0.097167072, 'inflam-aging': 0.30600173, 'Neuro-aging': null},
            antiAging: 0.102628528, ageGain: 0.4
        }
    },
    'Anti-oxy + GLP1-agonist': {
        label: 'Anti-oxy + GLP1-agonist',
        datas: {
            radar: null,
            heat: {Metabolism: 0.66469856, 'Stem cell': 0.273504022, ECM: -0.632127564, Mitochondria: 0.572135843, 'inflam-aging': 0.220049941, 'Neuro-aging': null},
            antiAging: 0.143787992, ageGain: 0.6
        }
    },
    'Anti-inflammatory 1 + Anti-inflammatory 2': {
        label: 'Anti-inflammatory 1 + Anti-inflammatory 2',
        datas: {
            radar: null,
            heat: {Metabolism: 0.891076587, 'Stem cell': -1.070134977, ECM: 0.927365605, Mitochondria: -0.04343421, 'inflam-aging': 0.815849171, 'Neuro-aging': null},
            antiAging: 0.521294517, ageGain: 2.0
        }
    },
    'Anti-inflammatory 1 + GLP1-agonist': {
        label: 'Anti-inflammatory 1 + GLP1-agonist',
        datas: {
            radar: null,
            heat: {Metabolism: 0.965809542, 'Stem cell': -0.299699542, ECM: 0.783858924, Mitochondria: 0.51187815, 'inflam-aging': 0.77901269, 'Neuro-aging': null},
            antiAging: 0.651972664, ageGain: 2.5
        }
    },
    'Anti-inflammatory 2 + GLP1-agonist': {
        label: 'Anti-inflammatory 2 + GLP1-agonist',
        datas: {
            radar: null,
            heat: {Metabolism: 0.861130815, 'Stem cell': -0.010877062, ECM: -0.263712359, Mitochondria: 0.455683111, 'inflam-aging': 0.392612123, 'Neuro-aging': null},
            antiAging: 0.280497178, ageGain: 1.1
        }
    },
    'Cafeine + 'Botox Injected': {
        label: 'Cafeine + 'Botox Injected',
        datas: {
            radar: null, heat: null, antiAging: null, ageGain: null
        }
    }
};


function buildButtons() {
    const list = document.getElementById('compounds-list');
    list.innerHTML = '';
    Object.keys(compounds).forEach(key => {
        const btn = document.createElement('button');
        btn.textContent = compounds[key].label;
        btn.className = 'compound-btn';
        btn.onclick = () => selectCompound(key, btn);
        list.appendChild(btn);
    });
}

function selectCompound(key, button) {
    document.querySelectorAll('.compound-btn').forEach(b => b.classList.remove('active'));
    if (button) button.classList.add('active');
    renderCompound(key);
}

function getScoreColor(score) {
    if (score > 0.3) return '#4CB292';
    if (score < -0.3) return '#993C1E';
    return '#999999';
}

// animacion al cargar compuesto: frases + imagenes aleatorias cada 2s, durante 14s, luego mostrar resultados

function runTestingAnimation(callback) {
    const animationDiv = document.getElementById('testing-animation');
    const textDiv = animationDiv.querySelector('.testing-text');
    const images = Array.from(animationDiv.querySelectorAll('.testing-image'));
    if (images.length === 0) return callback();

    const image = images[0]; // solo un <img>

    // Frases de testing
    const testingPhrases = [
        "Testing this compound based on 17 endpoints of ageing",
        "Analyzing effects on Metabolism",
        "Examining Stem Cell activity",
        "Evaluating ECM remodeling",
        "Measuring Mitochondrial health",
        "Tracking inflam-aging markers",
        "Observing Neuro-aging responses"
    ];

    // Primera frase fija + resto aleatorio
    const firstPhrase = testingPhrases[0];
    const restPhrases = testingPhrases
        .slice(1)
        .sort(() => Math.random() - 0.5)
        .slice(0, 1); // solo 2 frases
    const allPhrases = [firstPhrase, ...restPhrases];

    // Tus 4 imágenes
    const imageFiles = [
        "img/pipette.png",
        "img/brown_models.png",
        "img/exadex_adipose.png",
        "img/exadex_vascularized.png"
    ];

    // Pre-cargar imágenes
    imageFiles.forEach(src => {
        const imgPreload = new Image();
        imgPreload.src = src;
    });

    // Crear orden rotativo aleatorio
    const startIndex = Math.floor(Math.random() * imageFiles.length);
    const orderedImages = imageFiles.slice(startIndex).concat(imageFiles.slice(0, startIndex));

    animationDiv.style.display = 'flex';

    let i = 0;
    let imageIndex = 0;

    // Función para mostrar imagen y texto con fade
    function showNext() {
        // fade-out
        image.style.opacity = 0;
        setTimeout(() => {
            // Cambiar frase
            textDiv.textContent = allPhrases[i];

            // Cambiar imagen según el orden rotativo
            image.src = orderedImages[imageIndex];
            image.onload = () => { image.style.opacity = 1; };

            // avanzar índices
            i++;
            imageIndex = (imageIndex + 1) % orderedImages.length;
        }, 500); // duración fade-out
    }

    // Mostrar primera frase e imagen inmediatamente
    textDiv.textContent = allPhrases[i];
    image.src = orderedImages[imageIndex];
    image.onload = () => { image.style.opacity = 1; };
    i++;
    imageIndex = (imageIndex + 1) % orderedImages.length;

    // Intervalo para cambiar frases e imágenes
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
    }, 2000); // cada 2s
}

function renderCompound(key) {
    document.getElementById('select-hint').style.display = 'none';
    document.querySelector('.intro-video').style.display = 'none';
    
    runTestingAnimation(() => {
        const { datas, label } = compounds[key];


        document.getElementById('panels').style.display = 'block';

        document.getElementById('compound-name').textContent = label;

        const s = datas.antiAging;
        const scoreEl = document.getElementById('score-value');
        const sign = s >= 0 ? '+' : '';
        scoreEl.textContent = `${sign}${s.toFixed(2)}`;
        scoreEl.style.color = getScoreColor(s);

        const ag = datas.ageGain;
        const ageSign = ag >= 0 ? '+' : '';
        document.getElementById('age-value').textContent = `${ageSign}${ag.toFixed(1)} years`;
        document.getElementById('age-value').style.color = ag >= 0 ? '#4CB292' : '#993C1E';

        renderHeatmap(datas.heat);
        drawRadar(datas.radar);
    });
}

function heatmapColor(v) {
    if (v >= 2.0) return '#00ad76';
    if (v >= 1.0) return '#52c09d';
    if (v >= 0.3) return '#8edac2';
    if (v > 0)   return '#C7E7DD';

    if (v === 0) return '#FAFDFC';

    if (v > -0.3) return '#F7F1EF';
    if (v > -1.0) return '#dd937c';
    if (v > -2.0) return '#d17759';
    return '#993C1E';
}

function getTextColor(bgColor) {
    let r, g, b;

    // Si es HEX (#xxxxxx)
    if (bgColor.startsWith('#')) {
        const hex = bgColor.replace('#', '');
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    } 
    // Si es RGB
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

function renderHeatmap(heat) {
    const heatmapBlock = document.getElementById('heatmap-block');
    let html = '<div class="heatmap-table">';
    
    compartments.forEach(name => {
        const value = heat[name];
        const color = heatmapColor(value);
        const textColor = getTextColor(color);
        const sign = value >= 0 ? '+' : '';
        
        html += `
            <div class="heatmap-row">
                <div class="heatmap-label">${name}</div>
                <div class="heatmap-bar" style="background:${color}; color:${textColor};">
                    ${sign}${value.toFixed(2)}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    heatmapBlock.innerHTML = html;
}

function drawRadar(radarData) {
    const canvas = document.getElementById('radarCanvas');
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const cx = W / 2;
    const cy = H / 2;
    const maxR = Math.min(W, H) / 2 - 70;
    const N = compartments.length;
    
    const values = compartments.map(c => radarData[c]);
    const minVal = 0;
    const maxVal = Math.max(...values, 1.5);
    const step = Math.ceil((maxVal / 0.4)) * 0.4;
    const range = step;

    function angle(i) { return (Math.PI * 2 / N) * i - Math.PI / 2; }
    function toXY(i, r) {
        return { x: cx + Math.cos(angle(i)) * r, y: cy + Math.sin(angle(i)) * r };
    }

    function valToRadius(v) {
        return (v / range) * maxR;
    }

    const ringValues = [];
    for (let i = 0; i <= 5; i++) {
        ringValues.push((range / 5) * i);
    }

    // Draw rings
    ringValues.forEach((ringVal, ringIdx) => {
        const r = valToRadius(ringVal);
        ctx.beginPath();
        for (let i = 0; i <= N; i++) {
            const { x, y } = toXY(i % N, r);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();

        if (Math.abs(ringVal - 1.0) < 0.05) {
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 3;
        } else {
            ctx.strokeStyle = '#ddd';
            ctx.lineWidth = 0.8;
        }
        ctx.stroke();
    });

    // Draw spokes
    for (let i = 0; i < N; i++) {
        const { x, y } = toXY(i, maxR);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 0.8;
        ctx.stroke();
    }

    // Draw labels on rings
    ctx.fillStyle = '#999';
    ctx.font = 'bold 11px Arial';
    ctx.textAlign = 'center';
    ringValues.forEach(ringVal => {
        const r = valToRadius(ringVal);
        const labelY = cy - r - 8;
        ctx.fillText(ringVal.toFixed(1), cx, labelY);
    });

    // Draw polygon
    ctx.beginPath();
    values.forEach((v, i) => {
        const r = valToRadius(v);
        const { x, y } = toXY(i, r);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(76, 178, 146, 0.2)';
    ctx.fill();
    ctx.strokeStyle = '#28f8f8';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw dots
    values.forEach((v, i) => {
        const r = valToRadius(v);
        const { x, y } = toXY(i, r);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#28f8f8';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    // Draw axis labels
    ctx.fillStyle = '#333';
    ctx.font = 'bold 13px Arial';
    for (let i = 0; i < N; i++) {
        const labelR = maxR + 30;
        const { x, y } = toXY(i, labelR);
        const a = angle(i);
        
        if (Math.abs(Math.cos(a)) < 0.2) ctx.textAlign = 'center';
        else ctx.textAlign = Math.cos(a) > 0 ? 'left' : 'right';
        
        ctx.textBaseline = Math.abs(Math.sin(a)) < 0.2 ? 'middle' : (Math.sin(a) > 0 ? 'top' : 'bottom');
        ctx.fillText(compartments[i], x, y);
    }
}


buildButtons();