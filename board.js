// board.js

// how many checkmarks required to be able to lock a row? (not including the 2/12 on the right side)
var reqchecktolock = 5;

function row (startnumber, endnumber) {
    this.startnum = startnumber; // number on left
    this.endnum = endnumber; // number on right

    this.nums = [];
    for (i = 0; i <= (Math.abs(this.endnumber - this.startnumber)); i++) {
        this.nums.push(false);
    }

    this.rowlocked = false; // is the row locked?
                       // it's assumed that the board's player locked the board and gained the extra checkmark.

    // how many checkmarks does this row have? this doesn't include the extra checkmark (at least not right now)
    this.countcheckmarks = function() {
        let checks = 0;
        for (var i = 0; i < this.nums.length; i++) {
            if (this.nums[i] == true) {
                checks++;
            }
        }
        return checks;
    }
    
    // is this row lockable (has more than reqchecktolock checkmarks)?
    this.islockable = function() {
        let checks = this.countcheckmarks();
        if (checks >= reqchecktolock) {
            return true;
        }
        return false;
    }

    // gives the score of this row
    // perhaps externalize this function eventually?
    this.scorerow = function() {
        let checks = this.countcheckmarks();
        let score = Math.floor( checks * (checks + 1) / 2 );
        return score;
    }
}
