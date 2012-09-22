/**
 * The constructor of double list
 */
function Stack() {
    var stackNode = function() {
        this.next = null ;
    };

    var head = new stackNode() ;    //The head node in the most top of the stack
    var end = new stackNode() ;     //The tail node in the most bottom of the stack
    var length = 0 ;                //The number of nodes in the stack

    head.next = end ;

    /**
     * Check if the stack is empty
     *
     * @return  true        returned if the stack is empty
     *          false       returned if the stack isn't empty
     */
    this.empty = function() {
        if( head.next === end ) {
            return true ;
        }
        else {
            return false ;
        }
    };

    /**
     * Get the size of the stack
     *
     * @return  length      the number of nodes in the stack
     */
    this.size = function() {
        return length ;
    };

    /**
     * Get the value of the node on the top of the stack
     *
     * @return  head.next.value     the value of the node next to head
     *          null                returned if the stack is empty
     */
    this.top = function() {
        if( this.empty() === true ) {
            return null ;
        }
        else {
            return head.next.value ;
        }
    };

    /**
     * Push a node with specify value into the stack
     *
     * @param   value       the value of node to be pushed into the stack
     *
     * @return  true        returned if the node pushed into the queue successfully
     *          false       returned if the value is undefined, and the operation failed
     */
    this.push = function(value) {
        if( value == undefined ) {
            console.log("The value of node to be pushed can not be undefined!") ;
            return false;
        }

        var newNode = new stackNode() ;
        newNode.value = value ;

        newNode.next = head.next ;
        head.next = newNode ;

        length = length + 1 ;

        return true ;
    };

    /**
     * Pop the node on the top of the stack and return its value
     *
     * @return  to_delete       the value of the node which was poped
     */
    this.pop = function() {
        if( this.empty() === true ) {
            return null ;
        }
        else {
            var to_delete = head.next ;
            head.next = to_delete.next ;
            to_delete.next = null ;
        }

        length = length - 1 ;

        return to_delete.value ;
    };

    /**
     * Clear all the nodes in stack
     */
    this.clear = function() {
        var to_delete = head.next ;

        while( to_delete !== end ) {
            head.next = to_delete.next ;
            to_delete.next = null ;

            to_delete = head.next ;
        }

        length = 0 ;
    };

    /**
     * Show all the nodes in the stack from top to bottom
     */
    this.show = function(){
        var current = head.next ;

        while( current !== end ) {
            console.log(current.value) ;
            current = current.next ;
        }
    };
};

