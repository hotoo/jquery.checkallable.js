/**
 * Check All checkbox & radio box.
 * @author 闲耘 (hotoo.cn[AT]gmail.com)
 * @version 1.0, 2010/07/07
 */
(function($){
    $.fn.checkallable = function(option){
        return this.each(function(){
            var ME = this,
                name = $(this).attr("name"),
                type = $(this).attr("type"),
                val = $(this).val(),
                checked = this.checked,
                lastCheck = null;

            if(type=="checkbox"){
                defaults = $.extend(defaults, {"name":name}, option);

                $(this).click(function(){
                    checkAll(defaults.name, "checkbox", this.checked);
                });
                $("input[type=checkbox][name="+defaults.name+"]").live("click", function(evt){
                    if(this==ME){return;}
                    if(evt.shiftKey && lastCheck!=null && lastCheck!=this){
                        var cs = $("input[type=checkbox][name="+name+"]"),
                            state = lastCheck.checked;
                        for(var i=0,inRange=false,l=cs.length; i<l; i++){
                            if(cs[i]==lastCheck || cs[i]==this){
                                if(!inRange){
                                    inRange = true;
                                    cs[i].checked = state;
                                    continue;
                                }else{
                                    inRange = false;
                                    cs[i].checked = state;
                                    break;
                                }
                            }
                            if(inRange){
                                cs[i].checked = state;
                            }
                        }
                    }
                    lastCheck = this;
                    sync(ME, defaults.name);
                    if(defaults.callback){defaults.callback.call(this, this.checked);}
                });
            }else if(type=="radio"){
                defaults = $.extend(defaults, {"prefix":name}, option);

                $(this).click(function(){
                    checkAll(defaults.prefix, "radio", true, val);
                });
                $("input[type=radio][name^="+defaults.prefix+"]").live("click", function(evt){
                    if(evt.shiftKey && lastCheck!=null && lastCheck!=this){
                        var cs = $("input[type=radio][name^="+defaults.prefix+"]"),
                            state = true;
                        for(var i=0,inRange=false,l=cs.length; i<l; i++){
                            if(cs[i]==lastCheck || cs[i]==this){
                                if(!inRange){
                                    inRange = true;
                                    cs[i].checked = state;
                                    continue;
                                }else{
                                    inRange = false;
                                    cs[i].checked = state;
                                    break;
                                }
                            }
                            if(inRange){
                                cs[i].checked = state;
                            }
                        }
                    }
                    lastCheck = this;
                    syncRadio(ME, defaults.prefix, val);
                    if(defaults.callback){defaults.callback.call(this, this.checked);}
                });
            }
        });
    };
    var defaults = {
        name: null, // default: same the driven checkbox.
        checked: null,
        validate: function(){return true;},
        callback: null
    };
    /**
     * @param {String} name Element name.
     * @param {String} type Element type enum(checkbox,radio).
     * @param {Boolean} check Status for check it.
     * @param {String} val, Optional, just for radio select.
     */
    var checkAll = function(name, type, check, val){
        var sel;
        if(type=="checkbox"){
            sel = "input[type=checkbox][name="+name+"]";
        }else if(type=="radio"){
            //                           ^prefix
            sel = "input[type=radio][name^="+name+"][value="+val+"]"
        }else{
            return;
        }
        $(sel).each(function(){
            if(!defaults.validate.call(this)){return;}
            this.checked = check;
            if(defaults.callback){defaults.callback.call(this, check);}
        })
    };
    // sync the driving checkbox and drive checkbox.
    var sync = function(checkbox, name){
        name = name||$(checkbox).attr("name");
        var cs = $("input[type=checkbox][name="+name+"]"),
            total=0, checkes=0;
        for(var i=0,l=cs.length; i<l; i++){
            if(cs[i]==checkbox){continue;}
            if(!defaults.validate.call(cs[i])){continue;}
            total++;
            if(cs[i].checked){
                checkes++;
            }
        }
        if(total==0){return;}
        if(total==checkes){checkbox.checked = true;}
        else{checkbox.checked = false;}
    };
    var syncRadio = function(radio, prefix, val){
        prefix = prefix||$(checkbox).attr("name");
        var cs = $("input[type=radio][name^="+prefix+"][value="+val+"]"),
            total=0, checkes=0;
        for(var i=0,l=cs.length; i<l; i++){
            if(cs[i]==radio){continue;}
            if(!defaults.validate.call(cs[i])){continue;}
            total++;
            if(cs[i].checked){
                checkes++;
            }
        }
        if(total==0){return;}
        if(total==checkes){radio.checked = true;}
        else{radio.checked = false;}
    };

    $.fn.checked = function(sel){
        return $(sel).filter(":checked");
    };
})(jQuery);
