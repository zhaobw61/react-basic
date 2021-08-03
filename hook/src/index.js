import React from 'react';
import ReactDOM from 'react-dom';

class Child extends React.Component {
    render() {
        return (
            <>
                <span>你好 Hook</span>
            </>
        )
    }
}

ReactDOM.render(<Child/>, document.getElementById('root'));