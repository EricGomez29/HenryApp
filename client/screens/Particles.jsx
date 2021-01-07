import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import Particles from 'react-particles-js';

export default function Particless() {

    return (
            <Particles
                params={{
                    "particles": {
                        "number": {
                            "value": 95,
                            "density": {
                                "enable": true,
                                "value_area": 500
                            }
                        },
                        "color": {
                            "value": "#ffffff"
                        },
                        "shape": {
                            "type": "star",
                            "stroke": {
                                "width": 0,
                                "color": "#000000"
                            },
                            "polygon": {
                                "nb_sides": 5
                            },
                            "image": {
                                "src": "img/github.svg",
                                "width": 100,
                                "height": '100%'
                            }
                        },
                        "opacity": {
                            "value": 0.5129459670609773,
                            "random": false,
                            "anim": {
                                "enable": true,
                                "speed": 1.7865698670629593,
                                "opacity_min": 0.056845404861094156,
                                "sync": false
                            }
                        },
                        "size": {
                            "value": 1.9,
                            "random": false,
                            "anim": {
                                "enable": true,
                                "speed": 31.67101127975246,
                                "size_min": 4.060386061506725,
                                "sync": false
                            }
                        },
                        "line_linked": {
                            "enable": false,
                            "distance": 32.06824121731046,
                            "color": "#ffffff",
                            "opacity": 0.4,
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 0.5,
                            "direction": "none",
                            "random": false,
                            "straight": false,
                            "out_mode": "out",
                            "bounce": false,
                            "attract": {
                                "enable": false,
                                "rotateX": 600,
                                "rotateY": 1200
                            }
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "grab"
                            },
                            "onclick": {
                                "enable": true,
                                "mode": "push"
                            },
                            "resize": true
                        },
                        "modes": {
                            "grab": {
                                "distance": 85.26810729164123,
                                "line_linked": {
                                "opacity": 1
                                }
                            },
                            "bubble": {
                                "distance": 400,
                                "size": 40,
                                "duration": 2,
                                "opacity": 8,
                                "speed": 3
                            },
                            "repulse": {
                                "distance": 56.84540486109416,
                                "duration": 0.4
                            },
                            "push": {
                                "particles_nb": 4
                            },
                            "remove": {
                                "particles_nb": 2
                            }
                        }
                    },
                    "retina_detect": true,
                }}
                style={{
                    height: '-webkit-fill-available',
                    width: '100%',
                    objectFit: 'cover'
                }}
            />
    )
}

