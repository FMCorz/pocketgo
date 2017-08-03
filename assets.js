/**
 * Copyright 2016 Frédéric Massart
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var assets = {
    candy: require('./assets/sprites/candy.png'),
    egg: require('./assets/sprites/egg.png'),

    blanche: require('./assets/teams/blanche.png'),
    candela: require('./assets/teams/candela.png'),
    instinct: require('./assets/teams/instinct.png'),
    mystic: require('./assets/teams/mystic.png'),
    spark: require('./assets/teams/spark.png'),
    valor: require('./assets/teams/valor.png'),

    1: require('./assets/sprites/1.png'),
    2: require('./assets/sprites/2.png'),
    3: require('./assets/sprites/3.png'),
    4: require('./assets/sprites/4.png'),
    5: require('./assets/sprites/5.png'),
    6: require('./assets/sprites/6.png'),
    7: require('./assets/sprites/7.png'),
    8: require('./assets/sprites/8.png'),
    9: require('./assets/sprites/9.png'),
    10: require('./assets/sprites/10.png'),
    11: require('./assets/sprites/11.png'),
    12: require('./assets/sprites/12.png'),
    13: require('./assets/sprites/13.png'),
    14: require('./assets/sprites/14.png'),
    15: require('./assets/sprites/15.png'),
    16: require('./assets/sprites/16.png'),
    17: require('./assets/sprites/17.png'),
    18: require('./assets/sprites/18.png'),
    19: require('./assets/sprites/19.png'),
    20: require('./assets/sprites/20.png'),
    21: require('./assets/sprites/21.png'),
    22: require('./assets/sprites/22.png'),
    23: require('./assets/sprites/23.png'),
    24: require('./assets/sprites/24.png'),
    25: require('./assets/sprites/25.png'),
    26: require('./assets/sprites/26.png'),
    27: require('./assets/sprites/27.png'),
    28: require('./assets/sprites/28.png'),
    29: require('./assets/sprites/29.png'),
    30: require('./assets/sprites/30.png'),
    31: require('./assets/sprites/31.png'),
    32: require('./assets/sprites/32.png'),
    33: require('./assets/sprites/33.png'),
    34: require('./assets/sprites/34.png'),
    35: require('./assets/sprites/35.png'),
    36: require('./assets/sprites/36.png'),
    37: require('./assets/sprites/37.png'),
    38: require('./assets/sprites/38.png'),
    39: require('./assets/sprites/39.png'),
    40: require('./assets/sprites/40.png'),
    41: require('./assets/sprites/41.png'),
    42: require('./assets/sprites/42.png'),
    43: require('./assets/sprites/43.png'),
    44: require('./assets/sprites/44.png'),
    45: require('./assets/sprites/45.png'),
    46: require('./assets/sprites/46.png'),
    47: require('./assets/sprites/47.png'),
    48: require('./assets/sprites/48.png'),
    49: require('./assets/sprites/49.png'),
    50: require('./assets/sprites/50.png'),
    51: require('./assets/sprites/51.png'),
    52: require('./assets/sprites/52.png'),
    53: require('./assets/sprites/53.png'),
    54: require('./assets/sprites/54.png'),
    55: require('./assets/sprites/55.png'),
    56: require('./assets/sprites/56.png'),
    57: require('./assets/sprites/57.png'),
    58: require('./assets/sprites/58.png'),
    59: require('./assets/sprites/59.png'),
    60: require('./assets/sprites/60.png'),
    61: require('./assets/sprites/61.png'),
    62: require('./assets/sprites/62.png'),
    63: require('./assets/sprites/63.png'),
    64: require('./assets/sprites/64.png'),
    65: require('./assets/sprites/65.png'),
    66: require('./assets/sprites/66.png'),
    67: require('./assets/sprites/67.png'),
    68: require('./assets/sprites/68.png'),
    69: require('./assets/sprites/69.png'),
    70: require('./assets/sprites/70.png'),
    71: require('./assets/sprites/71.png'),
    72: require('./assets/sprites/72.png'),
    73: require('./assets/sprites/73.png'),
    74: require('./assets/sprites/74.png'),
    75: require('./assets/sprites/75.png'),
    76: require('./assets/sprites/76.png'),
    77: require('./assets/sprites/77.png'),
    78: require('./assets/sprites/78.png'),
    79: require('./assets/sprites/79.png'),
    80: require('./assets/sprites/80.png'),
    81: require('./assets/sprites/81.png'),
    82: require('./assets/sprites/82.png'),
    83: require('./assets/sprites/83.png'),
    84: require('./assets/sprites/84.png'),
    85: require('./assets/sprites/85.png'),
    86: require('./assets/sprites/86.png'),
    87: require('./assets/sprites/87.png'),
    88: require('./assets/sprites/88.png'),
    89: require('./assets/sprites/89.png'),
    90: require('./assets/sprites/90.png'),
    91: require('./assets/sprites/91.png'),
    92: require('./assets/sprites/92.png'),
    93: require('./assets/sprites/93.png'),
    94: require('./assets/sprites/94.png'),
    95: require('./assets/sprites/95.png'),
    96: require('./assets/sprites/96.png'),
    97: require('./assets/sprites/97.png'),
    98: require('./assets/sprites/98.png'),
    99: require('./assets/sprites/99.png'),
    100: require('./assets/sprites/100.png'),
    101: require('./assets/sprites/101.png'),
    102: require('./assets/sprites/102.png'),
    103: require('./assets/sprites/103.png'),
    104: require('./assets/sprites/104.png'),
    105: require('./assets/sprites/105.png'),
    106: require('./assets/sprites/106.png'),
    107: require('./assets/sprites/107.png'),
    108: require('./assets/sprites/108.png'),
    109: require('./assets/sprites/109.png'),
    110: require('./assets/sprites/110.png'),
    111: require('./assets/sprites/111.png'),
    112: require('./assets/sprites/112.png'),
    113: require('./assets/sprites/113.png'),
    114: require('./assets/sprites/114.png'),
    115: require('./assets/sprites/115.png'),
    116: require('./assets/sprites/116.png'),
    117: require('./assets/sprites/117.png'),
    118: require('./assets/sprites/118.png'),
    119: require('./assets/sprites/119.png'),
    120: require('./assets/sprites/120.png'),
    121: require('./assets/sprites/121.png'),
    122: require('./assets/sprites/122.png'),
    123: require('./assets/sprites/123.png'),
    124: require('./assets/sprites/124.png'),
    125: require('./assets/sprites/125.png'),
    126: require('./assets/sprites/126.png'),
    127: require('./assets/sprites/127.png'),
    128: require('./assets/sprites/128.png'),
    129: require('./assets/sprites/129.png'),
    130: require('./assets/sprites/130.png'),
    131: require('./assets/sprites/131.png'),
    132: require('./assets/sprites/132.png'),
    133: require('./assets/sprites/133.png'),
    134: require('./assets/sprites/134.png'),
    135: require('./assets/sprites/135.png'),
    136: require('./assets/sprites/136.png'),
    137: require('./assets/sprites/137.png'),
    138: require('./assets/sprites/138.png'),
    139: require('./assets/sprites/139.png'),
    140: require('./assets/sprites/140.png'),
    141: require('./assets/sprites/141.png'),
    142: require('./assets/sprites/142.png'),
    143: require('./assets/sprites/143.png'),
    144: require('./assets/sprites/144.png'),
    145: require('./assets/sprites/145.png'),
    146: require('./assets/sprites/146.png'),
    147: require('./assets/sprites/147.png'),
    148: require('./assets/sprites/148.png'),
    149: require('./assets/sprites/149.png'),
    150: require('./assets/sprites/150.png'),
    151: require('./assets/sprites/151.png'),

    // Generation 2.
    152: require('./assets/sprites/152.png'),
    153: require('./assets/sprites/153.png'),
    154: require('./assets/sprites/154.png'),
    155: require('./assets/sprites/155.png'),
    156: require('./assets/sprites/156.png'),
    157: require('./assets/sprites/157.png'),
    158: require('./assets/sprites/158.png'),
    159: require('./assets/sprites/159.png'),
    160: require('./assets/sprites/160.png'),
    161: require('./assets/sprites/161.png'),
    162: require('./assets/sprites/162.png'),
    163: require('./assets/sprites/163.png'),
    164: require('./assets/sprites/164.png'),
    165: require('./assets/sprites/165.png'),
    166: require('./assets/sprites/166.png'),
    167: require('./assets/sprites/167.png'),
    168: require('./assets/sprites/168.png'),
    169: require('./assets/sprites/169.png'),
    170: require('./assets/sprites/170.png'),
    171: require('./assets/sprites/171.png'),
    172: require('./assets/sprites/172.png'),
    173: require('./assets/sprites/173.png'),
    174: require('./assets/sprites/174.png'),
    175: require('./assets/sprites/175.png'),
    176: require('./assets/sprites/176.png'),
    177: require('./assets/sprites/177.png'),
    178: require('./assets/sprites/178.png'),
    179: require('./assets/sprites/179.png'),
    180: require('./assets/sprites/180.png'),
    181: require('./assets/sprites/181.png'),
    182: require('./assets/sprites/182.png'),
    183: require('./assets/sprites/183.png'),
    184: require('./assets/sprites/184.png'),
    185: require('./assets/sprites/185.png'),
    186: require('./assets/sprites/186.png'),
    187: require('./assets/sprites/187.png'),
    188: require('./assets/sprites/188.png'),
    189: require('./assets/sprites/189.png'),
    190: require('./assets/sprites/190.png'),
    191: require('./assets/sprites/191.png'),
    192: require('./assets/sprites/192.png'),
    193: require('./assets/sprites/193.png'),
    194: require('./assets/sprites/194.png'),
    195: require('./assets/sprites/195.png'),
    196: require('./assets/sprites/196.png'),
    197: require('./assets/sprites/197.png'),
    198: require('./assets/sprites/198.png'),
    199: require('./assets/sprites/199.png'),
    200: require('./assets/sprites/200.png'),
    201: require('./assets/sprites/201.png'),
    202: require('./assets/sprites/202.png'),
    203: require('./assets/sprites/203.png'),
    204: require('./assets/sprites/204.png'),
    205: require('./assets/sprites/205.png'),
    206: require('./assets/sprites/206.png'),
    207: require('./assets/sprites/207.png'),
    208: require('./assets/sprites/208.png'),
    209: require('./assets/sprites/209.png'),
    210: require('./assets/sprites/210.png'),
    211: require('./assets/sprites/211.png'),
    212: require('./assets/sprites/212.png'),
    213: require('./assets/sprites/213.png'),
    214: require('./assets/sprites/214.png'),
    215: require('./assets/sprites/215.png'),
    216: require('./assets/sprites/216.png'),
    217: require('./assets/sprites/217.png'),
    218: require('./assets/sprites/218.png'),
    219: require('./assets/sprites/219.png'),
    220: require('./assets/sprites/220.png'),
    221: require('./assets/sprites/221.png'),
    222: require('./assets/sprites/222.png'),
    223: require('./assets/sprites/223.png'),
    224: require('./assets/sprites/224.png'),
    225: require('./assets/sprites/225.png'),
    226: require('./assets/sprites/226.png'),
    227: require('./assets/sprites/227.png'),
    228: require('./assets/sprites/228.png'),
    229: require('./assets/sprites/229.png'),
    230: require('./assets/sprites/230.png'),
    231: require('./assets/sprites/231.png'),
    232: require('./assets/sprites/232.png'),
    233: require('./assets/sprites/233.png'),
    234: require('./assets/sprites/234.png'),
    235: require('./assets/sprites/235.png'),
    236: require('./assets/sprites/236.png'),
    237: require('./assets/sprites/237.png'),
    238: require('./assets/sprites/238.png'),
    239: require('./assets/sprites/239.png'),
    240: require('./assets/sprites/240.png'),
    241: require('./assets/sprites/241.png'),
    242: require('./assets/sprites/242.png'),
    243: require('./assets/sprites/243.png'),
    244: require('./assets/sprites/244.png'),
    245: require('./assets/sprites/245.png'),
    246: require('./assets/sprites/246.png'),
    247: require('./assets/sprites/247.png'),
    248: require('./assets/sprites/248.png'),
    249: require('./assets/sprites/249.png'),
    250: require('./assets/sprites/250.png'),
    251: require('./assets/sprites/251.png'),
};

export default assets;
