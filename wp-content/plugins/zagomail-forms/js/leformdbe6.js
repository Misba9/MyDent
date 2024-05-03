"use strict";
var leform_vars = {};
var leform_consts = {};
var leform_sending = false;
var leform_popup_loading = false;
var leform_popup_active_id = null;
var leform_seq_pages = {};
var leform_signatures = {};
var leform_mobile = (function(a){if(/(android|bb\d+|meego).+mobile|android|ipad|playbook|silk|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))return true; else return false;})(navigator.userAgent||navigator.vendor||window.opera);
var leform_uploads = {};
var leform_sessions = {};
if (typeof leform_customjs_handlers == typeof undefined) {
	var leform_customjs_handlers = {};
}
if (window.jQuery) {
	jQuery("a").each(function() {
		var leform_id = jQuery(this).attr("href");
		if (leform_id) {
			var prefix = "#leformx-";
			var leform_idx = leform_id.indexOf(prefix);
			if (leform_idx >= 0) {
				jQuery(this).on("click", function(e) {
					e.preventDefault();
					return false;
				});
			}
		}
	});
	var now = new Date();
	leform_consts = {
		"url"			: window.location.href,
		"page-title"	: jQuery(document).find("title").text(),
		"ip" 			: "",
		"user-agent"	: navigator.userAgent,
		"date"			: now.getFullYear()+"-"+(now.getMonth()+1 < 10 ? "0"+(now.getMonth()+1) : (now.getMonth()+1))+"-"+(now.getDate() < 10 ? "0"+now.getDate() : now.getDate()),
		"time"			: (now.getHours() < 10 ? "0"+now.getHours() : now.getHours())+":"+(now.getMinutes() < 10 ? "0"+now.getMinutes() : now.getMinutes()),
		"wp-user-login"	: "",
		"wp-user-email"	: ""
	};
	jQuery(document).ready(function(){
		if (typeof leform_ajax_url != 'undefined') {
			leform_vars["mode"] = "local";
			leform_vars["method"] = "post";
			leform_vars["ajax-url"] = leform_ajax_url;
			leform_vars["popup-overlays"] = leform_overlays;
			leform_vars["ga-tracking"] = leform_ga_tracking;
			leform_vars["ignore-status"] = "off";
			leform_ready();
		} else {
			leform_vars["mode"] = "remote";
			leform_vars["method"] = "get";
			if (jQuery("#leform-remote").length == 0 || !jQuery("#leform-remote").attr("data-handler")) {
				alert('Make sure that you properly included leform.js. Currently you did not.');
			}
			leform_vars["ajax-url"] = jQuery("#leform-remote").attr("data-handler");
			
			var handler_parser = document.createElement('a');
			handler_parser.href = leform_vars["ajax-url"];
			var location_parser = document.createElement('a');
			location_parser.href = location;
			if (typeof handler_parser.hostname != typeof undefined && typeof location_parser.hostname != typeof undefined && handler_parser.hostname == location_parser.hostname) leform_vars["method"] = "post";
			
			if (jQuery("#leform-remote").attr("data-is")) leform_vars["ignore-status"] = "on";
			jQuery('head').append("<style>#leform-ready{display:none;width:0px;height:0px;}</style>");
			var inline_ids = new Array();
			var i = 0;
			jQuery(".leform-inline").each(function() {
				var inline_id = jQuery(this).attr("data-id");
				if (inline_id) {
					jQuery(this).attr("id", "leform-inline-"+i);
					inline_ids.push(inline_id);
					i++;
				}
			});
			jQuery('body').append("<div id='leform-ready'></div>");
			jQuery.ajax({
				url		: 	leform_vars['ajax-url'],
				data	: 	{"action" : "leform-remote-init", "form-ids" : inline_ids.join(','), "ignore-status" : leform_vars["ignore-status"], "hostname" : window.location.hostname},
				method	:	(leform_vars["method"] == "get" ? "get" : "post"),
				dataType:	(leform_vars["method"] == "get" ? "jsonp" : "json"),
				async	:	true,
				success	: function(return_data) {
					try {
						var data, temp;
						if (typeof return_data == 'object') data = return_data;
						else data = jQuery.parseJSON(return_data);
						if (data.status == "OK") {
							leform_vars["popup-overlays"] = data["overlays"];
							leform_vars["ga-tracking"] = data["ga-tracking"];
							leform_vars["plugins"] = data["plugins"];
							var inline_form = data["inline-forms"];
							for (var i=0; i<(data["inline-forms"]).length; i++){
								jQuery("#leform-inline-"+i).html((data["inline-forms"])[i]);
							}
							if (typeof data["resources"]["css"] != 'undefined') {
								for (var i=0; i<(data["resources"]["css"]).length; i++){
									jQuery('head').append("<link href='"+(data["resources"]["css"])[i]+"' rel='stylesheet' type='text/css' media='all' />");
								}
							}
							if (typeof data["resources"]["js"] != 'undefined') {
								for (var i=0; i<(data["resources"]["js"]).length; i++){
									if (typeof data["resources"]["js"][i] === typeof '') {
										jQuery('body').append("<script src='"+(data["resources"]["js"])[i]+"' type='text/javascript'></script>");
									} else if (typeof data["resources"]["js"][i] === typeof {}) {
										temp = "<script type='text/javascript'";
										for (var option_key in data["resources"]["js"][i]) {
											if (data["resources"]["js"][i].hasOwnProperty(option_key)) {
												temp += " "+leform_escape_html(option_key)+"='"+leform_escape_html(data["resources"]["js"][i][option_key])+"'";
											}
										}
										temp += "></script>";
										jQuery('body').append(temp);
									}
								}
							}
							if (data.hasOwnProperty("consts")) {
								if (typeof Object.assign == "function") {
									leform_consts = Object.assign(leform_consts, data["consts"]);
								} else {
									for (var key in data["consts"]) {
										if (data["consts"].hasOwnProperty(key)) {
											leform_consts[key] = data["consts"][key];
										}
									}
								}
							}
							var counter = 50;
							var ready = function() {
								counter--;
								if (counter == 0) {
									console.log("Can't load style.css.");
									return;
								}
								var width =  jQuery("#leform-ready").width();
								if (width == 1) {
									leform_ready();
								} else {
									setTimeout(ready, 200);
								}
							}
							ready();
						}
					} catch(error) {
						console.log(error);
					}
				},
				error	: 	function(XMLHttpRequest, textStatus, errorThrown) {
					console.log(errorThrown);
				}
			});
			
		}
		jQuery(window).on('beforeunload', function(e){
			var session_length;
			if (!jQuery.isEmptyObject(leform_sessions)) {
				for (var form_id in leform_sessions) {
					session_length = jQuery(".leform-form-"+form_id).attr("data-session");
					if (leform_is_numeric(session_length) && session_length > 0) {							
						if (leform_sessions.hasOwnProperty(form_id)) {
							if (leform_sessions[form_id]["modified"] == true) {
								leform_write_cookie("leform-session-"+form_id, JSON.stringify(leform_sessions[form_id]["values"]), session_length);
							}
						}
					}
				}
			}
			return;
		});
	});
} else {
	alert('leform.js requires jQuery to be loaded. Please include jQuery library above leform.js. Do not use "defer" or "async" option to load jQuery.');
}

function leform_ready() {
	leform_resize();
	jQuery(window).resize(function() {
		leform_resize();
	});
	var processed_forms = new Array();
	var processed_form_ids = new Array();
	jQuery(".leform-form").each(function(){
		var id = jQuery(this).attr("data-id");
		var form_id = jQuery(this).attr("data-form-id");
		if (processed_forms.indexOf(id) >= 0) return true;
		processed_forms.push(id);
		if (processed_form_ids.indexOf(form_id) < 0) processed_form_ids.push(form_id);
	});
	if (processed_form_ids.length > 0) {
		jQuery.ajax({
			url		: 	leform_vars['ajax-url'],
			data	: 	{"action" : "leform-front-add-impression", "form-ids" : processed_form_ids.join(","), "hostname" : window.location.hostname},
			method	:	(leform_vars["method"] == "get" ? "get" : "post"),
			dataType:	(leform_vars["method"] == "get" ? "jsonp" : "json"),
			async	:	true,
			success	: function(return_data) {
				try {
					var data;
					if (typeof return_data == 'object') data = return_data;
					else data = jQuery.parseJSON(return_data);
					if (data.status == "OK") {
						if (data.hasOwnProperty("consts")) {
							if (typeof Object.assign == "function") {
								leform_consts = Object.assign(leform_consts, data["consts"]);
							} else {
								for (var key in data["consts"]) {
									if (data["consts"].hasOwnProperty(key)) {
										leform_consts[key] = data["consts"][key];
									}
								}
							}
							leform_consts_update(null, data["consts"]);
						}
					}
				} catch(error) {
					console.log(error);
				}
			},
			error	: 	function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(errorThrown);
			}
		});
	}
	for (var i=0; i<processed_forms.length; i++) {
		leform_reset_form(processed_forms[i]);
		leform_handle_visibility(processed_forms[i], null, true);
		jQuery(".leform-form-"+processed_forms[i]).each(function(){
			var page_id = jQuery(this).attr("data-page");
			if (leform_is_visible(processed_forms[i], page_id)) {
				jQuery(".leform-progress-"+processed_forms[i]+".leform-progress-outside[data-page="+page_id+"]").show();
				jQuery(this).show();
				return false;
			}
		});
		if (leform_customjs_handlers.hasOwnProperty(processed_forms[i])) {
			leform_customjs_handlers[processed_forms[i]].errors = {};
			if (leform_customjs_handlers[processed_forms[i]].hasOwnProperty("afterinit") && typeof leform_customjs_handlers[processed_forms[i]].afterinit == 'function') {
				try {
					leform_customjs_handlers[processed_forms[i]].afterinit();
				} catch(error) {
				}
			}
		}
	}
	jQuery("a").each(function() {
		var leform_id = jQuery(this).attr("href");
		if (leform_id) {
			var prefix = "#leformx-";
			var leform_idx = leform_id.indexOf(prefix);
			if (leform_idx >= 0) {
				leform_id = leform_id.substr(leform_idx+prefix.length);
				jQuery(this).on("click", function(e) {
					e.preventDefault();
					var leform_id = jQuery(this).attr("href");
					var prefix = "#leformx-";
					var leform_idx = leform_id.indexOf(prefix);
					leform_id = leform_id.substr(leform_idx+prefix.length);
					leform_popup_open(leform_id);
					return false;
				});
			}
		}
	});
	leform_mask_init("input.leform-mask");
	leform_datepicker_init("input.leform-date");
	leform_timepicker_init("input.leform-time");
	leform_signature_init("canvas.leform-signature");
	leform_rangeslider_init("input.leform-rangeslider");
	for (var i=0; i<processed_form_ids.length; i++) {
		leform_tooltips_init(".leform-form-"+processed_form_ids[i], processed_form_ids[i], "dark");
	}
	
	var leform_id = window.location.hash;
	var prefix = "#leformx-";
	var leform_idx = leform_id.indexOf(prefix);
	if (leform_idx >= 0) {
		leform_id = leform_id.substr(leform_idx+prefix.length);
		if (leform_id.length > 0) {
			leform_popup_open(leform_id);
			leform_onload_displayed = true;
		}
	}
	jQuery(window).resize();
	console.log("Green Forms is ready to go!");
}
function leform_resize() {
	jQuery(".leform-form").each(function(){
		var collapse_width = parseInt(jQuery(this).attr("data-collapse"), 10);
		var form_width = jQuery(this).parent().width();
		if (form_width <= collapse_width) jQuery(this).addClass("leform-collapsed");
		else jQuery(this).removeClass("leform-collapsed");
	});
	if (leform_popup_active_id) {
		var viewport = {
			width: Math.max(20, jQuery(window).width()),
			height: Math.max(20, jQuery(window).height())
		};
		var width = parseInt(jQuery("#leform-popup-"+leform_popup_active_id).outerWidth(), 10);
		var height = parseInt(jQuery("#leform-popup-"+leform_popup_active_id).outerHeight(), 10);
		
		var margin_top = Math.min(parseInt(viewport.height/2, 10), parseInt(height/2, 10));
		
		jQuery("#leform-popup-"+leform_popup_active_id).css({
			"margin-left" : "-"+parseInt(width/2, 10)+"px",
			"margin-top" : "-"+margin_top+"px"
		});
	}
	if (typeof SignaturePad != typeof undefined) {
		jQuery(".leform-signature").each(function(){
			var form_id = jQuery(this).closest(".leform-form").attr("data-id");
			var element_id = jQuery(this).closest(".leform-element").attr("data-id");
			var current_image;
			var box = jQuery(this).parent();
			var box_width = jQuery(box).width();
			var canvas_width = jQuery(this).width();
			var canvas_height = jQuery(this).height();
			canvas_width = Math.max(canvas_width, 10);
			canvas_height = Math.max(canvas_height, 10);
			if (canvas_width != box_width && box_width > 0) {
				var ctx = this.getContext("2d");
				current_image = ctx.getImageData(0,0,canvas_width,canvas_height);
				jQuery(this).width(box_width);
				jQuery(this).attr("width", box_width);
				ctx.putImageData(current_image, parseInt((box_width-canvas_width)/2, 10), 0);
			}
		});
	}
}
function leform_datepicker_init(_set) {
	if (leform_vars["mode"] == "remote" && leform_vars["plugins"].indexOf("airdatepicker") >= 0 && typeof jQuery.fn.airdatepicker == typeof undefined) {
		setTimeout(function(){leform_datepicker_init(_set);}, 1000);
	}
	if (typeof jQuery.fn.airdatepicker == typeof undefined) return;
	jQuery(_set).each(function(){
		var object = this;
		var airdatepicker = jQuery(object).airdatepicker().data('airdatepicker');
		airdatepicker.destroy();
		jQuery(object).airdatepicker({
			inline_popup	: true,
			autoClose		: true,
			timepicker		: false,
			dateFormat		: jQuery(object).attr("data-format"),
			language		: jQuery(object).attr("data-locale"),
			onSelect		: function(formattedDate, date, inst) {
				leform_input_changed(object);
			},
			onShow			: function(inst, animationCompleted) {
				var content;
				var min_type = jQuery(object).attr("data-min-type");
				var min_value = jQuery(object).attr("data-min-value");
				var min_date = null;
				switch(min_type) {
					case 'today':
						min_date = new Date();
						break;
					case 'yesterday':
						min_date = new Date();
						min_date.setDate(min_date.getDate() - 1);
						break;
					case 'tomorrow':
						min_date = new Date();
						min_date.setDate(min_date.getDate() + 1);
						break;
					case 'offset':
						min_date = new Date();
						min_date.setDate(min_date.getDate() + parseInt(min_value, 10));
						break;
					case 'date':
						min_date = leform_date(min_value, jQuery(object).attr("data-format"));
						break;
					case 'field':
						content = jQuery(object).closest(".leform-container");
						if (jQuery(content).find("input[name='leform-"+min_value+"']").length > 0) min_date = leform_date(jQuery(content).find("input[name='leform-"+min_value+"']").val(), jQuery(object).attr("data-format"));
						break;
					default:
						break;
				}
				if (min_date != null) inst.update('minDate', min_date);
				var max_type = jQuery(object).attr("data-max-type");
				var max_value = jQuery(object).attr("data-max-value");
				var max_date = null;
				switch(max_type) {
					case 'today':
						max_date = new Date();
						break;
					case 'yesterday':
						max_date = new Date();
						max_date.setDate(max_date.getDate() - 1);
						break;
					case 'tomorrow':
						max_date = new Date();
						max_date.setDate(max_date.getDate() + 1);
						break;
					case 'offset':
						max_date = new Date();
						max_date.setDate(max_date.getDate() + parseInt(max_value, 10));
						break;
					case 'date':
						max_date = leform_date(max_value, jQuery(object).attr("data-format"));
						break;
					case 'field':
						content = jQuery(object).closest(".leform-container");
						if (jQuery(content).find("input[name='leform-"+max_value+"']").length > 0) max_date = leform_date(jQuery(content).find("input[name='leform-"+max_value+"']").val(), jQuery(object).attr("data-format"));
						break;
					default:
						break;
				}
				if (max_date != null) inst.update('maxDate', max_date);
			}
		});
		jQuery(object).parent().find("i").on("click", function(e){
			e.preventDefault();
			var input = jQuery(this).parent().children("input");
			var airdatepicker = jQuery(input).airdatepicker().data('airdatepicker');
			airdatepicker.show();
		});
	});
}
function leform_rangeslider_init(_set) {
	if (leform_vars["mode"] == "remote" && leform_vars["plugins"].indexOf("ion.rangeSlider") >= 0 && typeof jQuery.fn.ionRangeSlider == typeof undefined) {
		setTimeout(function(){leform_rangeslider_init(_set);}, 1000);
	}
	if (typeof jQuery.fn.ionRangeSlider == typeof undefined || !jQuery.fn.ionRangeSlider) return;
	jQuery(_set).ionRangeSlider({
		onChange: function (_data) {
			jQuery(_data.input).closest(".leform-input").find(".leform-element-error").fadeOut(300, function(){jQuery(this).remove();});
			leform_input_changed(_data.input);
		}
	});
}
function leform_tooltips_init(_container, _form_id, _theme) {
	if (leform_vars["mode"] == "remote" && leform_vars["plugins"].indexOf("tooltipster") >= 0 && (typeof jQuery.fn.tooltipster == typeof undefined || !jQuery.fn.tooltipster)) {
		setTimeout(function(){leform_tooltips_init(_container, _form_id, _theme);}, 1000);
	}
	if (typeof jQuery.fn.tooltipster == typeof undefined || !jQuery.fn.tooltipster) return;
	var theme = jQuery(".leform-form-"+_form_id).attr("data-tooltip-theme");
	if (theme != "light" && theme != "dark") theme = _theme;
	jQuery(_container).find("span.leform-tooltip-anchor, .leform-input[title], .leform-upload-input[title]").tooltipster({
		functionFormat: function(instance, helper, content){
			return "<div class='leform-tooltipster-content-"+_form_id+" leform-tooltipster-content-"+theme+"'>"+content+"</div>";
		},
		contentAsHTML:	true,
		maxWidth:		640,
		theme:			"tooltipster-"+theme
	});
}
function leform_signature_init(_set) {
	if (leform_vars["mode"] == "remote" && leform_vars["plugins"].indexOf("signature_pad") >= 0 && typeof SignaturePad == typeof undefined) {
		setTimeout(function(){leform_signature_init(_set);}, 1000);
	}
	if (typeof SignaturePad == typeof undefined) return;
	jQuery(_set).each(function(){
		var object = this;
		var box = jQuery(this).parent();
		var width = Math.max(box.width(), 40);
		var height = box.height();
		jQuery(this).width(width);
		jQuery(this).height(height);
		jQuery(this).attr("width", width);
		jQuery(this).attr("height", height);
		var signature_key = jQuery(this).closest(".leform-form").attr("data-id")+"-"+jQuery(this).closest(".leform-element").attr("data-id");
		var pen_color = jQuery(this).attr("data-color");
		if (typeof pen_color == typeof undefined) pen_color = "rgb(0,0,0,1);"
		leform_signatures[signature_key] = new SignaturePad(this, {
			penColor: pen_color,
			onBegin: function() {
				jQuery(object).closest(".leform-input").find(".leform-element-error").fadeOut(300, function(){jQuery(this).remove();});
			},
			onEnd: function() {
				var input = jQuery(object).closest(".leform-input").find("input");
				var data_url = "";
				if (!this.isEmpty()) data_url = this.toDataURL();
				jQuery(input).val(data_url);
				leform_input_changed(input);
			}
		});
		jQuery(this).parent().find("span").on("click", function(e){
			var input = jQuery(object).closest(".leform-input").find("input");
			jQuery(input).val("");
			leform_signatures[signature_key].clear();
			leform_input_changed(input);
		});
	});
}
var leform_in_onselect = false;
function leform_timepicker_init(_set) {
	if (leform_vars["mode"] == "remote" && leform_vars["plugins"].indexOf("airdatepicker") >= 0 && typeof jQuery.fn.airdatepicker == typeof undefined) {
		setTimeout(function(){leform_timepicker_init(_set);}, 1000);
	}
	if (typeof jQuery.fn.airdatepicker == typeof undefined) return;
	jQuery(_set).each(function(){
		var object = this;
		var airdatepicker = jQuery(object).airdatepicker().data('airdatepicker');
		airdatepicker.destroy();
		jQuery(object).airdatepicker({
			inline_popup	: true,
			autoClose		: true,
			timepicker		: true,
			onlyTimepicker	: true,
			minutesStep		: jQuery(object).attr("data-interval"),
			timeFormat		: jQuery(object).attr("data-format"),
			language		: jQuery(object).attr("data-locale"),
			onSelect		: function(formattedDate, date, inst) {
				if (leform_in_onselect) return;
				leform_in_onselect = true;
				var content;
				var selected_time_c = date.getHours()*100+date.getMinutes();
				var min_type = jQuery(object).attr("data-min-type");
				var min_value = jQuery(object).attr("data-min-value");
				var min_time = null;
				switch(min_type) {
					case 'time':
						min_time = leform_time24_str(min_value, jQuery(object).attr("data-format"));
						break;
					case 'field':
						content = jQuery(object).closest(".leform-container");
						if (jQuery(content).find("input[name='leform-"+min_value+"']").length > 0) min_time = leform_time24_str(jQuery(content).find("input[name='leform-"+min_value+"']").val(), jQuery(object).attr("data-format"));
						break;
					default:
						break;
				}
				if (min_time != null) {
					if (selected_time_c < parseInt(min_time.replace(":", ""), 10)) {
						inst.selectDate(new Date(2020, 0, 1, min_time.substr(0, 2), min_time.substr(3, 2)));
						leform_in_onselect = false;
						return;
					}
				}
				var max_type = jQuery(object).attr("data-max-type");
				var max_value = jQuery(object).attr("data-max-value");
				var max_time = null;
				switch(max_type) {
					case 'time':
						max_time = leform_time24_str(max_value, jQuery(object).attr("data-format"));
						break;
					case 'field':
						content = jQuery(object).closest(".leform-container");
						if (jQuery(content).find("input[name='leform-"+max_value+"']").length > 0) max_time = leform_time24_str(jQuery(content).find("input[name='leform-"+max_value+"']").val(), jQuery(object).attr("data-format"));
						break;
					default:
						break;
				}
				if (max_time != null) {
					if (selected_time_c > parseInt(max_time.replace(":", ""), 10)) {
						inst.selectDate(new Date(2020, 0, 1, max_time.substr(0, 2), max_time.substr(3, 2)));
						leform_in_onselect = false;
						return;
					}
						
				}
				leform_in_onselect = false;
			}
		});
		jQuery(object).parent().find("i").on("click", function(e){
			e.preventDefault();
			var input = jQuery(this).parent().children("input");
			var airdatepicker = jQuery(input).airdatepicker().data('airdatepicker');
			airdatepicker.show();
		});
	});
}
function leform_popup_open(_id) {
	var overlay_color = "rgba(0,0,0,0.7)";
	if (leform_popup_active_id == _id) return;
	if (leform_popup_active_id) leform_popup_active_close();
	if (jQuery("#leform-popup-"+_id).length > 0) {
		return _leform_popup_open(_id, true);
	} else {
		if (leform_vars["popup-overlays"].hasOwnProperty("leform-"+_id) && !leform_popup_loading && !leform_popup_active_id) {
			leform_popup_loading = true;
			if (leform_vars["popup-overlays"]["leform-"+_id][0] != "") overlay_color = leform_vars["popup-overlays"]["leform-"+_id][0];
			var overlay_html = "<div class='leform-popup-overlay' id='leform-popup-"+_id+"-overlay' style='background: "+overlay_color+";'></div>";
			jQuery('body').append(overlay_html);
			jQuery("#leform-popup-"+_id+"-overlay").fadeIn(300);
			var loader = "<style>#leform-popup-"+_id+"-loader .leform-popup-loader-triple-spinner {border-top-color:"+leform_vars["popup-overlays"]["leform-"+_id][2]+"} #leform-popup-"+_id+"-loader .leform-popup-loader-triple-spinner::before {border-top-color:"+leform_vars["popup-overlays"]["leform-"+_id][3]+"} #leform-popup-"+_id+"-loader .leform-popup-loader-triple-spinner::after {border-top-color:"+leform_vars["popup-overlays"]["leform-"+_id][4]+"}</style><div id='leform-popup-"+_id+"-loader' class='leform-popup-loader'><div class='leform-popup-loader-container'><div class='leform-popup-loader-triple-spinner'></div></div></div>";
			jQuery('body').append(loader);
			if (leform_vars["popup-overlays"]["leform-"+_id][1] == "on") {
				jQuery("#leform-popup-"+_id+"-overlay").on("click", function(e) {
					leform_popup_loading = false;
					jQuery(".leform-popup-loader").hide();
					jQuery(".leform-popup-loader").remove();
					//jQuery("#leform-popup-"+_id+"-overlay").off("click");
					if (jQuery("#leform-popup-"+_id).length == 0) {
						jQuery("#leform-popup-"+_id+"-overlay").fadeOut(300);
					} else {
						leform_popup_active_close();
					}
				});
			}
			var style = jQuery(".leform-form-"+_id).length > 0 ? "off" : "on";
			jQuery.ajax({
				url: 		leform_vars['ajax-url'],
				method:		(leform_vars["method"] == "get" ? "get" : "post"),
				dataType:	(leform_vars["method"] == "get" ? "jsonp" : "json"),
				async:		true,
				data: 		{"action" : "leform-front-popup-load", "form-id" : _id, "form-style" : style, "hostname" : window.location.hostname},
				success: 	function(return_data) {
					jQuery(".leform-popup-loader").hide();
					jQuery(".leform-popup-loader").remove();
					var data;
					try {
						if (typeof return_data == 'object') data = return_data;
						else data = jQuery.parseJSON(return_data);
						if (data.status == "OK") {
							if (!leform_popup_loading) return false;
							jQuery("#leform-popup-"+_id+"-overlay").html(data.html);
							leform_tooltips_init("#leform-popup-"+_id, _id, "dark");
							leform_mask_init("#leform-popup-"+_id+" input.leform-mask");
							_leform_popup_open(_id, false);
						} else {
							jQuery(".leform-popup-loader").hide();
							jQuery(".leform-popup-loader").remove();
							//jQuery("#leform-popup-"+_id+"-overlay").off("click");
							jQuery("#leform-popup-"+_id+"-overlay").fadeOut(300);
						}
					} catch(error) {
						console.log(error);
						jQuery(".leform-popup-loader").hide();
						jQuery(".leform-popup-loader").remove();
						//jQuery("#leform-popup-"+_id+"-overlay").off("click");
						jQuery("#leform-popup-"+_id+"-overlay").fadeOut(300);
					}
					leform_popup_loading = false;
				},
				error: 		function(XMLHttpRequest, textStatus, errorThrown) {
					console.log(errorThrown);
					jQuery(".leform-popup-loader").hide();
					jQuery(".leform-popup-loader").remove();
					//jQuery("#leform-popup-"+_id+"-overlay").off("click");
					jQuery("#leform-popup-"+_id+"-overlay").fadeOut(300);
					leform_popup_loading = false;
				}
			});
		}
	}
	return false;
}

function _leform_popup_open(_id, _overlay) {
	if (jQuery("#leform-popup-"+_id).length == 0) return false;
	leform_popup_active_id = _id;
	if (_overlay) {
		jQuery("#leform-popup-"+_id+"-overlay").fadeIn(300);
	}
	var form = jQuery("#leform-popup-"+_id).children(".leform-form").first();
	var form_id = jQuery(form).attr("data-id");
	var visible_page = null;
	leform_reset_form(form_id);
	jQuery(".leform-form-"+form_id).hide();
	jQuery(".leform-form-"+form_id).each(function(){
		var page_id = jQuery(this).attr("data-page");
		if (leform_is_visible(form_id, page_id)) {
			jQuery(".leform-progress-"+form_id+".leform-progress-outside[data-page="+page_id+"]").fadeIn(300);
			jQuery(this).fadeIn(300);
			visible_page = this;
			return false;
		}
	});

	leform_datepicker_init("#leform-popup-"+_id+" input.leform-date");
	leform_timepicker_init("#leform-popup-"+_id+" input.leform-time");
	jQuery("#leform-popup-"+_id).show();
	leform_signature_init("#leform-popup-"+_id+" canvas.leform-signature");
	leform_rangeslider_init("#leform-popup-"+_id+" input.leform-rangeslider");
	if (leform_mobile) {
		jQuery("#leform-popup-"+_id+"-overlay").css({"padding-right" : "0px"});
	}
	leform_handle_visibility(form_id, null, true);
	leform_resize();
	if (leform_customjs_handlers.hasOwnProperty(form_id)) {
		leform_customjs_handlers[form_id].errors = {};
		if (leform_customjs_handlers[form_id].hasOwnProperty("afterinit") && typeof leform_customjs_handlers[form_id].afterinit == 'function') {
			try {
				leform_customjs_handlers[form_id].afterinit();
			} catch(error) {
			}
		}
	}
	return false;
}

function leform_popup_active_close() {
	_leform_close(leform_popup_active_id);
	return false;
}

function _leform_close(_id) {
	leform_sending = false;
	leform_popup_active_id = null;
	
	jQuery("#leform-popup-"+_id).fadeOut(300, function() {
		jQuery("#leform-popup-"+_id+"-overlay").fadeOut(300);
		jQuery("#leform-popup-"+_id).find(".leform-popup").hide();
		jQuery("#leform-popup-"+_id).find(".leform-element-error").remove();
	});
	return false;
}
function leform_multiselect_changed(_object) {
	var container = jQuery(_object).closest(".leform-multiselect");
	var max_allowed = parseInt(jQuery(container).attr("data-max-allowed"), 10);
	if (max_allowed > 0) {
		var selected = jQuery(container).find("input:checked").length;
		if (selected >= max_allowed) {
			jQuery(container).find("input:not(:checked)").attr("disabled", "disabled");
		} else {
			jQuery(container).find("input:not(:checked)").removeAttr("disabled");
		}
	}
	leform_input_changed(_object);
}
function leform_input_changed(_object) {
	var element = jQuery(_object).closest(".leform-element");
	var type = jQuery(element).attr("data-type");
	var element_id = jQuery(element).attr("data-id");
	var form_uid = jQuery(_object).closest(".leform-form").attr("data-id");
	var form_id = jQuery(".leform-form-"+form_uid).attr("data-form-id");
	var session_length = jQuery(".leform-form-"+form_uid).attr("data-session");
	var session_enable = false;
	if (leform_is_numeric(session_length) && session_length > 0) session_enable = true;
	
	var var_values = new Array();
	var var_value = null;
	switch(type) {
		case 'signature':
			var_value = jQuery(_object).val();
			if (var_value != "") jQuery(".leform-form-"+form_uid).find(".leform-var-"+element_id).html("<img src='"+var_value+"' />");
			else jQuery(".leform-form-"+form_uid).find(".leform-var-"+element_id).text("");
			break;
		case 'file':
			jQuery(element).find(".leform-uploader-file-countable.leform-uploader-file-processed").each(function(){
				var_values.push(jQuery(this).attr("data-name"));
			});
			jQuery(".leform-form-"+form_uid).find(".leform-var-"+element_id).text(var_values.join(", "));
			break;
		case 'checkbox':
		case 'imageselect':
		case 'tile':
		case 'multiselect':
			jQuery(element).find("input").each(function(){
				if (jQuery(this).is(":checked")) var_values.push(jQuery(this).val());
			});
			if (session_enable) {
				leform_sessions[form_id]["values"][element_id] = var_values;
				leform_sessions[form_id]["modified"] = true;
			}
			jQuery(".leform-form-"+form_uid).find(".leform-var-"+element_id).text(var_values.join(", "));
			break;
		case 'rangeslider':
			var_value = jQuery(_object).val();
			if (session_enable) {
				leform_sessions[form_id]["values"][element_id] = var_value;
				leform_sessions[form_id]["modified"] = true;
			}
			var_value = var_value.replace(":", " ... ");
			jQuery(".leform-form-"+form_uid).find(".leform-var-"+element_id).text(var_value);
			break;
		case 'number':
			var_value = _leform_number_changed(_object);
			if (var_value === false) return false;
			if (session_enable) {
				leform_sessions[form_id]["values"][element_id] = jQuery(_object).val();
				leform_sessions[form_id]["modified"] = true;
			}
			jQuery(".leform-form-"+form_uid).find(".leform-var-"+element_id).text(jQuery(_object).val());
			break;
		default:
			var_value = jQuery(_object).val();
			if (session_enable) {
				leform_sessions[form_id]["values"][element_id] = var_value;
				leform_sessions[form_id]["modified"] = true;
			}
			jQuery(".leform-form-"+form_uid).find(".leform-var-"+element_id).text(var_value);
			break;
	}
	if (leform_customjs_handlers.hasOwnProperty(form_uid)) {
		leform_customjs_handlers[form_uid].errors = {};
		if (leform_customjs_handlers[form_uid].hasOwnProperty("afterupdate") && typeof leform_customjs_handlers[form_uid].afterupdate == 'function') {
			try {
				leform_customjs_handlers[form_uid].afterupdate(element_id);
			} catch(error) {
			}
		}
	}
	leform_handle_math(form_uid);
	var dependencies = jQuery(_object).closest(".leform-element").attr("data-deps").split(",");
	if (dependencies.length > 0) leform_handle_visibility(form_uid, dependencies, true);
	return false;
}
function _leform_number_changed(_object) {
	var decimal = parseInt(jQuery(_object).attr("data-decimal"), 10);
	var valid_value = jQuery(_object).attr("data-value");
	var value = jQuery(_object).val();
	var caret_position = _object.selectionStart;
	var value_parts = value.split(".");
	if (value == "" || value == "-" || value == ".") {
		jQuery(_object).attr("data-value", value);
		return true;
	}
	if (isNaN(parseFloat(value)) || !isFinite(value) || value_parts.length > 2 || (decimal == 0 && value_parts.length == 2)) {
		jQuery(_object).val(valid_value);
		_object.selectionStart = valid_value.length - (value.length - caret_position);
		_object.selectionEnd = valid_value.length - (value.length - caret_position);
		return false;
	}
	if (decimal > 0 && value_parts.length == 2 && (value_parts[1]).length > decimal) {
		value_parts[1] = (value_parts[1]).substr(0, decimal);
		value = value_parts.join(".");
		jQuery(_object).val(value);
		_object.selectionStart = caret_position;
		_object.selectionEnd = caret_position;
	}
	jQuery(_object).attr("data-value", value);
	return true;
}
function leform_number_unfocused(_object) {
	var min = jQuery(_object).attr("data-min");
	var max = jQuery(_object).attr("data-max");
	var value = jQuery(_object).val();
	if (!isNaN(parseFloat(value)) && isFinite(value)) {
		if (!isNaN(parseFloat(min)) && isFinite(min) && parseFloat(value) < parseFloat(min)) {
			jQuery(_object).val(min);
			leform_input_changed(_object);
		} else if (!isNaN(parseFloat(max)) && isFinite(max) && parseFloat(value) > parseFloat(max)) {
			jQuery(_object).val(max);
			leform_input_changed(_object);
		}
	}
}
function leform_numspinner_inc(_object) {
	var temp, start, end;
	var input = jQuery(_object).parent().find("input");
	var readonly = jQuery(input).attr("data-readonly");
	if (readonly == "on") return false;
	var value = jQuery(input).attr("data-value");
	var step = jQuery(input).attr("data-step");
	if (isNaN(parseFloat(step)) || !isFinite(step) || parseFloat(step) <= 0) {
		step = 1;
	}
	var decimal = parseInt(jQuery(input).attr("data-decimal"), 10);
	var mode = jQuery(input).attr("data-mode");
	if (mode == "simple") {
		var min = jQuery(input).attr("data-min");
		var max = jQuery(input).attr("data-max");
		if (isNaN(parseFloat(value)) || !isFinite(value)) {
			if (isNaN(parseFloat(min)) || !isFinite(min)) {
				value = 0;
			} else value = parseFloat(min);
		} else value = parseFloat(value);
		value = value + parseFloat(step);
		if (!isNaN(parseFloat(max)) && isFinite(max) && value > parseFloat(max)) value = parseFloat(max);
	} else {
		var raw_ranges = jQuery(input).attr("data-range");
		if (isNaN(parseFloat(value)) || !isFinite(value)) {
			value = 0;
		} else value = parseFloat(value);
		value = value + parseFloat(step);
		if (raw_ranges.length > 0) {
			var ranges = raw_ranges.split(",");
			for (var i=0; i<ranges.length; i++) {
				temp = ranges[i].split("...");
				start = parseFloat(temp[0]);
				if (temp.length > 1) end = parseFloat(temp[1]);
				else end = start;
				if (value < start) {
					value = start;
					break;
				} else if (value <= end) {
					break;
				} else if (i == ranges.length-1) {
					value = end;
					break;
				}
			}
		}
	}	
	jQuery(input).attr("data-value", value.toFixed(decimal));
	jQuery(input).val(value.toFixed(decimal));
	jQuery(input).closest(".leform-input").find(".leform-element-error").fadeOut(300, function(){jQuery(this).remove();});
	leform_input_changed(input);
	return false;
}
function leform_numspinner_dec(_object) {
	var temp, start, end;
	var input = jQuery(_object).parent().find("input");
	var readonly = jQuery(input).attr("data-readonly");
	if (readonly == "on") return false;
	var value = jQuery(input).attr("data-value");
	var step = jQuery(input).attr("data-step");
	var decimal = parseInt(jQuery(input).attr("data-decimal"), 10);
	var mode = jQuery(input).attr("data-mode");
	if (mode == "simple") {
		var min = jQuery(input).attr("data-min");
		var max = jQuery(input).attr("data-max");
		if (isNaN(parseFloat(value)) || !isFinite(value)) {
			if (isNaN(parseFloat(max)) || !isFinite(max)) {
				value = 0;
			} else value = parseFloat(max);
		} else value = parseFloat(value);
		if (isNaN(parseFloat(step)) || !isFinite(step) || parseFloat(step) <= 0) {
			step = 1;
		}
		value = value - parseFloat(step);
		if (!isNaN(parseFloat(min)) && isFinite(min) && value < parseFloat(min)) value = parseFloat(min);
	} else {
		var raw_ranges = jQuery(input).attr("data-range");
		if (isNaN(parseFloat(value)) || !isFinite(value)) {
			value = 0;
		} else value = parseFloat(value);
		value = value - parseFloat(step);
		if (raw_ranges.length > 0) {
			var ranges = raw_ranges.split(",");
			for (var i=ranges.length-1; i>=0; i--) {
				temp = ranges[i].split("...");
				start = parseFloat(temp[0]);
				if (temp.length > 1) end = parseFloat(temp[1]);
				else end = start;
				if (value > end) {
					value = end;
					break;
				} else if (value >= start) {
					break;
				} else if (i == 0) {
					value = start;
					break;
				}
			}
		}
	}	
	jQuery(input).attr("data-value", value.toFixed(decimal));
	jQuery(input).val(value.toFixed(decimal));
	jQuery(input).closest(".leform-input").find(".leform-element-error").fadeOut(300, function(){jQuery(this).remove();});
	leform_input_changed(input);
	return false;
}
function leform_is_visible(_form_id, _element_id) {
	var field, bool_value, field_values;
	var logic_rules = new Array();
	var logic = JSON.parse(jQuery("#leform-logic-"+_form_id).val());
	if (!logic.hasOwnProperty(_element_id)) return true;
	for (var i=0; i<logic[_element_id]['rules'].length; i++) {
		field = jQuery(".leform-form-"+_form_id).find("[name='leform-"+logic[_element_id]['rules'][i]['field']+"']");
		if (field.length == 0) field = jQuery(".leform-form-"+_form_id).find("[name='leform-"+logic[_element_id]['rules'][i]['field']+"[]']");
		field_values = new Array()
		jQuery(field).each(function(){
			var field_type = jQuery(this).attr("type");
			if (field_type == "checkbox" || field_type == "radio" || field_type == "multiselect" || field_type == "imageselect" || field_type == "tile" || field_type == "star-rating") {
				if (jQuery(this).is(":checked")) field_values.push(jQuery(this).val());
			} else field_values.push(jQuery(this).val());
		});
		bool_value = false;
		switch(logic[_element_id]['rules'][i]['rule']) {
			case 'is':
				if (field_values.indexOf(logic[_element_id]['rules'][i]['token']) >= 0) logic_rules.push(true);
				else logic_rules.push(false);
				break;
			case 'is-not':
				if (field_values.indexOf(logic[_element_id]['rules'][i]['token']) == -1) logic_rules.push(true);
				else logic_rules.push(false);
				break;
			case 'is-empty':
				for (var j=0; j<field_values.length; j++) {
					if (field_values[j] != null && field_values[j] != "") {
						bool_value = true;
						break;
					}
				}
				logic_rules.push(!bool_value);
				break;
			case 'is-not-empty':
				for (var j=0; j<field_values.length; j++) {
					if (field_values[j] != null && field_values[j] != "") {
						bool_value = true;
						break;
					}
				}
				logic_rules.push(bool_value);
				break;
			case 'is-greater':
				for (var j=0; j<field_values.length; j++) {
					if (parseFloat(field_values[j]) > parseFloat(logic[_element_id]['rules'][i]['token'])) {
						bool_value = true;
						break;
					}
				}
				logic_rules.push(bool_value);
				break;
			case 'is-less':
				for (var j=0; j<field_values.length; j++) {
					if (parseFloat(field_values[j]) < parseFloat(logic[_element_id]['rules'][i]['token'])) {
						bool_value = true;
						break;
					}
				}
				logic_rules.push(bool_value);
				break;
			case 'contains':
				for (var j=0; j<field_values.length; j++) {
					if (logic[_element_id]['rules'][i]['token'] != "" && field_values[j].indexOf(logic[_element_id]['rules'][i]['token']) >= 0) {
						bool_value = true;
						break;
					}
				}
				logic_rules.push(bool_value);
				break;
			case 'starts-with':
				for (var j=0; j<field_values.length; j++) {
					if (logic[_element_id]['rules'][i]['token'] != "" && field_values[j].substring(0, logic[_element_id]['rules'][i]['token'].length) === logic[_element_id]['rules'][i]['token']) {
						bool_value = true;
						break;
					}
				}
				logic_rules.push(bool_value);
				break;
			case 'ends-with':
				for (var j=0; j<field_values.length; j++) {
					if (logic[_element_id]['rules'][i]['token'] != "" && field_values[j].substring(field_values[j].length - logic[_element_id]['rules'][i]['token'].length) === logic[_element_id]['rules'][i]['token']) {
						bool_value = true;
						break;
					}
				}
				logic_rules.push(bool_value);
				break;
			default:
				break;
		}
	}
	bool_value = false;
	if (logic[_element_id]['operator'] == "and") {
		if (logic_rules.indexOf(false) == -1) bool_value = true;
	} else {
		if (logic_rules.indexOf(true) >= 0) bool_value = true;
	}
	if (logic[_element_id]['action'] == 'hide') bool_value = !bool_value;
			
	return bool_value;
}
function leform_handle_visibility(_form_id, _ids, _immediately) {
	if (jQuery("#leform-logic-"+_form_id).length == 0) return false;
	var logic = JSON.parse(jQuery("#leform-logic-"+_form_id).val());
	for (var key in logic) {
		if (logic.hasOwnProperty(key)) {
			if (Array.isArray(_ids) && _ids.indexOf(key) == -1) continue;
			if (leform_is_visible(_form_id, key)) {
				if (_immediately == true) jQuery(".leform-form-"+_form_id).find(".leform-element-"+key).show();
				else {
					jQuery(".leform-form-"+_form_id).find(".leform-element-"+key).css({"position" : "relative"});
					jQuery(".leform-form-"+_form_id).find(".leform-element-"+key).fadeIn(200);
				}
			} else {
				if (_immediately == true) jQuery(".leform-form-"+_form_id).find(".leform-element-"+key).hide();
				else {
					jQuery(".leform-form-"+_form_id).find(".leform-element-"+key).css({"position" : "absolute"});
					jQuery(".leform-form-"+_form_id).find(".leform-element-"+key).fadeOut(200);
				}
			}
		}
	}
	return false;
}
function leform_mask_init(_set) {
	if (leform_vars["mode"] == "remote" && leform_vars["plugins"].indexOf("jquery.mask") >= 0 && typeof jQuery.fn.mask == typeof undefined) {
		setTimeout(function(){leform_mask_init(_set);}, 1000);
	}
	if (typeof jQuery.fn.mask == typeof undefined) return;
	jQuery(_set).each(function(){
		var mask = jQuery(this).attr("data-xmask");
		if (mask) jQuery(this).mask(mask);
	});
}
function leform_submit(_object, _action) {
	var prev_page_id;
	var button_pressed = false;
	if (jQuery(_object).hasClass("leform-button")) button_pressed = true;
	var form_uid = jQuery(_object).closest(".leform-form").attr("data-id");
	var form_id = jQuery(_object).closest(".leform-form").attr("data-form-id");
	var page_id = jQuery(_object).closest(".leform-form").attr("data-page");
	var session_length = jQuery(_object).closest(".leform-form").attr("data-session");
	var allowed_actions = new Array("next", "prev", "submit");
	if (typeof _action == undefined || _action == "") _action = "submit";
	else if (allowed_actions.indexOf(_action) == -1) _action = "submit";
	jQuery(".leform-form-"+form_uid).find(".leform-element-error").fadeOut(300, function(){
		jQuery(this).remove();
	});
	if (_action == "prev") {
		leform_sending = false;
		if (leform_seq_pages.hasOwnProperty(form_uid) && leform_seq_pages[form_uid].length > 0) {
			prev_page_id = leform_seq_pages[form_uid][leform_seq_pages[form_uid].length-1];
			leform_seq_pages[form_uid].splice(leform_seq_pages[form_uid].length-1, 1);
			if (leform_popup_active_id) {
				jQuery("#leform-popup-"+leform_popup_active_id+" .leform-popup-close").fadeOut(300, function(){
					jQuery("#leform-popup-"+leform_popup_active_id+" .leform-popup-close").fadeIn(300);
				});
			}
			jQuery(".leform-progress-"+form_uid+".leform-progress-outside[data-page='"+page_id+"']").fadeOut(300);
			jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").fadeOut(300, function(){
				jQuery(".leform-form-"+form_uid+"[data-page='"+prev_page_id+"']").fadeIn(300);
				jQuery(".leform-progress-"+form_uid+".leform-progress-outside[data-page='"+prev_page_id+"']").fadeIn(300);
				leform_resize();
			});
			return false;
		} else return false;
	}
	
	if (button_pressed) {
		var original_icon = jQuery(_object).attr("data-original-icon");
		if (typeof original_icon === typeof undefined || original_icon === false) {
			original_icon = jQuery(_object).children("i").first().attr("class");
			if (typeof original_icon !== typeof undefined && original_icon !== false) {
				jQuery(_object).attr("data-original-icon", original_icon);
			}
		}
		jQuery(_object).children("i").first().attr("class", "leform-if leform-if-spinner leform-if-spin");
		jQuery(_object).find("span").text(jQuery(_object).attr("data-loading"));
	}
	
	jQuery(".leform-form-"+form_uid).find(".leform-button").addClass("leform-button-disabled");
	jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").children(".leform-confirmaton-message").slideUp(300, function(){
		jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").children(".leform-confirmaton-message").remove();
	});

	if (leform_uploads.hasOwnProperty(form_uid)) {
		var waiting_upload = false;
		for (var upload_id in leform_uploads[form_uid]) {
			if ((leform_uploads[form_uid]).hasOwnProperty(upload_id)) {
				if (leform_uploads[form_uid][upload_id] == "LOADING") {
					waiting_upload = true;
				}
			}
		}
		if (waiting_upload) {
			setTimeout(function(){
				leform_submit(_object, _action);
			}, 500);
			return false;
		}
	}
	
	if (leform_sending) return false;
	leform_sending = true;

	var all_pages = new Array();
	jQuery(".leform-form-"+form_uid).each(function(){
		all_pages.push(jQuery(this).attr("data-page"));
	});
	
	if (typeof SignaturePad != typeof undefined) {
		jQuery(".leform-form-"+form_uid).find(".leform-signature").each(function(){
			var element_id = jQuery(this).closest(".leform-element").attr("data-id");
			if (leform_signatures.hasOwnProperty(form_uid+"-"+element_id)) {
				var data_url = "";
				if (!(leform_signatures[form_uid+"-"+element_id]).isEmpty()) data_url = (leform_signatures[form_uid+"-"+element_id]).toDataURL();
				jQuery(this).closest(".leform-element").find("input").val(data_url);
			}
		});
	}

	var xd = jQuery(".leform-form-"+form_uid).attr("data-xd");
	if (!xd) xd = "off";

	var post_data = {"action" : "leform-front-"+_action, "form-id" : form_id, "page-id" : page_id, "form-data" : leform_encode64(jQuery(".leform-form-"+form_uid).find("textarea, input, select").serialize()), "hostname" : window.location.hostname, "page-title" : leform_consts["page-title"]};
	if (typeof leform_preview_mode != "undefined" && leform_preview_mode == "on") post_data["preview"] = "on";
	if (leform_customjs_handlers.hasOwnProperty(form_uid)) {
		leform_customjs_handlers[form_uid].errors = {};
		if (leform_customjs_handlers[form_uid].hasOwnProperty("beforesubmit") && typeof leform_customjs_handlers[form_uid].beforesubmit == 'function') {
			try {
				leform_customjs_handlers[form_uid].beforesubmit();
			} catch(error) {
			}
		}
	}
	jQuery.ajax({
		url		:	leform_vars['ajax-url'],
		data	:	post_data,
		method	:	(leform_vars["method"] == "get" && xd == "on" ? "get" : "post"),
		dataType:	(leform_vars["method"] == "get" && xd == "on" ? "jsonp" : "json"),
		async	:	true,
		success	: function(return_data) {
			try {
				var data, temp;
				if (typeof return_data == 'object') data = return_data;
				else data = jQuery.parseJSON(return_data);
				if (data.status == "OK") {
					if (data.hasOwnProperty("record-id")) {
						jQuery(".leform-form-"+form_uid+" .leform-const-record-id").text(data["record-id"]);
					}
					if (leform_is_numeric(session_length) && session_length > 0) {
						leform_write_cookie("leform-session-"+form_id, "", 0);
						if (leform_sessions.hasOwnProperty(form_id)) delete leform_sessions[form_id];
					}
					if (data.hasOwnProperty("error")) console.log(data["error"]);
					if (leform_customjs_handlers.hasOwnProperty(form_uid)) {
						leform_customjs_handlers[form_uid].errors = {};
						if (leform_customjs_handlers[form_uid].hasOwnProperty("aftersubmitsuccess") && typeof leform_customjs_handlers[form_uid].aftersubmitsuccess == 'function') {
							try {
								leform_customjs_handlers[form_uid].aftersubmitsuccess();
							} catch(error) {
							}
						}
					}
					if (data.hasOwnProperty("forms")) {
						jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").append(data["forms"]);
						jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").find(".leform-send").trigger("click");
					}
					switch (data.type) {
						case 'message-redirect':
						case 'message-payment':
						case 'message':
							if (data['reset-form'] == "on") leform_reset_form(form_uid);
							jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").append("<div class='leform-confirmaton-message leform-element leform-element-html'>"+data.message+"</div>");
							jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").children(".leform-confirmaton-message").slideDown(300, function() {
								leform_resize();
							});
							if (parseInt(data.delay, 10) > 0) {
								setTimeout(function(){
									jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").children(".leform-confirmaton-message").slideUp(300, function(){
										jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").children(".leform-confirmaton-message").remove();
										leform_resize();
									});
									if (data.type == 'message-redirect') location.href = data.url;
									else if (data.type == 'message-payment') {
										if (data.hasOwnProperty("payment-form")) {
											jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").append(data["payment-form"]);
											jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").find(".leform-pay").trigger("click");
										} else if (data.hasOwnProperty("payment-message")) {
											leform_popup_message_open(data["payment-message"]);
										} else if (data.hasOwnProperty("stripe")) {
											leform_stripe_checkout(data["stripe"]["public-key"], data["stripe"]["session-id"]);
										} else if (data.hasOwnProperty("payumoney")) {
											leform_payumoney_checkout(data["payumoney"]["request-data"]);
										}
									}
								}, 1000*parseInt(data.delay, 10));
							} else {
								if (data.type == 'message-payment') {
									if (data.hasOwnProperty("payment-form")) {
										jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").append(data["payment-form"]);
										jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").find(".leform-pay").trigger("click");
									} else if (data.hasOwnProperty("payment-message")) {
										leform_popup_message_open(data["payment-message"]);
									} else if (data.hasOwnProperty("stripe")) {
										leform_stripe_checkout(data["stripe"]["public-key"], data["stripe"]["session-id"]);
									} else if (data.hasOwnProperty("payumoney")) {
										leform_payumoney_checkout(data["payumoney"]["request-data"]);
									}
								}
							}
							break;
						case 'redirect':
							if (data['reset-form'] == "on") leform_reset_form(form_uid);
							location.href = data.url;
							break;
						case 'payment':
							if (data['reset-form'] == "on") leform_reset_form(form_uid);
							if (data.hasOwnProperty("payment-form")) {
								jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").append(data["payment-form"]);
								jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").find(".leform-pay").trigger("click");
							} else if (data.hasOwnProperty("payment-message")) {
								leform_popup_message_open(data["payment-message"]);
							} else if (data.hasOwnProperty("stripe")) {
								leform_stripe_checkout(data["stripe"]["public-key"], data["stripe"]["session-id"]);
							} else if (data.hasOwnProperty("payumoney")) {
								leform_payumoney_checkout(data["payumoney"]["request-data"]);
							}
							break;
						case 'page-redirect':
						case 'page-payment':
							if (parseInt(data.delay, 10) > 0) {
								setTimeout(function(){
									if (data['reset-form'] == "on") leform_reset_form(form_uid);
									if (data.type == 'page-redirect') location.href = data.url;
									else {
										if (data.hasOwnProperty("payment-form")) {
											jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").append(data["payment-form"]);
											jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").find(".leform-pay").trigger("click");
										} else if (data.hasOwnProperty("payment-message")) {
											leform_popup_message_open(data["payment-message"]);
										} else if (data.hasOwnProperty("stripe")) {
											leform_stripe_checkout(data["stripe"]["public-key"], data["stripe"]["session-id"]);
										} else if (data.hasOwnProperty("payumoney")) {
											leform_payumoney_checkout(data["payumoney"]["request-data"]);
										}
									}
								}, 1000*parseInt(data.delay, 10));
							} else {
								if (data.type == 'page-redirect') location.href = data.url;
								else {
									if (data.hasOwnProperty("payment-form")) {
										jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").append(data["payment-form"]);
										jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").find(".leform-pay").trigger("click");
									} else if (data.hasOwnProperty("payment-message")) {
										leform_popup_message_open(data["payment-message"]);
									} else if (data.hasOwnProperty("stripe")) {
										leform_stripe_checkout(data["stripe"]["public-key"], data["stripe"]["session-id"]);
									} else if (data.hasOwnProperty("payumoney")) {
										leform_payumoney_checkout(data["payumoney"]["request-data"]);
									}
								}
							}
						default:
							if (!leform_seq_pages.hasOwnProperty(form_uid)) leform_seq_pages[form_uid] = new Array();
							leform_seq_pages[form_uid].push(page_id);
							if (leform_popup_active_id) {
								jQuery("#leform-popup-"+leform_popup_active_id+" .leform-popup-close").fadeOut(300, function(){
									jQuery("#leform-popup-"+leform_popup_active_id+" .leform-popup-close").fadeIn(300);
								});
							}
							jQuery(".leform-progress-"+form_uid+".leform-progress-outside[data-page='"+page_id+"']").fadeOut(300);
							jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").fadeOut(300, function(){
								jQuery(".leform-progress-"+form_uid+".leform-progress-outside[data-page='confirmation']").fadeIn(300);
								jQuery(".leform-form-"+form_uid+"[data-page='confirmation']").fadeIn(300);
								if (leform_popup_active_id) {
									jQuery("#leform-popup-"+leform_popup_active_id+"-overlay").stop().animate({scrollTop: 0}, 300);
								} else {
									var element_top = jQuery(".leform-form-"+form_uid+"[data-page='confirmation']").offset().top;
									var viewport_top = jQuery(window).scrollTop();
									var viewport_bottom = viewport_top + jQuery(window).height();
									if (element_top < viewport_top || element_top > viewport_bottom) {
										jQuery('html, body').stop().animate({scrollTop: element_top-60}, 300);
									}
								}
								leform_resize();
							});
							break;
					}
					leform_track(form_uid, "leform", "submit");
				} else if (data.status == "NEXT") {
					if (!leform_seq_pages.hasOwnProperty(form_uid)) leform_seq_pages[form_uid] = new Array();
					leform_seq_pages[form_uid].push(page_id);
					if (leform_popup_active_id) {
						jQuery("#leform-popup-"+leform_popup_active_id+" .leform-popup-close").fadeOut(300, function(){
							jQuery("#leform-popup-"+leform_popup_active_id+" .leform-popup-close").fadeIn(300);
						});
					}
					jQuery(".leform-progress-"+form_uid+".leform-progress-outside[data-page='"+page_id+"']").fadeOut(300);
					jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").fadeOut(300, function(){
						jQuery(".leform-form-"+form_uid+"[data-page='"+data.page+"']").fadeIn(300);
						jQuery(".leform-progress-"+form_uid+".leform-progress-outside[data-page='"+data.page+"']").fadeIn(300);
						if (leform_popup_active_id) {
							jQuery("#leform-popup-"+leform_popup_active_id+"-overlay").stop().animate({scrollTop: 0}, 300);
						} else {
							var element_top = jQuery(".leform-form-"+form_uid+"[data-page='"+data.page+"']").offset().top;
							var viewport_top = jQuery(window).scrollTop();
							var viewport_bottom = viewport_top + jQuery(window).height();
							if (element_top < viewport_top || element_top > viewport_bottom) {
								jQuery('html, body').stop().animate({scrollTop: element_top-60}, 300);
							}
						}
						leform_resize();
					});
				} else if (data.status == "ERROR") {
					var min_index = null;
					for (var id in data["errors"]) {
						if (data["errors"].hasOwnProperty(id)) {
							temp = id.split(":");
							if (all_pages.indexOf(temp[0]) >= 0) {
								if (min_index == null) min_index = all_pages.indexOf(temp[0]);
								else if (all_pages.indexOf(temp[0]) < min_index) min_index = all_pages.indexOf(temp[0]);
							}
							jQuery(".leform-form-"+form_uid+"[data-page='"+temp[0]+"']").find(".leform-element-"+temp[1]).find(".leform-input").append("<div class='leform-element-error'><span>"+data["errors"][id]+"</span></div>");
							jQuery(".leform-form-"+form_uid+"[data-page='"+temp[0]+"']").find(".leform-element-"+temp[1]).find(".leform-uploader").append("<div class='leform-uploader-error'><span>"+data["errors"][id]+"</span></div>");
						}
					}
					if (min_index != null && all_pages[min_index] != page_id) {
						for (var i=min_index; i<all_pages.length; i++) {
							if (leform_seq_pages[form_uid].indexOf(all_pages[i]) >= 0) leform_seq_pages[form_uid].splice(leform_seq_pages[form_uid].indexOf(all_pages[i]), 1);
						}
						jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"']").fadeOut(300, function(){
							jQuery(".leform-form-"+form_uid+"[data-page='"+all_pages[min_index]+"']").fadeIn(300);
							page_id = all_pages[min_index];
							jQuery(".leform-form-"+form_uid).find(".leform-element-error, .leform-uploader-error").fadeIn(300);
						});
					} else jQuery(".leform-form-"+form_uid).find(".leform-element-error, .leform-uploader-error").fadeIn(300);
					jQuery(".leform-form-"+form_uid+"[data-page='"+page_id+"'] .leform-element").each(function(){
						if (jQuery(this).find(".leform-element-error, .leform-uploader-error").length > 0) {
							if (leform_popup_active_id) {
								jQuery("#leform-popup-"+leform_popup_active_id+"-overlay").stop().animate({scrollTop: 0}, 300);
								return false;
							} else {
								var element_top = jQuery(this).offset().top;
								var viewport_top = jQuery(window).scrollTop();
								var viewport_bottom = viewport_top + jQuery(window).height();
								if (element_top < viewport_top || element_top > viewport_bottom) {
									jQuery('html, body').stop().animate({scrollTop: element_top-60}, 300);
									return false;
								}
							}
						}
					});
				} else if (data.status == "FATAL") {
					
				} else {
					
				}
			} catch(error) {
				console.log(error);
			}
			if (button_pressed) {
				jQuery(_object).find("span").text(jQuery(_object).attr("data-label"));
				var original_icon = jQuery(_object).attr("data-original-icon");
				if (typeof original_icon !== typeof undefined && original_icon !== false) jQuery(_object).children("i").first().attr("class", original_icon);
			}
			jQuery(".leform-form-"+form_uid).find(".leform-button").removeClass("leform-button-disabled");
			leform_sending = false;
		},
		error	: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(errorThrown);
			if (button_pressed) {
				jQuery(_object).find("span").text(jQuery(_object).attr("data-label"));
				var original_icon = jQuery(_object).attr("data-original-icon");
				if (typeof original_icon !== typeof undefined && original_icon !== false) jQuery(_object).children("i").first().attr("class", original_icon);
			}
			jQuery(".leform-form-"+form_uid).find(".leform-button").removeClass("leform-button-disabled");
			leform_sending = false;
		}
	});
	return false;
}
function leform_popup_message_open(_html) {
	jQuery('body').append("<div class='leform-popup-message-overlay'></div>");
	jQuery(".leform-popup-message-overlay").fadeIn(300);
	jQuery('body').append("<div class='leform-popup-message'><div class='leform-popup-message-content'><span class='leform-popup-message-close' onclick='leform_popup_message_close();'><i class='leform-if leform-if-times'></i></span>"+_html+"</div></div>");
	jQuery(".leform-popup-message").fadeIn(300);
}
function leform_popup_message_close() {
	jQuery(".leform-popup-message").fadeOut(300, function(){
		jQuery(".leform-popup-message").remove();
		jQuery(".leform-popup-message-overlay").fadeOut(300, function(){
			jQuery(".leform-popup-message-overlay").remove();
		});
	});
}
function leform_handle_math(_form_uid) {
	if (leform_vars["mode"] == "remote" && leform_vars["plugins"].indexOf("jsep") >= 0 && typeof jsep == typeof undefined) {
		setTimeout(function(){leform_handle_math(_form_uid);}, 500);
	}
	jQuery(".leform-form-"+_form_uid).parent().find("input.leform-math").each(function(){
		var replacement, from_element, type, value, values, parse_tree, ref_date ;
		var id = jQuery(this).attr("data-id");
		var expression = jQuery(this).attr("data-expression");
		var var_value = jQuery(this).attr("data-default");
		var decimal_digits = parseInt(jQuery(this).attr("data-decimal"), 10);
		var ids_raw = jQuery(this).attr("data-ids");
		var ids = ids_raw.split(",");
		jQuery(this).val("");
		for (var j=0; j<ids.length; j++) {
			from_element = jQuery(".leform-form-"+_form_uid+" .leform-element-"+ids[j]);
			if (from_element.length > 0) {
				if (leform_is_visible(_form_uid, ids[j])) {
					type = jQuery(from_element).attr("data-type");
					switch (type) {
						case 'file':
							replacement = 0;
							jQuery(from_element).find(".leform-uploader-file-countable.leform-uploader-file-processed").each(function(){
								replacement++;
							});
							break;
						case 'date':
							value = leform_date(jQuery(from_element).find("input").val(), jQuery(from_element).find("input").attr("data-format"));
							ref_date = new Date(2000, 0, 1);
							if (value != null) {
								replacement = parseInt(Math.round((value-ref_date)/(1000*60*60*24)), 10);
							} else replacement = 'error';
							break;
						case 'time':
							replacement = 0;
							break;
						case 'email':
						case 'text':
						case 'number':
						case 'numspinner':
							value = jQuery(from_element).find("input").val();
							if (isNaN(parseFloat(value)) || !isFinite(value)) replacement = 'error';
							else replacement = parseFloat(value);
							break;
						case 'textarea':
							value = jQuery(from_element).find("textarea").val();
							replacement = parseFloat(value);
							break;
						case 'select':
							value = jQuery(from_element).find("select").val();
							if (isNaN(parseFloat(value)) || !isFinite(value)) replacement = 'error';
							else replacement = parseFloat(value);
							break;
						case 'radio':
						case 'checkbox':
						case 'imageselect':
						case 'tile':
						case 'multiselect':
						case 'star-rating':
							replacement = 0;
							jQuery(from_element).find("input").each(function(){
								if (jQuery(this).is(":checked")) {
									value = jQuery(this).val();
									if (isNaN(parseFloat(value)) || !isFinite(value)) {
										replacement = 'error';
										return false;
									}
									replacement += parseFloat(value);
								};
							});
							break;
						case 'rangeslider':
							value = jQuery(from_element).find("input").val();
							values = value.split(":");
							if (values.length == 1) {
								if (isNaN(parseFloat(value)) || !isFinite(value)) replacement = 'error';
								else replacement = parseFloat(value);
							} else if (values.length == 2) {
								if (isNaN(parseFloat(values[0])) || !isFinite(values[0]) || isNaN(parseFloat(values[1])) || !isFinite(values[1])) replacement = 'error';
								else replacement = (parseFloat(values[0]) + parseFloat(values[1]))/2;
							} else replacement = 'error';
							break;
						default:
							replacement = 0;
							break;
					}
				} else replacement = 0;
				expression = expression.split("{"+ids[j]+"}").join(replacement);
			} else {
				from_element = jQuery(".leform-form-"+_form_uid+" .leform-hidden[name='leform-"+ids[j]+"']");
				if (from_element.length > 0) {
					value = jQuery(from_element).val();
					if (isNaN(parseFloat(value)) || !isFinite(value)) replacement = 'error';
					else replacement = parseFloat(value);
					expression = expression.split("{"+ids[j]+"}").join(replacement);
				}
			}
		}
		if (typeof jsep != typeof undefined) {
			try {
				parse_tree = jsep(expression);
				if (parse_tree.type == 'Compound') value = parseFloat(expression);
				else {
					value = leform_jsep_calc(parse_tree);
				}
				if (value !== false) {
					jQuery(this).val(value);
					var_value = value.toFixed(decimal_digits);
				}
			} catch(error) {
			}
		}
		jQuery(".leform-form-"+_form_uid+" .leform-var-"+id).text(var_value);
	});
}
function leform_jsep_calc(_parse_tree) {
	var left, right;
	if (typeof _parse_tree != typeof {}) {
		return false;
	} else if (_parse_tree.type == "BinaryExpression") {
		left = leform_jsep_calc(_parse_tree.left);
		right = leform_jsep_calc(_parse_tree.right);
		if (left === false || right === false) return false;
		if (_parse_tree.operator == "+") return parseFloat(left+right);
		else if (_parse_tree.operator == "-") return parseFloat(left-right);
		else if (_parse_tree.operator == "*") return parseFloat(left*right);
		else if (_parse_tree.operator == "/" && right != 0) return parseFloat(left/right);
		else return false;
	} else if (_parse_tree.type == "UnaryExpression") {
		left = 0;
		right = leform_jsep_calc(_parse_tree.argument);
		if (_parse_tree.operator == "+") return parseFloat(left+right);
		else if (_parse_tree.operator == "-") return parseFloat(left-right);
		else if (_parse_tree.operator == "*") return parseFloat(left*right);
		else if (_parse_tree.operator == "/" && right != 0) return parseFloat(left/right);
		else return false;
	} else if (_parse_tree.type == "Literal") {
		return parseFloat(_parse_tree.value);
	} else return false;
}
function leform_consts_update(_form_uid, _consts) {
	var selector = ".leform-const";
	if (_form_uid != null) selector = ".leform-form-"+_form_uid+" .leform-const";
	jQuery(selector).each(function(){
		var element_id = jQuery(this).attr("data-id");
		if (_consts.hasOwnProperty(element_id)) {
			jQuery(this).text(_consts[element_id]);
		}
	});
}
function leform_reset_form(_form_uid) {
	var input, default_value = "";
	jQuery(".leform-form-"+_form_uid+" .leform-hidden").each(function(){
		var url_parameter = null;
		var element_id = jQuery(this).attr("data-id");
		var dynamic_parameter = jQuery(this).attr("data-dynamic");
		if (typeof dynamic_parameter != "undefined" && dynamic_parameter != "") {
			url_parameter = leftorm_query_parameter(dynamic_parameter);
		}
		if (url_parameter != null) default_value = url_parameter;
		else default_value = jQuery(this).attr("data-default");
		jQuery(this).val(default_value);
		jQuery(".leform-form-"+_form_uid+" .leform-var-"+element_id).text(default_value);
	});
	leform_consts_update(_form_uid, leform_consts);
	var form_id = jQuery(".leform-form-"+_form_uid).attr("data-form-id");
	leform_sessions[form_id] = {"modified" : false, "values" : {}};
	var session_length = jQuery(".leform-form-"+_form_uid).attr("data-session");
	var session_enable = false;
	if (leform_is_numeric(session_length) && session_length > 0) {
		session_enable = true;
		try {
			var cookie_session = JSON.parse(leform_read_cookie("leform-session-"+form_id));
			if (cookie_session != null) leform_sessions[form_id]["values"] = cookie_session;
		} catch(error) {
		}
	}
	jQuery(".leform-form-"+_form_uid+" .leform-element").each(function(){
		var url_parameters, url_parameter = null;
		var var_values = new Array();
		var type = jQuery(this).attr("data-type");
		var temp, upload_id;
		var element_id = jQuery(this).attr("data-id");
		var dynamic_parameter = jQuery(this).attr("data-dynamic");
		if (typeof dynamic_parameter != "undefined" && dynamic_parameter != "") {
			url_parameter = leftorm_query_parameter(dynamic_parameter);
		}
		switch (type) {
			case 'file':
				jQuery(this).find(".leform-uploader-files").html("");
				upload_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
				temp = leform_decode64(jQuery(this).find(".leform-uploader-template").val());
				temp = temp.replace(new RegExp("%%upload-id%%", 'g'), upload_id).replace(new RegExp("%%ajax-url%%", 'g'), leform_vars["ajax-url"]);
				jQuery(this).find(".leform-uploaders").html(temp);
				break;
			case 'date':
				input = jQuery(this).find("input");
				if (session_enable && leform_sessions.hasOwnProperty(form_id) && leform_sessions[form_id] != null && leform_sessions[form_id].hasOwnProperty("values") && leform_sessions[form_id]["values"] != null && leform_sessions[form_id]["values"].hasOwnProperty(element_id)) default_value = leform_sessions[form_id]["values"][element_id];
				else if (url_parameter != null) default_value = url_parameter;
				else {
					default_value = jQuery(input).attr("data-default");
					switch(default_value) {
						case 'today':
							temp = new Date();
							default_value = leform_date_str(temp, jQuery(input).attr("data-format"));
							break;
						case 'yesterday':
							temp = new Date();
							temp.setDate(temp.getDate() - 1);
							default_value = leform_date_str(temp, jQuery(input).attr("data-format"));
							break;
						case 'tomorrow':
							temp = new Date();
							temp.setDate(temp.getDate() + 1);
							default_value = leform_date_str(temp, jQuery(input).attr("data-format"));
							break;
						case 'offset':
							temp = new Date();
							temp.setDate(temp.getDate() + parseInt(jQuery(input).attr("data-offset"), 10));
							default_value = leform_date_str(temp, jQuery(input).attr("data-format"));
							break;
						default:
							break;
					}
					
				}
				jQuery(input).val(default_value);
				jQuery(".leform-form-"+_form_uid+" .leform-var-"+element_id).text(default_value);
				break;
			case 'email':
			case 'text':
			case 'time':
			case 'password':
			case 'number':
			case 'numspinner':
				input = jQuery(this).find("input");
				if (session_enable && leform_sessions.hasOwnProperty(form_id) && leform_sessions[form_id] != null && leform_sessions[form_id].hasOwnProperty("values") && leform_sessions[form_id]["values"] != null && leform_sessions[form_id]["values"].hasOwnProperty(element_id)) default_value = leform_sessions[form_id]["values"][element_id];
				else if (url_parameter != null) default_value = url_parameter;
				else default_value = jQuery(input).attr("data-default");
				jQuery(input).val(default_value);
				if (type == "numspinner") jQuery(input).attr("data-value", default_value);
				jQuery(".leform-form-"+_form_uid+" .leform-var-"+element_id).text(default_value);
				break;
			case 'textarea':
				input = jQuery(this).find("textarea");
				if (session_enable && leform_sessions.hasOwnProperty(form_id) && leform_sessions[form_id] != null && leform_sessions[form_id].hasOwnProperty("values") && leform_sessions[form_id]["values"] != null && leform_sessions[form_id]["values"].hasOwnProperty(element_id)) default_value = leform_sessions[form_id]["values"][element_id];
				else if (url_parameter != null) default_value = url_parameter;
				else default_value = leform_decode64(jQuery(input).attr("data-default"));
				jQuery(input).val(default_value);
				jQuery(".leform-form-"+_form_uid+" .leform-var-"+element_id).text(default_value);
				break;
			case 'select':
				input = jQuery(this).find("select");
				if (session_enable && leform_sessions.hasOwnProperty(form_id) && leform_sessions[form_id] != null && leform_sessions[form_id].hasOwnProperty("values") && leform_sessions[form_id]["values"] != null && leform_sessions[form_id]["values"].hasOwnProperty(element_id)) default_value = leform_sessions[form_id]["values"][element_id];
				else if (url_parameter != null) default_value = url_parameter;
				else default_value = jQuery(input).attr("data-default");
				jQuery(input).val(default_value);
				jQuery(".leform-form-"+_form_uid+" .leform-var-"+element_id).text(default_value);
				break;
			case 'checkbox':
			case 'imageselect':
			case 'tile':
			case 'radio':
			case 'multiselect':
			case 'star-rating':
				if (session_enable && leform_sessions.hasOwnProperty(form_id) && leform_sessions[form_id] != null && leform_sessions[form_id].hasOwnProperty("values") && leform_sessions[form_id]["values"] != null && leform_sessions[form_id]["values"].hasOwnProperty(element_id)) {
					jQuery(this).find("input").each(function(){
						default_value = jQuery(this).val();
						if ((Array.isArray(leform_sessions[form_id]["values"][element_id]) && (leform_sessions[form_id]["values"][element_id]).indexOf(default_value) >= 0) || default_value == leform_sessions[form_id]["values"][element_id]) {
							jQuery(this).prop("checked", true);
							var_values.push(default_value);
						} else jQuery(this).prop("checked", false);
					});
				} else if (url_parameter != null) {
					url_parameters = url_parameter.split(",");
					jQuery(this).find("input").each(function(){
						default_value = jQuery(this).val();
						if (url_parameters.indexOf(default_value) >= 0) {
							jQuery(this).prop("checked", true);
							var_values.push(jQuery(this).val());
						} else jQuery(this).prop("checked", false);
					});
				} else {
					jQuery(this).find("input").each(function(){
						default_value = jQuery(this).attr("data-default");
						if (default_value == "on") {
							jQuery(this).prop("checked", true);
							var_values.push(jQuery(this).val());
						} else jQuery(this).prop("checked", false);
					});
				}
				jQuery(".leform-form-"+_form_uid+" .leform-var-"+element_id).text(var_values.join(", "));
				break;
			case 'signature':
				if (typeof SignaturePad != typeof undefined) {
					if (leform_signatures.hasOwnProperty(_form_uid+"-"+element_id)) {
						(leform_signatures[_form_uid+"-"+element_id]).clear();
					}
				}
				break;
			case 'rangeslider':
				if (typeof jQuery.fn.ionRangeSlider != typeof undefined && jQuery.fn.ionRangeSlider) {
					jQuery(this).find("input").each(function(){
						if (session_enable && leform_sessions.hasOwnProperty(form_id) && leform_sessions[form_id] != null && leform_sessions[form_id].hasOwnProperty("values") && leform_sessions[form_id]["values"] != null && leform_sessions[form_id]["values"].hasOwnProperty(element_id)) default_value = leform_sessions[form_id]["values"][element_id];
						else default_value = jQuery(this).attr("data-default");
						var from_to = default_value.split(":");
						jQuery(this).attr("data-from", from_to[0]);
						if (from_to.length > 1) jQuery(this).attr("data-to", from_to[1]);
						jQuery(this).val(default_value);
						var rangeslider = jQuery(this).data("ionRangeSlider");
						if (typeof rangeslider != typeof undefined && rangeslider) {
							rangeslider.reset();
						}
						default_value = default_value.replace(":", " ... ");
						jQuery(".leform-form-"+_form_uid+" .leform-var-"+element_id).text(default_value);
					});
				}
				break;
			default:
				break;
		}
	});
	leform_handle_math(_form_uid);
}

function leform_track(_uid, _type, _action) {
	if (leform_vars['ga-tracking'] == "on") {
		try {
			var title = jQuery(".leform-form-"+_uid).first().attr("data-title");
			if (!title) title = 'Unknown form';
			if (typeof _gaq == 'object') {
				_gaq.push(['_trackEvent', _type, _action, title, 1, false]);
			} else if (typeof _trackEvent == 'function') { 
				_trackEvent(_type, _action, title, 1, false);
			} else if (typeof __gaTracker == 'function') { 
				__gaTracker('send', 'event', _type, _action, title);
			} else if (typeof ga == 'function') {
				ga('send', 'event', _type, _action, title);
			}
		} catch(error) {
		}
	}
}

function leform_uploader_files_selected(_object) {
	jQuery(_object).parent().trigger("submit");
}
function leform_uploader_file_delete(_object) {
	var file = jQuery(_object).closest(".leform-uploader-file");
	var name = jQuery(file).attr("data-name");
	var upload_id = jQuery(file).attr("data-upload");
	var form_uid = jQuery(_object).closest(".leform-form").attr("data-id");
	jQuery(file).slideUp(200, function(){
		var temp = jQuery(file).parent();
		jQuery(file).remove();
		leform_input_changed(temp);
		if (jQuery(".leform-uploader-file-"+upload_id).length == 0) {
			leform_uploads[form_uid][upload_id] = 'DELETED';
			jQuery("#"+upload_id).remove();
		}
	});
	var post_data = {"action" : "leform-upload-delete", "upload-id" : upload_id, "name" : name, "hostname" : window.location.hostname};
	jQuery.ajax({
		url		:	leform_vars['ajax-url'],
		data	:	post_data,
		method	:	(leform_vars["method"] == "get" ? "get" : "post"),
		dataType:	(leform_vars["method"] == "get" ? "jsonp" : "json"),
		async	:	true
	});
}
function leform_uploader_start(_object) {
	var temp;
	var upload_id = jQuery(_object).closest(".leform-uploader").attr("id");
	var form_uid = jQuery(_object).closest(".leform-form").attr("data-id");
	var form_element = jQuery(_object).closest(".leform-element");
	var max_size = parseInt(jQuery(form_element).attr("data-max-size"), 10)*1024*1024;
	var max_files = parseInt(jQuery(form_element).attr("data-max-files"), 10);
	temp = jQuery(form_element).attr("data-allowed-extensions");
	temp = temp.toLowerCase();
	var allowed_extensions = temp.split(",");
	temp = null;
	var countable_files = jQuery(_object).closest(".leform-upload-input").find(".leform-uploader-file-countable").length;
	var size_visual, ext, html = "";
	var error = false;
	var error_message = "";
	var files = jQuery(_object).find("input[type=file]")[0].files;
	if (files.length < 1) return false;
	for (var i=0; i<files.length; i++) {
		if (countable_files + files.length > max_files) {
			error = true;
			error_message = jQuery(form_element).attr("data-max-files-error");
			break;
		}
		ext = "."+(files[i].name).split(".").pop();
		ext = ext.toLowerCase();
		if (allowed_extensions.length > 0 && allowed_extensions[0] != "" && allowed_extensions.indexOf(ext) < 0) {
			error = true;
			error_message = jQuery(form_element).attr("data-allowed-extensions-error");
			break;
		}
		if (max_size > 0 && files[i].size > max_size) {
			error = true;
			error_message = jQuery(form_element).attr("data-max-size-error");
			break;
		}
		if (files[i].size > 4*1024*1024) size_visual = Math.round(10*files[i].size/(1024*1024))/10 + " Mb";
		else if (files[i].size > 4*1024) size_visual = Math.round(10*files[i].size/1024)/10 + " Kb";
		else size_visual = files[i].size + " bytes";
		html += "<div class='leform-uploader-file leform-uploader-file-"+upload_id+" leform-uploader-file-countable' data-upload='"+upload_id+"' data-name='"+leform_escape_html(files[i].name)+"' data-size='"+files[i].size+"'><div class='leform-uploader-file-title'>"+leform_escape_html(files[i].name)+" ("+size_visual+")</div><div class='leform-uploader-progress'>Uploading...</div><span onclick='return leform_uploader_file_delete(this);'><i class='leform-if leform-if-times'></i></span></div>";
	}
	if (error) {
		jQuery(_object).closest(".leform-uploader").append("<div class='leform-uploader-error'><span>"+error_message+"</span></div>");
		jQuery(_object).closest(".leform-uploader").find(".leform-uploader-error").fadeIn(300);
		return false;
	} else {
		jQuery(_object).closest(".leform-uploader").find(".leform-button").remove();
		var new_upload_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		temp = leform_decode64(jQuery(_object).closest(".leform-upload-input").find(".leform-uploader-template").val());
		temp = temp.replace(new RegExp("%%upload-id%%", 'g'), new_upload_id).replace(new RegExp("%%ajax-url%%", 'g'), leform_vars["ajax-url"]);
		jQuery(_object).closest(".leform-uploaders").append(temp);
		jQuery(_object).closest(".leform-upload-input").find(".leform-uploader-files").append(html);
		if (!leform_uploads.hasOwnProperty(form_uid)) leform_uploads[form_uid] = {};
		leform_uploads[form_uid][upload_id] = 'LOADING';
		leform_uploader_progress(form_uid, upload_id);
	}
}
function leform_uploader_finish(_object) {
	var upload_id = jQuery(_object).closest(".leform-uploader").attr("id");
	var form_uid = jQuery(_object).closest(".leform-form").attr("data-id");
	if (leform_uploads.hasOwnProperty(form_uid) && leform_uploads[form_uid].hasOwnProperty(upload_id) && leform_uploads[form_uid][upload_id] == "LOADING") {
		leform_uploads[form_uid][upload_id] = "UPLOADED";
	}
}
function leform_uploader_progress(_form_uid, _upload_id) {
	var post_data = {"action" : "leform-upload-progress", "upload-id" : _upload_id, "hostname" : window.location.hostname};
	if (leform_uploads[_form_uid][_upload_id] == "DELETED") return;
	else if (leform_uploads[_form_uid][_upload_id] == "UPLOADED") post_data["last-request"] = "on";
	jQuery.ajax({
		url		:	leform_vars['ajax-url'],
		data	:	post_data,
		method	:	(leform_vars["method"] == "get" ? "get" : "post"),
		dataType:	(leform_vars["method"] == "get" ? "jsonp" : "json"),
		async	:	true,
		success	: function(return_data) {
			try {
				var data, file_container, field_id;
				field_id = jQuery("#"+_upload_id).closest(".leform-element").attr("data-id");
				if (typeof return_data == 'object') data = return_data;
				else data = jQuery.parseJSON(return_data);
				if (data.status == "OK") {
					leform_uploads[_form_uid][_upload_id] = 'OK';
					if (data.hasOwnProperty("result")) {
						for (var i=0; i<data["result"].length; i++) {
							file_container = jQuery("#"+_upload_id).closest(".leform-upload-input").find(".leform-uploader-file-"+_upload_id+"[data-name='"+leform_escape_html(data["result"][i]["name"])+"']");
							if (data["result"][i]["status"] == "OK") {
								jQuery(file_container).find(".leform-uploader-progress").html("<div class='leform-uploader-progress-bar' style='width:100%;'></div>");
								jQuery(file_container).append("<input type='hidden' name='leform-"+field_id+"[]' value='"+leform_escape_html(data["result"][i]["uid"])+"' />");
							} else {
								jQuery(file_container).find(".leform-uploader-progress").html("<div class='leform-uploader-progress-error'>"+data["result"][i]["message"]+"</div>");
								jQuery(file_container).removeClass("leform-uploader-file-countable");
							}
							jQuery(file_container).addClass("leform-uploader-file-processed");
						}
					}
					jQuery("#"+_upload_id).closest(".leform-upload-input").find(".leform-uploader-file-"+_upload_id).each(function(){
						if (!jQuery(this).hasClass("leform-uploader-file-processed")) {
							jQuery(this).find(".leform-uploader-progress").html("<div class='leform-uploader-progress-error'>File can not be uploaded.</div>");
							jQuery(this).removeClass("leform-uploader-file-countable");
							jQuery(this).addClass("leform-uploader-file-processed");
						}
					});
					leform_input_changed("#"+_upload_id);
					jQuery("#"+_upload_id).remove();
				} else if (data.status == "LOADING") {
					if (data.hasOwnProperty("progress")) {
						for (var i=0; i<data["progress"].length; i++) {
							file_container = jQuery("#"+_upload_id).closest(".leform-upload-input").find(".leform-uploader-file-"+_upload_id+"[data-name='"+leform_escape_html(data["progress"][i]["name"])+"']");
							if (file_container.length > 0) {
								jQuery(file_container).find(".leform-uploader-progress").html("<div class='leform-uploader-progress-bar' style='width:"+Math.ceil(100*parseInt(data["progress"][i]["bytes_processed"]) / parseInt(jQuery(file_container).attr("data-size"), 10))+"%;'></div>");
							}
						}
					}
					setTimeout(function(){
						leform_uploader_progress(_form_uid, _upload_id);
					}, 500);
				} else {
					leform_uploads[_form_uid][_upload_id] = 'ERROR';
					jQuery("#"+_upload_id).closest(".leform-upload-input").find(".leform-uploader-file-"+_upload_id).each(function(){
						if (!jQuery(this).hasClass("leform-uploader-file-processed")) {
							jQuery(this).find(".leform-uploader-progress").html("<div class='leform-uploader-progress-error'>Internal Error!</div>");
							jQuery(this).removeClass("leform-uploader-file-countable");
							jQuery(this).addClass("leform-uploader-file-processed");
						}
					});
					jQuery("#"+_upload_id).remove();
				}
			} catch(error) {
				console.log(error);
				leform_uploads[_form_uid][_upload_id] = 'ERROR';
				jQuery("#"+_upload_id).closest(".leform-upload-input").find(".leform-uploader-file-"+_upload_id).each(function(){
					if (!jQuery(this).hasClass("leform-uploader-file-processed")) {
						jQuery(this).find(".leform-uploader-progress").html("<div class='leform-uploader-progress-error'>Internal Error!</div>");
						jQuery(this).removeClass("leform-uploader-file-countable");
						jQuery(this).addClass("leform-uploader-file-processed");
					}
				});
				jQuery("#"+_upload_id).remove();
			}
		},
		error	: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(errorThrown);
			leform_uploads[_form_uid][_upload_id] = 'ERROR';
			jQuery("#"+_upload_id).closest(".leform-upload-input").find(".leform-uploader-file-"+_upload_id).each(function(){
				if (!jQuery(this).hasClass("leform-uploader-file-processed")) {
					jQuery(this).find(".leform-uploader-progress").html("<div class='leform-uploader-progress-error'>Internal Error!</div>");
					jQuery(this).removeClass("leform-uploader-file-countable");
					jQuery(this).addClass("leform-uploader-file-processed");
				}
			});
			jQuery("#"+_upload_id).remove();
		}
	});
}
function leform_stripe_checkout(_public_key, _session_id) {
	try {
		var stripe = Stripe(_public_key, {betas: ['checkout_beta_4']});
		stripe.redirectToCheckout({sessionId: _session_id}).then(function (result) {
			console.log(result);
		});
	} catch(error) {
		console.log(error);
	}
}
function leform_payumoney_checkout(_request_data) {
	try {
		if (typeof bolt != typeof undefined) {
			var handler = {
				responseHandler: function(BOLT){
					console.log("Response");
					console.log(BOLT);
				},
				catchException: function(BOLT){
					console.log("Exception");
					console.log(BOLT);
				}
			}			
			bolt.launch(_request_data, handler);
		} else console.log('No bolt');
	} catch(error) {
		console.log(error);
	}
}
function leform_date(_date, _format) {
	var pattern = _format.replace('yyyy', '([0-9]{4})').replace('mm', '([0-9]{2})').replace('dd', '([0-9]{2})');
	var match = _date.match(pattern);
	if (!match || _format.length != _date.length) return null;
	var year = parseInt(_date.substr(_format.indexOf('yyyy'), 4), 10);
	var month = parseInt(_date.substr(_format.indexOf('mm'), 2), 10);
	var day = parseInt(_date.substr(_format.indexOf('dd'), 2), 10);
	var date = new Date(year, month-1, day);
	if (date.getDate() == day && date.getMonth() == month-1 && date.getFullYear() == year) return date;
	return null;
}
function leform_date_str(_date, _format) {
	var pattern = _format;
	var prefix = "";
	var temp = _date.getDate();
	if (temp < 9) prefix = "0";
	pattern = pattern.replace("dd", prefix+temp);
	temp = _date.getMonth() + 1;
	if (temp < 9) prefix = "0";
	else prefix = "";
	pattern = pattern.replace("mm", prefix+temp);
	temp = _date.getFullYear();
	pattern = pattern.replace("yyyy", temp);
	return pattern;
}

function leform_time24_str(_time, _format) {
	var pattern = _format.replace('hh', '([0-9]{2})').replace('ii', '([0-9]{2})').replace('aa', '(am|pm)');
	var match = _time.match(pattern);
	if (!match || _format.length != _time.length) return null;
	var hours = parseInt(_time.substr(_format.indexOf('hh'), 2), 10);
	if (hours < 0 || hours > 23) return null;
	var minutes = parseInt(_time.substr(_format.indexOf('ii'), 2), 10);
	if (minutes < 0 || minutes > 59) return null;
	var ampm = null;
	if (_format.indexOf('aa') >= 0) {
		ampm = _time.substr(_format.indexOf('aa'), 2);
		ampm = ampm.toLowerCase();
	}
	if (ampm != null && hours == 12) hours = 0;
	if (ampm == "pm") hours += 12;
	return (hours < 10 ? "0" : "")+hours+":"+(minutes < 10 ? "0" : "")+minutes;
}
function leftorm_query_parameter(_name) {
	var url = window.location.href;
	_name = _name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + _name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function leform_escape_html(_text) {
	if (!_text) return "";
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};
	return _text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
function leform_is_numeric(_text) {
	return !isNaN(parseInt(_text)) && isFinite(_text);
}
function leform_read_cookie(key) {
	var pairs = document.cookie.split("; ");
	for (var i = 0, pair; pair = pairs[i] && pairs[i].split("="); i++) {
		if (pair[0] === key) return pair[1] || "";
	}
	return null;
}
function leform_write_cookie(key, value, hours) {
	if (hours) {
		var date = new Date();
		date.setTime(date.getTime()+(hours*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	} else var expires = "; expires=0";
	document.cookie = key+"="+value+expires+"; path=/";
}
function leform_utf8encode(string) {
	string = string.replace(/\x0d\x0a/g, "\x0a");
	var output = "";
	for (var n = 0; n < string.length; n++) {
		var c = string.charCodeAt(n);
		if (c < 128) {
			output += String.fromCharCode(c);
		} else if ((c > 127) && (c < 2048)) {
			output += String.fromCharCode((c >> 6) | 192);
			output += String.fromCharCode((c & 63) | 128);
		} else {
			output += String.fromCharCode((c >> 12) | 224);
			output += String.fromCharCode(((c >> 6) & 63) | 128);
			output += String.fromCharCode((c & 63) | 128);
		}
	}
	return output;
}
function leform_encode64(input) {
	var keyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;
	input = leform_utf8encode(input);
	while (i < input.length) {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		output = output + keyString.charAt(enc1) + keyString.charAt(enc2) + keyString.charAt(enc3) + keyString.charAt(enc4);
	}
	return output;
}
function leform_utf8decode(input) {
	var string = "";
	var i = 0;
	var c = 0, c1 = 0, c2 = 0, c3 = 0;
	while ( i < input.length ) {
		c = input.charCodeAt(i);
		if (c < 128) {
			string += String.fromCharCode(c);
			i++;
		} else if ((c > 191) && (c < 224)) {
			c2 = input.charCodeAt(i+1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		} else {
			c2 = input.charCodeAt(i+1);
			c3 = input.charCodeAt(i+2);
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}
	return string;
}
function leform_decode64(input) {
	var keyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	while (i < input.length) {
		enc1 = keyString.indexOf(input.charAt(i++));
		enc2 = keyString.indexOf(input.charAt(i++));
		enc3 = keyString.indexOf(input.charAt(i++));
		enc4 = keyString.indexOf(input.charAt(i++));
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		output = output + String.fromCharCode(chr1);
		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}
	}
	output = leform_utf8decode(output);
	return output;
}