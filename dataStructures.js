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
    constructor(data, left=null,right=null){
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
        let current = this.root;
        while(current.left !== null){
            current = current.left
        }
        return current.data;
    }
    findMax(){
        let current = this.root;
        while(current.right !== null){
            current = current.right
        }
        return current.data;
    }
    find(data){
        let current = this.root;
        while(current.data !== data){
            if (data < current.data){
                current = current.left;
            } else {
                current = current.right;
            }
            if(current === null){
                return null
            }
        }
        return current;
    }
    isPresent(data){
        let current = this.root;
        //while current is not null
        while(current){
            if(data === current.data){
                return true;
            }
            if (data < current.data){
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }
    remove(data) {
        const removeNode = function(node, data) {
            console.log(node,data)
          if (node == null) {
            return null;
          }
          if (data == node.data) {
            // node has no children 
            if (node.left == null && node.right == null) {
              return null;
            }
            // node has no left child 
            if (node.left == null) {
              return node.right;
            }
            // node has no right child 
            if (node.right == null) {
              return node.left;
            }
            // node has two children 
            //from node, move right, then find the left most node (i.e. find the minimum of the right subtree)
            var tempNode = node.right;
            while (tempNode.left !== null) {
              tempNode = tempNode.left;
            }
            //set the current node, to have the value of the left most node you just found
            node.data = tempNode.data;
            //then run the function again from the 
            node.right = removeNode(node.right, tempNode.data);
            return node;

        //if you're not at the right node, move left or right
          } else if (data < node.data) {
            node.left = removeNode(node.left, data);
            return node;
          } else {
            node.right = removeNode(node.right, data);
            return node;
          }
        }
        this.root = removeNode(this.root, data);
      }
      isBalanced(){
          return (this.findMinHeight() >= this.findMaxHeight()-1)
          //will return true or false
      }
      //this is the distance from the root node to the first leaf node without two children
      findMinHeight(node = this.root){
          //default input is root node
          if(node == null){
              return -1;
          };
          //if nothing is in the tree, height is -1
          let left = this.findMinHeight(node.left);
          let right = this.findMin(node.right);
          if(left < right){
              return left + 1;
          } else {
              return right + 1;
          }
      }
      //distance from the root node to the most bottom node
      //NOTE A BALANCED TREE IS WHERE MIN AND MAX DIFFER BY AT MOST ONE
      findMaxHeight(node = this.root){
        //default input is root node
        if(node == null){
            return -1;
        };
        //if nothing is in the tree, height is -1
        let left = this.findMinHeight(node.left);
        let right = this.findMin(node.right);
        if(left > right){
            return left + 1;
        } else {
            return right + 1;
        }
    }
    //TREE TRAVERSAL METHODS
    //inOrder() traversal --> begin search at left most node, and at rightmost; effectively in order from lowest to highest
    //preOrder() traversal --> explore roots nodes before leaves; start at root and go all the way left, then right
    //postOrder() traversal --> explores the leaf nodes first, essentially sstart at left-most and lowest leaf nodes and work right
    //levelOrder() traversal --> explores each level of the tree
    inOrder() {
        if (this.root == null) {
          return null;
        } else {
          var result = new Array();
          function traverseInOrder(node) { 
              //recursive function - if there is a left node, run this function again, until there is no left node, then push the node.data of the left-most node onto your array, and look right.  If there is node,right run this function again. Essentially you are looking left until you can't anymore and then storing that data, you then work your way back up the call stack (the other nodes), until everything has been stored in the resultant array in numerical order
            node.left && traverseInOrder(node.left);
            result.push(node.data);
            node.right && traverseInOrder(node.right);
          }
          traverseInOrder(this.root);
          return result;
        };
      }
      preOrder() {
        if (this.root == null) {
          return null;
        } else {
          var result = new Array();
          function traversePreOrder(node) {
            result.push(node.data);
            node.left && traversePreOrder(node.left);
            node.right && traversePreOrder(node.right);
          };
          traversePreOrder(this.root);
          return result;
        };
      }
      postOrder() {
        if (this.root == null) {
          return null;
        } else {
          var result = new Array();
          function traversePostOrder(node) {
            node.left && traversePostOrder(node.left);
            node.right && traversePostOrder(node.right);
            result.push(node.data);
          };
          traversePostOrder(this.root);
          return result;
        }
      }
      
      levelOrder() {
          let result = [];
          let Q = []; 
          if (this.root != null) {
              Q.push(this.root);
              while(Q.length > 0) {
                  let node = Q.shift();
                  result.push(node.data);
                  if (node.left != null) {
                      Q.push(node.left);
                  };
                  if (node.right != null) {
                      Q.push(node.right);
                  };
              };
              return result;
          } else {
              return null;
          };
      };

}

const bst = new BinarySearchTree();

bst.add(9);
bst.add(4);
bst.add(17);
bst.add(3);
bst.add(6);
bst.add(22);
bst.add(5);
bst.add(7);
bst.add(20);
bst.add(10);

console.log(bst.levelOrder())
//run this in the Chrome debugger

//https://www.youtube.com/watch?v=t2CEgPsws3U

//HASH TABLES are used to store key value pairs, associative arrays, a common way to implement mapped data structure.  Highly used because of efficient, average time complexity is O(1) for search insert and delete;
//It takes a key input and runs it through a hash function; a hash function basically maps strings to numbers, where numbers correspond to indexes in an array. The array index corresponds to a bucket, which stores some information.  
//You'll probably never have to implement a hash table, but this might be useful:

/* Hash Table */

var hash = (string, max) => {
    var hash = 0;
    for (var i = 0; i < string.length; i++) {
      hash += string.charCodeAt(i);
    }
    return hash % max;
  };
  
  let HashTable = function() {
  
    let storage = [];
    const storageLimit = 14;
    
    this.print = function() {
      console.log(storage)
    }
  
    this.add = function(key, value) {
      var index = hash(key, storageLimit);
      if (storage[index] === undefined) {
        storage[index] = [
          [key, value]
        ];
      } else {
        var inserted = false;
        for (var i = 0; i < storage[index].length; i++) {
          if (storage[index][i][0] === key) {
            storage[index][i][1] = value;
            inserted = true;
          }
        }
        if (inserted === false) {
          storage[index].push([key, value]);
        }
      }
    };
  
    this.remove = function(key) {
      var index = hash(key, storageLimit);
      if (storage[index].length === 1 && storage[index][0][0] === key) {
        delete storage[index];
      } else {
        for (var i = 0; i < storage[index].length; i++) {
          if (storage[index][i][0] === key) {
            delete storage[index][i];
          }
        }
      }
    };
  
    this.lookup = function(key) {
      var index = hash(key, storageLimit);
      if (storage[index] === undefined) {
        return undefined;
      } else {
        for (var i = 0; i < storage[index].length; i++) {
          if (storage[index][i][0] === key) {
            return storage[index][i][1];
          }
        }
      }
    };
  
  };
  
  
  console.log(hash('quincy', 10))
  
  let ht = new HashTable();
  ht.add('beau', 'person');
  ht.add('fido', 'dog');
  ht.add('rex', 'dinosour');
  ht.add('tux', 'penguin')
  console.log(ht.lookup('tux'))
  ht.print();