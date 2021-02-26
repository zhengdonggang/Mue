//数据劫持
class Observer {
  constructor(data) {
    this.observe(data);
  }
  observe(data) {
    if (!data || typeof data !== "object") {
      return;
    }
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
      this.observe(data[key]); //为更深层次的key添加get/set
    });
  }
  //定义响应式
  defineReactive(obj, key, value) {
     let that = this;
     let dep = new Dep();
     //定义属性
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
      Dep.target && dep.addSub(Dep.target);
      console.log(value);
        return value;
      },
      set(newValue) {
        if (newValue !== value) {
           that.observe(newValue)
           value = newValue;
           dep.notify();
        }
      },
    });
  }
}
//发布订阅者
class Dep{
  constructor(){
    this.subs =[];
  }
  addSub(watcher){
    this.subs.push(watcher);
  }
  notify(){
    this.subs.forEach(watcher => watcher.update());
  }
}
