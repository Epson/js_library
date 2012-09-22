/**
 * The constructor of double Vector
 */
(function(window) {
    var Vector2 = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };
    Vector2.prototype = {
        constructor : Vector2,
        set: function(x, y) {
            this.x = x;
            this.y = y;
            return this;
        },
        sub: function(v) {
            return new Vector2(this.x - v.x, this.y - v.y);
        },
        multiplyScalar: function(s) {
            this.x *= s;
            this.y *= s;
            return this;
        },
        divideScalar: function(s) {
            if (s) {
                this.x /= s;
                this.y /= s;
            } else {
                this.set(0, 0);
            }
            return this;
        },
        length: function() {
            return Math.sqrt(this.lengthSq());
        },
        dot : function(v) {
            return this.x * v.x + this.y * v.y ;
        },
        normalize: function() {
            return this.divideScalar(this.length());
        },
        lengthSq: function() {
            return this.x * this.x + this.y * this.y;
        },
        distanceToSquared: function(v) {
            var dx = this.x - v.x,
                dy = this.y - v.y;
            return dx * dx + dy * dy;
        },
        distanceTo: function(v) {
            return Math.sqrt(this.distanceToSquared(v));
        },
        setLength: function(l) {
            return this.normalize().multiplyScalar(l);
        },
        reflectByLine : function(line) {

        },
        reflectByPoint : function() {

        },
        reflectionSelf : function(v) {
            var nv = v.normalize() ;
            var reflectVector = this.sub(nv.multiplyScalar(2*this.dot(nv))) ;

            return reflectVector ;
        },
        distanceToLine : function(line) {
            var distance = Math.abs(line.getA()*this.x+line.getB()*this.y+line.getC()) /
                Math.sqrt(Math.pow(line.getA(),2)+Math.pow(line.getB(),2)) ;

            return distance ;
        },
        getVerticalVector : function() {
            var newVector ;
            if( this.y !== 0 ) {
                newVector = new Vector2(1, -this.x/this.y) ;
            }
            else {
                newVector = new Vector2(0, 1) ;
            }

            newVector.normalize().multiplyScalar(this.length()) ;
            return newVector ;
        }
    };
    window.Vector2 = Vector2;
} (window));