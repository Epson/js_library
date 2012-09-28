
(function(window){
    var CodeConverter = function() {
        var _canvas = document.createElement("canvas");
        _canvas.width = 100 ;
        _canvas.height = 100 ;
        var width = _canvas.width ;
        var height = _canvas.height ;
        var code ;

        function _saveImage(canvas, width, height) {
            var strData = canvas.toDataURL("png");
            document.location.href = strData.replace("png", "image/octet-stream") ;
        }

        this.convertCodeToImage = function(code) {
            var ctx = _canvas.getContext("2d") ;
            ctx.clearRect(0, 0, width, height) ;

            var imageData = ctx.getImageData(0, 0, width, height) ;

            var index = 0 ;
            for( var i = 0 ; i < code.length; ) {
                if( (index + 1) % 4 !== 0 ) {
                    imageData.data[index] = code.charCodeAt(i) ;
                    i += 1 ;
                }
                else {
                    imageData.data[index] = 255 ;
                }
                index += 1 ;
            }
            (index+1) % 4 !== 0 ? imageData.data[index+4-(index+1)%4] = 255 : imageData.data[index] = 255 ;

            ctx.putImageData(imageData, 0, 0, 0, 0, width, height) ;

            _saveImage(_canvas, width, height) ;
        };

        this.convertImageToCode = function(filepath) {
            var ctx = _canvas.getContext("2d") ;
            code = "" ;
            var img = new Image() ;
            img.src = filepath ;
            img.onload = function() {
                ctx.drawImage(img, 0, 0) ;

                var imageData = ctx.getImageData(0, 0, width, height) ;
                var length = imageData.data.length ;
                for( var i = 0; i < length; i += 4 ) {
                    imageData.data[i] !== 0 ? code = code + String.fromCharCode(imageData.data[i]) : null ;
                    imageData.data[i+1] !== 0 ? code = code + String.fromCharCode(imageData.data[i+1]) : null ;
                    imageData.data[i+2] !== 0 ? code = code + String.fromCharCode(imageData.data[i+2]) : null ;
                    if( imageData.data[i+3] === 0 ) {
                        break ;
                    }
                }
            };

            this.getCode = function() {
                return code ;
            };
        };
    };

    window.CodeConverter = CodeConverter ;
}(window)) ;