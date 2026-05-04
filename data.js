/* =========================================================
   DATA.JS

   👉 Ce fichier contient TOUTES les données du projet.
   C’est ici qu’on définit :
   - Les composés (caffeine, anti-oxydant, etc.)
   - Les combinaisons entre composés
   - Les scores (heat, antiAging, etc.)

   ---------------------------------------------------------
   🧠 LOGIQUE GÉNÉRALE

   Chaque composé contient :
   - heat → log2FoldChange (ajouté MANUELLEMENT)
   - antiAging → longevity score (ajouté MANUELLEMENT)

   Ensuite, le code calcule automatiquement :
   - score → converti le FC en % 
   - ageGain → conversion en "années gagnées/perdues"

   👉 Donc :
   VOUS entrez seulement :
      ✔ log2FC (nomé heat ici)
      ✔ longevity score (nomé antiAging)

   Le reste est calculé automatiquement.

   ---------------------------------------------------------
   🔢 FONCTIONS IMPORTANTES

   - log2fcToPercent(v)
     → convertit le log2FC en %

   - buildScoreFromHeat(heatMap)
     → applique la conversion

   - antiAgingToAgeGain(v)
     → transforme le score antiAging en "années" par tanh sur un intervalle de +/- 10 ans

   - buildAgeGain(datas)
     → applique cette transformation

   ---------------------------------------------------------
   🧩 STRUCTURE DES DONNÉES

   1. COMPOUNDS (composés seuls)

   Exemple :
   caffeine: {
       label: 'Caffeine',
       datas: {
           heat: { ... },
           antiAging: 0.52
       }
   }

   2. COMBINATIONTEMPLATES (combinaisons)

   Exemple :
   caffeine_antioxydant: {
       label: 'Caffeine + Anti-oxydant',
       compounds: ["caffeine", "antioxydant"],
       datas: {
           heat: { ... },
           antiAging: 0.36
       }
   }

   👉 IMPORTANT :
   - Le nom de la clé doit suivre :
     "composéA_composéB"
   - L’ordre n’a pas d’importance (le code gère ça)

   ---------------------------------------------------------
   ⚙️ CALCUL AUTOMATIQUE

   À la fin du fichier, deux boucles font le travail :

   - Pour chaque composé :
     → calcule score + ageGain

   - Pour chaque combinaison :
     → calcule score + ageGain

   👉 Vous n’avez RIEN à faire pour ça.

   ---------------------------------------------------------
   ⚠️ ERREURS FRÉQUENTES

   Si quelque chose ne marche pas :
   - vérifier que les noms des pathways sont EXACTS
   - vérifier qu’il n’y a pas de fautes dans les clés
   - vérifier que "heat" et "antiAging" existent bien

   Exemple :
   ❌ "Chronic-inflammation" ne vas pas marcher si le compartiment ici s’appelle "Chronic inflammation"
   ✔ "Chronic inflammation"

   ---------------------------------------------------------
   💡 CONSEILS

   - Toujours copier-coller un bloc existant pour créer un nouveau
   - Modifier seulement les valeurs
   - Ne pas changer la structure

   → si ça casse… c’est souvent une clé mal écrite 😄

   ========================================================= */

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
                'Nutrient-sensing': -0.160397657,
                'Stem cell capacity': -0.362088521,
                'Cell-ECM communication': -0.071025181,
                'Mitochondrial function': -0.717382272,
                'Chronic inflammation control': -0.087833722,
                'Neural communication': -0.840524779,
                'Vascular/Lymphatic Flow': -0.410034021
            },
            antiAging: -0.309199678, 
        }
    }
};

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
                'Nutrient-sensing': 0.574757691,
                'Stem cell capacity': -0.327933489,
                'Cell-ECM communication': 0.271244221,
                'Mitochondrial function': -0.274861708,
                'Chronic inflammation control': 0.690773651,
                'Neural communication': -0.08357714,
                'Vascular/Lymphatic Flow': -0.490132697
            },
            antiAging: 0.266291636,
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
                'Nutrient-sensing': -0.117280635,
                'Stem cell capacity': 0.008010559,
                'Cell-ECM communication': -0.292615942,
                'Mitochondrial function': -0.065680819,
                'Chronic inflammation control': -0.132880548,
                'Neural communication': 0.194391282,
                'Vascular/Lymphatic Flow': 0.432753448
            },
            antiAging: -0.139774028,
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
                'Nutrient-sensing': 0.959822249,
                'Stem cell capacity': -0.776678193,
                'Cell-ECM communication': 0.85016978,
                'Mitochondrial function': -0.206282101,
                'Chronic inflammation control': 0.904831154,
                'Neural communication': 0.276381421,
                'Vascular/Lymphatic Flow': -0.259152308
            },
            antiAging: 0.541498829,
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
                'Nutrient-sensing': 0.366401726,
                'Stem cell capacity': -0.487855714,
                'Cell-ECM communication': -0.115010995,
                'Mitochondrial function': -0.33740386,
                'Chronic inflammation control': 0.265096529,
                'Neural communication': -0.296990069,
                'Vascular/Lymphatic Flow': -0.451409067
            },
            antiAging: -0.016605281,
        }
    },
    glp1agonist_botulinumtoxin: {
        label: 'GLP-1 agonist + Botulinum toxin',
        compounds: ["glp1agonist", "botulinumtoxin"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.507733804,
                'Stem cell capacity': 0.11489013,
                'Cell-ECM communication': -0.241005174,
                'Mitochondrial function': 0.29283522,
                'Chronic inflammation control': 0.274152014,
                'Neural communication': -0.521135701,
                'Vascular/Lymphatic Flow': null
            },
            antiAging: 0.16123145,
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

Object.values(combinationTemplates).forEach(combo => {
    const datas = combo.datas;

    if (datas) {
        combo.datas.score = buildScoreFromHeat(datas.heat);
        combo.datas.ageGain = buildAgeGain(datas);
    }
});