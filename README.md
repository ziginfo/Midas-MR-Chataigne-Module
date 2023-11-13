## Midas MR and Behringer X-Air control with chataigne by OSC
Default port must be 10024 !

most of the commands run for both MR12 and MR18; but some of them will work only for a given model !   
the Player-Functions for example are valid only for MR12   
and be aware that the available Channels and Busses etc are different regarding the model (MR-12 or 18; XR 12, 16, or 18) !

### Updated to version 1.6
Now we have Feedback from the MR/X-Air Console (Names and Fader-Levels, EQ, Mute, Dyn and Pan Status etc)... I probably will add some more in the future...
Meters still do not work....  

"Listen to Feedback" in the Parameter-Field must be activated ! (it is "ON" by default when inserting a MR-Module)   
To initiate Feedback it may be necessary to hit the Sync-Button ("Click to update all") or send one of the Sync-Request-Actions (in the Action Menu "Requests")
And please note that after  inserting a "new" MR-Module and/or changing the Remote-Host-Address, Feedback from the console may be not available immediatly and may need a restart of Chataigne. 
(*unless you had already entered the "remoteHost address" in the "module.json" file before inserting the module; in this case Feedback will be available instantly !*) But anyway, once the session file is "saved" then the feedback will always be available !   

