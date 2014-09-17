/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function randomInt(a,b){
    return Math.floor(Math.random() * b + a);
}

function roundTo(a, d){
    return Math.round(a * Math.pow(10, d)) / Math.pow(10, d);
}
