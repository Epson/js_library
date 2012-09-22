/**
 * The constructor of class Queue
 */
function Queue() {
    var queueNode = function() {
        this.next = null ;
        this.prev = null ;
    };

    var head = new queueNode() ;        //The head node in the most front of the queue
    var tail = new queueNode() ;        //The tail node in the most back of the queue
    var length = 0 ;                    //The number of nodes in the queue

    head.next = tail ;
    head.prev = null ;
    tail.prev = head ;
    tail.next = null ;

    /**
     * Check if the queue is empty
     *
     * @return  true        returned if the queue is empty
     *          false       returned if the queue isn't empty
     */
    this.empty = function() {
        if( head.next === tail ) {
            return true ;
        }
        else {
            return false ;
        }
    };

    /**
     * Get the length of the queue
     *
     * @return  length      the number of nodes in the queue
     */
    this.size = function() {
        return length ;
    };

    /**
     * Get the value of node which in the front of the queue
     *
     * @return  head.next.value     the value of node which in the front of the queue
     *          null                returned if the queue is empty
     */
    this.front = function() {
        if( this.empty() === true ) {
            return null ;
        }
        else {
            return head.next.value ;
        }
    };

    /**
     * Get the value of node which at the end of the queue
     *
     * @return  tail.prev.value     the value of node which at the end of the queue
     *          null                returned if the queue is empty
     */
    this.back = function() {
        if( this.empty() === true ) {
            return null ;
        }
        else {
            return tail.prev.value ;
        }
    };

    /**
     * Push a node with specific value at the end of queue
     *
     * @param   value       The value of node which to be pushed into the queue
     * @return  true        returned if the node pushed into the queue successfully
     *          false       returned if the value is undefined, and the operation failed
     */
    this.push = function(value) {
        if( value == undefined ) {
            console.log("The value of node to be pushed can not be undefined!") ;
            return false;
        }
        var newNode = new queueNode() ;
        newNode.value = value ;

        newNode.prev = tail.prev ;
        tail.prev.next = newNode ;
        newNode.next = tail ;
        tail.prev = newNode ;

        length = length + 1 ;

        return true ;
    };

    /**
     * Pop the node on the front of the queue and return its value
     *
     * @return  to_delete.value     The value of the node which was removed
     *          null                returned if the queue is empty
     */
    this.pop = function() {
        var to_delete = head.next ;

        if( to_delete === tail ) {
            console.log("The queue is already empty!") ;
            return null ;
        }

        head.next = to_delete.next ;
        to_delete.prev = null ;
        to_delete.next.prev = head ;
        to_delete.next = null ;

        length = length - 1 ;

        return to_delete.value ;
    };

    /**
     * Clear all the nodes in queue
     */
    this.clear = function() {
        var to_delete = head.next ;

        while( to_delete !== tail ) {
            head.next = to_delete.next ;
            head.next.prev = head ;

            to_delete.prev = null ;
            to_delete.next = null ;

            to_delete = head.next ;
        }

        length = 0 ;
    };

    /**
     * Show all the nodes in the queue from front to back
     */
    this.show = function() {
        var current = head.next ;
        var result = "" ;

        while( current !== tail ) {
            result = result + " " + current.value ;
            current = current.next ;
        }

        console.log(result) ;
    };
}

