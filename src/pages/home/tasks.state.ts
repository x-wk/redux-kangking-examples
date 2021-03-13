import AppState, {Task} from '../../redux/state';
import {nanoid} from 'nanoid';
import {createSlice} from '../../redux/store';

const [addTask, completeTask] = createSlice((appState: AppState) => {
   return appState.tasks || [{
      id: '001',
      title: '这是一个默认设定的任务',
      isCompleted: true,
      createdTime: new Date(),
      updatedTime: new Date()
   }];
})
   .addProcessor({
      handleState: (appState: AppState, prevState: Task[], payload: string) => {
         prevState.push({
            id: nanoid(),
            title: payload,
            isCompleted: false,
            createdTime: new Date()
         });

         // 设置状态
         appState.tasks = prevState;
      }
   })
   .addProcessor({
      handleState: (appState: AppState, prevState: Task[], payload: string) => {
         const {tasks = []} = appState;
         tasks.filter(({id}) => id === payload).forEach(task => {
            task.isCompleted = true;
            task.updatedTime = new Date();
         });
      }
   })
   .getProcessors();

export {addTask, completeTask};
