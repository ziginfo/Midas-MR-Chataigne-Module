// ========================== VARS ===========================
var myParameters = {};
var UseMeters;
var UpdateAll;
var SelChanParams;
var ShowInfos;
var ShowNames;
var push ;
var tar;
var no ;
var link ;
var trig ;
var meters1 = [
	"Chan1", "Chan2", "Chan3", "Chan4", "Chan5", "Chan6", "Chan7", "Chan8", "Chan9", "Chan10", "Chan11", "Chan12", "Chan13", "Chan14", "Chan15", "Chan16", 
	"Aux1", "Bus1", "Bus2", "Bus3", "Bus4", "Bus5", "Bus6", "FxSnd1", "FxSnd2", "FxSnd3", "FxSnd4", 
	"ST-L", "ST-R", "Mon1", "Mon2" ];
var selChann = {
	"name"	:	["Label", "s", "label"],
	"mix" : ["Fader", "s","fader"],
	"pan" : ["Pan", "s","pan"],
	"invert" : ["Invert", "b","invert"],
	"mute" : ["Mute", "b","mute"],
	"hpf.on" : ["LoCut on", "b","loCutOn"],
	"eq.hpf.freq" : ["LoCut Freq", "s","loCutFreq"],
	"eq.on" : ["Eq on", "b","eqOn"],
	"eq.b1.type" : ["Type Eq 1", "s", "typeEq1"],
	"eq.b1.gain" : ["Gain Eq 1", "s", "gainEq1"],
	"eq.b1.freq" : ["Freq Eq 1", "s", "freqEq1"],	
	"eq.b1.q" : ["Q Eq 1", "s", "qEq1"],
	"eq.b2.type" : ["Type Eq 2", "s", "typeEq2"],
	"eq.b2.gain" : ["Gain Eq 2", "s", "gainEq2"],
	"eq.b2.freq" : ["Freq Eq 2", "s", "freqEq2"],	
	"eq.b2.q" : ["Q Eq 2", "s", "qEq2"],
	"eq.b3.type" : ["Type Eq 3", "s", "typeEq3"],
	"eq.b3.gain" : ["Gain Eq 3", "s", "gainEq3"],
	"eq.b3.freq" : ["Freq Eq 3", "s","freqEq3"],
	"eq.b3.q" : ["Q Eq 3", "s", "qEq3"],
	"eq.b4.type" : ["Type Eq 4", "s", "typeEq4"],
	"eq.b4.gain" : ["Gain Eq 4", "s", "gainEq4"],
	"eq.b4.freq" : ["Freq Eq 4", "s", "freqEq4"],
	"eq.b4.q" : ["Q Eq 4", "s", "qEq4"],
	"eq.b5.type" : ["Type Eq 5", "s", "typeEq5"],
	"eq.b5.gain" : ["Gain Eq 5", "s", "gainEq5"],
	"eq.b5.freq" : ["Freq Eq 5", "s", "freqEq5"],
	"eq.b5.q" : ["Q Eq 5", "s", "qEq5"],
	"eq.b6.type" : ["Type Eq 6", "s", "typeEq6"],
	"eq.b6.gain" : ["Gain Eq 6", "s", "gainEq6"],
	"eq.b6.freq" : ["Freq Eq 6", "s", "freqEq6"],
	"eq.b6.q" : ["Q Eq 6", "s", "qEq6"],
	"dyn.on" : ["Dyn on", "b", "dynOn"],	
	"dyn.ratio" : ["Dyn Ratio", "s", "dynRatio"],
	"dyn.threshold" : ["Dyn Threshold", "s", "dynThreshold"],
	"dyn.outgain" : ["Dyn OutGain", "s", "dynOutGain"],
	"gate.on" : ["Gate on", "b", "gateOn"] };	
	
// These messages can be displayed in the Info-Tab !!
var message = [
	"Message1" , "Message2", "Informations","Other Infos", "Change and Send Values here !" ];

//===================== INITIAL FUNCTIONS ===========================

//  initial functions
function init() {

// Insert Parameters ...
	SelChanParams = local.parameters.addBoolParameter("Add Sel Chan Parameters", "", false);
	ShowNames = local.parameters.addBoolParameter("Show Names", "Show Names", false);
	ShowInfos = local.parameters.addBoolParameter("Show Infos", "Show Infos Values", false);
	Advice = local.parameters.addStringParameter("After Changing above", "Alert","You must reload the session");
	RequestInfo = local.values.addStringParameter("Request Action","Request Action", "Request all the Values from the Console !!");
	UpdateAll = local.values.addTrigger("Click to Sync all", "Request all the Values from the Console !!" , false);
	SendInfo = local.values.channels.addStringParameter("Channel Info", "Info","Change and Send Values here!");
	Sending = local.values.channels.addTrigger("Click to send Updates", "Send Updated Values to the Console" , false);
	Alert = local.values.channels.addStringParameter("Advice", "Alert","Be careful with this feature !!");
	
// insert containers...	
	var infCont = ShowInfos.get();
		if (infCont == true){
	infos=local.values.addContainer("Infos");
		infos.setCollapsed(true);	
		for (var i = 1; i<=16; i++) {
		infos.addStringParameter("Info "+(i), "","");} }
		
	var infNames = ShowNames.get();
		if (infNames == true){	
	names=local.values.addContainer("Names");
		names.setCollapsed(true);	
		for (var i = 1; i<=16; i++) {
		names.addStringParameter("Track "+(i), "",""); }		
		names.addStringParameter("Aux USB", "","");
		for (var i = 1; i<=4; i++) {
		names.addStringParameter("FX Return "+(i), "","");}
		for (var i = 1; i<=6; i++) {
		names.addStringParameter("Bus "+(i), "","");}
		names.addStringParameter("Main LR", "",""); }
		
	faders = local.values.faders.addContainer("Channel Faders");
		faders.setCollapsed(true);
		for (var i = 1; i<=16; i++) {
		faders.addFloatParameter("Fader "+(i), "", 0, 0, 1); }
		faders.addFloatParameter("Aux USB", "", 0, 0, 1);
		for (var i = 1; i<=4; i++) {
		faders.addFloatParameter("FX Return "+(i), "", 0, 0, 1);}
		
	faders = local.values.faders.addContainer("Bus DCA Faders");
		faders.setCollapsed(true);
		for (var i = 1; i<=6; i++) {
		faders.addFloatParameter("Bus "+(i), "", 0, 0, 1);}
		faders.addFloatParameter("Main LR", "", 0, 0, 1);
		for (var i = 1; i<=4; i++) {
		faders.addFloatParameter("DCA "+(i), "", 0, 0, 1);}
//Channel Strips		
		for (var i = 1; i<=16; i++) {
	strips = local.values.channels.addContainer("Channel"+(i));
		var chan = local.values.channels.addContainer("Channel"+(i));
		chan.addStringParameter("Name", "","");
		chan.addFloatParameter("Fader", "", 0);
		chan.addFloatParameter("Pan","", 0 , -50, 50);
		chan.addBoolParameter("Mute", "", false);
		chan.addBoolParameter("EQ", "", false);
		chan.addBoolParameter("LoCut", "", false);
		chan.addBoolParameter("Dyn", "", false);
		chan.addBoolParameter("Gate", "", false);
		chan.setCollapsed(true);}
		
	strips = local.values.channels.addContainer("Main LR");
		var chan = local.values.channels.addContainer("Main LR");
		chan.addStringParameter("Name", "","");
		chan.addFloatParameter("Fader", "", 0);
		chan.addFloatParameter("Pan","", 0, -50, 50);
		chan.addBoolParameter("Mute", "", false);
		chan.addBoolParameter("EQ", "", false);
		chan.addBoolParameter("Dyn", "", false);
		chan.setCollapsed(true);
		
		for (var i = 1; i<=6; i++) {
	strips = local.values.channels.addContainer("Bus"+(i));
		var chan = local.values.channels.addContainer("Bus"+(i));
		chan.addStringParameter("Name", "","");
		chan.addFloatParameter("Fader", "", 0);
		chan.addBoolParameter("Mute", "", false);
		chan.addBoolParameter("EQ", "", false);
		chan.addBoolParameter("Dyn", "", false);
		chan.setCollapsed(true);}
	
	var trig = SelChanParams.get();
		if (trig == true){
		selchan = local.values.selectedChannel;
		selchan.setCollapsed(true);
		selchan.addTrigger("Click to Sync", "" , false);
		selchan.addTrigger("Click to Reset Sel Chan", "" , false);
		var champs = util.getObjectProperties(selChann);
		for (var n = 0; n < champs.length; n++) {
			if (selChann[champs[n]][1] == "f") {
			selchan.addFloatParameter(selChann[champs[n]][0], "", 0); }
			if (selChann[champs[n]][1] == "fg") {
			selchan.addFloatParameter(selChann[champs[n]][0], "", 0, -15, 15); } 
			if (selChann[champs[n]][1] == "ff") {
			selchan.addFloatParameter(selChann[champs[n]][0], "", 0, 0, 1); } 
			if (selChann[champs[n]][1] == "fp") {
			selchan.addFloatParameter(selChann[champs[n]][0], "", 0, -50, 50); }  
			else if (selChann[champs[n]][1] == "b") {
			selchan.addBoolParameter(selChann[champs[n]][0], "", false); }
			else if (selChann[champs[n]][1] == "in") {
			selchan.addIntParameter(selChann[champs[n]][0], "", 0); } 
			else if (selChann[champs[n]][1] == "s") {
			selchan.addStringParameter(selChann[champs[n]][0], "", ""); } } }		
}

//===================== VALUE CHANGE EVENTS===========================

function moduleValueChanged(value) { 

//Selected Channel >>>>
	if (value.name == "clickToSync"){ 
		var tar=local.values.selectedChannel.selectTarget.get();
		var no=local.values.selectedChannel.selectNo.get();
		if(tar=="ch" && no < 10){no = "0"+no ;} else {no=no ;}
		if (tar=="lr") {var link = tar ;}
		else {link = tar+"/"+no ;}		
			local.send("/"+link+"/config/name");
			local.send("/"+link+"/mix/fader");
			local.send("/"+link+"/mix/pan");
			local.send("/"+link+"/mix/on");
			local.send("/"+link+"/eq/on");
			local.send("/"+link+"/dyn/on");
			local.send("/"+link+"/dyn/ratio");
			local.send("/"+link+"/dyn/thr");
			local.send("/"+link+"/dyn/mgain");
			local.send("/"+link+"/gate/on");
			local.send("/"+link+"/preamp/hpon");
			local.send("/"+link+"/preamp/invert");
			local.send("/"+link+"/preamp/hpf");
		if (tar=="lr" || tar=="bus") {var c = 6 ;} else {c=4;}
		for(var i=1; i <=c; i++) {
			local.send("/"+link+"/eq/"+i+"/f");
			local.send("/"+link+"/eq/"+i+"/g");
			local.send("/"+link+"/eq/"+i+"/q");
			local.send("/"+link+"/eq/"+i+"/type"); }		
		}		
//Selected Channel Reset All
		if (value.name == "clickToResetSelChan"){
		var champs = util.getObjectProperties(selChann);
		for (var n = 0; n < champs.length; n++) {
		var item = selChann[champs[n]][2] ;
		var par = selChann[champs[n]][1];
		if (par == "s") {
			local.values.selectedChannel.getChild(item).set("");}
		else if (par == "b") {
			local.values.selectedChannel.getChild(item).set(0);}  }	 
		}		
//Selected Channel <<<<<


//Sync All Channel Strips
 	if (value.name == "clickToSyncAll"){ 
 		local.send("/xinfo");
	
// you can customize and choose how many and which messages you wann show up in the "Infos-Fiels"
	var infCont = ShowInfos.get();
		if (infCont == true){		
		for(var i=0; i < message.length; i++) {
		var n = i+10 ;
		var text = message[i];
		local.values.infos.getChild('Info'+n).set(text);} }
		
 		for(var i=1; i <=16; i++) {
 		if (i<10){n="0"+i;} else{n=i;}
		local.send("/subscribe","/ch/"+n+"/config/name");}		
		for(var i=1; i <=4; i++) {
		local.send("/subscribe","/rtn/"+i+"/config/name");}
		for(var i=1; i <=6; i++) {
		local.send("/subscribe","/bus/"+i+"/config/name");}  
		local.send("/subscribe","/rtn/aux/config/name");
		local.send("/subscribe","/lr/config/name");		 
		for(var i=1; i <=16; i++) {
		if (i<10){n="0"+i;} else{n=i;}
		local.send("/subscribe","/ch/"+n+"/mix/fader");} 			
		for(var i=1; i <=4; i++) {
		local.send("/subscribe","/rtn/"+i+"/mix/fader");} 
		local.send("/subscribe","/rtn/aux/mix/fader");
		for(var i=1; i <6; i++) {
		local.send("/subscribe","/bus/"+i+"/mix/fader");} 
		local.send("/subscribe","/lr/mix/fader");
		for(var i=1; i <=4; i++) {
		local.send("/subscribe","/dca/"+i+"/fader");}		
		for(var i=1; i <=16; i++) {
		if (i<10){n="0"+i;} else{n=i;}
		local.send("/subscribe","/ch/"+n+"/mix/pan");} 				
		for(var i=1; i <=16; i++) {
		if (i<10){n="0"+i;} else{n=i;}
		local.send("/subscribe","/ch/"+n+"/mix/on");}		
		for(var i=1; i <=16; i++) {
		if (i<10){n="0"+i;} else{n=i;}
		local.send("/subscribe","/ch/"+n+"/eq/on");}		
		for(var i=1; i <=16; i++) {
		if (i<10){n="0"+i;} else{n=i;}
		local.send("/subscribe","/ch/"+n+"/dyn/on");}		
		for(var i=1; i <=16; i++) {
		if (i<10){n="0"+i;} else{n=i;}
		local.send("/subscribe","/ch/"+n+"/gate/on");}		
		for(var i=1; i <=16; i++) {
		if (i<10){n="0"+i;} else{n=i;}
		local.send("/subscribe","/ch/"+n+"/preamp/hpon");}		
		local.send("/subscribe","/lr/mix/fader");
		local.send("/subscribe","/lr/mix/pan");
		local.send("/subscribe","/lr/mix/on");
		local.send("/subscribe","/lr/eq/on");
		local.send("/subscribe","/lr/dyn/on");
		for(var i=1; i <=6; i++) {
		local.send("/subscribe","/bus/"+i+"/mix/fader");
		local.send("/subscribe","/bus/"+i+"/mix/on");
		local.send("/subscribe","/bus/"+i+"/eq/on");
		local.send("/subscribe","/bus/"+i+"/dyn/on");}    }	
		
	if (value.name == "clickToSendUpdates"){
		for(var i=1; i <=16; i++) {
		var val = local.values.channels.getChild('Channel'+i).getChild('Name').get();
 		if (i<10){n="0"+i;} else{n=i;}
		local.send("/ch/"+n+"/config/name", val);}
		
		for(var i=1; i <=16; i++) {
		var d = local.values.channels.getChild('Channel'+i).getChild('Fader').get();
		if (d <= -60)  {var f = (d + 90) / 480;}
		else if (d <= -30) {var f = (d + 70) / 160;}
		else if (d <= -10) {var f = (d + 50) / 80;}
		else if (d <= 10) {var f = (d + 30) / 40;}
		
		if (i<10){n="0"+i;} else{n=i;}
		local.send("/ch/"+n+"/mix/fader", f);}
		
		for(var i=1; i <=6; i++) {
		var d = local.values.channels.getChild('Bus'+i).getChild('Fader').get();
		if (d <= -60)  {var f = (d + 90) / 480;}
		else if (d <= -30) {var f = (d + 70) / 160;}
		else if (d <= -10) {var f = (d + 50) / 80;}
		else if (d <= 10) {var f = (d + 30) / 40;}
		local.send("/bus/"+i+"/mix/fader", f);}
		
		for(var i=1; i <=16; i++) {
		var val = local.values.channels.getChild('Channel'+i).getChild('Pan').get();
		val=(val+50)/100 ;
		if (i<10){n="0"+i;} else{n=i;}
		local.send("/ch/"+n+"/mix/pan", val);}
		
		for(var i=1; i <=16; i++) {
		var val = local.values.channels.getChild('Channel'+i).getChild('Mute').get();
		val=1-val ;
		if (i<10){n="0"+i;} else{n=i;}
		local.send("/ch/"+n+"/mix/on", val);}
		
		for(var i=1; i <=6; i++) {
		var val = local.values.channels.getChild('Bus'+i).getChild('Mute').get();
		val=1-val ;
		local.send("/bus/"+i+"/mix/on", val);}
		
		for(var i=1; i <=16; i++) {
		var val = local.values.channels.getChild('Channel'+i).getChild('EQ').get();
		if (i<10){n="0"+i;} else{n=i;}
		local.send("/ch/"+n+"/eq/on", val);}
		
		for(var i=1; i <=6; i++) {
		var val = local.values.channels.getChild('Bus'+i).getChild('EQ').get();
		local.send("/bus/"+i+"/eq/on", val);}
		
		for(var i=1; i <=16; i++) {
		var val = local.values.channels.getChild('Channel'+i).getChild('LoCut').get();
		if (i<10){n="0"+i;} else{n=i;}
		local.send("/ch/"+n+"/preamp/hpon", val);}
		
		for(var i=1; i <=16; i++) {
		var val = local.values.channels.getChild('Channel'+i).getChild('Dyn').get();
		if (i<10){n="0"+i;} else{n=i;}
		local.send("/ch/"+n+"/dyn/on", val);}
		
		for(var i=1; i <=6; i++) {
		var val = local.values.channels.getChild('bus'+i).getChild('Dyn').get();
		local.send("/bus/"+i+"/dyn/on", val);}
		
		for(var i=1; i <=16; i++) {
		var val = local.values.channels.getChild('Channel'+i).getChild('Gate').get();
		if (i<10){n="0"+i;} else{n=i;}
		local.send("/ch/"+n+"/gate/on", val);}
		
		} 		 	
 }
 

// Xremote loop
function update(deltaTime) {
		var now = util.getTime();
		if(now > TSSendAlive) {
		TSSendAlive = now + 8;
		keepAlive(); }
}

function keepAlive() {
		local.send("/xremote") ;
//		local.send("/renew"); // use this for permanent feedback ! this may slow down Chataigne !!
		
}

//=================== OSC EVENTS =============================

function oscEvent(address, args) { 
// infos
	var infCont = ShowInfos.get();
		if (infCont == true){
		if (address== "/xinfo"){ 
		local.values.infos.info1.set(address);
		for(var i=0; i <=3; i++) {
		var n=i+2 ; 
		local.values.infos.getChild('Info'+n).set(args[i]);}  }
		if (address== "/status"){ 
		for(var i=0; i < 3; i++) {
		var n=i+6 ; 
		local.values.infos.getChild('Info'+n).set(args[i]);}  } }
		
	
// names
	var infNames = ShowNames.get();
		if (infNames == true){				
		for(var i=1; i <=16; i++) {
		if (i<10){n="0"+i;} else{n=i;}
		if (address == "/ch/"+n+"/config/name") {
		local.values.names.getChild('Track'+i).set(args[0]);
		local.values.channels.getChild('Channel'+i).getChild('Name').set(args[0]); } }
		if (address == "/rtn/aux/config/name") {
		local.values.names.auxUSB.set(args[0]);}
		if (address == "/lr/config/name") {
		local.values.names.mainLR.set(args[0]);
		local.values.channels.mainLR.getChild('Name').set(args[0]); }
		for(var i=1; i <=4; i++) {
		if (address == "/rtn/"+i+"/config/name") {
		local.values.names.getChild('fxReturn'+i).set(args[0]); } }
		for(var i=1; i <=6; i++) {
		if (address == "/bus/"+i+"/config/name") {
		local.values.names.getChild('Bus'+i).set(args[0]);
		local.values.channels.getChild('Bus'+i).getChild('Name').set(args[0]); } }	 }
// faders				
		for(var i=1; i <=16; i++) {
		if (i<10){n="0"+i;} else{n=i;}
		if (address == "/ch/"+n+"/mix/fader") {
		local.values.faders.channelFaders.getChild('Fader'+i).set(args[0]); } }		
		for(var i=1; i <=4; i++) {
		if (address == "/rtn/"+i+"/mix/fader") {
		local.values.faders.channelFaders.getChild('fxReturn'+i).set(args[0]); } }		
		if (address == "/rtn/aux/mix/fader") {
		local.values.faders.channelFaders.auxUSB.set(args[0]);}		
		for(var i=1; i <=6; i++) {
		if (address == "/bus/"+i+"/mix/fader") {
		local.values.faders.busDCAFaders.getChild('Bus'+i).set(args[0]); } }
		if (address == "/lr/mix/fader") {
		local.values.faders.busDCAFaders.mainLR.set(args[0]);}	
		for(var i=1; i <=4; i++) {
		if (address == "/dca/"+i+"/fader") {
		local.values.faders.busDCAFaders.getChild('DCA'+i).set(args[0]);} }			
// CHANNELS	
// Faders
		for(var i=1; i <=16; i++) {
		if (i<10){n="0"+i;} else{n=i;}
		if (address == "/ch/"+n+"/mix/fader") {
		var f =args[0];	
		if (f >= 0.5) {var d=(f * 40)-30;}
		else if(f >=0.25) {var d=(f * 80)-50;}
		else if(f >=0.0625) {var d=(f * 160)-70;}
		else if (f >= 0.0) {var d=(f * 480)-90;}
		d= (Math.round(d*10))/10;
		local.values.channels.getChild('Channel'+i).getChild('Fader').set(d);} }		
		if (address == "/lr/mix/fader") {
		var f =args[0];	
		if (f >= 0.5) {var d=(f * 40)-30;}
		else if(f >=0.25) {var d=(f * 80)-50;}
		else if(f >=0.0625) {var d=(f * 160)-70;}
		else if (f >= 0.0) {var d=(f * 480)-90;}
		d= (Math.round(d*10))/10;
		local.values.channels.mainLR.fader.set(d);}		
		for(var i=1; i <=6; i++) {
		if (address == "/bus/"+i+"/mix/fader") {
		var f =args[0];	
		if (f >= 0.5) {var d=(f * 40)-30;}
		else if(f >=0.25) {var d=(f * 80)-50;}
		else if(f >=0.0625) {var d=(f * 160)-70;}
		else if (f >= 0.0) {var d=(f * 480)-90;}
		d= (Math.round(d*10))/10;		
		local.values.channels.getChild('Bus'+i).getChild('Fader').set(d);} }		
//Pan				
		for(var i=1; i <=16; i++) {
		if (i<10){n="0"+i;} else{n=i;}
		if (address == "/ch/"+n+"/mix/pan") {
		var pan = Math.round((args[0]*100-50));
		
		local.values.channels.getChild('Channel'+i).getChild('Pan').set(pan); } }
		if (address == "/lr/mix/pan") {
		var pan = Math.round((args[0]*100-50));
		
		local.values.channels.mainLR.pan.set(pan);}			
//Mute					
		for(var i=1; i <=16; i++) {
		if (i<10){n="0"+i;} else{n=i;}
		if (address == "/ch/"+n+"/mix/on") {
		var on = 1-(args[0]);
		local.values.channels.getChild('Channel'+i).getChild('Mute').set(on); } }
		if (address == "/lr/mix/on") {
		var on = 1-(args[0]);
		local.values.channels.mainLR.mute.set(1-args[0]);}
		for(var i=1; i <=6; i++) {
		if (address == "/bus/"+i+"/mix/on") {
		var on = 1-(args[0]);
		local.values.channels.getChild('Bus'+i).getChild('Mute').set(on); } }		
//EQ		
		for(var i=1; i <=16; i++) {
		if (i<10){n="0"+i;} else{n=i;}
		if (address == "/ch/"+n+"/eq/on") {
		local.values.channels.getChild('Channel'+i).getChild('EQ').set(args[0]); } }
		if (address == "/lr/eq/on") {
		local.values.channels.mainLR.eq.set(args[0]);}
		for(var i=1; i <=6; i++) {
		if (address == "/bus/"+i+"/eq/on") {
		local.values.channels.getChild('Bus'+i).getChild('EQ').set(args[0]); } }		
//LoCut			
		for(var i=1; i <=16; i++) {
		if (i<10){n="0"+i;} else{n=i;}
		if (address == "/ch/"+n+"/preamp/hpon") {
		local.values.channels.getChild('Channel'+i).getChild('LoCut').set(args[0]); } }			
//Dyn				
		for(var i=1; i <=16; i++) {
		if (i<10){n="0"+i;} else{n=i;}
		if (address == "/ch/"+n+"/dyn/on") {
		local.values.channels.getChild('Channel'+i).getChild('Dyn').set(args[0]); } }
		if (address == "/lr/dyn/on") {
		local.values.channels.mainLR.dyn.set(args[0]);}	
		for(var i=1; i <=6; i++) {
		if (address == "/bus/"+i+"/dyn/on") {
		local.values.channels.getChild('Bus'+i).getChild('Dyn').set(args[0]);} }		
//Gate				
		for(var i=1; i <=16; i++) {
		if (i<10){n="0"+i;} else{n=i;}
		if (address == "/ch/"+n+"/gate/on") {
		local.values.channels.getChild('Channel'+i).getChild('Gate').set(args[0]);} }
		
//Selected Channel
var trig = SelChanParams.get();
		if (trig == true){
		
		var tar=local.values.selectedChannel.selectTarget.get();
		var no=local.values.selectedChannel.selectNo.get();
		if(tar=="ch" && no < 10){no = "0"+no ;} else {no=no ;}
		if (tar=="lr") {var link = tar ;}
		else {link = tar+"/"+no ;}
		
//Selected Channel Name, Fader etc
		if (address == "/"+link+"/config/name") {
		local.values.selectedChannel.label.set(args[0]);}
		if (address == "/"+link+"/mix/fader") {
		var f =args[0];	
		if (f >= 0.5) {var d=(f * 40)-30;}
		else if(f >=0.25 && f <0.5) {var d=(f * 80)-50;}
		else if(f >=0.0625 && f <0.25) {var d=(f * 160)-70;}
		else if (f >= 0.0 && f <0.0625) {var d=(f * 480)-90;}
		d= (Math.round(d*10))/10;
		local.values.selectedChannel.fader.set(d+" db");}
//Pan
		if (address == "/"+link+"/mix/pan") {
		var pan = Math.round(args[0]*100-50) ;
		if (pan == 0){pan = "C";}
		else if (pan < 0){pan = pan+"  L";}
		else if (pan > 0){pan = pan+"  R";}
		local.values.selectedChannel.pan.set(pan);}
//ST, EQ, Dyn, Gate-on
		if (address == "/"+link+"/mix/on") {
		var on = 1-args[0] ;
		local.values.selectedChannel.mute.set(on);}
		if (address == "/"+link+"/eq/on") {
		local.values.selectedChannel.eqOn.set(args[0]);}
		if (address == "/"+link+"/dyn/on") {
		local.values.selectedChannel.dynOn.set(args[0]);}
		if (address == "/"+link+"/dyn/ratio") {
		var r = args[0];
		if (r==0){t="1.1 : 1";}
		else if (r==1){t="1.3 : 1";}
		else if (r==2){t="1.5 : 1";}
		else if (r==3){t="2.0 : 1";}
		else if (r==4){t="2.5 : 1";}
		else if (r==5){t="3.0 : 1";}
		else if (r==6){t="4.0 : 1";}
		else if (r==7){t="5.0 : 1";}
		else if (r==8){t="7.0 : 1";}
		else if (r==9){t="10 : 1";}
		else if (r==10){t="20 : 1";}
		else if (r==11){t="100 : 1";}
		local.values.selectedChannel.dynRatio.set(t);}
		if (address == "/"+link+"/dyn/thr") {
		var thr = Math.round((args[0]-1)*600)/10;
		local.values.selectedChannel.dynThreshold.set(thr+" db");}
		if (address == "/"+link+"/dyn/mgain") {
		var g =Math.round(args[0]*240)/10 ;
		local.values.selectedChannel.dynOutGain.set(g+" db");}
		if (address == "/"+link+"/gate/on") {
		local.values.selectedChannel.gateOn.set(args[0]);}
//LoCut
		if (address == "/"+link+"/preamp/hpon") {
		local.values.selectedChannel.loCutOn.set(args[0]);}
		if (address == "/"+link+"/preamp/invert") {	
		local.values.selectedChannel.invert.set(args[0]);}
		if (address == "/"+link+"/preamp/hpf") {
		var f= args[0];
		 if (f >=0.0000 && f <0.0300) { hp= 20 ;}
 		else if (f >=0.0300 && f <0.0700) { hp= 22 ;}
		else if (f >=0.0700 && f <0.0900) { hp= 25 ;}
		else if (f >=0.0900 && f <0.1000) { hp= 27 ;}
		else if (f >=0.1000 && f <0.1200) { hp= 28 ;}
		else if (f >=0.1200 && f <0.1600) { hp= 30 ;}
		else if (f >=0.1600 && f <0.1800) { hp= 33 ;}
		else if (f >=0.1800 && f <0.2000) { hp= 35 ;}
		else if (f >=0.2000 && f <0.2200) { hp= 38 ;}
		else if (f >=0.2200 && f <0.2400) { hp= 40 ;}
		else if (f >=0.2400 && f <0.2500) { hp= 42 ;}
		else if (f >=0.2500 && f <0.2700) { hp= 44 ;}
		else if (f >=0.2700 && f <0.2800) { hp= 46 ;}
		else if (f >=0.2800 && f <0.3000) { hp= 48 ;}
		else if (f >=0.3000 && f <0.3100) { hp= 50 ;}
		else if (f >=0.3100 && f <0.3300) { hp= 52 ;}
		else if (f >=0.3300 && f <0.3400) { hp= 55 ;}
		else if (f >=0.3400 && f <0.3600) { hp= 57 ;}
		else if (f >=0.3600 && f <0.3800) { hp= 61 ;}
		else if (f >=0.3800 && f <0.4000) { hp= 64 ;}
		else if (f >=0.4000 && f <0.4100) { hp= 68 ;}
		else if (f >=0.4100 && f <0.4300) { hp= 70 ;}
		else if (f >=0.4300 && f <0.4400) { hp= 75 ;}
		else if (f >=0.4400 && f <0.4500) { hp= 77 ;}
		else if (f >=0.4500 && f <0.4700) { hp= 79 ;}
		else if (f >=0.4700 && f <0.4800) { hp= 84 ;}
		else if (f >=0.4800 && f <0.4900) { hp= 87 ;}
		else if (f >=0.4900 && f <0.5000) { hp= 89 ;}
		else if (f >=0.5000 && f <0.5100) { hp= 92 ;}
		else if (f >=0.5100 && f <0.5200) { hp= 95 ;}
		else if (f >=0.5200 && f <0.5300) { hp= 98 ;}
		else if (f >=0.5300 && f <0.5400) { hp= 101 ;}
		else if (f >=0.5400 && f <0.5500) { hp= 104 ;}
		else if (f >=0.5500 && f <0.5600) { hp= 107 ;}
		else if (f >=0.5600 && f <0.5700) { hp= 110 ;}
		else if (f >=0.5700 && f <0.5900) { hp= 114 ;}
		else if (f >=0.5900 && f <0.6000) { hp= 121 ;}
		else if (f >=0.6000 && f <0.6100) { hp= 124 ;}
		else if (f >=0.6100 && f <0.6200) { hp= 128 ;}
		else if (f >=0.6200 && f <0.6300) { hp= 132 ;}
		else if (f >=0.6300 && f <0.6400) { hp= 136 ;}
		else if (f >=0.6400 && f <0.6500) { hp= 140 ;}
		else if (f >=0.6500 && f <0.6600) { hp= 144 ;}
		else if (f >=0.6600 && f <0.6700) { hp= 149 ;}
		else if (f >=0.6700 && f <0.6800) { hp= 153 ;}
		else if (f >=0.6800 && f <0.6900) { hp= 158 ;}
		else if (f >=0.6900 && f <0.7000) { hp= 163 ;}
		else if (f >=0.7000 && f <0.7100) { hp= 168 ;}
		else if (f >=0.7100 && f <0.7200) { hp= 173 ;}
		else if (f >=0.7200 && f <0.7300) { hp= 178 ;}
		else if (f >=0.7300 && f <0.7400) { hp= 184 ;}
		else if (f >=0.7400 && f <0.7500) { hp= 189 ;}
		else if (f >=0.7500 && f <0.7600) { hp= 195 ;}
		else if (f >=0.7600 && f <0.7700) { hp= 201 ;}
		else if (f >=0.7700 && f <0.7800) { hp= 207 ;}
		else if (f >=0.7800 && f <0.7900) { hp= 213 ;}
		else if (f >=0.7900 && f <0.8000) { hp= 220 ;}
		else if (f >=0.8000 && f <0.8100) { hp= 226 ;}
		else if (f >=0.8100 && f <0.8200) { hp= 233 ;}
		else if (f >=0.8200 && f <0.8300) { hp= 240 ;}
		else if (f >=0.8300 && f <0.8400) { hp= 248 ;}
		else if (f >=0.8400 && f <0.8500) { hp= 255 ;}
		else if (f >=0.8500 && f <0.8600) { hp= 263 ;}
		else if (f >=0.8600 && f <0.8700) { hp= 271 ;}
		else if (f >=0.8700 && f <0.8800) { hp= 279 ;}
		else if (f >=0.8800 && f <0.8900) { hp= 288 ;}
		else if (f >=0.8900 && f <0.9000) { hp= 296 ;}
		else if (f >=0.9000 && f <0.9100) { hp= 305 ;}
		else if (f >=0.9100 && f <0.9200) { hp= 315 ;}
		else if (f >=0.9200 && f <0.9300) { hp= 324 ;}
		else if (f >=0.9300 && f <0.9400) { hp= 334 ;}
		else if (f >=0.9400 && f <0.9500) { hp= 344 ;}
		else if (f >=0.9500 && f <0.9600) { hp= 355 ;}
		else if (f >=0.9600 && f <0.9700) { hp= 366 ;}
		else if (f >=0.9700 && f <0.9800) { hp= 377 ;}
		else if (f >=0.9800 && f <0.9900) { hp= 388 ;}
		else if (f >=0.9900 && f <=1.0) { hp= 400 ;} 	
		local.values.selectedChannel.loCutFreq.set(hp+"  Hz");}		
		
//Selected Channel EQ	
		if (tar=="lr" || tar=="bus") {var c = 6 ;} else {c=4;}	
		for(var i=1; i <= c; i++) {
		if (address == "/"+link+"/eq/"+i+"/g") {
		var g = Math.round((args[0]-0.5)*300)/10 ;
		local.values.selectedChannel.getChild('GainEq'+i).set(g+" db");}
		if (address == "/"+link+"/eq/"+i+"/f") {		
		var f= args[0]; 		
	if(n=0){var tx= 20 ; }
		else if (f >=0.0333 && f <0.05){var tx= 26 ; }
		else if (f >=0.05 && f <0.0583){var tx= 29 ; }
		else if (f >=0.0583 && f <0.075){var tx= 30 ; }
		else if (f >=0.075 && f <0.0917){var tx= 34 ; }
		else if (f >=0.0917 && f <0.1){var tx= 38 ; }
		else if (f >=0.1 && f <0.1083){var tx= 40 ; }
		else if (f >=0.1083 && f <0.1167){var tx= 43 ; }
		else if (f >=0.1167 && f <0.125){var tx= 45 ; }
		else if (f >=0.125 && f <0.1333){var tx= 48 ; }
		else if (f >=0.1333 && f <0.1417){var tx= 51 ; }
		else if (f >=0.1417 && f <0.15){var tx= 54 ; }
		else if (f >=0.15 && f <0.1583){var tx= 57 ; }
		else if (f >=0.1583 && f <0.1667){var tx= 60 ; }
		else if (f >=0.1667 && f <0.175){var tx= 64 ; }
		else if (f >=0.175 && f <0.1833){var tx= 67 ; }
		else if (f >=0.1833 && f <0.1917){var tx= 71 ; }
		else if (f >=0.1917 && f <0.2){var tx= 76 ; }
		else if (f >=0.2 && f <0.2083){var tx= 80 ; }
		else if (f >=0.2083 && f <0.2167){var tx= 85 ; }
		else if (f >=0.2167 && f <0.225){var tx= 90 ; }
		else if (f >=0.225 && f <0.2333){var tx= 95 ; }
		else if (f >=0.2333 && f <0.2417){var tx= 101 ; }
		else if (f >=0.2417 && f <0.25){var tx= 107 ; }
		else if (f >=0.25 && f <0.2583){var tx= 113 ; }
		else if (f >=0.2583 && f <0.2667){var tx= 120 ; }
		else if (f >=0.2667 && f <0.275){var tx= 127 ; }
		else if (f >=0.275 && f <0.2833){var tx= 134 ; }
		else if (f >=0.2833 && f <0.2917){var tx= 142 ; }
		else if (f >=0.2917 && f <0.3){var tx= 150 ; }
		else if (f >=0.3 && f <0.3083){var tx= 159 ; }
		else if (f >=0.3083 && f <0.3167){var tx= 169 ; }
		else if (f >=0.3167 && f <0.325){var tx= 179 ; }
		else if (f >=0.325 && f <0.3333){var tx= 189 ; }
		else if (f >=0.3333 && f <0.3417){var tx= 200 ; }
		else if (f >=0.3417 && f <0.35){var tx= 212 ; }
		else if (f >=0.35 && f <0.3583){var tx= 225 ; }
		else if (f >=0.3583 && f <0.3667){var tx= 238 ; }
		else if (f >=0.3667 && f <0.375){var tx= 252 ; }
		else if (f >=0.375 && f <0.3833){var tx= 267 ; }
		else if (f >=0.3833 && f <0.3917){var tx= 283 ; }
		else if (f >=0.3917 && f <0.4){var tx= 300 ; }
		else if (f >=0.4 && f <0.4083){var tx= 317 ; }
		else if (f >=0.4083 && f <0.4167){var tx= 336 ; }
		else if (f >=0.4167 && f <0.425){var tx= 356 ; }
		else if (f >=0.425 && f <0.4333){var tx= 377 ; }
		else if (f >=0.4333 && f <0.4417){var tx= 400 ; }
		else if (f >=0.4417 && f <0.45){var tx= 423 ; }
		else if (f >=0.45 && f <0.4583){var tx= 448 ; }
		else if (f >=0.4583 && f <0.4667){var tx= 475 ; }
		else if (f >=0.4667 && f <0.475){var tx= 503 ; }
		else if (f >=0.475 && f <0.4833){var tx= 533 ; }
		else if (f >=0.4833 && f <0.4917){var tx= 564 ; }
		else if (f >=0.4917 && f <0.5){var tx= 598 ; }
		else if (f >=0.5 && f <0.5083){var tx= 633 ; }
		else if (f >=0.5083 && f <0.5167){var tx= 670 ; }
		else if (f >=0.5167 && f <0.525){var tx= 710 ; }
		else if (f >=0.525 && f <0.5333){var tx= 752 ; }
		else if (f >=0.5333 && f <0.5417){var tx= 797 ; }
		else if (f >=0.5417 && f <0.55){var tx= 844 ; }
		else if (f >=0.55 && f <0.5583){var tx= 894 ; }
		else if (f >=0.5583 && f <0.5667){var tx= 947 ; }
		else if (f >=0.5667 && f <0.575){var tx= 1000 ; }
		else if (f >=0.575 && f <0.5833){var tx= 1060 ; }
		else if (f >=0.5833 && f <0.5917){var tx= 1120 ; }
		else if (f >=0.5917 && f <0.6){var tx= 1190 ; }
		else if (f >=0.6 && f <0.6083){var tx= 1260 ; }
		else if (f >=0.6083 && f <0.6167){var tx= 1330 ; }
		else if (f >=0.6167 && f <0.625){var tx= 1410 ; }
		else if (f >=0.625 && f <0.6333){var tx= 1490 ; }
		else if (f >=0.6333 && f <0.6417){var tx= 1580 ; }
		else if (f >=0.6417 && f <0.65){var tx= 1680 ; }
		else if (f >=0.65 && f <0.6583){var tx= 1780 ; }
		else if (f >=0.6583 && f <0.6667){var tx= 1880 ; }
		else if (f >=0.6667 && f <0.675){var tx= 2000 ; }
		else if (f >=0.675 && f <0.6833){var tx= 2110 ; }
		else if (f >=0.6833 && f <0.6917){var tx= 2240 ; }
		else if (f >=0.6917 && f <0.7){var tx= 2370 ; }
		else if (f >=0.7 && f <0.7083){var tx= 2510 ; }
		else if (f >=0.7083 && f <0.7167){var tx= 2660 ; }
		else if (f >=0.7167 && f <0.725){var tx= 2820 ; }
		else if (f >=0.725 && f <0.7333){var tx= 2990 ; }
		else if (f >=0.7333 && f <0.7417){var tx= 3160 ; }
		else if (f >=0.7417 && f <0.75){var tx= 3350 ; }
		else if (f >=0.75 && f <0.7583){var tx= 3550 ; }
		else if (f >=0.7583 && f <0.7667){var tx= 3760 ; }
		else if (f >=0.7667 && f <0.775){var tx= 3990 ; }
		else if (f >=0.775 && f <0.7833){var tx= 4220 ; }
		else if (f >=0.7833 && f <0.7917){var tx= 4470 ; }
		else if (f >=0.7917 && f <0.8){var tx= 4740 ; }
		else if (f >=0.8 && f <0.8083){var tx= 5020 ; }
		else if (f >=0.8083 && f <0.8167){var tx= 5320 ; }
		else if (f >=0.8167 && f <0.825){var tx= 5630 ; }
		else if (f >=0.825 && f <0.8333){var tx= 5970 ; }
		else if (f >=0.8333 && f <0.8417){var tx= 6320 ; }
		else if (f >=0.8417 && f <0.85){var tx= 6690 ; }
		else if (f >=0.85 && f <0.8583){var tx= 7090 ; }
		else if (f >=0.8583 && f <0.8667){var tx= 7510 ; }
		else if (f >=0.8667 && f <0.875){var tx= 7960 ; }
		else if (f >=0.875 && f <0.8833){var tx= 8430 ; }
		else if (f >=0.8833 && f <0.8917){var tx= 8930 ; }
		else if (f >=0.8917 && f <0.9){var tx= 9460 ; }
		else if (f >=0.9 && f <0.9083){var tx= 10020 ; }
		else if (f >=0.9083 && f <0.9167){var tx= 10610 ; }
		else if (f >=0.9167 && f <0.925){var tx= 11240 ; }
		else if (f >=0.925 && f <0.9333){var tx= 11910 ; }
		else if (f >=0.9333 && f <0.9417){var tx= 12610 ; }
		else if (f >=0.9417 && f <0.95){var tx= 13360 ; }
		else if (f >=0.95 && f <0.9583){var tx= 14150 ; }
		else if (f >=0.9583 && f <0.9667){var tx= 14990 ; }
		else if (f >=0.9667 && f <0.975){var tx= 15880 ; }
		else if (f >=0.975 && f <0.9833){var tx= 16820 ; }
		else if (f >=0.9833 && f <0.9917){var tx= 17820 ; }
		else if (f >=0.9917 && f <0.999){var tx= 18880 ; }
		else if (f = 0.999){var tx= 20000 ; }		
		local.values.selectedChannel.getChild('FreqEq'+i).set(tx+"  Hz");}
		
		if (address == "/"+link+"/eq/"+i+"/q") {
		var l = args[0];

	if (l >=0.0 && l <0.0141) { q= 10.0 ;}
		else if (l >=0.0141 && l <0.0282) { q= 9.5  ;}
		else if (l >=0.0282 && l <0.0423) { q= 9.1  ;}
		else if (l >=0.0423 && l <0.0563) { q= 8.6  ;}
		else if (l >=0.0563 && l <0.0704) { q= 8.2  ;}
		else if (l >=0.0704 && l <0.0845) { q= 7.8  ;}
		else if (l >=0.0845 && l <0.0986) { q= 7.4  ;}
		else if (l >=0.0986 && l <0.1127) { q= 7.1  ;}
		else if (l >=0.1127 && l <0.1268) { q= 6.7  ;}
		else if (l >=0.1268 && l <0.1408) { q= 6.4  ;}
		else if (l >=0.1408 && l <0.1549) { q= 6.1  ;}
		else if (l >=0.1549 && l <0.1690) { q= 5.8  ;}
		else if (l >=0.1690 && l <0.1831) { q= 5.5  ;}
		else if (l >=0.1831 && l <0.1972) { q= 5.3  ;}
		else if (l >=0.1972 && l <0.2113) { q= 5.0  ;}
		else if (l >=0.2113 && l <0.2254) { q= 4.8  ;}
		else if (l >=0.2254 && l <0.2394) { q= 4.5  ;}
		else if (l >=0.2394 && l <0.2535) { q= 4.3  ;}
		else if (l >=0.2535 && l <0.2676) { q= 4.1  ;}
		else if (l >=0.2676 && l <0.2817) { q= 3.9  ;}
		else if (l >=0.2817 && l <0.2958) { q= 3.7  ;}
		else if (l >=0.2958 && l <0.3099) { q= 3.5  ;}
		else if (l >=0.3099 && l <0.3239) { q= 3.4  ;}
		else if (l >=0.3239 && l <0.3380 ) { q= 3.2  ;}
		else if (l >=0.3380  && l <0.3521) { q= 3.1 ;}
		else if (l >=0.3521 && l <0.3662) { q= 2.9  ;}
		else if (l >=0.3662 && l <0.3803) { q= 2.8  ;}
		else if (l >=0.3803 && l <0.3944) { q= 2.6  ;}
		else if (l >=0.3944 && l <0.4085) { q= 2.5  ;}
		else if (l >=0.4085 && l <0.4225) { q= 2.4  ;}
		else if (l >=0.4225 && l <0.4366) { q= 2.3  ;}
		else if (l >=0.4366 && l <0.4507) { q= 2.2  ;}
		else if (l >=0.4507 && l <0.4648) { q= 2.1  ;}
		else if (l >=0.4648 && l <0.4789) { q= 2.0  ;}
		else if (l >=0.4789 && l <0.4930) { q= 1.9  ;}
		else if (l >=0.4930 && l <0.5070) { q= 1.8  ;}
		else if (l >=0.5070 && l <0.5211) { q= 1.7  ;}
		else if (l >=0.5211 && l <0.5352) { q= 1.6  ;}
		else if (l >=0.5352 && l <0.5634) { q= 1.5  ;}
		else if (l >=0.5634 && l <0.5775) { q= 1.4  ;}
		else if (l >=0.5775 && l <0.5915) { q= 1.3  ;}
		else if (l >=0.5915 && l <0.6056) { q= 1.3  ;}
		else if (l >=0.6056 && l <0.6197) { q= 1.2  ;}
		else if (l >=0.6197 && l <0.6479) { q= 1.1  ;}
		else if (l >=0.6479 && l <0.6761) { q= 1.0  ;}
		else if (l >=0.6761 && l <0.7042) { q= 0.9  ;}
		else if (l >=0.7042 && l <0.7465) { q= 0.8  ;}
		else if (l >=0.7465 && l <0.7887) { q= 0.7  ;}
		else if (l >=0.7887 && l <0.8310) { q= 0.6  ;}
		else if (l >=0.8310 && l <0.8873) { q= 0.5  ;}
		else if (l >=0.8873 && l <0.9577) { q= 0.4  ;}
		else if (l >=0.9577 && l <1.0) { q= 0.3  ;}

		local.values.selectedChannel.getChild('QEq'+i).set(q+"");}
		
		if (address == "/"+link+"/eq/"+i+"/type") {
		var filt = args[0];
		if (filt == 0){var txt= "LoCut";}
		else if (filt == 1){var txt= "Lo-Shelf";}
		else if (filt == 2){var txt= "PEQ";}
		else if (filt == 3){var txt= "VEQ";}
		else if (filt == 4){var txt= "Hi-Shelf";}
		else if (filt == 5){var txt= "HiCut";}
		local.values.selectedChannel.getChild('typeEq'+i).set(txt);} } }
		
//Selected Channel Special Resets
		if (tar=="lr" || tar=="bus") {
		local.values.selectedChannel.loCutOn.set(0);
		local.values.selectedChannel.gateOn.set(0);
		local.values.selectedChannel.invert.set(0);
		local.values.selectedChannel.loCutFreq.set("");}
		
		if (tar=="ch" || tar=="rtn") {
		for(var i=5; i <= 6; i++) {
		local.values.selectedChannel.getChild('GainEq'+i).set("");
		local.values.selectedChannel.getChild('FreqEq'+i).set("");
		local.values.selectedChannel.getChild('QEq'+i).set("");
		local.values.selectedChannel.getChild('TypeEq'+i).set("");}	 }
		
		if (tar=="rtn") {	
		local.values.selectedChannel.loCutOn.set(0);
		local.values.selectedChannel.dynOn.set(0);
		local.values.selectedChannel.gateOn.set(0);
		local.values.selectedChannel.invert.set(0);
		local.values.selectedChannel.dynThreshold.set("");
		local.values.selectedChannel.dynRatio.set("");
		local.values.selectedChannel.dynOutGain.set("");}
		
		if (tar=="fxsend") {	
		local.values.selectedChannel.loCutOn.set(0);
		local.values.selectedChannel.dynOn.set(0);
		local.values.selectedChannel.gateOn.set(0);
		local.values.selectedChannel.invert.set(0);
		local.values.selectedChannel.eqOn.set(0);
		local.values.selectedChannel.pan.set("");
		local.values.selectedChannel.loCutFreq.set("");
		for(var i=1; i <= 6; i++) {
		local.values.selectedChannel.getChild('GainEq'+i).set("");
		local.values.selectedChannel.getChild('FreqEq'+i).set("");
		local.values.selectedChannel.getChild('QEq'+i).set("");
		local.values.selectedChannel.getChild('TypeEq'+i).set("");}}
}

//=================== REQUESTS =============================

//Requests
function request_names() {
 		for(var i=1; i <10; i++) {
		local.send("/ch/0"+i+"/config/name");}
		for(var i=10; i <=16; i++) {
		local.send("/ch/"+i+"/config/name");}
		for(var i=1; i <=4; i++) {
		local.send("/rtn/"+i+"/config/name");} 
		local.send("/rtn/aux/config/name");  		 
}

function request_chfader() {
 		for(var i=1; i <10; i++) {
		local.send("/ch/0"+i+"/mix/fader");} 
		for(var i=10; i <=16; i++) {
		local.send("/ch/"+i+"/mix/fader");}
		for(var i=1; i <=4; i++) {
		local.send("/rtn/"+i+"/mix/fader");} 
		local.send("/rtn/aux/mix/fader"); 		
}

function request_busfader() {
 		for(var i=1; i <6; i++) {
		local.send("/bus/"+i+"/mix/fader");} 
		local.send("/lr/mix/fader");
		for(var i=1; i <=4; i++) {
		local.send("/dca/"+i+"/fader");}
}

function request_all() {
 		for(var i=1; i <10; i++) {
		local.send("/subscribe","/ch/0"+i+"/config/name");}
		for(var i=10; i <=16; i++) {
		local.send("/subscribe","/ch/"+i+"/config/name");}
		for(var i=1; i <=4; i++) {
		local.send("/subscribe","/rtn/"+i+"/config/name");} 
		local.send("/subscribe","/rtn/aux/config/name"); 
		for(var i=1; i <10; i++) {
		local.send("/subscribe","/ch/0"+i+"/mix/fader");} 
		for(var i=10; i <=16; i++) {
		local.send("/subscribe","/ch/"+i+"/mix/fader");}
		for(var i=1; i <=4; i++) {
		local.send("/subscribe","/rtn/"+i+"/mix/fader");} 
		local.send("/subscribe","/rtn/aux/mix/fader");
		for(var i=1; i <6; i++) {
		local.send("/subscribe","/bus/"+i+"/mix/fader");} 
		local.send("/subscribe","/lr/mix/fader");
		for(var i=1; i <=4; i++) {
		local.send("/subscribe","/dca/"+i+"/fader");}
		for(var i=1; i <10; i++) {
		local.send("/subscribe","/ch/0"+i+"/mix/pan");} 
		for(var i=10; i <=16; i++) {
		local.send("/subscribe","/ch/"+i+"/mix/pan");}
		for(var i=1; i <10; i++) {
		local.send("/subscribe","/ch/0"+i+"/mix/on");} 
		for(var i=10; i <=16; i++) {
		local.send("/subscribe","/ch/"+i+"/mix/on");}
		for(var i=1; i <10; i++) {
		local.send("/subscribe","/ch/0"+i+"/eq/on");} 
		for(var i=10; i <=16; i++) {
		local.send("/subscribe","/ch/"+i+"/eq/on");}
		for(var i=1; i <10; i++) {
		local.send("/subscribe","/ch/0"+i+"/dyn/on");} 
		for(var i=10; i <=16; i++) {
		local.send("/subscribe","/ch/"+i+"/dyn/on");}
		for(var i=1; i <10; i++) {
		local.send("/subscribe","/ch/0"+i+"/gate/on");} 
		for(var i=10; i <=16; i++) {
		local.send("/subscribe","/ch/"+i+"/gate/on");}
		for(var i=1; i <10; i++) {
		local.send("/subscribe","/ch/0"+i+"/preamp/hpon");} 
		for(var i=10; i <=16; i++) {
		local.send("/subscribe","/ch/"+i+"/preamp/hpon");}  		 
}

// ========================== REGULAR FUCNTIONS =============================
//  Chan Config ------>>>>>

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

//  Channel Action ------>>>>>s

function ch_automix_group(targetNumber, val) {
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } 
	local.send("/ch/"+targetNumber+"/automix/group", val);
}

function ch_automix_gain(targetNumber, val) {
	if (targetNumber < 10) {targetNumber = "0"+targetNumber; } 
	
	local.send("/ch/"+targetNumber+"/automix/weight", val);
}



//  Preamp ------>>>>>

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

//  Channel ------>>>>>

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

//  Gate ------>>>>>

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

//  Compressor ------>>>>>

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

//  Insert ------>>>>>

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

//  EQ ------>>>>>

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

// Hi-Pass ------>>>>>

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

//Player ------>>>>>

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

function xinfo () { 
	
	local.send("/xinfo");
}
