import { appraise } from '../lib';

describe('Appraisal results', () => {

  // Total ranges.
  const BESTRANGE = 0;      // Corresponds to 37-45.
  const SECONDRANGE = 1;    // Corresponds to 30-36.
  const THIRDRANGE = 2;     // Corresponds to 23-29.
  const LASTRANGE = 3;      // Corresponds to 0-22.

  // The different attributes.
  const HP = 'hp';
  const ATK = 'attack';
  const DEF = 'defense';

  // Attribute strength.
  const PERFECT = 0;  // Corresponds to 15.
  const TOP2 = 1;     // Corresponds to 13-14.
  const TOP3 = 2;     // Corresponds to 8-12.
  const LOWEST = 3;   // Corresponds to 0-7.

  it('finds a perfect score (in the best range)', () => {
    expect(appraise(BESTRANGE, [HP, ATK, DEF], PERFECT)).toEqual({
      hp: [15, 15],
      attack: [15, 15],
      defense: [15, 15],
      total: [45, 45]
    });
  });

  it('finds when 2/3 attributes are perfect (in the best range)', () => {
    expect(appraise(BESTRANGE, [HP, ATK], PERFECT)).toEqual({
      hp: [15, 15],
      attack: [15, 15],
      defense: [7, 14],
      total: [37, 44]
    });
  });

  it('finds when 1/3 attributes are perfect (in the best range)', () => {
    expect(appraise(BESTRANGE, [HP], PERFECT)).toEqual({
      hp: [15, 15],
      attack: [8, 14],
      defense: [8, 14],
      total: [37, 43]
    });
  });

  it('finds when all attributes are top 2 (in the best range)', () => {
    expect(appraise(BESTRANGE, [HP, ATK, DEF], TOP2)).toEqual({
      hp: [13, 14],
      attack: [13, 14],
      defense: [13, 14],
      total: [39, 42]
    });
  });

  it('finds when 2/3 attributes are top 2 (in the best range)', () => {
    expect(appraise(BESTRANGE, [HP, ATK], TOP2)).toEqual({
      hp: [13, 14],
      attack: [13, 14],
      defense: [9, 13],
      total: [37, 41]
    });
  });

  it('finds when 1/3 attributes are top 2 (in the best range)', () => {
    expect(appraise(BESTRANGE, [HP], TOP2)).toEqual({
      hp: [13, 14],
      attack: [10, 13],
      defense: [10, 13],
      total: [37, 40]
    });
  });

  it('cannot find anything else in the best range', () => {
    expect(appraise(BESTRANGE, [HP, ATK, DEF], TOP3)).toBe(false);
    expect(appraise(BESTRANGE, [HP, ATK], TOP3)).toBe(false);
    expect(appraise(BESTRANGE, [HP], TOP3)).toBe(false);
    expect(appraise(BESTRANGE, [HP, ATK, DEF], LOWEST)).toBe(false);
    expect(appraise(BESTRANGE, [HP, ATK], LOWEST)).toBe(false);
    expect(appraise(BESTRANGE, [HP], LOWEST)).toBe(false);
  });

  it('cannot find anything for all best attributes (in the second range)', () => {
    expect(appraise(SECONDRANGE, [HP, ATK, DEF], PERFECT)).toEqual(false);
  });

  it('finds when 2/3 attributes are perfect (in the second range)', () => {
    expect(appraise(SECONDRANGE, [HP, ATK], PERFECT)).toEqual({
      hp: [15, 15],
      attack: [15, 15],
      defense: [0, 6],
      total: [30, 36]
    });
  });

  it('finds when 1/3 attributes are perfect (in the second range)', () => {
    expect(appraise(SECONDRANGE, [HP], PERFECT)).toEqual({
      hp: [15, 15],
      attack: [1, 14],
      defense: [1, 14],
      total: [30, 36]
    });
  });

  it('cannot find anything when all attributes are top 2 (in the second range)', () => {
    expect(appraise(SECONDRANGE, [HP, ATK, DEF], TOP2)).toEqual(false);
  });

  it('finds when 2/3 attributes are top 2 (in the second range)', () => {
    expect(appraise(SECONDRANGE, [HP, ATK], TOP2)).toEqual({
      hp: [13, 14],
      attack: [13, 14],
      defense: [2, 10],
      total: [30, 36]
    });
  });

  it('finds when 1/3 attributes are top 2 (in the second range)', () => {
    expect(appraise(SECONDRANGE, [HP], TOP2)).toEqual({
      hp: [13, 14],
      attack: [3, 13],
      defense: [3, 13],
      total: [30, 36]
    });
  });

  it('finds when all attributes are top 3 (in the second range)', () => {
    expect(appraise(SECONDRANGE, [HP, ATK, DEF], TOP3)).toEqual({
      hp: [10, 12],
      attack: [10, 12],
      defense: [10, 12],
      total: [30, 36]
    });
  });

  it('finds when 2/3 attributes are top 3 (in the second range)', () => {
    expect(appraise(SECONDRANGE, [HP, ATK], TOP3)).toEqual({
      hp: [11, 12],
      attack: [11, 12],
      defense: [6, 11],
      total: [30, 35]
    });
  });

  it('finds when 1/3 attributes are top 3 (in the second range)', () => {
    expect(appraise(SECONDRANGE, [HP], TOP3)).toEqual({
      hp: [11, 12],
      attack: [7, 11],
      defense: [7, 11],
      total: [30, 34]
    });
  });

  it('cannot find anything else in the second range', () => {
    expect(appraise(SECONDRANGE, [HP, ATK, DEF], LOWEST)).toEqual(false);
    expect(appraise(SECONDRANGE, [HP, ATK], LOWEST)).toEqual(false);
    expect(appraise(SECONDRANGE, [HP], LOWEST)).toEqual(false);
  });

  it('cannot find anything for high scoring attributes (in the third range)', () => {
    expect(appraise(THIRDRANGE, [HP, ATK, DEF], PERFECT)).toEqual(false);
    expect(appraise(THIRDRANGE, [HP, ATK], PERFECT)).toEqual(false);
    expect(appraise(THIRDRANGE, [HP, ATK, DEF], TOP2)).toEqual(false);
  });

  it('finds when 1/3 attributes are perfect (in the third range)', () => {
    expect(appraise(THIRDRANGE, [HP], PERFECT)).toEqual({
      hp: [15, 15],
      attack: [0, 14],
      defense: [0, 14],
      total: [23, 29]
    });
  });

  it('finds when 2/3 attributes are top 2 (in the third range)', () => {
    expect(appraise(THIRDRANGE, [HP, ATK], TOP2)).toEqual({
      hp: [13, 14],
      attack: [13, 14],
      defense: [0, 3],
      total: [26, 29]
    });
  });

  it('finds when 1/3 attributes are top 2 (in the third range)', () => {
    expect(appraise(THIRDRANGE, [HP], TOP2)).toEqual({
      hp: [13, 14],
      attack: [0, 13],
      defense: [0, 13],
      total: [23, 29]
    });
  });

  it('finds when all attributes are top 3 (in the third range)', () => {
    expect(appraise(THIRDRANGE, [HP, ATK, DEF], TOP3)).toEqual({
      hp: [8, 9],
      attack: [8, 9],
      defense: [8, 9],
      total: [24, 27]
    });
  });

  it('finds when 2/3 attributes are top 3 (in the third range)', () => {
    expect(appraise(THIRDRANGE, [HP, ATK], TOP3)).toEqual({
      hp: [8, 12],
      attack: [8, 12],
      defense: [0, 9],
      total: [23, 29]
    });
  });

  it('finds when 1/3 attributes are top 3 (in the third range)', () => {
    expect(appraise(THIRDRANGE, [HP], TOP3)).toEqual({
      hp: [9, 12],
      attack: [0, 11],
      defense: [0, 11],
      total: [23, 29]
    });
  });

  it('cannot find anything else in the third range', () => {
    expect(appraise(THIRDRANGE, [HP, ATK, DEF], LOWEST)).toEqual(false);
    expect(appraise(THIRDRANGE, [HP, ATK], LOWEST)).toEqual(false);
    expect(appraise(THIRDRANGE, [HP], LOWEST)).toEqual(false);
  });

  it('cannot find anything for high scoring attributes (in the last range)', () => {
    expect(appraise(LASTRANGE, [HP, ATK, DEF], PERFECT)).toEqual(false);
    expect(appraise(LASTRANGE, [HP, ATK], PERFECT)).toEqual(false);
    expect(appraise(LASTRANGE, [HP, ATK, DEF], TOP2)).toEqual(false);
    expect(appraise(LASTRANGE, [HP, ATK], TOP2)).toEqual(false);
    expect(appraise(LASTRANGE, [HP, ATK, DEF], TOP3)).toEqual(false);
  });

  it('finds when 1/3 attributes are perfect (in the last range)', () => {
    expect(appraise(LASTRANGE, [HP], PERFECT)).toEqual({
      hp: [15, 15],
      attack: [0, 7],
      defense: [0, 7],
      total: [15, 22]
    });
  });

  it('finds when 1/3 attributes are top 2 (in the last range)', () => {
    expect(appraise(LASTRANGE, [HP], TOP2)).toEqual({
      hp: [13, 14],
      attack: [0, 9],
      defense: [0, 9],
      total: [13, 22]
    });
  });

  it('finds when 2/3 attributes are top 3 (in the last range)', () => {
    expect(appraise(LASTRANGE, [HP, ATK], TOP3)).toEqual({
      hp: [8, 11],
      attack: [8, 11],
      defense: [0, 6],
      total: [16, 22]
    });
  });

  it('finds when 1/3 attributes are top 3 (in the last range)', () => {
    expect(appraise(LASTRANGE, [HP], TOP3)).toEqual({
      hp: [8, 12],
      attack: [0, 10],
      defense: [0, 10],
      total: [8, 22]
    });
  });

  it('finds when 3/3 attributes are at the lowest (in the last range)', () => {
    expect(appraise(LASTRANGE, [HP, ATK, DEF], LOWEST)).toEqual({
      hp: [0, 7],
      attack: [0, 7],
      defense: [0, 7],
      total: [0, 21]
    });
  });

  it('finds when 2/3 attributes are at the lowest (in the last range)', () => {
    expect(appraise(LASTRANGE, [HP, ATK], LOWEST)).toEqual({
      hp: [0, 7],
      attack: [0, 7],
      defense: [0, 6],
      total: [0, 20]
    });
  });

  it('finds when 1/3 attributes are at the lowest (in the last range)', () => {
    expect(appraise(LASTRANGE, [HP], LOWEST)).toEqual({
      hp: [0, 7],
      attack: [0, 6],
      defense: [0, 6],
      total: [0, 19]
    });
  });
});
