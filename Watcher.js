class Watcher{
    constructor(vm, exp, cb){
        this.vm = vm;
        this.exp = exp;
        this.cb = cb; //改变
        this.value = this.get() //获取旧的值
    }
    get(){
       Dep.target = this;
       let value  =  this.getValue(this.vm, this.exp);
       Dep.target = null;
       return value;
    }

    getValue(vm, exp){
        exp = exp.split('.');
        return exp.reduce((prev, next)=>{
              return prev[next];
          }, vm.$data);
    }
    update(){
        let newValue = this.getValue(this.vm, this.exp);//更新数据
        let oldValue = this.value;
        if(newValue !== oldValue){
            this.cb(newValue);
        }
    }
}