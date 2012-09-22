/**
 * The constructor of class BinarySearchTree
 */
function BinarySearchTree() {
    var binarySearchTreeNode = function() {
        this.left = null ;
        this.right = null ;
        this.value = null ;
    } ;

    var root = null ;       //The reference references to the root of the tree, and be initialized as null
    var length = 0 ;        //The number of nodes in the tree

    /**
     * (private function)
     * the method used to get the parent node of the node with target value, this function
     * used if and only if the root is not null, and the target shouldn't be the value of
     * root.
     *
     * @param   target      the value to find in the tree
     *
     * @return  parent      the parent node of the target value
     *          null        the node with target value isn't exist ( or target is the value of root )
     */
    var getParent = function(target) {
        var parent = root ;
        var current = null ;

        while(true) {
            if( target < parent.value ) {
                current = parent.left ;

                if( current === null ) {
                    return null ;
                }

                if( current.value === target ) {
                    return parent ;
                }
            }
            else {
                current = parent.right ;

                if( current === null ) {
                    return null ;
                }

                if( current.value === target ) {
                    return parent ;
                }
            }

            parent = current ;
        }

    };

    /**
     * (private function)
     * Find the node with the target value in the tree
     *
     * @param   target      the target value of node which to be found in the tree
     *
     * @return  current     the pointer pointed to the node with target value
     *          null        returned if the node with target value wasn't found
     */
    var findNode = function(target) {
        var current = root ;

        while( current !== null ) {
            if( current.value === target ) {
                return current ;
            }
            else if(target < current.value ) {
                current = current.left ;
            }
            else {
                current = current.right ;
            }
        }

        return null ;
    };

    /**
     * (private function)
     * Find the node with minimun value in the sub-tree
     *
     * @param   root        the root of the sub-tree to find the minimun node
     *
     * @return  current     the minimun node found in the sub-tree
     *          null        returned if the sub-tree is empty
     */
    var findMin = function(root) {
        var current = root ;

        if( root === null ) {
            return null ;
        }

        while( current.left !== null ) {
            current = current.left ;
        }

        return current ;
    };

    /**
     * (private function)
     * Find the node with maximun value in the sub-tree
     *
     * @param   root        the root of the sub-tree to find the maximun node
     *
     * @return  current     the maximun node found in the sub-tree
     *          null        returned if the sub-tree is empty
     */
    var findMax = function(root) {
        var current = root ;

        if( root === null ) {
            return null ;
        }

        while( current.right !== null ) {
            current = current.right ;
        }

        return current ;
    };

    /**
     * Check whether the tree is empty
     */
    this.empty = function() {
        if( root === null ) {
            return true ;
        }
        else {
            return false ;
        }
    } ;

    /**
     * Get the size of the tree
     *
     * @return  length      the number of nodes in the tree
     */
    this.size = function() {
        return length ;
    };

    /**
     * the function to insert node into the BinarySearchTree
     *
     * @param   value       the value of new node will be inserted into the tree
     * @param   cmp         the method used to compare two node in tree defined by user
     *
     * @return  true        returned if the node inserted into the tree successfully
     *          false       returned if the value is undefined, and the operation failed
     */
    this.insert = function(value, cmp) {
        if( value == undefined ) {
            console.log("The value of node to be pushed can not be undefined!") ;
            return false;
        }

        if( root === null ) {
            root = new binarySearchTreeNode() ;
            root.value = value ;
        }
        else {
            var current = root ;

            if( cmp !== undefined ) { //use cmp to compare two nodes if the method is defined
                while(true) {
                    if( cmp( current.value, value) == true ) {
                        if( current.left === null ) {
                            break ;
                        }
                        else {
                            current = current.left ;
                        }
                    }
                    else {
                        if( current.right === null ) {
                            break ;
                        }
                        else {
                            current = current.right ;
                        }
                    }
                }

                if( cmp( value, current.value ) == true ) {
                    var newNode = new binarySearchTreeNode() ;
                    newNode.value = value ;
                    current.right = newNode ;
                }
                else {
                    var newNode = new binarySearchTreeNode() ;
                    newNode.value = value ;
                    current.left = newNode ;
                }
            }
            else {  //use the default operation to compare two nodes if the method is undefined
                while(true) {
                    if( value < current.value ) {
                        if( current.left === null ) {
                            break ;
                        }
                        else {
                            current = current.left ;
                        }
                    }
                    else {
                        if( current.right === null ) {
                            break ;
                        }
                        else {
                            current = current.right ;
                        }
                    }
                }

                if( value > current.value ) {
                    var newNode = new binarySearchTreeNode() ;
                    newNode.value = value ;
                    current.right = newNode ;
                }
                else {
                    var newNode = new binarySearchTreeNode() ;
                    newNode.value = value ;
                    current.left = newNode ;
                }
            }
        }

        length ++ ;

        return true ;
    } ;

    /**
     * Remove the node with target value from the tree
     *
     * @param   target      the target value of node which to be removed
     *
     * @return  to_delete   the pointer pointed to the node with target value in the tree
     *          null        returned if the node with target value wasn't found
     */
    this.remove = function(target) {
        if( this.empty() !== true ) {
            parent = getParent(target) ;

            var to_delete = findNode(target) ;

            /*
             * 如果要删除的节点是根节点，那么需要将该删除操作转化成删除非根节点的操作
             * */
            if( target === root.value ) {
                if( root.left !== null ) {
                    var max = findMax(root.left) ;

                    to_delete = max ;
                    parent = getParent(to_delete.value) ;

                    root.value = max.value ;
                }
                else {
                    var min = findMin(root.right) ;

                    to_delete = min ;
                    parent = getParent(to_delete.value) ;

                    root.value = min.value ;
                }
            }


            /*
             * 如果要删除的节点是非根节点，则按下列操作进行删除
             * */
            while( to_delete.left !== null && to_delete.right !== null ) {
                var min = findMin(to_delete.right) ;
                var oldNode = to_delete ;
                to_delete = min ;
                parent = getParent(to_delete.value) ;

                oldNode.value = min.value ;
            }

            if( to_delete.left === null ) {
                if( to_delete.value < parent.value ) {
                    parent.left = to_delete.right ;
                }
                else {
                    parent.right = to_delete.right ;
                }
            }
            else {
                if( to_delete.value < parent.value ) {
                    parent.left = to_delete.left ;
                }
                else {
                    parent.right = to_delete.left ;
                }
            }

            to_delete.left = null ;
            to_delete.right = null ;

            length = length - 1 ;

            return to_delete ;
        }
        else {
            return null ;
        }
    } ;

    /**
     * Find if the node with the target value is in the tree
     *
     * @param   target      the target value will be found in the tree
     *
     * @return  true        returned if the node with target value was found
     *          false       returned if the node with target value wasn't found
     */
    this.find = function(target) {
        var result = findNode(target) ;

        if( result === null ) {
            return false ;
        }
        else {
            return true ;
        }
    } ;

    /**
     * Travel the tree and show the nodes by Inorder (should use Stack.js)
     */
    this.showInOrder = function() {
        var s = new Stack() ;

        temp = root ;

        while( temp !== null || s.empty() !== true ) {
            if( temp !== null ) {
                s.push(temp) ;
                temp = temp.left ;
            }
            else {
                temp = s.top() ;
                s.pop() ;
                console.log(temp.value) ;
                temp = temp.right ;
            }
        }
    };
};