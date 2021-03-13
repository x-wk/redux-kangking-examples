import AppState, {GitHubSearch} from '../../redux/state';
import * as lodash from 'lodash';
import {createSlice} from '../../redux/store';
import {Observable} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {PayloadAction} from 'redux-kangking';
import qs from 'querystring';

// 仓库查询API
const repoSearchAPI = 'https://api.github.com/search/repositories?';

const [paramsProcessor] = createSlice((appState: AppState) => {
   return appState.github?.repositories || {};
})
   .addProcessor({
      handleState(appState: AppState, prevState: GitHubSearch, payload: GitHubSearch['search']) {
         // 记录查询参数
         lodash.set(appState, 'github.repositories.search', payload);
      }
   })
   .addObserver({
      actionName: 'github_search_repositories',
      observe(action$: Observable<PayloadAction<GitHubSearch['search']>>): Observable<GitHubSearch['result']> {
         return action$.pipe(
            filter(({type}) => type === paramsProcessor.actionName),
            switchMap(({payload}) => ajax.getJSON<GitHubSearch['result']>(`${repoSearchAPI}${qs.stringify(payload)}`))
         );
      },
      handleState(appState: AppState, prevState: GitHubSearch, payload: GitHubSearch['result']) {
         prevState.result = payload;
      }
   }).getProcessors();

export {paramsProcessor};
