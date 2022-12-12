function requestQueue(taskList: Task[], max = 3) {
  let curRun = 0,
    taskIdx = 0;
  const result: unknown[] = [];

  return new Promise((resolve) => {
    function run() {
      while (curRun < max && taskIdx < taskList.length) {
        const task = taskList[taskIdx];
        const curIndx = taskIdx;
        curRun++;
        taskIdx++;

        task()
          .then((r) => {
            curRun--;
            result[curIndx] = r;
            if (curRun === 0) {
              resolve(result);
            } else {
              run();
            }
          })
          .catch((e) => {
            curRun--;
            result[curIndx] = e;
            if (curRun === 0) {
              resolve(result);
            } else {
              run();
            }
          });
          
        run();
      }
    }

    run();
  });
}
