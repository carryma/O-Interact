/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Home content module, example of singleton view model object.
 */
define(['knockout'],
function(ko)
{
  var viewModel =
  {
    title: 'Responsive Web Application with router',

    description:
    [
      {
        line: 'This application demonstrates the Responsive Web Application pattern using the \
JET router for navigation.'
      },
      {
        line: 'This text is from the home module.'
      }
    ]
  };

  return viewModel;
});