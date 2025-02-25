import {
    calculateTangentCoefficients,
    tangentPowerSeries,
} from './tg';

import {describe, expect, test} from '@jest/globals';

describe('tangentPowerSeries', () => {
    test('x=0 returns 0', () => {
        expect(tangentPowerSeries(0)).toBe(0);
    });

    test('x=0.1 with 4 terms matches manual calculation', () => {
        const x = 0.1;
        const manualSum = x + (x**3)/3 + (2*x**5)/15 + (17*x**7)/315;
        expect(tangentPowerSeries(x, 4)).toBeCloseTo(manualSum, 10);
    });

    test('x=0.1 approximates Math.tan(x)', () => {
        const x = 0.1;
        const expected = Math.tan(x);
        expect(tangentPowerSeries(x, 4)).toBeCloseTo(expected, 7);
    });

    test('x=-0.1 is symmetric', () => {
        const x = -0.1;
        const expected = -tangentPowerSeries(0.1, 4);
        expect(tangentPowerSeries(x, 4)).toBeCloseTo(expected, 10);
    });

    test('x=Math.PI/4 with 8 terms approaches 1', () => {
        const x = Math.PI/4;
        expect(tangentPowerSeries(x, 8)).toBeCloseTo(1, 2);
    });

    test('x=1 with 5 terms matches manual sum', () => {
        const x = 1;
        const terms = 5;
        const coefficients = calculateTangentCoefficients(terms);
        let manualSum = 0;
        for (let i = 0; i < terms; i++) {
            manualSum += coefficients[i] * x**(2*i + 1);
        }
        expect(tangentPowerSeries(x, terms)).toBeCloseTo(manualSum, 5);
    });

    test('x=Math.PI/2 with 5 terms should return a large value', () => {
        const x = Math.PI / 2;
        const result = tangentPowerSeries(x, 20);
        expect(result).toBeGreaterThan(10);
        expect(result).toBeLessThan(Infinity);
    });

    test('periodicity: tan(x + π) ≈ tan(x)', () => {
        const x = 0.5;
        const period = Math.PI;
        const result1 = tangentPowerSeries(x, 10);
        const result2 = tangentPowerSeries(x + period, 10);
        expect(result2).toBeCloseTo(result1, 2);
    });
});