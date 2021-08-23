import React from 'react'
import RouterContext from './RouterContext'
/**
 * 获取location得到path，然后跟自己的path进行匹配，然后来渲染component
 */
class Router extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            location: props.history.location
        }
        this.unlisten = props.history.listen((location)=>{
            this.setState({location})
        });
    }
    componentWillUnmount(){
        this.unlisten && this.unlisten();
    }
    render(){
        let value = {
            history: this.props.history,
            location: this.state.location
        }
        return(
            <RouterContext.Provider value={value}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}

export default Router;