## Midas MR and Behringer X-Air control with chataigne by OSC
Default port must be 10024 !

most of the commands run for both MR12 and MR18; but some of them will work only for a given model !   
the Player-Functions for example are valid only for MR12   
and be aware that the available Channels and Busses etc are different regarding the model !

### Updated to version 1.5
Now we have Feedback from the MR/X-Air Console (Names and Fader-Levels etc)... I probably will add some more in the future...   
Please note that there is no continuous feedback  from the Console as the "xremote" command from the M32/X32 series is not valid here...   
So you have to update manually (or with a "loop-script") ! Any "Subscribe-Sync-Request" sent to the console will be valid for about 10 seconds and than stopps (values will not further update automatically !) )...
For manual Sync-Update you can use one of the function-scripts (in the Actions-Sub-Menu : Requests); or just hit the "Click to update all"-Button in the Values-Field....   
"Listen to Feedback" in the Parameter-Field must be activated ! (it is "ON" by default when inserting a MR-Module)   
And please note that after  inserting a "new" MR-Module and/or changing the Remote-Host-Address, Feedback from the console will be available only after a restart of Chataigne.
(**unless you had already entered the (remoteHost)address in the "module.json" file before inserting the module; in this case Feedback will be available instantly !**)    

For continuous feedback you can also insert the sync-request-commands into the "keepAlive"-Loop... but this will cause many many OSC-Traffic and this might slow down some other function in Chataigne; so be careful by doing that...

