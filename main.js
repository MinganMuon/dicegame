// main.js

function Main() {
    var self = this;

    this.tileOnClick = function() {
        let rowno = this.rownum;
        let num = this.number;
        if (num == -1) { // if the extra tile
            // if not locked and not lined, lock and line
            // if locked and lined, unlock
            // if not locked and lined, unline
            if (self.theboard.rows[rowno].rowlocked == true) {
                self.theboard.rows[rowno].rowlocked = false;
                this.setTexture(this.uncheckedtex);
            } else { 
                if (this.lined == true) {
                    this.lined = false;
                    self.app.stage.getChildByName(rowno.toString()).visible = false;
                } else {
                    self.theboard.rows[rowno].rowlocked = true;
                    this.setTexture(this.checkedtex);
                    this.lined = true;
                    self.app.stage.getChildByName(rowno.toString()).visible = true;
                }
            }
        } else {
            if ( self.theboard.rows[rowno].nums[num] == true ) {
                self.theboard.rows[rowno].nums[num] = false;
                this.setTexture(this.uncheckedtex);
            } else {
                self.theboard.rows[rowno].nums[num] = true;
                this.setTexture(this.checkedtex);
            }
        }
    }

    this.dieOnClick = function() {
        // in the future, clean up this ugly repetition...
        var randomnum = Math.floor(Math.random() * 6); // random number between 0 and 5
        self.app.stage.getChildByName('red').setTexture(self.app.stage.getChildByName('red').tiletexs[randomnum]); // remember array is zero-indexed
        var randomnum = Math.floor(Math.random() * 6); // random number between 0 and 5
        self.app.stage.getChildByName('yellow').setTexture(self.app.stage.getChildByName('yellow').tiletexs[randomnum]); // remember array is zero-indexed
        var randomnum = Math.floor(Math.random() * 6); // random number between 0 and 5
        self.app.stage.getChildByName('green').setTexture(self.app.stage.getChildByName('green').tiletexs[randomnum]); // remember array is zero-indexed
        var randomnum = Math.floor(Math.random() * 6); // random number between 0 and 5
        self.app.stage.getChildByName('blue').setTexture(self.app.stage.getChildByName('blue').tiletexs[randomnum]); // remember array is zero-indexed
        var randomnum = Math.floor(Math.random() * 6); // random number between 0 and 5
        self.app.stage.getChildByName('1white').setTexture(self.app.stage.getChildByName('1white').tiletexs[randomnum]); // remember array is zero-indexed
        var randomnum = Math.floor(Math.random() * 6); // random number between 0 and 5
        self.app.stage.getChildByName('2white').setTexture(self.app.stage.getChildByName('2white').tiletexs[randomnum]); // remember array is zero-indexed
    }

    this.pboxOnClick = function() {
        psofar = self.theboard.penalties;
        if (this.number == psofar + 1) {
            // check it!
            this.setTexture(this.checkedtex);
            self.theboard.penalties = self.theboard.penalties + 1;
        } else if (this.number == psofar) {
            // uncheck it!
            this.setTexture(this.uncheckedtex);
            self.theboard.penalties = self.theboard.penalties - 1;
        }
    }

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
                tile.on('pointerdown', this.tileOnClick);
                tile.checkedtex = tile_tex_checked;
                tile.uncheckedtex = tile_tex;
                if (i == 1) {
                    tile.number = -1;
                    tile.lined = false;
                } else {
                    tile.number = (12-i);
                }
                tile.rownum = rownumber;
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
                tile.on('pointerdown', this.tileOnClick);
                tile.checkedtex = tile_tex_checked;
                tile.uncheckedtex = tile_tex;
                if (i == 13) {
                    tile.number = -1;
                    tile.lined = false;
                } else {
                    tile.number = (i - 2);
                }
                tile.rownum = rownumber;
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
        // penalties text
        //var ptext = new PIXI.Text('Penalties:');
        //ptext.x = 30;
        //ptext.y = 235;
        //this.app.stage.addChild(ptext);
        // penalty boxes
        let penalties_box_tex = PIXI.utils.TextureCache["img/penalties_box.png"];
        let penalties_box_checked_tex = PIXI.utils.TextureCache["img/penalties_box_checked.png"];
        for (let k = 0; k < 4; k++) {
            let pbox = new PIXI.Sprite(penalties_box_tex);
            pbox.y = 235;
            pbox.x = 10 + 50*k + 5*k; // 30 + 50*k + 20*k + 150 + 10
            pbox.interactive = true;
            pbox.on('pointerdown', this.pboxOnClick);
            pbox.checkedtex = penalties_box_checked_tex;
            pbox.uncheckedtex = penalties_box_tex;
            pbox.number = k + 1;
            this.app.stage.addChild(pbox);
        }
        console.log("Penalties sprites done");
        // score stuff
        var scoretext = new PIXI.Text('Score: ');
        scoretext.x = 245; // 500;
        scoretext.y = 225;
        this.app.stage.addChild(scoretext);
        var scoredisplay = new PIXI.Text('0');
        scoredisplay.x = 265;
        scoredisplay.y = 255;
        this.app.stage.addChild(scoredisplay);
        // this is obviously resource-intensive and basically the worst way to do this so it needs to be fixed
        this.app.ticker.add(function() {
            scoredisplay.text = self.theboard.scoreboard();
            // TO DO - fix this score updating thing to be not happening every frame
        });
        console.log("Score sprite done");
        // init lock lines
        let lockline_tex = PIXI.utils.TextureCache["img/lockline.png"];
        for (i = 0; i < 5; i++) {
            let lockline = new PIXI.Sprite(lockline_tex);
            lockline.x = 10;
            lockline.y = 10 + 5*i + 50*i;
            lockline.visible = false;
            lockline.name = i.toString();
            this.app.stage.addChild(lockline);
        }
        console.log("Lock line sprites done.");
        // init red die
        let tile = new PIXI.Sprite(red_tiles_tex);
        tile.y = 235;
        tile.x = 340;
        tile.interactive = true;
        tile.on('pointerdown', this.dieOnClick);
        tile.tiletexs = new Array();
        for (let i = 1; i < 7; i++){
            let j = i; // if (i == 1) { j = 0;}
            let rectangle = new PIXI.Rectangle(50*(j%4), 50*(Math.floor(j/4)), 50, 50);
            let tile_tex = new PIXI.Texture(red_tiles_tex, rectangle);
            tile.tiletexs.push(tile_tex);
        }
        tile.setTexture(tile.tiletexs[0]);
        tile.name = 'red';
        this.app.stage.addChild(tile);
        // init yellow die
        tile = new PIXI.Sprite(yellow_tiles_tex);
        tile.y = 235;
        tile.x = 340 + 50 + 5;
        tile.interactive = true;
        tile.on('pointerdown', this.dieOnClick);
        tile.tiletexs = new Array();
        for (let i = 1; i < 7; i++){
            let j = i; // if (i == 1) { j = 0;}
            let rectangle = new PIXI.Rectangle(50*(j%4), 50*(Math.floor(j/4)), 50, 50);
            let tile_tex = new PIXI.Texture(yellow_tiles_tex, rectangle);
            tile.tiletexs.push(tile_tex);
        }
        tile.setTexture(tile.tiletexs[0]);
        tile.name = 'yellow';
        this.app.stage.addChild(tile);
        // init green die
        tile = new PIXI.Sprite(green_tiles_tex);
        tile.y = 235;
        tile.x = 340 + 2*50 + 2*5;
        tile.interactive = true;
        tile.on('pointerdown', this.dieOnClick);
        tile.tiletexs = new Array();
        for (let i = 1; i < 7; i++){
            let j = i; // if (i == 1) { j = 0;}
            let rectangle = new PIXI.Rectangle(50*(j%4), 50*(Math.floor(j/4)), 50, 50);
            let tile_tex = new PIXI.Texture(green_tiles_tex, rectangle);
            tile.tiletexs.push(tile_tex);
        }
        tile.setTexture(tile.tiletexs[0]);
        tile.name = 'green';
        this.app.stage.addChild(tile);
        // init blue die
        tile = new PIXI.Sprite(blue_tiles_tex);
        tile.y = 235;
        tile.x = 340 + 3*50 + 3*5;
        tile.interactive = true;
        tile.on('pointerdown', this.dieOnClick);
        tile.tiletexs = new Array();
        for (let i = 1; i < 7; i++){
            let j = i; // if (i == 1) { j = 0;}
            let rectangle = new PIXI.Rectangle(50*(j%4), 50*(Math.floor(j/4)), 50, 50);
            let tile_tex = new PIXI.Texture(blue_tiles_tex, rectangle);
            tile.tiletexs.push(tile_tex);
        }
        tile.setTexture(tile.tiletexs[0]);
        tile.name = 'blue';
        this.app.stage.addChild(tile);
        // init white die
        // white tile 1
        let white_dice_tex = PIXI.utils.TextureCache["img/white_dice.png"];
        tile = new PIXI.Sprite(white_dice_tex);
        tile.y = 235;
        tile.x = 340 + 4*50 + 4*5;
        tile.interactive = true;
        tile.on('pointerdown', this.dieOnClick);
        tile.tiletexs = new Array();
        for (let i = 1; i < 7; i++){
            let j = i; // if (i == 1) { j = 0;}
            let rectangle = new PIXI.Rectangle(50*(j%4), 50*(Math.floor(j/4)), 50, 50);
            let tile_tex = new PIXI.Texture(white_dice_tex, rectangle);
            tile.tiletexs.push(tile_tex);
        }
        tile.setTexture(tile.tiletexs[0]);
        tile.name = '1white';
        this.app.stage.addChild(tile);
        // white tile 2
        tile = new PIXI.Sprite(white_dice_tex);
        tile.y = 235;
        tile.x = 340 + 5*50 + 5*5;
        tile.interactive = true;
        tile.on('pointerdown', this.dieOnClick);
        tile.tiletexs = new Array();
        for (let i = 1; i < 7; i++){
            let j = i; // if (i == 1) { j = 0;}
            let rectangle = new PIXI.Rectangle(50*(j%4), 50*(Math.floor(j/4)), 50, 50);
            let tile_tex = new PIXI.Texture(white_dice_tex, rectangle);
            tile.tiletexs.push(tile_tex);
        }
        tile.setTexture(tile.tiletexs[0]);
        tile.name = '2white';
        this.app.stage.addChild(tile);

        console.log("Dice sprites done.");

        console.log("All sprites done.");
    }

    console.log("Initializing...");
    this.app = new PIXI.Application({transparent: true});
    this.app.renderer.view.style.position = "absolute";
    this.app.renderer.view.style.display = "block";
    this.app.renderer.resize(675, 300);
    document.body.appendChild(this.app.view);

    scaleToWindow(self.app.renderer.view, "#eee");
    window.addEventListener("resize", function(event){ 
        scaleToWindow(self.app.renderer.view, "#eee");
    });

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
    .add("img/penalties_text.png")
    .add("img/penalties_box.png")
    .add("img/penalties_box_checked.png")
    .add("img/lockline.png")
    .add("img/white_dice.png")
    .load(this.setupboard.bind(this));
}
