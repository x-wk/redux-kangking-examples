import React, {Component} from 'react';
import NumberFormat from 'react-number-format';

type RepositoriesItemProps = {
   id: string;
   full_name: string;
   html_url: string;
   description: string;
   stargazers_count: number;
   language: string;
   created_at: Date;
   updated_at: Date;
}

export class RepositoriesItem extends Component<RepositoriesItemProps> {
   render() {
      return (
         <div className="list-group-item list-group-item-action px-3" style={{padding: '0.75rem 0'}}>
            <div className="d-flex w-100 justify-content-between">
               <a href={this.props.html_url} target="_blank" rel="noreferrer"
                  className="mb-1">{this.props.full_name}</a>
               <small>{this.props.updated_at}</small>
            </div>
            <p className="mb-1">{this.props.description}</p>
            <NumberFormat displayType={'text'}
                          thousandSeparator={true}
                          value={this.props.stargazers_count}
                          renderText={value => <small>Star: {value} </small>}/>
            <small className="ml-3">{this.props.language}</small>
         </div>
      );
   }
}
