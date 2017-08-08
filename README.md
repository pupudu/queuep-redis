# queuep-redis

This is a redis based storage strategy for queuep. Thus to make use of this library you should be using queuep already. 

QueueP is a congestion control framework designed for NodeJs applications. Go have a look at https://www.npmjs.com/package/queuep

### Installation

    npm install --save queuep-redis
    
### Usage

Note: We assume that you already have a redis-server up and running. 
The current version of queuep-redis requires that you don't need credentials to connect to the redis server. 
We understand that it is not the general case. We will implement that feature in the next release. 

First import queuep and queuep-redis

    import qp from 'queuep';
    import RedisStore from 'queuep-redis';

Then you can set the storage to queuep-redis when initializing queuep by providing the store as the first argument to init method.
Note that we are using uppercase for the first letter since the store imported from `queuep-redis` is a class definition. It is not compulsory, but makes more sense internally.

    qp.init(RedisStore);
    
You can also set the storage using the `useStore` method.

    qp.useStore(RedisStore);

We recommend to set the storage before initializing any queuep queues. It would not break the code if not. But the code will look cleaner with the recommended approach.

You can also set redis storage to a particular queue while initializing a queue. To do that,
  
    let myQueue = qp.initQueue("my_queue", {
        consumer: this.myConsumer,
        storeClass: RedisStore
    });
    
Or even after initializing using the setStore method. But we would not recommend this unless there is no other choice.

To do that,

    let queue = qp.getQueueInstance("my_queue");
    queue.setStore(RedisStore);
    
or 
    
    qp.setStore("my_queue", RedisStore);