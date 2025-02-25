export function calculateBernoulliNumbers(n: number): number[] {
    const bernoulli: number[] = [1];

    for (let m = 1; m <= n; m++) {
        if (m === 1) {
            bernoulli.push(-0.5);
            continue;
        }
        if (m % 2 === 1) {
            bernoulli.push(0);
            continue;
        }

        let sum = 0;
        for (let k = 0; k < m; k++) {
            sum += binomialCoefficient(m + 1, k) * bernoulli[k];
        }
        bernoulli.push(-sum / binomialCoefficient(m + 1, m));
    }

    return bernoulli;
}

export function binomialCoefficient(n: number, k: number): number {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;

    let result = 1;
    for (let i = 1; i <= k; i++) {
        result *= (n - k + i) / i;
    }
    return result;
}

export function calculateTangentCoefficients(terms: number): number[] {
    const coefficients: number[] = [];
    const bernoulli = calculateBernoulliNumbers(2 * terms);

    for (let i = 1; i <= terms; i++) {
        const n = 2 * i;
        const B_n = bernoulli[n];
        const numerator = Math.pow(2, 2 * i) * (Math.pow(2, 2 * i) - 1) * Math.abs(B_n);
        const denominator = factorial(2 * i);
        coefficients.push(numerator / denominator);
    }

    return coefficients;
}

export function factorial(n: number): number {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

export function tangentPowerSeries(x: number, terms: number = 5): number {
    while (Math.abs(x) > Math.PI / 2) {
        x = x > 0 ? x - Math.PI : x + Math.PI;
    }
    const coefficients = calculateTangentCoefficients(terms);
    let sum = 0;

    for (let i = 0; i < terms; i++) {
        const exponent = 2 * i + 1;
        const term = coefficients[i] * Math.pow(x, exponent);
        sum += term;
    }

    return sum;
}