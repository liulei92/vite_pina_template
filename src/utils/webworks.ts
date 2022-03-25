/*
 * @Description: webworks.ts
 * @Date: 2021-06-08 17:29:34
 * @Author: LeiLiu
 */
function create(f: string) {
  const blob = new Blob(['(' + f + ')()']);
  const url = window.URL.createObjectURL(blob);
  const worker = new Worker(url);
  return worker;
}

export const createWorker = (callback: Fn, time: number) => {
  const pollingWorker = create(`function (e) {
    setInterval(function () {
      this.postMessage(null)
    }, ${time})
  }`);
  pollingWorker.onmessage = callback;
  return pollingWorker;
};

export const stopWorker = (vm: Worker) => {
  try {
    vm && vm.terminate();
  } catch (err) {
    console.log(err);
  }
};
