// main.js

function Main() {
    var self = this;

    this.setuprow = function(rownumber, uctex, ctex) {
        let startno = self.theboard.rows[rownumber].startnum;
        let endno = self.theboard.rows[rownumber].endnum;

        // the following block can definitely be improved upon
        // especially the i's, j's, and the stuff reliant upon those variables
        if (startno > endno) {
            // decr
            for (let i = 12; i > 0; i--){
                let j = i; if (i == 1) { j = 0;}
                let rectangle = new PIXI.Rectangle(50*(j%4), 50*(Math.floor(j/4)), 50, 50);
                let tile_tex_checked = new PIXI.Texture(ctex, rectangle);
                let tile_tex = new PIXI.Texture(uctex, rectangle);
                
                let tile = new PIXI.Sprite(tile_tex);
                tile.y = 10 + (rownumber)*tile.height + (rownumber)*5;
                tile.x = 10 + (12-i)*tile.width + 5*(12-i);
                tile.interactive = true;
                // tile.on('pointerdown', this.tileOnClick);
                tile.checkedtex = tile_tex_checked;
                tile.uncheckedtex = tile_tex;
                if (i == 1) {
                    tile.number = -1;
                } else {
                    tile.number = (12-i) - 1; // -1 because arrays are zero-indexed
                }
                this.app.stage.addChild(tile);
            }
        } else {
            // incr
            for (let i = 2; i < 14; i++){
                let j = i; if (j == 13) { j = 0; }
                let rectangle = new PIXI.Rectangle(50*(j%4), 50*(Math.floor(j/4)), 50, 50);
                let tile_tex_checked = new PIXI.Texture(ctex, rectangle);
                let tile_tex = new PIXI.Texture(uctex, rectangle);
                
                let tile = new PIXI.Sprite(tile_tex);
                tile.y = 10 + (rownumber)*tile.height + (rownumber)*5;
                tile.x = 10 + (i-2)*tile.width + 5*(i-2);
                tile.interactive = true;
                // tile.on('pointerdown', this.tileOnClick);
                tile.checkedtex = tile_tex_checked;
                tile.uncheckedtex = tile_tex;
                if (i == 13) {
                    tile.number = -1;
                } else {
                    tile.number = (i - 2) - 1; // -1 because arrays are zero-indexed
                }
                this.app.stage.addChild(tile);
            }
        }
    }

    this.setupboard = function() {
        console.log("Textures loaded.");
        console.log("Setting up the board...");
        this.theboard = new board();
        console.log("Initalizing sprites...");
        // red row
        let red_tiles_tex = PIXI.utils.TextureCache["img/red_tiles.png"];
        let red_tiles_tex_checked = PIXI.utils.TextureCache["img/red_tiles_checked.png"];
        this.setuprow(0, red_tiles_tex, red_tiles_tex_checked);
        console.log("Red sprites done");
        // yellow row
        let yellow_tiles_tex = PIXI.utils.TextureCache["img/yellow_tiles.png"];
        let yellow_tiles_tex_checked = PIXI.utils.TextureCache["img/yellow_tiles_checked.png"];
        this.setuprow(1, yellow_tiles_tex, yellow_tiles_tex_checked);
        console.log("Yellow sprites done");
        // green row
        let green_tiles_tex = PIXI.utils.TextureCache["img/green_tiles.png"];
        let green_tiles_tex_checked = PIXI.utils.TextureCache["img/green_tiles_checked.png"];
        this.setuprow(2, green_tiles_tex, green_tiles_tex_checked);
        console.log("Green sprites done");
        // blue row
        let blue_tiles_tex = PIXI.utils.TextureCache["img/blue_tiles.png"];
        let blue_tiles_tex_checked = PIXI.utils.TextureCache["img/blue_tiles_checked.png"];
        this.setuprow(3, blue_tiles_tex, blue_tiles_tex_checked);
        console.log("Blue sprites done");
        console.log("All sprites done.");
    }

    console.log("Initializing...");
    this.app = new PIXI.Application({transparent: true});
    this.app.renderer.view.style.position = "absolute";
    this.app.renderer.view.style.display = "block";
    this.app.renderer.autoResize = true;
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.app.view);

    console.log("Loading textures...");
    PIXI.loader
    .add("img/red_tiles.png")
    .add("img/red_tiles_checked.png")
    .add("img/yellow_tiles.png")
    .add("img/yellow_tiles_checked.png")
    .add("img/green_tiles.png")
    .add("img/green_tiles_checked.png")
    .add("img/blue_tiles.png")
    .add("img/blue_tiles_checked.png")
    .load(this.setupboard.bind(this));
}
