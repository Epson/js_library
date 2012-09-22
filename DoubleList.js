/**
 * The constructor of double list
 */
function DoubleList() {
    var listNode = function() {
        this.next = null ;
        this.prev = null ;
    };

    var _cmp = null ;               //The private function refrenced to the compare method if it is exist
    var length = 0 ;                //The number of nodes in DoubleList
    var head = new listNode() ;     //The head node in the most front of the DoubleList
    var end = new listNode() ;      //The tail node in the most back of the DoubleList
    var current = null ;            //The Cursor used to find the target node in DoubleList more quickly
    var sorted = true ;             //The flag value to check whether the DoubleList is already sorted

    head.next = end ;
    end.prev = head ;
    current = head ;

    /**
     * (private function)
     * Merge two sub_lists into a sorted list
     *
     * @param   leftpos         the first node of the first sub_list to be sorted
     *          leftend         the last node of the first sub_list to be sorted
     *          rightpos        the first node of the second sub_list to be sorted
     *          rightend        the last node of the second sub_list to be sorted
     *
     * @return  mergeHead       the first node of the sorted list
     *          mergeTail       the last node of the sorted list
     */
    function merge(leftpos, leftend, rightpos, rightend, cmp) {
        var mergeHead = null ;
        var mergeTail = null ;

        leftpos.prev = null ;
        leftend.next = null ;
        rightpos.prev = null ;
        rightend.next = null ;

        if( cmp === undefined ) {
            if( leftpos.value < rightpos.value ) {
                mergeHead = leftpos ;
                leftpos = leftpos.next ;
                mergeTail = mergeHead ;
            }
            else {
                mergeHead = rightpos ;
                rightpos = rightpos.next ;
                mergeTail = mergeHead ;
            }

            while( leftpos !== null && rightpos !== null ) {
                if( leftpos.value < rightpos.value ) {
                    mergeTail.next = leftpos ;
                    leftpos.prev = mergeTail ;
                    mergeTail = mergeTail.next ;
                    leftpos = leftpos.next ;
                }
                else {
                    mergeTail.next = rightpos ;
                    rightpos.prev = mergeTail ;
                    mergeTail = mergeTail.next ;
                    rightpos = rightpos.next ;
                }
            }
        }
        else {
            if( cmp(leftpos.value, rightpos.value) == false ) {
                mergeHead = leftpos ;
                leftpos = leftpos.next ;
                mergeTail = mergeHead ;
            }
            else {
                mergeHead = rightpos ;
                rightpos = rightpos.next ;
                mergeTail = mergeHead ;
            }

            while( leftpos !== null && rightpos !== null ) {
                if( cmp(leftpos.value, rightpos.value) == false ) {
                    mergeTail.next = leftpos ;
                    leftpos.prev = mergeTail ;
                    mergeTail = mergeTail.next ;
                    leftpos = leftpos.next ;
                }
                else {
                    mergeTail.next = rightpos ;
                    rightpos.prev = mergeTail ;
                    mergeTail = mergeTail.next ;
                    rightpos = rightpos.next ;
                }
            }
        }

        while( leftpos !== null ) {
            mergeTail.next = leftpos ;
            leftpos.prev = mergeTail ;
            mergeTail = mergeTail.next ;
            leftpos = leftpos.next ;
        }

        while( rightpos !== null ) {
            mergeTail.next = rightpos ;
            rightpos.prev = mergeTail ;
            mergeTail = mergeTail.next ;
            rightpos = rightpos.next ;
        }

        return {
            mergeHead : mergeHead ,
            mergeTail : mergeTail
        } ;
    };

    /**
     *  (private function)
     *  Dividing the list into two smaller lists and merge them
     *
     * @param   left        the left bound of the sub_list will be sort
     *          right       the right bound of the sub_list will be sort
     *          length      the length of the sub_list will be sort
     *
     * @return  head        the pointer pointed to the first node in the sorted list
     *          tail        the pointer pointed to the last node in the sorted list
     */
    function mergeSort(left, right, length, cmp) {
        var result = null ;
        var leftResult = null ;
        var rightResult = null ;
        var mid_next = null ;

        if( left !== right ){
            var step = Math.floor( length / 2 ) ;
            var temp = step ;
            var mid = left ;

            while( temp !== 1 && mid !== null ) {
                mid = mid.next ;
                temp = temp - 1 ;
            }

            mid_next = mid.next ;   //此处要保存第二个待排序序列的头指针，因为mid指针在第一段序列的排序过程中会发生移动

            if( cmp === undefined ) {
                if( length % 2 !== 0 ) {
                    leftResult = arguments.callee(left, mid, step) ;
                    rightResult = arguments.callee(mid_next, right, step+1) ;
                }
                else {
                    leftResult = arguments.callee(left, mid, step) ;
                    rightResult = arguments.callee(mid_next, right, step) ;
                }

                result = merge(leftResult.head, leftResult.tail, rightResult.head, rightResult.tail) ;
            }
            else {
                if( length % 2 !== 0 ) {
                    leftResult = arguments.callee(left, mid, step, cmp) ;
                    rightResult = arguments.callee(mid_next, right, step+1, cmp) ;
                }
                else {
                    leftResult = arguments.callee(left, mid, step, cmp) ;
                    rightResult = arguments.callee(mid_next, right, step, cmp) ;
                }

                result = merge(leftResult.head, leftResult.tail, rightResult.head, rightResult.tail, cmp) ;
            }

            return {
                head : result.mergeHead ,
                tail : result.mergeTail
            } ;
        }
        else {
            return {
                head : left ,
                tail : right
            };
        }
    };

    /**
     * (private function)
     * Search the target node in the list
     *
     * @param   target      the value of target node which will be searched
     *
     * @return  temp_ptr    the pointer pointed to the target node if it exist
     *          null        returned if the target node is not exist
     */
    function search(target) {
        if( current === head ) {
            current = current.next ;
        }

        if( current.value < target ) {
            while( current !== end ) {
                if( current.value === target ) {
                    return current
                }
                else {
                    current = current.next ;
                }
            }

            current = head ;
            return null ;
        }
        else {
            while( current !== head ) {
                if( current.value === target ) {
                    current = current ;
                    return current ;
                }
                else {
                    current = current.prev ;
                }
            }

            return null ;
        }
    };

    /**
     * Get the length of the list
     *
     * @return  length      the number of nodes in the list
     */
    this.size = function() {
        return length ;
    };

    /**
     * Check if the list is empty
     *
     * @return  true        returned if the list is empty
     *          false       returned if the list isn't empty
     */
    this.empty = function() {
        if( head.next === end && end.prev == head ) {
            return true ;
        }
        else {
            return false ;
        }
    };

    /**
     * Get the value of the first node in list
     *
     * @return  head.value  the value of the first node in list
     *          null        returned if the list is empty
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
     * Get the value of the last node in list
     *
     * @return  tail.value  the value of the last node in list
     *          null        returned if the list is empty
     */
    this.back = function() {
        if( this.empty() === true ) {
            return null ;
        }
        else {
            return end.prev.value ;
        }
    };

    /**
     * Push a node at the back of list
     *
     * @param   value       the value of node which will be pushed at the end of list
     *
     * @return  true        returned if the value be pushed into list successfully
     *          false       returned if the value is undefined, and the operation failed
     */
    this.push_back = function(value) {
        if( value === undefined ) {
            console.log("The value of node to be pushed can not be undefined!") ;
            return false ;
        }

        var newNode = new listNode() ;
        newNode.value = value ;

        if( this.empty() === true ) {
            head.next = newNode ;
            newNode.prev = head ;

            newNode.next = end ;
            end.prev = newNode ;

            sorted = true ;
        }
        else {
            if( _cmp === null ? end.prev.value > newNode.value : _cmp(end.prev.value,newNode.value) == true ) {
                sorted = false ;
            }

            end.prev.next = newNode ;
            newNode.prev = end.prev ;

            end.prev = newNode ;
            newNode.next = end ;
        }

        length = length + 1 ;

        return true ;
    };

    /**
     * Push a node at the front of list
     *
     * @param   value       the value of node which will be pushed at the front of list
     *
     * @return  true        returned if the value be pushed into list successfully
     *          false       returned if the value is undefined, and the operation failed
     */
    this.push_front = function(value) {
        if( value === undefined ) {
            console.log("The value of node to be pushed can not be undefined!") ;
            return false ;
        }

        var newNode = new listNode() ;
        newNode.value = value ;

        if( this.empty() === true ) {
            head.next = newNode ;
            newNode.prev = head ;

            newNode.next = end ;
            end.prev = newNode ;

            sorted = true ;
        }
        else {
            if( _cmp === null ? head.next.value < newNode.value : _cmp(newNode.value,head.next.value) == true ) {
                sorted = false ;
            }

            head.next.prev = newNode ;
            newNode.next = head.next ;

            head.next = newNode ;
            newNode.prev = head ;
        }

        length = length + 1 ;

        return true ;
    } ;

    /**
     * Insert a node into the list in order from small to large, and the list will be
     * sorted before insert if it is unsorted.
     *
     * @param   value       the value of node which will be inserted into the list
     *
     * @return  true        returned if the value be pushed into list successfully
     *          false       returned if the value is undefined, and the operation failed
     */
    this.insertInOrder = function(value,cmp) {
        if( value === undefined ) {
            console.log("The value of node to be pushed can not be undefined!") ;
            return false ;
        }

        var newNode = new listNode() ;
        newNode.value = value ;

        if( cmp === undefined ) {
            this.sort() ;
        }
        else {
            _cmp = cmp ;
            this.sort(cmp) ;
        }

        if( this.empty() === true ) {
            head.next = newNode ;
            newNode.prev = head ;

            newNode.next = end ;
            end.prev = newNode ;
        }
        else {
            var temp = head.next ;

            if( cmp === undefined ) {
                while( temp !== end ) {
                    if( temp.value <= value ) {
                        temp = temp.next ;
                    }
                    else {
                        break ;
                    }
                }
            }
            else {
                while( temp !== end ) {
                    if( cmp(temp.value, value) == false ) {
                        temp = temp.next ;
                    }
                    else {
                        break ;
                    }
                }
            }

            temp.prev.next = newNode ;
            newNode.prev = temp.prev ;

            newNode.next = temp ;
            temp.prev = newNode ;
        }

        length = length + 1 ;

        return true ;
    } ;

    /**
     * Sort the nodes in list using merge sort recursively
     *
     * @param   cmp         the method used to compare two entries in the list
     */
    this.sort = function(cmp) {
        if( sorted === true ) {
            console.log("The DoubleList has been already sorted") ;
            return ;
        }

        var result ;
        if( cmp === undefined ) {
            result = mergeSort(head.next, end.prev, length) ;
        }
        else {
            _cmp = cmp ;
            result = mergeSort(head.next, end.prev, length, cmp) ;
        }

        head.next = result.head ;
        result.head.prev = head ;

        end.prev = result.tail ;
        result.tail.next = end ;

        sorted = true ;
    } ;

    /**
     * Find the node which has the target value
     *
     * @param   target      the value of node which will be find
     *
     * @return  true        returned if the target node was found
     *          false       returned if the target node wasn't found
     */
    this.find = function(target) {
        if( search(target) !== null ) {
            return true ;
        }
        else {
            return false ;
        }
    } ;

    /**
     * Remove the target node from list
     *
     * @param   target              the value of target node to remove
     *
     * @return  targetPtr.value     the value of node which was removed
     *          null                returned if thr target node to removed is not exist
     */
    this.remove = function(target) {
        if( this.empty() !== true ) {
            var targetPtr = search(target) ;
            current = head ;
            targetPtr.prev.next = targetPtr.next ;
            targetPtr.next.prev = targetPtr.prev ;
            targetPtr.prev = null ;
            targetPtr.next = null ;

            length = length - 1 ;

            if( this.size() === 1 || this.empty() === true ) {
                sorted = true ;
            }

            return targetPtr.value ;
        }
        else {
            console.log("Can not remove the entry from the list which is empty") ;
            return null ;
        }
    } ;

    /**
     * Clear all the nodes in list
     */
    this.clear = function() {
        var to_delete = head.next ;

        while( to_delete !== end ) {
            head.next = to_delete.next ;
            head.next.prev = head ;

            to_delete.prev = null ;
            to_delete.next = null ;

            to_delete = head.next ;
        }

        length = 0 ;

        sorted = true ;
    } ;

    /**
     * Show the value of every node in list from head to tail
     */
    this.show = function() {
        if( this.empty() === true ) {
            return ;
        }
        else {
            var ptr = head.next ;

            while( ptr !== end ) {
                console.log(ptr.value) ;

                ptr = ptr.next ;
            }
        }
    } ;

    /**
     * Show the value of every node in list in reverse order (from tail to head)
     */
    this.showInreverse = function() {
        if( tail === null ) {
            return ;
        }
        else {
            var ptr = tail ;

            while( ptr !== null ) {
                console.log(ptr.value) ;

                ptr = ptr.prev ;
            }
        }
    } ;
}