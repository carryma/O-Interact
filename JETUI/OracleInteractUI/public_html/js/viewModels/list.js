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

    this.handleActivated = function()
    {
      // Now that the router for this view exist, synchronise it with the URL
      return oj.Router.sync().
      then(
         null,
         function(error) {
            oj.Logger.error('Error during refresh: ' + error.message);
         }
      );
    };

    this.gotoContent = function(event)
    {
      if (event.type === 'selectionChanged' && event.currentTarget.currentItem != null)
      {
        params.ojRouter.parentRouter.go(event.currentTarget.currentItem.toString());
      }
    };
  }

  // Return constructor function
  return viewModel;
});