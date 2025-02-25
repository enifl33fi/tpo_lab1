import {dfs, Graph} from './dfs';

import {describe, expect, test} from '@jest/globals';

describe('DFS Algorithm', () => {
    test('should traverse a simple graph correctly', () => {
        const graph: Graph = {
            'A': ['B', 'C'],
            'B': ['D', 'E'],
            'C': ['F'],
            'D': [],
            'E': ['F'],
            'F': []
        };

        const result = dfs(graph, 'A');
        expect(result).toEqual(['A', 'B', 'D', 'E', 'F', 'C']);
    });

    test('should handle a graph with a single node', () => {
        const graph: Graph = {
            'A': []
        };

        const result = dfs(graph, 'A');
        expect(result).toEqual(['A']);
    });

    test('should handle a graph with cycles', () => {
        const graph: Graph = {
            'A': ['B'],
            'B': ['C'],
            'C': ['A']
        };

        const result = dfs(graph, 'A');
        expect(result).toEqual(['A', 'B', 'C']);
    });

    test('should handle a disconnected graph', () => {
        const graph: Graph = {
            'A': ['B'],
            'B': [],
            'C': ['D'],
            'D': []
        };

        const result = dfs(graph, 'A');
        expect(result).toEqual(['A', 'B']);
    });
});