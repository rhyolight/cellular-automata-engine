var _ = require('lodash');
var rowLength = 1000;
var row = [];

function loadRow(r, l) {
    var i = 0;
    for (; i < l; i++) {
        if (i == Math.floor(l / 2)) {
            r.push(1);
        } else {
            r.push(0);
        }
    }
}

function printRow(r) {
    var s = _.map(r, function(i) {
        if (i) return '#';
        return ' ';
    });
    console.log(s.join(''));
}

function sliceMidpoints(a, l) {
    var midpoint = Math.floor(a.length / 2);
    var halfmid = Math.floor(l / 2);
    var left = midpoint - halfmid;
    var right = midpoint + halfmid;
    // console.log(a.length + ':' + left + ',' + right);
    return a.slice(left, right);
}

function rule30(r) {
// http://en.wikipedia.org/wiki/Rule_30
//            current pattern 111 110 101 100 011 010 001 000
// new state for center cell   0   0   0   1   1   1   1   0
    var out = [];
    _.each(r, function(cell, index) {
        var left, center, right, above;
        var matches = ['100', '011', '010', '001'];
        if (index == 0) {
            out.push(0);
            left = 0;
        } else {
            left = row[index - 1];
        }
        center = row[index];
        if (index == r.length - 1) {
            right = 0;
            out.push(0);
        } else {
            right = r[index + 1];
        }
        above = "" + left + center + right;
        // console.log(above);
        if (matches.indexOf(above) > -1) {
            out.push(1);
        } else {
            out.push(0);
        }
    });
    // console.log(out);
    // return sliceMidpoints(out, r.length);
    return out;
}

function report(r, c, t) {
    var ms = new Date().getTime() - t;
    console.log('%s: row is %s cells long, took %s ms', c, r.length, ms);
}

loadRow(row, rowLength);
row = [1];

var count = 0;
var time = new Date().getTime();
// while(true) {
//     row = rule30(row);
//     count++;
//     printRow(sliceMidpoints(row, 100))
//     if (count % 100 == 1) {
//         report(row, count, time);
//         time = new Date().getTime();
//     }
// }

setInterval(function() {
    row = rule30(row);
    count++;
    printRow(sliceMidpoints(row, 600))
}, 50);