queue()
    .defer(d3.csv, "data/2015.csv")
    .defer(d3.csv, "data/2016.csv")
    .defer(d3.csv, "data/2017.csv")
    .await(ready);

function ready(error, a, b, c) {
    var d15 = {};
    var d16 = {};
    var d17 = {};

    a.forEach(function(d) {
        if(d15[d.Region]) {
            if(!isNaN(+d.HappinessScore)) {
                d15[d.Region].push(+d.HappinessScore);
            }
        } else {
            if(!isNaN(+d.HappinessScore)) {
                d15[d.Region] = [+d.HappinessScore];
            }
        }
    });
    b.forEach(function(d) {
        if(d16[d.Region]) {
            if(!isNaN(+d.HappinessScore)) {
                d16[d.Region].push(+d.HappinessScore);
            }
        } else {
            if(!isNaN(+d.HappinessScore)) {
                d16[d.Region] = [+d.HappinessScore];
            }
        }
    });
    c.forEach(function(d) {
        if(d17[d.Region]) {
            if(!isNaN(+d.HappinessScore)) {
                d17[d.Region].push(+d.HappinessScore);
            }
        } else {
            if(!isNaN(+d.HappinessScore)) {
                d17[d.Region] = [+d.HappinessScore];
            }
        }
    });
    for(var key in d15) {
        var sum = 0;
        all = d15[key];
        for(var i = 0; i < all.length; i++) {
            sum += all[i];
        }
        sum /= all.length;
        d15[key] = sum;
    }
    for(var key in d16) {
        var sum = 0;
        all = d16[key];
        for(var i = 0; i < all.length; i++) {
            sum += all[i];
        }
        sum /= all.length;
        d16[key] = sum;
    }
    for(var key in d17) {
        var sum = 0;
        all = d17[key];
        for(var i = 0; i < all.length; i++) {
            sum += all[i];
        }
        sum /= all.length;
        d17[key] = sum;
    }

   var dict = {};
   for(var key in d15) {
       dict[key] = [d15[key]];
   }
   for(var key in d16) {
       dict[key].push(d16[key]);
   }
   for(var key in d17) {
       dict[key].push(d17[key]);
   }
   console.log(dict);
}