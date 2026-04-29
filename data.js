function log2fcToPercent(v) {
    if (v === null || v === undefined || isNaN(v)) return null;

    const fold = Math.pow(2, v);
    const pct = (fold - 1) * 100;

    return Math.round(pct);
}

function buildScoreFromHeat(heatMap) {
    const score = {};

    Object.keys(heatMap).forEach(key => {
        score[key] = log2fcToPercent(heatMap[key]);
    });

    return score;
}

function antiAgingToAgeGain(v) {
    if (v === null || v === undefined || isNaN(v)) return null;

    return 10 * Math.tanh(v);
}

function buildAgeGain(datas) {
    if (!datas || datas.antiAging === undefined) return null;

    return antiAgingToAgeGain(datas.antiAging);
}

const compartments = ['Nutrient-sensing', 'Stem cell capacity', 'Cell-ECM communication', 'Mitochondrial function', 'Chronic inflammation control', 'Neural communication', 'Vascular/Lymphatic Flow'];

const compounds = {
    caffeine: {
        label: 'Caffeine',
        datas: {
            heat: { 
                'Nutrient-sensing': 0.889824269,
                'Stem cell capacity': -0.313295619,
                'Cell-ECM communication': 0.417931107,
                'Mitochondrial function': -0.085210037,
                'Chronic inflammation control': 1.024462525,
                'Neural communication': 0.240828991,
                'Vascular/Lymphatic Flow': -0.67702961
            },
            antiAging: 0.522854568,
        }
    },
    antioxydant: {
        label: 'Anti-oxydant',
        datas: {
            heat: { 
                'Nutrient-sensing': -0.098801912,
                'Stem cell capacity': 0.166624451,
                'Cell-ECM communication': -0.809661052,
                'Mitochondrial function': 0.213619804,
                'Chronic inflammation control': -0.237989807,
                'Neural communication': 0.637926737,
                'Vascular/Lymphatic Flow': 0.793948078
            },
            antiAging: -0.181192592,
        }
    },
    antiinflammatory: {
        label: 'Anti-inflammatory',
        datas: {
            heat: { 
                'Nutrient-sensing': 1.439916494,
                'Stem cell capacity': -1.744054095,
                'Cell-ECM communication': 1.244967621,
                'Mitochondrial function': 0.01276083,
                'Chronic inflammation control': 1.330258958,
                'Neural communication': 0.755055507,
                'Vascular/Lymphatic Flow': -0.194488716
            },
            antiAging: 0.862993288,
        }
    },
    soothing: {
        label: 'Soothing',
        datas: {
            heat: { 
                'Nutrient-sensing': 0.59217289,
                'Stem cell capacity': -0.781312497,
                'Cell-ECM communication': -0.217644562,
                'Mitochondrial function': -0.174555969,
                'Chronic inflammation control': 0.416352352,
                'Neural communication': -0.064046621,
                'Vascular/Lymphatic Flow': -0.54795084
            },
            antiAging: 0.058313943,
        }
    },
    glp1agonist: {
        label: 'GLP-1 agonist',
        datas: {
            heat: { 
                'Nutrient-sensing': 0.794075859,
                'Stem cell capacity': 0.319309553,
                'Cell-ECM communication': -0.637625157,
                'Mitochondrial function': 0.725785573,
                'Chronic inflammation control': 0.429288758,
                'Neural communication': -0.384254667,
                'Vascular/Lymphatic Flow': null
            },
            antiAging: 0.231115816,
        }
    },
    botulinumtoxin: {
        label: 'Botulinum toxin',
        datas: {
            heat: { 
                'Nutrient-sensing': -0.227453232,
                'Stem cell capacity': -0.51763418,
                'Cell-ECM communication': 0.019428415,
                'Mitochondrial function': -0.520778338,
                'Chronic inflammation control': -0.229850928,
                'Neural communication': -0.853438165,
                'Vascular/Lymphatic Flow': -0.420184612
            },
            antiAging: -0.312859761, 
        }
    }
};

Object.values(compounds).forEach(compound => {
    const heat = compound.datas?.heat;

    if (heat) {
        compound.datas.score = buildScoreFromHeat(heat);
        compound.datas.ageGain = buildAgeGain(compound.datas);
    }
});

const combinationTemplates = {
    caffeine_antioxydant: {
        label: 'Caffeine + Anti-oxydant',
        compounds: ["caffeine", "antioxydant"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.593236415,
                'Stem cell capacity': 0.02264843,
                'Cell-ECM communication': 0.049653459,
                'Mitochondrial function': 0.123970852,
                'Chronic inflammation control': 0.645726825,
                'Neural communication': 0.518797414,
                'Vascular/Lymphatic Flow': 0.352654772
            },
            antiAging: 0.364650923,
        }
    },
    caffeine_antiinflammatory: {
        label: 'Caffeine + Anti-inflammatory',
        compounds: ["caffeine", "antiinflammatory"],
        datas: {
            heat: {
                'Nutrient-sensing': 1.274888827,
                'Stem cell capacity': -0.742523162,
                'Cell-ECM communication': 0.996856666,
                'Mitochondrial function': -0.01663043,
                'Chronic inflammation control': 1.238520028,
                'Neural communication': 0.600787552,
                'Vascular/Lymphatic Flow': -0.339250984
            },
            antiAging: 0.818182011,
        }
    },
    caffeine_soothing: {
        label: 'Caffeine + Soothing',
        compounds: ["caffeine", "soothing"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.800528855,
                'Stem cell capacity': -0.453700682,
                'Cell-ECM communication': 0.227258406,
                'Mitochondrial function': -0.112013817,
                'Chronic inflammation control': 0.842029473,
                'Neural communication': 0.149366307,
                'Vascular/Lymphatic Flow': -0.586674471
            },
            antiAging: 0.38349238,
        }
    },
    caffeine_glp1agonist: {
        label: 'Caffeine + GLP-1 agonist',
        compounds: ["caffeine", "glp1agonist"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.895296977,
                'Stem cell capacity': 0.129528001,
                'Cell-ECM communication': 0.101264228,
                'Mitochondrial function': 0.48248689,
                'Chronic inflammation control': 0.845910395,
                'Neural communication': 0.053303893,
                'Vascular/Lymphatic Flow': null
            },
            antiAging: 0.510016156,
        }
    },
    caffeine_botulinumtoxin: {
        label: 'Caffeine + Botulinum toxin',
        compounds: ["caffeine", "botulinumtoxin"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.554641019,
                'Stem cell capacity': -0.374597187,
                'Cell-ECM communication': 0.298380299,
                'Mitochondrial function': -0.215880527,
                'Chronic inflammation control': 0.648168489,
                'Neural communication': -0.087451156,
                'Vascular/Lymphatic Flow': -0.497238111
            },
            antiAging: 0.272140269,
        }
    },
    antioxydant_antiinflammatory: {
        label: 'Anti-oxydant + Anti-inflammatory',
        compounds: ["antioxydant", "antiinflammatory"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.978300972,
                'Stem cell capacity': -0.406579113,
                'Cell-ECM communication': 0.628579019,
                'Mitochondrial function': 0.153362112,
                'Chronic inflammation control': 0.859784328,
                'Neural communication': 0.719916876,
                'Vascular/Lymphatic Flow': 0.49741704
            },
            antiAging: 0.638216204,
        }
    },
    antioxydant_soothing: {
        label: 'Anti-oxydant + Soothing',
        compounds: ["antioxydant", "soothing"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.384880449,
                'Stem cell capacity': -0.117756634,
                'Cell-ECM communication': -0.395249509,
                'Mitochondrial function': 0.097167072,
                'Chronic inflammation control': 0.220049704,
                'Neural communication': 0.42733473,
                'Vascular/Lymphatic Flow': 0.391378403
            },
            antiAging: 0.075748941,
        }
    },
    antioxydant_glp1agonist: {
        label: 'Anti-oxydant + GLP-1 agonist',
        compounds: ["antioxydant", "glp1agonist"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.598709123,
                'Stem cell capacity': 0.273504022,
                'Cell-ECM communication': -0.689235925,
                'Mitochondrial function': 0.572135843,
                'Chronic inflammation control': 0.229105189,
                'Neural communication': 0.331272316,
                'Vascular/Lymphatic Flow': null
            },
            antiAging: 0.14831055,
        }
    },
    antioxydant_botulinumtoxin: {
        label: 'Anti-oxydant + Botulinum toxin',
        compounds: ["antioxydant", "botulinumtoxin"],
        datas: {
            heat: {
                'Nutrient-sensing': -0.137397308,
                'Stem cell capacity': -0.038653138,
                'Cell-ECM communication': -0.229298425,
                'Mitochondrial function': -0.006699638,
                'Chronic inflammation control': -0.232292592,
                'Neural communication': 0.190517267,
                'Vascular/Lymphatic Flow': 0.429708271
            },
            antiAging: -0.130434859,
        }
    },
    antiinflammatory_soothing: {
        label: 'Anti-inflammatory + Soothing',
        compounds: ["antiinflammatory", "soothing"],
        datas: {
            heat: {
                'Nutrient-sensing': 1.185593413,
                'Stem cell capacity': -1.070134977,
                'Cell-ECM communication': 0.806183966,
                'Mitochondrial function': -0.04343421,
                'Chronic inflammation control': 1.056086976,
                'Neural communication': 0.509324869,
                'Vascular/Lymphatic Flow': -0.300527353
            },
            antiAging: 0.660099148,
        }
    },
    antiinflammatory_glp1agonist: {
        label: 'Anti-inflammatory + GLP-1 agonist',
        compounds: ["antiinflammatory", "glp1agonist"],
        datas: {
            heat: {
                'Nutrient-sensing': 1.277234273,
                'Stem cell capacity': -0.299699542,
                'Cell-ECM communication': 0.680189787,
                'Mitochondrial function': 0.51187815,
                'Chronic inflammation control': 1.059967898,
                'Neural communication': 0.413262455,
                'Vascular/Lymphatic Flow': null
            },
            antiAging: 0.798746077,
        }
    },
    antiinflammatory_botulinumtoxin: {
        label: 'Anti-inflammatory + Botulinum toxin',
        compounds: ["antiinflammatory", "botulinumtoxin"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.939705576,
                'Stem cell capacity': -0.885560154,
                'Cell-ECM communication': 0.877305859,
                'Mitochondrial function': -0.14730092,
                'Chronic inflammation control': 0.862225992,
                'Neural communication': 0.272507405,
                'Vascular/Lymphatic Flow': -0.262197485
            },
            antiAging: 0.55929417,
        }
    },
    soothing_glp1agonist: {
        label: 'Soothing + GLP-1 agonist',
        compounds: ["soothing", "glp1agonist"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.806001563,
                'Stem cell capacity': -0.010877062,
                'Cell-ECM communication': -0.34363874,
                'Mitochondrial function': 0.455683111,
                'Chronic inflammation control': 0.425407836,
                'Neural communication': -0.160109035,
                'Vascular/Lymphatic Flow': null
            },
            antiAging: 0.23744148,
        }
    },
    soothing_botulinumtoxin: {
        label: 'Soothing + Botulinum toxin',
        compounds: ["soothing", "botulinumtoxin"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.346285053,
                'Stem cell capacity': -0.596737675,
                'Cell-ECM communication': -0.051693478,
                'Mitochondrial function': -0.27842268,
                'Chronic inflammation control': 0.222491368,
                'Neural communication': -0.300864085,
                'Vascular/Lymphatic Flow': -0.458514481
            },
            antiAging: -0.016887154,
        }
    },
    glp1agonist_botulinumtoxin: {
        label: 'GLP-1 agonist + Botulinum toxin',
        compounds: ["glp1agonist", "botulinumtoxin"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.560113727,
                'Stem cell capacity': 0.068226433,
                'Cell-ECM communication': -0.177687656,
                'Mitochondrial function': 0.3518164,
                'Chronic inflammation control': 0.231546852,
                'Neural communication': -0.525009717,
                'Vascular/Lymphatic Flow': null
            },
            antiAging: 0.138884929,
        }
    }
};

Object.values(combinationTemplates).forEach(combo => {
    const datas = combo.datas;

    if (datas) {
        combo.datas.score = buildScoreFromHeat(datas.heat);
        combo.datas.ageGain = buildAgeGain(datas);
    }
});