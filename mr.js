// ========================== VARS ===========================
var myParameters = {};
var SyncAll;
var ResetAll;
var SelChanParams;
var ShowInfos;
var ShowNames;
var AllowSend ;
var push ;
var targ;
var no ;
var link ;
var trig ;
var chanName = [
	"Channel 1", "Channel 2", "Channel 3", "Channel 4", "Channel 5", "Channel 6", "Channel 7", "Channel 8", 
	"Channel 9", "Channel 10", "Channel 11", "Channel 12", "Channel 13", "Channel 14", "Channel 15", "Channel 16", 
	"Bus 1", "Bus 2", "Bus 3", "Bus 4", "Bus 5", "Bus 6", "Main LR"];
var trackName = [
	"Track 1", "Track 2", "Track 3", "Track 4", "Track 5", "Track 6", "Track 7", "Track 8", 
	"Track 9", "Track 10", "Track 11", "Track 12", "Track 13", "Track 14", "Track 15", "Track 16", 
	"Aux USB", "FX Return 1", "FX Return 2", "FX Return 3", "FX Return 4", "Bus 1", "Bus 2", "Bus 3", "Bus 4", "Bus 5", "Bus 6", "Main LR"];
var faderName = [
	"Fader 1" , "Fader 2" , "Fader 3" , "Fader 4" , "Fader 5" , "Fader 6" , "Fader 7" , "Fader 8" , 
	"Fader 9" , "Fader 10" , "Fader 11" , "Fader 12" , "Fader 13" , "Fader 14" , "Fader 15" , "Fader 16" , 
	"Aux USB" , "FX Return 1" , "FX Return 2" , "FX Return 3" , "FX Return 4" , "Bus 1" , "Bus 2" , "Bus 3" , "Bus 4" , "Bus 5" , "Bus 6" , "Main LR" , "DCA 1" , "DCA 2" , "DCA 3" , "DCA 4"];
var channLabel = {
	"nam"	: ["Name", "s", "label"],
	"fad" : ["Fader", "f","fader"],
	"pan" : ["Pan", "fp","pan"],
	"mute" : ["Mute", "b","mute"],
	"eq" : ["EQ", "b","eq"],
	"dyn" : ["Dyn", "b","dyn"],
	"locut" : ["LoCut", "b","loCut"],
	"gate" : ["Gate", "b","gate"]};
var selChann = {
	"name"	:	["Label", "s", "label"],
	"fader" : ["Fader", "s","fader"],
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
	
var dynRatio = {"1" : [ "0" , "1.1 : 1"], "2" : [ "1" , "1.3 : 1"], "3" : [ "2" , "1.5 : 1"], "4" : [ "3" , "2.0 : 1"], "5" : [ "4" , "2.5 : 1"],
	"6" : [ "5" , "3.0 : 1"], "7" : [ "6" , "4.0 : 1"], "8" : [ "7" , "5.0 : 1"], "9" : [ "8" , "7.0 : 1"], "10" : [ "9" , "10 : 1"],
	"11" : [ "10" , "20 : 1"], "12" : [ "11" , "100 : 1"]};	
	
var freqQ = {"1" : [ "0.0" , "10.0"], "2" : [ "0.014" , "9.5 "], "3" : [ "0.028" , "9.1 "], "4" : [ "0.042" , "8.6 "], "5" : [ "0.056" , "8.2 "],
			 "6" : [ "0.070" , "7.8 "], "7" : [ "0.085" , "7.4 "], "8" : [ "0.099" , "7.1 "], "9" : [ "0.113" , "6.7 "], "10" : [ "0.127" , "6.4 "],
			"11" : [ "0.140" , "6.1 "], "12" : [ "0.155" , "5.8 "], "13" : [ "0.169" , "5.5 "], "14" : [ "0.183" , "5.3 "], "15" : [ "0.197" , "5.0 "],
			"16" : [ "0.211" , "4.8 "], "17" : [ "0.225" , "4.5 "], "18" : [ "0.239" , "4.3 "], "19" : [ "0.254" , "4.1 "], "20" : [ "0.268" , "3.9 "],
			"21" : [ "0.282" , "3.7 "], "22" : [ "0.296" , "3.5 "], "23" : [ "0.31" , "3.4 "], "24" : [ "0.324" , "3.2 "], "25" : [ "0.338 " , "3.1"],
			"26" : [ "0.3521" , "2.9 "], "27" : [ "0.3662" , "2.8 "], "28" : [ "0.3803" , "2.6 "], "29" : [ "0.3944" , "2.5 "], "30" : [ "0.409" , "2.4 "],
		 	"31" : [ "0.4225" , "2.3 "], "32" : [ "0.4366" , "2.2 "], "33" : [ "0.4507" , "2.1 "], "34" : [ "0.4648" , "2.0 "], "35" : [ "0.479" , "1.9 "],
			"36" : [ "0.493" , "1.8 "], "37" : [ "0.507" , "1.7 "], "38" : [ "0.521" , "1.6 "], "39" : [ "0.535" , "1.5 "], "40" : [ "0.563" , "1.4 "],
			"41" : [ "0.578" , "1.3 "], "42" : [ "0.592" , "1.3 "], "43" : [ "0.606" , "1.2 "], "44" : [ "0.62" , "1.1 "], "45" : [ "0.648" , "1.0 "],
			"46" : [ "0.676" , "0.9 "], "47" : [ "0.704" , "0.8 "], "48" : [ "0.747" , "0.7 "], "49" : [ "0.789" , "0.6 "], "50" : [ "0.831" , "0.5 "],
			"51" : [ "0.887" , "0.4 "], "52" : [ "0.958" , "0.3 "] };
			
var freqF = {"1" : [ "0.0000" , "20"], "2" : [ "0.0083" , "21"], "3" : [ "0.0167" , "22"], "4" : [ "0.0250" , "24"], "5" : [ "0.0333" , "25"], "6" : [ "0.0417" , "27"],
		 "7" : [ "0.0500" , "28"], "8" : [ "0.0583" , "30"], "9" : [ "0.0667" , "32"], "10" : [ "0.0750" , "34"], "11" : [ "0.0833" , "36"], "12" : [ "0.0917" , "38"], 
		 "13" : [ "0.1000" , "40"], "14" : [ "0.1083" , "42"], "15" : [ "0.1167" , "45"], "16" : [ "0.1250" , "47"], "17" : [ "0.1333" , "50"], "18" : [ "0.1417" , "53"], 
		 "19" : [ "0.1500" , "56"], "20" : [ "0.1583" , "60"], "21" : [ "0.1667" , "63"], "22" : [ "0.1750" , "67"], "23" : [ "0.1833" , "71"], "24" : [ "0.1917" , "75"], 
		 "25" : [ "0.2000" , "80"], "26" : [ "0.2083" , "84"], "27" : [ "0.2167" , "89"], "28" : [ "0.2250" , "95"], "29" : [ "0.2333" , "100"], "30" : [ "0.2417" , "106"], 
		 "31" : [ "0.2500" , "113"], "32" : [ "0.2583" , "119"], "33" : [ "0.2667" , "126"], "34" : [ "0.2750" , "134"], "35" : [ "0.2833" , "142"], "36" : [ "0.2917" , "150"], 
		 "37" : [ "0.3000" , "159"], "38" : [ "0.3083" , "168"], "39" : [ "0.3167" , "178"], "40" : [ "0.3250" , "189"], "41" : [ "0.3333" , "200"], "42" : [ "0.3417" , "212"], 
		 "43" : [ "0.3500" , "224"], "44" : [ "0.3583" , "238"], "45" : [ "0.3667" , "252"], "46" : [ "0.3750" , "267"], "47" : [ "0.3833" , "283"], "48" : [ "0.3917" , "299"], 
		 "49" : [ "0.4000" , "317"], "50" : [ "0.4083" , "336"], "51" : [ "0.4167" , "356"], "52" : [ "0.4250" , "377"], "53" : [ "0.4333" , "399"], "54" : [ "0.4417" , "423"], 
		 "55" : [ "0.4500" , "448"], "56" : [ "0.4583 " , "474"], "57" : [ "0.4667" , "502"], "58" : [ "0.4750" , "532"], "59" : [ "0.4833" , "564"], "60" : [ "0.4917" , "597"], 
		 "61" : [ "0.5000" , "633"], "62" : [ "0.5083" , "670"], "63" : [ "0.5167" , "710"], "64" : [ "0.5250" , "752"], "65" : [ "0.5333" , "796"], "66" : [ "0.5417" , "843"], 
		 "67" : [ "0.5500" , "893"], "68" : [ "0.5583" , "946"], "69" : [ "0.5667" , "1000"], "70" : [ "0.5750" , "1060"], "71" : [ "0.5833" , "1120"], "72" : [ "0.5917" , "1190"], 
		 "73" : [ "0.6000" , "1260"], "74" : [ "0.6083" , "1330"], "75" : [ "0.6167" , "1410"], "76" : [ "0.6250" , "1490"], "77" : [ "0.6333" , "1580"], "78" : [ "0.6417" , "1680"], 
		 "79" : [ "0.6500" , "1780"], "80" : [ "0.6583" , "1880"], "81" : [ "0.6667" , "2000"], "82" : [ "0.6750" , "2110"], "83" : [ "0.6833" , "2240"], "84" : [ "0.6917 " , "2370"], 
		 "85" : [ "0.7000" , "2510"], "86" : [ "0.7083" , "2660"], "87" : [ "0.7167" , "2820"], "88" : [ "0.7250" , "2990"], "89" : [ "0.7333" , "3160"], "90" : [ "0.7417" , "3350"], 
		 "91" : [ "0.7500" , "3550"], "92" : [ "0.7583" , "3760"], "93" : [ "0.7667" , "3990"], "94" : [ "0.7750" , "4220"], "95" : [ "0.7833" , "4470"], "96" : [ "0.7917" , "4740"], 
		 "97" : [ "0.8000" , "5020"], "98" : [ "0.8083" , "5320"], "99" : [ "0.8167" , "5630"], "100" : [ "0.8250" , "5970"], "101" : [ "0.8333" , "6320"], "102" : [ "0.8417" , "6690"], 
		 "103" : [ "0.8500" , "7090"], "104" : [ "0.8583" , "7510"], "105" : [ "0.8667" , "7960"], "106" : [ "0.8750" , "8430"], "107" : [ "0.8833" , "8930"], "108" : [ "0.8917" , "9460"], 
		 "109" : [ "0.9000" , "10020"], "110" : [ "0.9083" , "10610"], "111" : [ "0.9167" , "11240"], "112" : [ "0.9250" , "11910"], "113" : [ "0.9333" , "12610"], "114" : [ "0.9417" , "13360"], 
		 "115" : [ "0.9500" , "14150"], "116" : [ "0.9583" , "15200"], "117" : [ "0.9667" , "16300"], "118" : [ "0.9750" , "17400"], "119" : [ "0.9833" , "18000"], "120" : [ "0.9917" , "20000"], 
		 "121" : [ "1.0000" , "20000"] };

var loCutF = {"1" : [ "0.00" , "20"], "2" : [ "0.04" , "23"], "3" : [ "0.07" , "25"], "4" : [ "0.09" , "26"], "5" : [ "0.10" , "27"], "6" : [ "0.11" , "28"], "7" : [ "0.12" , "29"],
		 "8" : [ "0.13" , "30"], "9" : [ "0.18" , "34"], "10" : [ "0.20" , "36"], "11" : [ "0.21" , "38"], "12" : [ "0.23" , "40"], "13" : [ "0.25" , "42"], "14" : [ "0.26" , "44"], 
		 "15" : [ "0.27" , "45"], "16" : [ "0.28" , "46"], "17" : [ "0.29" , "48"], "18" : [ "0.30" , "49"], "19" : [ "0.31" , "51"], "20" : [ "0.32" , "52"], "21" : [ "0.33" , "54"], 
		 "22" : [ "0.34" , "55"], "23" : [ "0.35" , "57"], "24" : [ "0.36" , "59"], "25" : [ "0.37" , "61"], "26" : [ "0.38" , "62"], "27" : [ "0.39" , "64"], "28" : [ "0.40" , "66"], 
		 "29" : [ "0.41" , "68"], "30" : [ "0.42" , "70"], "31" : [ "0.43" , "73"], "32" : [ "0.44" , "75"], "33" : [ "0.45" , "77"], "34" : [ "0.46" , "79"], "35" : [ "0.47" , "82"], 
		 "36" : [ "0.48" , "84"], "37" : [ "0.49" , "87"], "38" : [ "0.50" , "89"], "39" : [ "0.51" , "92"], "40" : [ "0.52" , "95"], "41" : [ "0.53" , "98"], "42" : [ "0.54" , "101"], 
		 "43" : [ "0.55" , "104"], "44" : [ "0.56" , "107"], "45" : [ "0.57" , "110"], "46" : [ "0.58" , "114"], "47" : [ "0.59" , "117"], "48" : [ "0.60" , "121"], "49" : [ "0.61" , "124"], 
		 "50" : [ "0.62" , "128"], "51" : [ "0.63" , "132"], "52" : [ "0.64" , "136"], "53" : [ "0.65" , "140"], "54" : [ "0.66" , "144"], "55" : [ "0.67" , "149"], "56" : [ "0.68" , "153"], 
		 "57" : [ "0.69" , "158"], "58" : [ "0.70" , "163"], "59" : [ "0.71" , "168"], "60" : [ "0.72" , "173"], "61" : [ "0.73" , "178"], "62" : [ "0.74" , "184"], "63" : [ "0.75" , "189"], 
		 "64" : [ "0.76" , "195"], "65" : [ "0.77" , "201"], "66" : [ "0.78" , "207"], "67" : [ "0.79" , "213"], "68" : [ "0.80" , "220"], "69" : [ "0.81" , "226"], "70" : [ "0.82" , "233"], 
		 "71" : [ "0.83" , "240"], "72" : [ "0.84" , "248"], "73" : [ "0.85" , "255"], "74" : [ "0.86" , "263"], "75" : [ "0.87" , "271"], "76" : [ "0.88" , "279"], "77" : [ "0.89" , "288"], 
		 "78" : [ "0.90" , "296"], "79" : [ "0.91" , "305"], "80" : [ "0.92" , "315"], "81" : [ "0.93" , "324"], "82" : [ "0.94" , "334"], "83" : [ "0.95" , "344"], "84" : [ "0.96" , "355"], 
		 "85" : [ "0.97" , "366"], "86" : [ "0.98" , "377"], "87" : [ "0.99" , "388"], "88" : [ "1.00" , "400"] } ;

var eqFilter = {"1" : [ "0" , "LoCut"], "2" : [ "1" , "Lo-Shelf"], "3" : [ "2" , "PEQ"], "4" : [ "3" , "VEQ"],
		"5" : [ "4" , "Hi-Shelf"], "6" : [ "5" , "HiCut"] };	
		
// These messages can be displayed in the Info-Tab !!
var message = [
	"Any Personal Message" , "Message1" , "Message2", "Informations", "Other Infos 1", "Any Personal Message" ];
	
// These messages will be displayed in the Alert-Tabs !!
var alerts = [
	 "Request Values from the Console !!" , "Change and Send Values here !" , "Be careful with this feature !!" , "Message2", "Informations","Other Infos" ];

//===================== INITIAL FUNCTIONS ===========================

//  initial functions
function init() {

// Insert Parameters ...
	SelChanParams = local.parameters.addBoolParameter("Show SelChan Values", "", true);
	ShowNames = local.parameters.addBoolParameter("Show Names", "Show Names", true);
	ShowInfos = local.parameters.addBoolParameter("Show Infos", "Show Informations", false);
	ShowFaders = local.parameters.addBoolParameter("Show Fader Values", "Show Fader Values", false);
	AllowSend = local.parameters.addBoolParameter("Allow SendToConsole", "Allow Send-to-Console", false);
//	Advice = local.parameters.addStringParameter("After Changing above", "Alert","You must reload the session");
	RequestInfo = local.values.addStringParameter("Request Sync","Request Action", "Request and Sync");
	SyncAll = local.values.addTrigger("Click to Sync All", "Request all the Values from the Console !!" , false);
	ResetAll = local.values.addTrigger("Click to Reset All", "Reset all the Value-Fields !!" , false);
	SendInfo = local.values.channels.addStringParameter("Channel Info", "Info","Sending Values here!");
	Sending = local.values.channels.addTrigger("Click to Send Updates", "Send Updated Values to the Console" , false);
	Alert = local.values.channels.addStringParameter("Advice", "Alert","Request Sync First");
	
// insert containers...	
	if (ShowInfos.get()) {
	infos=local.values.addContainer("Infos");
		infos.setCollapsed(true);	
		for (var i = 1; i<=16; i++) {
		infos.addStringParameter("Info "+(i), "","");} }
		
//Names Container		
	names=local.values.addContainer("Names");
		names.setCollapsed(true);	
		for (var n = 0; n < trackName.length; n++) {
			names.addStringParameter(trackName[n], "", ""); } 

//Faders Container		
	faders = local.values.faders.addContainer("Channel Faders");
		faders.setCollapsed(true);	
		for (var n = 0; n < faderName.length-11; n++) {
			faders.addFloatParameter(faderName[n], "", 0, 0, 1); } 		
	faders = local.values.faders.addContainer("Bus DCA Faders");
		faders.setCollapsed(true);
		for (var n = 21; n < faderName.length; n++) {
			faders.addFloatParameter(faderName[n], "", 0, 0, 1); } 
		
//Channel Strips
	
		for (var i = 1; i<=16; i++) {
//	strips = local.values.channels.addContainer("Channel"+(i));
	chan = local.values.channels.addContainer("Channel"+(i));
		chan.addStringParameter("Name", "","");
		chan.addFloatParameter("Fader", "", 0);
		chan.addFloatParameter("Pan","", 0 , -50, 50);
		chan.addBoolParameter("Mute", "", false);
		chan.addBoolParameter("EQ", "", false);
		chan.addBoolParameter("LoCut", "", false);
		chan.addBoolParameter("Dyn", "", false);
		chan.addBoolParameter("Gate", "", false);
		chan.setCollapsed(true);}
		
		for (var i = 1; i<=6; i++) {
//	strips = local.values.channels.addContainer("Bus"+(i));
	chan = local.values.channels.addContainer("Bus"+(i));
		chan.addStringParameter("Name", "","");
		chan.addFloatParameter("Fader", "", 0);
		chan.addFloatParameter("Pan","", 0 , -50, 50);
		chan.addBoolParameter("Mute", "", false);
		chan.addBoolParameter("EQ", "", false);
		chan.addBoolParameter("Dyn", "", false);
		chan.setCollapsed(true);}
		
//	strips = local.values.channels.addContainer("Main LR");
	chan = local.values.channels.addContainer("Main LR");
		chan.addStringParameter("Name", "","");
		chan.addFloatParameter("Fader", "", 0);
		chan.addFloatParameter("Pan","", 0, -50, 50);
		chan.addBoolParameter("Mute", "", false);
		chan.addBoolParameter("EQ", "", false);
		chan.addBoolParameter("Dyn", "", false);
		chan.setCollapsed(true);

//Selected Channel	
	selchan = local.values.selectedChannel;
		selchan.setCollapsed(true);
		selchan.addTrigger("Click to Sync", "" , false);
		selchan.addTrigger("Reset Value Fields", "" , false);
		var champs = util.getObjectProperties(selChann);
		for (var n = 0; n < champs.length; n++) {
			if (selChann[champs[n]][1] == "f") {
			selchan.addFloatParameter(selChann[champs[n]][0], "", 0); }
			else if (selChann[champs[n]][1] == "b") {
			selchan.addBoolParameter(selChann[champs[n]][0], "", false); }
			else if (selChann[champs[n]][1] == "in") {
			selchan.addIntParameter(selChann[champs[n]][0], "", 0); } 
			else if (selChann[champs[n]][1] == "s") {
			selchan.addStringParameter(selChann[champs[n]][0], "", ""); } }		
	
}

//===================== VALUE CHANGE EVENTS===========================

function moduleValueChanged(value) { 

// >>>>>>>>>>>>>>> RESET ALL <<<<<<<<<<<<<
	if (value.name == "clickToResetAll"){
	
//reset Names
		for (var n = 0; n < trackName.length; n++) {
		tName = trackName[n].split(" ").join("");
		local.values.names.getChild(tName).set("");  }
//reset Faders
		for (var n = 0; n < faderName.length-11; n++) {
		tName = faderName[n].split(" ").join("");
		local.values.faders.channelFaders.getChild(tName).set(0);  }
		for (var n = 21; n < faderName.length; n++) {
		tName = faderName[n].split(" ").join("");
		local.values.faders.busDCAFaders.getChild(tName).set(0);  }
//reset Channels		
		for (var n = 0; n < chanName.length; n++) {
		tName = chanName[n].split(" ").join("");
		local.values.channels.getChild(tName).getChild('Name').set("");
		local.values.channels.getChild(tName).getChild('Fader').set(0);
		local.values.channels.getChild(tName).getChild('Pan').set(0);
		local.values.channels.getChild(tName).getChild('Mute').set(0);
		local.values.channels.getChild(tName).getChild('EQ').set(0);
		local.values.channels.getChild(tName).getChild('Dyn').set(0); }
		for (var n = 0; n < chanName.length-7; n++) {
		tName = chanName[n].split(" ").join("");
		local.values.channels.getChild(tName).getChild('LoCut').set(0);
		local.values.channels.getChild(tName).getChild('Gate').set(0); }
				
	}
// <<<<<<<<<<<RESET ALL FIN >>>>>>>>>>>>>>>>>>> 

// >>>>>>>>>>>RESET SELECTED CHANNEL <<<<<<<<<<<<<<<<<<<<<<<
	
//Selected Channel Reset All
		if (value.name == "resetValueFields"){
		var champs = util.getObjectProperties(selChann);
		for (var n = 0; n < champs.length; n++) {
		var item = selChann[champs[n]][2] ;
		var par = selChann[champs[n]][1];
		if (par == "s") {
			local.values.selectedChannel.getChild(item).set("");}
		else if (par == "b") {
			local.values.selectedChannel.getChild(item).set(0);}  }	 
		}		

// >>>>>>>>>>>>>>>>>> REQUEST DATA FOR SELECTED CHANNEL <<<<<<<<<<<<<<<<<<<<<<<
//Selected Channel >>>>
	if (value.name == "clickToSync"){ 
		var targ=local.values.selectedChannel.selectTarget.get();
		var no=local.values.selectedChannel.selectNo.get();
		if(targ=="ch" && no < 10){no = "0"+no ;} else {no=no ;}
		if (targ=="lr") {var link = targ ;}
		else {link = targ+"/"+no ;}		
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
		if (targ=="lr" || targ=="bus") {var c = 6 ;} else {c=4;}
		for(var i=1; i <=c; i++) {
			local.send("/"+link+"/eq/"+i+"/f");
			local.send("/"+link+"/eq/"+i+"/g");
			local.send("/"+link+"/eq/"+i+"/q");
			local.send("/"+link+"/eq/"+i+"/type"); }		
		}

// >>>>>>>>>>>>>>>>>> REQUEST SYNC ALL <<<<<<<<<<<<<<<<<<<<<<<		
//Sync All Channel Strips
 	if (value.name == "clickToSyncAll"){ 

 		local.send("/xinfo");
 		local.send("/status");
// set Advices and Alerts
 		var alert = alerts[0];
 		local.values.requestSync.set(alert) ;
 		var alert = alerts[1];
 		local.values.channels.channelInfo.set(alert) ;
 		var alert = alerts[2];
 		local.values.channels.advice.set(alert) ;
	
// you can customize and choose how many and what messages you wann show up in the "Infos-Fiels"
/*		local.values.infos.info15.set(text);
		var text = message[1];
		local.values.infos.info16.set(text);   }
*/

// >>>>>>>>>>>>>>>>>> SUBSCRIBE ACTIONS <<<<<<<<<<<<<<<<<<<<<<<<<<		
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

// >>>>>>>>>>>>>>>>>> SEND DATA TO THE CONSOLE <<<<<<<<<<<<<<<<<<<<<<<		
	if (value.name == "clickToSendUpdates"){
	if (AllowSend.get()) {
		for(var i=1; i <=16; i++) {
		var val = local.values.channels.getChild('Channel'+i).getChild('Name').get();
 		if (i<10){n="0"+i;} else{n=i;}
		local.send("/ch/"+n+"/config/name", val);}
		for(var i=1; i <=6; i++) {
		var val = local.values.channels.getChild('Bus'+i).getChild('Name').get();
		local.send("/bus/"+i+"/config/name", val);}
		var val = local.values.channels.mainLR.getChild('Name').get();
		local.send("/lr/config/name", val);
		
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
		local.send("/ch/"+n+"/gate/on", val);} }
		
		} 		 	
 }
 
//========================  KEEP ALIVE  ======================
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
	if (ShowInfos.get()) {
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
	if (ShowNames.get()) {				
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
	if (ShowFaders.get()) {				
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
		local.values.faders.busDCAFaders.getChild('DCA'+i).set(args[0]);} }	}		
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
		if (SelChanParams.get()) {
		
		var targ=local.values.selectedChannel.selectTarget.get();
		var no=local.values.selectedChannel.selectNo.get();
		if(targ=="ch" && no < 10){no = "0"+no ;} else {no=no ;}
		if (targ=="lr") {var link = targ ;}
		else {link = targ+"/"+no ;}
		
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
		var champs = util.getObjectProperties(dynRatio);
		for (var n = 0; n < champs.length; n++) {
		if (r == dynRatio[champs[n]][0]) {t= dynRatio[champs[n]][1] ;} }
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
		var champs = util.getObjectProperties(loCutF);
		for (var n = 0; n < champs.length; n++) {
		if (f >= loCutF[champs[n]][0] && f < loCutF[champs[n+1]][0]) { hp= loCutF[champs[n]][1] ;} 
		if (f == 1.0) { hp= 400 ;}}
		local.values.selectedChannel.loCutFreq.set(hp+"  Hz");}		
		
//Selected Channel EQ	
		if (targ=="lr" || targ=="bus") {var c = 6 ;} else {c=4;}	
		for(var i=1; i <= c; i++) {
		if (address == "/"+link+"/eq/"+i+"/g") {
		var g = Math.round((args[0]-0.5)*300)/10 ;
		local.values.selectedChannel.getChild('GainEq'+i).set(g+" db");}
		
		if (address == "/"+link+"/eq/"+i+"/f") {		
		var f= args[0]; 		
		var champs = util.getObjectProperties(freqF);
		for (var n = 0; n < champs.length; n++) {
		if (f >= freqF[champs[n]][0] && f < freqF[champs[n+1]][0]) { tx= freqF[champs[n]][1] ;} }
		local.values.selectedChannel.getChild('FreqEq'+i).set(tx+"  Hz");}
		
		if (address == "/"+link+"/eq/"+i+"/q") {
		var l = args[0];
		var champs = util.getObjectProperties(freqQ);
		for (var n = 0; n < champs.length; n++) {
		if (l >= freqQ[champs[n]][0] && l < freqQ[champs[n+1]][0]) { q= freqQ[champs[n]][1] ;} }
		local.values.selectedChannel.getChild('QEq'+i).set(q+"");}
		
		if (address == "/"+link+"/eq/"+i+"/type") {
		var filt = args[0];
		var champs = util.getObjectProperties(eqFilter);
		for (var n = 0; n < champs.length; n++) {
		if (filt == eqFilter[champs[n]][0]) {txt= eqFilter[champs[n]][1] ;} }
		local.values.selectedChannel.getChild('typeEq'+i).set(txt);} } }
		
//Selected Channel Special Resets
		if (targ=="lr" || targ=="bus") {
		local.values.selectedChannel.loCutOn.set(0);
		local.values.selectedChannel.gateOn.set(0);
		local.values.selectedChannel.invert.set(0);
		local.values.selectedChannel.loCutFreq.set("");}
		
		if (targ=="ch" || targ=="rtn") {
		for(var i=5; i <= 6; i++) {
		local.values.selectedChannel.getChild('GainEq'+i).set("");
		local.values.selectedChannel.getChild('FreqEq'+i).set("");
		local.values.selectedChannel.getChild('QEq'+i).set("");
		local.values.selectedChannel.getChild('TypeEq'+i).set("");}	 }
		
		if (targ=="rtn") {	
		local.values.selectedChannel.loCutOn.set(0);
		local.values.selectedChannel.dynOn.set(0);
		local.values.selectedChannel.gateOn.set(0);
		local.values.selectedChannel.invert.set(0);
		local.values.selectedChannel.dynThreshold.set("");
		local.values.selectedChannel.dynRatio.set("");
		local.values.selectedChannel.dynOutGain.set("");}
		
		if (targ=="fxsend") {	
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
