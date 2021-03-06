/* tslint:disable */
// Fixes for MOAT script incompatibility
let eventMapping = {};
let listeners = [];
let moatapi = {};

// MOAT CODE START
/* Copyright (c) 2011-2016 Moat Inc. All Rights Reserved. */
// @ts-ignore
export function initMoatTracking(a,f,c){if(!1===f.hasOwnProperty("partnerCode"))return!1;var g=document.createElement("script");c=c||a&&("undefined"!==typeof a.O?a.O.parentNode:document.body)||document.body;listeners=[];moatapi={adsManager:a,ids:f,imaSDK:!0,events:[]};eventMapping={complete:"AdVideoComplete",firstquartile:"AdVideoFirstQuartile",impression:"AdImpression",loaded:"AdLoaded",midpoint:"AdVideoMidpoint",pause:"AdPaused",skip:"AdSkipped",start:"AdVideoStart",thirdquartile:"AdVideoThirdQuartile",volumeChange:"AdVolumeChange"};if(google&&google.ima&&a){var d="_moatApi"+Math.floor(1E8*Math.random()),h;for(h in google.ima.AdEvent.Type){var l=function(b){if(moatapi.sendEvent){for(b=listeners.length-1;0<=b;b--)a.removeEventListener(listeners[b].type,listeners[b].func);moatapi.sendEvent(moatapi.events)}else moatapi.events.push({type:eventMapping[b.type]||b.type,adVolume:a.getVolume()})};a.addEventListener(google.ima.AdEvent.Type[h],l);listeners.push({type:google.ima.AdEvent.Type[h],func:l})}}var d= "undefined"!==typeof d?d:"",e,k;try{e=c.ownerDocument,k=e.defaultView||e.parentWindow}catch(m){e=document,k=window}k[d]=moatapi;g.type="text/javascript";c&&c.appendChild(g);g.src="https://z.moatads.com/"+f.partnerCode+"/moatvideo.js#"+d};
// MOAT CODE END
