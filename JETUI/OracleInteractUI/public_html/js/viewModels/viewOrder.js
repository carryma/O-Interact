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
    this.parentRouter = params.ojRouter.parentRouter;

    // stateId for this view is injected using the module param
    var stateId = params.data;
    var i, orders;

    // Retrieve all orders from current emp value
    orders = this.parentRouter.parent.currentValue().orders;
    // Find a specific order by id
    for (i = 0; i < orders.length; i++)
    {
      if (orders[i].id.toString() === stateId)
      {
        this.order = orders[i];
        break;
      }
    }

    this.goBack = function()
    {
      // Could also do router.parent.go();
      window.history.back();
    };

    this.goCust = function()
    {
      oj.Router.rootInstance.go('customers');
    };
    
    this.canExit = function()
    {
        console.log('can exit viewOrder');
        return true;
    };
  }

  // Return constructor function
  return viewModel;
});