import $ from 'jquery';

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

// Function to get tasks
export var indexTasks = function (successCB, errorCB) {
  var request = {
    type: 'GET',
    url: 'api/tasks?api_key=1',
    success: successCB,
    error: errorCB
  };

  $.ajax(request);
};

// Function to post a new task
export var postTask = function (content, successCB, errorCB) {
  var request = {
    type: 'POST',
    url: 'api/tasks?api_key=1',
    data: {
      task: {
        content: content
      }
    },
    success: successCB,
    error: errorCB
  };

  $.ajax(request);
};

//  delete a task
export var deleteTask = function (taskId, successCB, errorCB) {
  var request = {
    type: 'DELETE',
    url: `api/tasks/${taskId}?api_key=1`, // Assuming the API endpoint follows this pattern
    success: successCB,
    error: errorCB
  };

  $.ajax(request);
};
