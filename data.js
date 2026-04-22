const compartments = ['Nutrient-sensing', 'Stem cell capacity', 'Cell-ECM communication', 'Mitochondrial function', 'Chronic inflammation control', 'Neural communication', 'Vascular/Lymphatic Flow'];

const biomarkerDefinitions = {
    'Nutrient-sensing': ['AdipoQ', 'AdipoQ secretion', 'GLUT4', 'FASN', 'PPARG'],
    'Stem cell capacity': ['MSCA1', 'PDGFRa', 'inhBA'],
    'Cell-ECM communication': ['COL1A1', 'COL3A1', 'COL1A1/COL3A1', 'TIMP1', 'TIMP1 secretion', 'Pro-col secretion'],
    'Mitochondrial function': ['CPT1M', 'COX4'],
    'Chronic inflammation control': ['ICAM1', 'aSMA', 'SPP1'],
    'Neural communication': ['NGF', 'STMN2', 'ENO2'],
    'Vascular/Lymphatic Flow': ['CD31', 'LYVE1']
};

function createEmptyBiomarkers() {
    const result = {};
    Object.entries(biomarkerDefinitions).forEach(([category, items]) => {
        result[category] = items.map(item => ({
            name: item.name || item,
            value: null
        }));
    });
    return result;
}

const compounds = {
    caffeine: {
        label: 'Caffeine',
        datas: {
            heat: { 
                'Nutrient-sensing': 0.889824269,
                'Stem cell capacity': -0.313295619,
                'Cell-ECM communication': 0.494311192,
                'Mitochondrial function': -0.085210037,
                'Chronic inflammation control': 1.024462525,
                'Neural communication': 0.240828991,
                'Vascular/Lymphatic Flow': -0.67702961
            },
            score: { 
                'Nutrient-sensing': 85,
                'Stem cell capacity': -20,
                'Cell-ECM communication': 41,
                'Mitochondrial function': -6,
                'Chronic inflammation control': 103,
                'Neural communication': 18,
                'Vascular/Lymphatic Flow': -37
            },
            antiAging: 0.359252188, 
            ageGain: 4.9,
            biomarkers: {
                'Nutrient-sensing': [
                    { name: 'AdipoQ', value: 3 },
                    { name: 'AdipoQ secretion', value: 40 },
                    { name: 'GLUT4', value: 50 },
                    { name: 'FASN', value: 0 },
                    { name: 'PPARG', value: 90 }
                ],
                'Stem cell capacity': [
                    { name: 'MSCA1', value: 75 },
                    { name: 'PDGFRa', value: 60 },
                    { name: 'inhBA', value: 20 }
                ],
                'Cell-ECM communication': [
                    { name: 'COL1A1', value: 10 },
                    { name: 'COL3A1', value: 45 },
                    { name: 'COL1A1/COL3A1', value: 85 },
                    { name: 'TIMP1', value: 3 },
                    { name: 'TIMP1 secretion', value: 4 },
                    { name: 'Pro-col secretion', value: 50 }
                ],
                'Mitochondrial function': [
                    { name: 'CPT1M', value: 12 },
                    { name: 'COX4', value: 10 }
                ],
                'Chronic inflammation control': [
                    { name: 'ICAM1', value: 75 },
                    { name: 'aSMA', value: 96 },
                    { name: 'SPP1', value: 53 }
                ],
                'Neural communication': [
                    { name: 'NGF', value: 25 },
                    { name: 'STMN2', value: 41 },
                    { name: 'ENO2', value: 3 }
                ],
                'Vascular/Lymphatic Flow': [
                    { name: 'CD31', value: 9 },
                    { name: 'LYVE1', value: 15 }
                ]
            }
        }
    },
    antioxydant: {
        label: 'Anti-oxydant',
        datas: {
            heat: { 
                'Nutrient-sensing': -0.098801912,
                'Stem cell capacity': 0.166624451,
                'Cell-ECM communication': -0.710448894,
                'Mitochondrial function': 0.213619804,
                'Chronic inflammation control': -0.237989807,
                'Neural communication': 0.637926737,
                'Vascular/Lymphatic Flow': 0.793948078
            },
            score: { 
                'Nutrient-sensing': -7,
                'Stem cell capacity': 12,
                'Cell-ECM communication': -39,
                'Mitochondrial function': 16,
                'Chronic inflammation control': -15,
                'Neural communication': 56,
                'Vascular/Lymphatic Flow': 73
            },
            antiAging: -0.13180946, 
            ageGain: -2.0,
            biomarkers: {
                'Nutrient-sensing': [
                    { name: 'AdipoQ', value: null },
                    { name: 'AdipoQ secretion', value: null },
                    { name: 'GLUT4', value: null },
                    { name: 'FASN', value: null },
                    { name: 'PPARG', value: null }
                ],
                'Stem cell capacity': [
                    { name: 'MSCA1', value: null },
                    { name: 'PDGFRa', value: null },
                    { name: 'inhBA', value: null }
                ],
                'Cell-ECM communication': [
                    { name: 'COL1A1', value: null },
                    { name: 'COL3A1', value: null },
                    { name: 'COL1A1/COL3A1', value: null },
                    { name: 'TIMP1', value: null },
                    { name: 'TIMP1 secretion', value: null },
                    { name: 'Pro-col secretion', value: null }
                ],
                'Mitochondrial function': [
                    { name: 'CPT1M', value: null },
                    { name: 'COX4', value: null }
                ],
                'Chronic inflammation control': [
                    { name: 'ICAM1', value: null },
                    { name: 'aSMA', value: null },
                    { name: 'SPP1', value: null }
                ],
                'Neural communication': [
                    { name: 'NGF', value: null },
                    { name: 'STMN2', value: null },
                    { name: 'ENO2', value: null }
                ],
                'Vascular/Lymphatic Flow': [
                    { name: 'CD31', value: null },
                    { name: 'LYVE1', value: null }
                ]
            }
        }
    },
    antiinflammatory: {
        label: 'Anti-inflammatory',
        datas: {
            heat: { 
                'Nutrient-sensing': 1.439916494,
                'Stem cell capacity': -1.744054095,
                'Cell-ECM communication': 1.376324726,
                'Mitochondrial function': 0.01276083,
                'Chronic inflammation control': 1.330258958,
                'Neural communication': 0.755055507,
                'Vascular/Lymphatic Flow': -0.194488716
            },
            score: { 
                'Nutrient-sensing': 171,
                'Stem cell capacity': -70,
                'Cell-ECM communication': 160,
                'Mitochondrial function': 1,
                'Chronic inflammation control': 151,
                'Neural communication': 69,
                'Vascular/Lymphatic Flow': -13
            },
            antiAging: 0.64012325, 
            ageGain: 7.4,
            biomarkers: {
                'Nutrient-sensing': [
                    { name: 'AdipoQ', value: null },
                    { name: 'AdipoQ secretion', value: null },
                    { name: 'GLUT4', value: null },
                    { name: 'FASN', value: null },
                    { name: 'PPARG', value: null }
                ],
                'Stem cell capacity': [
                    { name: 'MSCA1', value: null },
                    { name: 'PDGFRa', value: null },
                    { name: 'inhBA', value: null }
                ],
                'Cell-ECM communication': [
                    { name: 'COL1A1', value: null },
                    { name: 'COL3A1', value: null },
                    { name: 'COL1A1/COL3A1', value: null },
                    { name: 'TIMP1', value: null },
                    { name: 'TIMP1 secretion', value: null },
                    { name: 'Pro-col secretion', value: null }
                ],
                'Mitochondrial function': [
                    { name: 'CPT1M', value: null },
                    { name: 'COX4', value: null }
                ],
                'Chronic inflammation control': [
                    { name: 'ICAM1', value: null },
                    { name: 'aSMA', value: null },
                    { name: 'SPP1', value: null }
                ],
                'Neural communication': [
                    { name: 'NGF', value: null },
                    { name: 'STMN2', value: null },
                    { name: 'ENO2', value: null }
                ],
                'Vascular/Lymphatic Flow': [
                    { name: 'CD31', value: null },
                    { name: 'LYVE1', value: null }
                ]
            }
        }
    },
    soothing: {
        label: 'Soothing',
        datas: {
            heat: { 
                'Nutrient-sensing': 0.59217289,
                'Stem cell capacity': -0.781312497,
                'Cell-ECM communication': -0.120205679,
                'Mitochondrial function': -0.174555969,
                'Chronic inflammation control': 0.416352352,
                'Neural communication': -0.064046621,
                'Vascular/Lymphatic Flow': -0.54795084
            },
            score: { 
                'Nutrient-sensing': 51,
                'Stem cell capacity': -42,
                'Cell-ECM communication': -8,
                'Mitochondrial function': -11,
                'Chronic inflammation control': 33,
                'Neural communication': -4,
                'Vascular/Lymphatic Flow': -32
            },
            antiAging: 0.11566192, 
            ageGain: 1.7,
            biomarkers: {
                'Nutrient-sensing': [
                    { name: 'AdipoQ', value: null },
                    { name: 'AdipoQ secretion', value: null },
                    { name: 'GLUT4', value: null },
                    { name: 'FASN', value: null },
                    { name: 'PPARG', value: null }
                ],
                'Stem cell capacity': [
                    { name: 'MSCA1', value: null },
                    { name: 'PDGFRa', value: null },
                    { name: 'inhBA', value: null }
                ],
                'Cell-ECM communication': [
                    { name: 'COL1A1', value: null },
                    { name: 'COL3A1', value: null },
                    { name: 'COL1A1/COL3A1', value: null },
                    { name: 'TIMP1', value: null },
                    { name: 'TIMP1 secretion', value: null },
                    { name: 'Pro-col secretion', value: null }
                ],
                'Mitochondrial function': [
                    { name: 'CPT1M', value: null },
                    { name: 'COX4', value: null }
                ],
                'Chronic inflammation control': [
                    { name: 'ICAM1', value: null },
                    { name: 'aSMA', value: null },
                    { name: 'SPP1', value: null }
                ],
                'Neural communication': [
                    { name: 'NGF', value: null },
                    { name: 'STMN2', value: null },
                    { name: 'ENO2', value: null }
                ],
                'Vascular/Lymphatic Flow': [
                    { name: 'CD31', value: null },
                    { name: 'LYVE1', value: null }
                ]
            }
        }
    },
    glp1agonist: {
        label: 'GLP-1 agonist',
        datas: {
            heat: { 
                'Nutrient-sensing': 0.794075859,
                'Stem cell capacity': 0.319309553,
                'Cell-ECM communication': -0.59856128,
                'Mitochondrial function': 0.725785573,
                'Chronic inflammation control': 0.429288758,
                'Neural communication': -0.384254667,
                'Vascular/Lymphatic Flow': null
            },
            score: { 
                'Nutrient-sensing': 73,
                'Stem cell capacity': 25,
                'Cell-ECM communication': -34,
                'Mitochondrial function': 65,
                'Chronic inflammation control': 35,
                'Neural communication': -23,
                'Vascular/Lymphatic Flow': null
            },
            antiAging: 0.26190119, 
            ageGain: 3.7,
            biomarkers: {
                'Nutrient-sensing': [
                    { name: 'AdipoQ', value: null },
                    { name: 'AdipoQ secretion', value: null },
                    { name: 'GLUT4', value: null },
                    { name: 'FASN', value: null },
                    { name: 'PPARG', value: null }
                ],
                'Stem cell capacity': [
                    { name: 'MSCA1', value: null },
                    { name: 'PDGFRa', value: null },
                    { name: 'inhBA', value: null }
                ],
                'Cell-ECM communication': [
                    { name: 'COL1A1', value: null },
                    { name: 'COL3A1', value: null },
                    { name: 'COL1A1/COL3A1', value: null },
                    { name: 'TIMP1', value: null },
                    { name: 'TIMP1 secretion', value: null },
                    { name: 'Pro-col secretion', value: null }
                ],
                'Mitochondrial function': [
                    { name: 'CPT1M', value: null },
                    { name: 'COX4', value: null }
                ],
                'Chronic inflammation control': [
                    { name: 'ICAM1', value: null },
                    { name: 'aSMA', value: null },
                    { name: 'SPP1', value: null }
                ],
                'Neural communication': [
                    { name: 'NGF', value: null },
                    { name: 'STMN2', value: null },
                    { name: 'ENO2', value: null }
                ],
                'Vascular/Lymphatic Flow': [
                    { name: 'CD31', value: null },
                    { name: 'LYVE1', value: null }
                ]
            }
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
            score: { 
                'Nutrient-sensing': -15,
                'Stem cell capacity': -30,
                'Cell-ECM communication': 1,
                'Mitochondrial function': -30,
                'Chronic inflammation control': -15,
                'Neural communication': -45,
                'Vascular/Lymphatic Flow': -25
            },
            antiAging: -0.44653357, 
            ageGain: -5.8,
            biomarkers: {
                'Nutrient-sensing': [
                    { name: 'AdipoQ', value: null },
                    { name: 'AdipoQ secretion', value: null },
                    { name: 'GLUT4', value: null },
                    { name: 'FASN', value: null },
                    { name: 'PPARG', value: null }
                ],
                'Stem cell capacity': [
                    { name: 'MSCA1', value: null },
                    { name: 'PDGFRa', value: null },
                    { name: 'inhBA', value: null }
                ],
                'Cell-ECM communication': [
                    { name: 'COL1A1', value: null },
                    { name: 'COL3A1', value: null },
                    { name: 'COL1A1/COL3A1', value: null },
                    { name: 'TIMP1', value: null },
                    { name: 'TIMP1 secretion', value: null },
                    { name: 'Pro-col secretion', value: null }
                ],
                'Mitochondrial function': [
                    { name: 'CPT1M', value: null },
                    { name: 'COX4', value: null }
                ],
                'Chronic inflammation control': [
                    { name: 'ICAM1', value: null },
                    { name: 'aSMA', value: null },
                    { name: 'SPP1', value: null }
                ],
                'Neural communication': [
                    { name: 'NGF', value: null },
                    { name: 'STMN2', value: null },
                    { name: 'ENO2', value: null }
                ],
                'Vascular/Lymphatic Flow': [
                    { name: 'CD31', value: null },
                    { name: 'LYVE1', value: null }
                ]
            }
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
                'Cell-ECM communication': 0.132883166,
                'Mitochondrial function': 0.123970852,
                'Chronic inflammation control': 0.645726825,
                'Neural communication': 0.518797414,
                'Vascular/Lymphatic Flow': 0.163431585
            },
            score: {
                'Nutrient-sensing': 51,
                'Stem cell capacity': 2,
                'Cell-ECM communication': 10,
                'Mitochondrial function': 9,
                'Chronic inflammation control': 56,
                'Neural communication': 43,
                'Vascular/Lymphatic Flow': 12
            },
            antiAging: 0.294142315,
            ageGain: 4.1
        }
    },
    caffeine_antiinflammatory: {
        label: 'Caffeine + Anti-inflammatory',
        compounds: ["caffeine", "antiinflammatory"],
        datas: {
            heat: {
                'Nutrient-sensing': 1.274888827,
                'Stem cell capacity': -0.742523162,
                'Cell-ECM communication': 1.111720666,
                'Mitochondrial function': -0.01663043,
                'Chronic inflammation control': 1.238520028,
                'Neural communication': 0.600787552,
                'Vascular/Lymphatic Flow': -0.339250984
            },
            score: {
                'Nutrient-sensing': 142,
                'Stem cell capacity': -40,
                'Cell-ECM communication': 116,
                'Mitochondrial function': -1,
                'Chronic inflammation control': 136,
                'Neural communication': 52,
                'Vascular/Lymphatic Flow': -21
            },
            antiAging: 0.646010876,
            ageGain: 7.5
        }
    },
    caffeine_soothing: {
        label: 'Caffeine + Soothing',
        compounds: ["caffeine", "soothing"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.800528855,
                'Stem cell capacity': -0.453700682,
                'Cell-ECM communication': 0.30995613,
                'Mitochondrial function': -0.112013817,
                'Chronic inflammation control': 0.842029473,
                'Neural communication': 0.149366307,
                'Vascular/Lymphatic Flow': -0.586674471
            },
            score: {
                'Nutrient-sensing': 74,
                'Stem cell capacity': -27,
                'Cell-ECM communication': 24,
                'Mitochondrial function': -7,
                'Chronic inflammation control': 79,
                'Neural communication': 11,
                'Vascular/Lymphatic Flow': -33
            },
            antiAging: 0.282202719,
            ageGain: 4.0
        }
    },
    caffeine_glp1agonist: {
        label: 'Caffeine + GLP-1 agonist',
        compounds: ["caffeine", "glp1agonist"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.861099746,
                'Stem cell capacity': 0.129528001,
                'Cell-ECM communication': 0.16644945,
                'Mitochondrial function': 0.48248689,
                'Chronic inflammation control': 0.845910395,
                'Neural communication': 0.053303893,
                'Vascular/Lymphatic Flow': null
            },
            score: {
                'Nutrient-sensing': 82,
                'Stem cell capacity': 9,
                'Cell-ECM communication': 12,
                'Mitochondrial function': 40,
                'Chronic inflammation control': 80,
                'Neural communication': 4,
                'Vascular/Lymphatic Flow': null
            },
            antiAging: 0.478858626,
            ageGain: 6.2
        }
    },
    caffeine_botulinumtoxin: {
        label: 'Caffeine + Botulinum toxin',
        compounds: ["caffeine", "botulinumtoxin"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.554641019,
                'Stem cell capacity': -0.374597187,
                'Cell-ECM communication': 0.351846359,
                'Mitochondrial function': -0.215880527,
                'Chronic inflammation control': 0.648168489,
                'Neural communication': -0.087451156,
                'Vascular/Lymphatic Flow': -0.497238111
            },
            score: {
                'Nutrient-sensing': 47,
                'Stem cell capacity': -23,
                'Cell-ECM communication': 28,
                'Mitochondrial function': -14,
                'Chronic inflammation control': 57,
                'Neural communication': -6,
                'Vascular/Lymphatic Flow': -29
            },
            antiAging: 0.12717105,
            ageGain: 1.9
        }
    },
    antioxydant_antiinflammatory: {
        label: 'Anti-oxydant + Anti-inflammatory',
        compounds: ["antioxydant", "antiinflammatory"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.978300972,
                'Stem cell capacity': -0.406579113,
                'Cell-ECM communication': 0.75029264,
                'Mitochondrial function': 0.153362112,
                'Chronic inflammation control': 0.859784328,
                'Neural communication': 0.719916876,
                'Vascular/Lymphatic Flow': 0.202265096
            },
            score: {
                'Nutrient-sensing': 97,
                'Stem cell capacity': -25,
                'Cell-ECM communication': 68,
                'Mitochondrial function': 11,
                'Chronic inflammation control': 81,
                'Neural communication': 65,
                'Vascular/Lymphatic Flow': 15
            },
            antiAging: 0.550191947,
            ageGain: 6.8
        }
    },
    antioxydant_soothing: {
        label: 'Anti-oxydant + Soothing',
        compounds: ["antioxydant", "soothing"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.384880449,
                'Stem cell capacity': -0.117756634,
                'Cell-ECM communication': -0.297278643,
                'Mitochondrial function': 0.097167072,
                'Chronic inflammation control': 0.220049704,
                'Neural communication': 0.42733473,
                'Vascular/Lymphatic Flow': 0.191802287
            },
            score: {
                'Nutrient-sensing': 31,
                'Stem cell capacity': -8,
                'Cell-ECM communication': -19,
                'Mitochondrial function': 7,
                'Chronic inflammation control': 16,
                'Neural communication': 34,
                'Vascular/Lymphatic Flow': 14
            },
            antiAging: 0.125264588,
            ageGain: 1.9
        }
    },
    antioxydant_glp1agonist: {
        label: 'Anti-oxydant + GLP-1 agonist',
        compounds: ["antioxydant", "glp1agonist"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.526212528,
                'Stem cell capacity': 0.273504022,
                'Cell-ECM communication': -0.632127564,
                'Mitochondrial function': 0.572135843,
                'Chronic inflammation control': 0.229105189,
                'Neural communication': 0.331272316,
                'Vascular/Lymphatic Flow': null
            },
            score: {
                'Nutrient-sensing': 44,
                'Stem cell capacity': 21,
                'Cell-ECM communication': -35,
                'Mitochondrial function': 49,
                'Chronic inflammation control': 17,
                'Neural communication': 26,
                'Vascular/Lymphatic Flow': null
            },
            antiAging: 0.204399469,
            ageGain: 3.0
        }
    },
    antioxydant_botulinumtoxin: {
        label: 'Anti-oxydant + Botulinum toxin',
        compounds: ["antioxydant", "botulinumtoxin"],
        datas: {
            heat: {
                'Nutrient-sensing': -0.137397308,
                'Stem cell capacity': -0.038653138,
                'Cell-ECM communication': -0.199534777,
                'Mitochondrial function': -0.006699638,
                'Chronic inflammation control': -0.232292592,
                'Neural communication': 0.190517267,
                'Vascular/Lymphatic Flow': null
            },
            score: {
                'Nutrient-sensing': -9,
                'Stem cell capacity': -3,
                'Cell-ECM communication': -13,
                'Mitochondrial function': 0,
                'Chronic inflammation control': -15,
                'Neural communication': 14,
                'Vascular/Lymphatic Flow': null
            },
            antiAging: -0.104612476,
            ageGain: -1.6
        }
    },
    antiinflammatory_soothing: {
        label: 'Anti-inflammatory + Soothing',
        compounds: ["antiinflammatory", "soothing"],
        datas: {
            heat: {
                'Nutrient-sensing': 1.185593413,
                'Stem cell capacity': -1.070134977,
                'Cell-ECM communication': 0.927365605,
                'Mitochondrial function': -0.04343421,
                'Chronic inflammation control': 1.056086976,
                'Neural communication': 0.509324869,
                'Vascular/Lymphatic Flow': -0.300527353
            },
            score: {
                'Nutrient-sensing': 127,
                'Stem cell capacity': -52,
                'Cell-ECM communication': 90,
                'Mitochondrial function': -3,
                'Chronic inflammation control': 108,
                'Neural communication': 42,
                'Vascular/Lymphatic Flow': -17
            },
            antiAging: 0.531876352,
            ageGain: 6.6
        }
    },
    antiinflammatory_glp1agonist: {
        label: 'Anti-inflammatory + GLP-1 agonist',
        compounds: ["antiinflammatory", "glp1agonist"],
        datas: {
            heat: {
                'Nutrient-sensing': 1.246164304,
                'Stem cell capacity': -0.299699542,
                'Cell-ECM communication': 0.783858924,
                'Mitochondrial function': 0.51187815,
                'Chronic inflammation control': 1.059967898,
                'Neural communication': 0.413262455,
                'Vascular/Lymphatic Flow': null
            },
            score: {
                'Nutrient-sensing': 137,
                'Stem cell capacity': -19,
                'Cell-ECM communication': 72,
                'Mitochondrial function': 43,
                'Chronic inflammation control': 108,
                'Neural communication': 33,
                'Vascular/Lymphatic Flow': null
            },
            antiAging: 0.707418044,
            ageGain: 7.9
        }
    },
    antiinflammatory_botulinumtoxin: {
        label: 'Anti-inflammatory + Botulinum toxin',
        compounds: ["antiinflammatory", "botulinumtoxin"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.939705576,
                'Stem cell capacity': -0.885560154,
                'Cell-ECM communication': 0.969255833,
                'Mitochondrial function': -0.14730092,
                'Chronic inflammation control': 0.862225992,
                'Neural communication': 0.272507405,
                'Vascular/Lymphatic Flow': -0.458514481
            },
            score: {
                'Nutrient-sensing': 92,
                'Stem cell capacity': -46,
                'Cell-ECM communication': 96,
                'Mitochondrial function': -10,
                'Chronic inflammation control': 82,
                'Neural communication': 21,
                'Vascular/Lymphatic Flow': -27
            },
            antiAging: 0.391963924,
            ageGain: 5.3
        }
    },
    soothing_glp1agonist: {
        label: 'Soothing + GLP-1 agonist',
        compounds: ["soothing", "glp1agonist"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.733504968,
                'Stem cell capacity': -0.010877062,
                'Cell-ECM communication': -0.263712359,
                'Mitochondrial function': 0.455683111,
                'Chronic inflammation control': 0.425407836,
                'Neural communication': -0.160109035,
                'Vascular/Lymphatic Flow': null
            },
            score: {
                'Nutrient-sensing': 66,
                'Stem cell capacity': -1,
                'Cell-ECM communication': -17,
                'Mitochondrial function': 37,
                'Chronic inflammation control': 34,
                'Neural communication': -11,
                'Vascular/Lymphatic Flow': null
            },
            antiAging: 0.305408792,
            ageGain: 4.3
        }
    },
    soothing_botulinumtoxin: {
        label: 'Soothing + Botulinum toxin',
        compounds: ["soothing", "botulinumtoxin"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.346285053,
                'Stem cell capacity': -0.596737675,
                'Cell-ECM communication': -0.022461813,
                'Mitochondrial function': -0.27842268,
                'Chronic inflammation control': 0.222491368,
                'Neural communication': -0.300864085,
                'Vascular/Lymphatic Flow': -0.458514481
            },
            score: {
                'Nutrient-sensing': 27,
                'Stem cell capacity': -34,
                'Cell-ECM communication': -2,
                'Mitochondrial function': -18,
                'Chronic inflammation control': 17,
                'Neural communication': -19,
                'Vascular/Lymphatic Flow': -28
            },
            antiAging: -0.067881327,
            ageGain: -1.0
        }
    },
    glp1agonist_botulinumtoxin: {
        label: 'GLP-1 agonist + Botulinum toxin',
        compounds: ["glp1agonist", "botulinumtoxin"],
        datas: {
            heat: {
                'Nutrient-sensing': 0.487617132,
                'Stem cell capacity': 0.068226433,
                'Cell-ECM communication': 0.3518164,
                'Mitochondrial function': 0.3518164,
                'Chronic inflammation control': 0.231546852,
                'Neural communication': -0.525009717,
                'Vascular/Lymphatic Flow': null
            },
            score: {
                'Nutrient-sensing': 40,
                'Stem cell capacity': 5,
                'Cell-ECM communication': 28,
                'Mitochondrial function': 28,
                'Chronic inflammation control': 17,
                'Neural communication': -31,
                'Vascular/Lymphatic Flow': null
            },
            antiAging: -0.09231619,
            ageGain: -1.05
        }
    }
};