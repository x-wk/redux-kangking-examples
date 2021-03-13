import React, {Component, createRef} from 'react';
import {connect} from 'react-redux';
import {paramsProcessor} from './github.state';
import {CreateActionFunc} from 'redux-kangking';
import AppState, {GitHubSearch} from '../../redux/state';

type RepositoriesHeaderProps = {
   params: GitHubSearch['search'];
   doSearch: CreateActionFunc<GitHubSearch['search']>
}

class RepositoriesHeader extends Component<RepositoriesHeaderProps> {

   textElement = createRef<HTMLInputElement>();

   doSearch = () => {
      const title = this.textElement.current!.value;
      if (title.trim() !== '') {
         this.props.doSearch({q: title});
      }
   };

   render() {
      return (
         <div className="input-group mb-3">
            <input ref={this.textElement} defaultValue={this.props.params?.q} type="text" className="form-control"
                   placeholder="Repository's name"/>
            <div className="input-group-append">
               <button onClick={this.doSearch} className="btn btn-outline-secondary" type="button" id="button-addon2">
                  Search
               </button>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state: AppState) => ({
   params: state.github?.repositories?.search
});
const mapDispatchToProps = {
   doSearch: paramsProcessor.getActionCreator()
};
export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesHeader);
