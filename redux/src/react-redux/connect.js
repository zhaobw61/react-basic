import React from 'react';
import ReactReduxtContext from './ReactReduxContext';
import {bindActionCreates} from 'redux';
/**
 * @param {*} mapStateToProps
 * @param {*} mapDispatchTpProps
 */
function connect(mapStateToProps, mapDispatchTpProps) {
    return function (OldComponent) {
        return class extends React.Component{
            contextType = ReactReduxtContext;
            constructor(props, context){
                super(props);
                this.state = mapStateToProps(context.store.getState());
            }
            componentDidMount(){
                this.unsubscribe = this.context.store.subscribe(()=>{
                    this.setState(mapStateToProps(this.context.store.getState()));
                })
            }
            componentWillUnmount(){
                this.unsubscribe();
            }
            render(){
                let boundActions = bindActionCreates(mapDispatchTpProps, this.context.store.dispatch);
                return <OldComponent {...this.props} {...this.state} {...boundActions}/>
            }
        }
    }
}