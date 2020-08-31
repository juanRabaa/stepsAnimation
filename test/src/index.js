import 'bootstrap/dist/css/bootstrap.min.css';
import { StepAnimation } from './js/stepsAnimation.js'
import './styles/index.scss'
import $ from 'jquery'
const images = require.context('./images/anim', true);

// Cantidad de frames. Se agarran de /images/anim/${index}.png
const framesAmount = 41;
// Cantidad de veces que se repite la animacion
const loopsAmount = 1;
// Si una vez terminado un loop tiene que volver para atras
const backAndForth = true;

// Precargado de assets
const getImageName = (frameNmb) => `./${frameNmb}.png`;
const frames = [];
for (var i = 0; i < framesAmount; i++) {
    const imgElem = new Image()
    imgElem.src = images(getImageName(i + 1)).default;
    frames.push(imgElem);
}

//

function proportionalTravel(travel, start, end, {
    easingCb = null,
} = {}){
    let proportionalTravel = 0
    if(travel <= start)
        proportionalTravel = 0
    else if( travel >= end )
        proportionalTravel = 1
    else {
        let propEnd = end - start
        let propTravel = travel - start
        proportionalTravel = propTravel / propEnd
        proportionalTravel = easingCb ? easingCb(proportionalTravel) : proportionalTravel;
    }
    return proportionalTravel;
}

function easeOut(travel){
    return travel * travel;
}

$(document).ready(function(){

    //=========================================
    //  CAT
    //=========================================
    const img = document.querySelector('#images #cat-img');

    const catAnimationStep = new StepAnimation({
        $elem: $('#images'),
        callback: function(travel){
            // $('#pincel-interactivo .progress-bar.landscape .progress').css('width', `${travel * 100}%`);
            // $('#pincel-interactivo .progress-bar.portrait .progress').css('height', `${travel * 100}%`);
            const loopsCompleted = Math.floor( travel * loopsAmount );
            let c = Math.floor( ( travel * framesAmount * loopsAmount ) - (framesAmount * loopsCompleted) );
            c = backAndForth && (loopsCompleted % 2 != 0) ? (framesAmount - 1) - c : c;

            // console.log(c, travel.toFixed(1), loopsCompleted);
            if(frames[c])
                img.src = frames[c].src
        },
    });

    //=========================================
    //  TEXTS
    //=========================================

    const firstTextStep = new StepAnimation({
        $elem: $('#text-demo'),
        callback: function(travel){

            // First text
            const p1Travel = proportionalTravel(travel, 0, 0.3, {
                easingCb: easeOut,
            });
            const p1InitialLeft = -$('#text-demo .texts div:nth-child(1) p').width();
            const p1FinalLeft = window.innerWidth / 5 + (-p1InitialLeft);
            const p1CurrentLeft = p1InitialLeft + (p1FinalLeft * p1Travel);
            $('#text-demo .texts div:nth-child(1) p').css({
                left: `${p1CurrentLeft}px`
            })

            //second
            const p2Travel = proportionalTravel(travel, 0.2, 0.4);
            const p2InitialLeft = -$('#text-demo .texts div:nth-child(2) p').width();
            const p2FinalLeft = window.innerWidth / 5 + (-p2InitialLeft);
            const p2CurrentLeft = p2InitialLeft + (p2FinalLeft * p2Travel);
            $('#text-demo .texts div:nth-child(2) p').css({
                left: `${p2CurrentLeft}px`
            })

            //third
            const p3Travel = proportionalTravel(travel, 0.3, 0.6);
            const p3InitialLeft = -$('#text-demo .texts div:nth-child(3) p').width();
            const p3FinalLeft = window.innerWidth / 5 + (-p3InitialLeft);
            const p3CurrentLeft = p3InitialLeft + (p3FinalLeft * p3Travel);
            $('#text-demo .texts div:nth-child(3) p').css({
                left: `${p3CurrentLeft}px`
            })

            //forth
            const p4Travel = proportionalTravel(travel, 0.6, 1);
            $('#text-demo .texts div:nth-child(4) p').css('transform', `scale(${1 * p4Travel})`)
            const rgb = 255 * p4Travel;
            const reverseRGB = 255 - rgb;
            $('body').css('background-color', `rgb(${reverseRGB},${reverseRGB},${reverseRGB})`);
            $('#text-demo .texts p').css('color', `rgb(${rgb},${rgb},${rgb})`);
        },
    });
/**
    const secondTextStep = new StepAnimation({
        $elem: $('#second-text-step'),
        callback: function(travel){
            const initialLeft = -$('#text-demo .texts div:nth-child(2) p').width();
            const finalLeft = window.innerWidth / 5 + (-initialLeft);
            const currentLeft = initialLeft + (finalLeft * travel);
            $('#text-demo .texts div:nth-child(2) p').css({
                left: `${currentLeft}px`
            })
        },
    });

    const thirdTextStep = new StepAnimation({
        $elem: $('#third-text-step'),
        callback: function(travel){
            const initialLeft = -$('#text-demo .texts div:nth-child(3) p').width();
            const finalLeft = window.innerWidth / 5 + (-initialLeft);
            const currentLeft = initialLeft + (finalLeft * travel);
            $('#text-demo .texts div:nth-child(3) p').css({
                left: `${currentLeft}px`
            })
        },
    });

    const forthTextStep = new StepAnimation({
        $elem: $('#forth-text-step'),
        callback: function(travel){
            $('#text-demo .texts div:nth-child(4) p').css('transform', `scale(${1 * travel})`)
            const rgb = 255 * travel;
            const reverseRGB = 255 - rgb;
            console.log(travel);
            $('body').css('background-color', `rgb(${reverseRGB},${reverseRGB},${reverseRGB})`);
            $('#text-demo .texts p').css('color', `rgb(${rgb},${rgb},${rgb})`);
        },
    });
*/

    //=========================================
    //  STAR WARS
    //=========================================

    const starwarsStep = new StepAnimation({
        $elem: $('#starwars'),
        startOnView: true,
        callback: function(travel){
            const d1Travel = proportionalTravel(travel, 0.2, 0.25, {
                easingCb: easeOut,
            });
            const d2Travel = proportionalTravel(travel, 0.5, 0.55, {
                easingCb: easeOut,
            });
            const d3Travel = proportionalTravel(travel, 0.7, 0.75, {
                easingCb: easeOut,
            });

            // First ship
            $('#starwars .destroyers img:nth-child(1)').css('transform', `scale(${1 * d1Travel})`)
            // Second ship
            $('#starwars .destroyers img:nth-child(2)').css('transform', `scale(${1 * d2Travel})`)
            // Third ship
            $('#starwars .destroyers img:nth-child(3)').css('transform', `scale(${1 * d3Travel})`)
            // Falcon
            $('#starwars .falcon img').css('bottom', `${4 + (2 * travel) }rem`)
        },
    });

    //=========================================
    //  METEORITE
    //=========================================

    const meteoriteStep = new StepAnimation({
        $elem: $('#meteorites'),
        startOnView: true,
        callback: function(travel){
            $('.meteorites .meteorite').each(function(){
                const velY = $(this).data('vel-y');
                const velX = $(this).data('vel-x');
                const finalPosX = velX * window.innerWidth;
                const finalPosY = velY * window.innerHeight;
                $(this).css({
                    top: `${travel * finalPosY}px`,
                    right: `${travel * finalPosX}px`,
                });
            })
        },
    });    


});
