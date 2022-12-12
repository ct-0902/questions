class TaskQueue {
  constructor(len: number) {
    this._len = len;
  }

  /** 请求队列总长度 */
  private _len = 0;
  /** 缓存池 */
  private _cacheQueue = new Set();
  /** 队列返回值 */
  private _result = [] as unknown[];
  /** 队列结束标识 */
  private _end = false;

  add(i: { idx: number; task: Task }) {
    const cur = i.task()
      .then((res) => {
        this._result[i.idx] = res;
        this._cacheQueue.delete(cur);
      })
      .catch((e) => {
        this._result[i.idx] = e;
        this._cacheQueue.delete(cur);
      });
    this._cacheQueue.add(cur);
  }

  async run() {
    if (this._cacheQueue.size) {
      if (this._result.length + this._cacheQueue.size >= this._len) {
        await Promise.all([...this._cacheQueue]);
        this._end = true;
      } else {
        await Promise.race([...this._cacheQueue]);
      }
    }
    return this._cacheQueue.size;
  }

  get result() {
    return this._result;
  }

  get end() {
    return this._end;
  }
}

async function requestQueue(taskList: Task[], max = 3) {
  const queue = new TaskQueue(taskList.length);
  let i = 0;
  while (!queue.end) {
    let cacheLen = await queue.run();
    while (cacheLen < max && i < taskList.length) {
      cacheLen++;
      queue.add({ task: taskList[i], idx: i++ });
    }
  }
  return queue.result;
}
