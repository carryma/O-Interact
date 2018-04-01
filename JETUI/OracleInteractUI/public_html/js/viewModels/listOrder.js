/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojknockout', 'ojs/ojlistview', 'ojs/ojarraytabledatasource',
        'ojs/ojrouter'],
function(oj, ko)
{
  function viewModel(params)
  {
    this.dataSource = new oj.ArrayTableDataSource(params.data, {idAttribute: 'id'});

    this.gotoContent = function(event)
    {
      if (event.type === 'selectionChanged' && event.currentTarget.currentItem != null)
      {
        var orderRouter = params.ojRouter.parentRouter;
        orderRouter.go(event.currentTarget.currentItem.toString());
      }
    };

    this.goBack = function()
    {
      // Could also do this.parentRouter.go();
      window.history.back();
    };

    this.goCust = function()
    {
      oj.Router.rootInstance.go('customers');
    };

    this.canExit = function(){
        console.log('can exit listOrder');
        return true;
    }
  }

  // Return constructor function
  return viewModel;
});