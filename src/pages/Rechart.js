import React, { Component } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts'

const colors = {
    area: "#8AACCO",
    stroke: "#eeee"
};

class Recharts extends Component {
    render () {
        return (
            <ResponsiveContainer>
                <AreaChart data={this.props.data}
                           margin={{top:25, right:25, bottom:25, left:0}}>
                    <XAxis dataKey="x" />
                    <YAxis dataKey="y" />
                    <Area
                        dataKey = "y"
                        name={this.props.name}
                        fill={colors.area}
                    >
                        <LabelList dataKey="y" position = "top" offset={10}/>
                    </Area>
                    <CartesianGrid stroke={colors.stroke} strokeDashArray="5 5"/>
                    <Tooltip/>
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}

export default Recharts;