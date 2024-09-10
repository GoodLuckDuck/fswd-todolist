//import $ from 'jquery';

//import {
  //indexTasks,
  //postTask,
//} from "./requests.js";

//indexTasks(function (response) {
  //var htmlString = response.tasks.map(function(task) {
    //return "<div class='col-12 mb-3 p-2 border rounded task' data-id='" + task.id + "'> \
      //" + task.content + "\
      //</div>";
  //});

 // $("#tasks").html(htmlString);
//});




  import $ from 'jquery';

  //load tasks 
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      const taskHtml = `<div class='col-12 mb-3 p-2 border rounded task' data-id='${task.id}'> \
        ${task.content} \
        <button class='btn btn-danger btn-sm deleteTaskButton'>Delete</button> \
      </div>`;
      $("#tasks").append(taskHtml);
    });

    // delete listeners 
    $('.deleteTaskButton').on('click', function() {
      $(this).closest('.task').remove(); // Remove task 
      saveTasks(); // Save 
    });
  }

  // save tasks 
  function saveTasks() {
    const tasks = [];
    $('#tasks .task').each(function() {
      const taskId = $(this).data('id');
      const taskContent = $(this).contents().get(0).nodeValue.trim();
      tasks.push({ id: taskId, content: taskContent });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // doc ready
  $(document).ready(function() {
    loadTasks();
  });

  // Add new task
  $('#addTaskButton').on('click', function() {
    const taskInput = $('#taskInput');
    const taskText = taskInput.val().trim();
    
    if (taskText) {
      const taskId = Date.now(); 
      const newTask = `<div class='col-12 mb-3 p-2 border rounded task' data-id='${taskId}'> \
        ${taskText} \
        <button class='btn btn-danger btn-sm deleteTaskButton'>Delete</button> \
      </div>`;

      $("#tasks").append(newTask);
      taskInput.val(''); 
      saveTasks(); 

      // delete listener 
      $('.deleteTaskButton').last().on('click', function() {
        $(this).closest('.task').remove(); // remove  task 
        saveTasks(); 
      });
    }
  });

