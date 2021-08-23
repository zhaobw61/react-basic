import React from 'react'
import RouterContext from './RouterContext'
class Route extends React.Component {
    static contextType = RouterContext;
    render(){
        return (
            <RouterContext.Consumer>
                {
                    contextValue => {
                        const {history, location} = contextValue;
                        const {path, component:component} = this.props;
                        const match = location.pathname === path;
                        let routeProps = {history, location, match}
                        if(match) {
                            return <component {...routeProps}/>
                        }
                    }
                }
            </RouterContext.Consumer>
        )
    }
}