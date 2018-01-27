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
            <li><img src="img/amino_acids/${opt.abbr.slice(1,4).toLowerCase()}.png" class="chemical-img"></li>
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
                Chartist.plugins.ctPointLabels({
                    // labelInterpolationFnc: (value) => {
                    //     console.log(value);
                    //     return value
                    // }
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



// new Chartist.Line('.example ',
//     {
//         labels: ['M', 'T', 'W', 'Th', 'F'],
//         series: [[1, 2, 6, 4, 3]]
//     }, {
//         width: '600px',
//         height: '400px',
//         plugins: [
//             Chartist.plugins.ctPointLabels()
//         ]
//     }
// );