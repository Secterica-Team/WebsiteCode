import React, { Component } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts'
import "./Rechart.css"

const colors = {
    area: '#8aacc0',
    stroke: "#8aacc0",
    grid_stroke: "#8aacc0"
};

class Recharts extends Component {
    render () {
        return (
            <div className="chart_block" style={{maxWidth:400, maxHeight: 300}}>
            <ResponsiveContainer className="container" height={250} width={600}>
                <AreaChart data={this.props.data}
                           margin={{top:25, right:30, bottom:25, left:0}}
                           width={200}
                           height={250}>
                    <XAxis dataKey="x" />
                    <YAxis dataKey="y" />
                    <Area
                        dataKey = "y"
                        name={this.props.name}
                        fill={colors.area}
                        stroke={colors.stroke}
                    >
                        {/*<LabelList dataKey="y" position = "top" offset={10}/>*/}
                    </Area>
                    {/*<CartesianGrid stroke={colors.grid_stroke} strokeDashArray="5 5"/>*/}
                    <Tooltip/>
                </AreaChart>
            </ResponsiveContainer>
            </div>
        );
    }
}

export default Recharts;