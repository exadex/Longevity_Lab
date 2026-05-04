function renderCompound(key) {
    const { datas, label } = compounds[key];
    
    // Hide side cards for single compound
    document.getElementById('score-card-a').style.display = 'none';
    document.getElementById('score-card-b').style.display = 'none';
    document.getElementById('score-card-combo').style.display = 'block';
    document.getElementById('score-card-combo').classList.remove('inactive');
    document.getElementById('score-card-combo').classList.add('active');
    
    renderCompoundFromData(label, datas, 'combo');

    if (selectedCompounds.length === 1) {
        renderOptimalGraphRegeneration(datas, label, true);
    } else {
        // 🔴 IMPORTANTE: ocultar y limpiar sección 4
        const graphBlock = document.getElementById('optimal-graph-block');
        const buttonContainer = document.getElementById('optimal-button-container');
        const labelContainer = document.getElementById('optimal-graph-label');

        if (graphBlock) graphBlock.innerHTML = '';
        if (buttonContainer) buttonContainer.innerHTML = '';
        if (labelContainer) labelContainer.textContent = '';
    }

    if (selectedCompounds.length === 1) {
        const part4 = document.querySelector('.results-part.part-4');
        if (part4) part4.style.display = 'block';

        renderOptimalGraphRegeneration(datas, label, true);
    } else {
        resetPart4();
    }

}

function renderCompartmentTable(data, mode, targetId) {
    const block = document.getElementById(targetId);

    let html = '<div class="heatmap-table">';

    compartments.forEach(name => {
        const value = data[name];

        if (value === null || value === undefined) {
            html += `
                <div class="heatmap-row">
                    <div class="heatmap-label">${name}</div>
                    <div class="heatmap-bar" style="background:#eee; color:#333;">
                        -
                    </div>
                </div>
            `;
            return;
        }

        const isScore = mode === 'score';
        const color = isScore ? scoreColor(value) : heatmapColor(value);
        const textColor = getTextColor(color);

        const sign = value >= 0 ? '+' : '';
        const suffix = isScore ? '%' : '';

        html += `
            <div class="heatmap-row">
                <div class="heatmap-label">${name}</div>
                <div class="heatmap-bar" style="background:${color}; color:${textColor};">
                    ${sign}${value}${suffix}
                </div>
            </div>
        `;
    });

    html += '</div>';
    block.innerHTML = html;
}

function renderCompartments() {
    const block = document.getElementById('compartments-block');

    let html = `<div class="table">
                        <div class="row header">
                            <div class="cell"></div>
                        </div>
                `;

    compartments.forEach(name => {
        html += `
            <div class="row">
                <div class="cell">${name}</div>
            </div>
        `;
    });

    html += '</div>';
    block.innerHTML = html;
}

function renderHeatmap(datas) {
    const block = document.getElementById('heatmap-block');

    let html = `<div class="table">
                    <div class="row header">
                        <div class="cell">Fold Change</div>
                    </div>
                `;

    compartments.forEach(name => {
        const value = datas.heat?.[name];

        const color = value != null ? heatmapColor(value) : '#eee';
        const text = value != null ? `${value.toFixed(2)}` : '-';

        html += `
            <div class="row">
                <div class="cell" style="background:${color}">
                    ${text}
                </div>
            </div>
        `;
    });

    html += '</div>';
    block.innerHTML = html;
}

function renderScore(datas) {
    const block = document.getElementById('score-block');

    let html = `<div class="table">
                    <div class="row header">
                        <div class="cell">Effect (%)</div>
                    </div>
                `;

    compartments.forEach(name => {
        const value = datas.score?.[name];

        let displayText = '-';
        let style = 'background:#eee; color:#333;';

        if (value != null) {
            if (value > -20 && value < 20) {
                // NEUTRAL → sin fondo
                displayText = 'neutral';
                style = 'background:#e5e7eb; color:#111;'
            } else {
                const sign = value >= 0 ? '+' : '';
                displayText = `${sign}${Math.round(value)}%`;
                const color = scoreColor(value);
                style = `background:${color};`;
            }
        }

        html += `
            <div class="row">
                <div class="cell" style="${style}">
                    ${displayText}
                </div>
            </div>
        `;
    });

    html += '</div>';
    block.innerHTML = html;
}

function getMechanismText(value, compartment) {

        let direction;

        if (value > -20 && value < 20) {
            direction = "neutral";
        } else if (value >= 20) {
            direction = "positive";
        } else {
            direction = "negative";
        }

    const interpretations = {

        "Nutrient-sensing": {
            positive: "Improved metabolic sensing and lipid handling capacity",
            negative: "Impaired metabolic regulation and nutrient sensing",
            neutral: "No significant modulation of metabolic sensing"
        },

        "Stem cell capacity": {
            positive: "Enhanced progenitor cell activity and regenerative potential",
            negative: "Reduced stem cell function and regenerative capacity",
            neutral: "No detectable effect on stem cell activity"
        },

        "Cell-ECM communication": {
            positive: "Improved extracellular matrix organization and tissue integrity",
            negative: "Altered ECM remodeling and potential fibrosis imbalance",
            neutral: "No significant change in ECM interactions"
        },

        "Mitochondrial function": {
            positive: "Enhanced mitochondrial activity and energy metabolism",
            negative: "Mitochondrial dysfunction and reduced metabolic efficiency",
            neutral: "No detectable effect on mitochondrial function"
        },

        "Chronic inflammation control": {
            positive: "Reduced inflammatory tone and improved tissue homeostasis",
            negative: "Increased inflammatory activation and stress signaling",
            neutral: "No significant modulation of inflammatory status"
        },

        "Neural communication": {
            positive: "Enhanced neuro-adipose signaling and tissue responsiveness",
            negative: "Impaired neural communication within adipose tissue",
            neutral: "No detectable effect on neural signaling"
        },

        "Vascular/Lymphatic Flow": {
            positive: "Improved vascularization and fluid exchange capacity",
            negative: "Reduced vascular network functionality and flow",
            neutral: "No significant change in vascular dynamics"
        }
    };

    return interpretations[compartment][direction];
}

function renderMechanism(datas) {
    const block = document.getElementById('mechanism-block');

    let html = `<div class="table">
                    <div class="row header">
                        <div class="cell" style="justify-content: center; text-align: center;">
                            Potential mechanism
                        </div>
                    </div>
                `;

    compartments.forEach(name => {
        const value = datas.score?.[name];

        let text = 'No data available';

        if (value !== null && value !== undefined) {
            text = getMechanismText(value, name);
        }

        html += `
            <div class="row">
                <div class="cell">
                    ${text}
                </div>
            </div>
        `;
    });

    html += '</div>';
    block.innerHTML = html;
}

function renderAll(datas) {
    renderCompartments();
    renderHeatmap(datas);
    renderScore(datas);
    renderMechanism(datas);
    renderTopBiologicalSignals(datas);
    drawRadar(datas.heat);
}

function drawRadar(heatData) {
    const canvas = document.getElementById('radarCanvas');
    const width = 900;
    const height = 400;

    canvas.width = width;
    canvas.height = height;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    const paddingX = 100;  // espacio lateral (labels)
    const paddingY = 50;   // espacio vertical (mucho menor)
    const cx = W / 2;
    const cy = H / 2;
    const maxR = Math.min(
        (W / 2) - paddingX,
        (H / 2) - paddingY
    );

    const N = compartments.length;

    const values = compartments.map(c => {
        const v = heatData?.[c];
        return typeof v === "number" && !isNaN(v) ? v : 0;
    });

    const range = 2;

    const angle = i => (Math.PI * 2 / N) * i - Math.PI / 2;

    const toXY = (i, r) => ({
        x: cx + Math.cos(angle(i)) * r,
        y: cy + Math.sin(angle(i)) * r
    });

    const valToR = v => {
        const clamped = Math.max(-range, Math.min(range, v));
        return ((clamped + range) / (2 * range)) * maxR;
    };

    // =========================
    // GRID RADIAL (líneas grises)
    // =========================
    for (let i = 0; i < N; i++) {
        const { x, y } = toXY(i, maxR);

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);

        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // =========================
    // GRID CIRCULAR negro + ESCALA
    // =========================
    const scaleSteps = [-2, -1, 0, 1, 2];

    scaleSteps.forEach(v => {
        const r = valToR(v);

        // círculo
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = (v === 0) ? "#000" : "#e5e7eb";
        ctx.lineWidth = (v === 0) ? 2.5 : 1;
        ctx.stroke();

        // labels escala
        ctx.fillStyle = "#888";
        ctx.font = "12px sans-serif";
        ctx.fillText(v.toString(), cx + 6, cy - r + 4);
    });

    // =========================
    // POLYGON
    // =========================
    ctx.beginPath();
    values.forEach((v, i) => {
        const { x, y } = toXY(i, valToR(v));
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });

    ctx.closePath();
    ctx.fillStyle = "rgba(246,178,35,0.25)";
    ctx.fill();
    ctx.strokeStyle = "#f6b223";
    ctx.lineWidth = 2;
    ctx.stroke();

    // =========================
    // DOTS
    // =========================
    values.forEach((v, i) => {
        const { x, y } = toXY(i, valToR(v));

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#f6b223";
        ctx.fill();
    });

    // =========================
    // LABELS (SIN CORTAR + ANGLED SI NECESARIO)
    // =========================
    ctx.fillStyle = "#111";
    ctx.font = "16px sans-serif";

    const labelRadius = maxR + 20;  // cambiar numero para cambar distancia de labels al centro

    compartments.forEach((name, i) => {
        const a = angle(i);
        const { x, y } = toXY(i, labelRadius);

        const cos = Math.cos(a);
        const sin = Math.sin(a);

        const isLeft = cos < 0;

        // 🔥 detección de zona "conflictiva"
        const needsAngle = Math.abs(cos) < 0.25; // zona superior/inferior

        ctx.save();
        ctx.translate(x, y);

        if (needsAngle) {
            // 🔥 angled label (evita overlap)
            const rotation = a + Math.PI / 2;

            ctx.rotate(rotation);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(name, 0, 0);
        } else {
            // normal
            ctx.textAlign = isLeft ? "right" : "left";
            ctx.textBaseline = "middle";
            ctx.fillText(name, isLeft ? -10 : 10, 0);
        }

        ctx.restore();
    });
}

function renderOptimalGraphRegeneration(datas, label, isSolo) {
    const graphBlock = document.getElementById('optimal-graph-block');
    if (!graphBlock) return;

    // 🔴 BLOQUEO GLOBAL: si hay más de 1 compuesto, no mostrar nunca
    if (!datas || !datas.score) {
        graphBlock.innerHTML = '';
        const buttonContainer = document.getElementById('optimal-button-container');
        const labelContainer = document.getElementById('optimal-graph-label');

        if (buttonContainer) buttonContainer.innerHTML = '';
        if (labelContainer) labelContainer.textContent = '';

        return;
    }

    if (!isSolo) {
        graphBlock.innerHTML = `
            <div class="optimal-graph-empty">
                <p>Optimal graph is available for a single compound selection only.</p>
            </div>
        `;
        return;
    }

    const score = datas.score || datas.heat || null;
    if (!score) {
        graphBlock.innerHTML = `
            <div class="optimal-graph-empty">
                <p>No score data available yet for ${label}.</p>
            </div>
        `;
        return;
    }

    const points = Object.keys(score).map(name => {
        const raw = score[name];
        const pct = raw === null || raw === undefined
            ? 0
            : Math.max(-200, Math.min(200, raw));

        let color = '#eee';

        if (raw !== null && raw !== undefined) {
            if (pct > -100 && pct <= -30) color = '#F44336';
            else if (pct > -30 && pct <= 30) color = '#FF9800';
            else if (pct > 30 && pct <= 60) color = '#FFEB3B';
            else if (pct > 60 && pct <= 100) color = '#52c09d';
            else color = '#00ad76';
        }

        return {
            name,
            raw,
            pct,
            color
        };
    });

    points.sort((a, b) => b.pct - a.pct);

    const svgWidth = 800;
    const svgHeight = 600;
    const padding = 48;
    const bottomMargin = 120;
    const pointMargin = 20;
    const usableWidth = svgWidth - padding * 2 - pointMargin * 2;
    const usableHeight = svgHeight - padding - bottomMargin;
    const step = points.length > 1 ? usableWidth / (points.length - 1) : usableWidth;
    const pointCoordinates = points.map((p, i) => {
        const x = padding + pointMargin + step * i;
        const y = padding + usableHeight - ((p.pct + 200) / 400) * usableHeight;
        return { ...p, x, y };
    });
    const svgPoints = pointCoordinates.map(p => `${p.x},${p.y}`).join(' ');

    const optimalBand = { from: 60, to: 200, fill: 'rgba(0, 173, 118, 0.18)' };

    const greenBand = `
        <rect 
            x="${padding}" 
            y="${padding + usableHeight - ((optimalBand.to + 200) / 400) * usableHeight}" 
            width="${usableWidth + pointMargin * 2}" 
            height="${((optimalBand.to - optimalBand.from) / 400) * usableHeight}" 
            fill="${optimalBand.fill}" 
            rx="18" 
        />
    `;

    const axisSegments = [
        { from: -100, to: -30, color: '#F44336' },
        { from: -30, to: 30, color: '#FF9800' },
        { from: 30, to: 60, color: '#FFEB3B' },
        { from: 60, to: 100, color: '#52c09d' },
        { from: 100, to: 200, color: '#00ad76' }
    ];

    const axisLines = axisSegments.map(segment => {
        const y1 = padding + usableHeight - ((segment.to + 200) / 400) * usableHeight;
        const y2 = padding + usableHeight - ((segment.from + 200) / 400) * usableHeight;
        return `<line x1="${padding - 12}" y1="${y1}" x2="${padding - 12}" y2="${y2}" stroke="${segment.color}" stroke-width="10" stroke-linecap="round" />`;
    }).join('');

    const segmentDefs = pointCoordinates.slice(0, -1).map((p, i) => {
        const next = pointCoordinates[i + 1];
        return `
            <linearGradient id="lineGrad${i}" gradientUnits="userSpaceOnUse" x1="${p.x}" y1="${p.y}" x2="${next.x}" y2="${next.y}">
                <stop offset="0%" stop-color="${p.color}" />
                <stop offset="100%" stop-color="${next.color}" />
            </linearGradient>
        `;
    }).join('');

    const segmentLines = pointCoordinates.slice(0, -1).map((p, i) => {
        const next = pointCoordinates[i + 1];
        return `<line x1="${p.x}" y1="${p.y}" x2="${next.x}" y2="${next.y}" stroke="url(#lineGrad${i})" stroke-width="4" stroke-linecap="round" />`;
    }).join('');

    const dots = pointCoordinates.map(p => {
        const label = p.raw === null || p.raw === undefined ? '-' : `${p.raw}%`;
        return `
            <circle cx="${p.x}" cy="${p.y}" r="7" fill="${p.color}" stroke="#fff" stroke-width="2"></circle>
            <text x="${p.x}" y="${p.y - 14}" class="optimal-graph-point-label">${label}</text>
        `;
    }).join('');

    const xLabels = pointCoordinates.map(p => {
        const label = p.name.replace(/-/g, ' ');
        const labelY = padding + usableHeight -50;     // cambiar este valor para ajustar la posición vertical de las etiquetas x

        return `
            <text 
                x="${p.x}" 
                y="${labelY}" 
                text-anchor="end"
                transform="rotate(-45 ${p.x} ${labelY})"
                class="optimal-graph-xlabel">
                ${label}
            </text>
        `;
    }).join('');

    graphBlock.innerHTML = `
        <div class="optimal-graph-card">
            <div class="optimal-graph-chart">
                <svg viewBox="0 0 ${svgWidth} ${svgHeight}" preserveAspectRatio="xMidYMid meet" class="optimal-graph-svg">
                    <defs>
                        ${segmentDefs}
                    </defs>
                    ${greenBand}
                    ${axisLines}
                    ${[200, 100, 60, 30, 0, -30, -100].map(value => {
                        const y = padding + usableHeight - ((value + 200) / 400) * usableHeight;
                        return `
                            <line x1="${padding}" y1="${y}" x2="${svgWidth - padding}" y2="${y}" class="optimal-graph-grid-line" />
                            <text x="${padding - 28}" y="${y + 4}" class="optimal-graph-axis-label">${value}%</text>
                        `;
                    }).join('')}
                    ${segmentLines}
                    ${dots}
                    ${xLabels}
                </svg>
            </div>
        </div>
    `;

    const buttonContainer = document.getElementById('optimal-button-container');
    const labelContainer = document.getElementById('optimal-graph-label');

    if (isSolo && selectedCompounds.length === 1) {
        buttonContainer.innerHTML = `
            <button class="optimal-btn">OPTIMAL COMBO</button>
        `;
        const btn = buttonContainer.querySelector('.optimal-btn');

        btn.textContent = isOptimalMode ? "SOLO COMPOUND" : "OPTIMAL COMBO";
        btn.classList.remove('optimal-active');
        btn.classList.toggle('optimal-active', isOptimalMode);

            btn.onclick = () => {
                isOptimalMode = !isOptimalMode; // alterna el modo

                const compoundKey = selectedCompounds[0];
                const bestCombo = getBestCombination(compoundKey);

                 if (isOptimalMode) {
                    // Modo OPTIMAL: calcula la mejor combinación
                    
                    if (!bestCombo) {
                        alert("No optimal combination found");
                        return;
                    }
                    renderOptimalGraphRegeneration(bestCombo.datas, bestCombo.label, true);
                    labelContainer.textContent = `Optimal Combination: ${bestCombo.label}`;
                } else {
                    // Modo NORMAL: solo el compuesto original
                    renderOptimalGraphRegeneration(compounds[compoundKey].datas, compoundKey, true);
                    labelContainer.textContent = `Compound: ${compounds[compoundKey].label}`;
                }

                // Cambiar color del botón
                btn.classList.toggle('optimal-active', isOptimalMode);
                if (isOptimalMode) {
                    labelContainer.textContent = `Optimal Combination: ${bestCombo.label}`;
                } else {
                    const compoundKey = selectedCompounds[0];
                    labelContainer.textContent = `Compound: ${compounds[compoundKey].label}`;
                }
            };

    } else {
        buttonContainer.innerHTML = '';
    }
}

console.log("regeneration.js loaded");