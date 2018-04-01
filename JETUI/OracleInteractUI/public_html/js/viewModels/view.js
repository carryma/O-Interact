/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*jslint browser: true*/
/*global define */
define(['ojs/ojcore', 'knockout', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojinputtext',
        'ojs/ojrouter'],
function(oj, ko)
{
  'use strict';

  function viewModel(params)
  {
    var self = this;
    self.parentRouter = params.ojRouter.parentRouter;

    // Value for this view is injected using the module param
    self.cust = params.data;

    self.goBack = function()
    {
      // Could also do this.parentRouter.go(); but this preserve history
      window.history.back();
    };

    self.gotoOrders = function()
    {
      self.parentRouter.go(self.cust.id + '/orders');
    };
  }

  // Return constructor function
  return viewModel;
});