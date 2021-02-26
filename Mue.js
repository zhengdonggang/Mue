class Mue {
    constructor(opt){
        this.$el = opt.el;
        this.$data = opt.data;

        if(this.$el){
            new Observer(this.$data);
            //模板编译Compile
            new Compile(this.$el, this)
        }
    }
  

}