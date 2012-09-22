/**
 * The constructor of line, the Vector.js should be included before it.
 */
function Line() {
    var K ;     //The slope of the line
    var A ;
    var B ;
    var C ;

    //一般式，Ax+By+C=0
    this.setLineInGeneralForm = function(numA, numB, numC) {
        if( arguments.length !== 3 ) {
            throw new Error("There should be three arguments to initialize the line in general form.") ;
        }

        A = numA ;
        B = numB ;
        C = numC ;
        K = -A / B ;
    };

    //点斜式，知道直线上一点(x,y),并且直线的斜率k存在
    this.setLineInPointSlopeForm = function(x, y, slope) {
        if( arguments.length !== 3 ) {
            throw new Error("There should be three arguments to initialize the line in general form.") ;
        }

        K = slope ;
        A = -K ;
        B = 1 ;
        C = K * x - y ;
    };

    //截距式，直线与x轴交于(a,0)，与y轴交于(0,b)
    this.setLineInInterceptForm = function(a, b) {
        if( arguments.length !== 2 ) {
            throw new Error("There should be Two arguments to initialize the line in general form.") ;
        }

        A = b ;
        B = a ;
        C = -a * b ;
        K = -A / B ;
    };

    //斜截式，直线在y轴上的截距为b，斜率k存在
    this.setLineInSlopeInterceptForm = function(b, slope) {
        if( arguments.length !== 2 ) {
            throw new Error("There should be Two arguments to initialize the line in general form.") ;
        }
        this.setLineInPointSlopeForm(0, b, slope)
    };

    //两点式，已知直线上两点(x1,y1)和(x2,y2)
    this.setLineInTwoPointForm = function(x1, y1, x2, y2) {
        if( arguments.length !== 4 ) {
            throw new Error("There should be four arguments to initialize the line in general form.") ;
        }

        A = y2 - y1 ;
        B = x1 - x2 ;
        C = ( x2 - x1 ) * y1 - ( y2 - y1 ) * x1 ;
        K = -A / B ;
    };

    this.getA = function() {
        return A ;
    };

    this.getB = function() {
        return B ;
    };

    this.getC = function() {
        return C ;
    };

    this.getK = function() {
        return K ;
    };

    this.getVerticalCrossoverPoint = function(point) {
        if( this.isOnLine(point) === true ) {
            return point ;
        }
        var cx = ( B * B * point.x - A * C - A * B * point.y ) / ( A * A + B * B ) ;
        var cy = ( A * A * point.y - A * B * point.x - B * C ) / ( A * A + B * B ) ;

        return new Vector2(cx, cy) ;
    };

    this.getVerticalCrossoverLine = function(point) {
        var verticalCrossoverLine = new Line() ;
        verticalCrossoverLine.setLineInGeneralForm(B, -A, A*point.y-B*point.x) ;
        return verticalCrossoverLine ;
    };

    this.isOnLine = function(point) {
        if( A * point.x + B * point.y + C < 0.1 ) {
            return true ;
        }
        else {
            return false ;
        }
    };

    this.getParallelLine = function(point) {
        var parallelLine = new Line() ;
        parallelLine.setLineInPointSlopeForm(point.x, point.y, K) ;
        return parallelLine ;
    };

    this.distanceToPoint = function(point) {
        var distance = Math.abs(A*point.x+B*point.y+C) / Math.sqrt(A*A+B*B) ;

        return distance ;
    };

    this.getVerticalVector = function() {
        var vector = new Vector2(1, K) ;
        var verticalVector = vector.getVerticalVector() ;
        verticalVector.normalize() ;

        return verticalVector ;
    }
}