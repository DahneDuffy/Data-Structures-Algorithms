// //GRAPHS

// //A graph is a collection of nodes(vertices) and edges, i.e. nodes and the connections between them

// //You can model maps (e.g. road between cities);

// //TERMINOLOGY   
// //directed graph - there is directionality from node to node
// //undirected graph - there is no directionality from node to node
// //neighbor nodes - directly adjacent nodes
// //acyclic graphs - no cycles on graphs whereby you can start at one node at end up back there

// //IMPLEMENTATION
// //Typically, "adjacency lists" can represent graphs, which have constant lookup times
// //The keys of the adjacency list will be every node in the graph, and their corresponding values will be an array of the neighbors of that particular node
//  //e.g. look below for an example representing a directed graph

//  const graph = {
//      a: ['b','c'],
//      b:['d'],
//      c:['e'],
//      d:['f'],
//      e:[],
//      f:[]
//  }

//  //ALGORITHMS
//  //***************************************************************************** */

//  //DEPTH FIRST TRAVERSAL
//  //travel in a specific direction until you can't anymore, then go in a different direction - uses a stack
//  //PSEUDO - move in a direction and add each node to a stack until you reach a terminal node.  When you pop a node off of the stack, it becomes your current node, form which you continue exploring. 
// //IMPLEMENTATION
// const depthFirstPrintIterative = (graph,source)=>{
//     const stack = [source];

//     while (stack.length>0){
//         const current = stack.pop()
//         console.log(current)
//         for(let neighbor of graph[current]){
//             stack.push(neighbor);
//         }
//     }
// };
// //EXPLANATION - initialize the stack, with the source node as the only value; while the stack is not empty, pop the current node off and log it; then explore each neighbor of that node and push them onto the stack.  then repeat.  

// const depthFirstPrintRecursive = (graph,source)=>{
//     console.log(source);
    
//     for(let neighbor of graph[source]){
//         depthFirstPrintRecursive(graph,neighbor)
//     }
// };
// //EXPLANATION - print the current node, then run a loop that recursively calls the function for each neighbor node. 

// // depthFirstPrintIterative(graph,'a') //acedbdf
// // depthFirstPrintRecursive(graph,'a') //abdfce 

// //******************************************************************* */
//  //BREADTH FIRST TRAVERSAL
//  //explore all immediate neighbors of each node, and then keep applying that behavior - uses a queue
//  //PSEUDO - start with the current node, and then push the neighbor nodes into a queue; this ends the first iteration.  Then you grab the node from the front of queue and then continue iterating/searching.  


//  //IMPLEMENTATION
//  const breadthFirstPrint = (graph,source)=>{
//      const queue = [source];

//      while(queue.length>0){
//         const current = queue.shift();
//         console.log(current);

//         for(let neighbor of graph[current]){
//             queue.push(neighbor)
//         }
//      }
//  }

// // breadthFirstPrint(graph,'a') //abcdef

// //EXPLANATION - initialize the queue, with the source node as the only value; while the queue is not empty, shift the current node off the front and log it; then explore each neighbor of that node and push them onto the queue.  then repeat.
// //Note - recursion for breadth is tricky, because the call stack has a stack structure, so you have to work to overcome that;  




// //HAS PATH PROBLEM 1 - directed graph - return true or false regarding whether there is path between two given nodes.
// //Can you travel from source node to desination node?
// //you'll have O(n) time complexity

// let adjacencyList = {
//     f:['g','i'],
//     g:['h'],
//     h:[],
//     i:['g','k'],
//     j:['i'],
//     k:[]
// }

// const hasPathDepth = (graph, src, dst) => {
//     if (src === dst) return true;

//     for(let neighbor of graph[src]){
//         if(hasPath(graph,neighbor,dst)){
//             return true;
//         }
//     }
//     return false;
// }

// const hasPathBreadth = (graph, src, dst) => {
//     const queue = [src];

//     while(queue.length>0){
//         const current = queue.shift();
//         if(current === dst){
//             return true
//         }
//         for (let neighbor of graph[current]){
//             queue.push(neighbor);
//         }
//     }
//     return false;
// }

// const result = hasPathBreadth(adjacencyList,'h','k')
// console.log(result)



// video link:  https://www.youtube.com/watch?v=tWVWeAqZ0WU at 30:09

//UNDIRECTED GRAPH

let edges = [['i','j'],['k','i'],['m','k'],['k','l'],['o','n']]
//convert to adjacency list: 

let edgesGraph = {
    i: ['j','k'],
    j: ['i'],
    k: ['i','m','l'],
    m: ['k'],
    l: ['k'],
    o: ['n'],
    n: ['o']
}

//do a traversal, and mark nodes as 'visited'
const undirectedPathDepth = (edges, nodeA, nodeB)=>{
    const graph = buildGraph(edge);

    return hasPath(graph,nodeA,nodeB, new Set());
}

const hasPath = (graph,src,dst,visited)=>{
    //check if node has been visited or if you're already at destination node
    if(visited.has(src)) return false;
    if(src === dst) return true;

    //if not visited, add node to 'visited set'
    visited.add(src);

    //recursive loop through the nodes until destination node is found;
    for(let neighbor of graph[src]){
        if(hasPath(graph,neighbor,dst,visited)===true){
            return true
        }
    }
    return false;
}

//essentially grab each set of edges and push them into an adjacency list object;
const buildGraph = (edges)=>{
    const graph = {};
    for(let edge of edges){
        const [a,b] = edge
        if (!(a in graph)) graph[a]=[];
        if (!(b in graph)) graph[b]=[];
        graph[a].push(b);
        graph[b].push(a);
    }
    return graph;
}

//COMPONENT COUNT - Time O(e); Space 0(n) where e = edges; n= nodes;  linear time and space

    const connectedComponentsCount = (graph)=>{
        const visited = new Set()
        let count = 0;

        for(let node in graph){
            //do DFS
            if(explore(graph,node,visited)===true){
                count += 1;
            };
        }

        return count; 
    }

    //explore a component as far as possible
    const explore = (graph,current,visited)=>{
        if(visited.has(String(current))) return false;
        visited.add(String(current));

        for (neighbor of graph[current]){
            explore(graph,neighbor,visited)
        }
        
        return true
    }
 
    const components = {
        0:['8','1','5'],
        1:['0'],
        5:['0','8'],
        8:['0','5'],
        2:['3','4'],
        3:['2','4'],
        4:['3','2'],
    }

    //note that javascript object keys are often interpreted as strings and this can mess up your code,  That's why we used String(current)
    // console.log(connectedComponentsCount(components)) //returns 2


//LARGEST COMPONENT SIZE PROBLEM
//Visit all nodes, and mark each as visited using DFS, counting each node as well to keep track of component size, then store that as the currentLargestComponent before searching the rest of the graph
//Then move to the next node, if already visited, there is no need to traverse because you've already coounted this node in your component
//Move to the next 'unvisited' node and start another traversal

const largestComponent = (graph)=>{
    const visited = new Set();
    let longest = 0;
    //iterate through nodes
    for(let node in graph){

        const size = exploreSize(graph,node,visited);
        if(size>longest) longest = size;
    }
    return longest;
}
const exploreSize = (graph, node, visited) => {
    //if you've already visited a node, don't count it
    if(visited.has(node)) return 0;
    //else add the node to visited and count it as 1
    visited.add(node)
    let size = 1;
   
    //recursively explore its neighbor nodes and count unvisited, incrementing size variable
    for(let neighbor of graph[node]){
        size += exploreSize(graph, neighbor, visited)
    }
    
    return size;
}

console.log(largestComponent(components)) // returns 4
