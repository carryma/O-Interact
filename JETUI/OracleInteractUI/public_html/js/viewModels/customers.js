/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*jslint browser: true*/
/*global define */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojrouter'],
function(oj, ko, $)
{
   'use strict';

   var custArray = [
            {id:7369, name: 'Smith Brothers', market: 'Dairy', sales: 800, deptno: 20, orders: [
                  {id:100, name:'A'},
                  {id:110, name:'B'},
                  {id:120, name:'C'}] },
            {id:7499, name: 'Allen Furniture', market: 'Home Furnishings', sales: 1600, deptno: 30, orders: [
                  {id:101, name:'A'},
                  {id:102, name:'C'}] },
            {id:7521, name: 'Ward and Roebuck', market: 'Home Appliances', sales: 1250, deptno: 30, orders: [
                  {id:120, name:'A'},
                  {id:121, name:'F'},
                  {id:122, name:'G'}] },
            {id:7566, name: 'Jones Brothers', market: 'Reality', sales: 2975, deptno: 20, orders: [
                  {id:130, name:'B'},
                  {id:131, name:'C'},
                  {id:132, name:'D'}] },
            {id:7654, name: 'Martin Marina', market: 'Water Sports', sales: 1250, deptno: 30, orders: [
                  {id:140, name:'C'},
                  {id:141, name:'B'}] },
            {id:7698, name: 'Blake and Sons', market: 'Accounting', sales: 2850, deptno: 30, orders: [
                  {id:150, name:'E'},
                  {id:151, name:'G'}] },
            {id:7782, name: 'Clark Candies', market: 'Confectionaries', sales: 2450, deptno: 10, orders: [
                  {id:160, name:'B'},
                  {id:161, name:'E'}] },
            {id:7788, name: 'Scott Lawn Service', market: 'Gardening Supplies', sales: 3000, deptno: 20, orders: [
                  {id:170, name:'C'},
                  {id:171, name:'D'}] },
            {id:7839, name: 'King Power', market: 'Champion Builders', sales: 5000, deptno: 10, orders: [
                  {id:180, name:'A'},
                  {id:181, name:'F'},
                  {id:182, name:'C'}] }];

  function viewModel(params)
  {
    var parentRouter = params.ojRouter.parentRouter;
    var routerConfig =
    {
     'list': { isDefault: true }
    };

    // Populate the router config object with all the items from the table
    custArray.forEach(function(item)
    {
      var id = item.id.toString();
      routerConfig[id] = { label: item.name, value: item };
    });

    // Create and configure the router
    this.custRouter = parentRouter.createChildRouter('cust').configure(routerConfig);

    // Create and configure the order router for this model.
    // Uses a dynamic router so it can managed orders for any emp
    this.orderRouter = this.custRouter.createChildRouter('order').configure(function(stateId)
    {
      if (stateId)
      {
        return new oj.RouterState(stateId, { value: stateId === 'orders' ? 'listOrder' : stateId });
      }
    });

    // This is the main logic to switch the module based on both router states.
    this.moduleConfig = ko.pureComputed(function()
    {
      var moduleConfig;
      var orderStateId = this.orderRouter.stateId();

      if (orderStateId)
      {
        if (orderStateId === 'orders')
        {
          // Pass a reference of the orders array to the child module to render the list
          moduleConfig = $.extend(true, {}, this.orderRouter.moduleConfig,
          {
            'params': { 'data': this.custRouter.currentValue.peek().orders }
          });
        }
        else
        {
          // Change the module name and pass the orderId down to the module
          moduleConfig = $.extend(true, {}, this.orderRouter.moduleConfig,
          {
            'name': 'viewOrder',
            'params': { 'data': orderStateId }
          });
        }
      }
      else if (this.custRouter.stateId() === 'list')
      {
        // Pass a reference of empArray to the child module to render the list
        moduleConfig = $.extend(true, {}, this.custRouter.moduleConfig,
        {
          'params': { 'data': custArray }
        });
      }
      else
      {
        // Change the module name and pass the emp down to the module
        moduleConfig = $.extend(true, {}, this.custRouter.moduleConfig,
        {
          'name': 'view',
          'params': { 'data': this.custRouter.currentValue.peek() }
        });
      }

      return moduleConfig;
    }, this);

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

    this.dispose = function()
    {
      // Every router is destroyed on dispose.
      this.custRouter.dispose();
    };

  }

  // Return constructor function
  return viewModel;
});