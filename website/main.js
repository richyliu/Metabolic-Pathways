$(() => {
    // var $panzoom = $('#main').panzoom({
    //     increment: 0.05
    // });
    // $panzoom.on('mousewheel.focal', e => {
    //     e.preventDefault();
    // 
    //     let delta = e.delta || e.originalEvent.wheelDelta;
    //     let zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
    // 
    //     $panzoom.panzoom('zoom', zoomOut, {
    //         animate: false,
    //         focal: e
    //     });
    // });    
});


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


loadImage('img/urea_cycle_arrow.svg', 'urea-cycle-arrow', () => {
    $('text').on('mousedown.http://www.w3.org/2000/svg touchstart', e => {
        console.log(e);
        e.stopImmediatePropagation();
        moreInfo({name: e.target.innerHTML});
    });
});

// $('#main').mousemove(e => {
//     console.log(e.clientX + ', ' + e.clientY);
// });



function moreInfo(opt) {
    const modalId = 'main-modal';
    $(`#${modalId} .modal-title`).html(`${opt.name} ${opt.abbr || ''}`);
    $(`#${modalId} .modal-body`).html(`
        <ul>
            <li>Polartiy: ${opt.polarity || ''}</li>
            <li>pK1(a- COOH)= ${opt.pK1 || ''}</li>
            <li>pK2(a- NH3+)= ${opt.pK2 || ''}</li>
            <li>pK3= ${opt.pK3 || ''}</li>
            <li>pI= ${opt.pI || ''}</li>
        </ul>
    `);
    
    $(`#${modalId}`).modal();
}


let aminoAcids = {
    glycine: {
        name: 'Glycine',
        abbr: '(Gly, G)',
        polarity: 'Hydrophobic (nonpolar)',
        pK1: '2.3',
        pK2: '9.6',
        pK3: 'N/A',
        pI: 6.0
    },
    alanine: {
        name: 'Alanine',
        abbr: '(Ala, A)',
        polarity: 'Hydrophobic (nonpolar)',
        pK1: '2.4',
        pK2: '9.7',
        pK3: 'N/A',
        pI: 6.0
    },
    proline: {
        name: 'Glycine',
        abbr: '(Gly, G)',
        polarity: 'Hydrophobic (nonpolar)',
        pK1: '2.0',
        pK2: '10.6',
        pK3: 'N/A',
        pI: 6.0
    }
};


$('#test').click(e => {
    console.log(e);
    moreInfo(aminoAcids[e.target.innerHTML.toLowerCase()]);
});