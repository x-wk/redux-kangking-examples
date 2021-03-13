import React, {Component, Fragment} from 'react';
import RepositoriesHeader from './repositories-header';
import {RepositoriesItem} from './repositories-item';
import AppState, {GitHubSearch} from '../../redux/state';
import {connect} from 'react-redux';
import NumberFormat from 'react-number-format';

type RepositoriesProps = {
   searchResult: GitHubSearch['result']
}

class Repositories extends Component<RepositoriesProps> {
   render() {
      return (
         <Fragment>
            <div className="row">
               <div className="col-6">
                  <RepositoriesHeader/>
               </div>
               <div className="col-12">
                  <NumberFormat displayType={'text'}
                                thousandSeparator={true}
                                value={this.props.searchResult?.total_count}
                                renderText={value => <h2 style={{fontSize: '1rem'}}>{value} repository results</h2>}/>
                  <hr/>
               </div>
            </div>
            <div className="row">
               <div className="col-12">
                  <div className="list-group list-group-flush">
                     {
                        this.props.searchResult?.items.map(item => {
                           return <RepositoriesItem key={item.id} {...item}/>;
                        })
                     }
                  </div>
               </div>
               <div className="col-12">
                  <nav>
                     {/*<ul className="pagination justify-content-end">
                        <li className="page-item disabled">
                           <a className="page-link" aria-disabled="true">Previous</a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                           <a className="page-link" href="#">Next</a>
                        </li>
                     </ul>*/}
                  </nav>
               </div>
            </div>
         </Fragment>
      );
   }
}

const mapStateToProps = (state: AppState) => ({
   searchResult: state.github?.repositories?.result
});

export default connect(mapStateToProps)(Repositories);
