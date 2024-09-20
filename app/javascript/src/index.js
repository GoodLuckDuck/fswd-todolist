import $ from 'jquery';
import { indexTasks, postTask, deleteTask } from './requests';

// Load tasks 
function loadTasks() {
  indexTasks(
    function(data) {
      const tasks = data.tasks;
      console.log('Tasks loaded:', tasks);
      
      $("#tasks").empty(); // Clear existing tasks before appending new ones
      
      tasks.forEach(task => {
        const taskHtml = `<div class='col-12 mb-3 p-2 border rounded task' data-id='${task.id}'> \
          ${task.content} \
          <button class='btn btn-danger btn-sm deleteTaskButton'>Delete</button> \
        </div>`;
        $("#tasks").append(taskHtml);
      });

      // Delete listeners 
      $('.deleteTaskButton').on('click', function() {
        const taskId = $(this).closest('.task').data('id');
        deleteTask(taskId, 
          function(response) {
            console.log('Task deleted successfully:', response);
            loadTasks(); // Reload tasks after deletion
          },
          function(error) {
            console.error('Error deleting task:', error);
          }
        );
      });
    },
    function(error) {
      console.error('Error loading tasks:', error);
    }
  );
}

// Save task
function saveTask(taskContent) {
  postTask(taskContent, 
    function(response) {
      console.log('Task saved successfully:', response);
      loadTasks(); // Reload tasks after saving
    },
    function(error) {
      console.error('Error saving task:', error);
    }
  );
}

// Document ready
$(document).ready(function() {
  loadTasks();

  // Add new task
  $('#addTaskButton').on('click', function() {
    const taskInput = $('#taskInput');
    const taskContent = taskInput.val().trim();
    
    if (taskContent) {
      saveTask(taskContent);
      taskInput.val(''); // Clear input after adding task
    }
  });
});
