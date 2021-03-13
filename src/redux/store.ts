import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {appStateReducer, createSliceCreator, DefaultSliceCreator} from 'redux-kangking';
import {createObservableMiddleware, ObservableSliceCreator, ObserverOptions} from 'redux-kangking/observable';

// 支持异步的中间件(rxjs/observable)
const middleware = createObservableMiddleware();

// 这个接口仅用于编码时开发工具的提示, 无其它用途
interface MySliceCreator extends DefaultSliceCreator {
   addObserver<S, D, T>(observer: ObserverOptions<S, D, T>): this;
}

// 快速创建处理器的函数, 默认只能创建普通的Processor
// ObservableSliceCreator是一个扩展类, 支持创建Observer
// 支持多个自定义扩展类
export const createSlice = createSliceCreator<MySliceCreator>(ObservableSliceCreator);

export default createStore(appStateReducer, composeWithDevTools(applyMiddleware(middleware)));
