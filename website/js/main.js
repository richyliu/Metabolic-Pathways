/**
 * Loads svg image onto an element on the page
 * @param  {String}   source   url
 * @param  {String}   id       which element to load to
 * @param  {Function} callback runs after image is loaded
 */
function loadImage(source, id, callback) {
    $.ajax({
        url: source,
        dataType: 'text',
        success: data => {
            $('#' + id).html(data);
            callback();
        }
    });
}


// loads image
loadImage('img/urea_cycle_arrow.svg', 'urea-cycle-arrow', () => {
    // init panzoom
    const pz = $('#main').panzoom({
        increment: 0.05
    }).on('mousewheel.focal', e => {
        // prevents normal scrolling
        e.preventDefault();
        
        // get focal point to zoom into
        let delta = e.delta || e.originalEvent.wheelDelta;
        let zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
    
        pz.panzoom('zoom', zoomOut, {
            animate: false,
            focal: e
        });
    });
    
    // opens more info on click
    $('#main text').on('click touchstart', e => {
        moreInfo({name: e.target.innerHTML});
    });
    
});

// $('#main').mousemove(e => {
//     console.log(e.clientX + ', ' + e.clientY);
// });


/**
 * Shows more info about the amino acid
 * @param  {Object} opt Contains dictionary with info
 */
function moreInfo(opt) {
    const modalId = 'main-modal';
    $(`#${modalId} .modal-title`).html(`${opt.name} ${opt.abbr || ''}`);
    $(`#${modalId} .modal-body`).html(`
        <ul>
            <li>Polartiy: ${opt.polarity || ''}</li>
            <li>pK<sub>1</sub>${opt.pK1 || ''}</li>
            <li>pK<sub>2</sub>${opt.pK2 || ''}</li>
            <li>pK<sub>3</sub>= ${opt.pK3 || ''}</li>
            <li>pI= ${opt.pI || ''}</li>
            <li><div class="ct-chart ct-perfect-fourth" style="width: 400px; height: 500px;"></div></li>
        </ul>
    `);
    
    new Chartist.Line('.ct-chart',
        {
            series: opt.titrationCurve
        }, {
            axisX: {
                type: Chartist.AutoScaleAxis,
                high: 12,
                low: 0,
                onlyInteger: true
            },
            axisY: {
                high: 2,
                low: 0,
                scaleMinSpace: 40    
            },
            showPoint: true,
            width: '400px',
            height: '500px',
            plugins: [
                // TODO: labels dont work
                Chartist.plugins.ctPointLabels({
                    textAnchor: 'middle',
                    labelClass: 'ct-label',
                    labelOffset: {
                        x: 0,
                        y: -10
                    }
                }),
                Chartist.plugins.ctAxisTitle({
                    axisX: {
                        axisTitle: 'Ph',
                        axisClass: 'ct-axis-title',
                        offset: {
                            x: 0,
                            y: 30
                        },
                        textAnchor: 'middle'
                    },
                    axisY: {
                        axisTitle: '3-n',
                        axisClass: 'ct-axis-title',
                        offset: {
                            x: 0,
                            y: -1
                        },
                        flipTitle: false
                    }
                })
            ]
        }
    );
    
    $(`#${modalId}`).modal();
}


$.get('js/data.json', aminoAcids => {
    $('#test').click(e => {
        moreInfo(aminoAcids[e.target.innerHTML.toLowerCase()]);
    });
    
    
    moreInfo(aminoAcids.alanine);
});



let bez = new Bezier(
    -2, -0.25,
    3.5, -0.25,
    1.2, 1,
    4, 1
);
let bez2 = new Bezier(
    7,1,
    10,1,
    7.9,2,
    12,2
);
let labels = [
    {x: 2.2, y: 0.5},
    {x: 5.7, y: 1},
    {x: 9.1, y: 1.5}
];


let points = bez.getLUT(100);

let newpoints = [];
// points from (4,1) to (8,1)
for (let i = 4; i < 7; i+=0.1) {
    newpoints.push({x: i, y: 1});
}

points = points.concat(newpoints);

let newpoints2 = [];

points = points.concat(bez2.getLUT(100));

let allpoints  = [[], labels];
for (let i = 0;i < points.length; i++) {
    if (points[i].y < 0)
        points[i] = {};
    else {
        points[i].x = Math.round(points[i].x*10000)/10000;
        points[i].y = Math.round(points[i].y*10000)/10000;
        allpoints[0].push(points[i]);
    }
}

console.log(JSON.stringify(allpoints));

new Chartist.Line('.example ',
    {
        series: allpoints
    }, {
        axisX: {
            type: Chartist.AutoScaleAxis
        },
        high: 2,
        low: 0,
        showPoint: true,
        width: '500px',
        height: '500px',
        
    }
);