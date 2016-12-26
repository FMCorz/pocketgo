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

const LEVELS = [
  [37,45],
  [30,36],
  [23,29],
  [0,22],
];

const ATTRS = [
  'attack',
  'defense',
  'hp',
];

const STRENGTH = [
  [15, 15],
  [13, 14],
  [8, 12],
  [0, 7]
];

function computeMinMax(minTotal, maxTotal, itemMin, itemMax, itemCount, otherItemsCount) {
  const m = itemCount;
  const n = otherItemsCount;
  const mRange = [itemMin, itemMax];
  let otherMin = null;
  let otherMax = null;

  let i = mRange[0] - 1;
  do {
    i++;

    // J is the max value for N for this i.
    let j = Math.max(0, i - 1);
    // MaxX is maximum N can be.
    let maxX = Math.max(0, Math.min(j, maxTotal - i * m));
    // Best total.
    let bestTotal = i * m + maxX * n;
    // MinX is minumum N can be.
    let minX = Math.max(0, Math.min(maxX, minTotal - i * m - maxX * (n - 1)));

    // If the overall max is exceeded by the M values only.
    if (maxTotal - i * m < 0) {
      mRange[1] = Math.max(Math.min(mRange[1], i - 1), mRange[0]);
      break;

    // If we can't even reach the minimum total.
    } else if (minTotal > bestTotal) {
      mRange[0] = Math.min(Math.max(mRange[0], i + 1), mRange[1]);
      continue;
    }


    // Store and continue.
    otherMin = (otherMin === null) ? minX : Math.min(minX, otherMin);
    otherMax = (otherMax === null) ? maxX : Math.max(maxX, otherMax);

  } while(i < mRange[1]);

  // We never got to store a min or max for N, it's thus impossible.
  if (otherMin === null || otherMax === null) {
    return null;
  }

  [itemMin, itemMax] = mRange;

  return {
    itemMin,
    itemMax,
    otherMin,
    otherMax,
  };
}

export function appraise(levelIndex, attrs, strengthIndex) {
  const total = LEVELS[levelIndex];
  const strength = STRENGTH[strengthIndex];
  const otherAttrs = ATTRS.filter((t) => {
    return attrs.indexOf(t) < 0;
  });

  const result = {
    attack: [0, 15],
    defense: [0, 15],
    hp: [0, 15],
    total: total,
  };

  const computed = computeMinMax(total[0], total[1], strength[0], strength[1], attrs.length, ATTRS.length - attrs.length);
  if (computed === null) {
    return false;
  }

  attrs.map((t) => {
    result[t] = [computed.itemMin, computed.itemMax];
  });

  otherAttrs.map((t) => {
    result[t] = [computed.otherMin, computed.otherMax];
  })

  // Update final range.
  result.total = [
    Math.max(total[0], result.attack[0] + result.defense[0] + result.hp[0]),
    Math.min(total[1], result.attack[1] + result.defense[1] + result.hp[1]),
  ];

  return result;
}
