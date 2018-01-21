/* global $ Bezier Chartist */

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
            <li class="polarity-label">Polartiy: ${opt.polarity || ''}</li>
            <li class="pK-label">pK<sub>1</sub>${opt.pK1 || ''}</li>
            <li class="pK-label">pK<sub>2</sub>${opt.pK2 || ''}</li>
            <li class="pK-label">pK<sub>3</sub>= ${opt.pK3 || ''}</li>
            <li class="pK-label">pI= ${opt.pI || ''}</li>
            <li>Chemical formula: <span class="chemical-formula">${opt.formula}</span></li>
            <li><img src="img/amino_acids/${opt.name.toLowerCase()}.svg" class="chemical-img"></li>
            <li><div class="ct-chart ct-perfect-fourth" style="width: 400px; height: 400px;"></div></li>
        </ul>
    `);
    
    new Chartist.Line('.ct-chart',
        {
            series: opt.titrationCurve
        }, {
            axisX: {
                type: Chartist.AutoScaleAxis,
                high: 14,
                low: 0,
                onlyInteger: true
            },
            axisY: {
                high: 3,
                low: 0,
                scaleMinSpace: 40    
            },
            showPoint: true,
            width: '400px',
            height: '400px',
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
    
    // moreInfo(aminoAcids.asparagine);
});


/*
let bez = new Bezier(
    0, 0,
    3.7, 0,
    2.3, 1,
    4.5, 1 
);
let bez2 = new Bezier(
    8,1,
    9.8,1,
    8.9,2,
    11,2
);
// let bez3 = new Bezier(
//     9.1,2,
//     10.2,2,
//     10.2,3,
//     12,3
// );
let labels = [
    {"x":2.8,"y":0.5},
    {"x":5.9,"y":1},
    {"x":9.4,"y":1.5}
];


let points = [];
let curPoints = [];

points.push(...bez.getLUT(100).splice(0));

for (let i = 4.5; i < 8; i+=0.1) {
    curPoints.push({x: i, y: 1});
}
points.push(...curPoints);

points.push(...(bez2.getLUT(100)).splice(0));

// points.push(...(bez3.getLUT(100)).splice(0));


let allPoints  = [[], labels];
// remove y values below 0
for (let i = 0;i < points.length; i++) {
    if (points[i].y >= 0) {
        points.splice(0, i);
        break;
    }
}
// round to 4 decimal places
for (let i = 0; i < points.length; i++) {
    allPoints[0].push({x: Math.round(points[i].x*10000)/10000, y: Math.round(points[i].y*10000)/10000});
}


console.log(JSON.stringify(allPoints));

new Chartist.Line('.example ',
    {
        series: allPoints
    }, {
        axisX: {
            type: Chartist.AutoScaleAxis,
            high: 14,
            low: 0,
            onlyInteger: true
        },
        axisY: {
            high: 3,
            low: 0,
            scaleMinSpace: 40    
        },
        showPoint: true,
        width: '400px',
        height: '400px',
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
*/
