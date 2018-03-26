/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore","jquery"],function(a,g){a.wa=function(a,b,d){this.Init(a,b,d)};o_("Message",a.wa,a);a.wa.Vq={CONFIRMATION:"confirmation",INFO:"info",WARNING:"warning",ERROR:"error",FATAL:"fatal"};o_("Message.SEVERITY_TYPE",a.wa.Vq,a);a.wa.xd={FATAL:5,ERROR:4,WARNING:3,INFO:2,CONFIRMATION:1};o_("Message.SEVERITY_LEVEL",a.wa.xd,a);a.f.ua(a.wa,a.f,"oj.Message");a.wa.prototype.Init=function(c,b,d){a.wa.N.Init.call(this);this.summary=c;this.detail=b;this.severity=d||a.wa.Vq.ERROR};a.f.j("Message.prototype.Init",
{Init:a.wa.prototype.Init});a.wa.prototype.yva=function(){return!0};a.wa.prototype.IB=function(c){return c&&a.wa.ay(this.severity)===a.wa.ay(c.severity)&&this.summary===c.summary&&this.detail===c.detail?!0:!1};a.f.j("Message.prototype.equals",{IB:a.wa.prototype.IB});a.wa.prototype.clone=function(){return new a.wa(this.summary,this.detail,this.severity)};a.f.j("Message.prototype.clone",{clone:a.wa.prototype.clone});a.wa.ay=function(c){c&&("string"===typeof c?(c=a.wa.C_.indexOf(c,1),c=-1===c?a.wa.xd.ERROR:
c):"number"===typeof c&&(c<a.wa.xd.CONFIRMATION||c>a.wa.xd.FATAL)&&(c=a.wa.xd.ERROR));return c?c:a.wa.xd.ERROR};o_("Message.getSeverityLevel",a.wa.ay,a);a.wa.g3a=function(c){var b;c&&("string"===typeof c?(b=a.wa.C_.indexOf(c,1),-1===b&&(c=a.wa.Vq.ERROR)):"number"===typeof c&&(c=c<a.wa.xd.CONFIRMATION||c>a.wa.xd.FATAL?a.wa.Vq.ERROR:a.wa.C_[c]));return c||a.wa.Vq.ERROR};o_("Message.getSeverityType",a.wa.g3a,a);a.wa.hG=function(c){var b=-1,d;c&&0<c.length&&g.each(c,function(c,f){f&&(d=a.wa.ay(f.severity));
b=b<d?d:b});return b};o_("Message.getMaxSeverity",a.wa.hG,a);a.wa.isValid=function(c){return a.wa.hG(c)>=a.wa.xd.ERROR?!1:!0};o_("Message.isValid",a.wa.isValid,a);a.wa.C_=["none",a.wa.Vq.CONFIRMATION,a.wa.Vq.INFO,a.wa.Vq.WARNING,a.wa.Vq.ERROR,a.wa.Vq.FATAL];a.nf=function(a,b,d,e){this.Init(a,b,d,e)};a.f.ua(a.nf,a.wa,"oj.ComponentMessage");a.nf.DC={FZ:"shown",kZ:"hidden"};a.nf.hEa={display:a.nf.DC.FZ,context:""};a.nf.prototype.Init=function(c,b,d,e){a.nf.N.Init.call(this,c,b,d);this.Cc=g.extend({},
a.nf.hEa,e)};a.nf.prototype.IB=function(c){return a.nf.N.IB.call(this,c)&&this.Cc.display===c.Cc.display};a.nf.prototype.clone=function(){return new a.nf(this.summary,this.detail,this.severity,this.Cc)};a.nf.prototype.yva=function(){return!(this.Cc&&this.Cc.display&&this.Cc.display===a.nf.DC.kZ)};a.nf.prototype.wNa=function(){this.Cc&&a.nf.DC.kZ===this.Cc.display&&(this.Cc.display=a.nf.DC.FZ)};a.nf.prototype.tpa=function(){return this.Cc&&this.Cc.context?!0:!1}});