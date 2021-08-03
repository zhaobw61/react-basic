import React from 'react';
import ReactDOM from 'react-dom';
// 2020 10 25
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