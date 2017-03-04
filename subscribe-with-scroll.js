/* globals ShowAsScroll, InfiniteScroll, jQuery */

ShowAsScroll = class {
  /**
   * Initializes the ShowAsScroll
   * @param  {Object} options
   * @return {ShowAsScroll}
   */
  constructor(options){
    check(options, {
    	limit: Match.Integer,
    	increment: Match.Integer,
    	template: Match.Optional(Blaze.TemplateInstance),
    	threshold: Match.OneOf(String, jQuery),
    	query: Function,
    	collection: Mongo.Collection,
    });

    this.pub = options.pub;
    this.collection = options.collection;
    this.limit = new ReactiveVar(options.limit);
    this.hasEnded = new ReactiveVar(false);
    this.increment = options.increment;
    this.query = options.query || function(){};
    this.events = $({});

    return this;
  }

  destroy(){
    this.infiniteScroll && this.infiniteScroll.destroy();
  }

  onEnd(fn){
    return this.events.on('end', fn);
  }

  run(){
    this.infiniteScroll =
      new InfiniteScroll(options.threshold, options.template);

    this.infiniteScroll.onInfinite(() => {
      if(!this.hasEnded.get()){
        this.limit.set( this.limit.get() + this.increment );
      }

      Tracker.afterFlush(() => {
        if(this.collection.find().count() <= this.limit.get()){
          this.hasEnded.set(true);
        } else {
          this.hasEnded.set(false);
        }
      })
    });

    this.infiniteScroll.run();
  }
  
  getData(){
    return this.query({
      limit: this.limit.get(),
    })
  }
};
