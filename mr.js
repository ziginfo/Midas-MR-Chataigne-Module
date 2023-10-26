//  initial functions

/*  
function update(deltaTime) {
	var now = util.getTime();
	if(now > TSSendAlive) {
		TSSendAlive = now + 5;
		keepAlive();
	}
}


function keepAlive() {
	local.send("/xinfo");
}

function oscEvent(address, args) { 
// names
if (address!= 0){ 
local.values.infos.info1.set(address); 
local.values.infos.info2.set(args[0]);
local.values.infos.info3.set(args[1]);}
if (address=="/ch/01/config/name"){ 
local.values.infos.info2.set("name2"); }
if (address=="/ch/02/config/name"){ 
local.values.infos.info3.set("name3"); }
}
*/



//  Chan Config

function config_name(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/config/name", val); 
}


function config_color(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/config/color", val);
}

function channel_source(targetNumber, val) {
	
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } 
	local.send("/ch/"+targetNumber+"/config/insrc", val);
}



//  Channel Actions

function ch_automix_group(targetNumber, val) {
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } 
	local.send("/ch/"+targetNumber+"/automix/group", val);
}

function ch_automix_gain(targetNumber, val) {
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } 
	
	local.send("/ch/"+targetNumber+"/automix/weight", val);
}



//  Preamp

function preamp_gain(targetType, targetNumber, val) {
	
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/headamp/"+targetNumber+"/gain", val);
}

function auxin_trim(targetType, targetNumber, val) {
	
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/rtn/aux/preamp /rtntrim", val);
}

function preamp_invert(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/preamp/invert", val);
}

//  Channel


function mix_fader(targetType, targetNumber, val) {
	
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }	
	if (targetType == "dca"){local.send("/"+targetType+"/"+targetNumber+"/fader", val);} else
	{if (targetType == "rtn/aux")
	{local.send("/"+targetType+"/mix/fader", val);} else
	{local.send("/"+targetType+"/"+targetNumber+"/mix/fader", val);}}
}


function mix_on(targetType, targetNumber, val) {
	val=1-val ;
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }	
	if (targetType == "dca"){local.send("/"+targetType+"/"+targetNumber+"/on", val);} else
	{if (targetType == "rtn/aux")
	{local.send("/"+targetType+"/mix/on", val); } else
	{local.send("/"+targetType+"/"+targetNumber+"/mix/on", val);}}
}


function mix_st(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }	
	{if (targetType == "rtn/aux")
	{local.send("/"+targetType+"/mix/lr", val);} else
	{local.send("/"+targetType+"/"+targetNumber+"/mix/lr", val);}}
	
}

function mix_pan(targetType, targetNumber, val) {
	
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }	
	{if (targetType == "rtn/aux")
	{local.send("/"+targetType+"/mix/pan", val);} else
	{local.send("/"+targetType+"/"+targetNumber+"/mix/pan", val);} }
}

function ch_solo(targetNumber, val) {
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } 	
	local.send("/-stat/solosw/"+targetNumber, val);
}


function mix_send_level(targetType, targetNumber, mix, val) {
	
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	if (mix < 10) {mix = "0"+mix; } 
	{if (targetType == "rtn/aux")
	{local.send("/"+targetType+"/mix/"+mix+"/level", val);} else
	{local.send("/"+targetType+"/"+targetNumber+"/mix/"+mix+"/level", val); } }
}



//  Gate
function gate_on(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/gate/on", val);
}

function gate_mode(targetType, targetNumber, val) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/gate/mode", val);
}

function gate_thr(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	
	local.send("/"+targetType+"/"+targetNumber+"/gate/thr", val);
}

function gate_range(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	
	local.send("/"+targetType+"/"+targetNumber+"/gate/range", val);
}

function gate_attack(targetType, targetNumber, val) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	
	local.send("/"+targetType+"/"+targetNumber+"/gate/attack", val);
}

function gate_hold(targetType, targetNumber, val) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/gate/hold", val);
}

function gate_release(targetType, targetNumber, val) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/gate/release", val);
}

function gate_keysrc(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/gate/keysrc", val);
}

function gate_filter_on(targetType, targetNumber, val) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/gate/filter/on", val);
}

function gate_filter_type(targetType, targetNumber, val) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/gate/filter/type", val);
}

function gate_filter_f(targetType, targetNumber, val) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/gate/filter/f", val);
}

function gate_keysrc(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/gate/keysrc", val);
}


//  Compressor

function ch_comp_full(targetType, targetNumber, val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11, val12, val13 ) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/dyn/on", val1);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/mode", val2);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/det", val3);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/env", val4);	
	local.send("/"+targetType+"/"+targetNumber+"/dyn/thr", val5);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/ratio", val6);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/knee", val7);	
	local.send("/"+targetType+"/"+targetNumber+"/dyn/mgain", val8);	
	local.send("/"+targetType+"/"+targetNumber+"/dyn/attack", val9);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/hold", val10);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/release", val11);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/mix", val12);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/auto", val13);
}

function comp_reset(targetType, targetNumber, val) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/dyn/keysrc", val);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/on", 0);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/mode", 0);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/det", 0);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/env", 1);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/thr", 1.0);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/ratio", 0);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/knee", 1);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/attack", 0.085);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/hold", 0.545);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/release", 0.51);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/mix", 1.0);
	local.send("/"+targetType+"/"+targetNumber+"/dyn/auto", 0);
}


function dyn_on(targetType, targetNumber, val) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/dyn/on", val);
}

function dyn_mode(targetType, targetNumber, val) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/dyn/mode", val);
}

function dyn_det(targetType, targetNumber, val) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/dyn/det", val);
}

function dyn_env(targetType, targetNumber, val) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/dyn/env", val);
}

function dyn_thr(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	
	local.send("/"+targetType+"/"+targetNumber+"/dyn/thr", val);
}

function dyn_ratio(targetType, targetNumber, val) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/dyn/ratio", val);
}

function dyn_knee(targetType, targetNumber, val) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/dyn/knee", val);
}

function dyn_mgain(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	
	local.send("/"+targetType+"/"+targetNumber+"/dyn/mgain", val);
}

function dyn_attack(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	
	local.send("/"+targetType+"/"+targetNumber+"/dyn/attack", val);
}

function dyn_hold(targetType, targetNumber, val) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/dyn/hold", val);
}

function dyn_release(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/dyn/release", val);
}

function dyn_pos(targetType, targetNumber, val) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/dyn/pos", val);
}

function dyn_keysrc(targetType, targetNumber, val) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/dyn/keysrc", val);
}

function dyn_mix(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	
	local.send("/"+targetType+"/"+targetNumber+"/dyn/mix", val);
}

function dyn_auto(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/dyn/auto", val);
}

function dyn_filter_on(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/dyn/filter/on", val);
}

function dyn_filter_type(targetType, targetNumber, val) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/dyn/filter/type", val);
}

function dyn_filter_f(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/dyn/filter/f", val);
}

function comp_keysrc(targetType, targetNumber, val) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/dyn/keysrc", val);
}



//  Insert

function insert_on(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/insert/on", val);
}

function insert_pos(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/insert/pos", val);
}

function insert_sel(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/insert/fxslot", val);
}




//  EQ

function full_ch_eq (targetType, targetNumber, val, val1, band, val2, val3, val4, val5) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	
	val4=1-val4 ;
	local.send("/"+targetType+"/"+targetNumber+"/eq/on", val1);
	local.send("/"+targetType+"/"+targetNumber+"/eq/"+band+"/g", val2);
	local.send("/"+targetType+"/"+targetNumber+"/eq/"+band+"/f", val3);
	local.send("/"+targetType+"/"+targetNumber+"/eq/"+band+"/q", val4);
	local.send("/"+targetType+"/"+targetNumber+"/eq/"+band+"/type", val5);
}


function ch_eq_reset(targetType, targetNumber) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/eq/1/g", 0.5);
	local.send("/"+targetType+"/"+targetNumber+"/eq/2/g", 0.5);
	local.send("/"+targetType+"/"+targetNumber+"/eq/3/g", 0.5);
	local.send("/"+targetType+"/"+targetNumber+"/eq/4/g", 0.5);
	local.send("/"+targetType+"/"+targetNumber+"/eq/5/g", 0.5);
	local.send("/"+targetType+"/"+targetNumber+"/eq/6/g", 0.5);
	local.send("/"+targetType+"/"+targetNumber+"/eq/1/f", 0.2);
	local.send("/"+targetType+"/"+targetNumber+"/eq/2/f", 0.4);
	local.send("/"+targetType+"/"+targetNumber+"/eq/3/f", 0.5);
	local.send("/"+targetType+"/"+targetNumber+"/eq/4/f", 0.8);
	local.send("/"+targetType+"/"+targetNumber+"/eq/5/f", 0.85);
	local.send("/"+targetType+"/"+targetNumber+"/eq/6/f", 0.9);
}

function eq_on(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/eq/on", val);
}

function eq_type(targetType, targetNumber, band, val) { 
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; }
	local.send("/"+targetType+"/"+targetNumber+"/eq/"+band+"/type", val);
}

function eq_f(targetType, targetNumber, band, val) { 
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/eq/"+band+"/f", val);
}

function eq_g(targetType, targetNumber, band, val) { 
	Val = 1-val ;
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/eq/"+band+"/g", val);
}

function eq_q(targetType, targetNumber, band, val) {
	val = 1-val ;  
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/eq/"+band+"/q", val);
}

// Hi-Pass

function hipass (targetType, targetNumber, val1, val2) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/preamp/hpon", val1);
	local.send("/"+targetType+"/"+targetNumber+"/preamp/hpf", val2);
}

function preamp_hpon(targetType, targetNumber, val) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/preamp/hpon", val);
}


function preamp_hpf(targetType, targetNumber, val) {
	
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/"+targetType+"/"+targetNumber+"/preamp/hpf", val);
}


//  LR-Channel
function lr_fader(targetType, val) { 
	
	local.send("/"+targetType+"/mix/fader", val);
}

function lr_on(targetType, val) {
	val=1-val;
	local.send("/"+targetType+"/mix/on", val);
}

function lr_pan(targetType,val) {

	local.send("/"+targetType+"/mix/pan", val);
}

function lr_eq (val1,targetType,  val, band, val2, val3, val4, val5) {
	
	val4=1-val4 ;
	local.send("/"+targetType+"/eq/on", val1);
	local.send("/"+targetType+"/eq/"+band+"/g", val2);
	local.send("/"+targetType+"/eq/"+band+"/f", val3);
	local.send("/"+targetType+"/eq/"+band+"/q", val4);
	local.send("/"+targetType+"/eq/"+band+"/type", val5);
}

function lr_eq_reset(targetType, targetNumber) {
	if (targetType == "ch"){
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } }
	local.send("/lr/eq/1/g", 0.5);
	local.send("/lr/eq/2/g", 0.5);
	local.send("/lr/eq/3/g", 0.5);
	local.send("/lr/eq/4/g", 0.5);
	local.send("/lr/eq/5/g", 0.5);
	local.send("/lr/eq/6/g", 0.5);
	local.send("/lr/eq/1/f", 0.2);
	local.send("/lr/eq/2/f", 0.4);
	local.send("/lr/eq/3/f", 0.5);
	local.send("/lr/eq/4/f", 0.8);
	local.send("/lr/eq/5/f", 0.85);
	local.send("/lr/eq/6/f", 0.9);
}

function lr_eq_on(targetType, val) {
	local.send("/"+targetType+"/eq/on", val);
}

function lr_comp(val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11, val12, val13 ) {
	local.send("/lr/dyn/on", val1);
	local.send("/lr/dyn/mode", val2);
	local.send("/lr/dyn/det", val3);
	local.send("/lr/dyn/env", val4);
	
	local.send("/lr/dyn/thr", val5);
	local.send("/lr/dyn/ratio", val6);
	local.send("/lr/dyn/knee", val7);
	
	local.send("/lr/dyn/mgain", val8);
	
	local.send("/lr/dyn/attack", val9);
	local.send("/lr/dyn/hold", val10);
	local.send("/lr/dyn/release", val11);
	
	local.send("/lr/dyn/mix", val12);
	local.send("/lr/dyn/auto", val13);
	
}

function lr_comp_reset() {
	local.send("/lr/dyn/on", 0);
	local.send("/lr/dyn/mode", 0);
	local.send("/lr/dyn/det", 0);
	local.send("/lr/dyn/env", 1);
	local.send("/lr/dyn/thr", 1.0);
	local.send("/lr/dyn/ratio", 0);
	local.send("/lr/dyn/knee", 1);
	local.send("/lr/dyn/mgain", 0.0);
	local.send("/lr/dyn/attack", 0.085);
	local.send("/lr/dyn/hold", 0.545);
	local.send("/lr/dyn/release", 0.51);
	local.send("/lr/dyn/mix", 1.0);
	local.send("/lr/dyn/auto", 0);
	
}

function lr_eq_f(targetType, band, val) { 
	local.send("/"+targetType+"/eq/"+band+"/f", val);
}

function lr_eq_g(targetType, band, val) {
	 
	local.send("/"+targetType+"/eq/"+band+"/g", val);
}

function lr_eq_q(targetType, band, val) {
	val=1-val ;
	local.send("/"+targetType+"/eq/"+band+"/q", val);
}

function lr_eq_type(targetType, band, val) { 
	local.send("/"+targetType+"/eq/"+band+"/type", val);
}



function lr_dyn_filter_on(targetType, val) {	
	local.send("/"+targetType+"/dyn/filter/on", val);
}

function lr_dyn_filter_type(targetType, val) { 	
	local.send("/"+targetType+"/dyn/filter/type", val);
}

function lr_dyn_filter_f(targetType, val) {
	local.send("/"+targetType+"/dyn/filter/f", val);
}

function lr_comp_keysrc(targetType, val) { 
	local.send("/"+targetType+"/dyn/keysrc", val);
}



//Player



function player_actions (val) {
	local.send("/-stat/tape/state", val);
}

function player_next (val) {
	local.send("/-prefs/playnext", val);
}

function player_mode (val) {
	local.send("/-prefs/usbifcmode", val);
}

//Divers

function Snap_load (val) {
	local.send("/-snap/load", val);
}

function Snap_save (val) {
	local.send("/-snap/save", val);
}

function mute_group (group, val) {
	local.send("/config/mute/"+group+"", val);
}

function solo_level (target, val) { 
	
	local.send("/config/"+target+"/level", val);

}




