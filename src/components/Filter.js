import * as React from "react";
import { Range } from "react-range";

class Filter extends React.Component {
    state = { values: [50] };
    render() {
        return (
            <Range
                step={0.1}
                min={0}
                max={100}
                values={this.state.values}
                onChange={(values) => this.setState({ values })}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: "6px",
                            width: "50%",
                            backgroundColor: "#ccc",
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: "22px",
                            width: "22px",
                            backgroundColor: "#999",
                        }}
                    />
                )}
            />
        );
    }
}

export default Filter;
