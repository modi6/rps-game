class Canvas {

    static items = {};

    constructor(c) {

        this.canvas = document.getElementById(c);
        this.context = this.canvas.getContext("2d");

    }


    setWidth(w) {
        this.canvas.width = w;
    }

    setHeight(h) {
        this.canvas.height = h;
    }

    cleanCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    getPicture(obj, source) {
        this.loadPicture(source, function (img) {
            Canvas.items[obj] = img;
        });
    }

    loadPicture(source, cb) {

        let img = new Image();

        img.src = source;

        img.onload = function () {
            cb(img);
        };
    }


}

//done