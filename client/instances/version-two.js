// This comes from node_modules
import Vue from "vue";
// Now we use the vue-resource from node_modules for AJAX
import VueResource from "vue-resource";
Vue.use(VueResource);
// This comes from node_modules; it's a vue + bootstrap component
import Alert from 'vue-strap/src/Alert.vue';
// This comes from client/components...
import Board from "../components/board.vue";

export default {
  // The element we're attaching our component to
  el: "#version-two",
  // Boards will get populated after an AJAX request
  data: {
    boards: [],
    showAlert: false
  },
  // When the component is created we fetch our boards
  created: function() {
    this.fetchBoards();
  },
  // Methods will be attached to `this`
  methods: {
    fetchBoards: function() {
      // This comes from vue-resource and keeps a reference to `this`
      this.$http({
        url: 'boards.json',
        method: 'GET'
      })
      // The promise is returned as a response object
      .then(function(response) {
        // We change this.boards to the response data
        this.$set('boards', response.data);
      }, function(error) {
        console.error('Error fetching boards: ' + error.toString());
      });
    }
  },
  events: {
    addTask: function(board, task) {
      this.$http({
        url: 'tasks',
        method: 'POST',
        data: {
          board: board,
          task: task
        }
      })
      .then(function(response) {
        // Reload the boards
        this.fetchBoards();
      }, function(error) {
        console.error('Error adding task: ' + error.toString());
      });
    },
    deleteTask: function(task) {
      this.$http({
        url: 'tasks/' + task + '/delete',
        method: 'POST',
      })
      .then(function(response) {
        // Reload the boards
        this.fetchBoards();
        // Trigger our alert
        this.showAlert = !this.showAlert;
      }, function(error) {
        console.error('Error deleting task: ' + error.toString());
      });
    }
  },
  // Register our board component so we can use it in our template
  components: {
    'vue-board': Board,
    'vue-alert': Alert
  }
};
