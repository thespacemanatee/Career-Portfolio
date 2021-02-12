class Task {
  constructor(task) {
    this.taskId = task["Task ID"];
    this.task = task["Task"];
    this.iwaTitle = task["IWA Title"];
    this.task_type = "supplementary";
  }
}

export default Task;
