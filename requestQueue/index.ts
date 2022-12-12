/**
 * 实现输入(promise)[p1, ...p100]个请求,按顺序输出[r1, ...r100]的函数，
 * 无论请求成功或者失败，要求请求的最大并发数为3，且当一个请求结束时下一个请求开始
 */

type Task = () => Promise<unknown>;

const task1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 2000);
  });
const task2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 2000);
  });
const task3 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(3);
    }, 2000);
  });
const task4 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(4);
    }, 3500);
  });
const task5 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(5);
    }, 5000);
  });
const task6 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(6);
    }, 600);
  });
const taskList = [task1, task2, task3, task4, task5, task6];

function requestQueue(taskList: Task[], max = 3): Promise<unknown[]> {}

requestQueue(taskList, 3);
//[1,2,3,4,5,6]
