## Midas MR and Behringer X-Air control with chataigne by OSC
Default port must be 10024 !

Thanks to "norbertrostaing". This MR-Module-Script  is partially based on his M32 Script and he helped also for the Meter-Display !
In a more general way the module is based on the OSC-Implementation published by Behringer on their Wiki Website : https://behringer.world/wiki/doku.php?id=x-air_osc     

Most of the commands and actions run for both, MR12 and MR18 (and Behringer XR12 to XR18); but some of them will work only for a given model !   
The Player-Functions for example are valid only for MR12   
And please be aware that the number of available Channels and Busses etc depends on the model (MR-12 or 18; XR 12, 16, or 18) !

### Updated to version 2.3.5  (Mars 2024)
Added now Color-Feedback and new SYNC-All-Function - special thanks to [Niklasberlin](https://github.com/niklasberlin/Midas-MR-Chataigne-Module) !     
And thanks to [Norbertrostaing](https://github.com/norbertrostaing) , we have feedback for Meters also !       
We have Feedback from the MR/X-Air Console for Names and Fader-Levels, Colors, EQ, Mute, Dyn and Pan Status etc... 
There is also a Feedback-Tab called **"Selected Channel"**. You can select a given channel by Target and Number and get its (pretty)full feedback as : color, name, fader, eq- and dyn-settings etc, etc...  After changing the target or the channel-number just hit "Click To Sync" to request the new values from the console. And you can also Reset the whole Selected-Channel-Form by clicking the "Reset-Button".   
There is also a "radio-button" called "Show SelChan Values" (up in the Parameter section) that has to be checked to show the values.   
    
The **"Click to Reset All"** Button will reset ALL value-fields in the Containers and Forms-Fields ! But will NOT affect any value on the console as it does not send Data outside Chataigne !  

You can also send values directly from the **"Channels-Tab"** to the console, for example after having changed a value in a given Channel Field in Chataigne ! Checking the Radio Button **"Allow Send-to-Console"** will activate this feature -> but does not send any data yet, if the button is unchecked (=> default-setting) !!   
Please use this feature carefully, as you may erase settings and values on the console !!  For example if you hit "SEND" before having any datas and values in the form-fields, this will indeed results in a sort of "RESET" on the console !! In fact, the function **"Click To Send Updates"** will send all the values (and also the "zero-values" !!) of all the **Channel-Container**-Fields at once to the console !! And if the fields are empty (or set to zero), the result is a complète RESET of the Console's Channels Values !
But this concerns only the container named **"Channels"** !       
The best way to proceed is :  
Before sending any data from Chataigne to the console by the Channel-Tab's "form-fields", **first request all** the data from the console by **"Click To Sync All"**. This action is "request only"; than make eventually changes in the Channels-Fields and send them back to the console by **"Click To Send Updates"**.     
The "Send-to-Console" Function is limited to the **Channels Container** only - (just to avoid risks and confusion); any other "Value-Tab" does not send any Value to the console !
Please use "States" and "Actions" to control the console properly !

To get Feedback from the console in a general way, "Listen to Feedback" in the Parameter-Field must be activated ! (it is "ON" by default when inserting a MR-Module).   
To stop all feedback from the console just deactivate the "Listen to Feedback" Button  
 
***Please note that after  inserting a "new" MR-Module and/or after changing the Remote-Host-Address, Feedback from the console may not be available immediatly and may need a "Save" (cmd-S) and  "Reload" (cmd-shift-O) of the Session-File.***   
(*unless you had already entered the right "remoteHost address" in the "module.json" file before loading the module; in this case Feedback will be available instantly ! ... just use the "Sync" buttons.*) But anyway, once the session file is "saved" then the feedback will always be available !   
