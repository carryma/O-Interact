/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojknockout', 'ojs/ojrouter'],
function(oj, ko)
{
  function viewModel(params)
  {
    this.parentRouter = params.ojRouter.parentRouter;

    this.content = 'This is the Admin module';
    
    this.canExit = function(){
        //TODO: add code the verify that everything is good before leaving the page        
      return true;  
    };
    
  }

  // Return constructor function
  return viewModel;
});