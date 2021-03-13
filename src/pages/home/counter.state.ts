import AppState from '../../redux/state';
import {PayloadAction, ReduxStateProcessor} from 'redux-kangking';
import {ReduxStateObserver} from 'redux-kangking/observable';
import {Observable, of} from 'rxjs';
import {delay, filter, mergeMap} from 'rxjs/operators';
import {createSlice} from '../../redux/store';

// 前2个处理器不直接处理状态, 逻辑集中在第三个处理器中
const [incrementAsync, decrement, increment] =
   createSlice((appState: AppState) => {
      return appState.count || 0;
   })
      .addProcessor()
      .addProcessor()
      .addObserver({
         actionName: 'increment',
         // 处理状态
         handleState(appState: AppState, prevState: number, payload: number) {
            appState.count = prevState + payload;
         },
         // 监听并响应感兴趣的 Action , 返回值(流)会触发新的Action以改变自身的状态
         observe(action$: Observable<PayloadAction<number>>, state$: Observable<AppState>): Observable<number> {
            return action$.pipe(
               filter(({type}) => type === incrementAsync.actionName || type === decrement.actionName),
               mergeMap(({type, payload}) => {
                  if (type === decrement.actionName) {
                     // 减法
                     return of(-1 * payload!);
                  }
                  // 延迟加法
                  return of(payload!).pipe(delay(1000));
               })
            );
         }
      })
      .getProcessors();

//////////////////////// 另一种使用方式(类继承) /////////////////////////////////////
abstract class CounterProcessor extends ReduxStateProcessor<AppState, number> {
   getSliceState(appState: AppState): number {
      return appState.count || 0;
   }
}

class DecrementProcessor extends CounterProcessor {
}

export class IncrementAsyncProcessor extends CounterProcessor {
}

class CounterObserver extends ReduxStateObserver<AppState, number> {

   getSliceState(appState: AppState): number {
      return appState.count || 0;
   }

   // 更新状态
   protected handleState(appState: AppState, prevState: number, actionData: number): void {
      appState.count = prevState + actionData;
   }

   observe(action$: Observable<PayloadAction<any>>, appState$: Observable<AppState>): Observable<number> {
      return action$.pipe(
         filter(({type}) => type === incrementAsync.actionName || type === decrement.actionName),
         mergeMap(({type, payload}) => {
            if (type === decrement.actionName) {
               return of(-1 * payload);
            } else {
               return of(payload).pipe(delay(1000));
            }
         })
      );
   }
}

// 可以提供一个更有意义的actionType, 否则随机生成一个
// export const incrementProcessor = new CounterObserver({actionName: 'increment'});
// export const decrementProcessor = new DecrementProcessor();
// const incrementAsyncProcessor = new IncrementAsyncProcessor();
export {increment as incrementProcessor, decrement as decrementProcessor, incrementAsync as incrementAsyncProcessor};
