# React 核心思想

> 内存中维护一颗虚拟DOM树，数据变化时（setState），自动更新虚拟 DOM，得到一颗新树，然后 Diff 新老虚拟 DOM 树，找到有变化的部分，得到一个 Change(Patch)，将这个 Patch 加入队列，最终批量更新这些 Patch 到 DOM 中。

# 生命周期

<img src='/assets/react_lifecycle.png' width='900px'/>

# diff算法

- 是`virtual-dom`和渲染的性能保证
- 策略一：`tree diff` 忽略Web UI中DOM节点**跨层级移动**；
  - 将dom tree分层级，之比较同层级的节点，如果对比发现该父节点不存在则直接删除该节点下所有子节点，不会做进一步比较，这样只需要对dom tree进行一次遍历就完成了两个tree的比较。
  - 保证稳定dom结构有利于提升性能，不建议频繁真正的移除或者添加节点
- 策略二：`component diff` 拥有相同类型的两个组件产生的DOM结构也是**相似**的，不同类型的两个组件产生的DOM结构则不近相同
  - 同一类型组件遵从`tree diff`比较v-dom树
  - 不通类型组件，先将该组件归类为`dirty component`，替换下整个组件下的所有子节点
  - 同一类型组件Virtual Dom没有变化，React允许开发者使用`shouldComponentUpdate()`来判断该组件是否进行diff，运用得当可以节省diff计算时间，提升性能
  - 对于同一类型组件合理使用`shouldComponentUpdate()`，应该避免结构相同类型不同的组件
- 策略三：`element diff` 对于同一层级的一组子节点，通过分配唯一**唯一id**进行区分(key值)
  - 得到需要create、update和remove的节点后，就可以开始进行渲染了
  - 遍历所有需要remove的节点，将其从真实DOM中remove掉
  - 再遍历需要更新的节点，将其插入到对应的位置中
  - 创建新的DOM节点，并插入到正确的位置中
  - 尽量减少将最后一个节点移动到列表首部的操作
- <img src='/assets/setState.png' width='600px'/>
- 在React中`setState`不是每次调用就立刻渲染的。他们的队列的顺序也在一次事件之内进行结算（比如在`click`事件过程中可能有很多`setState`在等待，等`Click`事件完成之后，`setState`这个队列里面的内容就开始进行结算了），所以`setState`多次调用并**不会**导致渲染多次，但是事务的次数可能会导致渲染。

# react-router

- react-router在history库的基础上，实现了URL与UI的同步，分为两个层次来描述具体的实现。

# Fiber

- Fiber 是一种工作单元,它的特性就是时间分片(time slicing)和暂停(supense)。
- Fiber 的工作方式
  - `ReactDOM.render()` 和 `setState` 的时候开始创建更新,并为其设置优先级。
  - 将创建的更新加入任务队列，等待调度。
  - 在 requestIdleCallback 空闲时执行任务。
  - 从根节点开始遍历 Fiber Node，并且构建 WorkInProgress Tree。
  - 生成 effectList。
  - 根据 EffectList 更新 DOM。

> React 在 render 第一次渲染时，会通过 React.createElement 创建一颗 Element 树，可以称之为 Virtual DOM Tree，由于要记录上下文信息，加入了 Fiber，每一个 Element 会对应一个 Fiber Node，将 Fiber Node 链接起来的结构成为 Fiber Tree。它反映了用于渲染 UI 的应用程序的状态。这棵树通常被称为 current 树（当前树，记录当前页面的状态）。

> 在后续的更新过程中（setState），每次重新渲染都会重新创建 Element, 但是 Fiber 不会，Fiber 只会使用对应的 Element 中的数据来更新自己必要的属性，
Fiber Tree 一个重要的特点是链表结构，将递归遍历编程循环遍历，然后配合 requestIdleCallback API, 实现任务拆分、中断与恢复。

# Redux

- 工作流程：
  - 首先，用户（通过View）发出Action，发出方式就用到了dispatch方法。
  - 然后，Store自动调用Reducer，并且传入两个参数：当前State和收到的Action，Reducer会返回新的State
  - State一旦有变化，Store就会调用监听函数，来更新View。
- store 有且只有一个