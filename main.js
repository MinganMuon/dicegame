// main.js

function Main() {
    var self = this
    // init code at bottom

    // set up tiles
    this.tileOnClick = function() {
        locInTexArray = Math.abs(this.number - 13); // big hack here
        if (this.checked == true){
            this.checked = false;
            this.setTexture(self.redtiletex[locInTexArray]);
        } else {
            this.checked = true;
            this.setTexture(self.redtiletexchecked[locInTexArray]);
        }
    }
    this.doredtiles = function(i) {
        let j = i; if (j == 13) { j = 0; }
        let rectangle = new PIXI.Rectangle(50*(j%4), 50*(Math.floor(j/4)), 50, 50);
    
        let tile_tex_checked = new PIXI.Texture(this.red_tiles_tex_checked, rectangle);
        this.redtiletexchecked.push(tile_tex_checked);
        let tile_tex = new PIXI.Texture(this.red_tiles_tex, rectangle);
        this.redtiletex.push(tile_tex);
    
        let tile = new PIXI.Sprite(tile_tex);
        tile.y = 10;
        tile.x = 10 + (i-2)*tile.width + 5*(i-2);
        tile.interactive = true;
        tile.on('pointerdown', this.tileOnClick);
        tile.color = "red";
        tile.number = i;
        tile.checked = false;
        this.redtiles.push(tile);
        this.app.stage.addChild(tile);
    }
    this.setuptiles = function() {
        this.redtiles = [];
        this.redtiletex = [];
        this.redtiletexchecked = [];
        this.red_tiles_tex = PIXI.utils.TextureCache["img/red_tiles.png"];
        this.red_tiles_tex_checked = PIXI.utils.TextureCache["img/red_tiles_checked.png"];
        for (let i = 13; i > 1; i--){
            this.doredtiles(i);
        }
    }

    // init
    console.log("Entered Main()");
    this.app = new PIXI.Application({transparent: true});

    this.app.renderer.view.style.position = "absolute";
    this.app.renderer.view.style.display = "block";
    this.app.renderer.autoResize = true;
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(this.app.view);
    PIXI.loader
    .add("img/red_tiles.png")
    .add("img/red_tiles_checked.png")
    .load(this.setuptiles.bind(this));
}

/*
Main.prototype.doredtiles = function(i) {
    let j = i; if (j == 13) { j = 0; }
    let rectangle = new PIXI.Rectangle(50*(j%4), 50*(Math.floor(j/4)), 50, 50);

    let tile_tex_checked = new PIXI.Texture(Main.red_tiles_tex_checked, rectangle);
    Main.redtiletexchecked.push(tile_tex_checked);
    let tile_tex = new PIXI.Texture(Main.red_tiles_tex, rectangle);
    Main.redtiletex.push(tile_tex);

    let tile = new PIXI.Sprite(tile_tex);
    tile.y = 10;
    tile.x = 10 + (i-2)*tile.width + 5*(i-2);
    tile.interactive = true;
    tile.on('pointerdown', Main.tileOnClick);
    tile.color = "red";
    tile.number = i;
    tile.checked = false;
    Main.redtiles.push(tile);
    Main.app.stage.addChild(tile);
}

Main.prototype.tileOnClick = function() {
    locInTexArray = Math.abs(this.number - 13); // big hack here
    if (this.checked == true){
        this.checked = false;
        this.setTexture(Main.redtiletex[locInTexArray]);
    } else {
        this.checked = true;
        this.setTexture(Main.redtiletexchecked[locInTexArray]);
    }
}

Main.prototype.setuptiles = function() {
    // init redtiles
    Main.redtiles = [];
    Main.redtiletex = [];
    Main.redtiletexchecked = [];
    Main.red_tiles_tex = PIXI.utils.TextureCache["img/red_tiles.png"];
    Main.red_tiles_tex_checked = PIXI.utils.TextureCache["img/red_tiles_checked.png"];
    for (let i = 13; i > 1; i--){
        Main.doredtiles(i);
    }
}

Main.prototype.init = function() {
    Main.app = new PIXI.Application({transparent: true});

    Main.app.renderer.view.style.position = "absolute";
    Main.app.renderer.view.style.display = "block";
    Main.app.renderer.autoResize = true;
    Main.app.renderer.resize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(Main.app.view);
    console.log(Main);
    PIXI.loader
    .add("img/red_tiles.png")
    .add("img/red_tiles_checked.png")
    .load(Main.setuptiles());
}

function Main() {
    this.init();
}
*/
