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
            <li><img src="${opt.titrationCurve}"></img></li>
        </ul>
    `);
    
    $(`#${modalId}`).modal();
}


$.get('js/data.json', aminoAcids => {
    $('#test').click(e => {
        moreInfo(aminoAcids[e.target.innerHTML.toLowerCase()]);
    });
});
