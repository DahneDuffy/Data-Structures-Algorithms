//STACKS - think of a stack of books, or your browser's back button - the last book onto the stack is the first to come off

//functions to use - pop() to removing the top element, push() to put data into stack, peek() to see the elements of the stack, and length()

// //Example - check for Palindrome

// let letters = []
// let word = "racecar"
// let rword = ''

// //put letters of word into stack
// for(let i=0;i<word.length;i++){
//     letters.push(word[i]);
// }

// //pop off letters in reverse order
// for(let i=0;i<word.length;i++){
//     rword += letters.pop();
// }

// if(rword === word){
//     return word + " is a palindrome"
// }

//********************************* */
//CREATING A STACK
//come back to this


//********************************* */
//SETS - often used for checking the presence of an item/element
//similar to arrays, except there is no repetition or particular order
//SET DATA STRUCTURE: can you extend the ES6 Set class? the only difference is that remove is delete, and values returns an iterator, not the set itself.  You also need to add all of the comparison operators like union, intersection, difference, subset.  The add method does not return true or false, but rather the set itself.  

class MySet {
    constructor(){
        this.collection = [];
    }
    has(element){
        return (this.collection.indexOf(element) !== -1);
    }
    values(){
        return this.collection;
    }
    add(element){
        if(!this.has(element)){
            this.collection.push(element);
            return true;
        }
    }
    remove(element){
        if (this.has(element)){
            let index = this.collection.indexOf(element);
            this.collection.splice(index,1);
            return true;
        }
        return false;
    }
    size(){
        return this.collection.length;
    }
    union(otherSet){
        let unionSet = new MySet();
        let firstSet = this.values();
        let secondSet = otherSet.values();
        firstSet.forEach(e=>unionSet.add(e));
        secondSet.forEach(e=>unionSet.add(e));
        return unionSet;
    }
    intersection(otherSet){
        let intersectionSet = new MySet();
        let firstSet = this.values();
        firstSet.forEach(e=>{
            if(otherSet.has(e)){
                intersectionSet.add(e);
            }
        });
        return intersectionSet;
    }    
    //all of the items that are in one set, but not the other
    difference(otherSet){
        let differenceSet = new MySet();
        let firstSet = this.values();
        firstSet.forEach(e=>{
            if(!otherSet.has(e)){
                differenceSet.add(e)
            }
        })
        return differenceSet;
    }
    //check if firstSet is a subset of otherSet
    subset(otherSet){
        let firstSet = this.values();
        return firstSet.every(e=>{
            return otherSet.has(e);
        });
    }
}

//QUEUE Data Structure - similar to stack, first in first out (like a line at the cash register, or a print queue - things are printed in the order they were sent to the printer)
//You can use an array, but here is the class instantiation:

class Queue{
    constructor(){
        this.collection = [];
    }
    print(){
        console.log(this.collection);
    }
    //add something to back of queue
    enqueue(element){
        this.collection.push(element);
    }
    //remove something from front of queue
    dequeue(){
        this.collection.shift();
    }
    front(){
        return this.collection[0];
    }
    size(){
        return this.collection.length;
    }
    isEmpty(){
        return (this.collection.length === 0)
    }
}

let myQueue = new Queue;
myQueue.enqueue(1);
myQueue.enqueue(2);
myQueue.enqueue(3);


//PRIORITY QUEUE Data Structure - elements with higher priority are sent to the beginning of the queue - e.g.

class PriorityQueue{
    constructor(){
        this.collection = [];
    }
    print(){
        console.log(this.collection);
    }
    //add something to back of queue
    enqueue(element){
        if(this.isEmpty()){
            this.collection.push(element);
        } else {
            let added = false;
            for (let i=0;i<this.collection.length;i++){
                if(element[1]<this.collection[i][1]){//checking priorities
                    this.collection.splice(i,0,element);
                    added = true;
                    break;
                }
            }
            if(!added){
                this.collection.push(element)
            }
        }
    }
    //remove something from front of queue
    dequeue(){
        this.collection.shift();
    }
    front(){
        return this.collection[0];
    }
    size(){
        return this.collection.length;
    }
    isEmpty(){
        return (this.collection.length === 0)
    }
}

let newPriorityQueue = new PriorityQueue;

newPriorityQueue.enqueue(['a',2])
newPriorityQueue.enqueue(['b',2])
newPriorityQueue.enqueue(['c',1])

//BINARY SEARCH TREES
//Consists of a root node that branches out into additional child nodes, which can have child nodes themselves, etc.  Nodes without children are leaf nodes (at the end of the tree)
//Binary tree only has max two branches for each node, and they are ordered; the left subtree of a node contains only nodes with keys lesser than the node's key; the right subtree of a node contains only nodes with keys greater than the node's key; the left and right subtree must alsobe a binary search tree; it take o(log(n)) time

class Node{
    constructor(date, left=null,right=null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BinarySearchTree{
    constructor(){
        this.root = null;
    }
    add(data){
        //grab the root node, if it's null, assign data to be the root node of this BST
        const node = this.root;
        if (node === null){
            this.root = new Node(data);
            return;
        } else{
            //implement this recursive function
            const searchTree = function(node){
                //if the data we passed in is less than the data in the root node, and the left node is null, we assign the data to the left node.  If the left node is not null, we're going to rerun the SearchTree function with the left node.
                if(data < node.data){
                    if(node.left === null){
                        node.left = new Node(data);
                        return;
                    }else if(node.left !== null){
                        return searchTree(node.left);
                    }
                } else if(data>node.data){
                    if(node.right === null){
                        node.right = new Node(data);
                        return;
                    } else if(node.right !== null){
                        return searchTree(node.right)
                    }
                } else {
                    return null;
                }
            };
            return searchTree(node);
        }
    }
    findMin(){

    }
}

//left off at 31:59 

//https://www.youtube.com/watch?v=t2CEgPsws3U