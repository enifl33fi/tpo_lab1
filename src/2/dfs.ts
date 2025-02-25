export type Graph = Record<string, string[]>;

export function dfs(graph: Graph, startNode: string): string[] {
    const visited: string[] = [];
    const stack: string[] = [startNode];

    while (stack.length > 0) {
        const node = stack.pop()!;
        if (!visited.includes(node)) {
            visited.push(node);
            const neighbors = graph[node] || [];
            for (const neighbor of neighbors.reverse()) {
                stack.push(neighbor);
            }
        }
    }

    return visited;
}