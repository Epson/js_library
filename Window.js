function getHeight() {
    var yScroll;
    if (window.innerHeight && window.scrollMaxY) {
        yScroll = window.innerHeight + window.scrollMaxY;
    }
    else if (document.body.scrollHeight > document.body.offsetHeight) {
        yScroll = document.body.scrollHeight; // all but Explorer Mac
    }
    else {
        yScroll = document.body.offsetHeight;  // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
    }
    var windowHeight;
    if (self.innerHeight) {
        windowHeight = self.innerHeight; // all except Explorer
    }
    else if (document.documentElement && document.documentElement.clientHeight) {
        windowHeight = document.documentElement.clientHeight; // Explorer 6 Strict Mode
    }
    else if (document.body) {
        windowHeight = document.body.clientHeight; // other Explorers
    }
    if (yScroll < windowHeight) {
        pageHeight = windowHeight; // for small pages with total height less then height of the viewport
    }
    else {
        pageHeight = yScroll;
    }
    return pageHeight;
}

function getWidth() {
    var xScroll
    if (window.innerHeight && window.scrollMaxY) {
        xScroll = document.body.scrollWidth;
    }
    else if (document.body.scrollHeight > document.body.offsetHeight) {
        xScroll = document.body.scrollWidth;    // all but Explorer Mac
    }
    else {
        xScroll = document.body.offsetWidth;
    }
    var windowWidth
    if (self.innerHeight) {
        windowWidth = self.innerWidth; // all except Explorer
    }
    else if (document.documentElement && document.documentElement.clientHeight) {
        windowWidth = document.documentElement.clientWidth; // Explorer 6 Strict Mode
    }
    else if (document.body) {
        windowWidth = document.body.clientWidth;      // other Explorers
    }
    if (xScroll < windowWidth) {
        pageWidth = windowWidth;
    }
    else {
        pageWidth = xScroll;
    }
    return pageWidth;
}
