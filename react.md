# React 核心思想

> 内存中维护一颗虚拟DOM树，数据变化时（setState），自动更新虚拟 DOM，得到一颗新树，然后 Diff 新老虚拟 DOM 树，找到有变化的部分，得到一个 Change(Patch)，将这个 Patch 加入队列，最终批量更新这些 Patch 到 DOM 中。


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